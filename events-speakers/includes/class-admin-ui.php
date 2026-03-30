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

		$event_date      = get_post_meta( $post->ID, 'event_date', true );
		$start_time      = get_post_meta( $post->ID, 'event_start_time', true );
		$end_time        = get_post_meta( $post->ID, 'event_end_time', true );
		$speakers_json   = get_post_meta( $post->ID, 'event_speakers', true );
		$selected_ids    = json_decode( $speakers_json ?: '[]', true ) ?: array();

		$all_speakers = get_posts(
			array(
				'post_type'      => 'speaker',
				'posts_per_page' => -1,
				'orderby'        => 'title',
				'order'          => 'ASC',
				'post_status'    => 'publish',
			)
		);
		?>
		<table class="form-table" role="presentation">
			<tr>
				<th scope="row">
					<label for="event_date"><?php esc_html_e( 'Date', 'events-speakers' ); ?></label>
				</th>
				<td>
					<input
						type="date"
						id="event_date"
						name="event_date"
						value="<?php echo esc_attr( $event_date ); ?>"
					/>
				</td>
			</tr>
			<tr>
				<th scope="row">
					<label for="event_start_time"><?php esc_html_e( 'Start time', 'events-speakers' ); ?></label>
				</th>
				<td>
					<input
						type="time"
						id="event_start_time"
						name="event_start_time"
						value="<?php echo esc_attr( $start_time ); ?>"
					/>
				</td>
			</tr>
			<tr>
				<th scope="row">
					<label for="event_end_time"><?php esc_html_e( 'End time', 'events-speakers' ); ?></label>
				</th>
				<td>
					<input
						type="time"
						id="event_end_time"
						name="event_end_time"
						value="<?php echo esc_attr( $end_time ); ?>"
					/>
				</td>
			</tr>
			<tr>
				<th scope="row"><?php esc_html_e( 'Speakers', 'events-speakers' ); ?></th>
				<td>
					<?php if ( empty( $all_speakers ) ) : ?>
						<p class="description"><?php esc_html_e( 'No published speakers found. Create speakers first.', 'events-speakers' ); ?></p>
					<?php else : ?>
						<fieldset>
							<?php foreach ( $all_speakers as $speaker ) : ?>
								<label style="display:block;margin-bottom:4px;">
									<input
										type="checkbox"
										name="event_speakers[]"
										value="<?php echo esc_attr( $speaker->ID ); ?>"
										<?php checked( in_array( $speaker->ID, $selected_ids, true ) ); ?>
									/>
									<?php echo esc_html( $speaker->post_title ); ?>
								</label>
							<?php endforeach; ?>
						</fieldset>
					<?php endif; ?>
				</td>
			</tr>
		</table>
		<?php
	}

	public static function render_speaker_meta_box( WP_Post $post ): void {
		wp_nonce_field( 'events_speakers_save_speaker', 'events_speakers_speaker_nonce' );

		$speaker_title = get_post_meta( $post->ID, 'speaker_title', true );
		?>
		<table class="form-table" role="presentation">
			<tr>
				<th scope="row">
					<label for="speaker_title"><?php esc_html_e( 'Title / Position', 'events-speakers' ); ?></label>
				</th>
				<td>
					<input
						type="text"
						id="speaker_title"
						name="speaker_title"
						value="<?php echo esc_attr( $speaker_title ); ?>"
						class="regular-text"
						placeholder="<?php esc_attr_e( 'e.g. Senior Engineer', 'events-speakers' ); ?>"
					/>
				</td>
			</tr>
		</table>
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

		// Speakers: array of integer IDs submitted as checkboxes.
		$speaker_ids = array();
		if ( isset( $_POST['event_speakers'] ) && is_array( $_POST['event_speakers'] ) ) {
			$speaker_ids = array_map( 'absint', $_POST['event_speakers'] );
			// Verify each ID belongs to a published speaker post.
			$speaker_ids = array_filter(
				$speaker_ids,
				function ( $id ) {
					return 'speaker' === get_post_type( $id );
				}
			);
			$speaker_ids = array_values( $speaker_ids );
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
