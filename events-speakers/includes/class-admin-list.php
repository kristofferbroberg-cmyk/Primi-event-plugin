<?php
defined( 'ABSPATH' ) || exit;

class Events_Speakers_Admin_List {

	public static function register_pages(): void {
		// Register list pages as hidden (null parent = no sidebar entry).
		add_submenu_page( null, __( 'Events', 'events-speakers' ),   __( 'Events', 'events-speakers' ),   'edit_posts', 'es-events-list',   array( self::class, 'render_page' ) );
		add_submenu_page( null, __( 'Speakers', 'events-speakers' ), __( 'Speakers', 'events-speakers' ), 'edit_posts', 'es-speakers-list', array( self::class, 'render_page' ) );

		// Remove all WP-generated submenu items so the top-level menu entries
		// have no flyout — clicking Events/Speakers goes straight to our list.
		remove_submenu_page( 'edit.php?post_type=event',   'edit.php?post_type=event' );
		remove_submenu_page( 'edit.php?post_type=event',   'post-new.php?post_type=event' );
		remove_submenu_page( 'edit.php?post_type=speaker', 'edit.php?post_type=speaker' );
		remove_submenu_page( 'edit.php?post_type=speaker', 'post-new.php?post_type=speaker' );
	}

	/**
	 * Redirect the default list table URLs to our custom list pages.
	 * Hooked on load-edit.php so it fires before any output.
	 */
	public static function redirect_list_tables(): void {
		$post_type = isset( $_GET['post_type'] ) ? sanitize_key( $_GET['post_type'] ) : '';

		if ( 'event' === $post_type ) {
			wp_safe_redirect( admin_url( 'admin.php?page=es-events-list' ) );
			exit;
		}

		if ( 'speaker' === $post_type ) {
			wp_safe_redirect( admin_url( 'admin.php?page=es-speakers-list' ) );
			exit;
		}
	}

	public static function render_page(): void {
		$page        = sanitize_key( $_GET['page'] ?? '' );
		$is_events   = 'es-events-list' === $page;
		$title       = $is_events ? __( 'Events', 'events-speakers' ) : __( 'Speakers', 'events-speakers' );
		$new_url     = admin_url( 'admin.php?page=' . ( $is_events ? 'es-edit-event' : 'es-edit-speaker' ) );
		$new_label   = $is_events ? __( 'Add New Event', 'events-speakers' ) : __( 'Add New Speaker', 'events-speakers' );
		?>
		<div class="wrap">
			<h1 class="wp-heading-inline"><?php echo esc_html( $title ); ?></h1>
			<a href="<?php echo esc_url( $new_url ); ?>" class="page-title-action"><?php echo esc_html( $new_label ); ?></a>
			<hr class="wp-header-end">
			<div id="es-admin-list-root"></div>
		</div>
		<?php
	}

	public static function enqueue( string $hook ): void {
		$is_events   = 'admin_page_es-events-list' === $hook;
		$is_speakers = 'admin_page_es-speakers-list' === $hook;

		if ( ! $is_events && ! $is_speakers ) {
			return;
		}

		wp_register_script(
			'es-admin-list',
			'',
			array( 'wp-element', 'wp-components', 'wp-api-fetch' ),
			null,
			true
		);
		wp_enqueue_script( 'es-admin-list' );
		wp_add_inline_script( 'es-admin-list', self::list_styles() );
		wp_add_inline_script(
			'es-admin-list',
			$is_events ? self::events_script() : self::speakers_script()
		);

		$edit_page = $is_events ? 'es-edit-event' : 'es-edit-speaker';
		wp_localize_script( 'es-admin-list', 'esAdminList', array(
			'postType' => $is_events ? 'event' : 'speaker',
			'editBase' => admin_url( 'admin.php' ),
			'editPage' => $edit_page,
			'nonce'    => wp_create_nonce( 'wp_rest' ),
		) );
	}

	private static function list_styles(): string {
		return <<<'JS'
( function() {
	var style = document.createElement( 'style' );
	style.textContent = [
		/* Search box — matches WP .search-box pattern */
		'.es-search-box { margin: 8px 0 16px; }',
		'.es-search-box input[type=search] { width: 280px; margin-right: 4px; }',
		/* Sortable column headers */
		'.wp-list-table th.sortable a, .wp-list-table th.sorted a { display: flex; align-items: center; gap: 4px; }',
		'.wp-list-table th.sortable a:focus, .wp-list-table th.sorted a:focus { box-shadow: none; outline: none; }',
		'.sorting-indicator { display: inline-block; width: 10px; }',
		/* Row actions — always in DOM, shown on hover via opacity */
		'.wp-list-table .row-actions { visibility: hidden; }',
		'.wp-list-table tr:hover .row-actions, .wp-list-table tr:focus-within .row-actions { visibility: visible; }',
		/* Spinner cell */
		'.es-list-loading td { padding: 32px; text-align: center; }',
	].join( '\n' );
	document.head.appendChild( style );
} )();
JS;
	}

	private static function events_script(): string {
		return <<<'JS'
( function( element, components, apiFetch ) {
	var el       = element.createElement;
	var useState = element.useState;
	var useEffect = element.useEffect;
	var Spinner  = components.Spinner;

	var PER_PAGE = 20;

	function useDebounce( value, delay ) {
		var s = useState( value );
		var debounced = s[0]; var set = s[1];
		useEffect( function() {
			var t = setTimeout( function() { set( value ); }, delay );
			return function() { clearTimeout( t ); };
		}, [ value, delay ] );
		return debounced;
	}

	function thSort( label, field, sort, toggleSort ) {
		var active  = sort.field === field;
		var classes = 'manage-column column-' + field + ( active ? ' sorted ' + sort.dir : ' sortable asc' );
		var indicator = active ? ( sort.dir === 'asc' ? '▲' : '▼' ) : '▲';
		return el( 'th', { scope: 'col', className: classes },
			el( 'a', { href: '#', onClick: function(e){ e.preventDefault(); toggleSort( field ); } },
				el( 'span', null, label ),
				el( 'span', { className: 'sorting-indicator', 'aria-hidden': 'true' }, indicator )
			)
		);
	}

	function EventsList() {
		var ss = useState( '' );   var search = ss[0]; var setSearch = ss[1];
		var ps = useState( 1 );   var page   = ps[0]; var setPage   = ps[1];
		var os = useState( { field: 'event_date', dir: 'asc' } );
		var sort = os[0]; var setSort = os[1];
		var ds = useState( null ); var data    = ds[0]; var setData    = ds[1];
		var ts = useState( 0 );   var total   = ts[0]; var setTotal   = ts[1];
		var ls = useState( true ); var loading = ls[0]; var setLoading = ls[1];

		var debouncedSearch = useDebounce( search, 300 );
		useEffect( function() { setPage( 1 ); }, [ debouncedSearch ] );

		useEffect( function() {
			setLoading( true );
			var params = [
				'status=publish,draft,pending,private',
				'per_page=' + PER_PAGE,
				'page=' + page,
				'_fields=id,title,meta,link,status',
			];
			if ( debouncedSearch ) params.push( 'search=' + encodeURIComponent( debouncedSearch ) );
			if ( sort.field === 'event_date' ) {
				params.push( 'orderby=meta_value', 'meta_key=event_date', 'order=' + sort.dir );
			} else {
				params.push( 'orderby=title', 'order=' + sort.dir );
			}
			apiFetch( { path: '/wp/v2/event?' + params.join( '&' ), parse: false } )
				.then( function( r ) { setTotal( parseInt( r.headers.get( 'X-WP-Total' ) || '0', 10 ) ); return r.json(); } )
				.then( function( events ) {
					var ids = [];
					events.forEach( function( ev ) {
						var sids; try { sids = JSON.parse( ev.meta.event_speakers || '[]' ); } catch(e) { sids = []; }
						sids.forEach( function( id ) { if ( ids.indexOf( id ) === -1 ) ids.push( id ); } );
					} );
					if ( ! ids.length ) {
						events.forEach( function( ev ) { ev._speakerNames = ''; } );
						setData( events ); setLoading( false ); return;
					}
					apiFetch( { path: '/wp/v2/speaker?include=' + ids.join( ',' ) + '&per_page=100&_fields=id,title' } )
						.then( function( speakers ) {
							var map = {};
							speakers.forEach( function( s ) { map[ s.id ] = s.title && s.title.rendered ? s.title.rendered : ''; } );
							events.forEach( function( ev ) {
								var sids; try { sids = JSON.parse( ev.meta.event_speakers || '[]' ); } catch(e) { sids = []; }
								ev._speakerNames = sids.map( function( id ) { return map[ id ] || ''; } ).filter( Boolean ).join( ', ' );
							} );
							setData( events ); setLoading( false );
						} );
				} )
				.catch( function() { setLoading( false ); } );
		}, [ page, sort, debouncedSearch ] );

		function toggleSort( field ) {
			setSort( function( prev ) {
				return prev.field === field
					? { field: field, dir: prev.dir === 'asc' ? 'desc' : 'asc' }
					: { field: field, dir: 'asc' };
			} );
		}

		var totalPages = Math.ceil( total / PER_PAGE );

		return el( 'div', null,

			/* Search box */
			el( 'p', { className: 'es-search-box' },
				el( 'label', { className: 'screen-reader-text', htmlFor: 'es-search-input' }, 'Search events' ),
				el( 'input', { type: 'search', id: 'es-search-input', className: 'regular-text', placeholder: 'Search events\u2026', value: search, onChange: function(e){ setSearch( e.target.value ); } } ),
				el( 'input', { type: 'button', className: 'button', value: 'Search', onClick: function(){} } )
			),

			/* Table */
			el( 'table', { className: 'wp-list-table widefat fixed striped posts' },
				el( 'thead', null,
					el( 'tr', null,
						thSort( 'Title', 'title', sort, toggleSort ),
						thSort( 'Date', 'event_date', sort, toggleSort ),
						el( 'th', { scope: 'col', className: 'manage-column' }, 'Time' ),
						el( 'th', { scope: 'col', className: 'manage-column' }, 'Speakers' )
					)
				),
				el( 'tbody', null,
					loading
						? el( 'tr', { className: 'es-list-loading' }, el( 'td', { colSpan: 4 }, el( Spinner ) ) )
						: ( ! data || ! data.length )
							? el( 'tr', null, el( 'td', { colSpan: 4 }, 'No events found.' ) )
							: data.map( function( ev ) {
								var editUrl = esAdminList.editBase + '?page=' + esAdminList.editPage + '&post=' + ev.id;
								var meta    = ev.meta || {};
								var date    = meta.event_date;
								var start   = meta.event_start_time;
								var end     = meta.event_end_time;
								var dateStr = date ? new Date( date + 'T12:00:00' ).toLocaleDateString( undefined, { year: 'numeric', month: 'short', day: 'numeric' } ) : '\u2014';
								var timeStr = start ? ( start + ( end ? '\u2013' + end : '' ) ) : '\u2014';

								return el( 'tr', { key: String( ev.id ) },
									el( 'td', { className: 'column-title column-primary' },
										el( 'strong', null, el( 'a', { href: editUrl, className: 'row-title' }, ev.title && ev.title.rendered ? ev.title.rendered : '(no title)' ) ),
										ev.status === 'draft' ? el( 'span', { className: 'post-state' }, ' \u2014 Draft' ) : null,
										el( 'div', { className: 'row-actions' },
											el( 'span', { className: 'edit' }, el( 'a', { href: editUrl }, 'Edit' ) ),
											el( 'span', null, ' | ' ),
											el( 'span', { className: 'view' }, el( 'a', { href: ev.link, target: '_blank', rel: 'noreferrer' }, 'View' ) )
										)
									),
									el( 'td', { className: 'column-event_date' }, dateStr ),
									el( 'td', { className: 'column-event_time' }, timeStr ),
									el( 'td', { className: 'column-event_speakers' }, ev._speakerNames || '\u2014' )
								);
							} )
				),
				el( 'tfoot', null,
					el( 'tr', null,
						thSort( 'Title', 'title', sort, toggleSort ),
						thSort( 'Date', 'event_date', sort, toggleSort ),
						el( 'th', { scope: 'col', className: 'manage-column' }, 'Time' ),
						el( 'th', { scope: 'col', className: 'manage-column' }, 'Speakers' )
					)
				)
			),

			/* Pagination */
			totalPages > 1 && ! loading ? el( 'div', { className: 'tablenav bottom' },
				el( 'div', { className: 'tablenav-pages' },
					el( 'span', { className: 'displaying-num' }, total + ' items' ),
					el( 'span', { className: 'pagination-links' },
						el( 'button', { className: 'button tablenav-pages-navspan', disabled: page <= 1, onClick: function(){ setPage(1); } }, '\u00ab' ),
						el( 'button', { className: 'button tablenav-pages-navspan', disabled: page <= 1, onClick: function(){ setPage( function(p){ return p - 1; } ); } }, '\u2039' ),
						el( 'span', { className: 'paging-input' }, page + ' of ' + totalPages ),
						el( 'button', { className: 'button tablenav-pages-navspan', disabled: page >= totalPages, onClick: function(){ setPage( function(p){ return p + 1; } ); } }, '\u203a' ),
						el( 'button', { className: 'button tablenav-pages-navspan', disabled: page >= totalPages, onClick: function(){ setPage( totalPages ); } }, '\u00bb' )
					)
				)
			) : null
		);
	}

	var root = document.getElementById( 'es-admin-list-root' );
	if ( root ) {
		wp.element.createRoot ? wp.element.createRoot( root ).render( el( EventsList ) ) : wp.element.render( el( EventsList ), root );
	}
} )( window.wp.element, window.wp.components, window.wp.apiFetch );
JS;
	}

	private static function speakers_script(): string {
		return <<<'JS'
( function( element, components, apiFetch ) {
	var el       = element.createElement;
	var useState = element.useState;
	var useEffect = element.useEffect;
	var Spinner  = components.Spinner;

	var PER_PAGE = 20;

	function useDebounce( value, delay ) {
		var s = useState( value );
		var debounced = s[0]; var set = s[1];
		useEffect( function() {
			var t = setTimeout( function() { set( value ); }, delay );
			return function() { clearTimeout( t ); };
		}, [ value, delay ] );
		return debounced;
	}

	function thSort( label, field, sort, toggleSort ) {
		var active  = sort.field === field;
		var classes = 'manage-column column-' + field + ( active ? ' sorted ' + sort.dir : ' sortable asc' );
		var indicator = active ? ( sort.dir === 'asc' ? '▲' : '▼' ) : '▲';
		return el( 'th', { scope: 'col', className: classes },
			el( 'a', { href: '#', onClick: function(e){ e.preventDefault(); toggleSort( field ); } },
				el( 'span', null, label ),
				el( 'span', { className: 'sorting-indicator', 'aria-hidden': 'true' }, indicator )
			)
		);
	}

	function SpeakersList() {
		var ss = useState( '' );   var search = ss[0]; var setSearch = ss[1];
		var ps = useState( 1 );   var page   = ps[0]; var setPage   = ps[1];
		var os = useState( { field: 'title', dir: 'asc' } );
		var sort = os[0]; var setSort = os[1];
		var ds = useState( null ); var data    = ds[0]; var setData    = ds[1];
		var ts = useState( 0 );   var total   = ts[0]; var setTotal   = ts[1];
		var ls = useState( true ); var loading = ls[0]; var setLoading = ls[1];

		var debouncedSearch = useDebounce( search, 300 );
		useEffect( function() { setPage( 1 ); }, [ debouncedSearch ] );

		useEffect( function() {
			setLoading( true );
			var params = [
				'status=publish,draft,pending,private',
				'per_page=' + PER_PAGE,
				'page=' + page,
				'_fields=id,title,meta,link,status',
				'orderby=title',
				'order=' + sort.dir,
			];
			if ( debouncedSearch ) params.push( 'search=' + encodeURIComponent( debouncedSearch ) );

			apiFetch( { path: '/wp/v2/speaker?' + params.join( '&' ), parse: false } )
				.then( function( r ) { setTotal( parseInt( r.headers.get( 'X-WP-Total' ) || '0', 10 ) ); return r.json(); } )
				.then( function( speakers ) {
					var fetches = speakers.map( function( sp ) {
						return apiFetch( { path: '/wp/v2/event?speaker_filter=' + sp.id + '&per_page=100&_fields=id,title' } )
							.then( function( events ) {
								sp._eventNames = events.map( function( ev ) { return ev.title && ev.title.rendered ? ev.title.rendered : ''; } ).filter( Boolean ).join( ', ' );
							} )
							.catch( function() { sp._eventNames = ''; } );
					} );
					Promise.all( fetches ).then( function() { setData( speakers ); setLoading( false ); } );
				} )
				.catch( function() { setLoading( false ); } );
		}, [ page, sort, debouncedSearch ] );

		function toggleSort( field ) {
			setSort( function( prev ) {
				return prev.field === field
					? { field: field, dir: prev.dir === 'asc' ? 'desc' : 'asc' }
					: { field: field, dir: 'asc' };
			} );
		}

		var totalPages = Math.ceil( total / PER_PAGE );

		return el( 'div', null,

			/* Search box */
			el( 'p', { className: 'es-search-box' },
				el( 'label', { className: 'screen-reader-text', htmlFor: 'es-search-input' }, 'Search speakers' ),
				el( 'input', { type: 'search', id: 'es-search-input', className: 'regular-text', placeholder: 'Search speakers\u2026', value: search, onChange: function(e){ setSearch( e.target.value ); } } ),
				el( 'input', { type: 'button', className: 'button', value: 'Search', onClick: function(){} } )
			),

			/* Table */
			el( 'table', { className: 'wp-list-table widefat fixed striped posts' },
				el( 'thead', null,
					el( 'tr', null,
						thSort( 'Name', 'title', sort, toggleSort ),
						el( 'th', { scope: 'col', className: 'manage-column' }, 'Position' ),
						el( 'th', { scope: 'col', className: 'manage-column' }, 'Events' )
					)
				),
				el( 'tbody', null,
					loading
						? el( 'tr', { className: 'es-list-loading' }, el( 'td', { colSpan: 3 }, el( Spinner ) ) )
						: ( ! data || ! data.length )
							? el( 'tr', null, el( 'td', { colSpan: 3 }, 'No speakers found.' ) )
							: data.map( function( sp ) {
								var editUrl = esAdminList.editBase + '?page=' + esAdminList.editPage + '&post=' + sp.id;
								var meta    = sp.meta || {};

								return el( 'tr', { key: String( sp.id ) },
									el( 'td', { className: 'column-title column-primary' },
										el( 'strong', null, el( 'a', { href: editUrl, className: 'row-title' }, sp.title && sp.title.rendered ? sp.title.rendered : '(no name)' ) ),
										sp.status === 'draft' ? el( 'span', { className: 'post-state' }, ' \u2014 Draft' ) : null,
										el( 'div', { className: 'row-actions' },
											el( 'span', { className: 'edit' }, el( 'a', { href: editUrl }, 'Edit' ) ),
											el( 'span', null, ' | ' ),
											el( 'span', { className: 'view' }, el( 'a', { href: sp.link, target: '_blank', rel: 'noreferrer' }, 'View' ) )
										)
									),
									el( 'td', { className: 'column-speaker_title' }, meta.speaker_title || '\u2014' ),
									el( 'td', { className: 'column-speaker_events' }, sp._eventNames || '\u2014' )
								);
							} )
				),
				el( 'tfoot', null,
					el( 'tr', null,
						thSort( 'Name', 'title', sort, toggleSort ),
						el( 'th', { scope: 'col', className: 'manage-column' }, 'Position' ),
						el( 'th', { scope: 'col', className: 'manage-column' }, 'Events' )
					)
				)
			),

			/* Pagination */
			totalPages > 1 && ! loading ? el( 'div', { className: 'tablenav bottom' },
				el( 'div', { className: 'tablenav-pages' },
					el( 'span', { className: 'displaying-num' }, total + ' items' ),
					el( 'span', { className: 'pagination-links' },
						el( 'button', { className: 'button tablenav-pages-navspan', disabled: page <= 1, onClick: function(){ setPage(1); } }, '\u00ab' ),
						el( 'button', { className: 'button tablenav-pages-navspan', disabled: page <= 1, onClick: function(){ setPage( function(p){ return p - 1; } ); } }, '\u2039' ),
						el( 'span', { className: 'paging-input' }, page + ' of ' + totalPages ),
						el( 'button', { className: 'button tablenav-pages-navspan', disabled: page >= totalPages, onClick: function(){ setPage( function(p){ return p + 1; } ); } }, '\u203a' ),
						el( 'button', { className: 'button tablenav-pages-navspan', disabled: page >= totalPages, onClick: function(){ setPage( totalPages ); } }, '\u00bb' )
					)
				)
			) : null
		);
	}

	var root = document.getElementById( 'es-admin-list-root' );
	if ( root ) {
		wp.element.createRoot ? wp.element.createRoot( root ).render( el( SpeakersList ) ) : wp.element.render( el( SpeakersList ), root );
	}
} )( window.wp.element, window.wp.components, window.wp.apiFetch );
JS;
	}
}
