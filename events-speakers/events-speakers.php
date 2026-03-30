<?php
/**
 * Plugin Name: Events & Speakers
 * Description: Registers Events and Speakers custom post types with block bindings support for the Query Loop block.
 * Version: 1.0.0
 * Requires at least: 6.5
 * Requires PHP: 7.4
 * Text Domain: events-speakers
 */

defined( 'ABSPATH' ) || exit;

define( 'EVENTS_SPEAKERS_DIR', plugin_dir_path( __FILE__ ) );

require_once EVENTS_SPEAKERS_DIR . 'includes/class-post-types.php';
require_once EVENTS_SPEAKERS_DIR . 'includes/class-meta-fields.php';
require_once EVENTS_SPEAKERS_DIR . 'includes/class-admin-ui.php';
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

add_action( 'init', array( 'Events_Speakers_Post_Types', 'register' ) );
add_action( 'init', array( 'Events_Speakers_Meta_Fields', 'register' ) );
add_action( 'init', array( 'Events_Speakers_Block_Bindings', 'register' ) );
add_filter( 'query_loop_block_query_vars',       array( 'Events_Speakers_Blocks', 'apply_date_filter' ), 10, 3 );
add_filter( 'rest_event_collection_params',      array( 'Events_Speakers_Blocks', 'register_rest_params' ) );
add_filter( 'rest_event_query',                  array( 'Events_Speakers_Blocks', 'apply_rest_date_filter' ), 10, 2 );
add_action( 'enqueue_block_editor_assets',       array( 'Events_Speakers_Blocks', 'enqueue_editor_assets' ) );
add_action( 'add_meta_boxes', array( 'Events_Speakers_Admin_UI', 'add_meta_boxes' ) );
add_action( 'save_post_event', array( 'Events_Speakers_Admin_UI', 'save_event_meta' ), 10, 2 );
add_action( 'save_post_speaker', array( 'Events_Speakers_Admin_UI', 'save_speaker_meta' ), 10, 2 );
