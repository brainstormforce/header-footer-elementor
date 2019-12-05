<?php
/**
 * Elementor Classes.
 *
 * @package Header Footer Elementor
 */

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
 * Elementor Hello World
 *
 * Elementor widget for hello world.
 *
 * @since x.x.x
 */
class CopyRight extends Widget_Base {
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
		return 'copyright';
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
		return __( 'CopyRight', 'hfe', 'header-footer-elementor' );
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
		return 'eicon-posts-ticker';
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
		return array( 'HFE' );
	}
	/**
	 * Register Retina Logo controls.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function _register_controls() {
		$this->register_content_retina_image_controls();
	}
	/**
	 * Register Retina Logo General Controls.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function register_content_retina_image_controls() {
		$this->start_controls_section(
			'section_title',
			array(
				'label' => __( 'CopyRight', 'hfe', 'header-footer-elementor' ),
			)
		);

		$this->add_control(
			'shortcode',
			array(
				'label'   => __( 'CopyRight Title', 'hfe', 'header-footer-elementor' ),
				'type'    => Controls_Manager::TEXTAREA,
				'dynamic' => array(
					'active' => true,
				),
				'default' => __( 'Copyright © [hfe_current_year] [hfe_site_title] | Powered by [hfe_theme_author]', 'hfe', 'header-footer-elementor' ),
			)
		);

		$this->add_responsive_control(
			'align',
			array(
				'label'     => __( 'Alignment', 'hfe', 'header-footer-elementor' ),
				'type'      => Controls_Manager::CHOOSE,
				'options'   => array(
					'left'   => array(
						'title' => __( 'Left', 'hfe', 'header-footer-elementor' ),
						'icon'  => 'fa fa-align-left',
					),
					'center' => array(
						'title' => __( 'Center', 'hfe', 'header-footer-elementor' ),
						'icon'  => 'fa fa-align-center',
					),
					'right'  => array(
						'title' => __( 'Right', 'hfe', 'header-footer-elementor' ),
						'icon'  => 'fa fa-align-right',
					),
				),
				'selectors' => array(
					'{{WRAPPER}}' => 'text-align: {{VALUE}};',
				),
			)
		);

		$this->add_control(
			'link_to',
			array(
				'label'   => __( 'Link', 'hfe', 'header-footer-elementor' ),
				'type'    => Controls_Manager::SELECT,
				'default' => 'none',
				'options' => array(
					'none'   => __( 'None', 'hfe', 'header-footer-elementor' ),
					'custom' => __( 'Custom URL', 'hfe', 'header-footer-elementor' ),
				),
			)
		);
		$this->add_control(
			'link',
			array(
				'label'       => __( 'Link', 'hfe', 'header-footer-elementor' ),
				'type'        => Controls_Manager::URL,
				'placeholder' => __( 'https://your-link.com', 'hfe', 'header-footer-elementor' ),
				'condition'   => array(
					'link_to' => 'custom',
				),
				'show_label'  => false,
			)
		);

		$this->add_control(
			'title_color',
			array(
				'label'     => __( 'Text Color', 'hfe', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'scheme'    => array(
					'type'  => Scheme_Color::get_type(),
					'value' => Scheme_Color::COLOR_1,
				),
				'selectors' => array(
					// Stronger selector to avoid section style from overwriting.
					'{{WRAPPER}}' => 'color: {{VALUE}};',
				),
			)
		);

		$this->add_control(
			'background_color',
			array(
				'label'     => __( 'Background Color', 'hfe', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					// Stronger selector to avoid section style from overwriting.
					'{{WRAPPER}}.elementor-widget-copyright .elementor-widget-container' => 'background-color: {{VALUE}};',
				),
			)
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'     => 'caption_typography',
				'selector' => '{{WRAPPER}} .hfe-heading-title,{{WRAPPER}} .hfe-shortcode',
				'scheme'   => Scheme_Typography::TYPOGRAPHY_3,
			)
		);

	}

	/**
	 * Render CopyRight output on the frontend.
	 *
	 * Written in PHP and used to generate the final HTML.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function render() {
		$settings = $this->get_settings_for_display();
		$link     = $settings['link'];

		$copy_right_shortcode = do_shortcode( shortcode_unautop( $settings['shortcode'] ) );
		?>
		<div class="hfe-shortcode">
			<a href="<?php echo $link['url']; ?>">
			<?php echo $copy_right_shortcode; ?>		
			</a>
		</div>
		<?php
	}

	/**
	 * Render shortcode widget as plain content.
	 *
	 * Override the default behavior by printing the shortcode instead of rendering it.
	 *
	 * @since 1.0.0
	 * @access public
	 */
	public function render_plain_content() {
		// In plain mode, render without shortcode.
		echo $this->get_settings( 'shortcode' );
	}

	/**
	 * Render heading widget output in the editor.
	 *
	 * Written as a Backbone JavaScript template and used to generate the live preview.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function _content_template() {
		?>
		<div class="hfe-shortcode">
			<a href="{{settings.link}}">{{{settings.shortcode}}}</a>
		</div>
		<?php
	}
}
