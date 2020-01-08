<?php
/**
 * Elementor Classes.
 *
 * @package header-footer-elementor
 */

namespace HFE\WidgetsManager\Widgets;
use Elementor\Controls_Manager;
use Elementor\Group_Control_Typography;
use Elementor\Scheme_Typography;
use Elementor\Widget_Base;
use Elementor\Group_Control_Text_Shadow;
use Elementor\Scheme_Color;
use Elementor\Repeater;

if ( ! defined( 'ABSPATH' ) ) {
	exit;   // Exit if accessed directly.
}

/**
 * HFE Post Info
 *
 * HFE widget for Post Info.
 *
 * @since x.x.x
 */
class Post_Info extends Widget_Base {

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
		return 'hfe-post-info';
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
		return __( 'Post Info', 'header-footer-elementor' );
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
	 * Register site title controls controls.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function _register_controls() {

		$this->register_content_controls();
		$this->register_style_controls();
	}

	/**
	 * Register Post Info General Controls.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function register_content_controls() {

		$this->start_controls_section(
			'section_general',
			[
				'label' => __( 'Meta Info', 'header-footer-elementor' ),
			]
		);

			$this->add_control(
				'view',
				[
					'label' => __( 'Layout', 'header-footer-elementor' ),
					'type' => Controls_Manager::SELECT,
					'default' => 'inline',
					'options' => [
						'default' => __( 'Default', 'header-footer-elementor' ),
						'inline' => __( 'Inline', 'header-footer-elementor' ),
					],
					'render_type' => 'template',
				]
			);

			$repeater = new Repeater();

			$repeater->add_control(
				'type',
				[
					'label' => __( 'Type', 'header-footer-elementor' ),
					'type' => Controls_Manager::SELECT,
					'default' => 'date',
					'options' => [
						'author' => __( 'Author', 'header-footer-elementor' ),
						'date' => __( 'Date', 'header-footer-elementor' ),
						'time' => __( 'Time', 'header-footer-elementor' ),
						'comments' => __( 'Comments', 'header-footer-elementor' ),
						'terms' => __( 'Terms', 'header-footer-elementor' ),
						'custom' => __( 'Custom', 'header-footer-elementor' ),
					],
				]
			);

			$repeater->add_control(
				'date_format',
				[
					'label' => __( 'Date Format', 'header-footer-elementor' ),
					'type' => Controls_Manager::SELECT,
					'label_block' => false,
					'default' => 'default',
					'options' => [
						'default' => 'Default',
						'0' => _x( 'January 2, 2020 (F j, Y)', 'Date Format', 'header-footer-elementor' ),
						'1' => '2020-01-02 (Y-m-d)',
						'2' => '01/02/2020 (m/d/Y)',
						'3' => '02/01/2020 (d/m/Y)',
						'custom' => __( 'Custom', 'header-footer-elementor' ),
					],
					'condition' => [
						'type' => 'date',
					],
				]
			);

			$repeater->add_control(
				'custom_date_format',
				[
					'label' => __( 'Custom Date Format', 'header-footer-elementor' ),
					'type' => Controls_Manager::TEXT,
					'default' => 'F j, Y',
					'label_block' => false,
					'condition' => [
						'type' => 'date',
						'date_format' => 'custom',
					],
					'description' => sprintf(
						/* translators: %s: Allowed data letters (see: http://php.net/manual/en/function.date.php). */
						__( 'Use the letters: %s', 'header-footer-elementor' ),
						'l D d j S F m M n Y y'
					),
				]
			);

			$repeater->add_control(
				'time_format',
				[
					'label' => __( 'Time Format', 'header-footer-elementor' ),
					'type' => Controls_Manager::SELECT,
					'label_block' => false,
					'default' => 'default',
					'options' => [
						'default' => 'Default',
						'0' => '5:12 pm (g:i a)',
						'1' => '5:12 PM (g:i A)',
						'2' => '17:12 (H:i)',
						'custom' => __( 'Custom', 'header-footer-elementor' ),
					],
					'condition' => [
						'type' => 'time',
					],
				]
			);
			$repeater->add_control(
				'custom_time_format',
				[
					'label' => __( 'Custom Time Format', 'header-footer-elementor' ),
					'type' => Controls_Manager::TEXT,
					'default' => 'g:i a',
					'placeholder' => 'g:i a',
					'label_block' => false,
					'condition' => [
						'type' => 'time',
						'time_format' => 'custom',
					],
					'description' => sprintf(
						/* translators: %s: Allowed time letters (see: http://php.net/manual/en/function.time.php). */
						__( 'Use the letters: %s', 'header-footer-elementor' ),
						'g G H i a A'
					),
				]
			);

			

			$this->add_control(
				'meta_list',
				[
					'label' => '',
					'type' => Controls_Manager::REPEATER,
					'fields' => $repeater->get_controls(),
					'default' => [
						[
							'type' => 'date',
						],
					],
					'title_field' => '{{{ type }}}',
				]
			);			

		$this->end_controls_section();
	}

	/**
	 * Register Post Info Style Controls.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function register_style_controls() {
		$this->start_controls_section(
			'section_style',
			[
				'label' => __( 'Meta Info', 'header-footer-elementor' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			]
		);

		$this->end_controls_section();
	}

	/**
	 * Render Post Info output on the frontend.
	 *
	 * Written in PHP and used to generate the final HTML.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function render() {

		$settings = $this->get_settings_for_display();

	}

	/**
	 * Render Post Info widget output in the editor.
	 *
	 * Written as a Backbone JavaScript template and used to generate the live preview.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function _content_template() {
	}

}
