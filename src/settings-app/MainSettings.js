import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useSettingsStateValue } from '@SettingsApp/utils/StateProvider';
import apiFetch from '@wordpress/api-fetch';

/* Component */
import NavMenu from '@Admin/common/NavMenu';
import SettingsRoute from '@SettingsApp/SettingsRoute';
import InputEvents from '@SettingsApp/utils/InputEvents';

function MainSettings() {
	const [ { globaldata }, dispatch ] = useSettingsStateValue();
	InputEvents();

	useEffect( () => {
		let isActive = true;
		if ( globaldata.length < 1 ) {
			const getsettings = async () => {
				apiFetch( {
					path: '/cartflows/v1/admin/commonsettings/',
				} ).then( ( data ) => {
					if ( isActive ) {
						dispatch( {
							type: 'SET_SETTINGS',
							commondata: data,
						} );

						dispatch( {
							type: 'SET_PAGE_BUILDER',
							pagebuilder:
								data.options[
									'_cartflows_common[default_page_builder]'
								],
						} );
					}
				} );
			};

			getsettings();
		}
		return () => {
			isActive = false;
		};
	}, [] );

	return (
		<Router>
			<NavMenu />
			<div className="wcf-app-content-wrapper wcf-app-wrapper--settings-app p-8">
				<Switch>
					<Route path="/">
						<SettingsRoute />
					</Route>
				</Switch>
			</div>
		</Router>
	);
}

export default MainSettings;
