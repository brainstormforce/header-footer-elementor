import React, { useEffect, useState } from "react";
import { Topbar, Button, Badge, DropdownMenu } from "@bsf/force-ui";
import {
	ArrowUpRight,
	CircleHelp,
	FileText,
	Headset,
	House,
	User,
} from "lucide-react";
import { __ } from "@wordpress/i18n";
import { routes } from "../admin/settings/routes";
import { Link } from "../router/index";
import useWhatsNewRSS from "whats-new-rss";

function updateNavMenuActiveState() {
	const currentPath = window.location.hash;
	const menuItems = document.querySelectorAll(
		"#adminmenu #toplevel_page_hfe a"
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

const NavMenu = () => {
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

	const isActive = (path) => currentPath.includes(path);

	const linkStyle = (path) => ({
		color: isActive(path) ? "#111827" : "#4B5563",
		borderBottom: isActive(path) ? "2px solid #6005FF" : "none",
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
										isActive("dashboard")
											? "active-link"
											: ""
									}`}
									style={linkStyle("dashboard")}
								>
									{__("Dashboard", "header-footer-elementor")}
								</Link>
								<Link
									to={routes.headerFooterBuilder.path}
									className={`${
										isActive(
											"edit.php?post_type=elementor-hf"
										)
											? "active-link"
											: ""
									}`}
									style={linkStyle(
										"edit.php?post_type=elementor-hf"
									)}
									onClick={() => {
										console.log(
											"Navigating to Header & Footer Builder"
										);
									}}
								>
									{__(
										"Header & Footer",
										"header-footer-elementor"
									)}
								</Link>
								<Link
									to={routes.widgets.path}
									className={`${
										isActive("widgets") ? "active-link" : ""
									}`}
									style={linkStyle("widgets")}
								>
									{__("Widgets", "header-footer-elementor")}
								</Link>
								<Link
									to={routes.settings.path}
									className={`${
										isActive("settings")
											? "active-link"
											: ""
									}`}
									style={linkStyle("settings")}
								>
									{__("Settings", "header-footer-elementor")}
								</Link>
								<Link
									to={routes.upgrade.path}
									className={`${
										isActive("upgrade") ? "active-link" : ""
									}`}
									style={linkStyle("upgrade")}
								>
									{__(
										"Free vs Pro",
										"header-footer-elementor"
									)}
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
									// paddingBottom: "10px",
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
								{__("Get Full Control", "header-footer-elementor")}
							</Button>
						</Topbar.Item>
					</Topbar.Middle>
					<Topbar.Right className="gap-4">
						<Topbar.Item>
							<DropdownMenu placement="bottom-end">
								<DropdownMenu.Trigger>
									<Badge
										label={__(
											"Free",
											"header-footer-elementor"
										)}
										size="xs"
										variant="neutral"
									/>
									<span className="sr-only">Open Menu</span>
								</DropdownMenu.Trigger>
								<DropdownMenu.Portal>
								<DropdownMenu.ContentWrapper>
								<DropdownMenu.Content className="w-60">
										<DropdownMenu.List>
											<DropdownMenu.Item>
												{__(
													"Version",
													"header-footer-elementor"
												)}
											</DropdownMenu.Item>
											<DropdownMenu.Item>
												<div className="flex justify-between w-full">
													{`${hfeSettingsData.uaelite_current_version}`}
													<Badge
														label={__(
															"Free",
															"header-footer-elementor"
														)}
														size="xs"
														variant="neutral"
													/>
												</div>
											</DropdownMenu.Item>
										</DropdownMenu.List>
									</DropdownMenu.Content>
								</DropdownMenu.ContentWrapper>
								</DropdownMenu.Portal>
							</DropdownMenu>
						</Topbar.Item>
						<Topbar.Item className="gap-4 cursor-pointer">
							<DropdownMenu placement="bottom-end">
								<DropdownMenu.Trigger>
									<CircleHelp />
								</DropdownMenu.Trigger>
								<DropdownMenu.Portal>
								<DropdownMenu.ContentWrapper>
								<DropdownMenu.Content className="w-60">
										<DropdownMenu.List>
											<DropdownMenu.Item>
												{__(
													"Useful Resources",
													"header-footer-elementor"
												)}
											</DropdownMenu.Item>
											<DropdownMenu.Item
												className="text-text-primary"
												style={{ color: "black" }}
												onClick={() =>
													handleRedirect(
														"https://ultimateelementor.com/docs/getting-started-with-ultimate-addons-for-elementor-lite/"
													)
												}
											>
												<FileText
													style={{ color: "black" }}
												/>
												{__(
													"Getting Started",
													"header-footer-elementor"
												)}
											</DropdownMenu.Item>
											<DropdownMenu.Item
												onClick={() =>
													handleRedirect(
														"https://ultimateelementor.com/docs-category/widgets/"
													)
												}
											>
												<FileText />
												{__(
													"How to use widgets",
													"header-footer-elementor"
												)}
											</DropdownMenu.Item>
											<DropdownMenu.Item
												onClick={() =>
													handleRedirect(
														"https://ultimateelementor.com/docs-category/features/"
													)
												}
											>
												<FileText />
												{__(
													"How to use features",
													"header-footer-elementor"
												)}
											</DropdownMenu.Item>
											<DropdownMenu.Item
												onClick={() =>
													handleRedirect(
														"https://ultimateelementor.com/docs-category/templates/"
													)
												}
											>
												<FileText />
												{__(
													"How to use templates",
													"header-footer-elementor"
												)}
											</DropdownMenu.Item>
											<DropdownMenu.Item
												onClick={() =>
													handleRedirect(
														"https://ultimateelementor.com/contact/"
													)
												}
											>
												<Headset />
												{__(
													"Contact us",
													"header-footer-elementor"
												)}
											</DropdownMenu.Item>
										</DropdownMenu.List>
									</DropdownMenu.Content>
								</DropdownMenu.ContentWrapper>
								</DropdownMenu.Portal>
							</DropdownMenu>
							<div className="pb-1" id="hfe-whats-new"></div>
						</Topbar.Item>
						<Link to={routes.settings.path}>
							<User
								className="cursor-pointer hfe-user-icon"
								style={{ color: "black" }}
							/>
						</Link>
					</Topbar.Right>
				</div>
			</div>
		</Topbar>
	);
};

export default NavMenu;
