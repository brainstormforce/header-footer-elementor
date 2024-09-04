import React from 'react';
import './ProductSelectionSkeleton.scss';

function ProductSelectionSkeleton() {
	return (
		<div className="wcf-checkout-products is-placeholder">
			<div className="wcf-checkout-products--selection wcf-checkout__section">
				<div className="wcf-product-selection-wrapper">
					<div className="wcf-list-options">
						<div className="wcf-list-options__title">
							<div className="title wcf-placeholder__width--30"></div>
						</div>

						<table>
							<tbody>
								<tr>
									<th>
										<div className="wcf-checkout-product-selection-field">
											<div className="wcf-checkout-product-selection-field__add-new">
												<div className="wcf-checkout-products__button"></div>
												<div className="wcf-checkout-products__button"></div>
											</div>
										</div>
									</th>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>

			<div className="wcf-checkout-products__pro-options">
				<div className="wcf-checkout-products--coupon">
					<div className="wcf-coupon-selection-wrapper">
						<div className="wcf-list-options">
							<div className="wcf-list-options__title">
								<div className="title"></div>
							</div>

							<table>
								<tbody>
									<tr>
										<th>
											<div>
												<div className="wcf-select2-field">
													<div className="title"></div>
												</div>
											</div>
										</th>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>

			<div className="wcf-field wcf-submit">
				<div className="wcf-checkout-products__button"></div>
			</div>
		</div>
	);
}

export default ProductSelectionSkeleton;
