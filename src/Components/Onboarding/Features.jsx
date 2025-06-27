import React, { useState, useEffect } from "react";
import {
	Container,
	Title,
	Switch,
	Button,
	Dialog,
	Input,
	Badge,
} from "@bsf/force-ui";
import { __, sprintf } from "@wordpress/i18n";
import apiFetch from "@wordpress/api-fetch";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Toaster, toast } from "react-hot-toast";
import { Link } from "../../router/index";
import { routes } from "../../admin/settings/routes";

const Features = ({ setCurrentStep }) => {
	return (
		<>
			{/* <Toaster
				position="top-right"
				reverseOrder={false}
				gutter={8}
				containerStyle={{
					top: 20,
					right: 20,
					marginTop: "40px",
				}}
				toastOptions={{
					duration: 1000,
					style: {
						color: "#0017E1",
					},
					success: {
						duration: 2000,
						style: {
							color: "",
						},
						iconTheme: {
							primary: "#0017E1",
							secondary: "#fff",
						},
					},
				}}
			/> */}
			<div
				className="box-border bg-background-primary p-6 rounded-lg"
				style={{
					marginTop: "24px",
					width: "50%",
				}}
			>
				<Title
					description=""
					icon={null}
					iconPosition="right"
					size="md"
					tag="h2"
					title={__("Select Your Features", "ultimate_vc")}
				/>
				<span
					className="text-sm font-medium text-text-secondary m-0 mb-2"
					style={{ lineHeight: "1.5em" }}
				>
					{__(
						"Get more control, faster workflows, and deeper customization — all designed to help you build better websites with less effort.",
						"header-footer-elementor",
					)}
				</span>
				<div className="relative" style={{ marginTop: "20px" }}>
					<Container
						align="center"
						className="flex flex-col lg:flex-row mt-5"
						containerType="flex"
						direction="column"
						gap="sm"
						justify="between"
						item
					>
						<Container.Item className="shrink flex flex-col space-y-1 mt-5">
							<div className="flex items-center justify-start gap-2">
								<div className="text-base font-semibold m-0">
									{__(
										"Header & Footer Builder",
										"ultimate_vc",
									)}
								</div>
								<Badge
									label={__(
										"Free",
										"header-footer-elementor",
									)}
									size="xs"
									type="pill"
									variant="green"
								/>
							</div>
							<div
								className="text-sm font-normal m-0"
								style={{ maxWidth: "90%", color: "#9CA3AF" }}
							>
								{sprintf(
									__(
										"Assign headers and footers to specific pages or post types. Gives users complete layout control—something typically locked behind Pro plugins.",
										"ultimate_vc",
									),
								)}
							</div>
						</Container.Item>
						<Container.Item
							className="shrink-0 p-2 flex space-y-6 uavc-remove-ring"
							alignSelf="flex-start"
							order="none"
							style={{
								position: "absolute",
								right: "0",
								top: "0",
							}}
						>
							<Switch
								size="md"
								// value={smoothScrollEnabled}
								// onChange={handleSmoothScrollSwitch}
								// disabled={isLoading}
							/>
						</Container.Item>
					</Container>
				</div>

				<hr
					className="w-full border-b-0 border-x-0 border-t border-solid border-t-border-subtle"
					style={{
						marginTop: "10px",
						marginBottom: "10px",
						borderColor: "#E5E7EB",
					}}
				/>

				<Container
					align="center"
					className="flex flex-col lg:flex-row"
					containerType="flex"
					direction="column"
					gap="sm"
					justify="between"
					item
				>
					<Container.Item className="shrink flex flex-col space-y-1">
						<div className="flex items-center justify-start gap-2">
							<div className="text-base font-semibold m-0">
								{__(
									"Mega Menu & Navigation Widget",
									"ultimate_vc",
								)}
							</div>
							<Badge
								label={__("Free", "header-footer-elementor")}
								size="xs"
								type="pill"
								variant="green"
							/>
						</div>
						<div
							style={{ color: "#9CA3AF" }}
							className="text-sm font-normal m-0"
						>
							{sprintf(
								__(
									"Save hours by copying Elementor sections, widgets, or pages from one website to another—no need to rebuild layouts from scratch.",
									"ultimate_vc",
								),
							)}
						</div>
					</Container.Item>
					<Container.Item
						className="shrink-0 p-2 flex space-y-6 uavc-remove-ring"
						alignSelf="auto"
						order="none"
						style={{ marginTop: "40px" }}
					>
						<Switch
							size="md"
							// value={combinedCssEnabled}
							// onChange={handleCombinedCssSwitch}
						/>
					</Container.Item>
				</Container>

				<hr
					className="w-full border-b-0 border-x-0 border-t border-solid border-t-border-subtle"
					style={{
						marginTop: "10px",
						marginBottom: "10px",
						borderColor: "#E5E7EB",
					}}
				/>

				<Container
					align="center"
					className="flex flex-col lg:flex-row"
					containerType="flex"
					direction="column"
					gap="sm"
					justify="between"
					item
				>
					<Container.Item className="shrink flex flex-col space-y-1">
						<div className="flex items-center justify-start gap-2">
							<div className="text-base font-semibold m-0">
								{__("Modal Popup", "ultimate_vc")}
							</div>
							<Badge
								label={__("Pro", "header-footer-elementor")}
								size="xs"
								type="pill"
								variant="inverse"
							/>
						</div>
						<div
							style={{ color: "#9CA3AF" }}
							className="text-sm font-normal m-0"
						>
							{sprintf(
								__(
									"Design eye-catching popups directly in Elementor—collect leads, display promotions, or show messages without needing a separate popup plugin.",
									"ultimate_vc",
								),
							)}
						</div>
					</Container.Item>
					<Container.Item
						className="shrink-0 p-2 flex space-y-6 uavc-remove-ring"
						alignSelf="auto"
						order="none"
						style={{ marginTop: "40px" }}
					>
						<Switch
							size="md"
							// value={combinedJsEnabled}
							// onChange={handleCombinedJsSwitch}
						/>
					</Container.Item>
				</Container>

				<hr
					className="w-full border-b-0 border-x-0 border-t border-solid border-t-border-subtle"
					style={{
						marginTop: "10px",
						marginBottom: "10px",
						borderColor: "#E5E7EB",
					}}
				/>

				<Container
					align="center"
					className="flex flex-col lg:flex-row"
					containerType="flex"
					direction="column"
					gap="sm"
					justify="between"
					item
				>
					<Container.Item className="shrink flex flex-col space-y-1">
						<div className="flex items-center justify-start gap-2">
							<div className="text-base font-semibold m-0">
								{__("WooCommerce Widgets", "ultimate_vc")}
							</div>
							<Badge
								label={__("Pro", "header-footer-elementor")}
								size="xs"
								type="pill"
								variant="inverse"
							/>
						</div>
						<div
							style={{ color: "#9CA3AF" }}
							className="text-sm font-normal m-0"
						>
							{__(
								"Design eye-catching popups directly in Elementor—collect leads, display promotions, or show messages without needing a separate popup plugin.",
								"ultimate_vc",
							)}
						</div>
					</Container.Item>
					<Container.Item
						className="shrink-0 p-2 flex space-y-6 uavc-remove-ring"
						alignSelf="auto"
						order="none"
						style={{ marginTop: "40px" }}
					>
						<Switch
							size="md"
							// value={analyticsOptin}
							// onChange={handleAnalyticsSwitch}
						/>
					</Container.Item>
				</Container>
				<hr
					className="w-full border-b-0 border-x-0 border-t border-solid border-t-border-subtle"
					style={{
						marginTop: "10px",
						marginBottom: "10px",
						borderColor: "#E5E7EB",
					}}
				/>
				<Container
					align="center"
					className="flex flex-col lg:flex-row"
					containerType="flex"
					direction="column"
					gap="sm"
					justify="between"
					item
				>
					<Container.Item className="shrink flex flex-col space-y-1">
						<div className="flex items-center justify-start gap-2">
							<div className="text-base font-semibold m-0">
								{__(
									"50+ Premium Widgets & 200+ Templates",
									"ultimate_vc",
								)}
							</div>
							<Badge
								label={__("Pro", "header-footer-elementor")}
								size="xs"
								type="pill"
								variant="inverse"
							/>
						</div>
						<div
							style={{ color: "#9CA3AF" }}
							className="text-sm font-normal m-0"
						>
							{__(
								"Design eye-catching popups directly in Elementor—collect leads, display promotions, or show messages without needing a separate popup plugin.",
								"ultimate_vc",
							)}
						</div>
					</Container.Item>
					<Container.Item
						className="shrink-0 p-2 flex space-y-6 uavc-remove-ring"
						alignSelf="auto"
						order="none"
						style={{ marginTop: "40px" }}
					>
						<Switch
							size="md"
							// value={analyticsOptin}
							// onChange={handleAnalyticsSwitch}
						/>
					</Container.Item>
				</Container>
				<div className="flex justify-between items-center pt-6 px-2 hfe-onboarding-bottom">
					<Button
						className="flex items-center gap-1 outline-none hfe-remove-ring"
						icon={<ChevronLeft />}
						variant="outline"
						onClick={() => setCurrentStep(2)}
					>
						{__("Back", "header-footer-elementor")}
					</Button>
					<div className="flex justify-start text-text-tertiary items-center gap-3">
						<Button
							className="hfe-remove-ring"
							variant="ghost"
							onClick={() => setCurrentStep(3)}
						>
							{" "}
							{__("Skip", "header-footer-elementor")}
						</Button>
						<Button
							className="flex items-center gap-1 hfe-remove-ring"
							icon={<ArrowRight />}
							iconPosition="right"
							style={{
								backgroundColor: "#240064",
								transition: "background-color 0.3s ease",
								padding: "12px",
							}}
							onClick={() => setCurrentStep(4)}
						>
							{__(" Next", "header-footer-elementor")}
						</Button>
					</div>
				</div>
			</div>
		</>
	);
};

export default Features;
