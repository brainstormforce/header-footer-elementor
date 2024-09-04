import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { __, sprintf } from '@wordpress/i18n';
import { useStateValue } from '@Utils/StateProvider';
import { useSelect } from '@wordpress/data';
import Creator from '@Admin/store-importer/step-library/creator';
import Template from '@Admin/store-importer/step-library/library/template';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

// SCSS.
// import '@Admin/store-importer/step-library/library/Library.scss';
function SingleStepLibrary() {
	const [ { step_data, page_builder, flow_id, step_id } ] = useStateValue();

	const history = useHistory();
	const newStepTab = 'ready-templates';

	const requiredStep = { [ step_data.type ]: '' };
	const [ currentStep, setcurrentStep ] = useState( step_data.type ); // eslint-disable-line

	const { all_step_templates } = useSelect( ( select ) => {
		return {
			all_step_templates: select( 'wcf/importer' ).getAllStepTemplates(),
		};
	} );

	const stepTemplates = [];
	all_step_templates.forEach( ( element ) => {
		if ( step_data.type === element.type ) {
			stepTemplates.push( element );
		}
	} );

	// Handle back button action and back to flow setting action.
	const backToStepSettings = async function () {
		if ( step_id ) {
			history.push(
				`admin.php?page=cartflows&path=store-checkout&action=wcf-edit-flow&flow_id=${ flow_id }&step_id=${ step_id }`
			);
		} else {
			history.push(
				`admin.php?page=cartflows&path=store-checkout&action=wcf-edit-flow&flow_id=${ flow_id }`
			);
		}
	};

	// Return to flow edit page if step data is not found. Added to add the page reload case.
	if ( 0 === Object.keys( step_data ).length ) {
		backToStepSettings();
	}

	return (
		<div
			className={ `wcf-step-library wcf-step-library-${ page_builder }` }
		>
			<div className="wcf-step-library__header bg-white px-8 py-6 flex justify-between items-center mb-9 -m-8">
				{ 'other' !== page_builder && (
					<>
						<h3 className="flex items-center gap-2 text-2xl font-semibold text-gray-800">
							<ArrowLeftIcon
								className="w-6 h-6 stroke-1 cursor-pointer"
								onClick={ backToStepSettings }
							/>
							{ sprintf(
								/* translators: %s is replaced with the step title */
								__( 'Templates for %s', 'cartflows' ),
								step_data.title
							) }
						</h3>
						<div className="wcf-step-library__step-actions">
							<div className="wcf-tab-wrapper">
								<div className="wcf-get-started-steps"></div>
							</div>
						</div>
					</>
				) }
			</div>

			<div className="wcf-step-library__body">
				<div className="wcf-remote-content">
					{ 'other' !== page_builder && step_data && (
						<>
							<div
								className={ `wcf-ready-templates ${
									'ready-templates' === newStepTab
										? 'current'
										: ''
								}` }
							>
								<Template
									templates={ stepTemplates }
									currentStep={ currentStep }
									required_step_type={ requiredStep }
									currentStepId={ step_data.id }
									setcurrentStepCB={ setcurrentStep }
								/>
							</div>
						</>
					) }
					{ 'other' === page_builder && (
						<>
							<div className="wcf-start-from-scratch current">
								<Creator />
							</div>
						</>
					) }
				</div>
			</div>
		</div>
	);
}

export default SingleStepLibrary;
