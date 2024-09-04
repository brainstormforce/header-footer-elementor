import React from 'react';
import { useStateValue } from '@Utils/StateProvider';
import { __ } from '@wordpress/i18n';

import { TrashIcon } from '@heroicons/react/24/outline';

import {
	SelectField,
	ProductField,
	NumberField,
	CouponField,
	Select2Field,
} from '@Fields';
import ReactHtmlParser from 'react-html-parser';

function OBRuleRepeater( { rules, group_id, g_index, groups_length } ) {
	const [ { page_settings }, dispatch ] = useStateValue();

	const rule_settings = page_settings.settings[ 'multiple-order-bump-rules' ];
	const conditions_select = rule_settings.conditions;

	const removeRule = ( event ) => {
		const rule_id = event.target.getAttribute( 'rule_id' );

		if ( group_id && rule_id ) {
			dispatch( {
				type: 'REMOVE_OB_RULE',
				name: 'rules',
				rule_id,
				group_id,
			} );
		}
	};

	const valueFields = function ( fields, r_index, rule_data ) {
		const value = rule_data.value;

		let rendorfields = '';
		const name = `rules[${ g_index }][rules][${ r_index }][value]`;

		return fields.map( ( field ) => {
			switch ( field.type ) {
				case 'select2':
					rendorfields = (
						<Select2Field
							name={ `${ name }[]` }
							value={ value }
							placeholder={ field.placeholder }
							tooltip={ field.tooltip }
							options={ field.options }
							isMulti={ field.isMulti }
						/>
					);
					break;

				case 'number':
					rendorfields = (
						<NumberField
							name={ name }
							value={ value }
							min={ 0 }
							placeholder={ field.placeholder }
							tooltip={ field.tooltip }
						/>
					);
					break;

				case 'coupon':
					if (
						'exist' === rule_data.operator ||
						'not_exist' === rule_data.operator
					) {
						rendorfields = (
							<SelectField
								name={ name }
								options={ [
									{
										label: 'in parent order',
										value: 'parent_order',
									},
								] }
							/>
						);
					} else {
						rendorfields = (
							<CouponField
								name={ name }
								placeholder={ field.placeholder }
								tooltip={ field.tooltip }
								value={ value }
								isMulti={ field.isMulti }
							/>
						);
					}
					break;

				case 'product':
					rendorfields = (
						<ProductField
							name={ name }
							placeholder={ field.placeholder }
							tooltip={ field.tooltip }
							value={ value }
							isMulti={ field.isMulti }
						/>
					);
					break;
			}
			return rendorfields;
		} );
	};

	const removeRuleIcon = function ( rules_length, rule_id ) {
		if ( 1 === rules_length && 1 === groups_length ) {
			return '';
		}
		return (
			<TrashIcon
				className="w-5 h-6 stroke-2 p-0.5 text-gray-400 cursor-pointer hover:text-primary-700 focus:text-primary-700"
				onClick={ removeRule }
				group_id={ group_id }
				rule_id={ rule_id }
			/>
		);
	};

	return (
		<>
			{ rules.map( ( rule, r_index ) => {
				const rule_id = rule?.rule_id;
				const rule_data = rules[ r_index ];
				const rule_field_data =
					rule_settings.field_data[ rule_data.condition ];

				return (
					<>
						{ 0 !== r_index && (
							<div className="wcf-order-bumps-rules--group_rules__condition-label">
								<div className="wcf--condition-label__and_group relative">
									<div
										className="absolute inset-0 flex items-center"
										aria-hidden="true"
									>
										<div className="w-full border-t border-gray-300 border-dashed" />
									</div>
									<div className="relative flex justify-center">
										<span className="wcf--condition-label__and_group__text bg-gray-50 px-2 text-xs text-gray-400">
											{ __( 'AND', 'cartflows' ) }
										</span>
									</div>
								</div>
							</div>
						) }
						<div
							className="wcf-order-bumps-rules--group_rules flex gap-3 items-center"
							data-rule-id={ rule_id }
							key={ rule_id }
						>
							<input
								type="hidden"
								name={ `rules[${ g_index }][rules][${ r_index }][rule_id]` }
								value={ rule_id }
							/>

							<div className="wcf-order-bumps-rules--rule_fields grid grid-cols-3 gap-3 items-center w-full">
								<SelectField
									name={ `rules[${ g_index }][rules][${ r_index }][condition]` }
									wrapperClass="block"
									options={ conditions_select }
									onSelect={ () => {
										dispatch( {
											type: 'RESET_OB_RULE_VALUE',
											name: 'rules',
											group_id,
											rule_id,
										} );
									} }
									value={ rule_data.condition }
								/>
								<SelectField
									name={ `rules[${ g_index }][rules][${ r_index }][operator]` }
									wrapperClass="block"
									options={ rule_field_data.operator }
									value={ ReactHtmlParser(
										rule_data.operator
									) }
								/>

								{ valueFields(
									rule_field_data.fields,
									r_index,
									rule_data
								) }
							</div>
							<div className="wcf-order-bumps-rules--rule_actions">
								{ removeRuleIcon( rules.length, rule_id ) }
							</div>
						</div>
					</>
				);
			} ) }
		</>
	);
}

export default OBRuleRepeater;
