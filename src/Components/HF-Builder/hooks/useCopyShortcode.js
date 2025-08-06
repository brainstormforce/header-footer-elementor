import { __ } from "@wordpress/i18n";
import toast from "react-hot-toast";

/**
 * Custom hook for copying shortcode functionality
 * Reusable across components without code duplication
 */
const useCopyShortcode = () => {
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

	return { handleCopyShortcode };
};

export default useCopyShortcode;
