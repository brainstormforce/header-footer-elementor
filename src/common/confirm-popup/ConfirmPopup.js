import { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import {
	ExclamationTriangleIcon,
	XMarkIcon,
} from '@heroicons/react/24/outline';

export default function ConfirmPopup( props ) {
	const cancelButtonRef = useRef( null );

	if ( ! props ) {
		return;
	}

	return (
		<Transition.Root show={ props.isOpen } as={ Fragment }>
			<Dialog
				as="div"
				className="relative z-20 wcf-confirm-popup"
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
							<Dialog.Panel className="wcf-confirm-popup-wrapper relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
								<div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
									<button
										type="button"
										className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
										onClick={ props.onClose }
									>
										<span className="sr-only">Close</span>
										<XMarkIcon
											className="h-6 w-6"
											aria-hidden="true"
										/>
									</button>
								</div>
								<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
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
												className="text-lg font-medium leading-6 text-gray-900"
											>
												{ props.title }
											</Dialog.Title>
											<div className="mt-2">
												<p className="text-sm text-gray-500">
													{ props.description }
												</p>
											</div>
										</div>
									</div>
								</div>
								<div className="bg-gray-50 px-4 py-3 sm:flex gap-3 justify-end sm:px-6">
									<button
										type="button"
										className="wcf-button wcf-secondary-button"
										onClick={ props.onClose }
									>
										{ props.cancelBtnText }
									</button>
									<button
										type="button"
										className="wcf-button wcf-primary-button"
										onClick={ props.onConfirm }
									>
										{ props.actionBtnText }
									</button>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
}
