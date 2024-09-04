// External.
import { __ } from '@wordpress/i18n';
import { useState } from 'react';
import { compose } from '@wordpress/compose';
import { withDispatch } from '@wordpress/data';

// Internal Dependencies.
import { install_plugin } from '../Helper';
import Spinner from '../Spinner';

const InstallWooCommerceButton = ( { updateWooCommerceStatus } ) => {
	const defaultTitle = __( 'Install WooCommerce', 'cartflows' );

	const [ selfState, selfSetState ] = useState( {
		isProcessing: false,
		buttonText: defaultTitle,
	} );

	const { isProcessing, buttonText } = selfState;

	return (
		<div className="wcf-name-your-flow__actions wcf-pro--required">
			<div className="wcf-flow-import__button">
				<button
					className="wcf-button wcf-primary-button"
					onClick={ ( event ) => {
						event.preventDefault();

						// Updated UI.
						selfSetState( {
							isProcessing: true,
							buttonText: __(
								'Installing WooCommerce..',
								'cartflows'
							),
						} );

						install_plugin( {
							slug: 'woocommerce',
							init: 'woocommerce/woocommerce.php',
							name: 'woocommerce',
						} )
							.then( () => {
								// Update UI.
								selfSetState( {
									isProcessing: false,
									buttonText: __(
										'Successfully Installed!',
										'cartflows'
									),
								} );

								updateWooCommerceStatus( 'inactive' );
							} )
							.catch( ( data ) => {
								console.log( data );

								// Update UI.
								selfSetState( {
									isProcessing: false,
									buttonText: __(
										'Installation Failed!',
										'cartflows'
									),
								} );

								// Update State.
								setTimeout( () => {
									// Update UI.
									selfSetState( {
										isProcessing: false,
										buttonText: defaultTitle,
									} );
								}, 3000 );
							} );
					} }
				>
					{ isProcessing ? <Spinner /> : '' } { buttonText }
				</button>
			</div>
		</div>
	);
};

export default compose(
	withDispatch( ( dispatch ) => {
		const { updateWooCommerceStatus } = dispatch( 'wcf/importer' );
		return {
			updateWooCommerceStatus( woocommerce_status ) {
				updateWooCommerceStatus( woocommerce_status );
			},
		};
	} )
)( InstallWooCommerceButton );
