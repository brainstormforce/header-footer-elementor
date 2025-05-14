import React from "react";
import { Container, Title, Button } from "@bsf/force-ui";
import { Zap, Check, Rocket, CheckIcon, CircleCheck } from "lucide-react";
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
				className="bg-background-primary px-4 border-[0.5px] border-subtle rounded-xl shadow-sm"
				containerType="flex"
				direction="column"
				// justify="between"
				gap="xs"
			>
				<Container.Item
					className="flex flex-col pt-6 justify-between"
					style={{ width: "65%" }}
				>
					<Container.Item
						className="flex justify-center items-center"
						style={{ width: "34%" }}
					>
						<img
							src={`${hfeSettingsData.augmented_reality}`}
							alt={__("Column Showcase", "header-footer-elementor")}
							className="w-full h-auto rounded"
						/>
					</Container.Item>
					<div className="pt-4">
						<Title
							description=""
							icon={<Rocket />}
							iconPosition="left"
							size="sm"
							tag="h6"
							title={__(
								"Unlock Ultimate Features",
								"header-footer-elementor"
							)}
							className="text-xs  font-semibold flex items-center justify-center text-brand-primary-600"
						/>
						<div className="flex items-center justify-center">
							<Title
								description=""
								icon={""}
								iconPosition="left"
								tag="h6"
								title={__(
									"Create Stunning Designs with the Pro Version!",
									"header-footer-elementor"
								)}
								className="py-1 flex  items-center justify-center text-[12px]"
							/>
						</div>
						<div className="flex items-center justify-center">
							<p className="m-0  max-w-[21rem] flex items-center text-base justify-center text-text-secondary">
								{__(
									"Get access to advanced widgets and features to create the website that stands out!",
									"header-footer-elementor"
								)}
							</p>
						</div>
					</div>
					{/* <Button
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
						</Button> */}
					<div className="flex items-center pt-5 justify-center">
					<Button
						iconPosition="right"
						variant="primary"
						className="bg-[#6005FF] w-32 flex items-center justify-center hfe-remove-ring"
						style={{
							backgroundColor: "#6005FF",
							transition: "background-color 0.3s ease",
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
							window.open(
								"https://ultimateelementor.com/pricing/?utm_source=uae-lite-dashboard&utm_medium=unlock-ultimate-feature&utm_campaign=uae-lite-upgrade",
								"_blank"
							);
						}}
					>
						{__("Upgrade Now", "header-footer-elementor")}
					</Button>
					</div>
					<div className="grid grid-cols-1 pt-4 grid-flow-row gap-1 my-4">
						<ul className="list-none font-normal " style={{ fontSize: '0.9rem', lineHeight: '1.6em', paddingBottom: '0.5rem', color: '#111827' }}>
							<li className="none  text-text-tertiary " style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '0.5rem' }}>
								<CircleCheck color="#6005FF" size={18} />
								{__('Modal Popup.', 'wp-schema-pro')}
							</li>
							<hr className="w-full border-b-0 border-x-0 border-t border-solid border-t-border-subtle" style={{ marginTop: '10px', marginBottom: '10px', borderColor: '#E5E7EB' }} />
							<li className="none  text-text-tertiary " style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '0.5rem' }}>
								<CircleCheck color="#6005FF" size={18} />
								{__('Advanced Heading', 'wp-schema-pro')}
							</li>
							<hr className="w-full border-b-0 border-x-0 border-t border-solid border-t-border-subtle" style={{ marginTop: '10px', marginBottom: '10px', borderColor: '#E5E7EB' }} />
							<li className="none  text-text-tertiary " style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '0.5rem' }}>
								<CircleCheck color="#6005FF" size={18} />
								{__('Info Box', 'wp-schema-pro')}
							</li>
							<hr className="w-full border-b-0 border-x-0 border-t border-solid border-t-border-subtle" style={{ marginTop: '10px', marginBottom: '10px', borderColor: '#E5E7EB' }} />
							<li className="none  text-text-tertiary " style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '0.5rem' }}>
								<CircleCheck color="#6005FF" size={18} />
								{__('Post Layouts', 'wp-schema-pro')}
							</li>
							<hr className="w-full border-b-0 border-x-0 border-t border-solid border-t-border-subtle" style={{ marginTop: '10px', marginBottom: '10px', borderColor: '#E5E7EB' }} />
							<li className="none  text-text-tertiary " style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '0.5rem' }}>
								<CircleCheck color="#6005FF" size={18} />
								{__('Form Stylers and more', 'wp-schema-pro')}
							</li>
						</ul>
					</div>
				</Container.Item>
			</Container>
		</div>
	);
};

export default UltimateFeatures;
