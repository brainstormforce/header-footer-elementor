<?php
/**
 * HFE Fallback Theme Support.
 *
 * Add theme compatibility for all the WordPress themes.
 *
 * @since x.x.x
 * @package hfe
 */

namespace HFE\Themes;

/**
 * Class HFE Theme Fallback support.
 *
 * @since x.x.x
 */
class HFE_Fallback_Theme_Support {

	/**
	 * Constructor.
	 *
	 * @since x.x.x
	 */
	public function __construct() {
		$this->setup_fallback_support();

		add_action( 'admin_menu', [ $this, 'hfe_register_settings_page' ] );
		add_action( 'admin_init', [ $this, 'hfe_admin_init' ] );
		add_action( 'admin_head', [ $this, 'hfe_global_css' ] );
		add_filter( 'views_edit-elementor-hf', [ $this, 'hfe_settings' ], 10, 1 );
	}

	/**
	 * Adds CSS to Hide the extra submenu added for the settings tab.
	 *
	 * @since x.x.x
	 * @return void
	 */
	public function hfe_global_css() {
		wp_enqueue_style( 'hfe-admin-style', HFE_URL . 'admin/assets/css/ehf-admin.css', [], HFE_VER );
	}

	/**
	 * Adds a tab in plugin submenu page.
	 *
	 * @since x.x.x
	 * @param string $views to add tab to current post type view.
	 *
	 * @return mixed
	 */
	public function hfe_settings( $views ) {
		$this->hfe_tabs();
		return $views;
	}


	/**
	 * Function for registering the settings api.
	 *
	 * @since x.x.x
	 * @return void
	 */
	public function hfe_admin_init() {
		register_setting( 'hfe-plugin-options', 'hfe_compatibility_option' );
		add_settings_section( 'hfe-options', __( 'Compatibility Mode', 'header-footer-elementor' ), [ $this, 'hfe_compatibility_callback' ], 'Settings' );
		add_settings_field( 'hfe-way', 'Select Fallback Compatibility Mode', [ $this, 'hfe_compatibility_option_callback' ], 'Settings', 'hfe-options' );
	}

	/**
	 * Call back function for the ssettings api function add_settings_section
	 *
	 * This function can be used to add description of the settings sections
	 *
	 * @since x.x.x
	 * @return void
	 */
	public function hfe_compatibility_callback() {
		_e( 'Header Footer Elementor plugin includes two compatibility modes to try to support all the themes.<br>Use the method which works best with your theme.', 'header-footer-elementor' );
	}

	/**
	 * Call back function for the ssettings api function add_settings_field
	 *
	 * This function will contain the markup for the input feilds that we can add.
	 *
	 * @since x.x.x
	 * @return void
	 */
	public function hfe_compatibility_option_callback() {
		$hfe_radio_button = get_option( 'hfe_compatibility_option', '1' );
			wp_enqueue_style( 'hfe-admin-style', HFE_URL . 'admin/assets/css/ehf-admin.css', [], HFE_VER );
		?>
		
		<label>
			<input type="radio" name="hfe_compatibility_option" value= 1 <?php checked( $hfe_radio_button, 1 ); ?> > <div class="hfe_radio_options"><?php esc_html_e( 'Method 1', 'header-footer-elementor' ); ?></div>
					<p class="description"><?php esc_html_e( 'This replaces the header.php & footer.php template with a custom templates from the plugin.', 'header-footer-elementor' ); ?></p><br>
		</label>
		<label>
			<input type="radio" name="hfe_compatibility_option" value= 2 <?php checked( $hfe_radio_button, 2 ); ?> > <div class="hfe_radio_options"><?php esc_html_e( 'Method 2', 'header-footer-elementor' ); ?></div>
			<p class="description">
						<?php esc_html_e( 'This adds the header in the new action that was introduced by WordPress `wp_body_option` and footer is added in wp_footer action.', 'header-footer-elementor' ); ?>
			</p>
		</label>

		<?php
	}

	/**
	 * Setup Theme Support.
	 *
	 * @since x.x.x
	 * @return void
	 */
	public function setup_fallback_support() {
		$hfe_compatibility_option = get_option( 'hfe_compatibility_option', '1' );

		if ( '1' === $hfe_compatibility_option ) {
			require HFE_DIR . 'themes/default/class-hfe-default-compat.php';
		} elseif ( '2' === $hfe_compatibility_option ) {
			require HFE_DIR . 'themes/default/class-global-theme-compatibility.php';
		}
	}

	/**
	 * Show a settings page incase of unsupported theme.
	 *
	 * @since x.x.x
	 *
	 * @return void
	 */
	public function hfe_register_settings_page() {
		add_submenu_page(
			'themes.php',
			__( 'Settings', 'header-footer-elementor' ),
			__( 'Settings', 'header-footer-elementor' ),
			'manage_options',
			'hfe-settings',
			[ $this, 'hfe_settings_page' ]
		);
	}

	/**
	 * Settings page.
	 *
	 * Call back function for add submenu page function.
	 *
	 * @since x.x.x
	 */
	public function hfe_settings_page() {
		echo '<h1 class="hfe-heading-inline">';
		esc_attr_e( 'Elementor - Header, Footer & Blocks ', 'header-footer-elementor' );
		echo '</h1>';

		?>
		<h2 class="nav-tab-wrapper">
			<?php
			$tabs       = [
				'hfe_templates' => [
					'name' => __( 'All templates', 'header-footer-elementor' ),
					'url'  => admin_url( 'edit.php?post_type=elementor-hf' ),
				],
				'hfe_settings'  => [
					'name' => __( 'Settings', 'header-footer-elementor' ),
					'url'  => admin_url( 'themes.php?page=hfe-settings' ),
				],
			];
			$active_tab = 'hfe-settings' == isset( $_GET['page'] ) && $_GET['page'] ? 'hfe_settings' : 'hfe_templates';
			foreach ( $tabs as $tab_id => $tab ) {
				$active = $active_tab == $tab_id ? ' nav-tab-active' : '';
				echo '<a href="' . esc_url( $tab['url'] ) . '" class="nav-tab' . $active . '">';
				echo esc_html( $tab['name'] );
				echo '</a>';
			}
			?>
		</h2>
		<br />
		<?php
		$hfe_radio_button = get_option( 'hfe_compatibility_option', '1' );
		?>
		<form action="options.php" method="post">
			<?php settings_fields( 'hfe-plugin-options' ); ?>
			<?php do_settings_sections( 'Settings' ); ?>
			<?php submit_button(); ?>
		</form></div>
		<?php
	}

	/**
	 * Function for adding tabs
	 *
	 * @since x.x.x
	 * @return void
	 */
	public function hfe_tabs() {
		?>
		<h2 class="nav-tab-wrapper">
			<?php
			$tabs       = [
				'hfe_templates' => [
					'name' => __( 'All templates', 'header-footer-elementor' ),
					'url'  => admin_url( 'edit.php?post_type=elementor-hf' ),
				],
				'hfe_settings'  => [
					'name' => __( 'Settings', 'header-footer-elementor' ),
					'url'  => admin_url( 'themes.php?page=hfe-settings' ),
				],
			];
			$active_tab = 'hfe-settings' == isset( $_GET['page'] ) && $_GET['page'] ? 'hfe_settings' : 'hfe_templates';
			foreach ( $tabs as $tab_id => $tab ) {
				$active = $active_tab == $tab_id ? ' nav-tab-active' : '';

				echo '<a href="' . esc_url( $tab['url'] ) . '" class="nav-tab' . esc_attr( $active ) . '">';
				echo esc_html( $tab['name'] );
				echo '</a>';
			}

			?>
		</h2>
		<br />
		<?php
	}

}

new HFE_Fallback_Theme_Support();
