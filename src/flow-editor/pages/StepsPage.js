import React, { useState, useEffect } from 'react';
import apiFetch from '@wordpress/api-fetch';
import { useStateValue } from '@Utils/StateProvider';
import { ReactSortable } from 'react-sortablejs';
import { __ } from '@wordpress/i18n';
import './StepsPage.scss';
import StepRow from '@FlowEditor/components/steps-page/StepRow';
import StepsSkeleton from '@FlowEditor/components/steps-page/StepsSkeleton';
import SlideOver from '@SlideOver/SlideOver';
import { Link } from 'react-router-dom';
import AnalyticsPage from '@FlowEditor/pages/AnalyticsPage';
import { PlusIcon } from '@heroicons/react/24/outline';

function StepsPage() {
	const [ { flow_id, steps, emptySteps, flow_type }, dispatch ] =
		useStateValue();
	const [ reRender, setReRender ] = useState( false );

	let loading = true;

	if ( steps.length > 0 ) {
		loading = false;
	}

	const updateRender = function () {
		setReRender( ! reRender );
	};

	useEffect( () => {
		let isActive = true;

		const getFlowData = async () => {
			apiFetch( {
				path: `/cartflows/v1/admin/flow-data/${ flow_id }`,
			} ).then( ( data ) => {
				if ( isActive ) {
					// Add the data into the data layer
					dispatch( {
						type: 'SET_FLOW_DATA',
						data,
					} );
				}
			} );
		};

		getFlowData();

		return () => {
			isActive = false;
		};
	}, [ reRender ] );

	const updateData = () => {
		const post_id = flow_id;

		const step_ids = [];

		steps.map( ( step ) => {
			step_ids.push( step.id );
			return '';
		} );

		const ajaxData = new window.FormData();
		ajaxData.append( 'action', 'cartflows_reorder_flow_steps' );
		ajaxData.append( 'security', cartflows_admin.reorder_flow_steps_nonce );
		ajaxData.append( 'step_ids', step_ids );
		ajaxData.append( 'post_id', post_id );

		apiFetch( {
			url: cartflows_admin.ajax_url,
			method: 'POST',
			body: ajaxData,
		} ).then( ( data ) => {
			dispatch( {
				type: 'SET_STEPS',
				steps: data.steps,
			} );
		} );
	};

	const noStepNotice = function () {
		if ( steps.length === 0 ) {
			return (
				<div className="wcf-analytics-no-step-notice text-center mb-8 bg-white p-20 rounded-xl w-11/12">
					<svg
						className="mx-auto h-12 w-12 text-gray-400"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
						aria-hidden="true"
					>
						<path
							vectorEffect="non-scaling-stroke"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={ 2 }
							d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
						/>
					</svg>

					<h3 className="mt-2 text-sm font-semibold text-gray-900">
						{ __( 'No Steps Added.', 'cartflows' ) }
					</h3>
					<p className="mt-1 text-sm text-gray-500">
						{ __(
							'Seems like there are no steps created or added in this flow',
							'cartflows'
						) }
					</p>
					<div className="mt-6">
						<Link
							key="importer"
							to={ {
								pathname: 'admin.php',
								search:
									'storeCheckout' === flow_type
										? `?page=cartflows&path=store-checkout&action=wcf-edit-flow&flow_id=${ flow_id }&tab=library`
										: `?page=cartflows&path=flows&action=wcf-edit-flow&flow_id=${ flow_id }&tab=library`,
							} }
							className="wcf-create-step wcf-button wcf-primary-button"
						>
							<PlusIcon className="w-18 h-18 stroke-2" />
							<span className="wcf-create-step--text">
								{ __( 'Add New Step', 'cartflows' ) }
							</span>
						</Link>
					</div>
				</div>
			);
		}
	};

	// const query = new URLSearchParams( useLocation()?.search );
	// const currentStep = query.get( 'step_id' ) ? query.get( 'step_id' ) : '';

	let checkoutKey = false;
	let content = false;
	const invalidSteps = [];
	const modifiedSteps = [];

	const listSteps = function () {
		if ( 'storeCheckout' === flow_type ) {
			if ( steps.length > 0 ) {
				steps.map( ( step, key ) => {
					if ( 'checkout' === step.type ) {
						if ( ! cartflows_admin.old_global_checkout ) {
							checkoutKey = key;
							return '';
						} else if (
							step.id ===
							parseInt( cartflows_admin.old_global_checkout )
						) {
							checkoutKey = key;
							return '';
						}
						invalidSteps.push( step );
					} else if ( 'landing' === step.type ) {
						invalidSteps.push( step );
					} else {
						modifiedSteps.push( step );
					}

					return '';
				} );
			}
			if ( modifiedSteps.length > 0 ) {
				content = true;
			}
			return (
				<>
					{ ! emptySteps && ! loading && (
						<>
							{ invalidSteps.map( ( step ) => {
								return (
									<StepRow
										{ ...step }
										key={ step.id }
										invalid={ true }
									/>
								);
							} ) }
							<StepRow
								{ ...steps[ checkoutKey ] }
								key={ steps[ checkoutKey ].id }
							/>
							{ content && (
								<ReactSortable
									list={ modifiedSteps }
									setList={ ( newState ) =>
										dispatch( {
											type: 'SET_STORE_STEPS',
											steps: newState,
										} )
									}
									swapThreshold={ 0.8 }
									direction={ 'vertical' }
									animation={ 150 }
									handle={ '.wcf-step-wrap' }
									filter={
										'.wcf-step__col-actions, .wcf-step__title-text, .wcf-ab-test-popup-content, .wcf-steps-action-buttons, .wcf-archived-wrapper'
									}
									preventOnFilter={ false }
								>
									{ modifiedSteps.map( ( step ) => {
										if ( step.type !== 'checkout' ) {
											return (
												<StepRow
													{ ...step }
													ajaxcall={ updateData }
													key={ step.id }
												/>
											);
										}
										return <></>;
									} ) }
								</ReactSortable>
							) }
						</>
					) }
				</>
			);
		}

		return (
			<>
				{ ! emptySteps && ! loading && (
					<ReactSortable
						list={ steps }
						setList={ ( newState ) =>
							dispatch( {
								type: 'SET_STEPS',
								steps: newState,
							} )
						}
						swapThreshold={ 0.8 }
						direction={ 'vertical' }
						animation={ 150 }
						handle={ '.wcf-step-wrap' }
						filter={
							'.wcf-step__col-actions, .wcf-step__title-text, .wcf-ab-test-popup-content'
						}
						preventOnFilter={ false }
					>
						{ steps.map( ( step ) => {
							return (
								<StepRow
									{ ...step }
									ajaxcall={ updateData }
									key={ step.id }
								/>
							);
						} ) }
					</ReactSortable>
				) }
			</>
		);
	};

	return (
		<>
			<div className="wcf-steps-page-wrapper">
				{ ! emptySteps && <AnalyticsPage /> }

				<div className="wcf-steps-header flex justify-center my-8">
					<div className="flex justify-between items-center w-11/12">
						<div className="wcf-steps-header--title text-xl font-semibold text-gray-800">
							{ __( 'Funnel Steps', 'cartflows' ) }
						</div>
						<div className="wcf-steps-header--actions">
							<Link
								key="importer"
								to={ {
									pathname: 'admin.php',
									search:
										'storeCheckout' === flow_type
											? `?page=cartflows&path=store-checkout&action=wcf-edit-flow&flow_id=${ flow_id }&tab=library`
											: `?page=cartflows&path=flows&action=wcf-edit-flow&flow_id=${ flow_id }&tab=library`,
								} }
								className="wcf-create-step wcf-button wcf-primary-button"
							>
								<PlusIcon className="w-18 h-18 stroke-2" />
								<span className="wcf-create-step--text">
									{ __( 'Add New Step', 'cartflows' ) }
								</span>
							</Link>
						</div>
					</div>
				</div>

				<div className="wcf-list-steps flex justify-center">
					{ emptySteps && noStepNotice() }
					{ ! emptySteps && loading && <StepsSkeleton /> }
					{ ! loading && (
						<div className="w-11/12">{ listSteps() }</div>
					) }
				</div>

				<div className="wcf-step-footer flex justify-center">
					<div className="w-11/12 text-center">
						<Link
							key="importer"
							to={ {
								pathname: 'admin.php',
								search:
									'storeCheckout' === flow_type
										? `?page=cartflows&path=store-checkout&action=wcf-edit-flow&flow_id=${ flow_id }&tab=library`
										: `?page=cartflows&path=flows&action=wcf-edit-flow&flow_id=${ flow_id }&tab=library`,
							} }
							className="wcf-create-step wcf-button !p-6 rounded-full !border-none !shadow-none bg-white text-primary-500 hover:text-primary-600 hover:!shadow-custom cursor-pointer relative wcf-inline-tooltip after:-top-8 before:-top-2 before:absolute before:invisible before:rotate-180 before:border-4 before:border-transparent before:border-b-gray-700 hover:before:visible group-hover:before:block"
							data-tooltip={ __( 'Add new step', 'cartflows' ) }
						>
							<PlusIcon className="w-18 h-18 stroke-2" />
						</Link>
					</div>
				</div>
			</div>
			<SlideOver renderCb={ updateRender } />
		</>
	);
}

export default StepsPage;
