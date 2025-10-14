import React from "react";
import { Container, Title, Button } from "@bsf/force-ui";
import { Rocket, Check } from "lucide-react";
import { __ } from "@wordpress/i18n";

const UltimateFeatures = () => {
	return (
		<div>
			<Container
				className="bg-background-primary px-4 border-[0.5px] border-subtle rounded-xl shadow-sm"
				containerType="flex"
				direction="column"
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
							alt={__(
								"Column Showcase",
								"header-footer-elementor",
							)}
							className="object-contain  w-full rounded"
						/>
					</Container.Item>

					{/* Title + Description */}
					<div className="pt-2 px-2 flex flex-col">
						<Title
							description=""
							icon={<Rocket />}
							iconPosition="left"
							size="xs"
							tag="p"
							title={__(
								"Unlock Pro Widgets",
								"header-footer-elementor",
							)}
							className="text-xs py-1  text-[#C026D3]"
						/>
						<Title
							description=""
							icon=""
							iconPosition="left"
							tag="h6"
							title={
								<>
									{__(
										"Bring Your Vision to Life with UAE Pro",
										"header-footer-elementor",
									)}
								</>
							}
							className="py-1 text-[16px] font-normal  text-text-primary"
						/>
						<p className="m-0 text-base max-w-96 text-[#4F4E7C]">
							{__(
								"Streamline your workflow, skip the repetitive tasks, and build modern, high-performance websites.",
								"header-footer-elementor",
							)}
						</p>
					</div>

					{/* Features List */}
					<div className="grid grid-cols-1 md:grid-cols-2 gap-2 m-0 pt-2">
						<ul className="list-none font-normal space-y-2 text-sm text-[#111827]">
							<li className="flex items-center gap-1 text-text-tertiary whitespace-nowrap">
								<Check color="#6005FF" size={16} className="flex-shrink-0" />
								<span className="truncate">{__("Fancy Heading", "header-footer-elementor")}</span>
							</li>
							<li className="flex items-center gap-1 text-text-tertiary whitespace-nowrap">
								<Check color="#6005FF" size={16} className="flex-shrink-0" />
								<span className="truncate">{__("FAQ Schema", "header-footer-elementor")}</span>
							</li>
							<li className="flex items-center gap-1 text-text-tertiary whitespace-nowrap">
								<Check color="#6005FF" size={16} className="flex-shrink-0" />
								<span className="truncate">{__("Modal Popup", "header-footer-elementor")}</span>
							</li>
							<li className="flex items-center gap-1 text-text-tertiary whitespace-nowrap">
								<Check color="#6005FF" size={16} className="flex-shrink-0" />
								<span className="truncate">{__("InfoBox", "header-footer-elementor")}</span>
							</li>
						</ul>

						<ul className="list-none font-normal space-y-2 text-sm text-[#111827]">
							<li className="flex items-center gap-1 text-text-tertiary whitespace-nowrap">
								<Check color="#6005FF" size={16} className="flex-shrink-0" />
								<span className="truncate">{__("Before After Slider", "header-footer-elementor")}</span>
							</li>
							<li className="flex items-center gap-1 text-text-tertiary whitespace-nowrap">
								<Check color="#6005FF" size={16} className="flex-shrink-0" />
								<span className="truncate">{__("Video Gallery", "header-footer-elementor")}</span>
							</li>
							<li className="flex items-center gap-1 text-text-tertiary whitespace-nowrap">
								<Check color="#6005FF" size={16} className="flex-shrink-0" />
								<span className="truncate">{__("Price Box", "header-footer-elementor")}</span>
							</li>
							<li className="flex items-center gap-1 text-text-tertiary whitespace-nowrap">
								<Check color="#6005FF" size={16} className="flex-shrink-0" />
								<span className="truncate">{__("And more..", "header-footer-elementor")}</span>
							</li>
						</ul>
					</div>
				</Container.Item>

					{/* Upgrade Button */}
					<div className="flex items-center m-0 pb-4 w-full  justify-center">
						<Button
							iconPosition="right"
							variant="primary"
							className="bg-[#6005FF] w-full m-0 h-10 flex items-center justify-center hfe-remove-ring"
							style={{
								backgroundColor: "#6005FF",
								transition: "background-color 0.3s ease",
								outline: "none",
								height: "40px",
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
									"_blank",
								);
							}}
						>
							{__("View Plans", "header-footer-elementor")}
						</Button>
					</div>
			</Container>
		</div>
	);
};

export default UltimateFeatures;
