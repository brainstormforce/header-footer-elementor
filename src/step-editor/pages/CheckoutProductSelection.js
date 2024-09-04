import React from 'react';
import { useStateValue } from '@Utils/StateProvider';
import ProductSelectionSkeleton from '@StepEditor/components/steps-page/ProductSelectionSkeleton';
import ProductOptionsCTA from '@StepEditor/components/steps-page/ProductOptionsCTA';
import Accordian from '@StepEditor/components/Accordian/Accordian';
import { useSettingsValue } from '@Utils/SettingsProvider';

function CheckoutProductSelection() {
	const [ { step_data, settings_data, page_settings, options } ] =
		useStateValue();
	const [ { license_status } ] = useSettingsValue();

	const allsetting = page_settings;

	if ( 'undefined' === typeof settings_data.settings ) {
		return <ProductSelectionSkeleton />;
	}
	const checkoutProducts = options[ 'wcf-checkout-products' ];
	return (
		<>
			<div className="wcf-checkout-products">
				<div className="wcf-checkout-products--selection wcf-checkout__section">
					<div className="wcf-product-selection-wrapper">
						{ /* <ListOptions settings={ allsetting.settings.product } /> */ }
						<Accordian
							settings={ allsetting.settings.product }
							isOpen={ true }
						/>
					</div>
				</div>

				{ 'checkout' === step_data.type &&
					( ! wcfCartflowsPro() ||
						'Activated' !== license_status ) && (
						<div className="wcf-checkout-products__pro-options-cta-wrapper">
							<ProductOptionsCTA />
						</div>
					) }

				{ 'checkout' === step_data.type &&
					wcfCartflowsPro() &&
					'Activated' === license_status && (
						<div className="wcf-checkout-products__pro-options">
							<div className="wcf-checkout-products--coupon">
								<div className="wcf-coupon-selection-wrapper">
									<Accordian
										settings={ allsetting.settings.coupon }
									/>
									{ /* <ListOptions
										settings={ allsetting.settings.coupon }
									/> */ }
								</div>
							</div>
							{ checkoutProducts && (
								<Accordian
									settings={
										allsetting.settings[ 'product-options' ]
									}
								/>
							) }
						</div>
					) }
			</div>
		</>
	);
}

export default CheckoutProductSelection;
