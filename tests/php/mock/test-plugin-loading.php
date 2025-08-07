<?php
/**
 * Test plugin loading and basic functionality
 */

class Test_Plugin_Loading extends HFE_Mock_Test_Case {

	/**
	 * Test that plugin constants are defined
	 */
	public function test_constants_defined() {
		$this->assertTrue( defined( 'HFE_VER' ), 'HFE_VER not defined' );
		$this->assertTrue( defined( 'HFE_FILE' ), 'HFE_FILE not defined' );
		$this->assertTrue( defined( 'HFE_DIR' ), 'HFE_DIR not defined' );
		$this->assertTrue( defined( 'HFE_URL' ), 'HFE_URL not defined' );
		$this->assertTrue( defined( 'HFE_PATH' ), 'HFE_PATH not defined' );
	}

	/**
	 * Test plugin version format
	 */
	public function test_version_format() {
		$this->assertMatchesRegularExpression( '/^\d+\.\d+\.\d+$/', HFE_VER );
	}

	/**
	 * Test main class exists
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
	 * Test singleton instance
	 */
	public function test_singleton_instance() {
		$instance1 = Header_Footer_Elementor::instance();
		$instance2 = Header_Footer_Elementor::instance();
		
		$this->assertInstanceOf( 'Header_Footer_Elementor', $instance1 );
		$this->assertSame( $instance1, $instance2 );
	}

	/**
	 * Test hooks are registered
	 */
	public function test_hooks_registered() {
		global $wp_filter;
		
		// Initialize the plugin
		Header_Footer_Elementor::instance();
		
		// Check if init action is registered
		$this->assertArrayHasKey( 'init', $wp_filter );
	}

	/**
	 * Test post type registration
	 */
	public function test_register_post_type() {
		$instance = Header_Footer_Elementor::instance();
		$instance->header_footer_posttype();
		
		$this->assertTrue( post_type_exists( 'elementor-hf' ) );
	}

	/**
	 * Test shortcode registration
	 */
	public function test_shortcode_registered() {
		global $shortcode_tags;
		
		// Initialize the plugin
		Header_Footer_Elementor::instance();
		
		// Trigger init
		do_action( 'init' );
		
		$this->assertArrayHasKey( 'hfe_template', $shortcode_tags );
	}
}