// Import react components.
import React, { useState, useEffect } from 'react';
import { ReactSortable } from 'react-sortablejs';
import classnames from 'classnames';
// Import custom react components.
import { useStateValue } from '@Utils/StateProvider';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';

// Import the fields.
import { ProductField, Spinner } from '@Fields';
import ProductRepeaterItem from './ProductRepeaterItem';
import CreateWooProduct from './CreateWooProduct';

// Import CSS files.
// import './ProductRepeater.scss';

// Import icons
import { PlusIcon } from '@heroicons/react/24/outline';

function ProductRepeater( props ) {
	const [ { options }, dispatch ] = useStateValue();

	const { name, value } = props;
	const CheckoutProducts = options[ name ];
	const [ selectedProduct, setSelectedProduct ] = useState();
	const [ inputValue, setInputValue ] = useState( '' );
	const [ inputValueError, setInputValueError ] = useState( false );
	const defaultActionButtonText = __( 'Add', 'cartflows' );

	const [ isAddingProduct, setIsAddingProduct ] = useState( {
		isInProcessing: false,
		buttonText: defaultActionButtonText,
	} );

	const { isInProcessing, buttonText } = isAddingProduct;
	const productCondition = options[ 'wcf-product-options' ];
	const productOptionsdata = options[ 'wcf-product-options-data' ];

	useEffect( () => {
		dispatch( {
			type: 'UPDATE_CHECKOUT_PRODUCTS',
			field_name: name,
			products: value,
		} );

		return () => {};
	}, [] );

	const addProduct = function ( e ) {
		const product_id = selectedProduct?.value;

		setInputValue( selectedProduct );

		if ( product_id ) {
			e.target.blur();
			setIsAddingProduct( {
				isInProcessing: true,
				buttonText: __( 'Adding…', 'cartflows' ),
			} );

			apiFetch( {
				path: `/cartflows/v1/admin/product-data/${ product_id }`,
			} ).then( ( data ) => {
				const product_data = {
					product: product_id,
					quantity: '1',
					discount_type: '',
					discount_value: '',
					unique_id: Math.random().toString( 36 ).substring( 2, 10 ),
					name: selectedProduct?.label,
					img_url: data?.img_url,
					regular_price: data?.regular_price,
				};

				dispatch( {
					type: 'ADD_CHECKOUT_PRODUCT',
					field_name: name,
					product_data,
				} );

				setInputValue( null );

				if ( wcfCartflowsPro() ) {
					const prod_opt_data = options[ 'wcf-product-options-data' ];
					prod_opt_data[ product_data.unique_id ] = {
						enable_highlight: 'no',
						highlight_text: '',
						product_name: '',
						product_subtext: '',
					};

					dispatch( {
						type: 'SET_OPTION',
						name: 'wcf-product-options-data',
						value: prod_opt_data,
					} );
				}

				setIsAddingProduct( {
					isInProcessing: false,
					buttonText: defaultActionButtonText,
				} );
			} );

			setSelectedProduct( null );
		} else {
			setInputValueError( true );
			e.target.blur();
			setTimeout( () => {
				setInputValueError( false );
			}, 3000 );
		}
	};

	const get_product_options = function () {
		const product_options = {};

		if ( productOptionsdata ) {
			Object.keys( productOptionsdata ).map( ( productValue ) => {
				const value1 = productOptionsdata[ productValue ];

				product_options[ productValue ] = {
					...value1,
				};
				return '';
			} );
		}

		const readyProductOptions = [];
		const defaultProductData = {
			enable_highlight: 'no',
			highlight_text: '',
			product_name: '',
			product_subtext: '',
			add_to_cart: 'yes',
		};
		counter = 0;
		CheckoutProducts.map( function ( checkoutProduct ) {
			if ( checkoutProduct?.unique_id ) {
				let tempProduct = {
					...defaultProductData,
				};

				const unique_id = checkoutProduct.unique_id;

				if ( product_options[ unique_id ] ) {
					tempProduct = {
						...product_options[ unique_id ],
					};
				}

				tempProduct.product_id = checkoutProduct?.product;
				tempProduct.product_name = tempProduct.product_name
					? tempProduct.product_name
					: checkoutProduct?.name;

				// To show the product name in backend product option settings tab.
				tempProduct.product_title = checkoutProduct?.name;

				tempProduct.unique_id = checkoutProduct.unique_id;

				if ( 'single-selection' !== productCondition ) {
					tempProduct.add_to_cart = tempProduct.add_to_cart
						? tempProduct.add_to_cart
						: 'yes';
				}

				// Need counter to check if add_to_cart value exist or is yes.
				if ( 'single-selection' === productCondition ) {
					if (
						tempProduct.add_to_cart &&
						tempProduct.add_to_cart !== 'no'
					) {
						counter++;
					}

					if ( ! product_options[ unique_id ] ) {
						tempProduct.add_to_cart = 'no';
					}
				}

				readyProductOptions.push( tempProduct );
			}

			// Always first product will be selected if no value saved.
			if ( 'single-selection' === productCondition && counter === 0 ) {
				readyProductOptions[ 0 ].add_to_cart = 'yes';
			}
			return '';
		} );

		return readyProductOptions;
	};

	let counter = 0;
	const productOptions = wcfCartflowsPro() ? get_product_options() : [];

	return (
		<div className="wcf-checkout-product-selection-field">
			{ CheckoutProducts && CheckoutProducts.length === 0 && (
				<>
					<input
						name="wcf-checkout-products"
						type="hidden"
						value=""
					></input>
					<div className="border border-gray-200 bg-gray-25 text-center text-sm font-normal rounded-md p-5">
						{ __(
							'Once you have selected products, they will be displayed here.',
							'cartflows'
						) }
					</div>
				</>
			) }
			{ CheckoutProducts && CheckoutProducts.length > 0 && (
				<div className="flow-root">
					<div className="overflow-visible">
						<div className="inline-block min-w-full py-2 align-middle">
							<div className="overflow-visible shadow border border-gray-200 rounded-md">
								<div className="wcf-product-selection--header border-b border-gray-200 flex gap-3 p-3">
									<div className="text-left text-sm font-semibold text-gray-900 w-1/2">
										{ __( 'Items', 'cartflows' ) }
									</div>
									<div className="text-left text-sm font-semibold text-gray-900 w-[10%]">
										{ __( 'Default', 'cartflows' ) }
									</div>
									<div className="text-left text-sm font-semibold text-gray-900 w-[10%]">
										{ __( 'Quantity', 'cartflows' ) }
									</div>
									<div className="text-left text-sm font-semibold text-gray-900 w-2/3">
										{ __( 'Discount', 'cartflows' ) }
									</div>
									<div className="relative w-[10%]">
										<span className="sr-only">
											{ __( 'Edit', 'cartflows' ) }
										</span>
									</div>
								</div>
								<ReactSortable
									list={ CheckoutProducts }
									setList={ ( newState ) =>
										dispatch( {
											type: 'UPDATE_CHECKOUT_PRODUCTS',
											field_name: name,
											products: newState,
										} )
									}
									direction={ 'vertical' }
									filter={
										'.wcf-field, .wcf-product-selection-actions'
									}
									preventOnFilter={ false }
									className="wcf-checkout-product-selection-field__content" // divide-y divide-solid
								>
									{ CheckoutProducts.map(
										( CheckoutProductsData, index ) => {
											if (
												'yes' ===
												CheckoutProductsData.add_to_cart
											) {
												counter++;
											}
											return (
												<ProductRepeaterItem
													key={
														CheckoutProductsData.unique_id
													}
													index={ index }
													field_name={ name }
													product_data={
														CheckoutProductsData
													}
													productOptdata={
														productOptions.length >
														0
															? productOptions[
																	index
															  ]
															: []
													}
												/>
											);
										}
									) }
								</ReactSortable>
							</div>
						</div>
					</div>
				</div>
			) }
			<div className="wcf-checkout-product-selection-field__add-new flex justify-between gap-5 mt-5">
				<ProductField
					name=""
					desc=""
					class={ inputValueError ? 'border border-primary-600' : '' }
					field="product"
					value={ inputValue }
					allowed_products=""
					include_products="braintree-subscription, braintree-variable-subscription"
					excluded_products="grouped"
					placeholder={ __( 'Find products', 'cartflows' ) }
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

						{ isInProcessing && <Spinner /> }

						{ buttonText }
					</button>
				</div>
			</div>

			<span
				className={ `${
					inputValueError ? 'block' : 'hidden'
				} text-primary-600 text-sm font-normal transition duration-150 ease-in-out mt-1 ml-0.5` }
			>
				{ ' ' }
				{ __(
					'Please search and select at-lease one product to add.',
					'cartflows'
				) }
			</span>

			<CreateWooProduct />
		</div>
	);
}

export default ProductRepeater;
