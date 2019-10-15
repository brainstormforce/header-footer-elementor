<?php 


echo '<h1 class="hfe_main_title">';
esc_attr_e( 'Elementor Header Footer', 'header-footer-elementor' );
echo '</h1>';

$hfe_radio_button = get_option('hfe_all_theme_support_option');

?>

<form method ="POST">
<table class="hfe-table wp-list-table widefat fixed striped posts importers striped">
	<tbody>
		<tr>
			<th class="categories column-categories">
				
				<p class="hfe-setting-name"><?php esc_html_e( 'Select a way for compatibility', 'header-footer-elementor' ); ?></p>

			</th>
			<td class="title column-title has-row-actions column-primary page-title">
				<label for="way1">
					<input type="radio" name="hfe_radio_button" value="1" <?php checked( $hfe_radio_button, 1 ); ?> > <div class="hfe_radio_options"><?php esc_html_e( 'Elementor way', 'header-footer-elementor' ); ?></div>
					<p class="description"><?php esc_html_e( 'This replaces the header.php & footer.php template with a custom templates from the plugin.', 'header-footer-elementor' ); ?></p><br>
				</label>
		</tr>
		<td></td>
		<td>
				<label for="way2">
					<input type="radio" name="hfe_radio_button" value="2" <?php checked( $hfe_radio_button, 2 ); ?> > <div class="hfe_radio_options"><?php esc_html_e( 'Using action wp_body_opens', 'header-footer-elementor' ); ?></div>
					<p class="description">
					<?php esc_html_e( 'This adds the header in the new action that was introduced by WordPress `wp_body_option` and footer is added in wp_footer action.', 'header-footer-elementor' ); ?>
					</p>
				</label>
			</td>
		
		</tbody>
	</table>
	<br><input type="submit" class="button button-primary"  name="submit_radio"  Value="Save Settings"/>
</form>	