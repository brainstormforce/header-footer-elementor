<?php
/**
 * Elementor Classes.
 *
 * @package header-footer-elementor
 */

namespace HFE\WidgetsManager\Widgets;
use Elementor\Controls_Manager;
use Elementor\Core\Schemes;
use Elementor\Group_Control_Typography;
use Elementor\Widget_Base;

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}
/**
 * HFE Post content.
 *
 * HFE widget for Post Content.
 *
 * @since x.x.x
 */
class Post_Content extends Widget_Base {
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
		return 'post-content';
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
		return __( 'Post Content', 'header-footer-elementor' );
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
	 * Register Post content controls controls.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function _register_controls() {
		$this->register_general_style_controls();
	}

	/**
	 *
	 * Register Post content General Controls.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function register_general_style_controls() {
		$this->start_controls_section(
			'section_general_fields',
			[
				'label' => __( 'Style', 'header-footer-elementor' ),
			]
		);
		$this->add_responsive_control(
			'align',
			[
				'label'     => __( 'Alignment', 'header-footer-elementor' ),
				'type'      => Controls_Manager::CHOOSE,
				'options'   => [
					'left'    => [
						'title' => __( 'Left', 'header-footer-elementor' ),
						'icon'  => 'eicon-text-align-left',
					],
					'center'  => [
						'title' => __( 'Center', 'header-footer-elementor' ),
						'icon'  => 'eicon-text-align-center',
					],
					'right'   => [
						'title' => __( 'Right', 'header-footer-elementor' ),
						'icon'  => 'eicon-text-align-right',
					],
					'justify' => [
						'title' => __( 'Justified', 'header-footer-elementor' ),
						'icon'  => 'eicon-text-align-justify',
					],
				],
				'selectors' => [
					'{{WRAPPER}} .hfe-post-content-parent' => 'text-align: {{VALUE}};',
				],
			]
		);
		$this->add_control(
			'text_color',
			[
				'label'     => __( 'Text Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'default'   => '',
				'selectors' => [
					'{{WRAPPER}} .hfe-post-content-parent p' => 'color: {{VALUE}};',
				],
				'scheme'    => [
					'type'  => Schemes\Color::get_type(),
					'value' => Schemes\Color::COLOR_3,
				],
			]
		);
		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name'     => 'typography',
				'scheme'   => Schemes\Typography::TYPOGRAPHY_3,
				'selector' => '{{WRAPPER}} .hfe-post-content-parent p',
			]
		);
		$this->end_controls_section();
	}
	/**
	 * Render Post Content output on the frontend.
	 *
	 * Written in PHP and used to generate the final HTML.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function render() {
		$settings = $this->get_settings_for_display();
		$this->add_render_attribute( 'hfe_post_content_parent', 'class', 'hfe-post-content-parent' );
		?>
		<div <?php echo $this->get_render_attribute_string( 'hfe_post_content_parent' ); ?>><?php echo the_content(); ?></div>
		<?php
	}
	/**
	 * Render Post Content output in the editor.
	 *
	 * Written as a Backbone JavaScript template and used to generate the live preview.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function _content_template() {}
}
