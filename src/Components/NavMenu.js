import React from "react";
import { Topbar, Button, Badge } from "@bsf/force-ui";
import { ArrowUpRight, CircleHelp, Megaphone } from "lucide-react";
import { __ } from "@wordpress/i18n";
import { routes } from "../admin/settings/routes";
import { Link } from '../router/index';

const NavMenu = () => {
    // Get the current URL's hash part (after the #)
    const currentPath = window.location.hash; 

    const isActive = (path) => currentPath.includes(path);

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
            <Topbar.Middle align="left" gap="20px">
                <Topbar.Item>
                    <nav className="flex gap-2 cursor-pointer text-text-secondary">
                        <Link
                            to={routes.dashboard.path}
                            className={`text-text-primary ${isActive('/dashboard') ? 'active-link' : ''}`}
                            style={{
                                borderBottom: isActive('/dashboard') ? '2px solid #6005FF' : 'none',
                                paddingBottom: '4px',
                            }}
                        >
                            Dashboard
                        </Link>
                        <Link
                            to={routes.widgets.path}
                            className={`text-text-primary ${isActive('/widgets') ? 'active-link' : ''}`}
                            style={{
                                borderBottom: isActive('/widgets') ? '2px solid #6005FF' : 'none',
                                paddingBottom: '4px',
                            }}
                        >
                            Widgets / Features
                        </Link>
                        <Link
                            to={routes.templates.path}
                            className={`text-text-primary ${isActive('/templates') ? 'active-link' : ''}`}
                            style={{
                                borderBottom: isActive('/templates') ? '2px solid #6005FF' : 'none',
                                paddingBottom: '4px',
                            }}
                        >
                            Templates
                        </Link>
                        <Link
                            to={routes.settings.path}
                            className={`text-text-primary ${isActive('/settings') ? 'active-link' : ''}`}
                            style={{
                                borderBottom: isActive('/settings') ? '2px solid #6005FF' : 'none',
                                paddingBottom: '4px',
                            }}
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
            <Topbar.Right className="gap-4">
                <Topbar.Item>
                    <Badge label="Free" size="xs" variant="neutral" />
                </Topbar.Item>
                <Topbar.Item className="gap-4">
                    <CircleHelp />
                    <Megaphone />
                </Topbar.Item>
            </Topbar.Right>
        </Topbar>
    );
};

export default NavMenu;
