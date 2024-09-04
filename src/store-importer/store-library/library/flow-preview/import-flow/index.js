// External.
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
import { useState } from 'react';
import apiFetch from '@wordpress/api-fetch';

// Internal.
import ActivateWooCommerceButton from '@Admin/importer/common/ActivateWooCommerceButton';
import InstallWooCommerceButton from '@Admin/importer/common/InstallWooCommerceButton';
import ActivateCartflowsPro from '@Admin/importer/common/ActivateCartflowsPro';
import UpgradeToCartflowsPro from '@Admin/importer/common/UpgradeToCartflowsPro';
import ActivateCartflowsProLink from '@Admin/importer/common/activate-cartflows-pro-link';
import ErrorPopup from '@Admin/store-importer/store-library/library/error-popup';
import { Spinner } from '@Admin/fields';
import { useSettingsValue } from '@Utils/SettingsProvider';

const importFlow = (
	preview,
	selfSetState,
	flowName,
	isStoreCheckout,
	cf_pro_status,
	woocommerce_status,
	setVisibility,
	setErrorMessage,
	setTitle,
	showErrorMessage,
	showMessage
) => {
	/**
	 * CASE     Is "WooCommerce" Installed and Activated?
	 */
	if ( 'active' !== woocommerce_status ) {
		/**
		 * "WooCommerce" is installed BUT not active?
		 */
		if ( 'inactive' === woocommerce_status ) {
			setErrorMessage( <ActivateWooCommerceButton /> );
			setVisibility( 'show ' );
			return;
		}
		/**
		 * "WooCommerce" Not installed then show install WooCommerce.
		 */
		setErrorMessage( <InstallWooCommerceButton /> );
		setVisibility( 'show ' );
		return;
	}

	// Update UI.
	selfSetState( {
		isProcessing: true,
		buttonText: 'Importing Complete Funnel..',
	} );

	const formData = new window.FormData();
	formData.append( 'action', 'cartflows_import_flow' );
	formData.append( 'flow_name', flowName );
	formData.append( 'security', cartflows_admin.import_flow_nonce );
	formData.append( 'flow', JSON.stringify( preview ) );
	formData.append( 'store_checkout', isStoreCheckout );

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
				buttonText: 'Imported! Redirecting...',
			} );
			setTimeout( () => {
				let path = `admin.php?page=cartflows&path=flows&action=wcf-edit-flow&flow_id=${ response.data.new_flow_id }`;
				if ( isStoreCheckout ) {
					path = `admin.php?page=cartflows&path=store-checkout&action=wcf-edit-flow&flow_id=${ response.data.new_flow_id }`;
				}
				window.location = `${ cartflows_admin.admin_base_url + path }`;
			}, 3000 );
		} else if ( 'call_to_action' in response.data ) {
			setErrorMessage(
				<>
					<span
						className="wcf-message wcf-message--error"
						dangerouslySetInnerHTML={ {
							__html: response.data.call_to_action,
						} }
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
								dangerouslySetInnerHTML={ {
									__html: response.data.message,
								} }
							/>
						</>
					) }
				</>
			);
			setVisibility( 'show ' );
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
	isStoreCheckout,
} ) => {
	const [ { license_status } ] = useSettingsValue();
	const [ selfState, selfSetState ] = useState( {
		isProcessing: false,
		buttonText: 'Import Funnel',
	} );
	const { isProcessing, buttonText } = selfState;

	const [ showMessage, setShowMessage ] = useState( false );
	const [ visibility, setVisibility ] = useState( 'hide' );
	const [ errorMessage, setErrorMessage ] = useState( '' );
	const [ title, setTitle ] = useState( '' );

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
	 * CASE     Is "Cartflows Pro" Installed and Activated?
	 */
	if ( 'pro' === preview.type ) {
		if ( ! wcfCartflowsTypePro() ) {
			// If plugin is deactive.
			if (
				'inactive' === cf_pro_status &&
				'pro' === wcfInactivepluginType()
			) {
				return <ActivateCartflowsPro />;
			}

			// If plugin is not installed.
			return <UpgradeToCartflowsPro />;
		} else if ( wcfCartflowsTypePro() && 'Activated' !== license_status ) {
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
		<>
			<ErrorPopup
				visibility={ visibility }
				setVisibility={ setVisibility }
				errorMessage={ errorMessage }
				title={ title }
			/>
			<div className="wcf-flow-import__button wcf-store-checkout-import__button">
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

						// Process Import.
						importFlow(
							preview,
							selfSetState,
							flowName,
							isStoreCheckout,
							cf_pro_status,
							woocommerce_status,
							setVisibility,
							setErrorMessage,
							setTitle,
							showErrorMessage,
							showMessage
						);
					} }
				>
					{ isProcessing ? <Spinner /> : '' } { buttonText }
				</button>
			</div>
		</>
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
