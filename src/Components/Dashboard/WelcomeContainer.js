import React from "react";
import { Container, Title, Button } from "@bsf/force-ui";
import { ExternalLink, Plus } from "lucide-react";
const WelcomeContainer = () => {
	return (
		<div>
			<Container
				align="center"
				className="bg-background-primary border-[0.5px] border-subtle rounded-xl shadow-sm mb-4 p-4"
				containerType="flex"
				direction="row"
				gap="sm"
			>
				<Container.Item shrink={1}>
					<Title
						description=""
						icon={null}
						iconPosition="right"
						className="pt-6 max-w-lg"
						size="md"
						tag="h3"
						title="Welcome to Ultimate Addons for Elementor!"
					/>
					<p className="font-semibold text-sm pt-1">
						We’re excited to help you supercharge your
						website-building experience
					</p>
					<p
						className="text-sm font-figtree pt-3 text-text-secondary"
						style={{ fontFamily: "Figtree, serif" }}
					>
						Effortlessly design stunning websites with our
						comprehensive range of free and premium widgets and
						features. To get started,watch the video or check our
						comprehensive documentation for more details.
					</p>
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
						>
							Create New Page
						</Button>
						<Button
							icon={<ExternalLink />}
							iconPosition="right"
							variant="ghost"
						>
							Read full guide
						</Button>
					</div>
				</Container.Item>
				<Container.Item className="p-2">
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
