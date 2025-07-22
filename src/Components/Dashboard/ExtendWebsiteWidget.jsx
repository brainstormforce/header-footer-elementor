import React, { useState } from "react";
import { Container, Button, Badge, Dialog } from "@bsf/force-ui";
import apiFetch from "@wordpress/api-fetch";
import { __ } from "@wordpress/i18n";

const ExtendWebsiteWidget = ({
	plugin,
	setUpdateCounter, // Receive setUpdateCounter as a prop
}) => {
	const {
		path,
		slug,
		siteUrl,
		icon,
		type,
		name,
		zipUrl,
		desc,
		wporg,
		isFree,
		action,
		status,
		settings_url,
	} = plugin;
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [pluginData, setPluginData] = useState(null);

	const getAction = (status) => {
		if (status === "Activated") {
			return "site_redirect";
		} else if (status === "Installed") {
			return "hfe_recommended_plugin_activate";
		}
		return "hfe_recommended_plugin_install";
	};

	const handlePluginAction = (e) => {
		const action = e.currentTarget.dataset.action;
		const formData = new window.FormData();
		const currentPluginData = {
			init: e.currentTarget.dataset.init,
			type: e.currentTarget.dataset.type,
			slug: e.currentTarget.dataset.slug,
			name: e.currentTarget.dataset.pluginname,
		};

		switch (action) {
			case "hfe_recommended_plugin_activate":
				// Confirmation only for theme activation
				if (currentPluginData.type === "theme") {
					// Show dialog for confirmation
					setPluginData(currentPluginData);
					setIsDialogOpen(true);
				} else {
					// Directly activate for non-theme plugins
					activatePlugin(currentPluginData);
				}
				break;

			case "hfe_recommended_plugin_install":
				// Installation process without any confirmation
				formData.append(
					"action",
					currentPluginData.type === "theme"
						? "hfe_recommended_theme_install"
						: "hfe_recommended_plugin_install",
				);
				formData.append("_ajax_nonce", hfe_admin_data.installer_nonce);
				formData.append("slug", currentPluginData.slug);

				e.target.innerText = __(
					"Installing..",
					"header-footer-elementor",
				);

				apiFetch({
					url: hfe_admin_data.ajax_url,
					method: "POST",
					body: formData,
				}).then((data) => {
					if (data.success || data.errorCode === "folder_exists") {
						e.target.innerText = __(
							"Installed",
							"header-footer-elementor",
						);
						if (currentPluginData.type === "theme") {
							// Change button state to "Activate" after successful installation
							const buttonElement = document.querySelector(
								`[data-slug="${currentPluginData.slug}"]`,
							);
							buttonElement.dataset.action =
								"hfe_recommended_plugin_activate";
							e.target.innerText = __(
								"Activate",
								"header-footer-elementor",
							);
						} else {
							activatePlugin(currentPluginData);
						}
					} else {
						e.target.innerText = __(
							"Install",
							"header-footer-elementor",
						);
						alert(
							currentPluginData.type === "theme"
								? __(
										"Theme Installation failed, Please try again later.",
										"header-footer-elementor",
								  )
								: __(
										"Plugin Installation failed, Please try again later.",
										"header-footer-elementor",
								  ),
						);
					}
				});
				break;

			case "site_redirect":
				window.open(siteUrl, "_blank"); // Open siteUrl in a new tab
				break;

			default:
				// Do nothing.
				break;
		}
	};

	const activatePlugin = (pluginData) => {
		setIsDialogOpen(false);
		const formData = new window.FormData();
		formData.append("action", "hfe_recommended_plugin_activate");
		formData.append("nonce", hfe_admin_data.nonce);
		formData.append("plugin", pluginData.init);
		formData.append("type", pluginData.type);
		formData.append("slug", pluginData.slug);

		const buttonElement = document.querySelector(
			`[data-slug="${pluginData.slug}"]`,
		);
		const spanElement = buttonElement.querySelector("span");

		spanElement.innerText = __("Activating..", "header-footer-elementor");

		apiFetch({
			url: hfe_admin_data.ajax_url,
			method: "POST",
			body: formData,
		}).then((data) => {
			if (data.success) {
				if (spanElement) {
					// Check if spanElement is not null
					buttonElement.style.color = "#16A34A";
					buttonElement.dataset.action = "site_redirect";
					buttonElement.classList.add("hfe-plugin-activated");
					spanElement.innerText = __(
						"Activated",
						"header-footer-elementor",
					);
					window.open(settings_url, "_blank");
					setTimeout(() => {
						// Reload the section or recall the REST API
						setUpdateCounter((prev) => prev + 1);
					}, 5000);
				}
			} else {
				if ("theme" == pluginData.type) {
					// console.log(__(`Theme Activation failed, Please try again later.`, 'header-footer-elementor'));
				} else {
					// console.log(__(`Plugin Activation failed, Please try again later.`, 'header-footer-elementor'));
				}
				const buttonElement = document.querySelector(
					`[data-slug="${pluginData.slug}"]`,
				);
				if (buttonElement) {
					// Check if buttonElement is not null
					const spanElement = buttonElement.querySelector("span");
					if (spanElement) {
						// Check if spanElement is not null
						spanElement.innerText = __(
							"Activate",
							"header-footer-elementor",
						);
					}
				}
			}
		});
	};

	return (
		<Container
			align="center"
			containerType="flex"
			direction="column"
			justify="between"
			gap="lg"
		>
			<div className="flex items-center justify-between w-full">
				<div className="h-5 w-5">
					<img
						src={icon}
						alt="Recommended Plugins/Themes"
						className="w-full h-auto rounded cursor-pointer"
						style={{
							width: "140px",
							height: "140px",
							marginTop: "-55px",
						}}
					/>
				</div>

				<div className="flex items-center gap-x-2">
					{/* {isFree && (
						<Badge
							label={__("Free", "header-footer-elementor")}
							size="xs"
							type="pill"
							variant="green"
						/>
					)} */}
					<Dialog
						design="simple"
						open={isDialogOpen}
						setOpen={setIsDialogOpen}
					>
						<Dialog.Backdrop />
						<Dialog.Panel>
							<Dialog.Header>
								<div className="flex items-center justify-between">
									<Dialog.Title>
										{__(
											"Activate Theme",
											"header-footer-elementor",
										)}
									</Dialog.Title>
								</div>
								<Dialog.Description>
									{__(
										"Are you sure you want to switch your current theme to Astra?",
										"header-footer-elementor",
									)}
								</Dialog.Description>
							</Dialog.Header>
							<Dialog.Footer>
								<Button
									onClick={() => activatePlugin(pluginData)}
								>
									{__("Yes", "header-footer-elementor")}
								</Button>
								<Button
									variant="outline"
									onClick={() => setIsDialogOpen(false)}
								>
									{__("Close", "header-footer-elementor")}
								</Button>
							</Dialog.Footer>
						</Dialog.Panel>
					</Dialog>
				</div>
			</div>

			<div className="flex flex-col w-full pb-4">
				<p
					className="text-base font-medium text-text-primary pb-1 m-0 cursor-pointer"
					onClick={() => window.open(plugin.siteurl, "_blank")}
					style={{ marginTop: "-8px" }}
				>
					{__(name, "header-footer-elementor")}
				</p>
				<p className="text-sm font-medium text-text-tertiary m-0">
					{__(desc, "header-footer-elementor")}
				</p>
				<div className="hfe-remove-ring">
					<Button
						size="sm"
						className="cursor-pointer hfe-remove-ring bg-white hover:bg-gray-100 hover:text-gray-900 hover:shadow-md text-gray-800 rounded mt-4 px-2 py-2 transition-all duration-200 ease-in-out transform hover:scale-105 hover:border-gray-400"
						onClick={handlePluginAction}
						data-plugin={zipUrl}
						data-type={type}
						data-pluginname={name}
						data-slug={slug}
						data-site={siteUrl}
						data-init={path}
						data-action={getAction(status)}
						style={{ outline: "none", border: "1px solid #ccc" }}
						onMouseEnter={(e) =>
							(e.currentTarget.style.color = "#5C2EDE")
						}
						onMouseLeave={(e) =>
							(e.currentTarget.style.color = "black")
						}
					>
						{status === "Activated"
							? __("Visit Site", "header-footer-elementor")
							: "Installed" === status
							? __("Activate", "header-footer-elementor")
							: __(
									"Install & Activate",
									"header-footer-elementor",
							  )}
					</Button>
				</div>
			</div>
		</Container>
	);
};

export default ExtendWebsiteWidget;
