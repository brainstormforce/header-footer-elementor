import React, { useState } from 'react';
import './ColorPickerField.scss';
import { Tooltip } from '@Fields';
import { __ } from '@wordpress/i18n';
import blankColor from '@Images/blank-color.svg';

import { SketchPicker } from 'react-color';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

function ColorPickerField( props ) {
	const {
		name,
		label,
		value,
		isActive = true,
		tooltip,
		sectionClass = '',
		wrapperClass = '',
		labelClass = '',
		displayAlign = 'horizontal',
		withBg = false,
		showOverlay = false,
	} = props;

	let sectionWrapperClass = sectionClass
		? sectionClass
		: 'bg-white px-3.5 py-3 !text-sm font-normal !rounded-md border !border-gray-200 text-left';

	let fieldWrapper = wrapperClass
			? wrapperClass
			: 'flex justify-between items-center gap-2.5',
		labelWrapperClass = labelClass ? labelClass : 'text-sm font-medium';

	if ( 'horizontal' !== displayAlign ) {
		fieldWrapper = 'block w-full text-left';
		labelWrapperClass = labelWrapperClass + ' mb-2';
		sectionWrapperClass = '';
	}

	const [ displayColorPicker, setdisplayColorPicker ] = useState( false );
	const [ color, setColor ] = useState( value );

	const handleClick = () => {
		setdisplayColorPicker( ( prevValue ) => ! prevValue );
	};
	const handleClose = () => {
		setdisplayColorPicker( false );
	};
	const handleResetColor = () => {
		handleChange( '' );
	};

	const handleChange = ( newcolor ) => {
		if ( newcolor ) {
			setColor( newcolor.hex );
		} else {
			setColor( newcolor );
		}

		// Trigger change
		const changeEvent = new CustomEvent( 'wcf:color:change', {
			bubbles: true,
			detail: {
				e: 'color',
				name: props.name,
				value: newcolor ? newcolor.hex : newcolor,
			},
		} );

		document.dispatchEvent( changeEvent );
	};
	return (
		<div
			className={ `wcf-field wcf-color-field ${ sectionWrapperClass } ${
				! isActive ? 'wcf-hide' : ''
			}` }
		>
			<div className={ `wcf-field__data ${ fieldWrapper }` }>
				{ label && (
					<div
						className={ `wcf-field__data--label ${ labelWrapperClass }` }
					>
						<label>{ label }</label>
						{ tooltip && <Tooltip text={ tooltip } /> }
					</div>
				) }
				<div
					className={ `wcf-field__data--content ${
						withBg
							? 'bg-white px-2 py-2 !text-sm font-normal !rounded-md text-gray-400 border !border-gray-200'
							: ''
					}` }
				>
					<div className="wcf-colorpicker-selector flex items-center gap-2 justify-center cursor-pointer">
						<span
							className="wcf-colorpicker-reset"
							onClick={ handleResetColor }
							title={ __( 'Reset', 'cartflows' ) }
						>
							<ArrowPathIcon
								className={ `w-4 h-4 stroke-2 cursor-pointer ${
									color
										? 'text-gray-400 hover:text-gray-500'
										: 'text-gray-300 pointer-events-none'
								}` }
								aria-hidden="true"
							/>
						</span>
						<span className="border-l border-gray-200 text-gray-600 text-base font-normal px-3">
							{ color ? color : __( 'Default', 'cartflows' ) }
						</span>
						<div
							className="wcf-colorpicker-swatch-wrap"
							onClick={ handleClick }
						>
							{ color ? (
								<span
									className="wcf-colorpicker-swatch block rounded-full !w-5 !h-5 border border-gray-200 cursor-pointer"
									style={ { backgroundColor: color } }
								/>
							) : (
								<img
									src={ blankColor }
									alt="No Color"
									className="!w-5 !h-5 opacity-40"
								/>
							) }

							<span className="wcf-colorpicker-label sr-only">
								Select Color
							</span>
							<input
								type="hidden"
								name={ name }
								value={ color }
							/>
						</div>
					</div>
					<div className="wcf-color-picker relative">
						{ displayColorPicker ? (
							<div className="wcf-color-picker-popover absolute z-10 right-0 top-3">
								{ showOverlay && (
									<div
										className="wcf-color-picker-cover fixed inset-0"
										onClick={ handleClose }
									/>
								) }
								<SketchPicker
									name={ name }
									color={ color }
									onChange={ handleChange }
									disableAlpha={ true }
								/>
							</div>
						) : null }
					</div>
				</div>
			</div>
		</div>
	);
}

export default ColorPickerField;
