<?php
/**
 * Elementor Classes.
 *
 * @package header-footer-elementor
 */

namespace HFE\WidgetsManager\Widgets;

use Elementor\Controls_Manager;
use Elementor\Group_Control_Border;
use Elementor\Group_Control_Typography;
use Elementor\Group_Control_Box_Shadow;
use Elementor\Scheme_Typography;
use Elementor\Scheme_Color;
use Elementor\Group_Control_Image_Size;
use Elementor\Group_Control_Css_Filter;
use Elementor\Group_Control_Text_Shadow;
use Elementor\Plugin;
use Elementor\Widget_Base;
use Elementor\Utils;

if ( ! defined( 'ABSPATH' ) ) {
	exit;   // Exit if accessed directly.
}
/**
 * HFE Featured Image widget
 *
 * HFE widget for Featured Image Image.
 *
 * @since x.x.x
 */
class Feature_Image extends Widget_Base {





	/**
	 * Retrieve the widget name.
	 *
	 * @since x.x.x
	 *
	 * @access public
	 *
	 * @return string Widget name.
	 */
	public function get_name() {
		return 'feature-image';
	}
	/**
	 * Retrieve the widget title.
	 *
	 * @since x.x.x
	 *
	 * @access public
	 *
	 * @return string Widget title.
	 */
	public function get_title() {
		return __( 'Feature Image', 'header-footer-elementor' );
	}
	/**
	 * Retrieve the widget icon.
	 *
	 * @since x.x.x
	 *
	 * @access public
	 *
	 * @return string Widget icon.
	 */
	public function get_icon() {
		return 'eicon-featured-image';
	}
	/**
	 * Retrieve the list of categories the widget belongs to.
	 *
	 * Used to determine where to display the widget in the editor.
	 *
	 * Note that currently Elementor supports only one category.
	 * When multiple categories passed, Elementor uses the first one.
	 *
	 * @since x.x.x
	 *
	 * @access public
	 *
	 * @return array Widget categories.
	 */
	public function get_categories() {
		return [ 'hfe-widgets' ];
	}
	/**
	 * Register Featured Image controls.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function _register_controls() {
		$this->register_content_featured_image_controls();
	}
	/**
	 * Register Featured Image General Controls.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function register_content_featured_image_controls() {
		$this->start_controls_section(
			'section_image',
			[
				'label' => __( 'Image', 'header-footer-elementor' ),
			]
		);

		$this->add_control(
			'feature_image',
			[
				'label'       => __( 'Enable Fallback', 'header-footer-elementor' ),
				'type'        => Controls_Manager::SWITCHER,
				'yes'         => __( 'Yes', 'uael' ),
				'no'          => __( 'No', 'uael' ),
				'default'     => 'no',
				'render_type' => 'template',
			]
		);

		$this->add_control(
			'custom_image',
			[
				'label'     => __( 'Custom Image', 'header-footer-elementor' ),
				'type'      => Controls_Manager::MEDIA,
				'dynamic'   => [
					'active' => true,
				],
				'default'   => [
					'url' => Utils::get_placeholder_image_src(),
				],
				'condition' => [
					'feature_image' => 'yes',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Image_Size::get_type(),
			[
				'name'    => 'feature_image',
				'label'   => __( 'Image Size', 'header-footer-elementor' ),
				'default' => 'medium',
			]
		);

		$this->add_responsive_control(
			'align',
			[
				'label'     => __( 'Alignment', 'header-footer-elementor' ),
				'type'      => Controls_Manager::CHOOSE,
				'options'   => [
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
				'selectors' => [
					'{{WRAPPER}}' => 'text-align: {{VALUE}};',
				],
			]
		);

		$this->add_control(
			'caption_source',
			[
				'label'   => __( 'Caption', 'header-footer-elementor' ),
				'type'    => Controls_Manager::SELECT,
				'options' => [
					'none'   => __( 'None', 'header-footer-elementor' ),
					'custom' => __( 'Custom Caption', 'header-footer-elementor' ),
				],
				'default' => 'none',
			]
		);

		$this->add_control(
			'caption',
			[
				'label'       => __( 'Custom Caption', 'header-footer-elementor' ),
				'type'        => Controls_Manager::TEXT,
				'default'     => '',
				'placeholder' => __( 'Enter your image caption', 'header-footer-elementor' ),
				'condition'   => [
					'caption_source' => 'custom',
				],
				'dynamic'     => [
					'active' => true,
				],
			]
		);

		$this->add_control(
			'link_to',
			[
				'label'   => __( 'Link', 'header-footer-elementor' ),
				'type'    => Controls_Manager::SELECT,
				'default' => 'none',
				'options' => [
					'none'   => __( 'None', 'header-footer-elementor' ),
					'file'   => __( 'Media File', 'header-footer-elementor' ),
					'custom' => __( 'Custom URL', 'header-footer-elementor' ),
				],
			]
		);

		$this->add_control(
			'link',
			[
				'label'       => __( 'Custom Link', 'header-footer-elementor' ),
				'type'        => Controls_Manager::URL,
				'dynamic'     => [
					'active' => true,
				],
				'placeholder' => __( 'https://your-link.com', 'header-footer-elementor' ),
				'condition'   => [
					'link_to' => 'custom',
				],
				'show_label'  => false,
			]
		);

		$this->add_control(
			'open_lightbox',
			[
				'label'     => __( 'Lightbox', 'header-footer-elementor' ),
				'type'      => Controls_Manager::SELECT,
				'default'   => 'default',
				'options'   => [
					'default' => __( 'Default', 'header-footer-elementor' ),
					'yes'     => __( 'Yes', 'header-footer-elementor' ),
					'no'      => __( 'No', 'header-footer-elementor' ),
				],
				'condition' => [
					'link_to' => 'file',
				],
			]
		);

		$this->add_control(
			'view',
			[
				'label'   => __( 'View', 'header-footer-elementor' ),
				'type'    => Controls_Manager::HIDDEN,
				'default' => 'traditional',
			]
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_style_image',
			[
				'label' => __( 'Image', 'header-footer-elementor' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			]
		);

		$this->add_responsive_control(
			'width',
			[
				'label'          => __( 'Width', 'header-footer-elementor' ),
				'type'           => Controls_Manager::SLIDER,
				'default'        => [
					'unit' => '%',
				],
				'tablet_default' => [
					'unit' => '%',
				],
				'mobile_default' => [
					'unit' => '%',
				],
				'size_units'     => [ '%', 'px', 'vw' ],
				'range'          => [
					'%'  => [
						'min' => 1,
						'max' => 100,
					],
					'px' => [
						'min' => 1,
						'max' => 1000,
					],
					'vw' => [
						'min' => 1,
						'max' => 100,
					],
				],
				'selectors'      => [
					'{{WRAPPER}} .hfe-featured-image' => 'width: {{SIZE}}{{UNIT}};',
				],
			]
		);

		$this->add_responsive_control(
			'space',
			[
				'label'          => __( 'Max Width', 'header-footer-elementor' ) . ' (%)',
				'type'           => Controls_Manager::SLIDER,
				'default'        => [
					'unit' => '%',
				],
				'tablet_default' => [
					'unit' => '%',
				],
				'mobile_default' => [
					'unit' => '%',
				],
				'size_units'     => [ '%' ],
				'range'          => [
					'%' => [
						'min' => 1,
						'max' => 100,
					],
				],
				'selectors'      => [
					'{{WRAPPER}} .hfe-featured-image' => 'max-width: {{SIZE}}{{UNIT}};',
				],
			]
		);

		$this->add_control(
			'separator_panel_style',
			[
				'type'  => Controls_Manager::DIVIDER,
				'style' => 'thick',
			]
		);

		$this->start_controls_tabs( 'image_effects' );

		$this->start_controls_tab(
			'normal',
			[
				'label' => __( 'Normal', 'header-footer-elementor' ),
			]
		);

		$this->add_control(
			'opacity',
			[
				'label'     => __( 'Opacity', 'header-footer-elementor' ),
				'type'      => Controls_Manager::SLIDER,
				'range'     => [
					'px' => [
						'max'  => 1,
						'min'  => 0.10,
						'step' => 0.01,
					],
				],
				'selectors' => [
					'{{WRAPPER}} .hfe-featured-image' => 'opacity: {{SIZE}};',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Css_Filter::get_type(),
			[
				'name'     => 'css_filters',
				'selector' => '{{WRAPPER}} .hfe-featured-image',
			]
		);

		$this->end_controls_tab();

		$this->start_controls_tab(
			'hover',
			[
				'label' => __( 'Hover', 'header-footer-elementor' ),
			]
		);

		$this->add_control(
			'opacity_hover',
			[
				'label'     => __( 'Opacity', 'header-footer-elementor' ),
				'type'      => Controls_Manager::SLIDER,
				'range'     => [
					'px' => [
						'max'  => 1,
						'min'  => 0.10,
						'step' => 0.01,
					],
				],
				'selectors' => [
					'{{WRAPPER}} .hfe-featured-image:hover' => 'opacity: {{SIZE}};',
				],
			]
		);

		$this->add_control(
			'background_hover_transition',
			[
				'label'     => __( 'Transition Duration', 'header-footer-elementor' ),
				'type'      => Controls_Manager::SLIDER,
				'range'     => [
					'px' => [
						'max'  => 3,
						'step' => 0.1,
					],
				],
				'selectors' => [
					'{{WRAPPER}} ..hfe-featured-image' => 'transition-duration: {{SIZE}}s',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Css_Filter::get_type(),
			[
				'name'     => 'css_filters_hover',
				'selector' => '{{WRAPPER}} .hfe-featured-image:hover img',
			]
		);

		$this->add_control(
			'hover_animation',
			[
				'label' => __( 'Hover Animation', 'header-footer-elementor' ),
				'type'  => Controls_Manager::HOVER_ANIMATION,
			]
		);

		$this->end_controls_tab();

		$this->end_controls_tabs();

		$this->add_group_control(
			Group_Control_Border::get_type(),
			[
				'name'      => 'image_border',
				'selector'  => '{{WRAPPER}} .hfe-featured-image',
				'separator' => 'before',
			]
		);

		$this->add_responsive_control(
			'image_border_radius',
			[
				'label'      => __( 'Border Radius', 'header-footer-elementor' ),
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', '%' ],
				'selectors'  => [
					'{{WRAPPER}} .hfe-featured-image' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Box_Shadow::get_type(),
			[
				'name'     => 'image_box_shadow',
				'exclude'  => [
					'box_shadow_position',
				],
				'selector' => '{{WRAPPER}} .hfe-featured-image',
			]
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_style_caption',
			[
				'label'     => __( 'Caption', 'header-footer-elementor' ),
				'tab'       => Controls_Manager::TAB_STYLE,
				'condition' => [
					'caption_source!' => 'none',
				],
			]
		);

		$this->add_control(
			'caption_align',
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
					'{{WRAPPER}} .widget-image-caption' => 'text-align: {{VALUE}};',
				],
			]
		);

		$this->add_control(
			'text_color',
			[
				'label'     => __( 'Text Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'default'   => '',
				'selectors' => [
					'{{WRAPPER}} .widget-image-caption' => 'color: {{VALUE}};',
				],
				'scheme'    => [
					'type'  => Scheme_Color::get_type(),
					'value' => Scheme_Color::COLOR_3,
				],
			]
		);

		$this->add_control(
			'caption_background_color',
			[
				'label'     => __( 'Background Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .widget-image-caption' => 'background-color: {{VALUE}};',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name'     => 'caption_typography',
				'selector' => '{{WRAPPER}} .widget-image-caption',
				'scheme'   => Scheme_Typography::TYPOGRAPHY_3,
			]
		);

		$this->add_group_control(
			Group_Control_Text_Shadow::get_type(),
			[
				'name'     => 'caption_text_shadow',
				'selector' => '{{WRAPPER}} .widget-image-caption',
			]
		);

		$this->add_responsive_control(
			'caption_space',
			[
				'label'     => __( 'Spacing', 'header-footer-elementor' ),
				'type'      => Controls_Manager::SLIDER,
				'range'     => [
					'px' => [
						'min' => 0,
						'max' => 100,
					],
				],
				'selectors' => [
					'{{WRAPPER}} .widget-image-caption' => 'margin-top: {{SIZE}}{{UNIT}};',
				],
			]
		);

		$this->end_controls_section();
	}


	/**
	 * Check if the current widget has caption
	 *
	 * @access private
	 * @since x.x.x
	 *
	 * @param array $settings returns settings.
	 *
	 * @return boolean
	 */
	private function has_caption( $settings ) {
		return ( ! empty( $settings['caption_source'] ) && 'none' !== $settings['caption_source'] );
	}
	/**
	 * Get the caption for current widget.
	 *
	 * @access private
	 * @since x.x.x
	 * @param array $settings returns the caption.
	 *
	 * @return string
	 */
	private function get_caption( $settings ) {
		$caption = '';
		if ( 'custom' === $settings['caption_source'] ) {
			$caption = ! empty( $settings['caption'] ) ? $settings['caption'] : '';
		}
		return $caption;
	}
	/**
	 * Render Featured Image output on the frontend.
	 *
	 * Written in PHP and used to generate the final HTML.
	 *
	 * @since x.x.x
	 * @param string $size returns the size of image.
	 * @access public
	 *
	 * @return string
	 */
	public function the_post_thumbnail_url( $size = 'post-thumbnail' ) {
		$url = get_the_post_thumbnail_url( null, $size );
		if ( $url ) {
			return esc_url( $url );
		}
	}
	/**
	 * Render Featured Image output on the frontend.
	 *
	 * Written in PHP and used to generate the final HTML.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function render() {
		$settings    = $this->get_settings_for_display();
		$has_caption = $this->has_caption( $settings );
		$this->add_render_attribute( 'wrapper', 'class', 'hfe-featured-image-wrap' );

		$size = $settings[ 'feature_image' . '_size' ];

		if ( ! empty( $settings['custom_image']['url'] ) ) {
			$image_data    = wp_get_attachment_image_src( $settings['custom_image']['id'], $size, true );
			$feature_image = $image_data[0];
		} else {
			$feature_image = $this->the_post_thumbnail_url( $size );
		}

		if ( 'file' === $settings['link_to'] ) {
				$link = $feature_image;
		} else {
			$link = $settings['link']['url'];
		}

		if ( Plugin::$instance->editor->is_edit_mode() ) {
			$class = 'elementor-non-clickable';
		} else {
			$class = 'elementor-clickable';
		}
		?>
		<div <?php echo $this->get_render_attribute_string( 'wrapper' ); ?>>
		<?php if ( $has_caption ) : ?>
				<figure class="wp-caption">
		<?php endif; ?>
		<?php if ( $link ) : ?>
			<?php
			if ( 'no' === $settings['open_lightbox'] ) {
				$class = 'elementor-non-clickable';
			}
			?>
				<a data-elementor-open-lightbox="<?php echo esc_attr( $settings['open_lightbox'] ); ?>"  class='<?php echo  esc_attr( $class ); ?>' href="<?php echo esc_url( $link ); ?>">
		<?php endif; ?>
		<?php

		if ( empty( $feature_image ) ) {
			return;
		}

		$demo = '';
		if ( 'custom' !== $size ) {
			$image_size = $size;
		} else {
			require_once ELEMENTOR_PATH . 'includes/libraries/bfi-thumb/bfi-thumb.php';
			$image_dimension = $settings[ 'site_image' . '_custom_dimension' ];
			$image_size      = [
				// Defaults sizes.
				0           => null, // Width.
				1           => null, // Height.
				'bfi_thumb' => true,
				'crop'      => true,
			];
			$has_custom_size = false;
			if ( ! empty( $image_dimension['width'] ) ) {
				$has_custom_size = true;
				$image_size[0]   = $image_dimension['width'];
			}
			if ( ! empty( $image_dimension['height'] ) ) {
				$has_custom_size = true;
				$image_size[1]   = $image_dimension['height'];
			}
			if ( ! $has_custom_size ) {
				$image_size = 'full';
			}
		}
		$image_url = $feature_image;

		$image_data = $feature_image;

		$site_image_class = 'elementor-animation-';
		if ( ! empty( $settings['hover_animation'] ) ) {
			$demo = $settings['hover_animation'];
		}
		if ( ! empty( $image_data ) ) {
			$image_url = $image_data;
		}
		$class_animation = $site_image_class . $demo;
		$image_unset     = site_url() . '/wp-includes/images/media/default.png';

		if ( $image_unset !== $image_url ) {
			$image_url = $image_url;
		}

		?>
			<div class="hfe-featured-image-set">           
				<div class="hfe-featured-image-container">
					<img src="<?php echo esc_url( $feature_image ); ?>" class="hfe-featured-image <?php echo esc_attr( $class_animation ); ?>">
				</div>
			</div>
		<?php if ( $link ) : ?>
					</a>
		<?php endif; ?>
		<?php
		if ( $has_caption ) :
			$caption_text = $this->get_caption( $settings );
			?>
			<?php if ( ! empty( $caption_text ) ) : ?>
					<div class="hfe-caption-width"> 
						<figcaption class="widget-image-caption wp-caption-text"><?php echo esc_attr( $caption_text ); ?></figcaption>
					</div>
			<?php endif; ?>
				</figure>
		<?php endif; ?>
		</div>
		<?php
	}
	/**
	 * Retrieve Featured image widget link URL.
	 *
	 * @since x.x.x
	 * @access private
	 *
	 * @param array $settings returns settings.
	 * @return array|string|false An array/string containing the link URL, or false if no link.
	 */
	private function get_link_url( $settings ) {
		if ( 'none' === $settings['link_to'] ) {
			return false;
		}
		if ( 'custom' === $settings['link_to'] ) {
			if ( empty( $settings['link']['url'] ) ) {
				return false;
			}
			return $settings['link'];
		}
	}
}
