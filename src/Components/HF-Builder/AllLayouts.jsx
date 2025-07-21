import React from "react";
import { Plus } from "lucide-react";
import { Button, Skeleton } from "@bsf/force-ui";
import { __ } from "@wordpress/i18n";

// Example: Ensure these values are coming from global/localized JS in WordPress
const layoutItems = [
	{
		name: "Header",
		image: hfeSettingsData.header_card,
		buttonText: __("Create Layout", "header-footer-elementor"),
		onClick: () => window.open("", "_blank"),
	},
	{
		name: "Footer",
		image: hfeSettingsData.footer_card,
		buttonText: __("Create Layout", "header-footer-elementor"),
		onClick: () => window.open("", "_blank"),
	},
	{
		name: "Before Footer",
		image: hfeSettingsData.before_card,
		buttonText: __("Create Layout", "header-footer-elementor"),
		onClick: () => window.open("", "_blank"),
	},
	{
		name: "Custom Block",
		image: hfeSettingsData.custom_card,
		buttonText: __("Edit with Elementor", "header-footer-elementor"),
		onClick: () => window.open("", "_blank"),
	},
];

const AllLayouts = () => {
	return (
		<div className="p-6 bg-muted min-h-screen">
			<div className="flex items-start gap-10 justify-between mb-6">
				<h2 className="text-base font-semibold text-foreground">
					Start customising Your Header & Footer
				</h2>
				<Button
					iconPosition="left"
					icon={<Plus />}
					variant="primary"
					className="bg-[#6005FF] font-light flex items-center justify-center hfe-remove-ring"
					style={{
						backgroundColor: "#6005FF",
						transition: "background-color 0.3s ease",
						outline: "none",
					}}
					onMouseEnter={(e) =>
						(e.currentTarget.style.backgroundColor = "#4B00CC")
					}
					onMouseLeave={(e) =>
						(e.currentTarget.style.backgroundColor = "#6005FF")
					}
					onClick={() => {
						window.open("", "_blank");
					}}
				>
					{__("Create Layout", "header-footer-elementor")}
				</Button>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				{layoutItems.map((item) => (
					<div
						key={item.name}
						className="bg-white rounded-md p-3 shadow-sm group cursor-pointer relative"
					>
						{/* Card container */}
						<div
							className="relative rounded-lg overflow-hidden border border-gray-200"
							style={{ height: "260px" }}
						>
							{item.name === "Header" && (
								// Header skeleton loader
								<div className="h-full">
									{/* Navigation bar skeleton */}
									<div className="bg-gray-200 h-12 flex items-center justify-between px-4">
										{/* Logo skeleton */}
										<Skeleton className="w-20 h-5 rounded bg-white" />

										{/* Navigation items skeleton */}
										<div className="flex items-center gap-6">
											<Skeleton className="w-8 h-2.5 rounded bg-white" />
											<Skeleton className="w-10 h-2.5 rounded bg-white" />
											<Skeleton className="w-12 h-2.5 rounded bg-white" />
											<Skeleton className="w-10 h-2.5 rounded bg-white" />
										</div>

										{/* Right side skeleton */}
										<Skeleton className="w-12 h-2.5 rounded bg-white" />
									</div>

									{/* Main content area */}
									<div
										className="bg-gray-100"
										style={{ height: "calc(100% - 48px)" }}
									/>
								</div>
							)}

							{item.name === "Footer" && (
								// Footer skeleton loader
								<div className="h-full flex flex-col">
									{/* Main content area */}
									<div className="flex-1 bg-gray-100" />

									{/* Footer content skeleton */}
									<div className="bg-gray-200 h-12 flex items-center justify-center gap-6 px-4">
										<Skeleton className="w-12 h-2.5 rounded bg-white" />
										<Skeleton className="w-10 h-2.5 rounded bg-white" />
										<Skeleton className="w-10 h-2.5 rounded bg-white" />
										<Skeleton className="w-12 h-2.5 rounded bg-white" />
									</div>
								</div>
							)}

							{item.name === "Before Footer" && (
								// Before Footer skeleton loader
								<div className="h-full">
									{/* Top banner skeleton */}
									<div className="bg-gray-200 h-12 flex items-center px-4">
										<Skeleton className="w-24 h-5 rounded bg-white mr-auto" />
										<div className="flex gap-4 mx-auto">
											<Skeleton className="w-12 h-2.5 rounded bg-white" />
											<Skeleton className="w-10 h-2.5 rounded bg-white" />
											<Skeleton className="w-14 h-2.5 rounded bg-white" />
										</div>
										<div className="ml-auto">
											<Skeleton className="w-12 h-2.5 rounded bg-white" />
										</div>
									</div>

									{/* Main content area */}
									<div
										className="bg-gray-100"
										style={{ height: "calc(100% - 48px)" }}
									/>
								</div>
							)}

							{item.name === "Custom Block" && (
								// Custom Block skeleton loader
								<div className="h-full flex flex-col">
									{/* Main content area */}
									<div className="flex-1 bg-gray-100" />

									{/* Bottom content skeleton */}
									<div className="bg-gray-200 h-12 flex items-center justify-center gap-6 px-4">
										<Skeleton className="w-16 h-2.5 rounded bg-white" />
										<Skeleton className="w-10 h-2.5 rounded bg-white" />
										<Skeleton className="w-12 h-2.5 rounded bg-white" />
										<Skeleton className="w-10 h-2.5 rounded bg-white" />
									</div>
								</div>
							)}

							{/* Shortcode label for Custom Block */}
							{item.name === "Custom Block" && (
								<div className="absolute bottom-4 right-4 flex items-center gap-2 bg-white px-3 py-1 rounded-md text-sm text-gray-600">
									<svg
										width="16"
										height="16"
										viewBox="0 0 16 16"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<rect
											x="2"
											y="3"
											width="3"
											height="10"
											rx="0.5"
											fill="currentColor"
										/>
										<rect
											x="11"
											y="3"
											width="3"
											height="10"
											rx="0.5"
											fill="currentColor"
										/>
									</svg>
									{__(
										"[shortcode]",
										"header-footer-elementor",
									)}
								</div>
							)}

							{/* Hover overlay and button */}
							<div className="absolute inset-0 flex items-center justify-center rounded-lg overflow-hidden group-hover:backdrop-blur-sm group-hover:bg-black/40 transition-all duration-200 z-10">
								<Button
									iconPosition="left"
									icon={
										item.name !== "Custom Block" ? (
											<Plus />
										) : null
									}
									variant="primary"
									className="bg-[#6005FF] font-light px-3 py-3 text-sm text-white hfe-remove-ring z-20"
									style={{
										backgroundColor: "#6005FF",
										fontSize: "12px",
										fontWeight: "700",
										transition:
											"background-color 0.3s ease",
										outline: "none",
									}}
									onMouseEnter={(e) =>
										(e.currentTarget.style.backgroundColor =
											"#4B00CC")
									}
									onMouseLeave={(e) =>
										(e.currentTarget.style.backgroundColor =
											"#6005FF")
									}
									onClick={item.onClick}
								>
									{item.buttonText}
								</Button>
							</div>
						</div>

						{/* Label below the card */}
						<hr
							className="w-full border-b-0 border-x-0 border-t border-solid border-t-border-subtle"
							style={{
								marginTop: "14px",
								marginBottom: "14px",
								borderColor: "#E5E7EB",
							}}
						/>
						<p className="text-sm font-medium text-gray-900 mt-2">
							{item.name}
						</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default AllLayouts;
