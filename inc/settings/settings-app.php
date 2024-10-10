<?php
/**
 * Single page settings page
 *
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

use HFE\WidgetsManager\Base\Widgets_Config;

$all_widgets = Widgets_Config::get_all_widgets();

$json_widgets_data = json_encode( $all_widgets );

?>
<script type="text/javascript">
    window.hfeWidgetsList = <?php echo $json_widgets_data; ?>;
</script>
<div id="hfe-settings-app" class="hfe-settings-app"></div>