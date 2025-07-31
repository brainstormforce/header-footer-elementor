import React, { useState, useEffect } from "react";
import { __ } from "@wordpress/i18n";
import { Plus, X, EllipsisVertical } from "lucide-react";
import { Button, Container, Dialog, Select, DropdownMenu } from "@bsf/force-ui";

const layoutItems = [
	{
		id: "",
		name: "Header",
		image: hfeSettingsData.header_card,
		onClick: () =>
			window.open("https://your-site.com/edit-header", "_blank"),
	},
	{
		id: "",
		name: "Footer",
		image: hfeSettingsData.footer_card,
		onClick: () =>
			window.open("https://your-site.com/edit-footer", "_blank"),
	},
	{
		id: "",
		name: "Before Footer",
		image: hfeSettingsData.custom_card,
		onClick: () =>
			window.open("https://your-site.com/edit-before-footer", "_blank"),
	},
	{
		id: "",
		name: "Custom Block",
		image: hfeSettingsData.custom_card,
		onClick: () =>
			window.open("https://your-site.com/edit-custom-block", "_blank"),
	},
];

const Header = () => {
	const [hasHeaders, setHasHeaders] = useState(true);
	// Simulating empty state - in real implementation, this would check if headers exist

	if (!hasHeaders) {
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
					}}
				>
					{__("Create Header Layout", "header-footer-elementor")}
				</Button>
				</div>
			</div>
		);
	} 
	else
	{
		// Existing headers list would go here
		return (
			<>
			<div
					className="box-border bg-white p-6 rounded-lg"
					style={{
						// marginTop: "24px",
					}}
				>
						<Container
						align="center"
						className="flex flex-col lg:flex-row"
						containerType="flex"
						direction="column"
						gap="sm"
						justify="start"
					>
					<div className="p-6">
					{/* TODO: Add headers list UI */}
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
															(e.currentTarget.style.backgroundColor =
																"#4B00CC")
														}
														onMouseLeave={(e) =>
															(e.currentTarget.style.backgroundColor =
																"#6005FF")
														}
														onClick={() => {
															handleCreateLayout(item);
														}}
													>
														{"Edit Layout"}
													</Button>
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
															(e.currentTarget.style.backgroundColor =
																"#4B00CC")
														}
														onMouseLeave={(e) =>
															(e.currentTarget.style.backgroundColor =
																"#6005FF")
														}
														onClick={() => {
															handleCreateLayout(item);
														}}
													>
														{"Display Conditons"}
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
					</Container>
				</div>	
			</>
		);
	}
};

export default Header;
