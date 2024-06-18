<?php
/**
 * HFE Settings Page.
 *
 * Add plugin setting page.
 *
 * @since 1.6.0
 * @package hfe
 */

namespace HFE\Themes;

/**
 * Class Settings Page.
 *
 * @since 1.6.0
 */
class HFE_Settings_Page {

	/**
	 * Constructor.
	 *
	 * @since 1.6.0
	 */
	public function __construct() {
		add_action( 'admin_head', [ $this, 'hfe_global_css' ] );
		if ( is_admin() && current_user_can( 'manage_options' ) ) {
			add_action( 'admin_menu', [ $this, 'hfe_register_settings_page' ] );
		}
		add_action( 'admin_init', [ $this, 'hfe_admin_init' ] );
		add_filter( 'views_edit-elementor-hf', [ $this, 'hfe_settings' ], 10, 1 );
		add_filter( 'admin_footer_text', [ $this, 'admin_footer_text' ] );
		add_action( 'admin_enqueue_scripts', [ $this, 'enqueue_admin_scripts' ] );
		add_filter( 'plugin_action_links_' . HFE_PATH, [ $this, 'settings_link' ] );
	}

	/**
	 * Settings tab array
	 *
	 * @var settings tabs
	 */
	public static $hfe_settings_tabs;

	/**
	 * Adds CSS to Hide the extra submenu added for the settings tab.
	 *
	 * @since 1.6.0
	 * @return void
	 */
	public function hfe_global_css() {
		wp_enqueue_style( 'hfe-admin-style', HFE_URL . 'admin/assets/css/ehf-admin.css', [], HFE_VER );
	}

	/**
	 * Load admin styles on header footer elementor edit screen.
	 */
	public function enqueue_admin_scripts() {
		wp_enqueue_script( 'hfe-admin-script', HFE_URL . 'admin/assets/js/ehf-admin.js', [ 'jquery', 'updates' ], HFE_VER, true );

		$is_dismissed = get_user_meta( get_current_user_id(), 'hfe-popup' );

		$strings = [
			'addon_activate'    => esc_html__( 'Activate', 'header-footer-elementor' ),
			'addon_activated'   => esc_html__( 'Activated', 'header-footer-elementor' ),
			'addon_active'      => esc_html__( 'Active', 'header-footer-elementor' ),
			'addon_deactivate'  => esc_html__( 'Deactivate', 'header-footer-elementor' ),
			'addon_inactive'    => esc_html__( 'Inactive', 'header-footer-elementor' ),
			'addon_install'     => esc_html__( 'Install', 'header-footer-elementor' ),
			'theme_installed'   => esc_html__( 'Theme Installed', 'header-footer-elementor' ),
			'plugin_installed'  => esc_html__( 'Plugin Installed', 'header-footer-elementor' ),
			'addon_download'    => esc_html__( 'Download', 'header-footer-elementor' ),
			'addon_exists'      => esc_html__( 'Already Exists.', 'header-footer-elementor' ),
			'visit_site'        => esc_html__( 'Visit Website', 'header-footer-elementor' ),
			'plugin_error'      => esc_html__( 'Could not install. Please download from WordPress.org and install manually.', 'header-footer-elementor' ),
			'subscribe_success' => esc_html__( 'Your details are submitted successfully.', 'header-footer-elementor' ),
			'subscribe_error'   => esc_html__( 'Encountered an error while performing your request.', 'header-footer-elementor' ),
			'ajax_url'          => admin_url( 'admin-ajax.php' ),
			'nonce'             => wp_create_nonce( 'hfe-admin-nonce' ),
			'popup_dismiss'     => false,
			'data_source'       => 'HFE',
		];

		$strings = apply_filters( 'hfe_admin_strings', $strings );

		wp_localize_script(
			'hfe-admin-script',
			'hfe_admin_data',
			$strings
		);

	}

	/**
	 * Adds a tab in plugin submenu page.
	 *
	 * @since 1.6.0
	 * @param string $views to add tab to current post type view.
	 *
	 * @return mixed
	 */
	public function hfe_settings( $views ) {

		$this->hfe_tabs();
		$this->hfe_modal();
		return $views;

	}

	/**
	 * Function for registering the settings api.
	 *
	 * @since 1.6.0
	 * @return void
	 */
	public function hfe_admin_init() {
		register_setting( 'hfe-plugin-options', 'hfe_compatibility_option' );
		add_settings_section( 'hfe-options', __( 'Add Theme Support', 'header-footer-elementor' ), [ $this, 'hfe_compatibility_callback' ], 'Settings' );
		add_settings_field( 'hfe-way', 'Methods to Add Theme Support', [ $this, 'hfe_compatibility_option_callback' ], 'Settings', 'hfe-options' );

		register_setting( 'hfe-plugin-guide', 'hfe_guide_email' );
		register_setting( 'hfe-plugin-guide', 'hfe_guide_fname' );

	}

	/**
	 * Call back function for the ssettings api function add_settings_section
	 *
	 * This function can be used to add description of the settings sections
	 *
	 * @since 1.6.0
	 * @return void
	 */
	public function hfe_compatibility_callback() {
		$message      = __( 'The Elementor Header & Footer Builder plugin need compatibility with your current theme to work smoothly.</br></br>Following are two methods that enable theme support for the plugin.</br></br>Method 1 is selected by default and that works fine almost will all themes. In case, you face any issue with the header or footer template, try choosing Method 2.', 'header-footer-elementor' );
		$allowed_html = [ 'br' => [] ];
		echo wp_kses( $message, $allowed_html );
	}

	/**
	 * Call back function for the ssettings api function add_settings_field
	 *
	 * This function will contain the markup for the input feilds that we can add.
	 *
	 * @since 1.6.0
	 * @return void
	 */
	public function hfe_compatibility_option_callback() {
		$hfe_radio_button = get_option( 'hfe_compatibility_option', '1' );
		wp_enqueue_style( 'hfe-admin-style', HFE_URL . 'admin/assets/css/ehf-admin.css', [], HFE_VER );
		?>

		<label>
			<input type="radio" name="hfe_compatibility_option" value= 1 <?php checked( $hfe_radio_button, 1 ); ?> > <div class="hfe_radio_options"><?php esc_html_e( ' Method 1 (Recommended)', 'header-footer-elementor' ); ?></div>
			<p class="description"><?php esc_html_e( 'This method replaces your theme\'s header (header.php) & footer (footer.php) template with plugin\'s custom templates.', 'header-footer-elementor' ); ?></p><br>
		</label>
		<label>
			<input type="radio" name="hfe_compatibility_option" value= 2 <?php checked( $hfe_radio_button, 2 ); ?> > <div class="hfe_radio_options"><?php esc_html_e( 'Method 2', 'header-footer-elementor' ); ?></div>
			<p class="description">
				<?php
				echo sprintf(
					esc_html( "This method hides your theme's header & footer template with CSS and displays custom templates from the plugin.", 'header-footer-elementor' ),
					'<br>'
				);
				?>
			</p><br>
		</label>
		<p class="description">
			<?php
			echo sprintf(
				wp_kses( 'Sometimes above methods might not work well with your theme, in this case, contact your theme author and request them to add support for the <a href="https://github.com/Nikschavan/header-footer-elementor/wiki/Adding-Header-Footer-Elementor-support-for-your-theme">plugin.</a>', 'header-footer-elementor' ),
				'<br>'
			);
			?>
		</p>

		<?php
	}

	/**
	 * Show a settings page incase of unsupported theme.
	 *
	 * @since 1.6.0
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

		add_submenu_page(
			'themes.php',
			__( 'About Us', 'header-footer-elementor' ),
			__( 'About Us', 'header-footer-elementor' ),
			'manage_options',
			'hfe-about',
			[ $this, 'hfe_settings_page' ]
		);
	}

	/**
	 * Settings page.
	 *
	 * Call back function for add submenu page function.
	 *
	 * @since 1.6.0
	 */
	public function hfe_settings_page() {
		echo '<h1 class="hfe-heading-inline">';
		esc_attr_e( 'Elementor Header & Footer Builder ', 'header-footer-elementor' );
		echo '</h1>';
		$this->hfe_tabs();
		?>
		<?php
		$hfe_radio_button = get_option( 'hfe_compatibility_option', '1' );
		?>
		<?php
		if ( isset( $_GET['page'] ) ) { // PHPCS:Ignore WordPress.Security.NonceVerification.Recommended
			switch ( $_GET['page'] ) { // PHPCS:Ignore WordPress.Security.NonceVerification.Recommended
				case 'hfe-settings':
					$this->get_themes_support();
					break;

				case 'hfe-about':
					$this->get_about_html();
					break;

				case 'default':
					break;
			}
		}
	}

	/**
	 * Settings page - load modal content.
	 *
	 * Call back function for add submenu page function.
	 *
	 * @since 1.6.2
	 */
	public function hfe_modal() {
		$is_dismissed = [];
		$is_dismissed = get_user_meta( get_current_user_id(), 'hfe-popup' );

		$is_subscribed   = get_user_meta( get_current_user_ID(), 'hfe-subscribed' );
		$subscribe_valid = ( is_array( $is_subscribed ) && isset( $is_subscribed[0] ) && 'yes' === $is_subscribed[0] ) ? 'yes' : false;

		if ( ( ! empty( $is_dismissed ) && 'dismissed' === $is_dismissed[0] ) || 'yes' === $subscribe_valid ) {
			return false;
		} else {
			$this->get_guide_modal();
		}
	}

	/**
	 * Function for adding tabs
	 *
	 * @since 1.6.0
	 * @return void
	 */
	public function hfe_tabs() {
		?>
		<div class="nav-tab-wrapper">
			<?php
			if ( ! isset( self::$hfe_settings_tabs ) ) {
				self::$hfe_settings_tabs['hfe_templates'] = [
					'name' => __( 'All Templates', 'header-footer-elementor' ),
					'url'  => admin_url( 'edit.php?post_type=elementor-hf' ),
				];
			}

			self::$hfe_settings_tabs['hfe_about'] = [
				'name' => __( 'About Us', 'header-footer-elementor' ),
				'url'  => admin_url( 'themes.php?page=hfe-about' ),
			];

			$tabs = apply_filters( 'hfe_settings_tabs', self::$hfe_settings_tabs );

			foreach ( $tabs as $tab_id => $tab ) {

				$tab_slug = str_replace( '_', '-', $tab_id );

				$active_tab = ( ( isset( $_GET['page'] ) && $tab_slug == $_GET['page'] ) || ( ! isset( $_GET['page'] ) && 'hfe_templates' == $tab_id ) ) ? $tab_id : ''; // PHPCS:Ignore WordPress.Security.NonceVerification.Recommended

				$active = ( $active_tab == $tab_id ) ? ' nav-tab-active' : '';

				echo '<a href="' . esc_url( $tab['url'] ) . '" class="nav-tab' . esc_attr( $active ) . '">';
				echo esc_html( $tab['name'] );
				echo '</a>';
			}

			?>
		</div>
		<?php
	}

	/**
	 * Admin footer text.
	 *
	 * Modifies the "Thank you" text displayed in the admin footer.
	 *
	 * Fired by `admin_footer_text` filter.
	 *
	 * @since 1.6.0
	 * @access public
	 *
	 * @param string $footer_text The content that will be printed.
	 *
	 * @return string The content that will be printed.
	 */
	public function admin_footer_text( $footer_text ) {
		$current_screen = get_current_screen();

		$is_elementor_screen = ( $current_screen && ( 'elementor-hf' === $current_screen->post_type || 'appearance_page_hfe-guide' === $current_screen->id || 'appearance_page_hfe-about' === $current_screen->id || 'appearance_page_hfe-settings' === $current_screen->id ) );

		if ( $is_elementor_screen ) {
			$footer_text = sprintf(
				/* translators: 1: Elementor, 2: Link to plugin review */
				__( 'Help us spread the word about the plugin by leaving %2$s %1$s %3$s ratings on %2$s WordPress.org %3$s. Thank you from the Brainstorm Force team!', 'header-footer-elementor' ),
				'&#9733;&#9733;&#9733;&#9733;&#9733;',
				'<a href="https://wordpress.org/support/plugin/header-footer-elementor/reviews/#new-post" target="_blank">',
				'</a>'
			);
		}

		return $footer_text;
	}

	/**
	 * Function for theme support tab
	 *
	 * @since 1.6.0
	 * @return void
	 */
	public function get_themes_support() {
		?>
		<form action="options.php" method="post">
			<?php settings_fields( 'hfe-plugin-options' ); ?>
			<?php do_settings_sections( 'Settings' ); ?>
			<?php submit_button(); ?>
		</form>
		<?php
	}

	/**
	 * Function for Step-By-Step guide
	 *
	 * @since 1.6.0
	 * @return void
	 */
	public function get_guide_html() {

		$is_subscribed   = get_user_meta( get_current_user_ID(), 'hfe-subscribed' );
		$subscribe_valid = ( is_array( $is_subscribed ) && isset( $is_subscribed[0] ) && 'yes' === $is_subscribed[0] ) ? 'yes' : false;
		$subscribe_flag  = ( 'yes' === $subscribe_valid ) ? ' hfe-user-subscribed' : ' hfe-user-unsubscribed';
		?>

		<div class="hfe-admin-about-section hfe-admin-columns hfe-admin-guide-section<?php echo esc_attr( $subscribe_flag ); ?>">

			<div class="hfe-admin-column-50">
				<div class="hfe-admin-about-section-column">
					<h2><?php esc_html_e( 'Create Impressive Header and Footer Designs', 'header-footer-elementor' ); ?></h2>
					<p><?php esc_html_e( 'Elementor Header & Footer Builder plugin lets you build impactful navigation for your website very easily. Before we begin, we would like to know more about you. This will help us to serve you better.', 'header-footer-elementor' ); ?></p>
				</div>
			</div>
			<?php if ( 'yes' !== $subscribe_valid ) { ?>
				<div class="hfe-admin-column-50 hfe-admin-column-last">
					<div class="hfe-guide-content hfe-subscription-step-1-active">
						<div class="hfe-guide-content-header hfe-admin-columns">
						</div>
						<form action="options.php" method="post">
							<?php $this->get_form_html(); ?>
						</form>
					</div>
					<div class="hfe-privacy-policy-container">
						<?php /* translators: %1$s and %3$s are opening anchor tags, and %2$s and %4$s is closing anchor tags. */ ?>
						<p class="hfe-subscription-policy"><?php printf( __( 'By submitting, you agree to our %1$sTerms%2$s and %3$sPrivacy Policy%4$s.', 'header-footer-elementor' ), '<a href="https://store.brainstormforce.com/terms-and-conditions/" target="_blank">', '</a>', '<a href="https://store.brainstormforce.com/privacy-policy/" target="_blank">', '</a>' ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?></p>
					</div>
				</div>
			<?php } ?>
		</div>
		<?php
	}

	/**
	 * Function for form HTML
	 *
	 * @since 1.6.0
	 * @return void
	 */
	public function get_form_html() {
		?>
		<?php $this->get_form_row_1(); ?>
		<?php $this->get_form_row_2(); ?>
		<a href="#" class="button-subscription-skip"><?php esc_html_e( 'Skip', 'header-footer-elementor' ); ?></a>
		<?php
	}

	/**
	 * Function for form Row 1 HTML
	 *
	 * @since 1.6.0
	 * @return void
	 */
	public function get_form_row_1() {
		?>

		<div class="hfe-subscription-step-1">
			<div class="hfe-subscription-row">
				<div class="hfe-input-container">
					<select class="hfe-subscribe-field subscription-input-wp-user-type" name="wp_user_type">
						<option value=""></option>
						<option value="1"><?php esc_html_e( 'Beginner', 'header-footer-elementor' ); ?></option>
						<option value="2"><?php esc_html_e( 'Intermediate', 'header-footer-elementor' ); ?></option>
						<option value="3"><?php esc_html_e( 'Expert', 'header-footer-elementor' ); ?></option>
					</select>
					<small class="subscription-desc"><?php esc_html_e( 'Field is required', 'header-footer-elementor' ); ?></small>
					<label class="subscription-label"><?php esc_html_e( 'I\'m a WordPress:', 'header-footer-elementor' ); ?></label>
				</div>
				<div class="hfe-input-container">
					<select class="hfe-subscribe-field subscription-input-build-website-for" name="build_website_for">
						<option value=""></option>
						<option value="1"><?php esc_html_e( 'Myself/My company', 'header-footer-elementor' ); ?></option>
						<option value="2"><?php esc_html_e( 'My client', 'header-footer-elementor' ); ?></option>
					</select>
					<small class="subscription-desc"><?php esc_html_e( 'Field is required', 'header-footer-elementor' ); ?></small>
					<label class="subscription-label"><?php esc_html_e( 'I\'m building website for:', 'header-footer-elementor' ); ?></label>
				</div>
			</div>

			<p class="submit">
				<input type="submit" name="submit-1" id="submit-1" class="button submit-1 button-primary" value="Next">
			</p>
		</div>
		<?php
	}

	/**
	 * Function for form Row 2 HTML
	 *
	 * @since 1.6.0
	 * @return void
	 */
	public function get_form_row_2() {
		?>
		<div class="hfe-subscription-step-2">
			<div class="hfe-subscription-row">
				<div class="hfe-input-container">
					<input id="hfe_subscribe_name" class="hfe-subscribe-field hfe-subscribe-name" type="text" name="hfe_subscribe_name" value="<?php echo esc_attr( get_option( 'hfe_guide_fname' ) ); ?>">
					<small class="subscription-desc"><?php esc_html_e( 'First name is required', 'header-footer-elementor' ); ?></small>
					<label class="subscription-label"><?php esc_html_e( 'Your First Name', 'header-footer-elementor' ); ?></label>
				</div>
				<div class="hfe-input-container">
					<input id="hfe_subscribe_email" class="hfe-subscribe-field hfe-subscribe-email" type="text" name="hfe_subscribe_email" value="<?php echo esc_attr( get_option( 'hfe_guide_email' ) ); ?>">
					<small class="subscription-desc"><?php esc_html_e( 'Email address is required', 'header-footer-elementor' ); ?></small>
					<label class="subscription-label"><?php esc_html_e( 'Your Work Email', 'header-footer-elementor' ); ?></label>
				</div>
				<div class="hfe-input-container">
					<input type="checkbox" name="hfe_subscribe_accept" id="hfe_subscribe_accept" class="hfe_subscribe_accept" value="check">
					<label for="hfe_subscribe_accept" class="hfe-subscribe-accept-label"><?php esc_html_e( 'I agree to receive your newsletters and accept the data privacy statement.', 'header-footer-elementor' ); ?></label>
				</div>
			</div>
			<p class="submit">
				<button type="submit" id="submit-2"  class="button submit-2 button-primary">
					<span class="hfe-submit-button-text"><?php echo esc_html__( 'Submit', 'header-footer-elementor' ); ?></span>
				</button>
			</p>
		</div>
		<?php
	}


	/**
	 * Function for Step-By-Step guide modal popup
	 *
	 * @since 1.6.0
	 * @return void
	 */
	public function get_guide_modal() {
		$new_page_url = admin_url( 'post-new.php?post_type=elementor-hf' );
		?>
		<div class="hfe-guide-modal-popup" data-new-page="<?php echo esc_attr( $new_page_url ); ?>">
			<div class="hfe-guide-modal-popup-wrapper">
				<div class="hfe-guide-modal-content">
					<div class="heading">
						<img src="<?php echo esc_url( HFE_URL . 'assets/images/header-footer-elementor-icon.svg' ); ?>" class="hfe-logo">
						<h3><?php esc_html_e( 'Elementor Header & Footer Builder', 'header-footer-elementor' ); ?></h3>
					</div>
					<?php $this->get_guide_html(); ?>
				</div>
			</div>
			<div class="hfe-guide-modal-overlay"></div>
		</div>
		<?php
	}

	/**
	 * Function for About us HTML
	 *
	 * @since 1.6.0
	 * @return void
	 */
	public function get_about_html() {
		$this->output_about_info();
		$this->output_about_addons();
	}

	/**
	 * Function for Astra Pro white labels with defaults.
	 *
	 * @since 1.6.24
	 * @return array
	 */
	protected function get_white_label() {
		$white_labels = is_callable( 'Astra_Admin_Helper::get_admin_settings_option' ) ? \Astra_Admin_Helper::get_admin_settings_option( '_astra_ext_white_label', true ) : [];

		$theme_name = ! empty( $white_labels['astra']['name'] ) ? $white_labels['astra']['name'] : 'Astra';

		return [
			'theme_name'  => $theme_name,
			/* translators: %s: theme name */
			'description' => ! empty( $white_labels['astra']['description'] ) ? $white_labels['astra']['description'] : esc_html( sprintf( __( 'Powering over 1+ Million websites, %s is loved for the fast performance and ease of use it offers. It is suitable for all kinds of websites like blogs, portfolios, business, and WooCommerce stores.', 'header-footer-elementor' ), esc_html( $theme_name ) ) ),
			'theme_icon'  => ! empty( $white_labels['astra']['icon'] ) ? $white_labels['astra']['icon'] : '',
			'author_url'  => ! empty( $white_labels['astra']['author_url'] ) ? $white_labels['astra']['author_url'] : 'https://wpastra.com/',
		];
	}

	/**
	 * Display the General Info section of About tab.
	 *
	 * @since 1.6.0
	 */
	protected function output_about_info() {

		$white_labels = $this->get_white_label();

		?>

		<div class="hfe-admin-about-section hfe-admin-columns hfe-admin-about-us">

			<div class="hfe-admin-column-60">
				<h3><?php esc_html_e( 'Welcome to Elementor Header & Footer Builder!', 'header-footer-elementor' ); ?></h3>

				<p><?php esc_html_e( 'With this awesome plugin, experience the easiest way to create a customized header and footer for your website with Elementor. That too 100% FREE!', 'header-footer-elementor' ); ?></p>

				<p><?php esc_html_e( 'Design beautiful layouts with simple drag & drop and display them at desired location with powerful target controls. The plugin comes with inbuilt Elementor widgets that offer essential features to build header and footer. It\'s a lightweight plugin that works seamlessly with all themes and backed up by 24/7 support.', 'header-footer-elementor' ); ?></p>

				<p><?php esc_html_e( 'Trusted by more than 1+ Million users, Elementor Header & Footer Builder is a modern way to build advanced navigation for your website.', 'header-footer-elementor' ); ?></p>

				<?php /* translators: %s: theme name */ ?>
				<p><?php printf( esc_html__( 'This plugin is brought to you by the same team behind the popular WordPress theme %s and a series of Ultimate Addons plugins.', 'header-footer-elementor' ), esc_html( $white_labels['theme_name'] ) ); ?>

			</div>

			<div class="hfe-admin-column-40 hfe-admin-column-last">
				<figure>
					<img src="<?php echo esc_url( HFE_URL ); ?>assets/images/settings/our-team.jpeg" alt="<?php esc_attr_e( 'Team photo', 'header-footer-elementor' ); ?>">
					<figcaption>
						<?php esc_html_e( 'Brainstorm Force Team', 'header-footer-elementor' ); ?><br>
					</figcaption>
				</figure>
			</div>

		</div>
		<?php
	}

	/**
	 * Display the Addons section of About tab.
	 *
	 * @since 1.6.0
	 */
	protected function output_about_addons() {

		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}

		$all_plugins         = get_plugins();
		$all_themes          = wp_get_themes();
		$bsf_plugins         = $this->get_bsf_plugins();
		$can_install_plugins = $this->hfe_can_install( 'plugin' );
		$can_install_themes  = $this->hfe_can_install( 'theme' );

		?>
		<div class="hfe-admin-addons">
			<div class="addons-container">
				<?php
				foreach ( $bsf_plugins as $plugin => $details ) :

					$plugin_data = $this->get_plugin_data( $plugin, $details, $all_plugins, $all_themes );

					?>
					<div class="addon-container">
						<div class="addon-item">
							<div class="details hfe-clear">
								<img src="<?php echo esc_url( $plugin_data['details']['icon'] ); ?>">
								<div class="addon-details">
									<h5 class="addon-name">
									<?php
										printf(
										/* translators: %s - addon status label. */
											esc_html__( '%1$s %3$s %2$s', 'header-footer-elementor' ),
											'<a href="' . esc_url( $details['siteurl'] ) . '" target="_blank" class="website-link">',
											'</a>',
											esc_html( $plugin_data['details']['name'] )
										);
									?>
										</h5>

									<p class="addon-desc"><?php echo wp_kses_post( $plugin_data['details']['desc'] ); ?></p>
								</div>
							</div>
							<div class="actions hfe-clear">
								<div class="status">
									<strong>
										<?php
										printf(
										/* translators: %s - addon status label. */
											esc_html__( 'Status: %s', 'header-footer-elementor' ),
											'<span class="status-label ' . esc_attr( $plugin_data['status_class'] ) . '">' . wp_kses_post( $plugin_data['status_text'] ) . '</span>'
										);
										?>
									</strong>
								</div>
								<div class="action-button">
									<?php if ( 'Visit Website' === $plugin_data['action_text'] ) { ?>
										<a href="<?php echo esc_url( $plugin_data['plugin_src'] ); ?>" target="_blank" rel="noopener noreferrer" class="pro-plugin button button-primary"><?php echo wp_kses_post( $plugin_data['action_text'] ); ?></a>
									<?php } elseif ( 'theme' === $details['type'] && $can_install_themes ) { ?>
										<button class="<?php echo esc_attr( $plugin_data['action_class'] ); ?>" data-plugin="<?php echo esc_attr( $plugin_data['plugin_src'] ); ?>" data-type="theme" data-slug="<?php echo esc_attr( $details['slug'] ); ?>" data-site="<?php echo esc_url( $details['url'] ); ?>">
											<span><?php echo wp_kses_post( $plugin_data['action_text'] ); ?></span>
										</button>
									<?php } elseif ( 'plugin' === $details['type'] && $can_install_plugins ) { ?>
										<button class="<?php echo esc_attr( $plugin_data['action_class'] ); ?>" data-plugin="<?php echo esc_attr( $plugin_data['plugin_src'] ); ?>" data-type="plugin" data-slug="<?php echo esc_attr( $details['slug'] ); ?>" data-site="<?php echo esc_url( $details['url'] ); ?>" data-file="<?php echo esc_attr( $plugin ); ?>">
											<span><?php echo wp_kses_post( $plugin_data['action_text'] ); ?></span>
										</button>
									<?php } else { ?>
										<a href="<?php echo esc_url( $details['wporg'] ); ?>" target="_blank" rel="noopener noreferrer">
											<?php esc_html_e( 'WordPress.org', 'header-footer-elementor' ); ?>
											<span aria-hidden="true" class="dashicons dashicons-external"></span>
										</a>
									<?php } ?>
								</div>
							</div>
						</div>
					</div>
				<?php endforeach; ?>
			</div>
		</div>
		<?php
	}

	/**
	 * Get plugin data to display in the Addons section of About tab.
	 *
	 * @since 1.6.0
	 *
	 * @param string $addon      Plugin/Theme slug.
	 * @param array  $details     Plugin details.
	 * @param array  $all_plugins List of all plugins.
	 * @param array  $all_themes List of all themes.
	 *
	 * @return array
	 */
	protected function get_plugin_data( $addon, $details, $all_plugins, $all_themes ) {

		$have_pro = ( ! empty( $details['pro'] ) );
		$show_pro = false;

		$theme = wp_get_theme();

		$plugin_data = [];

		$is_plugin = ( 'plugin' === $details['type'] ) ? true : false;
		$is_theme  = ( 'theme' === $details['type'] ) ? true : false;

		if ( ( $is_plugin && array_key_exists( $addon, $all_plugins ) ) || ( $is_theme && array_key_exists( $addon, $all_themes ) ) ) {

			if ( ( $is_plugin && is_plugin_active( $addon ) ) || ( $is_theme && ( 'Astra' === $theme->name || 'Astra' === $theme->parent_theme ) ) ) {

				// Status text/status.
				$plugin_data['status_class'] = 'status-active';
				$plugin_data['status_text']  = esc_html__( 'Active', 'header-footer-elementor' );
				// Button text/status.
				$plugin_data['action_class'] = $plugin_data['status_class'] . ' button button-secondary disabled';
				$plugin_data['action_text']  = esc_html__( 'Activated', 'header-footer-elementor' );
				$plugin_data['plugin_src']   = esc_attr( $addon );
			} else {
				// Status text/status.
				$plugin_data['status_class'] = 'status-inactive';
				$plugin_data['status_text']  = esc_html__( 'Inactive', 'header-footer-elementor' );
				// Button text/status.
				$plugin_data['action_class'] = $plugin_data['status_class'] . ' button button-secondary';
				$plugin_data['action_text']  = esc_html__( 'Activate', 'header-footer-elementor' );
				$plugin_data['plugin_src']   = esc_attr( $addon );
			}
		} else {
			// install if already doesn't exists.
			// Status text/status.
			$plugin_data['status_class'] = 'status-download';
			if ( isset( $details['act'] ) && 'go-to-url' === $details['act'] ) {
				$plugin_data['status_class'] = 'status-go-to-url';
			}
			$plugin_data['status_text'] = esc_html__( 'Not Installed', 'header-footer-elementor' );
			// Button text/status.
			$plugin_data['action_class'] = $plugin_data['status_class'] . ' button button-primary';
			$plugin_data['action_text']  = esc_html__( 'Install', 'header-footer-elementor' );
			$plugin_data['plugin_src']   = esc_url( $details['url'] );

			if ( $have_pro ) {
				$plugin_data['status_class'] = '';
				$plugin_data['action_text']  = esc_html__( 'Visit Website', 'header-footer-elementor' );
			}
		}

		$plugin_data['details'] = $details;

		return $plugin_data;
	}

	/**
	 * List of plugins that we propose to install.
	 *
	 * @since 1.6.0
	 *
	 * @return array
	 */
	protected function get_bsf_plugins() {

		$white_labels = $this->get_white_label();

		$images_url = HFE_URL . 'assets/images/settings/';

		return [

			'astra'                                     => [
				'icon'    => ! empty( $white_labels['theme_icon'] ) ? $white_labels['theme_icon'] : $images_url . 'plugin-astra.png',
				'type'    => 'theme',
				'name'    => $white_labels['theme_name'],
				'desc'    => $white_labels['description'],
				'wporg'   => 'https://wordpress.org/themes/astra/',
				'url'     => 'https://downloads.wordpress.org/theme/astra.zip',
				'siteurl' => $white_labels['author_url'],
				'pro'     => false,
				'slug'    => 'astra',
			],

			'astra-sites/astra-sites.php'               => [
				'icon'    => $images_url . 'plugin-st.png',
				'type'    => 'plugin',
				'name'    => esc_html__( 'Starter Templates', 'header-footer-elementor' ),
				'desc'    => esc_html__( 'A popular templates plugin that provides an extensive library of professional and fully customizable 600+ ready website and templates. More than 1+ Million websites have built with this plugin.', 'header-footer-elementor' ),
				'wporg'   => 'https://wordpress.org/plugins/astra-sites/',
				'url'     => 'https://downloads.wordpress.org/plugin/astra-sites.zip',
				'siteurl' => 'https://startertemplates.com/',
				'pro'     => false,
				'slug'    => 'astra-sites',
			],

			'ultimate-elementor/ultimate-elementor.php' => [
				'icon'    => $images_url . 'plugin-uae.png',
				'type'    => 'plugin',
				'name'    => esc_html__( 'Ultimate Addons for Elementor', 'header-footer-elementor' ),
				'desc'    => esc_html__( 'It’s a collection of 40+ unique, creative, and optimized Elementor widgets with 100+ readymade templates. Trusted by more than 600+ K web professionals. It’s a #1 toolkit for Elementor Page Builder.', 'header-footer-elementor' ),
				'wporg'   => '',
				'url'     => 'https://ultimateelementor.com/',
				'siteurl' => 'https://ultimateelementor.com/',
				'pro'     => true,
				'slug'    => 'ultimate-elementor',
			],
		];
	}

	/**
	 * Determine if the plugin/addon installations are allowed.
	 *
	 * @since 1.6.0
	 * @param string $type defines addon type.
	 * @return bool
	 */
	public function hfe_can_install( $type ) {

		if ( ! in_array( $type, [ 'plugin', 'theme' ], true ) ) {
			return false;
		}

		// Determine whether file modifications are allowed.
		if ( ! wp_is_file_mod_allowed( 'hfe_can_install' ) ) {
			return false;
		}

		if ( 'theme' === $type ) {
			if ( ! current_user_can( 'install_themes' ) ) {
				return false;
			}

			return true;

		} elseif ( 'plugin' === $type ) {
			if ( ! current_user_can( 'install_plugins' ) ) {
				return false;
			}

			return true;
		}

		return false;
	}

	/**
	 * Add settings link to the Plugins page.
	 *
	 * @since 1.6.0
	 *
	 * @param array $links Plugin row links.
	 *
	 * @return array $links
	 */
	public function settings_link( $links ) {

		$custom['settings'] = sprintf(
			'<a href="%s" aria-label="%s">%s</a>',
			esc_url(
				add_query_arg(
					[
						'post_type' => 'elementor-hf',
					],
					admin_url( 'edit.php' )
				)
			),
			esc_attr__( 'Go to HFE Settings page', 'header-footer-elementor' ),
			esc_html__( 'Settings', 'header-footer-elementor' )
		);

		return array_merge( $custom, (array) $links );
	}

}

new HFE_Settings_Page();
