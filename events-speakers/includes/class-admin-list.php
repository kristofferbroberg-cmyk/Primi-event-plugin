<?php
defined( 'ABSPATH' ) || exit;

class Events_Speakers_Admin_List {

	public static function register_pages(): void {
		add_submenu_page(
			'edit.php?post_type=event',
			__( 'Events', 'events-speakers' ),
			__( 'All Events', 'events-speakers' ),
			'edit_posts',
			'es-events-list',
			array( self::class, 'render_page' )
		);

		add_submenu_page(
			'edit.php?post_type=speaker',
			__( 'Speakers', 'events-speakers' ),
			__( 'All Speakers', 'events-speakers' ),
			'edit_posts',
			'es-speakers-list',
			array( self::class, 'render_page' )
		);

		// Remove the WP-generated default "All Events" / "All Speakers" submenu
		// items so ours become the first (default) entry.
		remove_submenu_page( 'edit.php?post_type=event',   'edit.php?post_type=event' );
		remove_submenu_page( 'edit.php?post_type=speaker', 'edit.php?post_type=speaker' );
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
		echo '<div id="es-admin-list-root"></div>';
	}

	public static function enqueue( string $hook ): void {
		$is_events   = 'event_page_es-events-list' === $hook;
		$is_speakers = 'speaker_page_es-speakers-list' === $hook;

		if ( ! $is_events && ! $is_speakers ) {
			return;
		}

		wp_enqueue_style( 'wp-components' );

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
			'newUrl'   => admin_url( 'admin.php?page=' . $edit_page ),
			'nonce'    => wp_create_nonce( 'wp_rest' ),
		) );
	}

	// Inject table styles via a tiny inline script that adds a <style> tag.
	private static function list_styles(): string {
		return <<<'JS'
( function() {
	var style = document.createElement( 'style' );
	style.textContent = [
		'#es-admin-list-root { margin-top: 20px; }',
		'.es-list-wrap { background: #fff; border: 1px solid #c3c4c7; border-radius: 4px; }',
		'.es-list-toolbar { display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; border-bottom: 1px solid #c3c4c7; gap: 12px; }',
		'.es-list-toolbar input[type=search] { padding: 6px 10px; border: 1px solid #8c8f94; border-radius: 4px; font-size: 13px; width: 240px; }',
		'.es-list-table { width: 100%; border-collapse: collapse; font-size: 13px; }',
		'.es-list-table th { text-align: left; padding: 10px 16px; border-bottom: 1px solid #c3c4c7; font-weight: 600; white-space: nowrap; background: #f6f7f7; }',
		'.es-list-table th.sortable { cursor: pointer; user-select: none; }',
		'.es-list-table th.sortable:hover { color: #2271b1; }',
		'.es-list-table td { padding: 10px 16px; border-bottom: 1px solid #f0f0f1; vertical-align: top; }',
		'.es-list-table tr:last-child td { border-bottom: none; }',
		'.es-list-table tr:hover td { background: #f6f7f7; }',
		'.es-list-table .col-title a { font-weight: 600; color: #2271b1; text-decoration: none; }',
		'.es-list-table .col-title a:hover { text-decoration: underline; }',
		'.es-list-table .row-actions { display: none; font-size: 12px; margin-top: 3px; color: #646970; }',
		'.es-list-table tr:hover .row-actions { display: block; }',
		'.es-list-table .row-actions a { color: #2271b1; text-decoration: none; margin-right: 8px; }',
		'.es-list-table .row-actions a:hover { text-decoration: underline; }',
		'.es-list-table .muted { color: #757575; }',
		'.es-list-table .status-draft { color: #646970; font-style: italic; font-size: 12px; }',
		'.es-list-pagination { display: flex; align-items: center; justify-content: space-between; padding: 10px 16px; border-top: 1px solid #c3c4c7; font-size: 13px; color: #646970; }',
		'.es-list-pagination .page-buttons { display: flex; gap: 4px; align-items: center; }',
		'.es-list-spinner { padding: 48px; text-align: center; }',
		'.es-list-empty { padding: 32px 16px; text-align: center; color: #646970; }',
	].join( '\n' );
	document.head.appendChild( style );
} )();
JS;
	}

	private static function events_script(): string {
		return <<<'JS'
( function( element, components, apiFetch ) {
	var el         = element.createElement;
	var useState   = element.useState;
	var useEffect  = element.useEffect;
	var useRef     = element.useRef;
	var Button     = components.Button;
	var Spinner    = components.Spinner;

	var PER_PAGE = 20;

	function useDebounce( value, delay ) {
		var state = useState( value );
		var debounced = state[0]; var setDebounced = state[1];
		useEffect( function() {
			var t = setTimeout( function() { setDebounced( value ); }, delay );
			return function() { clearTimeout( t ); };
		}, [ value, delay ] );
		return debounced;
	}

	function EventsList() {
		var searchState  = useState( '' );
		var search = searchState[0]; var setSearch = searchState[1];
		var pageState    = useState( 1 );
		var page = pageState[0]; var setPage = pageState[1];
		var sortState    = useState( { field: 'event_date', dir: 'asc' } );
		var sort = sortState[0]; var setSort = sortState[1];
		var dataState    = useState( null );
		var data = dataState[0]; var setData = dataState[1];
		var totalState   = useState( 0 );
		var total = totalState[0]; var setTotal = totalState[1];
		var loadingState = useState( true );
		var loading = loadingState[0]; var setLoading = loadingState[1];

		var debouncedSearch = useDebounce( search, 300 );

		useEffect( function() {
			setPage( 1 );
		}, [ debouncedSearch ] );

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
				params.push( 'orderby=meta_value' );
				params.push( 'meta_key=event_date' );
				params.push( 'order=' + sort.dir );
			} else if ( sort.field === 'title' ) {
				params.push( 'orderby=title' );
				params.push( 'order=' + sort.dir );
			}

			apiFetch( { path: '/wp/v2/event?' + params.join( '&' ), parse: false } )
				.then( function( response ) {
					setTotal( parseInt( response.headers.get( 'X-WP-Total' ) || '0', 10 ) );
					return response.json();
				} )
				.then( function( events ) {
					var speakerIds = [];
					events.forEach( function( ev ) {
						var ids;
						try { ids = JSON.parse( ( ev.meta && ev.meta.event_speakers ) || '[]' ); } catch(e) { ids = []; }
						ids.forEach( function( id ) { if ( speakerIds.indexOf( id ) === -1 ) speakerIds.push( id ); } );
					} );
					if ( speakerIds.length === 0 ) {
						events.forEach( function( ev ) { ev._speakerNames = ''; } );
						setData( events );
						setLoading( false );
						return;
					}
					apiFetch( { path: '/wp/v2/speaker?include=' + speakerIds.join( ',' ) + '&per_page=100&_fields=id,title' } )
						.then( function( speakers ) {
							var nameMap = {};
							speakers.forEach( function( s ) { nameMap[ s.id ] = s.title && s.title.rendered ? s.title.rendered : ''; } );
							events.forEach( function( ev ) {
								var ids;
								try { ids = JSON.parse( ( ev.meta && ev.meta.event_speakers ) || '[]' ); } catch(e) { ids = []; }
								ev._speakerNames = ids.map( function( id ) { return nameMap[ id ] || ''; } ).filter( Boolean ).join( ', ' );
							} );
							setData( events );
							setLoading( false );
						} );
				} )
				.catch( function() { setLoading( false ); } );
		}, [ page, sort, debouncedSearch ] );

		function toggleSort( field ) {
			setSort( function( prev ) {
				if ( prev.field === field ) {
					return { field: field, dir: prev.dir === 'asc' ? 'desc' : 'asc' };
				}
				return { field: field, dir: 'asc' };
			} );
		}

		function sortIndicator( field ) {
			if ( sort.field !== field ) return ' ↕';
			return sort.dir === 'asc' ? ' ↑' : ' ↓';
		}

		var totalPages = Math.ceil( total / PER_PAGE );

		return el( 'div', null,
			el( 'div', { className: 'es-list-wrap' },
				el( 'div', { className: 'es-list-toolbar' },
					el( 'input', {
						type: 'search',
						placeholder: 'Search events…',
						value: search,
						onChange: function( e ) { setSearch( e.target.value ); },
					} ),
					el( Button, { variant: 'primary', href: esAdminList.newUrl }, 'Add New Event' )
				),
				loading
					? el( 'div', { className: 'es-list-spinner' }, el( Spinner ) )
					: ( ! data || data.length === 0
						? el( 'div', { className: 'es-list-empty' }, 'No events found.' )
						: el( 'table', { className: 'es-list-table' },
							el( 'thead', null,
								el( 'tr', null,
									el( 'th', { className: 'col-title sortable', onClick: function() { toggleSort( 'title' ); } }, 'Title' + sortIndicator( 'title' ) ),
									el( 'th', { className: 'sortable', onClick: function() { toggleSort( 'event_date' ); } }, 'Date' + sortIndicator( 'event_date' ) ),
									el( 'th', null, 'Time' ),
									el( 'th', null, 'Speakers' )
								)
							),
							el( 'tbody', null,
								data.map( function( ev ) {
									var editUrl = esAdminList.editBase + '?page=' + esAdminList.editPage + '&post=' + ev.id;
									var meta    = ev.meta || {};
									var date    = meta.event_date;
									var start   = meta.event_start_time;
									var end     = meta.event_end_time;
									var dateStr = date ? new Date( date + 'T12:00:00' ).toLocaleDateString( undefined, { year: 'numeric', month: 'short', day: 'numeric' } ) : null;
									var timeStr = start ? ( start + ( end ? '–' + end : '' ) ) : null;

									return el( 'tr', { key: String( ev.id ) },
										el( 'td', { className: 'col-title' },
											el( 'a', { href: editUrl }, ev.title && ev.title.rendered ? ev.title.rendered : '(no title)' ),
											ev.status === 'draft' ? el( 'span', { className: 'status-draft' }, ' — Draft' ) : null,
											el( 'div', { className: 'row-actions' },
												el( 'a', { href: editUrl }, 'Edit' ),
												el( 'a', { href: ev.link, target: '_blank' }, 'View' )
											)
										),
										el( 'td', null, dateStr || el( 'span', { className: 'muted' }, '—' ) ),
										el( 'td', null, timeStr || el( 'span', { className: 'muted' }, '—' ) ),
										el( 'td', null, ev._speakerNames || el( 'span', { className: 'muted' }, '—' ) )
									);
								} )
							)
						)
					),
				totalPages > 1 && ! loading
					? el( 'div', { className: 'es-list-pagination' },
						el( 'span', null, total + ' items' ),
						el( 'div', { className: 'page-buttons' },
							el( Button, { variant: 'secondary', isSmall: true, disabled: page <= 1, onClick: function() { setPage( 1 ); } }, '«' ),
							el( Button, { variant: 'secondary', isSmall: true, disabled: page <= 1, onClick: function() { setPage( function(p) { return p - 1; } ); } }, '‹' ),
							el( 'span', null, 'Page ' + page + ' of ' + totalPages ),
							el( Button, { variant: 'secondary', isSmall: true, disabled: page >= totalPages, onClick: function() { setPage( function(p) { return p + 1; } ); } }, '›' ),
							el( Button, { variant: 'secondary', isSmall: true, disabled: page >= totalPages, onClick: function() { setPage( totalPages ); } }, '»' )
						)
					)
					: null
			)
		);
	}

	var root = document.getElementById( 'es-admin-list-root' );
	if ( root ) {
		if ( wp.element.createRoot ) {
			wp.element.createRoot( root ).render( el( EventsList ) );
		} else {
			wp.element.render( el( EventsList ), root );
		}
	}
} )(
	window.wp.element,
	window.wp.components,
	window.wp.apiFetch
);
JS;
	}

	private static function speakers_script(): string {
		return <<<'JS'
( function( element, components, apiFetch ) {
	var el         = element.createElement;
	var useState   = element.useState;
	var useEffect  = element.useEffect;
	var Button     = components.Button;
	var Spinner    = components.Spinner;

	var PER_PAGE = 20;

	function useDebounce( value, delay ) {
		var state = useState( value );
		var debounced = state[0]; var setDebounced = state[1];
		useEffect( function() {
			var t = setTimeout( function() { setDebounced( value ); }, delay );
			return function() { clearTimeout( t ); };
		}, [ value, delay ] );
		return debounced;
	}

	function SpeakersList() {
		var searchState  = useState( '' );
		var search = searchState[0]; var setSearch = searchState[1];
		var pageState    = useState( 1 );
		var page = pageState[0]; var setPage = pageState[1];
		var sortState    = useState( { field: 'title', dir: 'asc' } );
		var sort = sortState[0]; var setSort = sortState[1];
		var dataState    = useState( null );
		var data = dataState[0]; var setData = dataState[1];
		var totalState   = useState( 0 );
		var total = totalState[0]; var setTotal = totalState[1];
		var loadingState = useState( true );
		var loading = loadingState[0]; var setLoading = loadingState[1];

		var debouncedSearch = useDebounce( search, 300 );

		useEffect( function() {
			setPage( 1 );
		}, [ debouncedSearch ] );

		useEffect( function() {
			setLoading( true );
			var params = [
				'status=publish,draft,pending,private',
				'per_page=' + PER_PAGE,
				'page=' + page,
				'_fields=id,title,meta,link,status',
			];
			if ( debouncedSearch ) params.push( 'search=' + encodeURIComponent( debouncedSearch ) );
			if ( sort.field === 'title' ) {
				params.push( 'orderby=title' );
				params.push( 'order=' + sort.dir );
			}

			apiFetch( { path: '/wp/v2/speaker?' + params.join( '&' ), parse: false } )
				.then( function( response ) {
					setTotal( parseInt( response.headers.get( 'X-WP-Total' ) || '0', 10 ) );
					return response.json();
				} )
				.then( function( speakers ) {
					var fetches = speakers.map( function( sp ) {
						return apiFetch( { path: '/wp/v2/event?speaker_filter=' + sp.id + '&per_page=100&_fields=id,title' } )
							.then( function( events ) {
								sp._eventNames = events.map( function( ev ) {
									return ev.title && ev.title.rendered ? ev.title.rendered : '';
								} ).filter( Boolean ).join( ', ' );
							} )
							.catch( function() { sp._eventNames = ''; } );
					} );
					Promise.all( fetches ).then( function() {
						setData( speakers );
						setLoading( false );
					} );
				} )
				.catch( function() { setLoading( false ); } );
		}, [ page, sort, debouncedSearch ] );

		function toggleSort( field ) {
			setSort( function( prev ) {
				if ( prev.field === field ) {
					return { field: field, dir: prev.dir === 'asc' ? 'desc' : 'asc' };
				}
				return { field: field, dir: 'asc' };
			} );
		}

		function sortIndicator( field ) {
			if ( sort.field !== field ) return ' ↕';
			return sort.dir === 'asc' ? ' ↑' : ' ↓';
		}

		var totalPages = Math.ceil( total / PER_PAGE );

		return el( 'div', null,
			el( 'div', { className: 'es-list-wrap' },
				el( 'div', { className: 'es-list-toolbar' },
					el( 'input', {
						type: 'search',
						placeholder: 'Search speakers…',
						value: search,
						onChange: function( e ) { setSearch( e.target.value ); },
					} ),
					el( Button, { variant: 'primary', href: esAdminList.newUrl }, 'Add New Speaker' )
				),
				loading
					? el( 'div', { className: 'es-list-spinner' }, el( Spinner ) )
					: ( ! data || data.length === 0
						? el( 'div', { className: 'es-list-empty' }, 'No speakers found.' )
						: el( 'table', { className: 'es-list-table' },
							el( 'thead', null,
								el( 'tr', null,
									el( 'th', { className: 'col-title sortable', onClick: function() { toggleSort( 'title' ); } }, 'Name' + sortIndicator( 'title' ) ),
									el( 'th', null, 'Position' ),
									el( 'th', null, 'Events' )
								)
							),
							el( 'tbody', null,
								data.map( function( sp ) {
									var editUrl = esAdminList.editBase + '?page=' + esAdminList.editPage + '&post=' + sp.id;
									var meta    = sp.meta || {};

									return el( 'tr', { key: String( sp.id ) },
										el( 'td', { className: 'col-title' },
											el( 'a', { href: editUrl }, sp.title && sp.title.rendered ? sp.title.rendered : '(no name)' ),
											sp.status === 'draft' ? el( 'span', { className: 'status-draft' }, ' — Draft' ) : null,
											el( 'div', { className: 'row-actions' },
												el( 'a', { href: editUrl }, 'Edit' ),
												el( 'a', { href: sp.link, target: '_blank' }, 'View' )
											)
										),
										el( 'td', null, meta.speaker_title || el( 'span', { className: 'muted' }, '—' ) ),
										el( 'td', null, sp._eventNames || el( 'span', { className: 'muted' }, '—' ) )
									);
								} )
							)
						)
					),
				totalPages > 1 && ! loading
					? el( 'div', { className: 'es-list-pagination' },
						el( 'span', null, total + ' items' ),
						el( 'div', { className: 'page-buttons' },
							el( Button, { variant: 'secondary', isSmall: true, disabled: page <= 1, onClick: function() { setPage( 1 ); } }, '«' ),
							el( Button, { variant: 'secondary', isSmall: true, disabled: page <= 1, onClick: function() { setPage( function(p) { return p - 1; } ); } }, '‹' ),
							el( 'span', null, 'Page ' + page + ' of ' + totalPages ),
							el( Button, { variant: 'secondary', isSmall: true, disabled: page >= totalPages, onClick: function() { setPage( function(p) { return p + 1; } ); } }, '›' ),
							el( Button, { variant: 'secondary', isSmall: true, disabled: page >= totalPages, onClick: function() { setPage( totalPages ); } }, '»' )
						)
					)
					: null
			)
		);
	}

	var root = document.getElementById( 'es-admin-list-root' );
	if ( root ) {
		if ( wp.element.createRoot ) {
			wp.element.createRoot( root ).render( el( SpeakersList ) );
		} else {
			wp.element.render( el( SpeakersList ), root );
		}
	}
} )(
	window.wp.element,
	window.wp.components,
	window.wp.apiFetch
);
JS;
	}
}
