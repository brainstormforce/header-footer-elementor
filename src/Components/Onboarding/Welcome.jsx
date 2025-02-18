import React from 'react';
import { Button } from '@bsf/force-ui';
import { __ } from "@wordpress/i18n";

const Welcome = ({ setCurrentStep }) => {
    return (
        <div className="">
            <div className=" bg-background-primary border-[0.5px] items-start justify-center border-subtle rounded-xl shadow-sm mb-6 p-8 flex flex-col">
                <div className="flex flex-col">
                    <p className="text-4xl font-bold text-text-primary m-0" style={{ fontSize: '30px', width: '58%', lineHeight:'38px' }}>
                        {__(
                            "Thank you for choosing Ultimate Addons for Elementor.",
                            "header-footer-elementor"
                        )}
                    </p>
                    <p className="text-md font-medium text-text-tertiary m-0" style={{ fontSize: '14px', width: '700px', lineHeight:'23px', paddingTop: '4px' }}>
                        {__(
                            "We're excited to have you onboard. Get ready to create stunning headers, footers, and custom blocks with ease while keeping your website lightweight and fast.",
                            "header-footer-elementor"
                        )}
                    </p>
                </div>
                <div className='' style={{ paddingTop: '30px' }}>
                    <img
                        alt="Welcome"
                        className=""
                        style={{ width: '100%', height: '300px' }}
                        src={`${hfeSettingsData.welcome_banner}`}
                    />
                </div>
                <div style={{ paddingTop: '30px' }}>
                    <Button
                        iconPosition="right"
                        variant="primary"
                        className="bg-[#6005FF] uael-remove-ring p-3 font-bold"
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
                        {__("Let’s Get Started", "header-footer-elementor")}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Welcome;