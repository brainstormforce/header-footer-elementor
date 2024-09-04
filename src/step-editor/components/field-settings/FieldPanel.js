import React from 'react';
import { useStateValue } from '@Utils/StateProvider';
import {
	CheckboxField,
	SelectField,
	TextField,
	DocField,
	NumberField,
} from '@Admin/fields';

function FieldPanel( props ) {
	const { innerField, innerFieldData } = props;

	const [ { options } ] = useStateValue();

	const getFieldValue = function ( data ) {
		const name = data.name;
		let value = '';

		if ( name.includes( '[' ) ) {
			const newTxt = name.split( '[' );
			const arr = [];
			for ( let i = 1; i < newTxt.length; i++ ) {
				arr.push( newTxt[ i ].split( ']' )[ 0 ] );
			}

			const newName = name.substr( 0, name.indexOf( '[' ) );

			switch ( arr.length ) {
				case 2:
					value = options[ newName ][ arr[ 0 ] ][ arr[ 1 ] ];
					break;
				case 3:
					value =
						options[ newName ][ arr[ 0 ] ][ arr[ 1 ] ][ arr[ 2 ] ];
					break;
				case 4:
					value =
						options[ newName ][ arr[ 0 ] ][ arr[ 1 ] ][ arr[ 2 ] ][
							arr[ 3 ]
						];
					break;

				default:
					value = options[ newName ][ arr[ 0 ] ];
					break;
			}
		} else {
			value = options[ data.name ] ? options[ data.name ] : data.value;
		}

		return value;
	};

	return (
		<div
			className={
				'wcf-field-item--fields-settings__wrapper bg-gray-50 hidden p-5 border-x border-gray-200 last:border-b'
			}
			id={ `wcf-field-setting-${ innerField }` }
		>
			{ innerFieldData &&
				Object.keys( innerFieldData.field_options ).map( ( key ) => {
					const data = innerFieldData.field_options[ key ];
					let component = '';

					const value = getFieldValue( data );

					switch ( data.type ) {
						case 'text':
							component = (
								<TextField
									class="w-full max-w-full input-field !px-3 !py-2.5 !text-sm font-normal !rounded-md text-gray-400 !border-gray-200 focus:ring focus:!ring-primary-100 focus:!border-primary-500 focus:!shadow-none !outline-0 !outline-none !m-0"
									name={ data.name }
									value={ value }
									label={ data.label }
									placeholder={ data.placeholder }
									readonly={ data.readonly }
									tooltip={ data.tooltip }
									displayAlign="vertical"
								/>
							);

							break;
						case 'number':
							component = (
								<NumberField
									class="w-full max-w-full input-field !px-3 !py-2.5 !text-sm font-normal !rounded-md text-gray-400 !border-gray-200 focus:ring focus:!ring-primary-100 focus:!border-primary-500 focus:!shadow-none !outline-0 !outline-none !m-0"
									name={ data.name }
									value={ value }
									label={ data.label }
									readonly={ data.readonly }
									tooltip={ data.tooltip }
									displayAlign="vertical"
								/>
							);

							break;

						case 'checkbox':
							component = (
								<CheckboxField
									class={ data.class }
									name={ data.name }
									value={ value }
									label={ data.label }
									desc={ data.desc }
									child_className={ data.child_class }
								/>
							);

							break;

						case 'select':
							component = (
								<SelectField
									class={ data.class }
									name={ data.name }
									value={ value }
									label={ data.label }
									options={ data.options }
									tooltip={ data.tooltip }
									displayAlign="vertical"
								/>
							);
							break;

						case 'doc':
							component = <DocField content={ data.content } />;
							break;
						default:
							break;
					}
					return (
						<div
							key={ data.name }
							className={ `wcf-cfe-field-setting__panel wcf-cfe-field-${ key } mb-5 ${
								'enable-field' === key ||
								'required-field' === key
									? 'hidden'
									: ''
							}` }
						>
							{ component }
						</div>
					);
				} ) }
		</div>
	);
}

export default FieldPanel;
