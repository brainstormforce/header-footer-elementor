import React from "react";
import { EllipsisVertical, TriangleAlert } from "lucide-react";
import { DropdownMenu, Button } from "@bsf/force-ui";
import { __ } from "@wordpress/i18n";
import apiFetch from "@wordpress/api-fetch";
import toast from "react-hot-toast";
import useCopyShortcode from "./hooks/useCopyShortcode";

/**
 * Reusable Layout Dropdown Menu Component
 * Provides Copy Shortcode, Publish/Disable, and Delete functionality
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
								<TriangleAlert size={22} className="text-red-600" />
							<h3 className="text-base m-0 font-medium text-gray-900">
								{__("Delete Layout", "header-footer-elementor")}
							</h3>
							</div>
							<p className="text-base m-0 text-text-primary" style={{  padding: '2px', marginTop: "4px" }}>
								{__(
									"This action cannot be done",
									"header-footer-elementor",
								)}
							</p>
							<p className="text-base text-text-primary" style={{ margin: "4px", paddingBottom: '4px' }}>
								{__(
									"Are you sure you want to delete this layout?",
									"header-footer-elementor",
								)}
							</p>
							<div className="flex gap-2"> 
								<Button
									style={{ backgroundColor: "#fff", border: "1px solid #E5E7EB" }}
									onClick={() => toast.dismiss(t.id)}
									className="px-3 py-1.5 text-black text-md font-medium rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
								>
									{__("Cancel", "header-footer-elementor")}
								</Button>
								<Button
									onClick={() => {
										toast.dismiss(t.id);
										performDeleteLayout(item);
									}}
									style={{ backgroundColor: "#dc2626", border: "1px solid #E5E7EB" }}
									className="px-3 py-1.5 text-white text-md font-medium rounded-md focus:outline-none"
								>
									{__("Yes, Delete Layout", "header-footer-elementor")}
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
									{__("Disable", "header-footer-elementor")}
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
