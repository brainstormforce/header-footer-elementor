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
		add_action( 'admin_head', array( $this, 'elementor_cpt_support' ) );
		add_action( 'add_meta_boxes', array( $this, 'ehf_register_metabox' ) );
		add_action( 'save_post', array( $this, 'ehf_save_meta' ) );
	}

	/**
	 * Register Post type for header footer templates
	 */
	public function header_footer_posttype() {

		$labels = array(
			'name'               => __( 'Header / Footers Template', 'header-footer-elementor' ),
			'singular_name'      => __( 'Elementor Header Footer', 'header-footer-elementor' ),
			'menu_name'          => __( 'Header / Footers Template', 'header-footer-elementor' ),
			'name_admin_bar'     => __( 'Elementor Header Footer', 'header-footer-elementor' ),
			'add_new'            => __( 'Add New', 'header-footer-elementor' ),
			'add_new_item'       => __( 'Add New Header Footer', 'header-footer-elementor' ),
			'new_item'           => __( 'New Header / Footers Template', 'header-footer-elementor' ),
			'edit_item'          => __( 'Edit Header / Footers Template', 'header-footer-elementor' ),
			'view_item'          => __( 'View Header / Footers Template', 'header-footer-elementor' ),
			'all_items'          => __( 'All Elementor Header Footers', 'header-footer-elementor' ),
			'search_items'       => __( 'Search Recipes', 'header-footer-elementor' ),
			'parent_item_colon'  => __( 'Parent Recipes:', 'header-footer-elementor' ),
			'not_found'          => __( 'No recipes found.', 'header-footer-elementor' ),
			'not_found_in_trash' => __( 'No recipes found in Trash.', 'header-footer-elementor' ),
		);

		$args = array(
			'labels'              => $labels,
			'description'         => __( 'My yummy recipes will be published using this post type', 'header-footer-elementor' ),
			'public'              => true,
			'show_ui'             => true,
			'show_in_admin_bar'   => true,
			'publicly_queryable'  => true,
			'exclude_from_search' => true,
			'menu_position'       => 60,
			'menu_icon'           => 'dashicons-editor-kitchensink',
			'supports'            => array( 'title' ),
			'rewrite'             => array( 'slug' => 'ehf' ),
		);

		register_post_type( 'ehf', $args );
	}

	/**
	 * Enable Elementor Page Builder on the Post type ctp
	 */
	public function elementor_cpt_support() {
		$elementor_post_types = get_option( 'elementor_cpt_support', array() );

		if ( ! in_array( 'ehf', $elementor_post_types ) ) {
			array_push( $elementor_post_types, 'ehf' );
			update_option( 'elementor_cpt_support', $elementor_post_types );
		}
	}

	/**
	 * Register meta box(es).
	 */
	function ehf_register_metabox() {
		add_meta_box( 'ehf-meta-box', __( 'Elementor Header Footer options', 'header-footer-elementor' ), array(
			$this,
			'efh_metabox_render',
		), 'ehf', 'normal', 'high' );
	}

	/**
	 * Render Meta field.
	 *
	 * @param  POST $post Currennt post object which is being displayed.
	 */
	function efh_metabox_render( $post ) {
		$values   = get_post_custom( $post->ID );
		$selected = isset( $values['ehf_template_type'] ) ? esc_attr( $values['ehf_template_type'][0] ) : '';
		// We'll use this nonce field later on when saving.
		wp_nonce_field( 'ehf_meta_nounce', 'ehf_meta_nounce' );
		?>
		<p>
			<label for="ehf_template_type">Select the type of template this is</label>
			<select name="ehf_template_type" id="ehf_template_type">
				<option value="" <?php selected( $selected, '' ); ?>>Select Option</option>
				<option value="type_header" <?php selected( $selected, 'type_header' ); ?>>Header</option>
				<option value="type_footer" <?php selected( $selected, 'type_footer' ); ?>>Footer</option>
			</select>
		</p>
		<?php
	}

	/**
	 * Save meta field.
	 *
	 * @param  POST $post_id Currennt post object which is being displayed.
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
		if ( ! current_user_can( 'edit_post' ) ) {
			return;
		}

		if ( isset( $_POST['ehf_template_type'] ) ) {
			update_post_meta( $post_id, 'ehf_template_type', esc_attr( $_POST['ehf_template_type'] ) );
		}
	}

}

HFE_Admin::instance();
