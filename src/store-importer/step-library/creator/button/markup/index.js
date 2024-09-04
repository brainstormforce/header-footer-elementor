// External.
import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
import { sprintf, __ } from '@wordpress/i18n';
import CreateButton from './create-button';

import ActivateWooCommerceButton from '@Admin/importer/common/ActivateWooCommerceButton';
import InstallWooCommerceButton from '@Admin/importer/common/InstallWooCommerceButton';
import UpgradeToCartflowsPro from '@Admin/importer/common/UpgradeToCartflowsPro';
import ActivateCartflowsPro from '@Admin/importer/common/ActivateCartflowsPro';
import ActivateCartflowsProLink from '@Admin/importer/common/activate-cartflows-pro-link';

const Markup = ( {
	selectedStep,
	currentFlowSteps,
	cf_pro_status,
	woocommerce_status,
	license_status,
	stepName,
	setInputFieldVisibility,
	setErrorDesc,
} ) => {
	/**
	 *  CASE:   Selected step is empty?
	 */
	if ( '' === selectedStep ) {
		return (
			<button className="wcf-button wcf-primary-button" disabled>
				{ __( 'Create Step', 'cartflows' ) }
			</button>
		);
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
				`Add multiple steps to your flows today with an upgraded CartFlows plan.`,
				'cartflows'
			)
		);

		if ( 'not-installed' === cf_pro_status ) {
			return (
				<UpgradeToCartflowsPro
					title={ __( 'Get CartFlows Higher Plan', 'cartflows' ) }
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
		if ( ! wcfCartflowsTypePlusPro() ) {
			if ( wcfInactiveProPlus() ) {
				setInputFieldVisibility( 'hidden' );
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

			setInputFieldVisibility( 'hidden' );
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
			// Not installed then show upgrade button.
			return (
				<UpgradeToCartflowsPro
					title={ __( `Get CartFlows Higher Plan`, 'cartflows' ) }
				/>
			);
		} else if (
			wcfCartflowsTypePlusPro() &&
			'Activated' !== license_status
		) {
			setInputFieldVisibility( 'hidden' );
			setErrorDesc(
				__(
					'Activate license for adding more steps and other features.',
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
							title={ __( 'Activate License', 'cartflows' ) }
						/>
					</div>
				</div>
			);
		}
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
			return <ActivateWooCommerceButton />;
		}

		/**
		 * "WooCommerce" Not installed then show install WooCommerce.
		 */
		return <InstallWooCommerceButton />;
	}
	setInputFieldVisibility( '' );
	return <CreateButton stepName={ stepName } />;
};

export default compose(
	withSelect( ( select ) => {
		const {
			getFlowsCount,
			getselectedStep,
			getstepTypes,
			getcurrentFlowSteps,
			getCFProStatus,
			getWooCommerceStatus,
			getLicenseStatus,
		} = select( 'wcf/importer' );
		return {
			flowsCount: getFlowsCount(),
			selectedStep: getselectedStep(),
			stepTypes: getstepTypes(),
			currentFlowSteps: getcurrentFlowSteps(),
			cf_pro_status: getCFProStatus(),
			woocommerce_status: getWooCommerceStatus(),
			license_status: getLicenseStatus(),
		};
	} )
)( Markup );
