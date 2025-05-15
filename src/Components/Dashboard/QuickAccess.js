import React from "react";
import { Title, Container, Button, Badge } from "@bsf/force-ui";
import { Headphones, HelpCircle, StarIcon, NotepadText, BookOpenText } from "lucide-react";
import { __ } from "@wordpress/i18n";

const QuickAccess = () => {
	return (
		<div
			className="box-border hfe-dashboard-quick-access p-4 bg-white rounded-lg shadow-md"
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
				className="p-1 rounded-lg bg-[#F9FAFB] gap-1"
				containerType="flex"
				direction="column"
				gap=""
				justify="start"
				style={{
					width: "100%",
					backgroundColor: "#F9FAFB",
				}}
			>
				<Container.Item
					alignSelf="auto"
					className="p-4 bg-white flex items-center justify-between rounded-lg shadow-container-item"
					order="none"
					shrink={1}
				>
					<Button
						className="text-black hfe-remove-ring"
						icon={<Headphones />}
						iconPosition="left"
						variant="link"
						onClick={() => {
							window.open(
								"https://ultimateelementor.com/contact/",
								"_blank"
							);
						}}
					>
						{__("VIP Priority Support", "header-footer-elementor")}
					</Button>
					<Badge
						label={__(
							"PRO",
							"header-footer-elementor"
						)}
						size="xs"
						variant="inverse"
					/>
				</Container.Item>
				<Container.Item
					alignSelf="auto"
					className="p-4 bg-white rounded-lg shadow-container-item"
					order="none"
					shrink={1}
				>
					<Button
						className="text-black hfe-remove-ring"
						icon={<BookOpenText />}
						iconPosition="left"
						variant="link"
						onClick={() => {
							window.open(
								"https://ultimateelementor.com/docs/getting-started-with-ultimate-addons-for-elementor-lite/",
								"_blank"
							);
						}}
					>
						{__("Knowledge Base", "header-footer-elementor")}
					</Button>
				</Container.Item>
				<Container.Item className="p-4 bg-white rounded-lg shadow-container-item">
					<Button
						className="text-black hfe-remove-ring"
						icon={<HelpCircle />}
						iconPosition="left"
						variant="link"
						onClick={() => {
							window.open(
								"https://ultimateelementor.com/docs/",
								"_blank"
							);
						}}
					>
						{__("Help Centre", "header-footer-elementor")}
					</Button>
				</Container.Item>
				<Container.Item className="p-4 bg-white rounded-lg shadow-container-item">
					<Button
						className="text-black hfe-remove-ring"
						icon={<NotepadText />}
						iconPosition="left"
						variant="link"
						onClick={() => {
							window.open(
								"https://ideas.ultimateelementor.com/boards/feature-requests",
								"_blank"
							);
						}}
					>
						{__("Request a Feature", "header-footer-elementor")}
					</Button>
				</Container.Item>
				{/* <Container.Item className="p-4 bg-white rounded-lg shadow-container-item">
					<Button
						className="text-black hfe-remove-ring"
						icon={<MessagesSquareIcon />}
						iconPosition="left"
						variant="link"
						onClick={() => {
							window.open(
								"https://make.wordpress.org/",
								"_blank"
							);
						}}
					>
						{__("Join the Community", "header-footer-elementor")}
					</Button>
				</Container.Item> */}
			</Container>
		</div>
	);
};

export default QuickAccess;
