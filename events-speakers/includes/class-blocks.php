<?php
defined( 'ABSPATH' ) || exit;

class Events_Speakers_Blocks {

	// -------------------------------------------------------------------------
	// Frontend query filtering (query_loop_block_query_vars)
	// -------------------------------------------------------------------------

	/**
	 * Filter the Query Loop's WP_Query args on the frontend.
	 *
	 * The $block parameter is the Post Template (or sibling) block — NOT the
	 * Query block itself.  The Query block's attributes arrive via context:
	 *   - Post type:   $block->context['query']['postType']
	 *   - Date filter: $block->context['query']['eventDateFilter']
	 */
	public static function apply_date_filter( array $query, WP_Block $block, int $page ): array {
		$post_type = $block->context['query']['postType'] ?? '';

		// ---- event queries: date filter + speaker filter ----
		if ( 'event' === $post_type ) {
			$date_filter = trim( $block->context['query']['eventDateFilter'] ?? '' );
			if ( '' !== $date_filter ) {
				self::add_date_meta_query( $query, $date_filter );
			}

			if ( ! empty( $block->context['query']['filterBySpeaker'] ) && is_singular( 'speaker' ) ) {
				$speaker_id = get_queried_object_id();
				if ( $speaker_id > 0 ) {
					$existing = $query['meta_query'] ?? array();
					if ( ! empty( $existing ) && empty( $existing['relation'] ) ) {
						$existing['relation'] = 'AND';
					}
					$existing[] = self::speaker_meta_query( $speaker_id );
					$query['meta_query'] = $existing;
				}
			}
		}

		// ---- speaker queries: filterByEvent ----
		if ( 'speaker' === $post_type ) {
			if ( ! empty( $block->context['query']['filterByEvent'] ) && is_singular( 'event' ) ) {
				$event_id = get_queried_object_id();
				if ( $event_id > 0 ) {
					$speaker_ids = self::get_event_speaker_ids( $event_id );
					$query['post__in'] = ! empty( $speaker_ids ) ? $speaker_ids : array( 0 );
				}
			}
		}

		return $query;
	}

	// -------------------------------------------------------------------------
	// Editor query filtering (REST API)
	// -------------------------------------------------------------------------

	/**
	 * Register `event_date_filter` as a valid collection parameter on the
	 * event REST endpoint so the editor can pass it and the REST query
	 * handler can read it.
	 */
	public static function register_rest_params( array $params ): array {
		$params['event_date_filter'] = array(
			'description'       => __( 'Filter events by event_date meta (Y-m-d).', 'events-speakers' ),
			'type'              => 'string',
			'validate_callback' => function ( $value ): bool {
				return empty( $value ) || (bool) preg_match( '/^\d{4}-\d{2}-\d{2}$/', $value );
			},
			'sanitize_callback' => 'sanitize_text_field',
		);

		$params['speaker_filter'] = array(
			'description'       => __( 'Filter events by speaker post ID.', 'events-speakers' ),
			'type'              => 'integer',
			'sanitize_callback' => 'absint',
		);

		return $params;
	}

	/**
	 * When the REST API receives `event_date_filter`, add a meta_query clause.
	 */
	public static function apply_rest_date_filter( array $args, WP_REST_Request $request ): array {
		$date = $request->get_param( 'event_date_filter' );
		if ( ! empty( $date ) ) {
			self::add_date_meta_query( $args, $date );
		}

		$speaker_id = (int) $request->get_param( 'speaker_filter' );
		if ( $speaker_id > 0 ) {
			$existing = $args['meta_query'] ?? array();
			if ( ! empty( $existing ) && empty( $existing['relation'] ) ) {
				$existing['relation'] = 'AND';
			}
			$existing[] = self::speaker_meta_query( $speaker_id );
			$args['meta_query'] = $existing;
		}

		return $args;
	}

	// -------------------------------------------------------------------------
	// Speaker REST API filtering (filterByEvent)
	// -------------------------------------------------------------------------

	/**
	 * Register `event_filter` as a valid collection parameter on the speaker REST endpoint.
	 */
	public static function register_speaker_rest_params( array $params ): array {
		$params['event_filter'] = array(
			'description'       => __( 'Filter speakers by event post ID.', 'events-speakers' ),
			'type'              => 'integer',
			'sanitize_callback' => 'absint',
		);
		return $params;
	}

	/**
	 * When the REST API receives `event_filter`, restrict results to speakers on that event.
	 */
	public static function apply_rest_event_filter( array $args, WP_REST_Request $request ): array {
		$event_id = (int) $request->get_param( 'event_filter' );
		if ( $event_id > 0 ) {
			$speaker_ids = self::get_event_speaker_ids( $event_id );
			$args['post__in'] = ! empty( $speaker_ids ) ? $speaker_ids : array( 0 );
		}
		return $args;
	}

	// -------------------------------------------------------------------------
	// Shared helper
	// -------------------------------------------------------------------------

	/**
	 * Returns a meta_query clause matching a speaker ID in any JSON array position.
	 */
	private static function speaker_meta_query( int $id ): array {
		return array(
			'relation' => 'OR',
			array( 'key' => 'event_speakers', 'value' => '[' . $id . ']',  'compare' => 'LIKE' ),
			array( 'key' => 'event_speakers', 'value' => '[' . $id . ',',  'compare' => 'LIKE' ),
			array( 'key' => 'event_speakers', 'value' => ',' . $id . ']',  'compare' => 'LIKE' ),
			array( 'key' => 'event_speakers', 'value' => ',' . $id . ',',  'compare' => 'LIKE' ),
		);
	}

	/**
	 * Returns the speaker post IDs stored as JSON on an event.
	 * Temporarily removes the display-value filter to get raw JSON.
	 *
	 * @return int[]
	 */
	private static function get_event_speaker_ids( int $event_id ): array {
		remove_filter( 'get_post_metadata', 'events_speakers_speakers_display_value', 10 );
		$json = get_post_meta( $event_id, 'event_speakers', true );
		add_filter( 'get_post_metadata', 'events_speakers_speakers_display_value', 10, 4 );
		$ids = json_decode( $json ?: '[]', true );
		return is_array( $ids ) ? array_map( 'absint', array_filter( $ids ) ) : array();
	}

	private static function add_date_meta_query( array &$query, string $raw_date ): void {
		$date = substr( $raw_date, 0, 10 );
		if ( ! preg_match( '/^\d{4}-\d{2}-\d{2}$/', $date ) ) {
			return;
		}

		$existing = $query['meta_query'] ?? array();
		if ( ! empty( $existing ) && empty( $existing['relation'] ) ) {
			$existing['relation'] = 'AND';
		}

		$existing[] = array(
			'key'     => 'event_date',
			'value'   => $date,
			'compare' => '=',
		);

		$query['meta_query'] = $existing;
	}

	// -------------------------------------------------------------------------
	// Editor placeholders
	// -------------------------------------------------------------------------

	public static function editor_placeholders( array $settings, $context ): array {
		if ( ! isset( $context->post->post_type ) ) {
			return $settings;
		}
		switch ( $context->post->post_type ) {
			case 'event':
				$settings['titlePlaceholder'] = __( 'Event title…', 'events-speakers' );
				$settings['bodyPlaceholder']  = __( 'Short description of the event…', 'events-speakers' );
				break;
			case 'speaker':
				$settings['titlePlaceholder'] = __( 'Speaker name…', 'events-speakers' );
				$settings['bodyPlaceholder']  = __( 'Speaker bio…', 'events-speakers' );
				break;
		}
		return $settings;
	}

	// -------------------------------------------------------------------------
	// Editor assets
	// -------------------------------------------------------------------------

	public static function enqueue_editor_assets(): void {
		wp_register_script(
			'events-speakers-blocks',
			'',
			array( 'wp-hooks', 'wp-element', 'wp-components', 'wp-block-editor', 'wp-compose', 'wp-api-fetch', 'wp-plugins', 'wp-edit-post', 'wp-data' ),
			null,
			true
		);
		wp_enqueue_script( 'events-speakers-blocks' );
		wp_add_inline_script( 'events-speakers-blocks', self::editor_script() );
		wp_add_inline_script( 'events-speakers-blocks', self::sidebar_script() );

		wp_add_inline_style(
			'wp-components',
			'.editor-sidebar .components-panel,
			 .edit-post-sidebar .components-panel {
			     display: flex;
			     flex-direction: column;
			 }
			 .es-event-details-panel,
			 .es-speaker-details-panel {
			     order: -1;
			 }'
		);
	}

	private static function editor_script(): string {
		return <<<'JS'
( function( hooks, element, components, blockEditor, compose, apiFetch ) {
	var addFilter          = hooks.addFilter;
	var el                 = element.createElement;
	var useEffect          = element.useEffect;
	var Fragment           = element.Fragment;
	var InspectorControls  = blockEditor.InspectorControls;
	var PanelBody          = components.PanelBody;
	var DatePicker         = components.DatePicker;
	var Button             = components.Button;
	var ToggleControl      = components.ToggleControl;
	var VStack             = components.VStack || components.__experimentalVStack;
	var Text               = components.__experimentalText;
	var HOC                = compose.createHigherOrderComponent;

	// -----------------------------------------------------------------------
	// apiFetch middleware — injects event_date_filter into REST requests
	// for the event post type when a filter is active.
	//
	// activeFilters is keyed by queryId so multiple Query Loop blocks on
	// the same page each apply their own filter correctly.
	// -----------------------------------------------------------------------
	var activeFilters = {};
	// keyed by queryId: { date: '', speakerFilter: false }
	var activeFiltersBySpeaker = {};

	// keyed by queryId: true/false (filterByEvent active)
	var activeFiltersByEvent = {};

	apiFetch.use( function( options, next ) {
		if ( options.path && options.path.indexOf( '/wp/v2/event' ) !== -1 ) {
			var filterDate     = '';
			var filterSpeaker  = false;
			var keys = Object.keys( activeFilters );
			for ( var i = 0; i < keys.length; i++ ) {
				if ( activeFilters[ keys[ i ] ] ) {
					filterDate = activeFilters[ keys[ i ] ];
					break;
				}
			}
			var skeys = Object.keys( activeFiltersBySpeaker );
			for ( var j = 0; j < skeys.length; j++ ) {
				if ( activeFiltersBySpeaker[ skeys[ j ] ] ) {
					filterSpeaker = true;
					break;
				}
			}
			if ( filterDate && options.path.indexOf( 'event_date_filter' ) === -1 ) {
				var sep = options.path.indexOf( '?' ) !== -1 ? '&' : '?';
				options.path += sep + 'event_date_filter=' + encodeURIComponent( filterDate );
			}
			if ( filterSpeaker && options.path.indexOf( 'speaker_filter' ) === -1 ) {
				var currentPostId = window.wp.data.select( 'core/editor' ).getCurrentPostId();
				if ( currentPostId ) {
					var sep2 = options.path.indexOf( '?' ) !== -1 ? '&' : '?';
					options.path += sep2 + 'speaker_filter=' + encodeURIComponent( currentPostId );
				}
			}
		}
		if ( options.path && options.path.indexOf( '/wp/v2/speaker' ) !== -1 ) {
			var filterEvent = false;
			var ekeys = Object.keys( activeFiltersByEvent );
			for ( var k = 0; k < ekeys.length; k++ ) {
				if ( activeFiltersByEvent[ ekeys[ k ] ] ) {
					filterEvent = true;
					break;
				}
			}
			if ( filterEvent && options.path.indexOf( 'event_filter' ) === -1 ) {
				var currentEventId = window.wp.data.select( 'core/editor' ).getCurrentPostId();
				if ( currentEventId ) {
					var sep3 = options.path.indexOf( '?' ) !== -1 ? '&' : '?';
					options.path += sep3 + 'event_filter=' + encodeURIComponent( currentEventId );
				}
			}
		}
		return next( options );
	} );

	// -----------------------------------------------------------------------
	// Inject a "Filter by date" panel into the Query Loop inspector,
	// visible only when the block queries the "event" post type.
	//
	// The date filter is stored INSIDE the existing `query` attribute object
	// (query.eventDateFilter) so that it flows to child blocks via the
	// built-in providesContext mapping without any extra wiring.
	// -----------------------------------------------------------------------
	var withDateFilterInspector = HOC( function( BlockEdit ) {
		return function( props ) {
			if ( props.name !== 'core/query' ) {
				return el( BlockEdit, props );
			}

			var query    = props.attributes.query || {};
			var postType = query.postType;
			var queryId  = props.attributes.queryId || 0;

			// Keep activeFilters in sync — even when postType is not event
			// (so that clearing/switching post type removes the filter).
			var dateFilter      = postType === 'event' ? ( query.eventDateFilter || '' ) : '';
			var filterBySpeaker = postType === 'event' ? !! query.filterBySpeaker : false;

			useEffect( function() {
				activeFilters[ queryId ] = dateFilter;
				return function() {
					delete activeFilters[ queryId ];
				};
			}, [ queryId, dateFilter ] );

			useEffect( function() {
				activeFiltersBySpeaker[ queryId ] = filterBySpeaker;
				return function() {
					delete activeFiltersBySpeaker[ queryId ];
				};
			}, [ queryId, filterBySpeaker ] );

			if ( postType !== 'event' ) {
				return el( BlockEdit, props );
			}

			function handleChange( isoString ) {
				var dateOnly = isoString ? isoString.slice( 0, 10 ) : '';
				props.setAttributes( {
					query: Object.assign( {}, query, { eventDateFilter: dateOnly } )
				} );
			}

			function clearFilter() {
				var updated = Object.assign( {}, query );
				delete updated.eventDateFilter;
				props.setAttributes( { query: updated } );
			}

			// Format stored "Y-m-d" for display without timezone drift.
			function formatDate( ymd ) {
				var parts = ymd.split( '-' );
				var d     = new Date( +parts[0], +parts[1] - 1, +parts[2] );
				return d.toLocaleDateString( undefined, {
					year: 'numeric', month: 'long', day: 'numeric'
				} );
			}

			// Pass "Y-m-dT12:00:00" so the picker lands on the right day
			// regardless of the browser's UTC offset.
			var pickerDate = dateFilter ? ( dateFilter + 'T12:00:00' ) : undefined;

			return el(
				Fragment,
				null,
				el( BlockEdit, props ),
				el(
					InspectorControls,
					null,
					el(
						PanelBody,
						{
							title: 'Filter by speaker' + ( filterBySpeaker ? ' \u2022' : '' ),
							initialOpen: filterBySpeaker,
						},
						el( ToggleControl, {
							label: 'Filter by current speaker',
							help: filterBySpeaker
								? 'Showing only events for the speaker being viewed.'
								: 'When enabled, only events for the current speaker are shown.',
							checked: filterBySpeaker,
							onChange: function( val ) {
								props.setAttributes( {
									query: Object.assign( {}, query, { filterBySpeaker: val } )
								} );
							},
							__nextHasNoMarginBottom: true,
						} )
					),
					el(
						PanelBody,
						{
							title: 'Filter by date' + ( dateFilter ? ' \u2022' : '' ),
							initialOpen: !! dateFilter,
						},
						el( DatePicker, {
							currentDate: pickerDate,
							onChange: handleChange,
						} ),
						el(
						VStack,
						{ spacing: 3, style: { padding: '0 16px 16px' } },
						dateFilter
							? el( Text, { size: 'small' },
								'Showing events on: ',
								el( 'strong', null, formatDate( dateFilter ) )
							)
							: el( Text, { size: 'small', variant: 'muted' },
								'No date filter active \u2014 all events are shown.'
							),
						dateFilter && el(
							Button,
							{
								variant: 'secondary',
								isDestructive: true,
								onClick: clearFilter,
								isFullWidth: true,
							},
							'Clear filter'
						)
					)
					)
				)
			);
		};
	}, 'withDateFilterInspector' );

	addFilter(
		'editor.BlockEdit',
		'events-speakers/date-filter-inspector',
		withDateFilterInspector
	);

	// -----------------------------------------------------------------------
	// Inject a "Filter by event" panel into Query Loop blocks that query
	// the "speaker" post type, enabling the speakers list on event pages.
	// -----------------------------------------------------------------------
	var withEventFilterInspector = HOC( function( BlockEdit ) {
		return function( props ) {
			if ( props.name !== 'core/query' ) {
				return el( BlockEdit, props );
			}

			var query    = props.attributes.query || {};
			var postType = query.postType;
			var queryId  = props.attributes.queryId || 0;

			var filterByEvent = postType === 'speaker' ? !! query.filterByEvent : false;

			useEffect( function() {
				activeFiltersByEvent[ queryId ] = filterByEvent;
				return function() {
					delete activeFiltersByEvent[ queryId ];
				};
			}, [ queryId, filterByEvent ] );

			if ( postType !== 'speaker' ) {
				return el( BlockEdit, props );
			}

			return el(
				Fragment,
				null,
				el( BlockEdit, props ),
				el(
					InspectorControls,
					null,
					el(
						PanelBody,
						{
							title: 'Filter by event' + ( filterByEvent ? ' \u2022' : '' ),
							initialOpen: filterByEvent,
						},
						el( ToggleControl, {
							label: 'Filter by current event',
							help: filterByEvent
								? 'Showing only speakers for the event being viewed.'
								: 'When enabled, only speakers for the current event are shown.',
							checked: filterByEvent,
							onChange: function( val ) {
								props.setAttributes( {
									query: Object.assign( {}, query, { filterByEvent: val } )
								} );
							},
							__nextHasNoMarginBottom: true,
						} )
					)
				)
			);
		};
	}, 'withEventFilterInspector' );

	addFilter(
		'editor.BlockEdit',
		'events-speakers/event-filter-inspector',
		withEventFilterInspector
	);

} )(
	window.wp.hooks,
	window.wp.element,
	window.wp.components,
	window.wp.blockEditor,
	window.wp.compose,
	window.wp.apiFetch
);
JS;
	}

	private static function sidebar_script(): string {
		return <<<'JS'
( function( plugins, editPost, element, components, data ) {
	var registerPlugin              = plugins.registerPlugin;
	var PluginDocumentSettingPanel  = editPost.PluginDocumentSettingPanel;
	var el                          = element.createElement;
	var useState                    = element.useState;
	var useSelect                   = data.useSelect;
	var useDispatch                 = data.useDispatch;
	var DatePicker                  = components.DatePicker;
	var CheckboxControl             = components.CheckboxControl;
	var SearchControl               = components.SearchControl;
	var TextControl                 = components.TextControl;
	var VStack                      = components.VStack || components.__experimentalVStack;
	var Text                        = components.__experimentalText;
	var Divider                     = components.__experimentalDivider;

	// -------------------------------------------------------------------------
	// Event meta sidebar panel
	// -------------------------------------------------------------------------
	registerPlugin( 'es-event-meta', {
		render: function() {
			// All hooks must be called unconditionally before any early return.
			var postType = useSelect( function( select ) {
				return select( 'core/editor' ).getCurrentPostType();
			} );

			var meta = useSelect( function( select ) {
				return select( 'core/editor' ).getEditedPostAttribute( 'meta' ) || {};
			} );

			var editPostDispatch = useDispatch( 'core/editor' );
			var editPost = editPostDispatch.editPost;

			var speakers = useSelect( function( select ) {
				return select( 'core' ).getEntityRecords( 'postType', 'speaker', {
					status: 'publish',
					per_page: -1,
					orderby: 'title',
					order: 'asc',
				} );
			} );

			var srchArr    = useState( '' );
			var search     = srchArr[0]; var setSearch = srchArr[1];

			if ( postType !== 'event' ) return null;

			var date       = meta.event_date || '';
			var startTime  = meta.event_start_time || '';
			var endTime    = meta.event_end_time || '';
			var selectedSpeakers;
			try { selectedSpeakers = JSON.parse( meta.event_speakers || '[]' ); } catch(e) { selectedSpeakers = []; }
			if ( ! Array.isArray( selectedSpeakers ) ) selectedSpeakers = [];

			function setMeta( key, value ) {
				var patch = {}; patch[ key ] = value;
				editPost( { meta: patch } );
			}

			function toggleSpeaker( id, checked ) {
				var updated = checked
					? selectedSpeakers.concat( [ id ] )
					: selectedSpeakers.filter( function( i ) { return i !== id; } );
				setMeta( 'event_speakers', JSON.stringify( updated ) );
			}

			var filteredSpeakers = ( speakers || [] ).filter( function( s ) {
				var name = s.title && s.title.rendered ? s.title.rendered : '';
				return ! search || name.toLowerCase().indexOf( search.toLowerCase() ) !== -1;
			} );

			// Build speaker list children
			var speakerItems = [];
			if ( speakers === null ) {
				speakerItems.push( el( Text, { key: 'loading', variant: 'muted' }, 'Loading\u2026' ) );
			} else if ( speakers.length === 0 ) {
				speakerItems.push( el( Text, { key: 'empty', variant: 'muted' }, 'No published speakers found.' ) );
			} else {
				if ( speakers.length > 5 ) {
					speakerItems.push( el( SearchControl, {
						key: 'search',
						value: search,
						onChange: setSearch,
						placeholder: 'Filter speakers\u2026',
						__nextHasNoMarginBottom: true,
					} ) );
				}
				filteredSpeakers.forEach( function( s ) {
					var name = s.title && s.title.rendered ? s.title.rendered : '';
					speakerItems.push( el( CheckboxControl, {
						key: s.id,
						label: name,
						checked: selectedSpeakers.indexOf( s.id ) !== -1,
						onChange: function( checked ) { toggleSpeaker( s.id, checked ); },
						__nextHasNoMarginBottom: true,
					} ) );
				} );
			}

			return el(
				PluginDocumentSettingPanel,
				{ name: 'es-event-details', title: 'Event Details', icon: 'calendar-alt', className: 'es-event-details-panel' },
				el( VStack, { spacing: 4 },
					// Date
					el( VStack, { spacing: 2 },
						el( Text, { weight: 600 }, 'Date' ),
						el( DatePicker, {
							currentDate: date ? date + 'T12:00:00' : null,
							onChange: function( v ) { setMeta( 'event_date', v ? v.slice( 0, 10 ) : '' ); },
						} )
					),
					el( Divider ),
					// Time — start and end in one compact row
					el( VStack, { spacing: 2 },
						el( Text, { weight: 600 }, 'Time' ),
						el( 'div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } },
							el( 'input', {
								type: 'time',
								value: startTime,
								placeholder: '--:--',
								onChange: function( e ) { setMeta( 'event_start_time', e.target.value ); },
								style: {
									flex: 1,
									padding: '6px 8px',
									border: '1px solid #949494',
									borderRadius: '2px',
									fontSize: '13px',
									lineHeight: '1.4',
									color: 'inherit',
									background: 'transparent',
								},
							} ),
							el( 'span', { style: { color: '#757575', flexShrink: 0 } }, '\u2013' ),
							el( 'input', {
								type: 'time',
								value: endTime,
								placeholder: '--:--',
								onChange: function( e ) { setMeta( 'event_end_time', e.target.value ); },
								style: {
									flex: 1,
									padding: '6px 8px',
									border: '1px solid #949494',
									borderRadius: '2px',
									fontSize: '13px',
									lineHeight: '1.4',
									color: 'inherit',
									background: 'transparent',
								},
							} )
						)
					),
					el( Divider ),
					// Speakers
					el.apply( null, [ VStack, { spacing: 2 },
						el( Text, { weight: 600 }, 'Speakers' )
					].concat( speakerItems ) )
				)
			);
		},
	} );

	// -------------------------------------------------------------------------
	// Speaker meta sidebar panel
	// -------------------------------------------------------------------------
	registerPlugin( 'es-speaker-meta', {
		render: function() {
			// All hooks must be called unconditionally before any early return.
			var postType = useSelect( function( select ) {
				return select( 'core/editor' ).getCurrentPostType();
			} );

			var meta = useSelect( function( select ) {
				return select( 'core/editor' ).getEditedPostAttribute( 'meta' ) || {};
			} );

			var editPostDispatch = useDispatch( 'core/editor' );
			var editPost = editPostDispatch.editPost;

			var speakerId = useSelect( function( select ) {
				return select( 'core/editor' ).getCurrentPostId();
			} );

			var relatedEvents = useSelect( function( select ) {
				if ( ! speakerId ) return [];
				return select( 'core' ).getEntityRecords( 'postType', 'event', {
					status: 'publish',
					per_page: -1,
					speaker_filter: speakerId,
				} );
			} );

			if ( postType !== 'speaker' ) return null;

			var eventItems = [];
			if ( relatedEvents === null ) {
				eventItems.push( el( Text, { key: 'loading', variant: 'muted', size: 'small' }, 'Loading\u2026' ) );
			} else if ( relatedEvents.length === 0 ) {
				eventItems.push( el( Text, { key: 'none', variant: 'muted', size: 'small' }, 'Not assigned to any events yet.' ) );
			} else {
				relatedEvents.forEach( function( ev ) {
					eventItems.push( el( Text, { key: ev.id, size: 'small' }, ev.title && ev.title.rendered ? ev.title.rendered : '\u2014' ) );
				} );
			}

			return el(
				PluginDocumentSettingPanel,
				{ name: 'es-speaker-details', title: 'Speaker Details', icon: 'admin-users', className: 'es-speaker-details-panel' },
				el( VStack, { spacing: 4 },
					el( TextControl, {
						label: 'Title / Position',
						value: meta.speaker_title || '',
						onChange: function( v ) { editPost( { meta: { speaker_title: v } } ); },
						placeholder: 'e.g. Senior Engineer',
						__nextHasNoMarginBottom: true,
						__next40pxDefaultSize: true,
					} ),
					el( Divider ),
					el.apply( null, [ VStack, { spacing: 2 },
						el( Text, { weight: 600 }, 'Speaking at' )
					].concat( eventItems ) )
				)
			);
		},
	} );

} )(
	window.wp.plugins,
	window.wp.editPost,
	window.wp.element,
	window.wp.components,
	window.wp.data
);
JS;
	}
}
