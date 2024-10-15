import { useState } from '@wordpress/element';
import './styles.css'; // Ensure you have your Tailwind CSS styles imported
import Test from '@screens/Test.js';
import Dashboard from '@components/Dashboard/Dashboard';
import Features from '@components/Widgets/Features';
import Templates from '@components/Templates/Templates';
import { BrowserRouter as Router } from 'react-router-dom'; 

const App = () => {
	return (
		<Router>
			{/* <Dashboard/> */}
			<Features/>
			{/* <Templates/> */}
		</Router>
	);
};

export default App;
