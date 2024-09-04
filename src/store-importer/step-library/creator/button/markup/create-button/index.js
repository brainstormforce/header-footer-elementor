// External.
import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
import { useState } from 'react';
import apiFetch from '@wordpress/api-fetch';
import { Spinner } from '@Admin/fields';
import { __ } from '@wordpress/i18n';

const createStep = (
	flow_id,
	step_type,
	stepTitle,
	selfSetState,
	stepName
) => {
	console.log( flow_id, step_type, stepTitle );

	const formData = new window.FormData();
	formData.append( 'action', 'cartflows_create_step' );
	formData.append( 'flow_id', flow_id );
	formData.append( 'step_type', step_type );
	formData.append( 'step_title', stepTitle );
	formData.append( 'security', cartflows_admin.create_step_nonce );
	formData.append( 'step_name', stepName );
	apiFetch( {
		url: cartflows_admin.ajax_url,
		method: 'POST',
		body: formData,
	} ).then( ( response ) => {
		console.log( response );

		// Updated UI.
		selfSetState( {
			isProcessing: false,
			buttonText: __( 'Step Created! Redirecting…', 'cartflows' ),
		} );

		// Redirect.
		if ( response.success ) {
			setTimeout( () => {
				window.location = `${ cartflows_admin.admin_base_url }admin.php?page=cartflows&path=store-checkout&action=wcf-edit-flow&flow_id=${ flow_id }`;
			}, 3000 );
		} else {
			// Updated UI.
			selfSetState( {
				isProcessing: false,
				buttonText: 'Failed to Create Step!',
			} );
		}
	} );
};

const CreateButton = ( {
	currentFlowId,
	selectedStep,
	selectedStepTitle,
	stepName,
} ) => {
	const [ selfState, selfSetState ] = useState( {
		isProcessing: false,
		buttonText: 'Create Step',
	} );
	const { isProcessing, buttonText } = selfState;

	return (
		<button
			className={ `wcf-button ${
				! isProcessing ? 'wcf-primary-button' : 'wcf-disabled'
			}` }
			onClick={ ( event ) => {
				event.preventDefault();

				// Return if processing previous request.
				if ( isProcessing ) {
					return;
				}
				// Updated UI.
				selfSetState( {
					isProcessing: true,
					buttonText: __( 'Creating Step..', 'cartflows' ),
				} );

				// Creating step.
				createStep(
					currentFlowId,
					selectedStep,
					selectedStepTitle,
					selfSetState,
					stepName
				);
			} }
		>
			{ isProcessing ? <Spinner /> : '' } { buttonText }
		</button>
	);
};

export default compose(
	withSelect( ( select ) => {
		const { getcurrentFlowId, getselectedStep, getselectedStepTitle } =
			select( 'wcf/importer' );
		return {
			currentFlowId: getcurrentFlowId(),
			selectedStep: getselectedStep(),
			selectedStepTitle: getselectedStepTitle(),
		};
	} )
)( CreateButton );
