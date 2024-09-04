import React from 'react';
import { useStateValue } from '@Utils/StateProvider';

import OfferListOptions from '@StepEditor/components/page-settings/OfferListOptions';
import ProductSelectionSkeleton from '@StepEditor/components/steps-page/ProductSelectionSkeleton';

function OptinProductSelection() {
	const [ { settings_data, page_settings } ] = useStateValue();

	if ( 'undefined' === typeof settings_data.settings ) {
		return <ProductSelectionSkeleton />;
	}

	return (
		<>
			<div className="wcf-optin-product--wrapper">
				<div className="wcf-optin-product--selection">
					<OfferListOptions
						settings={ page_settings.settings.product }
						displayAs="div"
					/>
				</div>
			</div>
		</>
	);
}

export default OptinProductSelection;
