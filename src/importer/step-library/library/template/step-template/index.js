// External Dependences.
import { useState } from 'react';
import { __ } from '@wordpress/i18n';
import Popup from '../popup';
import {
	ArrowTopRightOnSquareIcon,
	ArrowDownOnSquareIcon,
} from '@heroicons/react/24/outline';

function StepTemplate( { item } ) {
	const [ visibility, setVisibility ] = useState( 'hide' );
	const [ stepName, setStepName ] = useState( '' );

	return (
		<>
			<div
				key={ item.id }
				className="wcf-template-item group relative transition ease-in-out delay-150"
			>
				{ 'pro' === item.template_type ? (
					<div
						className={ `wcf-item__type wcf-item__type--${ item.template_type } border border-primary-500 text-primary-500 rounded-full bg-white font-medium py-px px-2 text-xs z-10 uppercase absolute top-5 right-5 shadow-custom-2` }
					>
						<span>{ item.template_type }</span>
					</div>
				) : (
					''
				) }

				<div className="wcf-item__inner bg-white border border-gray-200 rounded-lg">
					<div className="wcf-item__thumbnail-wrap relative">
						<div
							className={ `wcf-item__thumbnail overflow-hidden ${
								'upsell' === item.type ||
								'downsell' === item.type
									? `max-h-[345px] min-h-[345px]`
									: `min-h-[400px] max-h-[400px]`
							}` }
						>
							<img
								className="wcf-item__thumbnail-image"
								src={ item.featured_image_url }
								alt={ __(
									'Step thumbnail image',
									'cartflows'
								) }
							/>
						</div>
						<div className="wcf-item__view invisible group-hover:visible absolute backdrop-brightness-50 top-0 w-full h-full transition ease-in-out delay-150">
							<div className="mx-auto my-0 text-center flex flex-col gap-4 relative top-[35%]">
								<Popup
									visibility={ visibility }
									setVisibility={ setVisibility }
									type={ 'ready-templates' }
									stepName={ stepName }
									setStepName={ setStepName }
									item={ item }
								/>
								<span className="wcf-step-preview-wrap">
									<a
										className="wcf-step-preview wcf-button wcf-secondary-button hover:text-primary-600 !border-none"
										href={ item.link }
										target="_blank"
										rel="noreferrer"
									>
										<ArrowTopRightOnSquareIcon className="h-18 w-18 stroke-2" />
										{ __( 'Preview', 'cartflows' ) }
									</a>
								</span>
								<span
									className="wcf-item__btn"
									onClick={ () => {
										setVisibility(
											'hide' === visibility
												? 'show'
												: 'hide'
										);
									} }
								>
									<span className="wcf-button wcf-primary-button">
										<ArrowDownOnSquareIcon className="h-18 w-18 stroke-2" />
										{ __( 'Import', 'cartflows' ) }
									</span>
								</span>
							</div>
						</div>
					</div>

					<div className="wcf-item__heading-wrap border-t border-gray-200">
						<div className="wcf-item__heading text-base text-gray-800 font-medium p-4 text-center">
							{ item.title }
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default StepTemplate;
