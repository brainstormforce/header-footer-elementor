import React from 'react';
import { useStateValue } from '@Utils/StateProvider';
import { __ } from '@wordpress/i18n';
import { conditions } from '@Utils/Helpers';

import { RenderFields, SectionHeadingField } from '@Fields';

function COListOptions( props ) {
	const [ { page_settings, options } ] = useStateValue();

	const get_value = ( data ) => {
		let value = '';
		const name = data.name;

		//Get values if field name is array.
		if ( name && name.includes( '[' ) ) {
			const newTxt = name.split( '[' );
			const arr = [];
			for ( let i = 1; i < newTxt.length; i++ ) {
				arr.push( newTxt[ i ].split( ']' )[ 0 ] );
			}

			const newName = name.substr( 0, name.indexOf( '[' ) );

			const newValue = options[ newName ];

			// Check if pricing value and is product available.

			if (
				'wcf-pre-checkout-offer-product[original_price]' === name ||
				'wcf-pre-checkout-offer-product[sell_price]' === name
			) {
				const product = options[ 'wcf-pre-checkout-offer-product' ];
				if (
					'' === product ||
					'undefined' === typeof product ||
					null === product ||
					product.length <= 0
				) {
					return __( 'No product Selected', 'cartflows' );
				}

				const original_price = Array.isArray( product )
					? parseFloat( product[ 0 ].original_price )
					: parseFloat( product.original_price );

				if (
					'wcf-pre-checkout-offer-product[original_price]' === name
				) {
					return original_price;
				}

				if (
					'wcf-pre-checkout-offer-product[sell_price]' === name &&
					original_price
				) {
					const discount_type =
							options[ 'wcf-pre-checkout-offer-discount' ],
						discount_value = parseFloat(
							options[ 'wcf-pre-checkout-offer-discount-value' ]
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
			}

			value = newValue[ arr[ 0 ] ];
		} else {
			// Values for the non array name.
			value = options[ data.name ] ? options[ data.name ] : '';
		}

		return value;
	};
	let settings = [];

	switch ( props.tab ) {
		case 'product':
			settings = page_settings.settings[ 'checkout-offer-product' ];
			break;
		case 'content':
			settings = page_settings.settings[ 'checkout-offer-content' ];
			break;
		case 'styles':
			settings = page_settings.settings[ 'checkout-offer-styles' ];
			break;
		default:
			settings = page_settings.settings[ 'checkout-offer-product' ];
	}

	const printFields = function ( sectionData ) {
		return Object.keys( sectionData.section_fields ).map(
			( sectionField ) => {
				const data = sectionData.section_fields[ sectionField ];

				const value = get_value( data );
				const isActive = conditions.isActiveControl( data, options );

				return (
					<RenderFields
						key={ sectionField }
						// class={
						// 	sectionData.id && 'co-color' === sectionData.id
						// 		? 'bg-white px-3.5 py-3 !text-sm font-normal !rounded-md border !border-gray-200'
						// 		: ''
						// }
						data={ data }
						value={ value }
						isActive={ isActive }
						field={ sectionField }
						tabName={ props.tab ? props.tab : '' }
						displayAs={ props.displayAs ? props.displayAs : '' }
					/>
				);
			}
		);
	};

	return (
		<div className="wcf-list-options wcf-co-list-options">
			{ /* <h3 className="wcf-list-options__title">{ settings.title }</h3> */ }
			<div className="wcf-co-options-wrapper" id="wcf-co-options-wrapper">
				{ settings &&
					Object.keys( settings.fields ).map( ( field ) => {
						const sectionData = settings.fields[ field ];

						return sectionData.section_fields ? (
							<div
								key={ field }
								className={ `wcf-${
									props.tab ? props.tab : 'setting'
								}-tab--${
									sectionData.id
								}-section p-5 border border-gray-200 rounded-md mb-5` }
							>
								<div
									className={ `wcf-${
										props.tab ? props.tab : 'setting'
									}-tab--heading-section col-span-full` }
								>
									<SectionHeadingField
										label={ sectionData.title }
										labelClass="block text-base font-semibold text-gray-800 mb-5"
									/>
								</div>

								{ props.displayAs &&
								'tr' === props.displayAs ? (
									<table className="w-full">
										<tbody>
											{ printFields( sectionData ) }
										</tbody>
									</table>
								) : (
									<div className="wcf-co-list-options-container">
										{ printFields( sectionData ) }
									</div>
								) }
							</div>
						) : (
							<div
								key={ field }
								className={ `wcf-${
									props.tab ? props.tab : 'setting'
								}-tab--section mb-5` }
							>
								{ props.displayAs &&
								'tr' === props.displayAs ? (
									<table className="wcf-full">
										<tbody>
											{
												<RenderFields
													key={ field }
													data={ sectionData }
													value={ get_value(
														sectionData
													) }
													isActive={ conditions.isActiveControl(
														sectionData,
														options
													) }
													field={ sectionData }
													tabName={
														props.tab
															? props.tab
															: ''
													}
													displayAs={
														props.displayAs
															? props.displayAs
															: ''
													}
												/>
											}
										</tbody>
									</table>
								) : (
									<div className="wcf-co-list-options-container">
										{
											<RenderFields
												key={ field }
												data={ sectionData }
												value={ get_value(
													sectionData
												) }
												isActive={ conditions.isActiveControl(
													sectionData,
													options
												) }
												field={ sectionData }
												tabName={
													props.tab ? props.tab : ''
												}
												displayAs={
													props.displayAs
														? props.displayAs
														: ''
												}
											/>
										}
									</div>
								) }
							</div>
						);
					} ) }
			</div>
		</div>
	);
}

export default COListOptions;
