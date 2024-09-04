import { Fragment, useState, useEffect } from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { Dialog, Transition } from '@headlessui/react';
import {
	XMarkIcon,
	SquaresPlusIcon,
	ShoppingCartIcon,
	Bars3Icon,
	CubeIcon,
} from '@heroicons/react/24/outline';
import { useLocation, Link, useHistory } from 'react-router-dom';
import apiFetch from '@wordpress/api-fetch';
import { useStateValue } from '@Utils/StateProvider';
import StepTitle from '@Admin/step-editor/step-title/StepTitle';
import { SubmitButton } from '@Fields';
import DesignPage from '@StepEditor/pages/DesignPage';
import SettingsPage from '@StepEditor/pages/SettingsPage';
import ProductSelection from '@Admin/step-editor/pages/ProductSelection';
import MultiOrderBump from '@Admin/step-editor/order-bump/MultiOrderBump';
import CheckoutOffer from '@StepEditor/pages/CheckoutOffer';
import Rules from '@Admin/step-editor/pages/Rules';
import CheckoutFormFields from '@Admin/step-editor/pages/CheckoutFormFields';
import OptinFormFields from '@Admin/step-editor/pages/OptinFormFields';
import CheckoutProductSelection from '@Admin/step-editor/pages/CheckoutProductSelection';
import OptinProductSelection from '@Admin/step-editor/pages/OptinProductSelection';
import { useSettingsValue } from '@Utils/SettingsProvider';
import useConfirm from '@Alert/ConfirmDialog';
import SlideOverSkeleton from './SlideOverSkeleton';

function classNames( ...classes ) {
	return classes.filter( Boolean ).join( ' ' );
}

export default function SlideOver( props ) {
	const [
		{ flow_id, step_data, flow_type, current_ob, options, page_builder },
		dispatch,
	] = useStateValue();

	// const buttonElement = useRef( null );
	const [ currentTab, setActiveTab ] = useState( 'products' );
	const confirm = useConfirm();
	const [ {}, setSettingsStatus ] = useSettingsValue();
	const history = useHistory();
	const query = new URLSearchParams( useLocation()?.search );
	const currentStep = query.get( 'step_id' ) ?? '';

	const wooStatus =
		'active' === cartflows_admin.woocommerce_status ? true : false;

	let renderTabs = wooStatus;

	if ( ! wooStatus && 'landing' === step_data.type ) {
		renderTabs = true;
	}

	let loading = '' !== currentStep ? true : false;

	if (
		0 !== Object.keys( step_data ).length &&
		step_data.id.toString() === currentStep
	) {
		loading = false;
	}

	useEffect( () => {
		let isActive = true;

		const getStepData = async () => {
			apiFetch( {
				path: `/cartflows/v1/admin/step-data/${ currentStep }`,
			} ).then( ( data ) => {
				if ( isActive ) {
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
				}
			} );
		};

		if ( '' !== currentStep ) {
			getStepData();
		}

		return () => {
			isActive = false;
		};
	}, [ currentStep ] );

	const get_route_page = function () {
		let route_page = <h1>404 Not Found</h1>;

		switch ( currentTab ) {
			case 'design':
				route_page = <DesignPage />;
				break;
			case 'settings':
				route_page = <SettingsPage />;
				break;

			case 'products':
				if ( 'checkout' === step_data.type ) {
					if (
						'storeCheckout' === flow_type &&
						! cartflows_admin.store_checkout_show_product_tab
					) {
						route_page = <MultiOrderBump />;
						setActiveTab( 'order_bumps' );
					} else {
						route_page = <CheckoutProductSelection />;
					}
				} else if (
					[ 'upsell', 'downsell' ].includes( step_data.type )
				) {
					// This component will display the product section of Offer steps.
					route_page = <ProductSelection />;
				} else {
					// This component will display the product section of Optin steps.
					route_page = <OptinProductSelection />;
				}

				if (
					'landing' === step_data.type ||
					'thankyou' === step_data.type
				) {
					route_page = <SettingsPage />;
					setActiveTab( 'settings' );
				}
				break;
			case 'checkout_form_fields':
				route_page = <CheckoutFormFields />;
				break;
			case 'order_bumps':
				route_page = <MultiOrderBump />;
				break;
			case 'checkout_offer':
				route_page = <CheckoutOffer />;
				break;
			case 'optin_form_fields':
				route_page = <OptinFormFields />;
				break;
			case 'dynamic-offers':
				route_page = <Rules />;
				break;
			default:
				route_page = <DesignPage />;
				break;
		}

		return <div className="wcf-page-wrapper">{ route_page }</div>;
	};
	let menus = [];

	if ( step_data?.tabs ) {
		const tabs = step_data.tabs;

		menus = [];
		const sorted_tabs = Object.values( tabs ).sort( function ( a, b ) {
			return a.priority - b.priority;
		} );
		Object.keys( sorted_tabs ).map( ( slug ) => {
			const tab = sorted_tabs[ slug ];
			const menu = {
				name: tab.title,
				id: tab.id,
			};

			menus.push( menu );
			return '';
		} );
		// Remove design tab if page builder set page builder for which we have a modules.
		if ( 'other' !== page_builder ) {
			menus = menus.filter( function ( obj ) {
				return obj.id !== 'design';
			} );
		}
	}

	const handleOnSubmit = function ( e ) {
		e.preventDefault();
		const formData = new window.FormData( e.target );

		if ( 'order_bumps' === currentTab ) {
			if ( null !== current_ob ) {
				const ob_id = current_ob.id;
				formData.append(
					'action',
					'cartflows_pro_save_order_bump_settings'
				);
				formData.append(
					'security',
					cartflows_admin.save_order_bump_settings_nonce
				);
				formData.append( 'post_id', flow_id );
				formData.append( 'step_id', currentStep );
				formData.append( 'ob_id', ob_id );
				// formData.append( 'ob_tab', null !== tab ? tab : 'product' );

				apiFetch( {
					url: cartflows_admin.ajax_url,
					method: 'POST',
					body: formData,
				} ).then( ( response ) => {
					if ( response.data && response.data.current_ob ) {
						dispatch( {
							type: 'SET_CURRENT_OB',
							current_ob: response.data.current_ob,
							ob_id,
						} );
					}
					setSettingsStatus( { status: 'SAVED' } );
				} );
			} else {
				setSettingsStatus( { status: 'SAVED' } );
			}
		} else {
			formData.append( 'action', 'cartflows_save_meta_settings' );
			formData.append(
				'security',
				cartflows_admin.save_meta_settings_nonce
			);
			formData.append( 'post_id', flow_id );
			formData.append( 'step_id', currentStep );
			console.log( currentTab );

			if (
				'products' === currentTab &&
				'checkout' === step_data.type &&
				'single-selection' === options[ 'wcf-product-options' ]
			) {
				const product = formData.get( 'wcf_default_add_to_cart[]' );
				formData.set(
					`wcf-product-options-data[${ product }][add_to_cart]`,
					'yes'
				);
			}

			apiFetch( {
				url: cartflows_admin.ajax_url,
				method: 'POST',
				body: formData,
			} ).then( () => {
				setSettingsStatus( { status: 'SAVED' } );

				if ( [ 'products' ].includes( currentTab ) ) {
					props.renderCb();
				}
			} );
		}
	};

	const confirmUnsavedChanges = async function () {
		if ( window.wcfUnsavedChanges ) {
			const isconfirm = await confirm( {
				title: 'Save Changes',
				description:
					'You have made changes. Do you want to save the changes?',
				actionBtnText: 'Yes',
				cancelBtnText: 'No',
			} );

			return isconfirm;
		}

		return false; // No changes found.So don't save anything.
	};

	/**
	 * Return the desired menu's icon.
	 *
	 * @param {string} menu_id
	 * @return {Object} Icon to render.
	 */
	const get_menu_icon = function ( menu_id ) {
		let menu_icon = '';

		switch ( menu_id ) {
			case 'products':
				menu_icon = <SquaresPlusIcon className="w-4 h-4" />;
				break;
			case 'order_bumps':
				menu_icon = <ShoppingCartIcon className="w-4 h-4" />;
				break;
			case 'checkout_form_fields':
				menu_icon = <Bars3Icon className="w-4 h-4" />;
				break;
			case 'dynamic-offers':
				menu_icon = <CubeIcon className="w-4 h-4" />;
				break;
			case 'checkout_offer':
				menu_icon = <CubeIcon className="w-4 h-4" />;
				break;
			case 'settings':
				menu_icon = <SquaresPlusIcon className="w-4 h-4" />;
				break;

			default:
				menu_icon = <CubeIcon className="w-4 h-4" />;
				break;
		}

		return menu_icon;
	};

	const changeTab = async function ( menuId ) {
		if ( menuId === currentTab ) {
			setActiveTab( menuId );
			return;
		}
		const isSave = await confirmUnsavedChanges();
		if ( isSave ) {
			//Todo
			//ajax call to save settings
			// setActiveTab( currentTab );
			// setTimeout( () => {
			// 	buttonElement.click();
			// }, 5000 );
		} else {
			setActiveTab( menuId );
		}

		window.wcfUnsavedChanges = false;
	};

	const activatePlugin = ( e ) => {
		const formData = new window.FormData();
		formData.append( 'action', 'cartflows_activate_plugin' );
		formData.append( 'init', e.target.dataset.init );
		formData.append( 'security', cartflows_admin.activate_plugin_nonce );
		e.target.innerText = __( 'Activating…', 'cartflows' );
		apiFetch( {
			url: cartflows_admin.ajax_url,
			method: 'POST',
			body: formData,
		} ).then( () => {
			e.target.innerText = __( 'Activated', 'cartflows' );
			window.location.reload();
		} );
	};

	/**
	 * Function to handle closing of slide over popup when
	 * clicked on the overlay or other part of the screen.
	 */
	const handleOverlayClose = function () {
		history.push(
			'storeCheckout' === flow_type
				? `?page=cartflows&path=store-checkout&action=wcf-edit-flow&flow_id=${ flow_id }`
				: `?page=cartflows&path=flows&action=wcf-edit-flow&flow_id=${ flow_id }`
		);
	};

	return (
		<Transition.Root
			show={ '' !== currentStep ? true : false }
			as={ Fragment }
		>
			<Dialog
				as="div"
				className="relative z-20 wcf-funnel-step-setting--slide-out"
				onClose={ () => {} }
			>
				<Transition.Child
					as={ Fragment }
					enter="transition-opacity ease-linear duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="transition-opacity ease-linear duration-300"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div
						className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity z-10"
						onClick={ handleOverlayClose }
					></div>
				</Transition.Child>

				<div className="wcf-slide-out-panel inset-0 overflow-hidden">
					<div className="wcf-slide-out-panel--content pointer-events-none fixed inset-y-0 top-7 right-0 flex max-w-full z-20">
						<Transition.Child
							as={ Fragment }
							enter="transition-transform ease-in-out duration-700 sm:duration-700"
							enterFrom="translate-x-full"
							enterTo="translate-x-0"
							leave="transition-transform ease-in-out duration-700 sm:duration-700"
							leaveFrom="translate-x-0"
							leaveTo="translate-x-full"
						>
							<Dialog.Panel className="pointer-events-auto w-screen max-w-4.5xl relative top-1">
								<div className="wcf-slide-out-panel--close bg-white absolute -left-10">
									<Link
										key="close"
										to={ {
											pathname: 'admin.php',
											search:
												'storeCheckout' === flow_type
													? `?page=cartflows&path=store-checkout&action=wcf-edit-flow&flow_id=${ flow_id }`
													: `?page=cartflows&path=flows&action=wcf-edit-flow&flow_id=${ flow_id }`,
										} }
										className="flex justify-center items-center p-2.5 text-gray-400 hover:text-gray-500 outline-none focus:outline-none shadow-none focus:shadow-none"
									>
										<button
											type="button"
											// onClick={ emptyStepData }
										>
											<XMarkIcon
												className="w-5 h-5"
												aria-hidden="true"
											/>
										</button>
									</Link>
								</div>

								<div className="wcf-slide-out-panel--content-body flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
									{ loading && (
										// Show loading.
										<SlideOverSkeleton />
									) }

									{ ! loading && (
										<form onSubmit={ handleOnSubmit }>
											<div className="wcf-slide-out-panel--header flex justify-between px-6 py-5">
												<div className="wcf-slide-out-panel--step-title">
													<Dialog.Title className="text-lg font-medium text-gray-900">
														<StepTitle
															type={ 'flow' }
															action={
																'wcf-edit-flow'
															}
														/>
													</Dialog.Title>
												</div>
												<div
													className={ `wcf-slide-out-panel--submit-button ${
														! wooStatus &&
														[
															'checkout',
															'upsell',
															'downsell',
															'thankyou',
														].includes(
															step_data.type
														)
															? 'hidden'
															: ''
													}` }
												>
													<SubmitButton
														id="wcf-save-step-meta"
														// ref={
														// 	buttonElement
														// }
													/>
												</div>
											</div>
											{ renderTabs ? (
												<>
													<div className="wcf-slide-out-panel--nav-menu border-b border-gray-200 px-6">
														<nav className="-mb-px flex gap-6">
															{ menus.map(
																( menu ) => {
																	return (
																		<a
																			key={
																				menu.id
																			}
																			onClick={ () => {
																				changeTab(
																					menu.id
																				);
																			} }
																			className={ classNames(
																				currentTab ===
																					menu.id
																					? 'border-orange-500 text-orange-600 hover:text-orange-600 focus:text-orange-600'
																					: 'border-transparent text-gray-500 hover:text-orange-600 hover:border-orange-600',
																				'transition ease-linear duration-300 whitespace-nowrap py-4 cursor-pointer border-b-2 font-medium text-sm inline-flex items-center pl-0 gap-1.5'
																			) }
																		>
																			{ get_menu_icon(
																				menu.id
																			) }
																			{
																				menu.name
																			}
																		</a>
																	);
																}
															) }
														</nav>
													</div>
													<div
														role="list"
														className="wcf-slide-out-panel--settings flex-1 p-8"
													>
														{ get_route_page() }
													</div>
												</>
											) : (
												<div
													className={ `wcf-woo-notice-wrapper flex-1 p-6` }
												>
													<div className="bg-red-50 border-red-200 text-red-600 rounded-lg px-5 py-5 lg:px-8 sm:py-5 flex gap-6 ">
														<div className="max-w-full">
															<h2 className="text-base font-medium tracking-tight text-gray-800 sm:text-base">
																{ __(
																	'WooCommerce is required!',
																	'cartflows'
																) }
															</h2>
															<p className="wcf-upgrade-to-pro-cta--text text-sm font-normal text-gray-600 mt-3">
																{ sprintf(
																	// translators: %s: step type
																	__(
																		'To modify the %s step options, please install and activate the WooCommerce plugin.',
																		'cartflows'
																	),
																	step_data.type
																) }
															</p>
														</div>
														<div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
															<a
																className="wcf-button wcf-primary-button focus:text-white"
																data-init={
																	'woocommerce/woocommerce.php'
																}
																onClick={
																	activatePlugin
																}
															>
																{ __(
																	'Activate WooCommerce',
																	'cartflows'
																) }
															</a>
														</div>
													</div>
												</div>
											) }
										</form>
									) }
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
}
