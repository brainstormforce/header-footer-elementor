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
					<svg
						fill="none"
						height="24"
						viewBox="0 0 25 24"
						width="25"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							clipRule="evenodd"
							d="M12.5 24C19.1275 24 24.5 18.6273 24.5 11.9999C24.5 5.37255 19.1275 0 12.5 0C5.87259 0 0.5 5.37255 0.5 11.9999C0.5 18.6273 5.87259 24 12.5 24ZM12.5517 5.99996C11.5882 5.99996 10.2547 6.55101 9.5734 7.23073L7.7229 9.07688H16.9465L20.0307 5.99996H12.5517ZM15.4111 16.7692C14.7298 17.4489 13.3964 17.9999 12.4328 17.9999H4.95388L8.03804 14.923H17.2616L15.4111 16.7692ZM18.4089 10.6153H6.18418L5.60673 11.1923C4.23941 12.423 4.64495 13.3846 6.5598 13.3846H18.8176L19.3952 12.8076C20.7492 11.5841 20.3237 10.6153 18.4089 10.6153Z"
							fill="#0D7EE8"
							fillRule="evenodd"
						/>
					</svg>
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
					<nav className="flex gap-2 cursor-pointer">
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
							Widgets
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
					>
						{__("Upgrade to Pro", "header-footer-elementor")}
					</Button>
				</Topbar.Item>
			</Topbar.Middle>
			<Topbar.Right>
				<Topbar.Item>
					<Badge label="V 1.6.42" size="xs" variant="neutral" />
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
