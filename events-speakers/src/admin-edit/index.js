import { DataForm } from '@wordpress/dataviews';
import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import {
	Button,
	SelectControl,
	FormTokenField,
	DatePicker,
	Spinner,
	TextareaControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import '@wordpress/dataviews/build-style/style.css';

// ─── Bootstrap data from PHP ──────────────────────────────────────────────────

const root     = document.getElementById( 'es-edit-root' );
const POST_ID   = parseInt( root?.dataset.postId, 10 ) || 0;
const POST_TYPE = root?.dataset.postType;   // 'event' | 'speaker'
const LIST_URL  = root?.dataset.listUrl;

apiFetch.use( ( options, next ) => {
	options.headers = { ...( options.headers || {} ), 'X-WP-Nonce': root?.dataset.nonce };
	return next( options );
} );

// ─── Helpers ─────────────────────────────────────────────────────────────────

function emptyEvent() {
	return {
		title: '',
		content: '',
		status: 'draft',
		featured_media: 0,
		event_date: '',
		event_start_time: '',
		event_end_time: '',
		event_speakers: [],   // array of IDs
	};
}

function emptySpeaker() {
	return {
		title: '',
		content: '',
		status: 'draft',
		featured_media: 0,
		speaker_title: '',
	};
}

function restToEvent( post ) {
	let speakerIds = [];
	try { speakerIds = JSON.parse( post.meta?.event_speakers || '[]' ); } catch {}
	return {
		title:            post.title?.raw   ?? '',
		content:          post.content?.raw ?? '',
		status:           post.status       ?? 'draft',
		featured_media:   post.featured_media ?? 0,
		event_date:       post.meta?.event_date        ?? '',
		event_start_time: post.meta?.event_start_time  ?? '',
		event_end_time:   post.meta?.event_end_time    ?? '',
		event_speakers:   Array.isArray( speakerIds ) ? speakerIds : [],
	};
}

function restToSpeaker( post ) {
	return {
		title:          post.title?.raw   ?? '',
		content:        post.content?.raw ?? '',
		status:         post.status       ?? 'draft',
		featured_media: post.featured_media ?? 0,
		speaker_title:  post.meta?.speaker_title ?? '',
	};
}

// ─── Custom field Edit components ─────────────────────────────────────────────

function TextareaEdit( { data, field, onChange } ) {
	return (
		<TextareaControl
			label={ field.label }
			value={ data[ field.id ] ?? '' }
			onChange={ ( v ) => onChange( { [ field.id ]: v } ) }
			rows={ 4 }
			__nextHasNoMarginBottom
		/>
	);
}

function StatusEdit( { data, onChange } ) {
	return (
		<SelectControl
			label={ __( 'Status', 'events-speakers' ) }
			value={ data.status ?? 'draft' }
			options={ [
				{ value: 'draft',   label: __( 'Draft',     'events-speakers' ) },
				{ value: 'publish', label: __( 'Published', 'events-speakers' ) },
			] }
			onChange={ ( v ) => onChange( { status: v } ) }
			__nextHasNoMarginBottom
			__next40pxDefaultSize
		/>
	);
}

function DatePickerEdit( { data, onChange } ) {
	const raw = data.event_date;
	return (
		<div>
			<label
				style={ {
					display: 'block',
					fontSize: 11,
					fontWeight: 500,
					textTransform: 'uppercase',
					letterSpacing: '0.06em',
					marginBottom: 8,
					color: '#1e1e1e',
				} }
			>
				{ __( 'Date', 'events-speakers' ) }
			</label>
			<DatePicker
				currentDate={ raw ? raw + 'T12:00:00' : null }
				onChange={ ( v ) => onChange( { event_date: v ? v.slice( 0, 10 ) : '' } ) }
			/>
		</div>
	);
}

function TimeEdit( { data, onChange } ) {
	return (
		<div>
			<label
				style={ {
					display: 'block',
					fontSize: 11,
					fontWeight: 500,
					textTransform: 'uppercase',
					letterSpacing: '0.06em',
					marginBottom: 8,
					color: '#1e1e1e',
				} }
			>
				{ __( 'Time', 'events-speakers' ) }
			</label>
			<div className="es-time-row">
				<input
					type="time"
					value={ data.event_start_time ?? '' }
					aria-label={ __( 'Start time', 'events-speakers' ) }
					onChange={ ( e ) => onChange( { event_start_time: e.target.value } ) }
				/>
				<span aria-hidden="true">–</span>
				<input
					type="time"
					value={ data.event_end_time ?? '' }
					aria-label={ __( 'End time', 'events-speakers' ) }
					onChange={ ( e ) => onChange( { event_end_time: e.target.value } ) }
				/>
			</div>
		</div>
	);
}

function SpeakersEdit( { data, onChange } ) {
	const [ allSpeakers, setAllSpeakers ] = useState( null );

	useEffect( () => {
		apiFetch( { path: '/wp/v2/speaker?status=publish&per_page=100&orderby=title&order=asc&_fields=id,title' } )
			.then( setAllSpeakers )
			.catch( () => setAllSpeakers( [] ) );
	}, [] );

	const nameToId = {};
	const idToName = {};
	( allSpeakers || [] ).forEach( ( s ) => {
		const name = s.title?.rendered ?? '';
		nameToId[ name ] = s.id;
		idToName[ s.id ] = name;
	} );

	const tokens      = ( data.event_speakers || [] ).map( ( id ) => idToName[ id ] ?? String( id ) );
	const suggestions = ( allSpeakers || [] ).map( ( s ) => s.title?.rendered ?? '' );

	return (
		<FormTokenField
			label={ __( 'Speakers', 'events-speakers' ) }
			value={ tokens }
			suggestions={ suggestions }
			onChange={ ( newTokens ) => {
				const ids = newTokens
					.map( ( t ) => nameToId[ typeof t === 'object' ? t.value : t ] ?? null )
					.filter( Boolean );
				onChange( { event_speakers: ids } );
			} }
			placeholder={ allSpeakers === null ? __( 'Loading…', 'events-speakers' ) : __( 'Add speaker…', 'events-speakers' ) }
			__experimentalShowHowTo={ false }
			__nextHasNoMarginBottom
			__next40pxDefaultSize
		/>
	);
}

function ImagePickerEdit( { data, field, onChange } ) {
	const mediaId = data[ field.id ] ?? 0;
	const [ imgUrl, setImgUrl ] = useState( null );

	useEffect( () => {
		if ( ! mediaId ) { setImgUrl( null ); return; }
		apiFetch( { path: `/wp/v2/media/${ mediaId }?_fields=source_url` } )
			.then( ( m ) => setImgUrl( m.source_url ) )
			.catch( () => setImgUrl( null ) );
	}, [ mediaId ] );

	function openPicker() {
		const frame = window.wp.media( {
			title: __( 'Select image', 'events-speakers' ),
			button: { text: __( 'Use this image', 'events-speakers' ) },
			multiple: false,
		} );
		frame.on( 'select', () => {
			const att = frame.state().get( 'selection' ).first().toJSON();
			onChange( { [ field.id ]: att.id } );
		} );
		frame.open();
	}

	if ( imgUrl ) {
		return (
			<div className="es-image-preview">
				<img src={ imgUrl } alt="" />
				<Button
					className="es-image-remove"
					variant="secondary"
					isDestructive
					size="small"
					onClick={ () => onChange( { [ field.id ]: 0 } ) }
				>
					{ __( 'Remove', 'events-speakers' ) }
				</Button>
			</div>
		);
	}

	return (
		<button type="button" className="es-image-placeholder" onClick={ openPicker }>
			<span className="dashicons dashicons-format-image" aria-hidden="true" />
			{ __( 'Set image', 'events-speakers' ) }
		</button>
	);
}

// ─── Field definitions ────────────────────────────────────────────────────────

const EVENT_FIELDS = [
	{
		id: 'title',
		label: __( 'Event title', 'events-speakers' ),
		type: 'text',
	},
	{
		id: 'content',
		label: __( 'Description', 'events-speakers' ),
		Edit: TextareaEdit,
	},
	{
		id: 'featured_media',
		label: __( 'Featured image', 'events-speakers' ),
		Edit: ImagePickerEdit,
	},
	{
		id: 'event_date',
		label: __( 'Date', 'events-speakers' ),
		Edit: DatePickerEdit,
	},
	{
		id: 'event_start_time',
		label: __( 'Time', 'events-speakers' ),
		Edit: TimeEdit,
	},
	{
		id: 'event_speakers',
		label: __( 'Speakers', 'events-speakers' ),
		Edit: SpeakersEdit,
	},
	{
		id: 'status',
		label: __( 'Status', 'events-speakers' ),
		Edit: StatusEdit,
	},
];

const SPEAKER_FIELDS = [
	{
		id: 'title',
		label: __( 'Name', 'events-speakers' ),
		type: 'text',
	},
	{
		id: 'speaker_title',
		label: __( 'Title / Position', 'events-speakers' ),
		type: 'text',
	},
	{
		id: 'content',
		label: __( 'Bio', 'events-speakers' ),
		Edit: TextareaEdit,
	},
	{
		id: 'featured_media',
		label: __( 'Photo', 'events-speakers' ),
		Edit: ImagePickerEdit,
	},
	{
		id: 'status',
		label: __( 'Status', 'events-speakers' ),
		Edit: StatusEdit,
	},
];

const EVENT_FORM = {
	type: 'regular',
	fields: [ 'title', 'content', 'featured_media', 'event_date', 'event_start_time', 'event_speakers', 'status' ],
};

const SPEAKER_FORM = {
	type: 'regular',
	fields: [ 'title', 'speaker_title', 'content', 'featured_media', 'status' ],
};

// ─── Main component ───────────────────────────────────────────────────────────

function EditPage() {
	const isEvent = POST_TYPE === 'event';
	const fields  = isEvent ? EVENT_FIELDS : SPEAKER_FIELDS;
	const form    = isEvent ? EVENT_FORM   : SPEAKER_FORM;

	const [ item,    setItem    ] = useState( isEvent ? emptyEvent() : emptySpeaker() );
	const [ postId,  setPostId  ] = useState( POST_ID );
	const [ loading, setLoading ] = useState( POST_ID > 0 );
	const [ saving,  setSaving  ] = useState( false );
	const [ notice,  setNotice  ] = useState( null );

	// Load existing post.
	useEffect( () => {
		if ( ! POST_ID ) return;
		const path = `/wp/v2/${ POST_TYPE }/${ POST_ID }?context=edit&_fields=id,title,content,status,featured_media,meta`;
		apiFetch( { path } )
			.then( ( post ) => {
				setItem( isEvent ? restToEvent( post ) : restToSpeaker( post ) );
				setLoading( false );
			} )
			.catch( () => setLoading( false ) );
	}, [] ); // eslint-disable-line

	function handleChange( updates ) {
		setItem( ( prev ) => ( { ...prev, ...updates } ) );
	}

	function save() {
		if ( ! item.title?.trim() ) {
			setNotice( { type: 'error', text: isEvent
				? __( 'Event title is required.', 'events-speakers' )
				: __( 'Speaker name is required.', 'events-speakers' ),
			} );
			return;
		}

		setSaving( true );
		setNotice( null );

		const data = isEvent
			? {
				title:          item.title,
				content:        item.content,
				status:         item.status,
				featured_media: item.featured_media || 0,
				meta: {
					event_date:       item.event_date,
					event_start_time: item.event_start_time,
					event_end_time:   item.event_end_time,
					event_speakers:   JSON.stringify( item.event_speakers ),
				},
			}
			: {
				title:          item.title,
				content:        item.content,
				status:         item.status,
				featured_media: item.featured_media || 0,
				meta: { speaker_title: item.speaker_title },
			};

		apiFetch( {
			path:   postId ? `/wp/v2/${ POST_TYPE }/${ postId }` : `/wp/v2/${ POST_TYPE }`,
			method: 'POST',
			data,
		} )
			.then( ( saved ) => {
				setSaving( false );
				if ( ! postId ) {
					setPostId( saved.id );
					window.history.replaceState( {}, '', `?page=es-edit-${ POST_TYPE }&post=${ saved.id }` );
				}
				setNotice( { type: 'success', text: isEvent
					? __( 'Event saved.', 'events-speakers' )
					: __( 'Speaker saved.', 'events-speakers' ),
				} );
			} )
			.catch( ( err ) => {
				setSaving( false );
				setNotice( { type: 'error', text: err?.message ?? __( 'Save failed.', 'events-speakers' ) } );
			} );
	}

	if ( loading ) {
		return <div className="es-loading"><Spinner /></div>;
	}

	const backLabel = isEvent
		? __( '← All Events', 'events-speakers' )
		: __( '← All Speakers', 'events-speakers' );

	const pageTitle = postId
		? ( isEvent ? __( 'Edit Event', 'events-speakers' ) : __( 'Edit Speaker', 'events-speakers' ) )
		: ( isEvent ? __( 'New Event', 'events-speakers' ) : __( 'New Speaker', 'events-speakers' ) );

	return (
		<div className="es-edit-page">
			<div className="es-edit-header">
				<div className="es-edit-header__left">
					<a href={ LIST_URL } className="es-edit-back">{ backLabel }</a>
					<h1 className="es-edit-title">{ pageTitle }</h1>
				</div>
				<div className="es-edit-actions">
					<Button
						variant="primary"
						isBusy={ saving }
						disabled={ saving }
						onClick={ save }
					>
						{ saving ? __( 'Saving…', 'events-speakers' ) : __( 'Save', 'events-speakers' ) }
					</Button>
				</div>
			</div>

			{ notice && (
				<div className={ `es-notice es-notice--${ notice.type }` }>
					{ notice.text }
				</div>
			) }

			<DataForm
				data={ item }
				fields={ fields }
				form={ form }
				onChange={ handleChange }
			/>
		</div>
	);
}

// ─── Mount ────────────────────────────────────────────────────────────────────

if ( root ) {
	const { createRoot, render } = window.wp.element;
	if ( createRoot ) {
		createRoot( root ).render( <EditPage /> );
	} else {
		render( <EditPage />, root );
	}
}
