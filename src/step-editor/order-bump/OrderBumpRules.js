import React, { useState } from 'react';
import { useStateValue } from '@Utils/StateProvider';
import { __ } from '@wordpress/i18n';
import OrderBumpRulesSkeleton from './skeletons/OrderBumpRulesSkeleton';
import { ToggleField, DocField } from '@Fields';
import OBRuleRepeater from '@StepEditor/order-bump/OBRuleRepeater';
import { ReactSortable } from 'react-sortablejs';
import {
	EllipsisVerticalIcon,
	ChevronUpIcon,
	ChevronDownIcon,
	PlusIcon,
} from '@heroicons/react/24/outline';

function OrderBumpRules() {
	const [ { options, current_ob }, dispatch ] = useStateValue();

	const [ ruleGroupDisplay, setRuleGroupDisplay ] = useState( {
		ruleGroupId: '',
		isOpen: false,
	} );

	const { ruleGroupId, isOpen } = ruleGroupDisplay;

	if ( null === options || 'undefined' === current_ob ) {
		return <OrderBumpRulesSkeleton />;
	}

	const conditions = current_ob.rules;

	if ( 'undefined' === typeof conditions ) {
		return (
			<DocField
				content={ __(
					'Please Update the CartFlows Pro to the latest version to use the conditional order bump feature.',
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
			type: 'ADD_NEW_OB_GROUP',
			name: 'rules',
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
			type: 'ADD_NEW_OB_RULE',
			name: 'rules',
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
			'wcf-order-bumps-rules--or_group__button'
		)[ 0 ];
		button.setAttribute( 'style', 'display:none' );
	};

	const showButton = function () {
		const button = document.getElementsByClassName(
			'wcf-order-bumps-rules--or_group__button'
		)[ 0 ];

		button.setAttribute( 'style', 'display:inline-block' );
	};

	return (
		<div className="wcf-order-bumps-rules-page">
			<div className="wcf-order-bumps-rules-page--enable_option">
				<ToggleField
					name="is_rule"
					value={ current_ob.is_rule }
					label={ __(
						'Enable conditional order bump ',
						'cartflows'
					) }
					tooltip={ __(
						'By enabling this option, you can create the conditions to display the order bump.',
						'cartflows'
					) }
				/>
			</div>
			{ 'yes' === current_ob.is_rule && conditions && (
				<div className="mt-8">
					<ReactSortable
						id="wcf-order-bump-sortable-wrapper"
						className="wcf-order-bump--sortable-wrapper flex flex-col gap-4"
						list={ conditions }
						setList={ ( newState ) =>
							dispatch( {
								type: 'SET_OB_RULES_GROUPS',
								groups: newState,
								fieldName: 'rules',
							} )
						}
						swapThreshold={ 0.8 }
						direction={ 'vertical' }
						animation={ 150 }
						handle={ '.wcf-order-bumps-rules-page--group_wrapper' }
						filter={
							'.wcf-order-bumps-rules--rule_fields, .wcf-order-bumps-rules--rule_actions, .wcf-field wcf-select-option, .wcf-order-bumps-rules--add-rule__repeater .wcf-button.wcf-button--secondary, .wcf-field__data--content, .wcf-order-bumps-rules-page--group_wrapper__footer, .wcf-checkout-rules--group_header__right'
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
									className="wcf-order-bumps-rules-page--group_wrapper"
									key={ group_id }
								>
									<div
										className="wcf-order-bumps-rules--group border border-gray-200 rounded-lg mb-6"
										data-group-id={ group_id }
									>
										<input
											type="hidden"
											name={ `rules[${ g_index }][group_id]` }
											value={ group_id }
										/>
										<div className="wcf-order-bumps-rules--group-header bg-white p-4 rounded-lg flex items-center justify-between">
											<div className="wcf-order-bumps-rules--group_header__left flex gap-2 items-center">
												<div className="wcf-order-bumps-rule--sortable-toggle flex cursor-move text-gray-500">
													<EllipsisVerticalIcon
														className="w-6 h-6 stroke-1 -ml-2"
														aria-hidden="true"
													/>
													<EllipsisVerticalIcon
														className="w-6 h-6 stroke-1 -ml-4"
														aria-hidden="true"
													/>
												</div>
												<span className="wcf-group-header--text font-sm font-normal text-gray-400">
													{ __(
														'Show this order bump if following conditions are true',
														'cartflows'
													) }
												</span>
											</div>
											<div className="wcf-order-bumps-rules--group_header__right flex gap-2 items-center">
												{ ruleGroupId === group_id &&
												isOpen ? (
													<ChevronUpIcon
														className="w-4 h-4 stroke-1 text-gray-400 hover:text-gray-500 cursor-pointer"
														aria-hidden="true"
														onClick={ showRules }
														data-group_id={
															group_id
														}
													/>
												) : (
													<ChevronDownIcon
														className="w-4 h-4 stroke-1 text-gray-400 hover:text-gray-500 cursor-pointer"
														aria-hidden="true"
														onClick={ showRules }
														data-group_id={
															group_id
														}
													/>
												) }
											</div>
										</div>
										<div
											id={ `wcf-order-bumps-rules--group-${ group_id }` }
											className={ `pt-7 px-7 pb-4 border-t border-gray-200 ${
												ruleGroupId === group_id &&
												isOpen
													? 'visible'
													: 'hidden'
											}` }
										>
											<div className="wcf-order-bumps-rules--group_rules--wrapper flex flex-col gap-4">
												{ rules.length !== 0 && (
													<OBRuleRepeater
														rules={ rules }
														group_id={ group_id }
														g_index={ g_index }
														groups_length={
															conditions.length
														}
													/>
												) }
											</div>
											<div className="wcf-order-bumps-rules--add-rule__repeater flex">
												<div
													className="wcf-order-bumps-rules--add-rule__button text-sm font-medium flex gap-1.5 items-center cursor-pointer text-primary-500 hover:text-primary-600 focus:text-primary-600 mt-5"
													data-group_id={ group_id }
													onClick={ addNewRule }
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
									<div className="wcf-order-bumps-rules-page--group_wrapper__footer">
										<div className="wcf-order-bumps-rules--or_group relative">
											<div
												className="absolute inset-0 flex items-center"
												aria-hidden="true"
											>
												<div className="w-full border-t border-gray-300 border-dashed" />
											</div>
											<div className="relative flex justify-center">
												<span className="wcf-order-bumps-rules--or_group__text bg-gray-50 px-2 text-xs text-gray-400">
													{ __( 'OR', 'cartflows' ) }
												</span>
											</div>
										</div>

										{ parseInt( g_index ) + 1 ===
											conditions.length && (
											<div className="wcf-order-bumps-rules--or_group__button mt-4">
												<span
													className="wcf-order-bumps-rules--or_group_button or-button wcf-button wcf-secondary-button"
													onClick={ addNewGroup }
												>
													<PlusIcon className="w-18 h-18 stroke-2" />
													{ __(
														'Add Conditions Group',
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
		</div>
	);
}

export default OrderBumpRules;
