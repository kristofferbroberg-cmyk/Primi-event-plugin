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
		if ( ( $block->context['query']['postType'] ?? '' ) !== 'event' ) {
			return $query;
		}

		$date_filter = trim( $block->context['query']['eventDateFilter'] ?? '' );
		if ( '' === $date_filter ) {
			return $query;
		}

		self::add_date_meta_query( $query, $date_filter );

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

		return $params;
	}

	/**
	 * When the REST API receives `event_date_filter`, add a meta_query clause.
	 */
	public static function apply_rest_date_filter( array $args, WP_REST_Request $request ): array {
		$date = $request->get_param( 'event_date_filter' );
		if ( empty( $date ) ) {
			return $args;
		}

		self::add_date_meta_query( $args, $date );

		return $args;
	}

	// -------------------------------------------------------------------------
	// Shared helper
	// -------------------------------------------------------------------------

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
	// Editor assets
	// -------------------------------------------------------------------------

	public static function enqueue_editor_assets(): void {
		wp_register_script(
			'events-speakers-blocks',
			'',
			array( 'wp-hooks', 'wp-element', 'wp-components', 'wp-block-editor', 'wp-compose', 'wp-api-fetch' ),
			null,
			true
		);
		wp_enqueue_script( 'events-speakers-blocks' );
		wp_add_inline_script( 'events-speakers-blocks', self::editor_script() );
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
	var HOC                = compose.createHigherOrderComponent;

	// -----------------------------------------------------------------------
	// apiFetch middleware — injects event_date_filter into REST requests
	// for the event post type when a filter is active.
	//
	// activeFilters is keyed by queryId so multiple Query Loop blocks on
	// the same page each apply their own filter correctly.
	// -----------------------------------------------------------------------
	var activeFilters = {};

	apiFetch.use( function( options, next ) {
		if ( options.path && options.path.indexOf( '/wp/v2/event' ) !== -1 ) {
			// Find any active filter value.  For REST requests we cannot
			// determine the queryId, so use the most recently set filter.
			var filterDate = '';
			var keys = Object.keys( activeFilters );
			for ( var i = 0; i < keys.length; i++ ) {
				if ( activeFilters[ keys[ i ] ] ) {
					filterDate = activeFilters[ keys[ i ] ];
					break;
				}
			}
			if ( filterDate && options.path.indexOf( 'event_date_filter' ) === -1 ) {
				var sep = options.path.indexOf( '?' ) !== -1 ? '&' : '?';
				options.path += sep + 'event_date_filter=' + encodeURIComponent( filterDate );
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
			var dateFilter = postType === 'event' ? ( query.eventDateFilter || '' ) : '';

			useEffect( function() {
				activeFilters[ queryId ] = dateFilter;
				return function() {
					delete activeFilters[ queryId ];
				};
			}, [ queryId, dateFilter ] );

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
							title: 'Filter by date' + ( dateFilter ? ' \u2022' : '' ),
							initialOpen: !! dateFilter,
						},
						el( DatePicker, {
							currentDate: pickerDate,
							onChange: handleChange,
						} ),
						el(
							'div',
							{ style: { padding: '0 16px 16px' } },
							dateFilter
								? el(
									'div',
									{ style: { marginBottom: '8px', fontSize: '12px', color: '#1d2327' } },
									'Showing events on: ',
									el( 'strong', null, formatDate( dateFilter ) )
								)
								: el(
									'p',
									{ style: { margin: '0', fontSize: '12px', color: '#757575' } },
									'No date filter active \u2014 all events are shown.'
								),
							dateFilter && el(
								Button,
								{
									variant: 'secondary',
									isDestructive: true,
									onClick: clearFilter,
									style: { width: '100%', justifyContent: 'center' },
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
}
