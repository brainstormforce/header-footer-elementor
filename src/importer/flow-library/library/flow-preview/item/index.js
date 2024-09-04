import { __ } from '@wordpress/i18n';

function PreviewItem( {
	item,
	setPreviewImageURL,
	currentPreviewID,
	setCurrentPreviewID,
} ) {
	const { ID, title, type, thumbnail_image_url, featured_image_url } = item;
	const innerClass = `wcf-item__inner rounded-lg cursor-pointer ${
		currentPreviewID === ID
			? 'wcf-item__inner--active border border-primary-500'
			: ''
	}`;

	return (
		<div className="wcf-item wcf-item--preview mb-8">
			{ 'pro' === type ? (
				<span className={ `wcf-item__type wcf-item__type--${ type }` }>
					{ type }
				</span>
			) : (
				''
			) }

			<div
				className={ innerClass }
				onClick={ () => {
					setPreviewImageURL( featured_image_url );
					setCurrentPreviewID( ID );
				} }
			>
				<div className="wcf-item__thumbnail-wrap">
					<div className="wcf-item__thumbnail max-h-[200px] overflow-hidden">
						<img
							className="wcf-item__thumbnail-image rounded-lg"
							src={ `${ thumbnail_image_url }` }
							alt={ __( 'Funnel thumbnail image', 'cartflows' ) }
						></img>
					</div>
				</div>
				<div className="wcf-item__heading-wrap p-4 bg-white border-t border-gray-200 rounded-bl-lg rounded-br-lg">
					<div className="wcf-item__heading text-gray-800 text-sm font-medium">
						{ title }
					</div>
				</div>
			</div>
		</div>
	);
}

export default PreviewItem;
