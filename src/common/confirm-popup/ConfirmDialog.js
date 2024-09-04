import {
	createContext,
	useCallback,
	useContext,
	useRef,
	useState,
} from 'react';

import ConfirmPopup from './ConfirmPopup';
const ConfirmDialog = createContext();

export function ConfirmDialogProvider( { children } ) {
	const [ state, setState ] = useState( { isOpen: false } );
	const fn = useRef();
	const confirm = useCallback(
		( data ) => {
			return new Promise( ( resolve ) => {
				setState( { ...data, isOpen: true } );
				fn.current = ( choice ) => {
					resolve( choice );
					setState( { ...data, isOpen: false } );
				};
			} );
		},
		[ setState ]
	);

	return (
		<ConfirmDialog.Provider value={ confirm }>
			{ children }
			<ConfirmPopup
				isOpen={ state.isOpen }
				{ ...state }
				onClose={ () => fn.current( false ) }
				onConfirm={ () => fn.current( true ) }
			/>
		</ConfirmDialog.Provider>
	);
}

export default function useConfirm() {
	return useContext( ConfirmDialog );
}
