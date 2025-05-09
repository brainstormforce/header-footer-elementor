import React from 'react';
import { Button } from '@bsf/force-ui';
import { __ } from "@wordpress/i18n";

const Welcome = ({ setCurrentStep }) => {
    return (
        <div className="bg-background-primary border-[0.5px] items-start justify-center border-subtle rounded-xl shadow-sm mb-6 p-8 flex flex-col" style={{ maxWidth: '55%' }}>
            <div className="px-1">
                <div className="flex flex-col">
                    <h1 className="text-text-primary m-0 mb-2 hfe-65-width" style={{ fontSize: '1.6rem', lineHeight: '1.3em' }}>
                        <span className="block">{__(
                            "Thank You For Choosing",
                            "header-footer-elementor"
                        )}
                        </span>
                        <span className="block">{__(
                            "Ultimate Addons for Elementor",
                            "header-footer-elementor"
                        )}
                    </span>
                    </h1>
                    <span className="text-md font-medium text-text-tertiary m-0 mb-6 hfe-88-width" style={{ lineHeight: '1.5em' }}>
                        {__(
                            "We're excited to have you onboard. Get ready to create stunning headers, footers, and custom blocks with ease while keeping your website lightweight and fast.",
                            "header-footer-elementor"
                        )}
                    </span>
                </div>
                <img
                    alt="Welcome"
                    className="w-full h-auto mb-6 mt-2"
                    src={`${hfeSettingsData.welcome_banner}`}
                    loading="lazy"
                />
                <Button
                    iconPosition="right"
                    variant="primary"
                    className="bg-[#6005FF] hfe-remove-ring p-3 px-5 font-bold mt-2"
                    style={{
                        backgroundColor: "#6005FF",
                        transition: "background-color 0.3s ease",
                    }}
                    onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor =
                        "#4B00CC")
                    }
                    onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor =
                        "#6005FF")
                    }
                    onClick={() => setCurrentStep(2)}
                >
                    {__("Let's Get Started", "header-footer-elementor")}
                </Button>
            </div>
        </div>
    );
};

export default Welcome;