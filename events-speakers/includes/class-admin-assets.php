<?php
defined( 'ABSPATH' ) || exit;

class Events_Speakers_Admin_Assets {

	public static function enqueue( string $hook ): void {
		if ( ! in_array( $hook, array( 'post.php', 'post-new.php' ), true ) ) {
			return;
		}

		$screen = get_current_screen();

		if ( 'event' === $screen->post_type ) {
			self::enqueue_event_assets();
		}

		if ( 'speaker' === $screen->post_type ) {
			self::enqueue_speaker_assets();
		}
	}

	private static function enqueue_event_assets(): void {
		wp_enqueue_style( 'wp-components' );

		wp_register_script(
			'es-event-meta',
			'',
			array( 'wp-element', 'wp-components' ),
			null,
			true
		);
		wp_add_inline_script( 'es-event-meta', self::event_meta_script() );
		wp_enqueue_script( 'es-event-meta' );
	}

	private static function enqueue_speaker_assets(): void {
		wp_enqueue_style( 'wp-components' );

		wp_register_script(
			'es-speaker-meta',
			'',
			array( 'wp-element', 'wp-components' ),
			null,
			true
		);
		wp_add_inline_script( 'es-speaker-meta', self::speaker_meta_script() );
		wp_enqueue_script( 'es-speaker-meta' );
	}

	// -------------------------------------------------------------------------
	// React scripts
	// -------------------------------------------------------------------------

	private static function event_meta_script(): string {
		return <<<'JS'
( function() {
	if ( typeof wp === 'undefined' || ! wp.element || ! wp.components ) return;

	var el         = wp.element.createElement;
	var useState   = wp.element.useState;
	var useEffect  = wp.element.useEffect;
	var VStack     = wp.components.VStack || wp.components.__experimentalVStack;
	var Text       = wp.components.__experimentalText;
	var Divider    = wp.components.__experimentalDivider;
	var DatePicker = wp.components.DatePicker;
	var TimePicker = wp.components.TimePicker;
	var CheckboxControl = wp.components.CheckboxControl;
	var SearchControl   = wp.components.SearchControl;

	function extractTime( val ) {
		if ( ! val ) return '';
		var idx = val.indexOf( 'T' );
		return idx !== -1 ? val.slice( idx + 1, idx + 6 ) : val.slice( 0, 5 );
	}

	function syncInput( id, value ) {
		var input = document.getElementById( id );
		if ( input ) input.value = value;
	}

	function EventMetaFields() {
		var data = window.esEventMetaData || {};

		var dateArr    = useState( data.date || '' );
		var date       = dateArr[0]; var setDate = dateArr[1];

		var startArr   = useState( data.startTime || '' );
		var startTime  = startArr[0]; var setStartTime = startArr[1];

		var endArr     = useState( data.endTime || '' );
		var endTime    = endArr[0]; var setEndTime = endArr[1];

		var spkArr     = useState( data.selectedSpeakers || [] );
		var selectedSpeakers = spkArr[0]; var setSelectedSpeakers = spkArr[1];

		var srchArr    = useState( '' );
		var search     = srchArr[0]; var setSearch = srchArr[1];

		useEffect( function() { syncInput( 'event_date_hidden', date ); },       [ date ] );
		useEffect( function() { syncInput( 'event_start_time_hidden', startTime ); }, [ startTime ] );
		useEffect( function() { syncInput( 'event_end_time_hidden', endTime ); }, [ endTime ] );
		useEffect( function() {
			syncInput( 'event_speakers_json_hidden', JSON.stringify( selectedSpeakers ) );
		}, [ selectedSpeakers ] );

		function toggleSpeaker( id, checked ) {
			setSelectedSpeakers( function( prev ) {
				return checked ? prev.concat( [ id ] ) : prev.filter( function( i ) { return i !== id; } );
			} );
		}

		var speakers = ( data.speakers || [] ).filter( function( s ) {
			return ! search || s.title.toLowerCase().indexOf( search.toLowerCase() ) !== -1;
		} );

		// Build speaker children array
		var speakerItems = [];
		if ( ! data.speakers || data.speakers.length === 0 ) {
			speakerItems.push( el( Text, { key: 'empty', variant: 'muted' }, 'No published speakers found. Create speakers first.' ) );
		} else {
			if ( data.speakers.length > 5 ) {
				speakerItems.push( el( SearchControl, {
					key: 'search',
					value: search,
					onChange: setSearch,
					placeholder: 'Filter speakers\u2026',
					__nextHasNoMarginBottom: true,
				} ) );
			}
			speakers.forEach( function( s ) {
				speakerItems.push( el( CheckboxControl, {
					key: s.id,
					label: s.title,
					checked: selectedSpeakers.indexOf( s.id ) !== -1,
					onChange: function( checked ) { toggleSpeaker( s.id, checked ); },
					__nextHasNoMarginBottom: true,
				} ) );
			} );
		}

		return el( VStack, { spacing: 0 },
			// Date
			el( VStack, { spacing: 2, style: { padding: '12px 0' } },
				el( Text, { weight: 600 }, 'Date' ),
				el( DatePicker, {
					currentDate: date ? date + 'T12:00:00' : null,
					onChange: function( v ) { setDate( v ? v.slice( 0, 10 ) : '' ); },
				} )
			),
			el( Divider ),
			// Start time
			el( VStack, { spacing: 2, style: { padding: '12px 0' } },
				el( Text, { weight: 600 }, 'Start time' ),
				el( TimePicker, {
					currentTime: startTime ? '2000-01-01T' + startTime + ':00' : null,
					onChange: function( v ) { setStartTime( extractTime( v ) ); },
					is12Hour: false,
				} )
			),
			el( Divider ),
			// End time
			el( VStack, { spacing: 2, style: { padding: '12px 0' } },
				el( Text, { weight: 600 }, 'End time' ),
				el( TimePicker, {
					currentTime: endTime ? '2000-01-01T' + endTime + ':00' : null,
					onChange: function( v ) { setEndTime( extractTime( v ) ); },
					is12Hour: false,
				} )
			),
			el( Divider ),
			// Speakers
			el.apply( null, [ VStack, { spacing: 2, style: { padding: '12px 0' } },
				el( Text, { weight: 600 }, 'Speakers' ) ].concat( speakerItems )
			)
		);
	}

	var root = document.getElementById( 'es-event-meta-root' );
	if ( root ) {
		if ( wp.element.createRoot ) {
			wp.element.createRoot( root ).render( el( EventMetaFields ) );
		} else {
			wp.element.render( el( EventMetaFields ), root );
		}
	}
} )();
JS;
	}

	private static function speaker_meta_script(): string {
		return <<<'JS'
( function() {
	if ( typeof wp === 'undefined' || ! wp.element || ! wp.components ) return;

	var el         = wp.element.createElement;
	var useState   = wp.element.useState;
	var useEffect  = wp.element.useEffect;
	var VStack     = wp.components.VStack || wp.components.__experimentalVStack;
	var TextControl = wp.components.TextControl;

	function SpeakerMetaFields() {
		var data = window.esSpeakerMetaData || {};

		var titleArr = useState( data.title || '' );
		var title = titleArr[0]; var setTitle = titleArr[1];

		useEffect( function() {
			var input = document.getElementById( 'speaker_title_hidden' );
			if ( input ) input.value = title;
		}, [ title ] );

		return el( VStack, { spacing: 4, style: { padding: '8px 0 4px' } },
			el( TextControl, {
				label: 'Title / Position',
				value: title,
				onChange: setTitle,
				placeholder: 'e.g. Senior Engineer',
				__nextHasNoMarginBottom: true,
				__next40pxDefaultSize: true,
			} )
		);
	}

	var root = document.getElementById( 'es-speaker-meta-root' );
	if ( root ) {
		if ( wp.element.createRoot ) {
			wp.element.createRoot( root ).render( el( SpeakerMetaFields ) );
		} else {
			wp.element.render( el( SpeakerMetaFields ), root );
		}
	}
} )();
JS;
	}
}
