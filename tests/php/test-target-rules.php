<?php
/**
 * Test Target Rules functionality
 *
 * @package Header_Footer_Elementor
 */

require_once dirname( __FILE__ ) . '/class-hfe-test-case.php';

/**
 * Test_Target_Rules class.
 */
class Test_Target_Rules extends HFE_Test_Case {

	/**
	 * Test target rules on entire site
	 */
	public function test_entire_site_rule() {
		$template_id = $this->create_hfe_template( 'header' );
		
		// Set entire site rule
		$this->set_target_rules(
			$template_id,
			array(
				array(
					'rule' => array(
						array(
							'type'     => 'basic-global',
							'specific' => 'entire-site',
						),
					),
				),
			)
		);
		
		// Test that template applies globally
		$templates = Header_Footer_Elementor::get_template_id( 'header' );
		$this->assertNotEmpty( $templates );
	}

	/**
	 * Test target rules on specific page
	 */
	public function test_specific_page_rule() {
		$page_id = $this->factory->post->create(
			array(
				'post_type'   => 'page',
				'post_status' => 'publish',
			)
		);
		
		$template_id = $this->create_hfe_template( 'header' );
		
		// Set specific page rule
		$this->set_target_rules(
			$template_id,
			array(
				array(
					'rule' => array(
						array(
							'type'     => 'specific-page',
							'specific' => $page_id,
						),
					),
				),
			)
		);
		
		$rules = get_post_meta( $template_id, 'ehf_target_include_locations', true );
		$this->assertNotEmpty( $rules );
		$this->assertEquals( 'specific-page', $rules[0]['rule'][0]['type'] );
		$this->assertEquals( $page_id, $rules[0]['rule'][0]['specific'] );
	}

	/**
	 * Test target rules on archive pages
	 */
	public function test_archive_rule() {
		$template_id = $this->create_hfe_template( 'archive' );
		
		// Set archive rule
		$this->set_target_rules(
			$template_id,
			array(
				array(
					'rule' => array(
						array(
							'type'     => 'post-archive',
							'specific' => 'all',
						),
					),
				),
			)
		);
		
		$rules = get_post_meta( $template_id, 'ehf_target_include_locations', true );
		$this->assertEquals( 'post-archive', $rules[0]['rule'][0]['type'] );
	}

	/**
	 * Test exclusion rules
	 */
	public function test_exclusion_rules() {
		$template_id = $this->create_hfe_template( 'header' );
		$exclude_page = $this->factory->post->create(
			array(
				'post_type'   => 'page',
				'post_status' => 'publish',
			)
		);
		
		// Set entire site with exclusion
		update_post_meta(
			$template_id,
			'ehf_target_include_locations',
			array(
				array(
					'rule' => array(
						array(
							'type'     => 'basic-global',
							'specific' => 'entire-site',
						),
					),
				),
			)
		);
		
		update_post_meta(
			$template_id,
			'ehf_target_exclude_locations',
			array(
				array(
					'rule' => array(
						array(
							'type'     => 'specific-page',
							'specific' => $exclude_page,
						),
					),
				),
			)
		);
		
		$exclude_rules = get_post_meta( $template_id, 'ehf_target_exclude_locations', true );
		$this->assertNotEmpty( $exclude_rules );
		$this->assertEquals( $exclude_page, $exclude_rules[0]['rule'][0]['specific'] );
	}

	/**
	 * Test user role rules
	 */
	public function test_user_role_rules() {
		$template_id = $this->create_hfe_template( 'header' );
		
		// Set user role rule
		update_post_meta(
			$template_id,
			'ehf_target_user_roles',
			array( 'administrator', 'editor' )
		);
		
		$user_roles = get_post_meta( $template_id, 'ehf_target_user_roles', true );
		$this->assertIsArray( $user_roles );
		$this->assertContains( 'administrator', $user_roles );
		$this->assertContains( 'editor', $user_roles );
	}

	/**
	 * Test multiple rules combination
	 */
	public function test_multiple_rules() {
		$template_id = $this->create_hfe_template( 'footer' );
		
		// Set multiple include rules
		$this->set_target_rules(
			$template_id,
			array(
				array(
					'rule' => array(
						array(
							'type'     => 'basic-singulars',
							'specific' => 'all',
						),
					),
				),
				array(
					'rule' => array(
						array(
							'type'     => 'post-archive',
							'specific' => 'all',
						),
					),
				),
			)
		);
		
		$rules = get_post_meta( $template_id, 'ehf_target_include_locations', true );
		$this->assertCount( 2, $rules );
		$this->assertEquals( 'basic-singulars', $rules[0]['rule'][0]['type'] );
		$this->assertEquals( 'post-archive', $rules[1]['rule'][0]['type'] );
	}
}