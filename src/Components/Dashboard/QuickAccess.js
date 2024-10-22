import React from "react";
import { Title, Container, Button } from "@bsf/force-ui";
import { Headphones, Star, HelpCircle, MessageCircle } from "lucide-react";
import { __ } from "@wordpress/i18n";

const QuickAccess = () => {
	return (
		<div
			className="hfe-dashboard-quick-access p-6 bg-white rounded-lg shadow-md"
			style={{
				width: "-webkit-fill-available",
			}}
		>
			<Title
				className="mb-2"
				icon={null}
				iconPosition="right"
				size="xs"
				tag="h3"
				title={__("Quick Access", "header-footer-elementor")}
			/>

			<Container
				align="stretch"
				className="p-1 bg-background-gray rounded-lg gap-1"
				containerType="flex"
				direction="column"
				gap=""
				justify="start"
				style={{
					width: "100%",
				}}
			>
				<Container.Item
					alignSelf="auto"
					className="p-4 bg-white rounded-lg shadow-container-item"
					order="none"
					shrink={1}
				>
					<a
						href="https://wordpress.org/support/plugin/header-footer-elementor/"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Button
							className="text-black"
							icon={<Headphones />}
							iconPosition="left"
							variant="link"
						>
							{__("Contact Us", "header-footer-elementor")}
						</Button>
					</a>
				</Container.Item>
				<Container.Item className="p-4 bg-white rounded-lg shadow-container-item">
					<a
						href="https://wordpress.org/support/plugin/header-footer-elementor/reviews/"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Button
							className="text-black"
							icon={<Star />}
							iconPosition="left"
							variant="link"
						>
							{__("Rate Us", "header-footer-elementor")}
						</Button>
					</a>
				</Container.Item>
				<Container.Item className="p-4 bg-white rounded-lg shadow-container-item">
					<a
						href="https://make.wordpress.org/"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Button
							className="text-black"
							icon={<HelpCircle />}
							iconPosition="left"
							variant="link"
						>
							{__("Request a Feature", "header-footer-elementor")}
						</Button>
					</a>
				</Container.Item>
				<Container.Item className="p-4 bg-white rounded-lg shadow-container-item">
					<a
						href="https://make.wordpress.org/"
						target="_blank"
						rel="noopener noreferrer"
					>
						<Button
							className="text-black"
							icon={<MessageCircle />}
							iconPosition="left"
							variant="link"
						>
							{__(
								"Join the Community",
								"header-footer-elementor"
							)}
						</Button>
					</a>
				</Container.Item>
			</Container>
		</div>
	);
};

export default QuickAccess;
