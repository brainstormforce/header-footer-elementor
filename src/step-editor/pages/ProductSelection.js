import React, { useState } from 'react';
import { __ } from '@wordpress/i18n';
import classnames from 'classnames';
import apiFetch from '@wordpress/api-fetch';
import ReactHtmlParser from 'react-html-parser';
import { useStateValue } from '@Utils/StateProvider';
import UpgradeToProCTA from '@CTA/UpgradeToProCTA';
import { useSettingsValue } from '@Utils/SettingsProvider';

import OfferListOptions from '@StepEditor/components/page-settings/OfferListOptions';
import ProductSelectionSkeleton from '@StepEditor/components/steps-page/ProductSelectionSkeleton';

import { NumberField, ProductField, SelectFieldWithIcon } from '@Fields';
import {
	TrashIcon,
	CurrencyDollarIcon,
	ReceiptPercentIcon,
	NoSymbolIcon,
	ArrowPathIcon,
	PlusIcon,
} from '@heroicons/react/24/outline';

function ProductSelection() {
	const [ { settings_data, page_settings, options, step_data }, dispatch ] =
		useStateValue();
	const [ { license_status } ] = useSettingsValue();

	const currentOfferProduct = options[ 'wcf-offer-product' ]
		? options[ 'wcf-offer-product' ]
		: '';

	const discount_options = [
		{
			value: '',
			label: 'No Discount',
			icon: <NoSymbolIcon className="w-5 h-5" />,
		},
		{
			value: 'discount_percent',
			label: 'Discount Percentage',
			icon: <ReceiptPercentIcon className="w-5 h-5" />,
		},
		{
			value: 'discount_price',
			label: 'Discount Price',
			icon: <CurrencyDollarIcon className="w-5 h-5" />,
		},
	];

	const [ selectedProduct, setSelectedProduct ] = useState();
	const [ inputValue, setInputValue ] = useState( '' );
	const defaultActionButtonText = __( 'Add', 'cartflows' );

	const discountValueStatus =
		'undefined' === typeof currentOfferProduct.discount_type ||
		'' === currentOfferProduct.discount_type
			? 'disable'
			: 'enable';

	const [ showDiscountValue, setShowDiscountValue ] =
		useState( discountValueStatus );

	const [ isAddingProduct, setIsAddingProduct ] = useState( {
		isInProcessing: false,
		buttonText: defaultActionButtonText,
	} );
	const { isInProcessing, buttonText } = isAddingProduct;

	if ( 'undefined' === typeof settings_data.settings ) {
		return <ProductSelectionSkeleton />;
	}

	if (
		[ 'upsell', 'downsell' ].includes( step_data.type ) &&
		wcfCartflowsPro() &&
		'Activated' !== license_status
	) {
		return (
			<>
				<div className="wcf-multiple-order-bumps wcf-multiple-order-bumps-cta">
					<UpgradeToProCTA
						heading={ __( 'License is required!', 'cartflows' ) }
						subHeading={ __(
							"Activate the license to modify this offer step's settings",
							'cartflows'
						) }
					/>
				</div>
			</>
		);
	}

	const calculateDiscountValue = function () {
		const discount_type = options[ 'wcf-offer-discount' ],
			discount_value = parseFloat(
				options[ 'wcf-offer-discount-value' ]
			),
			original_price = parseFloat( currentOfferProduct.original_price );
		let custom_price = 0;

		if ( 'discount_percent' === discount_type ) {
			if ( discount_value > 0 ) {
				custom_price =
					original_price - ( original_price * discount_value ) / 100;
			}
		} else if ( 'discount_price' === discount_type ) {
			if ( discount_value > 0 ) {
				custom_price = original_price - discount_value;
			}
		}
		currentOfferProduct.sell_price = custom_price.toFixed( 2 );
	};

	if ( 0 !== currentOfferProduct.length ) {
		calculateDiscountValue();
	}

	const showDiscountvalue = function ( e, name, value ) {
		if ( value === '' ) {
			setShowDiscountValue( 'disable' );
		} else {
			setShowDiscountValue( 'enable' );
		}
	};

	const removeProduct = function () {
		dispatch( {
			type: 'REMOVE_OFFER_PRODUCT',
			field_name: 'wcf-offer-product',
		} );
		// setCurrentOfferProduct( '' );
	};

	const addProduct = function () {
		const product_id = selectedProduct?.value;

		setInputValue( selectedProduct );

		if ( product_id ) {
			setIsAddingProduct( {
				isInProcessing: true,
				buttonText: __( 'Adding…', 'cartflows' ),
			} );

			apiFetch( {
				path: `/cartflows/v1/admin/product-data/${ product_id }`,
			} ).then( ( data ) => {
				console.log( data );

				dispatch( {
					type: 'ADD_OFFER_PRODUCT',
					field_name: 'wcf-offer-product',
					product_data: {
						value: product_id,
						quantity: '1',
						label: selectedProduct?.label,
						img_url: data?.img_url,
						original_price: data?.regular_price,
					},
				} );

				setInputValue( null );

				setIsAddingProduct( {
					isInProcessing: false,
					buttonText: defaultActionButtonText,
				} );
			} );

			setSelectedProduct( null );
		}
	};

	return (
		<>
			<div className="wcf-offer-product--wrapper">
				<div className="wcf-offer-products--selection wcf-products__section">
					{ 0 === currentOfferProduct.length ? (
						<>
							<input
								name="wcf-offer-product[]"
								type="hidden"
								value=""
							></input>
							<div className="wcf-offer-no-product--notice border border-gray-200 bg-gray-25 text-center text-sm font-normal rounded-md p-5">
								{ __(
									'Once you select the product, they will be displayed here.',
									'cartflows'
								) }
							</div>
							<div className="wcf-offer-product-selection-field__add-new flex justify-between gap-5 mt-5">
								<ProductField
									name=""
									desc=""
									field="product"
									value={ inputValue }
									allowed_products=""
									include_products="braintree-subscription, braintree-variable-subscription"
									excluded_products="grouped"
									placeholder={ __(
										'Find products',
										'cartflows'
									) }
									onChangeCB={ setSelectedProduct }
								/>
								<div className="wcf-select-product-button inline-flex">
									<button
										type={ 'button' }
										className={ classnames(
											'wcf-button',
											isInProcessing
												? 'wcf-disabled'
												: 'wcf-secondary-button'
										) }
										onClick={ addProduct }
									>
										{ ! isInProcessing && (
											<PlusIcon
												className="w-4 h-4 stroke-2"
												aria-hidden="true"
											/>
										) }

										{ isInProcessing && (
											<ArrowPathIcon
												className="w-4 h-4 stroke-2 animate-spin"
												aria-hidden="true"
											/>
										) }

										{ buttonText }
									</button>
								</div>
							</div>
						</>
					) : (
						<div className="overflow-visible shadow border border-gray-200 rounded-md">
							<div className="wcf-offer-product-selection--header border-b border-gray-200 flex gap-6 p-3">
								<div className="text-left text-sm font-semibold text-gray-900 w-1/2">
									{ __( 'Items', 'cartflows' ) }
								</div>
								<div className="text-left text-sm font-semibold text-gray-900 w-[10%]">
									{ __( 'Quantity', 'cartflows' ) }
								</div>
								<div className="text-left text-sm font-semibold text-gray-900 w-1/5">
									{ __( 'Discount', 'cartflows' ) }
								</div>
								<div className="text-left text-sm font-semibold text-gray-900 w-1/6">
									{ __( 'Shipping Rate', 'cartflows' ) }
								</div>
								<div className="relative w-[5%]">
									<span className="sr-only">
										{ __( 'Delete', 'cartflows' ) }
									</span>
								</div>
							</div>
							<div
								className={ `wcf-offer-product-selection--selected-product flex items-center p-3 gap-4` }
							>
								<div className="wcf-offer-product-selection--product-title whitespace-nowrap text-sm font-medium text-gray-900 w-1/2">
									<div className="flex gap-3 items-center">
										{ /* Product Image wrapper */ }
										<div className="wcf-offer-product-selection--product-image flex w-24 h-24">
											<img
												src={
													currentOfferProduct.img_url
														? currentOfferProduct.img_url
														: cartflows_admin.image_placeholder
												}
												className="product-image rounded-md w-full h-full aspect-{3/2} object-contain"
												alt={ ReactHtmlParser(
													currentOfferProduct.label
												) }
											/>
										</div>
										{ /* Product Name wrapper */ }
										<div className="wcf-offer-product-selection--product-title_text">
											<div
												className="wcf-offer-product-repeater-field__title whitespace-normal text-left"
												data-product_id={
													currentOfferProduct.value
												}
											>
												{ ReactHtmlParser(
													currentOfferProduct.label
												) }
											</div>
											{ /* Product price wrapper */ }
											<div className="wcf-offer-product-repeater-field__reg-price mt-1">
												<div className="flex gap-2">
													<span
														className={ `wcf-offer-product--reg-price ${
															0 <
															currentOfferProduct.sell_price
																? 'line-through text-gray-400'
																: ''
														}` }
													>
														{ cartflows_admin.woo_currency +
															currentOfferProduct.original_price }
													</span>
													{ 0 <
														currentOfferProduct.sell_price && (
														<span className="wcf-offer-product--sale-price">
															{ cartflows_admin.woo_currency +
																currentOfferProduct.sell_price }
														</span>
													) }
												</div>
											</div>
										</div>
									</div>
								</div>

								<div className="wcf-offer-product-selection--product-qty whitespace-nowrap text-sm text-gray-500 w-[10%]">
									<NumberField
										id=""
										name={ `wcf-offer-quantity` }
										class={ `input-field !w-20 !min-h-[43px] !text-sm font-normal !rounded-md text-gray-400 !border !border-gray-200 focus:!ring-0 focus:!ring-transparent focus:!shadow-none !outline-0 !outline-none !m-0` }
										value={
											options[ 'wcf-offer-quantity' ]
										}
										min="1"
									/>
								</div>

								<div className="wcf-offer-product-selection--product-discount flex whitespace-nowrap text-sm text-gray-500 w-1/5">
									<SelectFieldWithIcon
										name={ `wcf-offer-discount` }
										value={
											options[ 'wcf-offer-discount' ]
										}
										class="!block !w-20 !m-0"
										options={ discount_options }
										callback={ showDiscountvalue }
									/>
									<NumberField
										id=""
										class="input-field !w-20 !min-h-[43px] !text-sm font-normal !rounded-tr-md !rounded-tb-md !rounded-tl-none text-gray-400 !border !border-l-0 !border-gray-200 focus:!ring-0 focus:!ring-transparent focus:!shadow-none !outline-0 !outline-none !m-0"
										name={ `wcf-offer-discount-value` }
										value={
											showDiscountValue === 'disable'
												? ''
												: options[
														'wcf-offer-discount-value'
												  ]
										}
										readonly={
											showDiscountValue === 'disable'
												? 'readonly'
												: ''
										}
									/>
								</div>

								<div className="wcf-offer-product-selection--flat-rate flex whitespace-nowrap text-sm text-gray-500 w-1/6">
									<NumberField
										id=""
										class="input-field !w-20 !min-h-[43px] !text-sm font-normal !rounded-md text-gray-400 !border !border-gray-200 focus:!ring-0 focus:!ring-transparent focus:!shadow-none !outline-0 !outline-none !m-0"
										name={ `wcf-offer-flat-shipping-value` }
										placeholder={ 0 }
										value={
											options[
												'wcf-offer-flat-shipping-value'
											]
										}
									/>
								</div>

								<div className="wcf-offer-product-selection-actions flex gap-2 relative whitespace-nowrap text-right text-sm font-medium w-[5%] justify-center">
									<div
										className="wcf-delete-product-item py-2 text-primary-500 hover:text-primary-700 cursor-pointer text-right flex justify-end"
										onClick={ removeProduct }
									>
										<TrashIcon className="h-18 w-18" />
									</div>
								</div>

								<input
									name={ `wcf-offer-product[]` }
									type="hidden"
									className="wcf-checkout-product-id"
									value={ currentOfferProduct.value }
								></input>
							</div>
						</div>
					) }
				</div>

				<div className="wcf-offer-product--common-settings pt-8">
					<OfferListOptions
						settings={ page_settings.settings.product }
						displayAs="div"
					/>
				</div>
			</div>
		</>
	);
}

export default ProductSelection;
