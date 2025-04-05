<?php
/**
 * UAEL Infobox.
 *
 * @package UAEL
 */

 namespace HFE\WidgetsManager\Widgets\Iconbox;

// Elementor Classes.
use Elementor\Controls_Manager;
use Elementor\Control_Media;
use Elementor\Utils;
use Elementor\Group_Control_Border;
use Elementor\Group_Control_Typography;
use Elementor\Group_Control_Box_Shadow;
use Elementor\Core\Kits\Documents\Tabs\Global_Typography;
use Elementor\Core\Kits\Documents\Tabs\Global_Colors;
use Elementor\Group_Control_Background;
use Elementor\Group_Control_Image_Size;
use Elementor\Group_Control_Css_Filter;

use HFE\WidgetsManager\Base\Common_Widget;

if ( ! defined( 'ABSPATH' ) ) {
	exit;   // Exit if accessed directly.
}

/**
 * Class Iconbox.
 */
class Iconbox extends Common_Widget {

	/**
	 * Retrieve Iconbox Widget name.
	 *
	 * @since x.x.x
	 * @access public
	 *
	 * @return string Widget name.
	 */
	public function get_name() {
		return parent::get_widget_slug( 'Iconbox' );
	}

	/**
	 * Retrieve Iconbox Widget title.
	 *
	 * @since x.x.x
	 * @access public
	 *
	 * @return string Widget title.
	 */
	public function get_title() {
		return parent::get_widget_title( 'Iconbox' );
	}

	/**
	 * Retrieve Iconbox Widget icon.
	 *
	 * @since x.x.x
	 * @access public
	 *
	 * @return string Widget icon.
	 */
	public function get_icon() {
		return parent::get_widget_icon( 'Iconbox' );
	}

	/**
	 * Retrieve Widget Keywords.
	 *
	 * @since x.x.x
	 * @access public
	 *
	 * @return string Widget keywords.
	 */
	public function get_keywords() {
		return parent::get_widget_keywords( 'Iconbox' );
	}

	/**
	 * Indicates if the widget's content is dynamic.
	 *
	 * This method returns true if the widget's output is dynamic and should not be cached,
	 * or false if the content is static and can be cached.
	 *
	 * @since x.x.x
	 * @return bool True for dynamic content, false for static content.
	 */
	protected function is_dynamic_content(): bool { // phpcs:ignore
		return false;
	}

	/**
	 * Register Iconbox controls.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function register_controls() {

		$this->register_general_content_controls();
		$this->register_icon_content_controls();
		$this->register_cta_content_controls();
		$this->register_typo_content_controls();
		$this->register_margin_content_controls();
	}

	/**
	 * Register Iconbox General Controls.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function register_general_content_controls() {
		$this->start_controls_section(
			'section_general_field',
			array(
				'label' => __( 'General', 'uael' ),
			)
		);

		$this->add_control(
			'iconbox_title',
			array(
				'label'    => __( 'Title', 'uael' ),
				'type'     => Controls_Manager::TEXT,
				'selector' => '{{WRAPPER}} .hfe-iconbox-title',
				'dynamic'  => array(
					'active' => true,
				),
				'default'  => __( 'Icon Box', 'uael' ),
			)
		);
		$this->add_control(
			'iconbox_description',
			array(
				'label'    => __( 'Description', 'uael' ),
				'type'     => Controls_Manager::TEXTAREA,
				'selector' => '{{WRAPPER}} .hfe-iconbox-text',
				'dynamic'  => array(
					'active' => true,
				),
				'default'  => __( 'Enter description text here.Lorem ipsum dolor sit amet, consectetur adipiscing. Quo incidunt ullamco.​', 'uael' ),
			)
		);

		$this->end_controls_section();
	}

	/**
	 * Register Iconbox Icon Controls.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function register_icon_content_controls() {
		$this->start_controls_section(
			'section_icon_field',
			array(
				'label' => __( 'Icon', 'uael' ),
			)
		);

		$this->add_responsive_control(
			'iconbox_overall_align',
			array(
				'label'     => __( 'Overall Alignment', 'uael' ),
				'type'      => Controls_Manager::CHOOSE,
				'default'   => 'center',
				'options'   => array(
					'left'   => array(
						'title' => __( 'Left', 'uael' ),
						'icon'  => 'fa fa-align-left',
					),
					'center' => array(
						'title' => __( 'Center', 'uael' ),
						'icon'  => 'fa fa-align-center',
					),
					'right'  => array(
						'title' => __( 'Right', 'uael' ),
						'icon'  => 'fa fa-align-right',
					),
				),
				'selectors' => array(
					'{{WRAPPER}} .hfe-infobox, {{WRAPPER}} .hfe-separator-parent' => 'text-align: {{VALUE}};',
				),
			)
		);

		$this->add_control(
			'iconbox_select_icon',
			array(
				'label'            => __( 'Select Icon', 'uael' ),
				'type'             => Controls_Manager::ICONS,
				'default'          => array(
					'value'   => 'fa fa-star',
					'library' => 'fa-solid',
				),
				'render_type'      => 'template',
			)
		);

		$this->add_responsive_control(
			'iconbox_icon_size',
			array(
				'label'      => __( 'Size', 'uael' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( 'px', 'em', 'rem' ),
				'range'      => array(
					'px' => array(
						'min' => 1,
						'max' => 200,
					),
				),
				'default'    => array(
					'size' => 40,
					'unit' => 'px',
				),
				'condition' => array(
					'iconbox_select_icon[value]!'    => '',
				),
				'selectors'  => array(
					'{{WRAPPER}} .hfe-icon-wrap .hfe-icon i' => 'font-size: {{SIZE}}{{UNIT}}; height: {{SIZE}}{{UNIT}}; width: {{SIZE}}{{UNIT}};line-height: {{SIZE}}{{UNIT}}; text-align: center;',
					'{{WRAPPER}} .hfe-icon-wrap .hfe-icon' => ' height: {{SIZE}}{{UNIT}}; width: {{SIZE}}{{UNIT}};line-height: {{SIZE}}{{UNIT}};',
				),
			)
		);

		$this->start_controls_tabs( 'iconbox_tabs_icon_style' );

			$this->start_controls_tab(
				'iconbox_icon_normal',
				array(
					'label'     => __( 'Normal', 'uael' ),
					'condition' => array(
						'iconbox_select_icon[value]!'    => '',
					),
				)
			);
			$this->add_control(
				'iconbox_icon_color',
				array(
					'label'      => __( 'Icon Color', 'uael' ),
					'type'       => Controls_Manager::COLOR,
					'global'     => array(
						'default' => Global_Colors::COLOR_PRIMARY,
					),
					'condition' => array(
						'iconbox_select_icon[value]!'    => '',
					),
					'default'    => '',
					'selectors'  => array(
						'{{WRAPPER}} .hfe-icon-wrap .hfe-icon i' => 'color: {{VALUE}};',
						'{{WRAPPER}} .hfe-icon-wrap .hfe-icon svg' => 'fill: {{VALUE}};',
					),
				)
			);

			$this->add_control(
				'iconbox_icon_bgcolor',
				array(
					'label'     => __( 'Background Color', 'uael' ),
					'type'      => Controls_Manager::COLOR,
					'global'    => array(
						'default' => Global_Colors::COLOR_SECONDARY,
					),
					'condition' => array(
						'iconbox_select_icon[value]!'    => '',
					),
					'default'   => '',
					'selectors' => array(
						'{{WRAPPER}} .hfe-infobox:not(.hfe-imgicon-style-normal) .hfe-icon-wrap .hfe-icon, {{WRAPPER}} .hfe-infobox:not(.hfe-imgicon-style-normal) .hfe-image .hfe-image-content img' => 'background-color: {{VALUE}};',
					),
				)
			);

			$this->add_control(
				'iconbox_icon_border',
				array(
					'label'       => __( 'Border Style', 'uael' ),
					'type'        => Controls_Manager::SELECT,
					'default'     => 'none',
					'label_block' => false,
					'options'     => array(
						'none'   => __( 'None', 'uael' ),
						'solid'  => __( 'Solid', 'uael' ),
						'double' => __( 'Double', 'uael' ),
						'dotted' => __( 'Dotted', 'uael' ),
						'dashed' => __( 'Dashed', 'uael' ),
					),
					'condition' => array(
						'iconbox_select_icon[value]!'    => '',
					),
					'selectors'   => array(
						'{{WRAPPER}} .hfe-imgicon-style-custom .hfe-icon-wrap .hfe-icon, {{WRAPPER}} .hfe-imgicon-style-custom .hfe-image .hfe-image-content img' => 'border-style: {{VALUE}};',
					),
				)
			);
			$this->add_control(
				'iconbox_icon_border_color',
				array(
					'label'     => __( 'Border Color', 'uael' ),
					'type'      => Controls_Manager::COLOR,
					'global'    => array(
						'default' => Global_Colors::COLOR_PRIMARY,
					),
					'condition' => array(
						'iconbox_icon_border!'    => 'none',
						'iconbox_select_icon[value]!'    => '',
					),
					'default'   => '',
					'selectors' => array(
						'{{WRAPPER}} .hfe-imgicon-style-custom .hfe-icon-wrap .hfe-icon, {{WRAPPER}} .hfe-imgicon-style-custom .hfe-image .hfe-image-content img' => 'border-color: {{VALUE}};',
					),
				)
			);
			$this->add_control(
				'iconbox_icon_border_size',
				array(
					'label'      => __( 'Border Width', 'uael' ),
					'type'       => Controls_Manager::DIMENSIONS,
					'size_units' => array( 'px' ),
					'default'    => array(
						'top'    => '1',
						'bottom' => '1',
						'left'   => '1',
						'right'  => '1',
						'unit'   => 'px',
					),
					'condition'  => array(
						'iconbox_icon_border!'    => 'none',
						'iconbox_select_icon[value]!'    => '',
					),
					'selectors'  => array(
						'{{WRAPPER}} .hfe-imgicon-style-custom .hfe-icon-wrap .hfe-icon, {{WRAPPER}} .hfe-imgicon-style-custom .hfe-image .hfe-image-content img' => 'border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}}; box-sizing:content-box;',
					),
				)
			);

			$this->add_responsive_control(
				'iconbox_icon_border_radius',
				array(
					'label'      => __( 'Rounded Corners', 'uael' ),
					'type'       => Controls_Manager::DIMENSIONS,
					'size_units' => array( 'px', '%' ),
					'default'    => array(
						'top'    => '5',
						'bottom' => '5',
						'left'   => '5',
						'right'  => '5',
						'unit'   => 'px',
					),
					'condition'  => array(
						'iconbox_select_icon[value]!'    => '',
					),
					'selectors'  => array(
						'{{WRAPPER}} .hfe-imgicon-style-custom .hfe-icon-wrap .hfe-icon, {{WRAPPER}} .hfe-imgicon-style-custom .hfe-image .hfe-image-content img' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}}; box-sizing:content-box;',
					),
				)
			);

			$this->end_controls_tab();

			$this->start_controls_tab(
				'iconbox_icon_hover',
				array(
					'label'     => __( 'Hover', 'uael' ),
					'condition'  => array(
						'iconbox_select_icon[value]!'    => '',
					),
					
				)
			);
				$this->add_control(
					'iconbox_icon_hover_color',
					array(
						'label'      => __( 'Icon Hover Color', 'uael' ),
						'type'       => Controls_Manager::COLOR,
						'default'    => '',
						'condition'  => array(
							'iconbox_select_icon[value]!'    => '',
						),
						'selectors'  => array(
							'{{WRAPPER}} .hfe-icon-wrap .hfe-icon:hover > i, {{WRAPPER}} .hfe-iconbox-link-type-module .hfe-iconbox-module-link:hover ~ .hfe-iconbox-content .hfe-imgicon-wrap i, {{WRAPPER}} .hfe-iconbox-link-type-module .hfe-iconbox-module-link:hover ~ .hfe-imgicon-wrap i' => 'color: {{VALUE}};',
							'{{WRAPPER}} .hfe-icon-wrap .hfe-icon:hover > svg, {{WRAPPER}} .hfe-iconbox-link-type-module .hfe-iconbox-module-link:hover ~ .hfe-iconbox-content .hfe-imgicon-wrap svg, {{WRAPPER}} .hfe-iconbox-link-type-module .hfe-iconbox-module-link:hover ~ .hfe-imgicon-wrap svg' => 'fill: {{VALUE}};',
						),
					)
				);

				$this->add_control(
					'iconbox_icon_hover_bgcolor',
					array(
						'label'     => __( 'Background Hover Color', 'uael' ),
						'type'      => Controls_Manager::COLOR,
						'default'   => '',
						'condition'  => array(
							'iconbox_select_icon[value]!'    => '',
						),
						'selectors' => array(
							'{{WRAPPER}} .hfe-icon-wrap .hfe-icon:hover, {{WRAPPER}} .hfe-image-content img:hover, {{WRAPPER}} .hfe-iconbox-link-type-module .hfe-iconbox-module-link:hover ~ .hfe-iconbox-content .hfe-imgicon-wrap .hfe-icon, {{WRAPPER}} .hfe-iconbox-link-type-module .hfe-iconbox-module-link:hover ~ .hfe-imgicon-wrap .hfe-icon, {{WRAPPER}} .hfe-iconbox-link-type-module .hfe-iconbox-module-link:hover ~ .hfe-image .hfe-image-content img, {{WRAPPER}} .hfe-iconbox-link-type-module .hfe-iconbox-module-link:hover ~ .hfe-imgicon-wrap img,{{WRAPPER}} .hfe-infobox:not(.hfe-imgicon-style-normal) .hfe-icon-wrap .hfe-icon:hover,{{WRAPPER}} .hfe-infobox:not(.hfe-imgicon-style-normal) .hfe-image .hfe-image-content img:hover' => 'background-color: {{VALUE}};',
						),
					)
				);

				$this->add_control(
					'iconbox_icon_hover_border',
					array(
						'label'     => __( 'Border Hover Color', 'uael' ),
						'type'      => Controls_Manager::COLOR,
						'condition' => array(
							'iconbox_icon_border!'    => 'none',
							'iconbox_select_icon[value]!'    => '',
						),
						'default'   => '',
						'selectors' => array(
							'{{WRAPPER}} .hfe-icon-wrap .hfe-icon:hover, {{WRAPPER}} .hfe-image-content img:hover,  {{WRAPPER}} .hfe-iconbox-link-type-module .hfe-iconbox-module-link:hover ~ .hfe-iconbox-content .hfe-imgicon-wrap .hfe-icon, {{WRAPPER}} .hfe-iconbox-link-type-module .hfe-iconbox-module-link:hover ~ .hfe-imgicon-wrap .hfe-icon, {{WRAPPER}} .hfe-iconbox-link-type-module .hfe-iconbox-module-link:hover ~ .hfe-image .hfe-image-content img, {{WRAPPER}} .hfe-iconbox-link-type-module .hfe-iconbox-module-link:hover ~ .hfe-imgicon-wrap img ' => 'border-color: {{VALUE}};',
						),
					)
				);

			$this->end_controls_tab();

		$this->end_controls_tabs();

		// End of section for Image Background color if custom design enabled.
		$this->end_controls_section();
	}

	/**
	 * Register Iconbox CTA Controls.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function register_cta_content_controls() {
		$this->start_controls_section(
			'section_cta_field',
			array(
				'label' => __( 'Call To Action', 'uael' ),
			)
		);

		$this->add_control(
			'iconbox_cta_type',
			array(
				'label'       => __( 'Type', 'uael' ),
				'type'        => Controls_Manager::SELECT,
				'default'     => 'none',
				'label_block' => false,
				'options'     => array(
					'none'   => __( 'None', 'uael' ),
					'link'   => __( 'Text', 'uael' ),
					'button' => __( 'Button', 'uael' ),
				),
			)
		);

		$this->add_control(
			'iconbox_link_text',
			array(
				'label'     => __( 'Text', 'uael' ),
				'type'      => Controls_Manager::TEXT,
				'default'   => __( 'Read More', 'uael' ),
				'dynamic'   => array(
					'active' => true,
				),
				'condition' => array(
					'iconbox_cta_type' => 'link',
				),
			)
		);

		$this->add_control(
			'iconbox_button_text',
			array(
				'label'     => __( 'Text', 'uael' ),
				'type'      => Controls_Manager::TEXT,
				'default'   => __( 'Click Here', 'uael' ),
				'dynamic'   => array(
					'active' => true,
				),
				'condition' => array(
					'iconbox_cta_type' => 'button',
				),
			)
		);

		$this->add_control(
			'iconbox_text_link',
			array(
				'label'         => __( 'Link', 'uael' ),
				'type'          => Controls_Manager::URL,
				'default'       => array(
					'url'         => '#',
					'is_external' => '',
				),
				'dynamic'       => array(
					'active' => true,
				),
				'show_external' => true, // Show the 'open in new tab' button.
				'condition'     => array(
					'iconbox_cta_type!' => 'none',
				),
				'selector'      => '{{WRAPPER}} a.hfe-iconbox-cta-link',
			)
		);

		$this->add_control(
			'iconbox_button_size',
			array(
				'label'     => __( 'Size', 'uael' ),
				'type'      => Controls_Manager::SELECT,
				'default'   => 'sm',
				'options'   => array(
					'xs' => __( 'Extra Small', 'uael' ),
					'sm' => __( 'Small', 'uael' ),
					'md' => __( 'Medium', 'uael' ),
					'lg' => __( 'Large', 'uael' ),
					'xl' => __( 'Extra Large', 'uael' ),
				),
				'condition' => array(
					'iconbox_cta_type' => 'button',
				),
			)
		);

		$this->add_control(
			'iconbox_button_colors',
			array(
				'label'     => __( 'Colors', 'uael' ),
				'type'      => Controls_Manager::HEADING,
				'separator' => 'before',
				'condition' => array(
					'iconbox_cta_type' => 'button',
				),
			)
		);

		$this->start_controls_tabs( 'iconbox_tabs_button_style' );

			$this->start_controls_tab(
				'iconbox_button_normal',
				array(
					'label'     => __( 'Normal', 'uael' ),
					'condition' => array(
						'iconbox_cta_type' => 'button',
					),
				)
			);
			$this->add_control(
				'iconbox_button_text_color',
				array(
					'label'     => __( 'Text Color', 'uael' ),
					'type'      => Controls_Manager::COLOR,
					'default'   => '',
					'condition' => array(
						'iconbox_cta_type' => 'button',
					),
					'selectors' => array(
						'{{WRAPPER}} a.elementor-button, {{WRAPPER}} .elementor-button' => 'color: {{VALUE}};',
						'{{WRAPPER}} a.elementor-button svg, {{WRAPPER}} .elementor-button svg' => 'fill: {{VALUE}};',
					),
				)
			);
			$this->add_group_control(
				Group_Control_Background::get_type(),
				array(
					'name'           => 'btn_background_color',
					'label'          => __( 'Background Color', 'uael' ),
					'types'          => array( 'classic', 'gradient' ),
					'selector'       => '{{WRAPPER}} .elementor-button',
					'condition'      => array(
						'iconbox_cta_type' => 'button',
					),
					'fields_options' => array(
						'color' => array(
							'global' => array(
								'default' => Global_Colors::COLOR_ACCENT,
							),
						),
					),
				)
			);

			$this->add_control(
				'iconbox_button_border',
				array(
					'label'       => __( 'Border Style', 'uael' ),
					'type'        => Controls_Manager::SELECT,
					'default'     => 'none',
					'label_block' => false,
					'options'     => array(
						'none'    => __( 'None', 'uael' ),
						'default' => __( 'Default', 'uael' ),
						'solid'   => __( 'Solid', 'uael' ),
						'double'  => __( 'Double', 'uael' ),
						'dotted'  => __( 'Dotted', 'uael' ),
						'dashed'  => __( 'Dashed', 'uael' ),
					),
					'condition'   => array(
						'iconbox_cta_type' => 'button',
					),
					'selectors'   => array(
						'{{WRAPPER}} .elementor-button' => 'border-style: {{VALUE}};',
					),
				)
			);
			$this->add_control(
				'iconbox_button_border_color',
				array(
					'label'     => __( 'Border Color', 'uael' ),
					'type'      => Controls_Manager::COLOR,
					'condition' => array(
						'iconbox_cta_type'       => 'button',
						'iconbox_button_border!' => array( 'none', 'default' ),
					),
					'default'   => '',
					'selectors' => array(
						'{{WRAPPER}} .elementor-button' => 'border-color: {{VALUE}};',
					),
				)
			);
			$this->add_control(
				'iconbox_button_border_size',
				array(
					'label'      => __( 'Border Width', 'uael' ),
					'type'       => Controls_Manager::DIMENSIONS,
					'size_units' => array( 'px' ),
					'default'    => array(
						'top'    => '1',
						'bottom' => '1',
						'left'   => '1',
						'right'  => '1',
						'unit'   => 'px',
					),
					'condition'  => array(
						'iconbox_cta_type'       => 'button',
						'iconbox_button_border!' => array( 'none', 'default' ),
					),
					'selectors'  => array(
						'{{WRAPPER}} .elementor-button' => 'border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
					),
				)
			);

			$this->add_control(
				'iconbox_button_radius',
				array(
					'label'      => __( 'Rounded Corners', 'uael' ),
					'type'       => Controls_Manager::DIMENSIONS,
					'size_units' => array( 'px', '%' ),
					'default'    => array(
						'top'    => '0',
						'bottom' => '0',
						'left'   => '0',
						'right'  => '0',
						'unit'   => 'px',
					),
					'selectors'  => array(
						'{{WRAPPER}} a.elementor-button, {{WRAPPER}} .elementor-button' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
					),
					'condition'  => array(
						'iconbox_cta_type' => 'button',
					),
				)
			);

			$this->add_responsive_control(
				'iconbox_button_custom_padding',
				array(
					'label'      => __( 'Padding', 'uael' ),
					'type'       => Controls_Manager::DIMENSIONS,
					'size_units' => array( 'px', 'em', '%' ),
					'selectors'  => array(
						'{{WRAPPER}} a.elementor-button, {{WRAPPER}} .elementor-button' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
					),
					'condition'  => array(
						'iconbox_cta_type' => 'button',
					),
				)
			);

			$this->end_controls_tab();

			$this->start_controls_tab(
				'iconbox_button_hover',
				array(
					'label'     => __( 'Hover', 'uael' ),
					'condition' => array(
						'iconbox_cta_type' => 'button',
					),
				)
			);
			$this->add_control(
				'iconbox_button_hover_color',
				array(
					'label'     => __( 'Text Hover Color', 'uael' ),
					'type'      => Controls_Manager::COLOR,
					'condition' => array(
						'iconbox_cta_type' => 'button',
					),
					'selectors' => array(
						'{{WRAPPER}} a.elementor-button:hover, {{WRAPPER}} .elementor-button:hover' => 'color: {{VALUE}};',
					),
				)
			);
			$this->add_group_control(
				Group_Control_Background::get_type(),
				array(
					'name'           => 'iconbox_button_hover_bgcolor',
					'label'          => __( 'Background Hover Color', 'uael' ),
					'types'          => array( 'classic', 'gradient' ),
					'selector'       => '{{WRAPPER}} a.elementor-button:hover, {{WRAPPER}} .elementor-button:hover',
					'condition'      => array(
						'iconbox_cta_type' => 'button',
					),
					'fields_options' => array(
						'color' => array(
							'global' => array(
								'default' => Global_Colors::COLOR_ACCENT,
							),
						),
					),
				)
			);

			$this->add_control(
				'iconbox_button_border_hover_color',
				array(
					'label'     => __( 'Border Color', 'uael' ),
					'type'      => Controls_Manager::COLOR,
					'condition' => array(
						'iconbox_cta_type'       => 'button',
						'iconbox_button_border!' => 'none',
					),
					'selectors' => array(
						'{{WRAPPER}} a.elementor-button:hover, {{WRAPPER}} .elementor-button:hover' => 'border-color: {{VALUE}};',
					),
				)
			);

			$this->end_controls_tab();

		$this->end_controls_tabs();

		$this->end_controls_section();
	}

	/**
	 * Register Iconbox Typography Controls.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function register_typo_content_controls() {
		$this->start_controls_section(
			'section_typography_field',
			array(
				'label' => __( 'Typography', 'uael' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			)
		);

		$this->add_control(
			'iconbox_title_typo',
			array(
				'label'     => __( 'Title', 'uael' ),
				'type'      => Controls_Manager::HEADING,
				'condition' => array(
					'iconbox_title!' => '',
				),
			)
		);
		$this->add_control(
			'iconbox_title_tag',
			array(
				'label'     => __( 'Title Tag', 'uael' ),
				'type'      => Controls_Manager::SELECT,
				'options'   => array(
					'h1'  => __( 'H1', 'uael' ),
					'h2'  => __( 'H2', 'uael' ),
					'h3'  => __( 'H3', 'uael' ),
					'h4'  => __( 'H4', 'uael' ),
					'h5'  => __( 'H5', 'uael' ),
					'h6'  => __( 'H6', 'uael' ),
					'div' => __( 'div', 'uael' ),
					'p'   => __( 'p', 'uael' ),
				),
				'default'   => 'h3',
				'condition' => array(
					'iconbox_title!' => '',
				),
			)
		);
		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'      => 'title_typography',
				'global'    => array(
					'default' => Global_Typography::TYPOGRAPHY_PRIMARY,
				),
				'selector'  => '{{WRAPPER}} .hfe-iconbox-title',
				'condition' => array(
					'iconbox_title!' => '',
				),
			)
		);
		$this->add_control(
			'iconbox_title_color',
			array(
				'label'     => __( 'Color', 'uael' ),
				'type'      => Controls_Manager::COLOR,
				'global'    => array(
					'default' => Global_Colors::COLOR_PRIMARY,
				),
				'default'   => '',
				'condition' => array(
					'iconbox_title!' => '',
				),
				'selectors' => array(
					'{{WRAPPER}} .hfe-iconbox-title' => 'color: {{VALUE}};',
				),
			)
		);

		$this->add_control(
			'iconbox_title_hover_color',
			array(
				'label'     => __( 'Hover Color', 'uael' ),
				'type'      => Controls_Manager::COLOR,
				'default'   => '',
				'condition' => array(
					'iconbox_title!'   => '',
					'iconbox_cta_type' => 'module',
				),
				'selectors' => array(
					'{{WRAPPER}} .hfe-iconbox-link-type-module a.hfe-iconbox-module-link:hover + .hfe-iconbox-content .hfe-iconbox-title' => 'color: {{VALUE}};',
				),
			)
		);

		$this->add_control(
			'iconbox_desc_typo',
			array(
				'label'     => __( 'Description', 'uael' ),
				'type'      => Controls_Manager::HEADING,
				'separator' => 'before',
				'condition' => array(
					'iconbox_description!' => '',
				),
			)
		);
		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'      => 'desc_typography',
				'global'    => array(
					'default' => Global_Typography::TYPOGRAPHY_TEXT,
				),
				'selector'  => '{{WRAPPER}} .hfe-iconbox-text',
				'condition' => array(
					'iconbox_description!' => '',
				),
			)
		);
		$this->add_control(
			'iconbox_desc_color',
			array(
				'label'     => __( 'Description Color', 'uael' ),
				'type'      => Controls_Manager::COLOR,
				'global'    => array(
					'default' => Global_Colors::COLOR_TEXT,
				),
				'default'   => '',
				'condition' => array(
					'iconbox_description!' => '',
				),
				'selectors' => array(
					'{{WRAPPER}} .hfe-iconbox-text' => 'color: {{VALUE}};',
				),
			)
		);

		$this->add_control(
			'iconbox_link_typo',
			array(
				'label'     => __( 'CTA Link Text', 'uael' ),
				'type'      => Controls_Manager::HEADING,
				'separator' => 'before',
				'condition' => array(
					'iconbox_cta_type' => 'link',
				),
			)
		);

		$this->add_control(
			'iconbox_button_typo',
			array(
				'label'     => __( 'CTA Button Text', 'uael' ),
				'type'      => Controls_Manager::HEADING,
				'separator' => 'before',
				'condition' => array(
					'iconbox_cta_type' => 'button',
				),
			)
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'      => 'cta_typography',
				'global'    => array(
					'default' => Global_Typography::TYPOGRAPHY_SECONDARY,
				),
				'selector'  => '{{WRAPPER}} .hfe-iconbox-cta-link, {{WRAPPER}} .elementor-button, {{WRAPPER}} a.elementor-button',
				'condition' => array(
					'iconbox_cta_type' => array( 'link', 'button' ),
				),
			)
		);
		$this->add_control(
			'iconbox_cta_color',
			array(
				'label'     => __( 'Link Color', 'uael' ),
				'type'      => Controls_Manager::COLOR,
				'global'    => array(
					'default' => Global_Colors::COLOR_ACCENT,
				),
				'selectors' => array(
					'{{WRAPPER}} .hfe-iconbox-cta-link' => 'color: {{VALUE}};',
				),
				'condition' => array(
					'iconbox_cta_type' => 'link',
				),
			)
		);

		$this->end_controls_section();
	}

	/**
	 * Register Iconbox Margin Controls.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function register_margin_content_controls() {
		$this->start_controls_section(
			'section_margin_field',
			array(
				'label' => __( 'Margins', 'uael' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			)
		);
		$this->add_responsive_control(
			'iconbox_title_margin',
			array(
				'label'      => __( 'Title Margin', 'uael' ),
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => array( 'px' ),
				'default'    => array(
					'top'      => '0',
					'bottom'   => '10',
					'left'     => '0',
					'right'    => '0',
					'unit'     => 'px',
					'isLinked' => false,
				),
				'selectors'  => array(
					'{{WRAPPER}} .hfe-iconbox-title' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				),
				'condition'  => array(
					'iconbox_title!' => '',
				),
			)
		);

		$this->add_responsive_control(
			'iconbox_responsive_icon_margin',
			array(
				'label'      => __( 'Icon Margin', 'uael' ),
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => array( 'px' ),
				'condition'  => array(
					'uael_iconbox_image_type' => array( 'icon', 'photo' ),
				),
				'selectors'  => array(
					'{{WRAPPER}} .hfe-imgicon-wrap' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				),
			)
		);

		$this->add_responsive_control(
			'iconbox_desc_margin',
			array(
				'label'      => __( 'Description Margins', 'uael' ),
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => array( 'px' ),
				'default'    => array(
					'top'      => '0',
					'bottom'   => '0',
					'left'     => '0',
					'right'    => '0',
					'unit'     => 'px',
					'isLinked' => false,
				),
				'condition'  => array(
					'iconbox_description!' => '',
				),
				'selectors'  => array(
					'{{WRAPPER}} .hfe-iconbox-text' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				),
			)
		);

		$this->add_responsive_control(
			'iconbox_cta_margin',
			array(
				'label'      => __( 'CTA Margin', 'uael' ),
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => array( 'px' ),
				'default'    => array(
					'top'      => '10',
					'bottom'   => '0',
					'left'     => '0',
					'right'    => '0',
					'unit'     => 'px',
					'isLinked' => false,
				),
				'selectors'  => array(
					'{{WRAPPER}} .hfe-iconbox-cta-link-style, {{WRAPPER}} .hfe-button-wrapper' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				),
				'condition'  => array(
					'iconbox_cta_type' => array( 'link', 'button' ),
				),
			)
		);
		$this->end_controls_section();
	}

	/**
	 * Render Info Box output on the frontend.
	 *
	 * Written in PHP and used to generate the final HTML.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function render() {
		$html     = '';
		$settings = $this->get_settings_for_display();
		$node_id  = $this->get_id();
		
	}
	/**
	 * Render Info Box widget output in the editor.
	 *
	 * Written as a Backbone JavaScript template and used to generate the live preview.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function content_template() {}
}
