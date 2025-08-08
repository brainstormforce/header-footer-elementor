import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@bsf/force-ui";
import { __ } from "@wordpress/i18n";

const EmptyState = ({ 
	description, 
	buttonText, 
	onClick, 
	className = "bg-white mx-auto rounded-lg" 
}) => {
	return (
		<div className={className} style={{ marginLeft: "auto", marginRight: "auto", maxWidth: "800px", marginTop: "50px", height: '400px' }}>
			<div className="flex flex-col items-center justify-center">
				{/* Icon Container */}
				<div className="mt-4" style={{ marginTop: "120px" }}>
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
					{description}
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
					onClick={onClick}
				>
					{buttonText}
				</Button>
			</div>
		</div>
	);
};

export default EmptyState;
