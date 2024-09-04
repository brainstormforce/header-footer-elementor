/**
 * Common reducer for whole plugin.
 */
export const settingsInitialState = {
	settingsProcess: false,
	unsavedChanges: false,
	page_builder: cartflows_admin?.page_builder
		? cartflows_admin.page_builder
		: 'other',
	license_status: cartflows_admin.license_status,
};

const settingsEvents = ( state, data ) => {
	switch ( data.status ) {
		case 'SAVED':
			window.wcfUnsavedChanges = false;
			return {
				...state,
				settingsProcess: 'saved',
			};
		case 'PROCESSING':
			return {
				...state,
				settingsProcess: 'processing',
			};
		case 'RESET':
			return {
				...state,
				settingsProcess: false,
			};
		case 'UNSAVED_CHANGES':
			if ( 'change' === data.trigger ) {
				return {
					...state,
					unsavedChanges: true,
				};
			}
			return {
				...state,
				unsavedChanges: false,
			};
		case 'UPDATE_LICENSE_STATUS':
			return {
				...state,
				license_status: data.license_status,
			};

		default:
			return state;
	}
};

export default settingsEvents;
