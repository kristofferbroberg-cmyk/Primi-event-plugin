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
	 * Redirect the default list table URLs to our custom DataViews pages.
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
		echo '<div id="es-admin-list-root" style="margin-top:24px;"></div>';
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
			array( 'wp-element', 'wp-components', 'wp-dataviews', 'wp-api-fetch', 'wp-i18n', 'wp-url' ),
			null,
			true
		);
		wp_enqueue_script( 'es-admin-list' );

		$post_type = $is_events ? 'event' : 'speaker';
		wp_add_inline_script(
			'es-admin-list',
			$is_events ? self::events_script() : self::speakers_script()
		);

		$edit_page = $is_events ? 'es-edit-event' : 'es-edit-speaker';
		wp_localize_script( 'es-admin-list', 'esAdminList', array(
			'postType' => $post_type,
			'editBase' => admin_url( 'admin.php' ),
			'editPage' => $edit_page,
			'newUrl'   => admin_url( 'admin.php?page=' . $edit_page ),
			'nonce'    => wp_create_nonce( 'wp_rest' ),
		) );
	}

	private static function events_script(): string {
		return <<<'JS'
( function( element, components, dataViews, apiFetch ) {
	var el         = element.createElement;
	var useState   = element.useState;
	var useEffect  = element.useEffect;
	var DataViews  = dataViews.DataViews;
	var Button     = components.Button;
	var Spinner    = components.Spinner;

	var DEFAULT_VIEW = {
		type: 'list',
		page: 1,
		perPage: 20,
		sort: { field: 'event_date', direction: 'asc' },
		filters: [],
		search: '',
		fields: [ 'event_date', 'event_time', 'event_speakers' ],
	};

	var FIELDS = [
		{
			id: 'title',
			label: 'Title',
			enableSorting: true,
			enableHiding: false,
			render: function( ref ) {
				var item = ref.item;
				var url = esAdminList.editBase + '?page=' + esAdminList.editPage + '&post=' + item.id;
				return el( 'a', { href: url, style: { fontWeight: 600 } }, item.title.rendered );
			},
		},
		{
			id: 'event_date',
			label: 'Date',
			enableSorting: true,
			getValue: function( ref ) { return ref.item.meta && ref.item.meta.event_date || ''; },
			render: function( ref ) {
				var val = ref.item.meta && ref.item.meta.event_date;
				if ( ! val ) return el( 'span', { style: { color: '#757575' } }, '—' );
				var d = new Date( val + 'T12:00:00' );
				return d.toLocaleDateString( undefined, { year: 'numeric', month: 'short', day: 'numeric' } );
			},
		},
		{
			id: 'event_time',
			label: 'Time',
			enableSorting: false,
			render: function( ref ) {
				var meta  = ref.item.meta || {};
				var start = meta.event_start_time;
				var end   = meta.event_end_time;
				if ( ! start ) return el( 'span', { style: { color: '#757575' } }, '—' );
				return ( start + ( end ? '–' + end : '' ) );
			},
		},
		{
			id: 'event_speakers',
			label: 'Speakers',
			enableSorting: false,
			render: function( ref ) {
				var meta = ref.item.meta || {};
				var raw  = meta.event_speakers;
				var ids;
				try { ids = JSON.parse( raw || '[]' ); } catch(e) { ids = []; }
				var names = ref.item._speakerNames;
				if ( ! names ) return el( 'span', { style: { color: '#757575' } }, ids.length ? '…' : '—' );
				return names || el( 'span', { style: { color: '#757575' } }, '—' );
			},
		},
	];

	function EventsList() {
		var viewState   = useState( DEFAULT_VIEW );
		var view        = viewState[0]; var setView = viewState[1];
		var dataState   = useState( null );
		var data        = dataState[0]; var setData = dataState[1];
		var totalState  = useState( 0 );
		var total       = totalState[0]; var setTotal = totalState[1];
		var loadingState = useState( true );
		var loading     = loadingState[0]; var setLoading = loadingState[1];

		useEffect( function() {
			setLoading( true );
			var params = [
				'status=publish,draft,pending,private',
				'per_page=' + view.perPage,
				'page=' + view.page,
				'_fields=id,title,meta,link,status',
			];
			if ( view.search ) params.push( 'search=' + encodeURIComponent( view.search ) );
			if ( view.sort && view.sort.field === 'event_date' ) {
				params.push( 'orderby=meta_value' );
				params.push( 'meta_key=event_date' );
				params.push( 'order=' + ( view.sort.direction === 'desc' ? 'desc' : 'asc' ) );
			}
			apiFetch( {
				path: '/wp/v2/event?' + params.join( '&' ),
				parse: false,
			} ).then( function( response ) {
				setTotal( parseInt( response.headers.get( 'X-WP-Total' ) || '0', 10 ) );
				return response.json();
			} ).then( function( events ) {
				// Resolve speaker names for each event.
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
			} ).catch( function() { setLoading( false ); } );
		}, [ view.page, view.perPage, view.sort, view.search ] );

		return el( 'div', { style: { padding: '0 16px' } },
			el( 'div', { style: { display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' } },
				el( Button, { variant: 'primary', href: esAdminList.newUrl }, 'Add New Event' )
			),
			loading
				? el( 'div', { style: { padding: '48px', textAlign: 'center' } }, el( Spinner ) )
				: el( DataViews, {
					data: data || [],
					fields: FIELDS,
					view: view,
					onChangeView: setView,
					paginationInfo: { totalItems: total, totalPages: Math.ceil( total / view.perPage ) },
					actions: [
						{
							id: 'edit',
							label: 'Edit',
							isPrimary: true,
							callback: function( items ) {
								window.location.href = esAdminList.editBase + '?page=' + esAdminList.editPage + '&post=' + items[0].id;
							},
						},
						{
							id: 'view',
							label: 'View',
							callback: function( items ) { window.open( items[0].link, '_blank' ); },
						},
					],
					getItemId: function( item ) { return String( item.id ); },
				} )
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
	window.wp.dataViews,
	window.wp.apiFetch
);
JS;
	}

	private static function speakers_script(): string {
		return <<<'JS'
( function( element, components, dataViews, apiFetch ) {
	var el         = element.createElement;
	var useState   = element.useState;
	var useEffect  = element.useEffect;
	var DataViews  = dataViews.DataViews;
	var Button     = components.Button;
	var Spinner    = components.Spinner;

	var DEFAULT_VIEW = {
		type: 'list',
		page: 1,
		perPage: 20,
		sort: { field: 'title', direction: 'asc' },
		filters: [],
		search: '',
		fields: [ 'speaker_title', 'speaker_events' ],
	};

	var FIELDS = [
		{
			id: 'title',
			label: 'Name',
			enableSorting: true,
			enableHiding: false,
			render: function( ref ) {
				var item = ref.item;
				var url = esAdminList.editBase + '?page=' + esAdminList.editPage + '&post=' + item.id;
				return el( 'a', { href: url, style: { fontWeight: 600 } }, item.title.rendered );
			},
		},
		{
			id: 'speaker_title',
			label: 'Position',
			enableSorting: false,
			render: function( ref ) {
				var val = ref.item.meta && ref.item.meta.speaker_title;
				return val || el( 'span', { style: { color: '#757575' } }, '—' );
			},
		},
		{
			id: 'speaker_events',
			label: 'Events',
			enableSorting: false,
			render: function( ref ) {
				var names = ref.item._eventNames;
				if ( names === undefined ) return el( 'span', { style: { color: '#757575' } }, '…' );
				return names || el( 'span', { style: { color: '#757575' } }, '—' );
			},
		},
	];

	function SpeakersList() {
		var viewState    = useState( DEFAULT_VIEW );
		var view         = viewState[0]; var setView = viewState[1];
		var dataState    = useState( null );
		var data         = dataState[0]; var setData = dataState[1];
		var totalState   = useState( 0 );
		var total        = totalState[0]; var setTotal = totalState[1];
		var loadingState = useState( true );
		var loading      = loadingState[0]; var setLoading = loadingState[1];

		useEffect( function() {
			setLoading( true );
			var params = [
				'status=publish,draft,pending,private',
				'per_page=' + view.perPage,
				'page=' + view.page,
				'_fields=id,title,meta,link',
			];
			if ( view.search ) params.push( 'search=' + encodeURIComponent( view.search ) );
			if ( view.sort && view.sort.field === 'title' ) {
				params.push( 'orderby=title' );
				params.push( 'order=' + ( view.sort.direction === 'desc' ? 'desc' : 'asc' ) );
			}
			apiFetch( {
				path: '/wp/v2/speaker?' + params.join( '&' ),
				parse: false,
			} ).then( function( response ) {
				setTotal( parseInt( response.headers.get( 'X-WP-Total' ) || '0', 10 ) );
				return response.json();
			} ).then( function( speakers ) {
				// For each speaker, fetch their events via speaker_filter param.
				var fetches = speakers.map( function( sp ) {
					return apiFetch( { path: '/wp/v2/event?speaker_filter=' + sp.id + '&per_page=100&_fields=id,title' } )
						.then( function( events ) {
							sp._eventNames = events.map( function( ev ) {
								return ev.title && ev.title.rendered ? ev.title.rendered : '';
							} ).filter( Boolean ).join( ', ' );
						} ).catch( function() { sp._eventNames = ''; } );
				} );
				Promise.all( fetches ).then( function() {
					setData( speakers );
					setLoading( false );
				} );
			} ).catch( function() { setLoading( false ); } );
		}, [ view.page, view.perPage, view.sort, view.search ] );

		return el( 'div', { style: { padding: '0 16px' } },
			el( 'div', { style: { display: 'flex', justifyContent: 'flex-end', marginBottom: '16px' } },
				el( Button, { variant: 'primary', href: esAdminList.newUrl }, 'Add New Speaker' )
			),
			loading
				? el( 'div', { style: { padding: '48px', textAlign: 'center' } }, el( Spinner ) )
				: el( DataViews, {
					data: data || [],
					fields: FIELDS,
					view: view,
					onChangeView: setView,
					paginationInfo: { totalItems: total, totalPages: Math.ceil( total / view.perPage ) },
					actions: [
						{
							id: 'edit',
							label: 'Edit',
							isPrimary: true,
							callback: function( items ) {
								window.location.href = esAdminList.editBase + '?page=' + esAdminList.editPage + '&post=' + items[0].id;
							},
						},
						{
							id: 'view',
							label: 'View',
							callback: function( items ) { window.open( items[0].link, '_blank' ); },
						},
					],
					getItemId: function( item ) { return String( item.id ); },
				} )
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
	window.wp.dataViews,
	window.wp.apiFetch
);
JS;
	}
}
