import { useState } from '@wordpress/element';
import './styles.css'; // Ensure you have your Tailwind CSS styles imported
import Test from '@screens/Test.js';
import NavMenu from '@components/NavMenu.js';
import WelcomeContainer from '@components/WelcomeContainer';



const App = () => {
	return (
		<>
			<NavMenu />
			<WelcomeContainer />
		</>
	);
};

export default App;
