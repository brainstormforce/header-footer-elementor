import React, { useState } from 'react';
import { Container, Button, Dialog } from '@bsf/force-ui';
import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';

const ExtendOnboardingWidget = ( {
	plugin,
	setUpdateCounter, // Receive setUpdateCounter as a prop
	onPluginSelect, // New prop to handle plugin selection
} ) => {
	const {
		path,
		slug,
		siteUrl,
		icon,
		type,
		name,
		zipUrl,
		desc,
		wporg,
		isFree,
		action,
		status,
		settings_url,
	} = plugin;
	const [ isDialogOpen, setIsDialogOpen ] = useState( false );
	const [ pluginData, setPluginData ] = useState( null );
	const [ isChecked, setIsChecked ] = useState( false );

	const handleCheckboxChange = ( e ) => {
		// Make sure e and e.target exist before accessing properties
		const isCheckedValue = e.target.checked;
		setIsChecked( isCheckedValue );

		// Call the parent component's function to track selected plugins
		if ( onPluginSelect ) {
			onPluginSelect( {
				slug,
				path,
				type,
				name,
				zipUrl,
				status,
				isChecked: isCheckedValue,
			} );
		}
	};

	const getAction = ( status ) => {
		if ( status === 'Activated' ) {
			return 'site_redirect';
		} else if ( status === 'Installed' ) {
			return 'hfe_recommended_plugin_activate';
		}
		return 'hfe_recommended_plugin_install';
	};

	const handlePluginAction = ( e ) => {
		const action = e.currentTarget.dataset.action;
		const formData = new window.FormData();
		const currentPluginData = {
			init: e.currentTarget.dataset.init,
			type: e.currentTarget.dataset.type,
			slug: e.currentTarget.dataset.slug,
			name: e.currentTarget.dataset.pluginname,
		};

		switch ( action ) {
			case 'hfe_recommended_plugin_activate':
				// Confirmation only for theme activation
				if ( currentPluginData.type === 'theme' ) {
					// Show dialog for confirmation
					setPluginData( currentPluginData );
					setIsDialogOpen( true );
				} else {
					// Directly activate for non-theme plugins
					activatePlugin( currentPluginData );
				}
				break;

			case 'hfe_recommended_plugin_install':

				// Installation process without any confirmation
				formData.append(
					'action',
					currentPluginData.type === 'theme'
						? 'hfe_recommended_theme_install'
						: 'hfe_recommended_plugin_install',
				);
				formData.append( '_ajax_nonce', hfe_admin_data.installer_nonce );
				formData.append( 'slug', currentPluginData.slug );

				e.target.innerText = __( 'Installing..', 'header-footer-elementor' );

				apiFetch( {
					url: hfe_admin_data.ajax_url,
					method: 'POST',
					body: formData,
				} ).then( ( data ) => {
					if ( data.success || data.errorCode === 'folder_exists' ) {
						e.target.innerText = __( 'Installed', 'header-footer-elementor' );
						if ( currentPluginData.type === 'theme' ) {
							// Change button state to "Activate" after successful installation
							const buttonElement = document.querySelector( `[data-slug="${ currentPluginData.slug }"]` );
							buttonElement.dataset.action = 'hfe_recommended_plugin_activate';
							e.target.innerText = __( 'Activate', 'header-footer-elementor' );
						} else {
							activatePlugin( currentPluginData );
						}
					} else {
						e.target.innerText = __( 'Install', 'header-footer-elementor' );
						alert(
							currentPluginData.type === 'theme'
								? __( 'Theme Installation failed, Please try again later.', 'header-footer-elementor' )
								: __( 'Plugin Installation failed, Please try again later.', 'header-footer-elementor' ),
						);
					}
				} );
				break;

			case 'site_redirect':
				window.open( siteUrl, '_blank' ); // Open siteUrl in a new tab
				break;

			default:
				// Do nothing.
				break;
		}
	};

	const activatePlugin = ( pluginData ) => {
		setIsDialogOpen( false );
		const formData = new window.FormData();
		formData.append( 'action', 'hfe_recommended_plugin_activate' );
		formData.append( 'nonce', hfe_admin_data.nonce );
		formData.append( 'plugin', pluginData.init );
		formData.append( 'type', pluginData.type );
		formData.append( 'slug', pluginData.slug );

		const buttonElement = document.querySelector( `[data-slug="${ pluginData.slug }"]` );
		const spanElement = buttonElement.querySelector( 'span' );

		spanElement.innerText = __( 'Activating..', 'header-footer-elementor' );

		apiFetch( {
			url: hfe_admin_data.ajax_url,
			method: 'POST',
			body: formData,
		} ).then( ( data ) => {
			if ( data.success ) {
				if ( spanElement ) { // Check if spanElement is not null
					buttonElement.style.color = '#16A34A';
					buttonElement.dataset.action = 'site_redirect';
					buttonElement.classList.add( 'hfe-plugin-activated' );
					spanElement.innerText = __( 'Activated', 'header-footer-elementor' );
					window.open( settings_url, '_blank' );
					setTimeout( () => {
						// Reload the section or recall the REST API
						setUpdateCounter( ( prev ) => prev + 1 );
					}, 5000 );
				}
			} else {
				if ( 'theme' == pluginData.type ) {
					// console.log(__(`Theme Activation failed, Please try again later.`, 'header-footer-elementor'));
				} else {
					// console.log(__(`Plugin Activation failed, Please try again later.`, 'header-footer-elementor'));
				}
				const buttonElement = document.querySelector( `[data-slug="${ pluginData.slug }"]` );
				if ( buttonElement ) { // Check if buttonElement is not null
					const spanElement = buttonElement.querySelector( 'span' );
					if ( spanElement ) { // Check if spanElement is not null
						spanElement.innerText = __( 'Activate', 'header-footer-elementor' );
					}
				}
			}
		} );
	};

	return (
		<>
			<style>
				{ `
                    .uae-role-checkbox {
                        position: relative;
                        width: 30px;
                        height: 30px;
                        -webkit-appearance: none;
                        appearance: none;
                        border: 2px solid #d1d5db; /* gray-300 */
                        border-radius: 4px;
                        cursor: pointer;
                    }

                    .uae-role-checkbox:checked {
                        background-color: #240064;
                        border-color: #0017E1;
                    }

                    .uae-role-checkbox:checked::after {
                        content: '';
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        width: 4px;
                        height: 8px;
                        border-right: 2px solid #fff;
                        border-bottom: 2px solid #fff;
                        transform: translate(-50%, -60%) rotate(45deg);
                    }
                ` }
			</style>
			<Container align="center"
				containerType="flex"
				direction="row"
				justify="between"
				gap="md"
			>
				<div
					className="flex items-center gap-x-3 flex-1 cursor-pointer"
					onClick={ ( e ) => {
						// Prevent checkbox toggle if clicking on the link
						if ( e.target.closest( 'p.text-sm.font-medium' ) ) {
							return;
						}
						// Toggle checkbox
						const newCheckedState = ! isChecked;
						setIsChecked( newCheckedState );

						// Call the parent component's function to track selected plugins
						if ( onPluginSelect ) {
							onPluginSelect( {
								slug,
								path,
								type,
								name,
								zipUrl,
								status,
								isChecked: newCheckedState,
							} );
						}
					} }
				>
					<div className="h-6 w-6 flex-shrink-0">
						<img
							src={ icon }
							alt="Recommended Plugins/Themes"
							className="w-full h-auto rounded"
							style={ { width: '24px', height: '24px' } }
						/>
					</div>

					<div className="flex flex-col pl-3 flex-1 min-w-0">
						<p
							className="text-sm font-medium text-text-primary pb-1 m-0 cursor-pointer truncate"
							style={ { width: '230px' } }
							onClick={ ( e ) => {
								e.stopPropagation();
								window.open( plugin.siteurl, '_blank' );
							} }
						>{ __( name, 'header-footer-elementor' ) }</p>
						<p className="text-sm font-normal text-text-tertiary m-0 truncate">{ __( desc, 'header-footer-elementor' ) }</p>
					</div>

					<div className="flex-shrink-0 ml-2">
						<input
							type="checkbox"
							checked={ isChecked }
							onChange={ handleCheckboxChange }
							onClick={ ( e ) => e.stopPropagation() }
							id={ `plugin-${ slug }` }
							className="uae-role-checkbox h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
							data-plugin={ zipUrl }
							data-type={ type }
							data-pluginname={ name }
							data-slug={ slug }
							data-site={ siteUrl }
							data-init={ path }
							data-status={ status }
						/>
					</div>
				</div>

				<Dialog
					design="simple"
					open={ isDialogOpen }
					setOpen={ setIsDialogOpen }
				>
					<Dialog.Backdrop />
					<Dialog.Panel>
						<Dialog.Header>
							<div className="flex items-center justify-between">
								<Dialog.Title>
									{ __( 'Activate Theme', 'header-footer-elementor' ) }
								</Dialog.Title>
							</div>
							<Dialog.Description>
								{ __( 'Are you sure you want to switch your current theme to Astra?', 'header-footer-elementor' ) }
							</Dialog.Description>
						</Dialog.Header>
						<Dialog.Footer>
							<Button onClick={ () => activatePlugin( pluginData ) }>
								{ __( 'Yes', 'header-footer-elementor' ) }
							</Button>
							<Button variant="outline" onClick={ () => setIsDialogOpen( false ) }>
								{ __( 'Close', 'header-footer-elementor' ) }
							</Button>
						</Dialog.Footer>
					</Dialog.Panel>
				</Dialog>
			</Container>
		</>
	);
};

export default ExtendOnboardingWidget;
