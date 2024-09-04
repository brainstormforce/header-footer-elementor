import React from 'react';
import { SpacerSkeleton, TextSkeleton, RectSkeleton } from '@Skeleton';
// import './SettingsPageSkeleton.scss';

function SettingPageSkeleton() {
	return (
		<div className="wcf-global-settings-nav">
			<div className="wcf-global-setting-header py-3.5 px-6 flex justify-between items-center border-b border-gray-200">
				<div className="wcf-global-setting--left-panel flex justify-between gap-3.5">
					<div className="wcf-global-setting--heading-title">
						<h2 className="text-2xl font-semibold">Settings</h2>
					</div>
				</div>
				<div className="wcf-global-setting--right-panel flex justify-between gap-5">
					<div className="wcf-field wcf-submit wcf-submit-field">
						<div className="bg-gray-300 w-32 h-full p-5 rounded-md animate-pulse"></div>
					</div>
				</div>
			</div>

			<div className="wcf-setting-popup--tab-wrapper flex gap-3">
				<div className="wcf-global-settings-nav__tabs p-4 w-1/4 border-r border-gray-200">
					{ Array( 5 )
						.fill()
						.map( ( i, index ) => {
							return (
								<div
									className="wcf-global-settings-nav__tab mb-3"
									key={ index }
								>
									<RectSkeleton height="45px" />
								</div>
							);
						} ) }
				</div>

				<div className="wcf-global-settings-nav__content w-9/12 p-4">
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

					<TextSkeleton fontSize="35px" width="210px" />
					<TextSkeleton width="65%" />
					<TextSkeleton width="65%" />
					<TextSkeleton width="45%" />

					<SpacerSkeleton />

					<TextSkeleton fontSize="35px" width="300px" />
					<TextSkeleton width="60%" />
					<TextSkeleton width="60%" />
					<TextSkeleton width="45%" />
				</div>
			</div>
		</div>
	);
}

export default SettingPageSkeleton;
