// External.
import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';
import { useState } from 'react';
import { __, sprintf } from '@wordpress/i18n';
import ReactHtmlParser from 'react-html-parser';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { Spinner } from '@Admin/fields';

import ActivateCartflowsPro from '@Admin/importer/common/ActivateCartflowsPro';
import ActivateWooCommerceButton from '@Admin/importer/common/ActivateWooCommerceButton';
import InstallWooCommerceButton from '@Admin/importer/common/InstallWooCommerceButton';
import UpgradeToCartflowsPro from '@Admin/importer/common/UpgradeToCartflowsPro';
import ActivateCartflowsProLink from '@Admin/importer/common/activate-cartflows-pro-link';

const importStep = (
	currentStep,
	flow_id,
	setImportStepTitle,
	stepName,
	setisStepImporting,
	isStepImporting,
	setError,
	setErrorDesc
) => {
	console.log( currentStep, flow_id, setImportStepTitle );

	// Return if the step is importing
	if ( isStepImporting ) {
		return;
	}

	// UI handaling.
	setImportStepTitle( __( 'Importing Step..', 'cartflows' ) );
	setisStepImporting( true );

	const formData = new window.FormData();
	formData.append( 'action', 'cartflows_import_step' );
	formData.append( 'security', cartflows_admin.import_step_nonce );
	formData.append( 'remote_flow_id', currentStep.template_ID );
	formData.append( 'flow_id', flow_id );
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
			setImportStepTitle( __( 'Imported! Redirecting…', 'cartflows' ) );
			setTimeout( () => {
				window.location = `${ cartflows_admin.admin_base_url }admin.php?page=cartflows&path=store-checkout&action=wcf-edit-flow&flow_id=${ flow_id }`;
			}, 3000 );
		} else if ( 'call_to_action' in response.data ) {
			setError( {
				cta: response.data.call_to_action,
			} );
			setErrorDesc( response.data.message );
		} else {
			let error_message = response.data.message;

			if (
				response.data.error_code &&
				404 === response.data.error_code
			) {
				error_message =
					error_message +
					__(
						' Please sync the library and try importing the template again.',
						'cartflows'
					);
			}

			setErrorDesc( ReactHtmlParser( error_message ) );
			setImportStepTitle(
				__( 'Import Failed! Try again.', 'cartflows' )
			);

			setTimeout( () => {
				setImportStepTitle( __( 'Import Step', 'cartflows' ) );
			}, 3000 );

			setisStepImporting( false );
		}
	} );
};

const ImportButton = ( {
	currentStep,
	stepName,
	currentFlowId,
	currentFlowSteps,
	cf_pro_status,
	woocommerce_status,
	stepTypes,
	license_status,
	setInputFieldVisibility,
	setErrorDesc,
} ) => {
	const selectedStep = currentStep.type || '';
	const selectedStepTitle =
		currentStep.title || stepTypes[ selectedStep ] || '';
	const [ ImportStepTitle, setImportStepTitle ] = useState( 'Import Step' );
	const [ isStepImporting, setisStepImporting ] = useState( false );
	const [ error, setError ] = useState( {
		cta: '',
		error_msg: '',
	} );

	const { cta } = error;

	/**
	 * Have any error?
	 */
	if ( cta ) {
		return (
			<>
				<span
					className="wcf-message wcf-message--error"
					dangerouslySetInnerHTML={ { __html: cta } }
				/>
			</>
		);
	}

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

	if ( 1 <= selectedExistSteps.length && ! wcfCartflowsPro() ) {
		setInputFieldVisibility( 'hidden' );
		setErrorDesc(
			__(
				'Add multiple steps to your flows today with an upgraded CartFlows plan.',
				'cartflows'
			)
		);
		if ( 'not-installed' === cf_pro_status ) {
			return (
				<UpgradeToCartflowsPro
					title={ __( 'Get CartFlows Higher plan', 'cartflows' ) }
				/>
			);
		}

		setErrorDesc(
			sprintf(
				/* translators: %s is replaced with plugin name */
				__(
					`Add multiple steps to your flows by activating %s.`,
					'cartflows'
				),
				cartflows_admin.cf_pro_type_inactive
			)
		);
		return <ActivateCartflowsPro />;
	}

	if ( 'upsell' === selectedStep || 'downsell' === selectedStep ) {
		setInputFieldVisibility( 'hidden' );

		if ( ! wcfCartflowsTypePlusPro() ) {
			if ( wcfInactiveProPlus() ) {
				setErrorDesc(
					sprintf(
						/* translators: %1$s, %2$s are variables */
						__(
							`Add %1$s step to your flows by activating %2$s.`,
							'cartflows'
						),
						selectedStep,
						cartflows_admin.cf_pro_type_inactive
					)
				);
				return <ActivateCartflowsPro />;
			}
			// "Cartflows Pro" is installed BUT not active?

			setErrorDesc(
				sprintf(
					/* translators: %s is replaced with plugin name */
					__(
						`Add unlimited income boosting one-click %s to your flows when you upgrade to our CartFlows Higher plan today.`,
						'cartflows'
					),
					selectedStep
				)
			);
			return (
				<UpgradeToCartflowsPro
					title={ __( `Get CartFlows Higher Plan`, 'cartflows' ) }
				/>
			);

			// "Cartflows Pro" Not installed then navigate upgrade to pro.
		} else if ( 'Activated' !== license_status ) {
			setInputFieldVisibility( 'hidden' );
			setErrorDesc(
				__(
					'Activate license for adding more flows and other features.',
					'cartflows'
				)
			);
			/**
			 * "Cartflows Pro" installed but licnese is inactive.
			 */
			return (
				<div className="wcf-name-your-flow__actions wcf-pro--required">
					<div className="wcf-flow-import__button">
						<ActivateCartflowsProLink
							title={ `Activate License and ${ ImportStepTitle }` }
						/>
					</div>
				</div>
			);
		}
	}

	if ( 'pro' === currentStep.template_type && ! wcfCartflowsTypePro() ) {
		setInputFieldVisibility( 'hidden' );

		if (
			'inactive' === cf_pro_status &&
			'pro' === wcfInactivepluginType()
		) {
			setInputFieldVisibility( 'hidden' );
			setErrorDesc(
				sprintf(
					/* translators: %s is replaced with plugin name */
					__(
						`Access all of our pro templates by activating %s.`,
						'cartflows'
					),
					cartflows_admin.cf_pro_type_inactive
				)
			);
			return <ActivateCartflowsPro />;
		}

		setInputFieldVisibility( 'hidden' );
		setErrorDesc(
			__(
				'Access all of our pro templates when you upgrade your plan to CartFlows Pro today.',
				'cartflows'
			)
		);
		return (
			<UpgradeToCartflowsPro
				title={ __( 'Get CartFlows Pro', 'cartflows' ) }
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
			setErrorDesc(
				__(
					'You need WooCommerce plugin installed and activated to import this step.',
					'cartflows'
				)
			);
			return (
				<ActivateWooCommerceButton
					title={ `Activate WooCommerce to Import ${ selectedStepTitle }` }
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
		<button
			className={ `wcf-button wcf-primary-button ${
				isStepImporting ? 'wcf-disabled' : ''
			}` }
			onClick={ ( event ) => {
				// Import the step if clicked only on button.
				if ( 'submit' === event.target.type ) {
					event.preventDefault();

					// Processing import step.
					importStep(
						currentStep,
						currentFlowId,
						setImportStepTitle,
						stepName,
						setisStepImporting,
						isStepImporting,
						setError,
						setErrorDesc
					);
				}
			} }
		>
			{ ! isStepImporting ? (
				<ArrowDownTrayIcon className={ 'h-4 w-4 stroke-2' } />
			) : (
				<Spinner />
			) }

			{ ImportStepTitle }
		</button>
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
)( ImportButton );
