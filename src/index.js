// Import createRoot from @wordpress/element instead of render
import { createRoot } from '@wordpress/element'; // Import Redux Provider
import App from './App.js';
// import { SettingsProvider } from '@contextapi/SettingsContext.js'; // Import your Redux store
import './styles.css';

// Find the root element
const rootElement = document.getElementById('hfe-settings-app');

// Create a root and render the App component
const root = createRoot(rootElement);

// Wrap App with Provider to pass the Redux store to the entire app
root.render(
	// <SettingsProvider>
	<App />
	// </SettingsProvider>
);
