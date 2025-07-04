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
	const [selectedPlugins, setSelectedPlugins] = useState({});
	const [formData, setFormData] = useState({
		firstName: hfeSettingsData.user_fname ? hfeSettingsData.user_fname : "",
		email: hfeSettingsData.user_email ? hfeSettingsData.user_email : "",
		notifications: true,
	});

	const handleInputChange = (name, value) => {
		setFormData((prev) => ({
			...prev,
			[name]: value,
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

				// Filter out plugins that are already installed or activated
				const uninstalledPlugins = pluginsData.filter(
					(plugin) =>
						!plugin.is_installed &&
						plugin.status !== "Activated" &&
						plugin.status !== "Installed",
				);

				setPlugins(uninstalledPlugins);

				// If there are no uninstalled plugins, set allInstalled to true
				setAllInstalled(uninstalledPlugins.length === 0);
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

	// Handle plugin selection from checkbox
	const handlePluginSelect = (pluginData) => {
		setSelectedPlugins((prev) => ({
			...prev,
			[pluginData.slug]: {
				...pluginData,
				selected: pluginData.isChecked,
			},
		}));
	};

	// Bulk install selected plugins in the background
	const installSelectedPluginsInBackground = async () => {
		// Get all selected plugins (they're already filtered to be uninstalled only)
		const pluginsToInstall = Object.values(selectedPlugins).filter(
			(plugin) => plugin.selected,
		);

		if (pluginsToInstall.length === 0) {
			// If no plugins to install, just return
			return;
		}

		// Start installation in background
		setTimeout(async () => {
			// Install plugins one by one
			for (const plugin of pluginsToInstall) {
				const formData = new window.FormData();
				formData.append(
					"action",
					plugin.type === "theme"
						? "hfe_recommended_theme_install"
						: "hfe_recommended_plugin_install",
				);
				formData.append("_ajax_nonce", hfe_admin_data.installer_nonce);
				formData.append("slug", plugin.slug);

				try {
					const response = await apiFetch({
						url: hfe_admin_data.ajax_url,
						method: "POST",
						body: formData,
					});

					if (
						!response.success &&
						response.errorCode !== "folder_exists"
					) {
						console.error(
							`Failed to install ${plugin.name}:`,
							response,
						);
					}
				} catch (error) {
					console.error(`Error installing ${plugin.name}:`, error);
				}
			}
		}, 0);
	};

	// Handle next button click
	const handleNextClick = () => {
		// Start installation in background only if there are plugins to install
		if (plugins.length > 0) {
			installSelectedPluginsInBackground();
		}

		// Immediately proceed to next step
		setCurrentStep(3);
	};

	// If all plugins are installed or there are no plugins to show, only hide the plugins section
	const showPluginsSection = !allInstalled && (loading || plugins.length > 0);

	return (
		<>
			<style>
				{`
                    .role-checkbox {
                        position: relative;
                        width: 30px;
                        height: 30px;
                        -webkit-appearance: none;
                        appearance: none;
                        border: 2px solid #d1d5db; /* gray-300 */
                        border-radius: 4px;
                        cursor: pointer;
                    }

                    .role-checkbox:checked {
                        background-color: #5C2EDE;
                        border-color: #0017E1;
                    }

                    .role-checkbox:checked::after {
                        content: '';
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        width: 4px;
                        height: 8px;
                        border-right: 2px solid #fff;
                        border-bottom: 2px solid #fff;
                        transform: translate(-50%, -60%) rotate(45deg);
                    }
                `}
			</style>
			<div
				className="bg-background-primary border-[0.5px] items-start justify-center border-subtle rounded-xl shadow-sm mb-6 p-4 flex flex-col"
				style={{ width: "672px" }}
			>
				{showPluginsSection && (
					<div className="rounded-lg bg-white w-full">
						<div
							className="flex flex-col items-start justify-between p-4"
							style={{ paddingBottom: "0" }}
						>
							<p
								className="text-text-primary m-0 mb-2 hfe-65-width"
								style={{
									fontSize: "24px",
									lineHeight: "1.3em",
								}}
							>
								{__(
									"Recommended Essentials",
									"header-footer-elementor",
								)}
							</p>
							<span
								className="text-md font-medium m-0 mb-2"
								style={{
									lineHeight: "1.5em",
									color: "#111827",
								}}
							>
								{__(
									"These free plugins add essential features to your website and help speed up your workflow. Select the plugins you want to install.",
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
												setUpdateCounter={
													setUpdateCounter
												}
												onPluginSelect={
													handlePluginSelect
												}
											/>
										</Container.Item>
									))}
								</Container>
							)}
						</div>
					</div>
				)}
				<div className="px-5 bg-white rounded-lg">
					<h3
						className={`text-base font-semibold text-gray-900 ${
							!showPluginsSection ? "text-xl mb-3" : ""
						}`}
					>
						{__(
							"Get Important Notifications and Updates",
							"header-footer-elementor",
						)}
					</h3>
					<div className="flex flex-row items-start gap-4 mb-4">
						<div className="flex flex-col flex-1">
							<label className="text-sm font-medium text-gray-700 mb-2">
								{__("First Name", "header-footer-elementor")}
							</label>
							<input
								type="text"
								name="firstName"
								value={formData.firstName}
								onChange={(e) =>
									handleInputChange(
										"firstName",
										e.target.value,
									)
								}
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
								placeholder={__(
									"Enter your first name",
									"header-footer-elementor",
								)}
								style={{
									height: "48px",
									fontSize: "14px",
								}}
							/>
						</div>
						<div className="flex flex-col flex-1">
							<label className="text-sm font-medium text-gray-700 mb-2">
								{__("Email Address", "header-footer-elementor")}
							</label>
							<input
								type="email"
								name="email"
								value={formData.email}
								onChange={(e) =>
									handleInputChange("email", e.target.value)
								}
								className="role-checkbox w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
								placeholder={__(
									"Enter your email address",
									"header-footer-elementor",
								)}
								style={{
									height: "48px",
									fontSize: "14px",
								}}
							/>
						</div>
					</div>
					<div className="flex items-start gap-3">
						<input
							type="checkbox"
							id="notifications-checkbox"
							checked={formData.notifications}
							onChange={(e) =>
								handleInputChange(
									"notifications",
									e.target.checked,
								)
							}
							className="role-checkbox mt-1 h-4 w-4 text-[#5C2EDE] focus:ring-[#5C2EDE] border-gray-300 rounded"
						/>
						<label
							htmlFor="notifications-checkbox"
							className="text-sm text-gray-600 leading-relaxed"
						>
							{__(
								"Notify me about critical updates and new features — and help us improve by sharing how you use the plugin. ",
								"header-footer-elementor",
							)}
							<a
								href="#"
								className="text-purple-600 underline hover:text-purple-700"
							>
								{__(
									"Privacy Policy",
									"header-footer-elementor",
								)}
							</a>
						</label>
					</div>
				</div>
				<div className="flex w-full justify-between items-center pt-6 hfe-onboarding-bottom" style={{ paddingLeft: "8px", paddingRight: "8px" }}>
					<Button
						className="flex items-center gap-1 hfe-remove-ring"
						icon={<ChevronLeft />}
						variant="outline"
						onClick={() => setCurrentStep(1)}
					>
						{__("Back", "header-footer-elementor")}
					</Button>
					<div className="flex justify-between items-center" style={{ paddingRight: "1.875rem"}}>
						<Button
							className="hfe-remove-ring text-text-tertiary"
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
								backgroundColor: "#5C2EDE",
								transition: "background-color 0.3s ease",
								padding: "12px",
							}}
							onClick={handleNextClick}
						>
							{__("Next", "header-footer-elementor")}
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};

export default ExtendOnboarding;
