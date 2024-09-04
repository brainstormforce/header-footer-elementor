import React, { useState, useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { decode } from 'html-entities';
import { Tooltip } from '@Fields';

function TextareaField( props ) {
	const {
		name,
		value,
		label,
		desc,
		id,
		placeholder,
		tooltip,
		rows,
		cols,
		sectionClass = false,
		wrapperClass = false,
		labelClass = '',
		descClass = 'text-sm font-normal text-gray-500 mt-2',
		displayAlign = 'horizontal',
	} = props;

	const sectionWrapperClass = sectionClass ? sectionClass : 'text-left',
		inputFieldClasses = `${
			props.class ? props.class : ''
		} !w-full !max-w-full input-field !px-3 !py-2.5 !text-sm font-normal !rounded-md !border-gray-200 focus:ring focus:!ring-primary-100 focus:!border-primary-500 focus:!shadow-none !outline-0 !outline-none !m-0 !placeholder-gray-400`;

	let fieldWrapper = wrapperClass
			? wrapperClass
			: 'flex items-center gap-2.5',
		labelWrapperClass = labelClass
			? labelClass
			: 'text-sm font-medium text-left mb-2';

	if ( 'horizontal' !== displayAlign ) {
		fieldWrapper = 'block w-full text-left';
		labelWrapperClass = labelWrapperClass + ' mb-2';
	}
	const [ inputValue, setInputvalue ] = useState( value );

	useEffect( () => {
		setInputvalue( value );
	}, [ value ] );

	function handleChange( e ) {
		setInputvalue( e.target.value );

		// Trigger change
		const changeEvent = new CustomEvent( 'wcf:textarea:change', {
			bubbles: true,
			detail: { e, name: props.name, value: e.target.value },
		} );

		document.dispatchEvent( changeEvent );
	}

	return (
		<div
			className={ `wcf-field wcf-textarea-field ${ sectionWrapperClass } ` }
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

				<div className="wcf-field__data--content">
					<textarea
						className={ inputFieldClasses }
						name={ name }
						value={ decode( inputValue ) }
						id={ id }
						onChange={ handleChange }
						placeholder={ placeholder }
						rows={ rows ? rows : '10' }
						cols={ cols ? cols : '60' }
					></textarea>
				</div>
			</div>
			{ desc && (
				<div className={ `wcf-field__desc ${ descClass }` }>
					{ ReactHtmlParser( desc ) }
				</div>
			) }
		</div>
	);
}

export default TextareaField;
