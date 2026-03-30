<?php
defined( 'ABSPATH' ) || exit;

class Events_Speakers_Meta_Fields {

	public static function register(): void {
		// Event: date (stored as Y-m-d string, e.g. "2025-09-15").
		register_post_meta(
			'event',
			'event_date',
			array(
				'type'              => 'string',
				'single'            => true,
				'show_in_rest'      => true,
				'sanitize_callback' => 'sanitize_text_field',
				'auth_callback'     => function () {
					return current_user_can( 'edit_posts' );
				},
			)
		);

		// Event: start time (stored as H:i string, e.g. "09:00").
		register_post_meta(
			'event',
			'event_start_time',
			array(
				'type'              => 'string',
				'single'            => true,
				'show_in_rest'      => true,
				'sanitize_callback' => 'sanitize_text_field',
				'auth_callback'     => function () {
					return current_user_can( 'edit_posts' );
				},
			)
		);

		// Event: end time (stored as H:i string, e.g. "10:00").
		register_post_meta(
			'event',
			'event_end_time',
			array(
				'type'              => 'string',
				'single'            => true,
				'show_in_rest'      => true,
				'sanitize_callback' => 'sanitize_text_field',
				'auth_callback'     => function () {
					return current_user_can( 'edit_posts' );
				},
			)
		);

		// Event: speaker IDs (JSON-encoded array of integers).
		register_post_meta(
			'event',
			'event_speakers',
			array(
				'type'         => 'string',
				'single'       => true,
				'show_in_rest' => true,
				'default'      => '[]',
				'auth_callback' => function () {
					return current_user_can( 'edit_posts' );
				},
			)
		);

		// Speaker: job title / position.
		register_post_meta(
			'speaker',
			'speaker_title',
			array(
				'type'              => 'string',
				'single'            => true,
				'show_in_rest'      => true,
				'sanitize_callback' => 'sanitize_text_field',
				'auth_callback'     => function () {
					return current_user_can( 'edit_posts' );
				},
			)
		);
	}
}
