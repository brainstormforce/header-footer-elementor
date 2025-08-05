import React, { useState, useEffect } from "react";
import { Plus, EllipsisVertical } from "lucide-react";
import { Button, DropdownMenu } from "@bsf/force-ui";
import { __ } from "@wordpress/i18n";
import apiFetch from "@wordpress/api-fetch";
import withDisplayConditions from "./DisplayConditionsDialog";
import toast, { Toaster } from 'react-hot-toast';

// Example: Ensure these values are coming from global/localized JS in WordPress

const AllLayouts = ({ openDisplayConditionsDialog, DisplayConditionsDialog }) => {

    const [layoutItems, setlLayoutItems] = useState([]);
    const [hasLayoutItems, setHasLayoutItems] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    
    // Initialize showDummyCards from localStorage to persist state across page refreshes
    const [showDummyCards, setShowDummyCards] = useState(() => {
        const saved = localStorage.getItem('hfe_showDummyCards');
        return saved ? JSON.parse(saved) : false;
    });

    // Define dummy layout types
    const dummyLayoutTypes = [
        {
            id: null,
            name: 'header',
            title: __('Header', 'header-footer-elementor'),
            description: __('Create a custom header layout for your website', 'header-footer-elementor'),
            image: hfeSettingsData.header_card || '',
            template_type: 'header'
        },
        {
            id: null,
            name: 'footer',
            title: __('Footer', 'header-footer-elementor'),
            description: __('Create a custom footer layout for your website', 'header-footer-elementor'),
            image: hfeSettingsData.footer_card || hfeSettingsData.header_card || '',
            template_type: 'footer'
        },
        {
            id: null,
            name: 'before_footer',
            title: __('Before Footer', 'header-footer-elementor'),
            description: __('Create a layout that appears before the footer', 'header-footer-elementor'),
            image: hfeSettingsData.before_footer_card || hfeSettingsData.header_card || '',
            template_type: 'before_footer'
        },
        {
            id: null,
            name: 'custom',
            title: __('Custom Block', 'header-footer-elementor'),
            description: __('Create a custom block that can be used anywhere', 'header-footer-elementor'),
            image: hfeSettingsData.custom_block_card || hfeSettingsData.header_card || '',
            template_type: 'custom'
        }
    ];
    
    // Save showDummyCards state to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('hfe_showDummyCards', JSON.stringify(showDummyCards));
    }, [showDummyCards]);
    
    useEffect(() => {
        // Fetch the target rule options when component mounts
        apiFetch({
            path: "/hfe/v1/get-post",
            method: "POST",
            data: {
                type: '',
            },
        })
            .then((response) => {
                if (response.success && response.posts) {
                    setlLayoutItems(response.posts);
                    // Only set hasLayoutItems to true if there are actually items
                    setHasLayoutItems(response.posts.length > 0);
                    
                    // Clear localStorage if layouts are found
                    if (response.posts.length > 0) {
                        localStorage.removeItem('hfe_showDummyCards');
                        setShowDummyCards(false);
                    }
                } else {
                    setHasLayoutItems(false);
                    console.error("Failed to create post:", response);
                }
            })
            .catch((error) => {
                setHasLayoutItems(false);
                console.error("Error creating post:", error);
            })
            .finally(() => {
                setIsLoading(false);
            });

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
						// Update item with new post ID
						const updatedItem = { ...item, id: response.post_id };

						// For custom blocks, redirect to Elementor editor
						if (item.template_type === 'custom') {
							// Construct Elementor edit URL
							const elementorEditUrl = `${window.location.origin}/wp-admin/post.php?post=${response.post_id}&action=elementor`;
							window.open(elementorEditUrl, '_blank');
						} else {
							// Open display conditions dialog using HOC function with isNew flag
							openDisplayConditionsDialog(updatedItem, true);
						}
					} else {
						console.error("Failed to create post:", response);
						toast.error(__('Failed to create layout. Please try again.', 'header-footer-elementor'));
					}
				})
				.catch((error) => {
					console.error("Error creating post:", error);
					toast.error(__('Error creating layout. Please try again.', 'header-footer-elementor'));
				});
		} else {
			// Post already exists, open dialog directly
			if (item.template_type === 'custom') {
				// Redirect to Elementor editor for existing custom blocks
				const elementorEditUrl = `${window.location.origin}/wp-admin/post.php?post=${item.id}&action=elementor`;
				window.open(elementorEditUrl, '_blank');
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
	 * Handle disabling a layout (set status to draft)
	 */
	const handleDisableLayout = async (item) => {
		try {
			const response = await apiFetch({
				path: "/hfe/v1/update-post-status",
				method: "POST",
				data: {
					post_id: item.id,
					status: 'draft'
				},
			});

			if (response.success) {
				// Show success toast notification
				toast.success(__('Layout disabled successfully!', 'header-footer-elementor'));
				
				// Reload the page to refresh the data
				setTimeout(() => {
					window.location.reload();
				}, 1000);

			} else {
				console.error("Failed to disable layout:", response);
				toast.error(__('Failed to disable layout. Please try again.', 'header-footer-elementor'));
			}
		} catch (error) {
			console.error("Error disabling layout:", error);
			toast.error(__('Error disabling layout. Please try again.', 'header-footer-elementor'));
		}
	};

	/**
	 * Handle deleting a layout (move to trash)
	 */
	const handleDeleteLayout = async (item) => {
		// Show confirmation dialog
		if (!confirm(__('Are you sure you want to delete this layout? This action cannot be undone.', 'header-footer-elementor'))) {
			return;
		}

		try {
			const response = await apiFetch({
				path: "/hfe/v1/delete-post",
				method: "POST",
				data: {
					post_id: item.id
				},
			});

			if (response.success) {
				// Show success toast notification
				toast.success(__('Layout deleted successfully!', 'header-footer-elementor'));
				
				// Reload the page to refresh the data
				setTimeout(() => {
					window.location.reload();
				}, 1000);

			} else {
				console.error("Failed to delete layout:", response);
				toast.error(__('Failed to delete layout. Please try again.', 'header-footer-elementor'));
			}
		} catch (error) {
			console.error("Error deleting layout:", error);
			toast.error(__('Error deleting layout. Please try again.', 'header-footer-elementor'));
		}
	};

	/**
	 * Handle copying shortcode to clipboard
	 */
	const handleCopyShortcode = (item) => {
		const shortcode = `[hfe_template id='${item.id}']`;
		
		// Copy to clipboard
		if (navigator.clipboard && window.isSecureContext) {
			navigator.clipboard.writeText(shortcode).then(() => {
				// Show success toast notification
				toast.success(__('Shortcode copied to clipboard!', 'header-footer-elementor'));
			}).catch((error) => {
				console.error('Failed to copy shortcode:', error);
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
		const textArea = document.createElement('textarea');
		textArea.value = text;
		textArea.style.position = 'fixed';
		textArea.style.left = '-999999px';
		textArea.style.top = '-999999px';
		document.body.appendChild(textArea);
		textArea.focus();
		textArea.select();
		
		try {
			document.execCommand('copy');
			// Show success toast notification
			toast.success(__('Shortcode copied to clipboard!', 'header-footer-elementor'));
		} catch (error) {
			console.error('Failed to copy shortcode using fallback method:', error);
			// Show error toast notification
			toast.error(__('Failed to copy shortcode. Please copy manually.', 'header-footer-elementor'));
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
					status: 'publish'
				},
			});

			if (response.success) {
				// Show success toast notification
				toast.success(__('Layout published successfully!', 'header-footer-elementor'));
				
				// Reload the page to refresh the data
				setTimeout(() => {
					window.location.reload();
				}, 1000); // Small delay to show the toast first

			} else {
				console.error("Failed to publish layout:", response);
				// Show error message
				toast.error(__('Failed to publish layout. Please try again.', 'header-footer-elementor'));
			}
		} catch (error) {
			console.error("Error publishing layout:", error);
			// Show error message
			toast.error(__('Error publishing layout. Please try again.', 'header-footer-elementor'));
		}
	};
    // Show loading state while fetching data
    if (isLoading) {
        return (
            <>
                <div className="bg-white p-6 ml-6 rounded-lg">
                    <div className="flex flex-col items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                        <p className="mt-2 text-sm text-gray-600">
                            {__("Loading layouts...", "header-footer-elementor")}
                        </p>
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
                            background: '#363636',
                            color: '#fff',
                            borderRadius: '6px',
                            fontSize: '14px',
                            padding: '12px 16px',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                        },
                        success: {
                            iconTheme: {
                                primary: '#10B981',
                                secondary: '#fff',
                            },
                        },
                        error: {
                            iconTheme: {
                                primary: '#EF4444',
                                secondary: '#fff',
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
                    <div className="" style={{ paddingLeft: "40px", paddingRight: "40px" }}>
                        <div
                            className="flex items-start gap-10 justify-between"
                            style={{ padding: "0 40px", marginBottom: "10px" }}
                        >
                            <h2 className="text-base font-normal text-foreground">
                                {__("Choose Layout Type", "header-footer-elementor")}
                            </h2>
                            <Button
                                variant="secondary"
                                className="text-sm"
                                onClick={() => {
                                    setShowDummyCards(false);
                                    // Clear the localStorage when going back
                                    localStorage.removeItem('hfe_showDummyCards');
                                }}
                            >
                                {__("Back", "header-footer-elementor")}
                            </Button>
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
                                            src={layoutType.image}
                                            alt={`${layoutType.title} Layout`}
                                            style={{ height: '220px'}}
                                            className="w-full object-cover"
                                        />

                                        <div 
                                            className="hover-overlay absolute inset-0 flex items-center gap-2 justify-center rounded-lg overflow-hidden backdrop-blur-sm transition-all duration-500 ease-in-out z-30"
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
                                                onClick={() => handleCreateLayout(layoutType)}
                                            >
                                                {__(`Create ${layoutType.title}`, "header-footer-elementor")}
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
                                            <DropdownMenu placement="bottom-end">
                                                <DropdownMenu.Trigger>
                                                    <EllipsisVertical size={16} className="cursor-pointer" />
                                                </DropdownMenu.Trigger>
                                                <DropdownMenu.Portal>
                                                    <DropdownMenu.ContentWrapper>
                                                        <DropdownMenu.Content className="w-40">
                                                            <DropdownMenu.List>
                                                                <DropdownMenu.Item
                                                                    disabled
                                                                    style={{ opacity: 0.5, cursor: 'not-allowed' }}
                                                                >
                                                                    {__(
                                                                        "Copy Shortcode",
                                                                        "header-footer-elementor",
                                                                    )}
                                                                </DropdownMenu.Item>
                                                                <DropdownMenu.Item
                                                                    disabled
                                                                    style={{ opacity: 0.5, cursor: 'not-allowed' }}
                                                                >
                                                                    {__(
                                                                        "Disable",
                                                                        "header-footer-elementor",
                                                                    )}
                                                                </DropdownMenu.Item>
                                                                <DropdownMenu.Item
                                                                    disabled
                                                                    style={{ opacity: 0.5, cursor: 'not-allowed' }}
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
                                        </div>
                                    </div>
                                </div>                                ))}
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
                                background: '#363636',
                                color: '#fff',
                                borderRadius: '6px',
                                fontSize: '14px',
                                padding: '12px 16px',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                            },
                            success: {
                                iconTheme: {
                                    primary: '#10B981',
                                    secondary: '#fff',
                                },
                            },
                            error: {
                                iconTheme: {
                                    primary: '#EF4444',
                                    secondary: '#fff',
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
                <div className="bg-white p-6 ml-6 rounded-lg">
                    <div className="flex flex-col items-center justify-center">
                        {/* Icon Container */}
                        <div className="">
                            <img
                                src={`${hfeSettingsData.layout_template}`}
                                alt={__("Layout Template", "header-footer-elementor")}
                                className="w-20 h-20 object-contain"
                            />
                        </div>
                        {/* Title */}
                    <h3 className="text-lg m-0 pt-3 font-semibold text-gray-900">
                        {__("No Layout Found", "header-footer-elementor")}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-text-tertiary text-center max-w-lg">
                        {__(
                            "You haven't created any layouts yet. Build a custom layout to control how your site's top section looks and behaves across all pages.",
                            "header-footer-elementor"
                        )}
                    </p>

                    {/* Create Button */}
                    <Button
                        iconPosition="left"
                        icon={<Plus />}
                        variant="primary"
                        className="font-normal px-3 py-2 flex items-center justify-center hfe-remove-ring"
                        style={{
                            backgroundColor: "#6005FF",
                            transition: "background-color 0.3s ease",
                            outline: "none",
                            borderRadius: "4px",
                        }}
                        onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor = "#4B00CC")
                        }
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor = "#6005FF")
                        }
                        onClick={() => {
                            setShowDummyCards(true);
                            // Save to localStorage when showing dummy cards
                            localStorage.setItem('hfe_showDummyCards', JSON.stringify(true));
                        }}>
                        {__("Create Layout", "header-footer-elementor")} 
                    </Button>
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
                            background: '#363636',
                            color: '#fff',
                            borderRadius: '6px',
                            fontSize: '14px',
                            padding: '12px 16px',
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                        },
                        success: {
                            iconTheme: {
                                primary: '#10B981',
                                secondary: '#fff',
                            },
                        },
                        error: {
                            iconTheme: {
                                primary: '#EF4444',
                                secondary: '#fff',
                            },
                        },
                    }}
                />
            </>
        );
    } 
        else
        {
            return (
                <>
                    <div className="" style={{ paddingLeft: "40px", paddingRight: "40px" }}>
                        <div
                            className="flex items-start gap-10 justify-between"
                            style={{ padding: "0 40px" , marginBottom: "10px" }}
                        >
                            <h2 className="text-base font-normal text-foreground">
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
        
                        <div
                            className="grid grid-cols-1 md:grid-cols-2 gap-6"
                            style={{ paddingLeft: "30px" }}
                        >
                            {layoutItems.map((item) => (
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
                                            style={{ height: '220px'}}
                                            className="w-full object-cover"
                                        />
        
                                        <div 
                                            className="hover-overlay absolute inset-0 flex items-center gap-2 justify-center rounded-lg overflow-hidden backdrop-blur-sm transition-all duration-500 ease-in-out z-30"
                                            style={{
                                                backgroundColor: "rgba(0, 0, 0, 0.4)",
                                                opacity: "0",
                                                visibility: "hidden",
                                                transform: "translateY(10px)"
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
                                                onClick={() => {
                                                    // For existing layouts, open in Elementor editor
                                                    if (item.id) {
                                                        const elementorEditUrl = `${window.location.origin}/wp-admin/post.php?post=${item.id}&action=elementor`;
                                                        window.open(elementorEditUrl, '_blank');
                                                    } else {
                                                        handleCreateLayout(item);
                                                    }
                                                }}
                                            >
                                               { item.template_type === "custom" ? 'Edit with Elementor' : __('Edit Layout', 'header-footer-elementor') }
                                                
                                            </Button>
                                            { item.template_type !== "custom" ?
                                             ( <Button
                                                    iconPosition="left"
                                                    icon={<Plus size={14} />}
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
                                                        opacity: "1",
                                                        color: "#000000",
                                                        border: "1px solid #e5e7eb",
                                                        cursor: "pointer",
                                                        display: "inline-flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        gap: "4px",
                                                        boxShadow: "none"
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.backgroundColor = '#ffffff';
                                                        e.currentTarget.style.color = '#000000';
                                                        e.currentTarget.style.borderColor = '#d1d5db';
                                                        e.currentTarget.style.outline = 'none';
                                                        e.currentTarget.style.boxShadow = 'none';
                                                        e.currentTarget.style.transform = "scale(1)";
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.backgroundColor = '#ffffff';
                                                        e.currentTarget.style.color = '#000000';
                                                        e.currentTarget.style.borderColor = '#e5e7eb';
                                                        e.currentTarget.style.outline = 'none';
                                                        e.currentTarget.style.boxShadow = 'none';
                                                        e.currentTarget.style.transform = "scale(0.95)";
                                                    }}
                                                    onClick={() => handleDisplayConditons(item)}
                                                >
                                                    {"Display Conditions"}
                                                </Button>   ) : '' }                                      
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
                                                {item.post_status === 'draft' && (
                                                    <span className="ml-2 text-xs text-gray-500 font-normal">
                                                        ({__("Draft", "header-footer-elementor")})
                                                    </span>
                                                )}
                                            </p>
                                            <DropdownMenu placement="bottom-end">
                                                <DropdownMenu.Trigger>
                                                    <EllipsisVertical size={16} className="cursor-pointer" />
                                                </DropdownMenu.Trigger>
                                                <DropdownMenu.Portal>
                                                    <DropdownMenu.ContentWrapper>
                                                        <DropdownMenu.Content className="w-40">
                                                            <DropdownMenu.List>
                                                                <DropdownMenu.Item
                                                                    onClick={() => handleCopyShortcode(item)}
                                                                >
                                                                    {__(
                                                                        "Copy Shortcode",
                                                                        "header-footer-elementor",
                                                                    )}
                                                                </DropdownMenu.Item>
                                                                {item.post_status === 'draft' ? (
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
                                background: '#363636',
                                color: '#fff',
                                borderRadius: '6px',
                                fontSize: '14px',
                                padding: '12px 16px',
                                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                            },
                            success: {
                                iconTheme: {
                                    primary: '#10B981',
                                    secondary: '#fff',
                                },
                            },
                            error: {
                                iconTheme: {
                                    primary: '#EF4444',
                                    secondary: '#fff',
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
					status: 'publish'
				},
			});

			if (response.success) {
				// Show success toast notification
				if (window.wp && window.wp.data && window.wp.data.dispatch) {
					// Using WordPress notices if available
					window.wp.data.dispatch('core/notices').createNotice(
						'success',
						__('Layout published successfully!', 'header-footer-elementor'),
						{
							type: 'snackbar',
							isDismissible: true,
						}
					);
				} else {
					// Fallback: show browser alert
					alert(__('Layout published successfully!', 'header-footer-elementor'));
				}
				
				// Reload the page to refresh the data
				setTimeout(() => {
					window.location.reload();
				}, 1000); // Small delay to show the toast first

			} else {
				console.error("Failed to publish layout:", response);
				// Show error message
				if (window.wp && window.wp.data && window.wp.data.dispatch) {
					window.wp.data.dispatch('core/notices').createNotice(
						'error',
						__('Failed to publish layout. Please try again.', 'header-footer-elementor'),
						{
							type: 'snackbar',
							isDismissible: true,
						}
					);
				} else {
					alert(__('Failed to publish layout. Please try again.', 'header-footer-elementor'));
				}
			}
		} catch (error) {
			console.error("Error publishing layout:", error);
			// Show error message
			if (window.wp && window.wp.data && window.wp.data.dispatch) {
				window.wp.data.dispatch('core/notices').createNotice(
					'error',
					__('Error publishing layout. Please try again.', 'header-footer-elementor'),
					{
						type: 'snackbar',
						isDismissible: true,
					}
				);
			} else {
				alert(__('Error publishing layout. Please try again.', 'header-footer-elementor'));
			}
		}
	};

export default withDisplayConditions(AllLayouts);

