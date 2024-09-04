import React, { useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Tooltip, SelectField } from '@Fields';
import AsyncSelect from 'react-select/async';

function FontFamily( props ) {
	const {
		name,
		label,
		value,
		desc,
		tooltip,
		font_weight_name = '',
		font_weight_value = '',
		sectionClass = false,
		wrapperClass = false,
		labelClass = '',
		displayAlign = 'horizontal',
	} = props;

	const sectionWrapperClass = sectionClass ? sectionClass : 'text-left';

	let fieldWrapper = wrapperClass
			? wrapperClass
			: 'flex items-center gap-2.5',
		labelWrapperClass = labelClass ? labelClass : 'text-sm font-normal';

	if ( 'horizontal' !== displayAlign ) {
		fieldWrapper = 'block w-full text-left';
		labelWrapperClass = labelWrapperClass + ' mb-2';
	}

	const cf_font_family = cartflows_admin.cf_font_family;

	const default_value = ! value ? 'Default' : value;

	const [ selectedValue, setSelectedValue ] = useState( {
		value,
		label:
			value && value.match( /'([^']+)'/ )
				? value.match( /'([^']+)'/ )[ 1 ]
				: default_value,
	} );

	const [ weightvalue, setWeight ] = useState( font_weight_value );

	const filterFont = ( inputValue ) => {
		const system_fonts = cf_font_family[ 1 ].options,
			google_font = cf_font_family[ 2 ].options,
			default_font = cf_font_family[ 0 ],
			fonts = system_fonts.concat( google_font, default_font );

		return fonts.filter( ( i ) =>
			i.label.toLowerCase().includes( inputValue.toLowerCase() )
		);
	};

	const prepareweightList = function ( currentValue ) {
		let font_family = currentValue.value;

		const weight = [];

		if ( 'undefined' === typeof font_family || '' === font_family ) {
			weight.push( { value: '', label: 'Default' } );
			return weight;
		}

		const temp = font_family.match( "'(.*)'" );

		const google_font_families = {};

		if ( temp && temp[ 1 ] ) {
			font_family = temp[ 1 ];
		}

		const new_font_weights = {};

		if ( cartflows_admin.google_fonts[ font_family ] ) {
			const google_fonts_variants =
				cartflows_admin.google_fonts[ font_family ].variants;

			google_fonts_variants.map( ( index ) => {
				if ( ! index.includes( 'italic' ) ) {
					new_font_weights[ index ] =
						cartflows_admin.font_weights[ index ];
				}
				return '';
			} );

			Object.keys( new_font_weights ).map( ( val ) => {
				const value1 = new_font_weights[ val ];
				weight.push( { value: val, label: value1 } );
				return '';
			} );

			const temp_font_family = font_family.replace( ' ', '+' );
			google_font_families[ temp_font_family ] = new_font_weights;
		} else if ( cartflows_admin.system_fonts[ font_family ] ) {
			const system_font_variants =
				cartflows_admin.system_fonts[ font_family ].variants;

			system_font_variants.map( ( index ) => {
				if ( ! index.includes( 'italic' ) ) {
					new_font_weights[ index ] =
						cartflows_admin.font_weights[ index ];
				}
				return '';
			} );

			Object.keys( new_font_weights ).map( ( val ) => {
				const value1 = new_font_weights[ val ];
				weight.push( { val, label: value1 } );
				return '';
			} );
		}

		return weight;
	};

	const handleChange = ( currentValue ) => {
		setSelectedValue( currentValue );

		const new_weight_list = prepareweightList( currentValue );

		weightList = new_weight_list;

		//Trigger change
		const changeEvent = new CustomEvent( 'wcf:font:change', {
			bubbles: true,
			detail: { name: props.name, value: currentValue.value },
		} );

		document.dispatchEvent( changeEvent );
	};
	const loadOptions = ( inputValue ) => {
		return new Promise( ( resolve ) => {
			setTimeout( () => {
				resolve( filterFont( inputValue ) );
			}, 1000 );
		} );
	};

	const setWeightValue = function ( val ) {
		setWeight( val );
	};

	let weightList = prepareweightList( selectedValue );

	const customStyles = {
		control: ( styles, state ) => ( {
			...styles,
			borderColor: state.isFocused ? '#F06434' : '#e5e7eb',
			boxShadow: state.isFocused ? 'none' : '',
			borderRadius: '6px',
			'&:hover': {
				borderColor: 'none',
			},
		} ),
	};

	return (
		<div
			className={ `wcf-field wcf-font-family-field ${ sectionWrapperClass } ` }
		>
			<div className={ `wcf-field__data ${ fieldWrapper }` }>
				{ label && (
					<div
						className={ `wcf-field__data--label ${ labelWrapperClass }` }
					>
						<label>
							{ label }
							{ tooltip && <Tooltip text={ tooltip } /> }
						</label>
					</div>
				) }
				<div className="wcf-selection-field">
					<AsyncSelect
						name={ name }
						className={ 'wcf-select2-input' }
						classNamePrefix="wcf"
						cacheOptions
						defaultOptions={ cf_font_family }
						value={ selectedValue }
						loadOptions={ loadOptions }
						onChange={ handleChange }
						styles={ customStyles }
					/>
				</div>
			</div>
			{ desc && (
				<div className="wcf-field__desc text-sm font-regular">
					{ ReactHtmlParser( desc ) }
				</div>
			) }

			{ '' !== font_weight_name && (
				<div className="wcf-font-weight-field mt-8">
					<SelectField
						name={ font_weight_name }
						className="wcf-select-input"
						value={ weightvalue }
						onChange={ setWeightValue }
						options={ weightList }
						label="Font Weight"
						displayAlign={ displayAlign }
					/>
				</div>
			) }
		</div>
	);
}

export default FontFamily;
