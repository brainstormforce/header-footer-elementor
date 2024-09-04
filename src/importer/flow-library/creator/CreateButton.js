// External.
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
import { useState } from 'react';
import apiFetch from '@wordpress/api-fetch';

const createFlow = (
	setCreateButtonTitle,
	flowName,
	isFlowImporting,
	setisFlowImporting,
	isStoreCheckout
) => {
	if ( isFlowImporting ) {
		return;
	}

	setCreateButtonTitle( 'Creating Flow..' );
	setisFlowImporting( true );

	const formData = new window.FormData();
	formData.append( 'action', 'cartflows_create_flow' );
	formData.append( 'security', cartflows_admin.create_flow_nonce );
	formData.append( 'flow_name', flowName );
	formData.append( 'store_checkout', isStoreCheckout );

	apiFetch( {
		url: cartflows_admin.ajax_url,
		method: 'POST',
		body: formData,
	} ).then( ( response ) => {
		console.log( response );
		if ( response.success ) {
			setCreateButtonTitle( __( 'Created! Redirecting…', 'cartflows' ) );
			setisFlowImporting( false );
			setTimeout( () => {
				let path = `admin.php?page=cartflows&path=flows&action=wcf-edit-flow&flow_id=${ response.data.flow_id }`;
				if ( isStoreCheckout ) {
					path =
						'admin.php?page=cartflows&action=wcf-edit-store-checkout';
				}
				window.location = `${ cartflows_admin.admin_base_url + path }`;
			}, 3000 );
		} else {
			setCreateButtonTitle( __( 'Failed to Create Flow!', 'cartflows' ) );
		}
	} );
};

const CreateButton = ( { flowName, isStoreCheckout } ) => {
	const [ createButtonTitle, setCreateButtonTitle ] = useState(
		__( 'Design Your Funnel', 'cartflows' )
	);

	const [ isFlowImporting, setisFlowImporting ] = useState( false );

	return (
		<div className="wcf-name-your-flow__actions">
			<div className="wcf-flow-import__button">
				<button
					className="wcf-button wcf-primary-button"
					onClick={ ( event ) => {
						event.preventDefault();
						const element = jQuery( event.target );
						element
							.closest( '.wcf-name-your-flow__inner' )
							.find( '.input-field' )
							.attr( 'disabled', 'disabled' );
						createFlow(
							setCreateButtonTitle,
							flowName,
							isFlowImporting,
							setisFlowImporting,
							isStoreCheckout
						);
					} }
				>
					{ createButtonTitle }
				</button>
			</div>
		</div>
	);
};

export default compose(
	withSelect( ( select ) => {
		const {
			getFlowsCount,
			getCFProStatus,
			getLicenseStatus,
			getWooCommerceStatus,
		} = select( 'wcf/importer' );
		return {
			flowsCount: getFlowsCount(),
			cf_pro_status: getCFProStatus(),
			license_status: getLicenseStatus(),
			woocommerce_status: getWooCommerceStatus(),
		};
	} )
)( CreateButton );
