<?php
/**
 * HFE Settings Page.
 *
 * Add plugin setting page.
 *
 * @since x.x.x
 * @package hfe
 */

namespace HFE\Themes;

/**
 * Class Settings Page.
 *
 * @since x.x.x
 */
class HFE_Settings_Page {

	/**
	 * Constructor.
	 *
	 * @since x.x.x
	 */
	public function __construct() {
		$this->setup_fallback_support();
		add_action( 'admin_head', [ $this, 'hfe_global_css' ] );
		add_action( 'admin_menu', [ $this, 'hfe_register_settings_page' ] );
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
	 * @since x.x.x
	 * @return void
	 */
	public function hfe_global_css() {
		wp_enqueue_style( 'hfe-admin-style', HFE_URL . 'admin/assets/css/ehf-admin.css', [], HFE_VER );
	}

	/**
	 * Load admin styles on header footer elementor edit screen.
	 */
	public function enqueue_admin_scripts() {
		wp_enqueue_script( 'hfe-admin-script', HFE_URL . 'admin/assets/js/ehf-admin.js', [], HFE_VER );

		$is_dismissed = get_user_meta( get_current_user_id(), 'hfe-popup' );

		$strings = [
			'subscribe_success' => esc_html__( 'Thanks for Subscribing!', 'header-footer-elementor' ),
			'subscribe_error'   => esc_html__( 'Error encountered while submitting the form!', 'header-footer-elementor' ),
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
	 * @since x.x.x
	 * @param string $views to add tab to current post type view.
	 *
	 * @return mixed
	 */
	public function hfe_settings( $views ) {
		$this->hfe_tabs();
		$is_dismissed = [];
		// $is_dismissed = get_user_meta( get_current_user_id(), 'hfe-popup' );
		// if( ! empty( $is_dismissed ) && 'dismissed' === $is_dismissed[0] ) {
		// return false;
		// } else {
			$this->get_guide_modal();
		// }
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
		add_settings_section( 'hfe-options', __( 'Add Theme Support', 'header-footer-elementor' ), [ $this, 'hfe_compatibility_callback' ], 'Settings' );
		add_settings_field( 'hfe-way', 'Methods to Add Theme Support', [ $this, 'hfe_compatibility_option_callback' ], 'Settings', 'hfe-options' );

		register_setting( 'hfe-plugin-guide', 'hfe_guide_option' );
		register_setting( 'hfe-plugin-guide', 'hfe_guide_email' );
		register_setting( 'hfe-plugin-guide', 'hfe_guide_fname' );

		add_settings_section( 'hfe-guide-options', '', [ $this, 'hfe_guide_callback' ], 'Step-By-Step Guide' );
		add_settings_field( 'hfe-guide', '', [ $this, 'hfe_guide_option_callback' ], 'Step-By-Step Guide', 'hfe-guide-options' );
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
		_e( 'The Elementor Header & Footer Builder plugin need compatibility with your current theme to work smoothly.</br></br>Following are two methods that enable theme support for the plugin.</br></br>Method 1 is selected by default and that works fine almost will all themes. In case, you face any issue with the header or footer template, try choosing Method 2.', 'header-footer-elementor' );
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
				_e( 'Sometimes above methods might not work well with your theme, in this case, contact your theme author and request them to add support for the <a href="https://github.com/Nikschavan/header-footer-elementor/wiki/Adding-Header-Footer-Elementor-support-for-your-theme">plugin.</>', 'header-footer-elementor' ),
				'<br>'
			);
			?>
		</p>

		<?php
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

		add_submenu_page(
			'themes.php',
			__( 'Step-By-Step Guide', 'header-footer-elementor' ),
			__( 'Step-By-Step Guide', 'header-footer-elementor' ),
			'manage_options',
			'hfe-guide',
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
	 * Setup Theme Support.
	 *
	 * @since 1.2.0
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
	 * Settings page.
	 *
	 * Call back function for add submenu page function.
	 *
	 * @since x.x.x
	 */
	public function hfe_settings_page() {
		echo '<h1 class="hfe-heading-inline">';
		esc_attr_e( 'Elementor Header & Footer Builder ', 'header-footer-elementor' );
		echo '</h1>';
		$this->hfe_tabs();
		?>
		<br />
		<?php
		$hfe_radio_button = get_option( 'hfe_compatibility_option', '1' );
		?>
		<?php
		switch ( $_GET['page'] ) {
			case 'hfe-settings':
				$this->get_themes_support();
				break;

			case 'hfe-guide':
				$this->get_guide_html( 'page' );
				break;

			case 'hfe-about':
				$this->get_about_html();
				break;

			case 'default':
				break;
		}
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
			if ( ! isset( self::$hfe_settings_tabs ) ) {
				self::$hfe_settings_tabs = apply_filters(
					'hfe_settings_tabs',
					[
						'hfe_templates' => [
							'name' => __( 'All Templates', 'header-footer-elementor' ),
							'url'  => admin_url( 'edit.php?post_type=elementor-hf' ),
						],
					]
				);
			}

			self::$hfe_settings_tabs['hfe_guide'] = [
				'name' => __( 'Step-By-Step Guide', 'header-footer-elementor' ),
				'url'  => admin_url( 'themes.php?page=hfe-guide' ),
			];

			self::$hfe_settings_tabs['hfe_about'] = [
				'name' => __( 'About Us', 'header-footer-elementor' ),
				'url'  => admin_url( 'themes.php?page=hfe-about' ),
			];

			$tabs = self::$hfe_settings_tabs;

			foreach ( $tabs as $tab_id => $tab ) {

				$tab_slug = str_replace( '_', '-', $tab_id );

				$active_tab = ( ( isset( $_GET['page'] ) && $tab_slug == $_GET['page'] ) || ( ! isset( $_GET['page'] ) && 'hfe_templates' == $tab_id ) ) ? $tab_id : '';

				$active = ( $active_tab == $tab_id ) ? ' nav-tab-active' : '';

				echo '<a href="' . esc_url( $tab['url'] ) . '" class="nav-tab' . esc_attr( $active ) . '">';
				echo esc_html( $tab['name'] );
				echo '</a>';
			}

			?>
		</h2>
		<br />
		<?php
	}

	/**
	 * Admin footer text.
	 *
	 * Modifies the "Thank you" text displayed in the admin footer.
	 *
	 * Fired by `admin_footer_text` filter.
	 *
	 * @since x.x.x
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
				__( 'Please rate our plugin %1$s on %2$s to help us spread the word. Thank you from Brainstorm Force team!', 'header-footer-elementor' ),
				'<span class="hfe-star-icons">&#9733;&#9733;&#9733;&#9733;&#9733;</span>',
				'<a href="https://wordpress.org/support/theme/astra/reviews/#new-post" target="_blank">WordPress.org</a>'
			);
		}

		return $footer_text;
	}

	/**
	 * Function for theme support tab
	 *
	 * @since x.x.x
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
	 * Call back function for the ssettings api function add_settings_section
	 *
	 * This function can be used to add description of the settings sections
	 *
	 * @since x.x.x
	 * @return void
	 */
	public function hfe_guide_callback() {
		?>
		<div class="hfe-guide-content-header hfe-admin-columns">
			<h3><?php esc_html_e( 'Get Inspiring & Creative Header & Footer Design Examples ( With 11 Research-Based Tips ).', 'header-footer-elementor' ); ?></h3>
		</div>
		<?php
	}

	/**
	 * Call back function for the ssettings api function add_settings_field
	 *
	 * This function will contain the markup for the input feilds that we can add.
	 *
	 * @since x.x.x
	 * @return void
	 */
	public function hfe_guide_option_callback() {
		$hfe_radio_button = get_option( 'hfe_guide_option', '1' );
		?>
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
		<div class="hfe-subscription-row">
			<div class="hfe-input-container">
				<input id="hfe_subscribe_name" class="hfe-subscribe-field hfe-subscribe-name" type="text" name="hfe_subscribe_name" value="<?php echo get_option( 'hfe_guide_fname' ); ?>">
				<small class="subscription-desc"><?php esc_html_e( 'First name is required', 'header-footer-elementor' ); ?></small>
				<label class="subscription-label"><?php esc_html_e( 'Your First Name', 'header-footer-elementor' ); ?></label>
			</div>
			<div class="hfe-input-container">
				<input id="hfe_subscribe_email" class="hfe-subscribe-field hfe-subscribe-email" type="text" name="hfe_subscribe_email" value="<?php echo get_option( 'hfe_guide_email' ); ?>">
				<small class="subscription-desc"><?php esc_html_e( 'Email address is required', 'header-footer-elementor' ); ?></small>
				<label class="subscription-label"><?php esc_html_e( 'Your Work Email', 'header-footer-elementor' ); ?></label>
			</div>
		</div>
		<div class="hfe-checkbox-container">
			<input type="checkbox" name="hfe_guide_option" class="hfe-guide-checkbox" value= 1 <?php checked( $hfe_radio_button, 1 ); ?> > <div class="hfe_checkbox_options"><?php esc_html_e( ' By entering your email, you agree to our privacy policy', 'header-footer-elementor' ); ?></div>
		</div>

		<?php
	}

	/**
	 * Function for Step-By-Step guide
	 *
	 * @since x.x.x
	 * @param string $type Page or Popup.
	 * @return void
	 */
	public function get_guide_html( $type ) {
		?>

		<div class="hfe-admin-about-section hfe-admin-columns hfe-admin-guide-section">

			<div class="hfe-admin-column-50">
				<div class="hfe-admin-about-section-column">

					<?php if ( 'page' === $type ) { ?>
						<h3>
							<?php esc_html_e( 'Learn the Art of Designing Custom Header & Footer with this Free Plugin ( Video Tutorial )', 'header-footer-elementor' ); ?>
						</h3>
						<figure>
							<img src="<?php echo HFE_URL; ?>assets/images/settings/our-team.jpg" alt="<?php esc_attr_e( 'Team photo', 'header-footer-elementor' ); ?>">
						</figure>
					<?php } elseif ( 'popup' === $type ) { ?>
						<h2><?php esc_html_e( 'Get Inspiring & Creative Header & Footer Design Examples.', 'header-footer-elementor' ); ?></h2>
						<p><?php esc_html_e( 'Create different header and footer designs for your site, and customize as per your need.', 'header-footer-elementor' ); ?></p>
					<?php } ?>
				</div>
			</div>

			<div class="hfe-admin-column-50 hfe-admin-column-last">
				<div class="hfe-guide-content">
					<form action="options.php" method="post">
						<?php settings_fields( 'hfe-plugin-guide' ); ?>
							<?php do_settings_sections( 'Step-By-Step Guide' ); ?>
						<?php submit_button( 'Download This Guide & Start Brainstorming' ); ?>
					</form>
				</div>
			</div>
		</div>
		<?php
	}

	/**
	 * Function for Step-By-Step guide modal popup
	 *
	 * @since x.x.x
	 * @return void
	 */
	public function get_guide_modal() {
		$new_page_url = admin_url( 'post-new.php?post_type=elementor-hf' );
		?>
		<div class="hfe-guide-modal-popup" data-new-page="<?php echo esc_attr( $new_page_url ); ?>">
			<div class="hfe-guide-modal-popup-wrapper">
				<div class="hfe-guide-modal-content">
					<div class="heading">
						<img src="<?php echo HFE_URL . 'assets/images/settings/plugin-uae.png'; ?>" class="hfe-logo">
						<h3><?php esc_html_e( 'Elementor Header & Footer Builder', 'header-footer-elementor' ); ?></h3>
						<span class="dashicons close dashicons-no-alt hfe-modal-close hfe-close-icon"></span>
					</div>
					<?php $this->get_guide_html( 'popup' ); ?>
				</div>
			</div>
			<div class="hfe-guide-modal-overlay"></div>
		</div>
		<?php
	}

	/**
	 * Function for About us HTML
	 *
	 * @since x.x.x
	 * @return void
	 */
	public function get_about_html() {
		$this->output_about_info();
		$this->output_about_addons();
	}

	/**
	 * Display the General Info section of About tab.
	 *
	 * @since x.x.x
	 */
	protected function output_about_info() {
		?>

		<div class="hfe-admin-about-section hfe-admin-columns">

			<div class="hfe-admin-column-60">
				<h3>
					<?php esc_html_e( 'Hello and Welcome to Elementor Header & Footer Builder, the most friendly plugin for Elementor. We build software that helps you create beautiful responsive header & footers for your website in minutes.', 'header-footer-elementor' ); ?>
				</h3>

				<p>
					<?php esc_html_e( 'Pellentesque in ipsum id orci porta dapibus. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Nulla quis lorem ut libero malesuada feugiat. Curabitur aliquet quam id dui posuere blandit.', 'header-footer-elementor' ); ?>
				</p>
				<p>
					<?php esc_html_e( 'Our goal is to make header & footer design easy in Elementor.', 'header-footer-elementor' ); ?>
				</p>
				<p>
					<?php
					printf(
						wp_kses(
						/* translators: %1$s - WPBeginner URL; %2$s - OptinMonster URL; %3$s - MonsterInsights URL; %4$s - RafflePress URL. */
							__( 'Elementor Header & Footer Builder is brought to you by the same team that’s behind the largest WordPress plugins, <a href="%1$s" target="_blank" rel="noopener noreferrer">Ultimate Addons for Gutenberg</a>, the most popular lead-generation software, <a href="%2$s" target="_blank" rel="noopener noreferrer">Ultimate Addons for Beaver Builder</a>, the best WordPress analytics plugin, <a href="%3$s" target="_blank" rel="noopener noreferrer">All in One Schem</a>, and the most powerful WordPress Theme, <a href="%4$s" target="_blank" rel="noopener noreferrer">Astra Theme</a>.', 'header-footer-elementor' ),
							[
								'a' => [
									'href'   => [],
									'rel'    => [],
									'target' => [],
								],
							]
						),
						'https://www.wpastra.com/',
						'https://www.wpastra.com/',
						'https://www.wpastra.com/',
						'https://www.wpastra.com/'
					);
					?>
				</p>
				<p>
					<?php esc_html_e( 'Yup, we know a thing or two about building awesome products that customers love.', 'header-footer-elementor' ); ?>
				</p>
			</div>

			<div class="hfe-admin-column-40 hfe-admin-column-last">
				<figure>
					<img src="<?php echo HFE_URL; ?>assets/images/settings/our-team.jpg" alt="<?php esc_attr_e( 'Team photo', 'header-footer-elementor' ); ?>">
					<figcaption>
						<?php esc_html_e( 'The Brainstorm Force Team', 'header-footer-elementor' ); ?><br>
					</figcaption>
				</figure>
			</div>

		</div>
		<?php
	}

	/**
	 * Display the Addons section of About tab.
	 *
	 * @since x.x.x
	 */
	protected function output_about_addons() {

		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}

		$all_plugins         = get_plugins();
		$bsf_plugins         = $this->get_bsf_plugins();
		$can_install_plugins = $this->hfe_can_install( 'plugin' );

		?>
		<div id="hfe-admin-addons">
			<div class="addons-container">
				<?php
				foreach ( $bsf_plugins as $plugin => $details ) :

					$plugin_data = $this->get_plugin_data( $plugin, $details, $all_plugins );

					?>
					<div class="addon-container">
						<div class="addon-item">
							<div class="details hfe-clear">
								<img src="<?php echo esc_url( $plugin_data['details']['icon'] ); ?>">
								<h5 class="addon-name"><?php echo esc_html( $plugin_data['details']['name'] ); ?></h5>
								<p class="addon-desc">
									<?php echo wp_kses_post( $plugin_data['details']['desc'] ); ?>
								</p>
							</div>
							<div class="actions hfe-clear">
								<div class="website-link">
									<?php
									printf(
									/* translators: %s - addon status label. */
										esc_html__( '%1$s Visit Website %2$s', 'header-footer-elementor' ),
										'<a href="' . esc_attr( $plugin_data['plugin_src'] ) . '">',
										'</a>'
									);
									?>
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
	 * Get AM plugin data to display in the Addons section of About tab.
	 *
	 * @since x.x.x
	 *
	 * @param string $plugin      Plugin slug.
	 * @param array  $details     Plugin details.
	 * @param array  $all_plugins List of all plugins.
	 *
	 * @return array
	 */
	protected function get_plugin_data( $plugin, $details, $all_plugins ) {

		$have_pro = ( ! empty( $details['pro'] ) && ! empty( $details['pro']['plug'] ) );
		$show_pro = false;

		$plugin_data = [];

		if ( $have_pro ) {
			if ( array_key_exists( $plugin, $all_plugins ) ) {
				if ( is_plugin_active( $plugin ) ) {
					$show_pro = true;
				}
			}
			if ( array_key_exists( $details['pro']['plug'], $all_plugins ) ) {
				$show_pro = true;
			}
			if ( $show_pro ) {
				$plugin  = $details['pro']['plug'];
				$details = $details['pro'];
			}
		}

		if ( array_key_exists( $plugin, $all_plugins ) ) {
			if ( is_plugin_active( $plugin ) ) {
				// Status text/status.
				$plugin_data['status_class'] = 'status-active';
				$plugin_data['status_text']  = esc_html__( 'Active', 'header-footer-elementor' );
				// Button text/status.
				$plugin_data['action_class'] = $plugin_data['status_class'] . ' button button-secondary disabled';
				$plugin_data['action_text']  = esc_html__( 'Activated', 'header-footer-elementor' );
				$plugin_data['plugin_src']   = esc_attr( $plugin );
			} else {
				// Status text/status.
				$plugin_data['status_class'] = 'status-inactive';
				$plugin_data['status_text']  = esc_html__( 'Inactive', 'header-footer-elementor' );
				// Button text/status.
				$plugin_data['action_class'] = $plugin_data['status_class'] . ' button button-secondary';
				$plugin_data['action_text']  = esc_html__( 'Activate', 'header-footer-elementor' );
				$plugin_data['plugin_src']   = esc_attr( $plugin );
			}
		} else {
			// Doesn't exist, install.
			// Status text/status.
			$plugin_data['status_class'] = 'status-download';
			if ( isset( $details['act'] ) && 'go-to-url' === $details['act'] ) {
				$plugin_data['status_class'] = 'status-go-to-url';
			}
			$plugin_data['status_text'] = esc_html__( 'Not Installed', 'header-footer-elementor' );
			// Button text/status.
			$plugin_data['action_class'] = $plugin_data['status_class'] . ' button button-primary';
			$plugin_data['action_text']  = esc_html__( 'Install Plugin', 'header-footer-elementor' );
			$plugin_data['plugin_src']   = esc_url( $details['url'] );
		}

		$plugin_data['details'] = $details;

		return $plugin_data;
	}

	/**
	 * List of AM plugins that we propose to install.
	 *
	 * @since x.x.x
	 *
	 * @return array
	 */
	protected function get_bsf_plugins() {

		$images_url = HFE_URL . 'assets/images/settings/';

		return [

			'astra'              => [
				'icon'  => $images_url . 'plugin-astra.png',
				'name'  => esc_html__( 'Astra Theme', 'header-footer-elementor' ),
				'desc'  => esc_html__( 'Astra is fast, fully customizable & beautiful WordPress theme suitable for blog, personal portfolio, business website and WooCommerce storefront.', 'header-footer-elementor' ),
				'wporg' => 'https://wordpress.org/themes/astra/',
				'url'   => 'https://wpastra.com/',
			],

			'starter-templates'  => [
				'icon'  => $images_url . 'plugin-st.png',
				'name'  => esc_html__( 'Starter Templates', 'header-footer-elementor' ),
				'desc'  => esc_html__( 'The Starter Templates plugin offers ready website templates. The Starter Templates plugin is currently powering 900,000k+ WordPress websites.', 'header-footer-elementor' ),
				'wporg' => 'https://wordpress.org/plugins/astra-sites/',
				'url'   => 'https://startertemplates.com/',
			],

			'ultimate-elementor' => [
				'icon'  => $images_url . 'plugin-uae.png',
				'name'  => esc_html__( 'Ultimate Elementor', 'header-footer-elementor' ),
				'desc'  => esc_html__( 'The Ultimate Addons for Elementor plugin offers unique, creative and optimized widgets that would enhance the page builder with more features.', 'header-footer-elementor' ),
				'wporg' => '',
				'url'   => 'https://ultimateelementor.com/',
			],
		];
	}

	/**
	 * Determine if the plugin/addon installations are allowed.
	 *
	 * @since x.x.x
	 *
	 * @param string $type Should be `plugin` or `addon`.
	 *
	 * @return bool
	 */
	public function hfe_can_install( $type ) {

		if ( ! in_array( $type, [ 'plugin', 'addon' ], true ) ) {
			return false;
		}

		if ( ! current_user_can( 'install_plugins' ) ) {
			return false;
		}

		// Determine whether file modifications are allowed.
		if ( ! wp_is_file_mod_allowed( 'hfe_can_install' ) ) {
			return false;
		}

		// All plugin checks are done.
		if ( 'plugin' === $type ) {
			return true;
		}

		return false;
	}

	/**
	 * Add settings link to the Plugins page.
	 *
	 * @since x.x.x
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

?>
