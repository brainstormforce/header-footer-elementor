import React, { useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import apiFetch from '@wordpress/api-fetch';
import './CouponField.scss';
import { Tooltip } from '@Fields';
import AsyncSelect from 'react-select/async';

function CouponField( props ) {
	const {
		label,
		name,
		desc,
		value,
		tooltip,
		placeholder,
		onChangeCB,
		nameComp,
		isMulti = false,
		sectionClass = '',
		wrapperClass = '',
		descClass = '',
		fieldClass = '',
		attr,
	} = props;

	const [ selectedValue, setSelectedValue ] = useState( value );

	// handle selection
	const handleChange = ( newValue ) => {
		setSelectedValue( newValue );

		// Trigger change
		const changeEvent = new CustomEvent( 'wcf:coupon:change', {
			bubbles: true,
			detail: { e: {}, name: props.name, newValue },
		} );

		document.dispatchEvent( changeEvent );

		if ( onChangeCB ) {
			onChangeCB( newValue );
		}
	};

	const loadOptions = ( inputValue ) => {
		const formData = new window.FormData();

		formData.append( 'action', 'cartflows_json_search_coupons' );
		formData.append(
			'security',
			cartflows_admin.json_search_coupons_nonce
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
	};

	return (
		<div
			className={ `wcf-select2-field wcf-coupon-field ${ sectionClass }` }
		>
			<div className={ `wcf-coupon-field-wrapper ${ wrapperClass }` }>
				{ label && (
					<label className="block text-sm text-gray-600 font-medium mb-2 text-left">
						{ label }
						{ tooltip && <Tooltip text={ tooltip } /> }
					</label>
				) }

				<AsyncSelect
					className={ `wcf-select2-input !block border border-gray-200 !rounded-md !m-0 ${ fieldClass }` }
					classNamePrefix="wcf"
					name={ nameComp ? `${ name }` : `${ name }[]` }
					isClearable={ true }
					isMulti={ isMulti }
					value={ selectedValue }
					getOptionLabel={ ( e ) => e.label }
					getOptionValue={ ( e ) => e.value }
					loadOptions={ loadOptions }
					onChange={ handleChange }
					placeholder={ placeholder }
					cacheOptions
					{ ...attr }
				/>
			</div>

			{ desc && (
				<div
					className={ `wcf-field-desc text-sm font-normal text-gray-400 mt-5 text-left ${ descClass }` }
				>
					{ ReactHtmlParser( desc ) }
				</div>
			) }
		</div>
	);
}

export default CouponField;
