import React, { useState } from 'react';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';

function Developers() {
	const logs = cartflows_admin?.logs;
	const [ fileContent, setFileContent ] = useState(
		cartflows_admin.file_content
	);
	const [ currentLog, setCurrentLog ] = useState( cartflows_admin.log_key );

	const setCurrentLogValue = function ( e ) {
		setCurrentLog( e.target.value );
	};

	const showLog = function ( e ) {
		e.preventDefault();
		const formData = new window.FormData();

		formData.append( 'action', 'cartflows_show_cf_log' );
		formData.append( 'security', cartflows_admin.show_cf_log_nonce );
		formData.append( 'log_key', currentLog );
		apiFetch( {
			url: cartflows_admin.ajax_url,
			method: 'POST',
			body: formData,
		} ).then( ( response ) => {
			setFileContent( response.log_content );
		} );
	};

	async function copyToClipboard( textToCopy ) {
		// Navigator clipboard api needs a secure context (https)
		if ( navigator.clipboard && window.isSecureContext ) {
			await navigator.clipboard.writeText( textToCopy );
		} else {
			// Use the 'out of viewport hidden text area' trick
			const textArea = document.createElement( 'textarea' );
			textArea.value = textToCopy;

			// Move textarea out of the viewport so it's not visible
			textArea.style.position = 'absolute';
			textArea.style.left = '-999999px';

			document.body.prepend( textArea );
			textArea.select();

			try {
				document.execCommand( 'copy' );
			} catch ( error ) {
				console.error( error );
			} finally {
				textArea.remove();
			}
		}
	}

	const copyLog = async ( e ) => {
		try {
			await copyToClipboard( fileContent );
			console.log( 'Text copied to the clipboard!' );
			e.target.innerText = __( 'Copied', 'cartflows' );

			setTimeout( function () {
				e.target.innerText = __( 'Copy', 'cartflows' );
			}, 1000 );
		} catch ( error ) {
			console.error( error );
		}
	};

	const deleteLog = function ( e ) {
		e.preventDefault();
		const formData = new window.FormData();
		e.target.innerText = __( 'Deleting', 'cartflows' );
		formData.append( 'action', 'cartflows_delete_cf_log' );
		formData.append( 'security', cartflows_admin.delete_cf_log_nonce );
		formData.append( 'log_key', logs[ currentLog ] );
		apiFetch( {
			url: cartflows_admin.ajax_url,
			method: 'POST',
			body: formData,
		} ).then( () => {
			e.target.innerText = __( 'Deleted', 'cartflows' );
			window.location.reload();
		} );
	};

	const downloadLog = function ( e ) {
		e.preventDefault();
		const formData = new window.FormData();
		e.target.innerText = __( 'Downloading', 'cartflows' );

		formData.append( 'action', 'cartflows_download_cf_log' );
		formData.append( 'security', cartflows_admin.download_cf_log_nonce );
		formData.append( 'log_key', logs[ currentLog ] );
		apiFetch( {
			url: cartflows_admin.ajax_url,
			method: 'POST',
			body: formData,
		} ).then( ( response ) => {
			const resData = response.data.file_content,
				fileType = 'text/log',
				fileName = logs[ currentLog ],
				tempFile = new Blob( [ resData ], { type: fileType } ),
				isIE = false || !! document.documentMode;

			if ( isIE ) {
				window.navigator.msSaveOrOpenBlob( tempFile, fileName );
			} else {
				const anchor = document.createElement( 'a' );
				anchor.href = URL.createObjectURL( tempFile );
				anchor.download = fileName;
				anchor.click();
			}
			e.target.innerText = __( 'Download', 'cartflows' );
		} );
	};

	return (
		<>
			<div className="h-full">
				<main className="mx-auto">
					<div className="">
						<div className="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
							<section aria-labelledby="payment-details-heading">
								<div className="shadow sm:overflow-hidden sm:rounded-md">
									<div className="bg-white px-4 py-6 sm:p-6">
										{ Object.keys( logs ).length === 0 && (
											<h2 className="text-lg font-medium leading-6 text-gray-900 ml-0 my-auto">
												{ __(
													'No CartFlows Logs Found.',
													'cartflows'
												) }
											</h2>
										) }
										{ Object.keys( logs ).length > 0 && (
											<>
												<div className="flex justify-between pb-6 border-b-2">
													<h2
														id="payment-details-heading"
														className="text-lg font-medium leading-6 text-gray-900 ml-0 my-auto"
													>
														{ __(
															'CartFlows Logs',
															'cartflows'
														) }
													</h2>
													<form onSubmit={ showLog }>
														<select
															name="log_file"
															className="px-4 !py-1 !max-w-lg"
															onChange={
																setCurrentLogValue
															}
														>
															{ Object.keys(
																logs
															).map( ( log ) => {
																return (
																	<option
																		value={
																			log
																		}
																		key={
																			log
																		}
																	>
																		{
																			logs[
																				log
																			]
																		}
																	</option>
																);
															} ) }
														</select>
														<button
															type="submit"
															className="wcf-button wcf-secondary-button ml-3"
															value="__( 'View', 'cartflows' )"
														>
															{ __(
																'View',
																'cartflows'
															) }{ ' ' }
														</button>
													</form>
												</div>

												<div className="">
													<div className="py-5 flex justify-end gap-x-3">
														<button
															className="wcf-button wcf-secondary-button"
															onClick={ copyLog }
														>
															{ __(
																'Copy',
																'cartflows'
															) }
														</button>
														<button
															className="wcf-button wcf-secondary-button"
															onClick={
																downloadLog
															}
														>
															{ __(
																'Download',
																'cartflows'
															) }
														</button>
														<button
															className="wcf-button wcf-secondary-button"
															onClick={
																deleteLog
															}
														>
															{ __(
																'Delete',
																'cartflows'
															) }
														</button>
													</div>
													<div className="break-all leading-normal text-left bg-white p-4 rounded-sm overflow-y-auto max-h-96 my-5 mx-auto">
														<pre
															id="wcf-log--text"
															className="wcf-log--text contents whitespace-pre-wrap"
														>
															{ fileContent }
														</pre>
													</div>
												</div>
											</>
										) }
									</div>
								</div>
							</section>
						</div>
					</div>
				</main>
			</div>
		</>
	);
}

export default Developers;
