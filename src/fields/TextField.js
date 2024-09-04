import React, { useState, useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Tooltip } from '@Fields';
import { decode } from 'html-entities';

function TextField( props ) {
	const {
		name,
		id,
		label,
		value,
		placeholder,
		tooltip,
		desc,
		readonly,
		icon,
		textFieldType = 'text',
		onChangeCB,
		sectionClass = false,
		wrapperClass = false,
		labelClass = '',
		descClass = 'text-sm font-normal text-gray-500 mt-2',
		displayAlign = 'horizontal',
		attr,
	} = props;

	const [ inputValue, setInputvalue ] = useState( value );

	const sectionWrapperClass = sectionClass ? sectionClass : 'text-left',
		inputFieldClasses = `${ props.class ? props.class : '' } ${
			readonly ? '!bg-gray-50' : ''
		} !w-full !max-w-full !h-auto input-field !px-3 !py-2.5 !text-sm font-normal !rounded-md text-gray-400 !border-gray-200 focus:ring focus:!ring-primary-100 focus:!border-primary-500 focus:!shadow-none !outline-0 !outline-none !m-0 !placeholder-gray-400`;

	let fieldWrapper = wrapperClass
			? wrapperClass
			: 'flex items-center gap-2.5',
		labelWrapperClass = labelClass
			? labelClass
			: 'text-sm font-medium text-left';

	if ( 'horizontal' !== displayAlign ) {
		fieldWrapper = 'block w-full text-left';
		labelWrapperClass = labelWrapperClass + ' mb-2';
	}

	useEffect( () => {
		setInputvalue( value );
	}, [ value ] );

	function handleChange( e ) {
		setInputvalue( e.target.value );

		// Trigger change
		const changeEvent = new CustomEvent( 'wcf:text:change', {
			bubbles: true,
			detail: { e, name: props.name, value: e.target.value },
		} );

		document.dispatchEvent( changeEvent );

		if ( onChangeCB ) {
			onChangeCB( e.target.value );
		}
	}

	return (
		<div className={ `wcf-field wcf-text-field ${ sectionWrapperClass } ` }>
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

				<div className="wcf-field__data--content">
					<input
						{ ...attr }
						type={ textFieldType }
						className={ inputFieldClasses }
						name={ name }
						value={ decode( inputValue ) }
						id={ id }
						onChange={ handleChange }
						placeholder={ placeholder }
						// min={ min }
						// max={ max }
						readOnly={ readonly }
					></input>
				</div>
			</div>
			{ icon && (
				<div className="wcf-text-field__icon">
					<span className={ icon }></span>
				</div>
			) }
			{ desc && (
				<div className={ `wcf-field__desc ${ descClass }` }>
					{ ReactHtmlParser( desc ) }
				</div>
			) }
		</div>
	);
}

export default TextField;
