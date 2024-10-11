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
$plugins_data = Widgets_Config::get_bsf_plugins();

$json_widgets_data = json_encode( $all_widgets );
$json_plugins_data = json_encode($plugins_data);
?>
<script type="text/javascript">
    window.hfeWidgetsList = <?php echo $json_widgets_data; ?>;
    window.hfePluginsData = <?php echo $json_plugins_data; ?>;
</script>
<div id="hfe-settings-app" class="hfe-settings-app"></div>