import React from "react";
import { Container, Title, Button } from "@bsf/force-ui";
import { ExternalLink, Plus } from "lucide-react";
import HeaderLine from '@components/HeaderLine'
import { __ } from "@wordpress/i18n";

const WelcomeContainer = () => {
	return (
		<div>
			<Container
				align="center"
				className="bg-background-primary border-[0.5px] border-subtle rounded-xl shadow-sm mb-6 p-8 flex flex-col lg:flex-row"
				containerType="flex"
				direction="row"
				gap="sm"
			>
				<Container.Item shrink={1}>
					<Title
						description=""
						icon={null}
						iconPosition="right"
						className="max-w-lg"
						size="lg"
						tag="h3"
						title={__("Welcome to Ultimate Addons for Elementor!", "header-footer-elementor")}
					/>
                	<HeaderLine />
					<p className="text-sm font-medium text-text-tertiary m-0 mt-2">
						{__(
							"We're excited to help you supercharge your website-building experience.Effortlessly design stunning websites with our comprehensive range of free and premium widgets and features.",
							"header-footer-elementor"
						)}
					</p>
					<div className="flex items-center pt-6 gap-2">
						<Button
							iconPosition="right"
							variant="primary"
							className="bg-[#6005FF] hfe-remove-ring"
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
									hfeSettingsData.hfe_post_url,
									"_blank"
								);
							}}
						>
							{__("Create Header/Footer", "header-footer-elementor")}
						</Button>
						<Button
							icon={<Plus />}
							iconPosition="right"
							variant="outline"
							className="hfe-remove-ring"
							style={{
								color: "#7D4CDB",
								borderColor: "#E9DFFC",
							}}
							onMouseEnter={(e) =>
								(e.currentTarget.style.color =
									"#000000")
							}
							onMouseLeave={(e) =>
								(e.currentTarget.style.color =
									"#7D4CDB") &&
								(e.currentTarget.style.borderColor =
									"#E9DFFC")
							}
							onClick={() => {
								window.open(
									hfeSettingsData.elementor_page_url,
									"_blank"
								);
							}}
						>
							{__("Create New Page", "header-footer-elementor")}
						</Button>
						<div
							style={{
								color: "black",
								background: "none",
								border: "none",
								padding: 0,
								cursor: "pointer",
							}}
							onMouseEnter={(e) =>
								(e.currentTarget.style.color = "#6005ff")
							}
							onMouseLeave={(e) =>
								(e.currentTarget.style.color = "black")
							}
							onClick={() => {
								window.open(
									"https://ultimateelementor.com/docs/getting-started-uael/",
									"_blank"
								);
							}}
						>
							<Button
								icon={<ExternalLink />}
								iconPosition="right"
								variant="link"
								className="hfe-remove-ring text-black"
							>
								{__("Read full guide", "header-footer-elementor")}
							</Button>
						</div>
					</div>
				</Container.Item>
				{/* <Container.Item className="md:mt-0 mt-4">
				<iframe
						width="280"
						height="160"
						src="https://www.youtube.com/embed/ZeogOxqdKJI"
						frameBorder="0"
						style={{ borderRadius: "8px" }}
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
					/>
				</Container.Item> */}
			</Container>
		</div>
	);
};
export default WelcomeContainer;
