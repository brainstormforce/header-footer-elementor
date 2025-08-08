import React, { useState } from "react";
import { EllipsisVertical, Trash2, Edit3, TriangleAlert } from "lucide-react";
import { DropdownMenu, Button } from "@bsf/force-ui";
import { __ } from "@wordpress/i18n";
import apiFetch from "@wordpress/api-fetch";
import toast from "react-hot-toast";
import useCopyShortcode from "./hooks/useCopyShortcode";

/**
 * Reusable Layout Dropdown Menu Component
 * Provides Copy Shortcode, Rename, Publish/Disable, and Delete functionality
 */
const LayoutDropdownMenu = ({
	item,
	onItemUpdate,
	onItemDelete,
	showShortcode = true,
}) => {
	// Use the custom hook for copy shortcode functionality
	const { handleCopyShortcode } = useCopyShortcode();

	/**
	 * Handle renaming a layout with custom toast popup
	 */
	const handleRenameLayout = async (item) => {
		// First, get the current post data to ensure we have the latest title
		try {
			const response = await apiFetch({
				path: `/hfe/v1/get-post/${item.id}`,
				method: "GET",
				headers: {
					"X-WP-Nonce": hfeSettingsData.hfe_nonce_action,
				},
			});

			if (response.success && response.data) {
				showRenameToast(response.data);
			} else {
				// Fallback to item data if API call fails
				showRenameToast(item);
			}
		} catch (error) {
			console.error("Error fetching post data:", error);

			// Handle specific errors
			if (error.code === "rest_forbidden") {
				toast.error(
					__(
						"You don't have permission to edit this layout.",
						"header-footer-elementor",
					),
					{
						position: "top-center",
						duration: 4000,
					},
				);
				return;
			}

			// Fallback to item data if API call fails
			showRenameToast(item);
		}
	};

	/**
	 * Custom rename toast component with input field
	 */
	const showRenameToast = (itemData) => {
		let inputValue = itemData.post_title || "";

		toast(
			(t) => (
				<div className="flex flex-col gap-3 p-2">
					<div className="flex items-start gap-3">
						<div
							className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center"
							style={{ marginTop: "12px" }}
						>
							<Edit3 size={16} className="text-blue-600" />
						</div>
						<div className="flex-1">
							<h3 className="text-base font-medium text-gray-900">
								{__("Rename Layout", "header-footer-elementor")}
							</h3>
							<p className="text-sm text-gray-600 mb-3">
								{__(
									"Enter a new name for this layout",
									"header-footer-elementor",
								)}
							</p>
							<input
								type="text"
								defaultValue={inputValue}
								onChange={(e) => {
									inputValue = e.target.value;
								}}
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
								placeholder={__(
									"Layout name",
									"header-footer-elementor",
								)}
								autoFocus
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										toast.dismiss(t.id);
										performRenameLayout(
											itemData,
											inputValue,
										);
									} else if (e.key === "Escape") {
										toast.dismiss(t.id);
									}
								}}
							/>
							<div className="flex gap-2 mt-3">
								<button
									onClick={() => {
										toast.dismiss(t.id);
										performRenameLayout(
											itemData,
											inputValue,
										);
									}}
									style={{ backgroundColor: "#000" }}
									className="px-3 py-1.5 text-white text-sm font-medium rounded-md focus:outline-none hover:bg-gray-800"
								>
									{__("Change", "header-footer-elementor")}
								</button>
								<button
									onClick={() => toast.dismiss(t.id)}
									className="px-3 py-1.5 bg-gray-200 text-gray-700 text-sm font-medium rounded-md focus:outline-none hover:bg-gray-300"
								>
									{__("Cancel", "header-footer-elementor")}
								</button>
							</div>
						</div>
					</div>
				</div>
			),
			{
				duration: Infinity, // Keep open until user decides
				position: "top-right",
				className: "toast-rename",
				style: {
					background: "white",
					color: "#374151",
					border: "1px solid #e5e7eb",
					borderRadius: "0.5rem",
					boxShadow:
						"0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
					padding: "0",
					maxWidth: "400px",
					marginTop: "80px",
					marginRight: "20px",
					zIndex: 999999,
				},
			},
		);
	};

	/**
	 * Perform the actual rename operation
	 */
	const performRenameLayout = async (itemData, newName) => {
		// Validate input
		if (!newName || newName.trim() === "") {
			toast.error(
				__("Layout name cannot be empty.", "header-footer-elementor"),
				{
					position: "top-center",
					duration: 3000,
					style: {
						background: "#ef4444",
						color: "white",
						borderRadius: "0.5rem",
						fontSize: "14px",
						padding: "12px 16px",
						boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
					},
				},
			);
			return;
		}

		// Additional frontend validation
		const trimmedName = newName.trim();

		// Check length
		if (trimmedName.length > 255) {
			toast.error(
				__(
					"Layout name is too long. Maximum 255 characters allowed.",
					"header-footer-elementor",
				),
				{
					position: "top-center",
					duration: 4000,
					style: {
						background: "#ef4444",
						color: "white",
						borderRadius: "0.5rem",
						fontSize: "14px",
						padding: "12px 16px",
						boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
					},
				},
			);
			return;
		}

		// Check for potentially harmful content
		const sanitizedName = trimmedName.replace(/<[^>]*>/g, ""); // Remove HTML tags
		if (sanitizedName !== trimmedName) {
			toast.error(
				__(
					"Layout name contains invalid characters.",
					"header-footer-elementor",
				),
				{
					position: "top-center",
					duration: 4000,
					style: {
						background: "#ef4444",
						color: "white",
						borderRadius: "0.5rem",
						fontSize: "14px",
						padding: "12px 16px",
						boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
					},
				},
			);
			return;
		}

		// Check if name is the same
		if (sanitizedName === itemData.post_title) {
			toast.success(__("No changes made.", "header-footer-elementor"), {
				position: "top-right",
				duration: 2000,
			});
			return;
		}

		try {
			// Show loading toast
			const loadingToast = toast.loading(
				__("Renaming layout...", "header-footer-elementor"),
				{
					position: "bottom-right",
				},
			);

			const response = await apiFetch({
				path: "/hfe/v1/update-post-title",
				method: "POST",
				data: {
					post_id: itemData.id,
					post_title: sanitizedName,
				},
				headers: {
					"X-WP-Nonce": hfeSettingsData.hfe_nonce_action,
				},
			});

			// Dismiss loading toast
			toast.dismiss(loadingToast);

			if (response.success) {
				// Update both post_title and title fields via callback
				if (onItemUpdate) {
					onItemUpdate(itemData.id, {
						post_title: sanitizedName,
						title: sanitizedName, // Update the title field as well
					});
				}

				// Show success toast notification with enhanced styling
				      toast.success(
                    __(
                        "Layout renamed successfully!",
                        "header-footer-elementor",
                    ),
                    {
                        position: "top-right",
                        duration: 2000,
                        style: {
                            marginTop: "40px",
                            background: "white",
                            color: "",
                        },
                        iconTheme: {
                            primary: "#6005ff",
                            secondary: "#fff",
                        },
                    },
                );
			} else {
				console.error("Failed to rename layout:", response);

				// Handle specific error messages
				let errorMessage = __(
					"Failed to rename layout. Please try again.",
					"header-footer-elementor",
				);
				if (response.message) {
					errorMessage = response.message;
				}

				toast.error(errorMessage, {
					position: "top-center",
					duration: 5000,
					style: {
						background: "#ef4444",
						color: "white",
						borderRadius: "0.5rem",
						fontSize: "14px",
						padding: "12px 16px",
						boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
					},
					iconTheme: {
						primary: "white",
						secondary: "#ef4444",
					},
				});
			}
		} catch (error) {
			console.error("Error renaming layout:", error);

			// Handle different types of errors
			let errorMessage = __(
				"Error renaming layout. Please try again.",
				"header-footer-elementor",
			);

			if (error.code === "rest_forbidden") {
				errorMessage = __(
					"You don't have permission to rename this layout.",
					"header-footer-elementor",
				);
			} else if (error.code === "rest_invalid_nonce") {
				errorMessage = __(
					"Security check failed. Please refresh the page and try again.",
					"header-footer-elementor",
				);
			} else if (error.message) {
				errorMessage = error.message;
			}

			toast.error(errorMessage, {
				position: "top-center",
				duration: 5000,
				style: {
					background: "#ef4444",
					color: "white",
					borderRadius: "0.5rem",
					fontSize: "14px",
					padding: "12px 16px",
					boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
				},
				iconTheme: {
					primary: "white",
					secondary: "#ef4444",
				},
			});
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
				headers: {
					"X-WP-Nonce": hfeSettingsData.hfe_nonce_action,
				},
				data: {
					post_id: item.id,
					status: "publish",
				},
			});

			if (response.success) {
				// Update the item status via callback
				if (onItemUpdate) {
					onItemUpdate(item.id, { post_status: "publish" });
				}

				// Show success toast notification
				toast.success(
					__(
						"Layout published successfully!",
						"header-footer-elementor",
					),
				);
			} else {
				console.error("Failed to publish layout:", response);
				// Show error message
				toast.error(
					__(
						"Failed to publish layout. Please try again.",
						"header-footer-elementor",
					),
				);
			}
		} catch (error) {
			console.error("Error publishing layout:", error);
			// Show error message
			toast.error(
				__(
					"Error publishing layout. Please try again.",
					"header-footer-elementor",
				),
			);
		}
	};

	/**
	 * Handle disabling a layout (set status to draft)
	 */
	const handleDisableLayout = async (item) => {
		try {
			const response = await apiFetch({
				path: "/hfe/v1/update-post-status",
				method: "POST",
				headers: {
					"X-WP-Nonce": hfeSettingsData.hfe_nonce_action,
				},
				data: {
					post_id: item.id,
					status: "draft",
				},
			});

			if (response.success) {
				// Update the item status via callback
				if (onItemUpdate) {
					onItemUpdate(item.id, { post_status: "draft" });
				}

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
	 * Custom confirmation toast component for delete action
	 */
	const showDeleteConfirmation = (item) => {
		toast(
			(t) => (
				<div className="flex flex-col gap-3 p-2">
					<div className="flex items-start">
						<div className="">
							<div className="flex items-center gap-1">
								<TriangleAlert
									size={20}
									color="#dc2626"
								/>
								<h3 className="text-lg m-0 font-medium text-gray-900" style={{  marginTop: "2px", marginLeft: "4px" }}>
									{__(
										"Delete Layout",
										"header-footer-elementor",
									)}
								</h3>
							</div>
							<p
								className="text-base m-0 text-text-primary"
								style={{ padding: "2px", marginTop: "4px" }}
							>
								{__(
									"This action cannot be done",
									"header-footer-elementor",
								)}
							</p>
							<p
								className="text-base text-text-primary"
								style={{ margin: "4px", paddingBottom: "4px" }}
							>
								{__(
									"Are you sure you want to delete this layout?",
									"header-footer-elementor",
								)}
							</p>
							<div className="flex gap-2">
								<Button
									style={{
										outline: "none",
										border: "1px solid #E5E7EB",
										boxShadow: "none",
										backgroundColor: "#fff",
									}}
									onFocus={(e) => {
										e.currentTarget.style.outline = "none";
										e.currentTarget.style.boxShadow =
											"none";
									}}
									onClick={() => toast.dismiss(t.id)}
									className="p-2 text-black text-md font-medium rounded-md focus:outline-none"
								>
									{__("Cancel", "header-footer-elementor")}
								</Button>
								<Button
									onClick={() => {
										toast.dismiss(t.id);
										performDeleteLayout(item);
									}}
									style={{
										outline: "none",
										border: "1px solid #E5E7EB",
										boxShadow: "none",
										backgroundColor: "#dc2626",
									}}
									onFocus={(e) => {
										e.currentTarget.style.outline = "none";
										e.currentTarget.style.boxShadow =
											"none";
									}}
									className="p-2 text-white text-md font-medium rounded-md focus:outline-none"
								>
									{__(
										"Yes, Delete Layout",
										"header-footer-elementor",
									)}
								</Button>
							</div>
						</div>
					</div>
				</div>
			),
			{
				duration: Infinity,
				position: "top-right",
				className: "toast-confirmation",
				style: {
					background: "white",
					color: "#374151",
					border: "1px solid #e5e7eb",
					borderRadius: "0.5rem",
					boxShadow:
						"0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
					padding: "0",
					maxWidth: "400px",
					zIndex: 999999,
				},
			},
		);
	};

	/**
	 * Perform the actual delete operation with enhanced UI feedback
	 */
	const performDeleteLayout = async (item) => {
		try {
			// Show loading toast
			const loadingToast = toast.loading(
				__("Deleting layout...", "header-footer-elementor"),
			);

			const response = await apiFetch({
				path: "/hfe/v1/delete-post",
				method: "POST",
				headers: {
					"X-WP-Nonce": hfeSettingsData.hfe_nonce_action,
				},
				data: {
					post_id: item.id,
				},
			});

			// Dismiss loading toast
			toast.dismiss(loadingToast);

			if (response.success) {
				// Remove the item via callback
				if (onItemDelete) {
					onItemDelete(item.id);
				}

				// Show success toast notification with uniform styling
				toast.success(
					__(
						"Layout deleted successfully!",
						"header-footer-elementor",
					),
				);
			} else {
				console.error("Failed to delete layout:", response);
				toast.error(
					__(
						"Failed to delete layout. Please try again.",
						"header-footer-elementor",
					),
				);
			}
		} catch (error) {
			console.error("Error deleting layout:", error);
			toast.error(
				__(
					"Error deleting layout. Please try again.",
					"header-footer-elementor",
				),
			);
		}
	};

	/**
	 * Handle deleting a layout (show confirmation toast immediately)
	 */
	const handleDeleteLayout = (item) => {
		// Show confirmation immediately - no async/await needed
		showDeleteConfirmation(item);
	};

	return (
		<DropdownMenu placement="bottom-end">
			<DropdownMenu.Trigger>
				<EllipsisVertical size={16} className="cursor-pointer" />
			</DropdownMenu.Trigger>
			<DropdownMenu.Portal>
				<DropdownMenu.ContentWrapper>
					<DropdownMenu.Content className="w-40">
						<DropdownMenu.List>
							{/* Copy Shortcode - Only show if enabled */}
							{showShortcode && (
								<DropdownMenu.Item
									onClick={(e) => {
										e.preventDefault();
										e.stopPropagation();
										handleCopyShortcode(item);
									}}
								>
									{__(
										"Copy Shortcode",
										"header-footer-elementor",
									)}
								</DropdownMenu.Item>
							)}

							{/* Rename Layout */}
							{/* <DropdownMenu.Item
								onClick={(e) => {
									e.preventDefault();
									e.stopPropagation();
									handleRenameLayout(item);
								}}
							>
								{__("Rename", "header-footer-elementor")}
							</DropdownMenu.Item> */}

							{/* Publish/Disable based on current status */}
							{item.post_status === "draft" ? (
								<DropdownMenu.Item
									onClick={(e) => {
										e.preventDefault();
										e.stopPropagation();
										handlePublishLayout(item);
									}}
								>
									{__("Publish", "header-footer-elementor")}
								</DropdownMenu.Item>
							) : (
								<DropdownMenu.Item
									onClick={(e) => {
										e.preventDefault();
										e.stopPropagation();
										handleDisableLayout(item);
									}}
								>
									{__("Draft", "header-footer-elementor")}
								</DropdownMenu.Item>
							)}

							{/* Delete */}
							<DropdownMenu.Item
								onClick={(e) => {
									e.preventDefault();
									e.stopPropagation();
									// Call immediately without any delay
									handleDeleteLayout(item);
								}}
							>
								{__("Delete", "header-footer-elementor")}
							</DropdownMenu.Item>
						</DropdownMenu.List>
					</DropdownMenu.Content>
				</DropdownMenu.ContentWrapper>
			</DropdownMenu.Portal>
		</DropdownMenu>
	);
};

export default LayoutDropdownMenu;
