import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import apiFetch from '@wordpress/api-fetch';
import { Transition } from '@headlessui/react';
import { __, sprintf } from '@wordpress/i18n';

import { useSettingsStateValue } from '@SettingsApp/utils/StateProvider';
import useConfirm from '@Alert/ConfirmDialog';
function FlowBulkActions( props ) {
	const { bulk_actions, selected_flows } = props;
	const [ {}, dispatch ] = useSettingsStateValue();
	const [ isProcessing, setIsProcessing ] = useState( false );

	const query = new URLSearchParams( useLocation().search );
	let current_page = query.get( 'paged' );

	if ( ! current_page ) {
		current_page = 1;
	}
	const confirm = useConfirm();
	const applyAction = async function ( event ) {
		event.preventDefault();
		const bulkButtonAction = event.target.getAttribute( 'data-action' ),
			target_elements = document.getElementsByName( 'wcf-flow[]' );

		let action = '',
			nonce = '';

		const flow_ids = [];

		// Select all flow ID's checkboxes.
		for ( const item of target_elements ) {
			if ( 'checkbox' === item.type && true === item.checked ) {
				flow_ids.push( item.getAttribute( 'id' ) );
			}
		}

		// If no action is selected then do nothing.
		if ( 0 === flow_ids.length || bulkButtonAction === '-1' ) {
			return;
		}

		// Ask for the confirmation weather to proceed with the selected action or not.
		const isConfirm = await confirm( {
			title: sprintf(
				// translators: %s: action name.
				__( '%s Flow', 'cartflows' ),
				bulkButtonAction
			),

			description: sprintf(
				// translators: %s: action status name.
				__( 'Do you want to %s this flow? Are you sure?', 'cartflows' ),
				bulkButtonAction.replace( '_', ' ' )
			),
			actionBtnText: __( 'Yes', 'cartflows' ),
			cancelBtnText: __( 'No', 'cartflows' ),
		} );

		// If not confirmed OR yes then return and don nothing.
		if ( ! isConfirm ) {
			return;
		}

		const formData = new window.FormData();

		setIsProcessing( true );

		switch ( bulkButtonAction ) {
			case 'trash':
				action = 'cartflows_trash_flows_in_bulk';
				nonce = cartflows_admin.trash_flows_in_bulk_nonce;
				formData.append( 'new_status', 'trash' );
				break;
			case 'restore':
				action = 'cartflows_update_flow_post_status';
				nonce = cartflows_admin.update_flow_post_status_nonce;
				formData.append( 'new_status', 'publish' );
				break;
			case 'delete_permanently':
				action = 'cartflows_delete_flows_permanently';
				nonce = cartflows_admin.delete_flows_permanently_nonce;
				break;
			case 'draft':
				action = 'cartflows_update_flow_post_status';
				nonce = cartflows_admin.update_flow_post_status_nonce;
				formData.append( 'new_status', 'draft' );
				break;
			case 'publish':
				action = 'cartflows_update_flow_post_status';
				nonce = cartflows_admin.update_flow_post_status_nonce;
				formData.append( 'new_status', 'publish' );
				break;
			case 'export':
				action = 'cartflows_export_flows_in_bulk';
				nonce = cartflows_admin.export_flows_in_bulk_nonce;
				break;
			default:
				break;
		}

		formData.append( 'action', action );
		formData.append( 'security', nonce );
		formData.append( 'flow_ids', [ flow_ids ] );

		apiFetch( {
			url: cartflows_admin.ajax_url,
			method: 'POST',
			body: formData,
		} ).then( ( response ) => {
			if ( 'export' === bulkButtonAction && response.success ) {
				const newDate = new Date();
				const fileName =
					'cartflows-flows-export-' +
					newDate.getDate() +
					'-' +
					( newDate.getMonth() + 1 ) +
					'-' +
					newDate.getFullYear() +
					'.json';
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

			setIsProcessing( false );

			props.selectedFlowsCall( 0 );
			dispatch( {
				type: 'SET_FLOWS',
				flows: null,
			} );
		} );
	};

	return (
		<Transition
			as={ 'div' }
			enter="transition ease-in duration-1000"
			enterFrom="transform opacity-0 scale-100"
			enterTo="transform opacity-100 scale-100"
			leave="transition ease-out duration-1000"
			leaveFrom="transform opacity-100 scale-100"
			leaveTo="transform opacity-0 scale-100"
			show={ true }
		>
			<div className="wcf-flows--bulk-action bg-primary-25 p-6 flex justify-between border-b border-primary-200">
				<div className="wcf-flows-action-buttons inline-flex gap-5 cursor-pointer">
					{ bulk_actions.map( ( menu ) => {
						return (
							<a
								key={ menu.label }
								className={ `wcf-flows--bulk-action-btn wcf-flows--bulk-action__${ menu.value } flex gap-1.5 text-primary-500 hover:text-primary-600` }
								onClick={ applyAction }
								data-action={ menu.value }
							>
								{ menu.icon }
								<span data-action={ menu.value }>
									{ menu.label }
								</span>
							</a>
						);
					} ) }
					<span className="divider w-px bg-gray-200"></span>
					<a
						// href="#!"
						className={
							'wcf-flows--bulk-action-btn wcf-flows--bulk-action__cancel flex text-primary-500 hover:text-primary-600'
						}
						onClick={ props.closeCallback }
					>
						{ __( 'Cancel', 'cartflows' ) }
					</a>
				</div>

				<div className="wcf-total-flows-found flex justify-between gap-4">
					{ selected_flows } { __( 'items selected', 'cartflows' ) }
					{ isProcessing && (
						<div className="wcf-action flex gap-6">
							<div className="flex">
								<div className="relative">
									<div
										className="w-18 h-18 rounded-full absolute
										border-2 border-solid border-primary-200"
									></div>

									<div
										className="w-18 h-18 rounded-full animate-spin absolute
										border-2 border-solid border-primary-500 border-t-transparent"
									></div>
								</div>
							</div>
							{ __( 'Applying changes…', 'cartflows' ) }
						</div>
					) }
				</div>
			</div>
		</Transition>
	);
}

export default FlowBulkActions;
