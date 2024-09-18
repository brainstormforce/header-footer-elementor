<?php
/**
 * Elementor Classes.
 *
 * @package header-footer-elementor
 */

namespace HFE\WidgetsManager\Widgets;

use Elementor\Controls_Manager;
use Elementor\Widget_Base;
use Elementor\Utils;
use Elementor\Icons_Manager;
use Elementor\Group_Control_Border;
use Elementor\Group_Control_Typography;
use Elementor\Modules\DynamicTags\Module as TagsModule;

use HFE\WidgetsManager\Widgets_Loader;

if ( ! defined( 'ABSPATH' ) ) {
	exit;   // Exit if accessed directly.
}

/**
 * HFE Page Title widget
 *
 * HFE widget for Page Title.
 *
 * @since x.x.x
 */
class Breadcrumbs_Widget extends Widget_Base {


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
		return 'breadcrumbs-widget';
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
		return __( 'Breadcrumbs', 'header-footer-elementor' );
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
		return 'hfe-icon-page-title';
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
	 * Register Breadcrumbs controls.
	 *
	 * @since x.x.x
	 * @access protected
	 * @return void
	 */
	protected function register_controls() {
		$this->register_general_breadcrumbs_controls();
		$this->register_separator_breadcrumbs_controls();
		$this->register_breadcrumbs_text_controls();
	}

	/**
	 * Register general Controls.
	 *
	 * @since x.x.x
	 * @access protected
	 * @return void
	 */
	protected function register_general_breadcrumbs_controls() {
		$this->start_controls_section(
			'section_general',
			[
				'label' => __( 'General', 'header-footer-elementor' ),
			]
		);

		$this->add_control(
			'show_home',
			array(
				'label'        => __( 'Show Home', 'header-footer-elementor' ),
				'type'         => Controls_Manager::SWITCHER,
				'label_on'     => __( 'On', 'header-footer-elementor' ),
				'label_off'    => __( 'Off', 'header-footer-elementor' ),
				'default'      => 'yes',
				'return_value' => 'yes',
			)
		);

		$this->add_control(
			'home_icon',
			array(
				'label'            => __( 'Home Icon', 'header-footer-elementor' ),
				'type'             => Controls_Manager::ICONS,
				'label_block'      => false,
				'skin'             => 'inline',
				'default'          => array(
					'value'   => 'fas fa-home',
					'library' => 'fa-solid',
				),
				'condition'        => array(
					'show_home'        => 'yes',
				),
			)
		);

		$this->add_responsive_control(
			'align',
			array(
				'label'                => __( 'Alignment', 'header-footer-elementor' ),
				'type'                 => Controls_Manager::CHOOSE,
				'default'              => '',
				'options'              => array(
					'left'   => array(
						'title' => __( 'Left', 'header-footer-elementor' ),
						'icon'  => 'eicon-h-align-left',
					),
					'center' => array(
						'title' => __( 'Center', 'header-footer-elementor' ),
						'icon'  => 'eicon-h-align-center',
					),
					'right'  => array(
						'title' => __( 'Right', 'header-footer-elementor' ),
						'icon'  => 'eicon-h-align-right',
					),
				),
				'separator'            => 'before',
				'selectors'            => array(
					'{{WRAPPER}}' => 'text-align: {{VALUE}};',
				),
			)
		);

		$this->end_controls_section();
	}

	/**
	 * Register Separator Controls.
	 *
	 * @since x.x.x
	 * @access protected
	 * @return void
	 */
	protected function register_separator_breadcrumbs_controls() {
		$this->start_controls_section(
			'section_separator',
			[
				'label' => __( 'Separator', 'header-footer-elementor' ),
			]
		);

		$this->add_control(
			'separator_type',
			array(
				'label'     => __( 'Separator Type', 'powerpack' ),
				'type'      => Controls_Manager::SELECT,
				'default'   => 'text',
				'options'   => array(
					'text' => __( 'Text', 'powerpack' ),
					'icon' => __( 'Icon', 'powerpack' ),
				),
			)
		);

		$this->add_control(
			'separator_text',
			array(
				'label'     => __( 'Separator', 'powerpack' ),
				'type'      => Controls_Manager::TEXT,
				'default'   => __( '»', 'powerpack' ),
				'condition' => array(
					'separator_type'   => 'text',
				),
			)
		);

		$this->add_control(
			'separator_icon',
			array(
				'label'            => __( 'Separator', 'powerpack' ),
				'type'             => Controls_Manager::ICONS,
				'label_block'      => false,
				'skin'             => 'inline',
				'default'          => array(
					'value'   => 'fas fa-angle-right',
					'library' => 'fa-solid',
				),
				'recommended'      => array(
					'fa-solid'   => array(
						'greater-than',
						'minus',
						'angle-right',
						'angle-double-right',
						'caret-right',
						'chevron-right',
						'genderless',
						'grip-lines',
						'grip-lines-vertical',
					),
				),
				'condition'        => array(
					'separator_type'   => 'icon',
				),
			)
		);

		$this->end_controls_section();
	}

	/**
	 * Register Separator Controls.
	 *
	 * @since x.x.x
	 * @access protected
	 * @return void
	 */
	protected function register_breadcrumbs_text_controls() {
		$this->start_controls_section(
			'section_text',
			[
				'label' => __( 'Display Text', 'header-footer-elementor' ),
			]
		);

			$this->add_control(
				'home_text',
				[
					'label'                 => __( 'Home Page', 'header-footer-elementor' ),
					'type'                  => Controls_Manager::TEXT,
					'default'               => __( 'Home', 'header-footer-elementor' ),
					'dynamic'               => [
						'active'        => true,
						'categories'    => [ TagsModule::POST_META_CATEGORY ]
					],
				]
			);

			$this->add_control(
				'search_text',
				[
					'label'                 => __( 'Search', 'header-footer-elementor' ),
					'type'                  => Controls_Manager::TEXT,
					'default'               => __( 'Search results for:', 'header-footer-elementor' ),
					'dynamic'               => [
						'active'        => true,
						'categories'    => [ TagsModule::POST_META_CATEGORY ]
					],
				]
			);

			$this->add_control(
				'error_text',
				[
					'label'                 => __( '404 Page', 'header-footer-elementor' ),
					'type'                  => Controls_Manager::TEXT,
					'default'               => __( 'Error 404: Page not found', 'header-footer-elementor' ),
					'dynamic'               => [
						'active'        => true,
						'categories'    => [ TagsModule::POST_META_CATEGORY ]
					],
				]
			);

		
		$this->end_controls_section();

	}

	/**
	 * Render page title widget output on the frontend.
	 *
	 * Written in PHP and used to generate the final HTML.
	 *
	 * @since x.x.x
	 * @access protected
	 * @return void
	 */
	protected function render() {
		$settings = $this->get_settings_for_display();
	
		// Capture the icon output for the delimiter if 'icon' is selected
		$delimiter = $settings['separator_type'] === 'text' ? $settings['separator_text'] : '';
	
		if ($settings['separator_type'] === 'icon') {
			ob_start();
			Icons_Manager::render_icon($settings['separator_icon'], array('aria-hidden' => 'true'));
			$delimiter = ob_get_clean(); // Store the icon output as delimiter
		}
	
		// Define breadcrumb defaults.
		$defaults = array(
			'home'       => isset( $settings['home_text'] ) ? $settings['home_text'] : __('Home', 'header-footer-elementor'),
			'delimiter'  => $delimiter,
			'echo'       => true,
			'404_title'  => isset( $settings['error_text'] ) ? $settings['error_text'] : __('Error 404: Page not found', 'header-footer-elementor'),
			'search_title' => isset( $settings['search_text'] ) ? $settings['search_text'] : __('Search results for: ', 'header-footer-elementor'),
		);
	
		// Start the breadcrumbs array
		$breadcrumbs = array();

		if( 'yes' === $settings['show_home'] ) {
			// Add the Home link to the breadcrumbs
			$breadcrumbs[] = array(
				'title' => $defaults['home'],
				'url'   => home_url(),
				'class' => 'hfe-breadcrumbs-first'
			);
		}
	
		// Add the current page details to breadcrumbs based on conditions
		if (!is_front_page()) {
			if ( is_home() && 'yes' === $settings['show_home'] ) {
				$breadcrumbs[] = array(
					'title' => get_the_title(get_option('page_for_posts')),
					'url'   => '',
					'class' => ''
				);
	
			} elseif (is_single()) {

				$category = get_the_category();
				if ($category) {
					$parent_cats = get_ancestors($category[0]->term_id, 'category'); // Get the ancestors of the category
					$parent_cats = array_reverse($parent_cats); // Reverse the array to get the correct hierarchy

					// Loop through each ancestor and add to breadcrumbs
					foreach ($parent_cats as $cat_id) {
						$cat = get_category($cat_id);
						$breadcrumbs[] = array(
							'title' => $cat->name,
							'url'   => get_category_link($cat_id),
							'class' => ''
						);
					}

					// Add the current category
					$breadcrumbs[] = array(
						'title' => $category[0]->name,
						'url'   => get_category_link($category[0]->term_id),
						'class' => ''
					);
				}

				// Finally, add the current page title (without a URL)
				$breadcrumbs[] = array(
					'title' => get_the_title(), // Get the current page title
					'url'   => '',              // No URL for the current page
					'class' => 'ha-breadcrumbs-end' // Optional class for styling the last breadcrumb
				);
	
			} elseif (is_page() && !is_front_page()) {
				$parents = get_post_ancestors(get_the_ID());
				foreach (array_reverse($parents) as $parent) {
					$breadcrumbs[] = array(
						'title' => get_the_title($parent),
						'url'   => get_permalink($parent),
						'class' => ''
					);
				}
				$breadcrumbs[] = array(
					'title' => get_the_title(),
					'url'   => '',
					'class' => 'hfe-breadcrumbs-last'
				);
	
			} elseif (is_category()) {
				$breadcrumbs[] = array(
					'title' => single_cat_title('', false),
					'url'   => '',
					'class' => 'hfe-breadcrumbs-last'
				);
	
			} elseif (is_tag()) {
				$breadcrumbs[] = array(
					'title' => single_tag_title('', false),
					'url'   => '',
					'class' => 'hfe-breadcrumbs-last'
				);
	
			} elseif (is_author()) {
				$breadcrumbs[] = array(
					'title' => get_the_author(),
					'url'   => '',
					'class' => 'hfe-breadcrumbs-last'
				);
	
			} elseif (is_search()) {
				$breadcrumbs[] = array(
					'title' => $defaults['search_title'] . get_search_query(),
					'url'   => '',
					'class' => 'hfe-breadcrumbs-last'
				);
	
			} elseif (is_404()) {
				$breadcrumbs[] = array(
					'title' => $defaults['404_title'],
					'url'   => '',
					'class' => 'hfe-breadcrumbs-last'
				);
	
			} elseif (is_archive()) {
				$breadcrumbs[] = array(
					'title' => post_type_archive_title('', false),
					'url'   => '',
					'class' => 'hfe-breadcrumbs-last'
				);
			}
		}

		$home_class = ( 'yes' === $settings['show_home'] ) ? 'hfe-breadcrumbs-show-home' : '';
	
		// Build the breadcrumb output
		$output = '<ul class="hfe-breadcrumbs ' . esc_attr( $home_class ) . '">';

		foreach ($breadcrumbs as $index => $breadcrumb) {
			// Open the breadcrumb item
			$output .= '<li class="ha-breadcrumbs-item ' . esc_attr($breadcrumb['class']) . '">';

			if( 'yes' === $settings['show_home'] && 0 === $index ) {
				$home_icon = $this->home_icon_html( 'hfe-breadcrumbs-home-icon', $settings['home_icon'] );
				$output .= $home_icon;
			}

			if ($breadcrumb['url']) {
				$output .= '<a href="' . esc_url($breadcrumb['url']) . '"><span class="hfe-breadcrumbs-text">' . wp_kses_post($breadcrumb['title']) . '</span></a>';
			} else {
				$output .= '<span class="hfe-breadcrumbs-text">' . wp_kses_post($breadcrumb['title']) . '</span>';
			}
			$output .= '</li>';

			// Add the separator except for the last item
			if ($index < count($breadcrumbs) - 1) {
				$output .= '<li class="hfe-breadcrumbs-separator">';
				if ($settings['separator_type'] === 'icon') {
					// Render the icon
					$output .= '<span class="hfe-breadcrumbs-separator-icon">';
					$output .= $delimiter;
					$output .= '</span>';
				} else {
					// Use text as separator
					$output .= '<span class="hfe-breadcrumbs-separator-text">' . wp_kses_post($defaults['delimiter']) . '</span>';
				}
				$output .= '</li>';
			}
		}
		$output .= '</ul>';

		echo $output;

	}

	/**
	 * Sets the home icon.
	 *
	 * @access public
	 * @param string $home_icon
	 * @param string $home_icon_class
	 * @return string
	 */
	public function home_icon_html( $home_class = '', $home_icon = array() ) {
		$home_icon_html = '<span class="' . esc_attr($home_class) . '">';
		ob_start();
		Icons_Manager::render_icon($home_icon, array('aria-hidden' => 'true'));
		$home_icon_html .= ob_get_clean(); // Store the icon output as delimiter
		$home_icon_html .= '</span>';
		return $home_icon_html;
	}

}
