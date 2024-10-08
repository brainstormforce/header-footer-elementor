import { useState } from '@wordpress/element';
import './styles.css'; // Ensure you have your Tailwind CSS styles imported
import Test from '@screens/Test.js';
import NavMenu from '@components/NavMenu.js';
import HeaderLine from '@components/HeaderLine.js';
import TemplateSection from '@components/Dashboard/TemplateSection.js';
import QuickAccess from '@components/Dashboard/QuickAccess.js';
import WelcomeContainer from '@components/Dashboard/WelcomeContainer';
import UltimateFeatures from '@components/Dashboard/UltimateFeatures';
import Widgets from '@components/Dashboard/Widgets';

const App = () => {
	return (
		<>
			<NavMenu />
			<div className="hfe-settings-content-wrapper">
				<HeaderLine />
				<div className='hfe-settings-dashboard m-4'>
					<Widgets />
					<TemplateSection />
					<QuickAccess />
					<WelcomeContainer />
					<UltimateFeatures />
				</div>
			</div>
		</>
	);
};

export default App;
