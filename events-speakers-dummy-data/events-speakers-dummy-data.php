<?php
/**
 * Plugin Name: Events & Speakers — Dummy Data
 * Description: Seeds and removes dummy speakers and events for testing the Events & Speakers plugin. Adds a page under Tools → Dummy Data.
 * Version: 1.0.0
 * Requires at least: 6.5
 * Requires PHP: 7.4
 * Text Domain: es-dummy-data
 */

defined( 'ABSPATH' ) || exit;

add_action( 'admin_menu', 'esd_add_tools_page' );
add_action( 'admin_init', 'esd_handle_actions' );

function esd_add_tools_page(): void {
	add_management_page(
		__( 'Events & Speakers Dummy Data', 'es-dummy-data' ),
		__( 'Dummy Data', 'es-dummy-data' ),
		'manage_options',
		'es-dummy-data',
		'esd_render_page'
	);
}

function esd_handle_actions(): void {
	if ( ! isset( $_POST['esd_action'] ) ) {
		return;
	}

	if ( ! current_user_can( 'manage_options' ) ) {
		wp_die( esc_html__( 'Insufficient permissions.', 'es-dummy-data' ) );
	}

	$action = sanitize_key( $_POST['esd_action'] );

	if ( 'seed' === $action ) {
		check_admin_referer( 'esd_seed' );
		esd_seed();
		wp_redirect( add_query_arg( array( 'page' => 'es-dummy-data', 'esd_result' => 'seeded' ), admin_url( 'tools.php' ) ) );
		exit;
	}

	if ( 'remove' === $action ) {
		check_admin_referer( 'esd_remove' );
		esd_remove();
		wp_redirect( add_query_arg( array( 'page' => 'es-dummy-data', 'esd_result' => 'removed' ), admin_url( 'tools.php' ) ) );
		exit;
	}
}

function esd_render_page(): void {
	$result = isset( $_GET['esd_result'] ) ? sanitize_key( $_GET['esd_result'] ) : '';
	?>
	<div class="wrap">
		<h1><?php esc_html_e( 'Events & Speakers — Dummy Data', 'es-dummy-data' ); ?></h1>

		<?php if ( 'seeded' === $result ) : ?>
			<div class="notice notice-success is-dismissible"><p><?php esc_html_e( 'Dummy data seeded.', 'es-dummy-data' ); ?></p></div>
		<?php elseif ( 'removed' === $result ) : ?>
			<div class="notice notice-success is-dismissible"><p><?php esc_html_e( 'Dummy data removed.', 'es-dummy-data' ); ?></p></div>
		<?php endif; ?>

		<?php if ( ! post_type_exists( 'event' ) || ! post_type_exists( 'speaker' ) ) : ?>
			<div class="notice notice-warning"><p><?php esc_html_e( 'The Events & Speakers plugin must be active before seeding data.', 'es-dummy-data' ); ?></p></div>
		<?php endif; ?>

		<p><?php esc_html_e( 'Use the buttons below to insert or remove test content.', 'es-dummy-data' ); ?></p>

		<form method="post" style="display:inline-block;margin-right:8px;">
			<?php wp_nonce_field( 'esd_seed' ); ?>
			<input type="hidden" name="esd_action" value="seed" />
			<?php submit_button( __( 'Seed dummy data', 'es-dummy-data' ), 'primary', 'submit', false ); ?>
		</form>

		<form method="post" style="display:inline-block;">
			<?php wp_nonce_field( 'esd_remove' ); ?>
			<input type="hidden" name="esd_action" value="remove" />
			<?php submit_button( __( 'Remove dummy data', 'es-dummy-data' ), 'delete', 'submit', false ); ?>
		</form>

		<hr />
		<h2><?php esc_html_e( 'What gets created', 'es-dummy-data' ); ?></h2>
		<p><?php esc_html_e( '4 Speakers and 3 Events. Each event is assigned one or more speakers, has a start time and an end time. All posts are tagged with the meta key _esd_dummy = 1 so they can be cleanly removed.', 'es-dummy-data' ); ?></p>
	</div>
	<?php
}

// ---------------------------------------------------------------------------
// Seed
// ---------------------------------------------------------------------------

function esd_seed(): void {
	$speakers = esd_create_speakers();
	esd_create_events( $speakers );
}

/**
 * @return int[]  Map of label => post ID.
 */
function esd_create_speakers(): array {
	$data = array(
		array(
			'title'         => 'Anna Lindqvist',
			'speaker_title' => 'Lead Engineer',
			'content'       => 'Anna is a seasoned engineer with 12 years of experience in distributed systems and open-source infrastructure.',
		),
		array(
			'title'         => 'Marcus Holm',
			'speaker_title' => 'Product Designer',
			'content'       => 'Marcus focuses on human-centred design and has shipped products used by millions of people across Europe.',
		),
		array(
			'title'         => 'Priya Sharma',
			'speaker_title' => 'Security Researcher',
			'content'       => 'Priya specialises in application security, responsible disclosure, and developer education.',
		),
		array(
			'title'         => 'Jonas Berg',
			'speaker_title' => 'Developer Advocate',
			'content'       => 'Jonas bridges the gap between engineering teams and the wider developer community through talks and writing.',
		),
	);

	$ids = array();

	foreach ( $data as $item ) {
		// Skip if a dummy speaker with this title already exists.
		$existing = get_posts(
			array(
				'post_type'      => 'speaker',
				'title'          => $item['title'],
				'posts_per_page' => 1,
				'fields'         => 'ids',
				'meta_key'       => '_esd_dummy',
				'meta_value'     => '1',
			)
		);

		if ( ! empty( $existing ) ) {
			$ids[ $item['title'] ] = $existing[0];
			continue;
		}

		$post_id = wp_insert_post(
			array(
				'post_type'    => 'speaker',
				'post_title'   => $item['title'],
				'post_content' => $item['content'],
				'post_status'  => 'publish',
			),
			true
		);

		if ( is_wp_error( $post_id ) ) {
			continue;
		}

		update_post_meta( $post_id, 'speaker_title', $item['speaker_title'] );
		update_post_meta( $post_id, '_esd_dummy', '1' );

		$ids[ $item['title'] ] = $post_id;
	}

	return $ids;
}

/**
 * @param int[] $speaker_ids  Map of name => post ID.
 */
function esd_create_events( array $speaker_ids ): void {
	$anna   = $speaker_ids['Anna Lindqvist'] ?? 0;
	$marcus = $speaker_ids['Marcus Holm']    ?? 0;
	$priya  = $speaker_ids['Priya Sharma']   ?? 0;
	$jonas  = $speaker_ids['Jonas Berg']     ?? 0;

	$events = array(
		array(
			'title'    => 'Opening Keynote: Building for Scale',
			'content'  => 'An inspiring session on what it takes to build resilient, large-scale systems in the modern cloud era.',
			'date'     => '2025-09-15',
			'start'    => '09:00',
			'end'      => '10:00',
			'speakers' => array( $anna, $jonas ),
		),
		array(
			'title'    => 'Design Systems Workshop',
			'content'  => 'A hands-on workshop exploring how great design systems are built, maintained, and adopted across teams.',
			'date'     => '2025-09-15',
			'start'    => '11:00',
			'end'      => '12:30',
			'speakers' => array( $marcus ),
		),
		array(
			'title'    => 'Security in the Age of AI',
			'content'  => 'An in-depth look at emerging threats and defensive strategies as AI becomes embedded in software development.',
			'date'     => '2025-09-16',
			'start'    => '09:30',
			'end'      => '11:00',
			'speakers' => array( $priya, $anna ),
		),
	);

	foreach ( $events as $event ) {
		// Skip if already seeded.
		$existing = get_posts(
			array(
				'post_type'      => 'event',
				'title'          => $event['title'],
				'posts_per_page' => 1,
				'fields'         => 'ids',
				'meta_key'       => '_esd_dummy',
				'meta_value'     => '1',
			)
		);

		if ( ! empty( $existing ) ) {
			continue;
		}

		$post_id = wp_insert_post(
			array(
				'post_type'    => 'event',
				'post_title'   => $event['title'],
				'post_content' => $event['content'],
				'post_status'  => 'publish',
			),
			true
		);

		if ( is_wp_error( $post_id ) ) {
			continue;
		}

		update_post_meta( $post_id, 'event_date', $event['date'] );
		update_post_meta( $post_id, 'event_start_time', $event['start'] );
		update_post_meta( $post_id, 'event_end_time', $event['end'] );

		$speaker_ids_clean = array_values( array_filter( $event['speakers'] ) );
		update_post_meta( $post_id, 'event_speakers', wp_json_encode( $speaker_ids_clean ) );

		update_post_meta( $post_id, '_esd_dummy', '1' );
	}
}

// ---------------------------------------------------------------------------
// Remove
// ---------------------------------------------------------------------------

function esd_remove(): void {
	foreach ( array( 'event', 'speaker' ) as $post_type ) {
		$posts = get_posts(
			array(
				'post_type'      => $post_type,
				'posts_per_page' => -1,
				'fields'         => 'ids',
				'post_status'    => 'any',
				'meta_key'       => '_esd_dummy',
				'meta_value'     => '1',
			)
		);

		foreach ( $posts as $post_id ) {
			wp_delete_post( $post_id, true ); // true = skip trash.
		}
	}
}
