import React, { useState } from 'react';
import { Transition } from '@headlessui/react';
import ReactHtmlParser from 'react-html-parser';
import {
	CheckboxField,
	SelectField,
	TextField,
	TextareaField,
	NumberField,
} from '@Fields';
import { __, sprintf } from '@wordpress/i18n';
import { PlusIcon } from '@heroicons/react/24/outline';

function CustomEditor( props ) {
	const { addNewField, step_type } = props;
	const defaultButtonText = __( 'Add New Field', 'cartflows' );
	const defaultDateTimeLabel = __( 'Date & Time', 'cartflows' );

	const [ showPopup, setShowPopup ] = useState( false );
	const [ processingStatus, setProcessingStatus ] = useState( false );
	const [ text, setText ] = useState( defaultButtonText );
	const [ fieldId, setFieldID ] = useState();

	const closePopup = function () {
		setShowPopup( false );
		setProcessingStatus( false );
		setRequired( false );
		setText( defaultButtonText );
	};

	/* It is just to show popup */
	const clickAddCustomField = function ( e ) {
		e.preventDefault();

		setFieldID( '' );
		setShowPopup( ! showPopup );
	};

	const closeAddNewField = function ( e ) {
		e.preventDefault();
		setShowPopup( false );
	};

	/* Actual add field and ajax call */
	const clickAddNewField = function ( e ) {
		e.preventDefault();
		setText( __( 'Adding…', 'cartflows' ) );
		setProcessingStatus( true );

		if ( ! processingStatus ) {
			const resp = addNewField( e, closePopup );
			// Stop the processing if there is an error due to required field.
			if ( ! resp ) {
				setProcessingStatus( false );
			}
		}
	};

	const [ fieldType, setFieldType ] = useState( false );
	const [ required, setRequired ] = useState( false );
	const [ placeholder, setPlaceholder ] = useState( true );
	const [ checkbox, setCheckbox ] = useState( false );
	const [ radioButton, setRadioButton ] = useState( false );
	const [ options, setOptions ] = useState( false );
	const [ dateInput, setDateInput ] = useState( 'datetime-local' );
	const [ minMaxLabel, setMinMaxLabel ] = useState( defaultDateTimeLabel );

	const handleRequired = function () {
		setRequired( ! required );
	};

	const handleType = function () {
		const type = document.getElementById(
			'wcf-checkout-custom-fields[0][type]'
		).value;

		setCheckbox( false );
		setRadioButton( false );
		setOptions( false );
		setPlaceholder( false );

		if ( 'text' === type || 'textarea' === type ) {
			setPlaceholder( true );
		} else if ( 'select' === type ) {
			setOptions( true );
		} else if ( 'checkbox' === type ) {
			setCheckbox( true );
		} else if ( 'radio' === type ) {
			setRadioButton( true );
		}

		setFieldType( type );
	};

	/**
	 *
	 * @param {string} term field value.
	 */
	const convertValueToKey = function ( term ) {
		// Replace all special characters with space.
		let field_id = term.replace( /[^a-zA-Z\d ]/g, ' ' );

		// Replace all spaces with underscores and convert it into lower case for key.
		field_id = field_id.replace( /\s/g, '_' ).toLowerCase();

		// Place the updated field key in the field.
		setFieldID( field_id );
	};

	const changeDefaultFormat = function ( e ) {
		setDateInput( e.target.value );

		if ( 'datetime-local' === e.target.value ) {
			setMinMaxLabel( defaultDateTimeLabel );
		} else {
			setMinMaxLabel( e.target.value );
		}
	};

	const getPlaceholderForDate = function () {
		let datePlaceholder = '';

		if ( 'datetime' !== fieldType ) {
			return datePlaceholder;
		}

		switch ( dateInput ) {
			case 'date':
				datePlaceholder = 'yyyy-mm-dd';
				break;
			case 'time':
				datePlaceholder = 'hh:mm';
				break;
			case 'datetime-local':
				datePlaceholder = 'yyyy-mm-dd hh.mm';
				break;
			default:
				datePlaceholder = '';
		}

		return datePlaceholder;
	};

	const fieldEditor = function () {
		const add_to = [
				{
					value: 'billing',
					label: __( 'Billing', 'cartflows' ),
				},
				{
					value: 'shipping',
					label: __( 'Shipping', 'cartflows' ),
				},
			],
			type = [
				{
					value: 'text',
					label: __( 'Text', 'cartflows' ),
				},
				{
					value: 'textarea',
					label: __( 'TextArea', 'cartflows' ),
				},
				{
					value: 'number',
					label: __( 'Number', 'cartflows' ),
				},
				{
					value: 'datetime',
					label: __( 'Date & Time', 'cartflows' ),
				},
				{
					value: 'checkbox',
					label: __( 'Checkbox', 'cartflows' ),
				},
				{
					value: 'radio',
					label: __( 'Radio', 'cartflows' ),
				},
				{
					value: 'select',
					label: __( 'Select', 'cartflows' ),
				},
				{
					value: 'hidden',
					label: __( 'Hidden', 'cartflows' ),
				},
			],
			width = [
				{
					value: '33',
					label: __( '33%', 'cartflows' ),
				},
				{
					value: '50',
					label: __( '50%', 'cartflows' ),
				},
				{
					value: '100',
					label: __( '100%', 'cartflows' ),
				},
			];
		const commonCpfClass =
			'w-full max-wi-full input-field !px-3 !py-2.5 !text-sm font-normal !rounded-md text-gray-400 !border-gray-200 focus:ring focus:!ring-primary-100 focus:!border-primary-500 focus:!shadow-none !outline-0 !outline-none !m-0';

		return (
			<form className="wcf-custom-field-form--wrapper bg-white border border-gray-200 rounded-md text-left p-5">
				<h2 className="wcf-custom-field-form--header text-base font-semibold text-gray-800 text-left pb-5 flex justify-between items-center">
					{ __( 'Add Custom Field', 'cartflows' ) }
					{ /* <XMarkIcon
						className="w-6 h-6 p-1 text-gray-400 hover:text-gray-500 border border-gray-200 rounded-md cursor-pointer"
						onClick={ closeAddNewField }
					/> */ }
				</h2>
				{ 'checkout' === step_type && (
					<div className="wcf-custom-field-form--field-row pb-5">
						<SelectField
							class="wcf-cpf-add_to"
							name="wcf-checkout-custom-fields[0][add_to]"
							options={ add_to }
							label={ __( 'Add To', 'cartflows' ) }
							displayAlign="vertical"
						/>
					</div>
				) }
				<div className="wcf-custom-field-form--field-row pb-5">
					<SelectField
						class="wcf-cpf-type"
						id="wcf-checkout-custom-fields[0][type]"
						name="wcf-checkout-custom-fields[0][type]"
						options={ type }
						label={ __( 'Type', 'cartflows' ) }
						onSelect={ handleType }
						displayAlign="vertical"
					/>
				</div>

				<div className="wcf-custom-field-form--field-row pb-5">
					<TextField
						class={ `wcf-cpf-label ${ commonCpfClass }` }
						name="wcf-checkout-custom-fields[0][label]"
						label={ ReactHtmlParser(
							sprintf(
								/* translators: %$s is replaced with the HTML tag */
								__( 'Label %1$s*%2$s', 'cartflows' ),
								'<span class="text-primary-300">',
								'</span>'
							)
						) }
						onChangeCB={ convertValueToKey }
						displayAlign="vertical"
					/>
				</div>

				<div className="wcf-custom-field-form--field-row pb-5">
					<TextField
						class={ `wcf-cpf-name ${ commonCpfClass }` }
						name="wcf-checkout-custom-fields[0][key]"
						value={ fieldId }
						label={ __( 'Field ID', 'cartflows' ) }
						tooltip={ sprintf(
							/* translators: %$s is replaced with the HTML tag */
							__(
								'Field value will store in this meta key. Add field id without prefix like "billing_" or "shipping_". %s Use "_" instead of spaces.',
								'cartflows'
							),
							'<br>'
						) }
						displayAlign="vertical"
					/>
				</div>

				{ 'number' === fieldType && (
					<>
						<div className="wcf-custom-field-form--field-row pb-5">
							<NumberField
								class={ `wcf-cpf-min ${ commonCpfClass }` }
								name="wcf-checkout-custom-fields[0][min]"
								label={ __( 'Min Value', 'cartflows' ) }
								displayAlign="vertical"
								min={ 0 }
							/>
						</div>
						<div className="wcf-custom-field-form--field-row pb-5">
							<NumberField
								class={ `wcf-cpf-max ${ commonCpfClass }` }
								name="wcf-checkout-custom-fields[0][max]"
								label={ __( 'Max Value', 'cartflows' ) }
								displayAlign="vertical"
								min={ 0 }
							/>
						</div>
					</>
				) }

				{ ( options || radioButton ) && (
					<div className="wcf-custom-field-form--field-row pb-5">
						<TextareaField
							class={ `wcf-cpf-options ${ commonCpfClass }` }
							name="wcf-checkout-custom-fields[0][options]"
							label={ __( 'Options', 'cartflows' ) }
							placeholder={ __(
								'Enter your options separated by (|).',
								'cartflows'
							) }
							displayAlign="vertical"
						/>
					</div>
				) }
				{ checkbox && (
					<div className="wcf-custom-field-form--field-row pb-5">
						<SelectField
							class="wcf-cpf-default"
							name="wcf-checkout-custom-fields[0][default]"
							label={ __( 'Default', 'cartflows' ) }
							options={ [
								{
									value: '1',
									label: __( 'Checked', 'cartflows' ),
								},
								{
									value: '0',
									label: __( 'UnChecked', 'cartflows' ),
								},
							] }
							displayAlign="vertical"
						/>
					</div>
				) }

				{ 'datetime' === fieldType && (
					<>
						<div className="wcf-custom-field-form--field-row pb-5">
							<SelectField
								class={ `wcf-cpf-date-input ${ commonCpfClass }` }
								name="wcf-checkout-custom-fields[0][date_input]"
								label={ __( 'Field Input Type', 'cartflows' ) }
								options={ [
									{
										label: __( 'Date & Time', 'cartflows' ),
										value: 'datetime-local',
									},
									{
										label: __( 'Date', 'cartflows' ),
										value: 'date',
									},
									{
										label: __( 'Time', 'cartflows' ),
										value: 'time',
									},
								] }
								displayAlign="vertical"
								value={ dateInput }
								onSelect={ changeDefaultFormat }
							/>
						</div>
						<div className="wcf-custom-field-form--field-row pb-5">
							<TextField
								class={ `wcf-cpf-min-date ${ commonCpfClass }` }
								labelClass={
									'text-sm font-medium text-left capitalize'
								}
								textFieldType={ dateInput }
								name="wcf-checkout-custom-fields[0][default]"
								label={
									__( 'Min ', 'cartflows' ) + minMaxLabel
								}
								displayAlign="vertical"
								placeholder={ getPlaceholderForDate() }
							/>
						</div>
						<div className="wcf-custom-field-form--field-row pb-5">
							<TextField
								class={ `wcf-cpf-max-date ${ commonCpfClass }` }
								labelClass={
									'text-sm font-medium text-left capitalize'
								}
								textFieldType={ dateInput }
								name="wcf-checkout-custom-fields[0][default]"
								label={
									__( 'Max ', 'cartflows' ) + minMaxLabel
								}
								displayAlign="vertical"
								placeholder={ getPlaceholderForDate() }
							/>
						</div>
					</>
				) }

				{ ! checkbox && (
					<div className="wcf-custom-field-form--field-row pb-5">
						<TextField
							class={ `wcf-cpf-default ${ commonCpfClass }` }
							textFieldType={
								'datetime' === fieldType && dateInput
									? dateInput
									: 'text'
							}
							name="wcf-checkout-custom-fields[0][default]"
							label={ __( 'Default', 'cartflows' ) }
							displayAlign="vertical"
							placeholder={ getPlaceholderForDate() }
						/>
					</div>
				) }

				{ placeholder && (
					<div className="wcf-custom-field-form--field-row pb-5">
						<TextField
							class={ `wcf-cpf-placeholder ${ commonCpfClass }` }
							name="wcf-checkout-custom-fields[0][placeholder]"
							label={ __( 'Placeholder', 'cartflows' ) }
							displayAlign="vertical"
						/>
					</div>
				) }

				<div className="wcf-custom-field-form--field-row pb-5">
					<SelectField
						class="wcf-cpf-width"
						name="wcf-checkout-custom-fields[0][width]"
						options={ width }
						value="100"
						label={ __( 'Width', 'cartflows' ) }
						displayAlign="vertical"
					/>
				</div>
				<div className="wcf-custom-field-form--field-row pb-5">
					<CheckboxField
						class="wcf-cpf-show-in-email"
						name="wcf-checkout-custom-fields[0][show_in_email]"
						label={ __( 'Show in Email', 'cartflows' ) }
					/>
				</div>
				<div className="wcf-custom-field-form--field-row pb-5">
					<CheckboxField
						class="wcf-cpf-required"
						name="wcf-checkout-custom-fields[0][required]"
						label={ __( 'Required', 'cartflows' ) }
						onClick={ handleRequired }
					/>
				</div>
				{ ! required && 'optin' !== step_type && (
					<div className="wcf-custom-field-form--field-row pb-5">
						<CheckboxField
							class="wcf-cpf-optimized"
							name="wcf-checkout-custom-fields[0][optimized]"
							label={ __( 'Collapsible', 'cartflows' ) }
						/>
					</div>
				) }

				<div className="flex items-center gap-x-6 border-t border-gray-200 py-4">
					<button
						className="wcf-button wcf-secondary-button"
						onClick={ clickAddNewField }
					>
						{ text }
					</button>
					<button
						type="button"
						className="wcf-button bg-gray-50"
						onClick={ closeAddNewField }
					>
						{ __( 'Cancel', 'cartflows' ) }
					</button>
				</div>
			</form>
		);
	};
	return (
		<div className="wcf-custom-field-box">
			<div className="text-right">
				<button
					className="wcf-add-custom-field wcf-button wcf-secondary-button focus:ring-0"
					onClick={ clickAddCustomField }
				>
					<PlusIcon
						className={ `h-18 w-18 ease-in-out duration-300 text-primary-500 ${
							showPopup ? 'rotate-45' : ''
						}` }
					/>
					{ ! showPopup
						? __( 'Add Custom Field', 'cartflows' )
						: __( 'Cancel', 'cartflows' ) }
				</button>
			</div>

			<Transition
				show={ showPopup }
				enter="transition-all ease duration-700 transform"
				enterFrom="opacity-0 translate-y-0"
				enterTo="opacity-100 translate-y-5"
				leave="transition-all ease duration-500 transform"
				leaveFrom="opacity-100 translate-y-0"
				leaveTo="opacity-0 translate-y-0"
			>
				<div className="wcf-cfe-content">{ fieldEditor() }</div>
			</Transition>
		</div>
	);
}

export default CustomEditor;
