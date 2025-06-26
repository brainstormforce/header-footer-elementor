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
		<div className="bg-background-primary border-[0.5px] items-start justify-center border-subtle rounded-xl shadow-sm mb-6 p-8 flex w-1/2 flex-col">
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
            <div>
               	<span
						className="text-md font-medium m-0 mb-2"
						style={{ lineHeight: "1.5em", color: "#111827" }}
					>
						{__(
							"Get Important Notifications and Updates",
							"header-footer-elementor",
						)}
					</span>
                      <div className="flex flex-row items-center mt-1 w-full gap-3">
                                <Container.Item className="flex flex-col space-y-1 basis-1/2 flex-1">
                                    <Title
                                        icon={null}
                                        iconPosition="right"
                                        size="xs"
                                        tag="h2"
                                        title={__('First Name', 'uael')}
                                        description=""
                                        className="uae-subtitle"
                                    />
                                    <input
                                        type="text"
                                        name="" // Match the key with the backend
                                        // value={settings.recaptcha_v3_secretkey}
                                        // onChange={(e) => handleChange(e.target.name, e.target.value)}
                                        className='w-full border border-subtle px-2'
                                        placeholder={__('', 'uael')}
                                        style={{
                                            height: '48px',
                                            borderColor: '#e0e0e0', // Default border color
                                            outline: 'none',       // Removes the default outline
                                            boxShadow: 'none',     // Removes the default box shadow
                                            // marginTop: '16px'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = '#6005FF'} // Apply focus color
                                        onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}  // Revert to default color
                                    />
                                </Container.Item>

                                <Container.Item className="flex flex-col space-y-1 basis-1/2 flex-1">
                                    <Title
                                        icon={null}
                                        iconPosition="right"
                                        size="xs"
                                        tag="h2"
                                        title={__('Email Address', 'uael')}
                                        description=""
                                        className="uae-subtitle"
                                    />
                                    {/* <p className='font-normal text-field-label text-base'>{__('Score Threshold', 'uael')}</p> */}
                                    <input
                                        type="text"
                                        name="" // Match the key with the backend
                                        // value={settings.recaptcha_v3_score}
                                        // onChange={(e) => handleChange(e.target.name, e.target.value)}
                                        className='w-full border border-subtle px-2'
                                        placeholder={__('', 'uael')}
                                        style={{
                                            height: '48px',
                                            borderColor: '#e0e0e0', // Default border color
                                            outline: 'none',       // Removes the default outline
                                            boxShadow: 'none',     // Removes the default box shadow
                                            // marginTop: '16px'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = '#6005FF'} // Apply focus color
                                        onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}  // Revert to default color
                                    />
                                </Container.Item>
                            </div>
            </div>
			<div className="flex justify-between items-center pt-1 px-4 gap-4 hfe-onboarding-bottom">
				<Button
					className="flex items-center gap-1 hfe-remove-ring"
					icon={<ChevronLeft />}
					variant="outline"
					onClick={() => setCurrentStep(1)}
				>
					{__("Back", "header-footer-elementor")}
				</Button>
				<div className="flex justify-end items-center gap-3">
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
							backgroundColor: "#6005FF",
							transition: "background-color 0.3s ease",
							padding: "12px",
						}}
						onClick={() => setCurrentStep(3)}
					>
						{__(" Continue Setup", "header-footer-elementor")}
					</Button>
				</div>
			</div>
		</div>
	);
};

export default ExtendOnboarding;
