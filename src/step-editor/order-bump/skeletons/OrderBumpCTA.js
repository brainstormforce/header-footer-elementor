import React from 'react';
import { __ } from '@wordpress/i18n';
import UpgradeToProCTA from '@CTA/UpgradeToProCTA';

function OrderBumpCTA() {
	return (
		<>
			<div className="wcf-multiple-order-bumps wcf-multiple-order-bumps-cta">
				<span
					className={ `wcf-accordion-button relative flex justify-between items-center w-full py-4 px-0 text-base font-semibold text-gray-800 text-left transition focus:outline-none` }
				>
					<span className="flex gap-2 items-center">
						<span>{ __( 'Order Bumps', 'cartflows' ) }</span>
						<span className="px-2 py-0.5 text-xs text-primary-600 border border-primary-600 rounded-full ml-2">
							<span>{ 'PRO' }</span>
						</span>
					</span>
				</span>
				<UpgradeToProCTA
					heading={ __(
						'Ready to boost your sales with Order Bumps?',
						'cartflows'
					) }
					subHeading={ __(
						'Upgrading your plan will unlock this feature.',
						'cartflows'
					) }
				/>
			</div>
		</>
	);
}
export default OrderBumpCTA;
