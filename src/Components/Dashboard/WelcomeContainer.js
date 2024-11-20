import React from "react";
import { Container, Title, Button } from "@bsf/force-ui";
import { ExternalLink, Plus } from "lucide-react";
import { __ } from '@wordpress/i18n';

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
						title="Hello,"
					/>
					<p className="text-sm font-medium text-text-tertiary m-0 mt-2">
						We’re excited to help you supercharge your
						website-building experience.Effortlessly design stunning websites with our
						comprehensive range of free and premium widgets and
						features.
					</p>
					{/* <p
						className="text-sm font-figtree pt-3 text-text-secondary"
						style={{ fontFamily: "Figtree, serif" }}
					>
						Effortlessly design stunning websites with our
						comprehensive range of free and premium widgets and
						features. To get started,watch the video or check our
						comprehensive documentation for more details.
					</p> */}
					<div className="flex items-center pt-4 gap-2">
						<Button
							icon={<Plus />}
							iconPosition="right"
							variant="primary"
							className="bg-[#6005FF]"
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
                                window.open(hfeSettingsData.elementor_page_url, '_blank');
                            }}
						>
							Create New Page
						</Button>
						<Button
							icon={<ExternalLink />}
							iconPosition="right"
							variant="ghost"
							className="uael-remove-ring"
							onClick={() => {
                                window.open("https://wordpress.org/plugins/header-footer-elementor/", '_blank');
                            }}
						>
							Read full guide
						</Button>
					</div>
				</Container.Item>
				<Container.Item className="md:mt-0 mt-4">
				<iframe
						width="280"
						height="160"
						src="https://www.youtube.com/embed/ZeogOxqdKJI"
						frameBorder="0"
						style={{ borderRadius: "8px" }}
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
					/>
				</Container.Item>
			</Container>
		</div>
	);
};
export default WelcomeContainer;
