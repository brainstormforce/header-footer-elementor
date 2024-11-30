import React from "react";
import { Container, Button } from "@bsf/force-ui";
import { Check, X } from "lucide-react";
import { __ } from "@wordpress/i18n";

const FreevsPro = () => {
    const sections = [
        {
            title: __("Content Widgets", "header-footer-elementor"),
            items: [
                { id: 1, content: __("Breadcrumbs", "header-footer-elementor"), iconFree: true, iconPro: true },
                { id: 2, content: __("Price List", "header-footer-elementor"), iconFree: false, iconPro: true },
                { id: 3, content: __("Advanced Headings", "header-footer-elementor"), iconFree: false, iconPro: true },
                { id: 4, content: __("Toggle Button", "header-footer-elementor"), iconFree: false, iconPro: true },
                { id: 5, content: __("Business Hours", "header-footer-elementor"), iconFree: false, iconPro: true },
                { id: 6, content: __("Google Map", "header-footer-elementor"), iconFree: false, iconPro: true },
                { id: 7, content: __("Modal Popup", "header-footer-elementor"), iconFree: false, iconPro: true },
                { id: 8, content: __("Image Gallery", "header-footer-elementor"), iconFree: false, iconPro: true },
                { id: 9, content: __("Video Gallery", "header-footer-elementor"), iconFree: false, iconPro: true },
            ],
        },
        {
            title: __("SEO Widgets", "header-footer-elementor"),
            items: [
                { id: 1, content: __("Post Info", "header-footer-elementor"), iconFree: true, iconPro: true },
                { id: 2, content: __("Business Reviews", "header-footer-elementor"), iconFree: false, iconPro: true },
                { id: 3, content: __("How to", "header-footer-elementor"), iconFree: false, iconPro: true },
                { id: 4, content: __("FAQ", "header-footer-elementor"), iconFree: false, iconPro: true },
                { id: 5, content: __("Table of Contents", "header-footer-elementor"), iconFree: false, iconPro: true },
            ],
        },
        {
            title: __("Creative Features & Widgets", "header-footer-elementor"),
            items: [
                { id: 1, content: __("Scroll to Top", "header-footer-elementor"), iconFree: true, iconPro: true },
                { id: 2, content: __("Image Hotspot", "header-footer-elementor"), iconFree: false, iconPro: true },
                { id: 3, content: __("Content Timeline", "header-footer-elementor"), iconFree: false, iconPro: true },
                { id: 4, content: __("Countdown Timer", "header-footer-elementor"), iconFree: false, iconPro: true },
                { id: 5, content: __("Cross-site Copy Paste", "header-footer-elementor"), iconFree: false, iconPro: true },
                { id: 6, content: __("Welcome Music", "header-footer-elementor"), iconFree: false, iconPro: true },
                { id: 7, content: __("Conditional Display", "header-footer-elementor"), iconFree: false, iconPro: true },
            ],
        },
        {
            title: __("Form Integrations", "header-footer-elementor"),
            items: [
                { id: 1, content: __("Contact Form 7", "header-footer-elementor"), iconFree: false, iconPro: true },
                { id: 2, content: __("Gravity Forms", "header-footer-elementor"), iconFree: false, iconPro: true },
                { id: 3, content: __("WP Fluent", "header-footer-elementor"), iconFree: false, iconPro: true },
                { id: 4, content: __("WP Forms", "header-footer-elementor"), iconFree: false, iconPro: true },
            ],
        },
        {
            title: __("Social Widgets", "header-footer-elementor"),
            items: [
                { id: 1, content: __("Instagram", "header-footer-elementor"), iconFree: false, iconPro: true },
                { id: 2, content: __("X (Twitter)", "header-footer-elementor"), iconFree: false, iconPro: true },
                { id: 3, content: __("Social Share", "header-footer-elementor"), iconFree: false, iconPro: true },
            ],
        },
        {
            title: __("WooCommerce Widgets", "header-footer-elementor"),
            items: [
                { id: 1, content: __("Add To Cart", "header-footer-elementor"), iconFree: false, iconPro: true },
                { id: 2, content: __("Categories", "header-footer-elementor"), iconFree: false, iconPro: true },
                { id: 3, content: __("Checkout", "header-footer-elementor"), iconFree: false, iconPro: true },
                { id: 4, content: __("Mini Cart", "header-footer-elementor"), iconFree: false, iconPro: true },
                { id: 5, content: __("Products", "header-footer-elementor"), iconFree: false, iconPro: true },
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
                <div className="flex flex-row items-center" style={{ gap: "12rem" }}>
                    <p className="text-sm text-text-primary font-medium">
                        {renderIcon(item.iconFree)}
                    </p>
                    <p
                        className="text-sm text-text-primary font-medium"
                        style={{ marginRight: "50px" }}
                    >
                        {renderIcon(item.iconPro)}
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
                        {__("UAE Pro offers 50+ widgets and features!", "header-footer-elementor")}
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
                        {__("Get UAE Pro Now", "header-footer-elementor")}
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
                </div>
            </div>
        </div>
    );
};

export default FreevsPro;
