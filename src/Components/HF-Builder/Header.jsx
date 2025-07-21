import React from "react";
import { __ } from "@wordpress/i18n";
import { Button, Container } from "@bsf/force-ui";
import { Plus } from "lucide-react";

const Header = () => {
	// Simulating empty state - in real implementation, this would check if headers exist
	const hasHeaders = false;

	if (!hasHeaders) {
		return (
			<div className="bg-white p-6 ml-10 rounded-lg">
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
			<p>Headers list will be displayed here</p>
		</div>
				</Container>
			</div>	
		</>
	);
};

export default Header;
