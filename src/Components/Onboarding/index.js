import React, { useEffect } from "react";
import { Container, Topbar, Button, ProgressSteps } from "@bsf/force-ui";
import { Link } from "../../router/link";
import { routes } from "../../admin/settings/routes";
import { X } from "lucide-react";
import { __ } from "@wordpress/i18n";
import Welcome from "./Welcome";
import Build from "./Build";
import Configure from "./Configure";
import Success from "./Success";

const steps = [
    { label: "Welcome", component: Welcome },
    { label: "Configure", component: Configure },
    { label: "Create", component: Build },
	// { label: "Create", component: Success },
];

const Onboarding = () => {
    const [currentStep, setCurrentStep] = React.useState(() => {
        const savedStep = localStorage.getItem("currentStep");
        return savedStep ? parseInt(savedStep, 10) : 1;
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
        <div>
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
                                <Link  className="uael-remove-ring"  to={routes.dashboard.path}>
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

            <div className="flex items-center justify-center">
                {StepComponent && (
                    <StepComponent setCurrentStep={setCurrentStep} />
                )}
            </div>
        </div>
    );
};

export default Onboarding;
