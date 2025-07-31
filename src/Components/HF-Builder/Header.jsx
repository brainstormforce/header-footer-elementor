import React from "react";
import { Plus, EllipsisVertical } from "lucide-react";
import { Button, DropdownMenu } from "@bsf/force-ui";
import { __ } from "@wordpress/i18n";
import withDisplayConditions from "./DisplayConditionsDialog";

const Header = ({ openDisplayConditionsDialog, DisplayConditionsDialog }) => {
	const headerItems = [
		{
			id: "header-1",
			name: "Main Header",
			image: hfeSettingsData.header_card,
			buttonText: __("Edit Header", "header-footer-elementor"),
			onClick: () => window.open("https://your-site.com/edit-header", "_blank"),
		},
		// Add more header items as needed
	];

	const handleCreateHeader = (item) => {
		// If item doesn't have an ID, create a new header layout
		if (!item.id) {
			// You can add your header creation logic here
			console.log("Creating new header:", item.name);
		}
		
		// Open the display conditions dialog
		openDisplayConditionsDialog(item);
	};

	const handleRedirect = (url) => {
		window.open(url, "_blank");
	};

	return (
		<>
			<div className="header-section" style={{ paddingLeft: "40px", paddingRight: "40px" }}>
				<div
					className="flex items-start gap-10 justify-between"
					style={{ padding: "0 40px", marginBottom: "10px" }}
				>
					<h2 className="text-base font-normal text-foreground">
						{__("Header Templates", "header-footer-elementor")}
					</h2>
				</div>

				<div
					className="grid grid-cols-1 md:grid-cols-2 gap-6"
					style={{ paddingLeft: "30px" }}
				>
					{headerItems.map((item) => (
						<div
							key={item.name}
							className="border bg-background-primary border-gray-200 p-2 rounded-lg cursor-pointer overflow-hidden flex flex-col group relative shadow-sm hover:shadow-md transition-shadow duration-200"
						>
							<div className="relative h-60 w-full">
								<img
									src={item.image}
									alt={`${item.name} Layout`}
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
										onClick={() => handleCreateHeader(item)}
									>
										{item.buttonText}
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
};

export default withDisplayConditions(Header);
