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
		$this->register_title_style_controls();
		$this->register_number_style_controls();
		$this->register_prefix_style_controls();
		$this->register_suffix_style_controls();
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


		$this->end_controls_section();
	}

	/**
	 * Register Number Style Controls.
	 *
	 * @since 1.0.0
	 * @access protected
	 * @return void
	 */
	protected function register_number_style_controls(): void {
		$start = is_rtl() ? 'right' : 'left';
		$end = ! is_rtl() ? 'right' : 'left';

		$this->start_controls_section(
			'section_number',
			[
				'label' => __( 'Number', 'header-footer-elementor' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			]
		);

		$this->add_responsive_control(
			'number_position',
			[
				'label'   => __( 'Position', 'header-footer-elementor' ),
				'type'    => Controls_Manager::CHOOSE,
				'options' => [
					'start' => [
						'title' => __( 'Start', 'header-footer-elementor' ),
						'icon'  => "eicon-h-align-$start",
					],
					'center' => [
						'title' => __( 'Center', 'header-footer-elementor' ),
						'icon'  => 'eicon-h-align-center',
					],
					'end' => [
						'title' => __( 'End', 'header-footer-elementor' ),
						'icon'  => "eicon-h-align-$end",
					],
					'stretch' => [
						'title' => __( 'Stretch', 'header-footer-elementor' ),
						'icon'  => 'eicon-grow',
					],
				],
				'selectors_dictionary' => [
					'start' => 'text-align: {{VALUE}}; --counter-prefix-grow: 0; --counter-suffix-grow: 1; --counter-number-grow: 0;',
					'center' => 'text-align: {{VALUE}}; --counter-prefix-grow: 1; --counter-suffix-grow: 1; --counter-number-grow: 0;',
					'end' => 'text-align: {{VALUE}}; --counter-prefix-grow: 1; --counter-suffix-grow: 0; --counter-number-grow: 0;',
					'stretch' => '--counter-prefix-grow: 0; --counter-suffix-grow: 0; --counter-number-grow: 1;',
				],
				'selectors' => [
					'{{WRAPPER}} .hfe-counter-content' => '{{VALUE}}',
				],
			]
		);

		$this->add_responsive_control(
			'number_alignment',
			[
				'label'   => __( 'Alignment', 'header-footer-elementor' ),
				'type'    => Controls_Manager::CHOOSE,
				'options' => [
					'start' => [
						'title' => __( 'Start', 'header-footer-elementor' ),
						'icon'  => "eicon-text-align-$start",
					],
					'center' => [
						'title' => __( 'Center', 'header-footer-elementor' ),
						'icon'  => 'eicon-text-align-center',
					],
					'end' => [
						'title' => __( 'End', 'header-footer-elementor' ),
						'icon'  => "eicon-text-align-$end",
					],
				],
				'selectors' => [
					'{{WRAPPER}} .hfe-counter-number' => 'text-align: {{VALUE}};',
				],
				'condition' => [
					'number_position' => 'stretch',
				],
			]
		);

		$this->add_responsive_control(
			'number_gap',
			[
				'label'      => __( 'Gap', 'header-footer-elementor' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => [ 'px', 'em', 'rem' ],
				'selectors'  => [
					'{{WRAPPER}} .hfe-counter-content' => 'gap: {{SIZE}}{{UNIT}};',
				],
				'conditions' => [
					'relation' => 'and',
					'terms' => [
						[
							'name' => 'number_position',
							'operator' => '!==',
							'value' => 'stretch',
						],
						[
							'relation' => 'or',
							'terms' => [
								[
									'name' => 'prefix',
									'operator' => '!==',
									'value' => '',
								],
								[
									'name' => 'suffix',
									'operator' => '!==',
									'value' => '',
								],
							],
						],
					],
				],
			]
		);

		$this->add_control(
			'number_color',
			[
				'label'     => __( 'Text Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'global'    => [
					'default' => Global_Colors::COLOR_PRIMARY,
				],
				'selectors' => [
					'{{WRAPPER}} .hfe-counter-content' => 'color: {{VALUE}};',
				],
				'separator' => 'before',
			]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name'     => 'typography',
				'global'   => [
					'default' => Global_Typography::TYPOGRAPHY_PRIMARY,
				],
				'selector' => '{{WRAPPER}} .hfe-counter-content',
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
		$start = is_rtl() ? 'right' : 'left';
		$end = ! is_rtl() ? 'right' : 'left';

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

		$this->add_responsive_control(
			'title_position',
			[
				'label'   => __( 'Position', 'header-footer-elementor' ),
				'type'    => Controls_Manager::CHOOSE,
				'options' => [
					'before' => [
						'title' => __( 'Before', 'header-footer-elementor' ),
						'icon'  => 'eicon-v-align-top',
					],
					'after' => [
						'title' => __( 'After', 'header-footer-elementor' ),
						'icon'  => 'eicon-v-align-bottom',
					],
					'start' => [
						'title' => __( 'Start', 'header-footer-elementor' ),
						'icon'  => "eicon-h-align-$start",
					],
					'end' => [
						'title' => __( 'End', 'header-footer-elementor' ),
						'icon'  => "eicon-h-align-$end",
					],
				],
				'selectors_dictionary' => [
					'before' => 'flex-direction: column;',
					'after' => 'flex-direction: column-reverse;',
					'start' => 'flex-direction: row;',
					'end' => 'flex-direction: row-reverse;',
				],
				'selectors' => [
					'{{WRAPPER}} .hfe-counter-wrapper' => '{{VALUE}} display: flex;',
				],
			]
		);

		$this->add_responsive_control(
			'title_horizontal_alignment',
			[
				'label'   => __( 'Horizontal Alignment', 'header-footer-elementor' ),
				'type'    => Controls_Manager::CHOOSE,
				'options' => [
					'start' => [
						'title' => __( 'Start', 'header-footer-elementor' ),
						'icon'  => "eicon-h-align-$start",
					],
					'center' => [
						'title' => __( 'Center', 'header-footer-elementor' ),
						'icon'  => 'eicon-h-align-center',
					],
					'end' => [
						'title' => __( 'End', 'header-footer-elementor' ),
						'icon'  => "eicon-h-align-$end",
					],
				],
				'separator' => 'before',
				'selectors' => [
					'{{WRAPPER}} .hfe-counter-title' => 'justify-content: {{VALUE}}; display: flex;',
				],
			]
		);

		$this->add_responsive_control(
			'title_vertical_alignment',
			[
				'label'   => __( 'Vertical Alignment', 'header-footer-elementor' ),
				'type'    => Controls_Manager::CHOOSE,
				'options' => [
					'start' => [
						'title' => __( 'Top', 'header-footer-elementor' ),
						'icon'  => 'eicon-v-align-top',
					],
					'center' => [
						'title' => __( 'Middle', 'header-footer-elementor' ),
						'icon'  => 'eicon-v-align-middle',
					],
					'end' => [
						'title' => __( 'Bottom', 'header-footer-elementor' ),
						'icon'  => 'eicon-v-align-bottom',
					],
				],
				'selectors' => [
					'{{WRAPPER}} .hfe-counter-title' => 'align-items: {{VALUE}};',
				],
				'condition' => [
					'title!' => '',
					'title_position' => [ 'start', 'end' ],
				],
			]
		);

		$this->add_responsive_control(
			'title_gap',
			[
				'label'      => __( 'Gap', 'header-footer-elementor' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => [ 'px', 'em', 'rem' ],
				'selectors'  => [
					'{{WRAPPER}} .hfe-counter-wrapper' => 'gap: {{SIZE}}{{UNIT}};',
				],
				'condition' => [
					'title!' => '',
					'title_position' => [ '', 'before', 'after' ],
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
				'separator' => 'before',
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
	 * Render Counter output on the frontend.
	 *
	 * @since 1.0.0
	 * @access protected
	 * @return void
	 */
	protected function render(): void {
		$settings = $this->get_settings_for_display();

		$this->add_render_attribute( 'counter-wrapper', 'class', 'hfe-counter-wrapper' );

		$this->add_render_attribute( 'counter-content', 'class', 'hfe-counter-content' );

		$this->add_render_attribute( 'counter-number', 'class', 'hfe-counter-number' );
		$this->add_render_attribute( 'counter-number', 'data-start', $settings['start_number'] );
		$this->add_render_attribute( 'counter-number', 'data-end', $settings['end_number'] );
		$this->add_render_attribute( 'counter-number', 'data-speed', $settings['counter_speed'] * 1000 );
		$this->add_render_attribute( 'counter-number', 'data-separator', $settings['digit_separator'] );

		$this->add_render_attribute( 'prefix', 'class', 'hfe-counter-prefix' );
		$this->add_render_attribute( 'suffix', 'class', 'hfe-counter-suffix' );
		$this->add_render_attribute( 'counter-title', 'class', 'hfe-counter-title' );
		$this->add_inline_editing_attributes( 'counter-title' );

		$title_tag = Widgets_Loader::validate_html_tag( $settings['title_tag'] );
		?>

		<div <?php echo wp_kses_post( $this->get_render_attribute_string( 'counter-wrapper' ) ); ?>>
			<?php
			if ( $settings['title'] ) :
				?><<?php echo esc_attr( $title_tag ); ?> <?php echo wp_kses_post( $this->get_render_attribute_string( 'counter-title' ) ); ?>><?php echo wp_kses_post( $this->get_settings_for_display( 'title' ) ); ?></<?php echo esc_attr( $title_tag ); ?>><?php
			endif;
			?>
			<div <?php echo wp_kses_post( $this->get_render_attribute_string( 'counter-content' ) ); ?>>
				<span <?php echo wp_kses_post( $this->get_render_attribute_string( 'prefix' ) ); ?>><?php echo wp_kses_post( $settings['prefix'] ); ?></span>
				<span <?php echo wp_kses_post( $this->get_render_attribute_string( 'counter-number' ) ); ?>><?php echo esc_html( $settings['start_number'] ); ?></span>
				<span <?php echo wp_kses_post( $this->get_render_attribute_string( 'suffix' ) ); ?>><?php echo wp_kses_post( $settings['suffix'] ); ?></span>
			</div>
		</div>

		<style>
		.hfe-counter-wrapper {
			align-items: stretch;
			display: flex;
			flex-direction: column-reverse;
			justify-content: center;
		}
		.hfe-counter-content {
			display: flex;
			flex: 1;
			text-align: center;
		}
		.hfe-counter-number {
			flex-grow: var(--counter-number-grow, 0);
		}
		.hfe-counter-prefix {
			flex-grow: var(--counter-prefix-grow, 1);
			text-align: end;
			white-space: pre-wrap;
		}
		.hfe-counter-suffix {
			flex-grow: var(--counter-suffix-grow, 1);
			text-align: start;
			white-space: pre-wrap;
		}
		.hfe-counter-title {
			align-items: center;
			display: flex;
			flex: 1;
			justify-content: center;
			margin: 0;
			padding: 0;
		}
		</style>
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

		view.addRenderAttribute( 'counter-content', 'class', 'hfe-counter-content' );

		view.addRenderAttribute( 'counter-number', 'class', 'hfe-counter-number' );
		view.addRenderAttribute( 'counter-number', 'data-start', settings.start_number );
		view.addRenderAttribute( 'counter-number', 'data-end', settings.end_number );
		view.addRenderAttribute( 'counter-number', 'data-speed', settings.counter_speed * 1000 );
		view.addRenderAttribute( 'counter-number', 'data-separator', settings.digit_separator );

		view.addRenderAttribute( 'prefix', 'class', 'hfe-counter-prefix' );
		view.addRenderAttribute( 'suffix', 'class', 'hfe-counter-suffix' );
		view.addRenderAttribute( 'counter-title', 'class', 'hfe-counter-title' );
		view.addInlineEditingAttributes( 'counter-title' );
		#>

		<div {{{ view.getRenderAttributeString( 'counter-wrapper' ) }}}>
			<# if ( '' !== settings.title ) { #>
				<{{{ titleTag }}} {{{ view.getRenderAttributeString( 'counter-title' ) }}}>
					{{{ settings.title }}}
				</{{{ titleTag }}}>
			<# } #>
			<div {{{ view.getRenderAttributeString( 'counter-content' ) }}}>
				<span {{{ view.getRenderAttributeString( 'prefix' ) }}}>{{{ settings.prefix }}}</span>
				<span {{{ view.getRenderAttributeString( 'counter-number' ) }}}>{{{ settings.start_number }}}</span>
				<span {{{ view.getRenderAttributeString( 'suffix' ) }}}>{{{ settings.suffix }}}</span>
			</div>
		</div>
		<?php
	}
}