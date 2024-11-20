import React, { useState } from "react";
import { Topbar, Button, Badge, DropdownMenu } from "@bsf/force-ui";
import { ArrowUpRight, CircleHelp, FileText, Headset, Megaphone, User } from "lucide-react";
import { __ } from "@wordpress/i18n";
import { routes } from "../admin/settings/routes";
import { Link } from "../router/index";

const NavMenu = () => {
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	// Get the current URL's hash part (after the #)
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

	return (
		<Topbar
			className="hfe-nav-menu relative"
			style={{ width: "unset", padding: "0.5rem", zIndex: "9" }}
		>
			<div className="flex flex-col lg:flex-row items-start md:items-center w-full">
				{/* Top row on mobile: Logo and Nav menu */}
				<div className="flex flex-row md:items-center md:gap-8 w-full">
					<Topbar.Left>
						<Topbar.Item>
							<Link to={routes.dashboard.path}>
								<img
									src={`${hfeSettingsData.icon_url}`}
									alt="My Icon"
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
									Dashboard
								</Link>
								<Link
									to={routes.widgets.path}
									className={`${
										isActive("widgets") ? "active-link" : ""
									}`}
									style={linkStyle("widgets")}
								>
									Widgets / Features
								</Link>
								<Link
									to={routes.templates.path}
									className={`${
										isActive("templates")
											? "active-link"
											: ""
									}`}
									style={linkStyle("templates")}
								>
									Templates
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
									Settings
								</Link>
							</nav>
						</Topbar.Item>
						<Topbar.Item>
							<Button
								icon={<ArrowUpRight />}
								iconPosition="right"
								variant="ghost"
								style={{
									color: "#6005FF",
									paddingBottom: "15px",
								}}
							>
								{__(
									"Get Ultimate Addons",
									"header-footer-elementor"
								)}
							</Button>
						</Topbar.Item>
					</Topbar.Middle>
					<Topbar.Right className="gap-4">
						<Topbar.Item>
							<Badge label="Free" size="xs" variant="neutral" />
						</Topbar.Item>
						<Topbar.Item className="gap-4 cursor-pointer">
							<DropdownMenu
								placement="bottom-start"
								isOpen={isDropdownOpen}
								onOpenChange={setIsDropdownOpen}
							>
								<DropdownMenu.Trigger>
									<CircleHelp />
								</DropdownMenu.Trigger>
								<DropdownMenu.Content className="w-60">
									<DropdownMenu.List>
										<DropdownMenu.Item>
											Useful Resources
										</DropdownMenu.Item>
										<DropdownMenu.Item
											className="text-text-primary"
											style={{ color: "black" }}
											onClick={() =>
												handleRedirect(
													"https://ultimateelementor.com/docs/getting-started-uael/"
												)
											}
										>
											<FileText
												style={{ color: "black" }}
											/>
											Getting Started
										</DropdownMenu.Item>
										<DropdownMenu.Item
											onClick={() =>
												handleRedirect(
													"https://ultimateelementor.com/docs-category/widgets/"
												)
											}
										>
											<FileText />
											How to use widgets
										</DropdownMenu.Item>
										<DropdownMenu.Item
											onClick={() =>
												handleRedirect(
													"https://ultimateelementor.com/docs-category/features/"
												)
											}
										>
											<FileText />
											How to use features
										</DropdownMenu.Item>
										<DropdownMenu.Item
											onClick={() =>
												handleRedirect(
													"https://ultimateelementor.com/docs-category/templates/"
												)
											}
										>
											<FileText />
											How to use templates
										</DropdownMenu.Item>
										<DropdownMenu.Item
											onClick={() =>
												handleRedirect(
													"https://ultimateelementor.com/contact/"
												)
											}
										>
											<Headset />
											{__("Contact us", "uael")}
										</DropdownMenu.Item>
									</DropdownMenu.List>
								</DropdownMenu.Content>
							</DropdownMenu>
							<Megaphone />
							<User />
						</Topbar.Item>
					</Topbar.Right>
				</div>
			</div>
		</Topbar>
	);
};

export default NavMenu;
