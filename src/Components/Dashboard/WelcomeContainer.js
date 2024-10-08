import React from "react";
import { Container, Title, Button } from "@bsf/force-ui";
import { Share, Plus } from "lucide-react";
const WelcomeContainer = () => {
	return (
		<div>
			<Container
				align="center"
				className="bg-background-primary p-4 m-4 border-[0.5px] border-subtle rounded-xl shadow-sm w-fit"
				containerType="flex"
				direction="row"
				gap="2xl"
				style={{
					height: "240px",
				}}
			>
				<Container.Item className="w-[500px]">
					<Title
						description=""
						icon={null}
						iconPosition="right"
						size="lg"
						tag="h3"
						title="Welcome to Ultimate Addons for Elementor!"
					/>
					<p className="font-semibold">
						We’re excited to help you supercharge your
						website-building experience
					</p>
					<p className="text-sm text-text-secondary">
						Effortlessly design stunning websites with our
						comprehensive range of free and premium widgets and
						features. To get started,watch the video or check our
						comprehensive documentation for more details.
					</p>
					<div className="flex items-center gap-4">
						<Button
							icon={<Plus />}
							iconPosition="right"
							variant="primary"
							className="bg-[#6005FF]"
						>
							Create New Page
						</Button>
						<Button
							icon={<Share />}
							iconPosition="right"
							variant="ghost"
						>
							Read full guide
						</Button>
					</div>
				</Container.Item>
				<Container.Item className="">
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
