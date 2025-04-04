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
	 * @since 1.5.1
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
	 * @since 1.36.37
	 * @return bool True for dynamic content, false for static content.
	 */
	protected function is_dynamic_content(): bool { // phpcs:ignore
		return false;
	}

	/**
	 * Register Iconbox controls.
	 *
	 * @since 1.29.2
	 * @access protected
	 */
	protected function register_controls() {

		$this->register_general_content_controls();
		$this->register_imgicon_content_controls();
		$this->register_cta_content_controls();
		$this->register_typo_content_controls();
		$this->register_margin_content_controls();
	}

	/**
	 * Register Infobox General Controls.
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
			'infobox_title_prefix',
			array(
				'label'    => __( 'Title Prefix', 'uael' ),
				'type'     => Controls_Manager::TEXT,
				'dynamic'  => array(
					'active' => true,
				),
				'selector' => '{{WRAPPER}} .uael-infobox-title-prefix',
			)
		);
		$this->add_control(
			'infobox_title',
			array(
				'label'    => __( 'Title', 'uael' ),
				'type'     => Controls_Manager::TEXT,
				'selector' => '{{WRAPPER}} .uael-infobox-title',
				'dynamic'  => array(
					'active' => true,
				),
				'default'  => __( 'Info Box', 'uael' ),
			)
		);
		$this->add_control(
			'infobox_description',
			array(
				'label'    => __( 'Description', 'uael' ),
				'type'     => Controls_Manager::TEXTAREA,
				'selector' => '{{WRAPPER}} .uael-infobox-text',
				'dynamic'  => array(
					'active' => true,
				),
				'default'  => __( 'Enter description text here.Lorem ipsum dolor sit amet, consectetur adipiscing. Quo incidunt ullamco.​', 'uael' ),
			)
		);

		$this->end_controls_section();
	}

	/**
	 * Register Infobox Image/Icon Controls.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function register_imgicon_content_controls() {
		$this->start_controls_section(
			'section_image_field',
			array(
				'label' => __( 'Image/Icon', 'uael' ),
			)
		);

		$this->add_control(
			'infobox_image_position',
			array(
				'label'       => __( 'Select Position', 'uael' ),
				'type'        => Controls_Manager::SELECT,
				'default'     => 'above-title',
				'label_block' => false,
				'options'     => array(
					'above-title' => __( 'Above Heading', 'uael' ),
					'below-title' => __( 'Below Heading', 'uael' ),
					'left-title'  => __( 'Left of Heading', 'uael' ),
					'right-title' => __( 'Right of Heading', 'uael' ),
					'left'        => __( 'Left of Text and Heading', 'uael' ),
					'right'       => __( 'Right of Text and Heading', 'uael' ),
				),
			)
		);

		$this->add_responsive_control(
			'infobox_align',
			array(
				'label'     => __( 'Overall Alignment', 'uael' ),
				'type'      => Controls_Manager::CHOOSE,
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
				'default'   => 'center',
				'condition' => array(
					'uael_infobox_image_type' => array( 'icon', 'photo' ),
					'infobox_image_position'  => array( 'above-title', 'below-title' ),
				),
				'selectors' => array(
					'{{WRAPPER}} .uael-infobox,  {{WRAPPER}} .uael-separator-parent' => 'text-align: {{VALUE}};',
				),
			)
		);

		$this->add_control(
			'infobox_img_mob_view',
			array(
				'label'       => __( 'Responsive Support', 'uael' ),
				'description' => __( 'Choose on what breakpoint the Infobox will stack.', 'uael' ),
				'type'        => Controls_Manager::SELECT,
				'default'     => 'tablet',
				'options'     => array(
					'none'   => __( 'No', 'uael' ),
					'tablet' => __( 'For Tablet & Mobile ', 'uael' ),
					'mobile' => __( 'For Mobile Only', 'uael' ),
				),
				'condition'   => array(
					'uael_infobox_image_type' => array( 'icon', 'photo' ),
					'infobox_image_position'  => array( 'left', 'right' ),
				),
			)
		);

		$this->add_control(
			'infobox_image_valign',
			array(
				'label'       => __( 'Vertical Alignment', 'uael' ),
				'type'        => Controls_Manager::CHOOSE,
				'label_block' => false,
				'options'     => array(
					'top'    => array(
						'title' => __( 'Top', 'uael' ),
						'icon'  => 'eicon-v-align-top',
					),
					'middle' => array(
						'title' => __( 'Middle', 'uael' ),
						'icon'  => 'eicon-v-align-middle',
					),
				),
				'default'     => 'top',
				'condition'   => array(
					'uael_infobox_image_type' => array( 'icon', 'photo' ),
					'infobox_image_position'  => array( 'left-title', 'right-title', 'left', 'right' ),
				),
			)
		);

		$this->add_responsive_control(
			'infobox_overall_align',
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
				'condition' => array(
					'uael_infobox_image_type!' => array( 'icon', 'photo' ),
				),
				'selectors' => array(
					'{{WRAPPER}} .uael-infobox, {{WRAPPER}} .uael-separator-parent' => 'text-align: {{VALUE}};',
				),
			)
		);

		$this->add_control(
			'infobox_imgicon_style',
			array(
				'label'       => __( 'Image/Icon Style', 'uael' ),
				'type'        => Controls_Manager::SELECT,
				'default'     => 'normal',
				'label_block' => false,
				'options'     => array(
					'normal' => __( 'Normal', 'uael' ),
					'circle' => __( 'Circle Background', 'uael' ),
					'square' => __( 'Square / Rectangle Background', 'uael' ),
					'custom' => __( 'Design your own', 'uael' ),
				),
				'condition'   => array(
					'uael_infobox_image_type!' => '',
				),
			)
		);
		$this->add_control(
			'uael_infobox_image_type',
			array(
				'label'   => __( 'Image Type', 'uael' ),
				'type'    => Controls_Manager::CHOOSE,
				'options' => array(
					'photo' => array(
						'title' => __( 'Image', 'uael' ),
						'icon'  => 'fa fa-image',
					),
					'icon'  => array(
						'title' => __( 'Font Icon', 'uael' ),
						'icon'  => 'fa fa-info-circle',
					),
				),
				'default' => 'icon',
				'toggle'  => true,
			)
		);
		$this->add_control(
			'infobox_icon_basics',
			array(
				'label'     => __( 'Icon Basics', 'uael' ),
				'type'      => Controls_Manager::HEADING,
				'condition' => array(
					'uael_infobox_image_type' => 'icon',
				),
			)
		);

		$this->add_control(
			'new_infobox_select_icon',
			array(
				'label'            => __( 'Select Icon', 'uael' ),
				'type'             => Controls_Manager::ICONS,
				'fa4compatibility' => 'infobox_select_icon',
				'default'          => array(
					'value'   => 'fa fa-star',
					'library' => 'fa-solid',
				),
				'condition'        => array(
					'uael_infobox_image_type' => 'icon',
				),
				'render_type'      => 'template',
			)
		);

		$this->add_responsive_control(
			'infobox_icon_size',
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
					'uael_infobox_image_type' => array( 'icon' ),
				),
				'selectors'  => array(
					'{{WRAPPER}} .uael-icon-wrap .uael-icon i' => 'font-size: {{SIZE}}{{UNIT}}; height: {{SIZE}}{{UNIT}}; width: {{SIZE}}{{UNIT}};line-height: {{SIZE}}{{UNIT}}; text-align: center;',
					'{{WRAPPER}} .uael-icon-wrap .uael-icon' => ' height: {{SIZE}}{{UNIT}}; width: {{SIZE}}{{UNIT}};line-height: {{SIZE}}{{UNIT}};',
				),
			)
		);
		$this->add_control(
			'infobox_icon_rotate',
			array(
				'label'      => __( 'Rotate', 'uael' ),
				'type'       => Controls_Manager::SLIDER,
				'default'    => array(
					'size' => 0,
					'unit' => 'deg',
				),
				'selectors'  => array(
					'{{WRAPPER}} .uael-icon-wrap .uael-icon i,
					{{WRAPPER}} .uael-icon-wrap .uael-icon svg' => 'transform: rotate({{SIZE}}{{UNIT}});',
				),
				'condition' => array(
					'uael_infobox_image_type' => array( 'icon' ),
				),
			)
		);
		$this->add_control(
			'infobox_image_basics',
			array(
				'label'     => __( 'Image Basics', 'uael' ),
				'type'      => Controls_Manager::HEADING,
				'condition' => array(
					'uael_infobox_image_type' => 'photo',
				),
			)
		);
		$this->add_control(
			'uael_infobox_photo_type',
			array(
				'label'       => __( 'Photo Source', 'uael' ),
				'type'        => Controls_Manager::SELECT,
				'default'     => 'media',
				'label_block' => false,
				'options'     => array(
					'media' => __( 'Media Library', 'uael' ),
					'url'   => __( 'URL', 'uael' ),
				),
				'condition'   => array(
					'uael_infobox_image_type' => 'photo',
				),
			)
		);
		$this->add_control(
			'infobox_image',
			array(
				'label'     => __( 'Photo', 'uael' ),
				'type'      => Controls_Manager::MEDIA,
				'dynamic'   => array(
					'active' => true,
				),
				'default'   => array(
					'url' => Utils::get_placeholder_image_src(),
				),
				'condition' => array(
					'uael_infobox_image_type' => 'photo',
					'uael_infobox_photo_type' => 'media',

				),
			)
		);
		$this->add_control(
			'infobox_image_link',
			array(
				'label'         => __( 'Photo URL', 'uael' ),
				'type'          => Controls_Manager::URL,
				'default'       => array(
					'url' => '',
				),
				'show_external' => false, // Show the 'open in new tab' button.
				'condition'     => array(
					'uael_infobox_image_type' => 'photo',
					'uael_infobox_photo_type' => 'url',
				),
			)
		);

		$this->add_group_control(
			Group_Control_Image_Size::get_type(),
			array(
				'name'      => 'image', // Usage: `{name}_size` and `{name}_custom_dimension`, in this case `image_size` and `image_custom_dimension`phpcs:ignore Squiz.PHP.CommentedOutCode.Found.
				'default'   => 'full',
				'separator' => 'none',
				'condition' => array(
					'uael_infobox_image_type' => 'photo',
					'uael_infobox_photo_type' => 'media',
				),
			)
		);

		$this->add_responsive_control(
			'infobox_image_size',
			array(
				'label'      => __( 'Width', 'uael' ),
				'type'       => Controls_Manager::SLIDER,
				'size_units' => array( 'px', 'em', 'rem' ),
				'range'      => array(
					'px' => array(
						'min' => 1,
						'max' => 2000,
					),
				),
				'default'    => array(
					'size' => 150,
					'unit' => 'px',
				),
				'condition'  => array(
					'uael_infobox_image_type' => 'photo',
				),
				'selectors'  => array(
					'{{WRAPPER}} .uael-image img' => 'width: {{SIZE}}{{UNIT}};',
				),
			)
		);

			$this->add_responsive_control(
				'infobox_icon_bg_size',
				array(
					'label'      => __( 'Background Size', 'uael' ),
					'type'       => Controls_Manager::SLIDER,
					'size_units' => array( 'px' ),
					'range'      => array(
						'px' => array(
							'min' => 0,
							'max' => 200,
						),
					),
					'default'    => array(
						'size' => 20,
						'unit' => 'px',
					),
					'condition'  => array(
						'uael_infobox_image_type' => array( 'icon', 'photo' ),
						'infobox_imgicon_style!'  => 'normal',
					),
					'selectors'  => array(
						'{{WRAPPER}} .uael-icon-wrap .uael-icon, {{WRAPPER}} .uael-image .uael-image-content img' => 'padding: {{SIZE}}{{UNIT}}; display:inline-block; box-sizing:content-box;',
					),
				)
			);

		$this->start_controls_tabs( 'infobox_tabs_icon_style' );

			$this->start_controls_tab(
				'infobox_icon_normal',
				array(
					'label'     => __( 'Normal', 'uael' ),
					'condition' => array(
						'uael_infobox_image_type' => array( 'icon', 'photo' ),
						'infobox_imgicon_style!'  => 'normal',
					),
				)
			);
			$this->add_control(
				'infobox_icon_color',
				array(
					'label'      => __( 'Icon Color', 'uael' ),
					'type'       => Controls_Manager::COLOR,
					'global'     => array(
						'default' => Global_Colors::COLOR_PRIMARY,
					),
					'condition' => array(
						'uael_infobox_image_type' => array( 'icon' ),
					),
					'default'    => '',
					'selectors'  => array(
						'{{WRAPPER}} .uael-icon-wrap .uael-icon i' => 'color: {{VALUE}};',
						'{{WRAPPER}} .uael-icon-wrap .uael-icon svg' => 'fill: {{VALUE}};',
					),
				)
			);
			$this->add_control(
				'infobox_icons_hover_color',
				array(
					'label'      => __( 'Icon Hover Color', 'uael' ),
					'type'       => Controls_Manager::COLOR,
					'condition' => array(
						'uael_infobox_image_type' => array( 'icon' ),
					),
					'default'    => '',
					'selectors'  => array(
						'{{WRAPPER}} .uael-icon-wrap .uael-icon:hover > i, {{WRAPPER}} .uael-infobox-link-type-module .uael-infobox-module-link:hover ~ .uael-infobox-content .uael-imgicon-wrap i, {{WRAPPER}} .uael-infobox-link-type-module .uael-infobox-module-link:hover ~ .uael-imgicon-wrap i' => 'color: {{VALUE}};',
						'{{WRAPPER}} .uael-icon-wrap .uael-icon:hover > svg, {{WRAPPER}} .uael-infobox-link-type-module .uael-infobox-module-link:hover ~ .uael-infobox-content .uael-imgicon-wrap svg, {{WRAPPER}} .uael-infobox-link-type-module .uael-infobox-module-link:hover ~ .uael-imgicon-wrap svg' => 'fill: {{VALUE}};',
					),
				)
			);

			$this->add_control(
				'infobox_icon_bgcolor',
				array(
					'label'     => __( 'Background Color', 'uael' ),
					'type'      => Controls_Manager::COLOR,
					'global'    => array(
						'default' => Global_Colors::COLOR_SECONDARY,
					),
					'default'   => '',
					'condition' => array(
						'uael_infobox_image_type' => array( 'icon', 'photo' ),
						'infobox_imgicon_style!'  => 'normal',
					),
					'selectors' => array(
						'{{WRAPPER}} .uael-infobox:not(.uael-imgicon-style-normal) .uael-icon-wrap .uael-icon, {{WRAPPER}} .uael-infobox:not(.uael-imgicon-style-normal) .uael-image .uael-image-content img' => 'background-color: {{VALUE}};',
					),
				)
			);

			$this->add_control(
				'infobox_icon_border',
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
					'condition'   => array(
						'uael_infobox_image_type' => array( 'icon', 'photo' ),
						'infobox_imgicon_style'   => 'custom',
					),
					'selectors'   => array(
						'{{WRAPPER}} .uael-imgicon-style-custom .uael-icon-wrap .uael-icon, {{WRAPPER}} .uael-imgicon-style-custom .uael-image .uael-image-content img' => 'border-style: {{VALUE}};',
					),
				)
			);
			$this->add_control(
				'infobox_icon_border_color',
				array(
					'label'     => __( 'Border Color', 'uael' ),
					'type'      => Controls_Manager::COLOR,
					'global'    => array(
						'default' => Global_Colors::COLOR_PRIMARY,
					),
					'condition' => array(
						'uael_infobox_image_type' => array( 'icon', 'photo' ),
						'infobox_imgicon_style'   => 'custom',
						'infobox_icon_border!'    => 'none',
					),
					'default'   => '',
					'selectors' => array(
						'{{WRAPPER}} .uael-imgicon-style-custom .uael-icon-wrap .uael-icon, {{WRAPPER}} .uael-imgicon-style-custom .uael-image .uael-image-content img' => 'border-color: {{VALUE}};',
					),
				)
			);
			$this->add_control(
				'infobox_icon_border_size',
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
						'uael_infobox_image_type' => array( 'icon', 'photo' ),
						'infobox_imgicon_style'   => 'custom',
						'infobox_icon_border!'    => 'none',
					),
					'selectors'  => array(
						'{{WRAPPER}} .uael-imgicon-style-custom .uael-icon-wrap .uael-icon, {{WRAPPER}} .uael-imgicon-style-custom .uael-image .uael-image-content img' => 'border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}}; box-sizing:content-box;',
					),
				)
			);

			$this->add_responsive_control(
				'infobox_icon_border_radius',
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
						'uael_infobox_image_type' => array( 'icon', 'photo' ),
						'infobox_imgicon_style!'  => array( 'normal', 'circle', 'square' ),
					),
					'selectors'  => array(
						'{{WRAPPER}} .uael-imgicon-style-custom .uael-icon-wrap .uael-icon, {{WRAPPER}} .uael-imgicon-style-custom .uael-image .uael-image-content img' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}}; box-sizing:content-box;',
					),
				)
			);

			$this->add_control(
				'css_filters_heading',
				array(
					'label'     => __( 'Image Style', 'uael' ),
					'type'      => Controls_Manager::HEADING,
					'separator' => 'before',
					'condition' => array(
						'uael_infobox_image_type' => 'photo',
						'infobox_imgicon_style'   => 'custom',
					),
				)
			);

			$this->add_group_control(
				Group_Control_Css_Filter::get_type(),
				array(
					'name'      => 'css_filters',
					'selector'  => '{{WRAPPER}} .uael-image .uael-image-content img',
					'condition' => array(
						'uael_infobox_image_type' => 'photo',
						'infobox_imgicon_style!'  => 'normal',
					),
				)
			);

			$this->add_control(
				'image_opacity',
				array(
					'label'     => __( 'Image Opacity', 'uael' ),
					'type'      => Controls_Manager::SLIDER,
					'range'     => array(
						'px' => array(
							'max'  => 1,
							'min'  => 0.10,
							'step' => 0.01,
						),
					),
					'selectors' => array(
						'{{WRAPPER}} .uael-image .uael-image-content img' => 'opacity: {{SIZE}};',
					),
					'condition' => array(
						'uael_infobox_image_type' => 'photo',
						'infobox_imgicon_style!'  => 'normal',
					),
				)
			);

			$this->add_control(
				'background_hover_transition',
				array(
					'label'     => __( 'Transition Duration', 'uael' ),
					'type'      => Controls_Manager::SLIDER,
					'default'   => array(
						'size' => 0.3,
					),
					'range'     => array(
						'px' => array(
							'max'  => 3,
							'step' => 0.1,
						),
					),
					'selectors' => array(
						'{{WRAPPER}} .uael-image .uael-image-content img' => 'transition-duration: {{SIZE}}s',
					),
					'condition' => array(
						'uael_infobox_image_type' => 'photo',
						'infobox_imgicon_style!'  => 'normal',
					),
				)
			);

			$this->end_controls_tab();

			$this->start_controls_tab(
				'infobox_icon_hover',
				array(
					'label'     => __( 'Hover', 'uael' ),
					'condition' => array(
						'uael_infobox_image_type' => array( 'icon', 'photo' ),
						'infobox_imgicon_style!'  => 'normal',
					),
				)
			);
				$this->add_control(
					'infobox_icon_hover_color',
					array(
						'label'      => __( 'Icon Hover Color', 'uael' ),
						'type'       => Controls_Manager::COLOR,
						'condition' => array(
							'uael_infobox_image_type' => array( 'icon' ),
						),
						'default'    => '',
						'selectors'  => array(
							'{{WRAPPER}} .uael-icon-wrap .uael-icon:hover > i, {{WRAPPER}} .uael-infobox-link-type-module .uael-infobox-module-link:hover ~ .uael-infobox-content .uael-imgicon-wrap i, {{WRAPPER}} .uael-infobox-link-type-module .uael-infobox-module-link:hover ~ .uael-imgicon-wrap i' => 'color: {{VALUE}};',
							'{{WRAPPER}} .uael-icon-wrap .uael-icon:hover > svg, {{WRAPPER}} .uael-infobox-link-type-module .uael-infobox-module-link:hover ~ .uael-infobox-content .uael-imgicon-wrap svg, {{WRAPPER}} .uael-infobox-link-type-module .uael-infobox-module-link:hover ~ .uael-imgicon-wrap svg' => 'fill: {{VALUE}};',
						),
					)
				);

				$this->add_control(
					'infobox_icon_hover_bgcolor',
					array(
						'label'     => __( 'Background Hover Color', 'uael' ),
						'type'      => Controls_Manager::COLOR,
						'default'   => '',
						'condition' => array(
							'uael_infobox_image_type' => array( 'icon', 'photo' ),
							'infobox_imgicon_style!'  => 'normal',
						),
						'selectors' => array(
							'{{WRAPPER}} .uael-icon-wrap .uael-icon:hover, {{WRAPPER}} .uael-image-content img:hover, {{WRAPPER}} .uael-infobox-link-type-module .uael-infobox-module-link:hover ~ .uael-infobox-content .uael-imgicon-wrap .uael-icon, {{WRAPPER}} .uael-infobox-link-type-module .uael-infobox-module-link:hover ~ .uael-imgicon-wrap .uael-icon, {{WRAPPER}} .uael-infobox-link-type-module .uael-infobox-module-link:hover ~ .uael-image .uael-image-content img, {{WRAPPER}} .uael-infobox-link-type-module .uael-infobox-module-link:hover ~ .uael-imgicon-wrap img,{{WRAPPER}} .uael-infobox:not(.uael-imgicon-style-normal) .uael-icon-wrap .uael-icon:hover,{{WRAPPER}} .uael-infobox:not(.uael-imgicon-style-normal) .uael-image .uael-image-content img:hover' => 'background-color: {{VALUE}};',
						),
					)
				);

				$this->add_control(
					'infobox_icon_hover_border',
					array(
						'label'     => __( 'Border Hover Color', 'uael' ),
						'type'      => Controls_Manager::COLOR,
						'condition' => array(
							'uael_infobox_image_type' => array( 'icon', 'photo' ),
							'infobox_icon_border!'    => 'none',
							'infobox_imgicon_style!'  => 'normal',
						),
						'default'   => '',
						'selectors' => array(
							'{{WRAPPER}} .uael-icon-wrap .uael-icon:hover, {{WRAPPER}} .uael-image-content img:hover,  {{WRAPPER}} .uael-infobox-link-type-module .uael-infobox-module-link:hover ~ .uael-infobox-content .uael-imgicon-wrap .uael-icon, {{WRAPPER}} .uael-infobox-link-type-module .uael-infobox-module-link:hover ~ .uael-imgicon-wrap .uael-icon, {{WRAPPER}} .uael-infobox-link-type-module .uael-infobox-module-link:hover ~ .uael-image .uael-image-content img, {{WRAPPER}} .uael-infobox-link-type-module .uael-infobox-module-link:hover ~ .uael-imgicon-wrap img ' => 'border-color: {{VALUE}};',
						),
					)
				);

				$this->add_group_control(
					Group_Control_Css_Filter::get_type(),
					array(
						'name'      => 'hover_css_filters',
						'selector'  => '{{WRAPPER}} .uael-image-content img:hover, {{WRAPPER}} .uael-infobox-link-type-module .uael-infobox-module-link:hover ~ .uael-imgicon-wrap .uael-icon, {{WRAPPER}} .uael-infobox-link-type-module .uael-infobox-module-link:hover ~ .uael-image .uael-image-content img, {{WRAPPER}} .uael-infobox-link-type-module .uael-infobox-module-link:hover ~ .uael-imgicon-wrap img',
						'condition' => array(
							'uael_infobox_image_type' => 'photo',
							'infobox_imgicon_style!'  => 'normal',
						),
					)
				);

				$this->add_control(
					'hover_image_opacity',
					array(
						'label'     => __( 'Opacity', 'uael' ),
						'type'      => Controls_Manager::SLIDER,
						'range'     => array(
							'px' => array(
								'max'  => 1,
								'min'  => 0.10,
								'step' => 0.01,
							),
						),
						'selectors' => array(
							'{{WRAPPER}} .uael-image-content img:hover, {{WRAPPER}} .uael-infobox-link-type-module .uael-infobox-module-link:hover ~ .uael-imgicon-wrap .uael-icon, {{WRAPPER}} .uael-infobox-link-type-module .uael-infobox-module-link:hover ~ .uael-image .uael-image-content img, {{WRAPPER}} .uael-infobox-link-type-module .uael-infobox-module-link:hover ~ .uael-imgicon-wrap img' => 'opacity: {{SIZE}};',
						),
						'condition' => array(
							'uael_infobox_image_type' => 'photo',
							'infobox_imgicon_style!'  => 'normal',
						),
					)
				);

				$this->add_control(
					'infobox_imgicon_animation',
					array(
						'label'     => __( 'Hover Animation', 'uael' ),
						'type'      => Controls_Manager::HOVER_ANIMATION,
						'condition' => array(
							'uael_infobox_image_type' => array( 'icon', 'photo' ),
							'infobox_imgicon_style!'  => 'normal',
						),
					)
				);
			$this->end_controls_tab();

		$this->end_controls_tabs();

		$this->add_control(
			'normal_imgicon_animation',
			array(
				'label'     => __( 'Hover Animation', 'uael' ),
				'type'      => Controls_Manager::HOVER_ANIMATION,
				'condition' => array(
					'uael_infobox_image_type' => array( 'icon', 'photo' ),
					'infobox_imgicon_style'   => 'normal',
				),
			)
		);

		$this->add_control(
			'normal_css_filters_heading',
			array(
				'label'     => __( 'Image Style', 'uael' ),
				'type'      => Controls_Manager::HEADING,
				'separator' => 'before',
				'condition' => array(
					'uael_infobox_image_type' => 'photo',
					'infobox_imgicon_style'   => 'normal',
				),
			)
		);

		$this->add_group_control(
			Group_Control_Css_Filter::get_type(),
			array(
				'name'      => 'normal_css_filters',
				'selector'  => '{{WRAPPER}} .uael-image .uael-image-content img',
				'condition' => array(
					'uael_infobox_image_type' => 'photo',
					'infobox_imgicon_style'   => 'normal',
				),
			)
		);

		$this->add_control(
			'normal_image_opacity',
			array(
				'label'     => __( 'Image Opacity', 'uael' ),
				'type'      => Controls_Manager::SLIDER,
				'range'     => array(
					'px' => array(
						'max'  => 1,
						'min'  => 0.10,
						'step' => 0.01,
					),
				),
				'selectors' => array(
					'{{WRAPPER}} .uael-image .uael-image-content img' => 'opacity: {{SIZE}};',
				),
				'condition' => array(
					'uael_infobox_image_type' => 'photo',
					'infobox_imgicon_style'   => 'normal',
				),
			)
		);

		$this->add_control(
			'normal_bg_hover_transition',
			array(
				'label'     => __( 'Transition Duration', 'uael' ),
				'type'      => Controls_Manager::SLIDER,
				'default'   => array(
					'size' => 0.3,
				),
				'range'     => array(
					'px' => array(
						'max'  => 3,
						'step' => 0.1,
					),
				),
				'selectors' => array(
					'{{WRAPPER}} .uael-image .uael-image-content img' => 'transition-duration: {{SIZE}}s',
				),
				'condition' => array(
					'uael_infobox_image_type' => 'photo',
					'infobox_imgicon_style'   => 'normal',
				),
			)
		);

		// End of section for Image Background color if custom design enabled.
		$this->end_controls_section();
	}

	/**
	 * Register Infobox CTA Controls.
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
			'infobox_cta_type',
			array(
				'label'       => __( 'Type', 'uael' ),
				'type'        => Controls_Manager::SELECT,
				'default'     => 'none',
				'label_block' => false,
				'options'     => array(
					'none'   => __( 'None', 'uael' ),
					'link'   => __( 'Text', 'uael' ),
					'button' => __( 'Button', 'uael' ),
					'module' => __( 'Complete Box', 'uael' ),
				),
			)
		);

		$this->add_control(
			'infobox_link_text',
			array(
				'label'     => __( 'Text', 'uael' ),
				'type'      => Controls_Manager::TEXT,
				'default'   => __( 'Read More', 'uael' ),
				'dynamic'   => array(
					'active' => true,
				),
				'condition' => array(
					'infobox_cta_type' => 'link',
				),
			)
		);

		$this->add_control(
			'infobox_button_text',
			array(
				'label'     => __( 'Text', 'uael' ),
				'type'      => Controls_Manager::TEXT,
				'default'   => __( 'Click Here', 'uael' ),
				'dynamic'   => array(
					'active' => true,
				),
				'condition' => array(
					'infobox_cta_type' => 'button',
				),
			)
		);

		$this->add_control(
			'infobox_text_link',
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
					'infobox_cta_type!' => 'none',
				),
				'selector'      => '{{WRAPPER}} a.uael-infobox-cta-link',
			)
		);

		$this->add_control(
			'infobox_button_size',
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
					'infobox_cta_type' => 'button',
				),
			)
		);

		$this->add_control(
			'infobox_icon_structure',
			array(
				'label'     => __( 'Icon', 'uael' ),
				'type'      => Controls_Manager::HEADING,
				'separator' => 'before',
				'condition' => array(
					'infobox_cta_type' => array( 'button', 'link' ),
				),
			)
		);

		$this->add_control(
			'new_infobox_button_icon',
			array(
				'label'            => __( 'Select Icon', 'uael' ),
				'type'             => Controls_Manager::ICONS,
				'fa4compatibility' => 'infobox_button_icon',
				'condition'        => array(
					'infobox_cta_type' => array( 'button', 'link' ),
				),
				'render_type'      => 'template',
			)
		);

		$this->add_control(
			'infobox_button_icon_position',
			array(
				'label'       => __( 'Icon Position', 'uael' ),
				'type'        => Controls_Manager::SELECT,
				'default'     => 'right',
				'label_block' => false,
				'options'     => array(
					'right' => __( 'After Text', 'uael' ),
					'left'  => __( 'Before Text', 'uael' ),
				),
				'condition'   => array(
					'infobox_cta_type' => array( 'button', 'link' ),
				),
			)
		);
		$this->add_control(
			'infobox_icon_spacing',
			array(
				'label'     => __( 'Icon Spacing', 'uael' ),
				'type'      => Controls_Manager::SLIDER,
				'range'     => array(
					'px' => array(
						'min' => 0,
						'max' => 50,
					),
				),
				'default'   => array(
					'size' => '5',
					'unit' => 'px',
				),
				'condition' => array(
					'infobox_cta_type' => array( 'button', 'link' ),
				),
				'selectors' => array(
					'{{WRAPPER}} .elementor-button .elementor-align-icon-right,{{WRAPPER}} .uael-infobox-link-icon-after' => 'margin-left: {{SIZE}}{{UNIT}};',
					'{{WRAPPER}} .elementor-button .elementor-align-icon-left, {{WRAPPER}} .uael-infobox-link-icon-before' => 'margin-right: {{SIZE}}{{UNIT}};',
				),
			)
		);

		$this->add_control(
			'infobox_button_colors',
			array(
				'label'     => __( 'Colors', 'uael' ),
				'type'      => Controls_Manager::HEADING,
				'separator' => 'before',
				'condition' => array(
					'infobox_cta_type' => 'button',
				),
			)
		);

		$this->start_controls_tabs( 'infobox_tabs_button_style' );

			$this->start_controls_tab(
				'infobox_button_normal',
				array(
					'label'     => __( 'Normal', 'uael' ),
					'condition' => array(
						'infobox_cta_type' => 'button',
					),
				)
			);
			$this->add_control(
				'infobox_button_text_color',
				array(
					'label'     => __( 'Text Color', 'uael' ),
					'type'      => Controls_Manager::COLOR,
					'default'   => '',
					'condition' => array(
						'infobox_cta_type' => 'button',
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
						'infobox_cta_type' => 'button',
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
				'infobox_button_border',
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
						'infobox_cta_type' => 'button',
					),
					'selectors'   => array(
						'{{WRAPPER}} .elementor-button' => 'border-style: {{VALUE}};',
					),
				)
			);
			$this->add_control(
				'infobox_button_border_color',
				array(
					'label'     => __( 'Border Color', 'uael' ),
					'type'      => Controls_Manager::COLOR,
					'condition' => array(
						'infobox_cta_type'       => 'button',
						'infobox_button_border!' => array( 'none', 'default' ),
					),
					'default'   => '',
					'selectors' => array(
						'{{WRAPPER}} .elementor-button' => 'border-color: {{VALUE}};',
					),
				)
			);
			$this->add_control(
				'infobox_button_border_size',
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
						'infobox_cta_type'       => 'button',
						'infobox_button_border!' => array( 'none', 'default' ),
					),
					'selectors'  => array(
						'{{WRAPPER}} .elementor-button' => 'border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
					),
				)
			);

			$this->add_control(
				'infobox_button_radius',
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
						'infobox_cta_type' => 'button',
					),
				)
			);
			$this->add_group_control(
				Group_Control_Box_Shadow::get_type(),
				array(
					'name'      => 'infobox_button_box_shadow',
					'selector'  => '{{WRAPPER}} .elementor-button',
					'condition' => array(
						'infobox_cta_type' => 'button',
					),
				)
			);

			$this->add_responsive_control(
				'infobox_button_custom_padding',
				array(
					'label'      => __( 'Padding', 'uael' ),
					'type'       => Controls_Manager::DIMENSIONS,
					'size_units' => array( 'px', 'em', '%' ),
					'selectors'  => array(
						'{{WRAPPER}} a.elementor-button, {{WRAPPER}} .elementor-button' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
					),
					'condition'  => array(
						'infobox_cta_type' => 'button',
					),
				)
			);

			$this->end_controls_tab();

			$this->start_controls_tab(
				'infobox_button_hover',
				array(
					'label'     => __( 'Hover', 'uael' ),
					'condition' => array(
						'infobox_cta_type' => 'button',
					),
				)
			);
			$this->add_control(
				'infobox_button_hover_color',
				array(
					'label'     => __( 'Text Hover Color', 'uael' ),
					'type'      => Controls_Manager::COLOR,
					'condition' => array(
						'infobox_cta_type' => 'button',
					),
					'selectors' => array(
						'{{WRAPPER}} a.elementor-button:hover, {{WRAPPER}} .elementor-button:hover' => 'color: {{VALUE}};',
					),
				)
			);
			$this->add_group_control(
				Group_Control_Background::get_type(),
				array(
					'name'           => 'infobox_button_hover_bgcolor',
					'label'          => __( 'Background Hover Color', 'uael' ),
					'types'          => array( 'classic', 'gradient' ),
					'selector'       => '{{WRAPPER}} a.elementor-button:hover, {{WRAPPER}} .elementor-button:hover',
					'condition'      => array(
						'infobox_cta_type' => 'button',
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
				'infobox_button_border_hover_color',
				array(
					'label'     => __( 'Border Color', 'uael' ),
					'type'      => Controls_Manager::COLOR,
					'condition' => array(
						'infobox_cta_type'       => 'button',
						'infobox_button_border!' => 'none',
					),
					'selectors' => array(
						'{{WRAPPER}} a.elementor-button:hover, {{WRAPPER}} .elementor-button:hover' => 'border-color: {{VALUE}};',
					),
				)
			);

			$this->add_group_control(
				Group_Control_Box_Shadow::get_type(),
				array(
					'name'      => 'cta_hover_box_shadow',
					'label'     => __( 'Box Shadow', 'uael' ),
					'condition' => array(
						'infobox_cta_type' => 'button',
					),
					'selector'  => '{{WRAPPER}} .uael-button-wrapper .elementor-button-link:hover',
				)
			);

			$this->add_control(
				'infobox_button_animation',
				array(
					'label'       => __( 'Hover Animation', 'uael' ),
					'type'        => Controls_Manager::HOVER_ANIMATION,
					'label_block' => false,
					'condition'   => array(
						'infobox_cta_type' => 'button',
					),
					'selector'    => '{{WRAPPER}} .elementor-button',
				)
			);

			$this->end_controls_tab();

		$this->end_controls_tabs();

		$this->end_controls_section();
	}

	/**
	 * Register Infobox Typography Controls.
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
			'infobox_prefix_typo',
			array(
				'label'     => __( 'Title Prefix', 'uael' ),
				'type'      => Controls_Manager::HEADING,
				'condition' => array(
					'infobox_title_prefix!' => '',
				),
			)
		);
		$this->add_control(
			'infobox_prefix_tag',
			array(
				'label'     => __( 'Prefix Tag', 'uael' ),
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
				'default'   => 'h5',
				'condition' => array(
					'infobox_title_prefix!' => '',
				),
			)
		);
		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'      => 'prefix_typography',
				'global'    => array(
					'default' => Global_Typography::TYPOGRAPHY_SECONDARY,
				),
				'selector'  => '{{WRAPPER}} .uael-infobox-title-prefix',
				'condition' => array(
					'infobox_title_prefix!' => '',
				),
			)
		);
		$this->add_control(
			'infobox_prefix_color',
			array(
				'label'     => __( 'Color', 'uael' ),
				'type'      => Controls_Manager::COLOR,
				'global'    => array(
					'default' => Global_Colors::COLOR_TEXT,
				),
				'default'   => '',
				'condition' => array(
					'infobox_title_prefix!' => '',
				),
				'selectors' => array(
					'{{WRAPPER}} .uael-infobox-title-prefix' => 'color: {{VALUE}};',
				),
			)
		);

		$this->add_control(
			'infobox_prefix_hover_color',
			array(
				'label'     => __( 'Hover Color', 'uael' ),
				'type'      => Controls_Manager::COLOR,
				'default'   => '',
				'condition' => array(
					'infobox_title_prefix!' => '',
					'infobox_cta_type'      => 'module',
				),
				'selectors' => array(
					'{{WRAPPER}} .uael-infobox-link-type-module .uael-infobox-module-link:hover + .uael-infobox-content .uael-infobox-title-prefix' => 'color: {{VALUE}};',
				),
			)
		);

		$this->add_control(
			'infobox_prefix_title_separator',
			array(
				'type'      => Controls_Manager::DIVIDER,
				'style'     => 'default',
				'condition' => array(
					'infobox_title_prefix!' => '',
				),
			)
		);

		$this->add_control(
			'infobox_title_typo',
			array(
				'label'     => __( 'Title', 'uael' ),
				'type'      => Controls_Manager::HEADING,
				'condition' => array(
					'infobox_title!' => '',
				),
			)
		);
		$this->add_control(
			'infobox_title_tag',
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
					'infobox_title!' => '',
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
				'selector'  => '{{WRAPPER}} .uael-infobox-title',
				'condition' => array(
					'infobox_title!' => '',
				),
			)
		);
		$this->add_control(
			'infobox_title_color',
			array(
				'label'     => __( 'Color', 'uael' ),
				'type'      => Controls_Manager::COLOR,
				'global'    => array(
					'default' => Global_Colors::COLOR_PRIMARY,
				),
				'default'   => '',
				'condition' => array(
					'infobox_title!' => '',
				),
				'selectors' => array(
					'{{WRAPPER}} .uael-infobox-title' => 'color: {{VALUE}};',
				),
			)
		);

		$this->add_control(
			'infobox_title_hover_color',
			array(
				'label'     => __( 'Hover Color', 'uael' ),
				'type'      => Controls_Manager::COLOR,
				'default'   => '',
				'condition' => array(
					'infobox_title!'   => '',
					'infobox_cta_type' => 'module',
				),
				'selectors' => array(
					'{{WRAPPER}} .uael-infobox-link-type-module a.uael-infobox-module-link:hover + .uael-infobox-content .uael-infobox-title' => 'color: {{VALUE}};',
				),
			)
		);

		$this->add_control(
			'blend_mode',
			array(
				'label'     => __( 'Blend Mode', 'uael' ),
				'type'      => Controls_Manager::SELECT,
				'options'   => array(
					''            => __( 'Normal', 'uael' ),
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
					'{{WRAPPER}} .uael-infobox-title' => 'mix-blend-mode: {{VALUE}}',
				),
				'separator' => 'none',
			)
		);

		$this->add_control(
			'infobox_desc_typo',
			array(
				'label'     => __( 'Description', 'uael' ),
				'type'      => Controls_Manager::HEADING,
				'separator' => 'before',
				'condition' => array(
					'infobox_description!' => '',
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
				'selector'  => '{{WRAPPER}} .uael-infobox-text',
				'condition' => array(
					'infobox_description!' => '',
				),
			)
		);
		$this->add_control(
			'infobox_desc_color',
			array(
				'label'     => __( 'Description Color', 'uael' ),
				'type'      => Controls_Manager::COLOR,
				'global'    => array(
					'default' => Global_Colors::COLOR_TEXT,
				),
				'default'   => '',
				'condition' => array(
					'infobox_description!' => '',
				),
				'selectors' => array(
					'{{WRAPPER}} .uael-infobox-text' => 'color: {{VALUE}};',
				),
			)
		);

		$this->add_control(
			'infobox_desc_hover_color',
			array(
				'label'     => __( 'Hover Color', 'uael' ),
				'type'      => Controls_Manager::COLOR,
				'default'   => '',
				'condition' => array(
					'infobox_description!' => '',
					'infobox_cta_type'     => 'module',
				),
				'selectors' => array(
					'{{WRAPPER}} .uael-infobox-link-type-module a.uael-infobox-module-link:hover + .uael-infobox-content .uael-infobox-text' => 'color: {{VALUE}};',
				),
			)
		);

		$this->add_control(
			'infobox_link_typo',
			array(
				'label'     => __( 'CTA Link Text', 'uael' ),
				'type'      => Controls_Manager::HEADING,
				'separator' => 'before',
				'condition' => array(
					'infobox_cta_type' => 'link',
				),
			)
		);

		$this->add_control(
			'infobox_button_typo',
			array(
				'label'     => __( 'CTA Button Text', 'uael' ),
				'type'      => Controls_Manager::HEADING,
				'separator' => 'before',
				'condition' => array(
					'infobox_cta_type' => 'button',
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
				'selector'  => '{{WRAPPER}} .uael-infobox-cta-link, {{WRAPPER}} .elementor-button, {{WRAPPER}} a.elementor-button',
				'condition' => array(
					'infobox_cta_type' => array( 'link', 'button' ),
				),
			)
		);
		$this->add_control(
			'infobox_cta_color',
			array(
				'label'     => __( 'Link Color', 'uael' ),
				'type'      => Controls_Manager::COLOR,
				'global'    => array(
					'default' => Global_Colors::COLOR_ACCENT,
				),
				'selectors' => array(
					'{{WRAPPER}} .uael-infobox-cta-link' => 'color: {{VALUE}};',
				),
				'condition' => array(
					'infobox_cta_type' => 'link',
				),
			)
		);

		$this->end_controls_section();
	}

	/**
	 * Register Infobox Margin Controls.
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
			'infobox_title_margin',
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
					'{{WRAPPER}} .uael-infobox-title' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				),
				'condition'  => array(
					'infobox_title!' => '',
				),
			)
		);

		$this->add_responsive_control(
			'title_prefix_margin',
			array(
				'label'      => __( 'Prefix Margin', 'uael' ),
				'type'       => Controls_Manager::DIMENSIONS,
				'default'    => array(
					'top'      => '0',
					'bottom'   => '0',
					'left'     => '0',
					'right'    => '0',
					'unit'     => 'px',
					'isLinked' => false,
				),
				'size_units' => array( 'px' ),
				'condition'  => array(
					'infobox_title_prefix!' => '',
				),
				'selectors'  => array(
					'{{WRAPPER}} .uael-infobox-title-prefix' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				),
			)
		);

		$this->add_responsive_control(
			'infobox_responsive_imgicon_margin',
			array(
				'label'      => __( 'Image/Icon Margin', 'uael' ),
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => array( 'px' ),
				'condition'  => array(
					'uael_infobox_image_type' => array( 'icon', 'photo' ),
				),
				'selectors'  => array(
					'{{WRAPPER}} .uael-imgicon-wrap' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				),
			)
		);

		$this->add_responsive_control(
			'infobox_desc_margin',
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
					'infobox_description!' => '',
				),
				'selectors'  => array(
					'{{WRAPPER}} .uael-infobox-text' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				),
			)
		);

		$this->add_responsive_control(
			'infobox_separator_margin',
			array(
				'label'      => __( 'Separator Margins', 'uael' ),
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => array( 'px' ),
				'default'    => array(
					'top'      => '20',
					'bottom'   => '20',
					'left'     => '0',
					'right'    => '0',
					'unit'     => 'px',
					'isLinked' => false,
				),
				'condition'  => array(
					'infobox_separator' => 'yes',
				),
				'selectors'  => array(
					'{{WRAPPER}} .uael-separator' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				),

			)
		);
		$this->add_responsive_control(
			'infobox_cta_margin',
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
					'{{WRAPPER}} .uael-infobox-cta-link-style, {{WRAPPER}} .uael-button-wrapper' => 'margin: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				),
				'condition'  => array(
					'infobox_cta_type' => array( 'link', 'button' ),
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
