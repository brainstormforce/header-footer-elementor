// External.
import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';
import { useState } from 'react';
import { __, sprintf } from '@wordpress/i18n';

import ActivateCartflowsPro from '@Admin/importer/common/ActivateCartflowsPro';
import ActivateWooCommerceButton from '@Admin/importer/common/ActivateWooCommerceButton';
import InstallWooCommerceButton from '@Admin/importer/common/InstallWooCommerceButton';
import UpgradeToCartflowsPro from '@Admin/importer/common/UpgradeToCartflowsPro';
import ActivateCartflowsProLink from '@Admin/importer/common/activate-cartflows-pro-link';
import ErrorPopup from '@Admin/store-importer/store-library/library/error-popup';

const updateStep = (
	currentStep,
	flow_id,
	setImportStepTitle,
	stepName,
	setisStepImporting,
	isStepImporting,
	step_id,
	setVisibility,
	setErrorMessage
) => {
	// Return if the step is importing
	if ( isStepImporting ) {
		return;
	}

	// UI handling.
	setImportStepTitle( 'Changing Template..' );
	setisStepImporting( true );

	const formData = new window.FormData();
	formData.append( 'action', 'cartflows_update_step' );
	formData.append( 'security', cartflows_admin.update_step_nonce );
	formData.append( 'remote_flow_id', currentStep.template_ID );
	formData.append( 'flow_id', flow_id );
	formData.append( 'step_id', step_id );
	formData.append( 'step', JSON.stringify( currentStep ) );
	formData.append( 'step_name', stepName );
	apiFetch( {
		url: cartflows_admin.ajax_url,
		method: 'POST',
		body: formData,
	} ).then( ( response ) => {
		console.log( response );
		if ( response.success ) {
			setisStepImporting( false );
			setImportStepTitle( 'Changed! Redirecting...' );
			setTimeout( () => {
				window.location = `${ cartflows_admin.admin_base_url }admin.php?page=cartflows&path=store-checkout&action=wcf-edit-flow&flow_id=${ flow_id }`;
			}, 3000 );
		} else if ( 'call_to_action' in response.data ) {
			setImportStepTitle( 'Choose' );
			setErrorMessage( response.data.call_to_action );
			setVisibility( 'show' );
		}
	} );
};

const UpdateButton = ( {
	currentStep,
	stepName,
	currentFlowId,
	currentFlowSteps,
	cf_pro_status,
	woocommerce_status,
	stepTypes,
	license_status,
	setInputFieldVisibility,
	step_id,
} ) => {
	const selectedStep = currentStep.type || '';
	const selectedStepTitle =
		currentStep.title || stepTypes[ selectedStep ] || '';
	const [ ImportStepTitle, setImportStepTitle ] = useState( 'Choose' );
	const [ isStepImporting, setisStepImporting ] = useState( false );
	const [ visibility, setVisibility ] = useState( 'hide' );
	const [ errorMessage, setErrorMessage ] = useState( '' );
	// /**
	//  *  CASE:   Is Pro flow?
	//  * 			And, License is not activated?
	//  * 			Then, Show license activation link.
	//  */
	// if ('pro' === currentStep.template_type && 'Activated' !== license_status) {
	// 	return (
	// 		<ActivateCartflowsProLink
	// 			title={`Activate License and ${ImportStepTitle}`}
	// 		/>
	// 	);
	// }

	/**
	 *  CASE:   Selected step is empty?
	 */
	if ( '' === currentStep.type ) {
		return <button className="button disabled">{ ImportStepTitle }</button>;
	}

	// if ( 'pro' === currentStep.template_type && 'active' !== cf_pro_status ) {
	// 	setInputFieldVisibility( 'hidden' );
	// 	return (
	// 		<ActivateCartflowsPro
	// 			description={ `Activate CartFlows Pro for adding more steps and other features.` }
	// 		/>
	// 	);
	// }
	/**
	 * === "Cartflows Pro" plugin dependency. ===
	 *
	 *  CASE:   Any step is selected?
	 * 			And, "Cartflows Pro" is not active?
	 * 			And, Selected step already exist in flow?
	 * 			Then, Show the "Cartflows Pro" install OR activate button.
	 * OR
	 * 			Selected step is "Upsell" or "Downsell"?
	 * 			And, "Cartflows Pro" is not active?
	 * 			Then, Show "Upgrade to Pro" or "Activate Cartflows Pro" button.
	 */
	const selectedExistSteps = currentFlowSteps
		? currentFlowSteps.filter( ( step ) => selectedStep === step.type )
		: [];
	console.log( 'selectedExistSteps.length', selectedExistSteps.length );

	if (
		( 'upsell' === selectedStep || 'downsell' === selectedStep ) &&
		! wcfCartflowsPro()
	) {
		setInputFieldVisibility( 'hidden' );
		if ( ! wcfCartflowsTypePlusPro() ) {
			// "Cartflows Pro" is installed BUT not active?

			if (
				'not-installed' === cf_pro_status &&
				( 'pro' !== cartflows_admin.cf_pro_type ||
					'plus' !== cartflows_admin.cf_pro_type )
			) {
				return (
					<UpgradeToCartflowsPro
						desc={ __(
							`Add unlimited income boosting one-click upsells to your flows when you upgrade to our CartFlows Plus or Pro plan today.`,
							'cartflows'
						) }
						title={ `Get CartFlows Higher plan` }
					/>
				);
			}
			return (
				<ActivateCartflowsPro
					description={ sprintf(
						/* translators: %s is replaced with plugin name */
						__(
							`Add unlimited income boosting one-click upsells to your flows by activating %s`,
							'cartflows'
						),
						cartflows_admin.cf_pro_type_inactive
					) }
				/>
			);

			// "Cartflows Pro" Not installed then navigate upgrade to pro.
		} else if ( 'Activated' !== license_status ) {
			setInputFieldVisibility( 'hidden' );
			/**
			 * "Cartflows Pro" installed but licnese is inactive.
			 */
			return (
				<ActivateCartflowsProLink
					title={ `Activate License and ${ ImportStepTitle }` }
				/>
			);
		}
	}

	if ( 'pro' === currentStep.template_type && ! wcfCartflowsTypePro() ) {
		setInputFieldVisibility( 'hidden' );

		if (
			'not-installed' === cf_pro_status ||
			cartflows_admin.cf_pro_type !== 'pro'
		) {
			setInputFieldVisibility( 'hidden' );
			return (
				<UpgradeToCartflowsPro
					title={ __( 'Get CartFlows Pro', 'cartflows' ) }
					desc={ __(
						'Access all of our pro templates when you upgrade your plan to CartFlows Pro today.',
						'cartflows'
					) }
				/>
			);
		}
		setInputFieldVisibility( 'hidden' );
		return (
			<ActivateCartflowsPro
				description={ sprintf(
					/* translators: %s is replaced with plugin name */
					__(
						`Access all of our pro templates by activating %s`,
						'cartflows'
					),
					cartflows_admin.cf_pro_type_inactive
				) }
			/>
		);
	}
	/**
	 * === "WooCommerce" plugin dependency. ===
	 *
	 *  CASE:   "WooCommerce" is not active?
	 */

	if ( 'landing' !== selectedStep && 'active' !== woocommerce_status ) {
		setInputFieldVisibility( 'hidden' );
		/**
		 * "WooCommerce" is installed BUT not active?
		 */
		if ( 'inactive' === woocommerce_status ) {
			return (
				<ActivateWooCommerceButton
					title={ `Activate WooCommerce to Import ${ selectedStepTitle }` }
					description={ __(
						'You need WooCommerce plugin installed and activated to import this step.',
						'cartflows'
					) }
				/>
			);
		}

		/**
		 * "WooCommerce" Not installed then show install WooCommerce.
		 */
		return <InstallWooCommerceButton />;
	}

	setInputFieldVisibility( '' );
	return (
		<>
			<button
				className="wcf-button wcf-primary-button focus:!ring-0 focus:!outline-none"
				onClick={ ( event ) => {
					// Import the step if clicked only on button.
					if ( 'submit' === event.target.type ) {
						event.preventDefault();

						// Processing import step.
						updateStep(
							currentStep,
							currentFlowId,
							setImportStepTitle,
							stepName,
							setisStepImporting,
							isStepImporting,
							step_id,
							setVisibility,
							setErrorMessage
						);
					}
				} }
			>
				{ ImportStepTitle }
			</button>
			<ErrorPopup
				visibility={ visibility }
				setVisibility={ setVisibility }
				errorMessage={ errorMessage }
			/>
		</>
	);
};

export default compose(
	withSelect( ( select ) => {
		const {
			getFlowsCount,
			getcurrentFlowId,
			getselectedStep,
			getstepTypes,
			getcurrentFlowSteps,
			getCFProStatus,
			getWooCommerceStatus,
			getselectedStepTitle,
			getLicenseStatus,
		} = select( 'wcf/importer' );
		return {
			flowsCount: getFlowsCount(),
			currentFlowId: getcurrentFlowId(),
			selectedStep: getselectedStep(),
			stepTypes: getstepTypes(),
			currentFlowSteps: getcurrentFlowSteps(),
			cf_pro_status: getCFProStatus(),
			woocommerce_status: getWooCommerceStatus(),
			selectedStepTitle: getselectedStepTitle(),
			license_status: getLicenseStatus(),
		};
	} )
)( UpdateButton );
