import React, { useState, useEffect } from 'react';
import { Container, Skeleton, Title, Label } from '@bsf/force-ui';
import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';
import WidgetsOnboarding from '@components/Dashboard/WidgetsOnboarding';

const FeatureWidgetsOnboarding = ( { setCurrentStep } ) => {
	const [ allWidgetsData, setAllWidgetsData ] = useState( null ); // Initialize state.
	const [ searchTerm, setSearchTerm ] = useState( '' );
	const [ loadingActivate, setLoadingActivate ] = useState( false ); // Loading state for activate button
	const [ loadingDeactivate, setLoadingDeactivate ] = useState( false );
	const [ loading, setLoading ] = useState( true );
	const [ updateCounter, setUpdateCounter ] = useState( 0 );

	useEffect( () => {
		const fetchSettings = () => {
			setLoading( true );
			apiFetch( {
				path: '/hfe/v1/widgets',
				headers: {
					'Content-Type': 'application/json',
					'X-WP-Nonce': hfeSettingsData.hfe_nonce_action, // Use the correct nonce
				},
			} )
				.then( ( data ) => {
					const widgetsData = convertToWidgetsArray( data );
					setAllWidgetsData( widgetsData );
					setLoading( false ); // Stop loading
				} )
				.catch( ( err ) => {
					setLoading( false ); // Stop loading
				} );
		};

		fetchSettings();

		history.pushState( null, '', window.location.href );

		const handleBackButton = ( event ) => {
			event.preventDefault();
			localStorage.setItem( 'currentStep', '1' );
			window.location.reload();
		};

		window.addEventListener( 'popstate', handleBackButton );

		return () => {
			window.removeEventListener( 'popstate', handleBackButton );
		};
	}, [] );

	// New function to handle search input change
	const handleSearchChange = ( event ) => {
		setSearchTerm( event.target.value.toLowerCase() );
	};

	// Filter widgets based on search term
	const filteredWidgets = allWidgetsData?.filter( ( widget ) =>
		widget.title.toLowerCase().includes( searchTerm ) ||
        widget.keywords?.some( ( keyword ) => keyword.toLowerCase().includes( searchTerm ) ),
	);

	const handleActivateAll = async () => {
		setLoadingActivate( true );

		const formData = new window.FormData();
		formData.append( 'action', 'hfe_bulk_activate_widgets' );
		formData.append( 'nonce', hfe_admin_data.nonce );

		try {
			const data = await apiFetch( {
				url: hfe_admin_data.ajax_url,
				method: 'POST',
				body: formData,
			} );

			setLoadingActivate( false );

			if ( data.success ) {
				setAllWidgetsData( ( prevWidgets ) =>
					prevWidgets.map( ( widget ) => ( { ...widget, is_active: true } ) ),
				);
				setUpdateCounter( ( prev ) => prev + 1 );
			} else {
				console.error( 'Error during AJAX request:', data.error );
			}
		} catch ( error ) {
			setLoadingActivate( false );
			console.error( 'Error during AJAX request:', error );
		}
	};

	const handleDeactivateAll = async () => {
		setLoadingDeactivate( true );

		const formData = new window.FormData();
		formData.append( 'action', 'hfe_bulk_deactivate_widgets' );
		formData.append( 'nonce', hfe_admin_data.nonce );

		try {
			const data = await apiFetch( {
				url: hfe_admin_data.ajax_url,
				method: 'POST',
				body: formData,
			} );

			setLoadingDeactivate( false );

			if ( data.success ) {
				setAllWidgetsData( ( prevWidgets ) =>
					prevWidgets.map( ( widget ) => ( { ...widget, is_active: false } ) ),
				);
				setUpdateCounter( ( prev ) => prev + 1 );
			} else {
				console.error( 'Error during AJAX request:', data.error );
			}
		} catch ( error ) {
			setLoadingDeactivate( false );
			console.error( 'Error during AJAX request:', error );
		}
	};

	function convertToWidgetsArray( data ) {
		const widgets = [];

		for ( const key in data ) {
			if ( data.hasOwnProperty( key ) ) {
				const widget = data[ key ];
				widgets.push( {
					id: key, // Using the key as 'widgetTitle'
					slug: widget.slug,
					title: widget.title,
					keywords: widget.keywords,
					icon: <i className={ widget.icon }></i>,
					title_url: widget.title_url,
					default: widget.default,
					doc_url: widget.doc_url,
					is_pro: widget.is_pro,
					description: widget.description,
					is_active: widget.is_activate !== undefined ? widget.is_activate : true, // Check if is_activate is set
					demo_url: widget.demo_url !== undefined ? widget.demo_url : widget.doc_url,
				} );
			}
		}

		return widgets;
	}

	return (
		<div className="rounded-lg bg-white p-6 hfe-onboarding-customize">
			<h1 className="text-text-primary m-0 mb-2" style={ { fontSize: '1.4rem', lineHeight: '1.3em' } }>
				{ __( 'Customize Your UAE Setup', 'header-footer-elementor' ) }
			</h1>
			<span className="text-md font-medium text-text-tertiary m-0" style={ { lineHeight: '1.6em' } }>
				{ __(
					'Activate only what you need to keep your website fast and optimized.',
					'header-footer-elementor',
				) }
			</span>
			<div className="flex bg-black flex-col rounded-lg" style={ { marginTop: '2rem' } }>
				{ loading ? (
					<Container
						align="stretch"
						className="p-2 gap-1.5 grid grid-cols-2 md:grid-cols-4"
						style={ {
							backgroundColor: '#F9FAFB',
						} }
						containerType="grid"
						gap=""
						justify="start"
					>
						{ [ ...Array( 30 ) ].map( ( _, index ) => (
							<Container.Item
								key={ index }
								alignSelf="auto"
								style={ { padding: '3.5rem' } }
								className="text-wrap rounded-md shadow-container-item bg-background-primary space-y-2"
							>
								<Skeleton className="w-12 h-2 rounded-md" />
								<Skeleton className="w-16 h-2 rounded-md" />
								<Skeleton className="w-12 h-2 rounded-md" />
							</Container.Item>
						) ) }
					</Container>
				) : (
					<Container
						align="stretch"
					>
						<WidgetsOnboarding setCurrentStep={ setCurrentStep } widgets={ filteredWidgets } updateCounter={ updateCounter } />
					</Container>
				) }
			</div>
		</div>
	);
};

export default FeatureWidgetsOnboarding;
