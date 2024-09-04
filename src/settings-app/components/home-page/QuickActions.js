import React from 'react';
import { __ } from '@wordpress/i18n';
import { Link } from 'react-router-dom';

function QuickActions() {
	return (
		<div className="wcf-quick-actions bg-white overflow-hidden border border-solid border-gray-200 md:rounded-lg wcf-metabox">
			<div className="wcf-metabox--heading sm:flex sm:items-center">
				<div className="wcf-metabox--heading-wrapper p-6 sm:flex-auto">
					<h1 className="wcf-metabox--heading-text text-xl font-semibold text-gray-900">
						{ __( 'Quick Actions', 'cartflows' ) }
					</h1>
				</div>
			</div>
			<div className="flex flex-col">
				<div className="inline-block min-w-full align-middle">
					<nav className="" aria-label="Sidebar">
						{ /* space-y-1 */ }
						<Link
							key="wcf-quick-action-create-funnel"
							to={ {
								pathname: 'admin.php',
								search: `?page=${ cartflows_admin.home_slug }&path=library`,
							} }
							className="wcf-quick-action-nav-item cursor-pointer group bg-primary-25 hover:bg-primary-25 border-primary-25 hover:border-primary-25 group flex items-center px-5 py-4 text-sm border-y border-solid"
						>
							<div className="wcf-nav-icon p-4 mr-2.5 rounded-full bg-white shadow-custom">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={ 1.5 }
									stroke="currentColor"
									className="w-6 h-6 text-primary-500"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"
									/>
								</svg>
							</div>
							<div className="wcf-nav-title">
								<div className="font-medium text-gray-900">
									{ __( 'Create a Funnel', 'cartflows' ) }
								</div>
								<div className="text-gray-500">
									{ __( 'Create a Funnel', 'cartflows' ) }
								</div>
							</div>
							<div className="wcf-nav-icon-link ml-auto">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={ 1.5 }
									stroke="currentColor"
									className="w-4 h-4 text-gray-400 group-hover:text-primary-500"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M8.25 4.5l7.5 7.5-7.5 7.5"
									/>
								</svg>
							</div>
						</Link>
						<a
							href={ '#' }
							className="wcf-quick-action-nav-item cursor-pointer group hover:bg-primary-25 hover:border-primary-25 group flex items-center px-5 py-4 text-sm border-b border-solid border-gray-200"
						>
							<div className="wcf-nav-icon p-4 mr-2.5 rounded-full bg-white shadow-custom">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={ 1.5 }
									stroke="currentColor"
									className="w-6 h-6 text-primary-500"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
									/>
								</svg>
							</div>
							<div className="wcf-nav-title">
								<div className="font-medium text-gray-900">
									{ __( 'Analytics', 'cartflows' ) }
								</div>
								<div className="text-gray-500">
									{ __(
										'View sales analytics',
										'cartflows'
									) }
								</div>
							</div>
							<div className="wcf-nav-icon-link ml-auto">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={ 1.5 }
									stroke="currentColor"
									className="w-4 h-4 text-gray-400 group-hover:text-primary-500"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M8.25 4.5l7.5 7.5-7.5 7.5"
									/>
								</svg>
							</div>
						</a>
						{ 'active' === cartflows_admin.woocommerce_status && (
							<a
								href={ cartflows_admin.create_product_src }
								target={ '_blank' }
								className="wcf-quick-action-nav-item cursor-pointer group hover:bg-primary-25 hover:border-primary-25 group flex items-center px-5 py-4 text-sm border-b border-solid border-gray-200"
								rel="noreferrer"
							>
								<div className="wcf-nav-icon p-4 mr-2.5 rounded-full bg-white shadow-custom">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={ 1.5 }
										stroke="currentColor"
										className="w-6 h-6 text-primary-500"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
										/>
									</svg>
								</div>
								<div className="wcf-nav-title">
									<div className="font-medium text-gray-900">
										{ __(
											'Create a Product',
											'cartflows'
										) }
									</div>
									<div className="text-gray-500">
										{ __(
											'Create new Product',
											'cartflows'
										) }
									</div>
								</div>
								<div className="wcf-nav-icon-link ml-auto">
									<svg
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										strokeWidth={ 1.5 }
										stroke="currentColor"
										className="w-4 h-4 text-gray-400 group-hover:text-primary-500"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											d="M8.25 4.5l7.5 7.5-7.5 7.5"
										/>
									</svg>
								</div>
							</a>
						) }

						<Link
							key="wcf-quick-action-show-funnel"
							to={ {
								pathname: 'admin.php',
								search: `?page=${ cartflows_admin.home_slug }&path=flows`,
							} }
							className="wcf-quick-action-nav-item cursor-pointer group hover:bg-primary-25 hover:border-primary-25 group flex items-center px-5 py-4 text-sm"
						>
							<div className="wcf-nav-icon p-4 mr-2.5 rounded-full bg-white shadow-custom">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={ 1.5 }
									stroke="currentColor"
									className="w-6 h-6 text-primary-500"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
									/>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
									/>
								</svg>
							</div>
							<div className="wcf-nav-title">
								<div className="font-medium text-gray-900">
									{ __( 'All Funnels', 'cartflows' ) }
								</div>
								<div className="text-gray-500">
									{ __( 'View all funnels', 'cartflows' ) }
								</div>
							</div>
							<div className="wcf-nav-icon-link ml-auto">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth={ 1.5 }
									stroke="currentColor"
									className="w-4 h-4 text-gray-400 group-hover:text-primary-500"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M8.25 4.5l7.5 7.5-7.5 7.5"
									/>
								</svg>
							</div>
						</Link>
					</nav>
				</div>
			</div>
		</div>
	);
}

export default QuickActions;
