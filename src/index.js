import { createRoot } from 'react-dom/client'; // Import from react-dom/client for React 18
import domReady from '@wordpress/dom-ready';
import App from './App';
import NavMenu from '@components/NavMenu';
import './styles.css';

domReady( () => {
	const rootElement = document.getElementById( 'hfe-settings-app' );
	if ( rootElement ) {
		const root = createRoot( rootElement ); // Use createRoot() for React 18
		root.render( <App /> );
	}

	if (
		'yes' === hfe_admin_data.show_view_all ||
        window.location.href === hfeSettingsData.header_footer_builder ||
        'yes' === hfeSettingsData.is_hfe_post
	) {
		const navMenuElement = document.getElementById(
			'hfe-admin-top-bar-root',
		);
		if ( navMenuElement ) {
			const newDiv = document.createElement( 'div' );
			newDiv.id = 'hfe-settings-app';
			navMenuElement.appendChild( newDiv );

			const navMenuRoot = createRoot( newDiv );
			navMenuRoot.render( <NavMenu /> );
		}
	}
} );
