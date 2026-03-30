<?php
/**
 * Runs when the plugin is deleted via the admin. Removes all plugin data.
 */
defined( 'WP_UNINSTALL_PLUGIN' ) || exit;

// Remove meta from all event posts.
$event_ids = get_posts(
	array(
		'post_type'      => 'event',
		'posts_per_page' => -1,
		'fields'         => 'ids',
		'post_status'    => 'any',
	)
);
foreach ( $event_ids as $id ) {
	delete_post_meta( $id, 'event_start_time' );
	delete_post_meta( $id, 'event_end_time' );
	delete_post_meta( $id, 'event_speakers' );
}

// Remove meta from all speaker posts.
$speaker_ids = get_posts(
	array(
		'post_type'      => 'speaker',
		'posts_per_page' => -1,
		'fields'         => 'ids',
		'post_status'    => 'any',
	)
);
foreach ( $speaker_ids as $id ) {
	delete_post_meta( $id, 'speaker_title' );
}
