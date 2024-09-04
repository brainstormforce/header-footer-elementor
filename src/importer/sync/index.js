import { useState, memo } from 'react';
import Spinner from '../Spinner';
import { sprintf, __ } from '@wordpress/i18n';

import apiFetch from '@wordpress/api-fetch';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

const Title = ( { text } ) => {
	return <span className="wcf-sync__title"> { text }</span>;
};

const Sync = ( props ) => {
	const defaultText = __( 'Sync Library', 'cartflows' );
	const { template } = props;
	const syncTemplate = template || '';

	const [ selfState, selfSetState ] = useState( {
		isProcessing: false,
		buttonText: defaultText,
	} );

	const { isProcessing, buttonText } = selfState;

	// console.log( 'selfState', selfState );

	/**
	 * Update Library Complete
	 */
	const processupdateLibraryComplete = async () => {
		const data = new window.FormData();
		data.append( 'action', 'cartflows_update_library_complete' );
		data.append( 'template', syncTemplate );
		data.append(
			'security',
			cartflows_admin.update_library_complete_nonce
		);

		// Updated UI.
		selfSetState( {
			isProcessing: true,
			buttonText: __( 'Sync Complete', 'cartflows' ),
		} );

		await apiFetch( {
			url: cartflows_admin.ajax_url,
			method: 'POST',
			body: data,
		} )
			.then( ( response ) => {
				console.log( response );

				if ( response.success ) {
					console.log( 'SUCCESS: processupdateLibraryComplete' );

					console.log( '=== SYNC COMPLETE ===' );
					// Updated UI.
					selfSetState( {
						isProcessing: false,
						buttonText: __( 'Sync Complete', 'cartflows' ),
					} );
				} else {
					console.log( 'FAILED: processupdateLibraryComplete' );
				}
			} )
			.catch( ( error ) => {
				console.log( error );
				console.log( 'ERROR: processupdateLibraryComplete' );
			} );
	};

	const processImportSites = async ( i, total ) => {
		const data = new window.FormData();
		data.append( 'action', 'cartflows_import_sites' );
		data.append( 'page_no', i );
		data.append( 'template', syncTemplate );
		data.append( 'security', cartflows_admin.import_sites_nonce );
		await apiFetch( {
			url: cartflows_admin.ajax_url,
			method: 'POST',
			body: data,
		} )
			.then( ( response ) => {
				console.log( response );

				if ( response.success ) {
					console.log( 'SUCCESS: processImportSites' );

					// Updated UI.
					selfSetState( {
						isProcessing: true,
						buttonText: sprintf(
							/* translators: %d is replaced with the condition number */
							__( 'Importing page %d', 'cartflows' ),
							i
						),
					} );

					console.log( 'i === total' );
					console.log( `${ i } === ${ total }` );
					console.log( i === total );

					if ( i === total ) {
						processupdateLibraryComplete();
					}
				} else {
					console.log( 'FAILED: processImportSites' );
				}
			} )
			.catch( ( error ) => {
				console.log( error );
				console.log( 'ERROR: processImportSites' );
			} );
	};

	/**
	 * Request Count
	 */
	const processRequestCount = async () => {
		const data = new window.FormData();
		data.append( 'action', 'cartflows_request_count' );
		data.append( 'template', syncTemplate );
		data.append( 'security', cartflows_admin.request_count_nonce );
		await apiFetch( {
			url: cartflows_admin.ajax_url,
			method: 'POST',
			body: data,
		} )
			.then( async ( response ) => {
				console.log( response );

				if ( response.success ) {
					console.log( 'SUCCESS: processRequestCount' );
					console.log( response );

					// Updated UI.
					selfSetState( {
						isProcessing: true,
						buttonText: 'Importing Pages..',
					} );

					const total = response.data.count;
					console.log( 'total', total );

					for ( let i = 1; i <= total; i++ ) {
						console.log( 'i', i );
						processImportSites( i, total );
					}
				} else {
					console.log( 'FAILED: processRequestCount' );
				}
			} )
			.catch( ( error ) => {
				console.log( error );
				console.log( 'ERROR: processRequestCount' );
			} );
	};

	const processSyncLibrary = async () => {
		console.log( 'Started' );
		try {
			console.log( '=== SYNC STARTED ===' );

			/**
			 * Sync Library
			 */
			const data = new window.FormData();
			data.append( 'action', 'cartflows_sync_library' );
			data.append( 'template', syncTemplate );
			data.append( 'security', cartflows_admin.sync_library_nonce );
			await apiFetch( {
				url: cartflows_admin.ajax_url,
				method: 'POST',
				body: data,
			} )
				.then( ( response ) => {
					console.log( response );

					if ( response.success ) {
						console.log( 'SUCCESS: processSyncLibrary' );

						if ( 'updated' === response.data ) {
							// Updated UI.
							selfSetState( {
								isProcessing: false,
								buttonText: __( 'Library Synced', 'cartflows' ),
							} );
							setTimeout( () => {
								selfSetState( {
									isProcessing: false,
									buttonText: defaultText,
								} );
							}, 5000 );
						} else {
							processRequestCount();
						}
					} else {
						console.log( response );
						console.log( 'FAILED: processSyncLibrary' );
					}
				} )
				.catch( ( error ) => {
					console.log( error );
					console.log( 'ERROR: processSyncLibrary' );
				} );
		} catch ( err ) {
			console.log( 'Complete: Failed' );
			console.log( err );
		}
	};

	return (
		<span
			className="wcf-sync wcf-button wcf-secondary-button"
			onClick={ ( event ) => {
				event.preventDefault();
				// Updated UI.
				selfSetState( {
					isProcessing: true,
					buttonText: __( 'Syncing Library…', 'cartflows' ),
				} );

				// Process sync.
				processSyncLibrary();
			} }
		>
			{ isProcessing ? (
				<Spinner />
			) : (
				<ArrowPathIcon className="w-18 h-18 stroke-1" />
			) }
			<Title text={ buttonText } />
		</span>
	);
};

export default memo( Sync );
