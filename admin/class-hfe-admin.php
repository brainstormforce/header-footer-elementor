<?php
/**
 * Entry point for the plugin. Checks if Elementor is installed and activated and loads it's own files and actions.
 *
 * @package  header-footer-elementor
 */

defined( 'ABSPATH' ) or exit;

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

		return self::$_instance;
	}

	/**
	 * Constructor
	 */
	private function __construct() {
		add_action( 'init', array( $this, 'header_footer_posttype' ) );
		add_action( 'init', array( $this, 'register_term_meta_options' ) );
		add_action( 'admin_menu', array( $this, 'register_admin_menu' ), 50 );
		add_action( 'add_meta_boxes', array( $this, 'ehf_register_metabox' ) );
		add_action( 'save_post', array( $this, 'ehf_save_meta' ) );
		add_action( 'save_post', array( $this, 'ehf_header_footer_template_save_meta' ) );
		add_action( 'admin_notices', array( $this, 'location_notice' ) );
		add_action( 'template_redirect', array( $this, 'block_template_frontend' ) );
		add_filter( 'single_template', array( $this, 'load_canvas_template' ) );
		add_filter( 'manage_elementor-hf_posts_columns', array( $this, 'set_shortcode_columns' ) );
		add_action( 'manage_elementor-hf_posts_custom_column', array( $this, 'render_shortcode_column' ), 10, 2 );
	}

	/**
	 * Register Post type for header footer templates
	 */
	public function header_footer_posttype() {

		$labels = array(
			'name'               => __( 'Header Footers Template', 'header-footer-elementor' ),
			'singular_name'      => __( 'Elementor Header Footer', 'header-footer-elementor' ),
			'menu_name'          => __( 'Header Footers Template', 'header-footer-elementor' ),
			'name_admin_bar'     => __( 'Elementor Header Footer', 'header-footer-elementor' ),
			'add_new'            => __( 'Add New', 'header-footer-elementor' ),
			'add_new_item'       => __( 'Add New Header Footer', 'header-footer-elementor' ),
			'new_item'           => __( 'New Header Footers Template', 'header-footer-elementor' ),
			'edit_item'          => __( 'Edit Header Footers Template', 'header-footer-elementor' ),
			'view_item'          => __( 'View Header Footers Template', 'header-footer-elementor' ),
			'all_items'          => __( 'All Elementor Header Footers', 'header-footer-elementor' ),
			'search_items'       => __( 'Search Header Footers Templates', 'header-footer-elementor' ),
			'parent_item_colon'  => __( 'Parent Header Footers Templates:', 'header-footer-elementor' ),
			'not_found'          => __( 'No Header Footers Templates found.', 'header-footer-elementor' ),
			'not_found_in_trash' => __( 'No Header Footers Templates found in Trash.', 'header-footer-elementor' ),
		);

		$args = array(
			'labels'              => $labels,
			'public'              => true,
			'rewrite'             => false,
			'show_ui'             => true,
			'show_in_menu'        => false,
			'show_in_nav_menus'   => false,
			'exclude_from_search' => true,
			'capability_type'     => 'post',
			'hierarchical'        => false,
			'menu_icon'           => 'dashicons-editor-kitchensink',
			'supports'            => array( 'title', 'thumbnail', 'elementor' ),
		);

		register_post_type( 'elementor-hf', $args );
	}

	/**
	 * Register taxanomy meta options.
	 *
	 * @since x.x.x
	 * @return void
	 */
	public function register_term_meta_options() {
		$taxonomies = get_taxonomies( array() );
		foreach ( $taxonomies as $slug => $taxanomy ) {
			add_action( "{$taxanomy}_edit_form_fields", array( $this, 'header_footer_selection_taxanomy_meta' ), 60, 2 );
			add_action( "edited_{$taxanomy}", array( $this, 'save_term_meta' ), 10, 2 );
		}
	}

	/**
	 * Register the admin menu for Header Footer builder.
	 *
	 * @since  1.0.0
	 * @since  1.0.1
	 *         Moved the menu under Appearance -> Header Footer Builder
	 */
	public function register_admin_menu() {
		add_submenu_page(
			'themes.php',
			__( 'Header Footer Builder', 'header-footer-elementor' ),
			__( 'Header Footer Builder', 'header-footer-elementor' ),
			'edit_pages',
			'edit.php?post_type=elementor-hf'
		);
	}

	/**
	 * Register meta box(es).
	 */
	function ehf_register_metabox() {
		add_meta_box(
			'ehf-meta-box',
			__( 'Elementor Header Footer options', 'header-footer-elementor' ),
			array(
				$this,
				'efh_metabox_render',
			),
			'elementor-hf',
			'normal',
			'high'
		);

		$post_types = get_post_types( array( 'public' => true ) );

		foreach ( $post_types as $type ) {
			if ( 'attachment' !== $type && 'elementor-hf' !== $type ) {
				// Header Footer template selection for post/page.
				add_meta_box(
					'ehf-meta-box-post',
					__( 'Elementor Header Footer options', 'header-footer-elementor' ),
					array(
						$this,
						'header_footer_selection_metabox',
					),
					$type,
					'side',
					'high'
				);
			}
		}
	}

	/**
	 * Markup for the header/footer template selection for taxanomy meta.
	 *
	 * @since x.x.x
	 * @param WP_Term $term  Current taxonomy term object.
	 * @param String  $taxonomy Current taxonomy slug.
	 */
	public function header_footer_selection_taxanomy_meta( $term, $taxonomy ) {
		$header_template = get_term_meta( $term->term_id, 'header-template', true );
		$footer_template = get_term_meta( $term->term_id, 'footer-template', true );
		?>

		<tr class="form-field">
			<th valign="top" scope="row">
				<label for="header-template"><?php esc_html_e( 'Header Template', 'header-footer-elementor' ); ?></label>
			</th>
			<td>
				<?php echo $this->get_hfe_template_select_field( 'header-template', $header_template ); ?>
			</td>
		</tr>

		<tr class="form-field">
			<th valign="top" scope="row">
				<label for="footer-template"><?php esc_html_e( 'Footer Template', 'header-footer-elementor' ); ?></label>
			</th>
			<td>
				<?php echo $this->get_hfe_template_select_field( 'footer-template', $footer_template ); ?>
			</td>
		</tr>

		<?php
	}


	/**
	 * Markup for the header/footer template selection.
	 *
	 * @since x.x.x
	 * @param WP_Post $post  $post Current post object which is being displayed.
	 */
	public function header_footer_selection_metabox( $post ) {
		$values          = get_post_custom( $post->ID );
		$header_template = isset( $values['header-template'] ) ? esc_attr( $values['header-template'][0] ) : '';
		$footer_template = isset( $values['footer-template'] ) ? esc_attr( $values['footer-template'][0] ) : '';

		// We'll use this nonce field later on when saving.
		wp_nonce_field( 'ehf_header_footer_selectin_meta_nounce', 'ehf_header_footer_selectin_meta_nounce' );

		echo '<div id="astra_settings_meta_box" class="meta-box-sortables">';
		echo '<p class="post-attributes-label-wrapper" >';
		echo '<strong>' . esc_html__( 'Header Template', 'header-footer-elementor' ) . '</strong>';
		echo '</p>';

		echo $this->get_hfe_template_select_field( 'header-template', $header_template );

		echo '</div>';

		echo '<div id="astra_settings_meta_box" class="meta-box-sortables">';
		echo '<p class="post-attributes-label-wrapper" >';
		echo '<strong>' . esc_html__( 'Footer Template', 'header-footer-elementor' ) . '</strong>';
		echo '</p>';

		echo $this->get_hfe_template_select_field( 'footer-template', $footer_template );

		echo '</div>';
	}

	/**
	 * Markup for select field fr selecting header foter templates.
	 *
	 * @param String $name input name.
	 * @param Select $selected_check Selected field for option.
	 * @return String HTML markup of the select field.
	 */
	private function get_hfe_template_select_field( $name, $selected_check ) {
		$markup  = '';
		$markup .= '<select name="' . $name . '">';
		$markup .= '<option value="" ' . selected( '', $selected_check, false ) . '>' . esc_html__( 'Default', 'header-footer-elementor' ) . '</option>';
		$markup .= '<option value="theme-default" ' . selected( 'theme-default', $selected_check, false ) . '>' . esc_html__( 'Theme Default', 'header-footer-elementor' ) . '</option>';

		foreach ( $this->get_hfe_posts() as $id => $post_name ) {
			$markup .= '<option value="' . esc_attr( $id ) . '" ' . selected( $id, $selected_check, false ) . ' >' . esc_html( $post_name ) . '</option>';
		}

		$markup .= '</select>';

		return $markup;
	}

	/**
	 * Get all posts in elementr-hf post type.
	 *
	 * @since x.x.x
	 * @return Array All elementr-hf posts.
	 */
	private function get_hfe_posts() {
		$all_posts = array();
		$atts      = array(
			'post_type'      => array(
				'elementor-hf',
			),
			'posts_per_page' => 200,
			'cache_results'  => true,
		);
		$query     = new WP_Query( $atts );
		if ( $query->have_posts() ) {
			while ( $query->have_posts() ) {
				$query->the_post();
				$title            = get_the_title();
				$id               = get_the_id();
				$all_posts[ $id ] = $title;
			}
		}

		return $all_posts;
	}

	/**
	 * Render Meta field.
	 *
	 * @param  POST $post Currennt post object which is being displayed.
	 */
	function efh_metabox_render( $post ) {
		$values            = get_post_custom( $post->ID );
		$template_type     = isset( $values['ehf_template_type'] ) ? esc_attr( $values['ehf_template_type'][0] ) : '';
		$display_on_canvas = isset( $values['display-on-canvas-template'] ) ? true : false;

		// We'll use this nonce field later on when saving.
		wp_nonce_field( 'ehf_meta_nounce', 'ehf_meta_nounce' );
		?>
		<table class="hfe-options-table widefat">
			<tbody>
				<tr class="hfe-options-row">
					<td class="hfe-options-row-heading">
						<label for="ehf_template_type"><?php _e( 'Type of Template', 'header-footer-elementor' ); ?></label>
					</td>
					<td class="hfe-options-row-content">
						<select name="ehf_template_type" id="ehf_template_type">
							<option value="" <?php selected( $template_type, '' ); ?>><?php _e( 'Select Option', 'header-footer-elementor' ); ?></option>
							<option value="type_header" <?php selected( $template_type, 'type_header' ); ?>><?php _e( 'Header', 'header-footer-elementor' ); ?></option>
							<?php if ( 'astra' == get_template() ) { ?>
								<option value="type_before_footer" <?php selected( $template_type, 'type_before_footer' ); ?>><?php _e( 'Before Footer', 'header-footer-elementor' ); ?></option>
							<?php } ?>
							<option value="type_footer" <?php selected( $template_type, 'type_footer' ); ?>><?php _e( 'Footer', 'header-footer-elementor' ); ?></option>
							<option value="custom" <?php selected( $template_type, 'custom' ); ?>><?php _e( 'Custom Block', 'header-footer-elementor' ); ?></option>
						</select>
					</td>
				</tr>

				<?php $this->display_rules_tab();  ?>
				<tr class="hfe-options-row hfe-shortcode">
					<td class="hfe-options-row-heading">
						<label for="ehf_template_type"><?php _e( 'Shortcode', 'header-footer-elementor' ); ?></label>
						<i class="hfe-options-row-heading-help dashicons dashicons-editor-help" title="<?php _e( 'Copy this shortcode and paste it into your post, page, or text widget content.', 'header-footer-elementor' ); ?>">
						</i>
					</td>
					<td class="hfe-options-row-content">
						<span class="hfe-shortcode-col-wrap">
							<input type="text" onfocus="this.select();" readonly="readonly" value="[hfe_template id='<?php echo esc_attr( $post->ID ); ?>']" class="hfe-large-text code">
						</span>
					</td>
				</tr>
				<tr class="hfe-options-row">
					<td class="hfe-options-row-heading">
						<label for="display-on-canvas-template">
							<?php _e( 'Enable Layout for Elementor Canvas Template?', 'header-footer-elementor' ); ?>
						</label>
						<i class="hfe-options-row-heading-help dashicons dashicons-editor-help" title="<?php _e( 'Enabling this option will display this layout on pages using Elementor Canvas Template.', 'header-footer-elementor' ); ?>"></i>
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
	 *
	 * @param  array $options Post meta.
	 */
	public function display_rules_tab() {
		// Load Target Rule assets.
		Astra_Target_Rules_Fields::get_instance()->admin_styles();

		$include_locations 	= get_post_meta( get_the_id(), 'ehf_target_include_locations', true );
		$exclude_locations 	= get_post_meta( get_the_id(), 'ehf_target_exclude_locations', true );
		$users 				= get_post_meta( get_the_id(), 'ehf_target_user_roles', true );
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
					array(
						'title'          => __( 'Display Rules', 'header-footer-elementor' ),
						'value'          => '[{"type":"basic-global","specific":null}]',
						'tags'           => 'site,enable,target,pages',
						'rule_type'      => 'display',
						'add_rule_label' => __( 'Add Display Rule', 'header-footer-elementor' ),
					),
					$include_locations
				);
				?>
			</td>
		</tr>
		<tr class="bsf-target-rules-row hfe-options-row">
			<td class="bsf-target-rules-row-heading hfe-options-row-heading">
				<label><?php esc_html_e( 'Do Not Display On', 'header-footer-elementor' ); ?></label>
				<i class="bsf-target-rules-heading-help dashicons dashicons-editor-help"
					title="<?php echo esc_attr__( 'This Advanced Header will not appear at these locations.', 'header-footer-elementor' ); ?>"></i>
			</td>
			<td class="bsf-target-rules-row-content hfe-options-row-content">
				<?php
				Astra_Target_Rules_Fields::target_rule_settings_field(
					'bsf-target-rules-exclusion',
					array(
						'title'          => __( 'Exclude On', 'header-footer-elementor' ),
						'value'          => '[]',
						'tags'           => 'site,enable,target,pages',
						'add_rule_label' => __( 'Add Exclusion Rule', 'header-footer-elementor' ),
						'rule_type'      => 'exclude',
					),
					$exclude_locations
				);
				?>
			</td>
		</tr>
		<tr class="bsf-target-rules-row hfe-options-row">
			<td class="bsf-target-rules-row-heading hfe-options-row-heading">
				<label><?php esc_html_e( 'User Roles', 'header-footer-elementor' ); ?></label>
				<i class="bsf-target-rules-heading-help dashicons dashicons-editor-help" title="<?php echo esc_attr__( 'Targer header based on user role.', 'header-footer-elementor' ); ?>"></i>
			</td>
			<td class="bsf-target-rules-row-content hfe-options-row-content">
				<?php
				Astra_Target_Rules_Fields::target_user_role_settings_field(
					'bsf-target-rules-users',
					array(
						'title'          => __( 'Users', 'header-footer-elementor' ),
						'value'          => '[]',
						'tags'           => 'site,enable,target,pages',
						'add_rule_label' => __( 'Add User Rule', 'header-footer-elementor' ),
					),
					$users
				);
				?>
			</td>
		</tr>
		<?php
	}

	/**
	 * Save term metadatam
	 *
	 * @param int $term_id Term id.
	 * @param int $tt_id Term taxonomy ID.
	 * @return void
	 */
	public function save_term_meta( $term_id, $tt_id ) {

		if ( isset( $_POST['header-template'] ) ) {
			update_term_meta( $term_id, 'header-template', esc_attr( $_POST['header-template'] ) );
		}

		if ( isset( $_POST['footer-template'] ) ) {
			update_term_meta( $term_id, 'footer-template', esc_attr( $_POST['footer-template'] ) );
		}
	}

	/**
	 * Save meta field.
	 *
	 * @param  POST $post_id Currennt post object which is being displayed.
	 *
	 * @return Void
	 */
	public function ehf_header_footer_template_save_meta( $post_id ) {

		// Bail if we're doing an auto save.
		if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
			return;
		}

		// if our nonce isn't there, or we can't verify it, bail.
		if ( ! isset( $_POST['ehf_header_footer_selectin_meta_nounce'] ) || ! wp_verify_nonce( $_POST['ehf_header_footer_selectin_meta_nounce'], 'ehf_header_footer_selectin_meta_nounce' ) ) {
			return;
		}

		// if our current user can't edit this post, bail.
		if ( ! current_user_can( 'edit_posts' ) ) {
			return;
		}

		if ( isset( $_POST['header-template'] ) ) {
			update_post_meta( $post_id, 'header-template', esc_attr( $_POST['header-template'] ) );
		}

		if ( isset( $_POST['footer-template'] ) ) {
			update_post_meta( $post_id, 'footer-template', esc_attr( $_POST['footer-template'] ) );
		}

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
		if ( ! isset( $_POST['ehf_meta_nounce'] ) || ! wp_verify_nonce( $_POST['ehf_meta_nounce'], 'ehf_meta_nounce' ) ) {
			return;
		}

		// if our current user can't edit this post, bail.
		if ( ! current_user_can( 'edit_posts' ) ) {
			return;
		}

		$target_locations = Astra_Target_Rules_Fields::get_format_rule_value( $_POST, 'bsf-target-rules-location' );
		$target_exclusion = Astra_Target_Rules_Fields::get_format_rule_value( $_POST, 'bsf-target-rules-exclusion' );
		$target_users	  = array();

		if ( isset( $_POST['bsf-target-rules-users'] ) ) {
			$target_users = array_map( 'sanitize_text_field', $_POST['bsf-target-rules-users'] );
		}

		update_post_meta( $post_id, 'ehf_target_include_locations', $target_locations );
		update_post_meta( $post_id, 'ehf_target_exclude_locations', $target_exclusion );
		update_post_meta( $post_id, 'ehf_target_user_roles', $target_users );

		if ( isset( $_POST['ehf_template_type'] ) ) {
			update_post_meta( $post_id, 'ehf_template_type', esc_attr( $_POST['ehf_template_type'] ) );
		}

		if ( isset( $_POST['display-on-canvas-template'] ) ) {
			update_post_meta( $post_id, 'display-on-canvas-template', esc_attr( $_POST['display-on-canvas-template'] ) );
		} else {
			delete_post_meta( $post_id, 'display-on-canvas-template' );
		}

	}

	/**
	 * Display notice when editing the header or footer when there is one more of similar layout is active on the site.
	 *
	 * @since 1.0.0
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

				$post_title        = '<strong>' . get_the_title( $templates[0] ) . '</strong>';
				$template_location = '<strong>' . $this->template_location( $template_type ) . '</strong>';
				/* Translators: Post title, Template Location */
				$message = sprintf( __( 'Template %1$s is already assigned to the location %2$s', 'header-footer-elementor' ), $post_title, $template_location );

				echo '<div class="error"><p>';
				echo $message;
				echo '</p></div>';
			}
		}

	}

	/**
	 * Convert the Template name to be added in the notice.
	 *
	 * @since  1.0.0
	 *
	 * @param  String $template_type Template type name.
	 *
	 * @return String $template_type Template type name.
	 */
	public function template_location( $template_type ) {
		$template_type = ucfirst( str_replace( 'type_', '', $template_type ) );

		return $template_type;
	}

	/**
	 * Don't display the elementor header footer templates on the frontend for non edit_posts capable users.
	 *
	 * @since  1.0.0
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
	 * @param  String $single_template Single template.
	 */
	function load_canvas_template( $single_template ) {

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
	 */
	function set_shortcode_columns( $columns ) {

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
	 */
	function render_shortcode_column( $column, $post_id ) {

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
