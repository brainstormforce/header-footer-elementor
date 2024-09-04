import React from 'react';
import { Link } from 'react-router-dom';
import { __ } from '@wordpress/i18n';
import './StoreCheckoutHeader.scss';
import { PlusIcon } from '@heroicons/react/24/outline';

function StoreCheckoutHeader() {
	return (
		<main className="wcf-no-flows-found-screen">
			<div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-5 lg:gap-10 xl:gap-10 rounded-md bg-white overflow-hidden shadow-sm px-10 py-10">
				<div className="grid grid-cols-1 gap-4 lg:col-span-2 h-full">
					<div className="wcf-video-container">
						{ /* Added rel=0 query paramter at the end to disable YouTube recommendations */ }
						<iframe
							className="wcf-video rounded-md"
							src={ `https://www.youtube.com/embed/SlE0moPKjMY?showinfo=0&autoplay=0&mute=0&rel=0` }
							allow="autoplay"
							title="YouTube video player"
							frameBorder="0"
							allowFullScreen
						></iframe>
					</div>
				</div>
				<div className="grid grid-cols-1 gap-4 lg:col-span-3 h-full">
					<section aria-labelledby="section-1-title h-full">
						<div className="flex flex-col justify-center h-full">
							<div className="">
								<div className="flex">
									<h2 className="text-gray-800 text-2xl pb-3 font-semibold text-left">
										{ __(
											'Create a global store checkout',
											'cartflows'
										) }
									</h2>
								</div>

								<p className="text-base text-gray-600 pb-7">
									{ __(
										`A well-designed checkout page can help streamline the checkout process, reduce cart abandonment rates and increase conversions.`,
										'cartflows'
									) }
									<div className="flex mt-3">
										<div>
											<li>
												{ __(
													'Improved user experience',
													'cartflows'
												) }
											</li>
											<li>
												{ __(
													'Brand consistency',
													'cartflows'
												) }
											</li>
											<li>
												{ __(
													'Increased trust and credibility',
													'cartflows'
												) }
											</li>
										</div>
										<div className="ml-10">
											<li>
												{ __(
													'Flexibility and customization',
													'cartflows'
												) }
											</li>
											<li>
												{ __(
													'Competitive advantage',
													'cartflows'
												) }
											</li>
										</div>
									</div>
								</p>

								<span className="relative z-0 inline-flex flex-col sm:flex-row justify-start w-full">
									<Link
										key="importer"
										to={ {
											pathname: 'admin.php',
											search: `?page=cartflows&path=store-checkout-library`,
										} }
										className="inline-flex gap-1.5 wcf-button wcf-primary-button"
									>
										<PlusIcon className="w-18 h-18 stroke-2" />
										<span>
											{ __(
												'Create Store Checkout',
												'cartflows'
											) }
										</span>
									</Link>
								</span>
							</div>
						</div>
					</section>
				</div>
			</div>
		</main>
	);
}

export default StoreCheckoutHeader;
