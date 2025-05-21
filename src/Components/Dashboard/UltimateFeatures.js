import React from "react";
import { Container, Title, Button } from "@bsf/force-ui";
import { Rocket, CircleCheck } from "lucide-react";
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
							alt={__("Column Showcase", "header-footer-elementor")}
							className="object-contain h-36 rounded"
						/>
					</Container.Item>

					{/* Title + Description */}
					<div className="pt-4 flex flex-col items-center text-center">
						<Title
							description=""
							icon={<Rocket />}
							iconPosition="left"
							size="xs"
							tag="h6"
							title={__("Unlock Ultimate Features", "header-footer-elementor")}
							className="text-xs font-medium  flex items-center justify-center text-brand-primary-600"
						/>
						<Title
							description=""
							icon=""
							iconPosition="left"
							tag="h6"
							title={
								<>
									{__("Create Stunning Designs with the", "header-footer-elementor")}
									<br />
									{__("Pro Version!", "header-footer-elementor")}
								</>
							}
							className="py-1 text-[16px] font-semibold text-center text-text-primary max-w-md"
						/>
						<p className="m-0 max-w-72 text-sm text-[#4F4E7C]">
							{__(
								"Get access to advanced widgets and features to create the website that stands out!",
								"header-footer-elementor"
							)}
						</p>
					</div>

					{/* Upgrade Button */}
					<div className="flex items-center pt-5 justify-center">
						<Button
							iconPosition="right"
							variant="primary"
							className="bg-[#6005FF] w-32 flex items-center justify-center hfe-remove-ring"
							style={{
								backgroundColor: "#6005FF",
								transition: "background-color 0.3s ease",
								outline: 'none'
							}}
							onMouseEnter={(e) =>
								(e.currentTarget.style.backgroundColor = "#4B00CC")
							}
							onMouseLeave={(e) =>
								(e.currentTarget.style.backgroundColor = "#6005FF")
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

					{/* Features List */}
					<div className="grid grid-cols-1 pt-4 grid-flow-row gap-1">
						<ul
							className="list-none font-normal"
							style={{
								fontSize: "0.9rem",
								lineHeight: "1.6em",
								paddingBottom: "0.5rem",
								color: "#111827",
							}}
						>
							<li
								className="none text-text-tertiary"
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "flex-start",
									gap: "0.5rem",
								}}
							>
								<CircleCheck color="#6005FF" size={18} />
								{__("Modal Popup.", "header-footer-elementor")}
							</li>
							<hr
								className="w-full border-b-0 border-x-0 border-t border-solid border-t-border-subtle"
								style={{
									marginTop: "10px",
									marginBottom: "10px",
									borderColor: "#E5E7EB",
								}}
							/>
							<li
								className="none text-text-tertiary"
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "flex-start",
									gap: "0.5rem",
								}}
							>
								<CircleCheck color="#6005FF" size={18} />
								{__("Advanced Heading", "header-footer-elementor")}
							</li>
							<hr
								className="w-full border-b-0 border-x-0 border-t border-solid border-t-border-subtle"
								style={{
									marginTop: "10px",
									marginBottom: "10px",
									borderColor: "#E5E7EB",
								}}
							/>
							<li
								className="none text-text-tertiary"
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "flex-start",
									gap: "0.5rem",
								}}
							>
								<CircleCheck color="#6005FF" size={18} />
								{__("Info Box", "header-footer-elementor")}
							</li>
							<hr
								className="w-full border-b-0 border-x-0 border-t border-solid border-t-border-subtle"
								style={{
									marginTop: "10px",
									marginBottom: "10px",
									borderColor: "#E5E7EB",
								}}
							/>
							<li
								className="none text-text-tertiary"
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "flex-start",
									gap: "0.5rem",
								}}
							>
								<CircleCheck color="#6005FF" size={18} />
								{__("Post Layouts", "header-footer-elementor")}
							</li>
							<hr
								className="w-full border-b-0 border-x-0 border-t border-solid border-t-border-subtle"
								style={{
									marginTop: "10px",
									marginBottom: "10px",
									borderColor: "#E5E7EB",
								}}
							/>
							<li
								className="none text-text-tertiary"
								style={{
									display: "flex",
									alignItems: "center",
									justifyContent: "flex-start",
									gap: "0.5rem",
								}}
							>
								<CircleCheck color="#6005FF" size={18} />
								{__("Form Stylers and more", "header-footer-elementor")}
							</li>
						</ul>
					</div>
				</Container.Item>
			</Container>
		</div>
	);
};

export default UltimateFeatures;
