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
use Elementor\Group_Control_Box_Shadow;
use Elementor\Scheme_Color;
use Elementor\Utils;

if ( ! defined( 'ABSPATH' ) ) {
	exit;   // Exit if accessed directly.
}

/**
 * HFE Author Box
 *
 * HFE widget for Author Box.
 *
 * @since x.x.x
 */
class Author_Box extends Widget_Base {



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
		return 'hfe-author-box';
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
		return __( 'HFE Author Box', 'header-footer-elementor' );
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
		return 'fas fa-search';
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
	 * Register Author Box controls controls.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function _register_controls() {

		$this->register_general_content_controls();
		$this->register_heading_style_controls();
	}

	/**
	 * Register Author Box General Controls.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function register_general_content_controls() {
		$this->start_controls_section(
			'section_author_info',
			[
				'label' => __( 'Author Info', 'header-footer-elementor' ),
			]
		);

		$this->add_control(
			'source',
			[
				'label'   => __( 'Source', 'header-footer-elementor' ),
				'type'    => Controls_Manager::SELECT,
				'default' => 'current',
				'options' => [
					'current' => __( 'Current Author', 'header-footer-elementor' ),
					'custom'  => __( 'Custom', 'header-footer-elementor' ),
				],
			]
		);

		$this->add_control(
			'show_avatar',
			[
				'label'        => __( 'Profile Picture', 'header-footer-elementor' ),
				'type'         => Controls_Manager::SWITCHER,
				'prefix_class' => 'hfe-author-box--avatar-',
				'label_on'     => __( 'Show', 'header-footer-elementor' ),
				'label_off'    => __( 'Hide', 'header-footer-elementor' ),
				'default'      => 'yes',
				'separator'    => 'before',
				'condition'    => [
					'source!' => 'custom',
				],
				'render_type'  => 'template',
			]
		);

		$this->add_control(
			'author_avatar',
			[
				'label'     => __( 'Profile Picture', 'header-footer-elementor' ),
				'type'      => Controls_Manager::MEDIA,
				'default'   => [
					'url' => Utils::get_placeholder_image_src(),
				],
				'condition' => [
					'source' => 'custom',
				],
				'separator' => 'before',
			]
		);

		$this->add_control(
			'show_name',
			[
				'label'        => __( 'Display Name', 'header-footer-elementor' ),
				'type'         => Controls_Manager::SWITCHER,
				'prefix_class' => 'hfe-author-box--name-',
				'label_on'     => __( 'Show', 'header-footer-elementor' ),
				'label_off'    => __( 'Hide', 'header-footer-elementor' ),
				'default'      => 'yes',
				'condition'    => [
					'source!' => 'custom',
				],
				'render_type'  => 'template',
				'separator'    => 'before',
			]
		);

		$this->add_control(
			'author_name',
			[
				'label'     => __( 'Name', 'header-footer-elementor' ),
				'type'      => Controls_Manager::TEXT,
				'default'   => __( 'John Doe', 'header-footer-elementor' ),
				'condition' => [
					'source' => 'custom',
				],
				'separator' => 'before',
			]
		);

		$this->add_control(
			'author_name_tag',
			[
				'label'   => __( 'HTML Tag', 'header-footer-elementor' ),
				'type'    => Controls_Manager::SELECT,
				'options' => [
					'h1'   => 'H1',
					'h2'   => 'H2',
					'h3'   => 'H3',
					'h4'   => 'H4',
					'h5'   => 'H5',
					'h6'   => 'H6',
					'div'  => 'div',
					'span' => 'span',
				],
				'default' => 'h4',
			]
		);

		$this->add_control(
			'link_to',
			[
				'label'       => __( 'Link', 'header-footer-elementor' ),
				'type'        => Controls_Manager::SELECT,
				'options'     => [
					''              => __( 'None', 'header-footer-elementor' ),
					'website'       => __( 'Website', 'header-footer-elementor' ),
					'posts_archive' => __( 'Posts Archive', 'header-footer-elementor' ),
				],
				'condition'   => [
					'source!' => 'custom',
				],
				'description' => __( 'Link for the Author Name and Image', 'header-footer-elementor' ),
			]
		);

		$this->add_control(
			'show_biography',
			[
				'label'        => __( 'Biography', 'header-footer-elementor' ),
				'type'         => Controls_Manager::SWITCHER,
				'prefix_class' => 'hfe-author-box--biography-',
				'label_on'     => __( 'Show', 'header-footer-elementor' ),
				'label_off'    => __( 'Hide', 'header-footer-elementor' ),
				'default'      => 'yes',
				'condition'    => [
					'source!' => 'custom',
				],
				'render_type'  => 'template',
				'separator'    => 'before',
			]
		);

		$this->add_control(
			'show_link',
			[
				'label'        => __( 'Archive Button', 'header-footer-elementor' ),
				'type'         => Controls_Manager::SWITCHER,
				'prefix_class' => 'hfe-author-box--link-',
				'label_on'     => __( 'Show', 'header-footer-elementor' ),
				'label_off'    => __( 'Hide', 'header-footer-elementor' ),
				'default'      => 'no',
				'condition'    => [
					'source!' => 'custom',
				],
				'render_type'  => 'template',
			]
		);

		$this->add_control(
			'author_website',
			[
				'label'       => __( 'Link', 'header-footer-elementor' ),
				'type'        => Controls_Manager::URL,
				'placeholder' => __( 'https://your-link.com', 'header-footer-elementor' ),
				'condition'   => [
					'source' => 'custom',
				],
				'description' => __( 'Link for the Author Name and Image', 'header-footer-elementor' ),
			]
		);

		$this->add_control(
			'author_bio',
			[
				'label'     => __( 'Biography', 'header-footer-elementor' ),
				'type'      => Controls_Manager::TEXTAREA,
				'default'   => __( 'Lorem ipsum dolor sit amet consectetur adipiscing elit dolor', 'header-footer-elementor' ),
				'rows'      => 3,
				'condition' => [
					'source' => 'custom',
				],
				'separator' => 'before',
			]
		);

		$this->add_control(
			'posts_url',
			[
				'label'       => __( 'Archive Button', 'header-footer-elementor' ),
				'type'        => Controls_Manager::URL,
				'placeholder' => __( 'https://your-link.com', 'header-footer-elementor' ),
				'condition'   => [
					'source' => 'custom',
				],
			]
		);

		$this->add_control(
			'link_text',
			[
				'label'   => __( 'Archive Text', 'header-footer-elementor' ),
				'type'    => Controls_Manager::TEXT,
				'default' => __( 'All Posts', 'header-footer-elementor' ),
			]
		);

		$this->add_control(
			'layout',
			[
				'label'        => __( 'Layout', 'header-footer-elementor' ),
				'type'         => Controls_Manager::CHOOSE,
				'label_block'  => false,
				'options'      => [
					'left'  => [
						'title' => __( 'Left', 'header-footer-elementor' ),
						'icon'  => 'eicon-h-align-left',
					],
					'above' => [
						'title' => __( 'Above', 'header-footer-elementor' ),
						'icon'  => 'eicon-v-align-top',
					],
					'right' => [
						'title' => __( 'Right', 'header-footer-elementor' ),
						'icon'  => 'eicon-h-align-right',
					],
				],
				'separator'    => 'before',
				'prefix_class' => 'hfe-author-box--layout-image-',
			]
		);

		$this->add_control(
			'alignment',
			[
				'label'        => __( 'Alignment', 'header-footer-elementor' ),
				'type'         => Controls_Manager::CHOOSE,
				'label_block'  => false,
				'options'      => [
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
				'prefix_class' => 'hfe-author-box--align-',
			]
		);

		$this->end_controls_section();
	}

	/**
	 * Register Author Box Style Controls.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function register_heading_style_controls() {
		$this->start_controls_section(
			'section_image_style',
			[
				'label' => __( 'Image', 'header-footer-elementor' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			]
		);

		$this->add_control(
			'image_vertical_align',
			[
				'label'        => __( 'Vertical Align', 'header-footer-elementor' ),
				'type'         => Controls_Manager::CHOOSE,
				'label_block'  => false,
				'options'      => [
					'top'    => [
						'title' => __( 'Top', 'header-footer-elementor' ),
						'icon'  => 'eicon-v-align-top',
					],
					'middle' => [
						'title' => __( 'Middle', 'header-footer-elementor' ),
						'icon'  => 'eicon-v-align-middle',
					],
				],
				'prefix_class' => 'hfe-author-box--image-valign-',
				'condition'    => [
					'layout!' => 'above',
				],
			]
		);

		$this->add_responsive_control(
			'image_size',
			[
				'label'     => __( 'Image Size', 'header-footer-elementor' ),
				'type'      => Controls_Manager::SLIDER,
				'range'     => [
					'px' => [
						'min' => 0,
						'max' => 200,
					],
				],
				'selectors' => [
					'{{WRAPPER}} .hfe-author-box__avatar img' => 'width: {{SIZE}}{{UNIT}}; height: {{SIZE}}{{UNIT}}',
				],
			]
		);

		$this->add_responsive_control(
			'image_gap',
			[
				'label'     => __( 'Gap', 'header-footer-elementor' ),
				'type'      => Controls_Manager::SLIDER,
				'range'     => [
					'px' => [
						'min' => 0,
						'max' => 100,
					],
				],
				'selectors' => [
					'body.rtl {{WRAPPER}}.hfe-author-box--layout-image-left .hfe-author-box__avatar, 
                     body:not(.rtl) {{WRAPPER}}:not(.hfe-author-box--layout-image-above) .hfe-author-box__avatar' => 'margin-right: {{SIZE}}{{UNIT}}; margin-left: 0;',

					'body:not(.rtl) {{WRAPPER}}.hfe-author-box--layout-image-right .hfe-author-box__avatar, 
                     body.rtl {{WRAPPER}}:not(.hfe-author-box--layout-image-above) .hfe-author-box__avatar' => 'margin-left: {{SIZE}}{{UNIT}}; margin-right:0;',

					'{{WRAPPER}}.hfe-author-box--layout-image-above .hfe-author-box__avatar' => 'margin-bottom: {{SIZE}}{{UNIT}}',
				],
			]
		);

		$this->add_control(
			'image_border',
			[
				'label'     => __( 'Border', 'header-footer-elementor' ),
				'type'      => Controls_Manager::SWITCHER,
				'selectors' => [
					'{{WRAPPER}} .hfe-author-box__avatar img' => 'border-style: solid',
				],
			]
		);

		$this->add_control(
			'image_border_color',
			[
				'label'     => __( 'Border Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'default'   => '#000',
				'selectors' => [
					'{{WRAPPER}} .hfe-author-box__avatar img' => 'border-color: {{VALUE}}',
				],
				'condition' => [
					'image_border' => 'yes',
				],
			]
		);

		$this->add_responsive_control(
			'image_border_width',
			[
				'label'     => __( 'Border Width', 'header-footer-elementor' ),
				'type'      => Controls_Manager::SLIDER,
				'range'     => [
					'px' => [
						'min' => 0,
						'max' => 20,
					],
				],
				'selectors' => [
					'{{WRAPPER}} .hfe-author-box__avatar img' => 'border-width: {{SIZE}}{{UNIT}}',
				],
				'condition' => [
					'image_border' => 'yes',
				],
			]
		);

		$this->add_control(
			'image_border_radius',
			[
				'label'     => __( 'Border Radius', 'header-footer-elementor' ),
				'type'      => Controls_Manager::SLIDER,
				'selectors' => [
					'{{WRAPPER}} .hfe-author-box__avatar img' => 'border-radius: {{SIZE}}{{UNIT}}',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Box_Shadow::get_type(),
			[
				'name'           => 'input_box_shadow',
				'selector'       => '{{WRAPPER}} .hfe-author-box__avatar img',
				'fields_options' => [
					'box_shadow_type' => [
						'separator' => 'default',
					],
				],
			]
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_text_style',
			[
				'label' => __( 'Text', 'header-footer-elementor' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			]
		);

		$this->add_control(
			'heading_name_style',
			[
				'label'     => __( 'Name', 'header-footer-elementor' ),
				'type'      => Controls_Manager::HEADING,
				'separator' => 'before',
			]
		);

		$this->add_control(
			'name_color',
			[
				'label'     => __( 'Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'scheme'    => [
					'type'  => Scheme_Color::get_type(),
					'value' => Scheme_Color::COLOR_2,
				],
				'selectors' => [
					'{{WRAPPER}} .hfe-author-box__name' => 'color: {{VALUE}}',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name'     => 'name_typography',
				'selector' => '{{WRAPPER}} .hfe-author-box__name',
				'scheme'   => Scheme_Typography::TYPOGRAPHY_1,
			]
		);

		$this->add_responsive_control(
			'name_gap',
			[
				'label'     => __( 'Gap', 'header-footer-elementor' ),
				'type'      => Controls_Manager::SLIDER,
				'range'     => [
					'px' => [
						'min' => 0,
						'max' => 100,
					],
				],
				'selectors' => [
					'{{WRAPPER}} .hfe-author-box__name' => 'margin-bottom: {{SIZE}}{{UNIT}}',
				],
			]
		);

		$this->add_control(
			'heading_bio_style',
			[
				'label'     => __( 'Biography', 'header-footer-elementor' ),
				'type'      => Controls_Manager::HEADING,
				'separator' => 'before',
			]
		);

		$this->add_control(
			'bio_color',
			[
				'label'     => __( 'Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'scheme'    => [
					'type'  => Scheme_Color::get_type(),
					'value' => Scheme_Color::COLOR_3,
				],
				'selectors' => [
					'{{WRAPPER}} .hfe-author-box__bio' => 'color: {{VALUE}}',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name'     => 'bio_typography',
				'selector' => '{{WRAPPER}} .hfe-author-box__bio',
				'scheme'   => Scheme_Typography::TYPOGRAPHY_3,
			]
		);

		$this->add_responsive_control(
			'bio_gap',
			[
				'label'     => __( 'Gap', 'header-footer-elementor' ),
				'type'      => Controls_Manager::SLIDER,
				'range'     => [
					'px' => [
						'min' => 0,
						'max' => 100,
					],
				],
				'selectors' => [
					'{{WRAPPER}} .hfe-author-box__bio' => 'margin-bottom: {{SIZE}}{{UNIT}}',
				],
			]
		);

		$this->end_controls_section();

		$this->start_controls_section(
			'section_style_button',
			[
				'label' => 'Button',
				'tab'   => Controls_Manager::TAB_STYLE,
			]
		);

		$this->start_controls_tabs( 'tabs_button_style' );

		$this->start_controls_tab(
			'tab_button_normal',
			[
				'label' => __( 'Normal', 'header-footer-elementor' ),
			]
		);

		$this->add_control(
			'button_text_color',
			[
				'label'     => __( 'Text Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'scheme'    => [
					'type'  => Scheme_Color::get_type(),
					'value' => Scheme_Color::COLOR_2,
				],
				'default'   => '',
				'selectors' => [
					'{{WRAPPER}} .hfe-author-box__button' => 'color: {{VALUE}}; border-color: {{VALUE}}',
				],
			]
		);

		$this->add_control(
			'button_background_color',
			[
				'label'     => __( 'Background Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .hfe-author-box__button' => 'background-color: {{VALUE}}',
				],
			]
		);

		$this->add_group_control(
			Group_Control_Typography::get_type(),
			[
				'name'     => 'button_typography',
				'scheme'   => Scheme_Typography::TYPOGRAPHY_4,
				'selector' => '{{WRAPPER}} .hfe-author-box__button',
			]
		);

		$this->end_controls_tab();

		$this->start_controls_tab(
			'tab_button_hover',
			[
				'label' => __( 'Hover', 'header-footer-elementor' ),
			]
		);

		$this->add_control(
			'button_hover_color',
			[
				'label'     => __( 'Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'scheme'    => [
					'type'  => Scheme_Color::get_type(),
					'value' => Scheme_Color::COLOR_2,
				],
				'selectors' => [
					'{{WRAPPER}} .hfe-author-box__button:hover' => 'border-color: {{VALUE}}; color: {{VALUE}};',
				],
			]
		);

		$this->add_control(
			'button_background_hover_color',
			[
				'label'     => __( 'Background Color', 'header-footer-elementor' ),
				'type'      => Controls_Manager::COLOR,
				'selectors' => [
					'{{WRAPPER}} .hfe-author-box__button:hover' => 'background-color: {{VALUE}};',
				],
			]
		);

		$this->add_control(
			'button_hover_animation',
			[
				'label' => __( 'Animation', 'header-footer-elementor' ),
				'type'  => Controls_Manager::HOVER_ANIMATION,
			]
		);

		$this->end_controls_tab();

		$this->end_controls_tabs();

		$this->add_control(
			'button_border_width',
			[
				'label'     => __( 'Border Width', 'header-footer-elementor' ),
				'type'      => Controls_Manager::SLIDER,
				'range'     => [
					'px' => [
						'min' => 0,
						'max' => 20,
					],
				],
				'selectors' => [
					'{{WRAPPER}} .hfe-author-box__button' => 'border-width: {{SIZE}}{{UNIT}};',
				],
				'separator' => 'before',
				'condition' => [
					'link_text!' => '',
				],
			]
		);

		$this->add_control(
			'button_border_radius',
			[
				'label'     => __( 'Border Radius', 'header-footer-elementor' ),
				'type'      => Controls_Manager::SLIDER,
				'range'     => [
					'px' => [
						'min' => 0,
						'max' => 100,
					],
				],
				'selectors' => [
					'{{WRAPPER}} .hfe-author-box__button' => 'border-radius: {{SIZE}}{{UNIT}};',
				],
				'separator' => 'after',
				'condition' => [
					'link_text!' => '',
				],
			]
		);

		$this->add_control(
			'button_text_padding',
			[
				'label'      => __( 'Padding', 'header-footer-elementor' ),
				'type'       => Controls_Manager::DIMENSIONS,
				'size_units' => [ 'px', 'em' ],
				'selectors'  => [
					'{{WRAPPER}} .hfe-author-box__button' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
				],
				'separator'  => 'before',
			]
		);

		$this->end_controls_section();
	}

	/**
	 * Render Author Box output on the frontend.
	 *
	 * Written in PHP and used to generate the final HTML.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function render() {
		$settings        = $this->get_active_settings();
		$author          = [];
		$link_tag        = 'div';
		$link_url        = '';
		$link_target     = '';
		$author_name_tag = $settings['author_name_tag'];

		$custom_src = ( 'custom' === $settings['source'] );

		if ( 'current' === $settings['source'] ) {
			$avatar_args['size'] = 300;

			$user_id                = get_the_author_meta( 'ID' );
			$author['avatar']       = get_avatar_url( $user_id, $avatar_args );
			$author['display_name'] = get_the_author_meta( 'display_name' );
			$author['website']      = get_the_author_meta( 'user_url' );
			$author['bio']          = get_the_author_meta( 'description' );
			$author['posts_url']    = get_author_posts_url( $user_id );
		} elseif ( $custom_src ) {
			if ( ! empty( $settings['author_avatar']['url'] ) ) {
				$avatar_src = $settings['author_avatar']['url'];

				if ( $settings['author_avatar']['id'] ) {
					$attachment_image_src = wp_get_attachment_image_src( $settings['author_avatar']['id'], 'medium' );

					if ( ! empty( $attachment_image_src[0] ) ) {
						$avatar_src = $attachment_image_src[0];
					}
				}

				$author['avatar'] = $avatar_src;
			}

			$author['display_name'] = $settings['author_name'];
			$author['website']      = $settings['author_website']['url'];
			$author['bio']          = wpautop( $settings['author_bio'] );
			$author['posts_url']    = $settings['posts_url']['url'];
		}

		$print_avatar = ( ( ! $custom_src && 'yes' === $settings['show_avatar'] ) || ( $custom_src && ! empty( $author['avatar'] ) ) );
		$print_name   = ( ( ! $custom_src && 'yes' === $settings['show_name'] ) || ( $custom_src && ! empty( $author['display_name'] ) ) );
		$print_bio    = ( ( ! $custom_src && 'yes' === $settings['show_biography'] ) || ( $custom_src && ! empty( $author['bio'] ) ) );
		$print_link   = ( ( ! $custom_src && 'yes' === $settings['show_link'] ) && ! empty( $settings['link_text'] ) || ( $custom_src && ! empty( $author['posts_url'] ) && ! empty( $settings['link_text'] ) ) );

		if ( ! empty( $settings['link_to'] ) || $custom_src ) {
			if ( ( $custom_src || 'website' === $settings['link_to'] ) && ! empty( $author['website'] ) ) {
				$link_tag = 'a';
				$link_url = $author['website'];

				if ( $custom_src ) {
					$link_target = $settings['author_website']['is_external'] ? '_blank' : '';
				} else {
					$link_target = '_blank';
				}
			} elseif ( 'posts_archive' === $settings['link_to'] && ! empty( $author['posts_url'] ) ) {
				$link_tag = 'a';
				$link_url = $author['posts_url'];
			}

			if ( ! empty( $link_url ) ) {
				$this->add_render_attribute( 'author_link', 'href', $link_url );

				if ( ! empty( $link_target ) ) {
					$this->add_render_attribute( 'author_link', 'target', $link_target );
				}
			}
		}

		$this->add_render_attribute(
			'button',
			'class',
			[
				'hfe-author-box__button',
				'elementor-button',
				'elementor-size-xs',
			]
		);

		if ( $print_link ) {
			$this->add_render_attribute( 'button', 'href', $author['posts_url'] );
		}

		if ( $print_link && ! empty( $settings['button_hover_animation'] ) ) {
			$this->add_render_attribute(
				'button',
				'class',
				'elementor-animation-' . $settings['button_hover_animation']
			);
		}

		if ( $print_avatar ) {
			$this->add_render_attribute( 'avatar', 'src', $author['avatar'] );

			if ( ! empty( $author['display_name'] ) ) {
				$this->add_render_attribute( 'avatar', 'alt', $author['display_name'] );
			}
		}

		?>
		<div class="hfe-author-box">
			<?php if ( $print_avatar ) { ?>
				<<?php echo $link_tag; ?> <?php echo $this->get_render_attribute_string( 'author_link' ); ?> class="hfe-author-box__avatar">
					<img <?php echo $this->get_render_attribute_string( 'avatar' ); ?>>
				</<?php echo $link_tag; ?>>
			<?php } ?>

			<div class="hfe-author-box__text">
				<?php if ( $print_name ) : ?>
					<<?php echo $link_tag; ?> <?php echo $this->get_render_attribute_string( 'author_link' ); ?>>
						<?php echo '<' . $author_name_tag . ' class="hfe-author-box__name">' . $author['display_name'] . '</' . $author_name_tag . '>'; ?>
					</<?php echo $link_tag; ?>>
				<?php endif; ?>

				<?php if ( $print_bio ) : ?>
					<div class="hfe-author-box__bio">
						<?php echo $author['bio']; ?>
					</div>
				<?php endif; ?>

				<?php if ( $print_link ) : ?>
					<a <?php echo $this->get_render_attribute_string( 'button' ); ?>>
						<?php echo $settings['link_text']; ?>
					</a>
				<?php endif; ?>
			</div>
		</div>
		<?php
	}

	/**
	 * Render Author Box widget output in the editor.
	 *
	 * Written as a Backbone JavaScript template and used to generate the live preview.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function _content_template() {
	}
}
