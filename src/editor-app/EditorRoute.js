import React from 'react';
import { useLocation } from 'react-router-dom';
import EditFlowApp from '@FlowEditor/EditFlowApp';

function SettingsRoute() {
	const query = new URLSearchParams( useLocation().search );
	const action = query.get( 'action' );
	const path = query.get( 'path' );

	let flowType = 'flows';
	if ( 'store-checkout' === path ) {
		flowType = 'storeCheckout';
	}

	const get_route_page = function () {
		let route_page = '';
		switch ( action ) {
			case 'wcf-edit-flow':
				route_page = <EditFlowApp flowType={ flowType } />;
				break;
			default:
				route_page = <h1>404 Not Found.</h1>;
				break;
		}
		return route_page;
	};
	wcfWpNavMenuChange( path );
	return <>{ get_route_page() }</>;
}

export default SettingsRoute;
