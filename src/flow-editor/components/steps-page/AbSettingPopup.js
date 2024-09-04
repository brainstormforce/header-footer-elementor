import React, { Fragment, useRef, useState } from 'react';
import { __ } from '@wordpress/i18n';
import './AbSettingPopup.scss';
import apiFetch from '@wordpress/api-fetch';
import AbSettingSliders from './AbSettingSliders';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/20/solid';

function AbSettingPopup( props ) {
	const { flow_id, step_id, abvariations, closeCallback } = props;
	const [ btnText, setBtnText ] = useState(
		__( 'Save Settings', 'cartflows' )
	);
	const saveAbSettings = function ( event ) {
		event.preventDefault();
		setBtnText( __( 'Saving..', 'cartflows' ) );
		const formData = new window.FormData( event.target );

		const object = {};
		formData.forEach( function ( value, key ) {
			object[ key ] = value;
		} );
		const json = JSON.stringify( object );

		formData.append( 'formdata', json );

		formData.append( 'action', 'cartflows_save_ab_test_setting' );
		formData.append(
			'security',
			cartflows_admin.save_ab_test_setting_nonce
		);
		formData.append( 'step_id', step_id );
		formData.append( 'flow_id', flow_id );

		apiFetch( {
			url: cartflows_admin.ajax_url,
			method: 'POST',
			body: formData,
		} ).then( () => {
			setBtnText( __( 'Saved', 'cartflows' ) );
			setBtnText( __( 'Reloading..', 'cartflows' ) );
			window.location.reload();
		} );
	};

	const cancelButtonRef = useRef( null );
	return (
		<Transition.Root show={ true } as={ Fragment }>
			<Dialog
				as="div"
				className="relative z-20"
				initialFocus={ cancelButtonRef }
				onClose={ closeCallback }
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
					<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
				</Transition.Child>

				<div className="fixed inset-0 z-10 overflow-y-auto">
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
							<Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full max-w-xl">
								<div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
									<button
										type="button"
										className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
										onClick={ closeCallback }
									>
										<span className="sr-only">Close</span>
										<XMarkIcon
											className="h-6 w-6"
											aria-hidden="true"
										/>
									</button>
								</div>
								<form onSubmit={ saveAbSettings }>
									<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
										<div className="sm:items-start">
											<div className="mt-3 text-center sm:mt-0 sm:text-left">
												<Dialog.Title
													as="h3"
													className="text-lg font-medium leading-6 text-gray-900 mb-4"
												>
													{ __(
														'Split Test Testing',
														'cartflows'
													) }
												</Dialog.Title>
												<div className="text-sm text-gray-900 mb-4">
													Traffic
												</div>
												<div className="mt-2">
													<p className="text-sm text-gray-500">
														<div className="relative items-center rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 sm:rounded-md">
															<AbSettingSliders
																abVariations={
																	abvariations
																}
															/>
														</div>
													</p>
												</div>
											</div>
										</div>
									</div>

									<div className="bg-gray-50 px-4 py-3 sm:flex gap-3 justify-end sm:px-6">
										<button
											type="button"
											className="wcf-button wcf-secondary-button"
											onClick={ closeCallback }
										>
											{ __( 'Cancel', 'cartflows' ) }
										</button>
										<button className="wcf-button wcf-primary-button">
											{ btnText }
										</button>
									</div>
								</form>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
}

export default AbSettingPopup;
