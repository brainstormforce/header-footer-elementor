import { useEffect } from 'react';
import { useSettingsStateValue } from '@SettingsApp/utils/StateProvider';

export default function InputEvents() {
	const [ { options }, dispatch ] = useSettingsStateValue();

	const baseInputChange = function ( e ) {
		const { name, value } = e.detail;
		if ( undefined !== options[ name ] ) {
			window.wcfUnsavedChanges = true;
			dispatch( {
				type: 'SET_OPTION',
				name,
				value,
			} );
		}
	};

	const fieldTypes = [
		{ type: 'select' },
		{ type: 'select2' },
		{ type: 'checkbox' },
		{ type: 'text' },
		{ type: 'textarea' },
		{ type: 'number' },
		{ type: 'radio' },
		{ type: 'color' },
		{ type: 'font' },
		{ type: 'product' },
		{ type: 'coupon' },
		{ type: 'toggle' },
		{ type: 'selectioncard' },
	];

	useEffect( () => {
		if ( options ) {
			fieldTypes.map( function ( field ) {
				document.addEventListener(
					`wcf:${ field.type }:change`,
					baseInputChange
				);
				return '';
			} );
		}

		return () => {
			fieldTypes.map( function ( field ) {
				document.removeEventListener(
					`wcf:${ field.type }:change`,
					baseInputChange
				);
				return '';
			} );
		};
	}, [ options ] );
}
