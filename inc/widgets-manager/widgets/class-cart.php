<?php
/**
 * Elementor Classes.
 *
 * @package header-footer-elementor
 */

namespace HFE\WidgetsManager\Widgets;

use Elementor\Controls_Manager;
use Elementor\Group_Control_Typography;
use Elementor\Scheme_Typography;
use Elementor\Widget_Base;
use Elementor\Group_Control_Text_Shadow;
use Elementor\Scheme_Color;
use Elementor\Core\Schemes;
use Elementor\Group_Control_Border;

if ( ! defined( 'ABSPATH' ) ) {
	exit;   // Exit if accessed directly.
}

/**
 * HFE cart widget
 *
 * HFE widget for cart
 *
 * @since x.x.x
 */
class Cart extends Widget_Base {














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
		return 'hfe-cart';
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
		return __( 'Cart', 'header-footer-elementor' );
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
		return 'eicon-cart';
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
	 * Register cart controls controls.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function _register_controls() {

		$this->register_general_content_controls();
		$this->register_heading_typo_content_controls();
	}

	/**
	 * Register Advanced Heading General Controls.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function register_general_content_controls() {

		$this->start_controls_section(
			'section_general_fields',
			[
				'label' => __( 'Menu Cart', 'header-footer-elementor' ),
			]
		);

		$this->add_control(
			'hfe_cart_type',
			[
				'label'   => __( 'Type', 'header-footer-elementor' ),
				'type'    => Controls_Manager::SELECT,
				'default' => 'default',
				'options' => [
					'default' => __( 'Default', 'header-footer-elementor' ),
					'custom'  => __( 'Custom', 'header-footer-elementor' ),
				],
			]
		);

		$this->add_control(
			'icon',
			[
				'label'        => __( 'Icon', 'header-footer-elementor' ),
				'type'         => Controls_Manager::SELECT,
				'options'      => [
					'bag-light'  => __( 'Bag Light', 'header-footer-elementor' ),
					'bag-medium' => __( 'Bag Medium', 'header-footer-elementor' ),
					'bag-solid'  => __( 'Bag Solid', 'header-footer-elementor' ),
				],
				'default'      => 'bag-light',
				'prefix_class' => 'toggle-icon--',
				'condition'    => [
					'hfe_cart_type' => 'custom',
				],
			]
		);

		$this->add_control(
			'items_indicator',
			[
				'label'        => __( 'Items Count', 'header-footer-elementor' ),
				'type'         => Controls_Manager::SELECT,
				'options'      => [
					'none'   => __( 'None', 'header-footer-elementor' ),
					'bubble' => __( 'Bubble', 'header-footer-elementor' ),
				],
				'prefix_class' => 'hfe-menu-cart--items-indicator-',
				'default'      => 'bubble',
				'condition'    => [
					'hfe_cart_type' => 'custom',
				],
			]
		);

		$this->add_control(
			'show_subtotal',
			[
				'label'        => __( 'Show Total', 'header-footer-elementor' ),
				'type'         => Controls_Manager::SWITCHER,
				'label_on'     => __( 'Yes', 'header-footer-elementor' ),
				'label_off'    => __( 'No', 'header-footer-elementor' ),
				'return_value' => 'yes',
				'default'      => 'yes',
				'prefix_class' => 'hfe-menu-cart--show-subtotal-',
				'condition'    => [
					'hfe_cart_type' => 'custom',
				],
			]
		);

		$this->add_control(
			'hide_empty_indicator',
			[
				'label'        => __( 'Hide Empty', 'header-footer-elementor' ),
				'type'         => Controls_Manager::SWITCHER,
				'label_on'     => __( 'Yes', 'header-footer-elementor' ),
				'label_off'    => __( 'No', 'header-footer-elementor' ),
				'return_value' => 'hide',
				'prefix_class' => 'hfe-menu-cart--empty-indicator-',
				'description'  => __( 'This will hide the bubble icon until the cart is empty', 'uael' ),
				'condition'    => [
					'items_indicator!' => 'none',
					'hfe_cart_type'    => 'custom',
				],
			]
		);

		$this->add_responsive_control(
			'align',
			[
				'label'        => __( 'Alignment', 'elementor' ),
				'type'         => Controls_Manager::CHOOSE,
				'options'      => [
					'left'   => [
						'title' => __( 'Left', 'elementor' ),
						'icon'  => 'eicon-text-align-left',
					],
					'center' => [
						'title' => __( 'Center', 'elementor' ),
						'icon'  => 'eicon-text-align-center',
					],
					'right'  => [
						'title' => __( 'Right', 'elementor' ),
						'icon'  => 'eicon-text-align-right',
					],
				],
				'prefix_class' => 'elementor%s-align-',
				'default'      => '',
			]
		);

		$this->end_controls_section();
	}


	/**
	 * Register Advanced Heading Typography Controls.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function register_heading_typo_content_controls() {
		$this->start_controls_section(
			'section_heading_typography',
			[
				'label' => __( 'Menu Cart', 'header-footer-elementor' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name'      => 'toggle_button_typography',
				'scheme'    => Schemes\Typography::TYPOGRAPHY_1,
				'selector'  => '{{WRAPPER}} .hfe-menu-cart__toggle .elementor-button',
				'condition' => [
					'hfe_cart_type' => 'custom',
				],
			]
		);
		$this->add_control(
			'icon_size',
			[
				'label' => __( 'Size', 'header-footer-elementor' ),
				'type' => Controls_Manager::SLIDER,
				'range' => [
					'px' => [
						'min' => 15,
						'max' => 30,
					],
				],
				'selectors' => [
					'{{WRAPPER}} .hfe-masthead-custom-menu-items .hfe-site-header-cart .hfe-site-header-cart-li ' => 'font-size: {{SIZE}}{{UNIT}};',
				],
			]
		);
		$this->add_control(
			'toggle_button_border_width',
			[
				'label'      => __( 'Border Width', 'header-footer-elementor' ),
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px' ],
				'default'    => [
					'top'    => '2',
					'bottom' => '2',
					'left'   => '2',
					'right'  => '2',
					'unit'   => 'px',
				],
				'selectors'  => [
					'{{WRAPPER}} .hfe-menu-cart__toggle .elementor-button,{{WRAPPER}} .hfe-cart-menu-wrap-default .count:after,.hfe-cart-menu-wrap-default .count' => 'border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
			]
		);

		$this->add_control(
			'toggle_button_border_radius',
			[
				'label'      => __( 'Border Radius', 'header-footer-elementor' ),
				'type'       => Controls_Manager::DIMENSIONS,
				'default'    => [
					'top'    => '',
					'bottom' => '',
					'left'   => '',
					'right'  => '',
					'unit'   => 'px',
				],
				'size_units' => [ 'px', 'em', '%' ],
				'selectors'  => [
					'{{WRAPPER}} .hfe-menu-cart__toggle .elementor-button,{{WRAPPER}} .hfe-cart-menu-wrap-default .count:after,.hfe-cart-menu-wrap-default .count' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],

			]
		);

		$this->add_responsive_control(
			'toggle_button_padding',
			[
				'label'      => __( 'Padding', 'header-footer-elementor' ),
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', 'em' ],
				'selectors'  => [
					'{{WRAPPER}} .hfe-menu-cart__toggle .elementor-button' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}}',
				],
				'condition'  => [
					'hfe_cart_type' => 'custom',
				],
			]
		);

		$this->start_controls_tabs( 'toggle_button_colors' );

		$this->start_controls_tab(
			'toggle_button_normal_colors',
			[
				'label' => __( 'Normal', 'header-footer-elementor' ),
			]
		);

		$this->add_control(
			'toggle_button_text_color',
			[
				'label'     => __( 'Text Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .hfe-menu-cart__toggle .elementor-button,{{WRAPPER}} .hfe-cart-menu-wrap-default span.count' => 'color: {{VALUE}}',
				],
			]
		);

		$this->add_control(
			'toggle_button_icon_color',
			[
				'label'     => __( 'Icon Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .hfe-menu-cart__toggle .elementor-button-icon' => 'color: {{VALUE}}',
				],
				'condition' => [
					'hfe_cart_type' => 'custom',
				],
			]
		);

		$this->add_control(
			'toggle_icon_size',
			[
				'label'      => __( 'Icon Size', 'header-footer-elementor' ),
				'type'       => Controls_Manager::SLIDER,
				'range'      => [
					'px' => [
						'min' => 0,
						'max' => 50,
					],
				],
				'size_units' => [ 'px', 'em' ],
				'selectors'  => [
					'{{WRAPPER}} .hfe-menu-cart__toggle .elementor-button-icon' => 'font-size: {{SIZE}}{{UNIT}}',
				],
				'condition'  => [
					'hfe_cart_type' => 'custom',
				],
			]
		);

		$this->add_control(
			'toggle_icon_spacing',
			[
				'label'      => __( 'Icon Spacing', 'header-footer-elementor' ),
				'type'       => Controls_Manager::SLIDER,
				'range'      => [
					'px' => [
						'min' => 0,
						'max' => 50,
					],
				],
				'size-units' => [ 'px', 'em' ],
				'selectors'  => [
					'body:not(.rtl) {{WRAPPER}} .hfe-menu-cart__toggle .elementor-button-text' => 'margin-right: {{SIZE}}{{UNIT}}',
					'body.rtl {{WRAPPER}} .hfe-menu-cart__toggle .elementor-button-text' => 'margin-left: {{SIZE}}{{UNIT}}',
				],
				'condition'  => [
					'hfe_cart_type' => 'custom',
				],
			]
		);

		$this->add_control(
			'toggle_button_background_color',
			[
				'label'     => __( 'Background Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .hfe-menu-cart__toggle .elementor-button,{{WRAPPER}} .hfe-cart-menu-wrap-default span.count' => 'background-color: {{VALUE}}',
				],
			]
		);

		$this->add_control(
			'toggle_button_border_color',
			[
				'label'     => __( 'Border Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .hfe-menu-cart__toggle .elementor-button,{{WRAPPER}} .hfe-cart-menu-wrap-default .count:after,.hfe-cart-menu-wrap-default .count' => 'border-color: {{VALUE}}',
				],
			]
		);

		$this->end_controls_tab();

		$this->start_controls_tab( 'toggle_button_hover_colors', [ 'label' => __( 'Hover', 'header-footer-elementor' ) ] );

		$this->add_control(
			'toggle_button_hover_text_color',
			[
				'label'     => __( 'Text Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .hfe-menu-cart__toggle .elementor-button:hover,{{WRAPPER}} .hfe-cart-menu-wrap-default span.count:hover' => 'color: {{VALUE}}',
				],
			]
		);

		$this->add_control(
			'toggle_button_hover_icon_color',
			[
				'label'     => __( 'Icon Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .hfe-menu-cart__toggle .elementor-button:hover .elementor-button-icon' => 'color: {{VALUE}}',
				],
				'condition' => [
					'hfe_cart_type' => 'custom',
				],
			]
		);

		$this->add_control(
			'toggle_button_hover_background_color',
			[
				'label'     => __( 'Background Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .hfe-menu-cart__toggle .elementor-button:hover,{{WRAPPER}} .hfe-cart-menu-wrap-default span.count:hover' => 'background-color: {{VALUE}}',
				],
			]
		);

		$this->add_control(
			'toggle_button_hover_border_color',
			[
				'label'     => __( 'Border Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .hfe-menu-cart__toggle .elementor-button:hover,{{WRAPPER}} .hfe-cart-menu-wrap-default:hover .count:after,.hfe-cart-menu-wrap-default:hover .count' => 'border-color: {{VALUE}}',
				],
			]
		);

		$this->end_controls_tab();

		$this->end_controls_tabs();

		$this->end_controls_section();

		$this->start_controls_section(
			'section_icon',
			[
				'label'     => __( 'Items Count', 'header-footer-elementor' ),
				'tab'       => Controls_Manager::TAB_STYLE,
				'condition' => [
					'icon[value]!'     => '',
					'items_indicator!' => 'none',
					'hfe_cart_type'    => 'custom',
				],
			]
		);

		$this->add_control(
			'items_indicator_text_color',
			[
				'label'     => __( 'Text Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .hfe-menu-cart__toggle .elementor-button-icon[data-counter]:before' => 'color: {{VALUE}}',
				],
				'condition' => [
					'items_indicator!' => 'none',
				],
			]
		);

		$this->add_control(
			'items_indicator_background_color',
			[
				'label'     => __( 'Background Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .hfe-menu-cart__toggle .elementor-button-icon[data-counter]:before' => 'background-color: {{VALUE}}',
				],
				'condition' => [
					'items_indicator' => 'bubble',
				],
			]
		);

		$this->add_control(
			'items_indicator_distance',
			[
				'label'     => __( 'Distance', 'header-footer-elementor' ),
				'type'      => Controls_Manager::SLIDER,
				'default'   => [
					'unit' => 'em',
				],
				'range'     => [
					'em' => [
						'min'  => 0,
						'max'  => 4,
						'step' => 0.1,
					],
				],
				'selectors' => [
					'{{WRAPPER}} .hfe-menu-cart__toggle .elementor-button-icon[data-counter]:before' => 'right: -{{SIZE}}{{UNIT}}; top: -{{SIZE}}{{UNIT}}',
				],
				'condition' => [
					'items_indicator' => 'bubble',
				],
			]
		);

		$this->end_controls_section();
	}

	/**
	 * Render Heading output on the frontend.
	 *
	 * Written in PHP and used to generate the final HTML.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function render() {

		$settings = $this->get_settings();
		global $woocommerce;

		if ( empty( $woocommerce ) ) {
			return;
		}
		?>

		<div class="hfe-masthead-custom-menu-items woocommerce-custom-menu-item">
			<div id="hfe-site-header-cart" class="hfe-site-header-cart hfe-menu-cart-with-border">
				<div class="hfe-site-header-cart-li current-menu-item">
				<?php if ( 'default' === $settings['hfe_cart_type'] ) { ?>
				<a class="hfe-cart-container" href="<?php echo esc_url( wc_get_cart_url() ); ?>" title="View your shopping cart">
					<div class="hfe-cart-menu-wrap-<?php echo $settings['hfe_cart_type']; ?>">
						<span class="count">
							<?php
							echo $woocommerce->cart->cart_contents_count;
							?>
						</span>
					</div>
				</a>
				<?php } else { ?>
						<div class="hfe-menu-cart__toggle elementor-button-wrapper">
							<a id="hfe-menu-cart__toggle_button" href="<?php echo esc_url( wc_get_cart_url() ); ?>" class="elementor-button">
								<span class="elementor-button-text">
									<?php echo $woocommerce->cart->get_cart_total(); ?>
								</span>
								<span class="elementor-button-icon" data-counter="<?php echo $woocommerce->cart->cart_contents_count; ?>">
									<i class="eicon" aria-hidden="true"></i>
									<span class="elementor-screen-only">Cart</span>
								</span>
							</a>
				<?php } ?>            
				</div>
			</div>
		</div> 
		<?php
	}


	/**
	 * Render cart output in the editor.
	 *
	 * Written as a Backbone JavaScript template and used to generate the live preview.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function content_template() {
	}

	/**
	 * Render cart output in the editor.
	 *
	 * Written as a Backbone JavaScript template and used to generate the live preview.
	 *
	 * Remove this after Elementor v3.3.0
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function _content_template() {
		$this->content_template();
	}
}
