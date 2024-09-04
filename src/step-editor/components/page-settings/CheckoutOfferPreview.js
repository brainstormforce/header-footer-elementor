import React, { useState, useEffect } from 'react';
import { useStateValue } from '@Utils/StateProvider';
import './CheckoutOfferPreview.scss';
import { __ } from '@wordpress/i18n';
import {
	ArrowsPointingOutIcon,
	ArrowsPointingInIcon,
} from '@heroicons/react/24/outline';

import { SectionHeadingField } from '@Fields';
import ReactHtmlParser from 'react-html-parser';

function CheckoutOfferPreview() {
	const [ { options } ] = useStateValue();

	const [ previewMode, setPreviewMode ] = useState( '' );

	const setFullScreenMode = () => {
		setPreviewMode( 'fullscreen' );

		const wrapper = document.getElementById( 'wcf-co-options-wrapper' );
		wrapper.classList.add( 'full-screen' );
		document.body.classList.add( 'wcf-co-full-screen-preview' );
	};

	const existFullScreenMode = () => {
		setPreviewMode( '' );
		const wrapper = document.getElementById( 'wcf-co-options-wrapper' );
		wrapper.classList.remove( 'full-screen' );
		document.body.classList.remove( 'wcf-co-full-screen-preview' );
	};

	// Scroll to top fix the preview section
	useEffect( () => {
		const co_wrapper = document.getElementById(
			'wcf-checkout-offer-preview-wrapper'
		);

		const sticky_offset = co_wrapper.offsetTop - 25;

		const scrollCallBack = window.addEventListener( 'scroll', () => {
			if ( window.pageYOffset > sticky_offset ) {
				co_wrapper.classList.add( 'sticky' );
			} else {
				co_wrapper.classList.remove( 'sticky' );
			}
		} );

		return () => {
			window.removeEventListener( 'scroll', scrollCallBack );
		};
	}, [] );
	// Scroll to top fix the preview section

	let product_data = options[ 'wcf-pre-checkout-offer-product' ];

	if ( null !== product_data && Array.isArray( product_data ) ) {
		product_data = product_data[ 0 ];
	}

	const discount_type = options[ 'wcf-pre-checkout-offer-discount' ],
		discount_value = parseFloat(
			options[ 'wcf-pre-checkout-offer-discount-value' ]
		);
	let custom_price = '';
	const original_price = product_data
		? parseFloat( product_data.original_price ).toFixed( 2 )
		: 0;

	if ( 'discount_percent' === discount_type ) {
		if ( discount_value > 0 ) {
			custom_price = (
				original_price -
				( original_price * discount_value ) / 100
			).toFixed( 2 );
		}
	} else if ( 'discount_price' === discount_type ) {
		if ( discount_value > 0 ) {
			custom_price = ( original_price - discount_value ).toFixed( 2 );
		}
	}

	const productImage =
		product_data && product_data.product_image
			? product_data.product_image
			: cartflows_admin.image_placeholder;

	return (
		<div
			id="wcf-checkout-offer-preview-wrapper"
			className={ `${
				'fullscreen' === previewMode
					? 'wcf-checkout-offer-preview-wrapper fullscreen'
					: 'wcf-checkout-offer-preview-wrapper'
			}` }
		>
			<div className="mt-8 bg-gray-50 p-6 -mx-6">
				<div className="wcf-pre-checkout-offer--header flex justify-between items-center mb-5 p-2.5">
					<SectionHeadingField
						label={ __( 'Preview', 'cartflows' ) }
						labelClass="block text-base font-semibold text-gray-800"
					/>
					{ '' === previewMode && (
						<div
							className="wcf-co-preview-mode wcf-full-screen-preview-button p-2.5 text-gray-400 hover:text-gray-500 cursor-pointer"
							onClick={ setFullScreenMode }
						>
							<ArrowsPointingOutIcon
								className="w-5 h-5 stroke-2"
								title={ __(
									'View in Full Screen',
									'cartflows'
								) }
							/>
						</div>
					) }
				</div>

				{ 'fullscreen' === previewMode && (
					<div
						className="wcf-co-preview-mode wcf-full-screen-preview-exit-button p-2.5 text-gray-400 hover:text-gray-500"
						onClick={ existFullScreenMode }
					>
						<ArrowsPointingInIcon
							className="w-5 h-5 stroke-2"
							title={ __( 'Exit Full Screen', 'cartflows' ) }
						/>
					</div>
				) }

				<div
					className="wcf-pre-checkout-offer-wrapper wcf-pre-checkout-full-width"
					// style={ {
					// 	background: options[ 'wcf-pre-checkout-offer-bg-color' ],
					// } }
				>
					<div
						id="wcf-pre-checkout-offer-modal"
						style={ {
							backgroundColor:
								options[
									'wcf-pre-checkout-offer-model-bg-color'
								],
						} }
						className="bg-white border border-gray-200 rounded-md"
					>
						<div className="wcf-content-main-wrapper">
							<div
								className="wcf-lightbox-content p-6"
								style={ {
									backgroundColor:
										options[
											'wcf-pre-checkout-offer-model-bg-color'
										],
								} }
							>
								<div className="wcf-content-modal-progress-bar mb-8">
									<div
										className="wcf-progress-bar-nav"
										style={ {
											color: options[
												'wcf-pre-checkout-offer-desc-color'
											],
										} }
									>
										<div className="wcf-pre-checkout-progress grid grid-cols-3 text-center text-sm font-normal text-gray-600 max-w-2xl mx-auto">
											<div className="wcf-nav-bar-step active">
												<div
													className="wcf-nav-bar-title mb-3"
													style={ {
														color: options[
															'wcf-pre-checkout-offer-desc-color'
														],
													} }
												>
													{ __(
														'Order Submitted',
														'cartflows'
													) }
												</div>
												<div className="wcf-nav-bar-step-line relative">
													<div
														className="wcf-progress-nav-step"
														style={ {
															backgroundColor:
																options[
																	'wcf-pre-checkout-offer-navbar-color'
																],
														} }
													>
														<span className="before"></span>
													</div>
													<span
														className="order-after"
														style={ {
															backgroundColor:
																options[
																	'wcf-pre-checkout-offer-navbar-color'
																],
														} }
													></span>
												</div>
											</div>
											<div className="wcf-nav-bar-step active inprogress">
												<div
													className="wcf-nav-bar-title mb-3"
													style={ {
														color: options[
															'wcf-pre-checkout-offer-desc-color'
														],
													} }
												>
													{ __(
														'Special Offer',
														'cartflows'
													) }
												</div>
												<div className="wcf-nav-bar-step-line relative">
													<span
														className="before"
														style={ {
															backgroundColor:
																options[
																	'wcf-pre-checkout-offer-navbar-color'
																],
														} }
													></span>
													<div
														className="wcf-progress-nav-step"
														style={ {
															backgroundColor:
																options[
																	'wcf-pre-checkout-offer-navbar-color'
																],
														} }
													>
														<span className="before"></span>
													</div>
													<span className="after"></span>
												</div>
											</div>
											<div className="wcf-nav-bar-step">
												<div className="wcf-nav-bar-title mb-3">
													{ __(
														'Order Receipt',
														'cartflows'
													) }
												</div>
												<div className="wcf-nav-bar-step-line relative">
													<span className="before"></span>
													<div className="wcf-progress-nav-step"></div>
												</div>
											</div>
										</div>
									</div>
								</div>

								<div className="wcf-content-main-head text-center mb-8">
									<div className="wcf-content-modal-title">
										<h1
											style={ {
												color: options[
													'wcf-pre-checkout-offer-title-color'
												],
											} }
											className="text-xl font-semibold text-gray-800 mb-2.5"
										>
											{
												options[
													'wcf-pre-checkout-offer-popup-title'
												]
											}
										</h1>
									</div>
									<div className="wcf-content-modal-sub-title">
										<span
											style={ {
												color: options[
													'wcf-pre-checkout-offer-subtitle-color'
												],
											} }
											className="text-sm font-normal text-600"
										>
											{
												options[
													'wcf-pre-checkout-offer-popup-sub-title'
												]
											}
										</span>
									</div>
								</div>

								<div
									id="wcf-pre-checkout-offer-content"
									className="woocommerce border-2 border-gray-200 border-dashed rounded items-center"
									style={ {
										backgroundColor:
											options[
												'wcf-pre-checkout-offer-model-bg-color'
											],
									} }
								>
									<div className="flex gap-4 p-5 items-center">
										<div className="wcf-pre-checkout-info wcf-pre-checkout-img w-2/5">
											<img
												src={ productImage }
												alt="Checkout Offer Product"
												className="border border-gray-200"
											/>
										</div>
										<div className="wcf-pre-checkout-info wcf-pre-checkout-offer-product-details w-3/5">
											<div className="wcf-pre-checkout-offer-product-title">
												<h1
													style={ {
														color: options[
															'wcf-pre-checkout-offer-title-color'
														],
													} }
												>
													{
														options[
															'wcf-pre-checkout-offer-product-title'
														]
													}
												</h1>
											</div>
											<div
												className="wcf-pre-checkout-offer-price"
												style={ {
													color: options[
														'wcf-pre-checkout-offer-desc-color'
													],
													fontWeight: 500,
												} }
											>
												{ cartflows_admin.woo_currency }
												{ '' !== custom_price && (
													<>
														<del className="wcf-regular-price">
															{ ! isNaN(
																original_price
															)
																? original_price
																: 0 }
														</del>
														<span className="wcf-discount-price">
															{ ' ' }
															{ custom_price }
														</span>
													</>
												) }

												{ '' === custom_price && (
													<span className="wcf-regular-price">
														{ ! isNaN(
															original_price
														)
															? original_price
															: 0 }
													</span>
												) }
											</div>
											<div className="wcf-pre-checkout-offer-desc">
												<span
													style={ {
														color: options[
															'wcf-pre-checkout-offer-desc-color'
														],
														lineHeight: '0',
													} }
												>
													{ ReactHtmlParser(
														options[
															'wcf-pre-checkout-offer-desc'
														]
													) }
												</span>
											</div>

											<input
												type="hidden"
												value="add"
												className="wcf-pre-checkout-offer-action"
											/>
										</div>
									</div>
									<div className="wcf-pre-checkout-offer-actions flex flex-col gap-3 p-5">
										<div className="wcf-pre-checkout-offer-btn-action wcf-pre-checkout-add-cart-btn">
											<button
												className="wcf-pre-checkout-offer-btn alt !w-full text-base !bg-primary-500 !rounded !text-white !font-semibold px-4 py-3 !text-center"
												style={ {
													backgroundColor:
														options[
															'wcf-pre-checkout-offer-button-color'
														],
													borderColor:
														options[
															'wcf-pre-checkout-offer-button-color'
														],
												} }
											>
												{
													options[
														'wcf-pre-checkout-offer-popup-btn-text'
													]
												}
											</button>
										</div>
										<div className="wcf-pre-checkout-offer-btn-action wcf-pre-checkout-skip-btn text-center">
											<a
												className="wcf-pre-checkout-skip text-gray-400"
												href="#"
												style={ {
													color: options[
														'wcf-pre-checkout-offer-desc-color'
													],
												} }
											>
												{
													options[
														'wcf-pre-checkout-offer-popup-skip-btn-text'
													]
												}
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default CheckoutOfferPreview;
