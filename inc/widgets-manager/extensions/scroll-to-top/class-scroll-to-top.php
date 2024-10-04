<?php
/**
 * Elementor Classes.
 *
 * @package header-footer-elementor
 */

namespace HFE\WidgetsManager\Extensions\ScrollToTop;

use Elementor\Controls_Manager;
use Elementor\Group_Control_Background;
use Elementor\Group_Control_Typography;
use Elementor\Group_Control_Border;
use Elementor\Group_Control_Box_Shadow;
use Elementor\Core\Kits\Documents\Tabs\Tab_Base;
use Elementor\Core\Kits\Documents\Tabs\Global_Typography;


if ( ! defined( 'ABSPATH' ) ) {
	exit;   // Exit if accessed directly.
}

/**
 * HFE Scroll to Top entension
 *
 * @since x.x.x
 */
class Scroll_To_Top extends Tab_Base {

	/**
	 * Retrieve the entension name.
	 *
	 * @since x.x.x
	 *
	 * @access public
	 *
	 * @return string entension name.
	 */
	public function get_name() {
		return 'hfe-scroll-to-top';
	}

    /**
	 * Retrieve the entension name.
	 *
	 * @since x.x.x
	 *
	 * @access public
	 *
	 * @return string entension name.
	 */
	public function get_id() {
		return 'hfe-scroll-to-top';
	}

	/**
	 * Retrieve the entension title.
	 *
	 * @since x.x.x
	 *
	 * @access public
	 *
	 * @return string entension title.
	 */
	public function get_title() {
		return __( 'Scroll to Top', 'header-footer-elementor' );
	}

	/**
	 * Retrieve the entension icon.
	 *
	 * @since x.x.x
	 *
	 * @access public
	 *
	 * @return string entension icon.
	 */
	public function get_icon() {
		return 'hfe-icon-menu-Scroll to Top';
	}

    /**
	 * Retrieve the entension icon.
	 *
	 * @since x.x.x
	 *
	 * @access public
	 *
	 * @return string entension icon.
	 */
    public function get_group() {
		return 'settings';
	}

	/**
	 * Register Scroll to Top controls.
	 *
	 * @since x.x.x
	 * @access protected
	 * @return void
	 */
	protected function register_tab_controls() {
        $this->start_controls_section(
			'hfe_scroll_to_top_section',
			[
				'tab'   => 'ha-scroll-to-top-kit-settings',
				'label' => __( 'Scroll to Top', 'header-footer-elementor' ),
			]
		);

            $this->add_control(
                'hfe_scroll_to_top_switcher',
                [
                    'type'      => Controls_Manager::SWITCHER,
                    'label'     => __( 'Enable Scroll To Top', 'header-footer-elementor' ),
                    'default'   => '',
                    'label_on'  => __( 'Show', 'header-footer-elementor' ),
                    'label_off' => __( 'Hide', 'header-footer-elementor' ),
                ]
		);

        $this->end_controls_section();
	}

}
