import React, { useState, useEffect, createRef } from 'react';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { useStateValue } from '@Utils/StateProvider';
import { validateTitleField } from '@Utils/Helpers';
import OrderBumpPagesRoute from '@Admin/step-editor/order-bump/OrderBumpPagesRoute';
import useConfirm from '@Alert/ConfirmDialog';
import { InputText, Spinner } from '@Fields';
import classnames from 'classnames';
import {
	Cog8ToothIcon,
	TrashIcon,
	DocumentDuplicateIcon,
	ExclamationCircleIcon,
	ArrowPathIcon,
	PencilIcon,
} from '@heroicons/react/24/outline';

function OrderBumpRepeater( props ) {
	const { flow_id, step_id, data, callback } = props;

	const [ {}, dispatch ] = useStateValue();
	const [ status, setStatus ] = useState( data.status );

	const [ statusProcess, setStatusProcess ] = useState( false );
	const [ actionProcess, setActionProcess ] = useState( '' );

	const [ editTitle, setEditTitle ] = useState( false );
	const [ savingState, setSavingState ] = useState( false );
	const newTitleInput = createRef();

	const [ obid, setObid ] = useState( '' );

	const confirm = useConfirm();

	useEffect( () => {
		setStatus( status );
	}, [ status, obid ] );

	let ob_title = data.title;

	const editTitleEvent = function ( e ) {
		e.preventDefault();
		setEditTitle( true );
	};

	const cancelNewTitleEvent = function ( e ) {
		e.preventDefault();

		setEditTitle( false );
	};

	const saveNewTitleEvent = function ( e ) {
		e.preventDefault();
		setSavingState( true );
		const ob_id = e.target.getAttribute( 'data-ob_id' );

		const new_ob_title = newTitleInput.current.value,
			formData = new window.FormData();

		formData.append( 'action', 'cartflows_pro_update_order_bump_title' );
		formData.append(
			'security',
			cartflows_admin.update_order_bump_title_nonce
		);
		formData.append( 'step_id', step_id );
		formData.append( 'new_title', new_ob_title );
		formData.append( 'ob_id', ob_id );

		apiFetch( {
			url: cartflows_admin.ajax_url,
			method: 'POST',
			body: formData,
		} ).then( () => {
			dispatch( {
				type: 'SET_OB_TITLE',
				title: new_ob_title,
				name: 'wcf-order-bumps',
				ob_id,
			} );
			setSavingState( false );
			setEditTitle( false );
		} );
	};

	const getOBName = function () {
		if ( '' === ob_title ) {
			ob_title = __( '(no title)', 'cartflows' );
		}

		let editable_title = validateTitleField(
			ob_title,
			cartflows_admin.title_length.max,
			cartflows_admin.title_length.display_length
		);
		let edit_title_btns = (
			<a
				href="#"
				className="wcf-ob-header__title--edit flex p-1 cursor-pointer text-gray-500 hover:text-primary-500 hover:bg-gray-100 focus:bg-gray-100 relative wcf-inline-tooltip"
				data-tooltip={ __( 'Edit Step Name', 'cartflows' ) }
				onClick={ editTitleEvent }
			>
				<PencilIcon className="w-4 h-4 stroke-1" />
			</a>
		);

		if ( editTitle ) {
			editable_title = (
				<InputText
					attr={ { ref: newTitleInput } }
					id="new-step-title"
					value={ ob_title }
					autocomplete="off"
					class="new-step-title text-sm font-medium text-gray-800 !border-gray-200 !outline-none !shadow-none !px-3 !py-1"
				/>
			);

			edit_title_btns = (
				<>
					<button
						className={ `wcf-button--small wcf-button wcf-primary-button ${
							savingState ? 'wcf-disabled' : ''
						}` }
						href="#"
						onClick={ saveNewTitleEvent }
						data-ob_id={ data.id }
					>
						{ savingState && <Spinner /> }

						{ __( 'Save', 'cartflows' ) }
					</button>
					<button
						className="wcf-button--small wcf-button wcf-secondary-button"
						href="#"
						onClick={ cancelNewTitleEvent }
					>
						{ __( 'Cancel', 'cartflows' ) }
					</button>
				</>
			);
		}

		return (
			<>
				<span className="wcf-ob-header__title--text">
					{ editable_title }
				</span>
				<span className="wcf-ob-header__title--buttons flex gap-2">
					{ edit_title_btns }
				</span>
			</>
		);
	};

	const obStatus = function ( e ) {
		setStatusProcess( true );
		const ob_id = e.target.getAttribute( 'data-ob_id' );
		const formData = new window.FormData();

		formData.append( 'action', 'cartflows_pro_update_order_bump_status' );
		formData.append(
			'security',
			cartflows_admin.update_order_bump_status_nonce
		);
		formData.append( 'ob_id', ob_id );
		formData.append( 'post_id', flow_id );
		formData.append( 'step_id', step_id );
		formData.append( 'ob_status', ! status );

		apiFetch( {
			url: cartflows_admin.ajax_url,
			method: 'POST',
			body: formData,
		} ).then( () => {
			dispatch( {
				type: 'SET_OB_STATUS',
				name: 'wcf-order-bumps',
				newStatus: ! status,
				ob_id,
			} );
			setStatus( ! status );
			setStatusProcess( false );
		} );
	};

	const removeOrderBump = async function ( event ) {
		event.preventDefault();

		const isconfirm = await confirm( {
			title: __( 'Trash Order Bump', 'cartflows' ),
			description: __(
				'Do you really want to trash this order bump permanently?',
				'cartflows'
			),
			actionBtnText: __( 'Yes', 'cartflows' ),
			cancelBtnText: __( 'No', 'cartflows' ),
		} );

		if ( ! isconfirm ) {
			return;
		}

		const ob_id = event.target
			.closest( '.wcf-remove-order-bump-button' )
			.getAttribute( 'id' );
		setActionProcess( 'delete' );

		const formData = new window.FormData();

		formData.append( 'action', 'cartflows_pro_delete_order_bump' );
		formData.append( 'security', cartflows_admin.delete_order_bump_nonce );
		formData.append( 'ob_id', ob_id );
		formData.append( 'post_id', flow_id );
		formData.append( 'step_id', step_id );

		apiFetch( {
			url: cartflows_admin.ajax_url,
			method: 'POST',
			body: formData,
		} ).then( ( response ) => {
			if ( response.success ) {
				dispatch( {
					type: 'REMOVE_ORDER_BUMP',
					name: 'wcf-order-bumps',
					ob_id,
				} );
				setActionProcess( '' );
			}
		} );
	};

	const cloneOrderBump = ( event ) => {
		event.preventDefault();

		const formData = new window.FormData();

		const ob_id = event.target
			.closest( '.wcf-clone-bump-button' )
			.getAttribute( 'id' );
		setActionProcess( 'clone' );

		formData.append( 'action', 'cartflows_pro_clone_order_bump' );
		formData.append( 'security', cartflows_admin.clone_order_bump_nonce );
		formData.append( 'ob_id', ob_id );
		formData.append( 'step_id', step_id );

		apiFetch( {
			url: cartflows_admin.ajax_url,
			method: 'POST',
			body: formData,
		} ).then( ( response ) => {
			if ( response.success ) {
				dispatch( {
					type: 'UPDATE_ORDER_BUMP',
					name: 'wcf-order-bumps',
					order_bumps: response.data.order_bumps,
				} );
				setActionProcess( '' );
			}
		} );
	};

	const showOBSettings = function ( e ) {
		event.preventDefault();
		const ob_id = e.target.getAttribute( 'data-ob_id' );

		if ( ! obid && ob_id ) {
			setObid( ob_id );
		} else {
			setObid( '' );
		}
	};

	return (
		<>
			<div
				className="wcf-order-bump border-b border-gray-200 last:border-0"
				onDragEnd={ callback }
			>
				<div className="wcf-order-bump__content-wrapper flex items-center relative p-6 text-sm gap-2">
					<div className="wcf-order-bump__data wcf-column--product w-3/4">
						{
							<div className="wcf-order-bump__data-title flex items-center gap-2">
								<span className="text-sm font-medium text-gray-800 flex gap-2 justify-center items-center">
									{ getOBName() }
								</span>

								{ '' === data.product && (
									<span className="wcf-badge wcf-badge--warning text-xs border-0">
										<ExclamationCircleIcon
											className={ `w-4 h-4 stroke-2` }
										/>
										{ __( 'No product', 'cartflows' ) }
									</span>
								) }
							</div>
						}
					</div>
					<div className="wcf_order_bump__status w-[12%] flex gap-2">
						<button
							type="button"
							className={ classnames(
								'bg-gray-200 relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2',
								status ? 'bg-primary-600' : 'bg-gray-200'
							) }
							role="switch"
							onClick={ obStatus }
							data-wcf-order-bump-switch={ status }
							data-ob_id={ data.id }
						>
							<span
								aria-hidden="true"
								className={ classnames(
									status ? 'translate-x-5' : 'translate-x-0',
									'translate-x-0 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
								) }
							></span>
						</button>

						{ statusProcess && (
							<ArrowPathIcon className="w-18 h-18 stroke-2 text-primary-500 animate-spin" />
						) }
					</div>

					<div className="wcf-order-bump__action wcf-column--actions flex justify-between w-[12%]">
						<span
							className={ `wcf-clone-bump-button cursor-pointer text-gray-500 hover:text-primary-500 p-1 hover:bg-gray-100 focus:bg-gray-100 rounded relative wcf-inline-tooltip` }
							id={ data.id }
							onClick={ cloneOrderBump }
							data-tooltip={ __(
								'Duplicate Order Bump',
								'cartflows'
							) }
						>
							{ 'clone' === actionProcess ? (
								<ArrowPathIcon
									className={ `w-18 h-18 stroke-1 animate-spin` }
								/>
							) : (
								<DocumentDuplicateIcon
									className={ `w-18 h-18 stroke-1` }
								/>
							) }
						</span>
						<a
							className={ `wcf-setting-bump-button cursor-pointer text-gray-500 p-1 hover:bg-primary-50 hover:text-primary-500 focus:bg-primary-50 rounded relative wcf-inline-tooltip ${
								obid === data.id
									? 'bg-primary-50 text-primary-500'
									: ''
							}` }
							data-ob_id={ data.id }
							data-tooltip={ __(
								'Edit Order Bump',
								'cartflows'
							) }
							onClick={ showOBSettings }
						>
							<Cog8ToothIcon
								className={ `w-18 h-18 stroke-1` }
								data-ob_id={ data.id }
								onClick={ showOBSettings }
							/>
						</a>
						<span
							className={
								'wcf-remove-order-bump-button cursor-pointer text-gray-500 hover:text-primary-500 p-1 hover:bg-gray-100 focus:bg-gray-100 rounded relative wcf-inline-tooltip after:-left-16'
							}
							id={ data.id }
							onClick={ removeOrderBump }
							data-tooltip={ __(
								'Delete Order Bump',
								'cartflows'
							) }
						>
							{ 'delete' === actionProcess ? (
								<ArrowPathIcon
									className={ `w-18 h-18 stroke-2 animate-spin` }
								/>
							) : (
								<TrashIcon className={ `w-18 h-18 stroke-1` } />
							) }
						</span>
					</div>
				</div>
			</div>
			{ /* Current Order bmp settings in tab */ }
			{ obid && <OrderBumpPagesRoute ob_id={ obid } /> }
		</>
	);
}

export default OrderBumpRepeater;
