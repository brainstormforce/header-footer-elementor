import React, { Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import apiFetch from '@wordpress/api-fetch';
import { __, sprintf } from '@wordpress/i18n';
import { useSettingsStateValue } from '@SettingsApp/utils/StateProvider';
import { Menu, Transition } from '@headlessui/react';
import ReactHtmlParser from 'react-html-parser';

import { CheckboxField, Tooltip } from '@Fields';
import { validateTitleField } from '@Utils/Helpers';
import useConfirm from '@Alert/ConfirmDialog';

import classnames from 'classnames';
import moment from 'moment';
import { trackPromise } from 'react-promise-tracker';

import {
	EyeIcon,
	PencilIcon,
	EllipsisVerticalIcon,
	DocumentDuplicateIcon,
	ArrowDownTrayIcon,
	TrashIcon,
	ArrowUturnRightIcon,
	CheckCircleIcon,
	MinusIcon,
	ExclamationCircleIcon,
} from '@heroicons/react/24/outline';

import './FlowRow.scss';

function FlowRow( { flow, selected_flows, openCallback } ) {
	const id = flow.ID;
	const title = flow.post_title;
	const actions = flow.actions;
	const status =
			flow.post_status === 'Publish'
				? __( ' Published ', 'cartflows' )
				: flow.post_status,
		post_modified = flow.post_modified_gmt,
		is_test_mode = flow.flow_test_mode,
		revenue =
			'undefined' !== typeof flow.revenue
				? flow.revenue
				: cartflows_admin.woo_currency + '0';

	const [ { active_flows_count }, dispatch ] = useSettingsStateValue();

	const query = new URLSearchParams( useLocation().search );
	const current_page = query.get( 'post_status' );

	const confirm = useConfirm();

	const cloneFlow = async ( e ) => {
		e.preventDefault();

		if ( ! wcfCartflowsPro() && active_flows_count >= 3 ) {
			return null;
		}

		const isconfirm = await confirm( {
			title: __( 'Duplicate Funnel', 'cartflows' ),
			description: __(
				'Do you really want to duplicate this funnel?',
				'cartflows'
			),
			actionBtnText: __( 'Yes', 'cartflows' ),
			cancelBtnText: __( 'No', 'cartflows' ),
		} );

		if ( ! isconfirm ) {
			return;
		}
		const formData = new window.FormData();

		formData.append( 'action', 'cartflows_clone_flow' );
		formData.append( 'security', cartflows_admin.clone_flow_nonce );
		formData.append( 'id', id );
		window.wcfAction = 'cloneFlow';
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
			} )
		);
	};

	const deleteFlow = async ( e ) => {
		console.log( '***** Delete Flow *****' );

		e.preventDefault();

		const isconfirm = await confirm( {
			title: __( 'Trash Funnel', 'cartflows' ),
			description: __(
				'Do you really want to trash this funnel?',
				'cartflows'
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
		formData.append( 'flow_id', id );

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
			} )
		);
	};

	const exportFlow = ( e ) => {
		console.log( '***** Export Flow *****' );

		e.preventDefault();

		const formData = new window.FormData();

		formData.append( 'action', 'cartflows_export_flow' );
		formData.append( 'security', cartflows_admin.export_flow_nonce );
		formData.append( 'flow_id', id );

		window.wcfAction = 'exportFlow';
		trackPromise(
			apiFetch( {
				url: cartflows_admin.ajax_url,
				method: 'POST',
				body: formData,
			} ).then( ( response ) => {
				if ( response.success ) {
					const fileName =
						response.data.flow_name || `flow-${ id }.json`;
					const flowData = JSON.stringify( response.data.flows );
					const fileType = 'application/json';

					const tempFile = new Blob( [ flowData ], {
						type: fileType,
					} );
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
			} )
		);
	};

	const trashFlow = async ( e ) => {
		e.preventDefault();

		const isconfirm = await confirm( {
			title: __( 'Trash Funnel', 'cartflows' ),
			description: __(
				'Do you really want to trash this Funnel?',
				'cartflows'
			),
			actionBtnText: __( 'Yes', 'cartflows' ),
			cancelBtnText: __( 'No', 'cartflows' ),
		} );

		if ( ! isconfirm ) {
			return;
		}

		const formData = new window.FormData();

		formData.append( 'action', 'cartflows_trash_flow' );
		formData.append( 'security', cartflows_admin.trash_flow_nonce );
		formData.append( 'flow_id', id );

		window.wcfAction = 'deleteFlow';
		trackPromise(
			apiFetch( {
				url: cartflows_admin.ajax_url,
				method: 'POST',
				body: formData,
			} ).then( ( data ) => {
				if ( data.success ) {
					// alert( data.data.message );
					dispatch( {
						type: 'SET_FLOWS',
						flows: null,
					} );
				}
			} )
		);
	};

	const restoreFlow = async ( e ) => {
		console.log( '***** Restore Flow *****' );

		e.preventDefault();

		const isconfirm = await confirm( {
			title: __( 'Restore Funnel', 'cartflows' ),
			description: __(
				'Do you really want to restore this funnel?',
				'cartflows'
			),
			actionBtnText: __( 'Yes', 'cartflows' ),
			cancelBtnText: __( 'No', 'cartflows' ),
		} );

		if ( ! isconfirm ) {
			return;
		}

		const formData = new window.FormData();

		formData.append( 'action', 'cartflows_restore_flow' );
		formData.append( 'security', cartflows_admin.restore_flow_nonce );
		formData.append( 'flow_id', id );
		window.wcfAction = 'restoreFlow';
		trackPromise(
			apiFetch( {
				url: cartflows_admin.ajax_url,
				method: 'POST',
				body: formData,
			} ).then( ( data ) => {
				if ( data.success ) {
					dispatch( {
						type: 'SET_FLOWS',
						flows: null,
					} );
				}
			} )
		);
	};

	const flows_title = function () {
		let flow_title = validateTitleField(
			title,
			cartflows_admin.title_length.max,
			cartflows_admin.title_length.display_length
		);
		if ( '' === title ) {
			flow_title = __( '(no title)', 'cartflows' );
		}

		if ( 'Draft' === status ) {
			flow_title = (
				<span className="wcf-draft-flow-title">
					<span className="flex">
						{ flow_title }
						<MinusIcon className="h-5 w-5" />
						<span className="wcf-draft-flow-status">
							{ __( 'Draft', 'cartflows' ) }
						</span>
					</span>
				</span>
			);
		}

		return flow_title;
	};

	const publishFlow = function () {
		const formData = new window.FormData();

		formData.append( 'new_status', 'publish' );

		formData.append( 'action', 'cartflows_update_flow_post_status' );
		formData.append(
			'security',
			cartflows_admin.update_flow_post_status_nonce
		);
		formData.append( 'flow_ids', [ id ] );

		apiFetch( {
			url: cartflows_admin.ajax_url,
			method: 'POST',
			body: formData,
		} ).then( () => {
			dispatch( {
				type: 'SET_FLOWS',
				flows: null,
			} );
		} );
	};

	let is_present = false;

	if ( 0 !== selected_flows ) {
		is_present = selected_flows.includes( id.toString() );
		// console.log( is_present );
	}

	return (
		<tr>
			<td className="whitespace-nowrap py-7 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
				<CheckboxField
					class="wcf-flow_row__checkbox"
					name="wcf-flow[]"
					id={ id }
					value={ is_present ? 'yes' : 'no' }
					onClick={ ( e ) => {
						openCallback( e );
					} }
				/>
			</td>
			<td className="whitespace-nowrap px-3 py-7">
				<a
					className="wcf-flow-row__link text-sm text-gray-800 hover:text-primary-500"
					href={ actions?.edit.link }
					title={ title }
				>
					<span className="block text-sm font-semibold">
						{ flows_title() }
					</span>
					<span
						className="block text-sm font-normal text-gray-400"
						title={ sprintf(
							/* translators: %s date */
							__( 'Last Modified: %s', 'cartflows' ),
							post_modified
						) }
					>
						{ __( 'Updated ', 'cartflows' ) }
						{ moment
							.utc( post_modified )
							.local()
							.startOf( 'seconds' )
							.fromNow() }
					</span>
				</a>
			</td>
			<td className="whitespace-nowrap text-center px-3 py-7">
				<span
					className={ classnames(
						'wcf-badge',
						is_test_mode
							? 'wcf-badge--warning'
							: 'wcf-badge--success'
					) }
				>
					{ is_test_mode
						? __( 'Sandbox', 'cartflows' )
						: __( 'Live', 'cartflows' ) }
				</span>
			</td>
			<td className="whitespace-nowrap text-base text-center px-3 py-7">
				{ 'active' === cartflows_admin.woocommerce_status && revenue ? (
					ReactHtmlParser( revenue )
				) : (
					<Tooltip
						text={ __(
							'WooCommerce Required to display the revenue.',
							'cartflows'
						) }
						icon={
							<ExclamationCircleIcon
								className="w-18 h-18 stroke-2 text-red-400 hover:text-red-600"
								aria-hidden="true"
							/>
						}
					/>
				) }
			</td>
			<td className="whitespace-nowrap px-3 py-7 pr-4 sm:pr-6 text-sm text-gray-400">
				<div className="wcf-flow-row__action-btns flex relative">
					<div className="wcf-flow-row__basic-action-btns flex">
						{ 'trash' !== current_page && (
							<>
								<a
									href={ actions?.view.link }
									{ ...actions?.view.attr }
									className="wcf-flow-view wcf-flow-row__action-btn px-3 py-2 cursor-pointer group"
								>
									<Tooltip
										text={ __( 'View Flow', 'cartflows' ) }
										icon={
											<EyeIcon
												className="w-18 h-18 stroke-1 group-hover:text-primary-500"
												aria-hidden="true"
											/>
										}
									/>
								</a>
								<a
									href={ actions?.edit.link }
									className="wcf-flow-edit wcf-flow-row__action-btn px-3 py-2 cursor-pointer group"
								>
									<Tooltip
										text={ __(
											'Edit Funnel',
											'cartflows'
										) }
										icon={
											<PencilIcon
												className="w-18 h-18 stroke-1 group-hover:text-primary-500"
												aria-hidden="true"
											/>
										}
									/>
								</a>
							</>
						) }

						{ 'trash' === current_page && (
							<>
								<a
									className="wcf-flow-view wcf-flow-row__action-btn px-3 py-2 cursor-pointer group"
									title={ __( 'Restore', 'cartflows' ) }
									onClick={ restoreFlow }
								>
									<Tooltip
										text={ __(
											'Restore Flow',
											'cartflows'
										) }
										icon={
											<ArrowUturnRightIcon
												className="w-18 h-18 stroke-1 group-hover:text-primary-500"
												aria-hidden="true"
											/>
										}
									/>
								</a>
								<a
									className="wcf-flow-view wcf-flow-row__action-btn px-3 py-2 cursor-pointer group"
									title={ __( 'Delete', 'cartflows' ) }
									onClick={ deleteFlow }
								>
									<Tooltip
										text={ __(
											'Delete Flow',
											'cartflows'
										) }
										icon={
											<TrashIcon
												className="w-18 h-18 stroke-1 group-hover:text-primary-500"
												aria-hidden="true"
											/>
										}
									/>
								</a>
							</>
						) }
					</div>
					{ 'trash' !== current_page && (
						<Menu
							as="div"
							id={ `flow_more_options_${ id }` }
							className="wcf-flow-row__actions-menu relative inline-block text-left"
						>
							<div>
								<Menu.Button className="inline-flex w-full px-3 py-2 text-sm font-semibold cursor-pointer group">
									<Tooltip
										text={ __(
											'More Options',
											'cartflows'
										) }
										icon={
											<EllipsisVerticalIcon
												className="-mr-1 h-5 w-5 group-hover:text-primary-500"
												aria-hidden="true"
											/>
										}
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
										<div className="py-1">
											{ ( current_page === 'draft' ||
												'Draft' === status ) && (
												<Menu.Item>
													<a
														href="#"
														// style=""
														className="wcf-flow-publish px-4 py-2 text-gray-600 text-sm flex gap-1.5 hover:bg-primary-25 hover:text-primary-500"
														title={ __(
															'Publish',
															'cartflows'
														) }
														onClick={ publishFlow }
													>
														<CheckCircleIcon className="h-5 w-5" />
														<span className="wcf-flow-row__btn-text">
															{ __(
																'Publish',
																'cartflows'
															) }
														</span>
													</a>
												</Menu.Item>
											) }

											<Menu.Item>
												<a
													href="#"
													// style="opacity: 0.65; cursor: not-allowed;"
													className="wcf-flow-clone px-4 py-2 text-gray-600 text-sm flex gap-1.5 hover:bg-primary-25 hover:text-primary-500"
													title={
														wcfCartflowsPro() ||
														active_flows_count < 3
															? __(
																	'Duplicate Funnel',
																	'cartflows'
															  )
															: __(
																	'Upgrade to Pro for this feature.',
																	'cartflows'
															  )
													}
													data-id={ id }
													onClick={ cloneFlow }
													style={
														wcfCartflowsPro() ||
														active_flows_count < 3
															? {}
															: {
																	cursor: 'not-allowed',
																	opacity:
																		' 0.65',
															  }
													}
												>
													<DocumentDuplicateIcon className="h-5 w-5" />
													<span className="wcf-flow-row__btn-text">
														{ wcfCartflowsPro() ||
														active_flows_count < 3
															? __(
																	'Duplicate',
																	'cartflows'
															  )
															: __(
																	'Duplicate (Pro)',
																	'cartflows'
															  ) }
													</span>
												</a>
											</Menu.Item>

											<Menu.Item>
												<a
													href="#"
													className="wcf-flow-export px-4 py-2 text-gray-600 text-sm flex gap-1.5 hover:bg-primary-25 hover:text-primary-500"
													title={ __(
														'Export Flow',
														'cartflows'
													) }
													data-id={ id }
													onClick={ exportFlow }
												>
													<ArrowDownTrayIcon className="h-5 w-5" />
													<span className="wcf-flow-row__btn-text">
														{ __(
															'Export',
															'cartflows'
														) }
													</span>
												</a>
											</Menu.Item>

											{ current_page !== 'trash' ? (
												<Menu.Item>
													<a
														href="#"
														// style=""
														className="wcf-flow-trash px-4 py-2 text-gray-600 text-sm flex gap-1.5 hover:bg-primary-25 hover:text-primary-500"
														title={ __(
															'Trash Flow',
															'cartflows'
														) }
														onClick={ trashFlow }
													>
														<TrashIcon className="h-5 w-5" />
														<span className="wcf-flow-row__btn-text">
															{ __(
																'Trash',
																'cartflows'
															) }
														</span>
													</a>
												</Menu.Item>
											) : (
												<Menu.Item>
													<a
														href="#"
														className="wcf-flow-restore px-4 py-2 text-gray-600 text-sm flex gap-1.5 hover:bg-primary-25 hover:text-primary-500"
														title={ __(
															'Restore Flow',
															'cartflows'
														) }
														onClick={ restoreFlow }
													>
														<ArrowUturnRightIcon className="h-5 w-5" />
														<span className="wcf-flow-row__btn-text">
															{ __(
																'Restore',
																'cartflows'
															) }
														</span>
													</a>
												</Menu.Item>
											) }

											{ current_page === 'trash' && (
												<Menu.Item>
													<a
														href="#"
														// style=""
														className="wcf-flow-delete px-4 py-2 text-gray-600 text-sm flex gap-1.5 hover:bg-primary-25 hover:text-primary-500"
														title={ __(
															'Delete Flow',
															'cartflows'
														) }
														onClick={ deleteFlow }
													>
														<TrashIcon className="h-5 w-5" />
														<span className="wcf-flow-row__btn-text">
															{ __(
																'Delete',
																'cartflows'
															) }
														</span>
													</a>
												</Menu.Item>
											) }
										</div>
									) }
								</Menu.Items>
							</Transition>
						</Menu>
					) }
				</div>
			</td>
		</tr>
	);
}

export default FlowRow;
