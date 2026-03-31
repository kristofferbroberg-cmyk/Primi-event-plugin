<?php
defined( 'ABSPATH' ) || exit;

/**
 * Registers block bindings sources for Events and Speakers.
 *
 * Usage inside a Query Loop block (post type = event):
 *
 *   <!-- wp:paragraph {
 *     "metadata": {
 *       "bindings": {
 *         "content": { "source": "events-speakers/event-field", "args": { "key": "start_time" } }
 *       }
 *     }
 *   } /-->
 *
 * Available keys for events-speakers/event-field:
 *   date              — formatted event date (uses WP date_format setting)
 *   date_raw          — raw Y-m-d string as stored (e.g. "2025-09-15")
 *   start_time        — formatted start time (uses WP time_format setting)
 *   end_time          — formatted end time
 *   start_time_raw    — raw H:i string as stored (e.g. "09:00")
 *   end_time_raw      — raw H:i string as stored
 *   speakers_list     — comma-separated speaker names
 *   speakers_count    — number of assigned speakers
 *
 * Available keys for events-speakers/speaker-field (post type = speaker):
 *   title             — speaker's Title / Position meta
 *   events_list       — comma-separated titles of all events this speaker appears in
 *   events_count      — number of events this speaker appears in
 *   events_dates      — comma-separated formatted dates of all events
 *   next_event_title  — title of the soonest upcoming (or most recent) event
 *   next_event_date   — formatted date of that event
 *   next_event_time   — formatted time range of that event (e.g. "09:00–11:00")
 */
class Events_Speakers_Block_Bindings {

	public static function register(): void {
		if ( ! function_exists( 'register_block_bindings_source' ) ) {
			return; // Requires WP 6.5+.
		}

		register_block_bindings_source(
			'events-speakers/event-field',
			array(
				'label'              => __( 'Event Fields', 'events-speakers' ),
				'get_value_callback' => array( self::class, 'get_event_field' ),
				'uses_context'       => array( 'postId', 'postType' ),
			)
		);

		register_block_bindings_source(
			'events-speakers/speaker-field',
			array(
				'label'              => __( 'Speaker Fields', 'events-speakers' ),
				'get_value_callback' => array( self::class, 'get_speaker_field' ),
				'uses_context'       => array( 'postId', 'postType' ),
			)
		);
	}

	/**
	 * @param array    $source_args     Args from the block binding: { "key": "..." }
	 * @param WP_Block $block_instance  The bound block instance (has ->context['postId']).
	 * @param string   $attribute_name  The block attribute being bound.
	 */
	public static function get_event_field( array $source_args, WP_Block $block_instance, string $attribute_name ): ?string {
		$post_id = isset( $block_instance->context['postId'] )
			? absint( $block_instance->context['postId'] )
			: get_the_ID();

		if ( ! $post_id || 'event' !== get_post_type( $post_id ) ) {
			return null;
		}

		$key = isset( $source_args['key'] ) ? sanitize_key( $source_args['key'] ) : '';

		switch ( $key ) {
			case 'date':
				return self::format_date( get_post_meta( $post_id, 'event_date', true ) );

			case 'date_raw':
				return get_post_meta( $post_id, 'event_date', true ) ?: null;

			case 'start_time':
				return self::format_time( get_post_meta( $post_id, 'event_start_time', true ) );

			case 'end_time':
				return self::format_time( get_post_meta( $post_id, 'event_end_time', true ) );

			case 'start_time_raw':
				return get_post_meta( $post_id, 'event_start_time', true ) ?: null;

			case 'end_time_raw':
				return get_post_meta( $post_id, 'event_end_time', true ) ?: null;

			case 'speakers_list':
			case 'event_speakers': // Alias: catch direct meta-key bindings.
				return self::get_speakers_list( $post_id );

			case 'speakers_links':
				return self::get_speakers_links( $post_id );

			case 'speakers_count':
				$ids = self::get_speaker_ids( $post_id );
				return (string) count( $ids );

			default:
				return null;
		}
	}

	public static function get_speaker_field( array $source_args, WP_Block $block_instance, string $attribute_name ): ?string {
		$post_id = isset( $block_instance->context['postId'] )
			? absint( $block_instance->context['postId'] )
			: get_the_ID();

		if ( ! $post_id || 'speaker' !== get_post_type( $post_id ) ) {
			return null;
		}

		$key = isset( $source_args['key'] ) ? sanitize_key( $source_args['key'] ) : '';

		switch ( $key ) {
			case 'title':
				return get_post_meta( $post_id, 'speaker_title', true ) ?: null;

			case 'events_list':
				return self::get_speaker_events_list( $post_id );

			case 'events_links':
				return self::get_speaker_events_links( $post_id );

			case 'events_count':
				return (string) count( self::get_speaker_event_ids( $post_id ) );

			case 'events_dates':
				return self::get_speaker_events_dates( $post_id );

			case 'next_event_title':
				$ev = self::get_speaker_next_event( $post_id );
				return $ev ? get_the_title( $ev ) : null;

			case 'next_event_date':
				$ev = self::get_speaker_next_event( $post_id );
				return $ev ? self::format_date( get_post_meta( $ev, 'event_date', true ) ) : null;

			case 'next_event_time':
				$ev = self::get_speaker_next_event( $post_id );
				if ( ! $ev ) return null;
				$start = self::format_time( get_post_meta( $ev, 'event_start_time', true ) );
				$end   = self::format_time( get_post_meta( $ev, 'event_end_time', true ) );
				if ( $start && $end ) return $start . '–' . $end;
				return $start ?: $end ?: null;

			default:
				return null;
		}
	}

	// -------------------------------------------------------------------------
	// Helpers
	// -------------------------------------------------------------------------

	private static function format_date( string $raw ): ?string {
		if ( '' === $raw ) {
			return null;
		}

		$timestamp = strtotime( $raw );
		if ( false === $timestamp ) {
			return esc_html( $raw );
		}

		return esc_html( date_i18n( get_option( 'date_format' ), $timestamp ) );
	}

	private static function format_time( string $raw ): ?string {
		if ( '' === $raw ) {
			return null;
		}

		// Prepend a fixed date so strtotime can parse a bare "H:i" string.
		$timestamp = strtotime( '1970-01-01 ' . $raw );
		if ( false === $timestamp ) {
			return esc_html( $raw );
		}

		return esc_html( date_i18n( get_option( 'time_format' ), $timestamp ) );
	}

	/**
	 * @return int[]
	 */
	private static function get_speaker_ids( int $post_id ): array {
		// Temporarily remove the display-value filter so we always get raw JSON.
		remove_filter( 'get_post_metadata', 'events_speakers_speakers_display_value', 10 );
		$json = get_post_meta( $post_id, 'event_speakers', true );
		add_filter( 'get_post_metadata', 'events_speakers_speakers_display_value', 10, 4 );

		$ids = json_decode( $json ?: '[]', true );
		return is_array( $ids ) ? array_map( 'absint', $ids ) : array();
	}

	/**
	 * Get IDs of all published events that include this speaker.
	 *
	 * @return int[]
	 */
	private static function get_speaker_event_ids( int $speaker_id ): array {
		$events = get_posts( array(
			'post_type'      => 'event',
			'posts_per_page' => -1,
			'post_status'    => 'publish',
			'fields'         => 'ids',
			'meta_query'     => array( self::speaker_meta_query( $speaker_id ) ),
		) );

		return array_map( 'absint', $events );
	}

	/**
	 * Returns a meta_query clause that matches a speaker ID stored as a JSON integer
	 * in any position within the event_speakers array, e.g. [42], [42,1], [1,42], [1,42,2].
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

	private static function get_speaker_events_list( int $speaker_id ): ?string {
		$ids = self::get_speaker_event_ids( $speaker_id );
		if ( empty( $ids ) ) {
			return null;
		}

		$titles = array_filter( array_map( 'get_the_title', $ids ) );
		return empty( $titles ) ? null : esc_html( implode( ', ', $titles ) );
	}

	private static function get_speaker_events_links( int $speaker_id ): ?string {
		$ids = self::get_speaker_event_ids( $speaker_id );
		if ( empty( $ids ) ) {
			return null;
		}

		$links = array();
		foreach ( $ids as $id ) {
			$title = get_the_title( $id );
			$url   = get_permalink( $id );
			if ( $title && $url ) {
				$links[] = '<a href="' . esc_url( $url ) . '">' . esc_html( $title ) . '</a>';
			}
		}

		return empty( $links ) ? null : implode( ', ', $links );
	}

	private static function get_speaker_events_dates( int $speaker_id ): ?string {
		$ids = self::get_speaker_event_ids( $speaker_id );
		if ( empty( $ids ) ) {
			return null;
		}

		$dates = array();
		foreach ( $ids as $event_id ) {
			$formatted = self::format_date( get_post_meta( $event_id, 'event_date', true ) );
			if ( $formatted ) {
				$dates[] = $formatted;
			}
		}

		return empty( $dates ) ? null : implode( ', ', $dates );
	}

	/**
	 * Returns the ID of the speaker's next upcoming event (by event_date),
	 * falling back to the most recent past event if none are upcoming.
	 */
	private static function get_speaker_next_event( int $speaker_id ): ?int {
		$ids = self::get_speaker_event_ids( $speaker_id );
		if ( empty( $ids ) ) {
			return null;
		}

		$today = date( 'Y-m-d' );
		$future = array();
		$past   = array();

		foreach ( $ids as $event_id ) {
			$date = get_post_meta( $event_id, 'event_date', true );
			if ( $date >= $today ) {
				$future[ $event_id ] = $date;
			} else {
				$past[ $event_id ] = $date;
			}
		}

		if ( ! empty( $future ) ) {
			asort( $future );
			return (int) array_key_first( $future );
		}

		asort( $past );
		return (int) array_key_last( $past );
	}

	private static function get_speakers_links( int $post_id ): ?string {
		$ids = self::get_speaker_ids( $post_id );
		if ( empty( $ids ) ) {
			return null;
		}

		$links = array();
		foreach ( $ids as $id ) {
			$name = get_the_title( $id );
			$url  = get_permalink( $id );
			if ( $name && $url ) {
				$links[] = '<a href="' . esc_url( $url ) . '">' . esc_html( $name ) . '</a>';
			}
		}

		return empty( $links ) ? null : implode( ', ', $links );
	}

	private static function get_speakers_list( int $post_id ): ?string {
		$ids = self::get_speaker_ids( $post_id );
		if ( empty( $ids ) ) {
			return null;
		}

		$names = array_map(
			function ( int $id ): string {
				return get_the_title( $id );
			},
			$ids
		);

		$names = array_filter( $names ); // Remove empty strings for deleted posts.

		return empty( $names ) ? null : esc_html( implode( ', ', $names ) );
	}
}
