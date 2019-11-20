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

		add_action( 'admin_menu', array( $this, 'hfe_register_settings_page' ) );
		add_action( 'admin_init', array( $this, 'hfe_admin_init' ) );
		add_action( 'admin_head', array( $this, 'hfe_global_css' ) );
		add_filter( 'views_edit-elementor-hf', array( $this, 'hfe_settings' ), 10, 1 );
	}


	public function hfe_global_css() {
		wp_enqueue_style( 'hfe-admin-style', HFE_URL . 'admin/assets/css/ehf-admin.css', array(), HFE_VER );
	}

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
		add_settings_section( 'hfe-options', 'Compatibility option', array( $this, 'hfe_compatibility_callback' ), 'Settings' );
		add_settings_field( 'hfe-way', 'Select the way of Compatibility', array( $this, 'hfe_compatibility_option_callback' ), 'Settings', 'hfe-options' );
	}

	/**
	 * call back function for the ssettings api function add_settings_section
	 *
	 * this function can be used to add description of the settings sections
	 * 
	 * @since x.x.x
	 * @return void
	 */
	public function hfe_compatibility_callback() {
		echo 'This setting allows you to select the way for compatibility.	';
	}

	/**
	 * call back function for the ssettings api function add_settings_field
	 *
	 * this function will contain the markup for the input feilds that we can add.
	 * 
	 * @since x.x.x
	 * @return void
	 */
	public function hfe_compatibility_option_callback() {
		$hfe_radio_button = get_option( 'hfe_compatibility_option', '1' );
			wp_enqueue_style( 'hfe-admin-style', HFE_URL . 'admin/assets/css/ehf-admin.css', array(), HFE_VER );
		?><label>
						<input type="radio" name="hfe_compatibility_option" value= 1 <?php checked( $hfe_radio_button, 1 ); ?> > <div class="hfe_radio_options"><?php esc_html_e( 'Elementor way', 'header-footer-elementor' ); ?></div>
						<p class="description"><?php esc_html_e( 'This replaces the header.php & footer.php template with a custom templates from the plugin.', 'header-footer-elementor' ); ?></p><br></label>
					<label>
						<input type="radio" name="hfe_compatibility_option" value= 2 <?php checked( $hfe_radio_button, 2 ); ?> > <div class="hfe_radio_options"><?php esc_html_e( 'Using action wp_body_opens', 'header-footer-elementor' ); ?></div>
						<p class="description">
						<?php esc_html_e( 'This adds the header in the new action that was introduced by WordPress `wp_body_option` and footer is added in wp_footer action.', 'header-footer-elementor' ); ?>
						</p></label>
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
				array( $this, 'hfe_settings_page' )
			);
	}

	/**
	 * Settings page.
	 *
	 * call back function for add submenu page function.
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
			$tabs       = array(
				'hfe_templates' => array(
					'name' => __( 'All templates', 'header-footer-elementor' ),
					'url'  => admin_url( 'edit.php?post_type=elementor-hf' ),
				),
				'hfe_settings'  => array(
					'name' => __( 'Settings', 'header-footer-elementor' ),
					'url'  => admin_url( 'themes.php?page=hfe-settings' ),
				),
			);
			$active_tab = isset( $_GET['page'] ) && $_GET['page'] === 'hfe-settings' ? 'hfe_settings' : 'hfe_templates';
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
	 * function for adding tabs 
	 *
	 * @since x.x.x
	 * @return void
	 */
	public function hfe_tabs() {
		?>
	<h2 class="nav-tab-wrapper">
			<?php
			$tabs       = array(
				'hfe_templates' => array(
					'name' => __( 'All templates', 'header-footer-elementor' ),
					'url'  => admin_url( 'edit.php?post_type=elementor-hf' ),
				),
				'hfe_settings'  => array(
					'name' => __( 'Settings', 'header-footer-elementor' ),
					'url'  => admin_url( 'themes.php?page=hfe-settings' ),
				),
			);
			$active_tab = isset( $_GET['page'] ) && $_GET['page'] === 'hfe-settings-page' ? 'hfe_settings' : 'hfe_templates';
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
	}

}

new HFE_Fallback_Theme_Support();
