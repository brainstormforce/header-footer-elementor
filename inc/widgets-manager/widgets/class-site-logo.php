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
use Elementor\Scheme_Typography;
use Elementor\Scheme_Color;
use Elementor\Group_Control_Image_Size;
use Elementor\Repeater;
use Elementor\Group_Control_Css_Filter;
use Elementor\Group_Control_Text_Shadow;
use Elementor\Plugin;
use Elementor\Widget_Base;

if (! defined('ABSPATH')) {
    exit;   // Exit if accessed directly.
}

/**
 * HFE Site Logo widget
 *
 * HFE widget for Site Logo Image.
 *
 * @since 1.2.0
 */
class Site_Logo extends Widget_Base
{


    /**
     * Retrieve the widget name.
     *
     * @since 1.2.0
     *
     * @access public
     *
     * @return string Widget name.
     */
    public function get_name()
    {
        return 'site-logo';
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
    public function get_title()
    {
        return __('Site Logo', 'header-footer-elementor');
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
    public function get_icon()
    {
        return 'eicon-site-logo';
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
    public function get_categories()
    {
        return [ 'hfe-widgets' ];
    }

    /**
     * Register Site Logo controls.
     *
     * @since 1.2.0
     * @access protected
     */
    protected function _register_controls()
    {
        $this->register_content_site_logo_controls();
        $this->register_site_logo_styling_controls();
        $this->register_site_logo_caption_styling_controls();
    }

    /**
     * Register Site Logo General Controls.
     *
     * @since 1.2.0
     * @access protected
     */
    protected function register_content_site_logo_controls()
    {
        $this->start_controls_section(
            'section_site_image',
            [
                'label' => __('Site Logo', 'header-footer-elementor'),
            ]
        );

        // $this->add_control(
        // 'site_image',
        // [
        // 'label'   => __('Choose Image', 'header-footer-elementor'),
        // 'type'    => Controls_Manager::MEDIA,
        // 'type' => $this->site_image_url(),
        // 'placeholder' => __($this->site_image_url(), 'header-footer-elementor'),
        // 'type'    => $this->site_image_url(),
        // 'dynamic' => [
        // 'active' => true,
        // ],
        // 'default' => [
        // 'url' => Utils::get_placeholder_image_src(),
        // 'url' => $this->site_image_url(),
        // ],
        // ]
        // );

        $this->add_control(
            'site_image',
            [
                'label'       => __('Site Logo ', 'header-footer-elementor'),
                'type'        => Controls_Manager::URL,
                'default'     => [
                    'url' => $this->site_image_url(),
                ],
                'placeholder' => __($this->site_image_url(), 'header-footer-elementor'),
                'show_label'  => false,
            ]
        );
        $this->add_group_control(
            Group_Control_Image_Size::get_type(),
            [
                'name'    => 'image',
                'label'   => __('Image Size', 'header-footer-elementor'),
                'default' => 'medium',
            ]
        );
        $this->add_responsive_control(
            'align',
            [
                'label'     => __('Alignment', 'header-footer-elementor'),
                'type'      => Controls_Manager::CHOOSE,
                'options'   => [
                    'left'   => [
                        'title' => __('Left', 'header-footer-elementor'),
                        'icon'  => 'fa fa-align-left',
                    ],
                    'center' => [
                        'title' => __('Center', 'header-footer-elementor'),
                        'icon'  => 'fa fa-align-center',
                    ],
                    'right'  => [
                        'title' => __('Right', 'header-footer-elementor'),
                        'icon'  => 'fa fa-align-right',
                    ],
                ],
                'default'   => 'center',
                'selectors' => [
                    '{{WRAPPER}} .hfe-site-logo-container, {{WRAPPER}} .hfe-caption-width' => 'text-align: {{VALUE}};',
                ],
            ]
        );

        $this->add_control(
            'caption_source',
            [
                'label'   => __('Caption', 'header-footer-elementor'),
                'type'    => Controls_Manager::SELECT,
                'options' => [
                    'none'   => __('None', 'header-footer-elementor'),
                    'custom' => __('Custom Caption', 'header-footer-elementor'),
                ],
                'default' => 'none',
            ]
        );

        $this->add_control(
            'caption',
            [
                'label'       => __('Custom Caption', 'header-footer-elementor'),
                'type'        => Controls_Manager::TEXT,
                'default'     => '',
                'placeholder' => __('Enter your image caption', 'header-footer-elementor'),
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
                'label'   => __('Link', 'header-footer-elementor'),
                'type'    => Controls_Manager::SELECT,
                'default' => 'none',
                'options' => [
                    'none'   => __('None', 'header-footer-elementor'),
                    'custom' => __('Custom URL', 'header-footer-elementor'),
                ],
            ]
        );

        $this->add_control(
            'link',
            [
                'label'       => __('Link', 'header-footer-elementor'),
                'type'        => Controls_Manager::URL,
                'dynamic'     => [
                    'active' => true,
                ],
                'placeholder' => __('https://your-link.com', 'header-footer-elementor'),
                'default'     => [
                    // 'url' => Utils::get_placeholder_image_src(),
                    'url' => get_site_url(),
                ],
                'condition'   => [
                    'link_to' => 'custom',
                ],
                'show_label'  => false,
            ]
        );

        // $this->add_control(
        // 'open_lightbox',
        // [
        // 'label' => __('Lightbox', 'header-footer-elementor'),
        // 'type' => Controls_Manager::SELECT,
        // 'default' => 'default',
        // 'options' => [
        // 'default' => __('Default', 'header-footer-elementor'),
        // 'yes' => __('Yes', 'header-footer-elementor'),
        // 'no' => __('No', 'header-footer-elementor'),
        // ],
        // 'condition' => [
        // 'link_to' => 'file',
        // ],
        // ]
        // );
        $this->end_controls_section();
    }
    /**
     * Register Site Image Style Controls.
     *
     * @since 1.2.0
     * @access protected
     */
    protected function register_site_logo_styling_controls()
    {
        $this->start_controls_section(
            'section_style_site_logo_image',
            [
                'label' => __('Site logo', 'header-footer-elementor'),
                'tab'   => Controls_Manager::TAB_STYLE,
            ]
        );

        $this->add_responsive_control(
            'width',
            [
                'label'          => __('Width', 'header-footer-elementor'),
                'type'           => Controls_Manager::SLIDER,
                'default'        => [
                    'unit' => '%',
                ],
                'tablet_default' => [
                    'unit' => '%',
                ],
                'mobile_default' => [
                    'unit' => '%',
                ],
                'size_units'     => [ '%', 'px', 'vw' ],
                'range'          => [
                    '%'  => [
                        'min' => 1,
                        'max' => 100,
                    ],
                    'px' => [
                        'min' => 1,
                        'max' => 1000,
                    ],
                    'vw' => [
                        'min' => 1,
                        'max' => 100,
                    ],
                ],
                'selectors'      => [
                    '{{WRAPPER}} .hfe-site-logo img' => 'width: {{SIZE}}{{UNIT}};',
                    '{{WRAPPER}} .hfe-site-logo .wp-caption .widget-image-caption' => 'width: {{SIZE}}{{UNIT}}; display: inline-block;',
                ],
            ]
        );

        $this->add_responsive_control(
            'space',
            [
                'label'          => __('Max Width', 'header-footer-elementor') . ' (%)',
                'type'           => Controls_Manager::SLIDER,
                'default'        => [
                    'unit' => '%',
                ],
                'tablet_default' => [
                    'unit' => '%',
                ],
                'mobile_default' => [
                    'unit' => '%',
                ],
                'size_units'     => [ '%' ],
                'range'          => [
                    '%' => [
                        'min' => 1,
                        'max' => 100,
                    ],
                ],
                'selectors'      => [
                    '{{WRAPPER}} .hfe-site-logo img' => 'max-width: {{SIZE}}{{UNIT}};',
                    '{{WRAPPER}} .wp-caption-text'   => 'max-width: {{SIZE}}{{UNIT}}; display: inline-block; width: 100%;',
                ],
            ]
        );

        $this->add_control(
            'separator_panel_style',
            [
                'type'  => Controls_Manager::DIVIDER,
                'style' => 'thick',
            ]
        );

        $this->add_control(
            'site_logo_image_border',
            [
                'label'       => __('Border Style', 'header-footer-elementor'),
                'type'        => Controls_Manager::SELECT,
                'default'     => 'none',
                'label_block' => false,
                'options'     => [
                    'none'   => __('None', 'header-footer-elementor'),
                    'solid'  => __('Solid', 'header-footer-elementor'),
                    'double' => __('Double', 'header-footer-elementor'),
                    'dotted' => __('Dotted', 'header-footer-elementor'),
                    'dashed' => __('Dashed', 'header-footer-elementor'),
                ],
                'selectors'   => [
                    '{{WRAPPER}} .hfe-site-logo-container .hfe-site-logo-img' => 'border-style: {{VALUE}};',
                ],
            ]
        );
        $this->add_control(
            'site_logo_image_border_size',
            [
                'label'      => __('Border Width', 'header-footer-elementor'),
                'type'       => Controls_Manager::DIMENSIONS,
                'size_units' => [ 'px' ],
                'default'    => [
                    'top'    => '1',
                    'bottom' => '1',
                    'left'   => '1',
                    'right'  => '1',
                    'unit'   => 'px',
                ],
                'condition'  => [
                    'Site_image_border!' => 'none',
                ],
                'selectors'  => [
                    '{{WRAPPER}} .hfe-site-logo-container .hfe-site-logo-img' => 'border-width: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->add_control(
            'site_logo_image_border_color',
            [
                'label'     => __('Border Color', 'header-footer-elementor'),
                'type'      => Controls_Manager::COLOR,
                'scheme'    => [
                    'type'  => Scheme_Color::get_type(),
                    'value' => Scheme_Color::COLOR_1,
                ],
                'condition' => [
                    'Site_image_border!' => 'none',
                ],
                'default'   => '',
                'selectors' => [
                    '{{WRAPPER}} .hfe-site-logo-container .hfe-site-logo-img' => 'border-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_responsive_control(
            'image_border_radius',
            [
                'label'      => __('Border Radius', 'header-footer-elementor'),
                'type'       => Controls_Manager::DIMENSIONS,
                'size_units' => [ 'px', '%' ],
                'selectors'  => [
                    '{{WRAPPER}} .hfe-site-logo img' => 'border-radius: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Box_Shadow::get_type(),
            [
                'name'     => 'image_box_shadow',
                'exclude'  => [
                    'box_shadow_position',
                ],
                'selector' => '{{WRAPPER}} .hfe-site-logo img',
            ]
        );

        $this->start_controls_tabs('image_effects');

        $this->start_controls_tab(
            'normal',
            [
                'label' => __('Normal', 'header-footer-elementor'),
            ]
        );

        $this->add_control(
            'opacity',
            [
                'label'     => __('Opacity', 'header-footer-elementor'),
                'type'      => Controls_Manager::SLIDER,
                'range'     => [
                    'px' => [
                        'max'  => 1,
                        'min'  => 0.10,
                        'step' => 0.01,
                    ],
                ],
                'selectors' => [
                    '{{WRAPPER}} .hfe-site-logo img' => 'opacity: {{SIZE}};',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Css_Filter::get_type(),
            [
                'name'     => 'css_filters',
                'selector' => '{{WRAPPER}} .hfe-site-logo img',
            ]
        );

        $this->end_controls_tab();

        $this->start_controls_tab(
            'hover',
            [
                'label' => __('Hover', 'header-footer-elementor'),
            ]
        );
        $this->add_control(
            'opacity_hover',
            [
                'label'     => __('Opacity', 'header-footer-elementor'),
                'type'      => Controls_Manager::SLIDER,
                'range'     => [
                    'px' => [
                        'max'  => 1,
                        'min'  => 0.10,
                        'step' => 0.01,
                    ],
                ],
                'selectors' => [
                    '{{WRAPPER}} .hfe-site-logo:hover img' => 'opacity: {{SIZE}};',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Css_Filter::get_type(),
            [
                'name'     => 'css_filters_hover',
                'selector' => '{{WRAPPER}} .hfe-site-logo:hover img',
            ]
        );

        $this->add_control(
            'hover_animation',
            [
                'label' => __('Hover Animation', 'header-footer-elementor'),
                'type'  => Controls_Manager::HOVER_ANIMATION,
            ]
        );
        $this->add_control(
            'background_hover_transition',
            [
                'label'     => __('Transition Duration', 'header-footer-elementor'),
                'type'      => Controls_Manager::SLIDER,
                'range'     => [
                    'px' => [
                        'max'  => 3,
                        'step' => 0.1,
                    ],
                ],
                'selectors' => [
                    '{{WRAPPER}} .hfe-site-logo img' => 'transition-duration: {{SIZE}}s',
                ],
            ]
        );

        $this->end_controls_tab();

        $this->end_controls_tabs();

        $this->end_controls_section();
    }
    /**
     * Register Caption style Controls.
     *
     * @since 1.2.0
     * @access protected
     */
    protected function register_site_logo_caption_styling_controls()
    {
        $this->start_controls_section(
            'section_style_caption',
            [
                'label'     => __('Caption', 'header-footer-elementor'),
                'tab'       => Controls_Manager::TAB_STYLE,
                'condition' => [
                    'caption_source!' => 'none',
                ],
            ]
        );

        $this->add_control(
            'text_color',
            [
                'label'     => __('Text Color', 'header-footer-elementor'),
                'type'      => Controls_Manager::COLOR,
                'default'   => '',
                'selectors' => [
                    '{{WRAPPER}} .widget-image-caption' => 'color: {{VALUE}};',
                ],
                'scheme'    => [
                    'type'  => Scheme_Color::get_type(),
                    'value' => Scheme_Color::COLOR_3,
                ],
            ]
        );

        $this->add_control(
            'caption_background_color',
            [
                'label'     => __('Background Color', 'header-footer-elementor'),
                'type'      => Controls_Manager::COLOR,
                'selectors' => [
                    '{{WRAPPER}} .widget-image-caption' => 'background-color: {{VALUE}};',
                ],
            ]
        );

        $this->add_group_control(
            Group_Control_Typography::get_type(),
            [
                'name'     => 'caption_typography',
                'selector' => '{{WRAPPER}} .widget-image-caption',
                'scheme'   => Scheme_Typography::TYPOGRAPHY_3,
            ]
        );

        $this->add_group_control(
            Group_Control_Text_Shadow::get_type(),
            [
                'name'     => 'caption_text_shadow',
                'selector' => '{{WRAPPER}} .widget-image-caption',
            ]
        );

        $this->add_responsive_control(
            'caption_padding',
            [
                'label'      => __('Padding', 'header-footer-elementor'),
                'type'       => Controls_Manager::DIMENSIONS,
                'size_units' => [ 'px', 'em', '%' ],
                'selectors'  => [
                    '{{WRAPPER}} .widget-image-caption' => 'padding: {{TOP}}{{UNIT}} {{RIGHT}}{{UNIT}} {{BOTTOM}}{{UNIT}} {{LEFT}}{{UNIT}};',
                ],
            ]
        );
        $this->add_responsive_control(
            'caption_space',
            [
                'label'     => __('Caption Top Spacing', 'header-footer-elementor'),
                'type'      => Controls_Manager::SLIDER,
                'range'     => [
                    'px' => [
                        'min' => 0,
                        'max' => 100,
                    ],
                ],
                'default'   => [
                    'size' => 0,
                    'unit' => 'px',
                ],
                'selectors' => [
                    '{{WRAPPER}} .widget-image-caption' => 'margin-top: {{SIZE}}{{UNIT}}; margin-bottom: 0px;',
                ],
            ]
        );

        $this->end_controls_section();
    }

    /**
     * Check if the current widget has caption
     *
     * @access private
     * @since 1.2.0
     *
     * @param array $settings returns settings.
     *
     * @return boolean
     */
    private function has_caption($settings)
    {
        return ( ! empty($settings['caption_source']) && 'none' !== $settings['caption_source'] );
    }

    /**
     * Get the caption for current widget.
     *
     * @access private
     * @since 1.2.0
     * @param array $settings returns the caption.
     *
     * @return string
     */
    private function get_caption($settings)
    {
        $caption = '';
        if ('custom' === $settings['caption_source']) {
            $caption = ! empty($settings['caption']) ? $settings['caption'] : '';
        }
        return $caption;
    }

    /**
     * Render Site Image output on the frontend.
     *
     * Written in PHP and used to generate the final HTML.
     *
     * @since 1.2.0
     * @access public
     */
    public function site_image_url()
    {
        $custom_logo_id = get_theme_mod('custom_logo');

        $logo = wp_get_attachment_image_src($custom_logo_id, 'full');

        return $logo[0];
    }

    /**
     * Render Site Image output on the frontend.
     *
     * Written in PHP and used to generate the final HTML.
     *
     * @since 1.2.0
     * @access protected
     */
    protected function render()
    {
        $settings = $this->get_settings_for_display();

        if (empty($settings['site_image']['url'])) {
            return;
        }

        $has_caption = $this->has_caption($settings);

        $this->add_render_attribute('wrapper', 'class', 'hfe-site-logo');

        $link = $this->get_link_url($settings);

        if ($link) {
            // $this->add_render_attribute('link', 'data-elementor-open-lightbox', $settings['open_lightbox']);

            $this->add_link_attributes('link', $link);

            if (Plugin::$instance->editor->is_edit_mode()) {
                $this->add_render_attribute(
                    'link',
                    [
                        'class' => 'elementor-clickable',
                    ]
                );
            }
        }
        ?>
        <div <?php echo $this->get_render_attribute_string('wrapper'); ?>>
        <?php if ($has_caption) : ?>
                <figure class="wp-caption">
        <?php endif; ?>
        <?php if ($link) : ?>
                    <a <?php echo $this->get_render_attribute_string('link'); ?>>
        <?php endif; ?>
        <?php
        $size = $settings['image_size'];
        $demo = '';

        if ('custom' !== $size) {
            $image_size = $size;
        } else {
            require_once ELEMENTOR_PATH . 'includes/libraries/bfi-thumb/bfi-thumb.php';

            $image_dimension = $settings[ 'site_image' . '_custom_dimension' ];

            $image_size = [
                // Defaults sizes.
                0           => null, // Width.
                1           => null, // Height.

                'bfi_thumb' => true,
                'crop'      => true,
            ];

            $has_custom_size = false;
            if (! empty($image_dimension['width'])) {
                $has_custom_size = true;
                $image_size[0]   = $image_dimension['width'];
            }

            if (! empty($image_dimension['height'])) {
                $has_custom_size = true;
                $image_size[1]   = $image_dimension['height'];
            }

            if (! $has_custom_size) {
                $image_size = 'full';
            }
        }

        $image_url = $settings['site_image']['url'];

        $custom_logo_id = get_theme_mod('custom_logo');

        $image_data = wp_get_attachment_image_src($custom_logo_id, $image_size, true);

        $site_image_class = 'elementor-animation-';

        if (! empty($settings['hover_animation'])) {
            $demo = $settings['hover_animation'];
        }
        if (! empty($image_data)) {
            $image_url = $image_data[0];
        }

        $class_animation = $site_image_class . $demo;

        $image_unset         = site_url() . '/wp-includes/images/media/default.png';
        $placeholder_img_url = Utils::get_placeholder_image_src();

        if ($image_unset !== $image_url) {
            $image_url = $image_url;
        } else {
            $image_url = $placeholder_img_url;
        }

        if ($image_unset === $image_url) {
            $image_url = $placeholder_img_url;
        }

        if (strpos($_SERVER['HTTP_USER_AGENT'], 'Chrome') !== false) {
            $date      = new \DateTime();
            $timestam  = $date->getTimestamp();
            $image_url = $image_url . '?' . $timestam;
        }

        ?>
            <div class="hfe-site-logo-set">           
                <div class="hfe-site-logo-container">
                    <img class="hfe-site-logo-img <?php echo $class_animation; ?>"  src="<?php echo $image_url; ?>" srcset="<?php echo $image_url . ' 1x'; ?>"/>
                </div>
            </div>
        <?php if ($link) : ?>
                    </a>
        <?php endif; ?>
        <?php
        if ($has_caption) :
            $caption_text = $this->get_caption($settings);
            ?>
            <?php if (! empty($caption_text)) : ?>
                    <div class="hfe-caption-width"> 
                        <figcaption class="widget-image-caption wp-caption-text"><?php echo $caption_text; ?></figcaption>
                    </div>
            <?php endif; ?>
                </figure>
        <?php endif; ?>
        </div>  
            <?php
    }

    /**
     * Retrieve Site image widget link URL.
     *
     * @since 1.2.0
     * @access private
     *
     * @param array $settings returns settings.
     * @return array|string|false An array/string containing the link URL, or false if no link.
     */
    private function get_link_url($settings)
    {
        if ('none' === $settings['link_to']) {
            return false;
        }

        if ('custom' === $settings['link_to']) {
            if (empty($settings['link']['url'])) {
                return false;
            }
            return $settings['link'];
        }
    }
}
