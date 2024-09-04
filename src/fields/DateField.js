import React, { useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Tooltip } from '@Fields';
import Datepicker from 'react-tailwindcss-datepicker';
import { __ } from '@wordpress/i18n';

function DatePickerField( props ) {
	const {
		name,
		label,
		value,
		tooltip,
		desc,
		onChangeCB,
		placeholder = __( 'Select Dates', 'cartflows' ),
	} = props;

	const [ datevalue, setDateValue ] = useState( {
		startDate: value.startDate,
		endDate: value.endDate,
	} );

	const classNames = props.classNames ? props.classNames : 'w-64 h-9';

	const handleValueChange = ( newValue ) => {
		if ( onChangeCB ) {
			onChangeCB( newValue );
		}
		setDateValue( newValue );
	};

	return (
		<div className="wcf-field wcf-date-field">
			<div className="wcf-field__data flex items-center gap-2.5">
				{ label && (
					<div className="wcf-field__data--label text-sm font-medium">
						<label>
							{ label }
							{ tooltip && <Tooltip text={ tooltip } /> }
						</label>
					</div>
				) }

				<div className="wcf-field__data--content w-full">
					<Datepicker
						name={ name }
						onChange={ handleValueChange }
						inputClassName={ classNames }
						value={ datevalue }
						maxDate={ new Date() }
						separator={ '-' }
						showShortcuts={ true }
						primaryColor={ 'orange' }
						placeholder={ placeholder }
						useRange={ false } //https://react-tailwindcss-datepicker.vercel.app/props#use-range
						// displayFormat={"DD/MM/YY"}
					/>
				</div>
			</div>

			{ desc && (
				<div className="wcf-field__desc text-sm font-regular">
					{ ReactHtmlParser( desc ) }
				</div>
			) }
		</div>
	);
}

export default DatePickerField;
