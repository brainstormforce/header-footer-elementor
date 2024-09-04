// External.
import { compose } from '@wordpress/compose';
import { withDispatch } from '@wordpress/data';
import { __, sprintf } from '@wordpress/i18n';
import Spinner from '../Spinner';
import { useState } from 'react';
import { activate_plugin } from '../Helper';

const ActivateCartflowsPro = ( { title, updateCFProStatus } ) => {
	const defaultTitle =
		title ||
		sprintf(
			/* translators: %s is replaced with plugin name */
			__( `Activate %s`, 'cartflows' ),
			cartflows_admin.cf_pro_type_inactive
		);

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
							buttonText: sprintf(
								/* translators: %s is replaced with plugin name */
								__( `Activating %s`, 'cartflows' ),
								cartflows_admin.cf_pro_type_inactive
							),
						} );

						const slug = 'cartflows-pro',
							init = 'cartflows-pro/cartflows-pro.php',
							name = 'cartflows-pro';

						// Process activation.
						activate_plugin( {
							slug,
							init,
							name,
						} )
							.then( ( data ) => {
								console.log( data );

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
									updateCFProStatus( 'active' );
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
		const { updateCFProStatus } = dispatch( 'wcf/importer' );
		return {
			updateCFProStatus( cf_pro_status ) {
				updateCFProStatus( cf_pro_status );
			},
		};
	} )
)( ActivateCartflowsPro );
