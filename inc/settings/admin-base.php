<?php
/**
 * Admin Base HTML.
 *
 * @package header-footer-elementor
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

?>
<div class="hfe-menu-page-wrapper">
	<div id="hfe-menu-page">
		<div class="hfe-menu-page-content hfe-clear">
			<?php
				do_action( 'hfe_render_admin_page_content', $menu_page_slug, $page_action );
			?>
		</div>
	</div>
</div>
