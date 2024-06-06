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

use HFE\WidgetsManager\Widgets_Loader;

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
		return array( 'hfe-widgets' );
	}

	/**
	 * Register site title controls.
	 *
	 * @since 1.5.7
	 * @access protected
	 * @return void
	 */
	protected function register_controls(): void {

		$this->register_general_content_controls();
		$this->register_heading_typo_content_controls();
	}

	/**
	 * Register Advanced Heading General Controls.
	 *
	 * @since 1.3.0
	 * @access protected
	 * @return void
	 */
	protected function register_general_content_controls(): void {

		$this->start_controls_section(
			'section_general_fields',
			array(
				'label' => __( 'General', 'header-footer-elementor' ),
			)
		);

		$this->add_control(
			'before',
			array(
				'label'   => __( 'Before Title Text', 'header-footer-elementor' ),
				'type'    => Controls_Manager::TEXT,
				'dynamic' => array(
					'active' => true,
				),
			)
		);

		$this->add_control(
			'after',
			array(
				'label'   => __( 'After Title Text', 'header-footer-elementor' ),
				'type'    => Controls_Manager::TEXT,
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

		$this->add_control(
			'custom_link',
			array(
				'label'   => __( 'Link', 'header-footer-elementor' ),
				'type'    => Controls_Manager::SELECT,
				'options' => array(
					'custom'  => __( 'Custom URL', 'header-footer-elementor' ),
					'default' => __( 'Default', 'header-footer-elementor' ),
				),
				'default' => 'default',
			)
		);

		$this->add_control(
			'heading_link',
			array(
				'label'       => __( 'Link', 'header-footer-elementor' ),
				'type'        => Controls_Manager::URL,
				'placeholder' => __( 'https://your-link.com', 'header-footer-elementor' ),
				'dynamic'     => array(
					'active' => true,
				),
				'default'     => array(
					'url' => get_home_url(),
				),
				'condition'   => array(
					'custom_link' => 'custom',
				),
			)
		);

		$this->add_control(
			'size',
			array(
				'label'   => __( 'Size', 'header-footer-elementor' ),
				'type'    => Controls_Manager::SELECT,
				'default' => 'default',
				'options' => array(
					'default' => __( 'Default', 'header-footer-elementor' ),
					'small'   => __( 'Small', 'header-footer-elementor' ),
					'medium'  => __( 'Medium', 'header-footer-elementor' ),
					'large'   => __( 'Large', 'header-footer-elementor' ),
					'xl'      => __( 'XL', 'header-footer-elementor' ),
					'xxl'     => __( 'XXL', 'header-footer-elementor' ),
				),
			)
		);

		$this->add_control(
			'heading_tag',
			array(
				'label'   => __( 'HTML Tag', 'header-footer-elementor' ),
				'type'    => Controls_Manager::SELECT,
				'options' => array(
					'h1' => __( 'H1', 'header-footer-elementor' ),
					'h2' => __( 'H2', 'header-footer-elementor' ),
					'h3' => __( 'H3', 'header-footer-elementor' ),
					'h4' => __( 'H4', 'header-footer-elementor' ),
					'h5' => __( 'H5', 'header-footer-elementor' ),
					'h6' => __( 'H6', 'header-footer-elementor' ),
				),
				'default' => 'h2',
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
					'{{WRAPPER}} .hfe-heading' => 'text-align: {{VALUE}};',
				),
				'prefix_class'       => 'hfe%s-heading-align-',
				'frontend_available' => true,
			)
		);
		$this->end_controls_section();
	}


	/**
	 * Register Advanced Heading Typography Controls.
	 *
	 * @since 1.3.0
	 * @access protected
	 * @return void
	 */
	protected function register_heading_typo_content_controls(): void {
		$this->start_controls_section(
			'section_heading_typography',
			array(
				'label' => __( 'Title', 'header-footer-elementor' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			)
		);
		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'     => 'heading_typography',
				'global'   => array(
					'default' => Global_Typography::TYPOGRAPHY_PRIMARY,
				),
				'selector' => '{{WRAPPER}} .elementor-heading-title, {{WRAPPER}} .hfe-heading a',
			)
		);
		$this->add_control(
			'heading_color',
			array(
				'label'     => __( 'Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'global'    => array(
					'default' => Global_Colors::COLOR_PRIMARY,
				),
				'selectors' => array(
					'{{WRAPPER}} .hfe-heading-text' => 'color: {{VALUE}};',
					'{{WRAPPER}} .hfe-icon i'       => 'color: {{VALUE}};',
					'{{WRAPPER}} .hfe-icon svg'     => 'fill: {{VALUE}};',
				),
			)
		);

		$this->add_group_control(
			Group_Control_Text_Shadow::get_type(),
			array(
				'name'     => 'heading_shadow',
				'selector' => '{{WRAPPER}} .hfe-heading-text',
			)
		);

		$this->add_control(
			'blend_mode',
			array(
				'label'     => __( 'Blend Mode', 'header-footer-elementor' ),
				'type'      => Controls_Manager::SELECT,
				'options'   => array(
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
				),
				'selectors' => array(
					'{{WRAPPER}} .hfe-heading-text' => 'mix-blend-mode: {{VALUE}}',
				),
				'separator' => 'none',
			)
		);
		$this->end_controls_section();

		$this->start_controls_section(
			'section_icon',
			array(
				'label'     => __( 'Icon', 'header-footer-elementor' ),
				'tab'       => Controls_Manager::TAB_STYLE,
				'condition' => array(
					'icon[value]!' => '',
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
	 * Render Heading output on the frontend.
	 *
	 * Written in PHP and used to generate the final HTML.
	 *
	 * @since 1.3.0
	 * @access protected
	 * @return void
	 */
	protected function render(): void {

		$settings = $this->get_settings();
		$title    = get_bloginfo( 'name' );

		$this->add_inline_editing_attributes( 'heading_title', 'basic' );

		if ( ! empty( $settings['size'] ) ) {
			$this->add_render_attribute( 'title', 'class', 'elementor-size-' . $settings['size'] );
		}

		if ( ! empty( $settings['heading_link']['url'] ) ) {
			$this->add_link_attributes( 'url', $settings['heading_link'] );
		}

		$heading_size_tag = Widgets_Loader::validate_html_tag( $settings['heading_tag'] );
		?>

		<div class="hfe-module-content hfe-heading-wrapper elementor-widget-heading">
		<?php if ( ! empty( $settings['heading_link']['url'] ) && 'custom' === $settings['custom_link'] ) { ?>
					<a <?php echo wp_kses_post( $this->get_render_attribute_string( 'url' ) ); ?>>
				<?php } else { ?>
					<a href="<?php echo esc_url( get_home_url() ); ?>">
				<?php } ?>
			<<?php echo esc_attr( $heading_size_tag ); ?> class="hfe-heading elementor-heading-title elementor-size-<?php echo esc_attr( $settings['size'] ); ?>">
				<?php if ( '' !== $settings['icon']['value'] ) { ?>
					<span class="hfe-icon">
						<?php \Elementor\Icons_Manager::render_icon( $settings['icon'], array( 'aria-hidden' => 'true' ) ); ?>					
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
			</<?php echo esc_attr( $heading_size_tag ); ?>>
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
		 * @return void
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

		var headingSizeTag = settings.heading_tag;

		if ( typeof elementor.helpers.validateHTMLTag === "function" ) { 
			headingSizeTag = elementor.helpers.validateHTMLTag( headingSizeTag );
		} else if( HfeWidgetsData.allowed_tags ) {
			headingSizeTag = HfeWidgetsData.allowed_tags.includes( headingSizeTag.toLowerCase() ) ? headingSizeTag : 'div';
		}

		#>
		<div class="hfe-module-content hfe-heading-wrapper elementor-widget-heading">
				<# if ( '' != settings.heading_link.url ) { #>
					<a {{{ view.getRenderAttributeString( 'url' ) }}} > <?php // PHPCS:Ignore WordPressVIPMinimum.Security.Mustache.OutputNotation ?>
				<# } #>
				<{{{ headingSizeTag }}} class="hfe-heading elementor-heading-title elementor-size-{{{ settings.size }}}"> <?php //phpcs:ignore WordPressVIPMinimum.Security.Mustache.OutputNotation ?>
				<# if( '' != settings.icon.value ){ #>
				<span class="hfe-icon">
					{{{ iconHTML.value }}}	<?php // PHPCS:Ignore WordPressVIPMinimum.Security.Mustache.OutputNotation ?>			
				</span>
				<# } #>
				<span class="hfe-heading-text  elementor-heading-title" data-elementor-setting-key="heading_title" data-elementor-inline-editing-toolbar="basic" >
				<#if ( '' != settings.before ){#>
					{{{ settings.before }}}  <?php // PHPCS:Ignore WordPressVIPMinimum.Security.Mustache.OutputNotation ?>
				<#}#>
				<?php echo wp_kses_post( get_bloginfo( 'name' ) ); ?>
				<# if ( '' != settings.after ){#>
					{{{ settings.after }}} <?php // PHPCS:Ignore WordPressVIPMinimum.Security.Mustache.OutputNotation ?>
				<#}#>
				</span>
			</{{{ headingSizeTag }}}> <?php // PHPCS:Ignore WordPressVIPMinimum.Security.Mustache.OutputNotation ?>
			<# if ( '' != settings.heading_link.url ) { #>
				</a>
			<# } #>
		</div>
		<?php
	}
}
