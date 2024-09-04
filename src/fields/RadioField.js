import React, { useState, useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser';

function RadioField( props ) {
	const {
		name,
		label,
		value,
		options,
		desc,
		child_class = '',
		onClick = '',
	} = props;

	const [ inputvalue, setInputvalue ] = useState( value );

	useEffect( () => {
		setInputvalue( value );
	}, [ value ] );

	function handleRadioClick( e ) {
		setInputvalue( e.target.value );

		// Trigger change
		const changeEvent = new CustomEvent( 'wcf:radio:change', {
			bubbles: true,
			detail: { e, name: props.name, value: e.target.value },
		} );

		document.dispatchEvent( changeEvent );

		if ( onClick ) {
			onClick( e.target.value );
		}
	}

	return (
		<div className="wcf-field wcf-radio-field">
			<div className="wcf-field__data block">
				{ label && (
					<div className="wcf-field__data--label text-sm font-medium text-left w-80 mb-2">
						<label className="text-gray-800 text-base font-normal">
							{ label }
						</label>
					</div>
				) }

				<div className={ `wcf-field__data--content ` }>
					{ options &&
						options.map( function ( option ) {
							const unique_id =
								name +
								'-' +
								Math.random().toString( 36 ).substring( 2, 5 );

							return (
								<>
									<div
										className={ `wcf-radio-field__option text-left py-1.5 ${ child_class }` }
										key={ unique_id }
									>
										<input
											type="radio"
											name={ name }
											value={ option.value }
											defaultChecked={
												inputvalue === option.value
											}
											id={ unique_id }
											onClick={ handleRadioClick }
											className="!h-5 !w-5 !border-gray-300 !text-primary-600 focus:!ring-primary-600 !shadow-none before:!content-none !outline-none my-0 !mr-2"
										/>
										<span className="wcf-radio-field__option-text text-sm font-medium text-left w-80">
											<label
												htmlFor={ unique_id }
												className="text-gray-800 text-base font-normal"
											>
												{ option.label }
											</label>
										</span>
										{ option.desc && (
											<div className="wcf-field__desc text-sm font-normal text-gray-500 mt-2">
												{ option.desc }
											</div>
										) }
									</div>
								</>
							);
						} ) }
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

export default RadioField;
