import React, { useState, useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Tooltip } from '@Fields';

function NumberField( props ) {
	const {
		name,
		id,
		label,
		desc,
		value,
		tooltip,
		placeholder,
		min,
		max,
		width,
		afterfield,
		readonly,
		wrapperClass = false,
		labelClass,
		sectionClass,
		descClass,
		displayAlign = 'horizontal',
	} = props;
	const [ inputvalue, setInputvalue ] = useState( value );

	const sectionWrapperClass = sectionClass ? sectionClass : 'text-left',
		labelWrapperClass = labelClass
			? labelClass
			: 'text-sm font-medium mb-2',
		descWrapperClass = descClass
			? descClass
			: 'text-sm font-normal text-gray-500 mt-2',
		defaultFieldClass =
			'!w-full !h-auto input-field !px-3 !py-2.5 !text-sm font-normal !rounded-md text-gray-400 !border-gray-200 focus:ring focus:!ring-primary-100 focus:!border-primary-500 focus:!shadow-none !outline-0 !outline-none !m-0 !placeholder-gray-400';

	let fieldWrapper = wrapperClass
		? wrapperClass
		: 'flex items-center gap-2.5';

	if ( 'horizontal' !== displayAlign ) {
		fieldWrapper = 'block w-full text-left';
	}

	useEffect( () => {
		setInputvalue( value );
	}, [ value ] );

	function handleChange( e ) {
		const field_name = document.getElementsByName(
			e.target.getAttribute( 'name' )
		);
		field_name[ 0 ].setAttribute( 'value', e.target.value );

		setInputvalue( e.target.value );

		// Trigger change
		const changeEvent = new CustomEvent( 'wcf:number:change', {
			bubbles: true,
			detail: { e, name, value: e.target.value },
		} );

		document.dispatchEvent( changeEvent );
	}

	return (
		<div
			className={ `wcf-field wcf-number-field ${ sectionWrapperClass }` }
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

				<div className="wcf-field__data--content flex items-center">
					<input
						type="number"
						className={
							props.class ? props.class : defaultFieldClass
						}
						name={ name }
						value={ inputvalue }
						id={ id }
						onChange={ handleChange }
						placeholder={ placeholder }
						min={ min }
						max={ max }
						readOnly={ readonly }
						inputMode="numeric"
						style={ { width } }
					></input>
					{ afterfield && (
						<span className="wcf-field__data--after-field ml-1 font-medium">
							{ afterfield }
						</span>
					) }
				</div>
			</div>
			{ desc && (
				<div className={ `wcf-field__desc ${ descWrapperClass }` }>
					{ ReactHtmlParser( desc ) }
				</div>
			) }
		</div>
	);
}

export default NumberField;
