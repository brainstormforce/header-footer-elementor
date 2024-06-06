<?php
/**
 * Elementor Classes.
 *
 * @package header-footer-elementor
 */

namespace HFE\WidgetsManager\Widgets;

use Elementor\Controls_Manager;
use Elementor\Group_Control_Typography;
use Elementor\Core\Kits\Documents\Tabs\Global_Typography;
use Elementor\Widget_Base;
use Elementor\Group_Control_Text_Shadow;
use Elementor\Core\Kits\Documents\Tabs\Global_Colors;

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
class Site_Tagline extends Widget_Base {

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
		return 'hfe-site-tagline';
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
		return __( 'Site Tagline', 'header-footer-elementor' );
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
		return 'hfe-icon-site-tagline';
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
		return array( 'hfe-widgets' );
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
			array(
				'label' => __( 'Style', 'header-footer-elementor' ),
			)
		);

		$this->add_control(
			'before',
			array(
				'label'   => __( 'Before Title Text', 'header-footer-elementor' ),
				'type'    => Controls_Manager::TEXTAREA,
				'rows'    => '1',
				'dynamic' => array(
					'active' => true,
				),
			)
		);

		$this->add_control(
			'after',
			array(
				'label'   => __( 'After Title Text', 'header-footer-elementor' ),
				'type'    => Controls_Manager::TEXTAREA,
				'rows'    => '1',
				'dynamic' => array(
					'active' => true,
				),
			)
		);

		$this->add_control(
			'icon',
			array(
				'label'       => __( 'Icon', 'header-footer-elementor' ),
				'type'        => Controls_Manager::ICONS,
				'label_block' => 'true',
			)
		);

		$this->add_control(
			'icon_indent',
			array(
				'label'     => __( 'Icon Spacing', 'header-footer-elementor' ),
				'type'      => Controls_Manager::SLIDER,
				'range'     => array(
					'px' => array(
						'max' => 50,
					),
				),
				'condition' => array(
					'icon[value]!' => '',
				),
				'selectors' => array(
					'{{WRAPPER}} .hfe-icon' => 'margin-right: {{SIZE}}{{UNIT}};',
				),
			)
		);

		$this->add_responsive_control(
			'heading_text_align',
			array(
				'label'              => __( 'Alignment', 'header-footer-elementor' ),
				'type'               => Controls_Manager::CHOOSE,
				'options'            => array(
					'left'    => array(
						'title' => __( 'Left', 'header-footer-elementor' ),
						'icon'  => 'fa fa-align-left',
					),
					'center'  => array(
						'title' => __( 'Center', 'header-footer-elementor' ),
						'icon'  => 'fa fa-align-center',
					),
					'right'   => array(
						'title' => __( 'Right', 'header-footer-elementor' ),
						'icon'  => 'fa fa-align-right',
					),
					'justify' => array(
						'title' => __( 'Justify', 'header-footer-elementor' ),
						'icon'  => 'fa fa-align-justify',
					),
				),
				'selectors'          => array(
					'{{WRAPPER}} .hfe-site-tagline' => 'text-align: {{VALUE}};',
				),
				'frontend_available' => true,
			)
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'     => 'tagline_typography',
				'global'   => array(
					'default' => Global_Typography::TYPOGRAPHY_SECONDARY,
				),
				'selector' => '{{WRAPPER}} .hfe-site-tagline',
			)
		);
		$this->add_control(
			'tagline_color',
			array(
				'label'     => __( 'Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'global'    => array(
					'default' => Global_Colors::COLOR_SECONDARY,
				),
				'selectors' => array(
					'{{WRAPPER}} .hfe-site-tagline' => 'color: {{VALUE}};',
					'{{WRAPPER}} .hfe-icon i'       => 'color: {{VALUE}};',
					'{{WRAPPER}} .hfe-icon svg'     => 'fill: {{VALUE}};',
				),
			)
		);

		$this->add_control(
			'icon_color',
			array(
				'label'     => __( 'Icon Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'global'    => array(
					'default' => Global_Colors::COLOR_PRIMARY,
				),
				'condition' => array(
					'icon[value]!' => '',
				),
				'default'   => '',
				'selectors' => array(
					'{{WRAPPER}} .hfe-icon i'   => 'color: {{VALUE}};',
					'{{WRAPPER}} .hfe-icon svg' => 'fill: {{VALUE}};',
				),
			)
		);
		$this->add_control(
			'icons_hover_color',
			array(
				'label'     => __( 'Icon Hover Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'condition' => array(
					'icon[value]!' => '',
				),
				'default'   => '',
				'selectors' => array(
					'{{WRAPPER}} .hfe-icon:hover i'   => 'color: {{VALUE}};',
					'{{WRAPPER}} .hfe-icon:hover svg' => 'fill: {{VALUE}};',
				),
			)
		);

		$this->end_controls_section();
	}

	/**
	 * Render site tagline output on the frontend.
	 *
	 * Written in PHP and used to generate the final HTML.
	 *
	 * @since 1.3.0
	 * @access protected
	 */
	protected function render() {
		$settings = $this->get_settings_for_display();
		?>
		<div class="hfe-site-tagline hfe-site-tagline-wrapper">
			<?php if ( '' !== $settings['icon']['value'] ) { ?>
				<span class="hfe-icon">
					<?php \Elementor\Icons_Manager::render_icon( $settings['icon'], array( 'aria-hidden' => 'true' ) ); ?>					
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
			<#if ( '' != settings.before ){#>
				{{{ settings.before}}} <?php // PHPCS:Ignore WordPressVIPMinimum.Security.Mustache.OutputNotation ?>
			<#}#>
			<?php echo wp_kses_post( get_bloginfo( 'description' ) ); ?>
			<# if ( '' != settings.after ){#>
				{{{ settings.after }}} <?php // PHPCS:Ignore WordPressVIPMinimum.Security.Mustache.OutputNotation ?>
			<#}#>
			</span>
		</div>
		<?php
	}
}
