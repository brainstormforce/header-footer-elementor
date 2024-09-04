import React, { useState, Fragment, useRef } from 'react';
import { createPortal } from 'react-dom';
import { __ } from '@wordpress/i18n';
import { Dialog, Transition } from '@headlessui/react';

import ImportButton from '../import-button';
import Button from '../../../creator/button';
import { XMarkIcon } from '@heroicons/react/24/outline';

const PopupActions = ( {
	item,
	type,
	stepName,
	setInputFieldVisibility,
	cancelButtonRef,
	setVisibility,
	setErrorDesc,
} ) => {
	return (
		<Fragment>
			<div className="wcf-name-your-step__footer bg-primary-25 p-4 mt-6 flex sm:px-6 gap-4 justify-end">
				{ type === 'ready-templates' && (
					<>
						<button
							type="button"
							className="wcf-button wcf-secondary-button"
							onClick={ () => setVisibility( 'hide' ) }
							ref={ cancelButtonRef }
						>
							{ __( 'Cancel', 'cartflows' ) }
						</button>
						<ImportButton
							currentStep={ item }
							stepName={ stepName }
							setInputFieldVisibility={ setInputFieldVisibility }
							setErrorDesc={ setErrorDesc }
						/>
					</>
				) }

				{ type === 'create-your-own' && (
					<Button
						stepName={ stepName }
						setInputFieldVisibility={ setInputFieldVisibility }
						setErrorDesc={ setErrorDesc }
					/>
				) }
			</div>
		</Fragment>
	);
};

const PopupBody = ( {
	setVisibility,
	item,
	type,
	stepName,
	setStepName,
	inputFieldVisibility,
	setInputFieldVisibility,
	cancelButtonRef,
} ) => {
	const [ characterCount, setCharacterCount ] = useState( 0 );
	const [ errorDesc, setErrorDesc ] = useState( '' );

	const handleChange = ( event ) => {
		const { value } = event.target;

		if ( value.length <= 40 ) {
			setCharacterCount( value.length );
			setStepName( value );
		}
	};

	return (
		<div className="wcf-name-your-step--body fixed inset-0 z-20 overflow-y-auto">
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
						<div className="wcf-name-your-step--content bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
							<div className="wcf-name-your-step--header absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
								<button
									type="button"
									className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
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
									className="wcf-name-your-step--title text-base font-medium text-gray-800"
								>
									{ __( 'Name Your Step', 'cartflows' ) }
								</Dialog.Title>
								<div
									className={ `mt-5 ${ inputFieldVisibility }` }
								>
									<div className="flex justify-between py-2">
										<div className="wcf-name-your-step--field-title">
											<label className="flex gap-1 text-base font-normal text-gray-800">
												{ __(
													'Step Name',
													'cartflows'
												) }
												{ /* <span className="text-red-500 align-baseline">
													*
												</span> */ }
											</label>
										</div>
										<div className="wcf-name-your-step--word-count">
											<span
												className={ `text-xs font-normal ${
													40 === characterCount
														? `text-primary-500`
														: `text-gray-400`
												}` }
											>
												{ characterCount }/40
											</span>
										</div>
									</div>
									<input
										type="text"
										className={ `input-field w-full !px-4 !py-2 text-sm font-normal !rounded-md text-gray-400 !border-gray-200 focus:ring focus:!ring-primary-100 focus:!border-primary-500 focus:!shadow-none !outline-0 !outline-none` }
										value={ stepName }
										onChange={ handleChange }
										placeholder={ __(
											'Enter Step Name',
											'cartflows'
										) }
									></input>
								</div>
								{ '' !== errorDesc && (
									<div className="mt-5">
										<p className="text-sm font-regular text-primary-400">
											{ errorDesc }
										</p>
									</div>
								) }
							</div>
						</div>

						<PopupActions
							setVisibility={ setVisibility }
							type={ type }
							stepName={ stepName }
							setStepName={ setStepName }
							item={ item }
							setInputFieldVisibility={ setInputFieldVisibility }
							cancelButtonRef={ cancelButtonRef }
							setErrorDesc={ setErrorDesc }
						/>
					</Dialog.Panel>
				</Transition.Child>
			</div>
		</div>
	);
};

const Popup = ( {
	visibility,
	setVisibility,
	item,
	type,
	stepName,
	setStepName,
} ) => {
	const [ inputFieldVisibility, setInputFieldVisibility ] = useState( '' );
	const cancelButtonRef = useRef( null );

	if ( 'show' !== visibility ) {
		return '';
	}

	return createPortal(
		<div className={ `wcf-name-your-step ${ visibility }` }>
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

					<div className="wcf-name-your-step__inner">
						<PopupBody
							setVisibility={ setVisibility }
							type={ type }
							stepName={ stepName }
							setStepName={ setStepName }
							item={ item }
							inputFieldVisibility={ inputFieldVisibility }
							setInputFieldVisibility={ setInputFieldVisibility }
							cancelButtonRef={ cancelButtonRef }
						/>
					</div>
				</Dialog>
			</Transition.Root>
		</div>,
		document.getElementById( 'wcf-json-importer' )
	);
};

export default Popup;
