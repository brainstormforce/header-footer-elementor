import React from "react";
import { Container, Button } from "@bsf/force-ui";
import { Check, X } from "lucide-react";
import { __ } from "@wordpress/i18n";
import { routes } from "../../admin/settings/routes";
import { Link } from "../../router/index";
import { ArrowUpRight } from "lucide-react";

const FreevsPro = () => {
    const sections = [
        {
            title: __("Essentials", "header-footer-elementor"),
            items: [
                { id: 1, content: __("White Label Option", "header-footer-elementor"), iconFree: false, iconPro: true },
                { id: 2, content: __("24/7 Premium Support", "header-footer-elementor"), iconFree: false, iconPro: true },
                { id: 3, content: __("Cross-Domain Copy-Paste", "header-footer-elementor"), iconFree: false, iconPro: true },
            ],
        },
        {
            title: __("Dynamic Header & Footer Widgets", "header-footer-elementor"),
            items: [
                { id: 1, content: __("Post Info", "header-footer-elementor"), iconFree: true, iconPro: false },
                { id: 2, content: __("Scroll to Top", "header-footer-elementor"), iconFree: true, iconPro: false },
                { id: 3, content: __("Reading Progress Bar", "header-footer-elementor"), iconFree: true, iconPro: false },
                { id: 4, content: __("Breadcrumbs", "header-footer-elementor"), iconFree: true, iconPro: false },
                { id: 5, content: __("Retina Logo", "header-footer-elementor"), iconFree: true, iconPro: false },
                { id: 6, content: __("Copyright", "header-footer-elementor"), iconFree: true, iconPro: false },
                { id: 7, content: __("Page Title", "header-footer-elementor"), iconFree: true, iconPro: false },
                { id: 8, content: __("Site Tagline", "header-footer-elementor"), iconFree: true, iconPro: false },
                { id: 9, content: __("Site Logo", "header-footer-elementor"), iconFree: true, iconPro: false },
                { id: 10, content: __("Search", "header-footer-elementor"), iconFree: true, iconPro: false },
                { id: 11, content: __("Navigation Menu", "header-footer-elementor"), iconFree: true, iconPro: false },
            ],
        },
        {
            title: __("Creative & Advanced Design Widgets", "header-footer-elementor"),
            items: [
                { id: 1, content: __("Advanced Heading", "header-footer-elementor"), iconFree: false, iconPro: true },
                { id: 2, content: __("Dual Color Heading", "header-footer-elementor"), iconFree: false, iconPro: true },
                { id: 3, content: __("Fancy Heading", "header-footer-elementor"), iconFree: false, iconPro: true },
                { id: 4, content: __("Multi-Button", "header-footer-elementor"), iconFree: false, iconPro: true },
                { id: 5, content: __("Image Hotspots", "header-footer-elementor"), iconFree: false, iconPro: true },
            ],
        },
        {
            title: __("Content & Media Widgets", "header-footer-elementor"),
            items: [
                { id: 1, content: __("Content Toggle Button", "header-footer-elementor"), iconFree: false, iconPro: true },
                { id: 2, content: __("Image Gallery", "header-footer-elementor"), iconFree: false, iconPro: true },
                { id: 3, content: __("Video Gallery", "header-footer-elementor"), iconFree: false, iconPro: true },
                { id: 4, content: __("Table", "header-footer-elementor"), iconFree: false, iconPro: true },
                { id: 5, content: __("Timeline", "header-footer-elementor"), iconFree: false, iconPro: true },
                { id: 6, content: __("Google Map", "header-footer-elementor"), iconFree: false, iconPro: true },
                { id: 7, content: __("Before & After Slider", "header-footer-elementor"), iconFree: false, iconPro: true },
                { id: 8, content: __("Info Card", "header-footer-elementor"), iconFree: true, iconPro: false },
                { id: 9, content: __("Video", "header-footer-elementor"), iconFree: false, iconPro: true },
                { id: 10, content: __("Conditional Display", "header-footer-elementor"), iconFree: false, iconPro: true },
                { id: 11, content: __("Info Box", "header-footer-elementor"), iconFree: false, iconPro: true },
                { id: 12, content: __("Login Form", "header-footer-elementor"), iconFree: false, iconPro: true },
                { id: 13, content: __("User Registration Form", "header-footer-elementor"), iconFree: false, iconPro: true },
            ],
        },
        {
            title: __("Marketing & Engagement Widgets", "header-footer-elementor"),
            items: [
                { id: 1, content: __("Marketing Button", "header-footer-elementor"), iconFree: false, iconPro: true },
                { id: 2, content: __("Pricing Table", "header-footer-elementor"), iconFree: false, iconPro: true },
                { id: 3, content: __("Price List", "header-footer-elementor"), iconFree: false, iconPro: true },
                { id: 4, content: __("Countdown Timer", "header-footer-elementor"), iconFree: false, iconPro: true },
                { id: 5, content: __("Business Hours", "header-footer-elementor"), iconFree: false, iconPro: true },
                { id: 6, content: __("Modal Popup", "header-footer-elementor"), iconFree: false, iconPro: true },
            ],
        },
        {
            title: __("E-Commerce Integration", "header-footer-elementor"),
            items: [
                { id: 1, content: __("WooCommerce: Add to Cart", "header-footer-elementor"), iconFree: false, iconPro: true },
                { id: 2, content: __("WooCommerce: Product Category", "header-footer-elementor"), iconFree: false, iconPro: true },
                { id: 3, content: __("WooCommerce: Mini Cart", "header-footer-elementor"), iconFree: false, iconPro: true },
                { id: 4, content: __("WooCommerce: Product", "header-footer-elementor"), iconFree: false, iconPro: true },
                { id: 5, content: __("WooCommerce: Checkout", "header-footer-elementor"), iconFree: false, iconPro: true },
            ],
        },
        {
            title: __("Forms Integration", "header-footer-elementor"),
            items: [
                { id: 1, content: __("Contact Form 7", "header-footer-elementor"), iconFree: false, iconPro: true },
                { id: 2, content: __("Gravity Forms", "header-footer-elementor"), iconFree: false, iconPro: true },
                { id: 3, content: __("WPForms", "header-footer-elementor"), iconFree: false, iconPro: true },
                { id: 4, content: __("Fluent Forms", "header-footer-elementor"), iconFree: false, iconPro: true },
            ],
        },
        {
            title: __("SEO Widgets", "header-footer-elementor"),
            items: [
                { id: 1, content: __("FAQ with Schema", "header-footer-elementor"), iconFree: false, iconPro: true },
                { id: 2, content: __("How-To", "header-footer-elementor"), iconFree: false, iconPro: true },
                { id: 3, content: __("Table of Contents", "header-footer-elementor"), iconFree: false, iconPro: true },
                { id: 4, content: __("Business Reviews", "header-footer-elementor"), iconFree: false, iconPro: true },
            ],
        },
        {
            title: __("Creative Features", "header-footer-elementor"),
            items: [
                { id: 1, content: __("Presets", "header-footer-elementor"), iconFree: false, iconPro: true },
                { id: 2, content: __("Welcome Music", "header-footer-elementor"), iconFree: false, iconPro: true },
                { id: 3, content: __("Particles", "header-footer-elementor"), iconFree: false, iconPro: true },
                { id: 4, content: __("Party Propz", "header-footer-elementor"), iconFree: false, iconPro: true },
                { id: 5, content: __("Shape Divider", "header-footer-elementor"), iconFree: false, iconPro: true }
            ],
        },
        {
            title: __("Social Media Integration", "header-footer-elementor"),
            items: [
                { id: 1, content: __("Instagram Feed", "header-footer-elementor"), iconFree: false, iconPro: true },
                { id: 2, content: __("Twitter Feed", "header-footer-elementor"), iconFree: false, iconPro: true },
                { id: 3, content: __("Social Share", "header-footer-elementor"), iconFree: false, iconPro: true },
            ],
        },
        {
            title: __("Advanced Features", "header-footer-elementor"),
            items: [
                { id: 1, content: __("Retina Image", "header-footer-elementor"), iconFree: false, iconPro: true },
                { id: 2, content: __("Team Member", "header-footer-elementor"), iconFree: false, iconPro: true },
                { id: 3, content: __("Post Layout", "header-footer-elementor"), iconFree: false, iconPro: true },
                { id: 4, content: __("Off Canvas", "header-footer-elementor"), iconFree: false, iconPro: true },
            ],
        },
    ];

    const renderIcon = (isAvailable) =>
        isAvailable ? <Check color="#16A34A" /> : <X color="#DC2626" />;

    const renderItems = (items) =>
        items.map((item) => (
            <div
                key={item.id}
                className="flex fle-row py-4 px-5 items-center h-4 justify-between rounded-lg shadow-container-item"
            >
                <p className="text-sm text-text-secondary font-medium">
                    {item.content}
                </p>
                <div className="flex flex-row items-center justify-between" style={{ gap: item.id === 10 && item.content === __("Navigation Menu", "header-footer-elementor") ? "10.7rem" : "12rem" }}>
                    <p className="text-sm text-text-primary font-medium">
                        {item.id === 10 && item.content === __("Navigation Menu", "header-footer-elementor")
                            ? item.iconPro
                                ? __("Advanced", "header-footer-elementor")
                                : __("Basic", "header-footer-elementor")
                            : renderIcon(item.iconFree)}
                    </p>
                    <p
                        className="text-sm text-text-primary font-medium"
                        style={{ marginRight: item.id === 10 && item.content === __("Navigation Menu", "header-footer-elementor") ? "25px" : "50px" }}
                    >
                        {item.id === 10 && item.content === __("Navigation Menu", "header-footer-elementor")
                            ? item.iconPro
                                ? __("Basic", "header-footer-elementor")
                                : __("Advanced", "header-footer-elementor")
                            : renderIcon(item.iconPro)}
                    </p>
                </div>
            </div>
        ));

    return (
        <div className="rounded-lg bg-white w-full mb-6">
            <div
                className="flex items-center justify-between p-5"
                style={{ paddingBottom: "0" }}
            >
                <div className="flex flex-col">
                    <p className="m-0 text-xl font-semibold pt-4 text-text-primary">
                        {__("Free Vs Pro", "header-footer-elementor")}
                    </p>
                    <p className="m-0 text-sm font-normal pt-1 text-text-secondary">
                        {__("Ultimate Addons for Elementor Pro offers 50+ widgets and features!", "header-footer-elementor")}
                    </p>
                    <p className="m-0 text-sm font-normal pt-1 text-text-secondary">
                        {__(
                            "Compare the popular features/widgets to find the best option for your website.",
                            "header-footer-elementor"
                        )}
                    </p>
                </div>
                <div className="flex items-center gap-x-2 mr-7">
                    <Button
                        iconPosition="right"
                        variant="primary"
                        style={{
                            color: "white",
                            borderColor: "#6005FF",
                            transition: "color 0.3s ease, border-color 0.3s ease",
                            backgroundColor: "#6005ff",
                        }}
                        className="hfe-remove-ring text-[#6005FF]"
                        onClick={() => {
                            window.open(
                                "https://ultimateelementor.com/pricing/?utm_source=uae-lite-FreevsPro&utm_medium=get-uae-pro&utm_campaign=uae-lite-upgrade",
                                "_blank"
                            );
                        }}
                    >
                        {__("Get Full Toolkit", "header-footer-elementor")}
                    </Button>
                </div>
            </div>
            <div className="px-4">
                <div className="flex flex-col space-y-2 pt-5">
                    {sections.map((section) => (
                        <React.Fragment key={section.title}>
                            <div
                                className="flex fle-row py-4 px-5 items-center h-4 justify-between rounded-lg shadow-container-item"
                                style={{ backgroundColor: "#F9FAFB" }}
                            >
                                <p className="text-sm text-text-primary font-medium">
                                    {section.title}
                                </p>
                                <div
                                    className="flex flex-row items-center"
                                    style={{ gap: "12rem" }}
                                >
                                    <p className="text-sm text-text-primary font-medium">
                                        {__("Free", "header-footer-elementor")}
                                    </p>
                                    <p
                                        className="text-sm text-text-primary font-medium"
                                        style={{ marginRight: "50px" }}
                                    >
                                        {__("Pro", "header-footer-elementor")}
                                    </p>
                                </div>
                            </div>
                            {renderItems(section.items)}
                        </React.Fragment>
                    ))}
                           <div className="flex items-center justify-center gap-x-2 ">
					<a
						href="https://ultimateelementor.com/pricing-plans/?utm_source=uae-lite-dashboard&utm_medium=unlock-ultimate-feature&utm_campaign=uae-lite-upgrade"
						target="_blank"
						rel="noopener noreferrer"
						className="text-sm font-normal text-text-primary cursor-pointer no-underline"
						style={{ lineHeight: "1rem", paddingTop: "10px", paddingBottom: "20px", color: "#6005FF", textDecoration: "none", outline: "none", boxShadow: "none" }}
						onFocus={(e) => e.target.style.outline = "none"}
						onBlur={(e) => e.target.style.outline = "none"}
					>
						{__("See all UAE Pro Features", "header-footer-elementor")}
						<ArrowUpRight
							className="ml-1 font-semibold"
							size={14}
                            color="#6005FF"
						/>
					</a>
				</div>
                </div>
            </div>
        </div>
    );
};

export default FreevsPro;
