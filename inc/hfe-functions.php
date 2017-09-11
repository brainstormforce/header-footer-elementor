<?php
/**
 * Header Footer Elementor Function
 *
 * @package  header-footer-elementor
 */

/**
 * Checks if Header is enabled from HFE.
 *
 * @since  1.0.2
 * @return bool True if header is enabled. False if header is not enabled
 */
function hfe_header_enabled() {
	$header_id = Header_Footer_Elementor::get_settings( 'type_header', '' );

	if ( '' !== $header_id ) {
		return true;
	}

	return false;
}

/**
 * Checks if Footer is enabled from HFE.
 *
 * @since  1.0.2
 * @return bool True if header is enabled. False if header is not enabled.
 */
function hfe_footer_enabled() {
	$footer_id = Header_Footer_Elementor::get_settings( 'type_footer', '' );

	if ( '' !== $footer_id ) {
		return true;
	}

	return false;
}

/**
 * Get HFE Header ID
 *
 * @since  1.0.2
 * @return (String|boolean) header id if it is set else returns false.
 */
function get_hfe_header_id() {
	$header_id = Header_Footer_Elementor::get_settings( 'type_header', '' );

	if ( '' !== $header_id ) {
		return $header_id;
	}

	return false;
}

/**
 * Get HFE Footer ID
 *
 * @since  1.0.2
 * @return (String|boolean) header id if it is set else returns false.
 */
function get_hfe_footer_id() {
	$footer_id = Header_Footer_Elementor::get_settings( 'type_footer', '' );

	if ( '' !== $footer_id ) {
		return $footer_id;
	}

	return false;
}

/**
 * Display header markup.
 *
 * @since  1.0.2
 */
function hfe_render_header() {

	if ( false == apply_filters( 'enable_hfe_render_header', '__return_true' ) ) {
		return;
	}

	?>
		<header id="masthead" itemscope="itemscope" itemtype="http://schema.org/WPHeader">
			<p class="main-title bhf-hidden" itemprop="headline"><a href="<?php echo bloginfo( 'url' ); ?>" title="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></p>
			<?php Header_Footer_Elementor::get_header_content(); ?>
		</header>

	<?php

}

/**
 * Display footer markup.
 *
 * @since  1.0.2
 */
function hfe_render_footer() {

	if ( false == apply_filters( 'enable_hfe_render_footer', '__return_true' ) ) {
		return;
	}

	?>
		<footer itemscope="itemscope" itemtype="http://schema.org/WPFooter">
			<?php Header_Footer_Elementor::get_footer_content(); ?>
		</footer>
	<?php

}
