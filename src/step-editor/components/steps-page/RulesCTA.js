import React from 'react';
import { __ } from '@wordpress/i18n';
import UpgradeToProCTA from '@CTA/UpgradeToProCTA';

function RulesCTA() {
	return (
		<>
			<div className="wcf-checkout-rules-page-cta">
				<div className="wcf-checkout-rules-page">
					<span
						className={ `wcf-accordion-button relative flex justify-between items-center w-full py-4 px-0 text-base font-semibold text-gray-800 text-left transition focus:outline-none` }
					>
						<span className="flex gap-2 items-center">
							<span>
								{ __( 'Dynamic Conditions', 'cartflows' ) }
							</span>
							<span className="px-2 py-0.5 text-xs text-primary-600 border border-primary-600 rounded-full ml-2">
								<span>{ 'PRO' }</span>
							</span>
						</span>
					</span>
					<UpgradeToProCTA
						buttonLink={ getUpgradeToProUrl(
							'utm_source=dashboard&utm_medium=free-cartflows&utm_campaign=dynamic-offers-cta'
						) }
						heading={ __(
							'Ready to boost your sales with Dynamic Conditions?',
							'cartflows'
						) }
						subHeading={ __(
							'Upgrading your plan will unlock this feature.',
							'cartflows'
						) }
					/>
				</div>
			</div>
		</>
	);
}

export default RulesCTA;
