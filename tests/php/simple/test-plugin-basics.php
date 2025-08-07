<?php
/**
 * Basic plugin tests that work with Local Sites
 */

class Test_Plugin_Basics extends HFE_Simple_Test_Case {

	/**
	 * Test that plugin is active
	 */
	public function test_plugin_is_active() {
		$this->assertTrue( is_plugin_active( 'header-footer-elementor/header-footer-elementor.php' ) );
	}

	/**
	 * Test that constants are defined
	 */
	public function test_constants_defined() {
		$this->assertTrue( defined( 'HFE_VER' ) );
		$this->assertTrue( defined( 'HFE_DIR' ) );
		$this->assertTrue( defined( 'HFE_URL' ) );
		$this->assertTrue( defined( 'HFE_PATH' ) );
	}

	/**
	 * Test that post type exists
	 */
	public function test_post_type_registered() {
		$this->assertTrue( post_type_exists( 'elementor-hf' ) );
	}

	/**
	 * Test creating a header template
	 */
	public function test_create_header_template() {
		$template_id = $this->create_hfe_template( 'header' );
		
		$this->assertGreaterThan( 0, $template_id );
		$this->assertEquals( 'elementor-hf', get_post_type( $template_id ) );
		$this->assertEquals( 'header', get_post_meta( $template_id, 'ehf_template_type', true ) );
		
		// Clean up
		wp_delete_post( $template_id, true );
	}

	/**
	 * Test creating a footer template
	 */
	public function test_create_footer_template() {
		$template_id = $this->create_hfe_template( 'footer' );
		
		$this->assertGreaterThan( 0, $template_id );
		$this->assertEquals( 'elementor-hf', get_post_type( $template_id ) );
		$this->assertEquals( 'footer', get_post_meta( $template_id, 'ehf_template_type', true ) );
		
		// Clean up
		wp_delete_post( $template_id, true );
	}

	/**
	 * Test main plugin class exists
	 */
	public function test_main_class_exists() {
		$this->assertTrue( class_exists( 'Header_Footer_Elementor' ) );
	}

	/**
	 * Test admin class exists
	 */
	public function test_admin_class_exists() {
		$this->assertTrue( class_exists( 'HFE_Admin' ) );
	}

	/**
	 * Test shortcode is registered
	 */
	public function test_shortcode_registered() {
		global $shortcode_tags;
		$this->assertArrayHasKey( 'hfe_template', $shortcode_tags );
	}

	/**
	 * Test template shortcode output
	 */
	public function test_template_shortcode() {
		$template_id = $this->create_hfe_template( 'header' );
		
		// Add some content to the template
		wp_update_post( array(
			'ID' => $template_id,
			'post_content' => 'Test Header Content',
		) );
		
		// Test shortcode
		$output = do_shortcode( "[hfe_template id='$template_id']" );
		$this->assertStringContainsString( 'Test Header Content', $output );
		
		// Clean up
		wp_delete_post( $template_id, true );
	}
}