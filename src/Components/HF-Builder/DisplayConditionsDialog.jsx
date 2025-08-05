import React, { useState, useEffect } from "react";
import { Plus, X } from "lucide-react";
import { Button, Dialog } from "@bsf/force-ui";
import { __ } from "@wordpress/i18n";
import apiFetch from "@wordpress/api-fetch";

/**
 * Higher-Order Component for Display Conditions Dialog
 * This HOC provides display conditions functionality to any component
 */
const withDisplayConditions = (WrappedComponent) => {
	return (props) => {
		const [isDialogOpen, setIsDialogOpen] = useState(false);
		const [selectedItem, setSelectedItem] = useState(null);
		const [conditions, setConditions] = useState([]);
		const [isLoading, setIsLoading] = useState(false);
		const [isButtonLoading, setIsButtonLoading] = useState(false);
		const [error, setError] = useState(null);
		const [locationOptions, setLocationOptions] = useState({});
		const [nextId, setNextId] = useState(2);
		const [isNewPost, setIsNewPost] = useState(false);

		// Default conditions for new posts
		const getDefaultConditions = () => [
			{
				id: 1,
				conditionType: {
					id: "include",
					name: __("Include", "header-footer-elementor"),
				},
				displayLocation: {
					id: "entire-site",
					name: __("Entire Site", "header-footer-elementor"),
				},
			},
		];

		useEffect(() => {
			// Fetch the target rule options when component mounts
			apiFetch({ path: "/hfe/v1/target-rules-options" })
				.then((data) => {
					if (data && data.locationOptions) {
						setLocationOptions(data.locationOptions);
					}
				})
				.catch((error) => {
					console.error("Error fetching target rules data:", error);
					setError(
						__(
							"Failed to load display conditions",
							"header-footer-elementor",
						),
					);
				});
		}, []);

		const handleAddCondition = () => {
			const newCondition = {
				id: nextId,
				conditionType: {
					id: "include",
					name: __("Include", "header-footer-elementor"),
				},
				displayLocation: {
					id: "entire-site",
					name: __("Entire Site", "header-footer-elementor"),
				},
			};
			setConditions([...conditions, newCondition]);
			setNextId(nextId + 1);
		};

		const handleRemoveCondition = (id) => {
			setConditions(conditions.filter((condition) => condition.id !== id));
		};

		const handleUpdateCondition = (id, field, value) => {
			setConditions(
				conditions.map((condition) =>
					condition.id === id
						? { ...condition, [field]: value }
						: condition,
				),
			);
		};

		const openDisplayConditionsDialog = (item, isNew = false) => {
			// Check if locationOptions are loaded, if not, fetch them first
			if (Object.keys(locationOptions).length === 0) {
				setIsButtonLoading(true);
				apiFetch({ path: "/hfe/v1/target-rules-options" })
					.then((data) => {
						if (data && data.locationOptions) {
							setLocationOptions(data.locationOptions);
							// Retry opening dialog after locationOptions are loaded
							setIsButtonLoading(false);
							setTimeout(() => openDisplayConditionsDialog(item, isNew), 100);
						}
					})
					.catch((error) => {
						console.error("Error fetching locationOptions:", error);
						setIsButtonLoading(false);
					});
				return;
			}
			
			// Reset all states first
			setError(null);
			setSelectedItem(item);
			setIsNewPost(isNew);
			
			// If it's a new post, use default conditions immediately
			if (isNew) {
				const defaultConditions = getDefaultConditions();
				setConditions(defaultConditions);
				setNextId(2);
				setIsLoading(false);
				setIsDialogOpen(true);
				return;
			}
			
			// If no ID exists, treat as new post
			if (!item.id) {
				const defaultConditions = getDefaultConditions();
				setConditions(defaultConditions);
				setNextId(2);
				setIsLoading(false);
				setIsDialogOpen(true);
				return;
			}

			// For existing posts, fetch conditions first, then open dialog
			setIsButtonLoading(true);
			setIsLoading(true);
			
			apiFetch({
				path: `/hfe/v1/target-rules?post_id=${item.id}`,
			})
				.then((data) => {
					// Check if we have valid conditions data
					if (data && data.conditions && Array.isArray(data.conditions) && data.conditions.length > 0) {
						// Map existing conditions with proper IDs
						const enrichedConditions = data.conditions.map((condition, index) => ({
							id: index + 1,
							conditionType: {
								id: condition.conditionType?.id || condition.type || "include",
								name: condition.conditionType?.name || 
									  (condition.type === "exclude" ? __("Exclude", "header-footer-elementor") : __("Include", "header-footer-elementor"))
							},
							displayLocation: {
								id: condition.displayLocation?.id || condition.location || "entire-site",
								name: condition.displayLocation?.name || condition.locationName || __("Entire Site", "header-footer-elementor")
							}
						}));
						
						setConditions(enrichedConditions);
						setNextId(enrichedConditions.length + 1);
					} else {
						// No existing conditions found, use defaults
						const defaultConditions = getDefaultConditions();
						setConditions(defaultConditions);
						setNextId(2);
					}
					
					// Open dialog after data is loaded
					setIsLoading(false);
					setIsButtonLoading(false);
					setIsDialogOpen(true);
				})
				.catch((err) => {
					console.error("Error fetching conditions:", err);
					// On error, fall back to default conditions
					const defaultConditions = getDefaultConditions();
					setConditions(defaultConditions);
					setNextId(2);
					
					// Only show error if it's not a 404 (post not found)
					if (err.status !== 404) {
						setError(
							__(
								"Failed to load display conditions, using defaults",
								"header-footer-elementor",
							),
						);
					}
					
					// Open dialog even on error (with default conditions)
					setIsLoading(false);
					setIsButtonLoading(false);
					setIsDialogOpen(true);
				});
		};

		const handleSaveConditions = () => {
			if (!selectedItem || !selectedItem.id) {
				setError(__("No post selected", "header-footer-elementor"));
				return;
			}

			setIsLoading(true);
			setError(null);

			// Reformat to match PHP expected structure
			const includeRules = conditions
				.filter((c) => c.conditionType.id === "include")
				.map((c) => c.displayLocation.id);

			const excludeRules = conditions
				.filter((c) => c.conditionType.id === "exclude")
				.map((c) => c.displayLocation.id);

			const formattedData = {
				post_id: selectedItem.id,
				include_locations: {
					rule: includeRules,
					specific: [],
				},
				exclude_locations: {
					rule: excludeRules,
					specific: [],
				},
			};

			apiFetch({
				path: "/hfe/v1/target-rules",
				method: "POST",
				data: formattedData,
			})
				.then((response) => {
					if (response.success) {
						setIsDialogOpen(false);
						
						// If there's a redirect URL or edit URL, use it
						if (response.edit_url) {
							window.open(response.edit_url, "_blank");
						} else if (selectedItem.edit_url) {
							window.open(selectedItem.edit_url, "_blank");
						}
						
						// Call onSave callback if provided
						if (props.onConditionsSaved) {
							props.onConditionsSaved(selectedItem, conditions);
						}
					} else {
						setError(
							response.message || __(
								"Failed to save display conditions",
								"header-footer-elementor",
							),
						);
					}
					setIsLoading(false);
				})
				.catch((err) => {
					console.error("Error saving conditions:", err);
					setError(
						__(
							"Failed to save display conditions",
							"header-footer-elementor",
						),
					);
					setIsLoading(false);
				});
		};

		const DisplayConditionsDialog = () => {
			// Don't render if no selectedItem
			if (!selectedItem) {
				return null;
			}
			
			return (
				<Dialog
					design="simple"
					open={isDialogOpen}
					setOpen={setIsDialogOpen}
					key={`dialog-${selectedItem?.id}-${isNewPost}-${Date.now()}`}
					style={{ zIndex: 999999 }}
				>
					<Dialog.Backdrop style={{ zIndex: 999998 }} />
					<Dialog.Panel className="w-1/2 max-w-3xl gap-1" style={{ zIndex: 999999 }}>
						<Dialog.Header className="text-center p-4">
							<div className="flex items-center justify-between">
								<Dialog.Title className="text-xl font-normal">
									{__(
										"Configure Display Conditions",
										"header-footer-elementor",
									)}
									{isNewPost && (
										<span className="ml-2 text-sm text-gray-500">
											({__("New Layout", "header-footer-elementor")})
										</span>
									)}
								</Dialog.Title>
								<button
									onClick={() => setIsDialogOpen(false)}
									className="text-2xl leading-none font-light p-2 -mr-2"
									aria-label={__(
										"Close",
										"header-footer-elementor",
									)}
								>
									×
								</button>
							</div>
						</Dialog.Header>
						
						<Dialog.Body>
							{/* Content group with gray border */}
							<div
								className="mx-6 px-6 py-2 border border-gray-500 rounded-lg"
								style={{ border: "4px solid #F9FAFB" }}
							>
								{/* Icon */}
								<div className="flex justify-center mb-6">
									<img
										src={`${hfeSettingsData.layout_template}`}
										alt={__(
											"Layout Template",
											"header-footer-elementor",
										)}
										className="w-20 h-20 object-contain"
									/>
								</div>

								{/* Description */}
								<h2 className="text-base font-semibold text-gray-900 mb-2 text-center">
									{__(
										"Where Should Your Layout Appear?",
										"header-footer-elementor",
									)}
								</h2>
								<p className="text-gray-600 text-sm mb-8 text-center">
									{__(
										"Decide where you want this layout to appear on your site.",
										"header-footer-elementor",
									)}
									<br />
									{__(
										"You can show it across your entire site or only on specific pages—your choice!",
										"header-footer-elementor",
									)}
								</p>

								{/* Loading state */}
								{isLoading && (
									<div className="flex justify-center my-4">
										<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6005FF]"></div>
									</div>
								)}

								{/* Error message */}
								{error && (
									<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
										{error}
									</div>
								)}

								{/* Condition selection UI */}
								<div className="space-y-3">
									{conditions.map((condition, index) => (
										<div
											key={condition.id}
											className="flex items-center gap-2"
										>
											<div className="flex items-center justify-center overflow-hidden bg-gray-50 w-full">
												{/* Include/Exclude Select - Native HTML */}
												<div
													className="rounded-lg"
													style={{
														border: "1px solid #d1d5db",
														width: "120px",
													}}
												>
													<select
														onChange={(e) => {
															const selectedOption =
																e.target.options[
																	e.target
																		.selectedIndex
																];
															handleUpdateCondition(
																condition.id,
																"conditionType",
																{
																	id: selectedOption.value,
																	name: selectedOption.text,
																},
															);
														}}
														value={
															condition.conditionType
																.id
														}
														className="hfe-select-button border-0 rounded-none bg-transparent h-full w-full px-4 text-black focus:outline-none focus:ring-0 focus:border-transparent"
														style={{
															boxShadow: "none",
														}}
														disabled={isLoading}
													>
														<option value="include">
															{__(
																"Include",
																"header-footer-elementor",
															)}
														</option>
														<option value="exclude">
															{__(
																"Exclude",
																"header-footer-elementor",
															)}
														</option>
													</select>
												</div>

												{/* Display Location Select - Native HTML */}
												<div
													className="rounded-lg"
													style={{
														border: "1px solid #d1d5db",
														width: "420px",
													}}
												>
													<select
														onChange={(e) => {
															const selectedOption =
																e.target.options[
																	e.target
																		.selectedIndex
																];
															handleUpdateCondition(
																condition.id,
																"displayLocation",
																{
																	id: selectedOption.value,
																	name: selectedOption.text,
																},
															);
														}}
														value={
															condition
																.displayLocation.id
														}
														className="hfe-select-button border-0 rounded-none bg-transparent h-full w-full px-4 text-black focus:outline-none focus:ring-0 focus:border-transparent"
														style={{
															boxShadow: "none",
														}}
														disabled={isLoading}
													>
														{/* Map through the selection option groups */}
														{Object.keys(
															locationOptions,
														).map((groupKey) => (
															<optgroup
																key={groupKey}
																label={
																	locationOptions[
																		groupKey
																	].label
																}
															>
																{/* Map through the options in each group */}
																{Object.entries(
																	locationOptions[
																		groupKey
																	].value,
																).map(
																	([
																		optKey,
																		optLabel,
																	]) => (
																		<option
																			key={
																				optKey
																			}
																			value={
																				optKey
																			}
																		>
																			{
																				optLabel
																			}
																		</option>
																	),
																)}
															</optgroup>
														))}
													</select>
												</div>
											</div>
											{conditions.length > 1 && (
												<button
													onClick={() =>
														handleRemoveCondition(
															condition.id,
														)
													}
													className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
													aria-label={__(
														"Remove condition",
														"header-footer-elementor",
													)}
													disabled={isLoading}
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
										disabled={isLoading}
									>
										{__(
											"Add Conditions",
											"header-footer-elementor",
										)}
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
									disabled={isLoading}
								>
									{__("Cancel", "header-footer-elementor")}
								</Button>
								<Button
									onClick={handleSaveConditions}
									className="bg-[#6005FF] hover:bg-[#4B00CC] rounded-md px-6 py-2.5 font-medium text-white"
									size="md"
									disabled={isLoading}
								>
									{isLoading ? (
										<span className="flex items-center">
											<span className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
											{__(
												"Saving...",
												"header-footer-elementor",
											)}
										</span>
									) : (
										__(
											"Save Conditions",
											"header-footer-elementor",
										)
									)}
								</Button>
							</div>
						</Dialog.Footer>
					</Dialog.Panel>
				</Dialog>
			);
		};

		// Pass down the dialog functions and component to the wrapped component
		return (
			<WrappedComponent
				{...props}
				openDisplayConditionsDialog={openDisplayConditionsDialog}
				DisplayConditionsDialog={DisplayConditionsDialog}
				isDialogOpen={isDialogOpen}
				setIsDialogOpen={setIsDialogOpen}
				isButtonLoading={isButtonLoading}
			/>
		);
	};
};

export default withDisplayConditions;
