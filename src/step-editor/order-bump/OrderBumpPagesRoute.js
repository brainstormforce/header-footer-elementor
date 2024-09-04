import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useStateValue } from '@Utils/StateProvider';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import OrderBumpProductSkeleton from './skeletons/OrderBumpProductSkeleton';
import OrderBumpTwoColumnSkeleton from './skeletons/OrderBumpTwoColumnSkeleton';
import OrderBumpSettingSkeleton from './skeletons/OrderBumpSettingSkeleton';
import OrderBumpRulesSkeleton from './skeletons/OrderBumpRulesSkeleton';
import OrderBumpDesign from '@StepEditor/order-bump/OrderBumpDesign';
import OrderBumpProduct from '@StepEditor/order-bump/OrderBumpProduct';
import OrderBumpContent from '@StepEditor/order-bump/OrderBumpContent';
import OrderBumpRules from '@StepEditor/order-bump/OrderBumpRules';
import ObInputEvents from '@Admin/step-editor/order-bump/ObInputEvents';
import classnames from 'classnames';
import OrderBumpPreview from './OrderBumpPreview.js';
import {
	Cog8ToothIcon,
	SquaresPlusIcon,
	PaintBrushIcon,
	Bars3BottomLeftIcon,
} from '@heroicons/react/24/outline';
import useConfirm from '@Alert/ConfirmDialog';

function OrderBumpPagesRoute( props ) {
	const [ { step_id, options, current_ob }, dispatch ] = useStateValue();
	const [ currentTab, setCurrentTab ] = useState( 'product' );
	const query = new URLSearchParams( useLocation().search );
	const ob_id = props.ob_id;

	const tab = query.get( 'obtab' );
	const confirm = useConfirm();
	ObInputEvents();

	const tabs = [
		{
			name: __( 'Product', 'cartflows' ),
			slug: 'product',
			icon: <SquaresPlusIcon className={ `w-18 h-18 stroke-2` } />,
		},
		{
			name: __( 'Content', 'cartflows' ),
			slug: 'content',
			icon: <Bars3BottomLeftIcon className={ `w-18 h-18 stroke-2` } />,
		},
		{
			name: __( 'Styles', 'cartflows' ),
			slug: 'styles',
			icon: <PaintBrushIcon className={ `w-18 h-18 stroke-2` } />,
		},
		{
			name: __( 'Conditions', 'cartflows' ),
			slug: 'conditions',
			icon: <Cog8ToothIcon className={ `w-18 h-18 stroke-2` } />,
		},
	];

	const getCurrentOBData = function () {
		const formData = new window.FormData();

		formData.append( 'action', 'cartflows_pro_get_current_order_bump' );
		formData.append(
			'security',
			cartflows_admin.get_current_order_bump_nonce
		);
		formData.append( 'ob_id', ob_id );
		formData.append( 'step_id', step_id );
		apiFetch( {
			url: cartflows_admin.ajax_url,
			method: 'POST',
			body: formData,
		} ).then( ( response ) => {
			if ( response.data.success ) {
				dispatch( {
					type: 'SET_CURRENT_OB',
					current_ob: response.data.current_ob,
					ob_id,
				} );
			}
		} );
	};

	const getStepData = function () {
		apiFetch( {
			path: `/cartflows/v1/admin/step-data/${ step_id }`,
		} ).then( ( data ) => {
			if ( data.billing_fields ) {
				const billing_fields = Object.entries(
					data.billing_fields.fields
				).map( ( [ key, value ] ) => ( {
					...value,
					key,
				} ) );

				data.billing_fields = billing_fields;
			}
			if ( data.shipping_fields ) {
				const shipping_fields = Object.entries(
					data.shipping_fields.fields
				).map( ( [ key, value ] ) => ( {
					...value,
					key,
				} ) );

				data.shipping_fields = shipping_fields;
			}

			// Add the data into the data layer
			dispatch( {
				type: 'SET_STEP_DATA',
				data,
			} );
		} );
	};

	useEffect( () => {
		const getData = async () => {
			getCurrentOBData();
			if ( null === options || 'undefined' === options ) {
				getStepData();
			}
		};

		getData();

		return () => {};
	}, [] );

	if ( null === current_ob || 'undefined' === current_ob ) {
		let skeleton = '';

		switch ( tab ) {
			case 'design':
				skeleton = <OrderBumpTwoColumnSkeleton />;
				break;
			case 'product':
				skeleton = <OrderBumpProductSkeleton />;
				break;
			case 'settings':
				skeleton = <OrderBumpSettingSkeleton />;
				break;
			case 'content':
				skeleton = <OrderBumpTwoColumnSkeleton />;
				break;
			case 'conditions':
				skeleton = <OrderBumpRulesSkeleton />;
				break;
			default:
				skeleton = <OrderBumpProductSkeleton />;
				break;
		}

		return (
			<>
				<div className="wcf-page-wrapper wcf-order-bump-page-wrapper">
					{ skeleton }
				</div>
			</>
		);
	} else if ( current_ob && ob_id !== current_ob.id ) {
		return '';
	}

	const get_route_page = function () {
		let route_page = <h1>404 Not Found</h1>;

		switch ( currentTab ) {
			case 'styles':
				route_page = <OrderBumpDesign />;
				break;
			case 'product':
				route_page = <OrderBumpProduct />;
				break;
			case 'content':
				route_page = <OrderBumpContent />;
				break;
			case 'conditions':
				route_page = <OrderBumpRules />;
				break;
			default:
				route_page = <OrderBumpProduct />;
				break;
		}

		return (
			<>
				<div>{ route_page }</div>
			</>
		);
	};
	const confirmUnsavedChanges = async function () {
		if ( window.wcfUnsavedChanges ) {
			const isconfirm = await confirm( {
				title: __( 'Save Changes', 'cartflows' ),
				description: __(
					'You have made changes. Do you want to save the changes?',
					'cartflows'
				),
				actionBtnText: __( 'Yes', 'cartflows' ),
				cancelBtnText: __( 'No', 'cartflows' ),
			} );

			return isconfirm;
		}

		return false; // No changes found.So don't save anything.
	};
	const changeTab = async function ( tabSlug ) {
		if ( tabSlug === currentTab ) {
			setCurrentTab( tabSlug );
			return;
		}
		const isSave = await confirmUnsavedChanges();
		if ( ! isSave ) {
			setCurrentTab( tabSlug );
		}
		window.wcfUnsavedChanges = false;
	};
	return (
		<div className="wcf-order-bump-page-wrapper border p-6 bg-gray-50">
			<div className="wcf-order-bump-content-tab__preview">
				<OrderBumpPreview />
			</div>
			<div className="wcf-order-bump--tabs-wrapper border border-gray-200 isolate inline-flex rounded-md shadow-sm w-full mt-8 mb-8">
				{ tabs.map( ( ob_tab ) => {
					const focusClass =
						ob_tab.slug === currentTab
							? 'z-10 text-primary-600 bg-primary-25 outline-none ring-1 ring-primary-300 rounded-lg shadow shadow-primary-lg'
							: '';
					return (
						<button
							type="button"
							className={ classnames(
								'wcf-order-bump--tab flex justify-center gap-2 relative text-center w-1/3 items-center px-4 py-2 text-sm font-medium text-gray-400 hover:bg-primary-25 hover:ring-1 hover:ring-primary-300 hover:rounded-lg hover:text-primary-600',
								focusClass
							) }
							onClick={ () => {
								changeTab( ob_tab.slug );
							} }
							key={ ob_tab.slug }
						>
							{ ob_tab.icon ? ob_tab.icon : '' }
							<span className="text-center">{ ob_tab.name }</span>
						</button>
					);
				} ) }
			</div>
			{ get_route_page() }
		</div>
	);
}

export default OrderBumpPagesRoute;
