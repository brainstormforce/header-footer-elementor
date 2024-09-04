import React, { useState } from 'react';
import apiFetch from '@wordpress/api-fetch';
import { __, sprintf } from '@wordpress/i18n';
import { useStateValue } from '@Utils/StateProvider';
import { DateField, DocField, Tooltip } from '@Fields';
import AnalyticsSkeleton from '@FlowEditor/components/flow-page/AnalyticsSkeleton';
import { validateTitleField } from '@Utils/Helpers';
import FlowSettings from '@FlowEditor/FlowSettings';
import FlowTitle from '@FlowEditor/flow-title/FlowTitle';
import useConfirm from '@Alert/ConfirmDialog';
import { trackPromise } from 'react-promise-tracker';
import ReactHtmlParser from 'react-html-parser';
import {
	Cog6ToothIcon,
	EyeIcon,
	CloudArrowDownIcon,
	ChevronUpIcon,
	ChevronDownIcon,
	CurrencyDollarIcon,
	BanknotesIcon,
	ArrowUpOnSquareIcon,
	ShoppingCartIcon,
	ArrowPathIcon,
	ArrowSmallRightIcon,
	TrashIcon,
} from '@heroicons/react/24/outline';

function classNames( ...classes ) {
	return classes.filter( Boolean ).join( ' ' );
}
function AnalyticsPage() {
	const [
		{ flow_analytics, flow_type, flow_link, page_slug, flow_id },
		dispatch,
	] = useStateValue();
	const [ isShowFlowSettings, setIsShowFlowSettings ] = useState( false );
	const headers = [
		__( 'Total Visits', 'cartflows' ),
		__( 'Unique Visits', 'cartflows' ),
		__( 'Conversions', 'cartflows' ),
		__( 'Conversion Rate', 'cartflows' ),
		__( 'Revenue', 'cartflows' ),
	];
	const [ abSteps, showabSteps ] = useState( false );
	const [ isCollapsed, setIsCollapsed ] = useState( true );
	const [ abStepsid, showabStepsid ] = useState();
	// const [ activeFilter, setActiveFilter ] = useState( '7' );
	const currentDate = new Date();
	const [ toDate, setToDate ] = useState(
		currentDate.toISOString().slice( 0, 10 )
	);
	currentDate.setDate( currentDate.getDate() - 7 );
	const [ fromDate, setFromDate ] = useState(
		currentDate.toISOString().slice( 0, 10 )
	);
	const [ loadingAnalytics, setLoadingAnalytics ] = useState();
	const [ resetAnalyticsProcess, setResetAnalyticsProcess ] =
		useState( false );

	const confirm = useConfirm();

	const revenue = flow_analytics?.revenue;
	const all_steps = flow_analytics?.all_steps;

	const query = new URLSearchParams( window.location.search );
	const id = query.get( 'flow_id' );

	const displayabSteps = ( event ) => {
		const step_id = event.target.getAttribute( 'id' );
		showabSteps( ( prevValue ) => ! prevValue );
		showabStepsid( parseInt( step_id ) );
	};

	const closeSettings = function () {
		setIsShowFlowSettings( ! isShowFlowSettings );
	};

	const analytics_call = function ( date_from, date_to ) {
		const formData = new window.FormData();
		setFromDate( date_from );
		setToDate( date_to );

		formData.append( 'action', 'cartflows_pro_set_visit_data' );
		formData.append( 'security', cartflows_admin.set_visit_data_nonce );
		formData.append( 'flow_id', id );
		formData.append( 'date_to', date_to );
		formData.append( 'date_from', date_from );

		apiFetch( {
			url: cartflows_admin.ajax_url,
			method: 'POST',
			body: formData,
		} ).then( ( data ) => {
			dispatch( {
				type: 'SET_FLOW_ANALYTICS',
				flow_analytics: data,
			} );
			setLoadingAnalytics( false );
		} );
	};

	const renderAnalytics = function ( date ) {
		setLoadingAnalytics( true );
		const date_from = date.startDate;
		const date_to = date.endDate;
		analytics_call( date_from, date_to );
	};

	const resetAnalytics = async function ( e ) {
		e.preventDefault();

		const isconfirm = await confirm( {
			title: __( 'Reset Analytics', 'cartflows' ),
			description: __(
				'Are you really want to reset funnel analytics?',
				'cartflows'
			),
			actionBtnText: __( 'Yes', 'cartflows' ),
			cancelBtnText: __( 'No', 'cartflows' ),
		} );

		if ( ! isconfirm ) {
			return;
		}
		const formData = new window.FormData();

		formData.append( 'action', 'cartflows_pro_reset_flow_analytics' );
		formData.append( 'flow_id', id );
		formData.append(
			'security',
			cartflows_admin.reset_flow_analytics_nonce
		);

		setResetAnalyticsProcess( true );

		apiFetch( {
			url: cartflows_admin.ajax_url,
			method: 'POST',
			body: formData,
		} ).then( () => {
			setResetAnalyticsProcess( false );
			e.target.blur();
			window.location.reload();
		} );
	};

	const deleteFlow = async ( e ) => {
		e.preventDefault();

		const isconfirm = await confirm( {
			title: __( 'Delete Store Checkout', 'cartflows' ),
			description: sprintf(
				/* translators: %s new line break */
				__(
					'Do you really want to delete store checkout?%1$1sNOTE: This action cannot be reversed.',
					'cartflows'
				),
				'\r\n'
			),
			actionBtnText: __( 'Yes', 'cartflows' ),
			cancelBtnText: __( 'No', 'cartflows' ),
		} );

		if ( ! isconfirm ) {
			return;
		}

		const formData = new window.FormData();

		formData.append( 'action', 'cartflows_delete_flow' );
		formData.append( 'security', cartflows_admin.delete_flow_nonce );
		formData.append( 'flow_id', flow_id );
		window.wcfAction = 'deleteFlow';
		trackPromise(
			apiFetch( {
				url: cartflows_admin.ajax_url,
				method: 'POST',
				body: formData,
			} ).then( () => {
				dispatch( {
					type: 'SET_FLOWS',
					flows: null,
				} );
				window.location.replace(
					cartflows_admin.admin_base_url +
						`admin.php?page=${ page_slug }&path=store-checkout`
				);
			} )
		);
	};

	const stats = [
		{
			name: 'Total Orders',
			stat: revenue && revenue.order_count ? revenue.order_count : 0,
			tooltip: __( 'Total number of orders.', 'cartflows' ),
			icon: (
				<ShoppingCartIcon className="w-8 h-8 stroke-1 text-primary-500 hover:text-primary-600" />
			),
		},
		{
			name: 'Total Revenue',
			stat: revenue && revenue.gross_sale ? revenue.gross_sale : 0,
			tooltip: __( 'Grand total of all orders.', 'cartflows' ),
			icon: (
				<CurrencyDollarIcon className="w-8 h-8 stroke-1 text-primary-500 hover:text-primary-600" />
			),
		},
		{
			name: 'Avg. Order Value',
			stat:
				revenue && revenue.avg_order_value
					? revenue.avg_order_value
					: 0,
			tooltip: __( 'Average total of every order.', 'cartflows' ),
			icon: (
				<BanknotesIcon className="w-8 h-8 stroke-1 text-primary-500 hover:text-primary-600" />
			),
		},
		{
			name: 'Bump Offer Revenue',
			stat: revenue && revenue.bump_offer ? revenue.bump_offer : 0,
			tooltip: __( 'Grand total of all order bumps.', 'cartflows' ),
			icon: (
				<ArrowUpOnSquareIcon className="w-8 h-8 stroke-1 text-primary-500 hover:text-primary-600" />
			),
		},
	];

	const exportCurrentFlow = ( e ) => {
		console.log( '***** Exporting the Current Flow *****' );

		e.preventDefault();

		const formData = new window.FormData();

		formData.append( 'action', 'cartflows_export_flow' );
		formData.append( 'security', cartflows_admin.export_flow_nonce );
		formData.append( 'flow_id', id );

		apiFetch( {
			url: cartflows_admin.ajax_url,
			method: 'POST',
			body: formData,
		} ).then( ( response ) => {
			if ( response.success ) {
				const fileName = response.data.flow_name || `flow-${ id }.json`;
				const flowData = JSON.stringify( response.data.flows );
				const fileType = 'application/json';

				const tempFile = new Blob( [ flowData ], { type: fileType } );
				const isIE = false || !! document.documentMode;
				if ( isIE ) {
					window.navigator.msSaveOrOpenBlob( tempFile, fileName );
				} else {
					const anchor = document.createElement( 'a' );
					anchor.href = URL.createObjectURL( tempFile );
					anchor.download = fileName;
					anchor.click();
				}
			}
		} );
	};

	return (
		<div className="wcf-flow-analytics -mt-8 -mx-8 bg-white p-8">
			<div className="wcf-flow-header flex justify-between">
				<FlowTitle type={ flow_type } />
				<div className="wcf-flow-header--actions w-[35%] flex gap-6 items-center justify-end">
					<div className="wcf-flow-header--action-filter">
						{ wcfCartflowsTypePro() && (
							<DateField
								classNames="wcf-custom-filter-input !w-72 !h-full date-picker-field !pl-4 !px-4 !py-3 !pr-7 text-sm font-normal text-gray-400 !rounded-md !border-gray-200 focus:!ring-primary-100 focus:!border-primary-500 focus:!shadow-none !outline-0 !outline-none"
								value={ {
									endDate: toDate,
									startDate: fromDate,
								} }
								onChangeCB={ renderAnalytics }
							/>
						) }
					</div>
					<div className="wcf-flow-header--action-settings flex gap-4">
						<a
							className="wcf-flow-export wcf-button-animate p-2.5 wcf-secondary-button cursor-pointer rounded-md text-primary-500 hover:text-primary-600 focus:text-primary-600 focus:ring-2 focus:ring-primary-600 relative wcf-inline-tooltip"
							href="#!"
							data-tooltip={ __( 'Export Flow', 'cartflows' ) }
							onClick={ exportCurrentFlow }
						>
							<CloudArrowDownIcon className="w-18 h-18 stroke-1" />
						</a>

						<span className="divider w-px bg-gray-200"></span>

						<a
							className="wcf-flow-view-toggler wcf-button-animate p-2.5 wcf-secondary-button cursor-pointer rounded-md text-primary-500 hover:text-primary-600 focus:text-primary-600 focus:ring-2 focus:ring-primary-600 relative wcf-inline-tooltip"
							href={ flow_link }
							target="_blank"
							rel="noreferrer"
							data-tooltip={ __( 'View Flow', 'cartflows' ) }
						>
							<EyeIcon className="w-18 h-18 stroke-1" />
						</a>
						<a
							className="wcf-flow-settings-toggler wcf-button-animate p-2.5 wcf-secondary-button cursor-pointer rounded-md text-primary-500 hover:text-primary-600 focus:text-primary-600 focus:ring-2 focus:ring-primary-600 relative wcf-inline-tooltip after:-left-16"
							onClick={ () => {
								setIsShowFlowSettings( ! isShowFlowSettings );
							} }
							data-tooltip={ __(
								'Open Funnel Settings',
								'cartflows'
							) }
							href="#!"
						>
							<Cog6ToothIcon className="w-18 h-18 stroke-1" />
						</a>

						{ /* Show the setting only once the steps are loaded*/ }
						<FlowSettings
							isOpen={ isShowFlowSettings }
							onClose={ closeSettings }
						/>

						{ 'storeCheckout' === flow_type && (
							<a
								className="wcf-button-animate flex items-center cursor-pointer relative wcf-inline-tooltip after:-left-24"
								data-tooltip={ __(
									'Delete Store Checkout',
									'cartflows'
								) }
								onClick={ deleteFlow }
							>
								<TrashIcon className="h-4 w-4 stroke-2 text-gray-400 hover:text-primary-500" />
							</a>
						) }
					</div>
				</div>
			</div>

			{ /* Display the loader on analytics while it is processing */ }
			{ wcfCartflowsTypePro() &&
				( loadingAnalytics || 'undefined' === typeof all_steps ? (
					<AnalyticsSkeleton />
				) : (
					<div className="wcf-analytics--stats-tabs my-6 mx-0">
						<dl className="gap-5 sm:grid-cols-3 flex w-full">
							{ stats.map( ( item ) => (
								<div
									key={ item.name }
									className="wcf-analytics--stats-tab flex justify-between items-center bg-white border border-primary-100 rounded-lg px-4 py-5 shadow-none sm:p-6 w-1/4"
								>
									<div className="wcf-analytics--tabs-stats-text">
										<dt className="text-sm font-normal text-gray-600">
											{ item.name }
											<Tooltip text={ item.tooltip } />
										</dt>
										<dd className="mt-1 text-2xl font-semibold tracking-tight text-gray-400">
											{ 0 !== item.stat
												? ReactHtmlParser( item.stat )
												: item.stat }
										</dd>
									</div>

									<div className="wcf-analytics--tabs-stats-icon">
										<div className="p-4 rounded-full bg-white shadow-custom">
											{ item.icon }
										</div>
									</div>
								</div>
							) ) }
						</dl>
					</div>
				) ) }
			{ wcfCartflowsTypePro() && (
				<>
					<div
						className={ classNames(
							`wcf-flow-analytics__report mt-9`,
							isCollapsed ? 'hidden' : 'block'
						) }
					>
						<div className="wcf-flow-analytics__report-table overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg w-11/12 mx-auto">
							<table className="min-w-full">
								<thead className="table-header bg-gray-50">
									<tr>
										<th
											scope="col"
											className="header__item py-3.5 pl-4 pr-3 sm:pl-6 text-left text-base font-medium text-gray-800"
										>
											{ __( 'Step', 'cartflows' ) }
										</th>
										{ headers.map(
											( header, header_index ) => {
												return (
													<th
														key={ header_index }
														scope="col"
														className="header__item px-3 py-3.5 text-center text-base font-medium text-gray-800"
													>
														{ header }
													</th>
												);
											}
										) }
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-200 bg-white">
									{ all_steps &&
										all_steps.map( ( data, data_index ) => {
											const visits = data.visits;
											const datarow = [
												visits.total_visits,
												visits.unique_visits,
												'thankyou' !== data.type
													? visits.conversions
													: '-',
												'thankyou' !== data.type
													? visits.conversion_rate +
													  ' %'
													: '-',
												[
													'thankyou',
													'optin',
													'landing',
												].includes( data.type )
													? '-'
													: ReactHtmlParser(
															visits.revenue
													  ),
											];
											let archived = false;

											let visitab = [];
											let visitarch = [];

											if (
												data[ 'visits-ab' ] !==
												undefined
											) {
												visitab = data[ 'visits-ab' ];
											}

											if (
												data[ 'visits-ab-archived' ] !==
												undefined
											) {
												archived = true;
												visitarch =
													data[
														'visits-ab-archived'
													];
											}

											return (
												<>
													<tr key={ data_index }>
														<td
															className={ `whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3 ${
																abSteps
																	? 'cursor-pointer'
																	: ''
															}` }
															title={
																data.visits
																	.title
															}
														>
															{ data[
																'visits-ab'
															] && (
																<>
																	<span
																		className={ `dashicons ${
																			abSteps &&
																			data.id ===
																				abStepsid
																				? 'dashicons-arrow-down'
																				: 'dashicons-arrow-right'
																		}` }
																		id={
																			data.id
																		}
																		onClick={
																			displayabSteps
																		}
																	></span>
																	<span
																		className="ab-test-step-name"
																		id={
																			data.id
																		}
																		onClick={
																			displayabSteps
																		}
																	>
																		{ validateTitleField(
																			data
																				.visits
																				.title,
																			cartflows_admin
																				.title_length
																				.max,
																			cartflows_admin
																				.title_length
																				.display_length
																		) }
																	</span>
																</>
															) }
															{ ! data[
																'visits-ab'
															] && (
																<span
																	id={
																		data.id
																	}
																>
																	{ validateTitleField(
																		data
																			.visits
																			.title,
																		30,
																		20
																	) }
																</span>
															) }
															{ '' !==
																visits?.note &&
																! data[
																	'ab-test'
																] && (
																	<span
																		className="dashicons dashicons-editor-help"
																		title={
																			visits.note
																		}
																	></span>
																) }
														</td>

														{ datarow.map(
															(
																dataitem,
																index
															) => {
																return (
																	<td
																		className="whitespace-nowrap text-base text-center px-3 py-7 text-gray-600"
																		key={
																			dataitem +
																			index
																		}
																	>
																		{
																			dataitem
																		}
																	</td>
																);
															}
														) }
													</tr>
													{ abSteps &&
														data.id ===
															abStepsid && (
															<>
																{ data[
																	'ab-test'
																] &&
																	Object.keys(
																		visitab
																	).map(
																		function (
																			i
																		) {
																			const variations =
																				visitab[
																					i
																				];

																			const ABdatarow =
																				[
																					variations.total_visits,
																					variations.unique_visits,
																					'thankyou' !==
																					data.type
																						? variations.conversions
																						: '-',
																					'thankyou' !==
																					data.type
																						? variations.conversion_rate +
																						  ' %'
																						: '-',
																					[
																						'thankyou',
																						'optin',
																						'landing',
																					].includes(
																						data.type
																					)
																						? '-'
																						: cartflows_admin.woo_currency +
																						  variations.revenue,
																				];

																			return (
																				<tr
																					className="table-row bg-gray-50"
																					key={
																						data.id +
																						i
																					}
																				>
																					<td className="step-name whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3 cursor-pointer">
																						<div className="flex items-center gap-1">
																							<ArrowSmallRightIcon className="w-3.5 h-3.5 stroke-2 text-gray-500" />
																							<span>
																								{ ' ' }
																								{
																									variations.title
																								}{ ' ' }
																							</span>
																							{ '' !==
																								variations?.note && (
																								<span
																									className="dashicons dashicons-editor-help"
																									title={
																										variations.note
																									}
																								></span>
																							) }
																						</div>
																					</td>

																					{ ABdatarow.map(
																						(
																							dataitem
																						) => {
																							return (
																								<td
																									className="whitespace-nowrap text-base text-center px-3 py-7 text-gray-600"
																									key={
																										data.id
																									}
																								>
																									{
																										dataitem
																									}
																								</td>
																							);
																						}
																					) }
																				</tr>
																			);
																		}
																	) }

																{ archived &&
																	Object.keys(
																		visitarch
																	).map(
																		function (
																			i
																		) {
																			const variations =
																				visitarch[
																					i
																				];

																			const ACdatarow =
																				[
																					variations.total_visits,
																					variations.unique_visits,
																					'thankyou' !==
																					data.type
																						? variations.conversions
																						: '-',
																					'thankyou' !==
																					data.type
																						? variations.conversion_rate +
																						  ' %'
																						: '-',
																					[
																						'thankyou',
																						'optin',
																						'landing',
																					].includes(
																						data.type
																					)
																						? '-'
																						: cartflows_admin.woo_currency +
																						  variations.revenue,
																				];
																			return (
																				<tr
																					className="table-row bg-gray-50"
																					key={
																						variations.step_id +
																						i
																					}
																				>
																					<td className="step-name whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
																						<div className="flex items-center gap-1">
																							<ArrowSmallRightIcon className="w-3.5 h-3.5 stroke-2 text-gray-500" />
																							{
																								variations.title
																							}
																							{ '' !==
																								variations?.note && (
																								<span
																									className="dashicons dashicons-editor-help"
																									title={
																										variations?.note
																									}
																								></span>
																							) }
																						</div>
																						<div className="wcf-archived-date text-gray-600 italic text-xs ml-4">
																							{
																								variations[
																									__(
																										'archived_date',
																										'cartflows'
																									)
																								]
																							}
																						</div>
																					</td>

																					{ ACdatarow.map(
																						(
																							dataitem
																						) => {
																							return (
																								<td
																									className="whitespace-nowrap text-base text-center px-3 py-7 text-gray-600"
																									key={
																										variations.step_id
																									}
																								>
																									{
																										dataitem
																									}
																								</td>
																							);
																						}
																					) }
																				</tr>
																			);
																		}
																	) }
															</>
														) }
												</>
											);
										} ) }
								</tbody>
							</table>
						</div>

						{ wcfCartflowsTypePro() && (
							<div className="wcf-flow-analytics__reset-button flex justify-between items-center mt-9 w-11/12 mx-auto">
								<DocField
									content={ sprintf(
										/* translators: %1$s: html tag, %2$s: html tag*/
										__(
											'%1$sNote:%2$s The orders which are placed by the admins are not considered while calculating the analytics.',
											'cartflows'
										),
										'<strong class="text-primary-500">',
										'</strong>'
									) }
								/>
								<button
									className={ `wcf-analytics-reset wcf-button ${
										! resetAnalyticsProcess
											? 'wcf-secondary-button'
											: 'wcf-disabled'
									}` }
									onClick={ resetAnalytics }
								>
									<ArrowPathIcon
										className={ `w-18 h-18 stroke-2 ${
											resetAnalyticsProcess
												? 'animate-spin'
												: ''
										}` }
									/>
									{ resetAnalyticsProcess
										? __( 'Resetting', 'cartflows' )
										: __( 'Reset Analytics', 'cartflows' ) }
								</button>
							</div>
						) }
					</div>
					<div
						className="wcf-show-more-toggler wcf-button-animate absolute group bg-white border border-gray-200 cursor-pointer rounded-full left-2/4 transform -translate-x-2/4 mt-3.5 px-1.5 py-1.5 group hover:bg-primary-25 hover:text-primary-300 hover:border-primary-300"
						onClick={ () => setIsCollapsed( ! isCollapsed ) }
						data-collapsed={ isCollapsed }
					>
						{ isCollapsed && (
							<ChevronDownIcon className="w-18 h-18 stroke-1 text-gray-400 group-hover:text-primary-500 group-hover:animate-bounce" />
						) }

						{ ! isCollapsed && (
							<ChevronUpIcon className="w-18 h-18 stroke-1 text-gray-400 group-hover:text-primary-500 group-hover:animate-bounce" />
						) }
					</div>
				</>
			) }
		</div>
	);
}
export default AnalyticsPage;
