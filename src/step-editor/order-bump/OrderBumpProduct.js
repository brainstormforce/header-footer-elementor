import React, { useState } from 'react';
import { useStateValue } from '@Utils/StateProvider';
import { __ } from '@wordpress/i18n';
import OrderBumpProductSkeleton from './skeletons/OrderBumpProductSkeleton';
import classnames from 'classnames';
import { conditions } from './Helper';
import apiFetch from '@wordpress/api-fetch';
import ReactHtmlParser from 'react-html-parser';

import {
	NumberField,
	SelectFieldWithIcon,
	ProductField,
	RenderFields,
	CouponField,
} from '@Fields';

import {
	ReceiptPercentIcon,
	NoSymbolIcon,
	CurrencyDollarIcon,
	TrashIcon,
	PlusIcon,
	ArrowPathIcon,
	TicketIcon,
} from '@heroicons/react/24/outline';

function OrderBumpProduct() {
	const [ { page_settings, current_ob }, dispatch ] = useStateValue();
	const [ obProduct, setObProduct ] = useState(
		current_ob?.product[ 0 ] ? current_ob?.product[ 0 ] : ''
	);

	const [ selectedProduct, setSelectedProduct ] = useState();

	const defaultActionButtonText = __( 'Add', 'cartflows' );
	const [ isAddingProduct, setIsAddingProduct ] = useState( {
		isInProcessing: false,
		buttonText: defaultActionButtonText,
	} );

	const { isInProcessing, buttonText } = isAddingProduct;

	if ( null === page_settings || 'undefined' === page_settings ) {
		return <OrderBumpProductSkeleton />;
	}

	const productSettings =
		page_settings.settings[ 'multiple-order-bump-product' ];

	const discount_types = [
		{
			value: '',
			label: 'Original',
			icon: <NoSymbolIcon className="w-5 h-5" />,
		},
		{
			value: 'discount_percent',
			label: 'Percentage',
			icon: <ReceiptPercentIcon className="w-5 h-5" />,
		},
		{
			value: 'discount_price',
			label: 'Price',
			icon: <CurrencyDollarIcon className="w-5 h-5" />,
		},
		{
			value: 'coupon',
			label: 'Coupon',
			icon: <TicketIcon className="w-5 h-5" />,
		},
	];

	const calculateDiscountvalue = function () {
		const discount_type = current_ob.discount_type,
			discount_value = parseFloat( current_ob.discount_value ),
			original_price = parseFloat( obProduct.original_price );

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

		obProduct.sell_price = custom_price.toFixed( 2 );
	};
	if ( '' !== obProduct ) {
		calculateDiscountvalue();
	}

	const removeProduct = function () {
		dispatch( {
			type: 'REMOVE_OB_PRODUCT',
			product: '',
		} );
		setObProduct( '' );
	};

	const addProduct = function ( e ) {
		e.preventDefault();
		const product_id = selectedProduct?.value;

		if ( 'active' === cartflows_admin.woocommerce_status && product_id ) {
			setIsAddingProduct( {
				isInProcessing: true,
				buttonText: __( 'Adding…', 'cartflows' ),
			} );

			apiFetch( {
				path: `/cartflows-pro/v1/admin/ob-product-data/${ product_id }`,
			} ).then( ( data ) => {
				dispatch( {
					type: 'ADD_OB_PRODUCT',
					product: data,
				} );
				setObProduct( current_ob?.product[ 0 ] );

				setIsAddingProduct( {
					isInProcessing: false,
					buttonText: defaultActionButtonText,
				} );
			} );

			setSelectedProduct();
		}
	};

	return (
		<div className="wcf-order-bump-product-tab">
			{ '' === obProduct && (
				<>
					<div className="border border-gray-200 bg-gray-25 text-center text-sm font-normal rounded-md p-5">
						{ __(
							'Once you have add product, it will be displayed here.',
							'cartflows'
						) }
					</div>
					<input type="hidden" name={ `product` } />

					<div className="wcf-ob-product-selection-field__add-new flex justify-between gap-5 mt-5">
						<ProductField
							name=""
							desc=""
							field="product"
							value=""
							allowed_products=""
							include_products="braintree-subscription, braintree-variable-subscription"
							excluded_products="grouped"
							placeholder={ __( 'Find product', 'cartflows' ) }
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
			) }

			{ '' !== obProduct && (
				<>
					<div
						className={ `wcf-ob-product-selection--selected-product flex items-center gap-3 p-3 border border-gray-200 rounded-md` }
					>
						<div className="wcf-ob-product-selection--product-title whitespace-nowrap text-sm font-medium text-gray-900 w-2/4">
							<div className="flex gap-3 items-center">
								<div className="wcf-ob-product-selection--product-image w-20 h-20">
									<img
										src={
											obProduct.product_image
												? obProduct.product_image
												: cartflows_admin.image_placeholder
										}
										className="wcf-ob-product-image rounded-md w-full h-full aspect-{3/2} object-contain"
										alt={ obProduct.label }
									/>
								</div>
								<div className="wcf-ob-product-selection--product-title_text">
									<div
										className="wcf-ob-product-repeater-field__title whitespace-normal text-left"
										data-product_id={ obProduct.value }
									>
										{ ReactHtmlParser( obProduct.label ) }
									</div>
									<input
										type="hidden"
										name={ `product` }
										value={
											obProduct.value
												? obProduct.value
												: ''
										}
									/>
									<div className="wcf-ob-product-repeater-field__reg-price mt-1 ">
										<div className="flex gap-2">
											<span
												className={ `wcf-ob-product--reg-price ${
													0 <
													current_ob.discount_value
														? 'line-through text-gray-400'
														: ''
												} ` }
											>
												{ cartflows_admin.woo_currency +
													obProduct.original_price }
											</span>
											{ 0 < current_ob.discount_value && (
												<span className="wcf-ob-product--sale-price">
													{ cartflows_admin.woo_currency +
														obProduct.sell_price }
												</span>
											) }
										</div>
									</div>
									{ current_ob.discount_type === 'coupon' && (
										<span className="coupon-message text-xs mt-0.5 text-gray-500">
											{ __(
												'Coupon will apply on checkout page',
												'cartflows'
											) }
										</span>
									) }
								</div>
							</div>
						</div>

						<div className="wcf-ob-product-selection--product-discount__wrapper flex items-center gap-3 justify-start w-[45%]">
							<div className="wcf-ob-product-selection--product-qty whitespace-nowrap text-sm text-gray-500">
								<NumberField
									id=""
									name={ `quantity` }
									class={ `!w-16 !h-11 input-field !px-3 !py-2.5 !text-sm font-normal !rounded-md text-gray-400 !border-gray-200 focus:ring focus:!ring-primary-100 focus:!border-primary-500 focus:!shadow-none !outline-0 !outline-none !m-0 ${
										'no' ===
										current_ob.display_quantity_field
											? 'disabled'
											: ''
									}` }
									value={ current_ob.quantity }
									min="1"
									readonly={
										'no' ===
										current_ob.display_quantity_field
											? true
											: false
									}
								/>
							</div>

							<div className="wcf-ob-product-selection--product-discount flex whitespace-nowrap text-sm text-gray-500">
								<SelectFieldWithIcon
									name={ `discount_type` }
									value={ current_ob.discount_type }
									class="!block !w-16 !m-0"
									options={ discount_types }
								/>

								{ 'coupon' !== current_ob.discount_type ? (
									<NumberField
										id=""
										class="input-field !w-16 !min-h-[44px] !text-sm font-normal !rounded-tr-md !rounded-tb-md !rounded-tl-none text-gray-400 !border !border-l-0 !border-gray-200 focus:!ring-0 focus:!ring-transparent focus:!shadow-none !outline-0 !outline-none !m-0"
										name={ `discount_value` }
										value={
											current_ob.discount_type === ''
												? ''
												: current_ob.discount_value
										}
										readonly={
											current_ob.discount_type === ''
												? 'readonly'
												: ''
										}
									/>
								) : (
									<CouponField
										wrapperClass="w-[200px] bg-white"
										fieldClass="!border-l-0"
										name={ 'discount_coupon' }
										placeholder={ __(
											'Search for a coupon',
											'cartflows'
										) }
										multiple={ false }
										allow_clear={ true }
										value={
											current_ob.discount_type === ''
												? ''
												: current_ob.discount_coupon
										}
									/>
								) }
							</div>
						</div>

						<div className="wcf-product-selection-actions whitespace-nowrap text-right text-sm font-medium w-[5%]">
							<div
								className="wcf-delete-product-item p-2 text-gray-400 hover:text-primary-500 cursor-pointer flex justify-center items-center"
								onClick={ removeProduct }
								// index={ index }
							>
								<TrashIcon className="h-18 w-18" />
							</div>
						</div>
					</div>

					<div className="flex mt-5">
						<table className="w-full">
							<tbody>
								{ productSettings &&
									productSettings.fields &&
									Object.keys( productSettings.fields ).map(
										( field ) => {
											const data =
													productSettings.fields[
														field
													],
												name = data.name,
												value = current_ob[ name ];

											const isActive =
												conditions.isActiveControl(
													data,
													current_ob
												);

											return (
												<RenderFields
													key={ field }
													data={ data }
													value={ value }
													isActive={ isActive }
													field={ field }
												/>
											);
										}
									) }
							</tbody>
						</table>
					</div>
				</>
			) }
		</div>
	);
}

export default OrderBumpProduct;
