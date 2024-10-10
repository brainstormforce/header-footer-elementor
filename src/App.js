import { useState } from '@wordpress/element';
import './styles.css'; // Ensure you have your Tailwind CSS styles imported
import Test from '@screens/Test.js';
import Dashboard from '@components/Dashboard/Dashboard';
import Features from '@components/Widgets/Features';

const App = () => {
	return (
		<>
			{/* <Dashboard/> */}
			<Features/>
		</>
	);
};

export default App;
