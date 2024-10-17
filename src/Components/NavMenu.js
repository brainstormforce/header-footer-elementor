import React from "react";
import { Topbar, Button, Badge } from "@bsf/force-ui";
import { ArrowUpRight, CircleHelp, Megaphone } from "lucide-react";
import { __ } from "@wordpress/i18n";
import { routes } from "../admin/settings/routes";
import { Link } from '../router/index'

const NavMenu = () => {
	return (
		<Topbar
			style={{
				width: "unset",
			}}
		>
			<Topbar.Left gap="xl">
				<Topbar.Item>
				<img src={`${hfeSettingsData.icon_url}`} alt="My Icon" className=""/>
				</Topbar.Item>
			</Topbar.Left>
			<Topbar.Middle align="left" gap="2xl">
				<Topbar.Item>
					{/* <div className="flex gap-2">
					<div>{__('Dashboard', 'header-footer-elementor')}</div>
					<div>{__('Widgets/Features', 'header-footer-elementor')}</div>
					<div>{__('Settings', 'header-footer-elementor')}</div>
					<div>{__('Free vs Pro', 'header-footer-elementor')}</div>
				</div> */}
					<nav className="flex gap-2 cursor-pointer text-text-secondary">
						<Link
							to={routes.dashboard.path}
							activeClassName="active-link"
						>
							Dashboard
						</Link>
						<Link
							to={routes.widgets.path}
							activeClassName="active-link"
						>
							Widgets / Features
						</Link>
						<Link
							to={routes.templates.path}
							activeClassName="active-link"
						>
							Templates
						</Link>
						<Link
							to={routes.settings.path}
							activeClassName="active-link"
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
						style={{color: "#6005FF"}}
					>
						{__("Get Ultimate Addons", "header-footer-elementor")}
					</Button>
				</Topbar.Item>
			</Topbar.Middle>
			<Topbar.Right>
				<Topbar.Item>
					<Badge label="Free" size="xs" variant="neutral" />
				</Topbar.Item>
				<Topbar.Item className="gap-2">
					<CircleHelp />
					<Megaphone />
				</Topbar.Item>
			</Topbar.Right>
		</Topbar>
	);
};

export default NavMenu;
