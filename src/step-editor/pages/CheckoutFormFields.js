import React, { useState } from 'react';
import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';
import {
	ChevronUpIcon,
	WalletIcon,
	CubeIcon,
	ChevronDownIcon,
} from '@heroicons/react/24/outline';
import { useStateValue } from '@Utils/StateProvider';
import { ToggleField } from '@Admin/fields';
import FieldSettings from '@StepEditor/components/field-settings/FieldSettings';
import CustomEditor from '@StepEditor/components/field-settings/CustomEditor';
import CheckoutCustomFieldsSkeleton from '@StepEditor/components/steps-page/CheckoutCustomFieldsSkeleton';
import Accordian from '@StepEditor/components/Accordian/Accordian';
import classnames from 'classnames';
import useConfirm from '@Alert/ConfirmDialog';

function CheckoutFormFields() {
	const [
		{ custom_fields, step_id, options, billing_fields, shipping_fields },
		dispatch,
	] = useStateValue();
	const [ collapse, setCollapse ] = useState( 'collapsed' );
	const [ currentTab, setCurrentTab ] = useState( 'billing' );
	const confirm = useConfirm();

	const handleCollapse = function () {
		if ( 'collapsed' === collapse ) {
			setCollapse( '' );
		} else {
			setCollapse( 'collapsed' );
		}
	};

	if ( undefined === custom_fields ) {
		return <CheckoutCustomFieldsSkeleton />;
	}

	const tabs = [
		{
			name: __( 'Billing Fields', 'cartflows' ),
			slug: 'billing',
			icon: <WalletIcon className="w-5 h-5" aria-hidden="true" />,
		},
		{
			name: __( 'Shipping Fields', 'cartflows' ),
			slug: 'shipping',
			icon: <CubeIcon className="w-5 h-5" aria-hidden="true" />,
		},
	];

	const addNewField = function ( event, closePopup ) {
		event.preventDefault();

		const add_to = document.getElementsByClassName( 'wcf-cpf-add_to' )[ 0 ],
			type = document.getElementsByClassName( 'wcf-cpf-type' )[ 0 ],
			label = document.getElementsByClassName( 'wcf-cpf-label' )[ 0 ],
			field_id = document.getElementsByClassName( 'wcf-cpf-name' )[ 0 ],
			minValue = document.getElementsByClassName( 'wcf-cpf-min' )[ 0 ],
			maxValue = document.getElementsByClassName( 'wcf-cpf-max' )[ 0 ],
			_default =
				document.getElementsByClassName( 'wcf-cpf-default' )[ 0 ],
			placeholder = document.getElementsByClassName(
				'wcf-cpf-placeholder'
			)[ 0 ],
			_options =
				document.getElementsByClassName( 'wcf-cpf-options' )[ 0 ],
			minDate =
				document.getElementsByClassName( 'wcf-cpf-min-date' )[ 0 ],
			maxDate =
				document.getElementsByClassName( 'wcf-cpf-max-date' )[ 0 ],
			width = document.getElementsByClassName( 'wcf-cpf-width' )[ 0 ],
			show_in_email = document.getElementsByClassName(
				'wcf-cpf-show-in-email'
			)[ 0 ],
			required =
				document.getElementsByClassName( 'wcf-cpf-required' )[ 0 ],
			optimized =
				document.getElementsByClassName( 'wcf-cpf-optimized' )[ 0 ],
			dateInputField =
				document.getElementsByClassName( 'wcf-cpf-date-input' )[ 0 ],
			dateInputValue = dateInputField
				? dateInputField.options[ dateInputField.selectedIndex ].value
				: '';

		if ( '' === label.value ) {
			alert( __( 'Label is required field', 'cartflows' ) );
			return '';
		}

		const formData = new FormData();

		formData.append( 'add_to', add_to ? add_to.value : '' );
		formData.append( 'type', type ? type.value : '' );
		formData.append( 'label', label ? label.value : '' );
		formData.append( 'name', field_id ? field_id.value : '' );
		formData.append( 'default', _default ? _default.value : '' );
		formData.append( 'min', minValue ? minValue.value : '' );
		formData.append( 'max', maxValue ? maxValue.value : '' );
		formData.append( 'placeholder', placeholder ? placeholder.value : '' );
		formData.append( 'min_date', minDate ? minDate.value : '' );
		formData.append( 'max_date', maxDate ? maxDate.value : '' );
		formData.append( 'options', _options ? _options.value : '' );
		formData.append(
			'date_input',
			dateInputValue ? dateInputValue : 'datetime-local'
		);
		formData.append( 'width', width ? width.value : '' );
		formData.append( 'required', required ? required.value : '' );
		formData.append(
			'show_in_email',
			show_in_email ? show_in_email.value : ''
		);
		formData.append( 'optimized', optimized ? optimized.value : '' );
		formData.append( 'action', 'cartflows_pro_prepare_custom_field' );
		formData.append(
			'security',
			cartflows_admin.prepare_custom_field_nonce
		);
		formData.append( 'post_id', step_id );
		formData.append( 'save_field_name', 'wcf_field_order_' );

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

					const fields = options.wcf_field_order_billing;
					fields[ response_data.new_field.key ] =
						response_data.new_field;

					dispatch( {
						type: 'SET_OPTION',
						name: 'wcf_field_order_billing',
						value: fields,
					} );

					dispatch( {
						type: 'SET_FIELDS',
						field_type: 'billing',
						fields: billing_fields,
					} );
				}

				if ( 'shipping' === response_data.add_to ) {
					shipping_fields.push( field_data );

					const fields = options.wcf_field_order_shipping;
					fields[ response_data.new_field.key ] =
						response_data.new_field;

					dispatch( {
						type: 'SET_OPTION',
						name: 'wcf_field_order_shipping',
						value: fields,
					} );

					dispatch( {
						type: 'SET_FIELDS',
						field_type: 'shipping',
						fields: shipping_fields,
					} );
				}
			}
			closePopup();
		} );
	};

	const removeField = async function ( event, setDeleteCpfField ) {
		event.preventDefault();

		const isconfirm = await confirm( {
			title: __( 'Delete Field', 'cartflows' ),
			description: __(
				'Are you really want to delete field?',
				'cartflows'
			),
			actionBtnText: __( 'Yes', 'cartflows' ),
			cancelBtnText: __( 'No', 'cartflows' ),
		} );

		if ( ! isconfirm ) {
			return;
		}

		const formData = new FormData();

		const data_key = event.target.getAttribute( 'data-key' );
		const data_type = event.target.getAttribute( 'data-type' );

		setDeleteCpfField( data_key );

		formData.append( 'action', 'cartflows_pro_delete_custom_field' );
		formData.append(
			'security',
			cartflows_admin.delete_custom_field_nonce
		);
		formData.append( 'post_id', step_id );
		formData.append( 'key', data_key );
		formData.append( 'type', data_type );
		formData.append( 'step', 'checkout' );

		apiFetch( {
			url: cartflows_admin.ajax_url,
			method: 'POST',
			body: formData,
		} ).then( ( data ) => {
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

				const new_shipping_fields = shipping_fields.filter( function (
					field
				) {
					return field.key !== data_key;
				} );

				dispatch( {
					type: 'SET_FIELDS',
					field_type: 'shipping',
					fields: new_shipping_fields,
				} );
				setDeleteCpfField( '' );
			}
		} );
	};

	return (
		<div className="wcf-custom-field-editor wcf-checkout__section">
			<div className="wcf-custom-field-editor__content">
				{ /* Field Options Accordian Start */ }
				<Accordian
					settings={ custom_fields.extra_fields }
					isOpen={ true }
				/>
				{ /* Field Options Accordian End */ }

				{ /* Field Editor Accordian Start */ }
				<div className="wcf-field-editor accordion-item bg-white -mx-8 border-b border-gray-200">
					<h2
						className="accordion-header mb-0"
						id={ 'wcf_field_editor_toggler' }
					>
						<button
							className={ `wcf-accordion-button relative flex justify-between items-center w-full py-4 px-8 text-base font-semibold text-gray-800 text-left transition focus:outline-none ${ collapse }` }
							type="button"
							data-bs-toggle="collapse"
							data-bs-target="#wcf_collapse_field_editor_toggler"
							aria-expanded="false"
							aria-controls="wcf_collapse_field_editor_toggler"
							onClick={ handleCollapse }
						>
							<span>{ __( 'Field Editor', 'cartflows' ) }</span>
							{ '' === collapse ? (
								<ChevronUpIcon
									className="w-5 h-5 text-gray-400"
									aria-hidden="true"
								/>
							) : (
								<ChevronDownIcon
									className="w-5 h-5 text-gray-400"
									aria-hidden="true"
								/>
							) }
						</button>
					</h2>
					<div
						id="wcf_collapse_field_editor_toggler"
						className={ `accordion-collapse px-8 pt-4 pb-8 ${ collapse }` }
						aria-labelledby="wcf_field_editor_toggler"
					>
						<div className="accordion-body">
							<ToggleField
								name={ 'wcf-custom-checkout-fields' }
								value={
									options[ 'wcf-custom-checkout-fields' ]
								}
								label={ __(
									'Enable Custom Field Editor',
									'cartflows'
								) }
								classes="wcf-enable-custom-field-editor"
								fullWidth={ true }
							/>
							{ 'yes' ===
								options[ 'wcf-custom-checkout-fields' ] && (
								<>
									<div className="wcf-checkout-fields-tabs isolate inline-flex h-11 rounded-md shadow-sm w-full mt-4 mb-0">
										{ tabs.map( ( tab ) => {
											const is_current_tab =
												tab.slug === currentTab;

											const focusClass = is_current_tab
												? 'z-10 bg-[#FEF8F5] border-[#F6A285] hover:bg-[#FEF8F5] outline-none text-[#E64E1A]'
												: 'bg-white border-gray-300 hover:bg-[#FEF8F5] hover:border-[#E64E1A]';
											return (
												<button
													type="button"
													className={ classnames(
														'relative text-center w-3/6 items-center border px-4 py-2 text-sm font-medium text-gray-700 hover:text-[#E64E1A]',
														focusClass
													) }
													onClick={ () =>
														setCurrentTab(
															tab.slug
														)
													}
													key={ tab.slug }
												>
													<span
														className={ `${
															is_current_tab
																? `text-[#E64E1A]`
																: ``
														} text-sm font-medium text-center flex justify-center items-center gap-1` }
													>
														{ tab.icon }
														{ tab.name }
													</span>
												</button>
											);
										} ) }
									</div>
									{ 'billing' === currentTab && (
										<div
											id="wcf-billing-fields"
											className="wcf-billing-fields billing-field-sortable wcf-field-row w-full"
										>
											{ billing_fields && (
												<FieldSettings
													data={ billing_fields }
													step="checkout"
													type="billing"
													removeCallback={
														removeField
													}
												/>
											) }
										</div>
									) }
									{ 'shipping' === currentTab && (
										<div
											id="wcf-shipping-fields"
											className="wcf-shipping-fields shipping-field-sortable wcf-field-row w-full"
										>
											{ shipping_fields && (
												<FieldSettings
													data={ shipping_fields }
													step="checkout"
													type="shipping"
													removeCallback={
														removeField
													}
												/>
											) }
										</div>
									) }
									<div className="text-end">
										{ wcfCartflowsPro() && (
											<div className="">
												<CustomEditor
													addNewField={ addNewField }
													step_type="checkout"
												/>
											</div>
										) }
									</div>
								</>
							) }
						</div>
					</div>
				</div>
				{ /* Field Editor Accordian End */ }

				{ /* Checkout Text Accordian Start */ }
				<Accordian settings={ custom_fields.checkout_settings } />
				{ /* Checkout Text Accordian End */ }

				{ /* Button Text Accordian Start */ }
				<Accordian settings={ custom_fields.button_settings } />
				{ /* Button Text Accordian End */ }
			</div>
		</div>
	);
}

export default CheckoutFormFields;
