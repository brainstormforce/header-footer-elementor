import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import GlobalSettings from './GlobalSettings';

export default function SettingsPopup( props ) {
	return (
		<Transition.Root show={ props.isOpen } as={ Fragment }>
			<Dialog
				as="div"
				className="wcf-global-setting--wrapper relative z-20"
				onClose={ props.closeCallback }
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
					<div className="wcf-global-setting-wrapper-overflow fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
				</Transition.Child>

				{ /* { overflow-y-auto } */ }
				<div className="wcf-global-setting--content-wrapper z-10">
					<div className="fixed left-28 right-0 bottom-0 top-4 flex items-end justify-center p-4 text-center sm:items-center sm:p-0">
						<Transition.Child
							as={ Fragment }
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<Dialog.Panel className="wcf-global-setting--content relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-6xl">
								{ /* <form
									className="wcf-global-settings-form"
									onSubmit={ handleFormSubmit }
								> */ }

								<div className="wcf-global-setting--panel overflow-y-auto">
									<GlobalSettings
										closeCallback={ props.closeCallback }
										current_tab={
											props.current_tab
												? props.current_tab
												: 'general'
										}
									/>
								</div>
								{ /* </form> */ }
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
}
