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
 * Available keys for events-speakers/speaker-field (Query Loop, post type = speaker):
 *   title             — speaker's Title / Position meta
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
				return self::get_speakers_list( $post_id );

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
		$json = get_post_meta( $post_id, 'event_speakers', true );
		$ids  = json_decode( $json ?: '[]', true );
		return is_array( $ids ) ? array_map( 'absint', $ids ) : array();
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
