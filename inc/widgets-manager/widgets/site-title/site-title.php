<?php
/**
 * Elementor Classes.
 *
 * @package header-footer-elementor
 */

namespace HFE\WidgetsManager\Widgets\SiteTitle;

use Elementor\Controls_Manager;
use Elementor\Group_Control_Typography;
use Elementor\Core\Kits\Documents\Tabs\Global_Typography;
use Elementor\Group_Control_Text_Shadow;
use Elementor\Core\Kits\Documents\Tabs\Global_Colors;

use HFE\WidgetsManager\Widgets_Loader;
use HFE\WidgetsManager\Base\Common_Widget;

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
class Site_Title extends Common_Widget {

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
		return parent::get_widget_slug( 'Site_Title' );
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
		return parent::get_widget_title( 'Site_Title' );
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
		return parent::get_widget_icon( 'Site_Title' );
	}

	/**
	 * Retrieve Widget Keywords.
	 *
	 * @since 2.6.0
	 * @access public
	 *
	 * @return string Widget keywords.
	 */
	public function get_keywords() {
		return parent::get_widget_keywords( 'Site_Title' );
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
	 * Register site title controls.
	 *
	 * @since 1.5.7
	 * @access protected
	 * @return void
	 */
	// phpcs:ignore
	protected function register_controls(): void {

		$this->register_general_content_controls();
		$this->register_heading_typo_content_controls();
		$this->register_pro_promotion_controls();
	}

	/**
	 * Register Advanced Heading General Controls.
	 *
	 * @since 1.3.0
	 * @access protected
	 * @return void
	 */
	// phpcs:ignore
	protected function register_general_content_controls(): void {

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
					'{{WRAPPER}} .hfe-heading' => 'text-align: {{VALUE}};',
				],
				'prefix_class'       => 'hfe%s-heading-align-',
				'frontend_available' => true,
			]
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
	// phpcs:ignore
	protected function register_heading_typo_content_controls(): void {
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
				'global'   => [
					'default' => Global_Typography::TYPOGRAPHY_PRIMARY,
				],
				'selector' => '{{WRAPPER}} .elementor-heading-title, {{WRAPPER}} .hfe-heading a',
			]
		);
		$this->add_control(
			'heading_color',
			[
				'label'     => __( 'Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'global'    => [
					'default' => Global_Colors::COLOR_PRIMARY,
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
	 * Render Heading output on the frontend.
	 *
	 * Written in PHP and used to generate the final HTML.
	 *
	 * @since 1.3.0
	 * @access protected
	 *
	 * // phpcs:ignore
	 * @return void
	 */
	// phpcs:ignore
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
		var sanitizedSize = _.escape( settings.size );

		if ( '' != settings.heading_link.url ) {
			var urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$|^www\.[^\s/$.?#].[^\s]*$/;
			if ( urlPattern.test( settings.heading_link.url ) ) {
				var sanitizedUrl = _.escape( settings.heading_link.url );
				view.addRenderAttribute( 'url', 'href', sanitizedUrl );
			}
		}
		var iconHTML = elementor.helpers.renderIcon( view, settings.icon, { 'aria-hidden': true }, 'i' , 'object' );

		var headingSizeTag = elementor.helpers.validateHTMLTag( settings.heading_tag );

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
				<{{{ headingSizeTag }}} class="hfe-heading elementor-heading-title elementor-size-{{{ elementor.helpers.sanitize( sanitizedSize ) }}}"> <?php //phpcs:ignore WordPressVIPMinimum.Security.Mustache.OutputNotation ?>
				<# if( '' != settings.icon.value ){ #>
				<span class="hfe-icon">
					{{{ iconHTML.value }}}	<?php // PHPCS:Ignore WordPressVIPMinimum.Security.Mustache.OutputNotation ?>			
				</span>
				<# } #>
				<span class="hfe-heading-text  elementor-heading-title" data-elementor-setting-key="heading_title" data-elementor-inline-editing-toolbar="basic" >
				<# if ( '' != settings.before ){
					var before = elementor.helpers.sanitize( settings.before )#>
					{{{ before }}}  <?php // PHPCS:Ignore WordPressVIPMinimum.Security.Mustache.OutputNotation ?>
				<#}#>
				<?php echo wp_kses_post( get_bloginfo( 'name' ) ); ?>
				<# if ( '' != settings.after ){
					var after = elementor.helpers.sanitize( settings.after )#>
					{{{ after }}} <?php // PHPCS:Ignore WordPressVIPMinimum.Security.Mustache.OutputNotation ?>
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
