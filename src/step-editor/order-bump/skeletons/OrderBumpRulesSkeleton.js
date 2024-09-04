import React from 'react';
import './OrderBumpRulesSkeleton.scss';
import { TextSkeleton, RectSkeleton } from '@Skeleton';

function OrderBumpRulesSkeleton() {
	return (
		<div className="wcf-order-bumps-rules-page">
			<div className="wcf-order-bumps-rules-page--enable_option">
				<TextSkeleton width="65%" />
			</div>
			<div className="wcf-order-bumps-rules--group">
				{ Array( 3 )
					.fill()
					.map( ( i, index ) => {
						return (
							<div className="wcf-order-bumps-rule" key={ i }>
								<div className="wcf-order-bumps-rule--select-box">
									<RectSkeleton height="35px" width="30%" />
									<RectSkeleton height="35px" width="30%" />
									<RectSkeleton height="35px" width="30%" />
								</div>
								{ 2 !== index && (
									<div className="wcf-order-bumps-rule__and">
										<RectSkeleton
											height="25px"
											width="5%"
										/>
									</div>
								) }
							</div>
						);
					} ) }
			</div>
			<div className="wcf-order-bumps-rules--or">
				<RectSkeleton height="35px" width="5%" />
				<RectSkeleton height="45px" width="12%" />
			</div>

			<div className="wcf-order-bumps-rules-save-settings">
				<RectSkeleton height="45px" width="12%" />
			</div>
		</div>
	);
}

export default OrderBumpRulesSkeleton;
