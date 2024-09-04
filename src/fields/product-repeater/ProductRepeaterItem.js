import React, { useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { useStateValue } from '@Utils/StateProvider';
import { Disclosure, Transition } from '@headlessui/react';
import { __ } from '@wordpress/i18n';
import {
	TextField,
	CheckboxField,
	RadioField,
	NumberField,
	ToggleField,
	SelectFieldWithIcon,
} from '@Fields';
import {
	Cog6ToothIcon,
	TrashIcon,
	EllipsisVerticalIcon,
	CurrencyDollarIcon,
	ReceiptPercentIcon,
	NoSymbolIcon,
} from '@heroicons/react/24/outline';

function ProductRepeaterItem( props ) {
	const [ { options }, dispatch ] = useStateValue();

	const { index, field_name, product_data, productOptdata } = props;

	const discountValueStatus =
		'' === product_data.discount_type ? 'disable' : 'enable';

	const [ showDiscountValue, setShowDiscountValue ] =
		useState( discountValueStatus );

	const [ showProductOptionDetails, setShowProductOptionDetails ] =
		useState( false );

	const checkoutProducts = options[ 'wcf-checkout-products' ];
	const productCondition = options[ 'wcf-product-options' ];
	const isProductOptions = options[ 'wcf-enable-product-options' ];

	const is_last = index === checkoutProducts.length - 1;

	const removeProduct = function () {
		const unique_id = product_data.unique_id;

		if ( unique_id ) {
			dispatch( {
				type: 'REMOVE_CHECKOUT_PRODUCT',
				field_name,
				unique_id,
			} );
		}
	};

	const showDiscountvalue = function ( e, name, value ) {
		if ( value === '' ) {
			setShowDiscountValue( 'disable' );
		} else {
			setShowDiscountValue( 'enable' );
		}
	};

	const productOptionsFieldClasses =
		'input-field !px-4 !py-2.5 !text-sm font-normal !rounded-md text-gray-400 !w-full !border-gray-200 focus:ring focus:!ring-primary-100 focus:!border-primary-500 focus:!shadow-none !outline-0 !outline-none !m-0';

	const discount_options = [
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
	];

	const get_default_column = function ( product ) {
		let value = '';

		// If not pro or product Option disabled then check all and disable checkbox field.
		if ( ! wcfCartflowsPro() || 'yes' !== isProductOptions ) {
			return (
				<ToggleField
					class={ `wcf-product-add-to-cart` }
					name={ `wcf-product-options-data[${ product.unique_id }][add_to_cart]` }
					value={ 'yes' }
					isDisabled={ true }
				/>
			);
		}

		if ( 'force-all' === productCondition ) {
			return (
				<ToggleField
					class={ `wcf-product-add-to-cart` }
					name={ `wcf-product-options-data[${ product.unique_id }][add_to_cart]` }
					value="yes"
					isDisabled={ true }
				/>
			);
		}

		if ( 'single-selection' === productCondition ) {
			if ( 'yes' === product.add_to_cart || product.chosen ) {
				value = product.unique_id;
			}

			return (
				<RadioField
					className={ `wcf-product-add-to-cart` }
					name="wcf_default_add_to_cart[]"
					options={ [
						{
							value: product.unique_id,
						},
					] }
					onClick={ () => {
						/**
						 * Updating the selected option in the main state to maintain the state after click and save button event.
						 * The reason for adding this is that, while saving the setting the component gets re-rendered to show the updated data,
						 * but here in this case, this value was not in the state and getting reset to the old value.
						 */
						options[ 'wcf-checkout-products' ][
							index
						].add_to_cart = 'yes';
						options[ 'wcf-product-options-data' ] = {
							[ product.unique_id ]: { add_to_cart: 'yes' },
						};
						console.log(
							`selected Product Option: ${ product } Selected Index: ${ product }`
						);
					} }
					value={ value }
				/>
			);
		}

		if ( 'multiple-selection' === productCondition ) {
			return (
				<ToggleField
					class={ `wcf-product-add-to-cart` }
					name={ `wcf-product-options-data[${ product.unique_id }][add_to_cart]` }
					value={ product.add_to_cart }
				/>
			);
		}
	};

	const calculateDiscountvalue = function () {
		const discount_type = product_data.discount_type,
			discount_value = parseFloat( product_data.discount_value ),
			original_price = parseFloat( product_data.regular_price );
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
		product_data.sell_price = custom_price.toFixed( 2 );
	};
	calculateDiscountvalue();

	const getWrapperClasses = function () {
		let wrapperClass = '';

		if ( 'yes' === productOptdata.add_to_cart ) {
			wrapperClass += showProductOptionDetails
				? 'border border-b-0 border-primary-300 bg-primary-25 '
				: 'border border-primary-300 bg-primary-25 ';
		} else {
			wrapperClass += showProductOptionDetails
				? 'border border-b-0 border-gray-200 bg-gray-25 '
				: 'border border-gray-200 bg-gray-25 ';
		}

		wrapperClass +=
			is_last && ! showProductOptionDetails ? ' rounded-b-md' : '';

		return wrapperClass;
	};

	return (
		<Disclosure as="div" key={ product_data.unique_id }>
			{ ( { open } ) => (
				<>
					<div
						className={ `wcf-product-selection--selected-product flex items-center p-3 gap-3 ${ getWrapperClasses() }` }
					>
						<div className="wcf-product-selection--product-title whitespace-nowrap text-sm font-medium text-gray-900 w-1/2">
							<div className="flex gap-3 items-center">
								<div className="wcf-product-selection--sortable-toggle flex cursor-move text-gray-400">
									<EllipsisVerticalIcon
										className="w-6 h-6 stroke-1"
										aria-hidden="true"
									/>
									<EllipsisVerticalIcon
										className="w-6 h-6 stroke-1 -ml-4"
										aria-hidden="true"
									/>
								</div>
								<div className="wcf-product-selection--product-image w-20 h-20">
									<img
										src={
											product_data && product_data.img_url
												? product_data.img_url
												: cartflows_admin.image_placeholder
										}
										className="product-image rounded-md w-full h-full aspect-{3/2} object-contain"
										alt={ ReactHtmlParser(
											product_data.name
										) }
									/>
								</div>
								<div className="wcf-product-selection--product-title_text cursor-default">
									<div
										className="wcf-product-repeater-field__title whitespace-normal text-left"
										data-product_id={ product_data.product }
									>
										{ ReactHtmlParser( product_data.name ) }
									</div>
									<div className="wcf-product-repeater-field__reg-price mt-1">
										<div className="flex gap-2">
											<span
												className={ `wcf-product--reg-price ${
													discountValueStatus ===
														'enable' &&
													0 <
														product_data.discount_value
														? 'line-through text-gray-400'
														: ''
												}` }
												title={ __(
													'Regular Price of the product',
													'cartflows'
												) }
											>
												{ cartflows_admin.woo_currency +
													product_data.regular_price }
											</span>
											{ discountValueStatus ===
												'enable' &&
												0 <
													product_data.discount_value && (
													<span
														className="wcf-product--sale-price"
														title={ __(
															'Price after discount.',
															'cartflows'
														) }
													>
														{ cartflows_admin.woo_currency +
															product_data.sell_price }
													</span>
												) }
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="wcf-product-selection--set-default whitespace-nowrap text-sm text-gray-500 w-[10%]">
							{ get_default_column( productOptdata, is_last ) }
						</div>
						<div className="wcf-product-selection--product-qty whitespace-nowrap text-sm text-gray-500 w-[10%]">
							<NumberField
								id=""
								name={ `wcf-checkout-products[${ index }][quantity]` }
								class={ `!w-16 !h-11 input-field !px-3 !py-2.5 !text-sm font-normal !rounded-md text-gray-400 !border-gray-200 focus:ring focus:!ring-primary-100 focus:!border-primary-500 focus:!shadow-none !outline-0 !outline-none !m-0` }
								value={ product_data.quantity }
								min="1"
							/>
						</div>
						<div className="wcf-product-selection--product-discount flex whitespace-nowrap text-sm text-gray-500 w-2/3">
							<SelectFieldWithIcon
								name={ `wcf-checkout-products[${ index }][discount_type]` }
								value={ product_data.discount_type }
								class="!block !w-16 !m-0"
								options={ discount_options }
								callback={ showDiscountvalue }
							/>
							<NumberField
								id=""
								class="input-field !w-16 !min-h-[43px] !text-sm font-normal !rounded-tr-md !rounded-tb-md !rounded-tl-none text-gray-400 !border !border-l-0 !border-gray-200 focus:!ring-0 focus:!ring-transparent focus:!shadow-none !outline-0 !outline-none !m-0"
								name={ `wcf-checkout-products[${ index }][discount_value]` }
								value={
									showDiscountValue === 'disable'
										? ''
										: product_data.discount_value
								}
								readonly={
									showDiscountValue === 'disable'
										? 'readonly'
										: ''
								}
							/>
						</div>
						<div className="wcf-product-selection-actions flex gap-2 relative whitespace-nowrap text-right text-sm font-medium w-[10%] justify-center">
							<Disclosure.Button
								className={ `text-left ${
									'yes' === isProductOptions
										? 'visible'
										: 'invisible'
								}` }
								onClick={ () =>
									setShowProductOptionDetails(
										! showProductOptionDetails
									)
								}
							>
								<span
									className={ `p-2 hover:text-primary-700 cursor-pointer flex justify-center items-center ${
										showProductOptionDetails
											? 'bg-primary-50 text-primary-500 rounded-md'
											: 'text-gray-500'
									} ` }
								>
									<Cog6ToothIcon
										className="h-18 w-18"
										index={ index }
									/>
								</span>
							</Disclosure.Button>
							<div
								className="wcf-delete-product-item p-2 text-primary-500 hover:text-primary-700 cursor-pointer flex justify-center items-center"
								onClick={ removeProduct }
								data-index={ index }
							>
								<TrashIcon className="h-18 w-18" />
							</div>
						</div>
						<input
							name={ `wcf-checkout-products[${ index }][product]` }
							type="hidden"
							className="wcf-checkout-product-id"
							value={ product_data.product }
						></input>
						<input
							name={ `wcf-checkout-products[${ index }][unique_id]` }
							type="hidden"
							className="wcf-checkout-product-unique"
							value={ product_data.unique_id }
						></input>
					</div>
					<Transition
						show={ open }
						as="div"
						enter="transition-max-height duration-500 ease-in-out"
						enterFrom="opacity-0 max-h-full"
						enterTo="opacity-100 max-h-full"
						leave="transition-max-height ease-in-out"
						leaveFrom="opacity-100 max-h-full"
						leaveTo="opacity-0 max-h-0"
					>
						<Disclosure.Panel>
							<div
								className={ `wcf-product-field-item-settings flex flex-col gap-5 p-6 ${
									showProductOptionDetails &&
									'yes' === productOptdata.add_to_cart
										? 'border border-t-0 border-primary-300'
										: ' border border-t-0 border-gray-200'
								}` }
								id={ 'product-option-index-' + index }
								data-id={ product_data.product_id }
							>
								<TextField
									class={ `wcf-product-name ${ productOptionsFieldClasses }` }
									wrapperClass="block"
									name={ `wcf-product-options-data[${ productOptdata.unique_id }][product_name]` }
									label={ __( 'Product Name', 'cartflows' ) }
									value={ productOptdata.product_name }
									displayAlign="vertical"
									desc={ __(
										'Use {{product_name}} and {{quantity}} to dynamically fetch respective product details.',
										'cartflows'
									) }
								/>
								<TextField
									class={ `wcf-product-subtext ${ productOptionsFieldClasses }` }
									wrapperClass="block"
									name={ `wcf-product-options-data[${ productOptdata.unique_id }][product_subtext]` }
									label={ __( 'Subtext', 'cartflows' ) }
									value={ productOptdata.product_subtext }
									displayAlign="vertical"
									desc={ __(
										'Use {{quantity}}, {{discount_value}}, {{discount_percent}} to dynamically fetch respective product details.',
										'cartflows'
									) }
								/>
								<CheckboxField
									className="wcf-product-enable-hl"
									name={ `wcf-product-options-data[${ productOptdata.unique_id }][enable_highlight]` }
									label={ __(
										'Enable Highlight',
										'cartflows'
									) }
									value={ productOptdata.enable_highlight }
									desc={ productOptdata.desc }
								/>
								<div
									className={
										'yes' !==
										productOptdata.enable_highlight
											? 'hidden'
											: ''
									}
								>
									<TextField
										class={ `wcf-product-hl-text ${ productOptionsFieldClasses }` }
										wrapperClass="block"
										name={ `wcf-product-options-data[${ productOptdata.unique_id }][highlight_text]` }
										displayAlign="vertical"
										label={ __(
											'Highlight Text',
											'cartflows'
										) }
										value={ productOptdata.highlight_text }
									/>
								</div>

								<input
									name={ `wcf-product-options-data[${ productOptdata.unique_id }][unique_id]` }
									type="hidden"
									className="wcf-product-options-unique-id"
									value={ productOptdata.unique_id }
								></input>
							</div>
						</Disclosure.Panel>
					</Transition>
				</>
			) }
		</Disclosure>
	);
}

export default ProductRepeaterItem;
