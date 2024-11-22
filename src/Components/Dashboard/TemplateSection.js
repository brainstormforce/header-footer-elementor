import React from "react";
import { Title, Button } from "@bsf/force-ui";
import { __ } from "@wordpress/i18n";
import { Link } from "../../router/index"; // Import the custom Link component
import { routes } from "admin/settings/routes"; // Import the routes object

const TemplateSection = () => {
	return (
		<div className="box-border hfe-dashboard-templates p-4 bg-white rounded-lg shadow-md mb-6 hfe-subheading">
			<div className="mb-4">
				<img
					src={`${hfeSettingsData.templates_url}`}
					alt="Template Showcase"
					className="w-full h-auto rounded"
				/>
			</div>
			<Title
				className="mt-2"
				icon={null}
				iconPosition="right"
				size="xs"
				tag="h2"
				title={__(
					"Build Websites 10x Faster with Templates",
					"header-footer-elementor"
				)}
			/>
			<p className="text-text-secondary text-text-tertiary mt-2 mb-2 text-sm">
				{__(
					"Choose from our professionally designed websites to build your site faster, with easy customization options.",
					"header-footer-elementor"
				)}
			</p>
			<Link to={routes.templates.path} className="w-full">
				<Button
					className="w-full mt-4"
					icon={null}
					iconPosition="left"
					size="md"
					variant="secondary"
				>
					{__("View Templates", "header-footer-elementor")}
				</Button>
			</Link>
		</div>
	);
};

export default TemplateSection;
