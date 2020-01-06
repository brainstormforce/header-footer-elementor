<?php
/**
 * Elementor Classes.
 *
 * @package header-footer-elementor
 */

namespace HFE\WidgetsManager\Widgets;

use Elementor\Controls_Manager;
use Elementor\Control_Media;
use Elementor\Utils;
use Elementor\Group_Control_Border;
use Elementor\Group_Control_Typography;
use Elementor\Group_Control_Box_Shadow;
use Elementor\Scheme_Typography;
use Elementor\Scheme_Color;
use Elementor\Group_Control_Image_Size;
use Elementor\Repeater;
use Elementor\Group_Control_Css_Filter;
use Elementor\Group_Control_Text_Shadow;
use Elementor\Plugin;
use Elementor\Widget_Base;

if ( ! defined( 'ABSPATH' ) ) {
	exit;   // Exit if accessed directly.
}

/**
 * HFE Post Navigation widget.
 *
 * HFE widget for Post Navigation.
 *
 * @since x.x.x
 */
class Post_Nav extends Widget_Base {
	/**
	 * Retrieve the widget name.
	 *
	 * @since x.x.x
	 *
	 * @access public
	 *
	 * @return string Widget name.
	 */
	public function get_name() {
		return 'post-nav';
	}

	/**
	 * Retrieve the widget title.
	 *
	 * @since x.x.x
	 *
	 * @access public
	 *
	 * @return string Widget title.
	 */
	public function get_title() {
		return __( 'Post Navigation', 'header-footer-elementor' );
	}

	/**
	 * Retrieve the widget icon.
	 *
	 * @since x.x.x
	 *
	 * @access public
	 *
	 * @return string Widget icon.
	 */
	public function get_icon() {
		return 'fas fa-search';
	}

	/**
	 * Retrieve the list of categories the widget belongs to.
	 *
	 * Used to determine where to display the widget in the editor.
	 *
	 * Note that currently Elementor supports only one category.
	 * When multiple categories passed, Elementor uses the first one.
	 *
	 * @since x.x.x
	 *
	 * @access public
	 *
	 * @return array Widget categories.
	 */
	public function get_categories() {
		return [ 'hfe-widgets' ];
	}

	/**
	 * Register Post Navigation Controls.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function _register_controls() {
		$this->register_content_controls();
	}

	/**
	 * Register Post Navigation General Controls.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function register_content_controls() {
		$this->start_controls_section(
			'post_navigation_content',
			[
				'label' => __( 'Post Navigation', 'header-footer-elementor' ),
			]
		);

		$this->add_control(
			'show_label',
			[
				'label' => __( 'Label', 'header-footer-elementor' ),
				'type' => Controls_Manager::SWITCHER,
				'label_on' => __( 'Show', 'header-footer-elementor' ),
				'label_off' => __( 'Hide', 'header-footer-elementor' ),
				'default' => 'yes',
			]
		);

		$this->add_control(
			'prev_label',
			[
				'label' => __( 'Previous Label', 'header-footer-elementor' ),
				'type' => Controls_Manager::TEXT,
				'default' => __( 'Previous', 'header-footer-elementor' ),
				'condition' => [
					'show_label' => 'yes',
				],
			]
		);

		$this->add_control(
			'next_label',
			[
				'label' => __( 'Next Label', 'header-footer-elementor' ),
				'type' => Controls_Manager::TEXT,
				'default' => __( 'Next', 'header-footer-elementor' ),
				'condition' => [
					'show_label' => 'yes',
				],
			]
		);

		$this->add_control(
			'show_title',
			[
				'label' => __( 'Post Title', 'header-footer-elementor' ),
				'type' => Controls_Manager::SWITCHER,
				'label_on' => __( 'Show', 'header-footer-elementor' ),
				'label_off' => __( 'Hide', 'header-footer-elementor' ),
				'default' => 'yes',
			]
		);

		$this->add_control(
			'show_arrow',
			[
				'label' => __( 'Arrows', 'header-footer-elementor' ),
				'type' => Controls_Manager::SWITCHER,
				'label_on' => __( 'Show', 'header-footer-elementor' ),
				'label_off' => __( 'Hide', 'header-footer-elementor' ),
				'default' => 'yes',
			]
		);

		$this->add_control(
			'arrow',
			[
				'label' => __( 'Arrows Type', 'header-footer-elementor' ),
				'type' => Controls_Manager::SELECT,
				'options' => [
					'fa fa-angle-left' => __( 'Angle', 'header-footer-elementor' ),
					'fa fa-angle-double-left' => __( 'Double Angle', 'header-footer-elementor' ),
					'fa fa-chevron-left' => __( 'Chevron', 'header-footer-elementor' ),
					'fa fa-chevron-circle-left' => __( 'Chevron Circle', 'header-footer-elementor' ),
					'fa fa-caret-left' => __( 'Caret', 'header-footer-elementor' ),
					'fa fa-arrow-left' => __( 'Arrow', 'header-footer-elementor' ),
					'fa fa-long-arrow-left' => __( 'Long Arrow', 'header-footer-elementor' ),
					'fa fa-arrow-circle-left' => __( 'Arrow Circle', 'header-footer-elementor' ),
					'fa fa-arrow-circle-o-left' => __( 'Arrow Circle Negative', 'header-footer-elementor' ),
				],
				'default' => 'fa fa-angle-left',
				'condition' => [
					'show_arrow' => 'yes',
				],
			]
		);

		$this->end_controls_section();
	}

	/**
	 * Render Post Navigation output on the frontend.
	 *
	 * Written in PHP and used to generate the final HTML.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function render() {

		$settings = $this->get_settings_for_display();

		$prev_label = '';
		$next_label = '';
		$prev_title = '';
		$next_title = '';
		$prev_arrow = '';
		$next_arrow = '';


		if ( 'yes' === $settings['show_label'] ) {
			$prev_label = '<span class="hfe-post-nav-prev-label">' . $settings['prev_label'] . '</span>';
			$next_label = '<span class="hfe-post-nav-next-label">' . $settings['next_label'] . '</span>';
		}

		if ( 'yes' === $settings['show_title'] ) {
			$prev_title = '<span class="hfe-post-nav-prev-title">%title</span>';
			$next_title = '<span class="hfe-post-nav-next-title">%title</span>';
		}

		if ( 'yes' === $settings['show_arrow'] ) {
			if ( is_rtl() ) {
				$prev_icon_class = str_replace( 'left', 'right', $settings['arrow'] );
				$next_icon_class = $settings['arrow'];
			} else {
				$prev_icon_class = $settings['arrow'];
				$next_icon_class = str_replace( 'left', 'right', $settings['arrow'] );
			}

			$prev_arrow = '<span class="post-navigation__arrow-wrapper post-navigation__arrow-prev"><i class="' . $prev_icon_class . '" aria-hidden="true"></i><span class="elementor-screen-only">' . esc_html__( 'Prev', 'elementor-pro' ) . '</span></span>';
			$next_arrow = '<span class="post-navigation__arrow-wrapper post-navigation__arrow-next"><i class="' . $next_icon_class . '" aria-hidden="true"></i><span class="elementor-screen-only">' . esc_html__( 'Next', 'elementor-pro' ) . '</span></span>';
		}

		?>

		<div class="hfe-post-navigation elementor-grid">
			<div class="hfe-post-nav-prev hfe-post-nav-link">
				<?php previous_post_link( '%link', $prev_arrow . '<span class="hfe-post-nav-link-prev">' . $prev_label . $prev_title . '</span>' ); ?>
			</div>
			<div class="hfe-post-nav-next hfe-post-nav-link">
				<?php next_post_link( '%link', '<span class="hfe-post-nav-link-next">' . $next_label . $next_title . '</span>' . $next_arrow ); ?>
			</div>
		</div>

		<?php
	}
}
