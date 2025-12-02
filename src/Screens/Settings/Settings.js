import React, { useContext, useEffect, useState } from 'react';
import { __ } from '@wordpress/i18n'; // Import localization function
import { SettingsContext } from '@context/SettingsContext.js';
import {
	Button,
	Switch,
	Select,
	Label,
	Skeleton,
	Toaster,
	toast,
} from '@bsf/force-ui';

function Settings() {
	const { settings, saveSettings } = useContext( SettingsContext );

	const {
		status = 'idle',
		error = null,
	} = settings || {};

	// Show toast for API errors
	useEffect( () => {
		if ( status === 'failed' && error ) {
			toast.error( __( 'Error loading settings' ), {
				description: error,
			} );
		}
	}, [ status, error ] );

	// Handle loading state
	if ( status === 'loading' ) {
		return <Skeleton variant="rectangular" className="w-full h-full" />;
	}

	return (
		<div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
			{ /* Toaster to display toast notifications */ }
			<Toaster dismissAfter={ 3000 } />

			{ /* Header */ }
			<div className="flex items-center justify-between w-[696px] h-[40px] mb-4 gap-2 mx-auto">
				<h2 className="text-xl font-bold">
					{ __( 'General Settings' ) }
				</h2>
				<Button variant="primary">
					{ __( 'Save' ) }
				</Button>
			</div>
		</div>
	);
}

export default Settings;
