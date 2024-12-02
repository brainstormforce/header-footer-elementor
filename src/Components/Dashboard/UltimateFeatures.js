import React from "react";
import { Container, Title, Button } from "@bsf/force-ui";
import { Zap, Check } from "lucide-react";
import { Link } from "../../router/index";
import { routes } from "../../admin/settings/routes";
import { __ } from "@wordpress/i18n";

const UltimateFeatures = () => {
	const featureData = [
		{
			id: 1,
			icon: "",
			title: __("Modal Popup", "header-footer-elementor"),
		},
		{
			id: 2,
			icon: "",
			title: __("Advanced Heading", "header-footer-elementor"),
		},
		{
			id: 3,
			icon: "",
			title: __("Post Layouts", "header-footer-elementor"),
		},
		{
			id: 4,
			icon: "",
			title: __("Info Box", "header-footer-elementor"),
		},
		{
			id: 5,
			icon: "",
			title: __("Pricing Cards", "header-footer-elementor"),
		},
		{
			id: 6,
			icon: "",
			title: __("Form Stylers and more...", "header-footer-elementor"),
		},
	];

	return (
		<div>
			<Container
				className="bg-background-primary p-4 border-[0.5px] border-subtle rounded-xl shadow-sm"
				containerType="flex"
				direction="row"
				justify="between"
				gap="xs"
			>
				<Container.Item
					className="flex flex-col pt-6 pb-3 justify-between"
					style={{ width: "65%" }}
				>
					<div>
						<Title
							description=""
							icon={<Zap />}
							iconPosition="left"
							size="xs"
							tag="h6"
							title={__(
								"Unlock Ultimate Features",
								"header-footer-elementor"
							)}
							className="text-xs font-semibold text-brand-primary-600"
						/>
						<Title
							description=""
							icon={""}
							iconPosition="left"
							tag="h6"
							title={__(
								"Create Ultimate Designs with Addons Pro!",
								"header-footer-elementor"
							)}
							className="py-1 text-[12px]"
						/>
						<p className="text-sm m-0 text-text-secondary">
							{__(
								"Get access to advanced widgets and features to create the website that stands out!",
								"header-footer-elementor"
							)}
						</p>
					</div>
					<div className="grid grid-cols-2 grid-flow-row gap-1 my-4">
						{featureData.map((feature) => (
							<Title
								key={feature.id}
								description=""
								icon={
									<Check className="text-brand-primary-600 mr-1 h-3 w-3" />
								}
								iconPosition="left"
								size="xs"
								tag="h6"
								title={__(
									feature.title,
									"header-footer-elementor"
								)}
								className="text-[14px]"
							/>
						))}
					</div>
					<div className="flex items-center pb-3 gap-4">
						<Button
							variant="secondary"
							className="hfe-remove-ring"
							onClick={() => {
								window.open(
									"https://ultimateelementor.com/pricing/?utm_source=uae-lite-dashboard&utm_medium=unlock-ultimate-feature&utm_campaign=uae-lite-upgrade",
									"_blank"
								);
							}}
						>
							{__("Upgrade Now", "header-footer-elementor")}
						</Button>
						<Link
							className="text-black cursor-pointer"
							to={routes.upgrade.path}
						>
							{__(
								"Compare Lite vs Pro",
								"header-footer-elementor"
							)}
						</Link>
					</div>
				</Container.Item>
				<Container.Item
					className="flex justify-center items-center"
					style={{ width: "34%" }}
				>
					<img
						src={`${hfeSettingsData.column_url}`}
						alt={__("Column Showcase", "header-footer-elementor")}
						className="w-full h-auto rounded"
					/>
				</Container.Item>
			</Container>
		</div>
	);
};

export default UltimateFeatures;
