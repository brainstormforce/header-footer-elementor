import React, { useState, useEffect } from "react";
import { Plus, Copy } from "lucide-react";
import { Button, Loader } from "@bsf/force-ui";
import { __ } from "@wordpress/i18n";
import apiFetch from "@wordpress/api-fetch";
import withDisplayConditions from "./DisplayConditionsDialog";
import EmptyState from "./EmptyState";
import LayoutDropdownMenu from "./LayoutDropdownMenu";
import InlineTitleEditor from "./InlineTitleEditor";
import useCopyShortcode from "./hooks/useCopyShortcode";
import toast, { Toaster } from "react-hot-toast";

// Example: Ensure these values are coming from global/localized JS in WordPress

const AllLayouts = ({
	openDisplayConditionsDialog,
	DisplayConditionsDialog,
	isButtonLoading,
}) => {
	// Use the custom hook for copy shortcode functionality
	const { handleCopyShortcode } = useCopyShortcode();
	const [layoutItems, setlLayoutItems] = useState([]);
	const [hasLayoutItems, setHasLayoutItems] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	// Initialize showDummyCards from localStorage to persist state across page refreshes
	const [showDummyCards, setShowDummyCards] = useState(() => {
		const saved = localStorage.getItem("hfe_showDummyCards");
		return saved ? JSON.parse(saved) : false;
	});

	// Add custom styles for toast positioning
	useEffect(() => {
		const style = document.createElement("style");
		style.textContent = `
			.toast-confirmation {
				z-index: 999999 !important;
			}
			.toast-confirmation > div {
				max-width: 400px !important;
			}
		`;
		document.head.appendChild(style);

		return () => {
			document.head.removeChild(style);
		};
	}, []);

	// Define dummy layout types
	const dummyLayoutTypes = [
		{
			id: null,
			name: "header",
			title: __("Header", "header-footer-elementor"),
			description: __(
				"Create a custom header layout for your website",
				"header-footer-elementor",
			),
			image: hfeSettingsData.header_card || "",
			template_type: "header",
		},
		{
			id: null,
			name: "footer",
			title: __("Footer", "header-footer-elementor"),
			description: __(
				"Create a custom footer layout for your website",
				"header-footer-elementor",
			),
			image:
				hfeSettingsData.footer_card ||
				hfeSettingsData.header_card ||
				"",
			template_type: "footer",
		},
		{
			id: null,
			name: "before_footer",
			title: __("Before Footer", "header-footer-elementor"),
			description: __(
				"Create a layout that appears before the footer",
				"header-footer-elementor",
			),
			image:
				hfeSettingsData.before_footer_card ||
				hfeSettingsData.header_card ||
				"",
			template_type: "before_footer",
		},
		{
			id: null,
			name: "custom",
			title: __("Custom Block", "header-footer-elementor"),
			description: __(
				"Create a custom block that can be used anywhere",
				"header-footer-elementor",
			),
			image:
				hfeSettingsData.custom_block_card ||
				hfeSettingsData.header_card ||
				"",
			template_type: "custom",
		},
	];

	// Save showDummyCards state to localStorage whenever it changes
	useEffect(() => {
		localStorage.setItem(
			"hfe_showDummyCards",
			JSON.stringify(showDummyCards),
		);
	}, [showDummyCards]);

	// Function to refresh layout data
	const refreshLayoutData = () => {
		setIsLoading(true);
		apiFetch({
			path: "/hfe/v1/get-post",
			method: "POST",
			data: {
				type: "",
			},
		})
			.then((response) => {
				if (response.success && response.posts) {
					setlLayoutItems(response.posts);
					setHasLayoutItems(response.posts.length > 0);

					// Clear localStorage if layouts are found
					if (response.posts.length > 0) {
						localStorage.removeItem("hfe_showDummyCards");
						setShowDummyCards(false);
					}
				} else {
					setHasLayoutItems(false);
					console.error("Failed to fetch posts:", response);
				}
			})
			.catch((error) => {
				setHasLayoutItems(false);
				console.error("Error fetching posts:", error);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	useEffect(() => {
		// Fetch the target rule options when component mounts
		refreshLayoutData();
	}, []);

	const handleCreateLayout = (item) => {
		console.log(item);
		if (!item.id) {
			apiFetch({
				path: "/hfe/v1/create-layout",
				method: "POST",
				data: {
					title: `UAE ${item.title}`,
					type: item.name,
				},
			})
				.then((response) => {
					if (response.success && response.post_id) {
						// Create the new layout item with the response data

						const newLayoutItem = {
							id: response.post_id,
							title: `${response.post["title"]}`,
							name: item.name,
							template_type: item.template_type,
							post_status: "draft", // or whatever status is returned
							// Add any other properties that might be needed
						};

						// Update the layoutItems state to include the new item
						setlLayoutItems((prevItems) => [
							...prevItems,
							newLayoutItem,
						]);

						// Update hasLayoutItems to true since we now have items
						setHasLayoutItems(true);

						// Hide dummy cards and clear localStorage
						setShowDummyCards(false);
						localStorage.removeItem("hfe_showDummyCards");

						// Update item with new post ID for further processing
						const updatedItem = { ...item, id: response.post_id };

						// For custom blocks, redirect to Elementor editor
						if (item.template_type === "custom") {
							// Get the edit URL from the response or construct it
							const editUrl = response.edit_url || response.post.edit_url || 
								`${window.location.origin}/wp-admin/post.php?post=${response.post_id}&action=elementor`;

							// Open in new tab
							window.open(editUrl, "_blank");
							
							refreshLayoutData();
						} else {
							// Open display conditions dialog using HOC function with isNew flag
							openDisplayConditionsDialog(updatedItem, true);
						}

						// Show success toast
						toast.success(
							__(
								"Layout created successfully!",
								"header-footer-elementor",
							),
						);
					} else {
						console.error("Failed to create post:", response);
						toast.error(
							__(
								"Failed to create layout. Please try again.",
								"header-footer-elementor",
							),
						);
					}
				})
				.catch((error) => {
					console.error("Error creating post:", error);
					toast.error(
						__(
							"Error creating layout. Please try again.",
							"header-footer-elementor",
						),
					);
				});
		} else {
			// Post already exists, open dialog directly
			if (item.template_type === "custom") {
				// Use edit_url from item data if available, otherwise construct it
				const elementorEditUrl = item.edit_url || `${window.location.origin}/wp-admin/post.php?post=${item.id}&action=elementor`;
				window.open(elementorEditUrl, "_blank");
			} else {
				openDisplayConditionsDialog(item, false);
			}
		}
	};

	const handleRedirect = (url) => {
		window.open(url, "_blank");
	};

	const handleDisplayConditons = (item) => {
		openDisplayConditionsDialog(item, false);
	};

	/**
	 * Handle item updates from dropdown menu and inline editor
	 */
	const handleItemUpdate = (itemId, updates) => {
		setlLayoutItems((prevItems) =>
			prevItems.map((item) =>
				item.id === itemId ? { ...item, ...updates } : item,
			),
		);
	};

	/**
	 * Handle item deletion from dropdown menu
	 */
	const handleItemDelete = (itemId) => {
		setlLayoutItems((prevItems) => {
			const updatedItems = prevItems.filter((item) => item.id !== itemId);
			// Update hasLayoutItems state if no items left
			if (updatedItems.length === 0) {
				setHasLayoutItems(false);
			}
			return updatedItems;
		});
	};
	// Show loading state while fetching data
	if (isLoading) {
		return (
			<>
				<div className="flex items-center justify-center min-h-screen w-full">
					<div className="">
						<Loader
							className=""
							icon={null}
							size="lg"
							variant="primary"
						/>
					</div>
				</div>

				{/* Render the Display Conditions Dialog from HOC */}
				<DisplayConditionsDialog />

				{/* React Hot Toast Notifications */}
				<Toaster
					position="top-right"
					reverseOrder={false}
					gutter={8}
					containerStyle={{
						top: 20,
						right: 20,
						marginTop: "40px",
					}}
					toastOptions={{
						duration: 1000,
						style: {
							background: "white",
						},
						success: {
							duration: 2000,
							style: {
								color: "",
							},
							iconTheme: {
								primary: "#6005ff",
								secondary: "#fff",
							},
						},
					}}
				/>
			</>
		);
	}

	if (!hasLayoutItems) {
		// Show dummy cards when no layouts exist
		if (showDummyCards) {
			return (
				<>
					<div
						className=""
						style={{ paddingLeft: "40px", paddingRight: "40px" }}
					>
						<div
							className="flex items-start gap-10 justify-between"
							style={{ padding: "0 40px", marginBottom: "10px" }}
						>
							<h2
								className="text-base font-medium text-foreground"
								style={{ marginLeft: "-10px" }}
							>
								{__(
									"Choose Layout Type",
									"header-footer-elementor",
								)}
							</h2>
							{/* <Button
								variant="secondary"
								className="text-sm"
								onClick={() => {
									setShowDummyCards(false);
									// Clear the localStorage when going back
									localStorage.removeItem(
										"hfe_showDummyCards",
									);
								}}
							>
								{__("Back", "header-footer-elementor")}
							</Button> */}
						</div>

						<div
							className="grid grid-cols-1 md:grid-cols-2 gap-6"
							style={{ paddingLeft: "30px" }}
						>
							{dummyLayoutTypes.map((layoutItem) => (
								<div
									key={layoutItem.name}
									className="border bg-background-primary border-gray-200 p-2 rounded-lg cursor-pointer overflow-hidden flex flex-col group relative shadow-sm hover:shadow-md transition-shadow duration-200"
									onMouseEnter={(e) => {
										const overlay =
											e.currentTarget.querySelector(
												".hover-overlay",
											);
										if (overlay) {
											overlay.style.opacity = "1";
											overlay.style.visibility =
												"visible";
											overlay.style.transform =
												"translateY(0)";
										}
									}}
									onMouseLeave={(e) => {
										const overlay =
											e.currentTarget.querySelector(
												".hover-overlay",
											);
										if (overlay) {
											overlay.style.opacity = "0";
											overlay.style.visibility = "hidden";
											overlay.style.transform =
												"translateY(10px)";
										}
									}}
								>
									<div className="relative h-60 w-full">
										<img
											src={layoutItem.image}
											alt={`${layoutItem.title} Layout`}
											style={{ height: "220px" }}
											className="w-full object-cover"
										/>

										<div
											className="hover-overlay absolute inset-0 flex items-center gap-2 justify-center rounded-lg overflow-hidden backdrop-blur-sm transition-all duration-500 ease-in-out z-30"
											style={{
												backgroundColor:
													"rgba(0, 0, 0, 0.4)",
												opacity: "0",
												visibility: "hidden",
												transform: "translateY(10px)",
											}}
										>
											<Button
												iconPosition="left"
												icon={<Plus size={14} />}
												variant="primary"
												className="bg-[#6005FF] font-medium text-white hfe-remove-ring z-50"
												style={{
													backgroundColor:
														"#6005FF !important",
													fontSize: "12px",
													fontWeight: "600",
													padding: "8px 8px",
													borderRadius: "6px",
													transition: "all 0.2s ease",
													outline: "none",
													transform: "scale(0.95)",
													opacity: "1",
												}}
												onMouseEnter={(e) => {
													e.currentTarget.style.backgroundColor =
														"#4B00CC";
													e.currentTarget.style.transform =
														"scale(1)";
												}}
												onMouseLeave={(e) => {
													e.currentTarget.style.backgroundColor =
														"#6005FF";
													e.currentTarget.style.transform =
														"scale(0.95)";
												}}
												onClick={() =>
													handleCreateLayout(
														layoutItem,
													)
												}
											>
												{__(
													`Create ${layoutItem.title}`,
													"header-footer-elementor",
												)}
											</Button>
										</div>
									</div>
									<div className="">
										<hr
											className="w-full border-b-0 border-x-0 border-t border-solid border-t-border-subtle"
											style={{
												// marginTop: "8px",
												// marginBottom: "8px",
												borderColor: "#E5E7EB",
											}}
										/>
										<div className="flex items-center justify-between px-1">
											<p className="text-sm font-medium text-gray-900">
												{layoutItem.title}
											</p>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>

					{/* Render the Display Conditions Dialog from HOC */}
					<DisplayConditionsDialog />

					{/* React Hot Toast Notifications */}
					<Toaster
						position="top-right"
						reverseOrder={false}
						gutter={8}
						containerStyle={{
							top: 20,
							right: 20,
							marginTop: "40px",
						}}
						toastOptions={{
							duration: 1000,
							style: {
								background: "white",
							},
							success: {
								duration: 2000,
								style: {
									color: "",
								},
								iconTheme: {
									primary: "#6005ff",
									secondary: "#fff",
								},
							},
						}}
					/>
				</>
			);
		}

		// Show initial empty state with "Create Layout" button
		return (
			<>
				<EmptyState
					description={__(
						"You haven't created any layouts yet. Build a custom layout to control how your site's top section looks and behaves across all pages.",
						"header-footer-elementor",
					)}
					buttonText={__("Create Layout", "header-footer-elementor")}
					onClick={() => {
						setShowDummyCards(true);
						// Save to localStorage when showing dummy cards
						localStorage.setItem(
							"hfe_showDummyCards",
							JSON.stringify(true),
						);
					}}
				/>

				{/* Render the Display Conditions Dialog from HOC */}
				<DisplayConditionsDialog />

				{/* React Hot Toast Notifications */}
				<Toaster
					position="top-right"
					reverseOrder={false}
					gutter={8}
					containerStyle={{
						top: 20,
						right: 20,
						marginTop: "40px",
					}}
					toastOptions={{
						duration: 1000,
						style: {
							background: "white",
						},
						success: {
							duration: 2000,
							style: {
								color: "",
							},
							iconTheme: {
								primary: "#6005ff",
								secondary: "#fff",
							},
						},
					}}
				/>
			</>
		);
	}

	// Show dummy cards when user clicks "Create Layout" even if layouts exist
	if (showDummyCards) {
		return (
			<>
				<div
					className=""
					style={{ paddingLeft: "40px", paddingRight: "40px" }}
				>
					<div
						className="flex items-start gap-10 justify-between"
						style={{ padding: "0 40px", marginBottom: "10px" }}
					>
						<h2
							className="text-lg font-semibold text-foreground"
							style={{ marginLeft: "-10px" }}
						>
							{__(
								"Choose Layout Type",
								"header-footer-elementor",
							)}
						</h2>
						<Button
							variant="secondary"
							className="text-sm"
							style={{
								outline: "none",
								border: "1px solid #ccc",
								boxShadow: "none",
							}}
							onFocus={(e) => {
								e.currentTarget.style.outline = "none";
								e.currentTarget.style.boxShadow = "none";
							}}
							onClick={() => {
								setShowDummyCards(false);
								// Clear the localStorage when going back
								localStorage.removeItem("hfe_showDummyCards");
							}}
						>
							{__("Back", "header-footer-elementor")}
						</Button>
					</div>

					<div
						className="grid grid-cols-1 md:grid-cols-2 gap-6"
						style={{ paddingLeft: "30px" }}
					>
						{dummyLayoutTypes.map((layoutItem) => (
							<div
								key={layoutItem.name}
								className="border bg-background-primary border-gray-200 p-2 rounded-lg cursor-pointer overflow-hidden flex flex-col group relative shadow-sm hover:shadow-md transition-shadow duration-200"
								onMouseEnter={(e) => {
									const overlay =
										e.currentTarget.querySelector(
											".hover-overlay",
										);
									if (overlay) {
										overlay.style.opacity = "1";
										overlay.style.visibility = "visible";
										overlay.style.transform =
											"translateY(0)";
									}
								}}
								onMouseLeave={(e) => {
									const overlay =
										e.currentTarget.querySelector(
											".hover-overlay",
										);
									if (overlay) {
										overlay.style.opacity = "0";
										overlay.style.visibility = "hidden";
										overlay.style.transform =
											"translateY(10px)";
									}
								}}
							>
								<div className="relative h-60 w-full">
									<img
										src={layoutItem.image}
										alt={`${layoutItem.title} Layout`}
										style={{ height: "220px" }}
										className="w-full object-cover"
									/>

									<div
										className="hover-overlay absolute inset-0 flex items-center gap-2 justify-center rounded-lg overflow-hidden backdrop-blur-sm transition-all duration-500 ease-in-out z-30"
										style={{
											backgroundColor:
												"rgba(0, 0, 0, 0.4)",
											opacity: "0",
											visibility: "hidden",
											transform: "translateY(10px)",
										}}
									>
										<Button
											iconPosition="left"
											icon={<Plus size={14} />}
											variant="primary"
											className="bg-[#6005FF] font-medium text-white hfe-remove-ring z-50"
											style={{
												backgroundColor:
													"#6005FF !important",
												fontSize: "12px",
												fontWeight: "600",
												padding: "8px 8px",
												borderRadius: "6px",
												transition: "all 0.2s ease",
												outline: "none",
												transform: "scale(0.95)",
												opacity: "1",
											}}
											onMouseEnter={(e) => {
												e.currentTarget.style.backgroundColor =
													"#4B00CC";
												e.currentTarget.style.transform =
													"scale(1)";
											}}
											onMouseLeave={(e) => {
												e.currentTarget.style.backgroundColor =
													"#6005FF";
												e.currentTarget.style.transform =
													"scale(0.95)";
											}}
											onClick={() =>
												handleCreateLayout(layoutItem)
											}
										>
											{__(
												`Create ${layoutItem.title}`,
												"header-footer-elementor",
											)}
										</Button>
									</div>
								</div>
								<div className="">
									<hr
										className="w-full border-b-0 border-x-0 border-t border-solid border-t-border-subtle"
										style={{
											// marginTop: "8px",
											// marginBottom: "8px",
											borderColor: "#E5E7EB",
										}}
									/>
									<div className="flex items-center justify-between px-1">
										<p className="text-sm font-medium text-gray-900">
											{layoutItem.title}
										</p>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Render the Display Conditions Dialog from HOC */}
				<DisplayConditionsDialog />

				{/* React Hot Toast Notifications */}
				<Toaster
					position="top-right"
					reverseOrder={false}
					gutter={8}
					containerStyle={{
						top: 20,
						right: 20,
						marginTop: "40px",
					}}
					toastOptions={{
						duration: 1000,
						style: {
							background: "white",
						},
						success: {
							duration: 2000,
							style: {
								color: "",
							},
							iconTheme: {
								primary: "#6005ff",
								secondary: "#fff",
							},
						},
					}}
				/>
			</>
		);
	}

	// Show existing layouts
	else {
		return (
			<>
				<div
					className=""
					style={{ paddingLeft: "40px", paddingRight: "40px" }}
				>
					<div
						className="flex items-start gap-10 justify-between"
						style={{ padding: "0 40px", marginBottom: "10px" }}
					>
						<h2
							className="text-lg font-semibold text-foreground"
							style={{ marginLeft: "-10px" }}
						>
							{__(
								"Start Customising Your Header & Footer",
								"header-footer-elementor",
							)}
						</h2>
						<Button
							iconPosition="left"
							icon={<Plus />}
							variant="primary"
							className="bg-[#6005FF] font-light flex items-center justify-center hfe-remove-ring"
							style={{
								backgroundColor: "#6005FF",
								transition: "background-color 0.3s ease",
								outline: "none",
							}}
							onMouseEnter={(e) =>
								(e.currentTarget.style.backgroundColor =
									"#4B00CC")
							}
							onMouseLeave={(e) =>
								(e.currentTarget.style.backgroundColor =
									"#6005FF")
							}
							onClick={() => {
								console.log("Create Layout button clicked");
								console.log(
									"Current showDummyCards:",
									showDummyCards,
								);
								setShowDummyCards(true);
								localStorage.setItem(
									"hfe_showDummyCards",
									JSON.stringify(true),
								);
								console.log("Set showDummyCards to true");
							}}
						>
							{__("Create Layout", "header-footer-elementor")}
						</Button>
					</div>
					<hr
						className="border-b-0 border-x-0 border-t border-solid border-t-border-transparent-subtle"
						style={{
							marginTop: "10px",
							marginBottom: "15px",
							width: "95%",
							// borderColor: "#E5E7EB",
						}}
					/>

					<div
						className="grid grid-cols-1 md:grid-cols-2 gap-6"
						style={{ paddingLeft: "30px" }}
					>
						{layoutItems.map((item) => (
							<div
								key={item.title}
								className="border bg-background-primary border-gray-200 p-2 rounded-lg cursor-pointer overflow-hidden flex flex-col group relative shadow-sm hover:shadow-md transition-shadow duration-200"
								onMouseEnter={(e) => {
									const overlay =
										e.currentTarget.querySelector(
											".hover-overlay",
										);
									if (overlay) {
										overlay.style.opacity = "1";
										overlay.style.visibility = "visible";
										overlay.style.transform =
											"translateY(0)";
									}
								}}
								onMouseLeave={(e) => {
									const overlay =
										e.currentTarget.querySelector(
											".hover-overlay",
										);
									if (overlay) {
										overlay.style.opacity = "0";
										overlay.style.visibility = "hidden";
										overlay.style.transform =
											"translateY(10px)";
									}
								}}
							>
								<div className="relative h-60 w-full">
									<img
										src={hfeSettingsData.header_card}
										alt={`${item.title} Layout`}
										style={{ height: "220px" }}
										className="w-full object-cover"
									/>

									<div
										className="hover-overlay absolute inset-0 flex flex-col items-center gap-1 justify-center rounded-lg overflow-hidden backdrop-blur-sm transition-all duration-500 ease-in-out z-30"
										style={{
											backgroundColor:
												"rgba(0, 0, 0, 0.4)",
											opacity: "0",
											visibility: "hidden",
											transform: "translateY(10px)",
										}}
									>
										{item.template_type === "custom" ? (
											<Button
												iconPosition="left"
												icon={
													item.name !==
													"Custom Block" ? (
														<Copy size={14} />
													) : null
												}
												variant="primary"
												className="font-medium text-black hfe-remove-ring z-50"
												style={{
													backgroundColor: "white",
													fontSize: "12px",
													fontWeight: "600",
													padding: "8px 8px",
													borderRadius: "6px",
													transition: "all 0.2s ease",
													outline: "none",
													transform: "scale(0.95)",
													opacity: "1",
												}}
												onMouseEnter={(e) => {
													e.currentTarget.style.backgroundColor =
														"white";
													e.currentTarget.style.transform =
														"scale(1)";
												}}
												onMouseLeave={(e) => {
													e.currentTarget.style.backgroundColor =
														"white";
													e.currentTarget.style.transform =
														"scale(0.95)";
												}}
												onClick={() =>
													handleCopyShortcode(item)
												}
											>
												{__(
													`Copy Shortcode`,
													"header-footer-elementor",
												)}
											</Button>
										) : (
											""
										)}
										<Button
											iconPosition="left"
											icon={
												item.name !== "Custom Block" ? (
													<Plus size={14} />
												) : null
											}
											variant="primary"
											className="bg-[#6005FF] font-medium text-white hfe-remove-ring z-50"
											style={{
												backgroundColor:
													"#6005FF !important",
												fontSize: "12px",
												fontWeight: "600",
												padding: "8px 8px",
												borderRadius: "6px",
												transition: "all 0.2s ease",
												outline: "none",
												transform: "scale(0.95)",
												opacity: "1",
											}}
											onMouseEnter={(e) => {
												e.currentTarget.style.backgroundColor =
													"#4B00CC";
												e.currentTarget.style.transform =
													"scale(1)";
											}}
											onMouseLeave={(e) => {
												e.currentTarget.style.backgroundColor =
													"#6005FF";
												e.currentTarget.style.transform =
													"scale(0.95)";
											}}
											onClick={() => {
												// For existing layouts, open in Elementor editor
												if (item.id) {
                                                    const elementorEditUrl = `${window.location.origin}/wp-admin/post.php?post=${item.id}&action=elementor`;
													window.open(
														elementorEditUrl,
														"_blank",
													);
												} else {
													handleCreateLayout(item);
												}
											}}
										>
											{item.template_type === "custom"
												? "Edit with Elementor"
												: __(
														"Edit Layout",
														"header-footer-elementor",
												  )}
										</Button>
										{item.template_type !== "custom" ? (
											<Button
												iconPosition="left"
												icon={
													isButtonLoading ? (
														<div className="animate-spin rounded-full h-3 w-3 border border-gray-400 border-t-transparent"></div>
													) : (
														<Plus size={14} />
													)
												}
												className=""
												style={{
													backgroundColor: "#ffffff",
													fontSize: "12px",
													fontWeight: "600",
													padding: "8px 8px",
													borderRadius: "6px",
													transition: "all 0.2s ease",
													outline: "none",
													transform: "scale(0.95)",
													opacity: isButtonLoading
														? "0.7"
														: "1",
													color: "#000000",
													border: "1px solid #e5e7eb",
													cursor: isButtonLoading
														? "not-allowed"
														: "pointer",
													display: "inline-flex",
													alignItems: "center",
													justifyContent: "center",
													gap: "4px",
													boxShadow: "none",
												}}
												onMouseEnter={(e) => {
													if (!isButtonLoading) {
														e.currentTarget.style.backgroundColor =
															"#ffffff";
														e.currentTarget.style.color =
															"#000000";
														e.currentTarget.style.borderColor =
															"#d1d5db";
														e.currentTarget.style.outline =
															"none";
														e.currentTarget.style.boxShadow =
															"none";
														e.currentTarget.style.transform =
															"scale(1)";
													}
												}}
												onMouseLeave={(e) => {
													if (!isButtonLoading) {
														e.currentTarget.style.backgroundColor =
															"#ffffff";
														e.currentTarget.style.color =
															"#000000";
														e.currentTarget.style.borderColor =
															"#e5e7eb";
														e.currentTarget.style.outline =
															"none";
														e.currentTarget.style.boxShadow =
															"none";
														e.currentTarget.style.transform =
															"scale(0.95)";
													}
												}}
												onClick={() => {
													if (!isButtonLoading) {
														handleDisplayConditons(
															item,
														);
													}
												}}
												disabled={isButtonLoading}
											>
												{isButtonLoading ? (
													<Loader
														className=""
														icon={null}
														size="lg"
														variant="primary"
													/>
												) : (
													__(
														"Display Conditions",
														"header-footer-elementor",
													)
												)}
											</Button>
										) : (
											""
										)}
									</div>
								</div>
								<div className="">
									<hr
										className="w-full border-b-0 border-x-0 border-t border-solid border-t-border-subtle"
										style={{
											// marginTop: "8px",
											// marginBottom: "8px",
											borderColor: "#E5E7EB",
										}}
									/>
									<div className="flex items-center justify-between px-1">
										<InlineTitleEditor
											item={item}
											onTitleUpdate={handleItemUpdate}
											showDraftStatus={true}
											alwaysShowIcon={true}
										/>
										<LayoutDropdownMenu
											item={item}
											onItemUpdate={handleItemUpdate}
											onItemDelete={handleItemDelete}
											showShortcode={true}
										/>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* Render the Display Conditions Dialog from HOC */}
				<DisplayConditionsDialog />

				{/* React Hot Toast Notifications */}
				<Toaster
					position="top-right"
					reverseOrder={false}
					gutter={8}
					containerStyle={{
						top: 20,
						right: 20,
						marginTop: "40px",
					}}
					toastOptions={{
						duration: 1000,
						style: {
							background: "white",
						},
						success: {
							duration: 2000,
							style: {
								color: "",
							},
							iconTheme: {
								primary: "#6005ff",
								secondary: "#fff",
							},
						},
					}}
				/>
			</>
		);
	}
};

export default withDisplayConditions(AllLayouts);
