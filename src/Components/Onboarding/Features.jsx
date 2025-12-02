import React, { useState, useEffect } from 'react';
import {
	Container,
	Title,
	Switch,
	Button,
	Dialog,
	Input,
	Badge,
} from '@bsf/force-ui';
import { __, sprintf } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import { Link } from '../../router/index';
import { routes } from '../../admin/settings/routes';

const Features = ( { setCurrentStep } ) => {
	const [ selectedFeatures, setSelectedFeatures ] = useState( {
		headerFooterBuilder: false,
		megaMenu: false,
		modalPopup: false,
		wooCommerceWidgets: false,
		premiumWidgets: false,
	} );

	const handleFeatureChange = ( featureName ) => {
		setSelectedFeatures( ( prev ) => ( {
			...prev,
			[ featureName ]: ! prev[ featureName ],
		} ) );
	};

	const hasFreeFeaturesSelected =
		selectedFeatures.headerFooterBuilder || selectedFeatures.megaMenu;
	const hasProFeaturesSelected =
		selectedFeatures.modalPopup ||
		selectedFeatures.wooCommerceWidgets ||
		selectedFeatures.premiumWidgets;
	const hasAnyFeatureSelected =
		hasFreeFeaturesSelected || hasProFeaturesSelected;

	const handleUpgrade = () => {
		window.open( 'https://ultimateelementor.com/pricing/?utm_source=wp-admin&utm_medium=onboarding&utm_campaign=uae-upgrade', '_blank' );
	};

	return (
		<>
			<style>
				{ `
                    .uae-role-checkbox {
                        position: relative;
                        width: 30px;
                        height: 30px;
                        -webkit-appearance: none;
                        appearance: none;
                        border: 2px solid #d1d5db; /* gray-300 */
                        border-radius: 4px;
                        cursor: pointer;
                        outline: none;
                    }

                    .uae-role-checkbox:focus {
                        outline: none;
                        box-shadow: none;
                    }

                    .uae-role-checkbox:checked {
                        background-color: #5C2EDE;
                        border-color: #0017E1;
                        outline: none;
                    }

                    .uae-role-checkbox:checked::after {
                        content: '';
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        width: 4px;
                        height: 8px;
                        border-right: 2px solid #fff;
                        border-bottom: 2px solid #fff;
                        transform: translate(-50%, -60%) rotate(45deg);
                    }
                ` }
			</style>
			<div
				className="box-border bg-background-primary p-6 rounded-lg"
				style={ {
					width: '42.625rem',
				} }
			>
				<p
					className="text-text-primary m-0 mb-2 hfe-65-width"
					style={ {
						fontSize: '24px',
						lineHeight: '1.3em',
					} }
				>
					{ __(
						'Select Your Features',
						'header-footer-elementor',
					) }
				</p>
				<span
					className="text-sm font-normal text-text-secondary"
					style={ { lineHeight: '1.5em' } }
				>
					{ __(
						'Unlock more design control, faster setup, and powerful customization—so you can build a better website, effortlessly.',
						'header-footer-elementor',
					) }
				</span>
				<div className="relative" style={ { marginTop: '20px' } }>
					<div
						className="flex items-center justify-between gap-3 mt-5 cursor-pointer"
						onClick={ ( e ) => {
							// Toggle checkbox
							handleFeatureChange( 'headerFooterBuilder' );
						} }
					>
						<div className="flex flex-col space-y-1 flex-1">
							<div className="flex items-center justify-start gap-1">
								<div className="text-sm font-normal m-0">
									{ __(
										'Header & Footer Builder',
										'header-footer-elementor',
									) }
								</div>
								<Badge
									label={ __(
										'Free',
										'header-footer-elementor',
									) }
									size="xs"
									type="pill"
									variant="green"
								/>
							</div>
							<div
								className="text-sm font-normal m-0"
								style={ { maxWidth: '90%', color: '#9CA3AF' } }
							>
								{ sprintf(
									__(
										'Assign headers and footers to specific pages or post types. Gives users complete layout control—something typically locked behind Pro plugins.',
										'header-footer-elementor',
									),
								) }
							</div>
						</div>
						<div
							className="flex-shrink-0"
						>
							<input
								type="checkbox"
								checked={ selectedFeatures.headerFooterBuilder }
								onClick={ ( e ) => e.stopPropagation() }
								onChange={ () => handleFeatureChange( 'headerFooterBuilder' ) }
								className="uae-role-checkbox w-5 h-5 outline-none"
								style={ {
									accentColor: '#240064',
									width: '18px',
									height: '18px',
								} }
							/>
						</div>
					</div>
				</div>

				<hr
					className="w-full border-b-0 border-x-0 border-t border-solid border-t-border-subtle"
					style={ {
						marginTop: '10px',
						marginBottom: '10px',
						borderColor: '#E5E7EB',
					} }
				/>

				<div
					className="flex items-center justify-between gap-3 cursor-pointer"
					onClick={ () => handleFeatureChange( 'megaMenu' ) }
				>
					<div className="flex flex-col space-y-1 flex-1">
						<div className="flex items-center justify-start gap-1">
							<div className="text-sm font-normal m-0">
								{ __(
									'Mega Menu & Navigation Widget',
									'header-footer-elementor',
								) }
							</div>
							<Badge
								label={ __( 'Free', 'header-footer-elementor' ) }
								size="xs"
								type="pill"
								variant="green"
							/>
						</div>
						<div
							style={ { color: '#9CA3AF' } }
							className="text-sm font-normal m-0"
						>
							{ sprintf(
								__(
									'Save hours by copying Elementor sections, widgets, or pages from one website to another—no need to rebuild layouts from scratch.',
									'header-footer-elementor',
								),
							) }
						</div>
					</div>
					<div className="flex-shrink-0">
						<input
							type="checkbox"
							checked={ selectedFeatures.megaMenu }
							onClick={ ( e ) => e.stopPropagation() }
							onChange={ () => handleFeatureChange( 'megaMenu' ) }
							className="uae-role-checkbox w-5 h-5"
							style={ {
								accentColor: '#240064',
								width: '18px',
								height: '18px',
							} }
						/>
					</div>
				</div>

				<hr
					className="w-full border-b-0 border-x-0 border-t border-solid border-t-border-subtle"
					style={ {
						marginTop: '10px',
						marginBottom: '10px',
						borderColor: '#E5E7EB',
					} }
				/>

				<div
					className="flex items-center justify-between gap-3 cursor-pointer"
					onClick={ () => handleFeatureChange( 'modalPopup' ) }
				>
					<div className="flex flex-col space-y-1 flex-1">
						<div className="flex items-center justify-start gap-1">
							<div className="text-sm font-normal m-0">
								{ __( 'Modal Popup', 'header-footer-elementor' ) }
							</div>
							<Badge
								label={ __( 'Pro', 'header-footer-elementor' ) }
								size="xs"
								type="pill"
								variant="inverse"
							/>
						</div>
						<div
							style={ { color: '#9CA3AF' } }
							className="text-sm font-normal m-0"
						>
							{ sprintf(
								__(
									'Design eye-catching popups directly in Elementor—collect leads, display promotions, or show messages without needing a separate popup plugin.',
									'header-footer-elementor',
								),
							) }
						</div>
					</div>
					<div className="flex-shrink-0">
						<input
							type="checkbox"
							checked={ selectedFeatures.modalPopup }
							onClick={ ( e ) => e.stopPropagation() }
							onChange={ () => handleFeatureChange( 'modalPopup' ) }
							className="uae-role-checkbox w-5 h-5"
							style={ {
								accentColor: '#240064',
								width: '18px',
								height: '18px',
							} }
						/>
					</div>
				</div>

				<hr
					className="w-full border-b-0 border-x-0 border-t border-solid border-t-border-subtle"
					style={ {
						marginTop: '10px',
						marginBottom: '10px',
						borderColor: '#E5E7EB',
					} }
				/>

				<div
					className="flex items-center justify-between gap-3 cursor-pointer"
					onClick={ () => handleFeatureChange( 'wooCommerceWidgets' ) }
				>
					<div className="flex flex-col space-y-1 flex-1">
						<div className="flex items-center justify-start gap-1">
							<div className="text-sm font-normal m-0">
								{ __( 'WooCommerce Widgets', 'header-footer-elementor' ) }
							</div>
							<Badge
								label={ __( 'Pro', 'header-footer-elementor' ) }
								size="xs"
								type="pill"
								variant="inverse"
							/>
						</div>
						<div
							style={ { color: '#9CA3AF' } }
							className="text-sm font-normal m-0"
						>
							{ __(
								'Design eye-catching popups directly in Elementor—collect leads, display promotions, or show messages without needing a separate popup plugin.',
								'header-footer-elementor',
							) }
						</div>
					</div>
					<div className="flex-shrink-0">
						<input
							type="checkbox"
							checked={ selectedFeatures.wooCommerceWidgets }
							onClick={ ( e ) => e.stopPropagation() }
							onChange={ () => handleFeatureChange( 'wooCommerceWidgets' ) }
							className="uae-role-checkbox w-5 h-5"
							style={ {
								accentColor: '#240064',
								width: '18px',
								height: '18px',
							} }
						/>
					</div>
				</div>
				<hr
					className="w-full border-b-0 border-x-0 border-t border-solid border-t-border-subtle"
					style={ {
						marginTop: '10px',
						marginBottom: '10px',
						borderColor: '#E5E7EB',
					} }
				/>
				<div
					className="flex items-center justify-between gap-3 cursor-pointer"
					onClick={ () => handleFeatureChange( 'premiumWidgets' ) }
				>
					<div className="flex flex-col space-y-1 flex-1">
						<div className="flex items-center justify-start gap-1">
							<div className="text-sm font-normal m-0">
								{ __(
									'50+ Premium Widgets & 200+ Templates',
									'header-footer-elementor',
								) }
							</div>
							<Badge
								label={ __( 'Pro', 'header-footer-elementor' ) }
								size="xs"
								type="pill"
								variant="inverse"
							/>
						</div>
						<div
							style={ { color: '#9CA3AF' } }
							className="text-sm font-normal m-0"
						>
							{ __(
								'Design eye-catching popups directly in Elementor—collect leads, display promotions, or show messages without needing a separate popup plugin.',
								'header-footer-elementor',
							) }
						</div>
					</div>
					<div className="flex-shrink-0">
						<input
							type="checkbox"
							checked={ selectedFeatures.premiumWidgets }
							onClick={ ( e ) => e.stopPropagation() }
							onChange={ () => handleFeatureChange( 'premiumWidgets' ) }
							className="uae-role-checkbox w-5 h-5"
							style={ {
								accentColor: '#240064',
								width: '18px',
								height: '18px',
							} }
						/>
					</div>
				</div>
				<div className="flex justify-between items-center px-2 hfe-onboarding-bottom" style={ { paddingTop: '30px' } }>
					<Button
						className="flex items-center gap-1 outline-none hfe-remove-ring"
						icon={ <ChevronLeft /> }
						variant="outline"
						onClick={ () => setCurrentStep( 2 ) }
					>
						{ __( 'Back', 'header-footer-elementor' ) }
					</Button>
					<div className="flex justify-start text-text-tertiary items-center gap-3">
						<Button
							className="hfe-remove-ring text-text-tertiary"
							variant="ghost"
							onClick={ () => setCurrentStep( 4 ) }
						>
							{ ' ' }
							{ __( 'Skip', 'header-footer-elementor' ) }
						</Button>
						{ hasProFeaturesSelected ? (
							<Button
								className="flex items-center gap-1 hfe-remove-ring"
								icon={ <ChevronRight /> }
								iconPosition="right"
								style={ {
									backgroundColor: '#5C2EDE',
									transition: 'background-color 0.3s ease',
									padding: '12px',
								} }
								onClick={ handleUpgrade }
							>
								{ __( 'Upgrade', 'header-footer-elementor' ) }
							</Button>
						) : (
							<Button
								className="flex items-center gap-1 hfe-remove-ring"
								icon={ <ChevronRight /> }
								iconPosition="right"
								style={ {
									backgroundColor: '#5C2EDE',
									transition: 'background-color 0.3s ease',
									padding: '12px',
								} }
								onClick={ () => setCurrentStep( 4 ) }
							>
								{ __( 'Next', 'header-footer-elementor' ) }
							</Button>
						) }
					</div>
				</div>
				{ hasProFeaturesSelected && (
					<div
						className="mt-4 p-3 rounded-lg border border-gray-400 bg-gray-50"
						style={ {
							backgroundColor: '#F9FAFB',
							borderColor: '#E5E7EB',
							marginTop: '16px',
						} }
					>
						<div className="text-sm border border-gray-400 text-gray-700 font-medium">
							{ __(
								"You've picked Pro features — upgrade to start using them.",
								'header-footer-elementor',
							) }
						</div>
					</div>
				) }
			</div>
		</>
	);
};

export default Features;
