import React from "react";
import { __ } from "@wordpress/i18n";

const UpgradeNotice = ({ onClose }) => {
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
                onClick={onClose} // Call the passed onClose function when clicked
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
                    "Unlock Ultimate Addons For Elementor!  ",
                    "header-footer-elementor"
                )}
            </strong>
            <span>
                {__(
                    "Get exclusive features and unbeatable performance.  ",
                    "header-footer-elementor"
                )}{" "}
                <a
                    href="https://ultimateelementor.com/pricing/?utm_source=uae-lite-settings&utm_medium=My-accounts&utm_campaign=uae-lite-upgrade"
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
