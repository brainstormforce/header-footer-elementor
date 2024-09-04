import React from 'react';
import './CheckoutOfferSkeleton.scss';

function CheckoutOfferSkeleton() {
	return (
		<div className="wcf-checkout-offer-settings wcf-checkout__section is-placeholder">
			<div className="wcf-list-options">
				<div className="wcf-list-options__title">
					<div className="title"></div>
				</div>

				<table>
					<tbody>
						<tr>
							<div className="checkbox-title"></div>
						</tr>
						<tr>
							<div className="title"></div>
						</tr>
						<tr>
							<div className="title"></div>
						</tr>
						<tr>
							<div className="title"></div>
						</tr>
						<tr>
							<div className="title"></div>
						</tr>
						<tr>
							<div className="title"></div>
						</tr>
					</tbody>
				</table>

				<div className="wcf-order-bump-save-settings">
					<div className="wcf-field wcf-submit">
						<div className="wcf-checkout-offer__button"></div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CheckoutOfferSkeleton;
