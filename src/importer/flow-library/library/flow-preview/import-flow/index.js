// External.
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
import { useState } from 'react';
import apiFetch from '@wordpress/api-fetch';

// Internal.
import ActivateWooCommerceButton from '../../../../common/ActivateWooCommerceButton';
import InstallWooCommerceButton from '../../../../common/InstallWooCommerceButton';
import ActivateCartflowsPro from '../../../../common/ActivateCartflowsPro';
import UpgradeToCartflowsPro from '../../../../common/UpgradeToCartflowsPro';
import ActivateCartflowsProLink from '../../../../common/activate-cartflows-pro-link';
import Spinner from '../../../../Spinner';
import { useSettingsValue } from '@Utils/SettingsProvider';

const importFlow = ( preview, selfSetState, setError, flowName ) => {
	console.log( preview );

	const formData = new window.FormData();
	formData.append( 'action', 'cartflows_import_flow' );
	formData.append( 'flow_name', flowName );
	formData.append( 'security', cartflows_admin.import_flow_nonce );
	formData.append( 'flow', JSON.stringify( preview ) );

	apiFetch( {
		url: cartflows_admin.ajax_url,
		method: 'POST',
		body: formData,
	} ).then( ( response ) => {
		console.log( response );
		if ( response.success ) {
			// Update UI.
			selfSetState( {
				isProcessing: false,
				buttonText: __( 'Imported! Redirecting…', 'cartflows' ),
			} );

			setTimeout( () => {
				window.location = `${ cartflows_admin.admin_base_url }admin.php?page=cartflows&path=flows&action=wcf-edit-flow&flow_id=${ response.data.new_flow_id }`;
			}, 3000 );
		} else if ( 'call_to_action' in response.data ) {
			setError( {
				cta: response.data.call_to_action,
				error_msg: response.data.message,
			} );
		} else {
			// Update UI.
			selfSetState( {
				isProcessing: false,
				buttonText: response.data.message,
			} );
		}
	} );
};

const ImportFlow = ( {
	preview,
	cf_pro_status,
	woocommerce_status,
	flowName,
	setInputFieldVisibility,
	setErrorDesc,
} ) => {
	const [ error, setError ] = useState( {
		cta: '',
		error_msg: '',
	} );
	const [ { license_status } ] = useSettingsValue();

	const { cta, error_msg } = error;

	const [ selfState, selfSetState ] = useState( {
		isProcessing: false,
		buttonText: __( 'Import Funnel', 'cartflows' ),
	} );
	const { isProcessing, buttonText } = selfState;

	const [ showMessage, setShowMessage ] = useState( false );

	const showErrorMessage = function ( e ) {
		e.preventDefault();

		/* Set show menu true/false */
		if ( showMessage ) {
			triggerCloseMessage();
		} else {
			triggerShowMessage();
		}
	};
	const triggerShowMessage = function () {
		setShowMessage( true );
		document.addEventListener( 'click', triggerCloseMessage );
	};
	const triggerCloseMessage = function () {
		setShowMessage( false );
		document.removeEventListener( 'click', triggerCloseMessage );
	};

	/**
	 * Have any error?
	 */
	if ( cta ) {
		return (
			<>
				<span
					className="wcf-message wcf-message--error"
					dangerouslySetInnerHTML={ { __html: cta } }
				/>

				{ showMessage && (
					<>
						<a
							className="wcf-error-message--toggle"
							onClick={ showErrorMessage }
						>
							{ __( 'Click for more info', 'cartflows' ) }
						</a>
						<div
							className="wcf-error--info"
							dangerouslySetInnerHTML={ { __html: error_msg } }
						/>
					</>
				) }
			</>
		);
	}

	/**
	 * CASE     Is "WooCommerce" Installed and Activated?
	 */
	if ( 'active' !== woocommerce_status ) {
		/**
		 * "WooCommerce" is installed BUT not active?
		 */
		if ( 'inactive' === woocommerce_status ) {
			setInputFieldVisibility( 'hidden' );
			setErrorDesc(
				__(
					'You need WooCommerce plugin installed and activated to import this funnel.',
					'cartflows'
				)
			);
			return <ActivateWooCommerceButton />;
		}
		setInputFieldVisibility( 'hidden' );
		setErrorDesc(
			__(
				'You need WooCommerce plugin installed and activated to import this funnel.',
				'cartflows'
			)
		);
		/**
		 * "WooCommerce" Not installed then show install WooCommerce.
		 */
		return <InstallWooCommerceButton />;
	} else if ( 'active' === woocommerce_status ) {
		setInputFieldVisibility( 'visible' );
		setErrorDesc( '' );
	}

	/**
	 * CASE:    "Cartflows Pro" is not active?
	 * 			And, If importing "Premium Flow"?
	 */

	if ( 'pro' === preview.type ) {
		if ( ! wcfCartflowsTypePro() ) {
			// If plugin is deactivated.
			if (
				'inactive' === cf_pro_status &&
				'pro' === wcfInactivepluginType()
			) {
				setInputFieldVisibility( 'hidden' );
				setErrorDesc(
					__(
						'Access all of our pro templates by activating CartFlows Pro.',
						'cartflows'
					)
				);
				return (
					<ActivateCartflowsPro
						description={ __(
							'Access all of our pro templates by activating CartFlows Pro.',
							'cartflows'
						) }
					/>
				);
			}

			// If plugin is not installed.
			setInputFieldVisibility( 'hidden' );
			setErrorDesc(
				__(
					'Access all of our pro templates when you upgrade your plan to CartFlows Pro today.',
					'cartflows'
				)
			);
			return (
				<UpgradeToCartflowsPro
					title={ __( 'Get CartFlows Pro', 'cartflows' ) }
					desc={ __(
						'Access all of our pro templates when you upgrade your plan to CartFlows Pro today.',
						'cartflows'
					) }
				/>
			);
		} else if ( wcfCartflowsTypePro() && 'Activated' !== license_status ) {
			setInputFieldVisibility( 'hidden' );
			setErrorDesc(
				__(
					'Access all of our pro templates when you activate CartFlows Pro license.',
					'cartflows'
				)
			);
			return (
				<div className="wcf-name-your-flow__actions wcf-pro--required">
					{ /* <div className="wcf-flow-import__message">
						<p>
							{ __(
								'Activate license for adding more flows and other features.',
								'cartflows'
							) }
						</p>
					</div> */ }

					<div className="wcf-flow-import__button">
						<ActivateCartflowsProLink />
					</div>
				</div>
			);
		}
	}

	return (
		<div className="wcf-flow-import__button">
			<button
				className={ `wcf-button ${
					isProcessing ? 'wcf-disabled' : 'wcf-primary-button'
				}` }
				onClick={ ( event ) => {
					event.preventDefault();
					const element = jQuery( event.target );
					element
						.closest( '.wcf-name-your-flow__inner' )
						.find( '.input-field' )
						.attr( 'disabled', 'disabled' );

					if ( isProcessing ) {
						return;
					}

					// Update UI.
					selfSetState( {
						isProcessing: true,
						buttonText: __(
							'Importing Complete Funnel..',
							'cartflows'
						),
					} );

					// Process Import.
					importFlow( preview, selfSetState, setError, flowName );
				} }
			>
				{ isProcessing ? <Spinner /> : '' } { buttonText }
			</button>
		</div>
	);
};

export default compose(
	withSelect( ( select ) => {
		const { getFlowsCount, getCFProStatus, getWooCommerceStatus } =
			select( 'wcf/importer' );
		return {
			flowsCount: getFlowsCount(),
			cf_pro_status: getCFProStatus(),
			woocommerce_status: getWooCommerceStatus(),
		};
	} )
)( ImportFlow );
