// External.
import { useSettingsStateValue } from '@SettingsApp/utils/StateProvider';

// SCSS.
import './flow-library.scss';

// Store.
import '@Admin/importer/store/index';

// Internal.
import Library from './library';
import Creator from './creator';

const StoreLibrary = () => {
	const [ { page_builder } ] = useSettingsStateValue();

	// Library Screen
	if ( 'other' !== page_builder ) {
		return <Library />;
	}

	return <Creator />;
};

export default StoreLibrary;
