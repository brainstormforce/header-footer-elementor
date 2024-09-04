import { useEffect } from 'react';
import { useStateValue } from '@Utils/StateProvider';

export default function ObInputEvents() {
	const [ { current_ob }, dispatch ] = useStateValue();

	const baseInputChange = function ( e ) {
		const { name, value } = e.detail;

		if ( name.includes( '[' ) ) {
			const newTxt = name.split( '[' );
			const arr = [];
			for ( let i = 1; i < newTxt.length; i++ ) {
				arr.push( newTxt[ i ].split( ']' )[ 0 ] );
			}

			const newName = name.substr( 0, name.indexOf( '[' ) );

			const newValue = current_ob[ newName ];

			switch ( arr.length ) {
				case 2:
					newValue[ arr[ 0 ] ][ arr[ 1 ] ] = value;
					break;
				case 4:
					newValue[ arr[ 0 ] ][ arr[ 1 ] ][ arr[ 2 ] ][ arr[ 3 ] ] =
						value;
					break;
			}

			dispatch( {
				type: 'SET_OB_OPTION',
				name: newName,
				value: newValue,
			} );
		}

		if ( undefined !== current_ob ) {
			window.wcfUnsavedChanges = true;
			dispatch( {
				type: 'SET_OB_OPTION',
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
		{ type: 'image-selector' },
		{ type: 'wpeditor' },
		{ type: 'toggle' },
		{ type: 'selectioncard' },
	];

	useEffect( () => {
		if ( current_ob ) {
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
	}, [ current_ob ] );
}
