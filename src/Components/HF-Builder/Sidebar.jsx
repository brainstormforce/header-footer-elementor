import React, { useState, useEffect } from "react";
import { Container } from "@bsf/force-ui";
import SidebarMenu from "./SidebarMenu";
import Content from "./Content";
import NavMenu from "./Navbar";
import AllLayouts from "./AllLayouts";
import Header from "./Header";
import Footer from "./Footer";
import BeforeFooter from "./BeforeFooter";
import CustomBlock from "./CustomBlock";
import { __ } from "@wordpress/i18n";

const Sidebar = () => {
	const items = [
		{
			id: 1,
			icon: (
				<img
					src={`${hfeSettingsData.all_layouts}`}
					alt={__("Custom SVG", "header-footer-elementor")}
					className="object-contain"
				/>
			),
			selected: (
				<img
					src={`${hfeSettingsData.all_layouts}`}
					alt={__("Custom SVG", "header-footer-elementor")}
					className="object-contain"
				/>
			),
			title: __("All Layouts", "header-footer-elementor"),
			content: <AllLayouts />,
		},
		{
			id: 2,
			icon: (
				<img
					src={`${hfeSettingsData.all_layouts}`}
					alt={__("Custom SVG", "header-footer-elementor")}
					className="object-contain"
				/>
			),
			selected: (
				<img
					src={`${hfeSettingsData.all_layouts}`}
					alt={__("Custom SVG", "header-footer-elementor")}
					className="object-contain"
				/>
			),
			title: __("Header ", "header-footer-elementor"),
			content: <Header />,
		},
		{
			id: 3,
			icon: (
				<img
					src={`${hfeSettingsData.all_layouts}`}
					alt={__("Custom SVG", "header-footer-elementor")}
					className="object-contain"
				/>
			),
			selected: (
				<img
					src={`${hfeSettingsData.all_layouts}`}
					alt={__("Custom SVG", "header-footer-elementor")}
					className="object-contain"
				/>
			),
			title: __("Footer", "header-footer-elementor"),
			content: <Footer />,
		},
		{
			id: 4,
			icon: (
				<img
					src={`${hfeSettingsData.all_layouts}`}
					alt={__("Custom SVG", "header-footer-elementor")}
					className="object-contain"
				/>
			),
			selected: (
				<img
					src={`${hfeSettingsData.all_layouts}`}
					alt={__("Custom SVG", "header-footer-elementor")}
					className="object-contain"
				/>
			),
			title: __("Before Footer", "header-footer-elementor"),
			content: <BeforeFooter />,
		},
		{
			id: 5,
			icon: (
				<img
					src={`${hfeSettingsData.all_layouts}`}
					alt={__("Custom SVG", "header-footer-elementor")}
					className="object-contain"
				/>
			),
			selected: (
				<img
					src={`${hfeSettingsData.all_layouts}`}
					alt={__("Custom SVG", "header-footer-elementor")}
					className="object-contain"
				/>
			),
			title: __("Custom Block", "header-footer-elementor"),
			content: <CustomBlock />,
		},
	].filter((item) => {
		if ("no" === hfeSettingsData.show_theme_support && item.id === 2) {
			return false;
		}

		return true;
	});

	// Default state: Set 'My Account' (first item) as the default when the settings tab is clicked
	const [selectedItem, setSelectedItem] = useState(() => {
		const savedItemId = localStorage.getItem("hfeSelectedItemId");
		const savedItem = items.find((item) => item.id === Number(savedItemId));
		return savedItem || items[0]; // Default to the first item if no saved item is found
	});

	useEffect(() => {
		// Store selectedItemId in localStorage (or other persistent storage) to retain selection
		localStorage.setItem("hfeSelectedItemId", selectedItem.id.toString());
	}, [selectedItem]);

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const tab = params.get("tab");
		if (tab) {
			const itemId = Number(tab);
			const item = items.find((item) => item.id === itemId);
			if (item) {
				setSelectedItem(item);
			}
		}
	}, []);

	const handleSelectItem = (item) => {
		setSelectedItem(item);
	};

	const handleSettingsTabClick = () => {
		setSelectedItem(items[0]); // Set "My Account" as the default item when settings tab is clicked
	};

	return (
		<>
			<NavMenu onSettingsTabClick={handleSettingsTabClick} />
			<div className="">
				<Container
					align="stretch"
					className="p-1 flex-col lg:flex-row hfe-settings-page"
					containerType="flex"
					direction="row"
					gap="sm"
					justify="start"
					style={{ height: "100%" }}
				>
					<Container.Item
						className="p-2 hfe-sticky-outer-wrapper"
						alignSelf="auto"
						order="none"
						shrink={1}
						style={{ backgroundColor: "#ffffff" }}
					>
						<div className="hfe-sticky-sidebar">
							<SidebarMenu
								items={items}
								onSelectItem={handleSelectItem}
								selectedItemId={selectedItem.id}
							/>
						</div>
					</Container.Item>
					<Container.Item
						className="p-2 flex w-full justify-center items-start hfe-hide-scrollbar"
						alignSelf="auto"
						order="none"
						shrink={1}
						style={{
							height: "calc(100vh - 1px)",
							overflowY: "auto",
						}}
					>
						<div className="w-full">
							<Content selectedItem={selectedItem} />
						</div>
					</Container.Item>
				</Container>
			</div>
		</>
	);
};

export default Sidebar;
