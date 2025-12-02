import React, { useState, useEffect } from 'react';
import { Title, Button } from '@bsf/force-ui';
import { __ } from '@wordpress/i18n';
import { Link } from '../../router/index'; // Import the custom Link component
import { routes } from 'admin/settings/routes'; // Import the routes object
import apiFetch from '@wordpress/api-fetch';

const TemplateSection = () => {
	const [ loading, setLoading ] = useState( true );
	const [ templatesStatus, setTemplatesStatus ] = useState( null );
	const [ redirectUrl, setRedirectUrl ] = useState( null );

	useEffect( () => {
		const fetchSettings = () => {
			setLoading( true );
			apiFetch( {
				path: '/hfe/v1/templates',
				headers: {
					'Content-Type': 'application/json',
					'X-WP-Nonce': hfeSettingsData.uael_nonce_action, // Use the correct nonce
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

	const handleButtonClick = ( e ) => {
		if ( 'Activated' === templatesStatus && redirectUrl ) {
			window.open( redirectUrl, '_blank' );
		}
	};

	if ( loading ) {
		return;
	}

	return (
		<div className="box-border hfe-dashboard-templates p-4 bg-white rounded-lg shadow-md mb-6 hfe-subheading">
			<div className="mb-4">
				<img
					src={ `${ hfeSettingsData.templates_url }` }
					alt="Template Showcase"
					className="w-full h-auto rounded"
				/>
			</div>
			<Title
				className="mt-2"
				icon={ null }
				iconPosition="right"
				size="xs"
				tag="h2"
				title={ __(
					'Build Websites 10x Faster with Templates',
					'header-footer-elementor',
				) }
			/>
			<p className="text-text-secondary text-text-tertiary mt-2 mb-2 text-sm">
				{ __(
					'Choose from our professionally designed websites to build your site faster, with easy customization options.',
					'header-footer-elementor',
				) }
			</p>
			{
				'Activated' !== templatesStatus ? (
					<Link to={ routes.templates.path } className="w-full">
						<Button
							className="w-full mt-4"
							icon={ null }
							iconPosition="left"
							size="md"
							variant="secondary"
						>
							{ __( 'View Templates', 'header-footer-elementor' ) }
						</Button>
					</Link>
				) : (
					<Button
						className="w-full mt-4"
						icon={ null }
						iconPosition="left"
						size="md"
						variant="secondary"
						onClick={ handleButtonClick }
					>
						{ __( 'View Templates', 'header-footer-elementor' ) }
					</Button>
				) }
		</div>
	);
};

export default TemplateSection;
