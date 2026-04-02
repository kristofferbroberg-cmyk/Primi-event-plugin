<?php
defined( 'ABSPATH' ) || exit;

class Events_Speakers_Admin_Edit {

	public static function register_pages(): void {
		add_submenu_page( null, __( 'Edit Event', 'events-speakers' ),   __( 'Edit Event', 'events-speakers' ),   'edit_posts', 'es-edit-event',   array( self::class, 'render_page' ) );
		add_submenu_page( null, __( 'Edit Speaker', 'events-speakers' ), __( 'Edit Speaker', 'events-speakers' ), 'edit_posts', 'es-edit-speaker', array( self::class, 'render_page' ) );
	}

	public static function render_page(): void {
		if ( ! current_user_can( 'edit_posts' ) ) {
			wp_die( esc_html__( 'Sorry, you are not allowed to edit posts.', 'events-speakers' ) );
		}

		$page     = sanitize_key( $_GET['page'] ?? '' );
		$post_id  = absint( $_GET['post'] ?? 0 );
		$type     = ( 'es-edit-event' === $page ) ? 'event' : 'speaker';
		$list_url = admin_url( 'admin.php?page=es-' . $type . 's-list' );
		?>
		<div class="wrap">
			<div id="es-edit-root"
				data-post-id="<?php echo esc_attr( (string) $post_id ); ?>"
				data-post-type="<?php echo esc_attr( $type ); ?>"
				data-list-url="<?php echo esc_url( $list_url ); ?>"
				data-nonce="<?php echo esc_attr( wp_create_nonce( 'wp_rest' ) ); ?>">
			</div>
		</div>
		<?php
	}

	public static function enqueue( string $hook ): void {
		if ( ! in_array( $hook, array( 'admin_page_es-edit-event', 'admin_page_es-edit-speaker' ), true ) ) {
			return;
		}

		wp_enqueue_style( 'wp-components' );
		wp_enqueue_media();

		wp_register_script(
			'es-admin-edit',
			'',
			array( 'wp-element', 'wp-components', 'wp-api-fetch' ),
			null,
			true
		);
		wp_enqueue_script( 'es-admin-edit' );
		wp_add_inline_script( 'es-admin-edit', self::edit_script() );
		wp_add_inline_style( 'wp-components', self::edit_styles() );
	}

	private static function edit_styles(): string {
		return '
		#es-edit-root { max-width: 780px; padding: 16px 0 40px; }
		.es-edit-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px; gap: 12px; }
		.es-edit-header h1 { margin: 0; font-size: 23px; font-weight: 400; }
		.es-edit-actions { display: flex; align-items: center; gap: 8px; }
		.es-edit-image-placeholder { display: flex; align-items: center; justify-content: center; background: #f0f0f1; border: 2px dashed #c3c4c7; border-radius: 2px; height: 160px; cursor: pointer; color: #50575e; font-size: 13px; gap: 8px; }
		.es-edit-image-preview { position: relative; display: inline-block; }
		.es-edit-image-preview img { display: block; max-height: 200px; border-radius: 2px; }
		.es-edit-image-remove { position: absolute !important; top: 6px !important; right: 6px !important; }
		.es-edit-time-row { display: flex; align-items: center; gap: 8px; }
		.es-edit-time-row input[type=time] { flex: 1; padding: 0 8px; height: 40px; border: 1px solid #949494; border-radius: 2px; font-size: 13px; background: #fff; color: inherit; }
		.es-edit-notice { padding: 10px 14px; border-radius: 2px; font-size: 13px; margin-bottom: 4px; }
		.es-edit-notice--success { background: #edfaef; border-left: 4px solid #00a32a; color: #1e4620; }
		.es-edit-notice--error   { background: #fce8e8; border-left: 4px solid #d63638; color: #50130c; }
		/* Card overrides — remove bottom margin inside our VStack */
		#es-edit-root .components-card { margin-bottom: 0; }
		';
	}

	private static function edit_script(): string {
		return <<<'JS'
( function( element, components, apiFetch ) {
	var el              = element.createElement;
	var useState        = element.useState;
	var useEffect       = element.useEffect;
	var Button          = components.Button;
	var TextControl     = components.TextControl;
	var TextareaControl = components.TextareaControl;
	var SelectControl   = components.SelectControl;
	var DatePicker      = components.DatePicker;
	var FormTokenField  = components.FormTokenField;
	var Spinner         = components.Spinner;
	var Card            = components.Card;
	var CardBody        = components.CardBody;
	var CardHeader      = components.CardHeader;
	var CardDivider     = components.CardDivider;
	var VStack          = components.VStack || components.__experimentalVStack;
	var __experimentalHeading = components.__experimentalHeading;

	var root    = document.getElementById( 'es-edit-root' );
	if ( ! root ) return;

	var POST_ID   = parseInt( root.dataset.postId, 10 ) || 0;
	var POST_TYPE = root.dataset.postType;
	var LIST_URL  = root.dataset.listUrl;
	var NONCE     = root.dataset.nonce;

	apiFetch.use( function( options, next ) {
		options.headers = options.headers || {};
		options.headers['X-WP-Nonce'] = NONCE;
		return next( options );
	} );

	// -----------------------------------------------------------------------
	// Image picker
	// -----------------------------------------------------------------------
	function ImagePicker( props ) {
		var mediaId  = props.mediaId;
		var onChange = props.onChange;
		var imgState = useState( null );
		var imgUrl   = imgState[0]; var setImgUrl = imgState[1];

		useEffect( function() {
			if ( ! mediaId ) { setImgUrl( null ); return; }
			apiFetch( { path: '/wp/v2/media/' + mediaId + '?_fields=source_url' } )
				.then( function( m ) { setImgUrl( m.source_url ); } )
				.catch( function() { setImgUrl( null ); } );
		}, [ mediaId ] );

		function openPicker() {
			var frame = wp.media( {
				title: 'Select image',
				button: { text: 'Use this image' },
				multiple: false,
			} );
			frame.on( 'select', function() {
				var att = frame.state().get( 'selection' ).first().toJSON();
				onChange( att.id );
			} );
			frame.open();
		}

		if ( imgUrl ) {
			return el( 'div', { className: 'es-edit-image-preview' },
				el( 'img', { src: imgUrl, alt: '' } ),
				el( Button, {
					className: 'es-edit-image-remove',
					variant: 'secondary',
					isDestructive: true,
					size: 'small',
					onClick: function() { onChange( 0 ); },
				}, 'Remove' )
			);
		}
		return el( 'div', { className: 'es-edit-image-placeholder', onClick: openPicker },
			el( 'span', { className: 'dashicons dashicons-format-image' } ),
			'Set image'
		);
	}

	// -----------------------------------------------------------------------
	// Event form
	// -----------------------------------------------------------------------
	function EventForm() {
		var s = {
			loading:    useState( POST_ID > 0 ),
			saving:     useState( false ),
			notice:     useState( null ),
			title:      useState( '' ),
			content:    useState( '' ),
			status:     useState( 'draft' ),
			mediaId:    useState( 0 ),
			eventDate:  useState( '' ),
			startTime:  useState( '' ),
			endTime:    useState( '' ),
			speakerIds: useState( [] ),
			speakers:   useState( null ),
			postId:     useState( POST_ID ),
		};
		var loading    = s.loading[0];    var setLoading    = s.loading[1];
		var saving     = s.saving[0];     var setSaving     = s.saving[1];
		var notice     = s.notice[0];     var setNotice     = s.notice[1];
		var title      = s.title[0];      var setTitle      = s.title[1];
		var content    = s.content[0];    var setContent    = s.content[1];
		var status     = s.status[0];     var setStatus     = s.status[1];
		var mediaId    = s.mediaId[0];    var setMediaId    = s.mediaId[1];
		var eventDate  = s.eventDate[0];  var setEventDate  = s.eventDate[1];
		var startTime  = s.startTime[0];  var setStartTime  = s.startTime[1];
		var endTime    = s.endTime[0];    var setEndTime    = s.endTime[1];
		var speakerIds = s.speakerIds[0]; var setSpeakerIds = s.speakerIds[1];
		var speakers   = s.speakers[0];   var setSpeakers   = s.speakers[1];
		var postId     = s.postId[0];     var setPostId     = s.postId[1];

		useEffect( function() {
			apiFetch( { path: '/wp/v2/speaker?status=publish&per_page=100&orderby=title&order=asc&_fields=id,title' } )
				.then( function( data ) { setSpeakers( data ); } )
				.catch( function() { setSpeakers( [] ); } );
		}, [] );

		useEffect( function() {
			if ( ! postId ) { setLoading( false ); return; }
			apiFetch( { path: '/wp/v2/event/' + postId + '?context=edit&_fields=id,title,content,status,featured_media,meta' } )
				.then( function( post ) {
					setTitle( post.title && post.title.raw ? post.title.raw : '' );
					setContent( post.content && post.content.raw ? post.content.raw : '' );
					setStatus( post.status || 'draft' );
					setMediaId( post.featured_media || 0 );
					var meta = post.meta || {};
					setEventDate( meta.event_date || '' );
					setStartTime( meta.event_start_time || '' );
					setEndTime( meta.event_end_time || '' );
					var ids; try { ids = JSON.parse( meta.event_speakers || '[]' ); } catch(e) { ids = []; }
					setSpeakerIds( Array.isArray( ids ) ? ids : [] );
					setLoading( false );
				} )
				.catch( function() { setLoading( false ); } );
		}, [ postId ] );

		var nameToId = {}, idToName = {};
		( speakers || [] ).forEach( function( s ) {
			var name = s.title && s.title.rendered ? s.title.rendered : '';
			nameToId[ name ] = s.id;
			idToName[ s.id ] = name;
		} );
		var tokens      = speakerIds.map( function( id ) { return idToName[ id ] || String( id ); } );
		var suggestions = ( speakers || [] ).map( function( s ) { return s.title && s.title.rendered ? s.title.rendered : ''; } );

		function onChangeTokens( newTokens ) {
			setSpeakerIds( newTokens.map( function( t ) {
				var name = typeof t === 'object' ? t.value : t;
				return nameToId[ name ] || null;
			} ).filter( Boolean ) );
		}

		function save() {
			if ( ! title.trim() ) { setNotice( { type: 'error', text: 'Event title is required.' } ); return; }
			setSaving( true ); setNotice( null );
			apiFetch( {
				path:   postId ? '/wp/v2/event/' + postId : '/wp/v2/event',
				method: 'POST',
				data: {
					title, content, status,
					featured_media: mediaId || 0,
					meta: {
						event_date:       eventDate,
						event_start_time: startTime,
						event_end_time:   endTime,
						event_speakers:   JSON.stringify( speakerIds ),
					},
				},
			} ).then( function( saved ) {
				setSaving( false );
				if ( ! postId ) {
					setPostId( saved.id );
					window.history.replaceState( {}, '', '?page=es-edit-event&post=' + saved.id );
				}
				setNotice( { type: 'success', text: 'Event saved.' } );
			} ).catch( function( err ) {
				setSaving( false );
				setNotice( { type: 'error', text: ( err && err.message ) ? err.message : 'Save failed.' } );
			} );
		}

		if ( loading ) return el( 'div', { style: { padding: '48px', textAlign: 'center' } }, el( Spinner ) );

		return el( VStack, { spacing: 4 },

			// Header
			el( 'div', { className: 'es-edit-header' },
				el( 'h1', null, postId ? 'Edit Event' : 'New Event' ),
				el( 'div', { className: 'es-edit-actions' },
					el( 'a', { href: LIST_URL, className: 'button' }, '\u2190 All Events' ),
					el( SelectControl, {
						value: status,
						options: [ { value: 'draft', label: 'Draft' }, { value: 'publish', label: 'Published' } ],
						onChange: setStatus,
						__nextHasNoMarginBottom: true,
						__next40pxDefaultSize: true,
						style: { margin: 0 },
					} ),
					el( Button, { variant: 'primary', isBusy: saving, disabled: saving, onClick: save },
						saving ? 'Saving\u2026' : 'Save'
					)
				)
			),

			// Notice
			notice && el( 'div', { className: 'es-edit-notice es-edit-notice--' + notice.type }, notice.text ),

			// Title + Description
			el( Card, null,
				el( CardBody, null,
					el( VStack, { spacing: 4 },
						el( TextControl, {
							label: 'Event title',
							value: title,
							onChange: setTitle,
							placeholder: 'Event title\u2026',
							__nextHasNoMarginBottom: true,
							__next40pxDefaultSize: true,
						} ),
						el( TextareaControl, {
							label: 'Description',
							value: content,
							onChange: setContent,
							placeholder: 'Short description of the event\u2026',
							rows: 4,
							__nextHasNoMarginBottom: true,
						} )
					)
				)
			),

			// Featured image
			el( Card, null,
				el( CardHeader, null, 'Featured image' ),
				el( CardBody, null,
					el( ImagePicker, { mediaId: mediaId, onChange: setMediaId } )
				)
			),

			// Date & time
			el( Card, null,
				el( CardHeader, null, 'Date & time' ),
				el( CardBody, null,
					el( VStack, { spacing: 4 },
						el( DatePicker, {
							currentDate: eventDate ? eventDate + 'T12:00:00' : null,
							onChange: function( v ) { setEventDate( v ? v.slice( 0, 10 ) : '' ); },
						} ),
						el( 'div', null,
							el( 'label', { style: { display: 'block', fontSize: 11, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#1e1e1e', marginBottom: 6 } }, 'Time' ),
							el( 'div', { className: 'es-edit-time-row' },
								el( 'input', { type: 'time', value: startTime, onChange: function(e) { setStartTime( e.target.value ); }, 'aria-label': 'Start time' } ),
								el( 'span', { style: { color: '#757575', flexShrink: 0 } }, '\u2013' ),
								el( 'input', { type: 'time', value: endTime, onChange: function(e) { setEndTime( e.target.value ); }, 'aria-label': 'End time' } )
							)
						)
					)
				)
			),

			// Speakers
			el( Card, null,
				el( CardBody, null,
					el( FormTokenField, {
						label: 'Speakers',
						value: tokens,
						suggestions: suggestions,
						onChange: onChangeTokens,
						placeholder: speakers === null ? 'Loading\u2026' : 'Add speaker\u2026',
						__experimentalShowHowTo: false,
						__nextHasNoMarginBottom: true,
						__next40pxDefaultSize: true,
					} )
				)
			)
		);
	}

	// -----------------------------------------------------------------------
	// Speaker form
	// -----------------------------------------------------------------------
	function SpeakerForm() {
		var s = {
			loading:  useState( POST_ID > 0 ),
			saving:   useState( false ),
			notice:   useState( null ),
			name:     useState( '' ),
			bio:      useState( '' ),
			status:   useState( 'draft' ),
			mediaId:  useState( 0 ),
			position: useState( '' ),
			postId:   useState( POST_ID ),
		};
		var loading  = s.loading[0];  var setLoading  = s.loading[1];
		var saving   = s.saving[0];   var setSaving   = s.saving[1];
		var notice   = s.notice[0];   var setNotice   = s.notice[1];
		var name     = s.name[0];     var setName     = s.name[1];
		var bio      = s.bio[0];      var setBio      = s.bio[1];
		var status   = s.status[0];   var setStatus   = s.status[1];
		var mediaId  = s.mediaId[0];  var setMediaId  = s.mediaId[1];
		var position = s.position[0]; var setPosition = s.position[1];
		var postId   = s.postId[0];   var setPostId   = s.postId[1];

		useEffect( function() {
			if ( ! postId ) { setLoading( false ); return; }
			apiFetch( { path: '/wp/v2/speaker/' + postId + '?context=edit&_fields=id,title,content,status,featured_media,meta' } )
				.then( function( post ) {
					setName( post.title && post.title.raw ? post.title.raw : '' );
					setBio( post.content && post.content.raw ? post.content.raw : '' );
					setStatus( post.status || 'draft' );
					setMediaId( post.featured_media || 0 );
					setPosition( ( post.meta && post.meta.speaker_title ) || '' );
					setLoading( false );
				} )
				.catch( function() { setLoading( false ); } );
		}, [ postId ] );

		function save() {
			if ( ! name.trim() ) { setNotice( { type: 'error', text: 'Speaker name is required.' } ); return; }
			setSaving( true ); setNotice( null );
			apiFetch( {
				path:   postId ? '/wp/v2/speaker/' + postId : '/wp/v2/speaker',
				method: 'POST',
				data: { title: name, content: bio, status, featured_media: mediaId || 0, meta: { speaker_title: position } },
			} ).then( function( saved ) {
				setSaving( false );
				if ( ! postId ) {
					setPostId( saved.id );
					window.history.replaceState( {}, '', '?page=es-edit-speaker&post=' + saved.id );
				}
				setNotice( { type: 'success', text: 'Speaker saved.' } );
			} ).catch( function( err ) {
				setSaving( false );
				setNotice( { type: 'error', text: ( err && err.message ) ? err.message : 'Save failed.' } );
			} );
		}

		if ( loading ) return el( 'div', { style: { padding: '48px', textAlign: 'center' } }, el( Spinner ) );

		return el( VStack, { spacing: 4 },

			// Header
			el( 'div', { className: 'es-edit-header' },
				el( 'h1', null, postId ? 'Edit Speaker' : 'New Speaker' ),
				el( 'div', { className: 'es-edit-actions' },
					el( 'a', { href: LIST_URL, className: 'button' }, '\u2190 All Speakers' ),
					el( SelectControl, {
						value: status,
						options: [ { value: 'draft', label: 'Draft' }, { value: 'publish', label: 'Published' } ],
						onChange: setStatus,
						__nextHasNoMarginBottom: true,
						__next40pxDefaultSize: true,
						style: { margin: 0 },
					} ),
					el( Button, { variant: 'primary', isBusy: saving, disabled: saving, onClick: save },
						saving ? 'Saving\u2026' : 'Save'
					)
				)
			),

			// Notice
			notice && el( 'div', { className: 'es-edit-notice es-edit-notice--' + notice.type }, notice.text ),

			// Name + Position + Bio
			el( Card, null,
				el( CardBody, null,
					el( VStack, { spacing: 4 },
						el( TextControl, {
							label: 'Name',
							value: name,
							onChange: setName,
							placeholder: 'Speaker name\u2026',
							__nextHasNoMarginBottom: true,
							__next40pxDefaultSize: true,
						} ),
						el( TextControl, {
							label: 'Title / Position',
							value: position,
							onChange: setPosition,
							placeholder: 'e.g. Senior Engineer',
							__nextHasNoMarginBottom: true,
							__next40pxDefaultSize: true,
						} ),
						el( TextareaControl, {
							label: 'Bio',
							value: bio,
							onChange: setBio,
							placeholder: 'Speaker bio\u2026',
							rows: 5,
							__nextHasNoMarginBottom: true,
						} )
					)
				)
			),

			// Photo
			el( Card, null,
				el( CardHeader, null, 'Photo' ),
				el( CardBody, null,
					el( ImagePicker, { mediaId: mediaId, onChange: setMediaId } )
				)
			)
		);
	}

	// -----------------------------------------------------------------------
	// Mount
	// -----------------------------------------------------------------------
	var Form = POST_TYPE === 'event' ? EventForm : SpeakerForm;
	if ( wp.element.createRoot ) {
		wp.element.createRoot( root ).render( el( Form ) );
	} else {
		wp.element.render( el( Form ), root );
	}

} )(
	window.wp.element,
	window.wp.components,
	window.wp.apiFetch
);
JS;
	}
}
