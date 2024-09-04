import React, { Fragment, useRef, useState } from 'react';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { Dialog, Transition } from '@headlessui/react';
import {
	ExclamationTriangleIcon,
	ArrowPathIcon,
} from '@heroicons/react/24/outline';

function WooCommerce404() {
	const cancelButtonRef = useRef( null );
	const defaultButtonText =
		'not-installed' === cartflows_admin.woocommerce_status
			? __( 'Install WooCommerce', 'cartflows' )
			: __( 'Activate WooCommerce', 'cartflows' );
	const [ buttonText, SetButtonText ] = useState( defaultButtonText );
	const [ buttonProcess, SetButtonProcessing ] = useState( false );

	const InstallWoo = ( e ) => {
		e.preventDefault();

		if ( 'not-installed' === cartflows_admin.woocommerce_status ) {
			SetButtonText( __( 'Installing', 'cartflows' ) );
			SetButtonProcessing( true );

			wp.updates.queue.push( {
				action: 'install-plugin', // Required action.
				data: {
					slug: 'woocommerce', // Required.
				},
			} );
			// Required to set queue.
			wp.updates.queueChecker();
		} else {
			SetButtonText( __( 'Activating', 'cartflows' ) );
			SetButtonProcessing( true );
			const formData = new window.FormData();

			formData.append( 'action', 'cartflows_activate_plugin' );
			formData.append( 'init', 'woocommerce/woocommerce.php' );
			formData.append(
				'security',
				cartflows_admin.activate_plugin_nonce
			);
			apiFetch( {
				url: cartflows_admin.ajax_url,
				method: 'POST',
				body: formData,
			} ).then( ( response ) => {
				if ( response.data && response.data.success ) {
					SetButtonText( __( 'Activated', 'cartflows' ) );
				} else {
					SetButtonText( __( 'Failed', 'cartflows' ) );
				}

				SetButtonText( __( 'Redirecting', 'cartflows' ) );
				window.location.reload();
			} );
		}
	};

	/**
	 * Remove the inert data attribute from the wpwrap div when the popup is displayed.
	 */
	const removePointerEvents = function () {
		const wpWrap = document.getElementById( 'wpwrap' );
		if ( wpWrap ) {
			wpWrap.removeAttribute( 'inert' );
		}
	};

	// Call the function after 1 second after the popup is displayed.
	setTimeout( function () {
		removePointerEvents();
	}, 1000 );

	return (
		<Transition.Root show={ true } as={ Fragment }>
			<Dialog
				as="div"
				className="relative z-10"
				initialFocus={ cancelButtonRef }
				onClose={ () => {} }
			>
				<Transition.Child
					as={ Fragment }
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-x-0 top-24 bottom-0 bg-gray-500 bg-opacity-75 transition-opacity" />
				</Transition.Child>

				<div className="fixed inset-x-0 top-24 bottom-0 z-10 overflow-y-auto">
					<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
						<Transition.Child
							as={ Fragment }
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
								<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
									<div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
										{ /* <button
											type="button"
											className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none "
											onClick={ () => setOpen( false ) }
										>
											<span className="sr-only">
												Close
											</span>
											<XMarkIcon
												className="h-6 w-6"
												aria-hidden="true"
											/>
										</button> */ }
									</div>
									<div className="sm:flex sm:items-start">
										<div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
											<ExclamationTriangleIcon
												className="h-6 w-6 text-red-600"
												aria-hidden="true"
											/>
										</div>
										<div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
											<Dialog.Title
												as="h3"
												className="text-base font-semibold leading-6 text-gray-900"
											>
												{ __(
													'Plugin Required',
													'cartflows'
												) }
											</Dialog.Title>
											<div className="mt-2">
												<p className="text-sm text-gray-500">
													{ __(
														'You need WooCommerce plugin installed and activated to access this page.',
														'cartflows'
													) }
												</p>
											</div>
										</div>
									</div>
								</div>
								<div className="bg-gray-50 px-4 py-3 sm:flex gap-3 justify-end sm:px-6">
									<button
										type="button"
										className="wcf-button wcf-primary-button"
										onClick={ InstallWoo }
									>
										{ buttonProcess && (
											<ArrowPathIcon
												className={
													'w-18 h-18 stroke-2 animate-spin'
												}
											/>
										) }
										{ buttonText }
									</button>
									{ /* <button
										type="button"
										className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
										onClick={ () => setOpen( false ) }
										ref={ cancelButtonRef }
									>
										{ __( 'Cancel' ) }
									</button> */ }
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
}

export default WooCommerce404;
