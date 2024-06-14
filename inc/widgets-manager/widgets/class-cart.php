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
use Elementor\Group_Control_Border;

if ( ! defined( 'ABSPATH' ) ) {
	exit;   // Exit if accessed directly.
}

/**
 * HFE Cart Widget
 *
 * @since 1.4.0
 */
class Cart extends Widget_Base {

	/**
	 * Retrieve the widget name.
	 *
	 * @since 1.4.0
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
	 * @since 1.4.0
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
	 * @since 1.4.0
	 *
	 * @access public
	 *
	 * @return string Widget icon.
	 */
	public function get_icon() {
		return 'hfe-icon-menu-cart';
	}

	/**
	 * Retrieve the list of categories the widget belongs to.
	 *
	 * Used to determine where to display the widget in the editor.
	 *
	 * Note that currently Elementor supports only one category.
	 * When multiple categories passed, Elementor uses the first one.
	 *
	 * @since 1.4.0
	 *
	 * @access public
	 *
	 * @return array Widget categories.
	 */
	public function get_categories() {
		return array( 'hfe-widgets' );
	}

	/**
	 * Register cart controls.
	 *
	 * @since 1.5.7
	 * @access protected
	 * @return void
	 */
	protected function register_controls() {

		$this->register_general_content_controls();
		$this->register_cart_typo_content_controls();
	}

	/**
	 * Register Menu Cart General Controls.
	 *
	 * @since 1.4.0
	 * @access protected
	 * @return void
	 */
	protected function register_general_content_controls() {

		$this->start_controls_section(
			'section_general_fields',
			array(
				'label' => __( 'Menu Cart', 'header-footer-elementor' ),
			)
		);

		$this->add_control(
			'hfe_cart_type',
			array(
				'label'   => __( 'Type', 'header-footer-elementor' ),
				'type'    => Controls_Manager::SELECT,
				'default' => 'default',
				'options' => array(
					'default' => __( 'Default', 'header-footer-elementor' ),
					'custom'  => __( 'Custom', 'header-footer-elementor' ),
				),
			)
		);

		$this->add_control(
			'icon',
			array(
				'label'        => __( 'Icon', 'header-footer-elementor' ),
				'type'         => Controls_Manager::SELECT,
				'options'      => array(
					'bag-light'  => __( 'Bag Light', 'header-footer-elementor' ),
					'bag-medium' => __( 'Bag Medium', 'header-footer-elementor' ),
					'bag-solid'  => __( 'Bag Solid', 'header-footer-elementor' ),
				),
				'default'      => 'bag-light',
				'prefix_class' => 'toggle-icon--',
				'condition'    => array(
					'hfe_cart_type' => 'custom',
				),
			)
		);

		$this->add_control(
			'items_indicator',
			array(
				'label'        => __( 'Items Count', 'header-footer-elementor' ),
				'type'         => Controls_Manager::SELECT,
				'options'      => array(
					'none'   => __( 'None', 'header-footer-elementor' ),
					'bubble' => __( 'Bubble', 'header-footer-elementor' ),
				),
				'prefix_class' => 'hfe-menu-cart--items-indicator-',
				'default'      => 'bubble',
				'condition'    => array(
					'hfe_cart_type' => 'custom',
				),
			)
		);

		$this->add_control(
			'show_subtotal',
			array(
				'label'        => __( 'Show Total Price', 'header-footer-elementor' ),
				'type'         => Controls_Manager::SWITCHER,
				'label_on'     => __( 'Yes', 'header-footer-elementor' ),
				'label_off'    => __( 'No', 'header-footer-elementor' ),
				'return_value' => 'yes',
				'default'      => 'yes',
				'prefix_class' => 'hfe-menu-cart--show-subtotal-',
				'condition'    => array(
					'hfe_cart_type' => 'custom',
				),
			)
		);

		$this->add_control(
			'hide_empty_indicator',
			array(
				'label'        => __( 'Hide Empty', 'header-footer-elementor' ),
				'type'         => Controls_Manager::SWITCHER,
				'label_on'     => __( 'Yes', 'header-footer-elementor' ),
				'label_off'    => __( 'No', 'header-footer-elementor' ),
				'return_value' => 'hide',
				'prefix_class' => 'hfe-menu-cart--empty-indicator-',
				'description'  => __( 'This will hide the items count until the cart is empty', 'header-footer-elementor' ),
				'condition'    => array(
					'items_indicator!' => 'none',
					'hfe_cart_type'    => 'custom',
				),
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
				'frontend_available' => true,
				'prefix_class'       => 'elementor%s-align-',
				'default'            => '',
			)
		);

		$this->end_controls_section();
	}


	/**
	 * Register Menu Cart Typography Controls.
	 *
	 * @since 1.4.0
	 * @access protected
	 * @return void
	 */
	protected function register_cart_typo_content_controls() {
		$this->start_controls_section(
			'section_heading_typography',
			array(
				'label' => __( 'Menu Cart', 'header-footer-elementor' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			)
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			array(
				'name'      => 'toggle_button_typography',
				'global'    => array(
					'default' => Global_Typography::TYPOGRAPHY_PRIMARY,
				),
				'selector'  => '{{WRAPPER}} .hfe-menu-cart__toggle .elementor-button',
				'condition' => array(
					'hfe_cart_type' => 'custom',
				),
			)
		);
		$this->add_control(
			'icon_size',
			array(
				'label'     => __( 'Size', 'header-footer-elementor' ),
				'type'      => Controls_Manager::SLIDER,
				'range'     => array(
					'px' => array(
						'min' => 15,
						'max' => 30,
					),
				),
				'selectors' => array(
					'{{WRAPPER}} .hfe-masthead-custom-menu-items .hfe-site-header-cart .hfe-site-header-cart-li ' => 'font-size: {{SIZE}}{{UNIT}};',
				),
				'condition' => array(
					'hfe_cart_type' => 'default',
				),
			)
		);
		$this->add_control(
			'toggle_button_border_width',
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
				'selectors'  => array(
					'{{WRAPPER}} .hfe-menu-cart__toggle .elementor-button,{{WRAPPER}} .hfe-cart-menu-wrap-default .hfe-cart-count:after, {{WRAPPER}} .hfe-cart-menu-wrap-default .hfe-cart-count' => 'border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				),
			)
		);

		$this->add_control(
			'toggle_button_border_radius',
			array(
				'label'      => __( 'Border Radius', 'header-footer-elementor' ),
				'type'       => Controls_Manager::DIMENSIONS,
				'default'    => array(
					'top'    => '',
					'bottom' => '',
					'left'   => '',
					'right'  => '',
					'unit'   => 'px',
				),
				'size_units' => array( 'px', 'em', '%' ),
				'selectors'  => array(
					'{{WRAPPER}} .hfe-menu-cart__toggle .elementor-button,{{WRAPPER}} .hfe-cart-menu-wrap-default .hfe-cart-count:after, {{WRAPPER}} .hfe-cart-menu-wrap-default .hfe-cart-count' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				),

			)
		);

		$this->add_responsive_control(
			'toggle_button_padding',
			array(
				'label'              => __( 'Padding', 'header-footer-elementor' ),
				'type'               => Controls_Manager::DIMENSIONS,
				'size_units'         => array( 'px', 'em' ),
				'selectors'          => array(
					'{{WRAPPER}} .hfe-menu-cart__toggle .elementor-button' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}}',
				),
				'condition'          => array(
					'hfe_cart_type' => 'custom',
				),
				'frontend_available' => true,
			)
		);

		$this->start_controls_tabs( 'toggle_button_colors' );

		$this->start_controls_tab(
			'toggle_button_normal_colors',
			array(
				'label' => __( 'Normal', 'header-footer-elementor' ),
			)
		);

		$this->add_control(
			'toggle_button_text_color',
			array(
				'label'     => __( 'Text Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .hfe-menu-cart__toggle .elementor-button,{{WRAPPER}} .hfe-cart-menu-wrap-default span.hfe-cart-count' => 'color: {{VALUE}}',
				),
			)
		);

		$this->add_control(
			'toggle_button_icon_color',
			array(
				'label'     => __( 'Icon Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .hfe-menu-cart__toggle .elementor-button-icon' => 'color: {{VALUE}}',
				),
				'condition' => array(
					'hfe_cart_type' => 'custom',
				),
			)
		);

		$this->add_control(
			'toggle_button_background_color',
			array(
				'label'     => __( 'Background Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .hfe-menu-cart__toggle .elementor-button,{{WRAPPER}} .hfe-cart-menu-wrap-default span.hfe-cart-count' => 'background-color: {{VALUE}}',
				),
			)
		);

		$this->add_control(
			'toggle_button_border_color',
			array(
				'label'     => __( 'Border Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .hfe-menu-cart__toggle .elementor-button,{{WRAPPER}} .hfe-cart-menu-wrap-default .hfe-cart-count:after, {{WRAPPER}} .hfe-masthead-custom-menu-items .hfe-cart-menu-wrap-default .hfe-cart-count' => 'border-color: {{VALUE}}',
				),
			)
		);

		$this->end_controls_tab();

		$this->start_controls_tab(
			'toggle_button_hover_colors',
			array(
				'label' => __( 'Hover', 'header-footer-elementor' ),
			)
		);

		$this->add_control(
			'toggle_button_hover_text_color',
			array(
				'label'     => __( 'Text Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .hfe-menu-cart__toggle .elementor-button:hover,{{WRAPPER}} .hfe-cart-menu-wrap-default span.hfe-cart-count:hover' => 'color: {{VALUE}}',
				),
			)
		);

		$this->add_control(
			'toggle_button_hover_icon_color',
			array(
				'label'     => __( 'Icon Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .hfe-menu-cart__toggle .elementor-button:hover .elementor-button-icon' => 'color: {{VALUE}}',
				),
				'condition' => array(
					'hfe_cart_type' => 'custom',
				),
			)
		);

		$this->add_control(
			'toggle_button_hover_background_color',
			array(
				'label'     => __( 'Background Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .hfe-menu-cart__toggle .elementor-button:hover,{{WRAPPER}} .hfe-cart-menu-wrap-default span.hfe-cart-count:hover' => 'background-color: {{VALUE}}',
				),
			)
		);

		$this->add_control(
			'toggle_button_hover_border_color',
			array(
				'label'     => __( 'Border Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .hfe-menu-cart__toggle .elementor-button:hover,{{WRAPPER}} .hfe-cart-menu-wrap-default:hover .hfe-cart-count:after, {{WRAPPER}} .hfe-cart-menu-wrap-default:hover .hfe-cart-count' => 'border-color: {{VALUE}}',
				),
			)
		);

		$this->end_controls_tab();

		$this->end_controls_tabs();
		$this->add_control(
			'toggle_icon_size',
			array(
				'label'      => __( 'Icon Size', 'header-footer-elementor' ),
				'type'       => Controls_Manager::SLIDER,
				'range'      => array(
					'px' => array(
						'min' => 0,
						'max' => 50,
					),
				),
				'size_units' => array( 'px', 'em' ),
				'selectors'  => array(
					'{{WRAPPER}} .hfe-menu-cart__toggle .elementor-button-icon' => 'font-size: {{SIZE}}{{UNIT}}',
				),
				'condition'  => array(
					'hfe_cart_type' => 'custom',
				),
				'separator'  => 'before',
			)
		);

		$this->add_control(
			'toggle_icon_spacing',
			array(
				'label'      => __( 'Icon Spacing', 'header-footer-elementor' ),
				'type'       => Controls_Manager::SLIDER,
				'range'      => array(
					'px' => array(
						'min' => 0,
						'max' => 50,
					),
				),
				'size-units' => array( 'px', 'em' ),
				'selectors'  => array(
					'body:not(.rtl) {{WRAPPER}} .hfe-menu-cart__toggle .elementor-button-text' => 'margin-right: {{SIZE}}{{UNIT}}',
					'body.rtl {{WRAPPER}} .hfe-menu-cart__toggle .elementor-button-text' => 'margin-left: {{SIZE}}{{UNIT}}',
				),
				'condition'  => array(
					'hfe_cart_type' => 'custom',
				),
			)
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_icon',
			array(
				'label'     => __( 'Items Count', 'header-footer-elementor' ),
				'tab'       => Controls_Manager::TAB_STYLE,
				'condition' => array(
					'icon[value]!'     => '',
					'items_indicator!' => 'none',
					'hfe_cart_type'    => 'custom',
				),
			)
		);

		$this->add_control(
			'items_indicator_distance',
			array(
				'label'     => __( 'Distance', 'header-footer-elementor' ),
				'type'      => Controls_Manager::SLIDER,
				'default'   => array(
					'unit' => 'em',
				),
				'range'     => array(
					'em' => array(
						'min'  => 0,
						'max'  => 4,
						'step' => 0.1,
					),
				),
				'selectors' => array(
					'{{WRAPPER}} .hfe-menu-cart__toggle .elementor-button-icon[data-counter]:before' => 'right: -{{SIZE}}{{UNIT}}; top: -{{SIZE}}{{UNIT}}',
				),
				'condition' => array(
					'items_indicator' => 'bubble',
				),
			)
		);

		$this->start_controls_tabs( 'count_colors' );

		$this->start_controls_tab(
			'count_normal_colors',
			array(
				'label' => __( 'Normal', 'header-footer-elementor' ),
			)
		);

		$this->add_control(
			'items_indicator_text_color',
			array(
				'label'     => __( 'Text Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .hfe-menu-cart__toggle .elementor-button-icon[data-counter]:before' => 'color: {{VALUE}}',
				),
				'condition' => array(
					'items_indicator!' => 'none',
				),
			)
		);

		$this->add_control(
			'items_indicator_background_color',
			array(
				'label'     => __( 'Background Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .hfe-menu-cart__toggle .elementor-button-icon[data-counter]:before' => 'background-color: {{VALUE}}',
				),
				'condition' => array(
					'items_indicator' => 'bubble',
				),
			)
		);

		$this->end_controls_tab();

		$this->start_controls_tab(
			'count_hover_colors',
			array(
				'label' => __( 'Hover', 'header-footer-elementor' ),
			)
		);

		$this->add_control(
			'items_indicator_text_hover_color',
			array(
				'label'     => __( 'Text Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .hfe-menu-cart__toggle:hover .elementor-button-icon[data-counter]:before' => 'color: {{VALUE}}',
				),
				'condition' => array(
					'items_indicator!' => 'none',
				),
			)
		);

		$this->add_control(
			'items_indicator_background_hover_color',
			array(
				'label'     => __( 'Background Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => array(
					'{{WRAPPER}} .hfe-menu-cart__toggle:hover .elementor-button-icon[data-counter]:before' => 'background-color: {{VALUE}}',
				),
				'condition' => array(
					'items_indicator' => 'bubble',
				),
			)
		);

		$this->end_controls_tab();

		$this->end_controls_tabs();

		$this->end_controls_section();
	}

	/**
	 * Render Menu Cart output on the frontend.
	 *
	 * Written in PHP and used to generate the final HTML.
	 *
	 * @since 1.4.0
	 * @access protected
	 * @return void
	 */
	protected function render() {

		if ( null === WC()->cart ) {
			return;
		}

		$settings  = $this->get_settings_for_display();
		$cart_type = $settings['hfe_cart_type'];

		?>

		<div class="hfe-masthead-custom-menu-items woocommerce-custom-menu-item">
			<div id="hfe-site-header-cart" class="hfe-site-header-cart hfe-menu-cart-with-border">
				<div class="hfe-site-header-cart-li current-menu-item">
				<?php
				if ( 'default' === $cart_type ) {
					?>

					<a class="hfe-cart-container" href="<?php echo esc_url( wc_get_cart_url() ); ?>" title="View your shopping cart">
						<div class="hfe-cart-menu-wrap-default">
							<?php if ( null !== WC()->cart ) { ?>
								<span class="hfe-cart-count">
									<?php echo esc_html( WC()->cart->get_cart_contents_count() ); ?>
								</span>
							<?php } ?>
						</div>
					</a>
					<?php
				} else {
					?>
					<div class="hfe-menu-cart__toggle elementor-button-wrapper">
						<a id="hfe-menu-cart__toggle_button" href="<?php echo esc_url( wc_get_cart_url() ); ?>" class="elementor-button hfe-cart-container">
							<?php if ( null !== WC()->cart ) { ?>
								<span class="elementor-button-text hfe-subtotal">
									<?php echo wp_kses_post( WC()->cart->get_cart_subtotal() ); ?>
								</span>
							<?php } ?>
							<span class="elementor-button-icon" data-counter="<?php echo ( null !== WC()->cart ) ? esc_attr( WC()->cart->get_cart_contents_count() ) : ''; ?>">
								<i class="eicon" aria-hidden="true"></i>
								<span class="elementor-screen-only">
									<?php esc_html_e( 'Cart', 'header-footer-elementor' ); ?>
								</span>
							</span>
						</a>	
					</div>
				<?php } ?>            
				</div>
			</div>
		</div> 
		<?php
	}

	/**
	 * Render Menu Cart output in the editor.
	 *
	 * Written as a Backbone JavaScript template and used to generate the live preview.
	 *
	 * @since 1.4.0
	 * @access protected
	 * @return void
	 */
	protected function content_template() {
	}
}
