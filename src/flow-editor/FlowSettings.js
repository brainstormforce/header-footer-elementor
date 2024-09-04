import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import apiFetch from '@wordpress/api-fetch';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { SubmitButton } from '@Fields';
import { __ } from '@wordpress/i18n';
import { useStateValue } from '@Utils/StateProvider';
import { useSettingsValue } from '@Utils/SettingsProvider';
// import ListOptions from '@Editor/components/list-options/ListOptions';
import Accordian from '@StepEditor/components/Accordian/Accordian';

export default function FlowSettings( props ) {
	const [ { flow_id, flow_settings } ] = useStateValue();
	const [ {}, setSettingsStatus ] = useSettingsValue();

	let loading = true;

	if ( 'undefined' !== typeof flow_settings.settings ) {
		loading = false;
	}

	if ( loading ) {
		return '';
	}
	const handleSubmit = function ( event ) {
		event.preventDefault();
		const formData = new window.FormData( event.target );

		formData.append( 'action', 'cartflows_save_flow_meta_settings' );
		formData.append(
			'security',
			cartflows_admin.save_flow_meta_settings_nonce
		);
		formData.append( 'flow_id', flow_id );

		apiFetch( {
			url: cartflows_admin.ajax_url,
			method: 'POST',
			body: formData,
		} ).then( () => {
			setSettingsStatus( { status: 'SAVED' } );
		} );
	};
	return (
		<Transition.Root show={ props.isOpen } as={ Fragment }>
			<Dialog
				as="div"
				className="relative z-20 wcf-funnel-settings--slide-out"
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
					<div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" />
				</Transition.Child>

				<div
					className="wcf-slide-out-panel fixed inset-0 overflow-hidden"
					onClick={ props.onClose }
				>
					<div className="wcf-slide-out-panel--wrapper absolute inset-0 overflow-hidden">
						<div className="wcf-slide-out-panel--content pointer-events-none fixed inset-y-0 top-7 right-0 flex max-w-full">
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
										<button
											type="button"
											className="flex justify-center items-center p-2.5 text-gray-400 hover:text-gray-500 outline-none focus:outline-none shadow-none focus:shadow-none"
											onClick={ props.onClose }
										>
											<XMarkIcon
												className="h-6 w-6"
												aria-hidden="true"
											/>
										</button>
									</div>
									<div className="wcf-slide-out-panel--content-body flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
										<form onSubmit={ handleSubmit }>
											<div className="wcf-slide-out-panel--header flex justify-between items-center px-6 py-5">
												<Dialog.Title className="text-lg font-medium text-gray-900">
													{ __(
														'Funnel Settings',
														'cartflows'
													) }
												</Dialog.Title>
												<SubmitButton
													label={ __(
														'Save Setting',
														'cartflows'
													) }
												></SubmitButton>
											</div>
											<div className="wcf-slide-out-panel--nav-menu border-b border-gray-200 px-6">
												{ flow_settings &&
													Object.keys(
														flow_settings.settings
													).map( ( key, index ) => {
														const settingSection =
															flow_settings
																.settings[
																key
															];
														return (
															<Accordian
																key={ index }
																settings={
																	settingSection
																}
																isOpen={ true }
															/>
															// <ListOptions
															// 	settings={
															// 		settingSection
															// 	}
															// 	key={ index }
															// />
														);
													} ) }
											</div>
										</form>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
}
