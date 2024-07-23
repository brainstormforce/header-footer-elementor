<?php
/**
 * Entry point for the plugin. Checks if Elementor is installed and activated and loads it's own files and actions.
 *
 * @package  header-footer-elementor
 */

use HFE\Lib\Astra_Target_Rules_Fields;

defined( 'ABSPATH' ) || exit;

/**
 * HFE_Admin setup
 *
 * @since 1.0
 */
class HFE_Admin {

	/**
	 * Instance of HFE_Admin
	 *
	 * @var HFE_Admin
	 */
	private static $_instance = null;

	/**
	 * Instance of HFE_Admin
	 *
	 * @return HFE_Admin Instance of HFE_Admin
	 */
	public static function instance() {
		if ( ! isset( self::$_instance ) ) {
			self::$_instance = new self();
		}

		add_action( 'elementor/init', __CLASS__ . '::load_admin', 0 );

		return self::$_instance;
	}

	/**
	 * Load the icons style in editor.
	 *
	 * @since 1.3.0
	 * @access public
	 * @return void
	 */
	public static function load_admin() {
		add_action( 'elementor/editor/after_enqueue_styles', __CLASS__ . '::hfe_admin_enqueue_scripts' );
	}

	/**
	 * Enqueue admin scripts
	 *
	 * @since 1.3.0
	 * @param string $hook Current page hook.
	 * @access public
	 * @return void
	 */
	public static function hfe_admin_enqueue_scripts( $hook ) {

		// Register the icons styles.
		wp_register_style(
			'hfe-style',
			HFE_URL . 'assets/css/style.css',
			[],
			HFE_VER
		);

		wp_enqueue_style( 'hfe-style' );
	}

	/**
	 * Constructor
	 *
	 * @return void
	 */
	private function __construct() {
		add_action( 'init', [ $this, 'header_footer_posttype' ] );
		if ( is_admin() && current_user_can( 'manage_options' ) ) {
			add_action( 'admin_menu', [ $this, 'register_admin_menu' ], 50 );
		}
		add_action( 'add_meta_boxes', [ $this, 'ehf_register_metabox' ] );
		add_action( 'save_post', [ $this, 'ehf_save_meta' ] );
		add_action( 'admin_notices', [ $this, 'location_notice' ] );
		add_action( 'template_redirect', [ $this, 'block_template_frontend' ] );
		add_filter( 'single_template', [ $this, 'load_canvas_template' ] );
		add_filter( 'manage_elementor-hf_posts_columns', [ $this, 'set_shortcode_columns' ] );
		add_action( 'manage_elementor-hf_posts_custom_column', [ $this, 'render_shortcode_column' ], 10, 2 );
		if ( defined( 'ELEMENTOR_PRO_VERSION' ) && ELEMENTOR_PRO_VERSION > 2.8 ) {
			add_action( 'elementor/editor/footer', [ $this, 'register_hfe_epro_script' ], 99 );
		}

		if ( is_admin() ) {
			add_action( 'manage_elementor-hf_posts_custom_column', [ $this, 'column_content' ], 10, 2 );
			add_filter( 'manage_elementor-hf_posts_columns', [ $this, 'column_headings' ] );
			require_once HFE_DIR . 'admin/class-hfe-addons-actions.php';
		}
	}
	/**
	 * Script for Elementor Pro full site editing support.
	 *
	 * @since 1.4.0
	 *
	 * @return void
	 */
	public function register_hfe_epro_script() {
		$ids_array = [
			[
				'id'    => get_hfe_header_id(),
				'value' => 'Header',
			],
			[
				'id'    => get_hfe_footer_id(),
				'value' => 'Footer',
			],
			[
				'id'    => hfe_get_before_footer_id(),
				'value' => 'Before Footer',
			],
		];

		wp_enqueue_script( 'hfe-elementor-pro-compatibility', HFE_URL . 'inc/js/hfe-elementor-pro-compatibility.js', [ 'jquery' ], HFE_VER, true );

		wp_localize_script(
			'hfe-elementor-pro-compatibility',
			'hfe_admin',
			[
				'ids_array' => wp_json_encode( $ids_array ),
			]
		);
	}

	/**
	 * Adds or removes list table column headings.
	 *
	 * @param array $columns Array of columns.
	 * @return array
	 */
	public function column_headings( $columns ) {
		unset( $columns['date'] );

		$columns['elementor_hf_display_rules'] = __( 'Display Rules', 'header-footer-elementor' );
		$columns['date']                       = __( 'Date', 'header-footer-elementor' );

		return $columns;
	}

	/**
	 * Adds the custom list table column content.
	 *
	 * @since 1.2.0
	 * @param array $column Name of column.
	 * @param int   $post_id Post id.
	 * @return void
	 */
	public function column_content( $column, $post_id ) {

		if ( 'elementor_hf_display_rules' === $column ) {

			$locations = get_post_meta( $post_id, 'ehf_target_include_locations', true );
			if ( ! empty( $locations ) ) {
				echo '<div class="ast-advanced-headers-location-wrap" style="margin-bottom: 5px;">';
				echo '<strong>Display: </strong>';
				$this->column_display_location_rules( $locations );
				echo '</div>';
			}

			$locations = get_post_meta( $post_id, 'ehf_target_exclude_locations', true );
			if ( ! empty( $locations ) ) {
				echo '<div class="ast-advanced-headers-exclusion-wrap" style="margin-bottom: 5px;">';
				echo '<strong>Exclusion: </strong>';
				$this->column_display_location_rules( $locations );
				echo '</div>';
			}

			$users = get_post_meta( $post_id, 'ehf_target_user_roles', true );
			if ( isset( $users ) && is_array( $users ) ) {
				if ( isset( $users[0] ) && ! empty( $users[0] ) ) {
					$user_label = [];
					foreach ( $users as $user ) {
						$user_label[] = Astra_Target_Rules_Fields::get_user_by_key( $user );
					}
					echo '<div class="ast-advanced-headers-users-wrap">';
					echo '<strong>Users: </strong>';
					echo esc_html( join( ', ', $user_label ) );
					echo '</div>';
				}
			}
		}
	}

	/**
	 * Get Markup of Location rules for Display rule column.
	 *
	 * @param array $locations Array of locations.
	 * @return void
	 */
	public function column_display_location_rules( $locations ) {

		$location_label = [];
		if ( is_array( $locations ) && is_array( $locations['rule'] ) && isset( $locations['rule'] ) ) {
			$index = array_search( 'specifics', $locations['rule'] );
			if ( false !== $index && ! empty( $index ) ) {
				unset( $locations['rule'][ $index ] );
			}
		}

		if ( isset( $locations['rule'] ) && is_array( $locations['rule'] ) ) {
			foreach ( $locations['rule'] as $location ) {
				$location_label[] = Astra_Target_Rules_Fields::get_location_by_key( $location );
			}
		}
		if ( isset( $locations['specific'] ) && is_array( $locations['specific'] ) ) {
			foreach ( $locations['specific'] as $location ) {
				$location_label[] = Astra_Target_Rules_Fields::get_location_by_key( $location );
			}
		}

		echo esc_html( join( ', ', $location_label ) );
	}


	/**
	 * Register Post type for Elementor Header & Footer Builder templates
	 *
	 * @return void
	 */
	public function header_footer_posttype() {
		if ( ! current_user_can( 'manage_options' ) ) {
			return;
		}
		$labels = [
			'name'               => esc_html__( 'Elementor Header & Footer Builder', 'header-footer-elementor' ),
			'singular_name'      => esc_html__( 'Elementor Header & Footer Builder', 'header-footer-elementor' ),
			'menu_name'          => esc_html__( 'Elementor Header & Footer Builder', 'header-footer-elementor' ),
			'name_admin_bar'     => esc_html__( 'Elementor Header & Footer Builder', 'header-footer-elementor' ),
			'add_new'            => esc_html__( 'Add New', 'header-footer-elementor' ),
			'add_new_item'       => esc_html__( 'Add New Header or Footer', 'header-footer-elementor' ),
			'new_item'           => esc_html__( 'New Template', 'header-footer-elementor' ),
			'edit_item'          => esc_html__( 'Edit Template', 'header-footer-elementor' ),
			'view_item'          => esc_html__( 'View Template', 'header-footer-elementor' ),
			'all_items'          => esc_html__( 'All Templates', 'header-footer-elementor' ),
			'search_items'       => esc_html__( 'Search Templates', 'header-footer-elementor' ),
			'parent_item_colon'  => esc_html__( 'Parent Templates:', 'header-footer-elementor' ),
			'not_found'          => esc_html__( 'No Templates found.', 'header-footer-elementor' ),
			'not_found_in_trash' => esc_html__( 'No Templates found in Trash.', 'header-footer-elementor' ),
		];

		$args = [
			'labels'              => $labels,
			'public'              => true,
			'show_ui'             => true,
			'show_in_menu'        => false,
			'show_in_nav_menus'   => false,
			'exclude_from_search' => true,
			'capability_type'     => 'post',
			'hierarchical'        => false,
			'menu_icon'           => 'dashicons-editor-kitchensink',
			'supports'            => [ 'title', 'thumbnail', 'elementor' ],
		];

		register_post_type( 'elementor-hf', $args );
	}

	/**
	 * Register the admin menu for Elementor Header & Footer Builder.
	 *
	 * @since  1.0.0
	 * @since  1.0.1
	 *         Moved the menu under Appearance -> Elementor Header & Footer Builder
	 * @return void
	 */
	public function register_admin_menu() {
		add_submenu_page(
			'themes.php',
			__( 'Elementor Header & Footer Builder', 'header-footer-elementor' ),
			__( 'Elementor Header & Footer Builder', 'header-footer-elementor' ),
			'edit_pages',
			'edit.php?post_type=elementor-hf'
		);
	}

	/**
	 * Register meta box(es).
	 *
	 * @return void
	 */
	public function ehf_register_metabox() {
		add_meta_box(
			'ehf-meta-box',
			__( 'Elementor Header & Footer Builder Options', 'header-footer-elementor' ),
			[
				$this,
				'efh_metabox_render',
			],
			'elementor-hf',
			'normal',
			'high'
		);
	}

	/**
	 * Render Meta field.
	 *
	 * @param array $post Currennt post object which is being displayed.
	 * @return void
	 */
	public function efh_metabox_render( $post ) {
		$values            = get_post_custom( $post->ID );
		$template_type     = isset( $values['ehf_template_type'] ) ? esc_attr( sanitize_text_field( $values['ehf_template_type'][0] ) ) : '';
		$display_on_canvas = isset( $values['display-on-canvas-template'] ) ? true : false;

		// We'll use this nonce field later on when saving.
		wp_nonce_field( 'ehf_meta_nounce', 'ehf_meta_nounce' );
		?>
		<table class="hfe-options-table widefat">
			<tbody>
				<tr class="hfe-options-row type-of-template">
					<td class="hfe-options-row-heading">
						<label for="ehf_template_type"><?php esc_html_e( 'Type of Template', 'header-footer-elementor' ); ?></label>
					</td>
					<td class="hfe-options-row-content">
						<select name="ehf_template_type" id="ehf_template_type">
							<option value="" <?php selected( $template_type, '' ); ?>><?php esc_html_e( 'Select Option', 'header-footer-elementor' ); ?></option>
							<option value="type_header" <?php selected( $template_type, 'type_header' ); ?>><?php esc_html_e( 'Header', 'header-footer-elementor' ); ?></option>
							<option value="type_before_footer" <?php selected( $template_type, 'type_before_footer' ); ?>><?php esc_html_e( 'Before Footer', 'header-footer-elementor' ); ?></option>
							<option value="type_footer" <?php selected( $template_type, 'type_footer' ); ?>><?php esc_html_e( 'Footer', 'header-footer-elementor' ); ?></option>
							<option value="custom" <?php selected( $template_type, 'custom' ); ?>><?php esc_html_e( 'Custom Block', 'header-footer-elementor' ); ?></option>
						</select>
					</td>
				</tr>

				<?php $this->display_rules_tab(); ?>
				<tr class="hfe-options-row hfe-shortcode">
					<td class="hfe-options-row-heading">
						<label for="ehf_template_type"><?php esc_html_e( 'Shortcode', 'header-footer-elementor' ); ?></label>
						<i class="hfe-options-row-heading-help dashicons dashicons-editor-help" title="<?php esc_attr_e( 'Copy this shortcode and paste it into your post, page, or text widget content.', 'header-footer-elementor' ); ?>">
						</i>
					</td>
					<td class="hfe-options-row-content">
						<span class="hfe-shortcode-col-wrap">
							<input type="text" onfocus="this.select();" readonly="readonly" value="[hfe_template id='<?php echo esc_attr( $post->ID ); ?>']" class="hfe-large-text code">
						</span>
					</td>
				</tr>
				<tr class="hfe-options-row enable-for-canvas">
					<td class="hfe-options-row-heading">
						<label for="display-on-canvas-template">
							<?php esc_html_e( 'Enable Layout for Elementor Canvas Template?', 'header-footer-elementor' ); ?>
						</label>
						<i class="hfe-options-row-heading-help dashicons dashicons-editor-help" title="<?php esc_attr_e( 'Enabling this option will display this layout on pages using Elementor Canvas Template.', 'header-footer-elementor' ); ?>"></i>
					</td>
					<td class="hfe-options-row-content">
						<input type="checkbox" id="display-on-canvas-template" name="display-on-canvas-template" value="1" <?php checked( $display_on_canvas, true ); ?> />
					</td>
				</tr>
			</tbody>
		</table>
		<?php
	}

	/**
	 * Markup for Display Rules Tabs.
	 *
	 * @since  1.0.0
	 * @return void
	 */
	public function display_rules_tab() {
		// Load Target Rule assets.
		Astra_Target_Rules_Fields::get_instance()->admin_styles();

		$include_locations = get_post_meta( get_the_id(), 'ehf_target_include_locations', true );
		$exclude_locations = get_post_meta( get_the_id(), 'ehf_target_exclude_locations', true );
		$users             = get_post_meta( get_the_id(), 'ehf_target_user_roles', true );
		?>
		<tr class="bsf-target-rules-row hfe-options-row">
			<td class="bsf-target-rules-row-heading hfe-options-row-heading">
				<label><?php esc_html_e( 'Display On', 'header-footer-elementor' ); ?></label>
				<i class="bsf-target-rules-heading-help dashicons dashicons-editor-help"
					title="<?php echo esc_attr__( 'Add locations for where this template should appear.', 'header-footer-elementor' ); ?>"></i>
			</td>
			<td class="bsf-target-rules-row-content hfe-options-row-content">
				<?php
				Astra_Target_Rules_Fields::target_rule_settings_field(
					'bsf-target-rules-location',
					[
						'title'          => __( 'Display Rules', 'header-footer-elementor' ),
						'value'          => '[{"type":"basic-global","specific":null}]',
						'tags'           => 'site,enable,target,pages',
						'rule_type'      => 'display',
						'add_rule_label' => __( 'Add Display Rule', 'header-footer-elementor' ),
					],
					$include_locations
				);
				?>
			</td>
		</tr>
		<tr class="bsf-target-rules-row hfe-options-row">
			<td class="bsf-target-rules-row-heading hfe-options-row-heading">
				<label><?php esc_html_e( 'Do Not Display On', 'header-footer-elementor' ); ?></label>
				<i class="bsf-target-rules-heading-help dashicons dashicons-editor-help"
					title="<?php echo esc_attr__( 'Add locations for where this template should not appear.', 'header-footer-elementor' ); ?>"></i>
			</td>
			<td class="bsf-target-rules-row-content hfe-options-row-content">
				<?php
				Astra_Target_Rules_Fields::target_rule_settings_field(
					'bsf-target-rules-exclusion',
					[
						'title'          => __( 'Exclude On', 'header-footer-elementor' ),
						'value'          => '[]',
						'tags'           => 'site,enable,target,pages',
						'add_rule_label' => __( 'Add Exclusion Rule', 'header-footer-elementor' ),
						'rule_type'      => 'exclude',
					],
					$exclude_locations
				);
				?>
			</td>
		</tr>
		<tr class="bsf-target-rules-row hfe-options-row">
			<td class="bsf-target-rules-row-heading hfe-options-row-heading">
				<label><?php esc_html_e( 'User Roles', 'header-footer-elementor' ); ?></label>
				<i class="bsf-target-rules-heading-help dashicons dashicons-editor-help" title="<?php echo esc_attr__( 'Display custom template based on user role.', 'header-footer-elementor' ); ?>"></i>
			</td>
			<td class="bsf-target-rules-row-content hfe-options-row-content">
				<?php
				Astra_Target_Rules_Fields::target_user_role_settings_field(
					'bsf-target-rules-users',
					[
						'title'          => __( 'Users', 'header-footer-elementor' ),
						'value'          => '[]',
						'tags'           => 'site,enable,target,pages',
						'add_rule_label' => __( 'Add User Rule', 'header-footer-elementor' ),
					],
					$users
				);
				?>
			</td>
		</tr>
		<?php
	}

	/**
	 * Save meta field.
	 *
	 * @param  POST $post_id Currennt post object which is being displayed.
	 *
	 * @return Void
	 */
	public function ehf_save_meta( $post_id ) {

		// Bail if we're doing an auto save.
		if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
			return;
		}

		// if our nonce isn't there, or we can't verify it, bail.
		if ( ! isset( $_POST['ehf_meta_nounce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['ehf_meta_nounce'] ) ), 'ehf_meta_nounce' ) ) {
			return;
		}

		// if our current user can't edit this post, bail.
		if ( ! current_user_can( 'edit_posts' ) ) {
			return;
		}

		$target_locations = Astra_Target_Rules_Fields::get_format_rule_value( $_POST, 'bsf-target-rules-location' );
		$target_exclusion = Astra_Target_Rules_Fields::get_format_rule_value( $_POST, 'bsf-target-rules-exclusion' );
		$target_users     = [];

		if ( isset( $_POST['bsf-target-rules-users'] ) ) {
			$target_users = array_map( 'sanitize_text_field', wp_unslash( $_POST['bsf-target-rules-users'] ) );
		}

		update_post_meta( $post_id, 'ehf_target_include_locations', $target_locations );
		update_post_meta( $post_id, 'ehf_target_exclude_locations', $target_exclusion );
		update_post_meta( $post_id, 'ehf_target_user_roles', $target_users );

		if ( isset( $_POST['ehf_template_type'] ) ) {
			update_post_meta( $post_id, 'ehf_template_type', sanitize_text_field( wp_unslash( $_POST['ehf_template_type'] ) ) );
		}

		if ( isset( $_POST['display-on-canvas-template'] ) ) {
			update_post_meta( $post_id, 'display-on-canvas-template', sanitize_text_field( wp_unslash( $_POST['display-on-canvas-template'] ) ) );
		} else {
			delete_post_meta( $post_id, 'display-on-canvas-template' );
		}
	}

	/**
	 * Display notice when editing the header or footer when there is one more of similar layout is active on the site.
	 *
	 * @since 1.0.0
	 * @return void
	 */
	public function location_notice() {
		global $pagenow;
		global $post;

		if ( 'post.php' != $pagenow || ! is_object( $post ) || 'elementor-hf' != $post->post_type ) {
			return;
		}

		$template_type = get_post_meta( $post->ID, 'ehf_template_type', true );

		if ( '' !== $template_type ) {
			$templates = Header_Footer_Elementor::get_template_id( $template_type );

			// Check if more than one template is selected for current template type.
			if ( is_array( $templates ) && isset( $templates[1] ) && $post->ID != $templates[0] ) {
				$post_title        = '<strong>' . esc_html( get_the_title( $templates[0] ) ) . '</strong>';
				$template_location = '<strong>' . esc_html( $this->template_location( $template_type ) ) . '</strong>';
				/* Translators: Post title, Template Location */
				$message = sprintf( __( 'Template %1$s is already assigned to the location %2$s', 'header-footer-elementor' ), $post_title, $template_location );

				echo '<div class="error"><p>';
				echo esc_html( $message );
				echo '</p></div>';
			}
		}
	}

	/**
	 * Convert the Template name to be added in the notice.
	 *
	 * @since  1.0.0
	 *
	 * @param  string $template_type Template type name.
	 *
	 * @return string $template_type Template type name.
	 */
	public function template_location( $template_type ) {
		$template_type = ucfirst( str_replace( 'type_', '', $template_type ) );

		return $template_type;
	}

	/**
	 * Don't display the elementor Elementor Header & Footer Builder templates on the frontend for non edit_posts capable users.
	 *
	 * @since  1.0.0
	 * @return void
	 */
	public function block_template_frontend() {
		if ( is_singular( 'elementor-hf' ) && ! current_user_can( 'edit_posts' ) ) {
			wp_redirect( site_url(), 301 );
			die;
		}
	}

	/**
	 * Single template function which will choose our template
	 *
	 * @since  1.0.1
	 *
	 * @param  string $single_template Single template.
	 * @return string
	 */
	public function load_canvas_template( $single_template ) {
		global $post;

		if ( 'elementor-hf' == $post->post_type ) {
			$elementor_2_0_canvas = ELEMENTOR_PATH . '/modules/page-templates/templates/canvas.php';

			if ( file_exists( $elementor_2_0_canvas ) ) {
				return $elementor_2_0_canvas;
			} else {
				return ELEMENTOR_PATH . '/includes/page-templates/canvas.php';
			}
		}

		return $single_template;
	}

	/**
	 * Set shortcode column for template list.
	 *
	 * @param array $columns template list columns.
	 * @return array
	 */
	public function set_shortcode_columns( $columns ) {
		$date_column = $columns['date'];

		unset( $columns['date'] );

		$columns['shortcode'] = __( 'Shortcode', 'header-footer-elementor' );
		$columns['date']      = $date_column;

		return $columns;
	}

	/**
	 * Display shortcode in template list column.
	 *
	 * @param array $column template list column.
	 * @param int   $post_id post id.
	 * @return void
	 */
	public function render_shortcode_column( $column, $post_id ) {
		switch ( $column ) {
			case 'shortcode':
				ob_start();
				?>
				<span class="hfe-shortcode-col-wrap">
					<input type="text" onfocus="this.select();" readonly="readonly" value="[hfe_template id='<?php echo esc_attr( $post_id ); ?>']" class="hfe-large-text code">
				</span>

				<?php

				ob_get_contents();
				break;
		}
	}
}

HFE_Admin::instance();
