import React, { useEffect } from 'react'
import { Container, Topbar, Button, ProgressSteps } from "@bsf/force-ui";
import { Link } from "../../router/index"
import { X } from "lucide-react";
import { __ } from "@wordpress/i18n";
import { routes } from "../../admin/settings/routes";
import { MoveRight } from 'lucide-react';
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
                                {hfeSettingsData.uae_logo && (
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
                                <Link className="uael-remove-ring" to={routes.dashboard.path}>
                                    {" "}
                                    <Button
                                        icon={<X className="size-4" />}
                                        iconPosition="right"
                                        size="xs"
                                        variant="ghost"
                                        className="uael-remove-ring"
                                    ></Button>
                                </Link>
                            </Topbar.Item>
                        </Topbar.Right>
                    </Topbar>
                </div>
            </div>
            <div className='flex items-center justify-center'>

                <div className="bg-background-primary border-[0.5px] border-subtle rounded-xl shadow-sm" style={{ height: '65vh', width: '40%' }}>
                    <div className="bg-background-primary items-start justify-center p-8 flex flex-col">
                        <div style={{
                            backgroundImage: `url(${hfeSettingsData.success_banner})`,
                            backgroundSize: 'contain',
                            backgroundPosition: 'center',
                            width: '100%', // Adjust width as needed
                            height: '150px' // Adjust height as needed
                        }} >
                            <div className='flex justify-center items-center'>
                                <img
                                    alt="Success"
                                    className="flex"
                                    src={`${hfeSettingsData.success_badge}`}
                                />
                            </div>

                            <div className="flex flex-col items-center justify-center gap-1">
                                <p className="text-4xl font-bold text-text-primary m-0" style={{ fontSize: '25px', paddingTop: '30px' }}>
                                    {__(
                                        "Congratulations!",
                                        "header-footer-elementor"
                                    )}
                                </p>
                                <p className="text-md font-medium text-text-tertiary m-0" style={{ fontSize: '16px', paddingTop: '16px' }}>
                                    {__(
                                        "You’ve unlocked a ",
                                        "header-footer-elementor"
                                    )}
                                    <span className='italic' style={{ color: '#6005FF', fontWeight: 'bold' }}>20%</span>
                                    {__(
                                        " discount on UAE Pro. We’ve sent a discount",
                                        "header-footer-elementor"
                                    )}
                                </p>
                                <p className="text-md font-medium text-text-tertiary m-0" style={{ fontSize: '16px' }}>
                                    {__(
                                        "coupon just for you to your email address.",
                                        "header-footer-elementor"
                                    )}
                                </p>
                                <p className="text-md font-medium italic text-text-primary m-0 mt-2" style={{ fontSize: '14px' }}>
                                    <span style={{ color: 'red' }}>*</span>
                                    {__(
                                        " Use your exclusive discount code within the next 2 hours to claim your reward!”",
                                        "header-footer-elementor"
                                    )}
                                </p>
                            </div>

                            <hr className="w-full border-b-0 border-x-0 border-t  border-solid border-t-border-subtle" style={{ marginTop: '40px' }} />

                            <div className='flex flex-col items-center' style={{ paddingTop: '40px' }}>
                                <Button
                                    icon={<MoveRight />}
                                    iconPosition="right"
                                    variant="primary"
                                    className="bg-[#6005FF] p-4 uael-remove-ring w-full"
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
                                    {__("Get Pro", "header-footer-elementor")}
                                </Button>


                                <Link
                                    to={routes.dashboard.path}

                                >
                                    <Button
                                        iconPosition="left"
                                        variant="link"
                                        style={{ paddingTop: '40px' }}
                                        className="uael-remove-ring text-text-primary"
                                        onMouseEnter={(e) =>
                                            (e.currentTarget.style.color =
                                                "#000000") &&
                                            (e.currentTarget.style.borderColor =
                                                "#000000")
                                        }
                                        onMouseLeave={(e) =>
                                            (e.currentTarget.style.color =
                                                "#6005FF") &&
                                            (e.currentTarget.style.borderColor =
                                                "#6005FF")
                                        }

                                    >
                                        {__("Go the the Dashboard", "header-footer-elementor")}
                                    </Button>
                                </Link>


                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Success
