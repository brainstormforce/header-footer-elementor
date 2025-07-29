<?php
/**
 * Test plugin constants
 */

class Test_Constants extends HFE_Unit_Test_Case {

	/**
	 * Test that plugin constants are defined
	 */
	public function test_plugin_constants_defined() {
		$this->assertTrue( defined( 'HFE_VER' ) );
		$this->assertTrue( defined( 'HFE_FILE' ) );
		$this->assertTrue( defined( 'HFE_DIR' ) );
		$this->assertTrue( defined( 'HFE_URL' ) );
		$this->assertTrue( defined( 'HFE_PATH' ) );
	}

	/**
	 * Test constant values
	 */
	public function test_constant_values() {
		$this->assertIsString( HFE_VER );
		$this->assertMatchesRegularExpression( '/^\d+\.\d+\.\d+/', HFE_VER );
		
		$this->assertStringContainsString( 'header-footer-elementor', HFE_FILE );
		$this->assertStringContainsString( 'header-footer-elementor', HFE_DIR );
		$this->assertStringContainsString( 'header-footer-elementor', HFE_PATH );
	}

	/**
	 * Test that main classes exist
	 */
	public function test_main_classes_exist() {
		$this->assertTrue( class_exists( 'Header_Footer_Elementor' ) );
		$this->assertTrue( class_exists( 'HFE_Admin' ) );
	}

	/**
	 * Test singleton pattern
	 */
	public function test_singleton_instance() {
		$instance1 = Header_Footer_Elementor::instance();
		$instance2 = Header_Footer_Elementor::instance();
		
		$this->assertInstanceOf( 'Header_Footer_Elementor', $instance1 );
		$this->assertSame( $instance1, $instance2 );
	}
}