import React, { useEffect, useState } from "react";
import { Container, Switch, Tooltip, Badge } from "@bsf/force-ui";
import { InfoIcon, FileText, Monitor } from "lucide-react";
import apiFetch from "@wordpress/api-fetch";
import { __ } from "@wordpress/i18n";

// Create a queue to manage AJAX requests
const requestQueue = [];

const processQueue = () => {
	if (requestQueue.length === 0) return;

	// Take the first item from the queue and run it
	const currentRequest = requestQueue.shift();
	currentRequest();
};

const WidgetItem = ({ widget, updateCounter, showTooltip }) => {
	const {
		id,
		icon,
		title,
		infoText,
		is_pro,
		is_active,
		slug,
		demo_url,
		doc_url,
		description,
		is_new,
	} = widget;

	// Track the active state of the widget using React state
	const [isActive, setIsActive] = useState(widget.is_active);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		// Update local state when the widget prop changes
		setIsActive(widget.is_active);
	}, [widget.is_active, updateCounter]);

	const apiCall = (activateWidget) => {
		const action = activateWidget
			? "hfe_deactivate_widget"
			: "hfe_activate_widget";

		const formData = new window.FormData();
		formData.append("action", action);
		formData.append("nonce", hfe_admin_data.nonce);
		formData.append("module_id", id);
		formData.append("is_pro", is_pro);

		try {
			const data = apiFetch({
				url: hfe_admin_data.ajax_url,
				method: "POST",
				body: formData,
			});

			if (data.success) {
				setIsActive(isActive); // Update the active state after the request
			} else if (data.error) {
			}
		} catch (err) {
		} finally {
			setIsLoading(false); // Always stop the loading spinner
			processQueue();
		}
	};

	const handleSwitchChange = () => {
		if (isLoading) return;

		setIsLoading(true);

		if (isActive) {
			// Add the request to the queue
			setIsActive(false);
			requestQueue.push(() => apiCall(isActive));
		} else {
			// Add the request to the queue
			setIsActive(true);
			requestQueue.push(() => apiCall(isActive));
		}
		if (requestQueue.length === 1) {
			// Start processing the queue if no other request is being processed
			processQueue();
		}
	};

	return (
		<Container
			align="center"
			containerType="flex"
			direction="column"
			justify="between"
			gap=""
		>
			{/* Top section with icon and switch/badge */}
			<div className="flex items-start justify-between w-full mb-4">
				<div
					className={`h-10 w-10 ${icon?.props}`}
					style={{ fontSize: "22px" }}
				>
					{icon}
				</div>

				<div className="flex items-center gap-x-2">
					{is_pro ? (
						<Tooltip
							arrow
							content={
								<span>
									{__(
										"Available in UAE Pro. Click to ",
										"header-footer-elementor",
									)}
									<a
										href="https://your-link.com" // Replace with actual upgrade URL
										target="_blank"
										rel="noopener noreferrer"
										style={{
											color: "#D946EF",
											textDecoration: "underline",
										}}
									>
										{__(
											"learn more",
											"header-footer-elementor",
										)}
									</a>
									.
								</span>
							}
							placement="bottom"
							variant="dark"
							size="xs"
							triggers={["hover", "focus"]}
						>
							<Switch
								onChange={() => {}} // No action for pro widgets
								size="xs"
								value={false} // Always off for pro widgets
								disabled={true} // Disabled state
								style={{ outline: "none", cursor: "default" }}
								className="hfe-remove-ring outline-none"
							/>
						</Tooltip>
					) : (
						<Switch
							onChange={handleSwitchChange}
							size="xs"
							value={isActive}
							style={{ outline: "none" }}
							className="hfe-remove-ring outline-none"
						/>
					)}
				</div>
			</div>

			{/* Title and info icon section */}
			<div className="flex items-start justify-between w-full">
				<p
					className="text-sm font-medium text-text-primary m-0 w-full leading-tight flex items-center overflow-hidden"
					style={{
						display: "-webkit-box",
						WebkitLineClamp: 1,
						WebkitBoxOrient: "vertical",
						wordBreak: "break-word",
					}}
				>
					{title}
				</p>
				{/* {showTooltip && (
					<div className="ml-2">
							<Tooltip
								arrow
								content={
									<div>
										<span className="text-xs font-semibold block mb-2">
											{title}
										</span>
										<span className="block mb-2">
											{description}
										</span>
										{doc_url && (
											<a
												href={doc_url}
												target="_blank"
												rel="noopener noreferrer"
												className="cursor-pointer"
												style={{
													color: "#B498E5",
													textDecoration: "none",
												}}
											>
												<FileText
													style={{
														color: "#B498E5",
														width: "11px",
														height: "11px",
														marginRight: "3px",
													}}
												/>
												{__(
													"Read Documentation",
													"header-footer-elementor",
												)}
											</a>
										)}
									</div>
								}
								placement="bottom"
								title=""
								triggers={["click"]}
								variant="dark"
								size="xs"
							>
								<Monitor 
									className="h-4 w-4"
									size={16}
									color="#A0A5B2"
								/>
							</Tooltip>
					</div>
				)} */}

				<div className="ml-2">
					<Tooltip
						arrow
						content={
							<div>
								{demo_url && (
									<a
										href={demo_url}
										target="_blank"
										rel="noopener noreferrer"
										className="text-sm text-text-tertiary focus:outline-none m-0 mb-1 hfe-remove-ring"
										style={{
											textDecoration: "none",
											lineHeight: "1.5rem",
											outline: "none",
											border: "none",
											boxShadow: "none",
										}}
									>
										{__(
											"View Demo",
											"header-footer-elementor",
										)}
									</a>
								)}
							</div>
						}
						placement="bottom"
						title=""
						triggers={["hover", "focus"]}
						variant="dark"
						size="xs"
					>
						<div
							onClick={() => {
								if (demo_url) {
									window.open(
										demo_url,
										"_blank",
										"noopener,noreferrer",
									);
								}
							}}
							style={{ cursor: demo_url ? "pointer" : "default" }}
							className="inline-flex items-center"
						>
							<Monitor
								className="h-4 w-4"
								size={16}
								color="#A0A5B2"
							/>
						</div>
					</Tooltip>
				</div>
			</div>
		</Container>
	);
};

export default WidgetItem;
