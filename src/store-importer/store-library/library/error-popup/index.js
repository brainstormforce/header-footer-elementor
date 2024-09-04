import React, { Fragment } from 'react';
import { createPortal } from 'react-dom';
import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';

import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

import { __ } from '@wordpress/i18n';

const PopupActions = ( { setVisibility } ) => {
	return (
		<>
			<div className="wcf-name-your-flow--footer bg-primary-25 p-4 mt-6 flex justify-end sm:px-6 gap-4">
				<button
					type="button"
					className="wcf-button wcf-secondary-button"
					onClick={ () => setVisibility( 'hide' ) }
				>
					{ __( 'Close', 'cartflows' ) }
				</button>
			</div>
		</>
	);
};

const PopupBody = ( props ) => {
	const { setVisibility, errorMessage, title } = props;
	const defaultTitle = title || __( 'Error', 'cartflows' );
	return (
		<>
			<div className="wcf-name-your-flow--body fixed inset-0 z-30 overflow-y-auto">
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
							<div className="wcf-name-your-flow--content bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
								<div className="wcf-name-your-flow--header absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
									<button
										type="button"
										className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none "
										onClick={ () => {
											setVisibility( 'hide' );
										} }
										title={ __(
											'Close the window',
											'cartflows'
										) }
									>
										<XMarkIcon
											className="h-18 w-18 stroke-2"
											aria-hidden="true"
										/>
									</button>
								</div>
								<div className="mt-3 text-center sm:mt-0 sm:text-left">
									<Dialog.Title
										as="h3"
										className="wcf-name-your-flow--title text-base font-medium text-gray-800"
									>
										{ defaultTitle }
									</Dialog.Title>
									<div className="wcf-name-your-flow__body mt-5">
										<p>{ errorMessage }</p>
									</div>
								</div>
							</div>
							<PopupActions setVisibility={ setVisibility } />
						</Dialog.Panel>
					</Transition.Child>
				</div>
			</div>
		</>
	);
};

const ErrorPopup = ( { visibility, setVisibility, errorMessage, title } ) => {
	return createPortal(
		<div className={ `wcf-name-your-flow ${ visibility }` }>
			<Transition.Root
				show={ 'show' === visibility ? true : false }
				as={ Fragment }
			>
				<Dialog
					as="div"
					className="relative z-20"
					initialFocus={ '' }
					onClose={ setVisibility }
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
						<div
							className="wcf-name-your-flow__overlay fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
							onClick={ () => {
								setVisibility( 'hide' );
							} }
						/>
					</Transition.Child>

					<div className="wcf-name-your-flow__inner">
						<PopupBody
							setVisibility={ setVisibility }
							errorMessage={ errorMessage }
							title={ title }
						/>
					</div>
				</Dialog>
			</Transition.Root>
		</div>,
		document.getElementById( 'wcf-json-importer' )
	);
};

export default compose(
	withSelect( ( select ) => {
		const { getFlowsCount, getCFProStatus, getLicenseStatus } =
			select( 'wcf/importer' );
		return {
			flowsCount: getFlowsCount(),
			cf_pro_status: getCFProStatus(),
			license_status: getLicenseStatus(),
		};
	} )
)( ErrorPopup );
