import { createRoot } from 'react-dom/client'; // Import from react-dom/client for React 18
import domReady from '@wordpress/dom-ready';
import App from './App';
import './styles.css';

domReady(() => {
  const rootElement = document.getElementById('hfe-settings-app');
  if (rootElement) {
    const root = createRoot(rootElement); // Use createRoot() for React 18
    root.render(<App />);
  } 
});

