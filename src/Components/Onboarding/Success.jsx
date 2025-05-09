import React, { useEffect } from 'react'
import { Container, Topbar, Button, ProgressSteps } from "@bsf/force-ui";
import { Link } from "../../router/index"
import { X } from "lucide-react";
import { __ } from "@wordpress/i18n";
import { routes } from "../../admin/settings/routes";
import { ArrowRight } from 'lucide-react';
import Welcome from "./Welcome";
import Build from "./Build";
import Configure from "./Configure";


const steps = [
    { label: "Welcome", component: Welcome },
    { label: "Configure", component: Configure },
    { label: "Create", component: Build },
    // { label: "Create", component: Success },
];

const Success = () => {
    const [currentStep, setCurrentStep] = React.useState(() => {
        const savedStep = localStorage.getItem("currentStep");
        return savedStep ? parseInt(savedStep, 10) : 3;
    });

    useEffect(() => {
        const targetUrl = "admin.php?page=hfe#dashboard";
    
        // Replace the current state with targetUrl (so back button goes there)
        window.history.replaceState(null, "", targetUrl);
    
        // Push another history state so that forward doesn't come back here
        window.history.pushState(null, "", window.location.href);
    
        const handlePopState = () => {
            // If the user tries to go back, send them to the dashboard
            window.location.href = targetUrl;
        };
    
        window.addEventListener("popstate", handlePopState);
    
        return () => {
            window.removeEventListener("popstate", handlePopState);
        };
    }, []);
    
    useEffect(() => {
        localStorage.setItem("currentStep", currentStep);
    }, [currentStep]);

    useEffect(() => {
        const timer = setTimeout(() => {
            localStorage.removeItem("currentStep");
        }, 180000); // 3 minutes in milliseconds

        return () => clearTimeout(timer); // Clear the timeout if the component unmounts
    }, []);

    const StepComponent = steps[currentStep - 1]?.component;

    return (
        <>
            <div className="w-full pb-10">
                <div className="flex flex-col items-center justify-center">
                    <Topbar className="bg-none" style={{ background: "none" }}>
                        <Topbar.Left>
                            <Topbar.Item>
                                {hfeSettingsData.icon_svg && (
                                    <Link to={routes.dashboard.path}>
                                        <img
                                            src={`${hfeSettingsData.icon_svg}`}
                                            alt="Logo"
                                            className="cursor-pointer"
                                            style={{ height: "35px" }}
                                        />
                                    </Link>
                                )}
                            </Topbar.Item>
                        </Topbar.Left>
                        <Topbar.Middle>
                            <Topbar.Item>
                                <ProgressSteps
                                    currentStep={currentStep}
                                    className="uae-steps"
                                    variant="number"
                                >
                                    {steps.map((step, index) => (
                                        <ProgressSteps.Step
                                            key={index}
                                            className="font-bold"
                                            labelText={step.label}
                                            size="md"
                                        />
                                    ))}
                                </ProgressSteps>
                            </Topbar.Item>
                        </Topbar.Middle>
                        <Topbar.Right>
                            <Topbar.Item>
                                <Link className="hfe-remove-ring" to={routes.dashboard.path}
                                    style={{ marginLeft: '125px' }}>
                                    {" "}
                                    <Button
                                        icon={<X className="size-4" />}
                                        iconPosition="right"
                                        size="xs"
                                        variant="ghost"
                                        className="hfe-remove-ring"
                                    ></Button>
                                </Link>
                            </Topbar.Item>
                        </Topbar.Right>
                    </Topbar>
                </div>
            </div>
            <div className='flex items-center justify-center'>

                <div className="bg-background-primary border-[0.5px] border-subtle rounded-xl shadow-sm" style={{ borderRadius: '4px' }}>
                    <div className="bg-background-primary items-start justify-center flex flex-col" style={{ borderRadius: '4px' }}>
                        <div>
                            <div className='flex justify-center items-center'
                                style={{
                                    backgroundImage: `url(${hfeSettingsData.success_banner})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    width: '100%', // Adjust width as needed
                                    height: '215px', // Adjust height as needed
                                    borderRadius: '4px'
                                }}>
                                <img
                                    alt="Success"
                                    className="flex"
                                    style={{ paddingTop: '3.5rem' }}
                                    src={`${hfeSettingsData.success_badge}`}
                                    loading="lazy"
                                />
                            </div>
                            <div className="p-6" style={{ paddingLeft: '2rem', paddingRight: '2rem' }}>
                                <div className="flex flex-col items-center justify-center gap-1">
                                    <p className="text-4xl font-bold text-text-primary m-0 mt-2" style={{ fontSize: '25px', paddingTop: '1.5rem', paddingBottom: '1rem' }}>
                                        {__(
                                            "Congratulations!",
                                            "header-footer-elementor"
                                        )}
                                    </p>
                                    <span className="block text-md font-medium text-text-tertiary m-0">
                                        {__(
                                            "You’ve unlocked a ",
                                            "header-footer-elementor"
                                        )}
                                        <span style={{ color: '#6005FF' }}>40%</span> {/* Apply color to 20% */}
                                        {__(
                                            " discount on UAE Pro. We’ve sent a discount",
                                            "header-footer-elementor"
                                        )}
                                    </span>
                                    <span className="block text-md font-medium text-text-tertiary m-0">
                                        {__(
                                            " coupon just for you to your email address.",
                                            "header-footer-elementor"
                                        )}
                                    </span>
                                </div>

                                <hr className="w-full border-b-0 border-x-0 border-t  border-solid border-t-border-subtle" style={{ marginTop: '2rem' }} />

                                <div className='flex flex-col items-center' style={{ paddingTop: '2rem' }}>
                                    <Button
                                        icon={<ArrowRight />}
                                        iconPosition="right"
                                        variant="primary"
                                        className="bg-[#6005FF] hfe-remove-ring w-full"
                                        style={{
                                            backgroundColor: "#6005FF",
                                            transition: "background-color 0.3s ease",
                                            padding: "0.8rem"
                                        }}
                                        onMouseEnter={(e) =>
                                        (e.currentTarget.style.backgroundColor =
                                            "#4B00CC")
                                        }
                                        onMouseLeave={(e) =>
                                        (e.currentTarget.style.backgroundColor =
                                            "#6005FF")
                                        }
                                        onClick={() => {
                                            window.open("https://ultimateelementor.com/pricing/?utm_source=uae-lite-settings&utm_medium=My-accounts&utm_campaign=uae-lite-upgrade", '_blank');
                                        }}
                                    >
                                        {__("Get Pro Now", "header-footer-elementor")}
                                    </Button>
                                    <Link
                                        to={routes.dashboard.path}
                                        onClick={(e) => {
                                            e.preventDefault(); // Prevent default navigation behavior

                                            // Completely wipe out history
                                            window.history.pushState(null, "", "admin.php?page=hfe#dashboard");
                                            window.history.replaceState(null, "", "admin.php?page=hfe#dashboard");

                                            // Push multiple history states to bury the previous ones
                                            for (let i = 0; i < 10; i++) {
                                                window.history.pushState(null, "", "admin.php?page=hfe#dashboard");
                                            }

                                            // Redirect to the dashboard
                                            window.location.href = "admin.php?page=hfe#dashboard";
                                        }}
                                    >
                                        <Button
                                            iconPosition="left"
                                            variant="link"
                                            style={{ paddingTop: '2rem', paddingBottom: '1rem' }}
                                            className="hfe-remove-ring text-text-primary"
                                        >
                                            {__("Go To The Dashboard", "header-footer-elementor")}
                                        </Button>
                                    </Link>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Success