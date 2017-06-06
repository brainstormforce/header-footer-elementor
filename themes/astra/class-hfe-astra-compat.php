<?php
/**
 * HFE_Astra_Compat setup
 *
 * @package header-footer-elementor
 */

/**
 * Astra theme compatibility.
 */
class HFE_Astra_Compat {

	/**
	 * Instance of HFE_Astra_Compat.
	 *
	 * @var HFE_Astra_Compat
	 */
	private static $instance;

	/**
	 *  Initiator
	 */
	public static function instance() {

		if ( ! isset( self::$instance ) ) {
			self::$instance = new HFE_Astra_Compat();

			self::$instance->hooks();
		}

		return self::$instance;
	}

	/**
	 * Run all the Actions / Filters.
	 */
	public function hooks() {

		$header_id = Header_Footer_Elementor::get_settings( 'type_header', '' );
		$footer_id = Header_Footer_Elementor::get_settings( 'type_footer', '' );

		if ( '' !== $header_id ) {
			add_action( 'template_redirect', array( $this, 'astra_setup_header' ), 10 );
			add_action( 'astra_header', array( $this, 'add_header_markup' ) );
		}

		if ( '' !== $footer_id ) {
			add_action( 'template_redirect', array( $this, 'astra_setup_footer' ), 10 );
			add_action( 'astra_footer', array( $this, 'add_footer_markup' ) );
		}

	}

	/**
	 * Disable header from the theme.
	 */
	public function astra_setup_header() {
		remove_action( 'astra_header', 'astra_header_markup' );
	}

	/**
	 * Display header markup.
	 */
	public function add_header_markup() {
		?>
			<header id="masthead" itemscope="itemscope" itemtype="http://schema.org/WPHeader">
				<p class="main-title bhf-hidden" itemprop="headline"><a href="<?php echo bloginfo( 'url' ); ?>" title="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></p>
				<?php Header_Footer_Elementor::get_header_content(); ?>
			</header>

		<?php
	}

	/**
	 * Disable footer from the theme.
	 */
	public function astra_setup_footer() {
		remove_action( 'astra_footer', 'astra_footer_markup' );
	}

	/**
	 * Display footer markup.
	 */
	public function add_footer_markup() {

		?>
			<footer itemscope="itemscope" itemtype="http://schema.org/WPFooter">
				<?php Header_Footer_Elementor::get_footer_content(); ?>
			</footer>
		<?php
	}


}

HFE_Astra_Compat::instance();
