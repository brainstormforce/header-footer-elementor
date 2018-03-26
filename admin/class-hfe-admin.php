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
			self::$_instance = new self;
		}

		return self::$_instance;
	}

	/**
	 * Constructor
	 */
	private function __construct() {
		add_action( 'init', array( $this, 'header_footer_posttype' ) );
		add_action( 'admin_menu', array( $this, 'register_admin_menu' ), 50 );
		add_action( 'add_meta_boxes', array( $this, 'ehf_register_metabox' ) );
		add_action( 'save_post', array( $this, 'ehf_save_meta' ) );
		add_action( 'admin_notices', array( $this, 'location_notice' ) );
		add_action( 'template_redirect', array( $this, 'block_template_frontend' ) );
		add_filter( 'single_template', array( $this, 'load_canvas_template' ) );
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
			'ehf-meta-box', __( 'Elementor Header Footer options', 'header-footer-elementor' ), array(
				$this,
				'efh_metabox_render',
			), 'elementor-hf', 'normal', 'high'
		);
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
		<p>
			<label for="ehf_template_type"><?php _e( 'Select the type of template this is', 'header-footer-elementor' ); ?></label>
			<select name="ehf_template_type" id="ehf_template_type">
				<option value="" <?php selected( $template_type, '' ); ?>><?php _e( 'Select Option', 'header-footer-elementor' ); ?></option>
				<option value="type_header" <?php selected( $template_type, 'type_header' ); ?>><?php _e( 'Header', 'header-footer-elementor' ); ?></option>
				<option value="type_footer" <?php selected( $template_type, 'type_footer' ); ?>><?php _e( 'Footer', 'header-footer-elementor' ); ?></option>
			</select>
		</p>
		<p>
			<label for="display-on-canvas-template">
				<input type="checkbox" id="display-on-canvas-template" name="display-on-canvas-template" value="1" <?php checked( $display_on_canvas, true ); ?> />
					<?php _e( 'Display Layout on Elementor Canvas Template?', 'header-footer-elementor' ); ?>
			</label>
		</p>
		<p class="description"><?php _e( 'Enabling this option will display this layout on pages using Elementor Canvas Template.', 'header-footer-elementor' ); ?></p>
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
		if ( ! isset( $_POST['ehf_meta_nounce'] ) || ! wp_verify_nonce( $_POST['ehf_meta_nounce'], 'ehf_meta_nounce' ) ) {
			return;
		}

		// if our current user can't edit this post, bail.
		if ( ! current_user_can( 'edit_posts' ) ) {
			return;
		}

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

}

HFE_Admin::instance();
