import React, { useState, useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { PlusIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import ReactHtmlParser from 'react-html-parser';

// Import the data
import { useSettingsStateValue } from '@SettingsApp/utils/StateProvider';

// Import graphs
import TotalPageViews from './graphs/TotalPageViews';
import TotalRevenue from './graphs/TotalRevenue';
import TotalOrders from './graphs/TotalOrders';
import OfferRevenue from './graphs/OfferRevenue';
import { Link } from 'react-router-dom';
import GraphSkeleton from './GraphSkeleton';
import { DateField, Tooltip } from '@Fields';

function Graph() {
	const [ { analyticsData }, dispatch ] = useSettingsStateValue();

	const [ currentTab, SetCurrentTab ] = useState( 'total_revenue' );

	const [ total_flow_revenue, setFlowRevenue ] = useState();
	const [ total_offer_revenue, setOfferRevenue ] = useState();
	const [ total_orders, setTotalOrders ] = useState();
	const [ total_visits, setTotalVisits ] = useState();
	// const [ activeFilter, setActiveFilter ] = useState( 'last_week' );
	const [ dateRange, setDateRange ] = useState();
	const [ loading, setLoading ] = useState( true );
	const currentDate = new Date();
	const toDate = currentDate.toISOString().slice( 0, 10 );

	currentDate.setDate( currentDate.getDate() - 7 );
	const fromDate = currentDate.toISOString().slice( 0, 10 );

	const wooStatus =
		'active' === cartflows_admin.woocommerce_status ? true : false;

	const setEmptyData = function () {
		setFlowRevenue();
		setOfferRevenue();
		setTotalOrders();
		setTotalVisits();
		setLoading( true );
	};

	const setAnalyticsData = function ( flow_stats ) {
		setFlowRevenue(
			'undefined' !== typeof flow_stats.total_revenue
				? flow_stats.total_revenue
				: 0
		);
		setOfferRevenue(
			'undefined' !== typeof flow_stats.total_offers_revenue
				? flow_stats.total_offers_revenue
				: 0
		);
		setTotalOrders(
			'undefined' !== typeof flow_stats.total_orders
				? flow_stats.total_orders
				: 0
		);
		setTotalVisits(
			'undefined' !== typeof flow_stats.total_visits
				? flow_stats.total_visits
				: 0
		);
		setLoading( false );
	};

	useEffect( () => {
		let isActive = true;

		if ( ! analyticsData ) {
			const getallflowanalytics = async () => {
				const ajaxData = new window.FormData();

				let date_to = new Date();
				let date_from = new Date();

				date_from.setDate( date_from.getDate() - 7 );
				setDateRange( getDatesInRange( date_from, date_to ) );

				date_from = date_from.toISOString().slice( 0, 10 );
				date_to = date_to.toISOString().slice( 0, 10 );

				ajaxData.append( 'date_to', date_to );
				ajaxData.append( 'date_from', date_from );
				ajaxData.append( 'action', 'cartflows_get_all_flows_stats' );
				ajaxData.append(
					'security',
					cartflows_admin.get_all_flows_stats_nonce
				);

				apiFetch( {
					url: cartflows_admin.ajax_url,
					method: 'POST',
					body: ajaxData,
				} ).then( ( response ) => {
					if ( isActive ) {
						dispatch( {
							type: 'SET_ANALYTICS_DATA',
							analyticsData: response.data,
						} );
						setAnalyticsData( response?.data.flow_stats );
					}
				} );
			};

			getallflowanalytics();
		} else {
			setAnalyticsData( analyticsData.flow_stats );
		}

		return () => {
			isActive = false;
		};
	}, [] );

	// const changeFilter = ( event ) => {
	// 	setEmptyData();

	// 	const diff = event.target.value,
	// 		clicked_tab = event.target.id;
	// 	setActiveFilter( clicked_tab );

	// 	const formData = new window.FormData();

	// 	let date_to = new Date();
	// 	let date_from = new Date();
	// 	let report_date = diff;

	// 	report_date = typeof report_date === 'undefined' ? 7 : report_date;

	// 	switch ( report_date ) {
	// 		case '7':
	// 			date_from.setDate( date_from.getDate() - 7 );
	// 			break;
	// 		case '30':
	// 			date_from.setDate( date_from.getDate() - 30 );
	// 			break;
	// 		case '1':
	// 			date_from.setDate( date_from.getDate() );
	// 			break;
	// 		case '-1':
	// 			date_to.setDate( date_from.getDate() - 1 );
	// 			date_from.setDate( date_from.getDate() - 1 );
	// 			break;
	// 	}

	// 	setDateRange( getDatesInRange( date_from, date_to ) );

	// 	date_from = date_from.toISOString().slice( 0, 10 );
	// 	date_to = date_to.toISOString().slice( 0, 10 );

	// 	formData.append( 'date_to', date_to );
	// 	formData.append( 'date_from', date_from );
	// 	formData.append( 'action', 'cartflows_get_all_flows_stats' );
	// 	formData.append(
	// 		'security',
	// 		cartflows_admin.get_all_flows_stats_nonce
	// 	);

	// 	const getallflowanalytics = async () => {
	// 		apiFetch( {
	// 			url: cartflows_admin.ajax_url,
	// 			method: 'POST',
	// 			body: formData,
	// 		} ).then( ( response ) => {
	// 			setAnalyticsData( response?.data.flow_stats );
	// 		} );
	// 	};

	// 	getallflowanalytics();
	// };

	function classNames( ...classes ) {
		return classes.filter( Boolean ).join( ' ' );
	}

	function getDatesInRange( startDate, endDate ) {
		const date = new Date( startDate.getTime() );

		const dates = [];

		while ( date <= endDate ) {
			dates.push( new Date( date ).toISOString().slice( 0, 10 ) );
			date.setDate( date.getDate() + 1 );
		}

		return dates;
	}

	const tabMenus = [
		{
			name: __( 'Total Revenue', 'cartflows' ),
			tooltip: __( 'Total revenue of all funnels.', 'cartflows' ),
			slug: 'total_revenue',
			value: total_flow_revenue,
		},
		{
			name: __( 'Total Orders', 'cartflows' ),
			tooltip: __(
				'Total no. of orders received from CartFlows.',
				'cartflows'
			),
			slug: 'total_orders',
			value: total_orders,
		},
		{
			name: __( 'Total Views', 'cartflows' ),
			tooltip: __(
				'Total no. of visits of all funnel steps.',
				'cartflows'
			),
			slug: 'total_views',
			value: total_visits,
		},
		{
			name: __( 'Offer Revenue', 'cartflows' ),
			tooltip: __(
				'Total revenue of upsell/downsell offers',
				'cartflows'
			),
			slug: 'offer_revenue',
			value: total_offer_revenue,
		},
	];

	// const filters = [
	// 	{
	// 		name: __( 'Today', 'cartflows' ),
	// 		slug: 'today',
	// 		diff: '1',
	// 	},
	// 	{
	// 		name: __( 'Yesterday', 'cartflows' ),
	// 		slug: 'yesterday',
	// 		diff: '-1',
	// 	},
	// 	{
	// 		name: __( 'Last Week', 'cartflows' ),
	// 		slug: 'last_week',
	// 		diff: '7',
	// 	},
	// 	{
	// 		name: __( 'Last Month', 'cartflows' ),
	// 		slug: 'last_month',
	// 		diff: '30',
	// 	},
	// ];

	const setRange = function () {
		const date_to = new Date();
		const date_from = new Date();

		date_from.setDate( date_from.getDate() - 7 );
		setDateRange( getDatesInRange( date_from, date_to ) );
	};
	/**
	 *
	 * Render the various stats related graphs.
	 *
	 * @return { Object } graph the component to render.
	 */
	const renderGraphs = function () {
		let graph = '';

		if ( ! dateRange ) {
			setRange();
		}

		switch ( currentTab ) {
			case 'total_views':
				graph = <TotalPageViews dateRange={ dateRange } />;
				break;
			case 'total_revenue':
				graph = <TotalRevenue dateRange={ dateRange } />;
				break;
			case 'total_orders':
				graph = <TotalOrders dateRange={ dateRange } />;
				break;
			case 'offer_revenue':
				graph = <OfferRevenue dateRange={ dateRange } />;
				break;
			default:
				graph = <TotalRevenue dateRange={ dateRange } />;
				break;
		}

		return graph;
	};

	const get_nav_classes = function ( menu_slug ) {
		let class_names = '';

		if ( 'total_revenue' === menu_slug ) {
			class_names = 'rounded-tl-lg ';
		}

		if ( 'total_views' === menu_slug ) {
			class_names = 'rounded-bl-lg ';
		}

		return (
			class_names +
			classNames(
				menu_slug === currentTab
					? 'bg-primary-25 border-orange-500 border-r'
					: 'bg-white border-r border-white hover:bg-primary-25 hover:border-primary-500 focus:border-primary-500',
				'focus:text-slate-900 hover:text-slate-900 group cursor-pointer p-5 block items-center text-base font-medium'
			)
		);
	};
	const handleDateSubmit = function ( date ) {
		let date_from = new Date( date.startDate );
		let date_to = new Date( date.endDate );

		setEmptyData();
		// setActiveFilter( '' );

		setDateRange( getDatesInRange( date_from, date_to ) );

		date_from = date_from.toISOString().slice( 0, 10 );
		date_to = date_to.toISOString().slice( 0, 10 );
		const formData = new window.FormData();
		formData.append( 'date_to', date_to );
		formData.append( 'date_from', date_from );
		formData.append( 'action', 'cartflows_get_all_flows_stats' );
		formData.append(
			'security',
			cartflows_admin.get_all_flows_stats_nonce
		);

		const getallflowanalytics = async () => {
			apiFetch( {
				url: cartflows_admin.ajax_url,
				method: 'POST',
				body: formData,
			} ).then( ( response ) => {
				dispatch( {
					type: 'SET_ANALYTICS_DATA',
					analyticsData: response.data,
				} );
				setAnalyticsData( response?.data.flow_stats );
			} );
		};

		getallflowanalytics();
	};

	return (
		<div className="bg-white px-6 py-7 overflow-hidden border border-solid border-gray-200 md:rounded-lg mb-5 wcf-analytics">
			<div className="wcf-metabox--heading sm:flex sm:items-center mb-7 gap-6">
				<div className="wcf-metabox--heading-wrapper sm:flex-auto">
					<h1 className="wcf-metabox--heading-text text-xl font-semibold text-gray-900">
						{ __( 'Overview', 'cartflows' ) }
					</h1>
				</div>
				<div className="flex items-center gap-2">
					<DateField
						classNames="wcf-custom-filter-input !w-72 !h-full date-picker-field !pl-4 !px-4 !py-3 !pr-7 text-sm font-normal text-gray-400 !rounded-md !border-gray-200 focus:!ring-primary-100 focus:!border-primary-500 focus:!shadow-none !outline-0 !outline-none"
						value={ {
							endDate: toDate,
							startDate: fromDate,
						} }
						onChangeCB={ handleDateSubmit }
					/>
					{ /* { filters.map( ( filter ) => (
						<button
							className={ classNames(
								filter.slug === activeFilter
									? 'wcf-button wcf-secondary-button !px-2.5 !py-1'
									: 'bg-white px-2.5 py-1 items-center text-slate-800 text-sm font-medium border border-gray-200 rounded-md focus:outline-none'
							) }
							type="button"
							id={ filter.slug }
							value={ filter.diff }
							onClick={ changeFilter }
							key={ filter.slug }
						>
							{ filter.name }
						</button>
					) ) } */ }
				</div>
				<div className="mt-4 ml-2 sm:mt-0 sm:flex-none">
					<Link
						key="importer"
						to={ {
							pathname: 'admin.php',
							search: `?page=cartflows&path=library`,
						} }
						className="wcf-button wcf-primary-button"
					>
						<PlusIcon
							className="w-5 h-5 text-white stroke-2"
							aria-hidden="true"
						/>
						{ __( 'Create New Funnel', 'cartflows' ) }
					</Link>
				</div>
			</div>

			{ ( ! analyticsData || loading ) && <GraphSkeleton /> }
			{ analyticsData && ! loading && (
				<div
					className={ `wcf-analytics--tabs-wrapper border border-gray-200 rounded-lg ${
						wooStatus ? 'lg:grid lg:grid-cols-12' : ''
					}  min-h-fit h-full` }
				>
					{ ! wooStatus ? (
						<div className="text-center px-8 py-12">
							<div className="flex justify-center mb-3">
								<ExclamationTriangleIcon className="h-10 w-10 text-primary-500" />
							</div>
							<h3 className="mt-2 text-base font-medium text-gray-900">
								{ __(
									'WooCommerce plugin is required.',
									'cartflows'
								) }
							</h3>
							<p className="mt-1 text-sm text-gray-500">
								{ __(
									'You need WooCommerce plugin installed and activated to view the overview',
									'cartflows'
								) }
							</p>
						</div>
					) : (
						<>
							<aside className="wcf-analytics--tabs col-span-3">
								<nav className="">
									{ tabMenus.map( ( menu ) => (
										<a
											id={ menu.slug }
											key={ menu.slug }
											className={ get_nav_classes(
												menu.slug
											) }
											onClick={ () =>
												SetCurrentTab( menu.slug )
											}
										>
											<div className="text-sm font-medium text-gray-600 flex items-center gap-1 mb-2">
												<span className="wcf-nav-title">
													{ menu.name }
												</span>
												{ menu.tooltip && (
													<Tooltip
														text={ menu.tooltip }
													/>
												) }
												{ [
													'total_views',
													'offer_revenue',
												].includes( menu.slug ) &&
													! wcfCartflowsTypePro() && (
														<span className="px-2 py-0.5 text-xs text-primary-600 border border-primary-600 rounded-full ml-2">
															{ __(
																'PRO',
																'cartflows'
															) }
														</span>
													) }
											</div>
											<div className="wcf-analytics-page-view-count-wrapper flex justify-between items-baseline">
												<div className="wcf-analytics-page-view-count">
													<span className="text-3xl font-semibold text-gray-800">
														{ 0 !== menu.value
															? ReactHtmlParser(
																	menu.value
															  )
															: menu.value }
													</span>
													{ /* &nbsp;
													<span className="text-sm font-regular text-gray-400">
														{ __( 'from', 'cartflows' ) }{ ' ' }
														{ menu.value }
													</span> */ }
												</div>
												{ /* <div className="wcf-analytics-page-view-rating">
													<span className="inline-flex items-center border border-green-200 rounded-full bg-green-50 py-0.5 pr-2.5 pl-1.5 text-xs font-regular text-green-600">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															fill="none"
															viewBox="0 0 24 24"
															strokeWidth={ 1.5 }
															stroke="currentColor"
															className="-ml-0.5 mr-1.5 h-2.5 w-2.5"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18"
															/>
														</svg>
														+2%
													</span>
												</div> */ }
											</div>
										</a>
									) ) }
								</nav>
							</aside>

							<div className="wcf-analytics--tab-content lg:col-span-9 border-l">
								{ renderGraphs() }
							</div>
						</>
					) }
				</div>
			) }
		</div>
	);
}

export default Graph;
