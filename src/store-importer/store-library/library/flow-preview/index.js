// External Dependences.
import { __ } from '@wordpress/i18n';
import { useState, Fragment } from 'react';
import { compose } from '@wordpress/compose';
import { withSelect, withDispatch } from '@wordpress/data';
import ImportFlow from './import-flow';
import {
	ArrowSmallLeftIcon,
	ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline';

// Internal Dependences.
import PreviewItem from './item';

function FlowPreview( { preview, setPreview } ) {
	const { featured_image_url, steps } = preview;
	const previewUrl =
		cartflows_admin.template_library_url + 'preview/?flow=' + preview.ID;
	const items = [];
	Object.values( steps ).forEach( function ( item ) {
		if ( [ 'checkout', 'thankyou' ].includes( item.type ) ) {
			items.push( item );
		}
	} );
	const firstChildID = items.length ? items[ 0 ].ID : '';
	const [ previewImageUrl, setPreviewImageURL ] =
		useState( featured_image_url );
	const [ currentPreviewID, setCurrentPreviewID ] = useState( firstChildID );
	const [ inputFieldVisibility, setInputFieldVisibility ] = useState( '' );
	window.scrollTo( 0, 0 );
	return (
		<Fragment>
			<div className="wcf-flow-preview-wrap mx-24">
				<div className="wcf-flow-preview--header flex justify-between items-center mb-8 px-6">
					<div className="wcf-flow-preview--left-section flex justify-between items-center gap-4">
						<span
							className="wcf-button--back cursor-pointer"
							onClick={ () => setPreview( {} ) }
						>
							<ArrowSmallLeftIcon className="w-6 h-6 stroke-2 text-gray-400" />
							<span className="wcf-flows-header__text sr-only">
								{ ' ' }
								{ __( 'Back', 'cartflows' ) }{ ' ' }
							</span>
						</span>
						<h3 className="text-2xl text-gray-800 font-semibold">
							{ __( 'Funnel Preview', 'cartflows' ) }
						</h3>
					</div>

					<div className="wcf-flow-preview--right-section">
						<div className="wcf-flow-preview__actions flex justify-between items-center gap-4">
							<a
								className="wcf-button wcf-secondary-button"
								href={ previewUrl }
								target="_blank"
								rel="noreferrer"
							>
								<ArrowTopRightOnSquareIcon className="w-18 h-18 stroke-2" />
								{ __( 'Live Preview', 'cartflows' ) }
							</a>
							<ImportFlow
								preview={ preview }
								flowName={ __( 'Store Checkout', 'cartflows' ) }
								inputFieldVisibility={ inputFieldVisibility }
								setInputFieldVisibility={
									setInputFieldVisibility
								}
								isStoreCheckout={ true }
							/>
						</div>
					</div>
				</div>

				<div className="wcf-flow-preview flex">
					<div className="wcf-flow-preview__item w-4/5 px-6">
						<div className="wcf-window--header bg-white p-2 flex items-center rounded-tl-lg rounded-tr-lg">
							<div className="wcf-window--buttons flex justify-start gap-1 items-center w-2/4">
								<span className="bg-gray-200 rounded-full p-1"></span>
								<span className="bg-gray-200 rounded-full p-1"></span>
								<span className="bg-gray-200 rounded-full p-1"></span>
							</div>
							<div className="wcf-window--title capitalize text-xs font-medium text-gray-600 w-2/4">
								{ `${
									items.find(
										( item ) => item.ID === currentPreviewID
									).type
								} Page` }
							</div>
						</div>
						<div className="wcf-flow-preview__inner max-h-screen overflow-y-scroll">
							<div className="wcf-flow-preview__thumbnail-wrap">
								<img
									className="wcf-flow-preview__thumbnail"
									src={ previewImageUrl }
									alt={ __( 'Funnel Preview', 'cartflows' ) }
								/>
							</div>
						</div>
					</div>

					<div className="wcf-flow-preview__list w-[20%] px-6">
						{ items.map( ( item ) => (
							<PreviewItem
								key={ item.ID }
								item={ item }
								setPreviewImageURL={ setPreviewImageURL }
								currentPreviewID={ currentPreviewID }
								setCurrentPreviewID={ setCurrentPreviewID }
							/>
						) ) }
					</div>
				</div>
			</div>
		</Fragment>
	);
}

export default compose(
	withSelect( ( select ) => {
		const { getPreview } = select( 'wcf/importer' );
		return {
			preview: getPreview(),
		};
	} ),
	withDispatch( ( dispatch ) => {
		const { setPreview } = dispatch( 'wcf/importer' );
		return {
			setPreview,
		};
	} )
)( FlowPreview );
