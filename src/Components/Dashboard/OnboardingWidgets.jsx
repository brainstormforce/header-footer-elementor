import React, { useState, useEffect } from 'react';
import { Container, Button, Skeleton } from '@bsf/force-ui';
import { LoaderCircle, SearchIcon } from 'lucide-react';
import WidgetItem from '@components/Dashboard/WidgetItem';
import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';

const OnboardingWidgets = () => {
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

		apiFetch( {
			url: hfe_admin_data.ajax_url,
			method: 'POST',
			body: formData,
		} ).then( ( data ) => {
			setLoadingActivate( false );
			if ( data.success ) {
				setAllWidgetsData( ( prevWidgets ) =>
					prevWidgets.map( ( widget ) => ( { ...widget, is_active: true } ) ),
				);
				setUpdateCounter( ( prev ) => prev + 1 );
			} else if ( data.error ) {
				setLoadingActivate( false );
				console.error( 'Error during AJAX request:', error );
			}
		} ).catch( ( error ) => {
			setLoadingActivate( false );
			console.error( 'Error during AJAX request:', error );
		} );
	};

	const handleDeactivateAll = async () => {
		setLoadingDeactivate( true );

		const formData = new window.FormData();
		formData.append( 'action', 'hfe_bulk_deactivate_widgets' );
		formData.append( 'nonce', hfe_admin_data.nonce );

		apiFetch( {
			url: hfe_admin_data.ajax_url,
			method: 'POST',
			body: formData,
		} ).then( ( data ) => {
			setLoadingDeactivate( false );
			if ( data.success ) {
				setAllWidgetsData( ( prevWidgets ) =>
					prevWidgets.map( ( widget ) => ( { ...widget, is_active: false } ) ),
				);
				setUpdateCounter( ( prev ) => prev + 1 );
			} else if ( data.error ) {
				console.error( 'AJAX request failed:', data.error );
			}
		} ).catch( ( error ) => {
			setLoadingDeactivate( false );
			console.error( 'Error during AJAX request:', error );
		} );
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
		<div className="rounded-lg w-full mb-4" >
			<div className="flex flex-col md:flex-row md:items-center md:justify-between p-4" style={ { paddingTop: '1.5rem' } }>
				<h4 className="m-0 font-semibold text-text-primary mb-2 md:mb-0">{ __( 'WIDGETS', 'header-footer-elementor' ) }</h4>
				<div className="flex flex-col md:flex-row items-center gap-y-2 md:gap-x-2 md:mr-7 relative" style={ { paddingRight: '0.75rem' } }>
					<div className="flex flex-row w-full md:w-auto">
						<Button
							icon={ loadingActivate ? <LoaderCircle className="animate-spin" /> : null }
							iconPosition="left"
							variant="outline"
							className="hfe-bulk-action-button hfe-remove-ring"
							onClick={ handleActivateAll } // Attach the onClick event.
							disabled={ !! searchTerm }
							style={ { borderTopRightRadius: '0px', borderBottomRightRadius: '0px', borderRight: '0px', fontSize: '0.9em' } }
						>
							{ loadingActivate ? __( 'Activating…', 'header-footer-elementor' ) : __( 'Activate All', 'header-footer-elementor' ) }
						</Button>

						<Button
							icon={ loadingDeactivate ? <LoaderCircle className="animate-spin" /> : null } // Loader for deactivate button.
							iconPosition="left"
							variant="outline"
							onClick={ handleDeactivateAll }
							className="hfe-bulk-action-button hfe-remove-ring"
							disabled={ !! searchTerm }
							style={ { borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px', fontSize: '0.9em' } }
						>
							{ loadingDeactivate ? __( 'Deactivating…', 'header-footer-elementor' ) : __( 'Deactivate All', 'header-footer-elementor' ) }
						</Button>
					</div>
				</div>
			</div>
			<div
				className="hfe-custom-scrollbar bg-background-secondary p-1 rounded-lg max-h-80" style={ { overflow: 'auto', maxHeight: '20rem', paddingTop: '0' } }>
				<div className="flex bg-black flex-col p-3" style={ { minHeight: '800px', paddingTop: '0' } }>
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
									className="text-wrap rounded-md shadow-container-item bg-background-primary p-8 space-y-2"
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
							className="p-1 gap-1.5 grid-cols-2 md:grid-cols-4"
							containerType="grid"
							gap=""
							justify="start"
							style={ {
								paddingTop: '0',
							} }
						>
							{ filteredWidgets?.map( ( widget ) => (
								<Container.Item
									key={ widget.id }
									alignSelf="auto"
									className="text-wrap rounded-md shadow-container-item bg-background-primary p-4"
								>
									<WidgetItem widget={ { ...widget, updateCounter } } key={ widget.id } updateCounter={ updateCounter } />
								</Container.Item>
							) ) }
						</Container>
					) }
				</div>
			</div>
		</div>
	);
};

export default OnboardingWidgets;
