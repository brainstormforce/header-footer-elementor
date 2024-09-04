import React from 'react';
import { useLocation } from 'react-router-dom';
import HomePage from '@SettingsApp/pages/HomePage';
import FlowsPage from '@SettingsApp/pages/FlowsPage';
import WooCommerce404 from '@SettingsApp/pages/WooCommerce404';
import StoreCheckoutPage from '@SettingsApp/pages/StoreCheckoutPage';
// import SettingsPage from '@Admin/common/global-settings/SettingsPage';
import SetupPage from '@SettingsApp/pages/SetupPage';
import RecommendedPlugins from '@SettingsApp/pages/RecommendedPlugins';
// Flow & Step Importer.
import FlowLibrary from '@Admin/importer/flow-library';
import StoreLibrary from '@Admin/store-importer/store-library';
import EditFlowApp from '@FlowEditor/EditFlowApp';
import CartFlowsDebug from '@SettingsApp/CartFlowsDebug.js';

function SettingsRoute() {
	const query = new URLSearchParams( useLocation().search );
	const page = query.get( 'page' );
	const path = query.get( 'path' );

	let route_page = <p>Default route fallback</p>;

	if ( cartflows_admin.home_slug === page ) {
		switch ( path ) {
			case 'flows':
				route_page = <FlowsPage />;
				break;
			case 'store-checkout':
				if (
					'inactive' === cartflows_admin.woocommerce_status ||
					'not-installed' === cartflows_admin.woocommerce_status
				) {
					route_page = <WooCommerce404 />;
				} else if ( '' === cartflows_admin.global_checkout_id ) {
					route_page = <StoreCheckoutPage />;
				} else {
					route_page = <EditFlowApp flowType={ 'storeCheckout' } />;
				}
				break;
			case 'store-checkout-library':
				route_page = <StoreLibrary />;
				break;
			case 'setup':
				route_page = <SetupPage />;
				break;
			case 'addons':
				route_page = <RecommendedPlugins />;
				break;
			case 'library':
				route_page = <FlowLibrary />;
				break;
			case 'wcf-log':
				route_page = <CartFlowsDebug />;
				break;
			default:
				route_page = <HomePage />;
				break;
		}
		wcfWpNavMenuChange( path );
	}

	return <>{ route_page }</>;
}

export default SettingsRoute;
