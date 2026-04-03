<?php
defined( 'ABSPATH' ) || exit;

class Events_Speakers_Admin_Edit {

	public static function register_pages(): void {
		add_submenu_page( null, __( 'Edit Event', 'events-speakers' ),   __( 'Edit Event', 'events-speakers' ),   'edit_posts', 'es-edit-event',   array( self::class, 'render_page' ) );
		add_submenu_page( null, __( 'Edit Speaker', 'events-speakers' ), __( 'Edit Speaker', 'events-speakers' ), 'edit_posts', 'es-edit-speaker', array( self::class, 'render_page' ) );
	}

	public static function render_page(): void {
		if ( ! current_user_can( 'edit_posts' ) ) {
			wp_die( esc_html__( 'Sorry, you are not allowed to edit posts.', 'events-speakers' ) );
		}

		$page     = sanitize_key( $_GET['page'] ?? '' );
		$post_id  = absint( $_GET['post'] ?? 0 );
		$type     = ( 'es-edit-event' === $page ) ? 'event' : 'speaker';
		$list_url = admin_url( 'admin.php?page=es-' . $type . 's-list' );
		?>
		<div class="wrap">
			<div id="es-edit-root"
				data-post-id="<?php echo esc_attr( (string) $post_id ); ?>"
				data-post-type="<?php echo esc_attr( $type ); ?>"
				data-list-url="<?php echo esc_url( $list_url ); ?>"
				data-nonce="<?php echo esc_attr( wp_create_nonce( 'wp_rest' ) ); ?>">
			</div>
		</div>
		<?php
	}

	public static function enqueue( string $hook ): void {
		if ( ! in_array( $hook, array( 'admin_page_es-edit-event', 'admin_page_es-edit-speaker' ), true ) ) {
			return;
		}

		wp_enqueue_media();

		$asset_file = EVENTS_SPEAKERS_DIR . 'build/admin-edit.asset.php';
		$asset      = file_exists( $asset_file )
			? require $asset_file
			: array( 'dependencies' => array( 'wp-element', 'wp-components', 'wp-api-fetch', 'wp-i18n' ), 'version' => '1.0.0' );

		wp_enqueue_script(
			'es-admin-edit',
			plugins_url( 'build/admin-edit.js', EVENTS_SPEAKERS_DIR . 'events-speakers.php' ),
			$asset['dependencies'],
			$asset['version'],
			true
		);

		if ( file_exists( EVENTS_SPEAKERS_DIR . 'build/style-admin-edit.css' ) ) {
			wp_enqueue_style(
				'es-admin-edit',
				plugins_url( 'build/style-admin-edit.css', EVENTS_SPEAKERS_DIR . 'events-speakers.php' ),
				array( 'wp-components' ),
				$asset['version']
			);
		}

		wp_add_inline_style( 'wp-admin', self::inline_styles() );
	}

	private static function inline_styles(): string {
		return '
		#es-edit-root { padding: 0; }
		.es-edit-page { display: flex; flex-direction: column; max-width: 680px; }
		.es-edit-header { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 24px 0 16px; }
		.es-edit-header__left { display: flex; flex-direction: column; gap: 4px; }
		.es-edit-back { font-size: 12px; color: #787c82; text-decoration: none; }
		.es-edit-back:hover { color: #1d2327; }
		.es-edit-title { margin: 0; font-size: 20px; font-weight: 600; line-height: 1.2; }
		.es-edit-actions { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }
		.es-edit-card { background: #fff; border: 1px solid #c3c4c7; border-radius: 2px; padding: 16px 20px; margin-top: 8px; }
		.es-notice { padding: 10px 14px; border-radius: 2px; font-size: 13px; margin-bottom: 12px; }
		.es-notice--success { background: #edfaef; border-left: 4px solid #00a32a; color: #1e4620; }
		.es-notice--error   { background: #fce8e8; border-left: 4px solid #d63638; color: #50130c; }
		.es-loading { padding: 48px; text-align: center; }
		.es-image-placeholder { display: flex; align-items: center; justify-content: center; gap: 8px; background: #f0f0f1; border: 2px dashed #c3c4c7; border-radius: 2px; height: 160px; width: 100%; cursor: pointer; color: #50575e; font-size: 13px; }
		.es-image-preview { position: relative; display: inline-block; }
		.es-image-preview img { display: block; max-height: 200px; border-radius: 2px; }
		.es-image-remove { position: absolute !important; top: 6px !important; right: 6px !important; }
		.es-time-row { display: flex; align-items: center; gap: 8px; }
		.es-time-row input[type=time] { flex: 1; padding: 0 8px; height: 40px; border: 1px solid #949494; border-radius: 2px; font-size: 13px; background: #fff; color: inherit; }
		';
	}
}
