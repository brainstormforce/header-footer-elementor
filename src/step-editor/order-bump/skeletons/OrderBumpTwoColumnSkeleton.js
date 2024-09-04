import React from 'react';

import './OrderBumpTwoColumnSkeleton.scss';

function OrderBumpTwoColumnSkeleton() {
	return (
		<div className="wcf-order-bump-design-tab is-placeholder">
			<div className="wcf-order-bump-design-tab__settings">
				<table>
					<tbody>
						<tr>
							<th scope="row">
								<div className="wcf-field wcf-section-heading-field">
									<div className="wcf-field__data--label">
										<label></label>
									</div>
								</div>
							</th>
						</tr>

						<tr>
							<th scope="row">
								<div>
									<div className="wcf-select2-field wcf-product-field">
										<div className="wcf-selection-field">
											<label></label>
										</div>
									</div>
								</div>
							</th>
						</tr>

						<tr>
							<th scope="row">
								<div>
									<div className="wcf-select2-field wcf-product-field">
										<div className="wcf-selection-field">
											<label></label>
										</div>
									</div>
								</div>
							</th>
						</tr>
					</tbody>
				</table>

				<div className="wcf-order-bump-save-settings">
					<span></span>
				</div>
			</div>

			<div className="wcf-order-bump-design-tab__preview">
				<div className="wcf-order-bump-design-tab__preview--title">
					<label></label>
				</div>

				<div className="wcf-bump-order-wrap wcf-bump-order-style-1 wcf-after-order">
					<div className="wcf-bump-order-content">
						<div className="wcf-bump-order-field-wrap">
							<span></span>
						</div>

						<div className="wcf-content-container">
							<div className="wcf-bump-order-offer-content-right">
								<div className="wcf-bump-order-offer">
									<span className="wcf-bump-order-bump-highlight"></span>
								</div>
								<div className="wcf-bump-order-desc"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default OrderBumpTwoColumnSkeleton;
