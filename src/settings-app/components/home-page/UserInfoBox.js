import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import WelcomePage from '@SettingsApp/pages/WelcomePage';
import './UserInfoBox.scss';
import { __ } from '@wordpress/i18n';

function UserInfoBox() {
	const [ openVideoModel, setOpenVideoModel ] = useState( false );

	const HandleClickEvent = ( e ) => {
		e.preventDefault();
		setOpenVideoModel( ! openVideoModel );
	};

	return (
		<div className="wcf-metabox wcf-user-info -mt-8 -mx-8 p-8 bg-white">
			<div className="wcf-metabox__header mb-8">
				<div className="wcf-metabox__title">
					<h1 className="text-2xl font-semibold text-gray-800">
						{ __( 'Welcome to CartFlows ', 'cartflows' ) }
					</h1>
				</div>
				<p className="mt-1 text-sm font-regular text-gray-600">
					{ __(
						'Sales funnel builder turns your WordPress website into an optimized selling machine.',
						'cartflows'
					) }
				</p>
			</div>
			<div className="wcf-metabox__body grid grid-flow-row auto-rows-min grid-cols-4 gap-6 sm:grid-cols-4 pt-6">
				{ /* Intro Box */ }
				<div className="wcf-intro-box flex justify-between gap-6 bg-primary-25 border border-orange-500 rounded-lg p-6 col-span-2">
					<div className="wcf-intro-content">
						<h3 className="text-xl font-semibold text-gray-800">
							{ __( 'Create your first funnel', 'cartflows' ) }
						</h3>
						<div className="mt-2 lg:mt-6 sm:max-w-sm lg:max-w-lg">
							<p className="text-md font-regular text-gray-600">
								{ __(
									'A sales funnel is the sequence of steps a buyer takes to make a purchase. CartFlows helps optimize funnels to turn visitors into customers.',
									'cartflows'
								) }
							</p>
						</div>
						<div className="mt-5 lg:mt-6">
							<Link
								key={ `?page=${ cartflows_admin.home_slug }&path=settings` }
								to={ {
									pathname: 'admin.php',
									search: `?page=cartflows&path=library`,
								} }
								className="wcf-button wcf-primary-button"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={ 2.5 }
									stroke="currentColor"
									className="w-4 h-4 text-white"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M12 4.5v15m7.5-7.5h-15"
									/>
								</svg>
								{ __( 'Create New Funnel', 'cartflows' ) }
							</Link>
						</div>
					</div>

					<div
						className="wcf-intro-video flex justify-center items-center bg-white rounded-md shadow-custom w-60"
						onClick={ HandleClickEvent }
					>
						<div
							className="flex justify-center items-center w-10 h-7 border-0 rounded-md bg-red-600 cursor-pointer"
							onClick={ HandleClickEvent }
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={ 1.5 }
								stroke="currentColor"
								className="w-8 h-6 fill-white stroke-0 p-1"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
								/>
							</svg>
						</div>
					</div>
					{ openVideoModel && (
						<WelcomePage
							showModel={ openVideoModel }
							setOpenVideoModel={ setOpenVideoModel }
						/>
					) }
				</div>

				{ /* Quick Start */ }
				<div className="wcf-quick-start-box p-6 border border-gray-200 rounded-lg">
					<div className="wcf-quick-start-content">
						<h3 className="text-xl font-semibold text-gray-800">
							{ __( 'Getting Started', 'cartflows' ) }
						</h3>
						<div className="mt-2 text-sm font-normal text-gray-600">
							<ul>
								<li>
									<a
										href="https://cartflows.com/docs/how-to-start-a-flow-from-product-page/"
										target={ '_blank' }
										className="flex gap-2.5 cursor-pointer group hover:text-primary-500"
										rel="noreferrer"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={ 1.5 }
											stroke="currentColor"
											className="w-3.5 text-gray-400 group-hover:text-primary-500"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M8.25 4.5l7.5 7.5-7.5 7.5"
											/>
										</svg>
										{ __(
											'Starting funnel from product page',
											'cartflows'
										) }
									</a>
								</li>
								<li>
									<a
										href="https://cartflows.com/docs/set-flow-as-homepage/"
										target={ '_blank' }
										rel="noreferrer"
										className="flex gap-2.5 cursor-pointer group hover:text-primary-500"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={ 1.5 }
											stroke="currentColor"
											className="w-3.5 text-gray-400 group-hover:text-primary-500"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M8.25 4.5l7.5 7.5-7.5 7.5"
											/>
										</svg>
										{ __(
											'Set Funnel as homepage ',
											'cartflows'
										) }
									</a>
								</li>
								<li>
									<a
										href="https://cartflows.com/docs/how-to-add-order-bumps-to-woocommerce-sales-funnel/"
										target={ '_blank' }
										className="flex gap-2.5 cursor-pointer group hover:text-primary-500"
										rel="noreferrer"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={ 1.5 }
											stroke="currentColor"
											className="w-3.5 text-gray-400 group-hover:text-primary-500"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M8.25 4.5l7.5 7.5-7.5 7.5"
											/>
										</svg>
										{ __(
											'How to add order bump',
											'cartflows'
										) }
									</a>
								</li>
								<li>
									<a
										href="https://cartflows.com/docs/store-checkout/"
										target={ '_blank' }
										className="flex gap-2.5 cursor-pointer group hover:text-primary-500"
										rel="noreferrer"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={ 1.5 }
											stroke="currentColor"
											className="w-3.5 text-gray-400 group-hover:text-primary-500"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M8.25 4.5l7.5 7.5-7.5 7.5"
											/>
										</svg>
										{ __(
											'Work with store checkout',
											'cartflows'
										) }
									</a>
								</li>
							</ul>
							<a
								href="https://cartflows.com/docs/"
								className="mt-2 inline-flex gap-2.5 items-center text-primary-600 hover:text-primary-500 text-sm font-medium"
								target={ '_blank' }
								rel="noreferrer"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={ 1.5 }
									stroke="currentColor"
									className="w-5 h-5"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
									/>
								</svg>
								{ __( 'View All Documentation', 'cartflows' ) }
							</a>
						</div>
					</div>
				</div>

				{ /* Help Box  */ }
				<div className="wcf-help-box p-6 border border-gray-200 rounded-lg">
					<div className="wcf-help-box-content">
						<h3 className="text-xl font-semibold text-gray-800">
							{ __( 'Need Help?', 'cartflows' ) }
						</h3>
						<div className="mt-2 text-sm font-normal text-gray-600">
							<ul>
								<li>
									<a
										href="https://cartflows.com/docs/"
										target={ '_blank' }
										className="flex gap-2.5 cursor-pointer group hover:text-primary-500"
										rel="noreferrer"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={ 1.5 }
											stroke="currentColor"
											className="w-3.5 text-gray-400 group-hover:text-primary-500"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M8.25 4.5l7.5 7.5-7.5 7.5"
											/>
										</svg>
										{ __( 'Knowledge Base', 'cartflows' ) }
									</a>
								</li>
								<li>
									<a
										href="https://wordpress.org/plugins/cartflows"
										target={ '_blank' }
										className="flex gap-2.5 cursor-pointer group hover:text-primary-500"
										rel="noreferrer"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={ 1.5 }
											stroke="currentColor"
											className="w-3.5 text-gray-400 group-hover:text-primary-500"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M8.25 4.5l7.5 7.5-7.5 7.5"
											/>
										</svg>
										{ __( 'Community Forum', 'cartflows' ) }
									</a>
								</li>
								<li>
									<a
										href="https://www.youtube.com/channel/UCEdXT5pEI_Vbd5te5v7sOpQ"
										target={ '_blank' }
										className="flex gap-2.5 cursor-pointer group hover:text-primary-500"
										rel="noreferrer"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={ 1.5 }
											stroke="currentColor"
											className="w-3.5 text-gray-400 group-hover:text-primary-500"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M8.25 4.5l7.5 7.5-7.5 7.5"
											/>
										</svg>
										{ __( 'Tutorials', 'cartflows' ) }
									</a>
								</li>
								<li>
									<a
										href={
											cartflows_admin.admin_base_url +
											'index.php?page=cartflow-setup'
										}
										target={ '_blank' }
										className="flex gap-2.5 cursor-pointer group hover:text-primary-500"
										rel="noreferrer"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth={ 1.5 }
											stroke="currentColor"
											className="w-3.5 text-gray-400 group-hover:text-primary-500"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M8.25 4.5l7.5 7.5-7.5 7.5"
											/>
										</svg>
										{ __( 'Onboarding', 'cartflows' ) }
									</a>
								</li>
							</ul>
							<a
								href="https://cartflows.com/support"
								className="mt-2 inline-flex gap-2.5 items-center text-primary-600 hover:text-primary-500 text-sm font-medium"
								target={ '_blank' }
								rel="noreferrer"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={ 1.5 }
									stroke="currentColor"
									className="w-5 h-5"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
									/>
								</svg>
								{ __( 'Get Support', 'cartflows' ) }
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default UserInfoBox;
