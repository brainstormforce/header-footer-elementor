<?php
/**
 * Test Header_Footer_Elementor main class
 *
 * @package Header_Footer_Elementor
 */

require_once dirname( __FILE__ ) . '/class-hfe-test-case.php';

/**
 * Test_Header_Footer_Elementor class.
 */
class Test_Header_Footer_Elementor extends HFE_Test_Case {

	/**
	 * Test instance
	 */
	public function test_instance() {
		$instance = Header_Footer_Elementor::instance();
		$this->assertInstanceOf( 'Header_Footer_Elementor', $instance );
		
		// Test singleton pattern
		$instance2 = Header_Footer_Elementor::instance();
		$this->assertSame( $instance, $instance2 );
	}

	/**
	 * Test plugin constants
	 */
	public function test_constants() {
		$this->assertTrue( defined( 'HFE_VER' ) );
		$this->assertTrue( defined( 'HFE_FILE' ) );
		$this->assertTrue( defined( 'HFE_DIR' ) );
		$this->assertTrue( defined( 'HFE_URL' ) );
		$this->assertTrue( defined( 'HFE_PATH' ) );
	}

	/**
	 * Test post type registration
	 */
	public function test_post_type_exists() {
		$this->assertTrue( post_type_exists( 'elementor-hf' ) );
	}

	/**
	 * Test admin menu registration
	 */
	public function test_admin_menu() {
		if ( ! is_admin() ) {
			$this->markTestSkipped( 'Admin menu tests require admin context' );
		}

		global $submenu;
		
		// Check if submenu exists under Elementor
		$this->assertArrayHasKey( 'elementor', $submenu );
	}

	/**
	 * Test template creation
	 */
	public function test_create_header_template() {
		$post_id = $this->create_hfe_template( 'header' );
		
		$this->assertGreaterThan( 0, $post_id );
		$this->assertEquals( 'elementor-hf', get_post_type( $post_id ) );
		$this->assertEquals( 'header', get_post_meta( $post_id, 'ehf_template_type', true ) );
	}

	/**
	 * Test template creation for footer
	 */
	public function test_create_footer_template() {
		$post_id = $this->create_hfe_template( 'footer' );
		
		$this->assertGreaterThan( 0, $post_id );
		$this->assertEquals( 'elementor-hf', get_post_type( $post_id ) );
		$this->assertEquals( 'footer', get_post_meta( $post_id, 'ehf_template_type', true ) );
	}

	/**
	 * Test hooks registration
	 */
	public function test_hooks_registered() {
		$instance = Header_Footer_Elementor::instance();
		
		// Test common hooks
		$this->assertHasAction( 'init', array( $instance, 'header_footer_posttype' ) );
		$this->assertHasAction( 'admin_menu', array( 'HFE_Admin', 'menu' ), 50 );
	}

	/**
	 * Test get templates by type
	 */
	public function test_get_templates_by_type() {
		// Create test templates
		$header_id = $this->create_hfe_template( 'header' );
		$footer_id = $this->create_hfe_template( 'footer' );
		
		// Test get header templates
		$headers = Header_Footer_Elementor::get_template_id( 'header' );
		$this->assertIsArray( $headers );
		
		// Test get footer templates
		$footers = Header_Footer_Elementor::get_template_id( 'footer' );
		$this->assertIsArray( $footers );
	}

	/**
	 * Test template type validation
	 */
	public function test_template_types() {
		$valid_types = array( 'header', 'footer', 'single', 'archive' );
		
		foreach ( $valid_types as $type ) {
			$post_id = $this->create_hfe_template( $type );
			$this->assertEquals( $type, get_post_meta( $post_id, 'ehf_template_type', true ) );
		}
	}
}