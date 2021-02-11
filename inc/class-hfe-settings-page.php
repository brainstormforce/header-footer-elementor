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
	}

	/**
	 * var for tabs
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
		add_settings_section( 'hfe-options', __( 'Add Theme Support', 'header-footer-elementor' ), [ $this, 'hfe_compatibility_callback' ], 'Settings' );
		add_settings_field( 'hfe-way', 'Methods to Add Theme Support', [ $this, 'hfe_compatibility_option_callback' ], 'Settings', 'hfe-options' );

		register_setting( 'hfe-plugin-guide', 'hfe_guide_option' );
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
		_e( 'The Elementor - Header, Footer & Blocks plugin need compatibility with your current theme to work smoothly.</br></br>Following are two methods that enable theme support for the plugin.</br></br>Method 1 is selected by default and that works fine almost will all themes. In case, you face any issue with the header or footer template, try choosing Method 2.', 'header-footer-elementor' );
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
		esc_attr_e( 'Elementor - Header, Footer & Blocks ', 'header-footer-elementor' );
		echo '</h1>';
		$this->hfe_tabs();
		?>
		<br />
		<?php
		$hfe_radio_button = get_option( 'hfe_compatibility_option', '1' );
		?>
		<?php
		switch( $_GET['page'] ){
			case 'hfe-settings' :
				$this->get_themes_support();
				break;
			
			case 'hfe-guide' :
				$this->get_guide_html();
				break;

			case 'hfe-about' :
				$this->get_about_html();
				break;

			case 'default' :
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
				self::$hfe_settings_tabs       = [
					'hfe_templates' => [
						'name' => __( 'All templates', 'header-footer-elementor' ),
						'url'  => admin_url( 'edit.php?post_type=elementor-hf' ),
					],
					'hfe_settings'  => [
						'name' => __( 'Theme Support', 'header-footer-elementor' ),
						'url'  => admin_url( 'themes.php?page=hfe-settings' ),
					],
					'hfe_guide'  => [
						'name' => __( 'Step-By-Step Guide', 'header-footer-elementor' ),
						'url'  => admin_url( 'themes.php?page=hfe-guide' ),
					],
					'hfe_about'  => [
						'name' => __( 'About Us', 'header-footer-elementor' ),
						'url'  => admin_url( 'themes.php?page=hfe-about' ),
					],
				];
			}

			$tabs = self::$hfe_settings_tabs;
			
			foreach ( $tabs as $tab_id => $tab ) {

				$tab_slug = str_replace( '_', '-', $tab_id );

				$active_tab = ( isset( $_GET['page'] ) && $tab_slug == $_GET['page'] ) ? $tab_id : 'hfe_templates';

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
	
	/**
	 * Admin footer text.
	 *
	 * Modifies the "Thank you" text displayed in the admin footer.
	 *
	 * Fired by `admin_footer_text` filter.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @param string $footer_text The content that will be printed.
	 *
	 * @return string The content that will be printed.
	 */
	public function admin_footer_text( $footer_text ) {
		$current_screen = get_current_screen();
		$is_elementor_screen = ( $current_screen && 'elementor-hf' === $current_screen->post_type );

		if ( $is_elementor_screen ) {
			$footer_text = sprintf(
				/* translators: 1: Elementor, 2: Link to plugin review */
				__( 'Please rate %1$s on %2$s %3$s to help us spread the word. We really appreciate your support!', 'header-footer-elementor' ),
				'<strong>' . __( 'Elementor - Header, Footer & Blocks', 'header-footer-elementor' ) . '</strong>', '&#9733;&#9733;&#9733;&#9733;&#9733;',
				'<a href="https://wordpress.org/support/theme/astra/reviews/#new-post" target="_blank">WordPress.org</a>'
			);
		}

		return $footer_text;
	}

	/**
	 * Function for theme suuport tab
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
		<h3>
			<?php esc_html_e( 'Get Inspiring & Creative Header & Footer Design Examples ( With 11 Research-Based Tips ).', 'header-footer-elementor' ); ?>
		</h3>
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
		<label>
			<input type="checkbox" name="hfe_guide_option" value= 1 <?php checked( $hfe_radio_button, 1 ); ?> > <div class="hfe_checkbox_options"><?php esc_html_e( ' By entering your email, you agree to our privacy policy', 'header-footer-elementor' ); ?></div>
			<br>
		</label>
		
		<p>
			<?php esc_html_e( 'Yup, we know a thing or two about building awesome products that customers love.', 'header-footer-elementor' ); ?>
		</p>

		<?php
	}

	/**
	 * Function for Step-By-Step guide
	 *
	 * @since x.x.x
	 * @return void
	 */
	public function get_guide_html() {
		?>

		<div class="hfe-admin-about-section hfe-admin-columns hfe-admin-guide-section">

			<div class="hfe-admin-column-50">
				<h4>
					<?php esc_html_e( 'Learn the Art of Designing Custom Header & Footer with this Free Plugin ( Video Tutorial )', 'header-footer-elementor' ); ?>
				</h4>
				<figure>
					<img src="<?php echo WPFORMS_PLUGIN_URL; ?>assets/images/about/team.jpg" alt="<?php esc_attr_e( 'Team photo', 'header-footer-elementor' ); ?>">
				</figure>
			</div>

			<div class="hfe-admin-column-50 hfe-admin-column-last">
				<div class="hfe-guide-content">
					<?php settings_fields( 'hfe-plugin-guide' ); ?>
						<?php do_settings_sections( 'Step-By-Step Guide' ); ?>
					<?php submit_button( 'Download This Guide & Start Brainstorming' ); ?>
				</div>
			</div>
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
					<?php esc_html_e( 'Hello and Welcome to Elementor - Header, Footer & Blocks, the most friendly Header & Footer builder plugin for Elementor. We build software that helps you create beautiful responsive header & footers for your website in minutes.', 'header-footer-elementor' ); ?>
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
							__( 'Elementor - Header, Footer & Blocks is brought to you by the same team that’s behind the largest WordPress plugins, <a href="%1$s" target="_blank" rel="noopener noreferrer">Ultimate Addons for Gutenberg</a>, the most popular lead-generation software, <a href="%2$s" target="_blank" rel="noopener noreferrer">Ultimate Addons for Beaver Builder</a>, the best WordPress analytics plugin, <a href="%3$s" target="_blank" rel="noopener noreferrer">All in One Schem</a>, and the most powerful WordPress Theme, <a href="%4$s" target="_blank" rel="noopener noreferrer">Astra Theme</a>.', 'header-footer-elementor' ),
							array(
								'a' => array(
									'href'   => array(),
									'rel'    => array(),
									'target' => array(),
								),
							)
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
					<img src="<?php echo WPFORMS_PLUGIN_URL; ?>assets/images/about/team.jpg" alt="<?php esc_attr_e( 'Team photo', 'header-footer-elementor' ); ?>">
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
								<h5 class="addon-name">
									<?php echo esc_html( $plugin_data['details']['name'] ); ?>
								</h5>
								<p class="addon-desc">
									<?php echo wp_kses_post( $plugin_data['details']['desc'] ); ?>
								</p>
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
									<?php if ( $can_install_plugins ) { ?>
										<button class="<?php echo esc_attr( $plugin_data['action_class'] ); ?>" data-plugin="<?php echo esc_attr( $plugin_data['plugin_src'] ); ?>" data-type="plugin">
											<?php echo wp_kses_post( $plugin_data['action_text'] ); ?>
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

		$plugin_data = array();

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

		// $images_url = hfe_PLUGIN_URL . 'assets/images/about/';
		$images_url = '';

		return array(

			'ultimate-addons-for-gutenberg/ultimate-addons-for-gutenberg.php' => array(
				'icon'  => $images_url . 'plugin-mi.png',
				'name'  => esc_html__( 'Ultimate Addons for Gutenberg', 'header-footer-elementor' ),
				'desc'  => esc_html__( 'Sed porttitor lectus nibh. Cras ultricies ligula sed magna dictum porta. Vivamus magna justo, lacinia eget.', 'header-footer-elementor' ),
				'wporg' => 'https://wordpress.org/plugins/header-footer-for-gutenberg/',
				'url'   => 'https://downloads.wordpress.org/plugin/header-footer-for-gutenberg.zip',
			),

			'wp-mail-smtp/wp_mail_smtp.php' => array(
				'icon'  => $images_url . 'plugin-smtp.png',
				'name'  => esc_html__( 'WP Mail SMTP', 'header-footer-elementor' ),
				'desc'  => esc_html__( 'Make sure your website\'s emails reach the inbox. Our goal is to make email deliverability easy and reliable. Trusted by over 2 million websites.', 'header-footer-elementor' ),
				'wporg' => 'https://wordpress.org/plugins/wp-mail-smtp/',
				'url'   => 'https://downloads.wordpress.org/plugin/wp-mail-smtp.zip',
				'pro'   => array(
					'plug' => 'wp-mail-smtp-pro/wp_mail_smtp.php',
					'icon' => $images_url . 'plugin-smtp.png',
					'name' => esc_html__( 'WP Mail SMTP Pro', 'header-footer-elementor' ),
					'desc' => esc_html__( 'Make sure your website\'s emails reach the inbox. Our goal is to make email deliverability easy and reliable. Trusted by over 2 million websites.', 'header-footer-elementor' ),
					'url'  => 'https://wpmailsmtp.com/pricing/',
					'act'  => 'go-to-url',
				),
			),
		);
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

}

new HFE_Settings_Page();
