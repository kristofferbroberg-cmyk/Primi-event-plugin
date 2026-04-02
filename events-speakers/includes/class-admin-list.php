<?php
defined( 'ABSPATH' ) || exit;

class Events_Speakers_Admin_List {

	public static function register_pages(): void {
		// Register list pages as hidden (null parent = no sidebar entry).
		add_submenu_page( null, __( 'Events', 'events-speakers' ),   __( 'Events', 'events-speakers' ),   'edit_posts', 'es-events-list',   array( self::class, 'render_page' ) );
		add_submenu_page( null, __( 'Speakers', 'events-speakers' ), __( 'Speakers', 'events-speakers' ), 'edit_posts', 'es-speakers-list', array( self::class, 'render_page' ) );

		// Remove all WP-generated submenu items so the top-level menu entries
		// have no flyout — clicking Events/Speakers goes straight to our list.
		remove_submenu_page( 'edit.php?post_type=event',   'edit.php?post_type=event' );
		remove_submenu_page( 'edit.php?post_type=event',   'post-new.php?post_type=event' );
		remove_submenu_page( 'edit.php?post_type=speaker', 'edit.php?post_type=speaker' );
		remove_submenu_page( 'edit.php?post_type=speaker', 'post-new.php?post_type=speaker' );
	}

	/**
	 * Redirect the default list table URLs to our custom list pages.
	 * Hooked on load-edit.php so it fires before any output.
	 */
	public static function redirect_list_tables(): void {
		$post_type = isset( $_GET['post_type'] ) ? sanitize_key( $_GET['post_type'] ) : '';

		if ( 'event' === $post_type ) {
			wp_safe_redirect( admin_url( 'admin.php?page=es-events-list' ) );
			exit;
		}

		if ( 'speaker' === $post_type ) {
			wp_safe_redirect( admin_url( 'admin.php?page=es-speakers-list' ) );
			exit;
		}
	}

	public static function render_page(): void {
		$page      = sanitize_key( $_GET['page'] ?? '' );
		$is_events = 'es-events-list' === $page;
		$title     = $is_events ? __( 'Events', 'events-speakers' ) : __( 'Speakers', 'events-speakers' );
		$new_url   = admin_url( 'admin.php?page=' . ( $is_events ? 'es-edit-event' : 'es-edit-speaker' ) );
		$new_label = $is_events ? __( 'Add New Event', 'events-speakers' ) : __( 'Add New Speaker', 'events-speakers' );
		?>
		<div class="wrap">
			<h1 class="wp-heading-inline"><?php echo esc_html( $title ); ?></h1>
			<a href="<?php echo esc_url( $new_url ); ?>" class="page-title-action"><?php echo esc_html( $new_label ); ?></a>
			<hr class="wp-header-end">
			<div id="es-admin-list-root"></div>
		</div>
		<?php
	}

	public static function enqueue( string $hook ): void {
		$is_events   = 'admin_page_es-events-list' === $hook;
		$is_speakers = 'admin_page_es-speakers-list' === $hook;

		if ( ! $is_events && ! $is_speakers ) {
			return;
		}

		$asset_file = EVENTS_SPEAKERS_DIR . 'build/admin-list.asset.php';
		$asset      = file_exists( $asset_file )
			? require $asset_file
			: array( 'dependencies' => array( 'wp-element', 'wp-api-fetch', 'wp-i18n' ), 'version' => '1.0.0' );

		wp_enqueue_script(
			'es-admin-list',
			plugins_url( 'build/admin-list.js', EVENTS_SPEAKERS_DIR . 'events-speakers.php' ),
			$asset['dependencies'],
			$asset['version'],
			true
		);

		if ( file_exists( EVENTS_SPEAKERS_DIR . 'build/style-admin-list.css' ) ) {
			wp_enqueue_style(
				'es-admin-list',
				plugins_url( 'build/style-admin-list.css', EVENTS_SPEAKERS_DIR . 'events-speakers.php' ),
				array( 'wp-components' ),
				$asset['version']
			);
		}

		$edit_page = $is_events ? 'es-edit-event' : 'es-edit-speaker';
		wp_localize_script( 'es-admin-list', 'esAdminList', array(
			'postType' => $is_events ? 'event' : 'speaker',
			'editBase' => admin_url( 'admin.php' ),
			'editPage' => $edit_page,
			'nonce'    => wp_create_nonce( 'wp_rest' ),
		) );
	}
}
