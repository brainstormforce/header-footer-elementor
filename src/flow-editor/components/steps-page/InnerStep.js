import React, { useState, useRef } from 'react';
import apiFetch from '@wordpress/api-fetch';
import { sprintf, __ } from '@wordpress/i18n';
import { validateTitleField } from '@Utils/Helpers';
import { Tooltip } from '@Fields';
import ReactHtmlParser from 'react-html-parser';
import { useSettingsValue } from '@Utils/SettingsProvider';

import StepActionMenu from './StepActionMenu';
import { Link } from 'react-router-dom';
import { useStateValue } from '@Utils/StateProvider';
import landingstep from '@Icons/landingstep.svg';
import checkoutstep from '@Icons/checkoutstep.svg';
import upsellstep from '@Icons/upsellstep.svg';
import downsellstep from '@Icons/downsellstep.svg';
import optinstep from '@Icons/optinstep.svg';
import thankyoustep from '@Icons/thankyoustep.svg';
import useConfirm from '@Alert/ConfirmDialog';
import classnames from 'classnames';
import {
	Cog6ToothIcon,
	EllipsisVerticalIcon,
	EyeIcon,
	PencilIcon,
	ExclamationCircleIcon,
	CheckCircleIcon,
	XCircleIcon,
} from '@heroicons/react/24/outline';
import { trackPromise } from 'react-promise-tracker';

function InnerStep( props ) {
	const {
		is_cf_pro,
		global_checkout,
		flow_id,
		control_id,
		step_id,
		title,
		type,
		actions,
		menu_actions,
		ab_test_ui,
		offer_no_next_step,
		offer_yes_next_step,
		// invalidStep = false,
	} = props;

	const id = step_id;
	let { has_product_assigned, is_variation } = props;
	const [ { flow_type, flow_analytics } ] = useStateValue();
	const [ { license_status } ] = useSettingsValue();
	const [ loader, setLoader ] = useState( false );
	const ref = useRef();
	const analytics = flow_analytics ? flow_analytics.all_steps : '';
	const currentID = is_variation ? props.control_id : step_id;
	const step_analytics = analytics
		? analytics.find( ( o ) => o.id === currentID )
		: [];
	const confirm = useConfirm();

	const cloneStep = async function ( e ) {
		e.preventDefault();

		if ( ! wcfCartflowsPro() ) {
			return null;
		}

		const isconfirm = await confirm( {
			title: __( 'Duplicate Step', 'cartflows' ),
			description: __(
				'Do you want to duplicate this step? Are you sure?',
				'cartflows'
			),
			actionBtnText: __( 'Yes', 'cartflows' ),
			cancelBtnText: __( 'No', 'cartflows' ),
		} );

		if ( isconfirm ) {
			setLoader( true );

			const action = e.target.getAttribute( 'data-action' );
			let nonce = cartflows_admin.clone_step_nonce;

			const formData = new window.FormData();

			if ( 'cartflows_clone_ab_test_step' === action ) {
				nonce = cartflows_admin.wcf_clone_ab_test_step_nonce;
				formData.append( 'control_id', control_id );
			}

			formData.append( 'action', action );
			formData.append( 'security', nonce );
			formData.append( 'step_id', id );
			formData.append( 'post_id', flow_id );

			window.wcfAction = 'cloneStep';
			trackPromise(
				apiFetch( {
					url: cartflows_admin.ajax_url,
					method: 'POST',
					body: formData,
				} ).then( () => {
					window.location.reload();

					setLoader( false );
				} )
			);
		}
	};

	const deleteStep = async function ( e ) {
		e.preventDefault();

		const isconfirm = await confirm( {
			title: __( 'Delete Step', 'cartflows' ),
			description: __(
				'Do you want to delete this step? Are you sure?',
				'cartflows'
			),
			actionBtnText: __( 'Yes', 'cartflows' ),
			cancelBtnText: __( 'No', 'cartflows' ),
		} );

		if ( isconfirm ) {
			setLoader( true );

			const action = e.target.getAttribute( 'data-action' );
			let nonce = cartflows_admin.delete_step_nonce;

			const formData = new window.FormData();

			if ( 'cartflows_delete_ab_test_step' === action ) {
				nonce = cartflows_admin.wcf_delete_ab_test_step_nonce;
				formData.append( 'control_id', control_id );
			}

			formData.append( 'action', action );
			formData.append( 'security', nonce );
			formData.append( 'step_id', id );
			formData.append( 'post_id', flow_id );
			window.wcfAction = 'deleteStep';
			trackPromise(
				apiFetch( {
					url: cartflows_admin.ajax_url,
					method: 'POST',
					body: formData,
				} ).then( () => {
					window.location.reload();

					setLoader( false );
				} )
			);
		}
	};

	const createAbVariations = function ( e ) {
		e.preventDefault();

		if ( ! wcfCartflowsTypePro() ) {
			return null;
		}

		setLoader( true );

		const formData = new window.FormData();

		formData.append( 'action', 'cartflows_create_ab_test_variation' );
		formData.append(
			'security',
			cartflows_admin.wcf_create_ab_test_variation_nonce
		);
		formData.append( 'step_id', id );
		formData.append( 'flow_id', flow_id );
		window.wcfAction = 'abtestStep';
		trackPromise(
			apiFetch( {
				url: cartflows_admin.ajax_url,
				method: 'POST',
				body: formData,
			} ).then( () => {
				window.location.reload();
				setLoader( false );
			} )
		);
	};

	const declare_abtest_winner = async function ( e ) {
		e.preventDefault();

		const isconfirm = await confirm( {
			title: __( 'Declare Winner', 'cartflows' ),
			description: __(
				'Do you want to declare this step as winner? Are you sure?',
				'cartflows'
			),
			actionBtnText: __( 'Yes', 'cartflows' ),
			cancelBtnText: __( 'No', 'cartflows' ),
		} );

		if ( isconfirm ) {
			setLoader( true );
			const formData = new window.FormData();

			formData.append( 'action', 'cartflows_declare_ab_test_winner' );

			formData.append(
				'security',
				cartflows_admin.wcf_declare_ab_test_winner_nonce
			);

			formData.append( 'step_id', id );
			formData.append( 'flow_id', flow_id );

			window.wcfAction = 'winnerStep';
			trackPromise(
				apiFetch( {
					url: cartflows_admin.ajax_url,
					method: 'POST',
					body: formData,
				} ).then( () => {
					window.location.reload();

					setLoader( false );
				} )
			);
		}
	};

	const archivedStep = async function ( e ) {
		e.preventDefault();

		const isconfirm = await confirm( {
			title: __( 'Archive Step', 'cartflows' ),
			description: __(
				'Do you want to archive this step? Are you sure?',
				'cartflows'
			),
			actionBtnText: __( 'Yes', 'cartflows' ),
			cancelBtnText: __( 'No', 'cartflows' ),
		} );

		if ( isconfirm ) {
			setLoader( true );

			const formData = new window.FormData();

			formData.append( 'action', 'cartflows_archive_ab_test_step' );
			formData.append(
				'security',
				cartflows_admin.wcf_archive_ab_test_step_nonce
			);
			formData.append( 'step_id', id );
			formData.append( 'post_id', flow_id );

			window.wcfAction = 'archiveStep';
			trackPromise(
				apiFetch( {
					url: cartflows_admin.ajax_url,
					method: 'POST',
					body: formData,
				} ).then( () => {
					window.location.reload();

					setLoader( false );
				} )
			);
		}
	};

	if ( type === 'landing' || type === 'thankyou' ) {
		has_product_assigned = true;
	}

	// let invalid_class = '';

	// if (
	// 	! wcfCartflowsTypePlusPro() &&
	// 	( type === 'upsell' || type === 'downsell' )
	// ) {
	// 	invalid_class = 'wcf-flow-badge__invalid-step';
	// }

	const getAbTestBadge = function () {
		let output = '';

		if ( ab_test_ui ) {
			if ( control_id === step_id ) {
				output = (
					<span className="wcf-step-badge bg-primary-500 text-white text-xs px-2.5 py-1 rounded-full">
						{ __( 'Control', 'cartflows' ) }
					</span>
				);
			} else {
				const { var_badge_count } = props;

				output = (
					<span className="wcf-step-badge bg-gray-800 text-white text-xs px-2.5 py-1 rounded-full">
						{ sprintf(
							/* translators: %d is replaced with the count */
							__( 'Variation-%d', 'cartflows' ),
							var_badge_count
						) }
					</span>
				);
			}
		}

		return output;
	};

	const getOfferBadge = function () {
		let output = '';

		if (
			wcfCartflowsTypePlusPro() &&
			( 'upsell' === type || 'downsell' === type )
		) {
			if ( offer_yes_next_step && offer_no_next_step ) {
				output = (
					<>
						<span
							className="wcf-flow-badge wcf-badge wcf-badge--success !text-[10px] !px-2 !py-px wcf-yes-offer-badge relative wcf-inline-tooltip after:top-8 cursor-pointer"
							data-tooltip={ validateTitleField(
								offer_yes_next_step,
								35,
								25
							) }
						>
							<CheckCircleIcon
								className="w-3.5 h-3.5 stroke-2"
								aria-hidden="true"
							/>
							{ __( 'Offer Accepted', 'cartflows' ) }
						</span>
						<span
							className="wcf-flow-badge wcf-badge wcf-badge--warning !text-[10px] !px-2 !py-px wcf-no-offer-badge relative wcf-inline-tooltip after:top-8 cursor-pointer"
							data-tooltip={ validateTitleField(
								offer_no_next_step,
								35,
								25
							) }
						>
							<XCircleIcon
								className="w-3.5 h-3.5 stroke-2"
								aria-hidden="true"
							/>
							{ __( 'Offer Rejected', 'cartflows' ) }
						</span>
					</>
				);
			} else {
				output = (
					<span className="wcf-flow-badge wcf-badge wcf-badge--error !text-[10px] !px-2 !py-px wcf-invalid-sequence-badge">
						<ExclamationCircleIcon
							className="w-3.5 h-3.5 stroke-2"
							aria-hidden="true"
						/>
						{ __( 'Invalid Position', 'cartflows' ) }
					</span>
				);
			}
		} else if (
			! wcfCartflowsTypePlusPro() &&
			( 'upsell' === type || 'downsell' === type )
		) {
			output = (
				<span>
					<span className="px-2 py-0.5 text-xs text-primary-600 border border-primary-600 rounded-full ml-2">
						{ __( 'PRO', 'cartflows' ) }
					</span>
				</span>
			);
		}

		return output;
	};

	const getSTepSVG = function () {
		let stepSVG = '';

		switch ( type ) {
			case 'landing':
				stepSVG = landingstep;
				break;
			case 'checkout':
				stepSVG = checkoutstep;
				break;
			case 'optin':
				stepSVG = optinstep;
				break;
			case 'thankyou':
				stepSVG = thankyoustep;
				break;
			case 'upsell':
				stepSVG = upsellstep;
				break;
			case 'downsell':
				stepSVG = downsellstep;
				break;
		}

		return stepSVG;
	};

	const getViews = function () {
		let views = 0;

		if ( flow_analytics && step_analytics ) {
			if ( is_variation ) {
				views = step_analytics[ 'visits-ab' ][ step_id ].total_visits;
			} else {
				views = step_analytics.visits.total_visits;
			}
		}

		return views;
	};

	const getConversion = function () {
		let conversion = 0;
		if ( flow_analytics && step_analytics ) {
			if ( is_variation ) {
				conversion =
					step_analytics[ 'visits-ab' ][ step_id ].conversions;
			} else {
				conversion = step_analytics.visits.conversions;
			}
		}

		return conversion;
	};

	const getRevenue = function () {
		let revenue = 0;
		if ( flow_analytics && step_analytics ) {
			if ( is_variation ) {
				revenue = step_analytics[ 'visits-ab' ][ step_id ].revenue;
			} else {
				revenue = step_analytics.visits.revenue;
			}
		}

		return 0 !== revenue ? ReactHtmlParser( revenue ) : revenue;
	};

	const getUpgradeProBadge = function () {
		if ( ! wcfCartflowsPro() ) {
			return (
				<a
					href={ getUpgradeToProUrl(
						'utm_source=carflows-dashboard&utm_medium=free-cartflows&utm_campaign=go-pro'
					) }
					target="_blank"
					className="wcf-step--stats-content__upgrade-to-pro--badge absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
					rel="noreferrer"
				>
					<span className="wcf-badge wcf-badge--warning hover:text-amber-600 focus:text-amber-600 rounded text-xs cursor-pointer font-normal mr-4">
						{ __( 'Upgrade to Pro', 'cartflows' ) }
					</span>
				</a>
			);
		} else if ( wcfCartflowsPro() && 'Activated' !== license_status ) {
			return (
				<a
					href={ cartflows_admin?.license_popup_url }
					target="_blank"
					className="wcf-step--stats-content__upgrade-to-pro--badge absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
					rel="noreferrer"
				>
					<span className="wcf-badge wcf-badge--error hover:text-red-600 focus:text-red-600 rounded text-xs cursor-pointer font-normal mr-4">
						{ __( 'Activate License', 'cartflows' ) }
					</span>
				</a>
			);
		}
	};
	return (
		<div
			className={ `wcf-step-wrap--container w-full p-4 flex items-center gap-2 ${
				ab_test_ui ? 'border-b border-gray-200' : ''
			}` }
		>
			<div className="wcf-steps--sortable-toggle flex cursor-move text-gray-400">
				<EllipsisVerticalIcon
					className="w-5 h-5 stroke-1"
					aria-hidden="true"
				/>
				<EllipsisVerticalIcon
					className="w-5 h-5 stroke-1 -ml-3.5"
					aria-hidden="true"
				/>
			</div>

			<div
				className={ classnames(
					'wcf-step flex gap-6 items-center w-full',
					loader ? 'step-overlay' : '',
					! has_product_assigned && id !== global_checkout
						? 'wcf-step__no-product'
						: ''
				) }
			>
				<div className="wcf-step--content flex items-center gap-4 w-[50%]">
					<img
						src={ getSTepSVG() }
						alt={ type }
						className="rounded-lg  w-[72px] h-[72px]"
					></img>
					<div className="wcf-steps--title-wrap flex flex-col gap-1">
						<div className="wcf-step__col-tags flex items-center gap-2">
							<span className="text-base font-normal text-gray-400 capitalize">
								{ type === 'thankyou'
									? __( 'Thank You', 'cartflows' )
									: type }
							</span>
							{ getAbTestBadge() }
							{ ! has_product_assigned &&
								'storeCheckout' !== flow_type && (
									<span className="wcf-badge wcf-badge--error !text-[10px] !px-2 !py-px wcf-no-product-badge">
										<ExclamationCircleIcon
											className="w-3.5 h-3.5 stroke-2"
											aria-hidden="true"
										/>
										{ __(
											'No Product Assigned',
											'cartflows'
										) }
									</span>
								) }
							{ ! has_product_assigned &&
								'storeCheckout' === flow_type &&
								'checkout' !== type && (
									<span className="wcf-badge wcf-badge--error !text-[10px] !px-2 !py-px wcf-no-product-badge">
										<ExclamationCircleIcon
											className="w-3.5 h-3.5 stroke-2"
											aria-hidden="true"
										/>
										{ __(
											'No Product Assigned',
											'cartflows'
										) }
									</span>
								) }
							{ has_product_assigned &&
								'storeCheckout' === flow_type &&
								'checkout' === type && (
									<span className="wcf-global-checkout-error-badge wcf-flow-badge wcf-badge wcf-badge--error !text-[10px] !px-2 !py-px">
										<ExclamationCircleIcon
											className="w-3.5 h-3.5 stroke-2"
											aria-hidden="true"
										/>
										{ __(
											'Store Checkout - Remove selected checkout product',
											'cartflows'
										) }
									</span>
								) }
							{ getOfferBadge() }
						</div>
						<div className="wcf-step__title">
							{ /* <span className={ dashiconsMenu() }></span> */ }
							<a
								className="font-semibold text-lg text-gray-800 hover:text-primary-500"
								href={ actions[ 1 ].link }
							>
								{ validateTitleField(
									title,
									cartflows_admin.title_length.max,
									cartflows_admin.title_length.display_length
								) }
							</a>
						</div>
					</div>
				</div>

				<div className="wcf-divider border-l border-gray-100 h-12"></div>

				<div className={ `wcf-step--stats-content w-2/3 relative` }>
					<div
						className={ `wcf-step--stats-content__info flex text-center justify-around items-center ${
							! flow_analytics ? 'blur-sm relative' : ''
						}` }
					>
						<div className="wcf-step--stats-content__stat">
							<div className="text-sm text-gray-400 capitalize">
								{ __( 'Views', 'cartflows' ) }
							</div>
							<div className="font-semibold text-base text-gray-800">
								{ getViews() }
							</div>
						</div>
						<div className="wcf-step--stats-content__stat">
							<div className="text-sm text-gray-400 capitalize">
								{ __( 'Conversions', 'cartflows' ) }
							</div>
							<div className="font-semibold text-base text-gray-800">
								{ 'thankyou' !== type ? getConversion() : '-' }
							</div>
						</div>
						<div className="wcf-step--stats-content__stat">
							<div className="text-sm text-gray-400 capitalize">
								{ __( 'Revenue', 'cartflows' ) }
							</div>
							<div className="font-semibold text-base text-gray-800">
								{ 'thankyou' !== type && 'landing' !== type
									? getRevenue()
									: '-' }
							</div>
						</div>
					</div>

					{ /* Upgrade to PRO badge */ }
					{ ! flow_analytics && getUpgradeProBadge() }
				</div>

				<div className="wcf-divider border-l border-gray-100 h-12"></div>

				<div className="wcf-step--actions-col w-[15%]">
					<div className="wcf-step--actions" ref={ ref }>
						{ /* <!-- popup for setting --> */ }
						<div className="wcf-step--action-btns">
							<div className="wcf-step--action__basic-btns flex items-center justify-evenly">
								{ actions.map( ( action ) => {
									return (
										<a
											href={ action?.link }
											className={ `wcf-step__action-btn group flex relative text-gray-400 hover:text-primary-500 group p-1 ${
												action.class ?? ''
											}` }
											// title={ action?.slug }
											target={
												'view' === action?.slug
													? '_blank'
													: ''
											}
											rel="noreferrer"
											key={ action?.link }
										>
											{ action.slug &&
												'view' === action.slug && (
													<Tooltip
														classes={ 'capitalize' }
														text={ sprintf(
															// translators: %s: step slug
															__(
																'%s Step',
																'cartflows'
															),
															action?.slug
														) }
														icon={
															<EyeIcon
																className="w-5 h-5 stroke-1"
																aria-hidden="true"
															/>
														}
													/>
												) }

											{ action.slug &&
												'edit' === action.slug && (
													<Tooltip
														classes={ 'capitalize' }
														text={ sprintf(
															// translators: %s: step slug
															__(
																'%s Step',
																'cartflows'
															),
															action?.slug
														) }
														icon={
															<PencilIcon
																className="w-5 h-5 stroke-1"
																aria-hidden="true"
															/>
														}
													/>
												) }
										</a>
									);
								} ) }

								<Link
									to={ {
										pathname: 'admin.php',
										search:
											'storeCheckout' === flow_type
												? `?page=cartflows&path=store-checkout&action=wcf-edit-flow&flow_id=${ flow_id }&step_id=${ step_id }`
												: `?page=cartflows&path=flows&action=wcf-edit-flow&flow_id=${ flow_id }&step_id=${ step_id }`,
									} }
									// title={ __( 'Open Settings', 'cartflows' ) }
									className="wcf-step__action-btn group flex relative text-gray-400 hover:text-primary-500 p-1"
								>
									<Tooltip
										classes={ 'capitalize' }
										text={ __(
											'Open Settings',
											'cartflows'
										) }
										icon={
											<Cog6ToothIcon
												className="w-5 h-5 stroke-1"
												aria-hidden="true"
											/>
										}
									/>
								</Link>
								<StepActionMenu
									id={ id }
									control_id={ control_id }
									onClickEvents={ {
										clone: cloneStep,
										delete: deleteStep,
										abtest: createAbVariations,
										winner: declare_abtest_winner,
										archived: archivedStep,
									} }
									is_cf_pro={ is_cf_pro }
									actions={ menu_actions }
								/>
							</div>
							{ /* <div
								className="wcf-step--action__more-option cursor-pointer text-gray-400 hover:text-primary-500 relative"
								title={ __( 'More Options', 'cartflows' ) }
							>
								<StepActionMenu
									id={ id }
									control_id={ control_id }
									onClickEvents={ {
										clone: cloneStep,
										delete: deleteStep,
										abtest: createAbVariations,
										winner: declare_abtest_winner,
										archived: archivedStep,
									} }
									is_cf_pro={ is_cf_pro }
									actions={ menu_actions }
								/>
							</div> */ }
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default InnerStep;
