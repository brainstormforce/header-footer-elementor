import React, { Fragment, useState, useRef } from 'react';
import { __, sprintf } from '@wordpress/i18n';
import { Dialog, Transition } from '@headlessui/react';
import apiFetch from '@wordpress/api-fetch';
import {
	XMarkIcon,
	CloudArrowUpIcon,
	DocumentTextIcon,
} from '@heroicons/react/24/outline';
import classnames from 'classnames';
import { Spinner } from '@Admin/fields';

const FlowJsonImporter = () => {
	const [ open, setOpen ] = useState( false );

	const cancelButtonRef = useRef( null );
	const [ selfState, selfSetState ] = useState( {
		selectedFile: '',
		processText: __( 'Import Funnel', 'cartflows' ),
		process: false,
	} );

	const { selectedFile, process } = selfState;

	function onFileChange( event ) {
		// Updated UI.
		selfSetState( {
			...selfState,
			selectedFile: event.target.files[ 0 ],
		} );
	}

	function onFileSubmit() {
		if ( ! selectedFile || process ) {
			return;
		}
		if ( 'application/json' !== selectedFile.type ) {
			alert( __( 'Please select the valid json file.', 'cartflows' ) );
			return;
		}
		// Updated UI.
		selfSetState( {
			...selfState,
			process: true,
			processText: __( 'Importing..', 'cartflows' ),
		} );

		// Details of the uploaded file
		console.log( selectedFile );

		const fileReader = new FileReader();
		fileReader.readAsText( selectedFile, 'UTF-8' );
		fileReader.onload = ( e ) => {
			console.log( 'e.target.result', e.target.result );
			let flow_data = e.target.result;

			if ( typeof flow_data === 'string' ) {
				try {
					// Try to parse the data
					flow_data = JSON.parse( flow_data );

					// If successful, it means the data was a valid JSON string.
					console.log( 'Data is a valid JSON string:', flow_data );
				} catch ( error ) {
					// If an error occurs, it means the data was not a valid JSON string.
					console.error( 'Error parsing JSON:', error );
				}
			}

			const formData = new window.FormData();

			formData.append( 'action', 'cartflows_import_json_flow' );
			formData.append(
				'security',
				cartflows_admin.import_json_flow_nonce
			);
			formData.append( 'flow_data', flow_data );

			apiFetch( {
				url: cartflows_admin.ajax_url,
				method: 'POST',
				body: formData,
			} ).then( ( response ) => {
				console.log( response );
				// Updated UI.
				selfSetState( {
					...selfState,
					processText: 'Redirecting..',
					process: false,
				} );
				window.location = response.data.redirect_url;
			} );
		};
	}

	function closePopup() {
		selfSetState( {
			...selfState,
			selectedFile: '',
		} );
		setOpen( false );
	}

	const [ dragActive, setDragActive ] = React.useState( false );

	// handle drag events
	const handleDrag = function ( e ) {
		e.preventDefault();
		e.stopPropagation();
		if ( e.type === 'dragenter' || e.type === 'dragover' ) {
			setDragActive( true );
		} else if ( e.type === 'dragleave' ) {
			setDragActive( false );
		}
	};

	// triggers when file is dropped
	const handleDrop = function ( e ) {
		e.preventDefault();
		e.stopPropagation();
		setDragActive( false );
		if ( e.dataTransfer.files && e.dataTransfer.files[ 0 ] ) {
			selfSetState( {
				...selfState,
				selectedFile: e.dataTransfer.files[ 0 ],
			} );
		}
	};

	return (
		<>
			<span
				className="wcf-button wcf-secondary-button wcf-flows-sub-header__import"
				onClick={ () => {
					setOpen( ! open );
				} }
			>
				<CloudArrowUpIcon
					className="w-18 h-18 stroke-2 stroke-primary-500 fill-none"
					aria-hidden="true"
				/>
				<span className="wcf-flows-header__text">
					{ __( 'Import', 'cartflows' ) }
				</span>
			</span>
			<Transition.Root show={ open } as={ Fragment }>
				<Dialog
					as="div"
					className="relative z-20"
					initialFocus={ cancelButtonRef }
					onClose={ setOpen }
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
								<Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
									<div className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block">
										<button
											type="button"
											className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
											onClick={ closePopup }
										>
											<span className="sr-only">
												Close
											</span>
											<XMarkIcon
												className="h-6 w-6"
												aria-hidden="true"
											/>
										</button>
									</div>
									<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
										<div className="sm:flex sm:items-start">
											<div className="mt-3 text-center sm:mt-0 sm:text-left">
												<Dialog.Title
													as="h3"
													className="text-lg font-medium leading-6 text-gray-900"
												>
													{ __(
														'Import funnel',
														'cartflows'
													) }
												</Dialog.Title>
												<div className="mt-4">
													<p className="text-sm text-gray-500">
														{ __(
															'You can specify a file to import by either dragging it into the drag and drop area.(Maximum file size of 5MB; .json file extensions only.)',
															'cartflows'
														) }
													</p>
												</div>
											</div>
										</div>
									</div>
									<form
										method="post"
										encType="multipart/form-data"
										onDragEnter={ handleDrag }
									>
										<div className="p-6 pt-0">
											<div className="flex items-center justify-center w-full">
												<label
													htmlFor="dropzone-file"
													className={ classnames(
														'flex flex-col items-center justify-center w-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:border-gray-400',
														dragActive
															? 'bg-white' // Add CSS as if required.
															: ''
													) }
												>
													<div className="flex flex-col items-center justify-center pt-5 pb-6">
														<svg
															xmlns="http://www.w3.org/2000/svg"
															fill="none"
															viewBox="0 0 24 24"
															strokeWidth="1.5"
															stroke="currentColor"
															className="w-6 h-6 text-gray-400"
															aria-hidden="true"
														>
															<path
																strokeLinecap="round"
																strokeLinejoin="round"
																d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
															/>
														</svg>
														<p className="mt-2 block text-sm font-medium text-gray-800">
															<span className="font-semibold">
																{ selectedFile
																	? __(
																			'Change a file',
																			'cartflows'
																	  )
																	: __(
																			'Upload a file',
																			'cartflows'
																	  ) }
															</span>{ ' ' }
															{ __(
																'or drag and drop',
																'cartflows'
															) }
														</p>
														<p className="mt-2 block text-xs font-normal text-gray-600">
															{ __(
																'JSON file up to 5MB',
																'cartflows'
															) }
														</p>
													</div>
													<input
														id="dropzone-file"
														type="file"
														className="hidden"
														accept="application/JSON"
														name="file"
														onChange={
															onFileChange
														}
													/>
												</label>
											</div>
											{ selectedFile && (
												<div className="rounded-md bg-green-50 p-4 mt-5">
													<div className="flex items-center justify-between">
														<div className="wcf-import-flow--file-info flex items-center gap-1">
															<div className="flex-shrink-0">
																<DocumentTextIcon
																	className="w-6 h-6 text-gray-400"
																	aria-hidden="true"
																/>
															</div>
															<div className="wcf-import-flow--message">
																<p className="text-sm font-medium text-green-800">
																	{ sprintf(
																		/* translators: %s is replaced with the file name. */
																		__(
																			'File Selected: %s',
																			'cartflows'
																		),
																		selectedFile.name
																	) }
																</p>
															</div>
														</div>
														<div className="wcf-import-flow--close-btn">
															<div className="-mx-1.5 -my-1.5">
																<button
																	type="button"
																	className="inline-flex rounded-md bg-green-50 p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
																	onClick={ () => {
																		const input =
																			document.getElementById(
																				'dropzone-file'
																			);
																		input.value =
																			null;
																		selfSetState(
																			{
																				...selfState,
																				selectedFile:
																					null,
																			}
																		);
																	} }
																>
																	<span className="sr-only">
																		Dismiss
																	</span>
																	<XMarkIcon
																		className="h-5 w-5"
																		aria-hidden="true"
																	/>
																</button>
															</div>
														</div>
													</div>
												</div>
											) }
										</div>

										<div className="bg-gray-50 px-4 py-3 sm:flex sm:px-6 gap-3 justify-end">
											<button
												type="button"
												className="wcf-button wcf-secondary-button"
												onClick={ closePopup }
											>
												{ __( 'Cancel', 'cartflows' ) }
											</button>
											<button
												type="button"
												className={ `wcf-button ${
													process
														? 'wcf-disabled'
														: 'wcf-primary-button'
												}` }
												onClick={ onFileSubmit }
											>
												{ process && <Spinner /> }
												{ selfState.processText }
											</button>
										</div>
										{ dragActive && (
											<div
												className="absolute w-full h-full rounded-2xl inset-0"
												onDragEnter={ handleDrag }
												onDragLeave={ handleDrag }
												onDragOver={ handleDrag }
												onDrop={ handleDrop }
											></div>
										) }
									</form>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</Dialog>
			</Transition.Root>
		</>
	);
};

export default FlowJsonImporter;
