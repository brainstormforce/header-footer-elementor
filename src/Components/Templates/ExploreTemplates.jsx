import React, { useState, useEffect } from 'react';
import { Container, Title, Button } from '@bsf/force-ui';
import { Zap, Plus, Check } from 'lucide-react';
import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';

const ExploreTemplates = () => {
	const [ loading, setLoading ] = useState( true );
	const [ templatesStatus, setTemplatesStatus ] = useState( null );
	const [ redirectUrl, setRedirectUrl ] = useState( null );

	const templateData = [
		{
			id: 1,
			icon: '',
			title: __( '250+ templates for every niche', 'header-footer-elementor' ),
		},
		{
			id: 2,
			icon: '',
			title: __( 'Modern, timeless designs', 'header-footer-elementor' ),
		},
		{
			id: 3,
			icon: '',
			title: __( 'Full design flexibility for easy customization', 'header-footer-elementor' ),
		},
		{
			id: 4,
			icon: '',
			title: __( '100% responsive across all devices', 'header-footer-elementor' ),
		},
	];

	useEffect( () => {
		const fetchSettings = () => {
			setLoading( true );
			apiFetch( {
				path: '/hfe/v1/templates',
				headers: {
					'Content-Type': 'application/json',
					'X-WP-Nonce': hfeSettingsData.hfe_nonce_action, // Use the correct nonce
				},
			} )
				.then( ( data ) => {
					setTemplatesStatus( data.templates_status );
					if ( data.redirect_url ) {
						setRedirectUrl( data.redirect_url ); // Save URL in state variable
					}
					setLoading( false ); // Stop loading
				} )
				.catch( ( err ) => {
					setLoading( false ); // Stop loading
				} );
		};

		fetchSettings();
	}, [] );

	if ( loading ) {
		return;
	}

	const button_text = 'Install' === templatesStatus ? __( 'Install Starter Templates', 'header-footer-elementor' ) : ( 'Installed' ? __( 'Activate Starter Templates', 'header-footer-elementor' ) : '' );

	const handleButtonClick = ( e ) => {
		if ( redirectUrl ) {
			window.open( redirectUrl, '_blank' );
		} else {
			const buttonElement = document.querySelector( '.hfe-starter-template-button span' );

			const formData = new window.FormData();
			formData.append( 'action', 'hfe_recommended_plugin_install' );
			formData.append( '_ajax_nonce', hfe_admin_data.installer_nonce );
			formData.append( 'slug', 'astra-sites' );

			if ( buttonElement && templatesStatus === 'Install' ) {
				buttonElement.innerText = __( 'Installing Starter Templates…', 'header-footer-elementor' );

				// AJAX call to install the starter template.
				apiFetch( {
					url: hfe_admin_data.ajax_url,
					method: 'POST',
					body: formData,
				} ).then( ( data ) => {
					if ( data.success || data.errorCode === 'folder_exists' ) {
						buttonElement.innerText = __( 'Installed Starter Templates', 'header-footer-elementor' );
						activatePlugin();
					} else {
						buttonElement.innerText = __( 'Install Starter Templates', 'header-footer-elementor' );
					}
				} );
			}

			if ( buttonElement && templatesStatus === 'Installed' ) {
				buttonElement.innerText = __( 'Activating Starter Templates…', 'header-footer-elementor' );
				activatePlugin();
			}
		}
	};

	const activatePlugin = () => {
		const formData = new window.FormData();

		const st_pro_status = hfeSettingsData.st_pro_status;
		let plugin_file = 'astra-sites/astra-sites.php';
		let plugin_slug = 'astra-sites';

		if ( 'Installed' === st_pro_status && ( 'Install' === hfeSettingsData.st_status || 'Installed' === hfeSettingsData.st_status ) ) {
			plugin_file = 'astra-pro-sites/astra-pro-sites.php';
			plugin_slug = 'astra-pro-sites';
		}

		formData.append( 'action', 'hfe_recommended_plugin_activate' );
		formData.append( 'nonce', hfe_admin_data.nonce );
		formData.append( 'plugin', plugin_file );
		formData.append( 'type', 'plugin' );
		formData.append( 'slug', plugin_slug );

		apiFetch( {
			url: hfe_admin_data.ajax_url,
			method: 'POST',
			body: formData,
		} ).then( ( data ) => {
			if ( data.success ) {
				const buttonElement = document.querySelector( '.hfe-starter-template-button' );
				if ( buttonElement ) { // Check if buttonElement is not null
					const spanElement = buttonElement.querySelector( 'span' );
					if ( spanElement ) { // Check if spanElement is not null
						spanElement.innerText = __( 'Activating Starter Templates…', 'header-footer-elementor' );
						buttonElement.classList.add( 'hfe-plugin-activated' );
						spanElement.innerText = __( 'Activated Starter Templates', 'header-footer-elementor' );
						location.reload();
					}
				}
			} else {
				const buttonElement = document.querySelector( '.hfe-starter-template-button' );
				if ( buttonElement ) { // Check if buttonElement is not null
					const spanElement = buttonElement.querySelector( 'span' );
					if ( spanElement ) { // Check if spanElement is not null
						spanElement.innerText = __( 'Activate Starter Templates', 'header-footer-elementor' );
					}
				}
			}
		} );
	};

	return (
		<div>
			<Container
				className="flex gap-2 flex-col md:flex-row bg-background-primary p-6 md:p-10 border-[0.5px] border-subtle rounded-xl shadow-sm flex-col-reverse"
				containerType="flex"
				gap="xs"
			>
				{ /* Left Column */ }
				<Container.Item className="flex flex-col justify-between w-full mt-4  md:w-1/2 mb-4 md:mb-0">
					<div>
						{ /* Main Title */ }
						<Title
							description=""
							icon={ <Zap /> }
							iconPosition="left"
							size="xs"
							tag="h6"
							title={ __( 'Design Your Website in Minutes', 'header-footer-elementor' ) }
							className="text-xs font-semibold text-brand-primary-600 mb-2"
						/>
						{ /* Subtitle */ }
						<Title
							description=""
							icon=""
							iconPosition="left"
							tag="h6"
							title={ __( 'Build your website faster using our prebuilt templates', 'header-footer-elementor' ) }
							className="py-1 text-sm mb-2"
						/>
						{ /* Paragraph Description */ }
						<p className="text-sm md:text-md m-0 text-text-secondary text-text-tertiary">
							{ __( 'Stop building your site from scratch. Use our professional templates for your stunning website.It is easy to customize and completely responsive. Explore hundreds of designs and bring your vision to life in no time.', 'header-footer-elementor' ) }
						</p>
					</div>
					{ /* Template List */ }
					<div className="grid grid-cols-1 gap-1 my-4">
						{ templateData.map( ( template ) => (
							<Title
								key={ template.id }
								description=""
								icon={ <Check className="text-brand-primary-600 mr-1 h-3 w-3" /> }
								iconPosition="left"
								size="xs"
								tag="h6"
								title={ __( template.title, 'header-footer-elementor' ) }
								className=""
							/>
						) ) }
					</div>
					{ /* Buttons */ }
					<div
						className="flex flex-col md:flex-row items-center pb-3 gap-4"
						style={ {
							marginTop: '15px',
						} }
					>
						<Button
							icon={ <Plus /> }
							iconPosition="right"
							variant="secondary"
							style={ { backgroundColor: '#6005FF', outlineWidth: '0px' } }
							className="w-auto hfe-starter-template-button hfe-remove-ring cursor-pointer"
							onClick={ handleButtonClick }
						>
							{ ( 'Activated' === templatesStatus ) ? __( 'Explore Templates', 'header-footer-elementor' ) : button_text }
						</Button>
						<Button
							icon=""
							iconPosition="right"
							variant="ghost"
							className="w-auto hfe-link-color hfe-remove-ring"
							onClick={ () => {
								window.open( 'https://startertemplates.com/', '_blank' );
							} }
						>
							{ __( 'Learn More', 'header-footer-elementor' ) }
						</Button>
					</div>
				</Container.Item>

				{ /* Right Column with Image */ }
				<Container.Item className="flex justify-center md:justify-end w-full md:w-1/2">
					<img
						src={ `${ hfeSettingsData.template_url }` }
						alt="Column Showcase"
						className="object-contain w-full md:w-5/6"
					/>
				</Container.Item>
			</Container>
		</div>

	);
};

export default ExploreTemplates;
