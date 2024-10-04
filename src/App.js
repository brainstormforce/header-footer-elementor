import { HashRouter as Router } from 'react-router-dom'; // Still use react-router-dom
import Routes from '@routes/Routes.js'; // Import the Routes component
import './styles.css'; // Ensure you have your Tailwind CSS styles imported
import NavMenu from '@components/NavMenu.js';
import { Button } from '@bsf/force-ui';
import Test from '@screens/Test.js';
import { Settings } from '@screens/Settings/index.js'; // Make sure this path is correct
import { Connections } from '@screens/Connections/index.js'; // Make sure this path is correct
import { SettingsProvider } from '@context/SettingsContext.js'; // Import the SettingsProvider

const App = () => {
	return (
		<>
			{/* <SettingsProvider>
			<Settings />
		</SettingsProvider> */}
			<Test />
		</>
	);
};

export default App;
