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
	const [selectedFeatures, setSelectedFeatures] = useState({
		headerFooterBuilder: false,
		megaMenu: false,
		modalPopup: false,
		wooCommerceWidgets: false,
		premiumWidgets: false,
	});

	const handleFeatureChange = (featureName) => {
		setSelectedFeatures((prev) => ({
			...prev,
			[featureName]: !prev[featureName],
		}));
	};

	const hasFreeFeaturesSelected =
		selectedFeatures.headerFooterBuilder || selectedFeatures.megaMenu;
	const hasProFeaturesSelected =
		selectedFeatures.modalPopup ||
		selectedFeatures.wooCommerceWidgets ||
		selectedFeatures.premiumWidgets;
	const hasAnyFeatureSelected =
		hasFreeFeaturesSelected || hasProFeaturesSelected;

	const handleUpgrade = () => {
		// Add your upgrade URL here
		window.open("https://your-upgrade-url.com", "_blank");
	};

	return (
		<>
			<style>
				{`
                    .role-checkbox {
                        position: relative;
                        width: 30px;
                        height: 30px;
                        -webkit-appearance: none;
                        appearance: none;
                        border: 2px solid #d1d5db; /* gray-300 */
                        border-radius: 4px;
                        cursor: pointer;
                    }

                    .role-checkbox:checked {
                        background-color: #240064;
                        border-color: #0017E1;
                    }

                    .role-checkbox:checked::after {
                        content: '';
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        width: 4px;
                        height: 8px;
                        border-right: 2px solid #fff;
                        border-bottom: 2px solid #fff;
                        transform: translate(-50%, -60%) rotate(45deg);
                    }
                `}
			</style>
			<div
				className="box-border bg-background-primary p-6 rounded-lg"
				style={{
					marginTop: "24px",
					width: "672px",
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
							<input
								type="checkbox"
								checked={selectedFeatures.headerFooterBuilder}
								onChange={() =>
									handleFeatureChange("headerFooterBuilder")
								}
								className="role-checkbox w-5 h-5 outline-none focus:ring-2"
								style={{
									accentColor: "#240064",
									width: "18px",
									height: "18px",
								}}
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
						<input
							type="checkbox"
							checked={selectedFeatures.megaMenu}
							onChange={() => handleFeatureChange("megaMenu")}
							className="role-checkbox w-5 h-5  focus:ring-2"
							style={{
								accentColor: "#240064",
								width: "18px",
								height: "18px",
							}}
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
						<input
							type="checkbox"
							checked={selectedFeatures.modalPopup}
							onChange={() => handleFeatureChange("modalPopup")}
							className="role-checkbox w-5 h-5  focus:ring-2"
							style={{
								accentColor: "#240064",
								width: "18px",
								height: "18px",
							}}
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
						<input
							type="checkbox"
							checked={selectedFeatures.wooCommerceWidgets}
							onChange={() =>
								handleFeatureChange("wooCommerceWidgets")
							}
							className="role-checkbox w-5 h-5  focus:ring-2"
							style={{
								accentColor: "#240064",
								width: "18px",
								height: "18px",
							}}
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
						<input
							type="checkbox"
							checked={selectedFeatures.premiumWidgets}
							onChange={() =>
								handleFeatureChange("premiumWidgets")
							}
							className="role-checkbox w-5 h-5  focus:ring-2"
							style={{
								accentColor: "#240064",
								width: "18px",
								height: "18px",
							}}
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
						{hasProFeaturesSelected ? (
							<Button
								className="flex items-center gap-1 hfe-remove-ring"
								icon={<ArrowRight />}
								iconPosition="right"
								style={{
									backgroundColor: "#240064",
									transition: "background-color 0.3s ease",
									padding: "12px",
								}}
								onClick={handleUpgrade}
							>
								{__("Upgrade", "header-footer-elementor")}
							</Button>
						) : (
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
								{__("Next", "header-footer-elementor")}
							</Button>
						)}
					</div>
				</div>
				{hasProFeaturesSelected && (
					<div
						className="mt-4 p-3 rounded-lg border border-gray-200 bg-gray-50"
						style={{
							backgroundColor: "#F9FAFB",
							borderColor: "#E5E7EB",
							marginTop: "16px",
						}}
					>
						<div className="text-sm text-gray-700 font-medium">
							{__(
								"You've picked Pro features — upgrade to start using them.",
								"header-footer-elementor",
							)}
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default Features;
