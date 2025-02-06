import React from 'react';
import { Container, Button } from '@bsf/force-ui';
import { __ } from "@wordpress/i18n";

const Welcome = ({ setCurrentStep }) => {
    return (
        <div className="bg-background-secondary">
            <div className="bg-background-primary border-[0.5px] items-start justify-center border-subtle rounded-xl shadow-sm mb-6 p-8 flex flex-col" style={{ width: '921px'}}>
                <Container className="flex flex-col">
                    <p className="text-4xl font-bold text-text-primary m-0 mt-2" style={{ fontSize: '40px', width: '622px' }}>
                        {__(
                            "Thank you for choosing Ultimate Addons for Elementor.",
                            "uael"
                        )}
                    </p>
                    <p className="text-md font-medium text-text-tertiary m-0 mt-2" style={{ fontSize: '16px', width: '700px' }}>
                        {__(
                            "We're excited to have you onboard. Get ready to create stunning headers, footers, and custom blocks with ease while keeping your website lightweight and fast. Refer the video for a quick tour.",
                            "uael"
                        )}
                    </p>
                </Container>
                <div className='' style={{ paddingTop: '30px' }}>
                    <img
                        alt="Welcome"
                        className=""
                        src={`${hfeSettingsData.welcome_banner}`}
                    />
                </div>
                <div style={{ paddingTop: '30px' }}>
                    <Button
                        iconPosition="right"
                        variant="primary"
                        className="bg-[#6005FF] uael-remove-ring"
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
                        {__("Let’s Get Started", "uael")}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Welcome;