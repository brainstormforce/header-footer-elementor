<?php
/**
 * Elementor Classes.
 *
 * @package header-footer-elementor
 */

namespace HFE\WidgetsManager\Widgets;

use Elementor\Controls_Manager;
use Elementor\Widget_Base;

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
		$this->register_content_breadcrumbs_controls();
		$this->register_breadcrumbs_style_controls();
	}

	/**
	 * Register Breadcrumbs General Controls.
	 *
	 * @since x.x.x
	 * @access protected
	 * @return void
	 */
	protected function register_content_breadcrumbs_controls() {
		$this->start_controls_section(
			'section_general_fields',
			[
				'label' => __( 'Title', 'header-footer-elementor' ),
			]
		);

		$this->end_controls_section();
	}
	/**
	 * Register Page Title Style Controls.
	 *
	 * @since x.x.x
	 * @access protected
	 * @return void
	 */
	protected function register_breadcrumbs_style_controls() {
		$this->start_controls_section(
			'section_title_typography',
			[
				'label' => __( 'Title', 'header-footer-elementor' ),
				'tab'   => Controls_Manager::TAB_STYLE,
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

		// Define breadcrumb defaults.
        $defaults = array(
            'home'       => __('Home', 'header-footer-elementor'),
            'delimiter'  => '»',
            'echo'       => true,
            'before'     => '<span class="current">',
            'after'      => '</span>',
            '404_title'  => __('Error 404: Page not found', 'header-footer-elementor'),
        );

        // Start the breadcrumbs as an array
        $breadcrumbs = array();

        // Add the Home link to the breadcrumbs
        $breadcrumbs[] = '<a href="' . home_url() . '">' . $defaults['home'] . '</a>';

        // Check if it's not the homepage
        if (!is_front_page()) {

            if (is_home()) {
                // If it's the blog page (for example, in a static front page setup)
                $breadcrumbs[] = $defaults['before'] . get_the_title(get_option('page_for_posts')) . $defaults['after'];

            } elseif (is_single()) {
                // Single post page - fetch categories and post title
                $category = get_the_category();
                if ($category) {
                    $breadcrumbs[] = get_category_parents($category[0], true, ' ' . $defaults['delimiter'] . ' ');
                }
                $breadcrumbs[] = $defaults['before'] . get_the_title() . $defaults['after'];

            } elseif (is_page() && !is_front_page()) {
                // For normal pages
                $parents = get_post_ancestors(get_the_ID());
                foreach (array_reverse($parents) as $parent) {
                    $breadcrumbs[] = '<a href="' . get_permalink($parent) . '">' . get_the_title($parent) . '</a>';
                }
                $breadcrumbs[] = $defaults['before'] . get_the_title() . $defaults['after'];

            } elseif (is_category()) {
                // Category archive page
                $breadcrumbs[] = $defaults['before'] . single_cat_title('', false) . $defaults['after'];

            } elseif (is_tag()) {
                // Tag archive page
                $breadcrumbs[] = $defaults['before'] . single_tag_title('', false) . $defaults['after'];

            } elseif (is_author()) {
                // Author archive page
                $breadcrumbs[] = $defaults['before'] . get_the_author() . $defaults['after'];

            } elseif (is_search()) {
                // Search results page
                $breadcrumbs[] = $defaults['before'] . __('Search results for: ', 'header-footer-elementor') . get_search_query() . $defaults['after'];

            } elseif (is_404()) {
                // 404 error page
                $breadcrumbs[] = $defaults['before'] . $defaults['404_title'] . $defaults['after'];

            } elseif (is_archive()) {
                // Generic archive page
                $breadcrumbs[] = $defaults['before'] . post_type_archive_title('', false) . $defaults['after'];
            }
        }

        // Build the breadcrumb output
        $output = '<div class="hfe-breadcrumbs">' . implode(' ' . $defaults['delimiter'] . ' ', $breadcrumbs) . '</div>';

        // Echo or return the breadcrumbs
        if ($defaults['echo']) {
            echo wp_kses_post($output);
        } else {
            return $output;
        }

	}

	/**
	 * Render page title output in the editor.
	 *
	 * Written as a Backbone JavaScript template and used to generate the live preview.
	 *
	 * @since x.x.x
	 * @access protected
	 * @return void
	 */
	protected function content_template() {
        ?>
        <#
        #>
        <?php
	}
}
