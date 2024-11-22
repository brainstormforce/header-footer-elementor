<?php
/**
 * Elementor Reading Progress Bar Rendering Class.
 *
 * @package header-footer-elementor
 */

namespace HFE\WidgetsManager\Extensions;

if ( ! defined( 'ABSPATH' ) ) {
	exit;   // Exit if accessed directly.
}

/**
 * HFE Reading Progress Bar.
 *
 * @since x.x.x
 */
class Progress_Bar_Render {

	/**
	 * Instance of Progress_Bar_Render.
	 *
	 * @since x.x.x
	 * @var null
	 */
	private static $_instance = null;

	/**
	 * Get instance of Progress_Bar_Render.
	 *
	 * @since x.x.x
	 * @return Progress_Bar_Render
	 */
	public static function instance() {
		if ( ! isset( self::$_instance ) ) {
			self::$_instance = new self();
		}

		return self::$_instance;
	}

	/**
	 * Constructor function.
	 *
	 * @since x.x.x
	 */
	private function __construct() {
		add_action( 'wp_footer', [ $this, 'render_reading_progress_bar' ] );
		add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_scripts' ] );
	}

	/**
	 * Enqueue necessary scripts for reading progress bar.
	 *
	 * @since x.x.x
	 */
	public function enqueue_scripts() {
		// Enqueue your styles and scripts here.
		wp_enqueue_style( 'hfe-progress-bar-style', get_template_directory_uri() . '/css/progress-bar.css' );
		wp_enqueue_script( 'hfe-progress-bar-script', get_template_directory_uri() . '/js/progress-bar.js', [ 'jquery' ], '1.0.0', true );
	}

	/**
	 * Render the reading progress bar.
	 *
	 * @since x.x.x
	 */
	public function render_reading_progress_bar() {
		// Check if the option to enable the progress bar is set.
		$enable_progress_bar = get_option( 'enable_reading_progress_bar', 'no' );
		if ( 'yes' !== $enable_progress_bar ) {
			return;
		}

		// Position and height for the progress bar.
		$progress_position = get_option( 'hfe_reading_progress_bar_position', 'top' );
        var_dump($progress_position);
		$progress_height   = get_option( 'hfe_reading_progress_bar_height', 5 );
		$fill_color        = get_option( 'hfe_reading_progress_bar_fill_color', '#1fd18e' );
		$bg_color          = get_option( 'hfe_reading_progress_bar_bg_color', '' );

		// Inline styles for the progress bar.
		$progress_styles = sprintf(
			'height: %dpx; background-color: %s;',
			esc_attr( $progress_height ),
			esc_attr( $bg_color )
		);

		$fill_styles = sprintf(
			'background-color: %s;',
			esc_attr( $fill_color )
		);

		// Render the progress bar markup.
		?>
		<div class="hfe-reading-progress-wrap" style="<?php echo esc_attr( $progress_styles ); ?>">
			<div class="hfe-reading-progress" style="height: <?php echo esc_attr( $progress_height ); ?>px;">
				<div class="hfe-reading-progress-fill" style="<?php echo esc_attr( $fill_styles ); ?>"></div>
			</div>
		</div>

		<script type="text/javascript">
			jQuery(document).ready(function($) {
				var progressBar = $('.hfe-reading-progress-fill');
				var totalHeight = $(document).height() - $(window).height();
				$(window).on('scroll', function() {
					var scrollTop = $(window).scrollTop();
					var progress = (scrollTop / totalHeight) * 100;
					progressBar.css('width', progress + '%');
				});
			});
		</script>
		<?php
	}
}

Progress_Bar_Render::instance();
