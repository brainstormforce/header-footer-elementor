import React, { useEffect } from 'react';
import { Container, Topbar, Button, ProgressSteps } from '@bsf/force-ui';
import { Link } from '../../router/link';
import { routes } from '../../admin/settings/routes';
import { X } from 'lucide-react';
import { __ } from '@wordpress/i18n';
import Build from './Build';
import Create from './Create';
import Welcome from './WelcomeNew';
import Configure from './ExtendOnboarding';
import Features from './Features';

// Full steps array including the hidden "Success" step
const allSteps = [
	{ label: '', component: Welcome },
	{ label: '', component: Configure },
	{ label: '', component: Features },
	{ label: '', component: Create }, // Hidden from progress bar
];

// Only visible steps for the top progress bar
const visibleSteps = allSteps.slice( 0, 4 ); // Exclude "Success"

const Onboarding = () => {
	const [ currentStep, setCurrentStep ] = React.useState( () => {
		const savedStep = localStorage.getItem( 'currentStep' );
		return savedStep ? parseInt( savedStep, 10 ) : 1;
	} );

	useEffect( () => {
		localStorage.setItem( 'currentStep', currentStep );
	}, [ currentStep ] );

	useEffect( () => {
		const timer = setTimeout( () => {
			localStorage.removeItem( 'currentStep' );
		}, 180000 ); // 3 minutes

		return () => clearTimeout( timer );
	}, [] );

	const StepComponent = allSteps[ currentStep - 1 ]?.component;

	return (
		<div>
			<div className="w-full">
				<div className="flex flex-col items-center justify-center" style={ { marginTop: '-38px', marginBottom: '24px' } }>
					<Topbar className="bg-none" style={ { background: 'none' } }>
						<Topbar.Left>
							<Topbar.Item>
								{ hfeSettingsData.icon_svg && (
									<Link to={ routes.dashboard.path }>
										<img
											src={ `${ hfeSettingsData.icon_new }` }
											alt="Logo"
											className="cursor-pointer"
											style={ { height: '35px' } }
										/>
									</Link>
								) }
							</Topbar.Item>
						</Topbar.Left>
						<Topbar.Middle>
							<Topbar.Item>
								<ProgressSteps
									currentStep={ Math.min( currentStep, visibleSteps.length ) }
									className="uae-steps"
									variant="number"
									completedVariant="number"
								>
									{ visibleSteps.map( ( step, index ) => (
										<ProgressSteps.Step
											key={ index }
											className="font-bold"
											labelText={ step.label }
											size="md"
										/>
									) ) }
								</ProgressSteps>
							</Topbar.Item>
						</Topbar.Middle>
						<Topbar.Right>
							<Topbar.Item>
								<Link
									className="hfe-remove-ring"
									to={ routes.dashboard.path }
								>
									<div className="flex items-center cursor-pointer justify-center gap-1">
										<p style={ { fontSize: '0.9rem', color: '#111827' } }>{ __( 'Exit Guided Setup', 'header-footer-elementor' ) }</p>
										<Button
											icon={ <X className="size-4" /> }
											iconPosition="right"
											size="xs"
											variant="ghost"
											className="hfe-remove-ring"
										></Button>
									</div>
								</Link>
							</Topbar.Item>
						</Topbar.Right>
					</Topbar>
				</div>
			</div>

			<div className="flex items-center justify-center">
				{ StepComponent && (
					<StepComponent
						currentStep={ currentStep }
						setCurrentStep={ setCurrentStep }
					/>
				) }
			</div>
		</div>
	);
};

export default Onboarding;
