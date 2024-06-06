<?php
/**
 * Elementor Classes.
 *
 * @package header-footer-elementor
 */

namespace HFE\WidgetsManager\Widgets;

use Elementor\Controls_Manager;
use Elementor\Control_Media;
use Elementor\Utils;
use Elementor\Group_Control_Border;
use Elementor\Group_Control_Typography;
use Elementor\Group_Control_Box_Shadow;
use Elementor\Core\Kits\Documents\Tabs\Global_Typography;
use Elementor\Core\Kits\Documents\Tabs\Global_Colors;
use Elementor\Group_Control_Image_Size;
use Elementor\Repeater;
use Elementor\Group_Control_Css_Filter;
use Elementor\Group_Control_Text_Shadow;
use Elementor\Plugin;
use Elementor\Widget_Base;

if ( ! defined( 'ABSPATH' ) ) {
	exit;   // Exit if accessed directly.
}

/**
 * HFE Site Logo widget
 *
 * HFE widget for Site Logo.
 *
 * @since 1.3.0
 */
class Site_Logo extends Widget_Base {

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
		return 'site-logo';
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
		return __( 'Site Logo', 'header-footer-elementor' );
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
		return 'hfe-icon-site-logo';
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
	 * Register Site Logo controls.
	 *
	 * @since 1.5.7
	 * @access protected
	 * @return void
	 */
	protected function register_controls() {
		$this->register_content_site_logo_controls();
		$this->register_site_logo_styling_controls();
		$this->register_site_logo_caption_styling_controls();
	}

	/**
	 * Register Site Logo General Controls.
	 *
	 * @since 1.3.0
	 * @access protected
	 * @return void
	 */
	protected function register_content_site_logo_controls() {
		$this->start_controls_section(
			'section_site_image',
			array(
				'label' => __( 'Site Logo', 'header-footer-elementor' ),
			)
		);

		$this->add_control(
			'site_logo_fallback',
			array(
				'label'       => __( 'Custom Image', 'header-footer-elementor' ),
				'type'        => Controls_Manager::SWITCHER,
				'yes'         => __( 'Yes', 'header-footer-elementor' ),
				'no'          => __( 'No', 'header-footer-elementor' ),
				'default'     => 'no',
				'render_type' => 'template',
			)
		);

		$this->add_control(
			'custom_image',
			array(
				'label'     => __( 'Add Image', 'header-footer-elementor' ),
				'type'      => Controls_Manager::MEDIA,
				'dynamic'   => array(
					'active' => true,
				),
				'default'   => array(
					'url' => Utils::get_placeholder_image_src(),
				),
				'condition' => array(
					'site_logo_fallback' => 'yes',
				),
			)
		);

		$this->add_group_control(
			Group_Control_Image_Size::get_type(),
			array(
				'name'    => 'site_logo_size',
				'label'   => __( 'Image Size', 'header-footer-elementor' ),
				'default' => 'medium',
			)
		);
		$this->add_responsive_control(
			'align',
			array(
				'label'              => __( 'Alignment', 'header-footer-elementor' ),
				'type'               => Controls_Manager::CHOOSE,
				'options'            => array(
					'left'   => array(
						'title' => __( 'Left', 'header-footer-elementor' ),
						'icon'  => 'eicon-text-align-left',
					),
					'center' => array(
						'title' => __( 'Center', 'header-footer-elementor' ),
						'icon'  => 'eicon-text-align-center',
					),
					'right'  => array(
						'title' => __( 'Right', 'header-footer-elementor' ),
						'icon'  => 'eicon-text-align-right',
					),
				),
				'default'            => 'center',
				'selectors'          => array(
					'{{WRAPPER}} .hfe-site-logo-container, {{WRAPPER}} .hfe-caption-width figcaption' => 'text-align: {{VALUE}};',
				),
				'frontend_available' => true,
			)
		);

		$this->add_control(
			'caption_source',
			array(
				'label'   => __( 'Caption', 'header-footer-elementor' ),
				'type'    => Controls_Manager::SELECT,
				'options' => array(
					'no'  => __( 'No', 'header-footer-elementor' ),
					'yes' => __( 'Yes', 'header-footer-elementor' ),
				),
				'default' => 'no',
			)
		);

		$this->add_control(
			'caption',
			array(
				'label'       => __( 'Custom Caption', 'header-footer-elementor' ),
				'type'        => Controls_Manager::TEXT,
				'default'     => '',
				'placeholder' => __( 'Enter caption', 'header-footer-elementor' ),
				'condition'   => array(
					'caption_source' => 'yes',
				),
				'dynamic'     => array(
					'active' => true,
				),
				'label_block' => true,
			)
		);

		$this->add_control(
			'link_to',
			array(
				'label'   => __( 'Link', 'header-footer-elementor' ),
				'type'    => Controls_Manager::SELECT,
				'default' => 'default',
				'options' => array(
					'default' => __( 'Default', 'header-footer-elementor' ),
					'none'    => __( 'None', 'header-footer-elementor' ),
					'file'    => __( 'Media File', 'header-footer-elementor' ),
					'custom'  => __( 'Custom URL', 'header-footer-elementor' ),
				),
			)
		);

		$this->add_control(
			'link',
			array(
				'label'       => __( 'Link', 'header-footer-elementor' ),
				'type'        => Controls_Manager::URL,
				'dynamic'     => array(
					'active' => true,
				),
				'placeholder' => __( 'https://your-link.com', 'header-footer-elementor' ),
				'condition'   => array(
					'link_to' => 'custom',
				),
				'show_label'  => false,
			)
		);

		$this->add_control(
			'open_lightbox',
			array(
				'label'     => __( 'Lightbox', 'header-footer-elementor' ),
				'type'      => Controls_Manager::SELECT,
				'default'   => 'default',
				'options'   => array(
					'default' => __( 'Default', 'header-footer-elementor' ),
					'yes'     => __( 'Yes', 'header-footer-elementor' ),
					'no'      => __( 'No', 'header-footer-elementor' ),
				),
				'condition' => array(
					'link_to' => 'file',
				),
			)
		);

		$this->add_control(
			'view',
			array(
				'label'   => __( 'View', 'header-footer-elementor' ),
				'type'    => Controls_Manager::HIDDEN,
				'default' => 'traditional',
			)
		);
		$this->end_controls_section();
	}
	/**
	 * Register Site Image Style Controls.
	 *
	 * @since 1.3.0
	 * @access protected
	 * @return void
	 */
	protected function register_site_logo_styling_controls() {
		$this->start_controls_section(
			'section_style_site_logo_image',
			array(
				'label' => __( 'Site logo', 'header-footer-elementor' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			)
		);

		$this->add_responsive_control(
			'width',
			array(
				'label'              => __( 'Width', 'header-footer-elementor' ),
				'type'               => Controls_Manager::SLIDER,
				'default'            => array(
					'unit' => '%',
				),
				'tablet_default'     => array(
					'unit' => '%',
				),
				'mobile_default'     => array(
					'unit' => '%',
				),
				'size_units'         => array( '%', 'px', 'vw' ),
				'range'              => array(
					'%'  => array(
						'min' => 1,
						'max' => 100,
					),
					'px' => array(
						'min' => 1,
						'max' => 1000,
					),
					'vw' => array(
						'min' => 1,
						'max' => 100,
					),
				),
				'selectors'          => array(
					'{{WRAPPER}} .hfe-site-logo .hfe-site-logo-container img' => 'width: {{SIZE}}{{UNIT}};',
				),
				'frontend_available' => true,
			)
		);

		$this->add_responsive_control(
			'space',
			array(
				'label'              => __( 'Max Width', 'header-footer-elementor' ) . ' (%)',
				'type'               => Controls_Manager::SLIDER,
				'default'            => array(
					'unit' => '%',
				),
				'tablet_default'     => array(
					'unit' => '%',
				),
				'mobile_default'     => array(
					'unit' => '%',
				),
				'size_units'         => array( '%' ),
				'range'              => array(
					'%' => array(
						'min' => 1,
						'max' => 100,
					),
				),
				'selectors'          => array(
					'{{WRAPPER}} .hfe-site-logo img' => 'max-width: {{SIZE}}{{UNIT}};',
				),
				'frontend_available' => true,
			)
		);

		$this->add_control(
			'separator_panel_style',
			array(
				'type'  => Controls_Manager::DIVIDER,
				'style' => 'thick',
			)
		);

		$this->add_control(
			'site_logo_background_color',
			array(
				'label'     => __( 'Background Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .hfe-site-logo-set .hfe-site-logo-container' => 'background-color: {{VALUE}};',
				),
			)
		);

		$this->add_control(
			'site_logo_image_border',
			array(
				'label'       => __( 'Border Style', 'header-footer-elementor' ),
				'type'        => Controls_Manager::SELECT,
				'default'     => 'none',
				'label_block' => false,
				'options'     => array(
					'none'   => __( 'None', 'header-footer-elementor' ),
					'solid'  => __( 'Solid', 'header-footer-elementor' ),
					'double' => __( 'Double', 'header-footer-elementor' ),
					'dotted' => __( 'Dotted', 'header-footer-elementor' ),
					'dashed' => __( 'Dashed', 'header-footer-elementor' ),
				),
				'selectors'   => array(
					'{{WRAPPER}} .hfe-site-logo-container .hfe-site-logo-img' => 'border-style: {{VALUE}};',
				),
			)
		);
		$this->add_control(
			'site_logo_image_border_size',
			array(
				'label'      => __( 'Border Width', 'header-footer-elementor' ),
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
					'site_logo_image_border!' => 'none',
				),
				'selectors'  => array(
					'{{WRAPPER}} .hfe-site-logo-container .hfe-site-logo-img' => 'border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				),
			)
		);

		$this->add_control(
			'site_logo_image_border_color',
			array(
				'label'     => __( 'Border Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'global'    => array(
					'default' => Global_Colors::COLOR_PRIMARY,
				),
				'condition' => array(
					'site_logo_image_border!' => 'none',
				),
				'default'   => '',
				'selectors' => array(
					'{{WRAPPER}} .hfe-site-logo-container .hfe-site-logo-img' => 'border-color: {{VALUE}};',
				),
			)
		);

		$this->add_responsive_control(
			'image_border_radius',
			array(
				'label'              => __( 'Border Radius', 'header-footer-elementor' ),
				'type'               => Controls_Manager::DIMENSIONS,
				'size_units'         => array( 'px', '%' ),
				'selectors'          => array(
					'{{WRAPPER}} .hfe-site-logo img' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				),
				'frontend_available' => true,
			)
		);

		$this->add_group_control(
			Group_Control_Box_Shadow::get_type(),
			array(
				'name'     => 'image_box_shadow',
				'exclude'  => array(
					'box_shadow_position',
				),
				'selector' => '{{WRAPPER}} .hfe-site-logo img',
			)
		);

		$this->start_controls_tabs( 'image_effects' );

		$this->start_controls_tab(
			'normal',
			array(
				'label' => __( 'Normal', 'header-footer-elementor' ),
			)
		);

		$this->add_control(
			'opacity',
			array(
				'label'     => __( 'Opacity', 'header-footer-elementor' ),
				'type'      => Controls_Manager::SLIDER,
				'range'     => array(
					'px' => array(
						'max'  => 1,
						'min'  => 0.10,
						'step' => 0.01,
					),
				),
				'selectors' => array(
					'{{WRAPPER}} .hfe-site-logo img' => 'opacity: {{SIZE}};',
				),
			)
		);

		$this->add_group_control(
			Group_Control_Css_Filter::get_type(),
			array(
				'name'     => 'css_filters',
				'selector' => '{{WRAPPER}} .hfe-site-logo img',
			)
		);

		$this->end_controls_tab();

		$this->start_controls_tab(
			'hover',
			array(
				'label' => __( 'Hover', 'header-footer-elementor' ),
			)
		);
		$this->add_control(
			'opacity_hover',
			array(
				'label'     => __( 'Opacity', 'header-footer-elementor' ),
				'type'      => Controls_Manager::SLIDER,
				'range'     => array(
					'px' => array(
						'max'  => 1,
						'min'  => 0.10,
						'step' => 0.01,
					),
				),
				'selectors' => array(
					'{{WRAPPER}} .hfe-site-logo:hover img' => 'opacity: {{SIZE}};',
				),
			)
		);
		$this->add_control(
			'background_hover_transition',
			array(
				'label'     => __( 'Transition Duration', 'header-footer-elementor' ),
				'type'      => Controls_Manager::SLIDER,
				'range'     => array(
					'px' => array(
						'max'  => 3,
						'step' => 0.1,
					),
				),
				'selectors' => array(
					'{{WRAPPER}} .hfe-site-logo img' => 'transition-duration: {{SIZE}}s',
				),
			)
		);

		$this->add_group_control(
			Group_Control_Css_Filter::get_type(),
			array(
				'name'     => 'css_filters_hover',
				'selector' => '{{WRAPPER}} .hfe-site-logo:hover img',
			)
		);

		$this->add_control(
			'hover_animation',
			array(
				'label' => __( 'Hover Animation', 'header-footer-elementor' ),
				'type'  => Controls_Manager::HOVER_ANIMATION,
			)
		);

		$this->end_controls_tab();

		$this->end_controls_tabs();

		$this->end_controls_section();
	}
	/**
	 * Register Site Logo style Controls.
	 *
	 * @since 1.3.0
	 * @access protected
	 * @return void
	 */
	protected function register_site_logo_caption_styling_controls() {
		$this->start_controls_section(
			'section_style_caption',
			array(
				'label'     => __( 'Caption', 'header-footer-elementor' ),
				'tab'       => Controls_Manager::TAB_STYLE,
				'condition' => array(
					'caption_source!' => 'none',
				),
			)
		);

		$this->add_control(
			'text_color',
			array(
				'label'     => __( 'Text Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'default'   => '',
				'selectors' => array(
					'{{WRAPPER}} .widget-image-caption' => 'color: {{VALUE}};',
				),
				'global'    => array(
					'default' => Global_Colors::COLOR_TEXT,
				),
			)
		);

		$this->add_control(
			'caption_background_color',
			array(
				'label'     => __( 'Background Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .widget-image-caption' => 'background-color: {{VALUE}};',
				),
			)
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'     => 'caption_typography',
				'selector' => '{{WRAPPER}} .widget-image-caption',
				'global'   => array(
					'default' => Global_Typography::TYPOGRAPHY_TEXT,
				),
			)
		);

		$this->add_group_control(
			Group_Control_Text_Shadow::get_type(),
			array(
				'name'     => 'caption_text_shadow',
				'selector' => '{{WRAPPER}} .widget-image-caption',
			)
		);

		$this->add_responsive_control(
			'caption_padding',
			array(
				'label'              => __( 'Padding', 'header-footer-elementor' ),
				'type'               => Controls_Manager::DIMENSIONS,
				'size_units'         => array( 'px', 'em', '%' ),
				'selectors'          => array(
					'{{WRAPPER}} .widget-image-caption' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				),
				'frontend_available' => true,
			)
		);
		$this->add_responsive_control(
			'caption_space',
			array(
				'label'              => __( 'Spacing', 'header-footer-elementor' ),
				'type'               => Controls_Manager::SLIDER,
				'range'              => array(
					'px' => array(
						'min' => 0,
						'max' => 100,
					),
				),
				'default'            => array(
					'size' => 0,
					'unit' => 'px',
				),
				'selectors'          => array(
					'{{WRAPPER}} .widget-image-caption' => 'margin-top: {{SIZE}}{{UNIT}}; margin-bottom: 0px;',
				),
				'frontend_available' => true,
			)
		);

		$this->end_controls_section();
	}

	/**
	 * Check if the current widget has caption
	 *
	 * @access private
	 * @since 1.3.0
	 *
	 * @param array $settings returns settings.
	 *
	 * @return boolean
	 */
	private function has_caption( $settings ) {
		return ( ! empty( $settings['caption_source'] ) && 'no' !== $settings['caption_source'] );
	}

	/**
	 * Get the caption for current widget.
	 *
	 * @access private
	 * @since 1.3.0
	 * @param array $settings returns the caption.
	 *
	 * @return string
	 */
	private function get_caption( $settings ) {
		$caption = '';
		if ( 'yes' === $settings['caption_source'] ) {
			$caption = ! empty( $settings['caption'] ) ? $settings['caption'] : '';
		}
		return $caption;
	}

	/**
	 * Render Site Image output on the frontend.
	 *
	 * Written in PHP and used to generate the final HTML.
	 *
	 * @since 1.3.0
	 * @param array $size returns the size of an image.
	 * @access public
	 * @return string
	 */
	public function site_image_url( $size ) {
		$settings = $this->get_settings_for_display();
		if ( ! empty( $settings['custom_image']['url'] ) ) {
			$logo = wp_get_attachment_image_src( $settings['custom_image']['id'], $size, true );
		} else {
			$logo = wp_get_attachment_image_src( get_theme_mod( 'custom_logo' ), $size, true );
		}
		return $logo[0];
	}

	/**
	 * Render Site Image output on the frontend.
	 *
	 * Written in PHP and used to generate the final HTML.
	 *
	 * @since 1.3.0
	 * @access protected
	 * @return void
	 */
	protected function render() {
		$link     = '';
		$settings = $this->get_settings_for_display();

		$has_caption = $this->has_caption( $settings );

		$this->add_render_attribute( 'wrapper', 'class', 'hfe-site-logo' );

		$size = $settings['site_logo_size_size'];

		$site_image = $this->site_image_url( $size );

		if ( site_url() . '/wp-includes/images/media/default.png' === $site_image ) {
			$site_image = site_url() . '/wp-content/plugins/elementor/assets/images/placeholder.png';
		} else {
			$site_image = $site_image;
		}

		if ( 'file' === $settings['link_to'] ) {
				$link = $site_image;
				$this->add_render_attribute( 'link', 'href', $link );
		} elseif ( 'default' === $settings['link_to'] ) {
			$link = site_url();
			$this->add_render_attribute( 'link', 'href', $link );
		} else {
			$link = $this->get_link_url( $settings );

			if ( $link ) {
				$this->add_link_attributes( 'link', $link );
			}
		}
		$class = '';
		if ( Plugin::$instance->editor->is_edit_mode() ) {
			$class = 'elementor-non-clickable';
		} else {
			$class = 'elementor-clickable';
		}
		?>
		<div <?php $this->print_render_attribute_string( 'wrapper' ); ?>>
		<?php if ( $has_caption ) : ?>
				<figure class="wp-caption">
		<?php endif; ?>
		<?php if ( $link ) : ?>
					<?php
					if ( 'no' === $settings['open_lightbox'] ) {
						$class = 'elementor-non-clickable';
					}
					?>
				<a data-elementor-open-lightbox="<?php echo esc_attr( $settings['open_lightbox'] ); ?>"  class='<?php echo esc_attr( $class ); ?>' <?php $this->print_render_attribute_string( 'link' ); ?>>
		<?php endif; ?>
		<?php
		if ( empty( $site_image ) ) {
			return;
		}
		$img_animation = '';

		if ( 'custom' !== $size ) {
			$image_size = $size;
		} else {
			require_once ELEMENTOR_PATH . 'includes/libraries/bfi-thumb/bfi-thumb.php';

			$image_dimension = $settings['site_logo_size_custom_dimension'];

			$image_size = array(
				// Defaults sizes.
				0           => null, // Width.
				1           => null, // Height.

				'bfi_thumb' => true,
				'crop'      => true,
			);

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

		$image_url = $site_image;

		if ( ! empty( $settings['custom_image']['url'] ) ) {
			$image_data = wp_get_attachment_image_src( $settings['custom_image']['id'], $image_size, true );
		} else {
			$image_data = wp_get_attachment_image_src( get_theme_mod( 'custom_logo' ), $image_size, true );
		}

		$site_image_class = 'elementor-animation-';

		if ( ! empty( $settings['hover_animation'] ) ) {
			$img_animation = $settings['hover_animation'];
		}
		if ( ! empty( $image_data ) ) {
			$image_url = $image_data[0];
		}

		if ( site_url() . '/wp-includes/images/media/default.png' === $image_url ) {
			$image_url = site_url() . '/wp-content/plugins/elementor/assets/images/placeholder.png';
		} else {
			$image_url = $image_url;
		}

		$class_animation = $site_image_class . $img_animation;

		$image_unset = site_url() . '/wp-content/plugins/elementor/assets/images/placeholder.png';

		if ( $image_unset !== $image_url ) {
			$image_url = $image_url;
		}

		?>
			<div class="hfe-site-logo-set">           
				<div class="hfe-site-logo-container">
				<?php
					$alt_text = Control_Media::get_image_alt( $settings['custom_image'] );
					$alt_text = empty( $alt_text ) ? 'default-logo' : esc_attr( $alt_text );
				?>
					<img class="hfe-site-logo-img <?php echo esc_attr( $class_animation ); ?>"  src="<?php echo esc_url( $image_url ); ?>" alt="<?php echo esc_attr( $alt_text ); ?>"/>
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
						<figcaption class="widget-image-caption wp-caption-text"><?php echo wp_kses_post( $caption_text ); ?></figcaption>
					</div>
			<?php endif; ?>
				</figure>
		<?php endif; ?>
		</div>  
			<?php
	}

	/**
	 * Retrieve Site Logo widget link URL.
	 *
	 * @since 1.3.0
	 * @access private
	 *
	 * @param array $settings returns settings.
	 * @return array|string|false|void An array/string containing the link URL, or false if no link.
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

		if ( 'default' === $settings['link_to'] ) {
			if ( empty( $settings['link']['url'] ) ) {
				return false;
			}
			return site_url();
		}
	}
}
