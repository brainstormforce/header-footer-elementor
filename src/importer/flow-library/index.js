// External.
import { useSettingsValue } from '@Utils/SettingsProvider';

// SCSS.
import './flow-library.scss';

// Store.
import '../store/index';

// Internal.
import Library from './library';
import Creator from './creator';

const FlowLibrary = () => {
	const [ { page_builder } ] = useSettingsValue();

	// Library Screen
	if ( 'other' !== page_builder ) {
		return <Library />;
	}

	return <Creator />;
};

export default FlowLibrary;
