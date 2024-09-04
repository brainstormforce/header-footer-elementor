import React, { useState } from 'react';
import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';
import classNames from 'classnames';

function RecommendedPluginsBlock() {
	const [ isError, setErrors ] = useState( {
		errorFor: false,
		errorMsg: false,
	} );

	const { errorFor, errorMsg } = isError;

	const getAction = ( status, actionFor = 'plugin' ) => {
		if ( status === 'activated' ) {
			return '';
		} else if ( status === 'installed' || 'inactive' === status ) {
			return 'cartflows_recommended_' + actionFor + '_activate';
		}
		return 'cartflows_recommended_' + actionFor + '_install';
	};

	const getStatusText = function ( status ) {
		let statusText = '';

		switch ( status ) {
			case 'active':
				statusText = __( 'Active', 'cartflows' );
				break;
			case 'inactive':
				statusText = __( 'Activate', 'cartflows' );
				break;
			case 'not-installed':
				statusText = __( 'Install', 'cartflows' );
				break;
			default:
				statusText = __( 'Install', 'cartflows' );
		}

		return statusText;
	};

	const handlePluginActionTrigger = ( e ) => {
		e.preventDefault();

		const action = e.target.dataset.action,
			isPro = e.target.dataset.is_pro,
			pageLink = e.target.dataset.page_link,
			pluginStatus = e.target.dataset.status;

		// Redirect to provided URL if the plugin is PRO & not installed OR activated.
		if (
			'true' === isPro.toLowerCase() &&
			'not-installed' === pluginStatus
		) {
			window.open( pageLink, '_blank', 'noopener,noreferrer' );
			return;
		}

		switch ( action ) {
			case 'cartflows_recommended_plugin_activate':
				activatePlugin( e );
				break;

			case 'cartflows_recommended_plugin_install':
				e.target.innerText = __( 'Installing…', 'cartflows' );

				install_theme_plugins( e, 'install-plugin' );

				break;

			default:
				// Do nothing.
				break;
		}
	};

	const handleThemeActionTrigger = ( e ) => {
		const action = e.target.dataset.action;

		switch ( action ) {
			case 'cartflows_recommended_theme_activate':
				activateTheme( e );
				break;

			case 'cartflows_recommended_theme_install':
				e.target.innerText = __( 'Installing…', 'cartflows' );

				install_theme_plugins( e, 'install-theme' );

				activateTheme( e );
				break;

			default:
				// Do nothing.
				break;
		}
	};

	const install_theme_plugins = ( e, action ) => {
		return new Promise( ( resolve, reject ) => {
			wp.updates.queue.push( {
				action, // Required action.
				data: {
					slug: e.target.dataset.slug,
					success( response ) {
						e.target.innerText = __( 'Installed', 'cartflows' );
						resolve( response, e.target.dataset );
						activatePlugin( e );
					},
					error( response ) {
						reject( response, e.target.dataset );

						e.target.innerText = __( 'Failed', 'cartflows' );

						setErrors( {
							errorFor: `${ e.target.dataset.slug }_error`,
							errorMsg: response?.errorMessage,
						} );

						setTimeout( function () {
							e.target.innerText = __( 'Install', 'cartflows' );

							setErrors( {
								errorFor: false,
								errorMsg: false,
							} );
						}, 1500 );
					},
				},
			} );

			// Required to set queue.
			wp.updates.queueChecker();
		} );
	};

	const activatePlugin = ( e ) => {
		const formData = new window.FormData();
		formData.append( 'action', 'cartflows_activate_plugin' );
		formData.append( 'init', e.target.dataset.init );
		formData.append( 'security', cartflows_admin.activate_plugin_nonce );
		e.target.innerText = __( 'Activating…', 'cartflows' );
		apiFetch( {
			url: cartflows_admin.ajax_url,
			method: 'POST',
			body: formData,
		} ).then( () => {
			e.target.className = '';
			e.target.className =
				'text-green-600 pointer-events-none capitalize text-sm leading-[0.875rem] font-medium rounded-md py-[0.5625rem]';
			e.target.innerText = __( 'Activated', 'cartflows' );
			// window.location = e.target.dataset.redirection;
		} );
	};

	const activateTheme = ( e ) => {
		const formData = new window.FormData();
		formData.append( 'action', 'cartflows_activate_theme' );
		formData.append( 'theme_slug', e.target.dataset.slug );
		formData.append( 'security', cartflows_admin.activate_theme_nonce );
		e.target.innerText = __( 'Activating…', 'cartflows' );

		apiFetch( {
			url: cartflows_admin.ajax_url,
			method: 'POST',
			body: formData,
		} ).then( () => {
			e.target.classList.add(
				'wcf-activated-theme',
				'text-green-600',
				'pointer-events-none',
				'!px-0'
			);
			e.target.classList.remove( 'wcf-button', 'wcf-secondary-button' );
			e.target.innerText = __( 'Activated', 'cartflows' );

			const previousActivatedTheme = document.querySelectorAll(
				'.recommended-themes-wrapper .wcf-activated-theme'
			);

			Array.from( previousActivatedTheme ).forEach( function ( item ) {
				// Skip the current button.
				if ( item === e.target ) {
					return; // Skip the current iteration
				}

				item.innerText = __( 'Activate', 'cartflows' );
				item.classList.remove(
					'wcf-activated-theme',
					'text-green-600',
					'pointer-events-none'
				);
				item.classList.remove( '!px-0' );
				item.classList.add( 'wcf-button', 'wcf-secondary-button' );
			} );
		} );
	};

	const renderPluginsCards = cartflows_admin.integrations.plugins.map(
		( plugin, index ) => {
			return (
				<div
					key={ index }
					className={
						'box-border bg-white relative border rounded-md px-5 py-4 flex items-start gap-x-4 snap-start'
					}
				>
					<div className="flex justify-between gap-1.5">
						<div className="">
							{ plugin.logoPath && (
								<img
									src={ plugin.logoPath.icon_path }
									className="w-10 h-10 min-w-[40px] min-h-[40px]"
									alt={ plugin.title }
								/>
							) }
						</div>

						<div className="ml-3">
							<div className="text-base font-semibold text-gray-900">
								{ plugin.title }
							</div>
							<p className="text-sm font-normal text-gray-600 flex mt-2">
								{ plugin.subtitle }
							</p>
							<div className="mt-4 flex items-center gap-3">
								<button
									data-slug={ plugin.slug }
									data-redirection={ plugin.redirection }
									data-action={ getAction(
										plugin.status,
										'plugin'
									) }
									data-status={ plugin.status }
									data-is_pro={ plugin.isPro }
									data-page_link={ plugin.link }
									data-init={ plugin.path }
									onClick={ handlePluginActionTrigger }
									className={ classNames(
										'active' === plugin.status
											? 'text-green-600 pointer-events-none !px-0'
											: 'wcf-button wcf-secondary-button px-[0.8125rem]',
										'text-sm  py-1.5'
									) }
								>
									{ plugin.isPro &&
									'not-installed' === plugin.status
										? __( "Let's Go", 'cartflows' )
										: getStatusText( plugin.status ) }
								</button>
								{ errorFor === `${ plugin.slug }_error` &&
									errorMsg && (
										<p
											id={ `${ plugin.slug }_error` }
											className="text-xs text-primary-500"
										>
											{ errorMsg }
										</p>
									) }
							</div>
						</div>
					</div>
				</div>
			);
		}
	);

	const renderThemesCards = cartflows_admin.integrations.themes.map(
		( theme, index ) => {
			return (
				<div
					key={ index }
					className={ classNames(
						theme.isPro ? 'bg-slate-50' : 'bg-white',
						'box-border relative border rounded-md px-5 py-4 flex items-start gap-x-4 snap-start'
					) }
				>
					<div className="flex justify-between gap-1.5">
						<div className="">
							{ theme.logoPath && (
								<img
									src={ theme.logoPath.icon_path }
									className="w-10 h-10 min-w-[40px] min-h-[40px]"
									alt={ theme.title }
								/>
							) }
						</div>

						<div className="ml-3">
							<div className="text-base font-semibold text-gray-900">
								{ theme.title }
							</div>
							<p className="text-sm font-normal text-gray-600 flex mt-2">
								{ theme.subtitle }
							</p>
							<div className="mt-4 flex items-center gap-3">
								<button
									data-slug={ theme.slug }
									data-redirection={ theme.redirection }
									data-action={ getAction(
										theme.status,
										'theme'
									) }
									onClick={ handleThemeActionTrigger }
									className={ classNames(
										'active' === theme.status
											? 'wcf-activated-theme text-green-600 pointer-events-none !px-0'
											: 'wcf-button wcf-secondary-button px-[0.8125rem]',
										'text-sm py-1.5'
									) }
								>
									{ getStatusText( theme.status ) }
								</button>

								{ errorFor === `${ theme.slug }_error` &&
									errorMsg && (
										<p
											id={ `${ theme.slug }_error` }
											className="text-xs text-primary-500"
										>
											{ errorMsg }
										</p>
									) }
							</div>
						</div>
					</div>
				</div>
			);
		}
	);

	return (
		<section aria-labelledby="section-1-title h-full">
			<div className="p-8 rounded-md bg-white overflow-hidden shadow-sm flex flex-col justify-center h-full">
				<div className="recommended-plugins-block">
					<div className="relative w-full lg:flex lg:items-center lg:justify-between">
						<span className="font-semibold text-xl leading-6 text-slate-800">
							{ __( 'Recommended Plugins', 'cartflows' ) }
						</span>
					</div>

					<div className="grid grid-flow-row auto-rows-min grid-cols-1 gap-8 sm:grid-cols-3 py-6">
						{ renderPluginsCards }
					</div>
				</div>

				<div className="recommended-themes-block mt-8">
					<div className="relative w-full lg:flex lg:items-center lg:justify-between">
						<span className="font-semibold text-xl leading-6 text-slate-800">
							{ __( 'Recommended Themes', 'cartflows' ) }
						</span>
					</div>

					<div className="grid grid-flow-row auto-rows-min grid-cols-1 gap-8 sm:grid-cols-3 py-6">
						{ renderThemesCards }
					</div>
				</div>
			</div>
		</section>
	);
}

export default RecommendedPluginsBlock;
