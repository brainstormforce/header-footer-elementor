// External.
import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';

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
	if (
		selectedExistSteps.length ||
		'upsell' === selectedStep ||
		'downsell' === selectedStep
	) {
		if ( 'active' !== cf_pro_status ) {
			/**
			 * "Cartflows Pro" is installed BUT not active?
			 */
			if ( 'inactive' === cf_pro_status ) {
				return (
					<div className="wcf-create-step__notice">
						<p>
							Activate CartFlows Pro for adding more steps and
							other features.
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
						Upgrade to CartFlows Pro for adding more steps and other
						features.
						<a
							target="_blank"
							href={ cartflows_admin.cf_upgrade_to_pro_url }
							rel="noreferrer"
						>
							Click here to upgrade
						</a>
					</p>
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
		/**
		 * "WooCommerce" is installed BUT not active?
		 */
		if ( 'inactive' === woocommerce_status ) {
			return (
				<div className="wcf-create-step__notice">
					<p>
						Activate WooCommerce for adding more steps and other
						features.
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
					Install and activate WooCommerce for adding more steps and
					other features.
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
