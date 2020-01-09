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
		$this->register_style_controls();
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
				'view',
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
				'type',
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
						'type' => 'date',
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
						'type'        => 'date',
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
						'type' => 'time',
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
						'type'        => 'time',
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
					'options'     => $this->get_taxonomies(),
					'condition'   => [
						'type' => 'terms',
					],
				]
			);

			$repeater->add_control(
				'text_prefix',
				[
					'label'       => __( 'Before', 'header-footer-elementor' ),
					'type'        => Controls_Manager::TEXT,
					'label_block' => false,
					'condition'   => [
						'type!' => 'custom',
					],
				]
			);

			$repeater->add_control(
				'show_avatar',
				[
					'label'     => __( 'Avatar', 'header-footer-elementor' ),
					'type'      => Controls_Manager::SWITCHER,
					'condition' => [
						'type' => 'author',
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
						'type' => 'comments',
					],
				]
			);

			$repeater->add_control(
				'string_no_comments',
				[
					'label'       => __( 'No Comments', 'header-footer-elementor' ),
					'type'        => Controls_Manager::TEXT,
					'label_block' => false,
					'placeholder' => __( 'No Comments', 'header-footer-elementor' ),
					'condition'   => [
						'comments_custom_strings' => 'yes',
						'type'                    => 'comments',
					],
				]
			);

			$repeater->add_control(
				'string_one_comment',
				[
					'label'       => __( 'One Comment', 'header-footer-elementor' ),
					'type'        => Controls_Manager::TEXT,
					'label_block' => false,
					'placeholder' => __( 'One Comment', 'header-footer-elementor' ),
					'condition'   => [
						'comments_custom_strings' => 'yes',
						'type'                    => 'comments',
					],
				]
			);

			$repeater->add_control(
				'string_comments',
				[
					'label'       => __( 'Comments', 'header-footer-elementor' ),
					'type'        => Controls_Manager::TEXT,
					'label_block' => false,
					'placeholder' => __( '%s Comments', 'header-footer-elementor' ),
					'condition'   => [
						'comments_custom_strings' => 'yes',
						'type'                    => 'comments',
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
						'type' => 'custom',
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
						'type!' => 'time',
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
						'type' => 'custom',
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
				'terms_list',
				[
					'label'       => '',
					'type'        => Controls_Manager::REPEATER,
					'fields'      => $repeater->get_controls(),
					'default'     => [
						[
							'type' => 'author',
							'icon' => [
								'value'   => 'far fa-user-circle',
								'library' => 'fa-regular',
							],
						],
						[
							'type' => 'date',
							'icon' => [
								'value'   => 'fas fa-calendar',
								'library' => 'fa-solid',
							],
						],
						[
							'type' => 'time',
							'icon' => [
								'value'   => 'far fa-clock',
								'library' => 'fa-regular',
							],
						],
						[
							'type' => 'comments',
							'icon' => [
								'value'   => 'far fa-comment-dots',
								'library' => 'fa-regular',
							],
						],
					],
					'title_field' => '{{{ elementor.helpers.renderIcon( this, icon, {}, "i", "panel" ) || \'<i class="{{ icon }}" aria-hidden="true"></i>\' }}} <span style="text-transform: capitalize;">{{{ type }}}</span>',
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
	protected function register_style_controls() {
		$this->start_controls_section(
			'section_style',
			[
				'label' => __( 'Meta Info', 'header-footer-elementor' ),
				'tab'   => Controls_Manager::TAB_STYLE,
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
	protected function get_taxonomies() {
		$taxonomies = get_taxonomies(
			[
				'show_in_nav_menus' => true,
			],
			'objects'
		);

		$options = [
			'' => __( 'Choose', 'header-footer-elementor' ),
		];

		foreach ( $taxonomies as $taxonomy ) {
			$options[ $taxonomy->name ] = $taxonomy->label;
		}

		return $options;
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

		if ( ! empty( $settings['terms_list'] ) ) {
			foreach ( $settings['terms_list'] as $repeater_item ) {
				$this->render_item( $repeater_item );
			}
		}
		$items_html = ob_get_clean();

		if ( empty( $items_html ) ) {
			return;
		}

		$this->add_render_attribute( 'terms_list', 'class', [ 'elementor-icon-list-items', 'elementor-post-info' ] );

		if ( 'inline' === $settings['view'] ) {
			$this->add_render_attribute( 'terms_list', 'class', 'elementor-inline-items' );
		}

		?>

		<ul <?php echo $this->get_render_attribute_string( 'terms_list' ); ?>>
			<?php echo $items_html; ?>
		</ul>

		<?php
	}

	/**
	 * Render meta items output.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function render_item( $repeater_item ) {

		$item_data      = $this->get_meta_data( $repeater_item );
		$repeater_index = $repeater_item['_id'];

		if ( empty( $item_data['text'] ) && empty( $item_data['terms_list'] ) ) {
			return;
		}

		$has_link = false;
		$link_key = 'link_' . $repeater_index;
		$item_key = 'item_' . $repeater_index;

		$this->add_render_attribute(
			$item_key,
			'class',
			[
				'elementor-icon-list-item',
				'elementor-repeater-item-' . $repeater_item['_id'],
			]
		);

		$active_settings = $this->get_active_settings();

		if ( 'inline' === $active_settings['view'] ) {
			$this->add_render_attribute( $item_key, 'class', 'elementor-inline-item' );
		}

		if ( ! empty( $item_data['url']['url'] ) ) {
			$has_link = true;

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
			<?php if ( $has_link ) : ?>
				<a <?php echo $this->get_render_attribute_string( $link_key ); ?>>
			<?php endif; ?>
				<?php $this->render_item_icon( $item_data, $repeater_item, $repeater_index ); ?>
				<?php $this->render_item_text( $item_data, $repeater_index ); ?>
			<?php if ( $has_link ) : ?>
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
	 */
	protected function get_meta_data( $repeater_item ) {

		$item_data      = [];
		$repeater_index = $repeater_item['_id'];

		switch ( $repeater_item['type'] ) {

			case 'terms':
				$item_data['icon'] = [
					'value'   => 'fas fa-tags',
					'library' => 'fa-solid',
				];

				$taxonomy = $repeater_item['taxonomy'];

				$terms = wp_get_post_terms( get_the_ID(), $taxonomy );

				foreach ( $terms as $term ) {

					$item_data['terms_list'][ $term->term_id ]['text'] = $term->name;

					if ( 'yes' === $repeater_item['link'] ) {
						$item_data['terms_list'][ $term->term_id ]['url'] = get_term_link( $term );
					}
				}

				break;

			case 'author':

				$item_data['text'] = get_the_author_meta( 'display_name' );

				$item_data['icon'] = [
					'value' => 'fas fa-user',
					'library' => 'fa-solid',
				];

				if ( 'yes' === $repeater_item['link'] ) {
					$item_data['url'] = [
						'url' => get_author_posts_url( get_the_author_meta( 'ID' ) ),
					];
				}

				if ( 'yes' === $repeater_item['show_avatar'] ) {
					$item_data['image'] = get_avatar_url( get_the_author_meta( 'ID' ), 98 );
				}

				break;

			case 'date':
				break;

			case 'time':
				break;

			case 'comments':
				break;

			case 'custom':
				break;
		}

		$item_data['type'] = $repeater_item['type'];

		if ( ! empty( $repeater_item['text_prefix'] ) ) {
			$item_data['text_prefix'] = esc_html( $repeater_item['text_prefix'] );
		}

		return $item_data;
	}

	/**
	 * Render meta items icon.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function render_item_icon( $item_data, $repeater_item, $repeater_index ) {

		if ( 'custom' === $repeater_item['show_icon'] && ! empty( $repeater_item['icon'] ) ) {
			$item_data['icon'] = $repeater_item['icon'];
		} elseif ( 'none' === $repeater_item['show_icon'] ) {
			$item_data['icon'] = [];
		}

		if ( empty( $item_data['icon'] ) && empty( $item_data['image'] ) ) {
			return;
		}

		$show_icon = 'none' !== $repeater_item['show_icon'];

		if ( ! empty( $item_data['image'] ) || $show_icon ) {
			?>
			<span class="elementor-icon-list-icon">
				<?php
				if ( ! empty( $item_data['image'] ) ) :
					$image_data = 'image_' . $repeater_index;
					$this->add_render_attribute( $image_data, 'src', $item_data['image'] );
					$this->add_render_attribute( $image_data, 'alt', $item_data['text'] );
					?>
					<img class="elementor-avatar" <?php echo $this->get_render_attribute_string( $image_data ); ?>>
				<?php elseif ( $show_icon ) :
					Icons_Manager::render_icon( $item_data['icon'], [ 'aria-hidden' => 'true' ] );
				endif; ?>
			</span>
			<?php
		}
	}

	/**
	 * Render meta data items text.
	 *
	 * @since x.x.x
	 * @access protected
	 */
	protected function render_item_text( $item_data, $repeater_index ) {

		$repeater_setting_key = $this->get_repeater_setting_key( 'text', 'terms_list', $repeater_index );

		$this->add_render_attribute( $repeater_setting_key, 'class', [ 'elementor-icon-list-text', 'elementor-post-info__item', 'elementor-post-info__item--type-' . $item_data['type'] ] );

		if ( ! empty( $item['terms_list'] ) ) {
			$this->add_render_attribute( $repeater_setting_key, 'class', 'elementor-terms-list' );
		}

		?>
		<span <?php echo $this->get_render_attribute_string( $repeater_setting_key ); ?>>
			<?php if ( ! empty( $item_data['text_prefix'] ) ) : ?>
				<span class="elementor-post-info__item-prefix"><?php echo esc_html( $item_data['text_prefix'] ); ?></span>
			<?php endif; ?>
			<?php
			if ( ! empty( $item_data['terms_list'] ) ) :
				$terms_list = [];
				$item_class = 'elementor-post-info__terms-list-item';
				?>
				<span class="elementor-post-info__terms-list">
					<?php
					foreach ( $item_data['terms_list'] as $term ) :
						if ( ! empty( $term['url'] ) ) :
							$terms_list[] = '<a href="' . esc_attr( $term['url'] ) . '" class="' . $item_class . '">' . esc_html( $term['text'] ) . '</a>';
						else :
							$terms_list[] = '<span class="' . $item_class . '">' . esc_html( $term['text'] ) . '</span>';
						endif;
					endforeach;

					echo implode( ', ', $terms_list );
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
