import React, { useState } from 'react';
import { __ } from '@wordpress/i18n';
import {
	ArrowTopRightOnSquareIcon,
	PlusIcon,
} from '@heroicons/react/24/outline';
import './Search404.scss';
import FlowNamePopup from '@Admin/store-importer/store-library/library/store-checkout-name-popup';

const Search404 = () => {
	const [ visibility, setVisibility ] = useState( 'hide' );
	const [ flowName, setFlowName ] = useState( '' );

	return (
		<div className="wcf-flow-library-importer wcf-flow-library--other">
			<div className="wcf-flow-library-importer__list bg-white px-10 py-14">
				<FlowNamePopup
					visibility={ visibility }
					setVisibility={ setVisibility }
					type={ 'blank' }
					flowName={ flowName }
					setFlowName={ setFlowName }
				/>
				<div className="wcf-item wcf-item--start-from-blank flex gap-6 mx-auto max-w-4xl">
					<div
						className="wcf-item__inner relative cursor-pointer group bg-gray-25 p-5 text-center flex flex-col border border-gray-200 hover:border-primary-300 rounded-md items-center justify-center h-72 w-2/3"
						onClick={ () => {
							setVisibility(
								'hide' === visibility ? 'show' : 'hide'
							);
						} }
					>
						<div className="wcf-item__thumbnail-wrap">
							<div className="wcf-item__thumbnail">
								<div className="wcf-flow-importer__start-from-blank-icon bg-white p-6 rounded-full">
									<PlusIcon className="w-7 h-7 stroke-1 text-gray-400 group-hover:text-primary-300" />
								</div>
							</div>
						</div>

						<div className="wcf-item__heading-wrap border-t border-gray-200 absolute bottom-0 w-full">
							<div className="wcf-item__heading text-base text-gray-800 font-medium p-4 text-center">
								{ __( 'Start from scratch', 'cartflows' ) }
							</div>
						</div>
					</div>
					<div className="wcf_item__info flex flex-col gap-6 justify-center w-3/4">
						<h3 className="wcf_item__info--title text-2xl text-gray-800 font-semibold">
							<h3 className="wcf_item__info--title">
								{ __( 'No Results Found.', 'cartflows' ) }
							</h3>
						</h3>
						<span className="wcf_item__info--desc text-base text-gray-600 font-normal mt-2">
							{ __(
								"Don't see a funnel that you would like to import?",
								'cartflows'
							) }
						</span>
						<a
							className="wcf_item__info--doc text-sm text-gray-600 font-normal hover:text-primary-300 flex gap-1"
							href="https://cartflows.com/funnel-suggestions/"
							target="_blank"
							rel="noreferrer"
						>
							{ __( 'Please suggest us ', 'cartflows' ) }
							<ArrowTopRightOnSquareIcon className="w-5 h-5 stroke-1 text-gray-400 hover:text-primary-300" />
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Search404;
