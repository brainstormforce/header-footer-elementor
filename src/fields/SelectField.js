import React, { useState, useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Tooltip } from '@Fields';
import classnames from 'classnames';

function SelectField( props ) {
	const {
		name,
		id,
		label,
		desc,
		tooltip,
		options,
		onSelect,
		prodata,
		after,
		sectionClass = '',
		wrapperClass = '',
		labelClass = '',
		descClass = '',
		displayAlign = 'horizontal',
		overrideCss = false,
	} = props;

	const [ value, setValue ] = useState( props.value );
	const sectionWrapperClass = sectionClass ? sectionClass : 'text-left',
		labelWrapperClass = labelClass
			? labelClass
			: 'text-sm font-medium mb-2',
		descWrapperClass = descClass
			? descClass
			: 'text-sm font-normal text-gray-500 mt-2';

	let fieldWrapper = wrapperClass
		? wrapperClass
		: 'flex items-center gap-2.5';

	if ( 'horizontal' !== displayAlign ) {
		fieldWrapper = 'block w-full text-left';
	}

	useEffect( () => {
		setValue( props.value );
	}, [ props.value ] );

	function handleChange( e ) {
		setValue( e.target.value );

		// Trigger change
		const changeEvent = new CustomEvent( 'wcf:select:change', {
			bubbles: true,
			detail: { e, name: props.name, value: e.target.value },
		} );

		document.dispatchEvent( changeEvent );

		if ( props?.callback ) {
			props.callback( e, props.name, e.target.value );
		}

		if ( onSelect ) {
			onSelect( e );
		}
	}

	return (
		<div
			className={ `wcf-field wcf-select-option ${ sectionWrapperClass }` }
		>
			<div className={ `wcf-field__data ${ fieldWrapper }` }>
				{ label && (
					<div
						className={ `wcf-field__data--label ${ labelWrapperClass }` }
					>
						<label>
							{ label }
							{ tooltip && <Tooltip text={ tooltip } /> }
						</label>
					</div>
				) }

				<div className="wcf-field__data--content">
					<select
						className={ classnames(
							props.class ? props.class : '',
							! overrideCss
								? 'w-full !max-w-full h-auto input-field !pl-3 !pr-6 !py-2.5 !text-sm font-normal !rounded-md text-gray-400 !border-gray-200 focus:ring focus:!ring-primary-100 focus:!border-primary-500 focus:!shadow-none !outline-0 !outline-none !m-0 !placeholder-gray-400'
								: ''
						) }
						name={ name }
						id={ id }
						value={ value }
						onChange={ handleChange }
					>
						{ options &&
							options.map( ( option ) => {
								let option_label = option.label,
									disabled = false;

								if ( prodata && option.value in prodata ) {
									option_label = prodata[ option.value ];
									disabled = true;
								}

								if ( option.isopt ) {
									return (
										<optgroup
											label={ option.title }
											key={ option.title }
										>
											{ option.options.map(
												( optOption ) => {
													return (
														<option
															value={
																optOption.value
															}
															disabled={
																disabled
															}
															key={
																optOption.value
															}
														>
															{ optOption.label }
														</option>
													);
												}
											) }
										</optgroup>
									);
								}
								return (
									<option
										value={ option.value }
										disabled={ disabled }
										key={ option.value }
									>
										{ option_label }
									</option>
								);
							} ) }
					</select>
				</div>
				{ after && (
					<div
						className={ `wcf-field__data--content__after ${ descWrapperClass }` }
					>
						{ after }
					</div>
				) }
			</div>
			{ desc && (
				<div className={ `wcf-field__desc ${ descWrapperClass }` }>
					{ ReactHtmlParser( desc ) }
				</div>
			) }
		</div>
	);
}

export default SelectField;
