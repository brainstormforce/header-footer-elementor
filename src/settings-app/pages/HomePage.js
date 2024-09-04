import React from 'react';
import UserInfoBox from '@SettingsApp/components/home-page/UserInfoBox';
import Graph from '@SettingsApp/components/home-page/Graph';
import RecentOrders from '@SettingsApp/components/home-page/RecentOrders';
import QuickActions from '@SettingsApp/components/home-page/QuickActions';

function HomePage() {
	return (
		<div className="wcf-home-page-wrapper">
			<div className="wcf-col--row mb-8">
				<div className="wcf-col w-full">
					<UserInfoBox />
				</div>
			</div>

			<div className="wcf-col--row mb-8">
				<div className="wcf-col w-full">
					<Graph />
				</div>
			</div>

			<div className="wcf-col--row flex w-full gap-8 justify-between">
				<div className="wcf-col w-[70%]">
					<RecentOrders />
				</div>
				<div className="wcf-col w-[30%]">
					<QuickActions />
				</div>
			</div>
		</div>
	);
}

export default HomePage;
