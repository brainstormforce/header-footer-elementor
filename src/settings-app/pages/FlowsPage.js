import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import apiFetch from '@wordpress/api-fetch';
import { useSettingsStateValue } from '@SettingsApp/utils/StateProvider';
import { __, sprintf } from '@wordpress/i18n';
import FlowPagination from '@SettingsApp/components/flows-page/FlowPagination';
import FlowsHeader from '@SettingsApp/components/flows-page/FlowsHeader';
import FlowsSubHeader from '@SettingsApp/components/flows-page/FlowsSubHeader';
import FlowBulkActions from '@SettingsApp/components/flows-page/FlowBulkActions';
import FlowRow from '@SettingsApp/components/flows-page/FlowRow';
import FlowRowSkeleton from '@SettingsApp/components/flows-page/FlowRowSkeleton';
import {
	PlusIcon,
	MagnifyingGlassIcon,
	InformationCircleIcon,
	ClipboardDocumentIcon,
	CloudArrowDownIcon,
	TrashIcon,
	ArrowUturnRightIcon,
} from '@heroicons/react/24/outline';

function FlowsPage() {
	const [
		{
			flows_data,
			active_flows_count,
			draft_flows_count,
			trash_flows_count,
			flows_pagination,
		},
		dispatch,
	] = useSettingsStateValue();

	const query = new URLSearchParams( useLocation().search );
	let current_page = query.get( 'paged' );
	let flow_count = 0;
	const post_status = query.get( 'post_status' );
	const search = query.get( 's' ),
		filter = query.get( 'filter' ),
		mode = query.get( 'mode' );

	const [ status, setStatus ] = useState( false );
	const [ SelectedFlows, setSelectedFlows ] = useState( 0 );
	const [ SelectedFlowsCount, setSelectedFlowsCount ] = useState( false );

	let loading = true;

	if ( flows_data || status ) {
		loading = false;
	}

	if ( ! current_page ) {
		current_page = 1;
	}

	const active_flows_bulkactions = [
		{
			value: 'draft',
			label: __( 'Draft', 'cartflows' ),
			icon: (
				<ClipboardDocumentIcon
					className="w-18 h-18 stroke-2"
					data-action="draft"
				/>
			),
		},
		{
			value: 'trash',
			label: __( 'Trash', 'cartflows' ),
			icon: (
				<TrashIcon className="w-18 h-18 stroke-2" data-action="trash" />
			),
		},
		{
			value: 'export',
			label: __( 'Export', 'cartflows' ),
			icon: (
				<CloudArrowDownIcon
					className="w-18 h-18 stroke-2"
					data-action="export"
				/>
			),
		},
		{
			value: 'delete_permanently',
			label: __( 'Delete', 'cartflows' ),
			icon: (
				<TrashIcon
					className="w-18 h-18 stroke-2"
					data-action="delete_permanently"
				/>
			),
		},
	];

	const trash_flows_bulkactions = [
		{
			value: 'restore',
			label: __( 'Restore', 'cartflows' ),
			icon: (
				<ArrowUturnRightIcon
					className="w-18 h-18 stroke-2"
					data-action="restore"
				/>
			),
		},
		{
			value: 'delete_permanently',
			label: __( 'Delete', 'cartflows' ),
			icon: (
				<TrashIcon
					className="w-18 h-18 stroke-2"
					data-action="delete_permanently"
				/>
			),
		},
	];

	const draft_flows_bulkactions = [
		{
			value: 'export',
			label: __( 'Export', 'cartflows' ),
			icon: (
				<CloudArrowDownIcon
					className="w-18 h-18 stroke-2"
					data-action="export"
				/>
			),
		},
		{
			value: 'trash',
			label: __( 'Move to Trash', 'cartflows' ),
			icon: (
				<TrashIcon className="w-18 h-18 stroke-2" data-action="trash" />
			),
		},
		{
			value: 'delete_permanently',
			label: __( 'Delete', 'cartflows' ),
			icon: (
				<TrashIcon
					className="w-18 h-18 stroke-2"
					data-action="delete_permanently"
				/>
			),
		},
	];

	let bulk_actions = [];
	if ( 'Publish' === post_status || null === post_status ) {
		bulk_actions = active_flows_bulkactions;
	} else if ( 'trash' === post_status ) {
		bulk_actions = trash_flows_bulkactions;
	} else if ( 'draft' === post_status ) {
		bulk_actions = draft_flows_bulkactions;
	}

	useEffect( () => {
		let isActive = true;

		if ( null === flows_data ) {
			const ajaxData = new window.FormData();
			ajaxData.append( 'paged', current_page );

			if ( post_status ) {
				ajaxData.append( 'post_status', post_status );
			}

			if ( search ) {
				ajaxData.append( 's', search );
			}

			if ( mode ) {
				ajaxData.append( 'mode', mode );
			}

			if ( 'date' === filter ) {
				ajaxData.append( 'start_date', query.get( 'from' ) );
				ajaxData.append( 'end_date', query.get( 'to' ) );
			}

			setStatus( false );

			const getFlows = async () => {
				apiFetch( {
					path: '/cartflows/v1/admin/flows/',
					method: 'POST',
					body: ajaxData,
				} ).then( ( data ) => {
					if ( isActive ) {
						// dispatch the item into the data layer
						dispatch( {
							type: 'SET_FLOWS_DATA',
							flows: data.items,
							pagination: data.pagination,
							found_posts: data.found_posts,
							active_flows_count: data.active_flows_count,
							trash_flows_count: data.trash_flows_count,
							draft_flows_count: data.draft_flows_count,
						} );
					}
					if ( data.status === false ) {
						setStatus( true );
					} else {
						setStatus( false );
					}
				} );
			};

			getFlows();
		}

		return () => {
			isActive = false;
		};
	}, [ flows_data ] );

	const selectAll = function ( event ) {
		const is_checked = event.target.checked;
		const all_flows = document.getElementsByName( 'wcf-flow[]' );
		const selected_flows = [];

		for ( const item of all_flows ) {
			if ( 'checkbox' === item.type ) {
				if ( is_checked ) {
					item.checked = true;
					selected_flows.push( item.id );
				} else {
					item.checked = false;

					const index = selected_flows.indexOf( item.id );
					if ( index > -1 ) {
						selected_flows.splice( index, 1 );
					}
				}
			}
		}
		setSelectedFlows( selected_flows );
		setSelectedFlowsCount( selected_flows.length );
	};

	const openCallback = function ( event ) {
		const is_checked = event.target.checked;
		// const selected_flows = SelectedFlows;
		if ( is_checked ) {
			setSelectedFlowsCount(
				SelectedFlowsCount > 0 ? SelectedFlowsCount + 1 : 1
			);

			// 	// selected_flows.push( event.target.id );
		} else {
			setSelectedFlowsCount(
				SelectedFlowsCount > 0 ? SelectedFlowsCount - 1 : 0
			);
			// const index = selected_flows.indexOf( event.target.id );
			// if ( index > -1 ) {
			// 	selected_flows.splice( index, 1 );
			// }
			if ( 0 === SelectedFlowsCount - 1 ) {
				document.getElementById(
					'wcf-select-all__flows'
				).checked = false;
			}
		}

		// console.log( SelectedFlowsCount );

		// if( 1 === SelectedFlowsCount ){
		// 	document.getElementById( 'wcf-select-all__flows' ).checked = false;
		// }

		// setSelectedFlows( selected_flows );
	};
	const closeBulkActions = function () {
		document.getElementById( 'wcf-select-all__flows' ).checked = false;

		setSelectedFlows( [] );
		setSelectedFlowsCount( 0 );
	};

	// Display no flows block When there are no published/drafted/trashed flows.
	if (
		! loading &&
		0 === active_flows_count &&
		0 === draft_flows_count &&
		0 === trash_flows_count
	) {
		return (
			<main className="wcf-no-flows-found-screen">
				<div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-5 lg:gap-10 xl:gap-10 rounded-md bg-white overflow-hidden shadow-sm px-10 py-10">
					<div className="grid grid-cols-1 gap-4 lg:col-span-2 h-full">
						<div className="wcf-video-container">
							{ /* Added rel=0 query paramter at the end to disable YouTube recommendations */ }
							<iframe
								className="wcf-video rounded-md"
								src={ `https://www.youtube.com/embed/SlE0moPKjMY?showinfo=0&autoplay=0&mute=0&rel=0` }
								allow="autoplay"
								title="YouTube video player"
								frameBorder="0"
								allowFullScreen
							></iframe>
						</div>
					</div>
					<div className="grid grid-cols-1 gap-4 lg:col-span-3 h-full">
						<section aria-labelledby="section-1-title h-full">
							<div className="flex flex-col justify-center h-full">
								<div className="">
									<div className="flex">
										<h2 className="text-gray-800 text-2xl pb-3 font-semibold text-left">
											{ __(
												'Create your first funnel',
												'cartflows'
											) }
										</h2>
									</div>

									<p className="text-base text-gray-600 pb-7">
										{ __(
											`Build a sales funnel with everything you need to generate leads and grow sales.`,
											'cartflows'
										) }
										<div className="flex mt-3">
											<div>
												<li>
													{ __(
														'One Click Upsells',
														'cartflows'
													) }
												</li>
												<li>
													{ __(
														'Order Bumps',
														'cartflows'
													) }
												</li>
												<li>
													{ __(
														'A/B Split Testing',
														'cartflows'
													) }
												</li>
												<li>
													{ __(
														'Conversion Templates',
														'cartflows'
													) }
												</li>
											</div>
											<div className="ml-10">
												<li>
													{ __(
														'Checkout Editor',
														'cartflows'
													) }
												</li>
												<li>
													{ __(
														'Dynamic Offers',
														'cartflows'
													) }
												</li>
												<li>
													{ __(
														'Cart Abandonment',
														'cartflows'
													) }
												</li>
												<li>
													{ __(
														'Insights',
														'cartflows'
													) }
												</li>
											</div>
										</div>
									</p>

									<span className="relative z-0 inline-flex flex-col sm:flex-row justify-start w-full">
										<Link
											key="importer"
											to={ {
												pathname: 'admin.php',
												search: `?page=cartflows&path=library`,
											} }
											className="inline-flex gap-1.5 wcf-button wcf-primary-button"
										>
											<PlusIcon className="w-18 h-18 stroke-2" />
											<span>
												{ __(
													'Create Funnel',
													'cartflows'
												) }
											</span>
										</Link>
									</span>
								</div>
							</div>
						</section>
					</div>
				</div>
			</main>
		);
	}

	return (
		<div className="wcf-flows-page-wrapper">
			<FlowsHeader
				flows_count={ active_flows_count + draft_flows_count }
			/>
			<FlowsSubHeader />

			{ loading && <FlowRowSkeleton /> }

			{ flows_data && 0 === flows_data.length && (
				<div className="wcf-no-flows-found text-center bg-white p-20">
					<div className="wcf-no-flows--content-block mx-auto max-w-2xl">
						{ null !== search ? (
							<MagnifyingGlassIcon className="mx-auto w-7 h-7 stroke-2 text-primary-500" />
						) : (
							<InformationCircleIcon className="mx-auto w-7 h-7 stroke-2 text-primary-500" />
						) }

						<h3 className="wcf-no-flows--heading mt-4 text-xl font-medium text-gray-800">
							{ null !== search
								? sprintf(
										/* translators: %d Search term */
										__(
											'No matching results found for the search term "%s".',
											'cartflows'
										),
										search
								  )
								: __(
										'No flows found for the selected filter.',
										'cartflows'
								  ) }
						</h3>
						<p className="wcf-no-flows--message mt-1 text-sm font-normal text-gray-600">
							{ __(
								'Please try using different keywords, date range, or filters to refine your results.',
								'cartflows'
							) }
						</p>
						<div className="wcf-no-flows--divider relative mt-6 mx-auto max-w-xs">
							<div
								className="absolute inset-0 flex items-center"
								aria-hidden="true"
							>
								<div className="w-full border-t border-gray-300" />
							</div>
							<div className="relative flex justify-center">
								<span className="bg-white px-2 text-sm text-gray-600">
									OR
								</span>
							</div>
						</div>
						<div className="mt-6">
							<Link
								key="importer"
								to={ {
									pathname: 'admin.php',
									search: `?page=cartflows&path=library`,
								} }
								className="wcf-button wcf-primary-button"
							>
								<PlusIcon className="w-18 h-18 stroke-2 text-white" />
								<span>{ __( 'Create New', 'cartflows' ) }</span>
							</Link>
						</div>
					</div>
				</div>
			) }

			{ flows_data && 0 < flows_data.length && (
				<>
					{ SelectedFlowsCount > 0 && (
						<FlowBulkActions
							position="before_flows"
							bulk_actions={ bulk_actions }
							selected_flows={ SelectedFlowsCount }
							selectedFlowsCall={ setSelectedFlowsCount }
							closeCallback={ closeBulkActions }
						/>
					) }
					<div
						className={ `wcf-flows-table rounded-b-xl bg-white ${
							'trash' === post_status
								? 'wcf-flows-table-trash'
								: ''
						}` }
					>
						{ ! loading && (
							<table className="min-w-full border-b border-gray-200">
								<thead className="bg-gray-50">
									<tr>
										<th
											scope="col"
											className="w-16 py-3.5 pl-4 pr-3 text-left sm:pl-6"
										>
											<input
												type="checkbox"
												id="wcf-select-all__flows"
												className="wcf-select-all__flows !h-5 !w-5 !rounded !border-gray-300 !text-primary-600 focus:!ring-primary-600 !shadow-none before:!content-none !outline-none"
												title="Select all"
												onClick={ selectAll }
											/>
										</th>
										<th
											scope="col"
											className="px-3 py-3.5 text-left text-base font-medium text-gray-800"
										>
											{ __( 'Name', 'cartflows' ) }
										</th>
										<th
											scope="col"
											className="px-3 py-3.5 text-center text-base font-medium text-gray-800"
										>
											{ __( 'Mode', 'cartflows' ) }
										</th>
										<th
											scope="col"
											className="px-3 py-3.5 text-center text-base font-medium text-gray-800"
										>
											{ __( 'Sales', 'cartflows' ) }
										</th>
										<th
											scope="col"
											className="w-36 px-3 py-3.5 pr-4 sm:pr-6 text-left text-base font-medium text-gray-800"
										>
											{ ' ' }
										</th>
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-200 bg-white">
									{ ! loading &&
										flows_data &&
										flows_data.map( ( flow ) => {
											flow_count++;
											return (
												<FlowRow
													key={ flow.id }
													flow={ flow }
													loading={ loading }
													selected_flows={
														SelectedFlows
													}
													openCallback={
														openCallback
													}
												/>
											);
										} ) }
								</tbody>
							</table>
						) }
					</div>

					<div className="flex justify-between bg-white">
						<div className="p-5 align-center block text-sm font-normal text-gray-400 self-center">
							{ sprintf(
								/* translators: %d flow count */
								__( ' %d items', 'cartflows' ),
								flow_count
							) }
						</div>
						<FlowPagination
							currentPage={ parseInt( current_page ) }
							maxPages={ parseInt( flows_pagination?.max_pages ) }
						/>
					</div>
				</>
			) }
		</div>
	);
}

export default FlowsPage;
