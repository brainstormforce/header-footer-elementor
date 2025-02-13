import React from "react";
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
	// { label: "Create", component: Build },
	{ label: "Create", component: Success },
];

const Onboarding = () => {
	const [currentStep, setCurrentStep] = React.useState(1);
	const StepComponent = steps[currentStep - 1]?.component;

	return (
		<div>
			<div className="w-full pb-10">
				<div className="flex flex-col items-center justify-center">
					<Topbar className="bg-background-primary">
						<Topbar.Left>
							<Topbar.Item>
								{hfeSettingsData.uae_logo && (
									<Link to={routes.dashboard.path}>
										<img
											src={`${hfeSettingsData.icon_url}`}
											alt="Logo"
											className="ml-4 cursor-pointer"
										/>
									</Link>
								)}
							</Topbar.Item>
						</Topbar.Left>
						<Topbar.Middle>
							<Topbar.Item>
								<ProgressSteps currentStep={currentStep} variant="number">
									{steps.map((step, index) => (
										<ProgressSteps.Step key={index} className="font-bold" labelText={step.label} size="md" />
									))}
								</ProgressSteps>
							</Topbar.Item>
						</Topbar.Middle>
						<Topbar.Right>
							<Topbar.Item>
								<Button icon={<X className="size-4" />} iconPosition="right" size="xs" variant="ghost">
								</Button>
							</Topbar.Item>
						</Topbar.Right>
					</Topbar>
				</div>
			</div>

			<div className="flex items-center justify-center">
				{StepComponent && <StepComponent setCurrentStep={setCurrentStep} />}
			</div>
		</div>
	);
};

export default Onboarding;
