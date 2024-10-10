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
	const { settings, saveSettings } = useContext(SettingsContext);

	const {
		connections = {},
		default_connection = {},
		fallback_connection = {},
		log_emails = 'no',
		delete_email_logs_after = '30_days',
		email_simulation = 'no',
		status = 'idle',
		error = null,
	} = settings || {};

	// Local state for form
	const [formState, setFormState] = useState({
		logEmails: false,
		deleteEmailLogsAfter: '30_days',
		defaultConnection: '',
		fallbackConnection: '',
		emailSimulation: false,
	});

	// Update form state when settings are successfully fetched
	useEffect(() => {
		if (status === 'succeeded') {
			setFormState({
				logEmails: log_emails === 'yes',
				deleteEmailLogsAfter: delete_email_logs_after || '30_days',
				defaultConnection: default_connection?.id || '',
				fallbackConnection: fallback_connection?.id || '',
				emailSimulation: email_simulation === 'yes',
			});
		}
	}, [status]);

	// Show toast for API errors
	useEffect(() => {
		if (status === 'failed' && error) {
			toast.error(__('Error loading settings', 'sureemails'), {
				description: error,
			});
		}
	}, [status, error]);

	const handleChange = (field, value) => {
		setFormState(prevState => ({
			...prevState,
			[field]: value,
		}));
	};

	const handleSave = () => {
		if (formState.defaultConnection === formState.fallbackConnection) {
			toast.error(
				__(
					'Default connection and fallback connection cannot be the same.',
					'sureemails'
				)
			);
			return;
		}

		const updatedSettings = {
			connections,
			default_connection: connections[formState.defaultConnection] || {},
			fallback_connection: connections[formState.fallbackConnection] || {},
			log_emails: formState.logEmails ? 'yes' : 'no',
			delete_email_logs_after: formState.deleteEmailLogsAfter,
			email_simulation: formState.emailSimulation ? 'yes' : 'no',
		};

		saveSettings(updatedSettings);

		// Show success message
		toast.success(__('Settings saved successfully', 'sureemails'), {
			description: __('Your changes have been saved.', 'sureemails'),
		});
	};

	// Prepare connection options formatted as Email (Provider)
	const connectionOptions = Object.entries(connections).map(
		([key, connection]) => ({
			label: `${connection.from_email} (${connection.type})`,
			value: key,
		})
	);

	// Handle loading state
	if (status === 'loading') {
		return <Skeleton variant="rectangular" className="w-full h-full" />;
	}

	return (
		<div className="flex flex-col items-center justify-center min-h-screen p-6 bg-gray-100">
			{/* Toaster to display toast notifications */}
			<Toaster dismissAfter={3000} />

			{/* Header */}
			<div className="flex items-center justify-between w-[696px] h-[40px] mb-4 gap-2 mx-auto">
				<h2 className="text-xl font-bold">
					{__('General Settings', 'sureemails')}
				</h2>
				<Button onClick={handleSave} variant="primary">
					{__('Save', 'sureemails')}
				</Button>
			</div>

			{/* Settings Card */}
			<div className="px-6 py-6 bg-white rounded-lg shadow-lg w-[696px] h-auto gap-4 opacity-100 mx-auto">
				{/* Log Emails */}
				<div className="flex w-[648px] gap-3">
					<div className="flex items-start">
						<Switch
							checked={formState.logEmails}
							onChange={value => handleChange('logEmails', value)}
							size="sm"
							className="w-[40px] h-[20px]"
						/>
					</div>

					<div className="flex flex-col">
						<Label size="md" className="w-full">
							{__('Log Emails', 'sureemails')}
						</Label>
						<Label size="sm" variant="help" className="w-full">
							{__(
								'Enable to log all outgoing emails for reference.',
								'sureemails'
							)}
						</Label>
					</div>
				</div>

				<Skeleton
					className="w-[648px] h-[0.5px] mt-2 border border-subtle"
					variant="rectangular"
				/>

				{/* Delete Logs */}
				<div className="flex flex-col w-[648px] h-auto gap-2">
					<div className="flex items-center w-full gap-3">
						<Label size="md" className="w-[658px] h-[20px]">
							{__('Delete Logs', 'sureemails')}
						</Label>
					</div>

					<Select
						value={formState.deleteEmailLogsAfter}
						onChange={value => handleChange('deleteEmailLogsAfter', value)}
						className="w-full h-[40px]"
					>
						<Select.Button label={__('Select Duration', 'sureemails')} />
						<Select.Options className="text-black bg-white">
							<Select.Option value="1_day">
								{__('Delete after 1 day', 'sureemails')}
							</Select.Option>
							<Select.Option value="7_days">
								{__('Delete after 7 days', 'sureemails')}
							</Select.Option>
							<Select.Option value="30_days">
								{__('Delete after 30 days', 'sureemails')}
							</Select.Option>
							<Select.Option value="60_days">
								{__('Delete after 60 days', 'sureemails')}
							</Select.Option>
							<Select.Option value="90_days">
								{__('Delete after 90 days', 'sureemails')}
							</Select.Option>
						</Select.Options>
					</Select>

					<Label size="sm" variant="help" className="w-full">
						{__(
							'Logs will be deleted after the selected duration automatically.',
							'sureemails'
						)}
					</Label>
				</div>

				<Skeleton
					className="w-[648px] h-[0.5px] mt-2 border border-subtle"
					variant="rectangular"
				/>

				{/* Default Connection */}
				<div className="flex flex-col w-full h-auto gap-2">
					<div className="flex items-center gap-1">
						<Label size="md" className="w-full">
							{__('Default Connection', 'sureemails')}
						</Label>
					</div>

					<Select
						value={formState.defaultConnection}
						onChange={value => handleChange('defaultConnection', value)}
						className="w-full h-[40px]"
					>
						<Select.Button
							label={
								formState.defaultConnection &&
								connections[formState.defaultConnection]
									? `${connections[formState.defaultConnection].from_email} (${
											connections[formState.defaultConnection].type
									  })`
									: __('Select Default Connection', 'sureemails')
							}
						/>
						<Select.Options className="text-black bg-white">
							{connectionOptions.map(option => (
								<Select.Option key={option.value} value={option.value}>
									{option.label}
								</Select.Option>
							))}
						</Select.Options>
					</Select>

					<Label size="sm" variant="help" className="w-full">
						{__(
							'This connection will be used by default unless a specific "from" address is provided in the email headers.',
							'sureemails'
						)}
					</Label>
				</div>

				<Skeleton
					className="w-[648px] h-[0.5px] mt-2 border border-subtle"
					variant="rectangular"
				/>

				{/* Fallback Connection */}
				<div className="flex flex-col w-full h-auto gap-2">
					<div className="flex items-center gap-1">
						<Label size="md" className="w-full">
							{__('Fallback Connection', 'sureemails')}
						</Label>
					</div>

					{Object.keys(connections).length > 1 ? (
						<Select
							value={formState.fallbackConnection}
							onChange={value => handleChange('fallbackConnection', value)}
							className="w-full h-[40px]"
						>
							<Select.Button
								label={
									formState.fallbackConnection &&
									connections[formState.fallbackConnection]
										? `${
												connections[formState.fallbackConnection].from_email
										  } (${connections[formState.fallbackConnection].type})`
										: __('Select Fallback Connection', 'sureemails')
								}
							/>
							<Select.Options className="text-black bg-white">
								{connectionOptions.map(option => (
									<Select.Option key={option.value} value={option.value}>
										{option.label}
									</Select.Option>
								))}
							</Select.Options>
						</Select>
					) : (
						<p className="mt-1 text-sm text-gray-700">
							{__(
								'Please add another connection to set a fallback connection.',
								'sureemails'
							)}
						</p>
					)}
				</div>

				<Skeleton
					className="w-[648px] h-[0.5px] mt-2 border border-subtle"
					variant="rectangular"
				/>

				{/* Email Simulation */}
				<div className="flex flex-col gap-2 w-[648px]">
					<div className="flex items-center w-full gap-3">
						<Label size="md" className="w-[200px]">
							{__('Email Simulation', 'sureemails')}
						</Label>
					</div>

					<div className="flex w-[648px] gap-3">
						<div className="flex items-start">
							<Switch
								checked={formState.emailSimulation}
								onChange={value => handleChange('emailSimulation', value)}
								size="sm"
								className="w-[40px] h-[20px]"
							/>
						</div>

						<div className="flex flex-col">
							<Label size="md" className="w-full">
								{__('Email Simulation', 'sureemails')}
							</Label>
							<Label size="sm" variant="help" className="w-full">
								{__(
									'Enable to simulate sending emails without actually sending them.',
									'sureemails'
								)}
							</Label>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Settings;
