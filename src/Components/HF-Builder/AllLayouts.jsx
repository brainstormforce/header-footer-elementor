import React, { useState, useEffect } from "react";
import { Plus, EllipsisVertical, Trash2 } from "lucide-react";
import { Button, DropdownMenu, Loader } from "@bsf/force-ui";
import { __ } from "@wordpress/i18n";
import apiFetch from "@wordpress/api-fetch";
import withDisplayConditions from "./DisplayConditionsDialog";
import EmptyState from "./EmptyState";
import LayoutDropdownMenu from "./LayoutDropdownMenu";
import toast, { Toaster } from "react-hot-toast";

// Example: Ensure these values are coming from global/localized JS in WordPress

const AllLayouts = ({
	openDisplayConditionsDialog,
	DisplayConditionsDialog,
	isButtonLoading,
}) => {
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
		const style = document.createElement('style');
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
		if (!item.id) {
			apiFetch({
				path: "/hfe/v1/create-layout",
				method: "POST",
				data: {
					title: `My Custom ${item.title}`,
					type: item.name,
				},
			})
				.then((response) => {
					if (response.success && response.post_id) {
						// Create the new layout item with the response data
						const newLayoutItem = {
							id: response.post_id,
							title: `My Custom ${item.title}`,
							name: item.name,
							template_type: item.template_type,
							post_status: 'publish', // or whatever status is returned
							// Add any other properties that might be needed
						};

						// Update the layoutItems state to include the new item
						setlLayoutItems(prevItems => [...prevItems, newLayoutItem]);
						
						// Update hasLayoutItems to true since we now have items
						setHasLayoutItems(true);
						
						// Hide dummy cards and clear localStorage
						setShowDummyCards(false);
						localStorage.removeItem("hfe_showDummyCards");

						// Update item with new post ID for further processing
						const updatedItem = { ...item, id: response.post_id };

						// For custom blocks, redirect to Elementor editor
						if (item.template_type === "custom") {
							// Construct Elementor edit URL
							const elementorEditUrl = `${window.location.origin}/wp-admin/post.php?post=${response.post_id}&action=elementor`;
							window.open(elementorEditUrl, "_blank");
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
				// Redirect to Elementor editor for existing custom blocks
				const elementorEditUrl = `${window.location.origin}/wp-admin/post.php?post=${item.id}&action=elementor`;
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
	 * Handle item updates from dropdown menu
	 */
	const handleDisableLayout = async (item) => {
		try {
			const response = await apiFetch({
				path: "/hfe/v1/update-post-status",
				method: "POST",
				data: {
					post_id: item.id,
					status: "draft",
				},
			});

			if (response.success) {
				// Update the item in the state instead of reloading
				setlLayoutItems(prevItems => 
					prevItems.map(layoutItem => 
						layoutItem.id === item.id 
							? { ...layoutItem, post_status: "draft" }
							: layoutItem
					)
				);

				// Show success toast notification
				toast.success(
					__(
						"Layout disabled successfully!",
						"header-footer-elementor",
					),
				);
			} else {
				console.error("Failed to disable layout:", response);
				toast.error(
					__(
						"Failed to disable layout. Please try again.",
						"header-footer-elementor",
					),
				);
			}
		} catch (error) {
			console.error("Error disabling layout:", error);
			toast.error(
				__(
					"Error disabling layout. Please try again.",
					"header-footer-elementor",
				),
			);
		}
	};

	/**
	 * Custom confirmation toast component
	 */
	const showDeleteConfirmation = (item) => {
		toast((t) => (
			<div className="flex flex-col gap-3 p-2">
				<div className="flex items-start gap-3">
					<div className="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center" style={{ marginTop: '12px' }}>
						<Trash2 />
					</div>
					<div className="flex-1">
						<h3 className="text-base font-medium text-gray-900">
							{__("Delete Layout", "header-footer-elementor")}
						</h3>
						<p className="text-base text-gray-600">
							{__("Are you sure you want to delete this layout?", "header-footer-elementor")}
						</p>
						<div className="flex gap-2">
							<button
								onClick={() => {
									toast.dismiss(t.id);
									performDeleteLayout(item);
								}}
								style={{ backgroundColor: '#000'}}
								className="px-3 py-1.5 text-white text-sm font-medium rounded-md focus:outline-none"
							>
								{__("Delete", "header-footer-elementor")}
							</button>
							<button
								style={{ backgroundColor: '#000'}}
								onClick={() => toast.dismiss(t.id)}
								className="px-3 py-1.5 text-white text-sm font-medium rounded-md  focus:outline-none"
							>
								{__("Cancel", "header-footer-elementor")}
							</button>
						</div>
					</div>
				</div>
			</div>
		), {
			duration: Infinity, // Keep open until user decides
			position: 'top-right',
			className: 'toast-confirmation',
			style: {
				background: 'white',
				color: '#374151',
				border: '1px solid #e5e7eb',
				borderRadius: '0.5rem',
				boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
				padding: '0',
				maxWidth: '400px',
				marginTop: '80px',
				marginRight: '20px',
				zIndex: 999999,
			},
		});
	};

	/**
	 * Handle deleting a layout (move to trash)
	 */
	const handleDeleteLayout = (item) => {
		showDeleteConfirmation(item);
	};

	/**
	 * Perform the actual delete operation
	 */
	const performDeleteLayout = async (item) => {

		try {
			// Show loading toast
			const loadingToast = toast.loading(
				__("Deleting layout...", "header-footer-elementor"),
				{
					position: 'bottom-right',
				}
			);

			const response = await apiFetch({
				path: "/hfe/v1/delete-post",
				method: "POST",
				data: {
					post_id: item.id,
				},
			});

			// Dismiss loading toast
			toast.dismiss(loadingToast);

			if (response.success) {
				// Remove the item from the state instead of reloading
				setlLayoutItems(prevItems => 
					prevItems.filter(layoutItem => layoutItem.id !== item.id)
				);

				// Check if we have any items left, if not, update hasLayoutItems
				setlLayoutItems(prevItems => {
					const updatedItems = prevItems.filter(layoutItem => layoutItem.id !== item.id);
					if (updatedItems.length === 0) {
						setHasLayoutItems(false);
					}
					return updatedItems;
				});

				// Show success toast notification
				toast.success(
					__(
						"Layout deleted successfully!",
						"header-footer-elementor",
					),
					{
						position: 'top-right',
						duration: 4000,
						style: {
							marginTop: '20px',
							background: '#10b981',
							color: 'white',
							borderRadius: '0.5rem',
							fontSize: '14px',
							padding: '12px 16px',
							boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
						},
						iconTheme: {
							primary: 'white',
							secondary: '#10b981',
						},
					}
				);
			} else {
				console.error("Failed to delete layout:", response);
				toast.error(
					__(
						"Failed to delete layout. Please try again.",
						"header-footer-elementor",
					),
					{
						position: 'top-center',
						duration: 5000,
						style: {
							background: '#ef4444',
							color: 'white',
							borderRadius: '0.5rem',
							fontSize: '14px',
							padding: '12px 16px',
							boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
						},
						iconTheme: {
							primary: 'white',
							secondary: '#ef4444',
						},
					}
				);
			}
		} catch (error) {
			console.error("Error deleting layout:", error);
			toast.error(
				__(
					"Error deleting layout. Please try again.",
					"header-footer-elementor",
				),
				{
					position: 'top-center',
					duration: 5000,
					style: {
						background: '#ef4444',
						color: 'white',
						borderRadius: '0.5rem',
						fontSize: '14px',
						padding: '12px 16px',
						boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
					},
					iconTheme: {
						primary: 'white',
						secondary: '#ef4444',
					},
				}
			);
		}
	};

	const handleItemUpdate = (itemId, updates) => {
        setlLayoutItems(prevItems => 
            prevItems.map(item => 
                item.id === itemId 
                    ? { ...item, ...updates }
                    : item
            )
        );
    };

	/**
	 * Handle copying shortcode to clipboard
	 */
	const handleCopyShortcode = (item) => {
		const shortcode = `[hfe_template id='${item.id}']`;

		// Copy to clipboard
		if (navigator.clipboard && window.isSecureContext) {
			navigator.clipboard
				.writeText(shortcode)
				.then(() => {
					// Show success toast notification
					toast.success(
						__(
							"Shortcode copied to clipboard!",
							"header-footer-elementor",
						),
					);
				})
				.catch((error) => {
					console.error("Failed to copy shortcode:", error);
					// Fallback method
					fallbackCopyToClipboard(shortcode);
				});
		} else {
			// Fallback method for older browsers or non-secure contexts
			fallbackCopyToClipboard(shortcode);
		}
	};

	/**
	 * Fallback method to copy text to clipboard
	 */
	const fallbackCopyToClipboard = (text) => {
		const textArea = document.createElement("textarea");
		textArea.value = text;
		textArea.style.position = "fixed";
		textArea.style.left = "-999999px";
		textArea.style.top = "-999999px";
		document.body.appendChild(textArea);
		textArea.focus();
		textArea.select();

		try {
			document.execCommand("copy");
			// Show success toast notification
			toast.success(
				__("Shortcode copied to clipboard!", "header-footer-elementor"),
			);
		} catch (error) {
			console.error(
				"Failed to copy shortcode using fallback method:",
				error,
			);
			// Show error toast notification
			toast.error(
				__(
					"Failed to copy shortcode. Please copy manually.",
					"header-footer-elementor",
				),
			);
		}

		document.body.removeChild(textArea);
	};

	/**
	 * Handle item deletion from dropdown menu
	 */
	const handleItemDelete = (itemId) => {
		setlLayoutItems(prevItems => {
			const updatedItems = prevItems.filter(item => item.id !== itemId);
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
					position="bottom-right"
					toastOptions={{
						duration: 3000,
						style: {
							background: "#363636",
							color: "#fff",
							borderRadius: "6px",
							fontSize: "14px",
							padding: "12px 16px",
							boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
						},
						success: {
							iconTheme: {
								primary: "#10B981",
								secondary: "#fff",
							},
						},
						error: {
							iconTheme: {
								primary: "#EF4444",
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
							<h2 className="text-base font-medium text-foreground" style={{ marginLeft: "-10px" }}>
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
							{dummyLayoutTypes.map((layoutType) => (
								<div
									key={layoutType.name}
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
											src={layoutType.image}
											alt={`${layoutType.title} Layout`}
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
														layoutType,
													)
												}
											>
												{__(
													`Create ${layoutType.title}`,
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
												{layoutType.title}
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
						position="bottom-right"
						toastOptions={{
							duration: 3000,
							style: {
								background: "#363636",
								color: "#fff",
								borderRadius: "6px",
								fontSize: "14px",
								padding: "12px 16px",
								boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
							},
							success: {
								iconTheme: {
									primary: "#10B981",
									secondary: "#fff",
								},
							},
							error: {
								iconTheme: {
									primary: "#EF4444",
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
					position="bottom-right"
					toastOptions={{
						duration: 3000,
						style: {
							background: "#363636",
							color: "#fff",
							borderRadius: "6px",
							fontSize: "14px",
							padding: "12px 16px",
							boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
						},
						success: {
							iconTheme: {
								primary: "#10B981",
								secondary: "#fff",
							},
						},
						error: {
							iconTheme: {
								primary: "#EF4444",
								secondary: "#fff",
							},
						},
					}}
				/>
			</>
		);
	} else {
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
							className="text-lg font-medium text-foreground"
							style={{ marginLeft: "-10px" }}
						>
							{__(
								"Start customising Your Header & Footer",
								"header-footer-elementor",
							)}
						</h2>
						{/* <Button
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
                                    (e.currentTarget.style.backgroundColor = "#4B00CC")
                                }
                                onMouseLeave={(e) =>
                                    (e.currentTarget.style.backgroundColor = "#6005FF")
                                }
                                onClick={() => {
                                    window.open("", "_blank");
                                }}
                            >
                                {__("Create Layout", "header-footer-elementor")}
                            </Button> */}
					</div>
                    	<hr
							className="border-b-0 border-x-0 border-t border-solid border-t-border-transparent-subtle"
							style={{
								marginTop: "10px",
								marginBottom: "15px",
                                width: '92%'
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
										<p className="text-sm font-medium text-gray-900">
											{item.title}
											{item.post_status === "draft" && (
												<span className="ml-2 text-xs text-gray-500 font-normal">
													(
													{__(
														"Draft",
														"header-footer-elementor",
													)}
													)
												</span>
											)}
										</p>
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
					position="bottom-right"
					toastOptions={{
						duration: 3000,
						style: {
							background: "#363636",
							color: "#fff",
							borderRadius: "6px",
							fontSize: "14px",
							padding: "12px 16px",
							boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
						},
						success: {
							iconTheme: {
								primary: "#10B981",
								secondary: "#fff",
							},
						},
						error: {
							iconTheme: {
								primary: "#EF4444",
								secondary: "#fff",
							},
						},
					}}
				/>
			</>
		);
	}
};
/**
 * Handle publishing a draft layout (set status to publish)
 */
const handlePublishLayout = async (item) => {
	try {
		const response = await apiFetch({
			path: "/hfe/v1/update-post-status",
			method: "POST",
			data: {
				post_id: item.id,
				status: "publish",
			},
		});

		if (response.success) {
			// Show success toast notification
			if (window.wp && window.wp.data && window.wp.data.dispatch) {
				// Using WordPress notices if available
				window.wp.data
					.dispatch("core/notices")
					.createNotice(
						"success",
						__(
							"Layout published successfully!",
							"header-footer-elementor",
						),
						{
							type: "snackbar",
							isDismissible: true,
						},
					);
			} else {
				// Fallback: show browser alert
				alert(
					__(
						"Layout published successfully!",
						"header-footer-elementor",
					),
				);
			}

			// Reload the page to refresh the data
			setTimeout(() => {
				window.location.reload();
			}, 1000); // Small delay to show the toast first
		} else {
			console.error("Failed to publish layout:", response);
			// Show error message
			if (window.wp && window.wp.data && window.wp.data.dispatch) {
				window.wp.data
					.dispatch("core/notices")
					.createNotice(
						"error",
						__(
							"Failed to publish layout. Please try again.",
							"header-footer-elementor",
						),
						{
							type: "snackbar",
							isDismissible: true,
						},
					);
			} else {
				alert(
					__(
						"Failed to publish layout. Please try again.",
						"header-footer-elementor",
					),
				);
			}
		}
	} catch (error) {
		console.error("Error publishing layout:", error);
		// Show error message
		if (window.wp && window.wp.data && window.wp.data.dispatch) {
			window.wp.data
				.dispatch("core/notices")
				.createNotice(
					"error",
					__(
						"Error publishing layout. Please try again.",
						"header-footer-elementor",
					),
					{
						type: "snackbar",
						isDismissible: true,
					},
				);
		} else {
			alert(
				__(
					"Error publishing layout. Please try again.",
					"header-footer-elementor",
				),
			);
		}
	}
};

export default withDisplayConditions(AllLayouts);
