import React, { Fragment } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useSettingsStateValue } from '@SettingsApp/utils/StateProvider';
import { __ } from '@wordpress/i18n';
import { TextField, DateField } from '@Fields';
import { Menu, Transition } from '@headlessui/react';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { RadioButton } from '@Admin/fields';

function FlowsSubHeader() {
	const [
		{ active_flows_count, trash_flows_count, draft_flows_count },
		dispatch,
	] = useSettingsStateValue( 0 );
	const history = useHistory();

	const query = new URLSearchParams( useLocation().search );
	let current_page = query.get( 'post_status' );
	const current_mode = query.get( 'mode' );

	if ( query.has( 'mode' ) ) {
		query.delete( 'mode' );
	}

	if ( ! current_page ) {
		current_page = 'active_flow';
	}

	const handleSearchFunnel = function () {
		const search = document.getElementById(
			'wcf-funnel-search-input'
		).value;

		if ( search.length !== 0 && search.length < 3 ) {
			return;
		}

		if ( search.length === 0 ) {
			history.push( `admin.php?page=cartflows&path=flows` );
		} else {
			history.push( `admin.php?page=cartflows&path=flows&s=${ search }` );
		}

		dispatch( {
			type: 'SET_FLOWS',
			flows: null,
		} );
	};

	const handleDateSubmit = function ( date ) {
		if ( null === date.startDate ) {
			history.push( `admin.php?page=cartflows&path=flows` );
		} else {
			history.push(
				`admin.php?page=cartflows&path=flows&filter=date&from=${ date.startDate }&to=${ date.endDate }`
			);
		}

		dispatch( {
			type: 'SET_FLOWS',
			flows: null,
		} );
	};

	const handleShowFlowsByStatus = function () {
		dispatch( {
			type: 'SET_FLOWS',
			flows: null,
		} );
	};

	return (
		<div className="wcf-flows-sub-header bg-white p-5 rounded-t-xl">
			<div className="wcf-flows-sub-header__content-right flex justify-between">
				<div className="wcf-flows-sub-header__search w-1/5">
					<form className="wcf-search__form relative">
						<TextField
							label=""
							placeholder={ __( 'Search Funnels', 'cartflows' ) }
							tooltip=""
							class="input-field !leading-none !pl-10 !px-4 !py-3 text-sm font-normal !rounded-md text-gray-400 !border-gray-200 focus:ring focus:!ring-primary-100 focus:!border-primary-500 focus:!shadow-none !outline-0 !outline-none"
							id="wcf-funnel-search-input"
							inputvalue=""
							handleChange=""
							desc=""
							onChangeCB={ handleSearchFunnel }
						/>
						<button className="absolute p-2 top-1/2 -translate-y-1/2 left-1 bg-transparent text-gray-400 cursor-pointer hover:text-primary-500 m-0">
							<MagnifyingGlassIcon className="w-18 h-18 stroke-2" />
						</button>
					</form>
				</div>
				<span className="wcf-flows-sub-header__date_filter flex gap-4 justify-end items-center">
					<DateField
						classNames="wcf-custom-filter-input !w-64 !h-full date-picker-field !pl-4 !px-4 !py-3 !pr-7 text-sm font-normal text-gray-400 !rounded-md !border-gray-200 focus:!ring-primary-100 focus:!border-primary-500 focus:!shadow-none !outline-0 !outline-none"
						value={ { endDate: null, startDate: null } }
						onChangeCB={ handleDateSubmit }
						placeholder={ __(
							'Filter Funnels by Date',
							'cartflows'
						) }
					/>
					<span className="divider w-px bg-gray-200 h-full"></span>
					<Menu
						as="div"
						className="wcf-flow-row__actions-menu relative inline-block text-left"
					>
						<div>
							<Menu.Button className="inline-flex w-full px-3 py-2 text-sm font-semibold text-gray-400 bg-gray-50 rounded-md">
								<FunnelIcon
									className="h-5 w-5"
									aria-hidden="true"
								/>
							</Menu.Button>
						</div>

						<Transition
							as={ Fragment }
							enter="transition ease-out duration-100"
							enterFrom="transform opacity-0 scale-95"
							enterTo="transform opacity-100 scale-100"
							leave="transition ease-in duration-75"
							leaveFrom="transform opacity-100 scale-100"
							leaveTo="transform opacity-0 scale-95"
						>
							<Menu.Items className="wcf-actions-menu__dropdown_menu absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
								{ ( {} ) => (
									<div className="py-1 ">
										<div className="py-2 px-4 font-medium bg-gray-50 text-xs">
											{ __( 'Status', 'cartflows' ) }
										</div>

										<Menu.Item>
											<Link
												key="published_flows"
												to={ {
													pathname: 'admin.php',
													search: `?page=cartflows&path=flows`,
												} }
												onClick={
													handleShowFlowsByStatus
												}
												className="wcf-flow-export px-4 py-2 text-gray-700 text-sm flex gap-1.5 hover:bg-primary-25 hover:text-primary-500"
											>
												<RadioButton
													checked={
														'active_flow' ===
														current_page
															? 'checked'
															: ''
													}
												/>
												<span className="wcf-flow-row__btn-text">
													{ __(
														'Publish ',
														'cartflows'
													) }
													({ active_flows_count })
												</span>
											</Link>
										</Menu.Item>
										<Menu.Item>
											<Link
												key="draft_flows"
												to={ {
													pathname: 'admin.php',
													search: `?page=cartflows&path=flows&post_status=draft`,
												} }
												onClick={
													handleShowFlowsByStatus
												}
												className="wcf-flow-export px-4 py-2 text-gray-700 text-sm flex gap-1.5 hover:bg-primary-25 hover:text-primary-500"
											>
												<RadioButton
													checked={
														'draft' === current_page
															? 'checked'
															: ''
													}
												/>
												<span className="wcf-flow-row__btn-text">
													{ __(
														'Draft ',
														'cartflows'
													) }
													({ draft_flows_count })
												</span>
											</Link>
										</Menu.Item>
										<Menu.Item>
											<Link
												key="trash_flows"
												to={ {
													pathname: 'admin.php',
													search: `?page=cartflows&path=flows&post_status=trash`,
												} }
												onClick={
													handleShowFlowsByStatus
												}
												className="wcf-flow-export px-4 py-2 text-gray-700 text-sm flex gap-1.5 hover:bg-primary-25 hover:text-primary-500"
											>
												<RadioButton
													checked={
														'trash' === current_page
															? 'checked'
															: ''
													}
												/>
												<span className="wcf-flow-row__btn-text">
													{ __(
														'Trash ',
														'cartflows'
													) }
													({ trash_flows_count })
												</span>
											</Link>
										</Menu.Item>

										<div className="py-2 px-4 font-medium bg-gray-50 text-xs">
											{ __( 'Mode', 'cartflows' ) }
										</div>

										<Menu.Item>
											<Link
												key="Live"
												to={ {
													pathname: 'admin.php',
													search: `${ query }`,
												} }
												onClick={
													handleShowFlowsByStatus
												}
												className="wcf-flow-export px-4 py-2 text-gray-700 text-sm flex gap-1.5 hover:bg-primary-25 hover:text-primary-500"
											>
												<RadioButton
													checked={
														null === current_mode
															? 'checked'
															: ''
													}
												/>
												<span className="wcf-flow-row__btn-text">
													{ __( 'All', 'cartflows' ) }
												</span>
											</Link>
										</Menu.Item>

										<Menu.Item>
											<Link
												key="Live"
												to={ {
													pathname: 'admin.php',
													search: `${ query }&mode=live`,
												} }
												onClick={
													handleShowFlowsByStatus
												}
												className="wcf-flow-export px-4 py-2 text-gray-700 text-sm flex gap-1.5 hover:bg-primary-25 hover:text-primary-500"
											>
												<RadioButton
													checked={
														'live' === current_mode
															? 'checked'
															: ''
													}
												/>
												<span className="wcf-flow-row__btn-text">
													{ __(
														'Live',
														'cartflows'
													) }
												</span>
											</Link>
										</Menu.Item>

										<Menu.Item>
											<Link
												key="sandbox"
												to={ {
													pathname: 'admin.php',
													search: `${ query }&mode=sandbox`,
												} }
												onClick={
													handleShowFlowsByStatus
												}
												className="wcf-flow-export px-4 py-2 text-gray-700 text-sm flex gap-1.5 hover:bg-primary-25 hover:text-primary-500"
											>
												<RadioButton
													checked={
														'sandbox' ===
														current_mode
															? 'checked'
															: ''
													}
												/>
												<span className="wcf-flow-row__btn-text">
													{ __(
														'SandBox',
														'cartflows'
													) }
												</span>
											</Link>
										</Menu.Item>

										<Menu.Item>
											<Link
												key="Reset"
												to={ {
													pathname: 'admin.php',
													search: `?page=cartflows&path=flows`,
												} }
												onClick={
													handleShowFlowsByStatus
												}
												className="wcf-flow-export px-4 py-2 text-gray-700 text-sm flex gap-1.5 hover:bg-primary-25 hover:text-primary-500 border-t-2 border-t-gray-100"
											>
												<span className="wcf-flow-row__btn-text text-primary-500 ">
													{ __(
														'Reset Filters',
														'cartflows'
													) }
												</span>
											</Link>
										</Menu.Item>
									</div>
								) }
							</Menu.Items>
						</Transition>
					</Menu>
				</span>
			</div>
		</div>
	);
}

export default FlowsSubHeader;
