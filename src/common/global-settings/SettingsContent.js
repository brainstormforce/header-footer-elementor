import React, { useState } from 'react';
import { useSettingsStateValue } from '@SettingsApp/utils/StateProvider';
import { useSettingsValue } from '@Utils/SettingsProvider';
import apiFetch from '@wordpress/api-fetch';
import { __, sprintf } from '@wordpress/i18n';
import SettingTable from './SettingTable';
import Accordian from '@SettingsComponents/Accordian';
import ReactHtmlParser from 'react-html-parser';
import { ArrowPathIcon, CheckIcon } from '@heroicons/react/24/outline';
import UserRole from './settings-tabs/UserRole';
import { DocField } from '@Admin/fields';

function SettingsContent( props ) {
	const [ { globaldata }, dispatch ] = useSettingsStateValue();
	const [ { license_status }, setSettingsStatus ] = useSettingsValue();

	const isLicenseActivated =
		license_status && 'Activated' === license_status ? true : false;
	const [ isProcessing, setisProcessing ] = useState( false );
	const [ renerate_css_text, setRenerate_css_text ] = useState(
		__( 'Regenerate Now', 'cartflows' )
	);

	const [ defaultText, setDefaultText ] = useState( {
		buttonText: __( 'Reset Permalinks Settings', 'cartflows' ),
		buttonProcess: false,
	} );

	const { buttonText, buttonProcess } = defaultText;

	const activateBtnText = __( 'Activate License', 'cartflows' );
	const deActivateBtnText = __( 'Deactivate License', 'cartflows' );
	const [ licenseKey, setLicenseKey ] = useState( false );

	const [ activateLicenseText, setActivateLicenseText ] = useState( {
		licenseButtonText: ! isLicenseActivated
			? activateBtnText
			: deActivateBtnText,
		licenseActivationProcess: false,
	} );

	const { licenseButtonText, licenseActivationProcess } = activateLicenseText;
	const [ licenseErrors, setLicenseErrors ] = useState( false );
	const [ showDeactivateLicenseBtn, setShowDeactivateLicenseBtn ] =
		useState( isLicenseActivated );

	let settings = [],
		meta_key = '',
		roles = [];

	const regenerateCSS = function ( event ) {
		event.preventDefault();

		setRenerate_css_text( __( ' Regenerating….', 'cartflows' ) );
		setisProcessing( true );

		const formData = new window.FormData();

		formData.append( 'action', 'cartflows_regenerate_css_for_steps' );
		formData.append(
			'security',
			cartflows_admin.regenerate_css_for_steps_nonce
		);

		apiFetch( {
			url: cartflows_admin.ajax_url,
			method: 'POST',
			body: formData,
		} ).then( ( data ) => {
			if ( data.success ) {
				setRenerate_css_text( __( 'Regenerated', 'cartflows' ) );
				setTimeout( () => {
					setRenerate_css_text( __( 'Regenerate Now', 'cartflows' ) );
				}, 3000 );

				setisProcessing( false );
				event.target.blur();
			}
		} );
	};

	const setDefaultPermalinks = function ( e ) {
		e.preventDefault();

		setDefaultText( {
			buttonText: __( 'Updating', 'cartflows' ),
			buttonProcess: 'processing',
		} );

		const formData = new window.FormData();

		formData.append( 'action', 'cartflows_save_global_settings' );
		formData.append(
			'security',
			cartflows_admin.save_global_settings_nonce
		);
		formData.append( 'setting_tab', 'permalink' );
		formData.append( 'reset', true );

		apiFetch( {
			url: cartflows_admin.ajax_url,
			method: 'POST',
			body: formData,
		} ).then( () => {
			apiFetch( { path: '/cartflows/v1/admin/commonsettings/' } ).then(
				( data ) => {
					dispatch( {
						type: 'SET_SETTINGS',
						commondata: data,
					} );
				}
			);

			setDefaultText( {
				buttonText: __( 'Permalinks reset successfully', 'cartflows' ),
				buttonProcess: 'saved',
			} );

			setTimeout( () => {
				setDefaultText( {
					buttonText: __( 'Reset Permalinks Settings', 'cartflows' ),
					buttonProcess: false,
				} );
			}, 3000 );
			// window.location.reload( false );
		} );
	};

	switch ( props.tab ) {
		case 'general':
			settings = globaldata.settings.general;
			meta_key = '_cartflows_common';
			break;
		case 'integrations':
			settings.title = '';
			meta_key = '';
			break;
		case 'permalink':
			settings = globaldata.settings.permalink;
			break;
		case 'other':
			settings = globaldata.settings.other;
			break;
		case 'user_role_manager':
			settings = globaldata.settings.user_role_manager;
			meta_key = '_cartflows_common';
			roles = settings.roles;
			break;
		case 'offer':
			settings = globaldata.settings.offer;
			break;
		case 'license':
			settings = globaldata.settings.license;
			if (
				wcfCartflowsPro() &&
				'license' === props.tab &&
				isLicenseActivated
			) {
				settings.fields[ 'license-field' ].value = licenseKey;
				settings.fields[ 'license-field' ].readonly = true;
				settings.fields[ 'license-field' ].class += ' disabled';
			} else {
				settings.fields[ 'license-field' ].value = '';
			}
			break;
		default:
			settings = globaldata.general;
			meta_key = '_cartflows_common';
			break;
	}

	/**
	 * Ajax call to activate/deactivate the CartFlows PRO license key.
	 *
	 * @param { event } event
	 */
	const activateLicense = function ( event ) {
		event.preventDefault();

		const license_key = document.getElementsByClassName(
			'cartflows-license-key'
		)[ 0 ];

		setLicenseErrors( false );

		if ( license_key && '' === license_key.value ) {
			setLicenseErrors(
				__( 'Please enter a valid license key!', 'cartflows' )
			);
			return;
		}

		const ajax_nonce = event.target.getAttribute( 'data-nonce' );
		let ajax_action = event.target.getAttribute( 'data-action' );

		setActivateLicenseText( {
			licenseButtonText: __( 'Processing', 'cartflows' ),
			licenseActivationProcess: true,
		} );

		if ( 'activate_license' === ajax_action ) {
			ajax_action = 'cartflows_activate_license';
		} else {
			ajax_action = 'cartflows_deactivate_license';
		}

		const formData = new window.FormData();

		formData.append( 'action', ajax_action );
		formData.append( 'license_key', license_key.value );
		formData.append( 'security', ajax_nonce );

		apiFetch( {
			url: cartflows_admin.ajax_url,
			method: 'POST',
			body: formData,
		} ).then( ( data ) => {
			if ( data.success ) {
				event.target.blur();

				if ( 'cartflows_activate_license' === ajax_action ) {
					setShowDeactivateLicenseBtn( true );
					setActivateLicenseText( {
						licenseButtonText: deActivateBtnText,
						licenseActivationProcess: false,
					} );

					setLicenseKey( license_key.value );
					license_key.classList.add( 'disabled' );
					license_key.readOnly = true;
					setSettingsStatus( {
						status: 'UPDATE_LICENSE_STATUS',
						license_status: 'Activated',
					} );
				} else {
					setShowDeactivateLicenseBtn( false );
					setActivateLicenseText( {
						licenseButtonText: activateBtnText,
						licenseActivationProcess: false,
					} );

					setLicenseKey( false );
					license_key.classList.remove( 'disabled' );
					license_key.readOnly = false;
					license_key.value = '';
					setSettingsStatus( {
						status: 'UPDATE_LICENSE_STATUS',
						license_status: 'Deactivated',
					} );
				}
			} else {
				const msg = data.data.error || data.data || '';
				if ( msg ) {
					setLicenseErrors( msg );
				} else {
					setLicenseErrors(
						__(
							'Unknown error occurred while activating the license.',
							'cartflows'
						)
					);
				}
				event.target.blur();
				setActivateLicenseText( {
					licenseButtonText: activateBtnText,
					licenseActivationProcess: false,
				} );
			}
		} );
	};

	return (
		<div className="wcf-general-settings">
			{ settings.title && '' !== settings.title && (
				<div className="wcf-general-settings--heading-wrapper mx-auto max-w-7xl border-b border-gray-200 pb-6">
					<h1 className="wcf-general-settings--heading text-2xl font-semibold text-gray-900">
						{ settings.title }
					</h1>
				</div>
			) }

			{ 'integrations' === props.tab && (
				<div className="mx-auto max-w-7xl wcf-facebook-pixel-setting-wrapper">
					<Accordian
						title={ __( 'Facebook Pixel', 'cartflows' ) }
						settings={ globaldata.settings[ 'facebook-pixel' ] }
						meta_key="_cartflows_facebook"
					/>
					<Accordian
						title={ __( 'Google Analytics Pixel', 'cartflows' ) }
						settings={ globaldata.settings[ 'ga-analytics' ] }
						meta_key="_cartflows_google_analytics"
					/>
					<Accordian
						title={ __( 'Google Auto Address', 'cartflows' ) }
						settings={
							globaldata.settings[ 'g-address-autocomplete' ]
						}
						meta_key="_cartflows_google_auto_address"
					/>
				</div>
			) }
			{ 'other' === props.tab && (
				<div className="mx-auto max-w-7xl">
					<div className="wcf-field wcf-re-generate-css-field">
						<div className="wcf-field__data flex items-center gap-6">
							<div className="wcf-field__data--content-left flex-[0_0_35%]">
								<div className="wcf-field__data--label text-sm font-medium text-left w-80">
									<label>
										{ __(
											'Regenerate Inline CSS',
											'cartflows'
										) }
									</label>
								</div>
							</div>
							<div className="wcf-field__data--content-right">
								<div className="flex justify-center">
									<button
										className="inline-flex gap-1.5 wcf-button wcf-secondary-button"
										onClick={ regenerateCSS }
										type={ 'button' }
									>
										<ArrowPathIcon
											className={ `w-4 h-4 stroke-2 ${
												isProcessing
													? `wcf-processing animate-spin`
													: ``
											} ` }
										/>
										{ renerate_css_text }
									</button>
								</div>
							</div>
						</div>
						<div className="wcf-field__desc text-sm font-normal text-gray-500 my-2">
							{ ReactHtmlParser(
								sprintf(
									// translators: %1$1s: link html start, %2$2s: link html end
									__(
										'If you are using the CartFlows Shortcode and using the Design Settings, then this option will regenerate the steps inline CSS. To learn more, %1$1s Click here %2$2s.',
										'cartflows'
									),
									'<a href="https://cartflows.com/docs/regenerate-the-steps-dynamic-css-for-shortcodes/" target="_blank"></a>',
									'</a>'
								)
							) }
						</div>
					</div>
				</div>
			) }
			{ 'user_role_manager' === props.tab && (
				<UserRole roles={ roles } />
			) }

			{ /* Print the setting only if the fields are available in the setting array. */ }
			{ settings.fields && (
				<div className={ `wcf-general-settings--table-wrapper` }>
					<SettingTable settings={ settings } meta_key={ meta_key } />
				</div>
			) }

			{ 'permalink' === props.tab && (
				<div className="wcf-general-settings__save-button pt-6">
					<button
						name="reset"
						id="reset"
						type="submit"
						className={ `wcf-set-default-permalink wcf-button ${
							'processing' === buttonProcess
								? 'wcf-disabled'
								: 'wcf-secondary-button'
						} inline-flex gap-1.5 items-center rounded-md border brand-border bg-brand-light text-brand px-4 py-2 font-regular shadow-sm focus:outline-none  text-sm button-update-settings` }
						onClick={ setDefaultPermalinks }
					>
						{ 'processing' === buttonProcess && (
							<ArrowPathIcon
								className={ `w-4 h-4 stroke-2 animate-spin` }
							/>
						) }

						{ 'saved' === buttonProcess && (
							<CheckIcon className={ `w-4 h-4 stroke-2` } />
						) }

						{ buttonText }
					</button>
					<DocField
						content={ sprintf(
							// translators: %1$s: link html start, %2$s: link html end
							__(
								'For more information about the CartFlows Permalink settings please %1$sClick here.%2$s',
								'cartflows'
							),
							'<a href="https://cartflows.com/docs/cartflows-permalink-settings/?utm_source=dashboard&utm_medium=free-cartflows&utm_campaign=docs" target="_blank">',
							'</a>'
						) }
					/>
				</div>
			) }

			{ wcfCartflowsPro() && 'license' === props.tab && (
				<div className="wcf-general-settings--footer-wrapper mt-4">
					{ licenseErrors && (
						<div className="license-errors text-primary-500 mb-4">
							{ ReactHtmlParser( licenseErrors ) }
						</div>
					) }

					{ showDeactivateLicenseBtn ? (
						<button
							type="button"
							className="inline-flex justify-center items-center gap-1.5 rounded bg-red-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 cartflows-deactivate-license"
							data-action="deactivate_license"
							data-nonce={
								cartflows_admin.license_deactivation_nonce
							}
							onClick={ activateLicense }
						>
							{ licenseActivationProcess && (
								<ArrowPathIcon
									className={ `w-4 h-4 stroke-2 animate-spin ` }
								/>
							) }

							{ licenseButtonText }
						</button>
					) : (
						<button
							type="button"
							className="wcf-button wcf-secondary-button cartflows-activate-license"
							data-action="activate_license"
							data-nonce={
								cartflows_admin.license_activation_nonce
							}
							onClick={ activateLicense }
						>
							{ licenseActivationProcess && (
								<ArrowPathIcon
									className={ `w-4 h-4 stroke-2 animate-spin ` }
								/>
							) }

							{ licenseButtonText }
						</button>
					) }
				</div>
			) }
		</div>
	);
}

export default SettingsContent;
