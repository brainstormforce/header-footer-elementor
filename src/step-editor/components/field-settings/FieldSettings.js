import React, { useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import FieldPanel from './FieldPanel';
import { ToggleField } from '@Fields';
import { __ } from '@wordpress/i18n';
import { useStateValue } from '@Utils/StateProvider';
import Tooltip from '@Fields/Tooltip';
import {
	Cog6ToothIcon,
	ArrowPathIcon,
	TrashIcon,
	EllipsisVerticalIcon,
} from '@heroicons/react/24/outline';

function FieldSettings( props ) {
	const [ { billing_fields, shipping_fields }, dispatch ] = useStateValue();

	const { step, type, removeCallback } = props;

	const [ currentOpenedField, setCurrentOpenedField ] = useState( '' );
	const [ deleteCpfField, setDeleteCpfField ] = useState( '' );

	let fields = [];
	if ( 'billing' === type ) {
		fields = billing_fields;
	} else {
		fields = shipping_fields;
	}

	const showSettings = function ( event ) {
		const key = event.target.getAttribute( 'data-name' );
		const target = document.getElementById( `wcf-field-setting-${ key }` );

		if ( target.classList.contains( 'hidden' ) ) {
			target.classList.remove( 'hidden' );
			setCurrentOpenedField( key );
		} else {
			target.classList.add( 'hidden' );
			setCurrentOpenedField( '' );
		}
	};

	const removecustomField = function ( event ) {
		removeCallback( event, setDeleteCpfField );
	};

	return (
		<div className="py-5">
			<div
				className={ `wcf-${ type }-fields--header flex items-center p-3 border gap-4 bg-gray-50` }
			>
				<div className="w-3/12">{ __( 'Label', 'cartflows' ) }</div>
				<div className="w-3/12">{ __( 'ID', 'cartflows' ) }</div>
				<div className="w-1/5">{ __( 'Enable', 'cartflows' ) }</div>
				<div className="w-1/5">{ __( 'Required', 'cartflows' ) }</div>
				<div className="w-1/12">{ __( 'Edit', 'cartflows' ) }</div>
			</div>
			<ReactSortable
				list={ fields }
				setList={ ( newState ) =>
					dispatch( {
						type: 'SET_FIELDS',
						field_type: type,
						fields: newState,
					} )
				}
				direction={ 'vertical' }
				animation={ 150 }
				handle={ '.wcf-field-item-handle' }
				filter={ '.wcf-field-settings-icon, .wcf-toggle-field' }
			>
				{ fields &&
					fields.map( ( innerFieldData ) => {
						const innerField = innerFieldData.key,
							enableField =
								innerFieldData.field_options[ 'enable-field' ],
							requiredField =
								innerFieldData.field_options[
									'required-field'
								];

						return (
							<div
								key={ innerField }
								className={ `wcf-field-item-handle ${
									'yes' !== enableField.value
										? '!text-gray-400'
										: ''
								}` }
								data-key={ innerField }
							>
								<div className="wcf-fields-wrapper flex items-center p-3 border justify-evenly">
									<div className="wcf-field--label whitespace-nowrap w-3/12 flex items-center mr-auto">
										<div className="wcf-cpf--sortable-toggle flex cursor-move text-gray-400">
											<EllipsisVerticalIcon
												className="w-5 h-5 stroke-1"
												aria-hidden="true"
											/>
											<EllipsisVerticalIcon
												className="w-5 h-5 stroke-1 -ml-3.5"
												aria-hidden="true"
											/>
										</div>
										<span className="text-ellipsis overflow-hidden cursor-default">
											{ ! innerFieldData.label
												? innerFieldData.placeholder
												: innerFieldData.label }{ ' ' }
										</span>
										{ ( 'billing_email' === innerField ||
											'shipping_email' === innerField ) &&
											'checkout' === step && (
												<Tooltip
													text={ __(
														'Email field is not editable when using the Modern Checkout Style',
														'cartflows'
													) }
												/>
											) }
									</div>

									<div className="wcf-field--key whitespace-nowrap w-3/12 text-ellipsis overflow-hidden mr-auto cursor-default">
										{ innerFieldData.key }
									</div>

									<div className="wcf-field--is-enable w-1/5">
										<ToggleField
											name={ enableField.name }
											value={ enableField.value }
										/>
									</div>

									<div className="wcf-field--is-required w-1/5">
										<ToggleField
											name={ requiredField.name }
											value={ requiredField.value }
										/>
									</div>

									<div className="wcf-field-settings-icon flex gap-2 w-1/12 ">
										<div
											onClick={ showSettings }
											data-name={ innerField }
										>
											<Cog6ToothIcon
												className={ `p-1 h-7 w-7 cursor-pointer ${
													currentOpenedField ===
													innerField
														? 'rounded bg-primary-50 text-primary-500'
														: 'text-gray-400 hover:text-primary-500 focus:bg-primary-50'
												}` }
												data-name={ innerField }
											/>
										</div>
										{ innerFieldData.custom && (
											<div
												data-key={ innerField }
												data-type={ type }
												onClick={ removecustomField }
											>
												{ innerField ===
												deleteCpfField ? (
													<ArrowPathIcon
														className="wcf-delete-cpf--button-processing p-1 h-7 w-7 text-primary-500 pointer-events-none animate-spin"
														data-key={ innerField }
														data-type={ type }
													/>
												) : (
													<TrashIcon
														className="wcf-delete-cpf--button-delete p-1 h-7 w-7 text-primary-500 cursor-pointer"
														data-key={ innerField }
														data-type={ type }
													/>
												) }
											</div>
										) }
									</div>
								</div>
								<FieldPanel
									innerField={ innerField }
									innerFieldData={ innerFieldData }
									removecustomField={ removecustomField }
									type={ type }
								/>
							</div>
						);
					} ) }
			</ReactSortable>
		</div>
	);
}

export default FieldSettings;
