<?php
/**
 * Counter Widget for Header Footer Elementor.
 *
 * @package header-footer-elementor
 */

namespace HFE\WidgetsManager\Widgets\Counter;

use Elementor\Controls_Manager;
use Elementor\Group_Control_Typography;
use Elementor\Core\Kits\Documents\Tabs\Global_Typography;
use Elementor\Core\Kits\Documents\Tabs\Global_Colors;

use HFE\WidgetsManager\Widgets_Loader;
use HFE\WidgetsManager\Base\Common_Widget;

if ( ! defined( 'ABSPATH' ) ) {
	exit;   // Exit if accessed directly.
}

/**
 * HFE Counter widget
 *
 * HFE widget for displaying animated counters
 *
 * @since 1.0.0
 */
class Counter extends Common_Widget {

	/**
	 * Retrieve the widget name.
	 *
	 * @since 1.0.0
	 *
	 * @access public
	 *
	 * @return string Widget name.
	 */
	public function get_name() {
		return parent::get_widget_slug( 'Counter' );
	}

	/**
	 * Retrieve the widget title.
	 *
	 * @since 1.0.0
	 *
	 * @access public
	 *
	 * @return string Widget title.
	 */
	public function get_title() {
		return parent::get_widget_title( 'Counter' );
	}

	/**
	 * Retrieve the widget icon.
	 *
	 * @since 1.0.0
	 *
	 * @access public
	 *
	 * @return string Widget icon.
	 */
	public function get_icon() {
		return parent::get_widget_icon( 'Counter' );
	}

	/**
	 * Retrieve Widget Keywords.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @return string Widget keywords.
	 */
	public function get_keywords() {
		return parent::get_widget_keywords( 'Counter' );
	}

	/**
	 * Get script dependencies.
	 *
	 * @since 1.0.0
	 * @access public
	 *
	 * @return array Script dependencies.
	 */
	public function get_script_depends() {
		return [ 'hfe-counter' ];
	}

	/**
	 * Indicates if the widget's content is dynamic.
	 *
	 * @since 1.0.0
	 * @return bool True for dynamic content, false for static content.
	 */
	protected function is_dynamic_content(): bool {
		return false;
	}

	/**
	 * Register counter controls.
	 *
	 * @since 1.0.0
	 * @access protected
	 * @return void
	 */
	protected function register_controls(): void {
		$this->register_general_content_controls();
		$this->register_counter_style_controls();
		$this->register_title_style_controls();
		$this->register_prefix_style_controls();
		$this->register_suffix_style_controls();
		$this->register_spacing_controls();
	}

	/**
	 * Register General Content Controls.
	 *
	 * @since 1.0.0
	 * @access protected
	 * @return void
	 */
	protected function register_general_content_controls(): void {
		$this->start_controls_section(
			'section_general',
			[
				'label' => __( 'General', 'header-footer-elementor' ),
			]
		);

		$this->add_control(
			'title',
			[
				'label'   => __( 'Title', 'header-footer-elementor' ),
				'type'    => Controls_Manager::TEXT,
				'default' => __( 'Users', 'header-footer-elementor' ),
				'dynamic' => [
					'active' => true,
				],
			]
		);

		$this->add_control(
			'title_tag',
			[
				'label'   => __( 'Title HTML Tag', 'header-footer-elementor' ),
				'type'    => Controls_Manager::SELECT,
				'options' => [
					'h1' => __( 'H1', 'header-footer-elementor' ),
					'h2' => __( 'H2', 'header-footer-elementor' ),
					'h3' => __( 'H3', 'header-footer-elementor' ),
					'h4' => __( 'H4', 'header-footer-elementor' ),
					'h5' => __( 'H5', 'header-footer-elementor' ),
					'h6' => __( 'H6', 'header-footer-elementor' ),
					'div' => __( 'div', 'header-footer-elementor' ),
					'span' => __( 'span', 'header-footer-elementor' ),
					'p' => __( 'p', 'header-footer-elementor' ),
				],
				'default' => 'h1',
			]
		);

		$this->add_control(
			'start_number',
			[
				'label'   => __( 'Start', 'header-footer-elementor' ),
				'type'    => Controls_Manager::NUMBER,
				'default' => 20,
			]
		);

		$this->add_control(
			'end_number',
			[
				'label'   => __( 'End', 'header-footer-elementor' ),
				'type'    => Controls_Manager::NUMBER,
				'default' => 100,
			]
		);

		$this->add_control(
			'prefix',
			[
				'label'   => __( 'Before Number', 'header-footer-elementor' ),
				'type'    => Controls_Manager::TEXT,
				'dynamic' => [
					'active' => true,
				],
			]
		);

		$this->add_control(
			'suffix',
			[
				'label'   => __( 'After Number', 'header-footer-elementor' ),
				'type'    => Controls_Manager::TEXT,
				'dynamic' => [
					'active' => true,
				],
			]
		);

		$this->add_control(
			'digit_separator',
			[
				'label'   => __( 'Digit Separator', 'header-footer-elementor' ),
				'type'    => Controls_Manager::SELECT,
				'options' => [
					''      => __( 'None', 'header-footer-elementor' ),
					','     => __( 'Comma', 'header-footer-elementor' ),
					'.'     => __( 'Dot', 'header-footer-elementor' ),
					' '     => __( 'Space', 'header-footer-elementor' ),
					'_'     => __( 'Underscore', 'header-footer-elementor' ),
				],
				'default' => ',',
			]
		);

		$this->add_control(
			'counter_speed',
			[
				'label'   => __( 'Counter Speed (seconds)', 'header-footer-elementor' ),
				'type'    => Controls_Manager::NUMBER,
				'default' => 3,
				'min'     => 1,
				'max'     => 10,
				'step'    => 0.1,
			]
		);

		$this->add_responsive_control(
			'alignment',
			[
				'label'              => __( 'Alignment', 'header-footer-elementor' ),
				'type'               => Controls_Manager::CHOOSE,
				'options'            => [
					'left'   => [
						'title' => __( 'Left', 'header-footer-elementor' ),
						'icon'  => 'eicon-text-align-left',
					],
					'center' => [
						'title' => __( 'Center', 'header-footer-elementor' ),
						'icon'  => 'eicon-text-align-center',
					],
					'right'  => [
						'title' => __( 'Right', 'header-footer-elementor' ),
						'icon'  => 'eicon-text-align-right',
					],
				],
				'default'            => 'center',
				'selectors'          => [
					'{{WRAPPER}} .hfe-counter-wrapper' => 'text-align: {{VALUE}};',
				],
				'prefix_class'       => 'hfe%s-counter-align-',
				'frontend_available' => true,
			]
		);

		$this->end_controls_section();
	}

	/**
	 * Register Counter Style Controls.
	 *
	 * @since 1.0.0
	 * @access protected
	 * @return void
	 */
	protected function register_counter_style_controls(): void {
		$this->start_controls_section(
			'section_counter_style',
			[
				'label' => __( 'Counter', 'header-footer-elementor' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name'     => 'counter_typography',
				'global'   => [
					'default' => Global_Typography::TYPOGRAPHY_PRIMARY,
				],
				'selector' => '{{WRAPPER}} .hfe-counter-number',
			]
		);

		$this->add_control(
			'counter_color',
			[
				'label'     => __( 'Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'global'    => [
					'default' => Global_Colors::COLOR_PRIMARY,
				],
				'selectors' => [
					'{{WRAPPER}} .hfe-counter-number' => 'color: {{VALUE}};',
				],
			]
		);

		$this->add_responsive_control(
			'counter_margin',
			[
				'label'      => __( 'Margin', 'header-footer-elementor' ),
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', '%', 'em', 'rem' ],
				'selectors'  => [
					'{{WRAPPER}} .hfe-counter-number' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->end_controls_section();
	}

	/**
	 * Register Title Style Controls.
	 *
	 * @since 1.0.0
	 * @access protected
	 * @return void
	 */
	protected function register_title_style_controls(): void {
		$this->start_controls_section(
			'section_title_style',
			[
				'label'     => __( 'Title', 'header-footer-elementor' ),
				'tab'       => Controls_Manager::TAB_STYLE,
				'condition' => [
					'title!' => '',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name'     => 'title_typography',
				'global'   => [
					'default' => Global_Typography::TYPOGRAPHY_SECONDARY,
				],
				'selector' => '{{WRAPPER}} .hfe-counter-title',
			]
		);

		$this->add_control(
			'title_color',
			[
				'label'     => __( 'Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'global'    => [
					'default' => Global_Colors::COLOR_SECONDARY,
				],
				'selectors' => [
					'{{WRAPPER}} .hfe-counter-title' => 'color: {{VALUE}};',
				],
			]
		);

		$this->add_responsive_control(
			'title_position',
			[
				'label'   => __( 'Position', 'header-footer-elementor' ),
				'type'    => Controls_Manager::CHOOSE,
				'options' => [
					'column-reverse' => [
						'title' => __( 'Top', 'header-footer-elementor' ),
						'icon'  => 'eicon-arrow-up',
					],
					'column' => [
						'title' => __( 'Bottom', 'header-footer-elementor' ),
						'icon'  => 'eicon-arrow-down',
					],
					'row-reverse' => [
						'title' => __( 'Left', 'header-footer-elementor' ),
						'icon'  => 'eicon-arrow-left',
					],
					'row' => [
						'title' => __( 'Right', 'header-footer-elementor' ),
						'icon'  => 'eicon-arrow-right',
					],
				],
				'default' => 'column',
				'selectors' => [
					'{{WRAPPER}} .hfe-counter-wrapper' => 'flex-direction: {{VALUE}};',
				],
			]
		);

		$this->add_responsive_control(
			'title_margin',
			[
				'label'      => __( 'Margin', 'header-footer-elementor' ),
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', '%', 'em', 'rem' ],
				'selectors'  => [
					'{{WRAPPER}} .hfe-counter-title' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->end_controls_section();
	}

	/**
	 * Register Prefix Style Controls.
	 *
	 * @since 1.0.0
	 * @access protected
	 * @return void
	 */
	protected function register_prefix_style_controls(): void {
		$this->start_controls_section(
			'section_prefix_style',
			[
				'label'     => __( 'Prefix', 'header-footer-elementor' ),
				'tab'       => Controls_Manager::TAB_STYLE,
				'condition' => [
					'prefix!' => '',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name'     => 'prefix_typography',
				'selector' => '{{WRAPPER}} .hfe-counter-prefix',
			]
		);

		$this->add_control(
			'prefix_color',
			[
				'label'     => __( 'Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .hfe-counter-prefix' => 'color: {{VALUE}};',
				],
			]
		);

		$this->add_responsive_control(
			'prefix_margin',
			[
				'label'      => __( 'Margin', 'header-footer-elementor' ),
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', '%', 'em', 'rem' ],
				'selectors'  => [
					'{{WRAPPER}} .hfe-counter-prefix' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->end_controls_section();
	}

	/**
	 * Register Suffix Style Controls.
	 *
	 * @since 1.0.0
	 * @access protected
	 * @return void
	 */
	protected function register_suffix_style_controls(): void {
		$this->start_controls_section(
			'section_suffix_style',
			[
				'label'     => __( 'Suffix', 'header-footer-elementor' ),
				'tab'       => Controls_Manager::TAB_STYLE,
				'condition' => [
					'suffix!' => '',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name'     => 'suffix_typography',
				'selector' => '{{WRAPPER}} .hfe-counter-suffix',
			]
		);

		$this->add_control(
			'suffix_color',
			[
				'label'     => __( 'Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .hfe-counter-suffix' => 'color: {{VALUE}};',
				],
			]
		);

		$this->add_responsive_control(
			'suffix_margin',
			[
				'label'      => __( 'Margin', 'header-footer-elementor' ),
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', '%', 'em', 'rem' ],
				'selectors'  => [
					'{{WRAPPER}} .hfe-counter-suffix' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->end_controls_section();
	}

	/**
	 * Register Spacing Controls.
	 *
	 * @since 1.0.0
	 * @access protected
	 * @return void
	 */
	protected function register_spacing_controls(): void {
		$this->start_controls_section(
			'section_spacing',
			[
				'label' => __( 'Spacing', 'header-footer-elementor' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			]
		);

		$this->add_responsive_control(
			'counter_wrapper_margin',
			[
				'label'      => __( 'Counter Wrapper Margin', 'header-footer-elementor' ),
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', '%', 'em', 'rem' ],
				'selectors'  => [
					'{{WRAPPER}} .hfe-counter-wrapper' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->end_controls_section();
	}

	/**
	 * Render Counter output on the frontend.
	 *
	 * @since 1.0.0
	 * @access protected
	 * @return void
	 */
	protected function render(): void {
		$settings = $this->get_settings_for_display();

		$this->add_render_attribute( 'counter-wrapper', 'class', 'hfe-counter-wrapper' );

		$this->add_render_attribute( 'counter-number', 'class', 'hfe-counter-number' );
		$this->add_render_attribute( 'counter-number', 'data-start', $settings['start_number'] );
		$this->add_render_attribute( 'counter-number', 'data-end', $settings['end_number'] );
		$this->add_render_attribute( 'counter-number', 'data-speed', $settings['counter_speed'] * 1000 );
		$this->add_render_attribute( 'counter-number', 'data-separator', $settings['digit_separator'] );

		$title_tag = Widgets_Loader::validate_html_tag( $settings['title_tag'] );
		?>

		<div <?php echo wp_kses_post( $this->get_render_attribute_string( 'counter-wrapper' ) ); ?>>
			<div class="hfe-counter-content">
				<?php if ( ! empty( $settings['prefix'] ) ) : ?>
					<span class="hfe-counter-prefix"><?php echo wp_kses_post( $settings['prefix'] ); ?></span>
				<?php endif; ?>

				<span <?php echo wp_kses_post( $this->get_render_attribute_string( 'counter-number' ) ); ?>>
					<?php echo esc_html( $settings['start_number'] ); ?>
				</span>

				<?php if ( ! empty( $settings['suffix'] ) ) : ?>
					<span class="hfe-counter-suffix"><?php echo wp_kses_post( $settings['suffix'] ); ?></span>
				<?php endif; ?>
			</div>

			<?php if ( ! empty( $settings['title'] ) ) : ?>
				<<?php echo esc_attr( $title_tag ); ?> class="hfe-counter-title">
					<?php echo wp_kses_post( $settings['title'] ); ?>
				</<?php echo esc_attr( $title_tag ); ?>>
			<?php endif; ?>
		</div>
		<?php
	}

	/**
	 * Render Counter widget output in the editor.
	 *
	 * Written as a Backbone JavaScript template and used to generate the live preview.
	 *
	 * @since 1.0.0
	 * @access protected
	 * @return void
	 */
	protected function content_template() {
		?>
		<#
		var titleTag = elementor.helpers.validateHTMLTag( settings.title_tag );
		if ( typeof elementor.helpers.validateHTMLTag === "function" ) { 
			titleTag = elementor.helpers.validateHTMLTag( titleTag );
		} else if( HfeWidgetsData.allowed_tags ) {
			titleTag = HfeWidgetsData.allowed_tags.includes( titleTag.toLowerCase() ) ? titleTag : 'div';
		}

		view.addRenderAttribute( 'counter-wrapper', 'class', 'hfe-counter-wrapper' );

		view.addRenderAttribute( 'counter-number', 'class', 'hfe-counter-number' );
		view.addRenderAttribute( 'counter-number', 'data-start', settings.start_number );
		view.addRenderAttribute( 'counter-number', 'data-end', settings.end_number );
		view.addRenderAttribute( 'counter-number', 'data-speed', settings.counter_speed * 1000 );
		view.addRenderAttribute( 'counter-number', 'data-separator', settings.digit_separator );
		#>

		<div {{{ view.getRenderAttributeString( 'counter-wrapper' ) }}}>
			<div class="hfe-counter-content">
				<# if ( '' !== settings.prefix ) { #>
					<span class="hfe-counter-prefix">{{{ settings.prefix }}}</span>
				<# } #>

				<span {{{ view.getRenderAttributeString( 'counter-number' ) }}}>
					{{{ settings.start_number }}}
				</span>

				<# if ( '' !== settings.suffix ) { #>
					<span class="hfe-counter-suffix">{{{ settings.suffix }}}</span>
				<# } #>
			</div>

			<# if ( '' !== settings.title ) { #>
				<{{{ titleTag }}} class="hfe-counter-title">
					{{{ settings.title }}}
				</{{{ titleTag }}}>
			<# } #>
		</div>
		<?php
	}
}