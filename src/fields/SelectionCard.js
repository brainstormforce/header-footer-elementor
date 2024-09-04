import React, { useEffect, useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { RadioGroup } from '@headlessui/react';
import { Tooltip } from '@Fields';

function SelectionCard( props ) {
	const {
		name,
		label,
		desc,
		tooltip,
		options,
		layout = 'horizontal',
		value,
		showRadio = true,
		after,
	} = props;

	useEffect( () => {
		if ( value === undefined ) {
			setSelected( '' );
		}
	}, [] );

	const [ selected, setSelected ] = useState( value );

	function handleonChange( newValue ) {
		setSelected( newValue );
		// Trigger change
		const changeEvent = new CustomEvent( 'wcf:selectioncard:change', {
			bubbles: true,
			detail: { e: {}, name: props.name, newValue },
		} );

		document.dispatchEvent( changeEvent );
	}

	function classNames( ...classes ) {
		return classes.filter( Boolean ).join( ' ' );
	}

	return (
		<div className="wcf-field wcf-select-option--card">
			<div className="wcf-field__data flex items-center gap-6">
				{ label && desc && (
					<div className="wcf-field__data--content-left flex-[0_0_35%]">
						{ label && (
							<div className="wcf-field__data--label text-sm font-medium text-left">
								<label>
									{ label }
									{ tooltip && <Tooltip text={ tooltip } /> }
								</label>
							</div>
						) }
					</div>
				) }

				<div className="wcf-field__data--content-right w-full">
					{ '' !== layout && 'horizontal' === layout && (
						// justify-center.
						<div className="flex">
							<RadioGroup
								value={ selected }
								onChange={ ( e ) => handleonChange( e ) }
							>
								<div className="-space-y-px rounded-md bg-white flex gap-2.5">
									{ options.map( ( option, settingIdx ) => (
										<>
											<RadioGroup.Option
												key={ settingIdx }
												value={ option.value }
												className={ ( { checked } ) =>
													classNames(
														checked
															? 'bg-[#FEF8F5] border-[#F6A285] z-10 wcf-selection-card--selected'
															: 'border-gray-200',
														'wcf-selection-card min-w-[123px] relative border pt-6 p-4 flex cursor-pointer focus:outline-none justify-around rounded-md'
													)
												}
											>
												{ ( { active, checked } ) => (
													<>
														<span className="flex flex-col items-center gap-y-3.5">
															{ option.image && (
																<img
																	src={
																		option.image
																	}
																	alt={
																		option.label
																	}
																	className="wcf-selection-card--image w-12 h-12"
																/>
															) }
															<RadioGroup.Label
																as="span"
																className={ classNames(
																	checked
																		? 'text-primary-600'
																		: 'text-gray-900',
																	'flex gap-2.5 items-center text-sm font-medium'
																) }
															>
																{ option.tooltip && (
																	<Tooltip
																		text={
																			option.tooltip
																		}
																		classes={
																			checked
																				? 'text-primary-600'
																				: 'hover:text-primary-600'
																		}
																	/>
																) }
																{ option.label }
															</RadioGroup.Label>
														</span>
														{ showRadio && (
															<span
																className={ classNames(
																	checked
																		? 'bg-[#F06434] border-transparent'
																		: 'bg-white border-gray-300',
																	active
																		? 'ring-2 ring-offset-2 ring-[#F06434]'
																		: '',
																	'wcf-selection-card--radio-button mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded-full border flex items-center justify-center absolute top-2 right-2.5'
																) }
																aria-hidden="true"
															>
																<span className="rounded-full bg-white w-1.5 h-1.5" />
															</span>
														) }
													</>
												) }
											</RadioGroup.Option>
										</>
									) ) }
								</div>
							</RadioGroup>
						</div>
					) }

					{ '' !== layout && 'vertical' === layout && (
						<RadioGroup
							value={ selected }
							onChange={ ( e ) => handleonChange( e ) }
						>
							<div className="-space-y-px rounded-md bg-white">
								{ options.map( ( option, settingIdx ) => (
									<>
										<RadioGroup.Option
											key={ settingIdx }
											value={ option.value }
											className={ ( { checked } ) =>
												classNames(
													settingIdx === 0
														? 'rounded-tl-md rounded-tr-md'
														: '',
													settingIdx ===
														option.length - 1
														? 'rounded-bl-md rounded-br-md'
														: '',
													checked
														? 'bg-[#FEF8F5] border-[#F6A285] z-10 wcf-selection-card--selected'
														: 'border-gray-200',
													'wcf-selection-card relative border p-4 flex cursor-pointer focus:outline-none'
												)
											}
										>
											{ ( { active, checked } ) => (
												<>
													{ showRadio && (
														<span
															className={ classNames(
																checked
																	? 'bg-[#F06434] border-transparent'
																	: 'bg-white border-gray-300',
																active
																	? 'ring-2 ring-offset-2 ring-[#F06434]'
																	: '',
																'wcf-selection-card--radio-button mt-0.5 h-4 w-4 shrink-0 cursor-pointer rounded-full border flex items-center justify-center'
															) }
															aria-hidden="true"
														>
															<span className="rounded-full bg-white w-1.5 h-1.5" />
														</span>
													) }
													<span className="ml-3 flex flex-col">
														{ option.image && (
															<img
																src={
																	option.image
																}
																alt={
																	option.label
																}
																className="wcf-selection-card--image w-12 h-12"
															/>
														) }

														{ option.label && (
															<RadioGroup.Label
																as="span"
																className={ classNames(
																	checked
																		? 'text-primary-600'
																		: 'text-gray-900',
																	'block text-sm font-medium'
																) }
															>
																{ option.tooltip && (
																	<Tooltip
																		text={
																			option.tooltip
																		}
																	/>
																) }
																{ option.label }
															</RadioGroup.Label>
														) }

														{ option.desc && (
															<RadioGroup.Description
																as="span"
																className={
																	'wcf-selection-card--description text-gray-600 block text-sm font-regular'
																}
															>
																{ option.desc }
															</RadioGroup.Description>
														) }
													</span>
												</>
											) }
										</RadioGroup.Option>
									</>
								) ) }
							</div>
						</RadioGroup>
					) }
				</div>
				{ after && (
					<div className="wcf-field__data--content__after">
						{ after }
					</div>
				) }

				<input
					type={ 'hidden' }
					name={ name }
					id={ name }
					value={ selected }
					onChange={ handleonChange }
				/>
			</div>
			{ desc && (
				<div
					className={
						'wcf-field__desc text-sm font-normal text-gray-500 mt-2'
					}
				>
					{ ReactHtmlParser( desc ) }
				</div>
			) }
		</div>
	);
}

export default SelectionCard;
