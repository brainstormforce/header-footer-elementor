import React, { useState, createRef, useEffect } from 'react';
import apiFetch from '@wordpress/api-fetch';
import { useStateValue } from '@Utils/StateProvider';
import { validateTitleField } from '@Utils/Helpers';
import classnames from 'classnames';
import { __ } from '@wordpress/i18n';
import { Tooltip, InputText, Spinner } from '@Fields';
import {
	PencilSquareIcon,
	ArrowPathIcon,
	CheckIcon,
} from '@heroicons/react/24/outline';
import { trackPromise } from 'react-promise-tracker';
import useConfirm from '@Alert/ConfirmDialog';

function FlowTitle( props ) {
	const { type } = props;

	const [ { flow_id, title, steps, global_checkout, status }, dispatch ] =
		useStateValue();

	const [ editTitle, setEditTitle ] = useState( false );
	const defaultSaveBtnStr = __( 'Save', 'cartflows' );
	const [ savingState, setSavingState ] = useState( {
		saveBtnString: defaultSaveBtnStr,
		saveBtnProcess: false,
	} );
	const { saveBtnString, saveBtnProcess } = savingState;

	const storeCheckoutStatus = Number.isInteger( global_checkout )
		? true
		: false;
	const toggleTitleType = Number.isInteger( global_checkout )
		? 'disable'
		: 'enable';
	const toggleTitleString = {
		disable: __( 'Disable Store Checkout', 'cartflows' ),
		enable: __( 'Enable Store Checkout', 'cartflows' ),
	};

	const [ funnelStatus, setfunnelStatus ] = useState( status );
	const [ storeEnabled, setStoreEnabled ] = useState( storeCheckoutStatus );
	const [ isProcessing, setIsProcessing ] = useState( false );
	const [ toggleState, setToggleState ] = useState( toggleTitleType );
	const newTitleInput = createRef();
	const confirm = useConfirm();

	let checkoutId = '';

	if ( 'storeCheckout' === type ) {
		for ( let i = 0; i < steps.length; i++ ) {
			if ( steps[ i ].type === 'checkout' ) {
				checkoutId = steps[ i ].id;
				break;
			}
		}
	}
	useEffect( () => {
		setfunnelStatus( status );
	}, [ status ] );

	const editTitleEvent = function ( e ) {
		e.preventDefault();

		setEditTitle( true );
	};

	/**
	 * Function to save the funnel title.
	 *
	 * @param {event} e
	 */
	const saveNewTitleEvent = function ( e ) {
		e.preventDefault();
		setSavingState( {
			saveBtnString: __( 'Saving…', 'cartflows' ),
			saveBtnProcess: 'processing',
		} );
		const new_flow_title = newTitleInput.current.value,
			formData = new window.FormData();

		formData.append( 'action', 'cartflows_update_flow_title' );
		formData.append( 'security', cartflows_admin.update_flow_title_nonce );
		formData.append( 'flow_id', flow_id );
		formData.append( 'new_flow_title', new_flow_title );

		apiFetch( {
			url: cartflows_admin.ajax_url,
			method: 'POST',
			body: formData,
		} ).then( () => {
			dispatch( {
				type: 'SET_FLOW_TITLE',
				title: new_flow_title,
			} );

			setSavingState( {
				saveBtnString: __( 'Saved', 'cartflows' ),
				saveBtnProcess: 'saved',
			} );

			setTimeout( () => {
				setSavingState( {
					saveBtnString: defaultSaveBtnStr,
					saveBtnProcess: false,
				} );
				setEditTitle( false );
			}, 3000 );
		} );
	};
	const cancelNewTitleEvent = function ( e ) {
		e.preventDefault();

		setEditTitle( false );
	};
	const UpdateStoreCheckoutStatus = () => {
		const formData = new window.FormData();
		setIsProcessing( true );
		formData.append( 'action', 'cartflows_update_store_checkout_status' );
		formData.append(
			'security',
			cartflows_admin.update_store_checkout_status_nonce
		);
		formData.append( 'checkout_id', checkoutId );
		formData.append( 'enable_store_checkout', ! storeEnabled );

		apiFetch( {
			url: cartflows_admin.ajax_url,
			method: 'POST',
			body: formData,
		} ).then( ( data ) => {
			if ( data.success ) {
				setStoreEnabled( ! storeEnabled );
				setIsProcessing( false );
				dispatch( {
					type: 'SET_GLOBAL_CHECKOUT',
					global_checkout: data.data.checkout_id,
				} );
				if ( toggleState === 'enable' ) {
					setToggleState( 'disable' );
				} else {
					setToggleState( 'enable' );
				}
			}
		} );
	};

	const getFlowName = function () {
		let flow_title = title;

		if ( '' === title ) {
			flow_title = __( '(no title)', 'cartflows' );
		}

		let editable_title = validateTitleField(
			flow_title,
			cartflows_admin.title_length.max,
			cartflows_admin.title_length.display_length
		);

		let edit_title_btns = (
			<a
				href="#"
				className="wcf-flows-header__title--edit"
				onClick={ editTitleEvent }
			>
				<Tooltip
					text={ __( 'Edit Title', 'cartflows' ) }
					icon={
						<PencilSquareIcon
							className="w-6 h-6 stroke-1 text-gray-400 hover:text-primary-500"
							aria-hidden="true"
						/>
					}
				/>
			</a>
		);

		if ( editTitle ) {
			editable_title = (
				<InputText
					attr={ { ref: newTitleInput } }
					id="new-flow-title"
					value={ title }
					autocomplete="off"
					class="new-flow-title input-field !px-4 !py-2.5 !text-sm font-normal !rounded-md text-gray-400 !w-full !border-gray-200 focus:ring focus:!ring-primary-100 focus:!border-primary-500 focus:!shadow-none !outline-0 !outline-none !m-0"
				/>
			);

			edit_title_btns = (
				<>
					<button
						className={ `wcf-button wcf-primary-button ${
							'processing' === saveBtnProcess
								? `wcf-disabled`
								: ``
						}` }
						type="button"
						onClick={ saveNewTitleEvent }
					>
						{ 'processing' === saveBtnProcess && <Spinner /> }

						{ 'saved' === saveBtnProcess && (
							<CheckIcon className="w-4 h-4 stroke-2 inline-block" />
						) }

						{ saveBtnString }
					</button>
					<button
						className="wcf-button wcf-secondary-button"
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
				<span
					className="wcf-flows-header__title--text text-gray-800 text-2xl font-semibold"
					title={ flow_title }
				>
					{ editable_title }
				</span>
				<span className="wcf-flows-header__title--buttons flex gap-3">
					{ edit_title_btns }
				</span>
			</>
		);
	};

	const UpdateFunnelStatus = async function ( e ) {
		e.preventDefault();

		let isconfirm = false,
			newStatus = '';

		switch ( funnelStatus ) {
			case 'draft':
			case 'private':
				isconfirm = await confirm( {
					title: 'Publish Funnel',
					description: __(
						'Do you really want to publish this funnel?',
						'cartflows'
					),
					actionBtnText: __( 'Yes', 'cartflows' ),
					cancelBtnText: __( 'No', 'cartflows' ),
				} );
				newStatus = 'publish';
				window.wcfAction = 'restoreFlow';
				break;
			case 'publish':
				isconfirm = await confirm( {
					title: __( 'Draft Funnel', 'cartflows' ),
					description: __(
						'Do you really want to draft this funnel?',
						'cartflows'
					),
					actionBtnText: __( 'Yes', 'cartflows' ),
					cancelBtnText: __( 'No', 'cartflows' ),
				} );
				newStatus = 'draft';
				window.wcfAction = 'draftFlow';
				break;
			default:
				break;
		}

		if ( ! isconfirm ) {
			return;
		}

		const formData = new window.FormData();
		formData.append( 'action', 'cartflows_update_status' );
		formData.append( 'security', cartflows_admin.update_status_nonce );
		formData.append( 'flow_id', flow_id );
		formData.append( 'new_status', newStatus );

		trackPromise(
			apiFetch( {
				url: cartflows_admin.ajax_url,
				method: 'POST',
				body: formData,
			} ).then( ( data ) => {
				if ( data.success ) {
					setfunnelStatus( newStatus );
				}
			} )
		);
	};

	// Show the loader if the title is loading.
	if ( false === title ) {
		return (
			<div className="wcf-edit-flow__title-wrap w-2/3 animate-pulse">
				<div className="wcf-flows-header--title wcf-step__title--editable flex gap-2.5 items-center">
					<span className="h-3 w-full bg-gray-200 rounded-md px-10 block"></span>
				</div>
			</div>
		);
	}

	return (
		<>
			<div className="wcf-edit-flow__title-wrap w-3/4">
				<div className="wcf-flows-header--title wcf-step__title--editable flex gap-2.5 items-center">
					{ getFlowName() }

					{ 'flows' === type && ! editTitle && (
						<div
							className="wcf-store-checkout_status--container flex gap-4"
							title={ __(
								'Publish or Draft the Funnel',
								'cartflows'
							) }
						>
							<span className="divider w-px bg-gray-200"></span>
							<span className="wcf_store_checkout_status_label text-gray-600">
								{ __( 'Publish', 'cartflows' ) }
							</span>

							<div className="wcf_store_checkout__status flex justify-between gap-3">
								<button
									type="button"
									role="switch"
									className={ classnames(
										props.class,
										'bg-gray-200 group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2',
										'publish' === funnelStatus
											? 'bg-primary-600'
											: 'bg-gray-200'
									) }
									data-wcf-funnel-status-switch={
										funnelStatus
									}
									onClick={ UpdateFunnelStatus }
								>
									{ ' ' }
									<span
										aria-hidden="true"
										className="pointer-events-none absolute h-full w-full rounded-md bg-white"
									></span>
									<span
										aria-hidden="true"
										className={ classnames(
											'publish' === funnelStatus
												? 'bg-primary-600'
												: 'bg-gray-200',
											'bg-gray-200 pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out'
										) }
									></span>
									<span
										aria-hidden="true"
										className={ classnames(
											'publish' === funnelStatus
												? 'translate-x-5'
												: 'translate-x-0',
											'translate-x-0 pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
										) }
									></span>
								</button>
							</div>
						</div>
					) }
					{ 'storeCheckout' === type && ! editTitle && (
						<div className="wcf-store-checkout_status--container flex gap-4">
							<span className="divider w-px bg-gray-200"></span>
							<span className="wcf_store_checkout_status_label text-gray-600">
								{ __( 'Enable Store Checkout', 'cartflows' ) }
							</span>

							<div className="wcf_store_checkout__status flex justify-between gap-3">
								<button
									type="button"
									className={ classnames(
										props.class,
										'bg-gray-200 group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2',
										storeEnabled
											? 'bg-primary-600'
											: 'bg-gray-200'
									) }
									title={ toggleTitleString[ toggleState ] }
									data-wcf-order-bump-switch={ storeEnabled }
									data-checkout-id={ checkoutId }
									onClick={ UpdateStoreCheckoutStatus }
								>
									{ ' ' }
									<span
										aria-hidden="true"
										className="pointer-events-none absolute h-full w-full rounded-md bg-white"
									></span>
									<span
										aria-hidden="true"
										className={ classnames(
											storeEnabled
												? 'bg-primary-600'
												: 'bg-gray-200',
											'bg-gray-200 pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out'
										) }
									></span>
									<span
										aria-hidden="true"
										className={ classnames(
											storeEnabled
												? 'translate-x-5'
												: 'translate-x-0',
											'translate-x-0 pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
										) }
									></span>
								</button>
								{ isProcessing && (
									<ArrowPathIcon className="w-18 h-18 stroke-2 text-primary-500 animate-spin" />
								) }
							</div>
						</div>
					) }
				</div>
			</div>
		</>
	);
}

export default FlowTitle;
