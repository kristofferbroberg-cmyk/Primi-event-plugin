<?php
defined( 'ABSPATH' ) || exit;

class Events_Speakers_Post_Types {

	public static function register(): void {
		self::register_event();
		self::register_speaker();
	}

	private static function register_event(): void {
		register_post_type(
			'event',
			array(
				'labels'       => array(
					'name'               => __( 'Events', 'events-speakers' ),
					'singular_name'      => __( 'Event', 'events-speakers' ),
					'add_new_item'       => __( 'Add New Event', 'events-speakers' ),
					'edit_item'          => __( 'Edit Event', 'events-speakers' ),
					'new_item'           => __( 'New Event', 'events-speakers' ),
					'view_item'          => __( 'View Event', 'events-speakers' ),
					'search_items'       => __( 'Search Events', 'events-speakers' ),
					'not_found'          => __( 'No events found.', 'events-speakers' ),
					'not_found_in_trash' => __( 'No events found in trash.', 'events-speakers' ),
				),
				'public'       => true,
				'show_in_rest' => true,
				'menu_icon'    => 'dashicons-calendar-alt',
				'supports'     => array( 'title', 'editor', 'thumbnail', 'excerpt', 'custom-fields' ),
				'has_archive'   => true,
				'rewrite'       => array( 'slug' => 'events' ),
				'template_lock' => 'contentOnly',
				'template'      => array(
					array( 'core/post-featured-image', array() ),
					array( 'core/paragraph', array(
						'placeholder' => 'Short description of the event…',
					) ),
					array( 'core/paragraph', array(
						'metadata' => array(
							'name'     => 'Date',
							'bindings' => array(
								'content' => array(
									'source' => 'events-speakers/event-field',
									'args'   => array( 'key' => 'date' ),
								),
							),
						),
					) ),
					array( 'core/paragraph', array(
						'metadata' => array(
							'name'     => 'Time',
							'bindings' => array(
								'content' => array(
									'source' => 'events-speakers/event-field',
									'args'   => array( 'key' => 'start_time' ),
								),
							),
						),
					) ),
					array( 'core/paragraph', array(
						'metadata' => array(
							'name'     => 'Speakers',
							'bindings' => array(
								'content' => array(
									'source' => 'events-speakers/event-field',
									'args'   => array( 'key' => 'speakers_list' ),
								),
							),
						),
					) ),
				),
			)
		);
	}

	private static function register_speaker(): void {
		register_post_type(
			'speaker',
			array(
				'labels'       => array(
					'name'               => __( 'Speakers', 'events-speakers' ),
					'singular_name'      => __( 'Speaker', 'events-speakers' ),
					'add_new_item'       => __( 'Add New Speaker', 'events-speakers' ),
					'edit_item'          => __( 'Edit Speaker', 'events-speakers' ),
					'new_item'           => __( 'New Speaker', 'events-speakers' ),
					'view_item'          => __( 'View Speaker', 'events-speakers' ),
					'search_items'       => __( 'Search Speakers', 'events-speakers' ),
					'not_found'          => __( 'No speakers found.', 'events-speakers' ),
					'not_found_in_trash' => __( 'No speakers found in trash.', 'events-speakers' ),
				),
				'public'       => true,
				'show_in_rest' => true,
				'menu_icon'    => 'dashicons-microphone',
				'supports'     => array( 'title', 'editor', 'thumbnail', 'excerpt', 'custom-fields' ),
				'has_archive'   => true,
				'rewrite'       => array( 'slug' => 'speakers' ),
				'template_lock' => 'contentOnly',
				'template'      => array(
					array( 'core/post-featured-image', array() ),
					array( 'core/paragraph', array(
						'metadata' => array(
							'name'     => 'Title / Position',
							'bindings' => array(
								'content' => array(
									'source' => 'events-speakers/speaker-field',
									'args'   => array( 'key' => 'title' ),
								),
							),
						),
					) ),
					array( 'core/paragraph', array(
						'placeholder' => 'Speaker bio…',
					) ),
					array( 'core/heading', array(
						'level'   => 3,
						'content' => 'Speaking at',
					) ),
					array( 'core/paragraph', array(
						'metadata' => array(
							'name'     => 'Events',
							'bindings' => array(
								'content' => array(
									'source' => 'events-speakers/speaker-field',
									'args'   => array( 'key' => 'events_list' ),
								),
							),
						),
					) ),
					array( 'core/paragraph', array(
						'metadata' => array(
							'name'     => 'Next event',
							'bindings' => array(
								'content' => array(
									'source' => 'events-speakers/speaker-field',
									'args'   => array( 'key' => 'next_event_title' ),
								),
							),
						),
					) ),
					array( 'core/paragraph', array(
						'metadata' => array(
							'name'     => 'Next event date',
							'bindings' => array(
								'content' => array(
									'source' => 'events-speakers/speaker-field',
									'args'   => array( 'key' => 'next_event_date' ),
								),
							),
						),
					) ),
					array( 'core/paragraph', array(
						'metadata' => array(
							'name'     => 'Next event time',
							'bindings' => array(
								'content' => array(
									'source' => 'events-speakers/speaker-field',
									'args'   => array( 'key' => 'next_event_time' ),
								),
							),
						),
					) ),
				),
			)
		);
	}
}
