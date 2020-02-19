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
		return 'hfe-icon-page-title';
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
			'new_page_title_select_icon',
			[
				'label'       => __( 'Select Icon', 'header-footer-elementor' ),
				'type'        => Controls_Manager::ICONS,
				'default'     => [
					'value'   => 'fa fa-star',
					'library' => 'fa-solid',
				],
				'render_type' => 'template',
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
		$settings    = $this->get_settings_for_display();
		$title       = '';
		$enable_link = false;
		?>
		<div class="hfe-page-title hfe-page-title-wrapper elementor-widget-heading">
			<<?php echo wp_kses_post( $settings['heading_tag'] ); ?> class="elementor-heading-title elementor-size-<?php echo $settings['size']; ?>">
			<?php if ( '' !== $settings['new_page_title_select_icon']['value'] ) { ?>
					<span class="hfe-page-title-icon">
						<?php \Elementor\Icons_Manager::render_icon( $settings['new_page_title_select_icon'], [ 'aria-hidden' => 'true' ] ); ?>             </span>
			<?php } ?>
				<?php if ( $enable_link ) { ?>
					<a>
				<?php } ?>
					<?php if ( '' != $settings['before'] ) { ?>
						<?php echo $settings['before']; ?>
					<?php } ?>
				<?php echo wp_kses_post( get_the_title() ); ?>
					<?php if ( '' != $settings['after'] ) { ?>
						<?php echo $settings['after']; ?>
					<?php } ?>
				<?php if ( $enable_link ) { ?>
					</a>
				<?php } ?>
			</ <?php echo $settings['heading_tag']; ?> > 
			</div>
		<?php
	}

	/**
	 * Render page title output in the editor.
	 *
	 * Written as a Backbone JavaScript template and used to generate the live preview.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function content_template() {
		?>
		<#
		var enable_link = false; 
		if ( ( 'custom' === settings.link && '' !== settings.custom_link.url ) || 'default' === settings.link ) {
			enable_link = true;
		}
		var iconHTML = elementor.helpers.renderIcon( view, settings.new_page_title_select_icon, { 'aria-hidden': true }, 'i' , 'object' );
		#>
		<div class="hfe-page-title hfe-page-title-wrapper elementor-widget-heading">
			<{{{ settings.heading_tag }}} class="elementor-heading-title elementor-size-{{{ settings.size }}}">
			<# if( '' != settings.new_page_title_select_icon.value ){ #>
					<span class="hfe-page-title-icon">
						{{{iconHTML.value}}}                    
					</span>
				<# } #>
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

	/**
	 * Render page title output in the editor.
	 *
	 * Written as a Backbone JavaScript template and used to generate the live preview.
	 *
	 * Remove this after Elementor v3.3.0
	 *
	 * @since 1.0.0
	 * @access protected
	 */
	protected function _content_template() {
		$this->content_template();
	}
}
