import React, { useEffect, useState } from "react";
import { Topbar, Button, Badge, DropdownMenu } from "@bsf/force-ui";
import {
	ArrowUpRight,
	CircleHelp,
	FileText,
	Headset,
	House,
	User,
	ChevronRight,
	AlignJustify,
	X,
} from "lucide-react";
import { __ } from "@wordpress/i18n";
import { routes } from "../../admin/settings/routes";
import { Link } from "../../router/index";
import useWhatsNewRSS from "whats-new-rss";

function updateNavMenuActiveState() {
	const currentPath = window.location.hash;
	const menuItems = document.querySelectorAll(
		"#adminmenu #toplevel_page_hfe a",
	);

	menuItems.forEach((item) => {
		const href = item.getAttribute("href");
		const parentLi = item.closest("li");
		const itemText = item.textContent.trim();

		if (
			href &&
			(currentPath.includes(href.split("#")[1]) ||
				("#dashboard" === currentPath && itemText === "Dashboard"))
		) {
			parentLi.classList.add("current");
		} else {
			parentLi.classList.remove("current");
		}
	});
}

const NavBar = () => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	useEffect(() => {
		updateNavMenuActiveState();
		window.addEventListener("hashchange", updateNavMenuActiveState);

		return () => {
			window.removeEventListener("hashchange", updateNavMenuActiveState);
		};
	}, []);

	// Get the current URL's hash part (after the #).
	const currentPath = window.location.hash;

	// Since this is the only setting on the navbar, always show it as active
	const isActive = (path) => true; // Always return true to show as active

	const linkStyle = (path) => ({
		color: "#111827", // Always use active color
		borderBottom: "2px solid #6005FF", // Always show active border
		paddingBottom: "22px",
		marginBottom: "-16px",
	});

	const handleRedirect = (url) => {
		window.open(url, "_blank");
		setIsDropdownOpen(false);
	};

	useWhatsNewRSS({
		rssFeedURL: "https://ultimateelementor.com/whats-new/feed/",
		selector: "#hfe-whats-new",
		triggerButton: {
			beforeBtn:
				'<div class="w-4 sm:w-8 h-8 sm:h-10 flex items-center whitespace-nowrap justify-center cursor-pointer rounded-full border border-slate-200">',
			icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#434141" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-megaphone"><path d="m3 11 18-5v12L3 14v-3z"></path><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"></path></svg>',
			afterBtn: "</div>",
		},
		flyout: {
			title: __("What's New?", "astra-sites"),
			formatDate: (date) => {
				const dayOfWeek = date.toLocaleDateString("en-US", {
					weekday: "long",
				});
				const month = date.toLocaleDateString("en-US", {
					month: "long",
				});
				const day = date.getDate();
				const year = date.getFullYear();

				return `${dayOfWeek} ${month} ${day}, ${year}`;
			},
		},
	});

	return (
		<Topbar
			className="hfe-nav-menu relative"
			style={{
				width: "unset",
				padding: "0.5rem",
				zIndex: "9",
				paddingTop: "1rem",
			}}
		>
			<div className="flex flex-col lg:flex-row items-start md:items-center w-full">
				{/* Top row on mobile: Logo and Nav menu */}
				<div className="flex flex-row md:items-center md:gap-8 w-full">
					<Topbar.Left>
						<Topbar.Item>
							<Link to={routes.dashboard.path}>
								<img
									src={`${hfeSettingsData.icon_url}`}
									alt="Icon"
									className="ml-4 cursor-pointer"
									style={{ height: "35px", width: "35px" }}
								/>
							</Link>
						</Topbar.Item>
					</Topbar.Left>
					<Topbar.Middle className="flex-grow" align="left">
						<Topbar.Item>
							<nav className="flex flex-wrap gap-6 mt-2 md:mt-0 cursor-pointer">
								<Link
									to={routes.dashboard.path}
									className={`${
										isActive(
											"edit.php?post_type=elementor-hf",
										)
											? "active-link"
											: ""
									} flex items-center gap-1`}
									style={linkStyle(
										"edit.php?post_type=elementor-hf",
									)}
									onClick={() => {
										console.log(
											"Navigating to Header & Footer Builder",
										);
									}}
								>
									<span>
										{__(
											"Dashboard",
											"header-footer-elementor",
										)}
									</span>
									<ChevronRight size={16} />
									<span>
										{__(
											"Header & Footer",
											"header-footer-elementor",
										)}
									</span>
								</Link>
							</nav>
						</Topbar.Item>
						<Topbar.Item>
							<Button
								icon={<ArrowUpRight />}
								iconPosition="right"
								variant="ghost"
								className="hfe-remove-ring mb-2"
								style={{
									color: "#6005FF",
									background: "none",
									border: "none",
									padding: 0,
									cursor: "pointer",
								}}
								onClick={() =>
									handleRedirect(
										"https://ultimateelementor.com/pricing/?utm_source=uae-lite-dashboard&utm_medium=navigation-bar&utm_campaign=uae-lite-upgrade"
									)
								}
							>
								{__("Get Pro", "header-footer-elementor")}
							</Button>
						</Topbar.Item>
					</Topbar.Middle>
					<Topbar.Right className="gap-4">
						<Topbar.Item>
							<Link to={routes.headerFooterBuilder.path}>
								<div 
									className="flex cursor-pointer gap-2 items-center justify-center"
									style={{
										backgroundColor: "#ffffff",
										fontSize: "14px",
										fontWeight: "400",
										padding: "8px 12px",
										borderRadius: "6px",
										transition: "all 0.2s ease",
										outline: "none",
										transform: "scale(0.95)",
										opacity: "1",
										color: "#000000",
										cursor: "pointer",
										display: "inline-flex",
										alignItems: "center",
										justifyContent: "center",
										gap: "8px",
										boxShadow: "none",
									}}
									onMouseEnter={(e) => {
										e.currentTarget.style.backgroundColor = "#ffffff";
										e.currentTarget.style.color = "#000000";
										e.currentTarget.style.outline = "none";
										e.currentTarget.style.boxShadow = "none";
										e.currentTarget.style.transform = "scale(1)";
									}}
									onMouseLeave={(e) => {
										e.currentTarget.style.backgroundColor = "#ffffff";
										e.currentTarget.style.color = "#000000";
										e.currentTarget.style.outline = "none";
										e.currentTarget.style.boxShadow = "none";
										e.currentTarget.style.transform = "scale(0.95)";
									}}
								>
									<span className="text-black text-sm">
										Switch to Table View
									</span>
									<AlignJustify 
										className="cursor-pointer hfe-user-icon"
										style={{ color: "black" }}
										size={16}
									/>
								</div>
							</Link>
						</Topbar.Item>
						<Topbar.Item>
							<Link to={routes.dashboard.path}>
								<div 
									className="flex cursor-pointer items-center justify-center gap-1" 
									style={{ 
										backgroundColor: "#ffffff",
										fontSize: "14px",
										fontWeight: "400",
										padding: "8px 12px",
										borderRadius: "6px",
										transition: "all 0.2s ease",
										outline: "none",
										transform: "scale(0.95)",
										opacity: "1",
										color: "#000000",
										cursor: "pointer",
										display: "inline-flex",
										alignItems: "center",
										justifyContent: "center",
										gap: "8px",
										boxShadow: "none",
									}}
									onMouseEnter={(e) => {
										e.currentTarget.style.backgroundColor = "#ffffff";
										e.currentTarget.style.color = "#000000";
										e.currentTarget.style.outline = "none";
										e.currentTarget.style.boxShadow = "none";
										e.currentTarget.style.transform = "scale(1)";
									}}
									onMouseLeave={(e) => {
										e.currentTarget.style.backgroundColor = "#ffffff";
										e.currentTarget.style.color = "#000000";
										e.currentTarget.style.outline = "none";
										e.currentTarget.style.boxShadow = "none";
										e.currentTarget.style.transform = "scale(0.95)";
									}}
								>
									<span className="text-black text-sm">
										Close
									</span>
									<X
										className="cursor-pointer hfe-user-icon"
										style={{ color: "black" }}
										size={16}
									/>
								</div>
							</Link>
						</Topbar.Item>
						<Topbar.Item className="gap-4 cursor-pointer">
							<div className="pb-1" id="hfe-whats-new"></div>
						</Topbar.Item>
					</Topbar.Right>
				</div>
			</div>
		</Topbar>
	);
};

export default NavBar;
