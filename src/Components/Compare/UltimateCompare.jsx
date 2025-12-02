import React from 'react';
import { Container, Title, Button } from '@bsf/force-ui';
import { Zap, Check } from 'lucide-react';
import { __ } from '@wordpress/i18n';

const UltimateCompare = () => {
	const featureData = [
		{
			id: 1,
			icon: '',
			title: __( 'Modal Popup', 'header-footer-elementor' ),
		},
		{
			id: 2,
			icon: '',
			title: __( 'Advanced Heading', 'header-footer-elementor' ),
		},
		{
			id: 3,
			icon: '',
			title: __( 'Post Layouts', 'header-footer-elementor' ),
		},
		{
			id: 4,
			icon: '',
			title: __( 'Info Box', 'header-footer-elementor' ),
		},
		{
			id: 5,
			icon: '',
			title: __( 'Pricing Cards', 'header-footer-elementor' ),
		},
		{
			id: 6,
			icon: '',
			title: __( 'Form Stylers and more…', 'header-footer-elementor' ),
		},
	];

	return (

		<div className="" style={ { paddingBottom: '16px' } }>
			<Container
				className="bg-background-primary gap-1 p-4 border-[0.5px] border-subtle rounded-xl shadow-sm"
				containerType="flex"
				direction="column"
				justify="between"
				gap="xs"
			>

				<Container.Item className="flex flex-col justify-center items-center">
					<img
						src={ `${ hfeSettingsData.column_url }` }
						alt={ __( 'Column Showcase', 'header-footer-elementor' ) }
						className="h-auto rounded w-1/2"
					/>
				</Container.Item>

				<Container.Item className="flex flex-col justify-between">
					<div>
						<Title
							description=""
							icon={ <Zap /> }
							iconPosition="left"
							size="xs"
							tag="p"
							title={ __( 'Unlock Ultimate Features', 'header-footer-elementor' ) }
							className="text-xs font-semibold text-brand-primary-600"
						/>
						<Title
							description=""
							icon={ '' }
							iconPosition="left"
							tag="h6"
							title={ __( 'Create Stunning Designs with the Pro Version!', 'header-footer-elementor' ) }
							className="py-1 text-sm"
						/>
						<p className="text-md m-0 text-text-secondary">
							{ __( 'Get access to advanced widgets and features to create the website that stands out!', 'header-footer-elementor' ) }
						</p>
					</div>
					<div className="grid grid-cols-2 grid-flow-row gap-1 my-4">
						{ featureData.map( ( feature ) => (
							<Title
								key={ feature.id }
								description=""
								icon={
									<Check className="text-brand-primary-600 mr-1 h-3 w-3" />
								}
								iconPosition="left"
								size="xs"
								tag="h6"
								title={ feature.title }
								className="text-md m-0 text-text-secondary hfe-compare-section"
							/>
						) ) }
					</div>
					<div className="">
						<Button
							iconPosition="right"
							variant="secondary"
							className="hfe-remove-ring"
							style={ { width: '100%' } }
							onClick={ () => {
								window.open( 'https://ultimateelementor.com/pricing/?utm_source=uae-lite-free-vs-pro&utm_medium=My-accounts&utm_campaign=uae-lite-upgrade', '_blank' );
							} }
						>
							{ __( 'Upgrade Now', 'header-footer-elementor' ) }
						</Button>
					</div>
				</Container.Item>
			</Container>
		</div>
	);
};

export default UltimateCompare;
