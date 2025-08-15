import React, { useState } from "react";
import { __ } from "@wordpress/i18n";

const UpgradeNotice = () => {
    // Check if upgrade notice was dismissed (handled by PHP via WordPress options)
    const [showNotice, setShowNotice] = useState(() => {
        return !(window.hfe_admin_data && window.hfe_admin_data.upgrade_notice_dismissed);
    });

    // Function to handle closing the upgrade notice
    const handleCloseUpgradeNotice = async () => {
        setShowNotice(false);
        
        if (!window.hfe_admin_data || !window.hfe_admin_data.ajax_url) {
            console.error('UpgradeNotice - hfe_admin_data not available');
            return;
        }
        
        try {
            const response = await fetch(window.hfe_admin_data.ajax_url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    action: 'hfe_dismiss_upgrade_notice',
                    nonce: window.hfe_admin_data.nonce,
                }),
            });

            const result = await response.json();
            if (result.success) {
                console.log('UpgradeNotice - Upgrade notice dismissed successfully');
            } else {
                console.error('UpgradeNotice - Failed to dismiss upgrade notice:', result.data);
            }
        } catch (error) {
            console.error('UpgradeNotice - AJAX error:', error);
        }
    };

    // Don't render anything if notice should not be shown
    if (!showNotice) {
        return null;
    }

    return (
        <div
            className="uae-upgrade p-3 d font-medium"
            style={{
                backgroundColor: "#E9E4FF",
                textAlign: "center",
                fontSize: "0.82rem",
                zIndex: "9",
                position: "relative",
            }}
        >
            <button
                onClick={handleCloseUpgradeNotice}
                style={{
                    position: "absolute",
                    top: "5px",
                    right: "10px",
                    background: "none",
                    border: "none",
                    fontSize: "24px",
                    cursor: "pointer",
                    color: "#000",
                    width: "32px", // Explicit width
                    height: "32px", // Explicit height for square dimensions
                    display: "flex", // Flexbox for centering
                    alignItems: "center", // Vertical centering
                    justifyContent: "center", // Horizontal centering
                }}
                aria-label={__("Close Upgrade Notice", "header-footer-elementor")}
            >
                &times;
            </button>
            <strong>
                {__(
                    "Unlock UAE's full potential!",
                    "header-footer-elementor"
                )}{" "}
            </strong>
            <span>
                {__(
                    "Get powerful widgets and faster performance",
                    "header-footer-elementor"
                )}{" "}
                <a
                    href="https://ultimateelementor.com/pricing/?utm_source=uae-lite-navbar&utm_medium=upgrade-now&utm_campaign=uae-lite-upgrade"
                    target="_blank"
                    style={{ color: "#000000" }}
                >
                    {__("Upgrade now", "header-footer-elementor")}
                </a>
            </span>
        </div>
    );
};

export default UpgradeNotice;
