import React, { Fragment, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

import ImportFlow from '../flow-preview/import-flow';
import CreateButton from '../../creator/CreateButton';

const PopupActions = ( {
	preview,
	type,
	flowName,
	setInputFieldVisibility,
	cancelButtonRef,
	setVisibility,
} ) => {
	return (
		<>
			<div className="wcf-name-your-flow--footer bg-primary-25 p-4 mt-6 flex justify-end sm:px-6 gap-4">
				{ type === 'import' && (
					<>
						<button
							type="button"
							className="wcf-button wcf-secondary-button"
							onClick={ () => setVisibility( 'hide' ) }
							ref={ cancelButtonRef }
						>
							{ __( 'Cancel', 'cartflows' ) }
						</button>
						<ImportFlow
							preview={ preview }
							flowName={ flowName }
							setInputFieldVisibility={ setInputFieldVisibility }
						/>
					</>
				) }

				{ type === 'blank' && (
					<>
						<button
							type="button"
							className="wcf-button wcf-secondary-button"
							onClick={ () => setVisibility( 'hide' ) }
							ref={ cancelButtonRef }
						>
							{ __( 'Cancel', 'cartflows' ) }
						</button>
						<CreateButton
							flowName={ flowName }
							setInputFieldVisibility={ setInputFieldVisibility }
							isStoreCheckout={ true }
						/>
					</>
				) }
			</div>
		</>
	);
};

const PopupBody = ( props ) => {
	const {
		cf_pro_status,
		setVisibility,
		preview,
		type,
		setFlowName,
		cancelButtonRef,
	} = props;
	const [ inputFieldVisibility, setInputFieldVisibility ] = useState( '' );
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
										{ __(
											'Create Store Checkout',
											'cartflows'
										) }
									</Dialog.Title>
									<div className="mt-5">
										<div className="wcf-name-your-store-flow--content">
											<p className="text-sm font-semibold leading-6 text-gray-900 mb-4">
												{ __(
													'Creates Store checkout with required pages',
													'cartflows'
												) }
											</p>
											<ul className="text-sm text-gray-600 mb-4 list-inside">
												<li className="flex gap-2 items-center">
													<CheckCircleIcon
														className="h-18 w-18 text-primary-600"
														aria-hidden="true"
													/>
													{ __(
														'Checkout Page',
														'cartflows'
													) }
												</li>
												<li className="flex gap-2 items-center">
													<CheckCircleIcon
														className="h-18 w-18 text-primary-600"
														aria-hidden="true"
													/>
													{ __(
														'Thank you Page',
														'cartflows'
													) }
												</li>
											</ul>

											<p className="text-sm text-gray-500 mb-2">
												{ __(
													'NOTE : You need to add shortcodes on each page, or use our custom widget or just update ready-made templates from CartFlows Library.',
													'cartflows'
												) }
											</p>
										</div>
									</div>
								</div>
							</div>
							<PopupActions
								cf_pro_status={ cf_pro_status }
								setVisibility={ setVisibility }
								preview={ preview }
								type={ type }
								flowName={ 'Store Checkout' }
								setFlowName={ setFlowName }
								inputFieldVisibility={ inputFieldVisibility }
								setInputFieldVisibility={
									setInputFieldVisibility
								}
								cancelButtonRef={ cancelButtonRef }
							/>
						</Dialog.Panel>
					</Transition.Child>
				</div>
			</div>
		</>
	);
};

const FlowNamePopup = ( {
	visibility,
	setVisibility,
	preview,
	type,
	flowName,
	setFlowName,
	cf_pro_status,
} ) => {
	const cancelButtonRef = useRef( null );

	if ( 'show' !== visibility ) {
		return '';
	}

	return createPortal(
		<div className={ `wcf-name-your-store-flow ${ visibility }` }>
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
							className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
							onClick={ () => {
								setVisibility( 'hide' );
							} }
						/>
					</Transition.Child>

					<div className="wcf-name-your-flow__inner">
						<PopupBody
							cf_pro_status={ cf_pro_status }
							setVisibility={ setVisibility }
							preview={ preview }
							type={ type }
							flowName={ flowName }
							setFlowName={ setFlowName }
							cancelButtonRef={ cancelButtonRef }
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
)( FlowNamePopup );
