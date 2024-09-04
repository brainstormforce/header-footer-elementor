// External.
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { withDispatch } from '@wordpress/data';
import { useState } from 'react';
// Internal Dependencies.
import { activate_plugin } from '../Helper';
import Spinner from '../Spinner';

const ActivateWooCommerceButton = ( { title, updateWooCommerceStatus } ) => {
	const defaultTitle = title || __( 'Activate WooCommerce', 'cartflows' );

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
								'Activating WooCommerce..',
								'cartflows'
							),
						} );

						// Process activation.
						activate_plugin(
							{
								slug: 'woocommerce',
								init: 'woocommerce/woocommerce.php',
								name: 'WooCommerce',
							},
							false
						)
							.then( () => {
								// Update UI.
								selfSetState( {
									isProcessing: false,
									buttonText: __(
										'Successfully Activated!',
										'cartflows'
									),
								} );

								// Update State.
								setTimeout( () => {
									updateWooCommerceStatus( 'active' );
								}, 3000 );
							} )
							.catch( ( data ) => {
								console.log( data );

								// Update UI.
								selfSetState( {
									isProcessing: false,
									buttonText: __(
										'Failed! Activation!',
										'cartflows'
									),
								} );
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
)( ActivateWooCommerceButton );
