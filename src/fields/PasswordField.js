import React, { useState, useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Tooltip } from '@Fields';
import './PasswordField.scss';

function PasswordField( props ) {
	const {
		name,
		id,
		label,
		value,
		placeholder,
		tooltip,
		desc,
		type,
		min,
		max,
		readonly,
		icon,
		onChangeCB,
		iconOnClick,
		afterClickIcon,
		attr,
	} = props;

	const [ inputvalue, setInputvalue ] = useState( value );
	const [ inputfieldtype, setInputfieldType ] = useState(
		type ? type : 'password'
	);
	const [ fieldicon, setFieldIcon ] = useState( icon ? icon : '' );

	useEffect( () => {
		setInputvalue( value );
		setInputfieldType( type );
		setFieldIcon( icon );
	}, [ value ] );

	function handleChange( e ) {
		setInputvalue( e.target.value );

		// Trigger change
		const changeEvent = new CustomEvent( 'wcf:password:change', {
			bubbles: true,
			detail: { e, name: props.name, value: e.target.value },
		} );

		document.dispatchEvent( changeEvent );

		if ( onChangeCB ) {
			onChangeCB( e.target.value );
		}
	}

	function handleIconClick() {
		if ( iconOnClick && 'show_field_value' === iconOnClick ) {
			if ( 'text' === inputfieldtype ) {
				setInputfieldType( 'password' );
				setFieldIcon( icon );
			} else {
				setInputfieldType( 'text' );
				setFieldIcon( afterClickIcon );
			}
		}
	}

	return (
		<div className="wcf-field wcf-password-field">
			<div className="wcf-field__data flex items-center gap-2.5">
				{ label && (
					<div className="wcf-field__data--label text-sm font-medium text-left">
						<label>
							{ label }
							{ tooltip && <Tooltip text={ tooltip } /> }
						</label>
					</div>
				) }

				<div className="wcf-field__data--content">
					<input
						{ ...attr }
						type={ inputfieldtype }
						className={ props.class }
						name={ name }
						value={ inputvalue }
						id={ id }
						onChange={ handleChange }
						placeholder={ placeholder }
						min={ min }
						max={ max }
						readOnly={ readonly }
					></input>
					{ fieldicon && (
						<div className="wcf-password-field__icon">
							<span
								className={ fieldicon }
								onClick={ handleIconClick }
							></span>
						</div>
					) }
				</div>
			</div>

			{ desc && (
				<div className="wcf-field__desc text-sm font-normal text-gray-500 mt-2">
					{ ReactHtmlParser( desc ) }
				</div>
			) }
		</div>
	);
}

export default PasswordField;
