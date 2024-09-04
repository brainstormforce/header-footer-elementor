import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { __ } from '@wordpress/i18n';
import FlowJsonImporter from '../../../json-importer';
import apiFetch from '@wordpress/api-fetch';
import { CloudArrowDownIcon, PlusIcon } from '@heroicons/react/24/outline';

import classnames from 'classnames';

function FlowsHeader( props ) {
	const { flows_count } = props;

	const [ exportAction, setExportAction ] = useState( {
		isProcessing: false,
		buttonText: __( 'Export All', 'cartflows' ),
	} );

	const { isProcessing, buttonText } = exportAction;

	const exportAll = function ( e ) {
		e.preventDefault();

		setExportAction( {
			isProcessing: true,
			buttonText: __( 'Exporting…', 'cartflows' ),
		} );

		const formData = new window.FormData();

		formData.append( 'action', 'cartflows_export_all_flows' );
		formData.append( 'security', cartflows_admin.export_all_flows_nonce );

		apiFetch( {
			url: cartflows_admin.ajax_url,
			method: 'POST',
			body: formData,
		} ).then( ( response ) => {
			if ( response.success ) {
				const newDate = new Date();

				const fileName =
					'cartflows-flows-export-' +
					newDate.getDate() +
					'-' +
					( newDate.getMonth() + 1 ) +
					'-' +
					newDate.getFullYear() +
					'.json';

				if ( response.data.export ) {
					const flowData = JSON.stringify( response.data.flows );
					const fileType = 'application/json';

					const tempFile = new Blob( [ flowData ], {
						type: fileType,
					} );
					const isIE = false || !! document.documentMode;
					if ( isIE ) {
						window.navigator.msSaveOrOpenBlob( tempFile, fileName );
					} else {
						const anchor = document.createElement( 'a' );
						anchor.href = URL.createObjectURL( tempFile );
						anchor.download = fileName;
						anchor.click();
					}
					setExportAction( {
						isProcessing: false,
						buttonText: __( 'Export All', 'cartflows' ),
					} );
				}
			}
		} );
	};
	return (
		<div className="bg-white px-8 py-6 flex justify-between items-center mb-9 -m-8">
			<h2 className="text-2xl font-bold text-grey-800">
				{ __( 'Funnels', 'cartflows' ) }
			</h2>
			<div className="wcf-flows-header__action-buttons flex gap-4">
				<FlowJsonImporter />
				<span
					className={ classnames(
						'wcf-button wcf-flows-sub-header__export',
						flows_count > 0
							? 'wcf-secondary-button'
							: 'wcf-disabled',
						isProcessing ? 'wcf-button--processing' : ''
					) }
					onClick={ flows_count > 0 ? exportAll : () => {} }
				>
					<CloudArrowDownIcon className="w-18 h-18 stroke-2" />
					<span className="wcf-flows-header__text">
						{ isProcessing
							? buttonText
							: __( 'Export All', 'cartflows' ) }{ ' ' }
						{ '(' + flows_count + ')' }
					</span>
				</span>
				<span className="divider w-px bg-gray-200"></span>
				<Link
					key="importer"
					to={ {
						pathname: 'admin.php',
						search: `?page=cartflows&path=library`,
					} }
					className="wcf-flows-header__library wcf-button wcf-primary-button"
				>
					<PlusIcon className="w-18 h-18 stroke-2" />
					<span className="wcf-flows-header__text">
						{ __( 'Create new funnel', 'cartflows' ) }
					</span>
				</Link>
			</div>
		</div>
	);
}

export default FlowsHeader;
