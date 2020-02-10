<?php
/**
 * Elementor Classes.
 *
 * @package header-footer-elementor
 */

namespace HFE\WidgetsManager\Widgets;

use Elementor\Controls_Manager;
use Elementor\Group_Control_Text_Shadow;
use Elementor\Widget_Base;
use Elementor\Group_Control_Typography;
use Elementor\Scheme_Typography;
use Elementor\Scheme_Color;

if ( ! defined( 'ABSPATH' ) ) {
	exit;   // Exit if accessed directly.
}

/**
 * HFE Page Title widget
 *
 * HFE widget for Page Title.
 *
 * @since 1.2.0
 */
class Page_Title extends Widget_Base {

	/**
	 * Retrieve the widget name.
	 *
	 * @since 1.2.0
	 *
	 * @access public
	 *
	 * @return string Widget name.
	 */
	public function get_name() {
		return 'heading';
	}

	/**
	 * Retrieve the widget title.
	 *
	 * @since 1.2.0
	 *
	 * @access public
	 *
	 * @return string Widget title.
	 */
	public function get_title() {
		return __( 'Page Title', 'header-footer-elementor' );
	}

	/**
	 * Retrieve the widget icon.
	 *
	 * @since 1.2.0
	 *
	 * @access public
	 *
	 * @return string Widget icon.
	 */
	public function get_icon() {
		return 'hfe-icon-navigation-menu-5';
	}

	/**
	 * Retrieve the list of categories the widget belongs to.
	 *
	 * Used to determine where to display the widget in the editor.
	 *
	 * Note that currently Elementor supports only one category.
	 * When multiple categories passed, Elementor uses the first one.
	 *
	 * @since 1.2.0
	 *
	 * @access public
	 *
	 * @return array Widget categories.
	 */
	public function get_categories() {
		return [ 'hfe-widgets' ];
	}

	/**
	 * Register Page Title controls.
	 *
	 * @since 1.2.0
	 * @access protected
	 */
	protected function _register_controls() {
		$this->register_content_page_title_controls();
		$this->register_page_title_style_controls();
	}

	/**
	 * Register Page Title General Controls.
	 *
	 * @since 1.2.0
	 * @access protected
	 */
	protected function register_content_page_title_controls() {
		$this->start_controls_section(
			'section_general_fields',
			[
				'label' => __( 'Title', 'header-footer-elementor' ),
			]
		);

		$this->add_control(
			'before',
			[
				'label'   => __( 'Before Title text', 'header-footer-elementor' ),
				'type'    => Controls_Manager::TEXT,
				'dynamic' => [
					'active' => true,
				],
			]
		);

		$this->add_control(
			'after',
			[
				'label'   => __( 'After Title Text', 'header-footer-elementor' ),
				'type'    => Controls_Manager::TEXT,
				'dynamic' => [
					'active' => true,
				],
			]
		);

		$this->add_control(
			'link',
			[
				'label'   => __( 'Link', 'header-footer-elementor' ),
				'type'    => Controls_Manager::SELECT,
				'default' => 'default',
				'options' => [
					'default' => __( 'Default', 'header-footer-elementor' ),
					'custom'  => __( 'Custom Link', 'header-footer-elementor' ),
				],
			]
		);

		$this->add_control(
			'custom_link',
			[
				'label'       => __( 'Enter URL', 'header-footer-elementor' ),
				'type'        => Controls_Manager::URL,
				'placeholder' => __( 'https://your-link.com', 'header-footer-elementor' ),
				'dynamic'     => [
					'active' => true,
				],
				'default'     => [
					'url' => '',
				],
				'condition'   => [
					'link' => 'custom',
				],
			]
		);

		$this->add_control(
			'heading_tag',
			[
				'label'   => __( 'HTML Tag', 'header-footer-elementor' ),
				'type'    => Controls_Manager::SELECT,
				'options' => [
					'h1' => __( 'H1', 'header-footer-elementor' ),
					'h2' => __( 'H2', 'header-footer-elementor' ),
					'h3' => __( 'H3', 'header-footer-elementor' ),
					'h4' => __( 'H4', 'header-footer-elementor' ),
					'h5' => __( 'H5', 'header-footer-elementor' ),
					'h6' => __( 'H6', 'header-footer-elementor' ),
				],
				'default' => 'h2',
			]
		);

		$this->add_control(
			'size',
			[
				'label'   => __( 'Size', 'header-footer-elementor' ),
				'type'    => Controls_Manager::SELECT,
				'default' => 'default',
				'options' => [
					'default' => __( 'Default', 'header-footer-elementor' ),
					'small'   => __( 'Small', 'header-footer-elementor' ),
					'medium'  => __( 'Medium', 'header-footer-elementor' ),
					'large'   => __( 'Large', 'header-footer-elementor' ),
					'xl'      => __( 'XL', 'header-footer-elementor' ),
					'xxl'     => __( 'XXL', 'header-footer-elementor' ),
				],
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
				'default'   => '',
				'selectors' => [
					'{{WRAPPER}} .hfe-page-title-wrapper' => 'text-align: {{VALUE}};',
				],
			]
		);

		$this->end_controls_section();
	}
	/**
	 * Register Page Title Style Controls.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function register_page_title_style_controls() {
		$this->start_controls_section(
			'section_title_typography',
			[
				'label' => __( 'Title', 'header-footer-elementor' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			]
		);

			$this->add_group_control(
				Group_Control_Typography::get_type(),
				[
					'name'     => 'title_typography',
					'scheme'   => Scheme_Typography::TYPOGRAPHY_1,
					'selector' => '{{WRAPPER}} .elementor-heading-title, {{WRAPPER}} .hfe-page-title a',
				]
			);

			$this->add_control(
				'title_color',
				[
					'label'     => __( 'Color', 'header-footer-elementor' ),
					'type'      => Controls_Manager::COLOR,
					'scheme'    => [
						'type'  => Scheme_Color::get_type(),
						'value' => Scheme_Color::COLOR_1,
					],
					'selectors' => [
						'{{WRAPPER}} .elementor-heading-title, {{WRAPPER}} .hfe-page-title a' => 'color: {{VALUE}};',
					],
				]
			);

			$this->add_group_control(
				Group_Control_Text_Shadow::get_type(),
				[
					'name'     => 'title_shadow',
					'selector' => '{{WRAPPER}} .elementor-heading-title',
				]
			);

			$this->add_control(
				'blend_mode',
				[
					'label'     => __( 'Blend Mode', 'header-footer-elementor' ),
					'type'      => Controls_Manager::SELECT,
					'options'   => [
						''            => __( 'Normal', 'header-footer-elementor' ),
						'multiply'    => 'Multiply',
						'screen'      => 'Screen',
						'overlay'     => 'Overlay',
						'darken'      => 'Darken',
						'lighten'     => 'Lighten',
						'color-dodge' => 'Color Dodge',
						'saturation'  => 'Saturation',
						'color'       => 'Color',
						'difference'  => 'Difference',
						'exclusion'   => 'Exclusion',
						'hue'         => 'Hue',
						'luminosity'  => 'Luminosity',
					],
					'selectors' => [
						'{{WRAPPER}} .elementor-heading-title' => 'mix-blend-mode: {{VALUE}}',
					],
				]
			);

		$this->end_controls_section();
	}

	/**
	 * Render heading widget output on the frontend.
	 *
	 * Written in PHP and used to generate the final HTML.
	 *
	 * @since 1.0.0
	 * @access protected
	 */
	protected function render() {
		$settings = $this->get_settings_for_display();
		$title    = '';

		$this->add_render_attribute( 'title', 'class', 'elementor-heading-title' );

		if ( ! empty( $settings['size'] ) ) {
			$this->add_render_attribute( 'title', 'class', 'elementor-size-' . $settings['size'] );
		}

		if ( '' !== $settings['before'] ) {
			$title .= $settings['before'] . ' ';
		}

		$title .= wp_kses_post( get_the_title() );

		if ( '' !== $settings['after'] ) {
			$title .= ' ' . $settings['after'];
		}

		if ( 'custom' === $settings['link'] && ( ! empty( $settings['custom_link']['url'] ) ) ) {
			$this->add_render_attribute( 'url', 'href', $settings['custom_link']['url'] );

			if ( $settings['custom_link']['is_external'] ) {
				$this->add_render_attribute( 'url', 'target', '_blank' );
			}

			if ( ! empty( $settings['custom_link']['nofollow'] ) ) {
				$this->add_render_attribute( 'url', 'rel', 'nofollow' );
			}

			$title = sprintf( '<a %1$s>%2$s</a>', $this->get_render_attribute_string( 'url' ), $title );
		} elseif ( 'default' === $settings['link'] ) {
			$this->add_render_attribute( 'url', 'href', get_the_permalink() );

			$title = sprintf( '<a %1$s>%2$s</a>', $this->get_render_attribute_string( 'url' ), $title );
		}

		$title_html = sprintf( '<%1$s %2$s>%3$s</%1$s>', $settings['heading_tag'], $this->get_render_attribute_string( 'title' ), $title );
		?>

		<div class="hfe-page-title hfe-page-title-wrapper elementor-widget-heading">
			<?php echo $title_html; ?>
		</div>
		<?php
	}

	/**
	 * Render heading widget output in the editor.
	 *
	 * Written as a Backbone JavaScript template and used to generate the live preview.
	 *
	 * @since 1.0.0
	 * @access protected
	 */
	protected function _content_template() {
		?>
		<#
		var enable_link = false; 
		if ( ( 'custom' === settings.link && '' !== settings.custom_link.url ) || 'default' === settings.link ) {
			enable_link = true;
		}
		#>
		<div class="hfe-page-title hfe-page-title-wrapper elementor-widget-heading">
			<{{{ settings.heading_tag }}} class="elementor-heading-title elementor-size-{{{ settings.size }}}">
				<# if ( enable_link ) { #>
					<a>
				<# } #>
					<# if ( '' != settings.before ) { #>
						{{{ settings.before }}}
					<# } #>
					<?php echo wp_kses_post( get_the_title() ); ?>
					<# if ( '' != settings.after ) { #>
						{{{ settings.after }}}
					<# } #>
				<# if ( enable_link ) { #>
					</a>
				<# } #>
			</{{{ settings.heading_tag }}}>
		</div>
		<?php
	}
}
