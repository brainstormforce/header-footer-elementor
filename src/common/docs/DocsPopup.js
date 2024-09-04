import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { __ } from '@wordpress/i18n';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

import Docs from '@Admin/common/docs/Docs';

const DocsPopup = () => {
	const [ open, setOpen ] = useState( false );
	return (
		<>
			<a
				to="//cartflows.com/contact/"
				target="_blank"
				className="bg-white p-4 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-offset-2 cursor-pointer relative wcf-inline-tooltip"
				data-tooltip={ __( 'Support', 'cartflows' ) }
				onClick={ () => setOpen( true ) }
			>
				<QuestionMarkCircleIcon
					className="w-6 h-6 stroke-1"
					aria-hidden="true"
				/>
			</a>
			<Transition.Root show={ open } as={ Fragment }>
				<Dialog
					as="div"
					className="wcf-knowledge-base--wrapper relative z-20"
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
						<div className="wcf-knowledge-base-wrapper-overflow fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
					</Transition.Child>

					{ /* { overflow-y-auto } */ }
					<div className="wcf-knowledge-base--content-wrapper fixed left-28 right-0 bottom-0 top-4 z-0">
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
								<Dialog.Panel className="wcf-knowledge-base--content relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-6xl">
									<Docs setOpen={ setOpen } />
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition.Root>
		</>
	);
};

export default DocsPopup;
