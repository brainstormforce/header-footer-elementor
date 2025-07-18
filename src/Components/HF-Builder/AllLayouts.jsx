import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@bsf/force-ui";
import { __ } from "@wordpress/i18n";

// Example: Ensure these values are coming from global/localized JS in WordPress
const layoutItems = [
	{
		name: "Header",
		image: hfeSettingsData.header_card,
		buttonText: __("Edit Header", "header-footer-elementor"),
		onClick: () =>
			window.open("https://your-site.com/edit-header", "_blank"),
	},
	{
		name: "Footer",
		image: hfeSettingsData.footer_card,
		buttonText: __("Edit Footer", "header-footer-elementor"),
		onClick: () =>
			window.open("https://your-site.com/edit-footer", "_blank"),
	},
	{
		name: "Before Footer",
		image: hfeSettingsData.before_card,
		buttonText: __("Edit Before Footer", "header-footer-elementor"),
		onClick: () =>
			window.open("https://your-site.com/edit-before-footer", "_blank"),
	},
	{
		name: "Custom Block",
		image: hfeSettingsData.custom_card,
		buttonText: __("Edit Custom Block", "header-footer-elementor"),
		onClick: () =>
			window.open("https://your-site.com/edit-custom-block", "_blank"),
	},
];

const AllLayouts = () => {
	return (
		<div className="p-6 bg-muted min-h-screen">
			<div className="flex items-start gap-10 justify-between mb-6">
				<h2 className="text-base font-normal text-foreground">
					Start customising Your Header & Footer
				</h2>
				<Button
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
				</Button>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{layoutItems.map((item) => (
					<div className="relative rounded-md mb-4 overflow-hidden flex items-center justify-center h-48">
						<img
							src={item.image}
							alt={`${item.name} Layout`}
							className="w-full h-full object-cover"
						/>
						<Button
							iconPosition="left"
							size="xs"
							icon={<Plus />}
							variant="primary"
							className="absolute top-1/2 left-1/3 transform px-3 py-3 -translate-x-1/2 -translate-y-1/2 z-10 bg-[#6005FF] font-light text-sm flex items-center justify-center hfe-remove-ring"
							style={{
								backgroundColor: "#6005FF",
								transition: "background-color 0.3s ease",
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
							onClick={item.onClick}
						>
							{item.buttonText}
						</Button>
					</div>
				))}
			</div>
		</div>
	);
};

export default AllLayouts;
