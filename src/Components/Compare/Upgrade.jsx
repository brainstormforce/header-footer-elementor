import { Container } from '@bsf/force-ui';
import ExtendWebsite from '@components/Dashboard/ExtendWebsite';
import QuickAccess from '@components/Dashboard/QuickAccess';
import NavMenu from '@components/NavMenu';
import UpgradeNotice from '@components/UpgradeNotice';
import React from 'react';
import FreevsPro from './FreevsPro';
import UltimateCompare from './UltimateCompare';
import UltimateFeatures from '@components/Dashboard/UltimateFeatures';

const Upgrade = () => {
	return (
		<>
			<UpgradeNotice />
			<NavMenu />
			<div>
				<Container
					align="stretch"
					className="p-6 flex-col lg:flex-row box-border"
					containerType="flex"
					direction="row"
					gap="sm"
					justify="start"
					style={ {
						width: '100%',
					} }
				>
					<Container.Item
						className="p-2 hfe-65-width"
						alignSelf="auto"
						order="none"
						shrink={ 0 }
					>
						<FreevsPro />
					</Container.Item>
					<Container.Item
						className="p-2 w-full hfe-35-width hfe-sticky-right-sidebar"
						shrink={ 1 }
					>
						<UltimateFeatures />
						{ /* <div className='pt-5'>
                            <ExtendWebsite />
                        </div> */ }
						<div className="pt-4 mt-4">
							<QuickAccess />
						</div>

					</Container.Item>
				</Container>
			</div>
		</>
	);
};

export default Upgrade;
