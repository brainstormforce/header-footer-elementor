import React, { useState, useEffect } from "react";
import { Plus, X } from "lucide-react";
import { Button, Skeleton, Dialog, Select } from "@bsf/force-ui";
import { __ } from "@wordpress/i18n";

// Example: Ensure these values are coming from global/localized JS in WordPress
const layoutItems = [
	{
		name: "Header",
		image: hfeSettingsData.header_card,
		buttonText: __("Create Layout", "header-footer-elementor"),
		onClick: (layout) => layout,
	},
	{
		name: "Footer",
		image: hfeSettingsData.footer_card,
		buttonText: __("Create Layout", "header-footer-elementor"),
		onClick: (layout) => layout,
	},
	{
		name: "Before Footer",
		image: hfeSettingsData.before_card,
		buttonText: __("Create Layout", "header-footer-elementor"),
		onClick: (layout) => layout,
	},
	{
		name: "Custom Block",
		image: hfeSettingsData.custom_card,
		buttonText: __("Edit with Elementor", "header-footer-elementor"),
		onClick: () => window.open("", "_blank"),
	},
];

const AllLayouts = () => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [selectedLayout, setSelectedLayout] = useState(null);
	const [conditions, setConditions] = useState([
		{
			id: 1,
			conditionType: { id: 'include', name: 'Include' },
			displayLocation: { id: 'entire-site', name: 'Entire Site' }
		}
	]);

	useEffect(() => {
		// Add global style to remove pink focus borders from forceui components
		const style = document.createElement('style');
		style.textContent = `
			.hfe-select-button:focus,
			.hfe-select-button:focus-visible,
			[data-headlessui-state*="open"] button,
			[role="listbox"] button:focus {
				outline: none !important;
				box-shadow: none !important;
				border-color: #d1d5db !important;
			}
		`;
		document.head.appendChild(style);
		
		return () => {
			document.head.removeChild(style);
		};
	}, []);

	const handleCreateLayout = (layout) => {
		setSelectedLayout(layout);
		setConditions([{
			id: 1,
			conditionType: { id: 'include', name: 'Include' },
			displayLocation: { id: 'entire-site', name: 'Entire Site' }
		}]);
		setIsDialogOpen(true);
	};

	const handleAddCondition = () => {
		const newId = Math.max(...conditions.map(c => c.id)) + 1;
		setConditions([...conditions, {
			id: newId,
			conditionType: { id: 'include', name: 'Include' },
			displayLocation: { id: 'entire-site', name: 'Entire Site' }
		}]);
	};

	const handleUpdateCondition = (conditionId, field, value) => {
		setConditions(conditions.map(condition => 
			condition.id === conditionId 
				? { ...condition, [field]: value }
				: condition
		));
	};

	const handleRemoveCondition = (conditionId) => {
		if (conditions.length > 1) {
			setConditions(conditions.filter(condition => condition.id !== conditionId));
		}
	};

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
						setIsDialogOpen(true);
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
									onClick={() => {
										if (item.name === "Custom Block") {
											item.onClick();
										} else {
											handleCreateLayout(item);
										}
									}}
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

			{/* Display Conditions Dialog */}
			<Dialog
				design="simple"
				open={isDialogOpen}
				setOpen={setIsDialogOpen}
			>
				<Dialog.Backdrop />
				<Dialog.Panel className="w-1/2 max-w-3xl">
					<Dialog.Header className="text-center p-4">
						<div className="flex items-center justify-between">
							<Dialog.Title className="text-xl font-normal">
								{__("Configure Display Conditions", "header-footer-elementor")}
							</Dialog.Title>
							<button
								onClick={() => setIsDialogOpen(false)}
								className="text-2xl leading-none font-light p-2 -mr-2"
								aria-label={__("Close", "header-footer-elementor")}
							>
								×
							</button>
						</div>
						
					</Dialog.Header>
                    
					<Dialog.Body>
						{/* Content group with gray border */}
						<div className="mx-6 px-6 py-2 border border-gray-500 rounded-lg" style={{border: '4px solid #F9FAFB' }}>
							{/* Icon */}
							<div className="flex justify-center mb-6">
								<img
								src={`${hfeSettingsData.layout_template}`}
								alt={__("Layout Template", "header-footer-elementor")}
								className="w-20 h-20 object-contain"
								/>
							</div>

							{/* Description */}
							<h2 className="text-base font-semibold text-gray-900 mb-2 text-center">
								{__("Where Should Your Layout Appear?", "header-footer-elementor")}
							</h2>
							<p className="text-gray-600 text-sm mb-8 text-center">
								{__("Decide where you want this layout to appear on your site.", "header-footer-elementor")}
								<br />
								{__("You can show it across your entire site or only on specific pages—your choice!", "header-footer-elementor")}
							</p>

							{/* Condition selection UI */}
							<div className="space-y-3">
								{conditions.map((condition, index) => (
									<div key={condition.id} className="flex items-center gap-2">
										<div className="flex items-center justify-center overflow-hidden bg-gray-50 w-full">
											{/* Include/Exclude Select */}
											<div className="rounded-lg" style={{border: '1px solid #d1d5db', width: '120px'}}>
												<Select
													onChange={(value) => handleUpdateCondition(condition.id, 'conditionType', value)}
													value={condition.conditionType}
													size="md"
												>
													<Select.Button
														className="hfe-select-button border-0 rounded-none bg-transparent h-full w-full justify-between px-4 text-black focus:outline-none focus:ring-0 focus:border-transparent"
														style={{ boxShadow: 'none' }}
													>
														{condition.conditionType.name}
													</Select.Button>
													<Select.Options>
														<Select.Option value={{ id: 'include', name: __('Include', 'header-footer-elementor') }}>
															{__("Include", "header-footer-elementor")}
														</Select.Option>
														<Select.Option value={{ id: 'exclude', name: __('Exclude', 'header-footer-elementor') }}>
															{__("Exclude", "header-footer-elementor")}
														</Select.Option>
													</Select.Options>
												</Select>
											</div>

											{/* Display Location Select */}
											<div className="rounded-lg" style={{border: '1px solid #d1d5db', width: '420px'}}>
												<Select
													onChange={(value) => handleUpdateCondition(condition.id, 'displayLocation', value)}
													value={condition.displayLocation}
													size="md"
												>
													<Select.Button
														className="hfe-select-button border-0 rounded-none bg-transparent h-full w-full justify-between px-4 text-black focus:outline-none focus:ring-0 focus:border-transparent"
														style={{ boxShadow: 'none' }}
													>
														{condition.displayLocation.name}
													</Select.Button>
													<Select.Options>
														<Select.Option value={{ id: 'entire-site', name: __('Entire Site', 'header-footer-elementor') }}>
															{__("Entire Site", "header-footer-elementor")}
														</Select.Option>
														<Select.Option value={{ id: 'pages', name: __('All Pages', 'header-footer-elementor') }}>
															{__("All Pages", "header-footer-elementor")}
														</Select.Option>
														<Select.Option value={{ id: 'posts', name: __('All Posts', 'header-footer-elementor') }}>
															{__("All Posts", "header-footer-elementor")}
														</Select.Option>
													</Select.Options>
												</Select>
											</div>
										</div>
										{conditions.length > 1 && (
											<button
												onClick={() => handleRemoveCondition(condition.id)}
												className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
												aria-label={__("Remove condition", "header-footer-elementor")}
											>
												<X size={20} />
											</button>
										)}
									</div>
								))}
							</div>
								<div className="flex justify-center">
							<Button
								variant="secondary"
								size="md"
								className="bg-black text-white px-6 py-2.5 mt-4 mb-4 rounded-md font-medium"
								onClick={handleAddCondition}
							>
								{__("Add Conditions", "header-footer-elementor")}
							</Button>
						</div>
						</div>

					
					</Dialog.Body>

					<Dialog.Footer className="border-t border-gray-200 px-8 py-6 mt-8">
						<div className="flex justify-end gap-3">
							<Button 
								onClick={() => setIsDialogOpen(false)} 
								variant="outline"
								className="rounded-md px-6 py-2.5 font-medium border-gray-300 text-gray-700 hover:bg-gray-50"
								size="md"
							>
								{__("Cancel", "header-footer-elementor")}
							</Button>
							<Button 
								onClick={() => {
									setIsDialogOpen(false);
									// Add logic here to save conditions and continue
								}}
								className="bg-[#6005FF] hover:bg-[#4B00CC] rounded-md px-6 py-2.5 font-medium text-white"
								size="md"
							>
								{__("Save Conditions", "header-footer-elementor")}
							</Button>
						</div>
					</Dialog.Footer>
				</Dialog.Panel>
			</Dialog>
		</div>
	);
};

export default AllLayouts;
