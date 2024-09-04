import React, { useState, useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser';
import apiFetch from '@wordpress/api-fetch';
import { Tooltip } from '@Fields';
import './ProductField.scss';
import AsyncSelect from 'react-select/async';

function ProductField( props ) {
	const {
		label,
		name,
		desc,
		value,
		allowed_products = [],
		include_products = [],
		excluded_products = [],
		tooltip,
		placeholder,
		onChangeCB,
		nameComp,
		attr,
		isMulti = false,
		sectionClass = '',
		wrapperClass = '',
		labelClass = '',
		descClass = '',
	} = props;

	const [ selectedValue, setSelectedValue ] = useState( value );

	useEffect( () => {
		setSelectedValue( value );
	}, [ value ] );

	// handle selection
	// should fix, need proper naming for variables
	//eslint-disable-next-line no-shadow
	const handleChange = ( value ) => {
		setSelectedValue( value );

		// Trigger change
		const changeEvent = new CustomEvent( 'wcf:product:change', {
			bubbles: true,
			detail: { e: {}, name: props.name, value },
		} );

		document.dispatchEvent( changeEvent );

		if ( onChangeCB ) {
			onChangeCB( value );
		}
	};

	const loadOptions = ( inputValue ) => {
		if ( inputValue.length >= 3 ) {
			const formData = new window.FormData();
			formData.append( 'allowed_products', allowed_products );
			formData.append( 'include_products', include_products );
			formData.append( 'exclude_products', excluded_products );

			formData.append( 'action', 'cartflows_json_search_products' );
			formData.append(
				'security',
				cartflows_admin.json_search_products_nonce
			);

			formData.append( 'term', inputValue );

			return new Promise( ( resolve ) => {
				apiFetch( {
					url: cartflows_admin.ajax_url,
					method: 'POST',
					body: formData,
				} ).then( ( res ) => {
					resolve( res );
				} );
			} );
		}
	};

	// Prepare the custom components for inner fields.
	const customComponents = {
		MultiValueLabel: ( multiValueProps ) => (
			<div
				{ ...multiValueProps.innerProps }
				title={ multiValueProps.data.label }
			>
				{ multiValueProps.children }
			</div>
		),
	};

	return (
		<div
			className={ `wcf-select2-field wcf-product-field w-full ${ sectionClass }` }
		>
			<div className={ `wcf-selection-field ${ wrapperClass }` }>
				{ label && (
					<label
						className={ `block text-sm font-medium text-left mb-2 ${ labelClass }` }
					>
						{ label }
						{ tooltip && <Tooltip text={ tooltip } /> }
					</label>
				) }

				<AsyncSelect
					className={ `wcf-select2-input border border-gray-200 !rounded-md ${
						props.class ? props.class : ''
					}` }
					classNamePrefix="wcf"
					name={ nameComp ? `${ name }` : `${ name }[]` }
					isMulti={ isMulti }
					isClearable={ true }
					value={ selectedValue }
					getOptionLabel={ ( e ) => e.label }
					getOptionValue={ ( e ) => e.value }
					loadOptions={ loadOptions }
					onChange={ handleChange }
					placeholder={ placeholder }
					cacheOptions
					components={ customComponents }
					{ ...attr }
				/>
			</div>
			{ desc && (
				<div
					className={ `wcf-field-desc text-sm font-normal text-gray-400 mt-3 ${ descClass }` }
				>
					{ ReactHtmlParser( desc ) }
				</div>
			) }
		</div>
	);
}

export default ProductField;
