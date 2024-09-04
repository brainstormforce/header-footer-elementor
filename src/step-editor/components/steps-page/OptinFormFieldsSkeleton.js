import React from 'react';
import './OptinFormFieldsSkeleton.scss';

function OptinFormFieldsSkeleton() {
	return (
		<div className="wcf-custom-field-editor is-placeholder">
			<div className="wcf-custom-field-editor__content">
				<div className="wcf-custom-field-editor__title">
					<div className="title"></div>
				</div>

				<form>
					<table>
						<tbody>
							<tr>
								<div className="checkbox-title"></div>
							</tr>
						</tbody>
					</table>

					<div className="wcf-optin-fields-section-section">
						<div className="wcf-custom-field-editor-title-section">
							<div className="title"></div>
						</div>

						<div className="wcf-optin-fields">
							<div className="title"></div>
							<div className="title"></div>
							<div className="title"></div>
						</div>
					</div>

					<div className="wcf-field wcf-submit">
						<div className="wcf-optin-form-field__button"></div>
					</div>
				</form>
			</div>
		</div>
	);
}

export default OptinFormFieldsSkeleton;
