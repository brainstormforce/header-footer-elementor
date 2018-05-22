<?php
/**
 * BB Theme Compatibility.
 *
 * @package  header-footer-elementor
 */

/**
 * HFE_BB_Theme_Compat setup
 *
 * @since 1.0
 */
class HFE_BB_Theme_Compat {

	/**
	 * Instance of HFE_BB_Theme_Compat
	 *
	 * @var HFE_BB_Theme_Compat
	 */
	private static $instance;

	/**
	 *  Initiator
	 */
	public static function instance() {

		if ( ! isset( self::$instance ) ) {
			self::$instance = new HFE_BB_Theme_Compat();

			add_action( 'wp', array( self::$instance, 'hooks' ) );
		}

		return self::$instance;
	}

	/**
	 * Run all the Actions / Filters.
	 */
	public function hooks() {

		if ( hfe_header_enabled() ) {
			add_filter( 'fl_header_enabled', '__return_false' );
			add_action( 'fl_before_header', array( $this, 'get_header_content' ) );
		}

		if ( hfe_footer_enabled() ) {
			add_filter( 'fl_footer_enabled', '__return_false' );
			add_action( 'fl_after_content', array( $this, 'get_footer_content' ) );
		}

	}

	/**
	 * Display header markup for beaver builder theme.
	 */
	public function get_header_content() {

		$header_layout = FLTheme::get_setting( 'fl-header-layout' );

		if ( 'none' == $header_layout || is_page_template( 'tpl-no-header-footer.php' ) ) {
			return;
		}

		?>
		<header id="masthead" itemscope="itemscope" itemtype="https://schema.org/WPHeader">
			<p class="main-title bhf-hidden" itemprop="headline"><a href="<?php echo bloginfo( 'url' ); ?>"
																	title="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>"
																	rel="home"><?php bloginfo( 'name' ); ?></a></p>
			<?php Header_Footer_Elementor::get_header_content(); ?>
		</header>
		<?php
	}

	/**
	 * Display footer markup for beaver builder theme.
	 */
	public function get_footer_content() {

		if ( is_page_template( 'tpl-no-header-footer.php' ) ) {
			return;
		}

		?>
		<footer itemscope="itemscope" itemtype="https://schema.org/WPFooter">
			<?php Header_Footer_Elementor::get_footer_content(); ?>
		</footer>
		<?php
	}

}

HFE_BB_Theme_Compat::instance();
