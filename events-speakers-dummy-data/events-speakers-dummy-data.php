<?php
/**
 * Plugin Name: Events & Speakers — Dummy Data
 * Description: Seeds and removes dummy speakers and events for testing the Events & Speakers plugin. Adds a page under Tools → Dummy Data.
 * Version: 1.1.0
 * Requires at least: 6.5
 * Requires PHP: 7.4
 * Text Domain: es-dummy-data
 */

defined( 'ABSPATH' ) || exit;

define( 'ESD_IMAGES_DIR', plugin_dir_path( __FILE__ ) . 'assets/images/' );

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
		<p><?php esc_html_e( '8 Speakers and 6 Events spread across a 3-day conference. Each speaker gets a portrait and each event gets a banner image (bundled with the plugin). All posts are tagged with _esd_dummy = 1 so they can be cleanly removed.', 'es-dummy-data' ); ?></p>
	</div>
	<?php
}

// ---------------------------------------------------------------------------
// Seed
// ---------------------------------------------------------------------------

function esd_seed(): void {
	require_once ABSPATH . 'wp-admin/includes/image.php';
	require_once ABSPATH . 'wp-admin/includes/file.php';
	require_once ABSPATH . 'wp-admin/includes/media.php';

	$speakers = esd_create_speakers();
	esd_create_events( $speakers );
}

// ---------------------------------------------------------------------------
// Image helper
// ---------------------------------------------------------------------------

/**
 * Copy a bundled plugin image into the WP uploads folder, register it as an
 * attachment, and set it as the post thumbnail.
 *
 * @param int    $post_id        Post to attach to.
 * @param string $src_path       Absolute path to the source file inside the plugin.
 * @param string $title          Human-readable title for the attachment.
 * @return int  Attachment ID, or 0 on failure.
 */
function esd_attach_bundled_image( int $post_id, string $src_path, string $title ): int {
	if ( has_post_thumbnail( $post_id ) ) {
		return (int) get_post_thumbnail_id( $post_id );
	}

	if ( ! file_exists( $src_path ) ) {
		return 0;
	}

	$upload = wp_upload_dir();
	if ( ! empty( $upload['error'] ) ) {
		return 0;
	}

	$filename = basename( $src_path );
	$dst_path = $upload['path'] . '/' . $filename;

	// phpcs:ignore WordPress.WP.AlternativeFunctions.copy_copy
	if ( ! copy( $src_path, $dst_path ) ) {
		return 0;
	}

	$attach_id = wp_insert_attachment(
		array(
			'guid'           => $upload['url'] . '/' . $filename,
			'post_mime_type' => 'image/jpeg',
			'post_title'     => $title,
			'post_content'   => '',
			'post_status'    => 'inherit',
		),
		$dst_path,
		$post_id
	);

	if ( is_wp_error( $attach_id ) ) {
		return 0;
	}

	$meta = wp_generate_attachment_metadata( $attach_id, $dst_path );
	wp_update_attachment_metadata( $attach_id, $meta );
	update_post_meta( $attach_id, '_esd_dummy', '1' );

	set_post_thumbnail( $post_id, $attach_id );

	return $attach_id;
}

// ---------------------------------------------------------------------------
// Speakers
// ---------------------------------------------------------------------------

/**
 * @return int[]  Map of speaker name => post ID.
 */
function esd_create_speakers(): array {
	$data = array(
		array(
			'title'         => 'Anna Lindqvist',
			'speaker_title' => 'Lead Engineer',
			'content'       => 'Anna is a seasoned engineer with 12 years of experience in distributed systems and open-source infrastructure. She has contributed to several high-profile open-source projects and regularly speaks at international conferences.',
			'image'         => 'speakers/anna-lindqvist.jpg',
		),
		array(
			'title'         => 'Marcus Holm',
			'speaker_title' => 'Product Designer',
			'content'       => 'Marcus focuses on human-centred design and has shipped products used by millions of people across Europe. His work spans mobile, web, and emerging interfaces, with a particular interest in accessibility.',
			'image'         => 'speakers/marcus-holm.jpg',
		),
		array(
			'title'         => 'Priya Sharma',
			'speaker_title' => 'Security Researcher',
			'content'       => 'Priya specialises in application security, responsible disclosure, and developer education. She runs a popular blog on threat modelling and is a frequent guest on security podcasts.',
			'image'         => 'speakers/priya-sharma.jpg',
		),
		array(
			'title'         => 'Jonas Berg',
			'speaker_title' => 'Developer Advocate',
			'content'       => 'Jonas bridges the gap between engineering teams and the wider developer community through talks, workshops, and writing. He previously led developer relations at two fintech scale-ups.',
			'image'         => 'speakers/jonas-berg.jpg',
		),
		array(
			'title'         => 'Lena Johansson',
			'speaker_title' => 'Data Scientist',
			'content'       => 'Lena works at the intersection of machine learning and product development, turning complex data into actionable insights. She holds a PhD in computational statistics and has published widely on model interpretability.',
			'image'         => 'speakers/lena-johansson.jpg',
		),
		array(
			'title'         => 'David Okafor',
			'speaker_title' => 'Platform Engineer',
			'content'       => 'David designs and operates the internal developer platforms that let engineering teams ship faster and safer. He is a strong advocate for platform-as-product thinking and internal developer experience.',
			'image'         => 'speakers/david-okafor.jpg',
		),
		array(
			'title'         => 'Sofia Martinez',
			'speaker_title' => 'UX Researcher',
			'content'       => 'Sofia leads qualitative and quantitative research programmes that put users at the centre of product decisions. She is passionate about inclusive design and cross-cultural usability testing.',
			'image'         => 'speakers/sofia-martinez.jpg',
		),
		array(
			'title'         => 'Erik Karlsson',
			'speaker_title' => 'Open Source Maintainer',
			'content'       => 'Erik maintains several widely-used open-source libraries and has been an active contributor to the Node.js ecosystem for over a decade. He mentors new contributors and advocates for sustainable open-source funding.',
			'image'         => 'speakers/erik-karlsson.jpg',
		),
	);

	$ids = array();

	foreach ( $data as $item ) {
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

		esd_attach_bundled_image( $post_id, ESD_IMAGES_DIR . $item['image'], $item['title'] );

		$ids[ $item['title'] ] = $post_id;
	}

	return $ids;
}

// ---------------------------------------------------------------------------
// Events
// ---------------------------------------------------------------------------

/**
 * @param int[] $speaker_ids  Map of name => post ID.
 */
function esd_create_events( array $speaker_ids ): void {
	$anna   = $speaker_ids['Anna Lindqvist']  ?? 0;
	$marcus = $speaker_ids['Marcus Holm']     ?? 0;
	$priya  = $speaker_ids['Priya Sharma']    ?? 0;
	$jonas  = $speaker_ids['Jonas Berg']      ?? 0;
	$lena   = $speaker_ids['Lena Johansson']  ?? 0;
	$david  = $speaker_ids['David Okafor']    ?? 0;
	$sofia  = $speaker_ids['Sofia Martinez']  ?? 0;
	$erik   = $speaker_ids['Erik Karlsson']   ?? 0;

	$events = array(
		array(
			'title'    => 'Opening Keynote: Building for Scale',
			'content'  => 'An inspiring session on what it takes to build resilient, large-scale systems in the modern cloud era. Anna and Jonas share hard-won lessons from operating systems at millions of requests per second.',
			'date'     => '2025-09-15',
			'start'    => '09:00',
			'end'      => '10:00',
			'speakers' => array( $anna, $jonas ),
			'image'    => 'events/opening-keynote.jpg',
		),
		array(
			'title'    => 'Design Systems Workshop',
			'content'  => 'A hands-on workshop exploring how great design systems are built, maintained, and adopted across teams. Bring a laptop — you will leave with a working component library scaffold.',
			'date'     => '2025-09-15',
			'start'    => '11:00',
			'end'      => '12:30',
			'speakers' => array( $marcus, $sofia ),
			'image'    => 'events/design-systems-workshop.jpg',
		),
		array(
			'title'    => 'Security in the Age of AI',
			'content'  => 'An in-depth look at emerging threats and defensive strategies as AI becomes embedded in software development. Priya and Anna walk through real-world attack scenarios and countermeasures.',
			'date'     => '2025-09-15',
			'start'    => '14:00',
			'end'      => '15:30',
			'speakers' => array( $priya, $anna ),
			'image'    => 'events/security-in-the-age-of-ai.jpg',
		),
		array(
			'title'    => 'Platform Engineering: From Chaos to Product',
			'content'  => 'David shares how his team transformed a collection of ad-hoc scripts into a first-class internal developer platform, cutting mean time to onboard a new service from weeks to hours.',
			'date'     => '2025-09-16',
			'start'    => '09:30',
			'end'      => '10:30',
			'speakers' => array( $david ),
			'image'    => 'events/platform-engineering.jpg',
		),
		array(
			'title'    => 'Data & AI Ethics Roundtable',
			'content'  => 'A facilitated conversation on the ethical dimensions of deploying machine learning in consumer products. Lena and Priya lead a structured debate on fairness, accountability, and transparency.',
			'date'     => '2025-09-16',
			'start'    => '13:00',
			'end'      => '14:30',
			'speakers' => array( $lena, $priya ),
			'image'    => 'events/data-ai-ethics-roundtable.jpg',
		),
		array(
			'title'    => 'Closing Keynote: Sustaining Open Source',
			'content'  => 'Erik and Jonas close the conference with a rallying call to the industry to invest in the open-source projects it depends on — exploring funding models, governance, and community health.',
			'date'     => '2025-09-17',
			'start'    => '15:00',
			'end'      => '16:00',
			'speakers' => array( $erik, $jonas ),
			'image'    => 'events/closing-keynote.jpg',
		),
	);

	foreach ( $events as $event ) {
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

		$clean_speaker_ids = array_values( array_filter( $event['speakers'] ) );
		update_post_meta( $post_id, 'event_speakers', wp_json_encode( $clean_speaker_ids ) );

		update_post_meta( $post_id, '_esd_dummy', '1' );

		esd_attach_bundled_image( $post_id, ESD_IMAGES_DIR . $event['image'], $event['title'] );
	}
}

// ---------------------------------------------------------------------------
// Remove
// ---------------------------------------------------------------------------

function esd_remove(): void {
	// Delete dummy attachments first.
	$attachments = get_posts(
		array(
			'post_type'      => 'attachment',
			'posts_per_page' => -1,
			'fields'         => 'ids',
			'post_status'    => 'any',
			'meta_key'       => '_esd_dummy',
			'meta_value'     => '1',
		)
	);
	foreach ( $attachments as $id ) {
		wp_delete_attachment( $id, true );
	}

	// Delete dummy posts.
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
			wp_delete_post( $post_id, true );
		}
	}
}
