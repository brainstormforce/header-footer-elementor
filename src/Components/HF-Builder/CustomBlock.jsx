import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Button, Loader } from "@bsf/force-ui";
import { __ } from "@wordpress/i18n";
import apiFetch from "@wordpress/api-fetch";
import EmptyState from "./EmptyState";
import LayoutDropdownMenu from "./LayoutDropdownMenu";
import toast, { Toaster } from "react-hot-toast";

const CustomBlock = () => {

	const [customBlockItems, setCustomBlockItems] = useState([]);
	const [hasCustomBlocks, setCustomBlocks] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [isCreating, setIsCreating] = useState(false);
	
	useEffect(() => {
		// Fetch the target rule options when component mounts
		apiFetch({
			path: "/hfe/v1/get-post",
			method: "POST",
			data: {
				type: 'custom',
			},
		})
			.then((response) => {
				if (response.success && response.posts) {
					setCustomBlockItems(response.posts);
					// Only set hasCustomBlocks to true if there are actually items
					setCustomBlocks(response.posts.length > 0);
				} else {
					setCustomBlocks(false);
					console.error("Failed to create post:", response);
				}
			})
			.catch((error) => {
				setCustomBlocks(false);
				console.error("Error creating post:", error);
			})
			.finally(() => {
				setIsLoading(false);
			});

	}, []);

	const handleCreateLayout = () => {
		setIsCreating(true);
		
		apiFetch({
			path: "/hfe/v1/create-layout",
			method: "POST",
			data: {
				title: "My Custom Block Layout",
				type: 'custom',
			},
		})
			.then((response) => {
				if (response.success && response.post) {
					// Get the edit URL from the response or construct it
					const editUrl = response.edit_url || response.post.edit_url;
					
					if (editUrl) {
						// Redirect to edit with Elementor
						window.open(editUrl, "_blank");
					} else {
						console.error("No edit URL provided in response");
					}
					
					// Refresh the list to show the new item
					// Re-fetch the custom blocks to update the list
					apiFetch({
						path: "/hfe/v1/get-post",
						method: "POST",
						data: {
							type: 'custom',
						},
					})
						.then((refreshResponse) => {
							if (refreshResponse.success && refreshResponse.posts) {
								setCustomBlockItems(refreshResponse.posts);
								setCustomBlocks(refreshResponse.posts.length > 0);
							}
						})
						.catch((error) => {
							console.error("Error refreshing custom blocks:", error);
						});
				} else {
					console.error("Failed to create custom block:", response);
				}
			})
			.catch((error) => {
				console.error("Error creating custom block:", error);
			})
			.finally(() => {
				setIsCreating(false);
			});
	};

	const handleEditWithElementor = (item) => {
		// Redirect to edit with Elementor
		const elementorEditUrl = `${window.location.origin}/wp-admin/post.php?post=${item.id}&action=elementor`;
		window.open(elementorEditUrl, "_blank");
	};

	// Handle item updates from dropdown menu
	const handleItemUpdate = (itemId, updates) => {
		setCustomBlockItems(prevItems => 
			prevItems.map(item => 
				item.id === itemId 
					? { ...item, ...updates }
					: item
			)
		);
	};

	// Handle item deletion from dropdown menu
	const handleItemDelete = (itemId) => {
		setCustomBlockItems(prevItems => {
			const updatedItems = prevItems.filter(item => item.id !== itemId);
			// Update hasCustomBlocks state if no items left
			if (updatedItems.length === 0) {
				setCustomBlocks(false);
			}
			return updatedItems;
		});
	};

	// Show loading state while fetching data
	if (isLoading) {
		return (
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
		);
	}

	if (!hasCustomBlocks) {
		return (
			<EmptyState
				description={__(
					"You haven't created a custom block layout yet. Build a custom block to control how your site's sections look and behave across all pages.",
					"header-footer-elementor"
				)}
				buttonText={isCreating ? __("Creating...", "header-footer-elementor") : __("Create Custom Block Layout", "header-footer-elementor")}
				onClick={handleCreateLayout}
				disabled={isCreating}
				className="bg-white p-6 ml-6 rounded-lg"
			/>
		);
	} else {
		return (
			<>
				<div className="custom-block-section" style={{ paddingLeft: "40px", paddingRight: "40px" }}>
					<div
						className="flex items-start gap-10 justify-between"
						style={{ padding: "0 40px", marginBottom: "10px" }}
					>
						<h2 className="text-base font-normal text-foreground">
							{__("Custom Block Templates", "header-footer-elementor")}
						</h2>
					</div>
	
					<div
						className="grid grid-cols-1 md:grid-cols-2 gap-6"
						style={{ paddingLeft: "30px" }}
					>
						{customBlockItems.map((item) => (
							<div
								key={item.title}
								className="border bg-background-primary border-gray-200 p-2 rounded-lg cursor-pointer overflow-hidden flex flex-col group relative shadow-sm hover:shadow-md transition-shadow duration-200"
								onMouseEnter={(e) => {
									const overlay = e.currentTarget.querySelector('.hover-overlay');
									if (overlay) {
										overlay.style.opacity = '1';
										overlay.style.visibility = 'visible';
										overlay.style.transform = 'translateY(0)';
									}
								}}
								onMouseLeave={(e) => {
									const overlay = e.currentTarget.querySelector('.hover-overlay');
									if (overlay) {
										overlay.style.opacity = '0';
										overlay.style.visibility = 'hidden';
										overlay.style.transform = 'translateY(10px)';
									}
								}}
							>
								<div className="relative h-60 w-full">
									<img
										src={hfeSettingsData.header_card}
										alt={`${item.title} Layout`}
										style={{ height: '220px' }}
										className="w-full object-cover"
									/>
	
									<div 
										className="hover-overlay absolute inset-0 flex items-center justify-center rounded-lg overflow-hidden backdrop-blur-sm transition-all duration-500 ease-in-out z-30"
										style={{
											backgroundColor: "rgba(0, 0, 0, 0.4)",
											opacity: "0",
											visibility: "hidden",
											transform: "translateY(10px)"
										}}
									>
										<Button
											iconPosition="left"
											icon={<Plus size={14} />}
											variant="primary"
											className="bg-[#6005FF] font-medium text-white hfe-remove-ring z-50"
											style={{
												backgroundColor: "#6005FF !important",
												fontSize: "12px",
												fontWeight: "600",
												padding: "8px 8px",
												borderRadius: "6px",
												transition: "all 0.2s ease",
												outline: "none",
												transform: "scale(0.95)",
												opacity: "1"
											}}
											onMouseEnter={(e) => {
												e.currentTarget.style.backgroundColor = "#4B00CC";
												e.currentTarget.style.transform = "scale(1)";
											}}
											onMouseLeave={(e) => {
												e.currentTarget.style.backgroundColor = "#6005FF";
												e.currentTarget.style.transform = "scale(0.95)";
											}}
											onClick={() => handleEditWithElementor(item)}
										>
											{"Edit with Elementor"}
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
											showShortcode={false}
										/>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* React Hot Toast Notifications */}
				<Toaster
					position="bottom-right"
					toastOptions={{
						duration: 3000,
						style: {
							background: '#363636',
							color: '#fff',
						},
					}}
				/>
			</>
		);
	}
	
};

export default CustomBlock;
