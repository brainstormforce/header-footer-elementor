import React, { useState } from "react";
import { Edit3, Check, X, SquarePen } from "lucide-react";
import { __ } from "@wordpress/i18n";
import apiFetch from "@wordpress/api-fetch";
import toast from "react-hot-toast";
import { Button,} from "@bsf/force-ui";

/**
 * Reusable Inline Title Editor Component
 * Allows editing layout titles directly on the card with pencil icon
 */
const InlineTitleEditor = ({ 
	item, 
	onTitleUpdate, 
	className = "",
	titleClassName = "text-base font-medium text-gray-900 truncate",
	showDraftStatus = true,
	alwaysShowIcon = false // New prop to control icon visibility
}) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editingTitle, setEditingTitle] = useState("");
	const [isUpdating, setIsUpdating] = useState(false);

	/**
	 * Start inline editing
	 */
	const startEditing = () => {
		setIsEditing(true);
		setEditingTitle(item.title || item.post_title || '');
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
					position: 'top-center',
					duration: 3000,
					style: {
						background: '#ef4444',
						color: 'white',
						borderRadius: '0.5rem',
						fontSize: '14px',
						padding: '12px 16px',
						boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
					},
				}
			);
			return;
		}

		// Check length
		if (trimmedTitle.length > 255) {
			toast.error(
				__("Layout name is too long. Maximum 255 characters allowed.", "header-footer-elementor"),
				{
					position: 'top-center',
					duration: 4000,
					style: {
						background: '#ef4444',
						color: 'white',
						borderRadius: '0.5rem',
						fontSize: '14px',
						padding: '12px 16px',
						boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
					},
				}
			);
			return;
		}

		// Check for potentially harmful content
		const sanitizedTitle = trimmedTitle.replace(/<[^>]*>/g, ''); // Remove HTML tags
		if (sanitizedTitle !== trimmedTitle) {
			toast.error(
				__("Layout name contains invalid characters.", "header-footer-elementor"),
				{
					position: 'top-center',
					duration: 4000,
					style: {
						background: '#ef4444',
						color: 'white',
						borderRadius: '0.5rem',
						fontSize: '14px',
						padding: '12px 16px',
						boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
					},
				}
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
					'X-WP-Nonce': wpApiSettings?.nonce || '',
				},
			});

			if (response.success) {
				// Update via callback
				if (onTitleUpdate) {
					onTitleUpdate(item.id, { 
						post_title: sanitizedTitle,
						title: sanitizedTitle
					});
				}

				// Cancel editing mode
				cancelEditing();

				// Show success toast
				toast.success(
					__("Layout renamed successfully!", "header-footer-elementor"),
					{
						position: 'top-right',
						duration: 3000,
						style: {
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
				console.error("Failed to rename layout:", response);
				
				let errorMessage = __("Failed to rename layout. Please try again.", "header-footer-elementor");
				if (response.message) {
					errorMessage = response.message;
				}
				
				toast.error(errorMessage, {
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
				});
			}
		} catch (error) {
			console.error("Error renaming layout:", error);
			
			let errorMessage = __("Error renaming layout. Please try again.", "header-footer-elementor");
			
			if (error.code === 'rest_forbidden') {
				errorMessage = __("You don't have permission to rename this layout.", "header-footer-elementor");
			} else if (error.code === 'rest_invalid_nonce') {
				errorMessage = __("Security check failed. Please refresh the page and try again.", "header-footer-elementor");
			} else if (error.message) {
				errorMessage = error.message;
			}
			
			toast.error(errorMessage, {
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
			});
		} finally {
			setIsUpdating(false);
		}
	};

	/**
	 * Handle keyboard events
	 */
	const handleKeyDown = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			saveTitle();
		} else if (e.key === 'Escape') {
			e.preventDefault();
			cancelEditing();
		}
	};

	return (
		<div className={`flex items-center flex-1 min-w-0 ${className}`}>
			{isEditing ? (
				// Editing mode
				<div className="flex items-center gap-2 flex-1">
					<input
						type="text"
						style={{ maxWidth: '200px',  outline: 'none', height: '32px' }}	
						value={editingTitle}
						onChange={(e) => setEditingTitle(e.target.value)}
						onKeyDown={handleKeyDown}
						className="flex-1 px-2 py-1 text-sm font-medium text-gray-900 rounded focus:outline-none"
						placeholder={__("Layout name", "header-footer-elementor")}
						autoFocus
						disabled={isUpdating}
						onFocus={(e) => e.target.style.borderColor = '#6005FF'}
					/>
					<div className="flex items-center pt-2" >
						<Button
						variant="ghost"
							onClick={saveTitle}
							disabled={isUpdating}
							className="p-1 cursor-pointer hover:bg-green-50 transition-colors duration-150 disabled:opacity-50"
							title={__("Save changes", "header-footer-elementor")}
						>
							<Check size={18} color="#008000"  />
						</Button>
						<Button
								variant="ghost"
							onClick={cancelEditing}
							disabled={isUpdating}
							className="p-1 cursor-pointer hover:bg-red-50 transition-colors duration-150 disabled:opacity-50"
							title={__("Cancel editing", "header-footer-elementor")}
						>
							<X size={18} color="#dc3545"  />
						</Button>
					</div>
				</div>
			) : (
				// Display mode
				<div className="flex items-center gap-1">
					<p className={titleClassName}>
						{item.title || item.post_title}
						{showDraftStatus && item.post_status === "draft" && (
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
					<Button
					variant="ghost"
						onClick={startEditing}
						className={`p-1 cursor-pointer mt-1 text-gray-500 rounded transition-colors duration-150 flex-shrink-0 ${
							alwaysShowIcon ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
						}`}
						title={__("Edit layout name", "header-footer-elementor")}
					>
						{/* Try both icon and fallback */}
						<SquarePen  size={18} />
					</Button>
				</div>
			)}
		</div>
	);
};

export default InlineTitleEditor;
