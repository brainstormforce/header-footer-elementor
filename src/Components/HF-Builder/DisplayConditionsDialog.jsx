import React, { useState, useEffect } from "react";
import { Plus, X } from "lucide-react";
import { Button, Dialog, Switch } from "@bsf/force-ui";
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
		const [userRoles, setUserRoles] = useState([]);
		const [userRoleOptions, setUserRoleOptions] = useState({});
		const [canvasTemplateEnabled, setCanvasTemplateEnabled] = useState(false);
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

			// Fetch user role options
			apiFetch({ path: "/hfe/v1/user-roles-options" })
				.then((data) => {
					if (data && data.userroleOptions) {
						setUserRoleOptions(data.userroleOptions);
					}
				})
				.catch((error) => {
					console.error("Error fetching user role options:", error);
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

		// User Role handlers
		const handleAddUserRole = () => {
			setUserRoles([...userRoles, '']); // Add empty selection
		};

		const handleRemoveUserRole = (index) => {
			setUserRoles(userRoles.filter((_, i) => i !== index));
		};

		const handleUpdateUserRole = (index, value) => {
			const updatedRoles = [...userRoles];
			updatedRoles[index] = value;
			setUserRoles(updatedRoles);
		};

		// Canvas Template handler
		const handleCanvasTemplateChange = (enabled) => {
			setCanvasTemplateEnabled(enabled);
			
			// Save immediately when changed
			if (selectedItem && selectedItem.id) {
				apiFetch({
					path: "/hfe/v1/enable-for-canvas-template",
					method: "POST",
					data: {
						post_id: selectedItem.id,
						display: enabled ? 1 : 0,
					},
				})
				.then((response) => {
					if (!response.success) {
						console.error("Failed to save canvas template setting:", response.message);
						// Revert the state if save failed
						setCanvasTemplateEnabled(!enabled);
					}
				})
				.catch((error) => {
					console.error("Error saving canvas template setting:", error);
					// Revert the state if save failed
					setCanvasTemplateEnabled(!enabled);
				});
			}
		};

		const openDisplayConditionsDialog = (item, isNew = false) => {
			// Check if locationOptions and userRoleOptions are loaded, if not, fetch them first
			if (Object.keys(locationOptions).length === 0 || Object.keys(userRoleOptions).length === 0) {
				setIsButtonLoading(true);
				
				const fetchPromises = [];
				
				// Fetch location options if not loaded
				if (Object.keys(locationOptions).length === 0) {
					fetchPromises.push(
						apiFetch({ path: "/hfe/v1/target-rules-options" })
							.then((data) => {
								if (data && data.locationOptions) {
									setLocationOptions(data.locationOptions);
								}
							})
					);
				}
				
				// Fetch user role options if not loaded
				if (Object.keys(userRoleOptions).length === 0) {
					fetchPromises.push(
						apiFetch({ path: "/hfe/v1/user-roles-options" })
							.then((data) => {
								if (data && data.userroleOptions) {
									setUserRoleOptions(data.userroleOptions);
								}
							})
					);
				}
				
				Promise.all(fetchPromises)
					.then(() => {
						setIsButtonLoading(false);
						// Retry opening dialog after options are loaded
						setTimeout(() => openDisplayConditionsDialog(item, isNew), 100);
					})
					.catch((error) => {
						console.error("Error fetching options:", error);
						setIsButtonLoading(false);
					});
				return;
			}
			
			// Reset all states first
			setError(null);
			setSelectedItem(item);
			setIsNewPost(isNew);
			setUserRoles(['']); // Reset user roles with one empty selection
			setCanvasTemplateEnabled(false); // Reset canvas template setting
			
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
			
			// Fetch both target rules and user roles data
			const fetchTargetRules = apiFetch({
				path: `/hfe/v1/target-rules?post_id=${item.id}`,
			});
			
			const fetchUserRoles = apiFetch({
				path: `/hfe/v1/user-roles?post_id=${item.id}`,
			});
			
			const fetchCanvasTemplate = apiFetch({
				path: `/hfe/v1/enable-for-canvas-template?post_id=${item.id}`,
			});
			
			Promise.all([fetchTargetRules, fetchUserRoles, fetchCanvasTemplate])
				.then(([targetRulesData, userRolesData, canvasTemplateData]) => {
					// Handle target rules data
					if (targetRulesData && targetRulesData.conditions && Array.isArray(targetRulesData.conditions) && targetRulesData.conditions.length > 0) {
						// Map existing conditions with proper IDs
						const enrichedConditions = targetRulesData.conditions.map((condition, index) => ({
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
					
					// Handle user roles data
					if (userRolesData && userRolesData.userRoles && Array.isArray(userRolesData.userRoles) && userRolesData.userRoles.length > 0) {
						setUserRoles(userRolesData.userRoles);
					} else {
						// No existing user roles found, set one empty selection
						setUserRoles(['']);
					}
					
					// Handle canvas template data
					if (canvasTemplateData && typeof canvasTemplateData.display !== 'undefined') {
						setCanvasTemplateEnabled(canvasTemplateData.display === 1);
					} else {
						setCanvasTemplateEnabled(false);
					}
					
					// Open dialog after data is loaded
					setIsLoading(false);
					setIsButtonLoading(false);
					setIsDialogOpen(true);
				})
				.catch((err) => {
					console.error("Error fetching data:", err);
					// On error, fall back to default conditions and empty user roles
					const defaultConditions = getDefaultConditions();
					setConditions(defaultConditions);
					setNextId(2);
					setUserRoles(['']);
					setCanvasTemplateEnabled(false);
					
					// Only show error if it's not a 404 (post not found)
					if (err.status !== 404) {
						setError(
							__(
								"Failed to load display conditions and user roles, using defaults",
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

			// Reformat display conditions to match PHP expected structure
			const includeRules = conditions
				.filter((c) => c.conditionType.id === "include")
				.map((c) => c.displayLocation.id);

			const excludeRules = conditions
				.filter((c) => c.conditionType.id === "exclude")
				.map((c) => c.displayLocation.id);

			const targetRulesData = {
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

			// Format user roles data (filter out empty selections)
			const filteredUserRoles = userRoles.filter(role => role && role.trim() !== '');
			const userRolesData = {
				post_id: selectedItem.id,
				user_roles: filteredUserRoles,
			};

			// Save both target rules and user roles
			const saveTargetRules = apiFetch({
				path: "/hfe/v1/target-rules",
				method: "POST",
				data: targetRulesData,
			});

			const saveUserRoles = apiFetch({
				path: "/hfe/v1/user-roles",
				method: "POST",
				data: userRolesData,
			});

			Promise.all([saveTargetRules, saveUserRoles])
				.then(([targetRulesResponse, userRolesResponse]) => {
					if (targetRulesResponse.success && userRolesResponse.success) {
						setIsDialogOpen(false);
						
						// If there's a redirect URL or edit URL, use it
						if (targetRulesResponse.edit_url) {
							window.open(targetRulesResponse.edit_url, "_blank");
						} else if (selectedItem.edit_url) {
							window.open(selectedItem.edit_url, "_blank");
						}
						
						// Call onSave callback if provided
						if (props.onConditionsSaved) {
							props.onConditionsSaved(selectedItem, conditions, filteredUserRoles);
						}
					} else {
						const errorMessage = targetRulesResponse.message || userRolesResponse.message || __(
							"Failed to save display conditions and user roles",
							"header-footer-elementor",
						);
						setError(errorMessage);
					}
					setIsLoading(false);
				})
				.catch((err) => {
					console.error("Error saving data:", err);
					setError(
						__(
							"Failed to save display conditions and user roles",
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
					<Dialog.Panel className="w-1/2 max-w-3xl gap-0" style={{ zIndex: 999999 }}>
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

								{/* User Roles Section */}
								<div className="mt-8 pt-6 border-t border-gray-200">
									{/* User Roles Selection */}
									<div className="space-y-3">
										{userRoles.map((roleId, index) => (
											<div key={index} className="flex items-center gap-2">
												<div className="flex items-center justify-center overflow-hidden bg-gray-50 w-full">
													<div
														className="rounded-lg"
														style={{
															border: "1px solid #d1d5db",
															width: "420px",
														}}
													>
														<select
															value={roleId}
															onChange={(e) => handleUpdateUserRole(index, e.target.value)}
															className="hfe-select-button border-0 rounded-none bg-transparent h-full w-full px-4 text-black focus:outline-none focus:ring-0 focus:border-transparent"
															style={{ boxShadow: "none" }}
															disabled={isLoading}
														>
															<option value="">
																{__("Select User Role", "header-footer-elementor")}
															</option>
															{Object.keys(userRoleOptions).map((groupKey) => (
																<optgroup
																	key={groupKey}
																	label={userRoleOptions[groupKey].label}
																>
																	{Object.entries(userRoleOptions[groupKey].value).map(
																		([optKey, optLabel]) => (
																			<option key={optKey} value={optKey}>
																				{optLabel}
																			</option>
																		)
																	)}
																</optgroup>
															))}
														</select>
													</div>
													{userRoles.length > 1 && (
														<button
															onClick={() => handleRemoveUserRole(index)}
															className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
															aria-label={__("Remove user role", "header-footer-elementor")}
															disabled={isLoading}
														>
															<X size={20} />
														</button>
													)}
												</div>
											</div>
										))}
									</div>

									{/* Add User Role Button */}
									<div className="flex justify-center">
										<Button
											variant="secondary"
											size="md"
											className="bg-gray-600 text-white px-6 py-2.5 mt-4 mb-4 rounded-md font-medium hover:bg-gray-700"
											onClick={handleAddUserRole}
											disabled={isLoading}
										>
											{__("Add User Role", "header-footer-elementor")}
										</Button>
									</div>
								</div>

								{/* Canvas Template Section */}
								<div className="mt-8 pt-6 border-t border-gray-200">
									<div className="flex items-center justify-between">
										<div>
											<p className="text-gray-600 text-sm">
												{__("Enable this layout to display on Elementor Canvas template pages.", "header-footer-elementor")}
											</p>
										</div>
										<div className="ml-4">
											<Switch
												checked={canvasTemplateEnabled}
												onChange={handleCanvasTemplateChange}
												disabled={isLoading || !selectedItem?.id}
												size="md"
											/>
										</div>
									</div>
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
