import { useEffect } from 'react';
import { useStateValue } from '@Utils/StateProvider';

export default function InputEvents() {
	const [ { options }, dispatch ] = useStateValue();

	const baseInputChange = function ( e ) {
		const { name, value } = e.detail;

		if ( name && name.includes( '[' ) ) {
			const newTxt = name.split( '[' );
			const arr = [];
			for ( let i = 1; i < newTxt.length; i++ ) {
				arr.push( newTxt[ i ].split( ']' )[ 0 ] );
			}

			const newName = name.substr( 0, name.indexOf( '[' ) );

			if ( 'wcf-checkout-custom-fields' === newName ) {
				return '';
			}

			const newValue = options[ newName ];

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
				type: 'SET_OPTION',
				name: newName,
				value: newValue,
			} );
		}

		if ( undefined !== options[ name ] ) {
			window.wcfUnsavedChanges = true;
			dispatch( {
				type: 'SET_OPTION',
				name,
				value,
			} );
		}

		if ( name === 'wcf-pre-checkout-offer-product' ) {
			dispatch( {
				type: 'SET_OPTION',
				name: 'wcf-pre-checkout-offer-desc',
				value:
					null !== options[ 'wcf-pre-checkout-offer-product' ]
						? options[ 'wcf-pre-checkout-offer-product' ]
								.product_desc
						: '',
			} );
			dispatch( {
				type: 'SET_OPTION',
				name: 'wcf-pre-checkout-offer-product-title',
				value:
					null !== options[ 'wcf-pre-checkout-offer-product' ]
						? options[ 'wcf-pre-checkout-offer-product' ]
								.product_name
						: '',
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
		{ type: 'toggle' },
		{ type: 'selectioncard' },
		{ type: 'select-with-logo' },
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
