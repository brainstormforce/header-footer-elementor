import React, { useState, useEffect } from "react";
import { Plus, EllipsisVertical } from "lucide-react";
import { Button, DropdownMenu, Loader } from "@bsf/force-ui";
import { __ } from "@wordpress/i18n";
import apiFetch from "@wordpress/api-fetch";
import withDisplayConditions from "./DisplayConditionsDialog";
import EmptyState from "./EmptyState";

const BeforeFooter = ({ openDisplayConditionsDialog, DisplayConditionsDialog }) => {

  const [beforeFooterItems, setBeforeFooterItems] = useState([]);
  const [hasBeforeFooters, setHasBeforeFooters] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Fetch the target rule options when component mounts
    apiFetch({
      path: "/hfe/v1/get-post",
      method: "POST",
      data: {
        type: 'before_footer',
      },
    })
      .then((response) => {
        if (response.success && response.posts) {
          setBeforeFooterItems(response.posts);
          // Only set hasBeforeFooters to true if there are actually items
          setHasBeforeFooters(response.posts.length > 0);
        } else {
          setHasBeforeFooters(false);
          console.error("Failed to create post:", response);
        }
      })
      .catch((error) => {
        setHasBeforeFooters(false);
        console.error("Error creating post:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });

  }, []);
  
      

  const handleDisplayConditons = (item) => {
    // If item doesn't have an ID, create a new Before Footer layout
    if (!item.id) {
      // You can add your Before Footer creation logic here
      console.log("Creating new Before Footer:", item.name);
    }
    
    // Open the display conditions dialog
    openDisplayConditionsDialog(item);
  };

  const handleEditWithElementor = (item) => {
    // Open the edit dialog
    // openDisplayConditionsDialog(item);
  };

  const handleRedirect = (url) => {
    window.open(url, "_blank");
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

  if (!hasBeforeFooters) {
    return (
      <EmptyState
        description={__(
          "You haven't created a before footer layout yet. Build a custom before footer to control how your site's pre-footer section looks and behaves across all pages.",
          "header-footer-elementor"
        )}
        buttonText={__("Create Before Footer Layout", "header-footer-elementor")}
        onClick={() => {
          // TODO: Add actual before footer creation logic
          window.open("", "_blank");
        }}
        className="bg-white p-6 ml-6 rounded-lg"
      />
    );
  } 
  else
  {
    return (
      <>
        <div className="footer-section" style={{ paddingLeft: "40px", paddingRight: "40px" }}>
          <div
            className="flex items-start gap-10 justify-between"
            style={{ padding: "0 40px", marginBottom: "10px" }}
          >
            <h2 className="text-base font-normal text-foreground">
              {__("Before Footer Templates", "header-footer-elementor")}
            </h2>
          </div>
  
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            style={{ paddingLeft: "30px" }}
          >
            {beforeFooterItems.map((item) => (
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
                    className="hover-overlay absolute inset-0 flex items-center justify-center gap-2 rounded-lg overflow-hidden backdrop-blur-sm transition-all duration-500 ease-in-out z-30"
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
                      {"Edit Before Footer"}
                    </Button>
                    <Button
                      iconPosition="left"
                      icon={<Plus size={14} />}
                      variant="primary"
                      className="font-medium text-black hfe-remove-ring z-50"
                      style={{
                        backgroundColor: "#fff !important",
                        fontSize: "12px",
                        fontWeight: "600",
                        padding: "8px 8px",
                        borderRadius: "6px",
                        transition: "all 0.2s ease",
                        outline: "none",
                        transform: "scale(0.95)",
                        opacity: "1",
                        color: "#000 !important"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#f3f4f6";
                        e.currentTarget.style.transform = "scale(1)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#fff";
                        e.currentTarget.style.transform = "scale(0.95)";
                      }}
                      onClick={() => handleDisplayConditons(item)}
                    >
                      {"Display Conditions"}
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
                                {__("Copy Shortcode", "header-footer-elementor")}
                              </DropdownMenu.Item>
                              <DropdownMenu.Item
                                onClick={() =>
                                  handleRedirect(
                                    "https://ultimateelementor.com/docs-category/templates/",
                                  )
                                }
                              >
                                {__("Disable", "header-footer-elementor")}
                              </DropdownMenu.Item>
                              <DropdownMenu.Item
                                onClick={() =>
                                  handleRedirect(
                                    "https://ultimateelementor.com/contact/",
                                  )
                                }
                              >
                                {__("Delete", "header-footer-elementor")}
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

export default withDisplayConditions(BeforeFooter);
