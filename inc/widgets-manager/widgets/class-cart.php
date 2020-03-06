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

if ( ! defined( 'ABSPATH' ) ) {
	exit;   // Exit if accessed directly.
}

/**
 * HFE cart widget
 *
 * HFE widget for cart
 *
 * @since 1.3.0
 */
class Cart extends Widget_Base {



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
		return 'hfe-cart';
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
		return __( 'cart', 'header-footer-elementor' );
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
	 * @since 1.3.0
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
	 * @since 1.3.0
	 * @access protected
	 */
	protected function _register_controls() {

		$this->register_general_content_controls();
		$this->register_heading_typo_content_controls();
	}

	/**
	 * Register Advanced Heading General Controls.
	 *
	 * @since 1.3.0
	 * @access protected
	 */
	protected function register_general_content_controls() {

		$this->start_controls_section(
			'section_general_fields',
			[
				'label' => __( 'General', 'header-footer-elementor' ),
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
				'label'       => __( 'Icon', 'header-footer-elementor' ),
				'type'        => Controls_Manager::ICONS,
				'label_block' => 'true',
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
					'xs'      => __( 'Extra Small', 'header-footer-elementor' ),
					'sm'      => __( 'Small', 'header-footer-elementor' ),
					'md'      => __( 'Medium', 'header-footer-elementor' ),
					'lg'      => __( 'Large', 'header-footer-elementor' ),
					'xl'      => __( 'Extra Large', 'header-footer-elementor' ),
				],
			]
		);

		$this->add_responsive_control(
			'align',
			[
				'label'        => __( 'Alignment', 'elementor' ),
				'type'         => Controls_Manager::CHOOSE,
				'options'      => [
					'left'    => [
						'title' => __( 'Left', 'elementor' ),
						'icon'  => 'eicon-text-align-left',
					],
					'center'  => [
						'title' => __( 'Center', 'elementor' ),
						'icon'  => 'eicon-text-align-center',
					],
					'right'   => [
						'title' => __( 'Right', 'elementor' ),
						'icon'  => 'eicon-text-align-right',
					],
					'justify' => [
						'title' => __( 'Justified', 'elementor' ),
						'icon'  => 'eicon-text-align-justify',
					],
				],
				'prefix_class' => 'elementor%s-align-',
				'default'      => '',
			]
		);

		// $this->add_control(
		// 'hfe_cart_icon_align',
		// [
		// 'label' => __('Icon Position', 'header-footer-elementor'),
		// 'type' => Controls_Manager::SELECT,
		// 'default' => 'left',
		// 'options' => [
		// 'left' => __('Before', 'header-footer-elementor'),
		// 'right' => __('After', 'header-footer-elementor'),
		// ],
		// ]
		// );

		$this->end_controls_section();
	}


	/**
	 * Register Advanced Heading Typography Controls.
	 *
	 * @since 1.3.0
	 * @access protected
	 */
	protected function register_heading_typo_content_controls() {
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
				'scheme'   => Scheme_Typography::TYPOGRAPHY_1,
				'selector' => '{{WRAPPER}} .cart-customlocation, {{WRAPPER}} .hfe-cart-menu-wrap-custom a,{{WRAPPER}} .hfe-cart-menu-wrap-default a',
			]
		);
		$this->add_control(
			'heading_color',
			[
				'label'     => __( 'Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'scheme'    => [
					'type'  => Scheme_Color::get_type(),
					'value' => Scheme_Color::COLOR_1,
				],
				'selectors' => [
					'{{WRAPPER}} .hfe-cart-menu-wrap-custom span,{{WRAPPER}} .hfe-cart-menu-wrap-custom a.cart-customlocation' => 'color: {{VALUE}};',
					'{{WRAPPER}} .hfe-cart-menu-wrap-default span,{{WRAPPER}} .hfe-cart-menu-wrap-default a.cart-customlocation' => 'color: {{VALUE}};',
				],
			]
		);
		$this->add_control(
			'heading_bg_color',
			[
				'label'     => __( 'Background Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'scheme'    => [
					'type'  => Scheme_Color::get_type(),
					'value' => Scheme_Color::COLOR_1,
				],
				'selectors' => [
					'{{WRAPPER}} .hfe-cart-menu-wrap-custom span.count,{{WRAPPER}} .hfe-cart-menu-wrap-default span.count' => 'background-color: {{VALUE}};',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Text_Shadow::get_type(),
			[
				'name'     => 'heading_shadow',
				'selector' => '{{WRAPPER}} .hfe-cart-menu-wrap-custom span,{{WRAPPER}} .hfe-cart-menu-wrap-custom a.cart-customlocation,{{WRAPPER}} .hfe-cart-menu-wrap-default span,{{WRAPPER}} .hfe-cart-menu-wrap-default a.cart-customlocation',
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
				'scheme'    => [
					'type'  => Scheme_Color::get_type(),
					'value' => Scheme_Color::COLOR_1,
				],
				'condition' => [
					'icon[value]!' => '',
				],
				'default'   => '',
				'selectors' => [
					'{{WRAPPER}} .hfe-button-icon i'   => 'color: {{VALUE}};',
					'{{WRAPPER}} .hfe-button-icon svg' => 'fill: {{VALUE}};',
				],
			]
		);

		$this->add_control(
			'button_border_color',
			[
				'label'     => __( 'Border Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'scheme'    => [
					'type'  => Scheme_Color::get_type(),
					'value' => Scheme_Color::COLOR_1,
				],
				'condition' => [
					'icon[value]!' => '',
				],
				'default'   => '',
				'selectors' => [
					'{{WRAPPER}} .hfe-cart-menu-wrap-custom .count,{{WRAPPER}} .hfe-cart-menu-wrap-custom .count:after'   => 'border-color: {{VALUE}};',
					'{{WRAPPER}} .hfe-cart-menu-wrap-default .count,{{WRAPPER}} .hfe-cart-menu-wrap-default .count:after'   => 'border-color: {{VALUE}};',
				],
			]
		);

		// $this->add_control(
		// 'icons_hover_color',
		// [
		// 'label'     => __('Icon Hover Color', 'header-footer-elementor'),
		// 'type'      => Controls_Manager::COLOR,
		// 'condition' => [
		// 'icon[value]!' => '',
		// ],
		// 'default'   => '',
		// 'selectors' => [
		// '{{WRAPPER}} .hfe-button-icon:hover i'   => 'color: {{VALUE}};',
		// '{{WRAPPER}} .hfe-button-icon:hover svg' => 'fill: {{VALUE}};',
		// ],
		// ]
		// );
		$this->end_controls_section();
	}

	/**
	 * Render Heading output on the frontend.
	 *
	 * Written in PHP and used to generate the final HTML.
	 *
	 * @since 1.3.0
	 * @access protected
	 */
	protected function render() {

		$settings = $this->get_settings();
		global $woocommerce;

		if ( empty( $woocommerce ) ) {
			return;
		}

		// echo sprintf(_n('%d ', '%d ', $woocommerce->cart->cart_contents_count, 'header-footer-elementor'), $woocommerce->cart->cart_contents_count);
		// echo $woocommerce->cart->get_cart_total();

		?>
		<div class="hfe-masthead-custom-menu-items woocommerce-custom-menu-item">
			<div id="hfe-site-header-cart" class="hfe-site-header-cart hfe-menu-cart-with-border">
				<div class="hfe-site-header-cart-li current-menu-item">
				  <?php if ( 'default' === $settings['hfe_cart_type'] ) { ?>
				<a class="cart-container" href="<?php echo esc_url( wc_get_cart_url() ); ?>" title="View your shopping cart">
					<div class="hfe-cart-menu-wrap-<?php echo $settings['hfe_cart_type']; ?> elementor-size-<?php echo $settings['size']; ?>">
						<span class="count"> <?php echo sprintf( _n( '%d ', '%d ', $woocommerce->cart->cart_contents_count, 'header-footer-elementor' ), $woocommerce->cart->cart_contents_count ); ?></span>
					</div>
				</a>
					<?php } else { ?>
						<div class="hfe-cart-menu-wrap-<?php echo $settings['hfe_cart_type']; ?> elementor-size-<?php echo $settings['size']; ?>">
							<span class="count"> 
							<span class="hfe-button-icon hfe-align-icon-<?php echo $settings['hfe_cart_icon_align']; ?>">
								<i aria-hidden="true" class="<?php echo $settings['icon']['value']; ?>"></i>
							</span>
								<a class="cart-customlocation" href="<?php echo esc_url( wc_get_cart_url() ); ?>" title="<?php _e( 'View your shopping cart', 'header-footer-elementor' ); ?>"><?php echo sprintf( _n( '%d item', '%d items', $woocommerce->cart->cart_contents_count, 'header-footer-elementor' ), $woocommerce->cart->cart_contents_count ); ?> - <?php echo $woocommerce->cart->get_cart_total(); ?>
								</a>
							</span>
						</div>
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
		 * @since 1.3.0
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
	 * @since 1.3.0
	 * @access protected
	 */
	protected function _content_template() {
		$this->content_template();
	}
}
