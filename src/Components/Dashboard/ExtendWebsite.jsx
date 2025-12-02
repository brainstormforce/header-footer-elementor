import React, { useState, useEffect } from 'react';
import ExtendWebsiteWidget from './ExtendWebsiteWidget';
import { Container, Skeleton } from '@bsf/force-ui';
import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';

const ExtendWebsite = () => {
	const [ plugins, setPlugins ] = useState( [] );
	const [ loading, setLoading ] = useState( true );
	const [ updateCounter, setUpdateCounter ] = useState( 0 );
	const [ allInstalled, setAllInstalled ] = useState( false );

	useEffect( () => {
		const fetchSettings = async () => {
			setLoading( true );
			try {
				const data = await apiFetch( {
					path: '/hfe/v1/plugins',
					headers: {
						'Content-Type': 'application/json',
						'X-WP-Nonce': hfeSettingsData.hfe_nonce_action,
					},
				} );
				const pluginsData = convertToPluginsArray( data );
				setPlugins( pluginsData );

				// Check if all plugins are installed
				const areAllInstalled = pluginsData.every( ( plugin ) => plugin.is_installed );
				setAllInstalled( areAllInstalled );
			} catch ( err ) {
				console.error( 'Error fetching plugins:', err );
			} finally {
				setLoading( false );
			}
		};

		fetchSettings();
	}, [ updateCounter ] );

	function convertToPluginsArray( data ) {
		return Object.keys( data ).map( ( key ) => ( {
			path: key,
			...data[ key ],
		} ) );
	}

	// If all plugins are installed, don't render the component
	if ( allInstalled ) {
		return null;
	}

	return (
		<div className="rounded-lg bg-white w-full">
			<div className="flex items-center justify-between p-4" style={ { paddingBottom: '0' } }>
				<p className="m-0 text-sm font-semibold text-text-primary">
					{ __( 'Super Charge Your Workflow', 'header-footer-elementor' ) }
				</p>
				<div className="flex items-center gap-x-2 mr-7"></div>
			</div>
			<div className="flex flex-col rounded-lg p-4" style={ { backgroundColor: 'white' } }>
				{ loading ? (
					<Container
						align="stretch"
						className="gap-1 p-1 grid grid-cols-1 md:grid-cols-1"
						containerType="grid"
						justify="start"
					>
						{ [ ...Array( 1 ) ].map( ( _, index ) => (
							<Container.Item
								key={ index }
								alignSelf="auto"
								style={ { height: '150px' } }
								className="text-wrap rounded-md shadow-container-item bg-[#F9FAFB] p-4"
							>
								<div className="flex flex-col gap-6" style={ { marginTop: '40px' } }>
									<Skeleton className="w-12 h-2 rounded-md" />
									<Skeleton className="w-16 h-2 rounded-md" />
									<Skeleton className="w-12 h-2 rounded-md" />
								</div>
							</Container.Item>
						) ) }
					</Container>
				) : (
					<Container
						align="stretch"
						className="gap-1 p-1 grid grid-cols-1 md:grid-cols-1"
						containerType="grid"
						justify="start"
						style={ { backgroundColor: '#F9FAFB' } }
					>
						{ plugins.slice( 0, 1 ).map( ( plugin ) => (
							<Container.Item
								key={ plugin.slug }
								alignSelf="auto"
								className="text-wrap rounded-md shadow-container-item bg-background-primary p-4"
							>
								<ExtendWebsiteWidget plugin={ plugin } setUpdateCounter={ setUpdateCounter } />
							</Container.Item>
						) ) }
					</Container>
				) }
			</div>
		</div>
	);
};

export default ExtendWebsite;
