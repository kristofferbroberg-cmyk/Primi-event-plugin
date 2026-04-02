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
		// The React component owns the full page UI (title, Add button, DataViews).
		// No WP page header here — that would duplicate what DataViews renders.
		?>
		<div class="wrap es-list-wrap">
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
			: array( 'dependencies' => array( 'wp-element', 'wp-components', 'wp-api-fetch', 'wp-i18n' ), 'version' => '1.0.0' );

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

		// Full-bleed layout — strip .wrap / #wpbody-content padding on list pages
		// so the DataViews component fills the content column edge-to-edge.
		wp_add_inline_style( 'wp-admin', '
			.es-list-wrap { margin: 0; padding: 0; }
			#wpbody-content .es-list-wrap { padding-bottom: 0; }
			.es-list-header { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 16px 16px 0; }
			.es-list-title  { margin: 0; font-size: 20px; font-weight: 600; }
		' );

		$edit_page = $is_events ? 'es-edit-event' : 'es-edit-speaker';
		wp_localize_script( 'es-admin-list', 'esAdminList', array(
			'postType' => $is_events ? 'event' : 'speaker',
			'editBase' => admin_url( 'admin.php' ),
			'editPage' => $edit_page,
			'newUrl'   => admin_url( 'admin.php?page=' . $edit_page ),
			'nonce'    => wp_create_nonce( 'wp_rest' ),
		) );
	}
}
