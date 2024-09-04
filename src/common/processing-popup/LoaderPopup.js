import React, { Fragment } from 'react';
import { usePromiseTracker } from 'react-promise-tracker';
import { Dialog, Transition } from '@headlessui/react';
import { __ } from '@wordpress/i18n';
import {
	DocumentDuplicateIcon,
	TrashIcon,
	DocumentArrowDownIcon,
	ArchiveBoxArrowDownIcon,
	CheckBadgeIcon,
	EnvelopeOpenIcon,
} from '@heroicons/react/24/outline';

function LoaderPopup() {
	const { promiseInProgress } = usePromiseTracker();

	let title = __( 'Please wait…', 'cartflows' ),
		icon = '';

	if ( promiseInProgress ) {
		switch ( window.wcfAction ) {
			case 'cloneFlow':
				title = __( 'Please wait. Duplicating funnel…', 'cartflows' );
				icon = (
					<DocumentDuplicateIcon className="w-18 h-18 text-primary-500" />
				);
				break;
			case 'draftFlow':
				title = __( 'Please wait. Drafting funnel…', 'cartflows' );
				icon = (
					<EnvelopeOpenIcon className="w-18 h-18 text-primary-500" />
				);
				break;
			case 'deleteFlow':
				title = __( 'Please wait. Deleting funnel…', 'cartflows' );
				icon = <TrashIcon className="w-18 h-18 text-primary-500" />;
				break;
			case 'restoreFlow':
				title = __( 'Please wait. Restoring funnel…', 'cartflows' );
				icon = (
					<CheckBadgeIcon className="w-18 h-18 text-primary-500" />
				);
				break;
			case 'exportFlow':
				title = __( 'Please wait. Exporting…', 'cartflows' );
				icon = (
					<DocumentArrowDownIcon className="w-18 h-18 text-primary-500" />
				);

				break;
			case 'cloneStep':
				title = __( 'Please wait. Duplicating step…', 'cartflows' );
				icon = (
					<DocumentDuplicateIcon className="w-18 h-18 text-primary-500" />
				);
				break;
			case 'deleteStep':
				title = __( 'Please wait. Deleting step…', 'cartflows' );
				icon = <TrashIcon className="w-18 h-18 text-primary-500" />;
				break;
			case 'abtestStep':
				title = __( 'Please wait. Creating variation…', 'cartflows' );
				icon = (
					<DocumentDuplicateIcon className="w-18 h-18 text-primary-500" />
				);
				break;
			case 'archiveStep':
				title = __( 'Please wait. Archiving variation…', 'cartflows' );
				icon = (
					<ArchiveBoxArrowDownIcon className="w-18 h-18 text-primary-500" />
				);
				break;
			case 'winnerStep':
				title = __( 'Please wait. Declaring winner…', 'cartflows' );
				icon = (
					<CheckBadgeIcon className="w-18 h-18 text-primary-500" />
				);
				break;

			default:
				title = __( 'Please wait…', 'cartflows' );
				icon = '';
		}
	}

	return (
		<Transition.Root
			show={ promiseInProgress ? true : false }
			as={ Fragment }
			afterLeave={ () => {
				// Remove any overflow OR inline styles added to HTML tab when the popup is opened.
				document.documentElement.style.overflow = '';
			} }
		>
			<Dialog as="div" className="relative z-20" onClose={ () => {} }>
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

				<div className="fixed inset-0 z-20 overflow-y-auto">
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
							<Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
								<div>
									<div className="flex justify-center">
										<div className="relative">
											<div className="w-16 h-16 border-primary-200 border-2 rounded-full"></div>
											<div className="w-16 h-16 border-primary-500 border-t-2 animate-spin rounded-full absolute left-0 top-0"></div>
											<div className="w-16 h-16 absolute left-0 top-0 flex justify-center items-center">
												{ icon }
											</div>
										</div>
									</div>

									<div className="mt-3 text-center sm:mt-5">
										<Dialog.Title
											as="h3"
											className="text-sm font-normal leading-6 text-gray-600"
										>
											{ title }
										</Dialog.Title>
									</div>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
}
export default LoaderPopup;
