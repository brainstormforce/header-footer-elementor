import React from 'react';
import './OrderBumpSkeleton.scss';

function OrderBumpSkeleton() {
	return (
		<div className="wcf-multiple-order-bumps is-placeholder">
			<div className="wcf-multiple-order-bumps__add-new">
				<span className="wcf-add-new-order-bump wcf-button--primary"></span>
			</div>

			<div className="wcf-multiple-order-bumps__header">
				<div className="wcf-column wcf-column--title">Title</div>
				<div className="wcf-column wcf-column--status">Status</div>
				<div className="wcf-column wcf-column--actions">Actions</div>
			</div>

			<div className="wcf-multiple-order-bumps__content">
				<>
					<div className="wcf-order-bump">
						<div className="wcf-order-bump__content-wrapper">
							<div className="wcf-order-bump__data wcf-column--product">
								<div className="wcf-order-bump__data-title">
									<span title="ob"></span>
								</div>
							</div>
							<div className="wcf_order_bump__status">
								<span className="wcf-ob-status"></span>
							</div>
							<div className="wcf-order-bump__action wcf-column--actions">
								<span title="Edit Order Bump"></span>
							</div>
						</div>
					</div>
				</>
				<>
					<div className="wcf-order-bump">
						<div className="wcf-order-bump__content-wrapper">
							<div className="wcf-order-bump__data wcf-column--product">
								<div className="wcf-order-bump__data-title">
									<span title="ob"></span>
								</div>
							</div>
							<div className="wcf_order_bump__status">
								<span className="wcf-ob-status"></span>
							</div>
							<div className="wcf-order-bump__action wcf-column--actions">
								<span title="Edit Order Bump"></span>
							</div>
						</div>
					</div>
				</>
			</div>
		</div>
	);
}

export default OrderBumpSkeleton;
