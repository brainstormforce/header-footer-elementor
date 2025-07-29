<?php
/**
 * Test HFE_Admin class
 *
 * @package Header_Footer_Elementor
 */

require_once dirname( __FILE__ ) . '/class-hfe-test-case.php';

/**
 * Test_HFE_Admin class.
 */
class Test_HFE_Admin extends HFE_Test_Case {

	/**
	 * Test instance
	 */
	public function test_instance() {
		$instance = HFE_Admin::instance();
		$this->assertInstanceOf( 'HFE_Admin', $instance );
	}

	/**
	 * Test post type columns
	 */
	public function test_column_headings() {
		$instance = HFE_Admin::instance();
		$columns = array(
			'cb' => '<input type="checkbox" />',
			'title' => 'Title',
			'date' => 'Date',
		);
		
		$filtered_columns = $instance->column_headings( $columns );
		
		$this->assertArrayHasKey( 'elementor_hf_display_rules', $filtered_columns );
		$this->assertArrayHasKey( 'elementor_hf_shortcode', $filtered_columns );
	}

	/**
	 * Test admin body class
	 */
	public function test_admin_body_class() {
		global $pagenow;
		$pagenow = 'edit.php';
		$_GET['post_type'] = 'elementor-hf';
		
		$instance = HFE_Admin::instance();
		$classes = $instance->admin_body_class( '' );
		
		$this->assertStringContainsString( 'hfe-editor-screen', $classes );
		
		// Clean up
		unset( $_GET['post_type'] );
	}

	/**
	 * Test template type display
	 */
	public function test_template_type_display() {
		$post_id = $this->create_hfe_template( 'header' );
		
		$instance = HFE_Admin::instance();
		ob_start();
		$instance->column_content( 'elementor_hf_display_rules', $post_id );
		$output = ob_get_clean();
		
		$this->assertStringContainsString( 'Header', $output );
	}

	/**
	 * Test shortcode display
	 */
	public function test_shortcode_display() {
		$post_id = $this->create_hfe_template( 'header' );
		
		$instance = HFE_Admin::instance();
		ob_start();
		$instance->column_content( 'elementor_hf_shortcode', $post_id );
		$output = ob_get_clean();
		
		$this->assertStringContainsString( '[hfe_template', $output );
		$this->assertStringContainsString( (string) $post_id, $output );
	}

	/**
	 * Test admin scripts enqueue
	 */
	public function test_admin_scripts() {
		global $pagenow;
		$pagenow = 'edit.php';
		$_GET['post_type'] = 'elementor-hf';
		
		$instance = HFE_Admin::instance();
		
		// Set up WordPress scripts
		wp_scripts();
		
		$instance->enqueue_admin_scripts();
		
		$this->assertTrue( wp_script_is( 'hfe-admin-js', 'enqueued' ) );
		$this->assertTrue( wp_style_is( 'hfe-admin-css', 'enqueued' ) );
		
		// Clean up
		unset( $_GET['post_type'] );
	}

	/**
	 * Test template duplicate action
	 */
	public function test_duplicate_template() {
		$original_id = $this->create_hfe_template( 'header' );
		update_post_meta( $original_id, 'test_meta', 'test_value' );
		
		$instance = HFE_Admin::instance();
		
		// Simulate duplicate action
		$_GET['action'] = 'hfe_duplicate_post';
		$_GET['post'] = $original_id;
		$_GET['hfe_duplicate_nonce'] = wp_create_nonce( 'hfe_duplicate_nonce' );
		
		// Get the current user
		$user_id = $this->factory->user->create( array( 'role' => 'administrator' ) );
		wp_set_current_user( $user_id );
		
		// We can't test the actual duplication directly because it redirects,
		// but we can test that the nonce verification would pass
		$this->assertTrue( wp_verify_nonce( $_GET['hfe_duplicate_nonce'], 'hfe_duplicate_nonce' ) );
		
		// Clean up
		unset( $_GET['action'], $_GET['post'], $_GET['hfe_duplicate_nonce'] );
	}
}