import React, { useState, useEffect } from "react";
import { Plus, EllipsisVertical } from "lucide-react";
import { Button, DropdownMenu, Loader } from "@bsf/force-ui";
import { __ } from "@wordpress/i18n";
import apiFetch from "@wordpress/api-fetch";
import EmptyState from "./EmptyState";

const CustomBlock = () => {

	const [customBlockItems, setCustomBlockItems] = useState([]);
	const [hasCustomBlocks, setCustomBlocks] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	
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

	if (!hasCustomBlocks) {
		return (
			<EmptyState
				description={__(
					"You haven't created a custom block layout yet. Build a custom block to control how your site's sections look and behave across all pages.",
					"header-footer-elementor"
				)}
				buttonText={__("Create Custom Block Layout", "header-footer-elementor")}
				onClick={() => {
					// TODO: Add actual custom block creation logic
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
							>
								<div className="relative h-60 w-full">
									<img
										src={hfeSettingsData.header_card}
										alt={`${item.title} Layout`}
										style={{ height: '220px' }}
										className="w-full object-cover"
									/>
	
									<div className="absolute inset-0 flex items-center justify-center rounded-lg overflow-hidden backdrop-blur-sm bg-black/40 transition-all duration-200 z-30">
										<Button
											iconPosition="left"
											icon={<Plus size={14} />}
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
												(e.currentTarget.style.backgroundColor = "#4B00CC")
											}
											onMouseLeave={(e) =>
												(e.currentTarget.style.backgroundColor = "#6005FF")
											}
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
			</>
		);
	}
	
};

export default CustomBlock;
