import React from 'react';

import './OrderBumpSettingSkeleton.scss';

function OrderBumpSettingSkeleton() {
	return (
		<div className="wcf-order-bump-setting-tab is-placeholder">
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
							<div className="wcf-field__data--label">
								<label className="wcf-field-one"></label>
							</div>
						</th>
					</tr>

					<tr>
						<th scope="row">
							<div className="wcf-field__data--label">
								<label className="wcf-field-two"></label>
							</div>
						</th>
					</tr>

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
							<div className="wcf-field__data--label">
								<label className="wcf-field-one"></label>
							</div>
						</th>
					</tr>

					<tr>
						<th scope="row">
							<div className="wcf-field__data--label">
								<label className="wcf-field-two"></label>
							</div>
						</th>
					</tr>
				</tbody>
			</table>
			<div className="wcf-order-bump-save-settings">
				<span></span>
			</div>
		</div>
	);
}

export default OrderBumpSettingSkeleton;
