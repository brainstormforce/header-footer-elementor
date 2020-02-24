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

if ( ! defined( 'ABSPATH' ) ) {
	exit;   // Exit if accessed directly.
}

/**
 * HFE Site title widget
 *
 * HFE widget for site title
 *
 * @since 1.3.0
 */
class Site_Title extends Widget_Base {

	/**
	 * Retrieve the widget name.
	 *
	 * @since 1.3.0
	 *
	 * @access public
	 *
	 * @return string Widget name.
	 */
	public function get_name() {
		return 'hfe-site-title';
	}

	/**
	 * Retrieve the widget title.
	 *
	 * @since 1.3.0
	 *
	 * @access public
	 *
	 * @return string Widget title.
	 */
	public function get_title() {
		return __( 'Site Title', 'header-footer-elementor' );
	}

	/**
	 * Retrieve the widget icon.
	 *
	 * @since 1.3.0
	 *
	 * @access public
	 *
	 * @return string Widget icon.
	 */
	public function get_icon() {
		return 'hfe-icon-site-title';
	}

	/**
	 * Retrieve the list of categories the widget belongs to.
	 *
	 * Used to determine where to display the widget in the editor.
	 *
	 * Note that currently Elementor supports only one category.
	 * When multiple categories passed, Elementor uses the first one.
	 *
	 * @since 1.3.0
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
	 * @since 1.3.0
	 * @access protected
	 */
	protected function _register_controls() {

		$this->register_general_content_controls();
		$this->register_heading_typo_content_controls();
	}

	/**
	 * Register Advanced Heading General Controls.
	 *
	 * @since 1.3.0
	 * @access protected
	 */
	protected function register_general_content_controls() {

		$this->start_controls_section(
			'section_general_fields',
			[
				'label' => __( 'General', 'header-footer-elementor' ),
			]
		);

		$this->add_control(
			'before',
			[
				'label'   => __( 'Before Title Text', 'header-footer-elementor' ),
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
			'icon',
			[
				'label'       => __( 'Icon', 'header-footer-elementor' ),
				'type'        => Controls_Manager::ICONS,
				'label_block' => 'true',
			]
		);

		$this->add_control(
			'icon_indent',
			[
				'label'     => __( 'Icon Spacing', 'header-footer-elementor' ),
				'type'      => Controls_Manager::SLIDER,
				'range'     => [
					'px' => [
						'max' => 50,
					],
				],
				'condition' => [
					'icon[value]!' => '',
				],
				'selectors' => [
					'{{WRAPPER}} .hfe-icon' => 'margin-right: {{SIZE}}{{UNIT}};',
				],
			]
		);

		$this->add_control(
			'custom_link',
			[
				'label'   => __( 'Link', 'header-footer-elementor' ),
				'type'    => Controls_Manager::SELECT,
				'options' => [
					'custom'  => __( 'Custom URL', 'header-footer-elementor' ),
					'default' => __( 'Default', 'header-footer-elementor' ),
				],
				'default' => 'default',
			]
		);

		$this->add_control(
			'heading_link',
			[
				'label'       => __( 'Link', 'header-footer-elementor' ),
				'type'        => Controls_Manager::URL,
				'placeholder' => __( 'https://your-link.com', 'header-footer-elementor' ),
				'dynamic'     => [
					'active' => true,
				],
				'default'     => [
					'url' => get_home_url(),
				],
				'condition'   => [
					'custom_link' => 'custom',
				],
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

		$this->add_responsive_control(
			'heading_text_align',
			[
				'label'        => __( 'Alignment', 'header-footer-elementor' ),
				'type'         => Controls_Manager::CHOOSE,
				'options'      => [
					'left'    => [
						'title' => __( 'Left', 'header-footer-elementor' ),
						'icon'  => 'fa fa-align-left',
					],
					'center'  => [
						'title' => __( 'Center', 'header-footer-elementor' ),
						'icon'  => 'fa fa-align-center',
					],
					'right'   => [
						'title' => __( 'Right', 'header-footer-elementor' ),
						'icon'  => 'fa fa-align-right',
					],
					'justify' => [
						'title' => __( 'Justify', 'header-footer-elementor' ),
						'icon'  => 'fa fa-align-justify',
					],
				],
				'selectors'    => [
					'{{WRAPPER}} .hfe-heading' => 'text-align: {{VALUE}};',
				],
				'prefix_class' => 'hfe%s-heading-align-',
			]
		);
		$this->end_controls_section();
	}


	/**
	 * Register Advanced Heading Typography Controls.
	 *
	 * @since 1.3.0
	 * @access protected
	 */
	protected function register_heading_typo_content_controls() {
		$this->start_controls_section(
			'section_heading_typography',
			[
				'label' => __( 'Title', 'header-footer-elementor' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			]
		);
		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name'     => 'heading_typography',
				'scheme'   => Scheme_Typography::TYPOGRAPHY_1,
				'selector' => '{{WRAPPER}} .elementor-heading-title, {{WRAPPER}} .hfe-heading a',
			]
		);
		$this->add_control(
			'heading_color',
			[
				'label'     => __( 'Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'scheme'    => [
					'type'  => Scheme_Color::get_type(),
					'value' => Scheme_Color::COLOR_1,
				],
				'selectors' => [
					'{{WRAPPER}} .hfe-heading-text' => 'color: {{VALUE}};',
					'{{WRAPPER}} .hfe-icon i'       => 'color: {{VALUE}};',
					'{{WRAPPER}} .hfe-icon svg'     => 'fill: {{VALUE}};',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Text_Shadow::get_type(),
			[
				'name'     => 'heading_shadow',
				'selector' => '{{WRAPPER}} .hfe-heading-text',
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
					'{{WRAPPER}} .hfe-heading-text' => 'mix-blend-mode: {{VALUE}}',
				],
				'separator' => 'none',
			]
		);
		$this->end_controls_section();

		$this->start_controls_section(
			'section_icon',
			[
				'label'     => __( 'Icon', 'header-footer-elementor' ),
				'tab'       => Controls_Manager::TAB_STYLE,
				'condition' => [
					'icon[value]!' => '',
				],
			]
		);
		$this->add_control(
			'icon_color',
			[
				'label'     => __( 'Icon Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'scheme'    => [
					'type'  => Scheme_Color::get_type(),
					'value' => Scheme_Color::COLOR_1,
				],
				'condition' => [
					'icon[value]!' => '',
				],
				'default'   => '',
				'selectors' => [
					'{{WRAPPER}} .hfe-icon i'   => 'color: {{VALUE}};',
					'{{WRAPPER}} .hfe-icon svg' => 'fill: {{VALUE}};',
				],
			]
		);
		$this->add_control(
			'icons_hover_color',
			[
				'label'     => __( 'Icon Hover Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'condition' => [
					'icon[value]!' => '',
				],
				'default'   => '',
				'selectors' => [
					'{{WRAPPER}} .hfe-icon:hover i'   => 'color: {{VALUE}};',
					'{{WRAPPER}} .hfe-icon:hover svg' => 'fill: {{VALUE}};',
				],
			]
		);
		$this->end_controls_section();
	}

	/**
	 * Render Heading output on the frontend.
	 *
	 * Written in PHP and used to generate the final HTML.
	 *
	 * @since 1.3.0
	 * @access protected
	 */
	protected function render() {

		$settings = $this->get_settings();
		$title    = get_bloginfo( 'name' );

		$this->add_inline_editing_attributes( 'heading_title', 'basic' );

		if ( ! empty( $settings['size'] ) ) {
			$this->add_render_attribute( 'title', 'class', 'elementor-size-' . $settings['size'] );
		}

		if ( ! empty( $settings['heading_link']['url'] ) ) {
			$this->add_render_attribute( 'url', 'href', $settings['heading_link']['url'] );

			if ( $settings['heading_link']['is_external'] ) {
				$this->add_render_attribute( 'url', 'target', '_blank' );
			}

			if ( ! empty( $settings['heading_link']['nofollow'] ) ) {
				$this->add_render_attribute( 'url', 'rel', 'nofollow' );
			}
			$link = $this->get_render_attribute_string( 'url' );
		}
		?>

		<div class="hfe-module-content hfe-heading-wrapper elementor-widget-heading">
		<?php if ( ! empty( $settings['heading_link']['url'] ) && 'custom' === $settings['custom_link'] ) { ?>
					<a <?php echo esc_attr( $link ); ?> >
				<?php } else { ?>
					<a href="<?php echo get_home_url(); ?>">
				<?php } ?>
			<<?php echo wp_kses_post( $settings['heading_tag'] ); ?> class="hfe-heading elementor-heading-title elementor-size-<?php echo $settings['size']; ?>">
				<?php if ( '' !== $settings['icon']['value'] ) { ?>
					<span class="hfe-icon">
						<?php \Elementor\Icons_Manager::render_icon( $settings['icon'], [ 'aria-hidden' => 'true' ] ); ?>					
					</span>
				<?php } ?>
					<span class="hfe-heading-text" >
					<?php
					if ( '' !== $settings['before'] ) {
						echo wp_kses_post( $settings['before'] );
					}
					?>
					<?php echo wp_kses_post( $title ); ?>
					<?php
					if ( '' !== $settings['after'] ) {
						echo wp_kses_post( $settings['after'] );
					}
					?>
					</span>			
			</<?php echo wp_kses_post( $settings['heading_tag'] ); ?>>
			</a>		
		</div>
		<?php
	}
		/**
		 * Render site title output in the editor.
		 *
		 * Written as a Backbone JavaScript template and used to generate the live preview.
		 *
		 * @since 1.3.0
		 * @access protected
		 */
	protected function content_template() {
		?>
		<#
		if ( '' == settings.heading_title ) {
			return;
		}
		if ( '' == settings.size ){
			return;
		}
		if ( '' != settings.heading_link.url ) {
			view.addRenderAttribute( 'url', 'href', settings.heading_link.url );
		}
		var iconHTML = elementor.helpers.renderIcon( view, settings.icon, { 'aria-hidden': true }, 'i' , 'object' );
		#>
		<div class="hfe-module-content hfe-heading-wrapper elementor-widget-heading">
				<# if ( '' != settings.heading_link.url ) { #>
					<a {{{ view.getRenderAttributeString( 'url' ) }}} >
				<# } #>
				<{{{ settings.heading_tag }}} class="hfe-heading elementor-heading-title elementor-size-{{{ settings.size }}}">
				<# if( '' != settings.icon.value ){ #>
				<span class="hfe-icon">
					{{{iconHTML.value}}}					
				</span>
				<# } #>
				<span class="hfe-heading-text  elementor-heading-title" data-elementor-setting-key="heading_title" data-elementor-inline-editing-toolbar="basic" >
				<#if ( '' != settings.before ){#>
					{{{ settings.before }}} 
				<#}#>
				<?php echo wp_kses_post( get_bloginfo( 'name' ) ); ?>
				<# if ( '' != settings.after ){#>
					{{{ settings.after }}}
				<#}#>
				</span>
			</{{{ settings.heading_tag }}}>
			<# if ( '' != settings.heading_link.url ) { #>
				</a>
			<# } #>
		</div>
		<?php
	}

	/**
	 * Render site title output in the editor.
	 *
	 * Written as a Backbone JavaScript template and used to generate the live preview.
	 *
	 * Remove this after Elementor v3.3.0
	 *
	 * @since 1.3.0
	 * @access protected
	 */
	protected function _content_template() {
		$this->content_template();
	}
}
