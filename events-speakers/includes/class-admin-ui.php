<?php
defined( 'ABSPATH' ) || exit;

class Events_Speakers_Admin_UI {

	public static function add_meta_boxes(): void {
		add_meta_box(
			'event_details',
			__( 'Event Details', 'events-speakers' ),
			array( self::class, 'render_event_meta_box' ),
			'event',
			'normal',
			'high'
		);

		add_meta_box(
			'speaker_details',
			__( 'Speaker Details', 'events-speakers' ),
			array( self::class, 'render_speaker_meta_box' ),
			'speaker',
			'normal',
			'high'
		);
	}

	public static function render_event_meta_box( WP_Post $post ): void {
		wp_nonce_field( 'events_speakers_save_event', 'events_speakers_event_nonce' );

		$event_date    = get_post_meta( $post->ID, 'event_date', true );
		$start_time    = get_post_meta( $post->ID, 'event_start_time', true );
		$end_time      = get_post_meta( $post->ID, 'event_end_time', true );
		$speakers_json = get_post_meta( $post->ID, 'event_speakers', true );
		$selected_ids  = json_decode( $speakers_json ?: '[]', true ) ?: array();

		$all_speakers = get_posts(
			array(
				'post_type'      => 'speaker',
				'posts_per_page' => -1,
				'orderby'        => 'title',
				'order'          => 'ASC',
				'post_status'    => 'publish',
			)
		);

		$speakers_data = array_map(
			function ( $s ) {
				return array( 'id' => $s->ID, 'title' => $s->post_title );
			},
			$all_speakers
		);
		?>
		<input type="hidden" id="event_date_hidden"           name="event_date"           value="<?php echo esc_attr( $event_date ); ?>" />
		<input type="hidden" id="event_start_time_hidden"     name="event_start_time"     value="<?php echo esc_attr( $start_time ); ?>" />
		<input type="hidden" id="event_end_time_hidden"       name="event_end_time"       value="<?php echo esc_attr( $end_time ); ?>" />
		<input type="hidden" id="event_speakers_json_hidden"  name="event_speakers_json"  value="<?php echo esc_attr( wp_json_encode( $selected_ids ) ); ?>" />
		<div id="es-event-meta-root"></div>
		<script>
		window.esEventMetaData = <?php echo wp_json_encode( array(
			'date'             => $event_date,
			'startTime'        => $start_time,
			'endTime'          => $end_time,
			'selectedSpeakers' => $selected_ids,
			'speakers'         => $speakers_data,
		) ); ?>;
		</script>
		<?php
	}

	public static function render_speaker_meta_box( WP_Post $post ): void {
		wp_nonce_field( 'events_speakers_save_speaker', 'events_speakers_speaker_nonce' );

		$speaker_title = get_post_meta( $post->ID, 'speaker_title', true );
		?>
		<input type="hidden" id="speaker_title_hidden" name="speaker_title" value="<?php echo esc_attr( $speaker_title ); ?>" />
		<div id="es-speaker-meta-root"></div>
		<script>
		window.esSpeakerMetaData = <?php echo wp_json_encode( array( 'title' => $speaker_title ) ); ?>;
		</script>
		<?php
	}

	public static function save_event_meta( int $post_id, WP_Post $post ): void {
		if (
			! isset( $_POST['events_speakers_event_nonce'] ) ||
			! wp_verify_nonce( sanitize_key( $_POST['events_speakers_event_nonce'] ), 'events_speakers_save_event' )
		) {
			return;
		}

		if ( ! current_user_can( 'edit_post', $post_id ) ) {
			return;
		}

		if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
			return;
		}

		// Date.
		if ( isset( $_POST['event_date'] ) ) {
			update_post_meta( $post_id, 'event_date', sanitize_text_field( wp_unslash( $_POST['event_date'] ) ) );
		}

		// Start time.
		if ( isset( $_POST['event_start_time'] ) ) {
			update_post_meta( $post_id, 'event_start_time', sanitize_text_field( wp_unslash( $_POST['event_start_time'] ) ) );
		}

		// End time.
		if ( isset( $_POST['event_end_time'] ) ) {
			update_post_meta( $post_id, 'event_end_time', sanitize_text_field( wp_unslash( $_POST['event_end_time'] ) ) );
		}

		// Speakers: JSON array of IDs from the React-driven hidden input.
		$speaker_ids = array();
		if ( isset( $_POST['event_speakers_json'] ) ) {
			$decoded = json_decode( wp_unslash( $_POST['event_speakers_json'] ), true );
			if ( is_array( $decoded ) ) {
				$speaker_ids = array_map( 'absint', $decoded );
				$speaker_ids = array_filter(
					$speaker_ids,
					function ( $id ) {
						return 'speaker' === get_post_type( $id );
					}
				);
				$speaker_ids = array_values( $speaker_ids );
			}
		}

		update_post_meta( $post_id, 'event_speakers', wp_json_encode( $speaker_ids ) );
	}

	public static function save_speaker_meta( int $post_id, WP_Post $post ): void {
		if (
			! isset( $_POST['events_speakers_speaker_nonce'] ) ||
			! wp_verify_nonce( sanitize_key( $_POST['events_speakers_speaker_nonce'] ), 'events_speakers_save_speaker' )
		) {
			return;
		}

		if ( ! current_user_can( 'edit_post', $post_id ) ) {
			return;
		}

		if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
			return;
		}

		if ( isset( $_POST['speaker_title'] ) ) {
			update_post_meta( $post_id, 'speaker_title', sanitize_text_field( wp_unslash( $_POST['speaker_title'] ) ) );
		}
	}
}
