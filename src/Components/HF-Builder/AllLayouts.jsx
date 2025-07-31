import React, { useState, useEffect } from "react";
import { Plus, EllipsisVertical } from "lucide-react";
import { Button, DropdownMenu } from "@bsf/force-ui";
import { __ } from "@wordpress/i18n";
import apiFetch from "@wordpress/api-fetch";
import withDisplayConditions from "./DisplayConditionsDialog";

// Example: Ensure these values are coming from global/localized JS in WordPress

const AllLayouts = ({ openDisplayConditionsDialog, DisplayConditionsDialog }) => {

    const [layoutItems, setlLayoutItems] = useState([]);
        const [hasLayoutItems, setHasLayoutItems] = useState(false);
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
                        setHasLayoutItems(true);
                    } else {
                        setHasLayoutItems(false);
                        console.error("Failed to create post:", response);
                    }
                })
                .catch((error) => {
                    console.error("Error creating post:", error);
                });
    
        }, []);
        

	const handleCreateLayout = (item) => {
		if (!item.id) {
			apiFetch({
				path: "/hfe/v1/create-layout",
				method: "POST",
				data: {
					title: "My Custom Layout",
					type: item.name,
				},
			})
				.then((response) => {
					if (response.success && response.post_id) {
						console.log("Post created with ID:", response.post_id);

						// Update item with new post ID
						const updatedItem = { ...item, id: response.post_id };

						// Open display conditions dialog using HOC function
						openDisplayConditionsDialog(updatedItem);
					} else {
						console.error("Failed to create post:", response);
					}
				})
				.catch((error) => {
					console.error("Error creating post:", error);
				});
		} else {
			// Post already exists, open dialog directly
			openDisplayConditionsDialog(item);
		}
	};

	const handleRedirect = (url) => {
		window.open(url, "_blank");
	};

    if (!hasLayoutItems) {
            return (
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
                            "You haven't created a header layout yet. Build a custom header to control how your site's top section looks and behaves across all pages.",
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
                            // TODO: Add actual header creation logic
                            window.open("", "_blank");
                        }}>
                        {__("Create Header Layout", "header-footer-elementor")} 
                    </Button>
                    </div>
                </div>
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
                                >
                                    <div className="relative h-60 w-full">
                                        <img
                                            src={hfeSettingsData.header_card}
                                            alt={`${item.title} Layout`}
                                            style={{ height: '220px'}}
                                            className="w-full object-cover"
                                        />
        
                                        <div className="absolute inset-0 flex items-center gap-2 justify-center rounded-lg overflow-hidden backdrop-blur-sm bg-black/40 transition-all duration-200 z-30">
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
                                                    backgroundColor: "#6005FF",
                                                    fontSize: "12px",
                                                    fontWeight: "600",
                                                    padding: "8px 8px",
                                                    borderRadius: "6px",
                                                    transition: "all 0.2s ease",
                                                    outline: "none",
                                                }}
                                                onMouseEnter={(e) =>
                                                    (e.currentTarget.style.backgroundColor =
                                                        "#4B00CC")
                                                }
                                                onMouseLeave={(e) =>
                                                    (e.currentTarget.style.backgroundColor =
                                                        "#6005FF")
                                                }
                                                onClick={() => {
                                                    if (item.template_type === "custom") {
                                                        item.onClick();
                                                    } else {
                                                        handleCreateLayout(item);
                                                    }
                                                }}
                                            >
                                               { item.template_type === "custom" ? 'Edit with Elementor' : 'Edit Layout'}
                                                
                                            </Button>
                                            { item.template_type !== "custom" ?
                                             ( <Button
                                                    iconPosition="left"
                                                    icon={<Plus size={14} />}
                                                    variant="primary"
                                                    className="font-medium text-black hfe-remove-ring z-50"
                                                    style={{
                                                        backgroundColor: "#fff",
                                                        fontSize: "12px",
                                                        fontWeight: "600",
                                                        padding: "8px 8px",
                                                        borderRadius: "6px",
                                                        transition: "all 0.2s ease",
                                                        outline: "none",
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
                                                                    onClick={() =>
                                                                        handleRedirect(
                                                                            "https://ultimateelementor.com/docs-category/features/",
                                                                        )
                                                                    }
                                                                >
                                                                    {__(
                                                                        "Copy Shortcode",
                                                                        "header-footer-elementor",
                                                                    )}
                                                                </DropdownMenu.Item>
                                                                <DropdownMenu.Item
                                                                    onClick={() =>
                                                                        handleRedirect(
                                                                            "https://ultimateelementor.com/docs-category/templates/",
                                                                        )
                                                                    }
                                                                >
                                                                    {__(
                                                                        "Disable",
                                                                        "header-footer-elementor",
                                                                    )}
                                                                </DropdownMenu.Item>
                                                                <DropdownMenu.Item
                                                                    onClick={() =>
                                                                        handleRedirect(
                                                                            "https://ultimateelementor.com/contact/",
                                                                        )
                                                                    }
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
                </>
            );
        }
	
};

export default withDisplayConditions(AllLayouts);
