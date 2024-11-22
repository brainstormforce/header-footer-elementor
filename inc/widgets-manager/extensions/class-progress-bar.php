<?php
/**
 * Elementor Classes.
 *
 * @package header-footer-elementor
 */
namespace HFE\WidgetsManager\Extensions;

use Elementor\Controls_Manager;

if ( ! defined( 'ABSPATH' ) ) {
	exit;   // Exit if accessed directly.
}

/**
 * HFE Progress bar extension
 *
 * @since x.x.x
 */
class Progress_Bar {

    /**
	 * Instance of Widgets_Loader.
	 *
	 * @since  x.x.x
	 * @var null
	 */
	private static $_instance = null;

	/**
	 * Get instance of Progress_Bar
	 *
	 * @since  x.x.x
	 * @return Progress_Bar
	 */
	public static function instance() {
		if ( ! isset( self::$_instance ) ) {
			self::$_instance = new self();
		}

		return self::$_instance;
	}

	/**
	 * Setup actions and filters.
	 *
	 * @since  x.x.x
	 * @access private
	 */
	private function __construct() {

        require_once HFE_DIR . '/inc/widgets-manager/extensions/class-progress-bar-settings.php';

		add_action( 'elementor/kit/register_tabs', [ $this, 'register_extension_tab' ], 1, 40 );
		add_action( 'elementor/documents/register_controls', [ $this, 'page_progress_bar_controls' ], 10 );

		add_action( 'wp_footer', [ $this, 'render_progress_bar_html' ] );

		// Enqueue jQuery and add inline script.
		add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_scripts' ] );

    }

    
	/**
	 * Register extension tab
	 *
	 * @param \Elementor\Core\Kits\Documents\Kit $kit
	 * @since x.x.x
	 */
	public function register_extension_tab( \Elementor\Core\Kits\Documents\Kit $kit ) {
		$kit->register_tab( 'hfe-progress-bar-settings', Progress_Bar_Settings::class );
	}

    /**
	 * Add Progress Bar controls
	 *
	 * @param \Elementor\Widget_Base $element Elementor Widget.
	 */
    public function page_progress_bar_controls( $element ) {

		if( $this->elementor_get_setting('hfe_progress_bar_enable') !== 'yes') return;

		$element->start_controls_section(
			'ha_rpb_single_section',
			[
				'label' => __( 'Reading Progress Bar', 'happy-elementor-addons' ) . ha_get_section_icon(),
				'tab'   => Controls_Manager::TAB_SETTINGS,
			]
		);

		if($this->elementor_get_setting('ha_rpb_apply_globally') === 'globally') {
			$element->add_control(
				'ha_rpb_single_disable',
				[
					'label'        => __( 'Disable', 'happy-elementor-addons' ),
					'description'  => __( 'Disable Reading Progress Bar For This Page', 'happy-elementor-addons' ),
					'type'         => Controls_Manager::SWITCHER,
					'default'      => 'no',
					'label_on'     => __( 'Yes', 'happy-elementor-addons' ),
					'label_off'    => __( 'No', 'happy-elementor-addons' ),
					'return_value' => 'yes',
				]
			);
		} else {
			$element->add_control(
				'ha_rpb_single_enable',
				[
					'label'        => __( 'Enable', 'happy-elementor-addons' ),
					'description'  => __( 'Enable Reading Progress Bar For This Page', 'happy-elementor-addons' ),
					'type'         => Controls_Manager::SWITCHER,
					'default'      => 'no',
					'label_on'     => __( 'Yes', 'happy-elementor-addons' ),
					'label_off'    => __( 'No', 'happy-elementor-addons' ),
					'return_value' => 'yes',
				]
			);
		}
		

		$element->end_controls_section();
	}


    /**
	 * Render Progress Bar html
	 *
	 * @since x.x.x
	 */
	public function render_progress_bar_html() {

		$post_id                = get_the_ID();
		$document               = [];
		$document_settings_data = [];

    }

}

Progress_Bar::instance();