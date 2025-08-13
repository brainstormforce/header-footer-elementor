import React, {
	useState,
	useEffect,
	useCallback,
	useRef,
	useMemo,
} from "react";
import { Plus, X, Settings, Users } from "lucide-react";
import { Button, Dialog, Switch, Loader , Tooltip} from "@bsf/force-ui";
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
			userRoles: [""],
			canvasTemplateEnabled: false,
			nextId: 2,

			// Options
			locationOptions: {},
			userRoleOptions: {},
		});

		const [showTooltip, setShowTooltip] = useState(true); // Add state for showTooltip

		// Refs for stability
		const isMountedRef = useRef(true);
		const optionsLoadedRef = useRef(false);
		const dialogKeyRef = useRef(0);
		
		// Refs for scrolling to newly added elements
		const conditionsContainerRef = useRef(null);
		const userRolesContainerRef = useRef(null);
		const lastAddedConditionRef = useRef(null);
		const lastAddedUserRoleRef = useRef(null);

		useEffect(() => {
			isMountedRef.current = true;
			
			return () => {
				isMountedRef.current = false;
			};
		}, [updateState]);

		// Stable update function that batches all state changes
		const updateState = useCallback((updates) => {
			if (!isMountedRef.current) return;

			setState((prevState) => {
				const newState = {
					...prevState,
					...updates,
				};
				return newState;
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
					id: "",
					name: __("Select Conditions", "header-footer-elementor"),
				},
			},
		];

		// Load options once
		const loadOptions = useCallback(async () => {
			if (optionsLoadedRef.current || !isMountedRef.current) return;

			try {
				const [locationData, userRoleData] = await Promise.all([
					apiFetch({ 
						path: "/hfe/v1/target-rules-options",
						headers: {
							"X-WP-Nonce": hfeSettingsData.hfe_nonce_action,
						},
					}),
					apiFetch({ 
						path: "/hfe/v1/user-roles-options",
						headers: {
							"X-WP-Nonce": hfeSettingsData.hfe_nonce_action,
						},
					}),
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
					error: __(
						"Failed to load display conditions",
						"header-footer-elementor",
					),
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
					id: "",
					name: __("Select Conditions", "header-footer-elementor"),
				},
			};

			updateState({
				conditions: [...state.conditions, newCondition],
				nextId: state.nextId + 1,
			});

			// Scroll to the newly added condition after state update
			setTimeout(() => {
				if (lastAddedConditionRef.current) {
					lastAddedConditionRef.current.scrollIntoView({
						behavior: 'smooth',
						block: 'center',
						inline: 'nearest'
					});
				}
			}, 100);
		}, [state.conditions, state.nextId, updateState]);

		const handleRemoveCondition = useCallback(
			(id) => {
				updateState({
					conditions: state.conditions.filter(
						(condition) => condition.id !== id,
					),
				});
			},
			[state.conditions, updateState],
		);

		const handleUpdateCondition = useCallback(
			(id, field, value) => {
				updateState({
					conditions: state.conditions.map((condition) =>
						condition.id === id
							? { ...condition, [field]: value }
							: condition,
					),
				});

				// Scroll to the updated condition after state update
				setTimeout(() => {
					const conditionElement = document.querySelector(`[data-condition-id="${id}"]`);
					if (conditionElement) {
						conditionElement.scrollIntoView({
							behavior: 'smooth',
							block: 'center',
							inline: 'nearest'
						});
					}
				}, 100);
			},
			[state.conditions, updateState],
		);

		// User Role handlers
		const handleAddUserRole = useCallback(() => {
			updateState({
				userRoles: [...state.userRoles, ""],
			});

			// Scroll to the newly added user role after state update
			setTimeout(() => {
				if (lastAddedUserRoleRef.current) {
					lastAddedUserRoleRef.current.scrollIntoView({
						behavior: 'smooth',
						block: 'center',
						inline: 'nearest'
					});
				}
			}, 100);
		}, [state.userRoles, updateState]);

		const handleRemoveUserRole = useCallback(
			(index) => {
				updateState({
					userRoles: state.userRoles.filter((_, i) => i !== index),
				});
			},
			[state.userRoles, updateState],
		);

		const handleUpdateUserRole = useCallback(
			(index, value) => {
				const updatedRoles = [...state.userRoles];
				updatedRoles[index] = value;
				updateState({ userRoles: updatedRoles });

				// Scroll to the updated user role after state update
				setTimeout(() => {
					const userRoleElement = document.querySelector(`[data-user-role-index="${index}"]`);
					if (userRoleElement) {
						userRoleElement.scrollIntoView({
							behavior: 'smooth',
							block: 'center',
							inline: 'nearest'
						});
					}
				}, 100);
			},
			[state.userRoles, updateState],
		);

		// Canvas Template handler
		const handleCanvasTemplateChange = useCallback(
			(enabled) => {
				updateState({ canvasTemplateEnabled: enabled });
			},
			[updateState],
		);

		// Tab handler
		// const handleTabChange = useCallback(
		// 	(tabName) => {
		// 		localStorage.setItem("hfe-display-conditions-tab", tabName);
		// 		updateState({ activeTab: tabName });
		// 	},
		// 	[updateState],
		// );

		const openDisplayConditionsDialog = useCallback(
			async (item, isNew = false) => {
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
					userRoles: [""],
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
					const [targetRulesData, userRolesData, canvasTemplateData] =
						await Promise.all([
							apiFetch({
								path: `/hfe/v1/target-rules?post_id=${item.id}`,
								headers: {
									"X-WP-Nonce": hfeSettingsData.hfe_nonce_action,
								},
							}),
							apiFetch({
								path: `/hfe/v1/user-roles?post_id=${item.id}`,
								headers: {
									"X-WP-Nonce": hfeSettingsData.hfe_nonce_action,
								},
							}),
							apiFetch({
								path: `/hfe/v1/enable-for-canvas-template?post_id=${item.id}`,
								headers: {
									"X-WP-Nonce": hfeSettingsData.hfe_nonce_action,
								},
							}),
						]);

					if (!isMountedRef.current) return;

					// Process all data and update in one go
					const finalUpdates = {
						...initialUpdates,
						isLoading: false,
					};

					// Handle target rules data
					if (targetRulesData?.conditions?.length > 0) {
						const enrichedConditions =
							targetRulesData.conditions.map(
								(condition, index) => ({
									id: index + 1,
									conditionType: {
										id:
											condition.conditionType?.id ||
											condition.type ||
											"include",
										name:
											condition.conditionType?.name ||
											(condition.type === "exclude"
												? __(
														"Exclude",
														"header-footer-elementor",
												  )
												: __(
														"Include",
														"header-footer-elementor",
												  )),
									},
									displayLocation: {
										id:
											condition.displayLocation?.id ||
											condition.location ||
											"entire-site",
										name:
											condition.displayLocation?.name ||
											condition.locationName ||
											__(
												"Entire Site",
												"header-footer-elementor",
											),
									},
								}),
							);

						finalUpdates.conditions = enrichedConditions;
						finalUpdates.nextId = enrichedConditions.length + 1;
					}

					// Handle user roles data
					if (userRolesData?.userRoles?.length > 0) {
						finalUpdates.userRoles = userRolesData.userRoles;
					}

					// Handle canvas template data
					if (typeof canvasTemplateData?.display !== "undefined") {
						finalUpdates.canvasTemplateEnabled =
							canvasTemplateData.display === 1;
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
						errorUpdates.error = __(
							"Failed to load display conditions and user roles, using defaults",
							"header-footer-elementor",
						);
					}

					updateState(errorUpdates);
				}
			},
			[loadOptions, updateState],
		);

		const handleSaveConditions = useCallback(async () => {
			if (!state.selectedItem?.id) {
				updateState({
					error: __("No post selected", "header-footer-elementor"),
				});
				return;
			}

			updateState({ isLoading: true, error: null });

			try {
				// Prepare data - filter out conditions with empty display locations
				const validConditions = state.conditions.filter(
					(c) => c.displayLocation.id && c.displayLocation.id.trim() !== "",
				);

				const includeRules = validConditions
					.filter((c) => c.conditionType.id === "include")
					.map((c) => c.displayLocation.id);

				const excludeRules = validConditions
					.filter((c) => c.conditionType.id === "exclude")
					.map((c) => c.displayLocation.id);

				const targetRulesData = {
					post_id: state.selectedItem.id,
					include_locations: { rule: includeRules, specific: [] },
					exclude_locations: { rule: excludeRules, specific: [] },
				};

				const filteredUserRoles = state.userRoles.filter(
					(role) => role && role.trim() !== "",
				);
				const userRolesData = {
					post_id: state.selectedItem.id,
					user_roles: filteredUserRoles,
				};

				const canvasTemplateData = {
					post_id: state.selectedItem.id,
					display: state.canvasTemplateEnabled ? 1 : 0,
				};

				// Save all data in parallel
				const [
					targetRulesResponse,
					userRolesResponse,
					canvasTemplateResponse,
				] = await Promise.all([
					apiFetch({
						path: "/hfe/v1/target-rules",
						method: "POST",
						headers: {
							"X-WP-Nonce": hfeSettingsData.hfe_nonce_action,
						},
						data: targetRulesData,
					}),
					apiFetch({
						path: "/hfe/v1/user-roles",
						method: "POST",
						headers: {
							"X-WP-Nonce": hfeSettingsData.hfe_nonce_action,
						},
						data: userRolesData,
					}),
					apiFetch({
						path: "/hfe/v1/enable-for-canvas-template",
						method: "POST",
						headers: {
							"X-WP-Nonce": hfeSettingsData.hfe_nonce_action,
						},
						data: canvasTemplateData,
					}),
				]);

				if (!isMountedRef.current) return;

				if (
					targetRulesResponse.success &&
					userRolesResponse.success &&
					canvasTemplateResponse.success
				) {
					updateState({ isDialogOpen: false, isLoading: false });

					// Handle redirect or edit URL
					if (targetRulesResponse.edit_url) {
						window.open(targetRulesResponse.edit_url, "_blank");
					} else if (state.selectedItem.edit_url) {
						window.open(state.selectedItem.edit_url, "_blank");
					}

					// Call onSave callback if provided
					if (props.onConditionsSaved) {
						props.onConditionsSaved(
							state.selectedItem,
							state.conditions,
							filteredUserRoles,
							state.canvasTemplateEnabled,
						);
					}
				} else {
					const errorMessage =
						targetRulesResponse.message ||
						userRolesResponse.message ||
						canvasTemplateResponse.message ||
						__(
							"Failed to save display conditions, user roles, and canvas template setting",
							"header-footer-elementor",
						);
					updateState({ error: errorMessage, isLoading: false });
				}
			} catch (err) {
				if (!isMountedRef.current) return;

				console.error("Error saving data:", err);
				updateState({
					error: __(
						"Failed to save display conditions, user roles, and canvas template setting",
						"header-footer-elementor",
					),
					isLoading: false,
				});
			}
		}, [state, updateState, props]);

		// Stable dialog component that doesn't re-render unnecessarily
		const DisplayConditionsDialog = useMemo(() => {
			if (!state.selectedItem) return () => null;

			return () => (
				<div style={{ position: "fixed", inset: 0, zIndex: 9 }}>
					{/* Backdrop */}
					<div
						style={{
							position: "fixed",
							inset: 0,
							backgroundColor: "rgba(0, 0, 0, 0.5)",
							zIndex: 999998,
						}}
						onClick={() => updateState({ isDialogOpen: false })}
					/>

					{/* Dialog Panel */}
					<div
						style={{
							position: "fixed",
							top: "50%",
							padding: '0.8rem',
							left: "50%",
							transform: "translate(-50%, -50%)",
							width: "50%",
							maxWidth: "48rem",
							backgroundColor: "#F9FAFB",
							borderRadius: "0.5rem",
							boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
							zIndex: 999999,
							maxHeight: "90vh",
							overflow: "auto",
						}}
					>
						{/* Header */}
						<div
							className="text-center border-b border-gray-200"
							style={{
								paddingLeft: "1.5rem",
								paddingRight: "1.5rem",
								paddingTop: "0.5rem",
							}}
						>
							<div className="flex items-center justify-between">
								<h2 className="text-lg font-medium">
									{__(
										"Configure Display Conditions",
										"header-footer-elementor",
									)}
									{state.isNewPost && (
										<span className="ml-2 text-sm text-gray-500">
											(
											{__(
												"New Layout",
												"header-footer-elementor",
											)}
											)
										</span>
									)}
								</h2>
								<button
									onClick={() =>
										updateState({ isDialogOpen: false })
									}
									className="text-2xl leading-none font-light p-2 -mr-2 hover:bg-gray-100 rounded"
									aria-label={__(
										"Close",
										"header-footer-elementor",
									)}
									style={{
										background: "none",
										border: "none",
										cursor: "pointer",
									}}
								>
									×
								</button>
							</div>
						</div>

						{/* Body */}
						<div className="px-4">
							<div
								className="border border-gray-500 rounded-lg relative"
								style={{ border: "4px solid #F9FAFB"}}
							>

								{/* Loading state - Fixed positioning to prevent flicker */}
								{state.isLoading && (
									<div className="flex items-center justify-center min-h-screen w-full absolute inset-0 bg-white bg-opacity-90 z-10">
										<div className="" style={{ paddingBottom: '380px' }}>
											<Loader
												className=""
												icon={null}
												size="lg"
												variant="primary"
											/>
										</div>
									</div>
								)}

								{/* Error message */}
								{state.error && (
									<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
										{state.error}
									</div>
								)}

								{/* Content - Always show, overlay with loading when needed */}
								<>
									{/* Unified Form Layout */}
									<div className="space-y-8 border border-gray-500">
										
										
										{/* Display Conditions Section */}
										<div className="bg-white rounded-lg" style={{ border : "2px solid #EEEEEE"}}>
												{/* Description */}
									<div className="px-4">
										<h2 className="text-base font-medium text-gray-900 mb-2 text-start">
									{__(
										"Where Should Your Layout Appear?",
										"header-footer-elementor",
									)}
								</h2>
								<p className="text-text-tertiary text-sm m-0 text-start">
									{__(
										"Choose where you want it to be visible",
										"header-footer-elementor",
									)}
									{/* <br />
									{__(
										"You can show it across your entire site or only on specific pages—your choice!",
										"header-footer-elementor",
									)} */}
								</p>
									</div>
											{/* <div className="flex items-center justify-center">
												<Settings className="w-5 h-5 text-purple-600 mr-3" />
												<h3 className="text-lg font-semibold text-gray-900">
													{__("Display Conditions", "header-footer-elementor")}
												</h3>
											</div> */}
											{/* <p className="text-gray-600 flex items-center justify-center m-0 text-sm">
												{__("Configure where this layout should appear on your website.", "header-footer-elementor")}
											</p>
											 */}
											<div className="space-y-2 pl-4 pr-20 pb-4 m-0" style={{ paddingRight: '70px', paddingTop: '15px'}} ref={conditionsContainerRef}>
												{state.conditions.map((condition, index) => (
													<div
														key={condition.id}
														data-condition-id={condition.id}
														ref={index === state.conditions.length - 1 ? lastAddedConditionRef : null}
														className="flex items-center justify-center bg-gray-50 rounded-lg border border-gray-100"
													>
														{/* Include/Exclude Select */}
														<div className="flex-shrink-0">
															{/* <label className="block text-sm font-medium text-gray-700 mb-1">
																{__("Type", "header-footer-elementor")}
															</label> */}
															<div className="relative">
		<select
    onChange={(e) => {
        const selectedOption = e.target.options[e.target.selectedIndex];
        handleUpdateCondition(
            condition.id,
            "conditionType",
            {
                id: selectedOption.value,
                name: selectedOption.text,
            }
        );
    }}
    value={condition.conditionType.id}
    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 bg-white"
    style={{
        minWidth: '120px',
        height: '42px',
        borderColor: '#e0e0e0',
        borderRight: 'none',
        borderTopRightRadius: '0',    // Remove top-right border radius
        borderBottomRightRadius: '0', // Remove bottom-right border radius
        outline: 'none',
        boxShadow: 'none',
    }}
    onFocus={(e) => e.target.style.borderColor = '#e0e0e0'}
    onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
>
																	<option value="include">
																		{__("Include", "header-footer-elementor")}
																	</option>
																	<option value="exclude">
																		{__("Exclude", "header-footer-elementor")}
																	</option>
																</select>
															</div>
														</div>

														{/* Display Location Select */}
														<div className="flex-grow">
															{/* <label className="block text-sm font-medium text-gray-700 mb-1">
																{__("Location", "header-footer-elementor")}
															</label> */}
															<div className="relative">
																<select
    onChange={(e) => {
        const selectedOption = e.target.options[e.target.selectedIndex];
        handleUpdateCondition(
            condition.id,
            "displayLocation",
            {
                id: selectedOption.value,
                name: selectedOption.text,
            }
        );
    }}
    value={condition.displayLocation.id}
    style={{
        minWidth: '120px',
        height: '42px',
        borderColor: '#e0e0e0',
        borderTopLeftRadius: '0',     // Remove top-left border radius
        borderBottomLeftRadius: '0',  // Remove bottom-left border radius
        outline: 'none',
        boxShadow: 'none',
    }}
    onFocus={(e) => e.target.style.borderColor = '#e0e0e0'}
    onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 bg-white"
>
																	<option value="">
																		{__("Select Conditions", "header-footer-elementor")}
																	</option>
																	{Object.keys(state.locationOptions).map((groupKey) => (
																		<optgroup
																			key={groupKey}
																			label={state.locationOptions[groupKey].label}
																		>
																			{Object.entries(state.locationOptions[groupKey].value).map(
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
														</div>

														{/* Remove Button */}
														{state.conditions.length > 1 && (
															<div className="flex-shrink-0">
																<Button
																icon={<X size={18} />}
																variant="link"
																	onClick={() => handleRemoveCondition(condition.id)}
																	className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-md hfe-remove-ring transition-colors"
																	title={__("Remove condition", "header-footer-elementor")}
																>
																</Button>
															</div>
														)}
													</div>
												))}
											</div>

											{/* Add Condition Button */}
											<div className="flex justify-start items-center mt-6 mb-2">
												<Button
												icon={<Plus size={16} />}
													variant="link"
													style={{ color: '#3B82F6' }}
													onClick={handleAddCondition}
													className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium hfe-remove-ring rounded-md text-blue-300 "
												>
													{__("Add Condition", "header-footer-elementor")}
												</Button>
											</div>

													<hr
						className="border-b-0 border-x-0 border-t border-solid border-t-border-transparent-subtle"
						style={{
							marginTop: "10px",
							marginBottom: "15px",
							width: "90%",
							marginRight: "50px",
							// borderColor: "#E5E7EB",
						}}
					/>

													{/* User Roles Section */}
										<div className="bg-white rounded-lg border border-gray-200" >
											{/* <div className="flex items-center justify-center">
												<Users className="w-5 h-5 text-blue-600 mr-3" />
												<h3 className="text-lg font-semibold text-gray-900">
													{__("User Roles", "header-footer-elementor")}
												</h3>
											</div> */}
											<div className="px-4">
										<h2 className="text-base font-medium text-gray-900 mb-2 text-start">
									{__(
										"Where Should Your Layout Appear?",
										"header-footer-elementor",
									)}
								</h2>
								<p className="text-text-tertiary text-sm m-0 text-start">
									{__(
										"Choose which types of users can view this layout on your site",
										"header-footer-elementor",
									)}
									{/* <br />
									{__(
										"You can show it across your entire site or only on specific pages—your choice!",
										"header-footer-elementor",
									)} */}
								</p>
									</div>
											{/* <p className="text-gray-600 flex items-center justify-center text-sm m-0">
												{__("Restrict this layout to specific user roles. Leave empty to show for all users.", "header-footer-elementor")}
											</p> */}

											<div className="space-y-2 pl-4 pb-4 m-0" style={{ paddingTop: '15px'}} ref={userRolesContainerRef}>
												{state.userRoles.map((roleId, index) => (
													<div
														key={index}
														data-user-role-index={index}
														ref={index === state.userRoles.length - 1 ? lastAddedUserRoleRef : null}
														className="flex items-center gap-2 bg-gray-50 rounded-lg border border-gray-100"
													>
														{/* User Role Select */}
														<div className="">
															{/* <label className="block text-sm font-medium text-gray-700 mb-1">
																{__("User Role", "header-footer-elementor")} {index + 1}
															</label> */}
															<div className="relative">
																<select
																	value={roleId}
																	style={{
																		minWidth: '526px',
																		// marginLeft: '28px',
																		height: '42px',
																		borderColor: '#e0e0e0', // Default border color
																		outline: 'none',       // Removes the default outline
																		boxShadow: 'none',     // Removes the default box shadow
																	}}
																	 onFocus={(e) => e.target.style.borderColor = '#e0e0e0'} // Apply focus color
                                    onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}  // Revert to default color
																	onChange={(e) => handleUpdateUserRole(index, e.target.value)}
																	className="w-full block py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white"
																>
																	<option value="">
																		{__("Select User Role", "header-footer-elementor")}
																	</option>
																	{Object.keys(state.userRoleOptions).map((groupKey) => (
																		<optgroup
																			key={groupKey}
																			label={state.userRoleOptions[groupKey].label}
																		>
																			{Object.entries(state.userRoleOptions[groupKey].value).map(
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
														</div>

														{/* Remove Button */}
														{state.userRoles.length > 1 && (
															<div className="flex-shrink-0">
																<Button
																variant="link"
																icon={<X size={18} />}
																	onClick={() => handleRemoveUserRole(index)}
																	className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-md hfe-remove-ring transition-colors"
																	title={__("Remove user role", "header-footer-elementor")}
																>
																
																</Button>
															</div>
														)}
													</div>
												))}
											</div>

											{/* Add User Role Button */}
											<div className="flex justify-start">
												<Button
												icon={<Plus size={16}  />}
												style={{ color: '#3B82F6' }}
												variant="link"
													onClick={handleAddUserRole}
													className="inline-flex items-center px-4 py-2 mb-2 border border-transparent text-sm font-medium rounded-md hfe-remove-ring  text-blue-300"
												>
													{__("Add User Role", "header-footer-elementor")}
												</Button>
											</div>
										</div>
									</div>
										</div>

										{/* <h2 className="text-lg font-medium">
									{__(
										"Configure User Roles",
										"header-footer-elementor",
									)}
									</h2> */}

								
								</>

								{/* Canvas Template Section */}
									<div className="px-6" style={{ marginTop: '40px', paddingRight: '30px'}}>
										<div className="flex items-center justify-start">
											<div>
												<div className="flex items-center justify-center gap-2">
												<Switch
													checked={state.canvasTemplateEnabled}
													onChange={handleCanvasTemplateChange}
													disabled={state.isLoading}
													size="sm"
												/>
										
												
											<p className="text-text-tertiary m-0 text-sm">
    {__("Turn on to display this layout on ", "header-footer-elementor")}
    <Tooltip
        arrow
		 content={
                                    <div>
                                       <p>{__('A blank page layout with no header or footer, giving you full control over the design.', 'header-footer-elementor')}</p>
                                    </div>
                                }
        placement="bottom"
        triggers={['hover']}
        variant="dark"
        size="xs"
    >
        <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>
            {__("Elementor Canvas pages", "header-footer-elementor")}
        </span>
    </Tooltip>
</p>
													</div>
												{/* <p className="text-text-tertiary m-0 pt-4 text-sm" style={{ paddingTop: '10px'}}>
													{__("Enable this layout to display on Elementor Canvas template pages", "header-footer-elementor")}
												</p> */}
												{/* <h3 className="text-lg m-0 font-semibold text-gray-900">
													{__("Canvas Template Support", "header-footer-elementor")}
												</h3> */}
											</div>
										</div>
									</div>
							</div>
						</div>

							<hr
						className="border-b-0 border-x-0 border-t border-solid border-t-border-transparent-subtle"
						style={{
							marginTop: "10px",
							marginBottom: "15px",
							width: "88%",
							marginLeft: "32px",
							// borderColor: "#E5E7EB",
						}}
					/>

						{/* Footer */}
						<div className="border-t border-gray-200 px-8 py-6">
							<div className="flex justify-end p-4 gap-3" style={{ marginRight: '20px'}}>
								{/* <button
									onClick={() =>
										updateState({ isDialogOpen: false })
									}
									className="rounded-md px-6 py-2.5 font-medium border border-gray-300 text-gray-700 hover:bg-gray-50"
									disabled={state.isLoading}
									style={{
										background: "white",
										cursor: "pointer",
										padding: "10px 20px",
									}}
								>
									{__("Cancel", "header-footer-elementor")}
								</button> */}
								<button
									onClick={handleSaveConditions}
									className="bg-purple-600 hover:bg-purple-700 rounded-md px-6 py-2.5 font-medium text-white"
									disabled={state.isLoading}
									style={{
										border: "none",
										cursor: "pointer",
										backgroundColor: "#5C2EDE",
										padding: "10px 20px",
									}}
								>
									{state.isLoading ? (
										<span className="flex items-center">
											<span className="animate-spin mr-2 h-4 w-4 border-2  border-t-transparent rounded-full"></span>
											{__(
												"Saving...",
												"header-footer-elementor",
											)}
										</span>
									) : (
										__(
											"Next",
											"header-footer-elementor",
										)
									)}
								</button>
							</div>
						</div>
					</div>
				</div>
			);
		}, [
			state.selectedItem?.id,
			state.isLoading,
			state.error,
			state.conditions,
			state.userRoles,
			state.canvasTemplateEnabled,
			state.locationOptions,
			state.userRoleOptions,
			state.isNewPost,
		]);

		// Only render dialog when open
		const DialogComponent = state.isDialogOpen
			? DisplayConditionsDialog
			: () => null;

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
