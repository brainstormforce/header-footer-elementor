import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button, Loader } from "@bsf/force-ui";
import { __ } from "@wordpress/i18n";
import apiFetch from "@wordpress/api-fetch";
import withDisplayConditions from "./DisplayConditionsDialog";
import EmptyState from "./EmptyState";
import LayoutDropdownMenu from "./LayoutDropdownMenu";
import toast, { Toaster } from "react-hot-toast";

const Header = ({
	openDisplayConditionsDialog,
	DisplayConditionsDialog,
	isButtonLoading,
}) => {
	const [headerItems, setHeaderItems] = useState([]);
	const [hasHeaders, setHasHeaders] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// Fetch the target rule options when component mounts
		apiFetch({
			path: "/hfe/v1/get-post",
			method: "POST",
			data: {
				type: "header",
			},
		})
			.then((response) => {
				if (response.success && response.posts) {
					setHeaderItems(response.posts);
					// Only set hasHeaders to true if there are actually items
					setHasHeaders(response.posts.length > 0);
				} else {
					setHasHeaders(false);
					console.error("Failed to create post:", response);
				}
			})
			.catch((error) => {
				setHasHeaders(false);
				console.error("Error creating post:", error);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);

	const handleCreateLayout = () => {
		apiFetch({
			path: "/hfe/v1/create-layout",
			method: "POST",
			data: {
				title: "My Custom Layout",
				type: "header",
			},
		})
			.then((response) => {
				if (response.success && response.post) {
					// Update item with new post ID
					const updatedItem = {
						...response.post,
						id: response.post.id || response.post.ID,
						title: response.post.title || response.post.post_title,
					};

					// Update the state immediately to show the new header card
					setHeaderItems((prevItems) => [...prevItems, updatedItem]);
					setHasHeaders(true);

					// Open display conditions dialog for NEW post
					openDisplayConditionsDialog(updatedItem, true); // Pass true for isNew
				} else {
					console.error("Failed to create post:", response);
				}
			})
			.catch((error) => {
				console.error("Error creating post:", error);
			});
	};

	const handleDisplayConditions = (item) => {
		// For existing items, pass false for isNew (or omit it)
		openDisplayConditionsDialog(item, false);
	};

	// Handle item updates from dropdown menu
	const handleItemUpdate = (itemId, updates) => {
		setHeaderItems((prevItems) =>
			prevItems.map((item) =>
				item.id === itemId ? { ...item, ...updates } : item,
			),
		);
	};

	// Handle item deletion from dropdown menu
	const handleItemDelete = (itemId) => {
		setHeaderItems((prevItems) => {
			const updatedItems = prevItems.filter((item) => item.id !== itemId);
			// Update hasHeaders state if no items left
			if (updatedItems.length === 0) {
				setHasHeaders(false);
			}
			return updatedItems;
		});
	};

	const handleEditWithElementor = (item) => {
		// Open the edit dialog
		// openDisplayConditionsDialog(item);
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
			</>
		);
	}

	if (!hasHeaders) {
		return (
			<>
				<EmptyState
					description={__(
						"You haven't created a header layout yet. Build a custom header to control how your site's top section looks and behaves across all pages.",
						"header-footer-elementor",
					)}
					buttonText={__(
						"Create Header Layout",
						"header-footer-elementor",
					)}
					onClick={handleCreateLayout}
					className="bg-white p-6 rounded-lg"
				/>

				{/* Render the Display Conditions Dialog from HOC */}
				<DisplayConditionsDialog />
			</>
		);
	} else {
		return (
			<>
				<div
					className="header-section"
					style={{ paddingLeft: "40px", paddingRight: "40px" }}
				>
					<div
						className="flex items-start gap-10 justify-between"
						style={{ padding: "0 40px", marginBottom: "10px" }}
					>
						<h2 className="text-base font-normal text-foreground">
							{__("Header Templates", "header-footer-elementor")}
						</h2>
					</div>

					<div
						className="grid grid-cols-1 md:grid-cols-2 gap-6"
						style={{ paddingLeft: "30px" }}
					>
						{headerItems.map((item) => (
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
										className="hover-overlay absolute inset-0 flex items-center justify-center gap-2 rounded-lg overflow-hidden backdrop-blur-sm transition-all duration-500 ease-in-out z-30"
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
												handleEditWithElementor(item)
											}
										>
											{"Edit Header"}
										</Button>
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
													handleDisplayConditions(
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
									</div>
								</div>
								<div className="">
									<hr
										className="w-full border-b-0 border-x-0 border-t border-solid border-t-border-subtle"
										style={{
											borderColor: "#E5E7EB",
										}}
									/>
									<div className="flex items-center justify-between px-1">
										<p className="text-sm font-medium text-gray-900">
											{item.title}
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

export default withDisplayConditions(Header);
