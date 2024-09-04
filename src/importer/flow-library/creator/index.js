import React, { useState } from 'react';
import { __ } from '@wordpress/i18n';

// import './creator.scss';
import FlowNamePopup from '@Admin/importer/flow-library/library/flow-name-popup';
import {
	ArrowTopRightOnSquareIcon,
	PlusIcon,
} from '@heroicons/react/24/outline';

const Creator = () => {
	const [ visibility, setVisibility ] = useState( 'hide' );
	const [ flowName, setFlowName ] = useState( '' );

	return (
		<div className="wcf-flow-library-importer wcf-flow-library--other">
			<div className="wcf-flow-library-importer__header bg-white px-8 py-6 flex justify-between items-center border-b border-gray-200">
				<h3 className="wcf-flow-importer__header-title text-2xl font-semibold text-gray-800">
					{ __( 'Start from Scratch', 'cartflows' ) }
				</h3>
			</div>

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
							{ __(
								'It seems that you are using the page builder other than Elementor, Beaver Builder, Block Builder.',
								'cartflows'
							) }
						</h3>
						<span className="wcf_item__info--desc text-base text-gray-600 font-normal mt-2">
							{ __(
								'Are you using any other page builder? No worries. CartFlows works well with every other page builder. Right now we do not have ready templates for every page builder but we are planning to add it very soon.',
								'cartflows'
							) }
						</span>
						<span className="mt-2">
							<a
								className="wcf_item__info--doc text-gray-600 hover:text-primary-500 flex items-center gap-2 text-sm"
								href="https://cartflows.com/docs/how-to-use-cartflows-with-your-own-template/?utm_source=dashboard&utm_medium=free-cartflows&utm_campaign=docs"
								target="_blank"
								rel="noreferrer"
							>
								{ __( 'Learn How ', 'cartflows' ) }
								<ArrowTopRightOnSquareIcon className="w-18 h-18 stroke-1" />
							</a>
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Creator;
