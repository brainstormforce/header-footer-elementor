import React, { useState, useEffect } from 'react';
import { Container, Title, Label } from '@bsf/force-ui';
import { __ } from '@wordpress/i18n';
import toast, { Toaster } from 'react-hot-toast';

const radioData = [
	{
		id: '1',
		title: __( 'Option 1 (Recommended)', 'header-footer-elementor' ),
		description: __( "This option will automatically replace your theme's header and footer files with custom templates from the plugin. It works with most themes and is selected by default.", 'header-footer-elementor' ),
		value: '1',
	},
	{
		id: '2',
		title: __( 'Option 2', 'header-footer-elementor' ),
		description: __( "This option will automatically replace your theme's header and footer files with custom templates from the plugin. It works with most themes and is selected by default.", 'header-footer-elementor' ),
		value: '2',
	},
];

const ThemeSupport = () => {
	if ( 'no' === hfeSettingsData.show_theme_support ) {
		return null;
	}

	// State to store the selected radio option
	const [ selectedOption, setSelectedOption ] = useState( hfeSettingsData.theme_option );
	const [ isInitialLoad, setIsInitialLoad ] = useState( true );

	useEffect( () => {
		setIsInitialLoad( false );
	}, [] );

	const handleRadioChange = ( event ) => {
		const newValue = event.target.value;
		setSelectedOption( newValue ); // Update the selected option in state.

		// Only send the AJAX call if this is not the initial load.
		if ( ! isInitialLoad ) {
			saveOption( newValue );
		}
	};

	// Function to save the selected option.
	const saveOption = async ( option ) => {
		try {
			const response = await fetch( hfe_admin_data.ajax_url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: new URLSearchParams( {
					action: 'save_theme_compatibility_option', // WordPress action for your AJAX handler.
					hfe_compatibility_option: option,
					nonce: hfe_admin_data.nonce, // Nonce for security.
				} ),
			} );

			const result = await response.json();

			if ( result.success ) {
				toast.success( __( 'Settings saved successfully!', 'header-footer-elementor' ) );
			} else {
				toast.error( __( 'Failed to save settings!', 'header-footer-elementor' ) );
			}
		} catch ( error ) {
			toast.error( __( 'Failed to save settings!', 'header-footer-elementor' ) );
		}
	};

	return (
		<>
			<Title
				description=""
				icon={ null }
				iconPosition="right"
				size="sm"
				tag="h2"
				title={ __( 'Theme Support', 'header-footer-elementor' ) }
			/>
			<Container
				align="stretch"
				className="bg-background-primary p-6 rounded-lg"
				containerType="flex"
				direction="column"
				gap="sm"
				justify="start"
				style={ {
					marginTop: '24px',
					maxWidth: '696px',
				} }
			>
				<Container.Item className="flex flex-col space-y-1">
					<p className="text-base font-semibold m-0">{ __( 'Select Option to Add Theme Support', 'header-footer-elementor' ) }</p>
					<p className="text-sm font-normal m-0">
						{ __(
							`To ensure compatibility between the header/footer and your theme, please choose one of the following options to enable theme support:`,
							'header-footer-elementor',
						) }
					</p>
				</Container.Item>
				<Container.Item
					className="p-2 space-y-4"
					alignSelf="auto"
					order="none"
				>
					{ radioData.map( ( item ) => (
						<div key={ item.id } className="flex items-start gap-1 justify-center cursor-pointer">
							<input
								id={ item.id }
								value={ item.value }
								type="radio"
								className="mt-1 cursor-pointer hfe-radio-field"
								name="theme-support-option" // Group radio buttons
								onChange={ handleRadioChange } // Track the change
								checked={ selectedOption === item.value } // Controlled input
							/>
							<div className="flex flex-col cursor-pointer">
								<Label
									size="sm"
									variant="neutral"
									className="text-sm font-semibold text-text-secondary cursor-pointer flex flex-col items-start justify-start"
									htmlFor={ item.id }
								>
									{ item.title }:
									<p className="m-0 text-sm font-normal text-text-secondary cursor-pointer">{ item.description }</p>
								</Label>
							</div>
						</div>
					) ) }
				</Container.Item>

				<div className="flex items-center p-4 border rounded-lg text-start" style={ {
					paddingTop: '16px',
					paddingBottom: '16px',
					backgroundColor: '#F3F0FF',
				} }>
					<p className="m-0 text-sm">
						<strong>{ __( 'Note:', 'header-footer-elementor' ) }</strong> { __( 'If neither option works, please contact your theme author to add support for this plugin.', 'header-footer-elementor' ) }
					</p>
				</div>
			</Container>

			<Toaster
				position="top-right"
				reverseOrder={ false }
				gutter={ 8 }
				containerStyle={ {
					top: 20,
					right: 20,
					marginTop: '80px',
				} }
				toastOptions={ {
					duration: 5000,
					style: {
						background: 'white',
					},
					success: {
						duration: 3000,
						style: {
							color: '',
						},
						iconTheme: {
							primary: '#6005ff',
							secondary: '#fff',
						},
					},
				} }
			/>
		</>
	);
};

export default ThemeSupport;
