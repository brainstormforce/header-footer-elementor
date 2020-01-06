<?php
/**
 * Shortcode Markup
 *
 * TMPL - Single Block Preview
 * TMPL - No more Blocks
 * TMPL - Filters
 * TMPL - List
 *
 * @package header-footer-elementor
 * @since x.x.x
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

?>

<script type="text/template" id="tmpl-ehf-base-skeleton">
	<div class="dialog-widget dialog-lightbox-widget dialog-type-buttons dialog-type-lightbox" id="ehf-blocks-modal">
		<div class="dialog-widget-content dialog-lightbox-widget-content">
			<div class="ehf-blocks__content-wrap">
				<div class="dialog-message dialog-lightbox-message-block" data-type="blocks">
					<div class="ehf-blocks__category-wrap">
						<div class="ehf-blocks__category-inner-wrap">
							<select id="elementor-template-library-filter" class="ehf-blocks__category elementor-template-library-filter-select elementor-select2">
								<option value=""><?php esc_html_e( 'All', 'header-footer-elementor' ); ?></option>
								<# for ( key in ehf_blocks.block_categories ) { #>
									<# var selected = ( ehf_blocks.block_categories[key].slug == EHFBlocks.blockCategory ) ? 'selected="selected"' : ''; #>
								<option value="{{ehf_blocks.block_categories[key].id}}" {{selected}}>{{ehf_blocks.block_categories[key].name}}</option>
								<# } #>
							</select>
						</div>
					</div>
					<div class="dialog-content dialog-lightbox-content-block theme-browser"></div>
					<div class="theme-preview-block"></div>
				</div>
			</div>
			<div class="dialog-buttons-wrapper dialog-lightbox-buttons-wrapper"></div>
		</div>
		<div class="dialog-background-lightbox"></div>
	</div>
</script>

<script type="text/template" id="tmpl-ehf-modal__header">
	<div class="dialog-header dialog-lightbox-header">
		<div class="ehf-blocks-modal__header">
			<div class="ehf-blocks-modal__header__logo-area position-left-last">
				<div class="ehf-blocks-modal__header__logo">
					<span class="ehf-blocks-modal__header__logo__icon-wrapper"></span>
				</div>
				<div class="back-to-layout" title="<?php esc_html_e( 'Back to Layout', 'header-footer-elementor' ); ?>" data-step="1"><i class="icon-chevron-left"></i></div>
			</div>
			<div class="ehf-blocks-modal__header__menu-area ehf-blocks-step-1-wrap">
				<div class="elementor-template-library-header-menu">
					<div class="search-form">
						<input autocomplete="off" placeholder="<?php esc_html_e( 'Search...', 'header-footer-elementor' ); ?>" type="search" aria-describedby="live-search-desc" id="wp-filter-search-input" class="wp-filter-search">
						<span class="icon-search search-icon"></span>
					</div>
				</div>
			</div>
			<div class="elementor-templates-modal__header__menu-area ehf-blocks-step-1-wrap ehf-blocks-modal__options">
				<div class="elementor-template-library-header-menu">
					<div class="ehf-blocks__sync-wrap">
						<div class="ehf-blocks__sync-library-button">
							<span class="icon-refresh" aria-hidden="true" title="<?php esc_html_e( 'Sync Library', 'header-footer-elementor' ); ?>"></span>
						</div>
					</div>
				</div>
			</div>
			<div class="elementor-templates-modal__header__items-area">
				<div class="ehf-blocks-modal__header__close ehf-blocks-modal__header__close--normal ehf-blocks-modal__header__item">
					<i class="eicon-close" aria-hidden="true" title="<?php esc_html_e( 'Close', 'header-footer-elementor' ); ?>"></i>
					<span class="elementor-screen-only"><?php esc_html_e( 'Close', 'header-footer-elementor' ); ?></span>
				</div>
			</div>
		</div>
	</div>
</script>

<script type="text/template" id="tmpl-ehf-blocks-list">

	<#
		var count = 0;
		for ( key in data ) {
			var site_title = ( undefined == data[ key ]['category'] || 0 == data[ key ]['category'].length ) ? data[ key ]['title'] : ehf_blocks.block_categories[data[ key ]['category']].name;
			count++;
			if ( '' !== EHFBlocks.blockCategory && 0 != data[ key ]['category'].length ) {
				if ( EHFBlocks.blockCategory != ehf_blocks.block_categories[data[ key ]['category']].slug ) {
					continue;
				}
			}
	#>
		<div class="ehf-blocks-library-template ehf-block-theme" data-block-id={{key}}>
			<div class="ehf-blocks-library-template-inner theme-screenshot" data-step="1">
				<div class="elementor-template-library-template-body">
					<img src="{{data[ key ]['featured-image-url']}}">
				</div>
				<div class="theme-id-container">
					<h3 class="theme-name">{{{site_title}}}</h3>
				</div>
			</div>
		</div>
	<#
		}
		if ( count == 0 ) {
	#>
		<div class="ehf-blocks__no-block">
			<div class="inner">
				<h3><?php esc_html_e( 'Sorry No Result Found.', 'header-footer-elementor' ); ?></h3>
				<div class="content">
					<div class="description">
						<p>
						<?php
						/* translators: %1$s External Link */
						printf( __( 'Don\'t see a template you would like to import?<br><a target="_blank" href="%1$s">Please Suggest Us!</a>', 'header-footer-elementor' ), esc_url( 'https://wpastra.com/sites-suggestions/?utm_source=demo-import-panel&utm_campaign=astra-sites&utm_medium=suggestions' ) );
						?>
						</p>
						<div class="back-to-layout-button"><span class="button ehf-blocks__back"><?php esc_html_e( 'Back to Templates', 'header-footer-elementor' ); ?></span></div>
					</div>
				</div>
			</div>
		</div>
	<#
		}
	#>
</script>

<script type="text/template" id="tmpl-ehf-block-preview">
	<#
	let wrap_height = $ehfscope.find( '.ehf-blocks__content-wrap' ).height();
	wrap_height = ( wrap_height - 55 );
	wrap_height = wrap_height + 'px';
	#>
	<div class="themes wp-clearfix ehf-blocks" data-site-id="{{data.id}}" style="display: block;">
		<div class="single-site-wrap">
			<div class="single-site">
				<div class="single-site-preview-wrap">
					<div class="single-site-preview" style="max-height: {{wrap_height}};">
						<img class="theme-screenshot" data-src="" src="{{data['featured-image-url']}}">
					</div>
				</div>
			</div>
		</div>
	</div>
</script>

<script type="text/template" id="tmpl-ehf-blocks-preview-actions">

	<div class="ehf-block-preview-actions-wrap">
		<div class="ehf-block-preview-actions-inner-wrap">
			<div class="ehf-block-preview-actions">
				<div class="site-action-buttons-wrap">
					<div class="ehf-block-import-template site-action-buttons-right">
						<div type="button" class="elementor-button ehf-library-template-insert disabled"><?php esc_html_e( 'Import Block', 'header-footer-elementor' ); ?></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</script>

<?php
