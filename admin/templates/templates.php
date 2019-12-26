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
								<option value="{{ehf_blocks.block_categories[key].id}}">{{ehf_blocks.block_categories[key].name}}</option>
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

<script type="text/template" id="tmpl-ehf-modal__header-back">
	<div class="dialog-lightbox-back"><span class="dialog-lightbox-back-text"><?php esc_html_e( 'Back to Pages', 'header-footer-elementor' ); ?></span></div>
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
			<div class="ehf-blocks-modal__header__menu-area astra-sites-step-1-wrap">
				<div class="elementor-template-library-header-menu">
					<div class="search-form">
						<input autocomplete="off" placeholder="<?php esc_html_e( 'Search...', 'header-footer-elementor' ); ?>" type="search" aria-describedby="live-search-desc" id="wp-filter-search-input" class="wp-filter-search">
						<span class="icon-search search-icon"></span>
						<div class="astra-sites-autocomplete-result"></div>
					</div>
				</div>
			</div>
			<div class="elementor-templates-modal__header__menu-area astra-sites-step-1-wrap ast-sites-modal__options">
				<div class="elementor-template-library-header-menu">
					<div class="astra-sites__sync-wrap">
						<div class="astra-sites-sync-library-button">
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

<script type="text/template" id="tmpl-astra-sites-list">

	<#
		var count = 0;
		for ( key in data ) {
			var page_data = data[ key ][ 'pages' ];
			var site_type = data[ key ][ 'astra-sites-type' ] || '';
			if ( 0 == Object.keys( page_data ).length ) {
				continue;
			}
			if ( undefined == site_type ) {
				continue;
			}
			var type_class = ' site-type-' + data[ key ]['astra-sites-type'];
			var site_title = data[ key ]['title'].slice( 0, 25 );
			if ( data[ key ]['title'].length > 25 ) {
				site_title += '...';
			}
			count++;
	#>
			<div class="theme astra-theme site-single publish page-builder-elementor {{type_class}}" data-site-id={{key}} data-template-id="">
				<div class="inner">
					<span class="site-preview" data-href="" data-title={{site_title}}>
						<div class="theme-screenshot one loading" data-step="1" data-src={{data[ key ]['thumbnail-image-url']}} data-featured-src={{data[ key ]['featured-image-url']}}></div>
					</span>
					<div class="theme-id-container">
						<h3 class="theme-name">{{{site_title}}}</h3>
					</div>
					<# if ( site_type && 'free' !== site_type ) { #>
						<div class="agency-ribbons" title="<?php esc_attr_e( 'This premium template is accessible with Astra "Agency" Package.', 'header-footer-elementor' ); ?>"><?php esc_html_e( 'Agency', 'header-footer-elementor' ); ?></div>
					<# } #>
				</div>
			</div>
	<#
		}
	#>
</script>

<script type="text/template" id="tmpl-ehf-blocks-list">

	<#
		var count = 0;
		for ( key in data ) {
			var site_title = ( undefined == data[ key ]['category'] ) ? data[ key ]['title'] : ehf_blocks.block_categories[data[ key ]['category']].name;
			count++;
			if ( '' !== EHFBlocks.blockCategory ) {
				if ( EHFBlocks.blockCategory != data[ key ]['category'] ) {
					continue;
				}
			}
	#>
		<div class="astra-sites-library-template astra-theme" data-block-id={{key}}>
			<div class="astra-sites-library-template-inner theme-screenshot" data-step="1">
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
		<div class="astra-sites-no-sites">
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
						<div class="back-to-layout-button"><span class="button astra-sites-back"><?php esc_html_e( 'Back to Templates', 'header-footer-elementor' ); ?></span></div>
					</div>
				</div>
			</div>
		</div>
	<#
		}
	#>
</script>

<script type="text/template" id="tmpl-ehf-list-search">

	<#
		var count = 0;

		for ( ind in data ) {
			var site_type = data[ ind ]['site-pages-type'];
			var type_class = ' site-type-' + site_type;
			var site_id = ( undefined == data.site_id ) ? data[ind].site_id : data.site_id;
			if ( undefined == site_type ) {
				continue;
			}
			if ( 'gutenberg' == data[ind]['site-pages-page-builder'] ) {
				continue;
			}
			var site_title = data[ ind ]['title'].slice( 0, 25 );
			if ( data[ ind ]['title'].length > 25 ) {
				site_title += '...';
			}
			count++;
	#>
		<div class="theme astra-theme site-single publish page-builder-elementor {{type_class}}" data-template-id={{ind}} data-site-id={{site_id}}>
			<div class="inner">
				<span class="site-preview" data-href="" data-title={{site_title}}>
					<div class="theme-screenshot one loading" data-step="2" data-src={{data[ ind ]['thumbnail-image-url']}} data-featured-src={{data[ ind ]['featured-image-url']}}></div>
				</span>
				<div class="theme-id-container">
					<h3 class="theme-name">{{{site_title}}}</h3>
				</div>
				<# if ( site_type && 'free' !== site_type ) { #>
					<div class="agency-ribbons" title="<?php esc_attr_e( 'This premium template is accessible with Astra "Agency" Package.', 'header-footer-elementor' ); ?>"><?php esc_html_e( 'Agency', 'header-footer-elementor' ); ?></div>
				<# } #>
			</div>
		</div>
	<#
		}

		if ( count == 0 ) {
	#>
		<div class="astra-sites-no-sites">
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
						<div class="back-to-layout-button"><span class="button astra-sites-back"><?php esc_html_e( 'Back to Templates', 'header-footer-elementor' ); ?></span></div>
					</div>
				</div>
			</div>
		</div>
	<#
		}
	#>
</script>

<script type="text/template" id="tmpl-ehf-search">

	<#
		var count = 0;

		for ( ind in data ) {
			if ( 'gutenberg' == data[ind]['site-pages-page-builder'] ) {
				continue;
			}

			var site_id = ( undefined == data.site_id ) ? data[ind].site_id : data.site_id;
			var site_type = data[ ind ]['site-pages-type'];

			if ( 'site' == data[ind]['type'] ) {
				site_type = data[ ind ]['astra-sites-type'];
			}

			if ( undefined == site_type ) {
				continue;
			}

			var parent_name = '';
			if ( undefined != data[ind]['parent-site-name'] ) {
				var parent_name = $( "<textarea/>") .html( data[ind]['parent-site-name'] ).text();
			}

			var complete_title = parent_name + ' - ' + data[ ind ]['title'];
			var site_title = complete_title.slice( 0, 25 );
			if ( complete_title.length > 25 ) {
				site_title += '...';
			}

			var tmp = site_title.split(' - ');
			var title1 = site_title;
			var title2 = '';
			if ( undefined !== tmp && undefined !== tmp[1] ) {
				title1 = tmp[0];
				title2 = ' - ' + tmp[1];
			} else {
				title1 = tmp[0];
				title2 = '';
			}

			var type_class = ' site-type-' + site_type;
			count++;
	#> 
		<div class="theme astra-theme site-single publish page-builder-elementor {{type_class}}" data-template-id={{ind}} data-site-id={{site_id}}>
			<div class="inner">
				<span class="site-preview" data-href="" data-title={{title2}}>
					<div class="theme-screenshot one loading" data-type={{data[ind]['type']}} data-step={{data[ind]['step']}} data-show="search" data-src={{data[ ind ]['thumbnail-image-url']}} data-featured-src={{data[ ind ]['featured-image-url']}}></div>
				</span>
				<div class="theme-id-container">
					<h3 class="theme-name"><strong>{{title1}}</strong>{{title2}}</h3>
				</div>
				<# if ( site_type && 'free' !== site_type ) { #>
					<div class="agency-ribbons" title="<?php esc_attr_e( 'This premium template is accessible with Astra "Agency" Package.', 'header-footer-elementor' ); ?>"><?php esc_html_e( 'Agency', 'header-footer-elementor' ); ?></div>
				<# } #>
			</div>
		</div>
	<#
		}

		if ( count == 0 ) {
	#>
		<div class="astra-sites-no-sites">
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
						<div class="back-to-layout-button"><span class="button astra-sites-back"><?php esc_html_e( 'Back to Templates', 'header-footer-elementor' ); ?></span></div>
					</div>
				</div>
			</div>
		</div>
	<#
		}
	#>
</script>

<script type="text/template" id="tmpl-astra-sites-insert-button">
	<div id="elementor-template-library-header-preview-insert-wrapper" class="elementor-templates-modal__header__item" data-template-id={{data.template_id}}>
		<a class="elementor-template-library-template-action elementor-template-library-template-insert elementor-button">
			<i class="eicon-file-download" aria-hidden="true"></i>
			<span class="elementor-button-title"><?php esc_html_e( 'Insert', 'header-footer-elementor' ); ?></span>
		</a>

	</div>
</script>

/**
 * TMPL - Third Party Required Plugins
 */
?>
<script type="text/template" id="tmpl-astra-sites-third-party-required-plugins">
	<div class="astra-sites-third-party-required-plugins-wrap">
		<h3 class="theme-name"><?php esc_html_e( 'Required Plugin Missing', 'header-footer-elementor' ); ?></h3>
		<p><?php esc_html_e( 'This starter site requires premium plugins. As these are third party premium plugins, you\'ll need to purchase, install and activate them first.', 'header-footer-elementor' ); ?></p>
		<ul class="astra-sites-third-party-required-plugins">
			<# for ( key in data ) { #>
				<li class="plugin-card plugin-card-{{data[ key ].slug}}'" data-slug="{{data[ key ].slug }}" data-init="{{data[ key ].init}}" data-name="{{data[ key ].name}}"><a href="{{data[ key ].link}}" target="_blank">{{data[ key ].name}}</a></li>
			<# } #>
		</ul>
	</div>
</script>

<script type="text/template" id="tmpl-astra-sites-no-sites">
	<div class="astra-sites-no-sites">
		<div class="inner">
			<h3><?php esc_html_e( 'Sorry No Result Found.', 'header-footer-elementor' ); ?></h3>
			<div class="content">
				<div class="empty-item">
					<img class="empty-collection-part" src="<?php echo esc_url( 'inc/assets/images/empty-collection.svg' ); ?>" alt="empty-collection">
				</div>
				<div class="description">
					<p>
					<?php
					/* translators: %1$s External Link */
					printf( __( 'Don\'t see a template you would like to import?<br><a target="_blank" href="%1$s">Please Suggest Us!</a>', 'header-footer-elementor' ), esc_url( 'https://wpastra.com/sites-suggestions/?utm_source=demo-import-panel&utm_campaign=astra-sites&utm_medium=suggestions' ) );
					?>
					</p>
					<div class="back-to-layout-button"><span class="button astra-sites-back"><?php esc_html_e( 'Back to Templates', 'header-footer-elementor' ); ?></span></div>
				</div>
			</div>
		</div>
	</div>
	<#
</script>

<script type="text/template" id="tmpl-astra-sites-elementor-preview">
	<#
	let wrap_height = $ehfscope.find( '.ehf-blocks__content-wrap' ).height();
	wrap_height = ( wrap_height - 55 );
	wrap_height = wrap_height + 'px';
	#>
	<div id="astra-blocks" class="themes wp-clearfix" data-site-id="{{data.id}}" style="display: block;">
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

<script type="text/template" id="tmpl-astra-sites-elementor-preview-actions">

	<div class="astra-preview-actions-wrap">
		<div class="astra-preview-actions-inner-wrap">
			<div class="astra-preview-actions">
				<div class="site-action-buttons-wrap">
					<div class="astra-sites-import-template-action site-action-buttons-right">
						<div type="button" class="button button-hero button-primary ast-library-template-insert disabled"><?php esc_html_e( 'Import Block', 'header-footer-elementor' ); ?></div>
						<div type="button" class="button button-hero button-primary ast-import-elementor-template disabled"><?php esc_html_e( 'Save Block', 'header-footer-elementor' ); ?></div>
						<div class="astra-sites-tooltip"><span class="astra-sites-tooltip-icon" data-tip-id="astra-sites-tooltip-plugins-settings"><span class="dashicons dashicons-editor-help"></span></span></div>
					</div>
				</div>
			</div>
			<div class="ast-tooltip-wrap">
				<div>
					<div class="ast-tooltip-inner-wrap" id="astra-sites-tooltip-plugins-settings">
						<ul class="required-plugins-list"><span class="spinner is-active"></span></ul>
					</div>
				</div>
			</div>
		</div>
	</div>
</script>

<?php
