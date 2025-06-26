import React, { useState, useEffect } from "react";
import { Container, Skeleton, Button, Title } from "@bsf/force-ui";
import apiFetch from "@wordpress/api-fetch";
import { __ } from "@wordpress/i18n";
import ExtendOnboardingWidget from "./ExtendOnboardingWidget";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const ExtendOnboarding = ({ setCurrentStep }) => {
	const [plugins, setPlugins] = useState([]);
	const [loading, setLoading] = useState(true);
	const [updateCounter, setUpdateCounter] = useState(0);
	const [allInstalled, setAllInstalled] = useState(false);
	const [formData, setFormData] = useState({
		firstName: '',
		email: '',
		notifications: true
	});

	const handleInputChange = (name, value) => {
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
	};

	useEffect(() => {
		const fetchSettings = async () => {
			setLoading(true);
			try {
				const data = await apiFetch({
					path: "/hfe/v1/plugins",
					headers: {
						"Content-Type": "application/json",
						"X-WP-Nonce": hfeSettingsData.hfe_nonce_action,
					},
				});
				const pluginsData = convertToPluginsArray(data);
				setPlugins(pluginsData);

				// Check if all plugins are installed
				const areAllInstalled = pluginsData.every(
					(plugin) => plugin.is_installed,
				);
				setAllInstalled(areAllInstalled);
			} catch (err) {
				console.error("Error fetching plugins:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchSettings();
	}, [updateCounter]);

	function convertToPluginsArray(data) {
		return Object.keys(data).map((key) => ({
			path: key,
			...data[key],
		}));
	}

	// If all plugins are installed, don't render the component
	if (allInstalled) {
		return null;
	}

	return (
        
		<div className="bg-background-primary border-[0.5px] items-start justify-center border-subtle rounded-xl shadow-sm mb-6 p-4 flex w-1/2 flex-col">
			<div className="rounded-lg bg-white w-full">
				<div
					className="flex flex-col items-start justify-between p-4"
					style={{ paddingBottom: "0" }}
				>
					<p
						className="text-text-primary m-0 mb-2 hfe-65-width"
						style={{ fontSize: "24px", lineHeight: "1.3em" }}
					>
						{__(
							"Recommended Essentials",
							"header-footer-elementor",
						)}
					</p>
					<span
						className="text-md font-medium m-0 mb-2"
						style={{ lineHeight: "1.5em", color: "#111827" }}
					>
						{__(
							"These free plugins add essential features to your website and help speed up your workflow. The selected plugins below will be installed on this site.",
							"header-footer-elementor",
						)}
					</span>
					<div className="flex items-center gap-x-2 mr-7"></div>
				</div>
				<div
					className="flex flex-col rounded-lg p-4"
					style={{ backgroundColor: "white" }}
				>
					{loading ? (
						<Container
							align="stretch"
							className="gap-1 p-1 grid grid-cols-1 md:grid-cols-2"
							containerType="grid"
							justify="start"
						>
							{[...Array(2)].map((_, index) => (
								<Container.Item
									key={index}
									alignSelf="auto"
									style={{ height: "150px" }}
									className="text-wrap rounded-md shadow-container-item bg-[#F9FAFB] p-4"
								>
									<div
										className="flex flex-col gap-6"
										style={{ marginTop: "40px" }}
									>
										<Skeleton className="w-12 h-2 rounded-md" />
										<Skeleton className="w-16 h-2 rounded-md" />
										<Skeleton className="w-12 h-2 rounded-md" />
									</div>
								</Container.Item>
							))}
						</Container>
					) : (
						<Container
							align="stretch"
							className="gap-1 p-1 grid grid-cols-1 md:grid-cols-1"
							containerType="grid"
							justify="start"
							style={{ backgroundColor: "#F9FAFB" }}
						>
							{plugins.slice(0, 3).map((plugin) => (
								<Container.Item
									key={plugin.slug}
									alignSelf="auto"
									className="text-wrap rounded-md shadow-container-item bg-background-primary p-4"
								>
									<ExtendOnboardingWidget
										plugin={plugin}
										setUpdateCounter={setUpdateCounter}
									/>
								</Container.Item>
							))}
						</Container>
					)}
				</div>
			</div>
			<div className="px-5 bg-white rounded-lg">
				<h3 className="text-base font-semibold  text-gray-900">
					{__(
						"Get Important Notifications and Updates",
						"header-footer-elementor",
					)}
				</h3>
				<div className="flex flex-row items-start gap-4 mb-4">
					<div className="flex flex-col flex-1">
						<label className="text-sm font-medium text-gray-700 mb-2">
							{__('First Name', 'header-footer-elementor')}
						</label>
						<input
							type="text"
							name="firstName"
							value={formData.firstName}
							onChange={(e) => handleInputChange('firstName', e.target.value)}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
							placeholder={__('Enter your first name', 'header-footer-elementor')}
							style={{
								height: '48px',
								fontSize: '14px'
							}}
						/>
					</div>
					<div className="flex flex-col flex-1">
						<label className="text-sm font-medium text-gray-700 mb-2">
							{__('Email Address', 'header-footer-elementor')}
						</label>
						<input
							type="email"
							name="email"
                            
							value={formData.email}
							onChange={(e) => handleInputChange('email', e.target.value)}
							className="role-checkbox w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
							placeholder={__('Enter your email address', 'header-footer-elementor')}
							style={{
								height: '48px',
								fontSize: '14px'
							}}
						/>
					</div>
				</div>
				<div className="flex items-start gap-3">
					<input
						type="checkbox"
						id="notifications-checkbox"
						checked={formData.notifications}
						onChange={(e) => handleInputChange('notifications', e.target.checked)}
						className="mt-1 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
					/>
					<label htmlFor="notifications-checkbox" className="text-sm text-gray-600 leading-relaxed">
						{__(
							"Notify me about critical updates and new features — and help us improve by sharing how you use the plugin. ",
							"header-footer-elementor",
						)}
						<a
							href="#"
							className="text-purple-600 underline hover:text-purple-700"
						>
							{__("Privacy Policy", "header-footer-elementor")}
						</a>
					</label>
				</div>
			</div>
			<div style={{gap: '350px'}}  className="flex justify-end items-center pt-4 px-4 hfe-onboarding-bottom">
				<Button
					className="flex items-center gap-1 hfe-remove-ring"
					icon={<ChevronLeft />}
					variant="outline"
					onClick={() => setCurrentStep(1)}
				>
					{__("Back", "header-footer-elementor")}
				</Button>
				<div className="flex justify-start text-text-tertiary items-center gap-3">
					<Button
						className="hfe-remove-ring"
						variant="ghost"
						onClick={() => setCurrentStep(3)}
					>
						{" "}
						{__("Skip", "header-footer-elementor")}
					</Button>
					<Button
						className="flex items-center gap-1 hfe-remove-ring"
						icon={<ArrowRight />}
						iconPosition="right"
						style={{
							backgroundColor: "#240064",
							transition: "background-color 0.3s ease",
							padding: "12px",
						}}
						onClick={() => setCurrentStep(3)}
					>
						{__(" Next", "header-footer-elementor")}
					</Button>
				</div>
			</div>
		</div>
	);
};

export default ExtendOnboarding;
