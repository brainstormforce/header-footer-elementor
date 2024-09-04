import React, { useState } from 'react';
import { __ } from '@wordpress/i18n';
import { useHistory } from 'react-router-dom';
import useConfirm from '@Alert/ConfirmDialog';
import { useStateValue } from '@Utils/StateProvider';

import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

// Import step template Icons.
import landingStep from '@Icons/landingstep.svg';
import checkoutStep from '@Icons/checkoutstep.svg';
import upsellStep from '@Icons/upsellstep.svg';
import downsellStep from '@Icons/downsellstep.svg';
import optinStep from '@Icons/optinstep.svg';
import thankYouStep from '@Icons/thankyoustep.svg';

function ChangeTemplate() {
	const [ { step_id, flow_id, step_data } ] = useStateValue();
	const [ collapse, setCollapse ] = useState( 'collapsed' );

	const history = useHistory();
	const confirm = useConfirm();

	const getSTepSVG = function () {
		let stepSVG = '';

		switch ( step_data.type ) {
			case 'landing':
				stepSVG = landingStep;
				break;
			case 'checkout':
				stepSVG = checkoutStep;
				break;
			case 'optin':
				stepSVG = optinStep;
				break;
			case 'thankyou':
				stepSVG = thankYouStep;
				break;
			case 'upsell':
				stepSVG = upsellStep;
				break;
			case 'downsell':
				stepSVG = downsellStep;
				break;
		}

		return stepSVG;
	};

	const handleCollapse = function () {
		if ( 'collapsed' === collapse ) {
			setCollapse( '' );
		} else {
			setCollapse( 'collapsed' );
		}
	};

	const updateTemplate = async function () {
		const isconfirm = await confirm( {
			title: __( 'Update Template', 'cartflows' ),
			description: __(
				'Changing the template will permanently delete the current design in this step. Would you still like to proceed?',
				'cartflows'
			),
			actionBtnText: __( 'Yes', 'cartflows' ),
			cancelBtnText: __( 'No', 'cartflows' ),
		} );
		if ( isconfirm ) {
			history.push(
				`admin.php?page=cartflows&path=store-checkout&action=wcf-edit-flow&flow_id=${ flow_id }step_id=${ step_id }&tab=update-template`
			);
		}
	};

	return (
		<div
			className={ `wcf-change-step-template accordion-item bg-white -mx-8 border-b border-gray-200` }
		>
			<h2
				className="accordion-header mb-0"
				id={ `wcf_change_step_template_toggler` }
			>
				<button
					className={ `wcf-accordion-button relative flex justify-between items-center w-full py-4 px-8 text-base font-semibold text-gray-800 text-left transition focus:outline-none ${ collapse }` }
					type="button"
					data-bs-toggle="collapse"
					data-bs-target={ `#wcf_collapse_change_step_template` }
					aria-expanded="false"
					aria-controls={ `wcf_collapse_change_step_template` }
					onClick={ handleCollapse }
				>
					<span>{ __( 'Change Template', 'cartflows' ) }</span>
					{ '' === collapse ? (
						<ChevronUpIcon
							className="w-5 h-5 text-gray-400"
							aria-hidden="true"
						/>
					) : (
						<ChevronDownIcon
							className="w-5 h-5 text-gray-400"
							aria-hidden="true"
						/>
					) }
				</button>
			</h2>
			<div
				id={ `wcf_collapse_change_step_template` }
				className={ `accordion-collapse px-8 pt-4 pb-8 ${ collapse }` }
				aria-labelledby={ `wcf_change_step_template_toggler` }
			>
				<div className="accordion-body">
					<div className="mb-3 flex items-center gap-4">
						<img
							src={ getSTepSVG() }
							alt={ step_data.type }
							className="rounded-lg  w-[85px] h-[85px]"
						></img>
						<div className="wcf-template-content">
							<div className="wcf-step-template-type mb-3">
								<span className="text-sm font-medium">
									{ __( 'Step Type: ', 'cartflows' ) }
								</span>
								<span className="text-sm font-normal text-gray-500 capitalize">
									{ step_data.type }
								</span>
							</div>
							<div
								className="wcf-change-step wcf-button wcf-secondary-button"
								onClick={ updateTemplate }
							>
								<span className="">
									{ __( 'Update Template', 'cartflows' ) }
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ChangeTemplate;
