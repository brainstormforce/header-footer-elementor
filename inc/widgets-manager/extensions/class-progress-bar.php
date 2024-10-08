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
	 * @since  1.2.0
	 * @var null
	 */
	private static $_instance = null;


	/**
	 * Get instance of Widgets_Loader
	 *
	 * @since  1.2.0
	 * @return Widgets_Loader
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
	 * @since  1.2.0
	 * @access private
	 */
	private function __construct() {

		add_action( 'elementor/element/after_section_end', [ $this, 'register_extension_controls' ], 10, 3 );
		add_action( 'wp_footer', [ $this, 'render_progress_bar' ] );
		add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_progress_bar_scripts' ] );
	}

	/**
	 * Registers the Reading Progress Bar setting.
	 *
	 * This function adds the Reading Progress Bar setting to the settings page.
	 *
	 * @since x.x.x
	 *
	 * @param \Elementor\Element_Base $element The element instance.
	 * @param string                  $section_id The section ID.
	 * @param array                   $args The arguments.
	 */
	public function register_extension_controls( $element, $section_id, $args ) {
		if ( 'section_page_style' === $section_id || 'container_page_style' === $section_id ) {
			$element->start_controls_section(
				'section_reading_progress_bar',
				[
					'label' => __( 'Reading Progress Bar', 'header-footer-elementor' ),
					'tab'   => \Elementor\Controls_Manager::TAB_SETTINGS,
				]
			);

			$element->add_control(
				'enable_reading_progress_bar',
				[
					'label'        => __( 'Enable Reading Progress Bar', 'header-footer-elementor' ),
					'type'         => \Elementor\Controls_Manager::SWITCHER,
					'label_on'     => __( 'Yes', 'header-footer-elementor' ),
					'label_off'    => __( 'No', 'header-footer-elementor' ),
					'return_value' => 'yes',
					'default'      => 'no',
				]
			);

			$element->add_control(
				'hfe_reading_progress_global',
				[
					'label'        => __( 'Enable Global Display ', 'header-footer-elementor' ),
					'description'  => __( 'Enabling this option will affect the entire site.', 'header-footer-elementor' ),
					'type'         => \Elementor\Controls_Manager::SWITCHER,
					'default'      => 'no',
					'label_on'     => __( 'Yes', 'header-footer-elementor' ),
					'label_off'    => __( 'No', 'header-footer-elementor' ),
					'return_value' => 'yes',
					'separator'    => 'before',
					'condition'    => [
						'enable_reading_progress_bar' => 'yes',
					],
				]
			);
			
			$element->add_control(
				'hfe_reading_progress_global_display_condition',
				[
					'label'     => __( 'Display On', 'header-footer-elementor' ),
					'type'      => \Elementor\Controls_Manager::SELECT,
					'default'   => 'all',
					'options'   => [
						'posts' => __( 'All Posts', 'header-footer-elementor' ),
						'pages' => __( 'All Pages', 'header-footer-elementor' ),
						'all'   => __( 'All Posts & Pages', 'header-footer-elementor' ),
					],
					'condition' => [
						'enable_reading_progress_bar' => 'yes',
						'hfe_reading_progress_global' => 'yes',
					],
					'separator' => 'before',
				]
			);

			$element->add_control(
				'hfe_reading_progress_bar_position',
				[
					'label'       => __( 'Position', 'header-footer-elementor' ),
					'type'        => \Elementor\Controls_Manager::SELECT,
					'default'     => 'top',
					'label_block' => false,
					'options'     => [
						'top'    => __( 'Top', 'header-footer-elementor' ),
						'bottom' => __( 'Bottom', 'header-footer-elementor' ),
					],
					'separator'   => 'before',
					'condition'   => [
						'enable_reading_progress_bar' => 'yes',
					],
				]
			);

			$element->add_control(
				'hfe_reading_progress_bar_height',
				[
					'label'      => __( 'Height', 'header-footer-elementor' ),
					'type'       => \Elementor\Controls_Manager::SLIDER,
					'size_units' => [ 'px' ],
					'range'      => [
						'px' => [
							'min'  => 0,
							'max'  => 50,
							'step' => 1,
						],
					],
					'default'    => [
						'unit' => 'px',
						'size' => 5,
					],
					'selectors'  => [
						'{{WRAPPER}} .hfe-reading-progress-wrap .hfe-reading-progress' => 'height: {{SIZE}}{{UNIT}} !important',
						'{{WRAPPER}} .hfe-reading-progress-wrap .hfe-reading-progress .hfe-reading-progress-fill' => 'height: {{SIZE}}{{UNIT}} !important',
					],
					'separator'  => 'before',
					'condition'  => [
						'enable_reading_progress_bar' => 'yes',
					],
				]
			);

			$element->add_control(
				'hfe_reading_progress_bar_bg_color',
				[
					'label'     => __( 'Background Color', 'header-footer-elementor' ),
					'type'      => \Elementor\Controls_Manager::COLOR,
					'default'   => '',
					'selectors' => [
						'{{WRAPPER}} .hfe-reading-progress' => 'background-color: {{VALUE}}',
					],
					'separator' => 'before',
					'condition' => [
						'enable_reading_progress_bar' => 'yes',
					],
				]
			);

			$element->add_control(
				'hfe_reading_progress_bar_fill_color',
				[
					'label'     => __( 'Fill Color', 'header-footer-elementor' ),
					'type'      => \Elementor\Controls_Manager::COLOR,
					'default'   => '#1fd18e',
					'selectors' => [
						'{{WRAPPER}} .hfe-reading-progress-wrap .hfe-reading-progress .hfe-reading-progress-fill' => 'background-color: {{VALUE}}',
					],
					'separator' => 'before',
					'condition' => [
						'enable_reading_progress_bar' => 'yes',
					],
				]
			);

			$element->add_control(
				'hfe_reading_progress_bar_disable_on',
				[
					'label'     => __( 'Disable On ', 'header-footer-elementor' ),
					'type'      => \Elementor\Controls_Manager::SELECT,
					'multiple'  => true,
					'options'   => [
						'desktop' => __( 'Desktop', 'header-footer-elementor' ),
						'tablet'  => __( 'Tablet', 'header-footer-elementor' ),
						'mobile'  => __( 'Mobile', 'header-footer-elementor' ),
					],
					'default'   => [ 'desktop' ],
					'separator' => 'before',
					'condition' => [
						'enable_reading_progress_bar' => 'yes',
					],
				]
			);

			$element->end_controls_section();
		}
	}

	/**
	 * Renders the Progress Bar markup in the frontend.
	 *
	 * @since x.x.x
	 */
	public function render_progress_bar() {
		// Fetch the settings from Elementor controls.
		$position = get_option( 'hfe_reading_progress_bar_position', 'top' );
	
		$animation_speed = get_option( 'hfe_reading_progress_bar_animation_speed', 300 );
	
		// Other settings like height, background color, fill color can also be passed via inline styles.
		?>
		<div id="hfe-reading-progress-bar" class="hfe-reading-progress-wrap" data-position="<?php echo esc_attr( $position ); ?>" data-animation-speed="<?php echo esc_attr( $animation_speed ); ?>">
			<div class="hfe-reading-progress">
				<div class="hfe-reading-progress-fill"></div>
			</div>
		</div>
		<?php
	}
	
	

	/**
	 * Enqueue the Progress Bar scripts.
	 *
	 * @since x.x.x
	 */
	public function enqueue_progress_bar_scripts() {
		// Corrected path to the JavaScript file.
		wp_enqueue_script( 
			'hfe-reading-progress-bar', 
			plugin_dir_url( __FILE__ ) . '../../js/progress-bar.js', 
			[], 
			'1.0.0', 
			true 
		);
	
		// Corrected path to the CSS file.
		wp_enqueue_style( 
			'hfe-reading-progress-bar', 
			plugin_dir_url( __FILE__ ) . '../../widgets-css/progress-bar.css', 
			[], 
			'1.0.0' 
		);
	}
	
}

Progress_Bar::instance();
