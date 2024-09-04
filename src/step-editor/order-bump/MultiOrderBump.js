import React, { useState } from 'react';
import { useStateValue } from '@Utils/StateProvider';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import OrderBumpRepeater from './OrderBumpRepeater';
import OrderBumpSkeleton from '@StepEditor/components/steps-page/OrderBumpSkeleton';
import OrderBumpCTA from './skeletons/OrderBumpCTA';
import { ReactSortable } from 'react-sortablejs';
import { TextField, Spinner } from '@Fields';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useSettingsValue } from '@Utils/SettingsProvider';

function MultiOrderBump() {
	const [ { options, step_id, flow_id, page_settings }, dispatch ] =
		useStateValue();
	const [ { license_status } ] = useSettingsValue();
	const [ title, setTitle ] = useState();
	const [ errorMsg, setErrorMsg ] = useState( '' );
	const defaultBtnText = __( 'Add', 'cartflows' );

	const [ addButton, setAddButton ] = useState( {
		button_text: defaultBtnText,
		is_processing: false,
	} );

	const { button_text, is_processing } = addButton;

	if ( ! wcfCartflowsTypePlusPro() || 'Activated' !== license_status ) {
		return <OrderBumpCTA />;
	}

	if ( null === options || 'undefined' === page_settings ) {
		return <OrderBumpSkeleton />;
	}

	const allSetting = page_settings;
	const OrderBumps = options[ 'wcf-order-bumps' ];

	const length = Object.keys( OrderBumps ).length;

	const obDesign = page_settings.settings[ 'multiple-order-bump-design' ];

	const addNewOrderBump = function ( e ) {
		e.preventDefault();

		if ( 'undefined' !== typeof title ) {
			setErrorMsg( '' );

			setAddButton( {
				button_text: __( 'Adding…', 'cartflows' ),
				is_processing: true,
			} );

			const order_bump_data = {
				title,
				id: Math.random().toString( 36 ).substring( 2, 5 ),
			};

			const formData = new window.FormData();

			formData.append( 'action', 'cartflows_pro_add_order_bump' );
			formData.append( 'security', cartflows_admin.add_order_bump_nonce );
			formData.append( 'ob_id', order_bump_data.id );
			formData.append( 'post_id', flow_id );
			formData.append( 'step_id', step_id );
			formData.append( 'title', title );

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
					setTitle( '' );

					setAddButton( {
						button_text: defaultBtnText,
						is_processing: false,
					} );
				}
				e.target.blur();
			} );
		} else {
			setErrorMsg(
				__( 'Please enter the order bump title', 'cartflows' )
			);
			e.target.blur();
		}
	};

	const updateOBList = () => {
		const obs = options[ 'wcf-order-bumps' ];
		const new_obs = [];
		Object.keys( obs ).map( ( i ) => {
			new_obs.push( obs[ i ].id );
			return '';
		} );

		const ajaxData = new window.FormData();
		ajaxData.append( 'action', 'cartflows_pro_reorder_order_bumps' );
		ajaxData.append(
			'security',
			cartflows_admin.reorder_order_bumps_nonce
		);
		ajaxData.append( 'step_id', step_id );
		ajaxData.append( 'sorted_obs', new_obs );

		apiFetch( {
			url: cartflows_admin.ajax_url,
			method: 'POST',
			body: ajaxData,
		} ).then( () => {} );
	};

	return (
		<>
			<h2 className="text-base font-semibold text-gray-800 py-4">
				{ __( 'Order Bumps', 'cartflows' ) }
			</h2>
			<div className="wcf-multiple-order-bumps--wrapper py-2">
				{ length > 0 && (
					<div className="wcf-multiple-order-bumps -mx-4 mt-4 ring-1 ring-gray-200 sm:mx-0 sm:rounded-lg">
						<div className="wcf-multiple-order-bumps__header flex items-center border-b border-gray-200 px-6 py-4 text-left text-sm font-medium text-gray-800">
							<span className="wcf-column wcf-column--title w-3/4">
								{ __( 'Title', 'cartflows' ) }
							</span>
							<span className="wcf-column wcf-column--status w-[13%]">
								{ __( 'Status', 'cartflows' ) }
							</span>
							<span className="wcf-column wcf-column--actions w-[12%]">
								<span className="sr-only">
									{ __( 'Actions', 'cartflows' ) }
								</span>
							</span>
						</div>
						<div className="wcf-multiple-order-bumps__content">
							{ OrderBumps && (
								<>
									<ReactSortable
										list={ OrderBumps }
										setList={ ( newState ) =>
											dispatch( {
												type: 'SET_OB',
												obs: newState,
												fieldName: 'wcf-order-bumps',
												step_id,
												flow_id,
											} )
										}
										swapThreshold={ 0.8 }
										direction={ 'vertical' }
										animation={ 150 }
										handle={ '.wcf-order-bump' }
										filter={
											'.wcf-order-bump__action, .wcf_order_bump__status, .wcf-order-bump__data-title a'
										}
										preventOnFilter={ false }
									>
										{ OrderBumps.map( ( ob_data ) => {
											return (
												<OrderBumpRepeater
													key={ ob_data.id }
													flow_id={ flow_id }
													step_id={ step_id }
													data={ ob_data }
													title={ ob_data.title }
													settings={
														allSetting.settings[
															'multiple-order-bump'
														]
													}
													design_settings={ obDesign }
													callback={ updateOBList }
												/>
											);
										} ) }
									</ReactSortable>
								</>
							) }
						</div>
					</div>
				) }
				{ length === 0 && (
					<div className="border border-gray-200 bg-gray-25 rounded-md px-5 py-7 text-sm text-gray-600 text-center">
						{ __( 'Create an order bump.', 'cartflows' ) }
					</div>
				) }
				<div className="flex wcf-multiple-order-bumps__add-new mt-5 gap-3">
					<TextField
						name=""
						value={ title }
						sectionClass="block text-left w-full"
						wrapperClass="block"
						class="!w-full !h-auto input-field !px-3 !py-2.5 !text-sm font-normal !rounded-md text-gray-400 !border-gray-200 focus:ring focus:!ring-primary-100 focus:!border-primary-500 focus:!shadow-none !outline-0 !outline-none !m-0 !placeholder-gray-400"
						placeholder={ __(
							'Enter order bump name',
							'cartflows'
						) }
						onChangeCB={ setTitle }
						desc={ errorMsg }
						descClass="absolute text-sm font-normal text-primary-500 mt-2"
					/>
					<a
						className={ `wcf-add-new-order-bump wcf-button ${
							is_processing
								? 'wcf-disabled'
								: 'wcf-secondary-button'
						}` }
						onClick={ addNewOrderBump }
					>
						{ is_processing ? (
							<Spinner />
						) : (
							<PlusIcon className={ `w-18 h-18 stroke-2` } />
						) }

						<span>{ button_text }</span>
					</a>
				</div>
			</div>
		</>
	);
}

export default MultiOrderBump;
