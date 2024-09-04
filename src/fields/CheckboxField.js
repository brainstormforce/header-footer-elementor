import React, { useState, useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Tooltip } from '@Fields';
import classnames from 'classnames';

function Checkbox( props ) {
	const {
		name,
		id,
		label,
		value,
		desc,
		backComp = false,
		tooltip,
		onClick,
		notice,
		child_class = '',
		isDisabled = false,
	} = props;

	const [ inputvalue, setInputvalue ] = useState( value );

	useEffect( () => {
		setInputvalue( value );
	}, [ value ] );

	const checkedvalue = backComp ? 'enable' : 'yes';
	const uncheckedvalue = backComp ? 'disable' : 'no';

	function handleCheckboxClick( e ) {
		let current_value = 'no';

		if ( e.target.checked ) {
			// Check is there any notice added in the checkbox.
			if ( notice && ! show_notice( notice ) ) {
				return;
			}

			setInputvalue( checkedvalue );
			current_value = checkedvalue;
		} else {
			setInputvalue( uncheckedvalue );
			current_value = uncheckedvalue;
		}

		// Trigger change
		const changeEvent = new CustomEvent( 'wcf:checkbox:change', {
			bubbles: true,
			detail: { e, name, value: current_value },
		} );

		document.dispatchEvent( changeEvent );
	}
	function onChangeHandle( e ) {
		if ( onClick ) {
			onClick( e );
		}
	}

	// Function to show desired alert box to get the confirmation from the user input.
	function show_notice() {
		switch ( notice.type ) {
			case 'alert':
				alert( notice.message );
				return true;
			case 'confirm':
				const is_confirm = confirm( notice.message );
				return is_confirm ? true : false;
			case 'prompt':
				const is_prompt = prompt( notice.message );
				return is_prompt === notice.check.toUpperCase() ? true : false;
			default:
				return false;
		}
	}

	return (
		<div className="wcf-field wcf-checkbox-field text-left">
			<div className="wcf-field__data flex items-center gap-2.5">
				<div className={ `wcf-field__data--content ${ child_class }` }>
					<input
						type="hidden"
						name={ name }
						defaultValue={ uncheckedvalue }
					/>
					<input
						type="checkbox"
						className={ classnames(
							props.class,
							'!h-5 !w-5 !rounded !border-gray-300 !text-primary-600 focus:!ring-primary-600 !shadow-none before:!content-none !outline-none !m-0'
						) }
						name={ name }
						value={ inputvalue }
						id={ id ? id : name }
						checked={ checkedvalue === inputvalue ? 'checked' : '' }
						onClick={ handleCheckboxClick }
						onChange={ onChangeHandle }
						disabled={ isDisabled }
					/>
				</div>

				{ label && (
					<div className="wcf-field__data--label text-sm font-medium text-left w-80">
						<label htmlFor={ id ? id : name } className="mr-3">
							{ label }
							{ tooltip && <Tooltip text={ tooltip } /> }
						</label>
					</div>
				) }
			</div>

			{ desc && (
				<div className="wcf-field__desc text-sm font-normal text-gray-500 mt-2">
					{ ReactHtmlParser( desc ) }
				</div>
			) }
		</div>
	);
}

export default Checkbox;
