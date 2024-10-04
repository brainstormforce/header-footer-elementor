import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast, Toaster } from '@bsf/force-ui';
import { __ } from '@wordpress/i18n'; // Import localization function

// Create the Settings Context
export const SettingsContext = createContext();

// Create the Provider component
export const SettingsProvider = ({ children }) => {
	const apiBaseUrl = `${bseDataObject.siteUrl}/wp-json/sureemails/v1`;
	const restApiNonce = bseDataObject.nonce;

	const [settings, setSettings] = useState({
		connections: {},
		default_connection: {},
		fallback_connection: {},
		log_emails: 'no',
		delete_email_logs_after: '30_days',
		email_simulation: 'no',
		status: 'idle',
		error: null,
	});

	// Fetch settings from the API
	const fetchSettings = async () => {
		try {
			setSettings(prevState => ({ ...prevState, status: 'loading' }));
			const response = await axios.get(`${apiBaseUrl}/get-settings`, {
				headers: {
					'X-WP-Nonce': restApiNonce,
				},
			});

			const {
				connections,
				default_connection,
				fallback_connection,
				log_emails,
				delete_email_logs_after,
				email_simulation,
			} = response.data.data;

			setSettings({
				connections,
				default_connection,
				fallback_connection,
				log_emails,
				delete_email_logs_after,
				email_simulation,
				status: 'succeeded',
				error: null,
			});
		} catch (error) {
			setSettings(prevState => ({
				...prevState,
				status: 'failed',
				error: error.message || __('Error fetching settings', 'sureemails'),
			}));

			// Show error toast for fetching settings
			toast.error(__('Error fetching settings', 'sureemails'), {
				description:
					error.message ||
					__(
						'There was an issue fetching settings from the server.',
						'sureemails'
					),
			});
		}
	};

	// Save settings to the API
	const saveSettings = async updatedSettings => {
		try {
			setSettings(prevState => ({ ...prevState, status: 'saving' }));

			const response = await axios.post(
				`${apiBaseUrl}/set-settings`,
				{
					settings: {
						delete_email_logs_after: updatedSettings.delete_email_logs_after,
						log_emails: updatedSettings.log_emails ? 'yes' : 'no',
						email_simulation: updatedSettings.email_simulation ? 'yes' : 'no',
						default_connection: {
							type:
								updatedSettings.connections[updatedSettings.default_connection]
									?.type || '',
							email:
								updatedSettings.connections[updatedSettings.default_connection]
									?.from_email || '',
							id:
								updatedSettings.connections[updatedSettings.default_connection]
									?.id || '',
						},
						fallback_connection: {
							type:
								updatedSettings.connections[updatedSettings.fallback_connection]
									?.type || '',
							email:
								updatedSettings.connections[updatedSettings.fallback_connection]
									?.from_email || '',
							id:
								updatedSettings.connections[updatedSettings.fallback_connection]
									?.id || '',
						},
					},
				},
				{
					headers: {
						'X-WP-Nonce': restApiNonce,
					},
				}
			);

			if (response.data.success) {
				setSettings(prevState => ({
					...prevState,
					...updatedSettings,
					status: 'succeeded',
					error: null,
				}));

				// Show success toast
				toast.success(__('Settings saved successfully', 'sureemails'), {
					description: __(
						'Your changes have been successfully saved.',
						'sureemails'
					),
				});
			} else {
				throw new Error(__('Failed to save settings', 'sureemails'));
			}
		} catch (error) {
			setSettings(prevState => ({
				...prevState,
				status: 'failed',
				error: error.message || __('Error saving settings', 'sureemails'),
			}));

			// Show error toast for saving settings
			toast.error(__('Error saving settings', 'sureemails'), {
				description:
					error.message ||
					__('There was an issue saving the settings.', 'sureemails'),
			});
		}
	};

	useEffect(() => {
		fetchSettings();
	}, [apiBaseUrl, restApiNonce]);

	return (
		<SettingsContext.Provider value={{ settings, setSettings, saveSettings }}>
			{/* Toaster to display toast notifications */}
			<Toaster dismissAfter={3000} />
			{children}
		</SettingsContext.Provider>
	);
};
