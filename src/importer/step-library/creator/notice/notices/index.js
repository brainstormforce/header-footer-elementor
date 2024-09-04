// External.
import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
import { __, sprintf } from '@wordpress/i18n';
const Notices = ( {
	selectedStep,
	currentFlowSteps,
	cf_pro_status,
	woocommerce_status,
} ) => {
	// ## Create
	// - DONE - Empty selected step.
	// - WIP  - Create only one step per flow if using CartFlows Free plugin.
	// - DONE - Checkout, Thank you, Optin, Upsell, & Downsell: Install & Activate Woo
	// - DONE - If Woo is installed & CartFlows Pro is not installed. Upsell & Downsell: Upgrade to Pro

	/**
	 *  CASE:   Selected step is empty?
	 */
	if ( '' === selectedStep ) {
		return '';
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
	if ( selectedExistSteps.length && ! wcfCartflowsPro() ) {
		/**
		 * "Cartflows Pro" is installed BUT not active?
		 */
		if ( 'inactive' === cf_pro_status ) {
			return (
				<div className="wcf-create-step__notice">
					<p>
						{ sprintf(
							/* translators: %s is replaced with plugin name */
							__(
								`Add multiple steps to your flows by activating %s.`,
								'cartflows'
							),
							cartflows_admin.cf_pro_type_inactive
						) }
					</p>
				</div>
			);
		}

		/**
		 * "Cartflows Pro" Not installed then navigate upgrade to pro.
		 */
		return (
			<div className="wcf-create-step__notice">
				<p>
					{ __(
						'Add multiple steps to your flows today with an upgraded CartFlows plan.',
						'cartflows'
					) }
				</p>
			</div>
		);
	}

	if ( 'upsell' === selectedStep || 'downsell' === selectedStep ) {
		if ( ! wcfCartflowsTypePlusPro() ) {
			return (
				<div className="wcf-create-step__notice">
					<p>
						{ sprintf(
							/* translators: %s is replaced with the step type */
							__(
								'Add %s step to your flows today with an upgraded CartFlows plan.',
								'cartflows'
							),
							selectedStep
						) }
					</p>
				</div>
			);
		}

		return (
			<div className="wcf-create-step__notice">
				<p>
					{ sprintf(
						/* translators: %1$s, %2$s ae variables */
						__(
							'Add %1$s step to your flows by activating %2$s.',
							'cartflows'
						),
						selectedStep,
						cartflows_admin.cf_pro_type_inactive
					) }
				</p>
			</div>
		);
		// }
	}

	/**
	 * === "WooCommerce" plugin dependency. ===
	 *
	 *  CASE:   "WooCommerce" is not active?
	 */
	if ( 'landing' !== selectedStep && 'active' !== woocommerce_status ) {
		/**
		 * "WooCommerce" is installed BUT not active?
		 */
		if ( 'inactive' === woocommerce_status ) {
			return (
				<div className="wcf-create-step__notice">
					<p>
						{ __(
							'Activate WooCommerce for adding more steps and other features.',
							'cartflows'
						) }
					</p>
				</div>
			);
		}

		/**
		 * "WooCommerce" Not installed then show install WooCommerce.
		 */
		return (
			<div className="wcf-create-step__notice">
				<p>
					{ __(
						'Install and activate WooCommerce for adding more steps and other features.',
						'cartflows'
					) }
				</p>
			</div>
		);
	}

	return '';
};

export default compose(
	withSelect( ( select ) => {
		const {
			getselectedStep,
			getcurrentFlowSteps,
			getCFProStatus,
			getWooCommerceStatus,
		} = select( 'wcf/importer' );
		return {
			selectedStep: getselectedStep(),
			currentFlowSteps: getcurrentFlowSteps(),
			cf_pro_status: getCFProStatus(),
			woocommerce_status: getWooCommerceStatus(),
		};
	} )
)( Notices );
