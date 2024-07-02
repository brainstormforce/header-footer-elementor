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
use Elementor\Group_Control_Css_Filter;
use Elementor\Group_Control_Text_Shadow;
use Elementor\Plugin;
use Elementor\Widget_Base;

if ( ! defined( 'ABSPATH' ) ) {
	exit;   // Exit if accessed directly.
}

/**
 * HFE Retina widget
 *
 * HFE widget for Retina Image.
 *
 * @since 1.2.0
 */
class Retina extends Widget_Base {
	/**
	 * Retrieve the widget name.
	 *
	 * @since 1.2.0
	 *
	 * @access public
	 *
	 * @return string Widget name.
	 */
	public function get_name() {
		return 'retina';
	}

	/**
	 * Retrieve the widget title.
	 *
	 * @since 1.2.0
	 *
	 * @access public
	 *
	 * @return string Widget title.
	 */
	public function get_title() {
		return __( 'Retina Image', 'header-footer-elementor' );
	}

	/**
	 * Retrieve the widget icon.
	 *
	 * @since 1.2.0
	 *
	 * @access public
	 *
	 * @return string Widget icon.
	 */
	public function get_icon() {
		return 'hfe-icon-retina-image';
	}

	/**
	 * Retrieve the list of categories the widget belongs to.
	 *
	 * Used to determine where to display the widget in the editor.
	 *
	 * Note that currently Elementor supports only one category.
	 * When multiple categories passed, Elementor uses the first one.
	 *
	 * @since 1.2.0
	 *
	 * @access public
	 *
	 * @return array Widget categories.
	 */
	public function get_categories() {
		return [ 'hfe-widgets' ];
	}

	/**
	 * Register Retina Logo controls.
	 *
	 * @since 1.5.7
	 * @access protected
	 * @return void
	 */
	protected function register_controls() {
		$this->register_content_retina_image_controls();
		$this->register_retina_image_styling_controls();
		$this->register_retina_caption_styling_controls();
		$this->register_helpful_information();
	}

	/**
	 * Register Retina Logo General Controls.
	 *
	 * @since 1.2.0
	 * @access protected
	 * @return void
	 */
	protected function register_content_retina_image_controls() {
		$this->start_controls_section(
			'section_retina_image',
			[
				'label' => __( 'Retina Image', 'header-footer-elementor' ),
			]
		);
		$this->add_control(
			'retina_image',
			[
				'label'   => __( 'Choose Default Image', 'header-footer-elementor' ),
				'type'    => Controls_Manager::MEDIA,
				'dynamic' => [
					'active' => true,
				],
				'default' => [
					'url' => Utils::get_placeholder_image_src(),
				],
			]
		);
		$this->add_control(
			'real_retina',
			[
				'label'   => __( 'Choose Retina Image', 'header-footer-elementor' ),
				'type'    => Controls_Manager::MEDIA,
				'dynamic' => [
					'active' => true,
				],
				'default' => [
					'url' => Utils::get_placeholder_image_src(),
				],
			]
		);
		$this->add_group_control(
			Group_Control_Image_Size::get_type(),
			[
				'name'    => 'retina_image',
				'label'   => __( 'Image Size', 'header-footer-elementor' ),
				'default' => 'medium',
			]
		);
		$this->add_responsive_control(
			'align',
			[
				'label'              => __( 'Alignment', 'header-footer-elementor' ),
				'type'               => Controls_Manager::CHOOSE,
				'options'            => [
					'left'   => [
						'title' => __( 'Left', 'header-footer-elementor' ),
						'icon'  => 'fa fa-align-left',
					],
					'center' => [
						'title' => __( 'Center', 'header-footer-elementor' ),
						'icon'  => 'fa fa-align-center',
					],
					'right'  => [
						'title' => __( 'Right', 'header-footer-elementor' ),
						'icon'  => 'fa fa-align-right',
					],
				],
				'default'            => 'center',
				'selectors'          => [
					'{{WRAPPER}} .hfe-retina-image-container, {{WRAPPER}} .hfe-caption-width' => 'text-align: {{VALUE}};',
				],
				'frontend_available' => true,
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
				'label_block' => true,
			]
		);

		$this->add_control(
			'link_to',
			[
				'label'   => __( 'Link', 'header-footer-elementor' ),
				'type'    => Controls_Manager::SELECT,
				'default' => 'none',
				'options'
				=> [
					'none'   => __( 'None', 'header-footer-elementor' ),
					'file'   => __( 'Media File', 'header-footer-elementor' ),
					'custom' => __( 'Custom URL', 'header-footer-elementor' ),
				],
			]
		);

		$this->add_control(
			'link',
			[
				'label'       => __( 'Link', 'header-footer-elementor' ),
				'type'        => Controls_Manager::URL,
				'placeholder' => __( 'https://your-link.com', 'header-footer-elementor' ),
				'condition'   => [
					'link_to' => 'custom',
				],
				'dynamic'     => [
					'active' => true,
				],
				'default'     => [
					'url' => '',
				],
				'label_block' => true,
			]
		);

		$this->add_control(
			'link_new_tab',
			[
				'label'        => __( 'Open in new tab', 'header-footer-elementor' ),
				'type'         => Controls_Manager::SWITCHER,
				'label_on'     => __( 'Yes', 'header-footer-elementor' ),
				'label_off'    => __( 'No', 'header-footer-elementor' ),
				'return_value' => 'yes',
				'default'      => 'no',
				'condition'    => [
					'link_to' => 'custom',
				],
			]
		);

		$this->end_controls_section();
	}

	/**
	 * Register Retina Image Style Controls.
	 *
	 * @since 1.2.0
	 * @access protected
	 * @return void
	 */
	protected function register_retina_image_styling_controls() {
		$this->start_controls_section(
			'section_retina_image_style',
			[
				'label' => __( 'Retina Image', 'header-footer-elementor' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			]
		);

		$this->add_group_control(
			Group_Control_Border::get_type(),
			[
				'name'        => 'retina_image_border',
				'label'       => __( 'Border', 'header-footer-elementor' ),
				'placeholder' => '1px',
				'selector'    => '{{WRAPPER}} .hfe-retina-image-container img',
			]
		);

		$this->add_responsive_control(
			'retina_image_border_radius',
			[
				'label'      => __( 'Border Radius', 'header-footer-elementor' ),
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', '%' ],
				'selectors'  => [
					'{{WRAPPER}} .hfe-retina-image-container img' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Box_Shadow::get_type(),
			[
				'name'     => 'retina_image_box_shadow',
				'selector' => '{{WRAPPER}} .hfe-retina-image-container img',
			]
		);

		$this->end_controls_section();
	}

	/**
	 * Register Retina Caption Style Controls.
	 *
	 * @since 1.2.0
	 * @access protected
	 * @return void
	 */
	protected function register_retina_caption_styling_controls() {
		$this->start_controls_section(
			'section_retina_caption_style',
			[
				'label'     => __( 'Caption', 'header-footer-elementor' ),
				'tab'       => Controls_Manager::TAB_STYLE,
				'condition' => [
					'caption_source' => 'custom',
				],
			]
		);

		$this->add_control(
			'retina_caption_color',
			[
				'label'     => __( 'Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'default'   => '',
				'selectors' => [
					'{{WRAPPER}} .hfe-caption-width' => 'color: {{VALUE}}',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name'     => 'retina_caption_typography',
				'selector' => '{{WRAPPER}} .hfe-caption-width',
			]
		);

		$this->add_responsive_control(
			'retina_caption_spacing',
			[
				'label'      => __( 'Spacing', 'header-footer-elementor' ),
				'type'       => Controls_Manager::SLIDER,
				'selectors'  => [
					'{{WRAPPER}} .hfe-caption-width' => 'margin-top: {{SIZE}}{{UNIT}};',
				],
				'size_units' => [ 'px', 'em', '%' ],
			]
		);

		$this->end_controls_section();
	}

	/**
	 * Register Helpful Information.
	 *
	 * @since 1.2.0
	 * @access protected
	 * @return void
	 */
	protected function register_helpful_information() {
		$this->start_controls_section(
			'section_retina_helpful_information',
			[
				'label' => __( 'Helpful Information', 'header-footer-elementor' ),
			]
		);

		$this->add_control(
			'helpful_information_content',
			[
				'type'            => Controls_Manager::RAW_HTML,
				'raw'             => '<strong>' . __( 'Important:', 'header-footer-elementor' ) . '</strong> ' . __( 'This widget uses two different images for retina and non-retina displays. For best results, make sure the size of the default image is half of the retina image.', 'header-footer-elementor' ),
				'content_classes' => 'elementor-panel-alert elementor-panel-alert-info',
			]
		);

		$this->end_controls_section();
	}

	/**
	 * Render Retina widget output on the frontend.
	 *
	 * @since 1.2.0
	 *
	 * @access protected
	 * @return void
	 */
	protected function render() {
		$settings       = $this->get_settings_for_display();
		$retina_image   = $settings['retina_image']['url'];
		$real_retina    = $settings['real_retina']['url'];
		$align          = $settings['align'];
		$caption        = $settings['caption'];
		$caption_source = $settings['caption_source'];
		$link_to        = $settings['link_to'];
		$link           = $settings['link'];
		$link_new_tab   = $settings['link_new_tab'];

		if ( 'none' === $link_to ) {
			$link_attrs = '';
		} else {
			$link_attrs = 'href="' . esc_url( $link['url'] ) . '"';
			if ( 'yes' === $link_new_tab ) {
				$link_attrs .= ' target="_blank"';
			}
			if ( 'file' === $link_to ) {
				$link_attrs .= ' download';
			}
		}

		if ( $caption ) {
			$caption_attrs = 'alt="' . esc_attr( $caption ) . '"';
		} else {
			$caption_attrs = '';
		}

		if ( 'custom' === $caption_source ) {
			$caption_html = '<div class="hfe-caption-width">' . $caption . '</div>';
		} else {
			$caption_html = '';
		}

		?>
	<div class="hfe-retina-image-container <?php echo esc_attr( $align ); ?>">
		<picture>
			<!--[if IE 9]><video style="display: none;"><![endif]-->
			<source srcset="<?php echo esc_url( $retina_image ); ?>" media="(min-resolution: 192dpi)">
			<source srcset="<?php echo esc_url( $real_retina ); ?>">
			<!--[if IE 9]></video><![endif]-->
			<img src="<?php echo esc_url( $retina_image ); ?>" <?php echo esc_attr( $caption_attrs ); ?> <?php echo esc_attr( $link_attrs ); ?>>
		</picture>
		<?php
		echo wp_kses_post( $caption_html );
		?>
	</div>

		<?php
	}
}


/**
 * Register HFE Retina Widget.
 *
 * @since 1.2.0
 * @access public
 * @return void
 */
function register_retina_widget() {
	Plugin::instance()->widgets_manager->register_widget_type( new Retina() );
}
add_action( 'elementor/widgets/widgets_registered', 'HFE\WidgetsManager\Widgets\register_retina_widget' );

