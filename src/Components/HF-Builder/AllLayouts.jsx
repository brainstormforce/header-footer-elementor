import React, { useState, useEffect } from "react";
import { Plus, X } from "lucide-react";
import { Button, Dialog, Select } from "@bsf/force-ui";
import { __ } from "@wordpress/i18n";
import apiFetch from "@wordpress/api-fetch";

// Example: Ensure these values are coming from global/localized JS in WordPress

const layoutItems = [
	{
        id: '80',
		name: "Header",
		image: hfeSettingsData.header_card,
		buttonText: __("Edit Header", "header-footer-elementor"),
		onClick: () =>
			window.open("https://your-site.com/edit-header", "_blank"),
	},
	{
        id: '',
		name: "Footer",
		image: hfeSettingsData.footer_card,
		buttonText: __("Edit Footer", "header-footer-elementor"),
		onClick: () =>
			window.open("https://your-site.com/edit-footer", "_blank"),
	},
	{
        id: '',
		name: "Before Footer",
		image: hfeSettingsData.custom_card,
		buttonText: __("Edit Before Footer", "header-footer-elementor"),
		onClick: () =>
			window.open("https://your-site.com/edit-before-footer", "_blank"),
	},
	{
        id: '',
		name: "Custom Block",
		image: hfeSettingsData.custom_card,
		buttonText: __("Edit Custom Block", "header-footer-elementor"),
		onClick: () =>
			window.open("https://your-site.com/edit-custom-block", "_blank"),
	},
];

const AllLayouts = () => {
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);
	const [conditions, setConditions] = useState([
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
	]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);
    const [postId, setPostId] = useState(null);
	const [locationOptions, setLocationOptions] = useState([]);

    useEffect(() => {
        // Fetch the target rule options when component mounts
        apiFetch({ path: '/hfe/v1/target-rules-options' })
            .then(data => {
                if (data && data.locationOptions) {
                    setLocationOptions(data.locationOptions);
                }
            })
            .catch(error => {
                console.error('Error fetching target rules data:', error);
                setError(__('Failed to load display conditions', 'header-footer-elementor'));
            });
    }, []);

	const handleAddCondition = () => {
		const newCondition = {
			id: conditions.length + 1,
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
	};

	const handleRemoveCondition = (id) => {
		setConditions(conditions.filter((condition) => condition.id !== id));
	};

	const handleUpdateCondition = (id, field, value) => {
        console.log(id);
        console.log("shubham");
		setConditions(
			conditions.map((condition) =>
				condition.id === id
					? { ...condition, [field]: value }
					: condition,
			),
		);
	};

	// const handleCreateLayout = (item) => {
    //     if( ! item.id ) {
    //         apiFetch({
    //             path: "/hfe/v1/create-layout",
    //             method: "POST",
    //             data: {
    //                 title: "My Custom Layout", // Optional
    //             },
    //         })
    //         .then(response => {
    //             if (response.success && response.post_id) {
    //                 console.log("Post created with ID:", response.post_id);
    //                 setPostId(response.post_id);
    //             } else {
    //                 console.error("Failed:", response);
    //             }
    //         })
    //         .catch(error => {
    //             console.error("Error:", error);
    //         });
           
    //     }

    //     item.id = postId;
       
	// 	// Set the selected item and open the dialog
	// 	setSelectedItem(item);
	// 	setIsDialogOpen(true);

	// 	// Reset conditions to default when creating a new layout
	// 	// setConditions([
	// 	// 	{
	// 	// 		id: 1,
	// 	// 		conditionType: {
	// 	// 			id: "include",
	// 	// 			name: __("Include", "header-footer-elementor"),
	// 	// 		},
	// 	// 		displayLocation: {
	// 	// 			id: "entire-site",
	// 	// 			name: __("Entire Site", "header-footer-elementor"),
	// 	// 		},
	// 	// 	},
	// 	// ]);

	// 	// apiFetch({ path: "/hfe/v1/target-rules-options" })
	// 	// 	.then((data) => {
	// 	// 		if (data.locationOptions) {
	// 	// 			const optionsArray = Object.entries(
	// 	// 				data.locationOptions,
	// 	// 			).map(([key, label]) => ({
	// 	// 				id: key,
	// 	// 				name: label,
	// 	// 			}));
	// 	// 			setLocationOptions(optionsArray);
	// 	// 		}
	// 	// 	})
	// 	// 	.catch((err) => {
	// 	// 		console.error("Failed to fetch rule options", err);
	// 	// 		setError(
	// 	// 			__(
	// 	// 				"Failed to load rule options",
	// 	// 				"header-footer-elementor",
	// 	// 			),
	// 	// 		);
	// 	// 	});

	// 	// If we're editing an existing layout, fetch its conditions
	// 	if (item.id) {
	// 		setIsLoading(true);
	// 		setError(null);

	// 		// This would be your actual API endpoint to fetch conditions
	// 		apiFetch({
	// 			path: `/wp-json/hfe/v1/target-rules?post_id=${item.id}`,
	// 		})
	// 			.then((data) => {
	// 				if (data && data.conditions) {
	// 					setConditions(data.conditions);
	// 				}
	// 				setIsLoading(false);
	// 			})
	// 			.catch((err) => {
	// 				console.error("Error fetching conditions:", err);
	// 				setError(
	// 					__(
	// 						"Failed to load display conditions",
	// 						"header-footer-elementor",
	// 					),
	// 				);
	// 				setIsLoading(false);
	// 			});
	// 	}
	// };

    const handleCreateLayout = (item) => {
        if (!item.id) {
            apiFetch({
                path: "/hfe/v1/create-layout",
                method: "POST",
                data: {
                    title: "My Custom Layout",
                },
            })
                .then((response) => {
                    if (response.success && response.post_id) {
                        console.log("Post created with ID:", response.post_id);
    
                        // Update item with new post ID
                        const updatedItem = { ...item, id: response.post_id };
    
                        // Set selected item and open dialog
                        setSelectedItem(updatedItem);
                        setIsDialogOpen(true);
    
                        // Set default conditions
                        setConditions([
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
                        ]);
    
                        // Fetch location options
                        // apiFetch({ path: "/hfe/v1/target-rules-options" })
                        //     .then((data) => {
                        //         if (data.locationOptions) {
                        //             const optionsArray = Object.entries(data.locationOptions).map(
                        //                 ([key, label]) => ({
                        //                     id: key,
                        //                     name: label,
                        //                 })
                        //             );
                        //             setLocationOptions(optionsArray);
                        //         }
                        //     })
                        //     .catch((err) => {
                        //         console.error("Failed to fetch rule options", err);
                        //         setError(
                        //             __("Failed to load rule options", "header-footer-elementor")
                        //         );
                        //     });
                    } else {
                        console.error("Failed to create post:", response);
                    }
                })
                .catch((error) => {
                    console.error("Error creating post:", error);
                });
        } else {
            // Post already exists, use item.id directly
            setSelectedItem(item);
            setIsDialogOpen(true);
    
            setIsLoading(true);
            setError(null);
    
            // apiFetch({
            //     path: `/wp-json/hfe/v1/target-rules?post_id=${item.id}`,
            // })
            //     .then((data) => {
            //         if (data && data.conditions) {
            //             setConditions(data.conditions);
            //         }
            //         setIsLoading(false);
            //     })
            //     .catch((err) => {
            //         console.error("Error fetching conditions:", err);
            //         setError(
            //             __("Failed to load display conditions", "header-footer-elementor")
            //         );
            //         setIsLoading(false);
            //     });


            apiFetch({
                path: `/hfe/v1/target-rules?post_id=${item.id}`,
            })
                .then((data) => {
                    const { conditions = [], locations = {}, userRoles = {} } = data || {};
                    setConditions(conditions);
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.error("Error fetching conditions:", err);
                    setError(
                        __("Failed to load display conditions", "header-footer-elementor")
                    );
                    setIsLoading(false);
                });
            
        }
    };
    
	// 	if (!selectedItem) return;
    //     console.log(selectedItem);
	// 	setIsLoading(true);
	// 	setError(null);

	// 	// Format data for the API
	// 	const formattedData = {
	// 		post_id: selectedItem.id,
	// 		include_locations: conditions
	// 			.filter((c) => c.conditionType.id === "include")
	// 			.map((c) => ({
	// 				type: c.displayLocation.id,
	// 				specific: null,
	// 			})),
	// 		exclude_locations: conditions
	// 			.filter((c) => c.conditionType.id === "exclude")
	// 			.map((c) => ({
	// 				type: c.displayLocation.id,
	// 				specific: null,
	// 			})),
	// 	};

	// 	// This would be your actual API endpoint to save conditions
	// 	apiFetch({
	// 		path: "/hfe/v1/target-rules",
	// 		method: "POST",
	// 		data: formattedData,
	// 	})
	// 		.then((response) => {
	// 			if (response.success) {
	// 				setIsDialogOpen(false);
	// 				// Redirect to edit page or perform other actions
	// 				if (selectedItem && selectedItem.onClick) {
	// 					selectedItem.onClick();
	// 				}
	// 			} else {
	// 				setError(
	// 					__(
	// 						"Failed to save display conditions",
	// 						"header-footer-elementor",
	// 					),
	// 				);
	// 			}
	// 			setIsLoading(false);
	// 		})
	// 		.catch((err) => {
	// 			console.error("Error saving conditions:", err);
	// 			setError(
	// 				__(
	// 					"Failed to save display conditions",
	// 					"header-footer-elementor",
	// 				),
	// 			);
	// 			setIsLoading(false);
	// 		});
	// };

    const handleSaveConditions = () => {
        if (!selectedItem) return;
    
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
                    if (selectedItem && selectedItem.onClick) {
                        selectedItem.onClick();
                    }
                } else {
                    setError(
                        __("Failed to save display conditions", "header-footer-elementor")
                    );
                }
                setIsLoading(false);
            })
            .catch((err) => {
                console.error("Error saving conditions:", err);
                setError(
                    __("Failed to save display conditions", "header-footer-elementor")
                );
                setIsLoading(false);
            });
    };
    

	return (
		<>
			<div className="bg-muted min-h-screen" style={{ padding: "40px" }}>
				<div
					className="flex items-start gap-10 justify-between mb-6"
					style={{ padding: "0 40px" }}
				>
					<h2 className="text-base font-normal text-foreground">
						{__(
							"Start customising Your Header & Footer",
							"header-footer-elementor",
						)}
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

				<div
					className="grid grid-cols-1 md:grid-cols-2 gap-6"
					style={{ paddingLeft: "40px" }}
				>
					{layoutItems.map((item) => (
						<div
							key={item.name}
							className="border bg-background-primary border-gray-200 px-3 py-3 rounded-md overflow-hidden flex flex-col group relative"
						>
							<div className="relative h-48 w-full">
								<img
									src={item.image}
									alt={`${item.name} Layout`}
									className="w-full h-full object-cover"
								/>

								<div className="absolute inset-0 flex items-center justify-center rounded-lg overflow-hidden backdrop-blur-sm bg-black/40 transition-all duration-200 z-30">
									<Button
										iconPosition="left"
										icon={
											item.name !== "Custom Block" ? (
												<Plus />
											) : null
										}
										variant="primary"
										className="bg-[#6005FF] font-light px-3 py-3 text-sm text-white hfe-remove-ring z-50"
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
							<div className="">
								<hr
									className="w-full border-b-0 border-x-0 border-t border-solid border-t-border-subtle"
									style={{
										marginTop: "14px",
										marginBottom: "14px",
										borderColor: "#E5E7EB",
									}}
								/>
								<p className="text-sm font-medium text-gray-900">
									{item.name}
								</p>
							</div>
						</div>
					))}
				</div>
			</div>

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
								{__(
									"Configure Display Conditions",
									"header-footer-elementor",
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
                            {/* Condition selection UI */}
                          
<div className="space-y-3">
    {conditions.map((condition, index) => (
        <div key={condition.id} className="flex items-center gap-2">
            <div className="flex items-center justify-center overflow-hidden bg-gray-50 w-full">
                {/* Include/Exclude Select - Native HTML */}
                <div className="rounded-lg" style={{border: '1px solid #d1d5db', width: '120px'}}>
                    <select
                        onChange={(e) => {
                            const selectedOption = e.target.options[e.target.selectedIndex];
                            handleUpdateCondition(condition.id, 'conditionType', {
                                id: selectedOption.value,
                                name: selectedOption.text
                            });
                        }}
                        value={condition.conditionType.id}
                        className="hfe-select-button border-0 rounded-none bg-transparent h-full w-full px-4 text-black focus:outline-none focus:ring-0 focus:border-transparent"
                        style={{ boxShadow: 'none' }}
                        disabled={isLoading}
                    >
                        <option value="include">{__("Include", "header-footer-elementor")}</option>
                        <option value="exclude">{__("Exclude", "header-footer-elementor")}</option>
                    </select>
                </div>

                {/* Display Location Select - Native HTML */}
                <div className="rounded-lg" style={{border: '1px solid #d1d5db', width: '420px'}}>
                    <select
                        onChange={(e) => {
                            const selectedOption = e.target.options[e.target.selectedIndex];
                            handleUpdateCondition(condition.id, 'displayLocation', {
                                id: selectedOption.value,
                                name: selectedOption.text
                            });
                        }}
                        value={condition.displayLocation.id}
                        className="hfe-select-button border-0 rounded-none bg-transparent h-full w-full px-4 text-black focus:outline-none focus:ring-0 focus:border-transparent"
                        style={{ boxShadow: 'none' }}
                        disabled={isLoading}
                    >
                        {/* Map through the selection option groups */}
                        {Object.keys(locationOptions).map(groupKey => (
                            <optgroup key={groupKey} label={locationOptions[groupKey].label}>
                                {/* Map through the options in each group */}
                                {Object.entries(locationOptions[groupKey].value).map(([optKey, optLabel]) => (
                                    <option key={optKey} value={optKey}>
                                        {optLabel}
                                    </option>
                                ))}
                            </optgroup>
                        ))}
                    </select>
                </div>
            </div>
            {conditions.length > 1 && (
                <button
                    onClick={() => handleRemoveCondition(condition.id)}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label={__("Remove condition", "header-footer-elementor")}
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
		</>
	);
};

export default AllLayouts;
