<?php
/**
 * Base test case for Header Footer Elementor plugin
 *
 * @package Header_Footer_Elementor
 */

/**
 * HFE_Test_Case class.
 */
abstract class HFE_Test_Case extends WP_UnitTestCase {

	/**
	 * Setup test
	 */
	public function setUp(): void {
		parent::setUp();
		
		// Ensure Elementor is loaded for tests
		if ( ! did_action( 'elementor/loaded' ) ) {
			do_action( 'elementor/loaded' );
		}
	}

	/**
	 * Tear down test
	 */
	public function tearDown(): void {
		parent::tearDown();
	}

	/**
	 * Create a test post with Elementor template type
	 *
	 * @param string $type Template type (header/footer/single/archive).
	 * @param array  $meta_input Meta input array.
	 * @return int Post ID
	 */
	protected function create_hfe_template( $type = 'header', $meta_input = array() ) {
		$post_id = $this->factory->post->create(
			array(
				'post_type'   => 'elementor-hf',
				'post_status' => 'publish',
				'meta_input'  => array_merge(
					array(
						'ehf_template_type' => $type,
						'_elementor_template_type' => 'wp-post',
						'_elementor_edit_mode' => 'builder',
					),
					$meta_input
				),
			)
		);

		return $post_id;
	}

	/**
	 * Set target rules for a template
	 *
	 * @param int   $post_id Post ID.
	 * @param array $rules Target rules array.
	 */
	protected function set_target_rules( $post_id, $rules ) {
		update_post_meta( $post_id, 'ehf_target_include_locations', $rules );
	}

	/**
	 * Assert that a hook has an action
	 *
	 * @param string $hook Hook name.
	 * @param string $function_name Function name.
	 * @param int    $priority Priority.
	 */
	protected function assertHasAction( $hook, $function_name, $priority = 10 ) {
		$this->assertTrue(
			has_action( $hook, $function_name ) === $priority,
			"Failed asserting that '$function_name' is attached to '$hook' with priority $priority"
		);
	}

	/**
	 * Assert that a hook has a filter
	 *
	 * @param string $hook Hook name.
	 * @param string $function_name Function name.
	 * @param int    $priority Priority.
	 */
	protected function assertHasFilter( $hook, $function_name, $priority = 10 ) {
		$this->assertTrue(
			has_filter( $hook, $function_name ) === $priority,
			"Failed asserting that '$function_name' is attached to '$hook' with priority $priority"
		);
	}
}