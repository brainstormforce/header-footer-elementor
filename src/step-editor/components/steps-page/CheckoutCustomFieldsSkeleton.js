import React from 'react';
import './CheckoutCustomFieldsSkeleton.scss';
import { TextSkeleton } from '@Skeleton';

function CheckoutCustomFieldsSkeleton() {
	return (
		<div className="wcf-custom-field-editor wcf-checkout__section is-placeholder">
			<div className="wcf-custom-field-editor__content">
				<div className="wcf-custom-field-editor__title">
					<div className="title"></div>
				</div>

				<form>
					<table>
						<tbody>
							<tr>
								<td>
									<div className="title"></div>
								</td>
							</tr>
							<tr>
								<td>
									<div className="title"></div>
								</td>
							</tr>
							<tr>
								<td>
									<div className="title"></div>
								</td>
							</tr>
							<tr>
								<td>
									<div className="title"></div>
								</td>
							</tr>
							<tr>
								<td>
									<div className="title"></div>
								</td>
							</tr>
							<tr>
								<td>
									<div className="title"></div>
								</td>
							</tr>
						</tbody>
					</table>

					<div className="wcf-field wcf-submit">
						<div className="wcf-checkout-custom-fields__button"></div>
					</div>
				</form>
			</div>

			<TextSkeleton fontSize="35px" width="400px" />
			<TextSkeleton width="80%" />
			<TextSkeleton width="80%" />
			<TextSkeleton width="80%" />
			<TextSkeleton width="65%" />
		</div>
	);
}

export default CheckoutCustomFieldsSkeleton;
