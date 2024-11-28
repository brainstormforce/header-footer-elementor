import React from "react";
import { Container, Button } from "@bsf/force-ui";
import { Check, X } from "lucide-react";

const FreevsPro = () => {
    const sections = [
        {
            title: "Content Widgets",
            items: [
                { id: 1, content: "Breadcrumbs", iconFree: true, iconPro: true },
                { id: 2, content: "Price List", iconFree: false, iconPro: true },
                { id: 3, content: "Advanced Headings", iconFree: false, iconPro: true },
                { id: 4, content: "Toggle Button", iconFree: false, iconPro: true },
                { id: 5, content: "Business Hours", iconFree: false, iconPro: true },
                { id: 6, content: "Google Map", iconFree: false, iconPro: true },
                { id: 7, content: "Modal Popup", iconFree: false, iconPro: true },
                { id: 8, content: "Image Gallery", iconFree: false, iconPro: true },
                { id: 9, content: "Video Gallery", iconFree: false, iconPro: true },
            ],
        },
        {
            title: "SEO Widgets",
            items: [
                { id: 1, content: "Post Info", iconFree: true, iconPro: true },
                { id: 2, content: "Business Reviews", iconFree: false, iconPro: true },
                { id: 3, content: "How to", iconFree: false, iconPro: true },
                { id: 4, content: "FAQ", iconFree: false, iconPro: true },
                { id: 5, content: "Table of Contents", iconFree: false, iconPro: true },
            ],
        },
        {
            title: "Creative Features & Widgets",
            items: [
                { id: 1, content: "Scroll to Top", iconFree: true, iconPro: true },
                { id: 2, content: "Image Hotspot", iconFree: false, iconPro: true },
                { id: 3, content: "Content Timeline", iconFree: false, iconPro: true },
                { id: 4, content: "Countdown Timer", iconFree: false, iconPro: true },
                { id: 5, content: "Cross-site Copy Paste", iconFree: false, iconPro: true },
                { id: 6, content: "Welcome Music", iconFree: false, iconPro: true },
                { id: 7, content: "Conditional Display", iconFree: false, iconPro: true },
            ],
        },
        {
            title: "Form Integrations",
            items: [
                { id: 1, content: "Contact Form 7", iconFree: false, iconPro: true },
                { id: 2, content: "Gravity Forms", iconFree: false, iconPro: true },
                { id: 3, content: "WP Fluent", iconFree: false, iconPro: true },
                { id: 4, content: "WP Forms", iconFree: false, iconPro: true },
            ],
        },
        {
            title: "Social Widgets",
            items: [
                { id: 1, content: "Instagram", iconFree: false, iconPro: true },
                { id: 2, content: "X (Twitter)", iconFree: false, iconPro: true },
                { id: 3, content: "Social Share", iconFree: false, iconPro: true },
            ],
        },
        {
            title: "WooCommerce Widgets",
            items: [
                { id: 1, content: "Add To Cart", iconFree: false, iconPro: true },
                { id: 2, content: "Categories", iconFree: false, iconPro: true },
                { id: 3, content: "Checkout", iconFree: false, iconPro: true },
                { id: 4, content: "Mini Cart", iconFree: false, iconPro: true },
                { id: 5, content: "Products", iconFree: false, iconPro: true },
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
                <p className="text-sm text-text-secondary font-medium">{item.content}</p>
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
                        Free Vs Pro
                    </p>
                    <p className="m-0 text-sm font-normal pt-1 text-text-secondary">
                        UAE Pro offers 50+ widgets and features!
                    </p>
                    <p className="m-0 text-sm font-normal pt-1 text-text-secondary">
                        Compare the popular features/widgets to find the best option for
                        your website.
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
                        Get UAE Pro Now
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
                                    <p className="text-sm text-text-primary font-medium">Free</p>
                                    <p
                                        className="text-sm text-text-primary font-medium"
                                        style={{ marginRight: "50px" }}
                                    >
                                        Pro
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
