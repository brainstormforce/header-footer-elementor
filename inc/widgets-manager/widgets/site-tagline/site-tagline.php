<?php
/**
 * Elementor Classes.
 *
 * @package header-footer-elementor
 */

namespace HFE\WidgetsManager\Widgets\SiteTagline;

use Elementor\Controls_Manager;
use Elementor\Group_Control_Typography;
use Elementor\Core\Kits\Documents\Tabs\Global_Typography;
use Elementor\Group_Control_Text_Shadow;
use Elementor\Core\Kits\Documents\Tabs\Global_Colors;

use HFE\WidgetsManager\Base\Common_Widget;

if ( ! defined( 'ABSPATH' ) ) {
	exit;   // Exit if accessed directly.
}

/**
 * HFE Site tagline widget
 *
 * HFE widget for site tagline
 *
 * @since 1.3.0
 */
class Site_Tagline extends Common_Widget {

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
		return parent::get_widget_slug( 'Site_Tagline' );
	}

	/**
	 * Retrieve the widget tagline.
	 *
	 * @since 1.3.0
	 *
	 * @access public
	 *
	 * @return string Widget tagline.
	 */
	public function get_title() {
		return parent::get_widget_title( 'Site_Tagline' );
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
		return parent::get_widget_icon( 'Site_Tagline' );
	}

	/**
	 * Indicates if the widget's content is dynamic.
	 *
	 * This method returns true if the widget's output is dynamic and should not be cached,
	 * or false if the content is static and can be cached.
	 *
	 * @since 1.6.41
	 * @return bool True for dynamic content, false for static content.
	 */
	protected function is_dynamic_content(): bool { // phpcs:ignore
		return false;
	}

	/**
	 * Register site tagline controls.
	 *
	 * @since 1.5.7
	 * @access protected
	 * @return void
	 */
	protected function register_controls() {
		$this->register_general_content_controls();
		$this->register_pro_promotion_controls();
	}

	/**
	 * Register site tagline General Controls.
	 *
	 * @since 1.3.0
	 * @access protected
	 * @return void
	 */
	protected function register_general_content_controls() {

		$this->start_controls_section(
			'section_general_fields',
			[
				'label' => __( 'Style', 'header-footer-elementor' ),
			]
		);

		$this->add_control(
			'before',
			[
				'label'   => __( 'Before Title Text', 'header-footer-elementor' ),
				'type'    => Controls_Manager::TEXTAREA,
				'rows'    => '1',
				'dynamic' => [
					'active' => true,
				],
			]
		);

		$this->add_control(
			'after',
			[
				'label'   => __( 'After Title Text', 'header-footer-elementor' ),
				'type'    => Controls_Manager::TEXTAREA,
				'rows'    => '1',
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

		$this->add_responsive_control(
			'heading_text_align',
			[
				'label'              => __( 'Alignment', 'header-footer-elementor' ),
				'type'               => Controls_Manager::CHOOSE,
				'options'            => [
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
				'selectors'          => [
					'{{WRAPPER}} .hfe-site-tagline' => 'text-align: {{VALUE}};',
				],
				'frontend_available' => true,
			]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name'     => 'tagline_typography',
				'global'   => [
					'default' => Global_Typography::TYPOGRAPHY_SECONDARY,
				],
				'selector' => '{{WRAPPER}} .hfe-site-tagline',
			]
		);
		$this->add_control(
			'tagline_color',
			[
				'label'     => __( 'Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'global'    => [
					'default' => Global_Colors::COLOR_SECONDARY,
				],
				'selectors' => [
					'{{WRAPPER}} .hfe-site-tagline' => 'color: {{VALUE}};',
					'{{WRAPPER}} .hfe-icon i'       => 'color: {{VALUE}};',
					'{{WRAPPER}} .hfe-icon svg'     => 'fill: {{VALUE}};',
				],
			]
		);

		$this->add_control(
			'icon_color',
			[
				'label'     => __( 'Icon Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'global'    => [
					'default' => Global_Colors::COLOR_PRIMARY,
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
	 * Site Tagline Promotion Controls.
	 *
	 * @since 2.4.0
	 * @access protected
	 */
	protected function register_pro_promotion_controls() {

		if(! defined( 'UAEL_VER' )){
			$this->start_controls_section(
				'section_pro_features_field',
				array(
					'label' => __( 'Go Pro for More Features', 'header-footer-elementor' ),
				)
			);

			$this->add_control(
				'uae_pro_promotion_notice',
				[
					'type' => Controls_Manager::NOTICE,
					'notice_type' => 'info',
					'dismissible' => false,
					'content' => __( '<b>Build smarter and faster</b> with premium widgets, 200+ section blocks, and advanced customisation controls — all available in the <a href="https://ultimateelementor.com/pricing/?utm_source=uae-dashboard&utm_medium=editor&utm_campaign=uae-pro-promotion" target="_blank">UAE Pro</a>.', 'header-footer-elementor' ),
				]
			);


			$this->end_controls_section();
		}
	}

	/**
	 * Render site tagline output on the frontend.
	 *
	 * Written in PHP and used to generate the final HTML.
	 *
	 * @since 1.3.0
	 * @access protected
	 * @return void
	 */
	protected function render() {
		$settings = $this->get_settings_for_display();
		?>
		<div class="hfe-site-tagline hfe-site-tagline-wrapper">
			<?php if ( '' !== $settings['icon']['value'] ) { ?>
				<span class="hfe-icon">
					<?php \Elementor\Icons_Manager::render_icon( $settings['icon'], [ 'aria-hidden' => 'true' ] ); ?>					
				</span>
			<?php } ?>
			<span>
			<?php
			if ( '' !== $settings['before'] ) {
				echo wp_kses_post( $settings['before'] );
			}
			?>
			<?php echo wp_kses_post( get_bloginfo( 'description' ) ); ?>
			<?php
			if ( '' !== $settings['after'] ) {
				echo ' ' . wp_kses_post( $settings['after'] );
			}
			?>
			</span>
		</div>
		<?php
	}

	/**
	 * Render Site Tagline widgets output in the editor.
	 *
	 * Written as a Backbone JavaScript template and used to generate the live preview.
	 *
	 * @since 1.3.0
	 * @access protected
	 * @return void
	 */
	protected function content_template() {
		?>
		<# var iconHTML = elementor.helpers.renderIcon( view, settings.icon, { 'aria-hidden': true }, 'i' , 'object' ); #>
		<div class="hfe-site-tagline hfe-site-tagline-wrapper">
			<# if( '' != settings.icon.value ){ #>
				<span class="hfe-icon">
					{{{iconHTML.value}}} <?php // PHPCS:Ignore WordPressVIPMinimum.Security.Mustache.OutputNotation ?>
				</span>
			<# } #>
			<span>
			<#if ( '' != settings.before ){
				var before = elementor.helpers.sanitize( settings.before ) #>
				{{{ before }}} <?php // PHPCS:Ignore WordPressVIPMinimum.Security.Mustache.OutputNotation ?>
			<#}#>
			<?php echo wp_kses_post( get_bloginfo( 'description' ) ); ?>
			<# if ( '' != settings.after ){
				var after = elementor.helpers.sanitize( settings.after ) #>
				{{{ after }}} <?php // PHPCS:Ignore WordPressVIPMinimum.Security.Mustache.OutputNotation ?>
			<#}#>
			</span>
		</div>
		<?php
	}
}
