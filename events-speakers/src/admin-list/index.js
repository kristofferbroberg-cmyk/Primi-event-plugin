import { DataViews } from '@wordpress/dataviews';
import { useState, useEffect, useCallback } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';

import '@wordpress/dataviews/build-style/style.css';

const { postType, editBase, editPage, newUrl } = window.esAdminList;

const PER_PAGE = 20;

const isEvent = postType === 'event';

const TITLE     = isEvent ? __( 'Events', 'events-speakers' ) : __( 'Speakers', 'events-speakers' );
const ADD_LABEL = isEvent ? __( 'Add New Event', 'events-speakers' ) : __( 'Add New Speaker', 'events-speakers' );

// Visible column IDs — status is a filter-only field, not a column.
const EVENT_FIELD_IDS   = [ 'title', 'event_date', 'event_time', 'speakers' ];
const SPEAKER_FIELD_IDS = [ 'title', 'speaker_title' ];

const DEFAULT_VIEW = {
	type: 'table',
	perPage: PER_PAGE,
	page: 1,
	search: '',
	sort: {
		field: isEvent ? 'event_date' : 'title',
		direction: 'asc',
	},
	filters: [],
	fields: isEvent ? EVENT_FIELD_IDS : SPEAKER_FIELD_IDS,
};

// Grid layout enabled so the user can switch via the view toggle.
const DEFAULT_LAYOUTS = { table: {}, grid: {} };

// ─── Status field (shared) — shows as primary tab filter ──────────────────────

const STATUS_FIELD = {
	id: 'status',
	label: __( 'Status', 'events-speakers' ),
	enableSorting: false,
	getValue: ( { item } ) => item.status,
	elements: [
		{ value: 'publish', label: __( 'Published', 'events-speakers' ) },
		{ value: 'draft',   label: __( 'Draft',     'events-speakers' ) },
	],
	filterBy: {
		operators: [ 'isAny' ],
		isPrimary: true,
	},
};

// ─── Events ───────────────────────────────────────────────────────────────────

const EVENT_FIELDS = [
	{
		id: 'title',
		label: __( 'Title', 'events-speakers' ),
		enableSorting: true,
		enableHiding: false,
		render: ( { item } ) => (
			<strong>
				<a href={ `${ editBase }?page=${ editPage }&post=${ item.id }` }>
					{ item.title?.rendered || __( '(no title)', 'events-speakers' ) }
				</a>
			</strong>
		),
	},
	{
		id: 'event_date',
		label: __( 'Date', 'events-speakers' ),
		enableSorting: true,
		getValue: ( { item } ) => item.meta?.event_date ?? '',
		render: ( { item } ) => {
			const d = item.meta?.event_date;
			if ( ! d ) return '—';
			return new Date( d + 'T12:00:00' ).toLocaleDateString( undefined, {
				year: 'numeric',
				month: 'short',
				day: 'numeric',
			} );
		},
	},
	{
		id: 'event_time',
		label: __( 'Time', 'events-speakers' ),
		enableSorting: false,
		getValue: ( { item } ) => item.meta?.event_start_time ?? '',
		render: ( { item } ) => {
			const start = item.meta?.event_start_time;
			const end   = item.meta?.event_end_time;
			return start ? `${ start }${ end ? `\u2013${ end }` : '' }` : '—';
		},
	},
	{
		id: 'speakers',
		label: __( 'Speakers', 'events-speakers' ),
		enableSorting: false,
		getValue: ( { item } ) => item._speakerNames ?? '',
		render: ( { item } ) => item._speakerNames || '—',
	},
	STATUS_FIELD,
];

// ─── Speakers ─────────────────────────────────────────────────────────────────

const SPEAKER_FIELDS = [
	{
		id: 'title',
		label: __( 'Name', 'events-speakers' ),
		enableSorting: true,
		enableHiding: false,
		render: ( { item } ) => (
			<strong>
				<a href={ `${ editBase }?page=${ editPage }&post=${ item.id }` }>
					{ item.title?.rendered || __( '(no name)', 'events-speakers' ) }
				</a>
			</strong>
		),
	},
	{
		id: 'speaker_title',
		label: __( 'Position', 'events-speakers' ),
		enableSorting: false,
		getValue: ( { item } ) => item.meta?.speaker_title ?? '',
		render: ( { item } ) => item.meta?.speaker_title || '—',
	},
	STATUS_FIELD,
];

// ─── Actions ──────────────────────────────────────────────────────────────────

const ACTIONS = [
	{
		id: 'edit',
		label: __( 'Edit', 'events-speakers' ),
		isPrimary: true,
		callback( items ) {
			const item = Array.isArray( items ) ? items[ 0 ] : items;
			window.location.href = `${ editBase }?page=${ editPage }&post=${ item.id }`;
		},
	},
	{
		id: 'view',
		label: __( 'View', 'events-speakers' ),
		callback( items ) {
			const item = Array.isArray( items ) ? items[ 0 ] : items;
			window.open( item.link, '_blank', 'noreferrer' );
		},
	},
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getStatusParam( view ) {
	const f = view.filters?.find( ( filter ) => filter.field === 'status' );
	return f?.value?.length ? f.value.join( ',' ) : 'publish,draft,pending,private';
}

// ─── Data fetching ────────────────────────────────────────────────────────────

async function fetchEvents( view ) {
	const params = new URLSearchParams( {
		status:   getStatusParam( view ),
		per_page: String( view.perPage ),
		page:     String( view.page ),
		_fields:  'id,title,meta,link,status',
	} );

	if ( view.search ) params.set( 'search', view.search );

	if ( view.sort?.field ) {
		if ( view.sort.field === 'event_date' ) {
			params.set( 'orderby', 'meta_value' );
			params.set( 'meta_key', 'event_date' );
		} else {
			params.set( 'orderby', 'title' );
		}
		params.set( 'order', view.sort.direction ?? 'asc' );
	}

	const response = await apiFetch( { path: `/wp/v2/event?${ params }`, parse: false } );
	const total    = parseInt( response.headers.get( 'X-WP-Total' ) || '0', 10 );
	const events   = await response.json();

	// Batch-resolve speaker names.
	const speakerIds = [];
	events.forEach( ( ev ) => {
		let ids = [];
		try { ids = JSON.parse( ev.meta?.event_speakers || '[]' ); } catch {}
		ids.forEach( ( id ) => { if ( ! speakerIds.includes( id ) ) speakerIds.push( id ); } );
	} );

	if ( speakerIds.length ) {
		const speakers = await apiFetch( {
			path: `/wp/v2/speaker?include=${ speakerIds.join( ',' ) }&per_page=100&_fields=id,title`,
		} );
		const map = Object.fromEntries( speakers.map( ( s ) => [ s.id, s.title?.rendered || '' ] ) );
		events.forEach( ( ev ) => {
			let ids = [];
			try { ids = JSON.parse( ev.meta?.event_speakers || '[]' ); } catch {}
			ev._speakerNames = ids.map( ( id ) => map[ id ] || '' ).filter( Boolean ).join( ', ' );
		} );
	} else {
		events.forEach( ( ev ) => { ev._speakerNames = ''; } );
	}

	return { data: events, total };
}

async function fetchSpeakers( view ) {
	const params = new URLSearchParams( {
		status:   getStatusParam( view ),
		per_page: String( view.perPage ),
		page:     String( view.page ),
		orderby:  'title',
		order:    view.sort?.direction ?? 'asc',
		_fields:  'id,title,meta,link,status',
	} );

	if ( view.search ) params.set( 'search', view.search );

	const response = await apiFetch( { path: `/wp/v2/speaker?${ params }`, parse: false } );
	const total    = parseInt( response.headers.get( 'X-WP-Total' ) || '0', 10 );
	const data     = await response.json();
	return { data, total };
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function AdminList() {
	const [ view,       setView       ] = useState( DEFAULT_VIEW );
	const [ data,       setData       ] = useState( [] );
	const [ totalItems, setTotalItems ] = useState( 0 );
	const [ isLoading,  setIsLoading  ] = useState( true );

	const fetchFn = isEvent ? fetchEvents : fetchSpeakers;

	// Serialise filters so useCallback can detect changes without reference churn.
	const filtersKey = JSON.stringify( view.filters );

	const load = useCallback( () => {
		setIsLoading( true );
		fetchFn( view )
			.then( ( { data: items, total } ) => {
				setData( items );
				setTotalItems( total );
			} )
			.catch( () => {} )
			.finally( () => setIsLoading( false ) );
	}, [ view.page, view.perPage, view.search, view.sort?.field, view.sort?.direction, filtersKey ] ); // eslint-disable-line

	useEffect( () => { load(); }, [ load ] );

	return (
		<>
			<h1 className="wp-heading-inline">{ TITLE }</h1>
			<a href={ newUrl } className="page-title-action">{ ADD_LABEL }</a>
			<hr className="wp-header-end" />
			<DataViews
				data={ data }
				fields={ isEvent ? EVENT_FIELDS : SPEAKER_FIELDS }
				view={ view }
				onChangeView={ setView }
				actions={ ACTIONS }
				getItemId={ ( item ) => String( item.id ) }
				paginationInfo={ {
					totalItems,
					totalPages: Math.ceil( totalItems / view.perPage ),
				} }
				defaultLayouts={ DEFAULT_LAYOUTS }
				isLoading={ isLoading }
			/>
		</>
	);
}

// ─── Mount ────────────────────────────────────────────────────────────────────

const root = document.getElementById( 'es-admin-list-root' );
if ( root ) {
	const { createRoot, render } = window.wp.element;
	if ( createRoot ) {
		createRoot( root ).render( <AdminList /> );
	} else {
		render( <AdminList />, root );
	}
}
