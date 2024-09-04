import React, { useState, useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Tooltip } from '@Fields';
import classnames from 'classnames';

function ToggleField( props ) {
	const {
		name,
		id,
		label,
		value,
		desc,
		backComp = false,
		onClick,
		notice,
		isDisabled = false,
		tooltip,
		sectionClass = '',
		wrapperClass = '',
		labelClass = '',
		descClass = '',
		displayAlign = 'horizontal',
		fullWidth = true,
	} = props;

	const [ inputvalue, setInputvalue ] = useState( value );

	const sectionWrapperClass = sectionClass ? sectionClass : 'text-left',
		labelWrapperClass = labelClass
			? labelClass
			: 'text-sm font-medium text-left w-80',
		descWrapperClass = descClass
			? descClass
			: 'text-sm font-normal text-gray-500 mt-2';

	let fieldWrapper = wrapperClass
		? wrapperClass
		: `flex items-center gap-6 ${ fullWidth ? 'justify-between' : '' }`;

	if ( 'horizontal' !== displayAlign ) {
		fieldWrapper = 'block w-full text-left';
	}

	useEffect( () => {
		setInputvalue( value );
	}, [ value ] );

	const checkedvalue = backComp ? 'enable' : 'yes';
	const uncheckedvalue = backComp ? 'disable' : 'no';

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

	function handleCheckboxClick( e ) {
		let current_value = 'no';

		if ( uncheckedvalue === inputvalue ) {
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
		const changeEvent = new CustomEvent( 'wcf:toggle:change', {
			bubbles: true,
			detail: { e, name, value: current_value },
		} );

		document.dispatchEvent( changeEvent );
	}
	function onChangeHandle() {
		if ( onClick ) {
			onClick();
		}
	}

	return (
		<div
			className={ `wcf-field wcf-toggle-field ${ sectionWrapperClass } ` }
		>
			<div className={ `wcf-field__data ${ fieldWrapper }` }>
				{ label && (
					<div className="wcf-field__data--content-left flex-[0_0_35%]">
						<div
							className={ `wcf-field__data--label ${ labelWrapperClass }` }
						>
							<label>
								{ label }
								{ tooltip && <Tooltip text={ tooltip } /> }
							</label>
						</div>
					</div>
				) }
				<div className="wcf-field__data--content-right">
					<div className="flex justify-center">
						<button
							type="button"
							// name={ name }
							// value={ inputvalue }
							id={ id ? id : name }
							className={ classnames(
								props.class,
								'bg-gray-200 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2',
								checkedvalue === inputvalue
									? 'bg-primary-600'
									: 'bg-gray-200',
								isDisabled ? '!bg-primary-300' : ''
							) }
							disabled={ isDisabled }
							role="switch"
							onClick={ handleCheckboxClick }
							onChange={ onChangeHandle }
						>
							<input
								type="hidden"
								className={ props.class }
								name={ name }
								value={ inputvalue }
							/>
							<span
								aria-hidden="true"
								className={ classnames(
									checkedvalue === inputvalue
										? 'translate-x-5'
										: 'translate-x-0',
									'translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
								) }
							></span>
						</button>
					</div>
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

export default ToggleField;
