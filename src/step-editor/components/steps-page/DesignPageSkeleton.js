import React from 'react';
import { SpacerSkeleton, TextSkeleton, RectSkeleton } from '@Skeleton';
import './DesignPageSkeleton.scss';

function DesignPageSkeleton() {
	return (
		<div className="wcf-design-page is-placeholder">
			<div className="wcf-design-page__content">
				<div className="wcf-design-header--title wcf-step__title--editable">
					<div className="title wcf-placeholder__width--30"></div>
				</div>

				<div className="wcf-design-page__customize">
					<div className="wcf-design-page__button"></div>
					<div className="wcf-design-page__button"></div>
				</div>

				<div className="wcf-design-page__text">
					<div className="title wcf-placeholder__width--60"></div>
				</div>

				<div className="wcf-design-page__WPeditor">
					<div className="title wcf-placeholder__width--80"></div>
				</div>
			</div>

			<div className="wcf-design-page__settings">
				<div className="title"></div>

				<div className="wcf-field wcf-checkbox-field">
					<div className="title"></div>
				</div>

				<div className="wcf-settings">
					<form>
						<div className="wcf-vertical-nav">
							<div className="wcf-vertical-nav__menu">
								{ Array( 5 )
									.fill()
									.map( ( i ) => {
										return (
											<div
												className="wcf-settings-nav__tab"
												key={ i }
											>
												<RectSkeleton height="45px" />
											</div>
										);
									} ) }
							</div>

							<div className="wcf-vertical-nav__content">
								<TextSkeleton fontSize="35px" width="225px" />
								<TextSkeleton width="80%" />
								<TextSkeleton width="80%" />
								<TextSkeleton width="80%" />
								<TextSkeleton width="65%" />

								<SpacerSkeleton />

								<TextSkeleton fontSize="35px" width="300px" />
								<TextSkeleton width="60%" />
								<TextSkeleton width="60%" />
								<TextSkeleton width="45%" />

								<SpacerSkeleton />

								<TextSkeleton fontSize="35px" width="300px" />
								<TextSkeleton width="60%" />
								<TextSkeleton width="60%" />
								<TextSkeleton width="45%" />
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default DesignPageSkeleton;
