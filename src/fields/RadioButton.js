import React, { useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import classnames from 'classnames';

function Radio( props ) {
	const { name, label, id, value, checked, desc } = props;

	const [ inputradio, setInputRadio ] = useState( checked );

	function handleRadioClick( e ) {
		setInputRadio( e.target.checked );
	}

	const unique_id = name + Math.random().toString( 36 ).substring( 2, 5 );

	return (
		<div className="wcf-field wcf-radio-button">
			<div className="wcf-field__data flex items-center gap-2.5">
				<div className="wcf-field__data--content">
					<input
						type="radio"
						name={ name }
						value={ value }
						defaultChecked={ inputradio }
						id={ id ? id : unique_id }
						onClick={ handleRadioClick }
						className={ classnames(
							'!h-5 !w-5 !border-gray-300 !text-primary-600 focus:!ring-primary-600 !shadow-none before:!content-none !outline-none m-0 mr-2'
						) }
					/>
				</div>
				{ label && (
					<div className="wcf-field__data--label text-sm font-medium text-left w-80">
						<label htmlFor={ id ? id : unique_id }>{ label }</label>
					</div>
				) }
			</div>

			{ desc && (
				<div className="wcf-field__desc text-sm font-regular">
					{ ReactHtmlParser( desc ) }
				</div>
			) }
		</div>
	);
}

export default Radio;
