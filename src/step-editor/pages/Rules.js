import React, { useState } from 'react';
import { useStateValue } from '@Utils/StateProvider';
import RuleSkeleton from '@StepEditor/components/steps-page/RuleSkeleton';
import RulesCTA from '@StepEditor/components/steps-page/RulesCTA';
import RuleRepeater from '@StepEditor/components/page-settings/RuleRepeater';
import { useSettingsValue } from '@Utils/SettingsProvider';
import { ReactSortable } from 'react-sortablejs';
import { __ } from '@wordpress/i18n';
import {
	EllipsisVerticalIcon,
	ChevronUpIcon,
	ChevronDownIcon,
	PlusIcon,
} from '@heroicons/react/24/outline';

import { SelectField, DocField, ToggleField } from '@Fields';

function Rules() {
	const [ { step_data, step_id, options }, dispatch ] = useStateValue();
	const [ ruleGroupDisplay, setRuleGroupDisplay ] = useState( {
		ruleGroupId: '',
		isOpen: false,
	} );
	const [ { license_status } ] = useSettingsValue();

	const { ruleGroupId, isOpen } = ruleGroupDisplay;

	if ( ! wcfCartflowsPro() || 'Activated' !== license_status ) {
		return <RulesCTA />;
	}

	if ( null === options ) {
		return <RuleSkeleton />;
	}
	const conditions = options[ 'wcf-checkout-rules' ];

	if ( 'undefined' === typeof conditions ) {
		return (
			<DocField
				content={ __(
					'Please Update the CartFlows Pro to the latest version to use the dynamic offers feature.',
					'cartflows'
				) }
			/>
		);
	}

	const addNewGroup = () => {
		const newGroup = {
			group_id: Math.random().toString( 36 ).substring( 2, 5 ),
			rules: [
				{
					rule_id: Math.random().toString( 36 ).substring( 2, 5 ),
					condition: 'cart_item',
					operator: '',
					value: '',
				},
			],
		};

		dispatch( {
			type: 'ADD_NEW_GROUP',
			name: 'wcf-checkout-rules',
			newGroup,
		} );
	};

	const addNewRule = ( event ) => {
		const group_id = event.target.getAttribute( 'data-group_id' );
		const newRule = {
			rule_id: Math.random().toString( 36 ).substring( 2, 5 ),
			condition: 'cart_item',
			operator: '',
			value: '',
		};

		dispatch( {
			type: 'ADD_NEW_RULE',
			name: 'wcf-checkout-rules',
			newRule,
			group_id,
		} );
	};

	const showRules = function ( event ) {
		const group_id = event.target.getAttribute( 'data-group_id' );

		setRuleGroupDisplay( {
			ruleGroupId: group_id,
			isOpen: ruleGroupId === group_id && isOpen ? false : true,
		} );
	};

	const hideButton = function () {
		const button = document.getElementsByClassName(
			'wcf-checkout-rules--or_group__button'
		)[ 0 ];
		button.setAttribute( 'style', 'display:none' );
	};

	const showButton = function () {
		const button = document.getElementsByClassName(
			'wcf-checkout-rules--or_group__button'
		)[ 0 ];

		button.setAttribute( 'style', 'display:inline-block' );
	};

	return (
		<>
			<div className="wcf-checkout-rules-page">
				<div className="wcf-checkout-rules-page--enable_option">
					<ToggleField
						name="wcf-checkout-rules-option"
						value={ options[ 'wcf-checkout-rules-option' ] }
						label={ __( 'Enable Dynamic Offers', 'cartflows' ) }
						tooltip={ __(
							'By enabling this option, you can create the conditions for the next-step (dynamic offer) redirection.',
							'cartflows'
						) }
						fullWidth={ true }
					/>
				</div>
				{ 'yes' === options[ 'wcf-checkout-rules-option' ] &&
					conditions && (
						<div className="mt-8">
							<ReactSortable
								id="wcf-checkout-rules-sortable-wrapper"
								className="wcf-checkout-rules--sortable-wrapper flex flex-col gap-4"
								list={ conditions }
								setList={ ( newState ) =>
									dispatch( {
										type: 'SET_RULES_GROUPS',
										groups: newState,
										fieldName: 'wcf-checkout-rules',
										step_id,
									} )
								}
								swapThreshold={ 0.8 }
								direction={ 'vertical' }
								animation={ 150 }
								handle={ '.wcf-checkout-rules--group' }
								filter={
									'.wcf-checkout-rules--rule_fields, .wcf-checkout-rules--rule_actions, .wcf-field.wcf-select-option, .wcf-checkout-rules--add-rule__repeater .wcf-button.wcf-button--secondary, .wcf-field__data--content, .wcf-checkout-rules-page--group_wrapper__footer, .wcf-checkout-rules--group_header'
								}
								preventOnFilter={ false }
								onStart={ hideButton }
								onEnd={ showButton }
							>
								{ conditions.map( ( group, g_index ) => {
									const group_id = group.group_id;
									const rules = group.rules;
									return (
										<div
											className="wcf-checkout-rules-page--group_wrapper"
											key={ group_id }
										>
											<div
												className="wcf-checkout-rules--group border border-gray-200 rounded-lg mb-6"
												data-group-id={ group_id }
											>
												<input
													type="hidden"
													name={ `wcf-checkout-rules[${ g_index }][group_id]` }
													value={ group_id }
												/>

												<div className="wcf-checkout-rules--group-header wcf-redirection-step bg-white p-4 rounded-lg flex items-center justify-between">
													<div className="wcf-checkout-rules--group-header__left flex gap-2 items-center">
														<div className="wcf-checkout-rule--sortable-toggle flex cursor-move text-gray-500">
															<EllipsisVerticalIcon
																className="w-6 h-6 stroke-1 -ml-2"
																aria-hidden="true"
															/>
															<EllipsisVerticalIcon
																className="w-6 h-6 stroke-1 -ml-4"
																aria-hidden="true"
															/>
														</div>

														<div className="border border-gray-200 rounded-md flex items-center gap-3 px-2.5 py-2">
															<div className="text-sm font-normal text-gray-400">
																{ __(
																	'Redirect to: ',
																	'cartflows'
																) }
															</div>
															<SelectField
																name={ `wcf-checkout-rules[${ g_index }][step_id]` }
																class="w-full !max-w-full h-auto input-field !text-sm font-normal !rounded-none text-gray-400 !border-none focus:ring-0 focus:!border-none focus:!shadow-none !outline-0 !outline-none !m-0 !placeholder-gray-400"
																value={
																	group.step_id
																}
																placeholder={ __(
																	'Search for step…',
																	'cartflows'
																) }
																options={
																	step_data.step_lists
																}
																overrideCss={
																	true
																}
															/>
														</div>
														<div className="text-sm font-normal text-gray-400">
															{ __(
																'If the following conditions are true',
																'cartflows'
															) }
														</div>
													</div>
													<div className="wcf-checkout-rules--group-header__right flex gap-2 items-center">
														{ ruleGroupId ===
															group_id &&
														isOpen ? (
															<ChevronUpIcon
																className="w-4 h-4 stroke-1 text-gray-400 hover:text-gray-500 cursor-pointer"
																aria-hidden="true"
																onClick={
																	showRules
																}
																data-group_id={
																	group_id
																}
															/>
														) : (
															<ChevronDownIcon
																className="w-4 h-4 stroke-1 text-gray-400 hover:text-gray-500 cursor-pointer"
																aria-hidden="true"
																onClick={
																	showRules
																}
																data-group_id={
																	group_id
																}
															/>
														) }
													</div>
												</div>
												<div
													id={ `wcf-checkout-rules--group-${ group_id }` }
													className={ `pt-7 px-7 pb-4 bg-gray-50 border-t border-gray-200 ${
														ruleGroupId ===
															group_id && isOpen
															? 'visible'
															: 'hidden'
													}` }
												>
													<div className="wcf-checkout-rules--group-rules__wrapper flex flex-col gap-4">
														{ rules.length !==
															0 && (
															<RuleRepeater
																rules={ rules }
																group_id={
																	group_id
																}
																g_index={
																	g_index
																}
																groups_length={
																	conditions.length
																}
															/>
														) }
													</div>

													<div className="wcf-checkout-rules--add-rule__repeater flex">
														<div
															className="wcf-checkout-rules--add-rule__button text-sm font-medium flex gap-1.5 items-center cursor-pointer text-primary-500 hover:text-primary-600 focus:text-primary-600 mt-5"
															data-group_id={
																group_id
															}
															onClick={
																addNewRule
															}
														>
															<PlusIcon className="w-18 h-18 stroke-2" />
															{ __(
																'Add Condition',
																'cartflows'
															) }
														</div>
													</div>
												</div>
											</div>
											<div className="wcf-checkout-rules-page--group_wrapper__footer">
												<div className="wcf-checkout-rules--or-group relative">
													<div
														className="absolute inset-0 flex items-center"
														aria-hidden="true"
													>
														<div className="w-full border-t border-gray-300 border-dashed" />
													</div>
													<div className="relative flex justify-center">
														<span className="wcf-checkout-rules--or_group__text bg-gray-50 px-2 text-xs text-gray-400">
															{ __(
																'OR',
																'cartflows'
															) }
														</span>
													</div>
												</div>

												{ parseInt( g_index ) + 1 ===
													conditions.length && (
													<div className="wcf-checkout-rules--or_group__button mt-4">
														<span
															className="wcf-checkout-rules--or_group_button or-button wcf-button wcf-secondary-button"
															onClick={
																addNewGroup
															}
														>
															<PlusIcon className="w-18 h-18 stroke-2" />
															{ __(
																'Add Dynamic Offer',
																'cartflows'
															) }
														</span>
													</div>
												) }
											</div>
										</div>
									);
								} ) }
							</ReactSortable>
						</div>
					) }

				{ 'yes' === options[ 'wcf-checkout-rules-option' ] && (
					<div className="wcf-checkout-rules--default-step border border-gray-200 rounded-lg p-4 flex items-center justify-between mt-8">
						<div className="wcf-checkout-rules--default-step__left border border-gray-200 rounded-md flex items-center gap-3 px-2.5 py-2">
							<div className="text-sm font-normal text-gray-400">
								{ __( 'Redirect to: ', 'cartflows' ) }
							</div>
							<SelectField
								name={ `wcf-checkout-rules-default-step` }
								class="w-full !max-w-full h-auto input-field !text-sm font-normal !rounded-none text-gray-400 !border-none focus:ring-0 focus:!border-none focus:!shadow-none !outline-0 !outline-none !m-0 !placeholder-gray-400"
								value={
									options[ 'wcf-checkout-rules-default-step' ]
								}
								placeholder={ __(
									'Search for default step…',
									'cartflows'
								) }
								options={ step_data.step_lists }
								overrideCss={ true }
							/>
						</div>

						<div className="text-sm font-normal text-gray-400">
							{ __(
								'If all of the above conditions failed.',
								'cartflows'
							) }
						</div>
					</div>
				) }
			</div>
		</>
	);
}

export default Rules;
