import React, { useState, useEffect } from "react";
import { Plus, EllipsisVertical } from "lucide-react";
import { Button, DropdownMenu } from "@bsf/force-ui";
import { __ } from "@wordpress/i18n";
import apiFetch from "@wordpress/api-fetch";
import withDisplayConditions from "./DisplayConditionsDialog";

// Example: Ensure these values are coming from global/localized JS in WordPress

const layoutItems = [
	{
		id: "",
		name: "Header",
		image: hfeSettingsData.header_card,
		buttonText: __("Edit Header", "header-footer-elementor"),
		onClick: () =>
			window.open("https://your-site.com/edit-header", "_blank"),
	},
	{
		id: "",
		name: "Footer",
		image: hfeSettingsData.footer_card,
		buttonText: __("Edit Footer", "header-footer-elementor"),
		onClick: () =>
			window.open("https://your-site.com/edit-footer", "_blank"),
	},
	{
		id: "",
		name: "Before Footer",
		image: hfeSettingsData.custom_card,
		buttonText: __("Edit Before Footer", "header-footer-elementor"),
		onClick: () =>
			window.open("https://your-site.com/edit-before-footer", "_blank"),
	},
	{
		id: "",
		name: "Custom Block",
		image: hfeSettingsData.custom_card,
		buttonText: __("Edit Custom Block", "header-footer-elementor"),
		onClick: () =>
			window.open("https://your-site.com/edit-custom-block", "_blank"),
	},
];

const AllLayouts = ({ openDisplayConditionsDialog, DisplayConditionsDialog }) => {

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
							key={item.name}
							className="border bg-background-primary border-gray-200 p-2 rounded-lg cursor-pointer overflow-hidden flex flex-col group relative shadow-sm hover:shadow-md transition-shadow duration-200"
						>
							<div className="relative h-60 w-full">
								<img
									src={item.image}
									alt={`${item.name} Layout`}
									style={{ height: '220px'}}
									className="w-full object-cover"
								/>

								<div className="absolute inset-0 flex items-center justify-center rounded-lg overflow-hidden backdrop-blur-sm bg-black/40 transition-all duration-200 z-30">
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
											if (item.name === "Custom Block") {
												item.onClick();
											} else {
												handleCreateLayout(item);
											}
										}}
									>
										{item.buttonText}
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
										{item.name}
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
};

export default withDisplayConditions(AllLayouts);
