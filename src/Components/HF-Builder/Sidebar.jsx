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
	const [isCurrentTabEmpty, setIsCurrentTabEmpty] = useState(false);

	// Inject CSS for empty state styling
	useEffect(() => {
		const style = document.createElement("style");
		style.textContent = `
			.hfe-empty-state-container {
				background-color: white !important;
				margin-top: -40px !important;
				margin-left: 8px !important;
				border-left: 1px solid #e5e7eb !important;
				box-shadow: -2px 0 4px rgba(0, 0, 0, 0.05) !important;
			}
		`;
		document.head.appendChild(style);

		return () => {
			if (document.head.contains(style)) {
				document.head.removeChild(style);
			}
		};
	}, []);

	const items = [
		{
			id: 1,
			icon: (
				<img
					src={`${hfeSettingsData.all_layout_unselected}`}
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
			content: <AllLayouts onEmptyStateChange={setIsCurrentTabEmpty} />,
		},
		{
			id: 2,
			icon: (
				<img
					src={`${hfeSettingsData.all_headers_unselected}`}
					alt={__("Custom SVG", "header-footer-elementor")}
					className="object-contain"
				/>
			),
			selected: (
				<img
					src={`${hfeSettingsData.all_headers}`}
					alt={__("Custom SVG", "header-footer-elementor")}
					className="object-contain"
				/>
			),
			title: __("Header ", "header-footer-elementor"),
			content: <Header onEmptyStateChange={setIsCurrentTabEmpty} />,
		},
		{
			id: 3,
			icon: (
				<img
					src={`${hfeSettingsData.all_footers_unselected}`}
					alt={__("Custom SVG", "header-footer-elementor")}
					className="object-contain"
				/>
			),
			selected: (
				<img
					src={`${hfeSettingsData.all_footers}`}
					alt={__("Custom SVG", "header-footer-elementor")}
					className="object-contain"
				/>
			),
			title: __("Footer", "header-footer-elementor"),
			content: <Footer onEmptyStateChange={setIsCurrentTabEmpty} />,
		},
		{
			id: 4,
			icon: (
				<img
					src={`${hfeSettingsData.all_before_footers_unselected}`}
					alt={__("Custom SVG", "header-footer-elementor")}
					className="object-contain"
				/>
			),
			selected: (
				<img
					src={`${hfeSettingsData.all_before_footers}`}
					alt={__("Custom SVG", "header-footer-elementor")}
					className="object-contain"
				/>
			),
			title: __("Before Footer", "header-footer-elementor"),
			content: <BeforeFooter onEmptyStateChange={setIsCurrentTabEmpty} />,
		},
		{
			id: 5,
			icon: (
				<img
					src={`${hfeSettingsData.all_custom_unselected}`}
					alt={__("Custom SVG", "header-footer-elementor")}
					className="object-contain"
				/>
			),
			selected: (
				<img
					src={`${hfeSettingsData.all_custom}`}
					alt={__("Custom SVG", "header-footer-elementor")}
					className="object-contain"
				/>
			),
			title: __("Custom Block", "header-footer-elementor"),
			content: <CustomBlock onEmptyStateChange={setIsCurrentTabEmpty} />,
		},
	]

	// Default state: Always set 'All Layouts' (id: 1) as the default when the Header & Footer nav is clicked
	const [selectedItem, setSelectedItem] = useState(() => {
		// Check if we're on the Header & Footer page
		const currentPath = window.location.hash;
		if (currentPath.includes('hfb')) {
			// Clear any saved selection for fresh start on Header & Footer page
			localStorage.removeItem("hfeSelectedItemId");
			// Always default to "All Layouts" (first item with id: 1)
			const allLayoutsItem = items.find((item) => item.id === 1);
			return allLayoutsItem || items[0];
		}
		
		// For other pages, use saved selection or default to All Layouts
		const savedItemId = localStorage.getItem("hfeSelectedItemId");
		const savedItem = items.find((item) => item.id === Number(savedItemId));
		const allLayoutsItem = items.find((item) => item.id === 1);
		return savedItem || allLayoutsItem || items[0];
	});

	useEffect(() => {
		// Store selectedItemId in localStorage (or other persistent storage) to retain selection
		localStorage.setItem("hfeSelectedItemId", selectedItem.id.toString());
	}, [selectedItem]);

	// Reset to All Layouts when the component mounts (when Header & Footer nav is clicked)
	useEffect(() => {
		const allLayoutsItem = items.find((item) => item.id === 1);
		if (allLayoutsItem) {
			setSelectedItem(allLayoutsItem);
		}

		// Listen for hash changes to reset to All Layouts when Header & Footer nav is clicked
		const handleHashChange = () => {
			const currentPath = window.location.hash;
			if (currentPath.includes('hfb')) {
				const allLayoutsItem = items.find((item) => item.id === 1);
				if (allLayoutsItem) {
					setSelectedItem(allLayoutsItem);
					// Clear any saved selection to ensure fresh start
					localStorage.removeItem("hfeSelectedItemId");
				}
			}
		};

		// Add event listener for hash changes
		window.addEventListener('hashchange', handleHashChange);

		// Check current hash on mount
		handleHashChange();

		// Cleanup event listener
		return () => {
			window.removeEventListener('hashchange', handleHashChange);
		};
	}, []); // Empty dependency array means this runs once when component mounts

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
		const allLayoutsItem = items.find((item) => item.id === 1);
		setSelectedItem(allLayoutsItem || items[0]); // Set "All Layouts" as the default item when Header & Footer nav is clicked
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
					<div
						className="p-2 hfe-sticky-outer-wrapper"
						style={{ 
							alignSelf: "auto",
							order: "none",
							flexShrink: 1,
							backgroundColor: "#ffffff" 
						}}
					>
						<div className="hfe-sticky-sidebar">
							<SidebarMenu
								items={items}
								onSelectItem={handleSelectItem}
								selectedItemId={selectedItem.id}
							/>
						</div>
					</div>
					<div
						className={`p-2 flex w-full justify-center items-start hfe-hide-scrollbar ${isCurrentTabEmpty ? 'hfe-empty-state-container' : ''}`}
						style={{
							alignSelf: "auto",
							order: "none",
							flexShrink: 1,
							height: "calc(100vh - 1px)",
							overflowY: "auto",
							...(isCurrentTabEmpty && {
								backgroundColor: 'white',
								marginTop: '-40px',
								marginLeft: '8px',
								borderLeft: '1px solid #e5e7eb',
								boxShadow: '-2px 0 4px rgba(0, 0, 0, 0.05)',
								position: 'relative',
								zIndex: 1
							})
						}}
					>
						<div className="w-full">
							<Content selectedItem={selectedItem} />
						</div>
					</div>
				</Container>
			</div>
		</>
	);
};

export default Sidebar;
