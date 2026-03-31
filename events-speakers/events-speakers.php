<?php
/**
 * Plugin Name: Events and Speakers
 * Description: Registers Events and Speakers custom post types with block bindings support for the Query Loop block.
 * Version: 1.0.0
 * Requires at least: 6.9
 * Requires PHP: 7.4
 * Text Domain: events-speakers
 */

defined( 'ABSPATH' ) || exit;

define( 'EVENTS_SPEAKERS_DIR', plugin_dir_path( __FILE__ ) );

require_once EVENTS_SPEAKERS_DIR . 'includes/class-post-types.php';
require_once EVENTS_SPEAKERS_DIR . 'includes/class-meta-fields.php';
require_once EVENTS_SPEAKERS_DIR . 'includes/class-block-bindings.php';
require_once EVENTS_SPEAKERS_DIR . 'includes/class-blocks.php';

register_activation_hook( __FILE__, 'events_speakers_activate' );
register_deactivation_hook( __FILE__, 'events_speakers_deactivate' );

function events_speakers_activate(): void {
	Events_Speakers_Post_Types::register();
	flush_rewrite_rules();
}

function events_speakers_deactivate(): void {
	flush_rewrite_rules();
}

/**
 * Safe wrapper around file_get_contents() — logs a warning and returns false
 * if the file does not exist or cannot be read.
 */
function events_speakers_read_file( string $path ) {
	if ( ! is_readable( $path ) ) {
		// phpcs:ignore WordPress.PHP.DevelopmentFunctions.error_log_trigger_error
		trigger_error(
			sprintf( 'Events and Speakers: could not read file %s', esc_html( $path ) ),
			E_USER_WARNING
		);
		return false;
	}
	return file_get_contents( $path ); // phpcs:ignore WordPress.WP.AlternativeFunctions.file_get_contents_file_get_contents
}

add_action( 'init', array( 'Events_Speakers_Post_Types', 'register' ) );
add_action( 'init', 'events_speakers_register_templates' );
add_action( 'init', 'events_speakers_register_patterns' );
add_filter( 'use_block_editor_for_post_type', 'events_speakers_force_block_editor', 10, 2 );

function events_speakers_register_templates(): void {
	$single_event = events_speakers_read_file( EVENTS_SPEAKERS_DIR . 'templates/single-event.html' );
	if ( false !== $single_event ) {
		register_block_template(
			'events-speakers//single-event',
			array(
				'title'       => __( 'Single Event', 'events-speakers' ),
				'description' => __( 'Displays a single event with date, time, and speakers.', 'events-speakers' ),
				'post_types'  => array( 'event' ),
				'plugin'      => 'events-speakers',
				'content'     => $single_event,
			)
		);
	}

	$single_speaker = events_speakers_read_file( EVENTS_SPEAKERS_DIR . 'templates/single-speaker.html' );
	if ( false !== $single_speaker ) {
		register_block_template(
			'events-speakers//single-speaker',
			array(
				'title'       => __( 'Single Speaker', 'events-speakers' ),
				'description' => __( 'Displays a speaker with bio and list of events.', 'events-speakers' ),
				'post_types'  => array( 'speaker' ),
				'plugin'      => 'events-speakers',
				'content'     => $single_speaker,
			)
		);
	}
}

function events_speakers_register_patterns(): void {
	register_block_pattern_category(
		'events-speakers',
		array( 'label' => __( 'Events & Speakers', 'events-speakers' ) )
	);

	$events_by_date = events_speakers_read_file( EVENTS_SPEAKERS_DIR . 'patterns/events-by-date.html' );
	if ( false !== $events_by_date ) {
		register_block_pattern(
			'events-speakers/events-by-date',
			array(
				'title'       => __( 'Events by date', 'events-speakers' ),
				'description' => __( 'A filterable list of events for a chosen date, with time and clickable speaker links.', 'events-speakers' ),
				'categories'  => array( 'events-speakers' ),
				'content'     => $events_by_date,
			)
		);
	}
}

function events_speakers_force_block_editor( bool $use_block_editor, string $post_type ): bool {
	if ( in_array( $post_type, array( 'event', 'speaker' ), true ) ) {
		return true;
	}
	return $use_block_editor;
}

add_action( 'init', array( 'Events_Speakers_Meta_Fields', 'register' ) );
add_action( 'init', array( 'Events_Speakers_Block_Bindings', 'register' ) );
add_filter( 'get_post_metadata', 'events_speakers_speakers_display_value', 10, 4 );
add_filter( 'render_block',      'events_speakers_allow_links_in_bindings', 10, 2 );

/**
 * Block bindings escape bound content as plain text. For our HTML-producing
 * keys (speakers_links, events_links) we unescape the <a> tags that core
 * escaped. Only touches paragraphs that carry our specific binding metadata.
 */
function events_speakers_allow_links_in_bindings( string $block_content, array $block ): string {
	if ( ( $block['blockName'] ?? '' ) !== 'core/paragraph' ) {
		return $block_content;
	}

	$bindings = $block['attrs']['metadata']['bindings']['content'] ?? null;
	if ( ! $bindings ) {
		return $block_content;
	}

	$source = $bindings['source'] ?? '';
	$key    = $bindings['args']['key'] ?? '';

	if (
		! in_array( $source, array( 'events-speakers/event-field', 'events-speakers/speaker-field' ), true ) ||
		! in_array( $key, array( 'speakers_links', 'events_links' ), true )
	) {
		return $block_content;
	}

	return str_replace(
		array( '&lt;a href=&quot;', '&quot;&gt;', '&lt;/a&gt;' ),
		array( '<a href="',         '">',          '</a>' ),
		$block_content
	);
}

/**
 * When event_speakers is read as a single value during frontend/editor block rendering
 * (e.g. via core/post-meta block binding), return formatted names instead of raw JSON.
 * Bails out for REST requests so the sidebar JS keeps working with raw IDs.
 */
function events_speakers_speakers_display_value( $value, int $post_id, string $meta_key, bool $single ) {
	if ( $meta_key !== 'event_speakers' || ! $single || 'event' !== get_post_type( $post_id ) ) {
		return $value;
	}

	// Let REST API reads pass through unmodified so the editor sidebar works.
	if ( defined( 'REST_REQUEST' ) && REST_REQUEST ) {
		return $value;
	}

	// Remove ourselves to avoid infinite recursion when we call get_post_meta below.
	remove_filter( 'get_post_metadata', 'events_speakers_speakers_display_value', 10 );
	$json = get_post_meta( $post_id, 'event_speakers', true );
	add_filter( 'get_post_metadata', 'events_speakers_speakers_display_value', 10, 4 );

	$ids = json_decode( $json ?: '[]', true );
	if ( ! is_array( $ids ) || empty( $ids ) ) {
		return '';
	}

	$names = array_filter( array_map( 'get_the_title', array_map( 'absint', $ids ) ) );
	return implode( ', ', $names );
}

add_filter( 'query_loop_block_query_vars',        array( 'Events_Speakers_Blocks', 'apply_date_filter' ), 10, 3 );
add_filter( 'rest_event_collection_params',       array( 'Events_Speakers_Blocks', 'register_rest_params' ) );
add_filter( 'rest_event_query',                   array( 'Events_Speakers_Blocks', 'apply_rest_date_filter' ), 10, 2 );
add_filter( 'rest_speaker_collection_params',     array( 'Events_Speakers_Blocks', 'register_speaker_rest_params' ) );
add_filter( 'rest_speaker_query',                 array( 'Events_Speakers_Blocks', 'apply_rest_event_filter' ), 10, 2 );
add_action( 'enqueue_block_editor_assets',        array( 'Events_Speakers_Blocks', 'enqueue_editor_assets' ) );
add_filter( 'block_editor_settings_all',          array( 'Events_Speakers_Blocks', 'editor_placeholders' ), 10, 2 );
