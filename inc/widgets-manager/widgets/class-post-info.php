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
use Elementor\Scheme_Color;
use Elementor\Repeater;
use Elementor\Icons_Manager;

if ( ! defined( 'ABSPATH' ) ) {
	exit;   // Exit if accessed directly.
}

/**
 * HFE Post Info
 *
 * HFE widget for Post Info.
 *
 * @since x.x.x
 */
class Post_Info extends Widget_Base {

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
		return 'hfe-post-info';
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
		return __( 'Post Info', 'header-footer-elementor' );
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
	 * Register site title controls controls.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function _register_controls() {

		$this->register_content_controls();
		$this->register_list_style_controls();
		$this->register_list_icon_style_controls();
		$this->register_list_text_style_controls();
	}

	/**
	 * Register Post Info General Controls.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function register_content_controls() {

		$this->start_controls_section(
			'section_general',
			[
				'label' => __( 'Meta Info', 'header-footer-elementor' ),
			]
		);

			$this->add_control(
				'layout',
				[
					'label'       => __( 'Layout', 'header-footer-elementor' ),
					'type'        => Controls_Manager::SELECT,
					'default'     => 'inline',
					'options'     => [
						'default' => __( 'Default', 'header-footer-elementor' ),
						'inline'  => __( 'Inline', 'header-footer-elementor' ),
					],
					'render_type' => 'template',
				]
			);

			$repeater = new Repeater();

			$repeater->add_control(
				'meta_type',
				[
					'label'   => __( 'Type', 'header-footer-elementor' ),
					'type'    => Controls_Manager::SELECT,
					'default' => 'date',
					'options' => [
						'author'   => __( 'Author', 'header-footer-elementor' ),
						'date'     => __( 'Date', 'header-footer-elementor' ),
						'time'     => __( 'Time', 'header-footer-elementor' ),
						'comments' => __( 'Comments', 'header-footer-elementor' ),
						'terms'    => __( 'Terms', 'header-footer-elementor' ),
						'custom'   => __( 'Custom', 'header-footer-elementor' ),
					],
				]
			);

			$repeater->add_control(
				'date_format',
				[
					'label'       => __( 'Date Format', 'header-footer-elementor' ),
					'type'        => Controls_Manager::SELECT,
					'label_block' => false,
					'default'     => 'default',
					'options'     => [
						'default' => 'Default',
						'0'       => _x( 'January 2, 2020 (F j, Y)', 'Date Format', 'header-footer-elementor' ),
						'1'       => '2020-01-02 (Y-m-d)',
						'2'       => '01/02/2020 (m/d/Y)',
						'3'       => '02/01/2020 (d/m/Y)',
						'custom'  => __( 'Custom', 'header-footer-elementor' ),
					],
					'condition'   => [
						'meta_type' => 'date',
					],
				]
			);

			$repeater->add_control(
				'custom_date_format',
				[
					'label'       => __( 'Custom Date Format', 'header-footer-elementor' ),
					'type'        => Controls_Manager::TEXT,
					'default'     => 'F j, Y',
					'label_block' => false,
					'condition'   => [
						'meta_type'        => 'date',
						'date_format' => 'custom',
					],
					'description' => sprintf(
						/* translators: %s: Allowed data letters (see: http://php.net/manual/en/function.date.php). */
						__( 'Use the letters: %s', 'header-footer-elementor' ),
						'l D d j S F m M n Y y'
					),
				]
			);

			$repeater->add_control(
				'time_format',
				[
					'label'       => __( 'Time Format', 'header-footer-elementor' ),
					'type'        => Controls_Manager::SELECT,
					'label_block' => false,
					'default'     => 'default',
					'options'     => [
						'default' => 'Default',
						'0'       => '5:12 pm (g:i a)',
						'1'       => '5:12 PM (g:i A)',
						'2'       => '17:12 (H:i)',
						'custom'  => __( 'Custom', 'header-footer-elementor' ),
					],
					'condition'   => [
						'meta_type' => 'time',
					],
				]
			);
			$repeater->add_control(
				'custom_time_format',
				[
					'label'       => __( 'Custom Time Format', 'header-footer-elementor' ),
					'type'        => Controls_Manager::TEXT,
					'default'     => 'g:i a',
					'placeholder' => 'g:i a',
					'label_block' => false,
					'condition'   => [
						'meta_type'        => 'time',
						'time_format' => 'custom',
					],
					'description' => sprintf(
						/* translators: %s: Allowed time letters (see: http://php.net/manual/en/function.time.php). */
						__( 'Use the letters: %s', 'header-footer-elementor' ),
						'g G H i a A'
					),
				]
			);

			$repeater->add_control(
				'taxonomy',
				[
					'label'       => __( 'Taxonomy', 'header-footer-elementor' ),
					'type'        => Controls_Manager::SELECT2,
					'label_block' => true,
					'default'     => [],
					'options'     => $this->get_taxonomy_list(),
					'condition'   => [
						'meta_type' => 'terms',
					],
				]
			);

			$repeater->add_control(
				'max_terms',
				array(
					'label'     => __( 'Maximum Terms', 'uael' ),
					'type'      => Controls_Manager::NUMBER,
					'min'       => 1,
					'condition' => array(
						'meta_type' => 'terms',
					),
				)
			);

			$repeater->add_control(
				'text_prefix',
				[
					'label'       => __( 'Before', 'header-footer-elementor' ),
					'type'        => Controls_Manager::TEXT,
					'label_block' => false,
					'condition'   => [
						'meta_type!' => 'custom',
					],
				]
			);

			$repeater->add_control(
				'show_avatar',
				[
					'label'     => __( 'Show Avatar', 'header-footer-elementor' ),
					'type'      => Controls_Manager::SWITCHER,
					'condition' => [
						'meta_type' => 'author',
					],
				]
			);

			$repeater->add_responsive_control(
				'avatar_size',
				[
					'label'     => __( 'Size', 'header-footer-elementor' ),
					'type'      => Controls_Manager::SLIDER,
					'selectors' => [
						'{{WRAPPER}} {{CURRENT_ITEM}} .elementor-icon-list-icon' => 'width: {{SIZE}}{{UNIT}}',
					],
					'condition' => [
						'show_avatar' => 'yes',
					],
				]
			);

			$repeater->add_control(
				'comments_custom_strings',
				[
					'label'     => __( 'Custom Format', 'header-footer-elementor' ),
					'type'      => Controls_Manager::SWITCHER,
					'default'   => false,
					'condition' => [
						'meta_type' => 'comments',
					],
				]
			);

			$repeater->add_control(
				'no_comments_string',
				[
					'label'       => __( 'No Comments', 'header-footer-elementor' ),
					'type'        => Controls_Manager::TEXT,
					'label_block' => false,
					'placeholder' => __( 'No Comments', 'header-footer-elementor' ),
					'condition'   => [
						'comments_custom_strings' => 'yes',
						'meta_type'                    => 'comments',
					],
				]
			);

			$repeater->add_control(
				'one_comment_string',
				[
					'label'       => __( 'One Comment', 'header-footer-elementor' ),
					'type'        => Controls_Manager::TEXT,
					'label_block' => false,
					'placeholder' => __( 'One Comment', 'header-footer-elementor' ),
					'condition'   => [
						'comments_custom_strings' => 'yes',
						'meta_type'                    => 'comments',
					],
				]
			);

			$repeater->add_control(
				'comments_string',
				[
					'label'       => __( 'Comments', 'header-footer-elementor' ),
					'type'        => Controls_Manager::TEXT,
					'label_block' => false,
					/* translators: %s admin link */
					'placeholder' => __( '%s Comments', 'header-footer-elementor' ),
					'condition'   => [
						'comments_custom_strings' => 'yes',
						'meta_type'                    => 'comments',
					],
				]
			);

			$repeater->add_control(
				'custom_text',
				[
					'label'       => __( 'Custom', 'header-footer-elementor' ),
					'type'        => Controls_Manager::TEXT,
					'dynamic'     => [
						'active' => true,
					],
					'label_block' => true,
					'condition'   => [
						'meta_type' => 'custom',
					],
				]
			);

			$repeater->add_control(
				'link',
				[
					'label'     => __( 'Link', 'header-footer-elementor' ),
					'type'      => Controls_Manager::SWITCHER,
					'default'   => 'yes',
					'condition' => [
						'meta_type!' => 'time',
					],
				]
			);

			$repeater->add_control(
				'custom_url',
				[
					'label'     => __( 'Custom URL', 'header-footer-elementor' ),
					'type'      => Controls_Manager::URL,
					'dynamic'   => [
						'active' => true,
					],
					'condition' => [
						'meta_type' => 'custom',
					],
				]
			);

			$repeater->add_control(
				'show_icon',
				[
					'label'     => __( 'Icon', 'header-footer-elementor' ),
					'type'      => Controls_Manager::SELECT,
					'options'   => [
						'none'    => __( 'None', 'header-footer-elementor' ),
						'default' => __( 'Default', 'header-footer-elementor' ),
						'custom'  => __( 'Custom', 'header-footer-elementor' ),
					],
					'default'   => 'default',
					'condition' => [
						'show_avatar!' => 'yes',
					],
				]
			);

			$repeater->add_control(
				'icon',
				[
					'label'     => __( 'Choose Icon', 'header-footer-elementor' ),
					'type'      => Controls_Manager::ICONS,
					'condition' => [
						'show_icon'    => 'custom',
						'show_avatar!' => 'yes',
					],
				]
			);

			$this->add_control(
				'meta_list',
				[
					'label'       => '',
					'type'        => Controls_Manager::REPEATER,
					'fields'      => $repeater->get_controls(),
					'default'     => [
						[
							'meta_type' => 'author',
							'icon' => [
								'value'   => 'far fa-user-circle',
								'library' => 'fa-regular',
							],
						],
						[
							'meta_type' => 'date',
							'icon' => [
								'value'   => 'fas fa-calendar',
								'library' => 'fa-solid',
							],
						],
						[
							'meta_type' => 'time',
							'icon' => [
								'value'   => 'far fa-clock',
								'library' => 'fa-regular',
							],
						],
						[
							'meta_type' => 'comments',
							'icon' => [
								'value'   => 'far fa-comment-dots',
								'library' => 'fa-regular',
							],
						],
					],
					'title_field' => '{{{ elementor.helpers.renderIcon( this, icon, {}, "i", "panel" ) || \'<i class="{{ icon }}" aria-hidden="true"></i>\' }}} <span style="text-transform: capitalize;">{{{ meta_type }}}</span>',
				]
			);

		$this->end_controls_section();
	}

	/**
	 * Register Post Info Style Controls.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function register_list_style_controls() {
		$this->start_controls_section(
			'section_list_style',
			[
				'label' => __( 'List', 'header-footer-elementor' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			]
		);

			$this->add_responsive_control(
				'space_between',
				[
					'label'     => __( 'Space Between', 'header-footer-elementor' ),
					'type'      => Controls_Manager::SLIDER,
					'range'     => [
						'px' => [
							'max' => 50,
						],
					],
					'selectors' => [
						'{{WRAPPER}} .elementor-icon-list-items:not(.elementor-inline-items) .elementor-icon-list-item:not(:last-child)' => 'padding-bottom: calc({{SIZE}}{{UNIT}}/2)',
						'{{WRAPPER}} .elementor-icon-list-items:not(.elementor-inline-items) .elementor-icon-list-item:not(:first-child)' => 'margin-top: calc({{SIZE}}{{UNIT}}/2)',
						'{{WRAPPER}} .elementor-icon-list-items.elementor-inline-items .elementor-icon-list-item' => 'margin-right: calc({{SIZE}}{{UNIT}}/2); margin-left: calc({{SIZE}}{{UNIT}}/2)',
						'{{WRAPPER}} .elementor-icon-list-items.elementor-inline-items' => 'margin-right: calc(-{{SIZE}}{{UNIT}}/2); margin-left: calc(-{{SIZE}}{{UNIT}}/2)',
						'body.rtl {{WRAPPER}} .elementor-icon-list-items.elementor-inline-items .elementor-icon-list-item:after' => 'left: calc(-{{SIZE}}{{UNIT}}/2)',
						'body:not(.rtl) {{WRAPPER}} .elementor-icon-list-items.elementor-inline-items .elementor-icon-list-item:after' => 'right: calc(-{{SIZE}}{{UNIT}}/2)',
					],
				]
			);

			$this->add_responsive_control(
				'content_align',
				[
					'label'        => __( 'Alignment', 'header-footer-elementor' ),
					'type'         => Controls_Manager::CHOOSE,
					'options'      => [
						'left'   => [
							'title' => __( 'Start', 'header-footer-elementor' ),
							'icon'  => 'eicon-h-align-left',
						],
						'center' => [
							'title' => __( 'Center', 'header-footer-elementor' ),
							'icon'  => 'eicon-h-align-center',
						],
						'right'  => [
							'title' => __( 'End', 'header-footer-elementor' ),
							'icon'  => 'eicon-h-align-right',
						],
					],
					'prefix_class' => 'elementor%s-align-',
				]
			);

		$this->end_controls_section();
	}

	/**
	 * Register Post Info icon Style Controls.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function register_list_icon_style_controls() {
		$this->start_controls_section(
			'section_icon',
			[
				'label' => __( 'Icon', 'header-footer-elementor' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			]
		);

			$this->add_control(
				'icon_color',
				[
					'label'     => __( 'Color', 'header-footer-elementor' ),
					'type'      => Controls_Manager::COLOR,
					'default'   => '',
					'selectors' => [
						'{{WRAPPER}} .elementor-icon-list-icon i' => 'color: {{VALUE}};',
						'{{WRAPPER}} .elementor-icon-list-icon svg' => 'fill: {{VALUE}};',
					],
					'scheme'    => [
						'type'  => Scheme_Color::get_type(),
						'value' => Scheme_Color::COLOR_1,
					],
				]
			);

			$this->add_responsive_control(
				'icon_size',
				[
					'label'     => __( 'Size', 'header-footer-elementor' ),
					'type'      => Controls_Manager::SLIDER,
					'default'   => [
						'size' => 14,
					],
					'range'     => [
						'px' => [
							'min' => 6,
						],
					],
					'selectors' => [
						'{{WRAPPER}} .elementor-icon-list-icon' => 'width: {{SIZE}}{{UNIT}};',
						'{{WRAPPER}} .elementor-icon-list-icon i' => 'font-size: {{SIZE}}{{UNIT}};',
						'{{WRAPPER}} .elementor-icon-list-icon svg' => 'width: {{SIZE}}{{UNIT}};',
					],
				]
			);

			$this->add_control(
				'icon_spacing',
				[
					'label'     => __( 'Spacing', 'header-footer-elementor' ),
					'type'      => Controls_Manager::SLIDER,
					'range'     => [
						'px' => [
							'max' => 50,
						],
					],
					'selectors' => [
						'body:not(.rtl) {{WRAPPER}} .elementor-icon-list-text' => 'padding-left: {{SIZE}}{{UNIT}}',
						'body.rtl {{WRAPPER}} .elementor-icon-list-text' => 'padding-right: {{SIZE}}{{UNIT}}',
					],
				]
			);

		$this->end_controls_section();
	}

	/**
	 * Register Post Info text Style Controls.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function register_list_text_style_controls() {

		$this->start_controls_section(
			'section_style_text',
			[
				'label' => __( 'Text', 'header-footer-elementor' ),
				'tab'   => Controls_Manager::TAB_STYLE,
			]
		);

			$this->add_control(
				'text_color',
				[
					'label'     => __( 'Text Color', 'header-footer-elementor' ),
					'type'      => Controls_Manager::COLOR,
					'default'   => '',
					'selectors' => [
						'{{WRAPPER}} .elementor-icon-list-text, {{WRAPPER}} .elementor-icon-list-text a' => 'color: {{VALUE}}',
					],
					'scheme'    => [
						'type'  => Scheme_Color::get_type(),
						'value' => Scheme_Color::COLOR_2,
					],
				]
			);

			$this->add_group_control(
				Group_Control_Typography::get_type(),
				[
					'name'     => 'text_typography',
					'selector' => '{{WRAPPER}} .elementor-icon-list-item',
					'scheme'   => Scheme_Typography::TYPOGRAPHY_3,
				]
			);

		$this->end_controls_section();
	}

	/**
	 * Render taxonomies list.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function get_taxonomy_list() {
		$taxonomies = get_taxonomies(
			[
				'show_in_nav_menus' => true,
			],
			'objects'
		);

		$taxonomy_list = [
			'' => __( 'Select', 'header-footer-elementor' ),
		];

		foreach ( $taxonomies as $taxonomy ) {
			$taxonomy_list[ $taxonomy->name ] = $taxonomy->label;
		}

		return $taxonomy_list;
	}

	/**
	 * Render Post Info output on the frontend.
	 *
	 * Written in PHP and used to generate the final HTML.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function render() {

		$settings = $this->get_settings_for_display();

		ob_start();

		if ( ! empty( $settings['meta_list'] ) ) {
			foreach ( $settings['meta_list'] as $repeater_item ) {
				$this->render_meta_item( $repeater_item );
			}
		}

		$meta_html = ob_get_clean();

		if ( empty( $meta_html ) ) {
			return;
		}

		$layout = '';

		if ( 'inline' === $settings['layout'] ) {
			$layout = 'elementor-inline-items';
		}

		?>

		<ul class="elementor-icon-list-items elementor-post-info <?php echo $layout; ?>">
			<?php echo $meta_html; ?>
		</ul>

		<?php
	}

	/**
	 * Render meta items output.
	 *
	 * @since x.x.x
	 * @access protected
	 * @param array $current_item current meta item..
	 */
	protected function render_meta_item( $current_item ) {

		$item_data      = $this->get_meta_data( $current_item );
		$current_index = $current_item['_id'];

		if ( empty( $item_data['text'] ) && empty( $item_data['meta_list'] ) ) {
			return;
		}

		$enable_link = false;
		$link_key = 'link_' . $current_index;
		$item_key = 'item_' . $current_index;

		$this->add_render_attribute(
			$item_key,
			'class',
			[
				'elementor-icon-list-item',
				'elementor-repeater-item-' . $current_item['_id'],
			]
		);

		$active_settings = $this->get_active_settings();

		if ( 'inline' === $active_settings['layout'] ) {
			$this->add_render_attribute( $item_key, 'class', 'elementor-inline-item' );
		}

		if ( ! empty( $item_data['url']['url'] ) ) {
			$enable_link = true;

			$url = $item_data['url'];
			$this->add_render_attribute( $link_key, 'href', $url['url'] );

			if ( ! empty( $url['is_external'] ) ) {
				$this->add_render_attribute( $link_key, 'target', '_blank' );
			}

			if ( ! empty( $url['nofollow'] ) ) {
				$this->add_render_attribute( $link_key, 'rel', 'nofollow' );
			}
		}

		?>
		<li <?php echo $this->get_render_attribute_string( $item_key ); ?>>
			<?php if ( $enable_link ) : ?>
				<a <?php echo $this->get_render_attribute_string( $link_key ); ?>>
			<?php endif; ?>
				<?php $this->render_item_icon( $item_data, $current_item, $current_index ); ?>
				<?php $this->render_item_text( $item_data, $current_index ); ?>
			<?php if ( $enable_link ) : ?>
				</a>
			<?php endif; ?>
		</li>
		<?php
	}

	/**
	 * Render meta data list.
	 *
	 * @since x.x.x
	 * @access protected
	 * @param array $current_item current meta item.
	 * @return array meta data.
	 */
	protected function get_meta_data( $current_item ) {

		$item_data      = [];

		switch ( $current_item['meta_type'] ) {

			case 'terms':
				$item_data['icon'] = [
					'value'   => 'fas fa-tags',
					'library' => 'fa-solid',
				];

				$taxonomy = $current_item['taxonomy'];

				$terms = wp_get_post_terms( get_the_ID(), $taxonomy );

				$max_terms = $current_item['max_terms'];

				if ( '' !== $max_terms ) {
					$terms = array_slice( $terms, 0, $max_terms );
				}

				foreach ( $terms as $term ) {

					$item_data['meta_list'][ $term->term_id ]['text'] = $term->name;

					if ( 'yes' === $current_item['link'] ) {
						$item_data['meta_list'][ $term->term_id ]['url'] = get_term_link( $term );
					}
				}

				break;

			case 'author':

				$item_data['icon'] = [
					'value'   => 'fas fa-user',
					'library' => 'fa-solid',
				];

				$item_data['text'] = get_the_author_meta( 'display_name' );

				if ( 'yes' === $current_item['link'] ) {
					$item_data['url'] = [
						'url' => get_author_posts_url( get_the_author_meta( 'ID' ) ),
					];
				}

				if ( 'yes' === $current_item['show_avatar'] ) {
					$item_data['image'] = get_avatar_url( get_the_author_meta( 'ID' ), 98 );
				}

				break;

			case 'comments':
				if ( comments_open() ) {

					$item_data['icon'] = [
						'value'   => 'fas fa-comments',
						'library' => 'fa-solid',
					];

					$no_comments_string = __( 'No Comments', 'header-footer-elementor' );
					$one_comment_string = __( 'One Comment', 'header-footer-elementor' );
					/* translators: %s admin link */
					$comments_string    = __( '%s Comments', 'header-footer-elementor' );

					if ( 'yes' === $current_item['comments_custom_strings'] ) {

						if ( ! empty( $current_item['no_comments_string'] ) ) {
							$no_comments_string = $current_item['no_comments_string'];
						}

						if ( ! empty( $current_item['one_comment_string'] ) ) {
							$one_comment_string = $current_item['one_comment_string'];
						}

						if ( ! empty( $current_item['comments_string'] ) ) {
							$comments_string = $current_item['comments_string'];
						}
					}

					$total_comments = (int) get_comments_number();

					if ( 0 === $total_comments ) {
						$item_data['text'] = $no_comments_string;
					} else if ( 1 === $total_comments ) {
						$item_data['text'] = $one_comment_string;
					} else {
						$item_data['text'] = sprintf( __( $comments_string, 'header-footer-elementor' ), $total_comments );
					}

					if ( 'yes' === $current_item['link'] ) {
						$item_data['url'] = [
							'url' => get_comments_link(),
						];
					}

				}

				break;

			case 'date':

				$item_data['icon'] = [
					'value'   => 'fas fa-calendar',
					'library' => 'fa-solid',
				];

				$custom_date_format = empty( $current_item['custom_date_format'] ) ? 'F j, Y' : $current_item['custom_date_format'];

				$format_options = [
					'default' => 'F j, Y',
					'0'       => 'F j, Y',
					'1'       => 'Y-m-d',
					'2'       => 'd/m/Y',
					'3'       => 'm/d/Y',
					'custom'  => $custom_date_format,
				];

				$item_data['text'] = get_the_time( $format_options[ $current_item['date_format'] ] );

				if ( 'yes' === $current_item['link'] ) {
					$item_data['url'] = [
						'url' => get_day_link( get_post_time( 'Y' ), get_post_time( 'm' ), get_post_time( 'j' ) ),
					];
				}

				break;

			case 'time':

				$item_data['icon'] = [
					'value'   => 'fas fa-clock',
					'library' => 'fa-solid',
				];

				$custom_time_format = empty( $current_item['custom_time_format'] ) ? 'g:i a' : $current_item['custom_time_format'];

				$format_options    = [
					'default' => 'g:i a',
					'0'       => 'g:i a',
					'1'       => 'g:i A',
					'2'       => 'H:i',
					'custom'  => $custom_time_format,
				];

				$item_data['text'] = get_the_time( $format_options[ $current_item['time_format'] ] );

				break;

			case 'custom':

				$item_data['icon'] = [
					'value'   => 'fas fa-tags',
					'library' => 'fa-solid',
				];

				$item_data['text'] = $current_item['custom_text'];

				if ( 'yes' === $current_item['link'] && ! empty( $current_item['custom_url'] ) ) {
					$item_data['url'] = $current_item['custom_url'];
				}

				break;
		}

		$item_data['meta_type'] = $current_item['meta_type'];

		if ( ! empty( $current_item['text_prefix'] ) ) {
			$item_data['text_prefix'] = esc_html( $current_item['text_prefix'] );
		}

		return $item_data;
	}

	/**
	 * Render meta items icon.
	 *
	 * @since x.x.x
	 * @access protected
	 * @param array  $item_data current meta item data.
	 * @param array  $repeater_item current meta item.
	 * @param string $current_index current meta item index.
	 * @return array meta data.
	 */
	protected function render_item_icon( $item_data, $repeater_item, $current_index ) {

		if ( 'custom' === $repeater_item['show_icon'] && ! empty( $repeater_item['icon'] ) ) {
			$item_data['icon'] = $repeater_item['icon'];
		} elseif ( 'none' === $repeater_item['show_icon'] ) {
			$item_data['icon'] = [];
		}

		if ( empty( $item_data['icon'] ) && empty( $item_data['image'] ) ) {
			return;
		}

		$show_icon = ( 'none' !== $repeater_item['show_icon'] );

		if ( ! empty( $item_data['image'] ) || $show_icon ) {
			?>
			<span class="elementor-icon-list-icon">
				<?php
				if ( ! empty( $item_data['image'] ) ) :
					$image_data = 'image_' . $current_index;
					$this->add_render_attribute( $image_data, 'src', $item_data['image'] );
					$this->add_render_attribute( $image_data, 'alt', $item_data['text'] );
					?>
					<img class="elementor-avatar" <?php echo $this->get_render_attribute_string( $image_data ); ?>>
					<?php
				elseif ( $show_icon ) :
					Icons_Manager::render_icon( $item_data['icon'], [ 'aria-hidden' => 'true' ] );
				endif;
				?>
			</span>
			<?php
		}
	}

	/**
	 * Render meta data items text.
	 *
	 * @since x.x.x
	 * @access protected
	 * @param array  $item_data current meta item data.
	 * @param string $current_index current meta item index.
	 */
	protected function render_item_text( $item_data, $current_index ) {

		$repeater_setting_key = $this->get_repeater_setting_key( 'text', 'meta_list', $current_index );

		$this->add_render_attribute( $repeater_setting_key, 'class', [ 'elementor-icon-list-text', 'elementor-post-info__item', 'elementor-post-info__item--type-' . $item_data['meta_type'] ] );

		if ( ! empty( $item['meta_list'] ) ) {
			$this->add_render_attribute( $repeater_setting_key, 'class', 'elementor-terms-list' );
		}

		?>
		<span <?php echo $this->get_render_attribute_string( $repeater_setting_key ); ?>>
			<?php if ( ! empty( $item_data['text_prefix'] ) ) : ?>
				<span class="elementor-post-info__item-prefix"><?php echo esc_html( $item_data['text_prefix'] ); ?></span>
			<?php endif; ?>
			<?php
			if ( ! empty( $item_data['meta_list'] ) ) :
				$meta_list = [];
				$item_class = 'elementor-post-info__terms-list-item';
				?>
				<span class="elementor-post-info__terms-list">
					<?php
					foreach ( $item_data['meta_list'] as $term ) :
						if ( ! empty( $term['url'] ) ) :
							$meta_list[] = '<a href="' . esc_attr( $term['url'] ) . '" class="' . $item_class . '">' . esc_html( $term['text'] ) . '</a>';
						else :
							$meta_list[] = '<span class="' . $item_class . '">' . esc_html( $term['text'] ) . '</span>';
						endif;
					endforeach;

					echo implode( ', ', $meta_list );
					?>
				</span>
			<?php else : ?>
				<?php
				echo wp_kses(
					$item_data['text'],
					[
						'a' => [
							'href'  => [],
							'title' => [],
							'rel'   => [],
						],
					]
				);
				?>
			<?php endif; ?>
		</span>
		<?php

	}

	/**
	 * Render Post Info widget output in the editor.
	 *
	 * Written as a Backbone JavaScript template and used to generate the live preview.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function _content_template() {
	}

}
