import React, { useState, useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Tooltip } from '@Fields';
import './Select2Field.scss';
import AsyncSelect from 'react-select/async';

function Select2Field( props ) {
	const {
		label,
		name,
		desc,
		value,
		tooltip,
		placeholder,
		onChangeCB,
		options,
		isMulti = false,
		attr,
	} = props;

	const [ selectedValue, setSelectedValue ] = useState( value );

	useEffect( () => {
		setSelectedValue( value );
	}, [ value ] );

	// handle selection
	// should fix, need proper naming for variables
	//eslint-disable-next-line no-shadow
	const handleChange = ( value ) => {
		setSelectedValue( value );

		// Trigger change
		const changeEvent = new CustomEvent( 'wcf:select2:change', {
			bubbles: true,
			detail: { e: {}, name: props.name, value },
		} );

		document.dispatchEvent( changeEvent );

		if ( onChangeCB ) {
			onChangeCB( value );
		}
	};

	const filterValues = ( inputValue ) => {
		return options.filter( ( i ) =>
			i.label.toLowerCase().includes( inputValue.toLowerCase() )
		);
	};

	const promiseOptions = ( inputValue ) =>
		new Promise( ( resolve ) => {
			setTimeout( () => {
				resolve( filterValues( inputValue ) );
			}, 1000 );
		} );

	const customStyles = {
		control: ( styles, state ) => ( {
			...styles,
			borderColor: state.isFocused ? '#F06434' : '#e5e7eb',
			boxShadow: state.isFocused
				? '0 0 0 calc(3px + 0px) rgb(252 224 214 / 1 )'
				: '',
			'&:hover': {
				borderColor: 'none',
			},
		} ),
	};

	return (
		<div className="wcf-select2-field">
			<div className="wcf-selection-field">
				{ label && (
					<label>
						{ label }
						{ tooltip && <Tooltip text={ tooltip } /> }
					</label>
				) }

				<AsyncSelect
					className="wcf-select2-input"
					classNamePrefix="wcf"
					name={ name }
					isClearable={ true }
					value={ selectedValue }
					getOptionLabel={ ( e ) => e.label }
					getOptionValue={ ( e ) => e.value }
					loadOptions={ promiseOptions }
					onChange={ handleChange }
					placeholder={ placeholder }
					defaultOptions={ options }
					cacheOptions
					isMulti={ isMulti }
					styles={ customStyles }
					{ ...attr }
				/>
			</div>
			{ desc && (
				<div className="wcf-field__desc text-sm font-regular">
					{ ReactHtmlParser( desc ) }
				</div>
			) }
		</div>
	);
}

export default Select2Field;
