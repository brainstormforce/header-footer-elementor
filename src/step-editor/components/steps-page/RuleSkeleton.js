import React from 'react';
import { TextSkeleton, RectSkeleton } from '@Skeleton';

function RuleSkeleton() {
	return (
		<div className="wcf-checkout-rules-page">
			<div className="wcf-checkout-rules-page--enable_option">
				<TextSkeleton width="65%" />
			</div>
			<div className="wcf-checkout-rules--group_wrapper">
				<div className="wcf-checkout-rules--text">
					<TextSkeleton width="10%" />
					<RectSkeleton width="25%" height="35px" />
					<TextSkeleton width="20%" />
				</div>

				<div className="wcf-checkout-rules">
					{ Array( 3 )
						.fill()
						.map( ( i, index ) => {
							return (
								<div
									className="wcf-checkout-rule"
									key={ index }
								>
									<div className="wcf-checkout-rule--select-box">
										<RectSkeleton
											height="35px"
											width="30%"
										/>
										<RectSkeleton
											height="35px"
											width="30%"
										/>
										<RectSkeleton
											height="35px"
											width="30%"
										/>
									</div>

									{ 2 !== index && (
										<div className="wcf-checkout-rule__and">
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
				<RectSkeleton height="40px" width="9%" />
			</div>

			<div className="wcf-checkout-rules--or">
				<RectSkeleton height="35px" width="5%" />
				<RectSkeleton height="45px" width="12%" />
			</div>
			<div className="wcf-checkout-rules--default-step">
				<TextSkeleton width="10%" />
				<RectSkeleton width="25%" height="35px" />
				<TextSkeleton width="20%" />
			</div>
		</div>
	);
}

export default RuleSkeleton;
