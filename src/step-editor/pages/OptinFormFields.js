import React from 'react';
import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';
import { useStateValue } from '@Utils/StateProvider';
import { ToggleField } from '@Admin/fields';
import FieldSettings from '@StepEditor/components/field-settings/FieldSettings';
import CustomEditor from '@StepEditor/components/field-settings/CustomEditor';
import OptinFormFieldsSkeleton from '@StepEditor/components/steps-page/OptinFormFieldsSkeleton';
function OptinFormFields() {
	const [ { custom_fields, step_id, options, billing_fields }, dispatch ] =
		useStateValue();

	if ( undefined === custom_fields ) {
		return <OptinFormFieldsSkeleton />;
	}

	const extra_fields = custom_fields.extra_fields;

	const addNewField = function ( event, closePopup ) {
		event.preventDefault();

		const type = document.getElementsByClassName( 'wcf-cpf-type' )[ 0 ],
			label = document.getElementsByClassName( 'wcf-cpf-label' )[ 0 ],
			field_id = document.getElementsByClassName( 'wcf-cpf-name' )[ 0 ],
			_default =
				document.getElementsByClassName( 'wcf-cpf-default' )[ 0 ],
			placeholder = document.getElementsByClassName(
				'wcf-cpf-placeholder'
			)[ 0 ],
			minValue = document.getElementsByClassName( 'wcf-cpf-min' )[ 0 ],
			maxValue = document.getElementsByClassName( 'wcf-cpf-max' )[ 0 ],
			_options =
				document.getElementsByClassName( 'wcf-cpf-options' )[ 0 ],
			minDate =
				document.getElementsByClassName( 'wcf-cpf-min-date' )[ 0 ],
			maxDate =
				document.getElementsByClassName( 'wcf-cpf-max-date' )[ 0 ],
			width = document.getElementsByClassName( 'wcf-cpf-width' )[ 0 ],
			show_in_email = document.getElementsByClassName(
				'wcf-cpf-show-in-email'
			)[ 1 ],
			required =
				document.getElementsByClassName( 'wcf-cpf-required' )[ 1 ],
			dateInputField =
				document.getElementsByClassName( 'wcf-cpf-date-input' )[ 0 ],
			dateInputValue = dateInputField
				? dateInputField.options[ dateInputField.selectedIndex ].value
				: '';

		if ( '' === label.value ) {
			alert( __( 'Label is required field', 'cartflows' ) );
			return false;
		}

		const formData = new FormData();

		formData.append( 'add_to', 'billing' );
		formData.append( 'type', type ? type.value : '' );
		formData.append( 'label', label ? label.value : '' );
		formData.append( 'name', field_id ? field_id.value : '' );
		formData.append( 'default', _default ? _default.value : '' );
		formData.append( 'placeholder', placeholder ? placeholder.value : '' );
		formData.append( 'options', _options ? _options.value : '' );
		formData.append( 'min', minValue ? minValue.value : '' );
		formData.append( 'max', maxValue ? maxValue.value : '' );
		formData.append( 'width', width ? width.value : '' );
		formData.append( 'min_date', minDate ? minDate.value : '' );
		formData.append( 'max_date', maxDate ? maxDate.value : '' );
		formData.append(
			'show_in_email',
			show_in_email ? show_in_email.value : ''
		);
		formData.append(
			'date_input',
			dateInputValue ? dateInputValue : 'datetime-local'
		);
		formData.append( 'required', required ? required.value : '' );
		formData.append( 'action', 'cartflows_pro_prepare_custom_field' );
		formData.append(
			'security',
			cartflows_admin.prepare_custom_field_nonce
		);

		formData.append( 'post_id', step_id );
		formData.append( 'save_field_name', 'wcf-optin-fields-' );

		apiFetch( {
			url: cartflows_admin.ajax_url,
			method: 'POST',
			body: formData,
		} ).then( ( response ) => {
			if ( response.success ) {
				const response_data = response.data;
				const field_data = response_data.field_data;

				if ( 'billing' === response_data.add_to ) {
					billing_fields.push( field_data );

					const fields = options[ 'wcf-optin-fields-billing' ];
					fields[ response_data.new_field.key ] =
						response_data.new_field;

					dispatch( {
						type: 'SET_OPTION',
						name: 'wcf-optin-fields-billing',
						value: fields,
					} );

					dispatch( {
						type: 'SET_FIELDS',
						field_type: 'billing',
						fields: billing_fields,
					} );
				}
			}
			closePopup();
		} );
	};

	const removeField = function ( event ) {
		event.preventDefault();
		const formData = new FormData();

		const data_key = event.target.getAttribute( 'data-key' );
		const data_type = event.target.getAttribute( 'data-type' );

		formData.append( 'action', 'cartflows_pro_delete_custom_field' );
		formData.append(
			'security',
			cartflows_admin.delete_custom_field_nonce
		);
		formData.append( 'post_id', step_id );
		formData.append( 'key', data_key );
		formData.append( 'type', data_type );
		formData.append( 'step', 'optin' );

		apiFetch( {
			url: cartflows_admin.ajax_url,
			method: 'POST',
			body: formData,
		} ).then( ( data ) => {
			console.log( data );
			if ( data.status ) {
				const new_billing_fields = billing_fields.filter( function (
					field
				) {
					return field.key !== data_key;
				} );

				dispatch( {
					type: 'SET_FIELDS',
					field_type: 'billing',
					fields: new_billing_fields,
				} );
			}
		} );
	};

	return (
		<div className="wcf-custom-field-editor">
			<div className="wcf-custom-field-editor__content">
				<h3 className="wcf-custom-field-editor__title hidden relative justify-between items-center w-full py-4 px-8 text-base font-semibold text-gray-800 text-left transition focus:outline-none">
					{ __( 'Field Editor', 'cartflows' ) }
				</h3>
				<div className="wcf-optin-fields--enable_option px-8 py-4 -mx-6 pt-0">
					{ extra_fields &&
						Object.keys( extra_fields.fields ).map( ( key ) => {
							const field = extra_fields.fields[ key ];

							const value = options[ field.name ]
								? options[ field.name ]
								: '';
							return (
								<div key={ key } className="w-full">
									<ToggleField
										name={ field.name }
										value={ value }
										label={ field.label }
										desc={ field.desc }
										fullWidth={ true }
									/>
								</div>
							);
						} ) }
				</div>
				{ 'yes' === options[ 'wcf-optin-enable-custom-fields' ] && (
					<div className="wcf-optin-fields-section-section">
						<div
							id="wcf-optin-fields"
							className="billing-field-sortable wcf-field-row"
						>
							<FieldSettings
								data={ billing_fields }
								step="optin"
								type="billing"
								removeCallback={ removeField }
							/>
						</div>

						<div className="wcf-custom-field-editor-title-section">
							{ wcfCartflowsPro() && (
								<div className="wcf-custom-field-editor-buttons">
									<CustomEditor
										addNewField={ addNewField }
										step_type="optin"
									/>
								</div>
							) }
						</div>
					</div>
				) }
			</div>
		</div>
	);
}

export default OptinFormFields;
