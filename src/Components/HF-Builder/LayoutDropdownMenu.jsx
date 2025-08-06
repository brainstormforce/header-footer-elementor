import React from "react";
import { EllipsisVertical } from "lucide-react";
import { DropdownMenu } from "@bsf/force-ui";
import { __ } from "@wordpress/i18n";
import apiFetch from "@wordpress/api-fetch";
import toast from "react-hot-toast";

/**
 * Reusable Layout Dropdown Menu Component
 * Provides Copy Shortcode, Publish/Disable, and Delete functionality
 */
const LayoutDropdownMenu = ({ 
	item, 
	onItemUpdate, 
	onItemDelete,
	showShortcode = true 
}) => {
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
	 * Handle deleting a layout (move to trash)
	 */
	const handleDeleteLayout = async (item) => {
		// Show confirmation dialog
		if (
			!confirm(
				__(
					"Are you sure you want to delete this layout? This action cannot be undone.",
					"header-footer-elementor",
				),
			)
		) {
			return;
		}

		try {
			const response = await apiFetch({
				path: "/hfe/v1/delete-post",
				method: "POST",
				data: {
					post_id: item.id,
				},
			});

			if (response.success) {
				// Remove the item via callback
				if (onItemDelete) {
					onItemDelete(item.id);
				}

				// Show success toast notification
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

	return (
		<DropdownMenu placement="bottom-end">
			<DropdownMenu.Trigger>
				<EllipsisVertical
					size={16}
					className="cursor-pointer"
				/>
			</DropdownMenu.Trigger>
			<DropdownMenu.Portal>
				<DropdownMenu.ContentWrapper>
					<DropdownMenu.Content className="w-40">
						<DropdownMenu.List>
							{/* Copy Shortcode - Only show if enabled */}
							{showShortcode && (
								<DropdownMenu.Item
									onClick={() => handleCopyShortcode(item)}
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
									onClick={() => handlePublishLayout(item)}
								>
									{__(
										"Publish",
										"header-footer-elementor",
									)}
								</DropdownMenu.Item>
							) : (
								<DropdownMenu.Item
									onClick={() => handleDisableLayout(item)}
								>
									{__(
										"Disable",
										"header-footer-elementor",
									)}
								</DropdownMenu.Item>
							)}
							
							{/* Delete */}
							<DropdownMenu.Item
								onClick={() => handleDeleteLayout(item)}
							>
								{__(
									"Delete",
									"header-footer-elementor",
								)}
							</DropdownMenu.Item>
						</DropdownMenu.List>
					</DropdownMenu.Content>
				</DropdownMenu.ContentWrapper>
			</DropdownMenu.Portal>
		</DropdownMenu>
	);
};

export default LayoutDropdownMenu;
