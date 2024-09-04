// External.
import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
import apiFetch from '@wordpress/api-fetch';
import { useState } from 'react';
import { __, sprintf } from '@wordpress/i18n';
import ReactHtmlParser from 'react-html-parser';
import { ArrowDownTrayIcon } from '@heroicons/react/24/outline';
import { Spinner } from '@Admin/fields';

import ActivateCartflowsPro from '../../../../common/ActivateCartflowsPro';
import ActivateWooCommerceButton from '../../../../common/ActivateWooCommerceButton';
import InstallWooCommerceButton from '../../../../common/InstallWooCommerceButton';
import UpgradeToCartflowsPro from '../../../../common/UpgradeToCartflowsPro';
import ActivateCartflowsProLink from '../../../../common/activate-cartflows-pro-link';

const importStep = (
	currentStep,
	flow_id,
	setImportStepTitle,
	stepName,
	setisStepImporting,
	isStepImporting,
	setErrorDesc
) => {
	console.log( currentStep, flow_id, setImportStepTitle );

	// Return if the step is importing
	if ( isStepImporting ) {
		return;
	}

	// UI handaling.
	setImportStepTitle( 'Importing Step..' );
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
			setImportStepTitle( __( 'Imported! Redirecting…', 'cartflows' ) );
			setisStepImporting( false );
			setTimeout( () => {
				window.location = `${ cartflows_admin.admin_base_url }admin.php?page=cartflows&path=flows&action=wcf-edit-flow&flow_id=${ flow_id }`;
			}, 3000 );
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
	const [ ImportStepTitle, setImportStepTitle ] = useState(
		__( 'Import Step', 'cartflows' )
	);
	const [ isStepImporting, setisStepImporting ] = useState( false );

	/**
	 *  CASE:   Selected step is empty?
	 */
	if ( '' === currentStep.type ) {
		return <button className="button disabled">{ ImportStepTitle }</button>;
	}

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
					title={ __( 'Get CartFlows Higher Plan', 'cartflows' ) }
					desc={ __(
						'Add multiple steps to your flows today with an upgraded CartFlows plan.',
						'cartflows'
					) }
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

		return (
			<ActivateCartflowsPro
				description={ sprintf(
					/* translators: %s is replaced with plugin name */
					__(
						`Add multiple steps to your flows by activating %s.`,
						'cartflows'
					),
					cartflows_admin.cf_pro_type_inactive
				) }
			/>
		);
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
				return (
					<ActivateCartflowsPro
						description={ sprintf(
							/* translators: %1$s, %2$s are variables */
							__(
								`Add %1$s step to your flows by activating %2$s.`,
								'cartflows'
							),
							selectedStep,
							cartflows_admin.cf_pro_type_inactive
						) }
					/>
				);
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
					desc={ sprintf(
						/* translators: %s is replaced with plugin name */
						__(
							`Add unlimited income boosting one-click %s to your flows when you upgrade to our CartFlows Higher plan today.`,
							'cartflows'
						),
						selectedStep
					) }
					title={ `Get CartFlows Higher Plan` }
				/>
			);

			// "Cartflows Pro" Not installed then navigate upgrade to pro.
		} else if ( 'Activated' !== license_status ) {
			setErrorDesc(
				sprintf(
					/* translators: %1$s, %2$s are variables */
					__(
						`Add %1$s step to your flow by activating CartFlows license.`,
						'cartflows'
					),
					selectedStep
				)
			);
			setInputFieldVisibility( 'hidden' );
			/**
			 * "Cartflows Pro" installed but licnese is inactive.
			 */
			return (
				<div className="wcf-name-your-flow__actions wcf-pro--required">
					<div className="wcf-flow-import__button">
						<ActivateCartflowsProLink
							title={ `Activate License` }
						/>
					</div>
				</div>
			);
		}
	}

	if ( 'pro' === currentStep.template_type ) {
		if ( ! wcfCartflowsTypePro() ) {
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
				return (
					<ActivateCartflowsPro
						description={ sprintf(
							/* translators: %s is replaced with plugin name */
							__(
								`Access all of our pro templates by activating %s.`,
								'cartflows'
							),
							cartflows_admin.cf_pro_type_inactive
						) }
					/>
				);
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
					desc={ __(
						'Access all of our pro templates when you upgrade your plan to CartFlows Pro today.',
						'cartflows'
					) }
				/>
			);
		} else if ( wcfCartflowsTypePro() && 'Activated' !== license_status ) {
			setInputFieldVisibility( 'hidden' );
			setErrorDesc(
				sprintf(
					/* translators: %1$s, %2$s are variables */
					__(
						`Add %1$s step to your flows by activating license.`,
						'cartflows'
					),
					selectedStep
				)
			);
			return <ActivateCartflowsProLink title={ `Activate License` } />;
		}
	}

	/**
	 * === "WooCommerce" plugin dependency. ===
	 *
	 *  CASE:   "WooCommerce" is not active?
	 */

	if ( 'landing' !== selectedStep && 'active' !== woocommerce_status ) {
		setInputFieldVisibility( 'hidden' );
		setErrorDesc(
			__(
				'You need WooCommerce plugin installed and activated to import this step.',
				'cartflows'
			)
		);

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
