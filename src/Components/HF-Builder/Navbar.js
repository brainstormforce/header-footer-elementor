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
	X,
} from "lucide-react";
import { __ } from "@wordpress/i18n";
import { routes } from "../../admin/settings/routes";
import { Link } from "../../router/index";

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
							<nav className="flex text-text-tertiary text-sm flex-wrap gap-2 mt-2 md:mt-0 cursor-pointer">
								<Link
									to={routes.headerFooterBuilder.path}
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
											"Header & Footer Builder",
											"header-footer-elementor",
										)}
									</span>
								</Link>
							</nav>
						</Topbar.Item>
					</Topbar.Middle>
					<Topbar.Right className="gap-4">
						<Link to={routes.settings.path}>
							<div className="flex cursor-pointer items-center justify-center gap-1">
								<span className="text-black text-xs">
									Close
								</span>
								<X
									className="cursor-pointer hfe-user-icon"
									style={{ color: "black" }}
									size={16}
								/>
							</div>
						</Link>
					</Topbar.Right>
				</div>
			</div>
		</Topbar>
	);
};

export default NavBar;
