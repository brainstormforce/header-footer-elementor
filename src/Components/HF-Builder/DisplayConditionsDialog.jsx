import React, { useState, useEffect, useCallback, useRef, startTransition } from "react";
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
		// Single state object to minimize re-renders
		const [state, setState] = useState({
			// Dialog state
			isDialogOpen: false,
			isLoading: false,
			isButtonLoading: false,
			error: null,
			selectedItem: null,
			isNewPost: false,
			
			// Form data
			conditions: [],
			userRoles: [''],
			canvasTemplateEnabled: false,
			nextId: 2,
			
			// Tab state
			activeTab: localStorage.getItem('hfe-display-conditions-tab') || 'conditions',
			
			// Options
			locationOptions: {},
			userRoleOptions: {},
		});

		// Refs for stability
		const isMountedRef = useRef(true);
		const optionsLoadedRef = useRef(false);
		const dialogKeyRef = useRef(0);

		useEffect(() => {
			isMountedRef.current = true;
			return () => {
				isMountedRef.current = false;
			};
		}, []);

		// Stable update function that batches all state changes
		const updateState = useCallback((updates) => {
			if (!isMountedRef.current) return;
			
			startTransition(() => {
				setState(prevState => ({
					...prevState,
					...updates
				}));
			});
		}, []);

		// Default conditions
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

		// Load options once
		const loadOptions = useCallback(async () => {
			if (optionsLoadedRef.current || !isMountedRef.current) return;

			try {
				const [locationData, userRoleData] = await Promise.all([
					apiFetch({ path: "/hfe/v1/target-rules-options" }),
					apiFetch({ path: "/hfe/v1/user-roles-options" })
				]);

				if (!isMountedRef.current) return;

				updateState({
					locationOptions: locationData?.locationOptions || {},
					userRoleOptions: userRoleData?.userroleOptions || {},
				});
				
				optionsLoadedRef.current = true;
			} catch (error) {
				if (!isMountedRef.current) return;
				console.error("Error fetching options:", error);
				updateState({
					error: __("Failed to load display conditions", "header-footer-elementor")
				});
			}
		}, [updateState]);

		useEffect(() => {
			loadOptions();
		}, [loadOptions]);

		// Condition handlers
		const handleAddCondition = useCallback(() => {
			const newCondition = {
				id: state.nextId,
				conditionType: {
					id: "include",
					name: __("Include", "header-footer-elementor"),
				},
				displayLocation: {
					id: "entire-site",
					name: __("Entire Site", "header-footer-elementor"),
				},
			};
			
			updateState({
				conditions: [...state.conditions, newCondition],
				nextId: state.nextId + 1,
			});
		}, [state.conditions, state.nextId, updateState]);

		const handleRemoveCondition = useCallback((id) => {
			updateState({
				conditions: state.conditions.filter((condition) => condition.id !== id)
			});
		}, [state.conditions, updateState]);

		const handleUpdateCondition = useCallback((id, field, value) => {
			updateState({
				conditions: state.conditions.map((condition) =>
					condition.id === id ? { ...condition, [field]: value } : condition
				)
			});
		}, [state.conditions, updateState]);

		// User Role handlers
		const handleAddUserRole = useCallback(() => {
			updateState({
				userRoles: [...state.userRoles, '']
			});
		}, [state.userRoles, updateState]);

		const handleRemoveUserRole = useCallback((index) => {
			updateState({
				userRoles: state.userRoles.filter((_, i) => i !== index)
			});
		}, [state.userRoles, updateState]);

		const handleUpdateUserRole = useCallback((index, value) => {
			const updatedRoles = [...state.userRoles];
			updatedRoles[index] = value;
			updateState({ userRoles: updatedRoles });
		}, [state.userRoles, updateState]);

		// Canvas Template handler
		const handleCanvasTemplateChange = useCallback((enabled) => {
			updateState({ canvasTemplateEnabled: enabled });
		}, [updateState]);

		// Tab handler
		const handleTabChange = useCallback((tabName) => {
			localStorage.setItem('hfe-display-conditions-tab', tabName);
			updateState({ activeTab: tabName });
		}, [updateState]);

		const openDisplayConditionsDialog = useCallback(async (item, isNew = false) => {
			// Increment dialog key for fresh render
			dialogKeyRef.current += 1;

			// Ensure options are loaded first
			if (!optionsLoadedRef.current) {
				updateState({ isButtonLoading: true });
				await loadOptions();
				if (!isMountedRef.current) return;
				updateState({ isButtonLoading: false });
			}

			// Prepare initial state
			const defaultConditions = getDefaultConditions();
			const initialUpdates = {
				isDialogOpen: true,
				isLoading: false,
				error: null,
				selectedItem: item,
				isNewPost: isNew,
				conditions: defaultConditions,
				userRoles: [''],
				canvasTemplateEnabled: false,
				nextId: 2,
			};

			// For new posts or posts without ID, use defaults immediately
			if (isNew || !item.id) {
				updateState(initialUpdates);
				return;
			}

			// For existing posts, show loading first
			updateState({
				...initialUpdates,
				isLoading: true,
			});

			try {
				// Fetch all data in parallel
				const [targetRulesData, userRolesData, canvasTemplateData] = await Promise.all([
					apiFetch({ path: `/hfe/v1/target-rules?post_id=${item.id}` }),
					apiFetch({ path: `/hfe/v1/user-roles?post_id=${item.id}` }),
					apiFetch({ path: `/hfe/v1/enable-for-canvas-template?post_id=${item.id}` })
				]);

				if (!isMountedRef.current) return;

				// Process all data and update in one go
				const finalUpdates = { ...initialUpdates, isLoading: false };

				// Handle target rules data
				if (targetRulesData?.conditions?.length > 0) {
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
					
					finalUpdates.conditions = enrichedConditions;
					finalUpdates.nextId = enrichedConditions.length + 1;
				}

				// Handle user roles data
				if (userRolesData?.userRoles?.length > 0) {
					finalUpdates.userRoles = userRolesData.userRoles;
				}

				// Handle canvas template data
				if (typeof canvasTemplateData?.display !== 'undefined') {
					finalUpdates.canvasTemplateEnabled = canvasTemplateData.display === 1;
				}

				// Single state update with all data
				updateState(finalUpdates);

			} catch (err) {
				if (!isMountedRef.current) return;
				
				console.error("Error fetching data:", err);
				
				const errorUpdates = {
					...initialUpdates,
					isLoading: false,
				};

				// Only show error if it's not a 404
				if (err.status !== 404) {
					errorUpdates.error = __("Failed to load display conditions and user roles, using defaults", "header-footer-elementor");
				}

				updateState(errorUpdates);
			}
		}, [loadOptions, updateState]);

		const handleSaveConditions = useCallback(async () => {
			if (!state.selectedItem?.id) {
				updateState({ error: __("No post selected", "header-footer-elementor") });
				return;
			}

			updateState({ isLoading: true, error: null });

			try {
				// Prepare data
				const includeRules = state.conditions
					.filter((c) => c.conditionType.id === "include")
					.map((c) => c.displayLocation.id);

				const excludeRules = state.conditions
					.filter((c) => c.conditionType.id === "exclude")
					.map((c) => c.displayLocation.id);

				const targetRulesData = {
					post_id: state.selectedItem.id,
					include_locations: { rule: includeRules, specific: [] },
					exclude_locations: { rule: excludeRules, specific: [] },
				};

				const filteredUserRoles = state.userRoles.filter(role => role && role.trim() !== '');
				const userRolesData = {
					post_id: state.selectedItem.id,
					user_roles: filteredUserRoles,
				};

				const canvasTemplateData = {
					post_id: state.selectedItem.id,
					display: state.canvasTemplateEnabled ? 1 : 0,
				};

				// Save all data in parallel
				const [targetRulesResponse, userRolesResponse, canvasTemplateResponse] = await Promise.all([
					apiFetch({ path: "/hfe/v1/target-rules", method: "POST", data: targetRulesData }),
					apiFetch({ path: "/hfe/v1/user-roles", method: "POST", data: userRolesData }),
					apiFetch({ path: "/hfe/v1/enable-for-canvas-template", method: "POST", data: canvasTemplateData })
				]);

				if (!isMountedRef.current) return;

				if (targetRulesResponse.success && userRolesResponse.success && canvasTemplateResponse.success) {
					updateState({ isDialogOpen: false, isLoading: false });
					
					// Handle redirect or edit URL
					if (targetRulesResponse.edit_url) {
						window.open(targetRulesResponse.edit_url, "_blank");
					} else if (state.selectedItem.edit_url) {
						window.open(state.selectedItem.edit_url, "_blank");
					}
					
					// Call onSave callback if provided
					if (props.onConditionsSaved) {
						props.onConditionsSaved(state.selectedItem, state.conditions, filteredUserRoles, state.canvasTemplateEnabled);
					}
				} else {
					const errorMessage = targetRulesResponse.message || userRolesResponse.message || canvasTemplateResponse.message || 
						__("Failed to save display conditions, user roles, and canvas template setting", "header-footer-elementor");
					updateState({ error: errorMessage, isLoading: false });
				}
			} catch (err) {
				if (!isMountedRef.current) return;
				
				console.error("Error saving data:", err);
				updateState({
					error: __("Failed to save display conditions, user roles, and canvas template setting", "header-footer-elementor"),
					isLoading: false
				});
			}
		}, [state, updateState, props]);

		// Stable dialog component that doesn't re-render unnecessarily
		const DisplayConditionsDialog = useCallback(() => {
			if (!state.selectedItem) return null;
			
			return (
				<div style={{ position: 'fixed', inset: 0, zIndex: 999999 }}>
					{/* Backdrop */}
					<div 
						style={{ 
							position: 'fixed', 
							inset: 0, 
							backgroundColor: 'rgba(0, 0, 0, 0.5)', 
							zIndex: 999998 
						}}
						onClick={() => updateState({ isDialogOpen: false })}
					/>
					
					{/* Dialog Panel */}
					<div style={{
						position: 'fixed',
						top: '50%',
						left: '50%',
						transform: 'translate(-50%, -50%)',
						width: '50%',
						maxWidth: '48rem',
						backgroundColor: 'white',
						borderRadius: '0.5rem',
						boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
						zIndex: 999999,
						maxHeight: '90vh',
						overflow: 'auto'
					}}>
						{/* Header */}
						<div className="text-center border-b border-gray-200" style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem', paddingTop: '1.5rem' }}>
							<div className="flex items-center justify-between">
								<h2 className="text-base font-normal">
									{__("Configure Display Conditions", "header-footer-elementor")}
									{state.isNewPost && (
										<span className="ml-2 text-sm text-gray-500">
											({__("New Layout", "header-footer-elementor")})
										</span>
									)}
								</h2>
								<button
									onClick={() => updateState({ isDialogOpen: false })}
									className="text-2xl leading-none font-light p-2 -mr-2 hover:bg-gray-100 rounded"
									aria-label={__("Close", "header-footer-elementor")}
									style={{ background: 'none', border: 'none', cursor: 'pointer' }}
								>
									×
								</button>
							</div>
						</div>
						
						{/* Body */}
						<div className="p-4">
							<div className="mx-6 px-6 py-2 border border-gray-500 rounded-lg" style={{ border: "4px solid #F9FAFB" }}>
								{/* Description */}
								<h2 className="text-base font-semibold text-gray-900 mb-2 text-center">
									{__("Where Should Your Layout Appear?", "header-footer-elementor")}
								</h2>
								<p className="text-gray-600 text-sm mb-8 text-center">
									{__("Decide where you want this layout to appear on your site.", "header-footer-elementor")}
									<br />
									{__("You can show it across your entire site or only on specific pages—your choice!", "header-footer-elementor")}
								</p>

								{/* Loading state */}
								{state.isLoading && (
									<div className="flex justify-center my-4">
										<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
									</div>
								)}

								{/* Error message */}
								{state.error && (
									<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
										{state.error}
									</div>
								)}

								{/* Content - Only show when not loading */}
								{!state.isLoading && (
									<>
										{/* Tab Navigation */}
										<div className="flex justify-center gap-4 mb-8">
											<button
												onClick={() => handleTabChange('conditions')}
												className={`px-6 py-2.5 rounded-md font-medium transition-colors ${
													state.activeTab === 'conditions'
														? 'text-white hover:bg-gray-800'
														: 'text-gray-700 bg-gray-100 hover:bg-gray-200'
												}`}
												style={{ 
													border: 'none', 
													cursor: 'pointer', 
													backgroundColor: state.activeTab === 'conditions' ? '#5C2EDE' : '#f3f4f6'
												}}
											>
												{__("Conditions", "header-footer-elementor")}
											</button>
											<button
												onClick={() => handleTabChange('userRoles')}
												className={`px-6 py-2.5 rounded-md font-medium transition-colors ${
													state.activeTab === 'userRoles'
														? 'text-white hover:bg-gray-800'
														: 'text-gray-700 bg-gray-100 hover:bg-gray-200'
												}`}
												style={{ 
													border: 'none', 
													cursor: 'pointer', 
													backgroundColor: state.activeTab === 'userRoles' ? '#5C2EDE' : '#f3f4f6'
												}}
											>
												{__("User Role", "header-footer-elementor")}
											</button>
										</div>

										{/* Tab Content */}
										{state.activeTab === 'conditions' && (
											<>
												{/* Conditions */}
												<div className="space-y-3 mb-4">
													{state.conditions.map((condition) => (
														<div key={condition.id} className="flex items-center gap-1" style={{ marginTop: '12px' }}>
															<div className="flex items-center justify-center overflow-hidden bg-gray-50" style={{ width: "92%" }}>
																{/* Include/Exclude Select */}
																<div className="rounded-sm" style={{ border: "1px solid #d1d5db", width: "120px" }}>
																	<select
																		onChange={(e) => {
																			const selectedOption = e.target.options[e.target.selectedIndex];
																			handleUpdateCondition(condition.id, "conditionType", {
																				id: selectedOption.value,
																				name: selectedOption.text,
																			});
																		}}
																		value={condition.conditionType.id}
																		className="border-0 rounded-none bg-transparent h-full w-full px-4 text-black focus:outline-none"
																		style={{ boxShadow: "none", height: '40px' }}
																	>
																		<option value="include">{__("Include", "header-footer-elementor")}</option>
																		<option value="exclude">{__("Exclude", "header-footer-elementor")}</option>
																	</select>
																</div>

																{/* Display Location Select */}
																<div className="rounded-sm" style={{ border: "1px solid #d1d5db", width: "420px" }}>
																	<select
																		onChange={(e) => {
																			const selectedOption = e.target.options[e.target.selectedIndex];
																			handleUpdateCondition(condition.id, "displayLocation", {
																				id: selectedOption.value,
																				name: selectedOption.text,
																			});
																		}}
																		value={condition.displayLocation.id}
																		className="border-0 rounded-none bg-transparent h-full w-full px-4 text-black focus:outline-none"
																		style={{ boxShadow: "none", height: '40px' }}
																	>
																		{Object.keys(state.locationOptions).map((groupKey) => (
																			<optgroup key={groupKey} label={state.locationOptions[groupKey].label}>
																				{Object.entries(state.locationOptions[groupKey].value).map(([optKey, optLabel]) => (
																					<option key={optKey} value={optKey}>{optLabel}</option>
																				))}
																			</optgroup>
																		))}
																	</select>
																</div>
															</div>
															{state.conditions.length > 1 && (
																<button
																	onClick={() => handleRemoveCondition(condition.id)}
																	className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
																	style={{ background: 'none', border: 'none', cursor: 'pointer' }}
																>
																	<X size={18} />
																</button>
															)}
														</div>
													))}
												</div>

												{/* Add Condition Button */}
												<div className="flex justify-center mb-8">
													<button
														onClick={handleAddCondition}
														className="text-white px-6 py-2.5 rounded-md font-medium hover:bg-gray-800"
														style={{ border: 'none', cursor: 'pointer', backgroundColor: '#000' }}
													>
														{__("Add Conditions", "header-footer-elementor")}
													</button>
												</div>
											</>
										)}

										{state.activeTab === 'userRoles' && (
											<>
												{/* User Roles Section */}
												<div className="mb-4">
													<div className="space-y-3 mb-4">
														{state.userRoles.map((roleId, index) => (
															<div key={index} className="flex items-center gap-1" style={{ marginTop: '8px' }}>
																<div className="flex items-center justify-center overflow-hidden bg-gray-50" style={{ width: "92%" }}>
																	<div className="rounded-sm" style={{ border: "1px solid #d1d5db", width: "540px" }}>
																		<select
																			value={roleId}
																			onChange={(e) => handleUpdateUserRole(index, e.target.value)}
																			className="border-0 rounded-none bg-transparent h-full w-full px-4 text-black focus:outline-none"
																			style={{ boxShadow: "none", height: '40px' }}
																		>
																			<option value="">{__("Select User Role", "header-footer-elementor")}</option>
																			{Object.keys(state.userRoleOptions).map((groupKey) => (
																				<optgroup key={groupKey} label={state.userRoleOptions[groupKey].label}>
																					{Object.entries(state.userRoleOptions[groupKey].value).map(([optKey, optLabel]) => (
																						<option key={optKey} value={optKey}>{optLabel}</option>
																					))}
																				</optgroup>
																			))}
																		</select>
																	</div>
																</div>
																{state.userRoles.length > 1 && (
																	<button
																		onClick={() => handleRemoveUserRole(index)}
																		className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
																		style={{ background: 'none', border: 'none', cursor: 'pointer' }}
																	>
																		<X size={18} />
																	</button>
																)}
															</div>
														))}
													</div>
												</div>

												{/* Add User Role Button */}
												<div className="flex justify-center mb-8">
													<button
														onClick={handleAddUserRole}
														className="text-white px-6 py-2.5 rounded-md font-medium hover:bg-gray-800"
														style={{ border: 'none', cursor: 'pointer', backgroundColor: '#000' }}
													>
														{__("Add User Role", "header-footer-elementor")}
													</button>
												</div>
											</>
										)}

										{/* Canvas Template Section */}
										<div className="mt-8 pt-6 border-t border-gray-200">
											<div className="flex items-center justify-around">
												<div>
													<p className="text-gray-600 text-sm">
														{__("Enable this layout to display on Elementor Canvas template pages.", "header-footer-elementor")}
													</p>
												</div>
												<div className="ml-4">
													<Switch
														checked={state.canvasTemplateEnabled}
														onChange={handleCanvasTemplateChange}
														disabled={state.isLoading}
														size="sm"
													/>
												</div>
											</div>
										</div>
									</>
								)}
							</div>
						</div>

						{/* Footer */}
						<div className="border-t border-gray-200 px-8 py-6">
							<div className="flex justify-end p-4 gap-3">
								<button
									onClick={() => updateState({ isDialogOpen: false })}
									className="rounded-md px-6 py-2.5 font-medium border border-gray-300 text-gray-700 hover:bg-gray-50"
									disabled={state.isLoading}
									style={{ background: 'white', cursor: 'pointer' }}
								>
									{__("Cancel", "header-footer-elementor")}
								</button>
								<button
									onClick={handleSaveConditions}
									className="bg-purple-600 hover:bg-purple-700 rounded-md px-6 py-2.5 font-medium text-white"
									disabled={state.isLoading}
									style={{ border: 'none', cursor: 'pointer', backgroundColor: '#5C2EDE' }}
								>
									{state.isLoading ? (
										<span className="flex items-center">
											<span className="animate-spin mr-2 h-4 w-4 border-2  border-t-transparent rounded-full"></span>
											{__("Saving...", "header-footer-elementor")}
										</span>
									) : (
										__("Save Conditions", "header-footer-elementor")
									)}
								</button>
							</div>
						</div>
					</div>
				</div>
			);
		}, [state, handleAddCondition, handleRemoveCondition, handleUpdateCondition, handleAddUserRole, handleRemoveUserRole, handleUpdateUserRole, handleCanvasTemplateChange, handleSaveConditions, handleTabChange, updateState]);

		// Only render dialog when open
		const DialogComponent = state.isDialogOpen ? DisplayConditionsDialog : () => null;

		return (
			<WrappedComponent
				{...props}
				openDisplayConditionsDialog={openDisplayConditionsDialog}
				DisplayConditionsDialog={DialogComponent}
				isDialogOpen={state.isDialogOpen}
				setIsDialogOpen={(open) => updateState({ isDialogOpen: open })}
				isButtonLoading={state.isButtonLoading}
			/>
		);
	};
};

export default withDisplayConditions;
