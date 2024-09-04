import React from 'react';

/* State Provider */
import { SettingsStateProvider } from '@SettingsApp/utils/StateProvider';
import settingsReducer, {
	settingsinitialState,
} from '@SettingsApp/data/reducer';
import SettingsPage from '@Admin/common/global-settings/SettingsPage';

const GlobalSettings = function ( props ) {
	return (
		<SettingsStateProvider
			initialState={ settingsinitialState }
			reducer={ settingsReducer }
		>
			<SettingsPage
				closeCallback={ props.closeCallback }
				current_tab={
					props.current_tab ? props.current_tab : 'general'
				}
			/>
		</SettingsStateProvider>
	);
};
export default GlobalSettings;
