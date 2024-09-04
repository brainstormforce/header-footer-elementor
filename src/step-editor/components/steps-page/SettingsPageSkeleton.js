import React from 'react';
import { SpacerSkeleton, TextSkeleton, RectSkeleton } from '@Skeleton';
import './SettingsPageSkeleton.scss';

function SettingsPageSkeleton() {
	return (
		<div className="wcf-settings-nav">
			<div className="wcf-settings-nav__tabs">
				{ Array( 5 )
					.fill()
					.map( ( i ) => {
						return (
							<div className="wcf-settings-nav__tab" key={ i }>
								<RectSkeleton height="45px" />
							</div>
						);
					} ) }
			</div>

			<div className="wcf-settings-nav__content">
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
			</div>
		</div>
	);
}

export default SettingsPageSkeleton;
