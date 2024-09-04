// import Notice from './notice';
import SelectStep from './select-step';
import React, { useState } from 'react';
import { __ } from '@wordpress/i18n';

import Popup from '../library/template/popup';
import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
import {
	ArrowTopRightOnSquareIcon,
	PlusIcon,
} from '@heroicons/react/24/outline';

const Creator = ( { selectedStep } ) => {
	const [ visibility, setVisibility ] = useState( 'hide' );
	const [ stepName, setStepName ] = useState( '' );
	return (
		<div className="wcf-step-library--item wcf-step-library--item__start-scratch h-full bg-white rounded-lg relative">
			<div className="wcf-step-library--item--scratch-select text-center h-full min-h-[400px] max-h-[400px] flex flex-col gap-4 items-center justify-center">
				<h3 className="text-base text-gray-800 p-4 text-center font-medium">
					{ __( 'Select Step Type', 'cartflows' ) }
				</h3>
				{ /* <Notice /> */ }
				<SelectStep />

				<Popup
					visibility={ visibility }
					setVisibility={ setVisibility }
					type={ 'create-your-own' }
					stepName={ stepName }
					setStepName={ setStepName }
				/>
				<button
					className={ `wcf-button wcf-primary-button ${
						'' === selectedStep
							? 'disabled opacity-50 pointer-events-none'
							: ''
					}` }
					onClick={ () => {
						setVisibility(
							'hide' === visibility ? 'show' : 'hide'
						);
					} }
					disabled={ '' === selectedStep ? true : false }
				>
					<PlusIcon className="h-18 w-18 stroke-2" />
					{ __( 'Create Step', 'cartflows' ) }
				</button>

				<div className="wcf-learn-how">
					<a
						href={ `${ cartflows_admin.cf_domain_url }/docs/cartflows-step-types/` }
						target="_blank"
						rel="noreferrer"
						className="flex gap-2 text-gray-400 hover:text-primary-500"
					>
						<ArrowTopRightOnSquareIcon className="h-18 w-18 stroke-1" />
						{ __( 'Learn How', 'cartflows' ) }
					</a>
				</div>
			</div>
			<div className="wcf-item__heading-wrap border-t border-gray-200 absolute bottom-0 w-full">
				<div className="wcf-item__heading text-base text-gray-800 font-medium p-4 text-center">
					{ __( 'Create from Scratch', 'cartflows' ) }
				</div>
			</div>
		</div>
	);
};

export default compose(
	withSelect( ( select ) => {
		const { getselectedStep } = select( 'wcf/importer' );
		return {
			selectedStep: getselectedStep(),
		};
	} )
)( Creator );
