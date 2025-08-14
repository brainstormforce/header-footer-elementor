import React, { useState, useRef, useEffect } from "react";
import { Edit3, Check, X, SquarePen } from "lucide-react";
import { __ } from "@wordpress/i18n";
import apiFetch from "@wordpress/api-fetch";
import toast from "react-hot-toast";
import { Button, Badge, Input } from "@bsf/force-ui";

/**
 * Reusable Inline Title Editor Component
 * Allows editing layout titles directly on the card with pencil icon
 */
const InlineTitleEditor = ({
	item,
	onTitleUpdate,
	className = "",
	titleClassName = "text-sm font-medium text-gray-900 truncate",
	showDraftStatus = true,
	alwaysShowIcon = false, // New prop to control icon visibility
}) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editingTitle, setEditingTitle] = useState("");
	const [isUpdating, setIsUpdating] = useState(false);
	const inputRef = useRef(null);

	// Focus and select input when editing starts
	useEffect(() => {
		if (isEditing && inputRef.current) {
			console.log('useEffect: Focusing input');
			const input = inputRef.current;
			// Try to get the actual input element if it's wrapped
			const actualInput = input.querySelector('input') || input;
			
			setTimeout(() => {
				actualInput.focus();
				actualInput.select();
				console.log('Input focused and selected');
			}, 100);
		}
	}, [isEditing]);

	/**
	 * Decode HTML entities to normal characters
	 */
	const decodeHtmlEntities = (str) => {
		if (!str) return str;
		const textarea = document.createElement('textarea');
		textarea.innerHTML = str;
		return textarea.value;
	};

	/**
	 * Start inline editing
	 */
	const startEditing = () => {
		console.log('startEditing called');
		console.log('Item:', item);
		
		// Decode HTML entities from the title before editing
		const rawTitle = item.title || item.post_title || "";
		const decodedTitle = decodeHtmlEntities(rawTitle);
		
		console.log('Raw title:', rawTitle);
		console.log('Decoded title:', decodedTitle);
		
		setIsEditing(true);
		setEditingTitle(decodedTitle);
		console.log('Edit mode activated');
	};

	/**
	 * Cancel editing
	 */
	const cancelEditing = () => {
		setIsEditing(false);
		setEditingTitle("");
	};

	/**
	 * Save the edited title
	 */
	const saveTitle = async () => {
		// Validate input
		const trimmedTitle = editingTitle.trim();

		if (!trimmedTitle) {
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

		// Check length
		if (trimmedTitle.length > 255) {
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

		// Check for potentially harmful content (only remove HTML tags, preserve apostrophes)
		const sanitizedTitle = trimmedTitle.replace(/<[^>]*>/g, ""); // Remove HTML tags only
		
		// Don't reject titles with apostrophes - they're valid
		if (sanitizedTitle !== trimmedTitle && trimmedTitle.includes('<')) {
			// Only show error if HTML tags were actually removed
			toast.error(
				__(
					"Layout name contains invalid HTML tags.",
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

		// Check if name changed
		if (sanitizedTitle === (item.title || item.post_title)) {
			// No change, just cancel editing
			cancelEditing();
			return;
		}

		setIsUpdating(true);

		try {
			const response = await apiFetch({
				path: "/hfe/v1/update-post-title",
				method: "POST",
				data: {
					post_id: item.id,
					post_title: sanitizedTitle,
				},
				headers: {
					"X-WP-Nonce": hfeSettingsData.hfe_nonce_action,
				},
			});

			if (response.success) {
				// Use the title from server response to ensure consistency
				const serverTitle = response.data?.post_title || response.data?.title || sanitizedTitle;
				
				// Update via callback
				if (onTitleUpdate) {
					onTitleUpdate(item.id, {
						post_title: serverTitle,
						title: serverTitle,
					});
				}

				// Cancel editing mode
				cancelEditing();

				// Show success toast
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
						background: "#10b981",
						color: "white",
						borderRadius: "0.5rem",
						fontSize: "14px",
						padding: "12px 16px",
						boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
					},
				});
			}
		} catch (error) {
			console.error("Error renaming layout:", error);

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
			});
		} finally {
			setIsUpdating(false);
		}
	};

	/**
	 * Handle keyboard events
	 */
	const handleKeyDown = (e) => {
		if (e.key === "Enter") {
			e.preventDefault();
			saveTitle();
		} else if (e.key === "Escape") {
			e.preventDefault();
			cancelEditing();
		}
	};

	return (
		<div className={`flex items-center min-w-0 ${className}`}>
			{isEditing ? (
				// Editing mode
				<div className="flex items-center gap-2">
					<Input
						ref={inputRef}
						type="text"
						size="xs"
						style={{
							outline: "none",
							fontSize: "16px",
							width: '130px',
							pointerEvents: 'auto',
							userSelect: 'text',
						}}
						value={editingTitle}
						onChange={(e) => {
							console.log('Input onChange:', e.target.value);
							setEditingTitle(e.target.value);
						}}
						onKeyDown={handleKeyDown}
						className="py-2 text-base font-medium text-gray-900 rounded focus:outline-none"
						placeholder={__(
							"Layout name",
							"header-footer-elementor",
						)}
						autoFocus
						disabled={false}
						readOnly={false}
						onFocus={(e) => {
							console.log('Input focused, value:', e.target.value);
							e.target.style.borderColor = "#6005FF";
							e.target.style.marginTop = "0.4rem";
						}}
						onClick={(e) => {
							console.log('Input clicked');
							e.stopPropagation();
						}}
						onMouseDown={(e) => {
							console.log('Input mousedown');
							e.stopPropagation();
						}}
						onKeyPress={(e) => {
							console.log('Key pressed:', e.key);
						}}
						onInput={(e) => {
							console.log('Input event:', e.target.value);
							setEditingTitle(e.target.value);
						}}
					/>
					<div className="flex items-center pt-2" >
						<Button
							variant="ghost"
							onClick={saveTitle}
							disabled={isUpdating}
							className="p-1 cursor-pointer hover:bg-green-50 transition-colors duration-150 disabled:opacity-50"
							title={__(
								"Save changes",
								"header-footer-elementor",
							)}
						>
							<Check size={18} color="#008000" />
						</Button>
						<Button
							variant="ghost"
							onClick={cancelEditing}
							disabled={isUpdating}
							className="p-1 cursor-pointer hover:bg-red-50 transition-colors duration-150 disabled:opacity-50"
							title={__(
								"Cancel editing",
								"header-footer-elementor",
							)}
						>
							<X size={18} color="#dc3545" />
						</Button>
					</div>
				</div>
			) : (
				// Display mode
				<div className="flex items-center gap-1 flex-nowrap">
					<p className={`${titleClassName} flex items-center flex-nowrap whitespace-nowrap`}>
						<span className="truncate text-base">
							{decodeHtmlEntities(item.title || item.post_title)}
						</span>
						{showDraftStatus && (
							<span className="ml-2 flex items-center text-xs text-gray-500 font-normal flex-shrink-0">
								{item.post_status === "draft" ? (
									<Badge
										label={__("Draft", "header-footer-elementor")}
										size="xs"
										variant="red"
									/>
								) : (
									<Badge
										label={__("Published", "header-footer-elementor")}
										size="xs"
										variant="green"
									/>
								)}
							</span>
						)}
					</p>
					<Button
						variant="ghost"
						onClick={startEditing}
						className={`p-1 cursor-pointer mt-1 text-gray-500 rounded transition-colors duration-150 flex-shrink-0 ${
							alwaysShowIcon
								? "opacity-100"
								: "opacity-0 group-hover:opacity-100"
						}`}
						title={__(
							"Edit layout name",
							"header-footer-elementor",
						)}
					>
						{/* Try both icon and fallback */}
						<SquarePen size={18} />
					</Button>
				</div>
			)}
		</div>
	);
};

export default InlineTitleEditor;
