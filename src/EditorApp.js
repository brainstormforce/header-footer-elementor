import React from 'react';
import ReactDOM from 'react-dom';

/* Settings Provider */
import { SettingsProvider } from '@Utils/SettingsProvider';
import settingsEvents, {
	settingsInitialState,
} from '@Utils/SettingsProvider/initialData';

/* Main Editor Component */
import './common/common';
import './common/all-config.scss';
import MainEditor from '@Editor/MainEditor';
import { ConfirmDialogProvider } from '@Alert/ConfirmDialog';
import LoaderPopup from './common/processing-popup/LoaderPopup';

ReactDOM.render(
	// <React.StrictMode>
	<SettingsProvider
		initialState={ settingsInitialState }
		reducer={ settingsEvents }
	>
		<ConfirmDialogProvider>
			<MainEditor />
			<LoaderPopup />
		</ConfirmDialogProvider>
	</SettingsProvider>,
	// </React.StrictMode>,
	document.getElementById( 'wcf-editor-app' )
);
