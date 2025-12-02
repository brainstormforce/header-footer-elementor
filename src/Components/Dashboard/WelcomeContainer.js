import React from 'react';
import { Container, Title, Button } from '@bsf/force-ui';
import { ExternalLink, Plus } from 'lucide-react';
import HeaderLine from '@components/HeaderLine';
import { __ } from '@wordpress/i18n';

const WelcomeContainer = () => {
	return (
		<div>
			<Container
				align="center"
				className="bg-background-primary border-[0.5px] border-subtle rounded-xl shadow-sm mb-6 p-8 flex flex-col lg:flex-row"
				containerType="flex"
				direction="row"
				gap="sm"
			>
				<Container.Item shrink={ 1 } className="flex-1">
					<Title
						description=""
						icon={ null }
						iconPosition="right"
						className="max-w-lg"
						size="lg"
						tag="h3"
						title={ __( 'Welcome to Ultimate Addons for Elementor!', 'header-footer-elementor' ) }
					/>
					<p className="text-sm font-medium text-text-tertiary m-0 mt-2">
						{ __(
							'Effortlessly design modern websites with UAE using our powerful range of widgets & features. Get started by selecting an option based on your needs.',
							'header-footer-elementor',
						) }
					</p>
					<div className="flex items-center pt-6 gap-2 flex-wrap">
						<Button
							iconPosition="right"
							variant="primary"
							className="text-[#6005FF] border-none hfe-remove-ring flex-shrink-0"
							style={ {
								backgroundColor: 'var(--Colors-Button-button-secondary, #DDD6FE)',
								transition: 'background-color 0.3s ease',
								border: 'none',
								outline: 'none', // Removes the default outline
								boxShadow: 'none', // Removes the default box shadow
							} }
							onMouseEnter={ ( e ) => {
								e.currentTarget.style.backgroundColor = '#4B00CC';
								e.currentTarget.style.color = '#fff';
							} }
							onMouseLeave={ ( e ) => {
								e.currentTarget.style.backgroundColor = 'var(--Colors-Button-button-secondary, #DDD6FE)';
								e.currentTarget.style.color = '#6005FF';
							} }
							onClick={ () => {
								window.open(
									hfeSettingsData.hfe_post_url,
									'_blank',
								);
							} }
						>
							{ __( 'Create Header/Footer', 'header-footer-elementor' ) }
						</Button>
						<Button
							icon={ <Plus /> }
							iconPosition="right"
							variant="outline"
							className="hfe-remove-ring flex-shrink-0"
							style={ {
								color: '#000',
								borderColor: '#E9DFFC',
							} }
							onMouseEnter={ ( e ) =>
								( e.currentTarget.style.color =
									'#000000' )
							}
							onMouseLeave={ ( e ) =>
								( e.currentTarget.style.color =
									'#000' ) &&
								( e.currentTarget.style.borderColor =
									'#E9DFFC' )
							}
							onClick={ () => {
								window.open(
									hfeSettingsData.elementor_page_url,
									'_blank',
								);
							} }
						>
							{ __( 'Create New Page', 'header-footer-elementor' ) }
						</Button>
						<div
							style={ {
								color: 'black',
								background: 'none',
								border: 'none',
								padding: 0,
								cursor: 'pointer',
							} }
							className="flex-shrink-0"
							onMouseEnter={ ( e ) =>
								( e.currentTarget.style.color = '#6005ff' )
							}
							onMouseLeave={ ( e ) =>
								( e.currentTarget.style.color = 'black' )
							}
							onClick={ () => {
								window.open(
									'https://ultimateelementor.com/docs/getting-started-with-ultimate-addons-for-elementor-lite/',
									'_blank',
								);
							} }
						>
						</div>
					</div>
				</Container.Item>
				<Container.Item className="md:mt-0 mt-4 flex-shrink-0">
					<iframe
						width="280"
						height="160"
						src="https://www.youtube.com/embed/ZeogOxqdKJI"
						frameBorder="0"
						style={ { borderRadius: '8px' } }
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
						allowFullScreen
					/>
				</Container.Item>
			</Container>
		</div>
	);
};
export default WelcomeContainer;
