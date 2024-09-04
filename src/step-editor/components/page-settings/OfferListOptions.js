import React from 'react';
import { useStateValue } from '@Utils/StateProvider';
import { __ } from '@wordpress/i18n';
import { conditions } from '@Utils/Helpers';

import { RenderFields } from '@Fields';

function OfferListOptions( { settings }, displayAs = 'tr' ) {
	const [ { options } ] = useStateValue();

	const get_value = ( data ) => {
		let value = '';
		const name = data.name;

		if ( name && name.includes( '[' ) ) {
			const newTxt = name.split( '[' );
			const arr = [];
			for ( let i = 1; i < newTxt.length; i++ ) {
				arr.push( newTxt[ i ].split( ']' )[ 0 ] );
			}

			const newName = name.substr( 0, name.indexOf( '[' ) );

			const newValue = options[ newName ];
			const product = options[ 'wcf-offer-product' ];
			if (
				( null === product ||
					'undefined' === typeof product ||
					'' === product ||
					product.length <= 0 ) &&
				( 'wcf-offer-product[original_price]' === name ||
					'wcf-offer-product[sell_price]' === name )
			) {
				return __( 'No product Selected', 'cartflows' );
			}

			const original_price = Array.isArray( product )
				? parseFloat( product[ 0 ].original_price )
				: parseFloat( product.original_price );

			if ( 'wcf-offer-product[sell_price]' === name && original_price ) {
				const discount_type = options[ 'wcf-offer-discount' ],
					discount_value = parseFloat(
						options[ 'wcf-offer-discount-value' ]
					);
				let custom_price = original_price;

				if ( 'discount_percent' === discount_type ) {
					if ( discount_value > 0 ) {
						custom_price = (
							original_price -
							( original_price * discount_value ) / 100
						).toFixed( 2 );
					}
				} else if ( 'discount_price' === discount_type ) {
					if ( discount_value > 0 ) {
						custom_price = (
							original_price - discount_value
						).toFixed( 2 );
					}
				}

				if ( custom_price < 0 ) {
					data.class = 'error_field';
				} else {
					data.class = '';
				}

				return custom_price;
			}

			value = newValue[ arr[ 0 ] ];
		} else {
			value = options[ data.name ] ? options[ data.name ] : '';
		}

		return value;
	};

	return (
		<div className="wcf-list-options wcf-offer-list-options">
			{ /* <h3 className="wcf-list-options__title">{ settings.title }</h3> */ }

			<div className="wcf-list-options-wrapper">
				{ 'tr' === displayAs ? (
					<table className="w-full">
						<tbody>
							{ Object.keys( settings.fields ).map( ( field ) => {
								const data = settings.fields[ field ];

								const value = get_value( data );

								const isActive = conditions.isActiveControl(
									data,
									options
								);

								return (
									<RenderFields
										key={ field }
										data={ data }
										value={ value }
										isActive={ isActive }
										field={ field }
									/>
								);
							} ) }
						</tbody>
					</table>
				) : (
					<div className="wcf-list-options-container">
						{ Object.keys( settings.fields ).map( ( field ) => {
							const data = settings.fields[ field ];

							const value = get_value( data );

							const isActive = conditions.isActiveControl(
								data,
								options
							);

							return (
								<RenderFields
									key={ field }
									data={ data }
									value={ value }
									isActive={ isActive }
									field={ field }
									tabName="list-options"
									displayAs={ displayAs }
								/>
							);
						} ) }
					</div>
				) }
			</div>
			<table>
				<tbody></tbody>
			</table>
		</div>
	);
}

export default OfferListOptions;
