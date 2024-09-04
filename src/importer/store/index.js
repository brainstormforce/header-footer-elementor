import reducer from './reducer';
import selectors from './selectors';
import actions from './actions';

const { registerStore } = wp.data;

registerStore( 'wcf/importer', {
	reducer,
	actions,
	selectors,
} );
