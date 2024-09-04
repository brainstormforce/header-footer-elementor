import React, { useState } from 'react';
import { validateTitleField } from '@Utils/Helpers';
function AbSettingSliders( props ) {
	const { abVariations } = props;

	const initialAllValues = {};

	abVariations.map( ( step ) => {
		initialAllValues[ step.id ] = parseInt( step.traffic );
		return '';
	} );

	const [ allValues, setAllValues ] = useState( initialAllValues );

	const updateOtherVariations = function ( currentID, currentValue ) {
		currentID = parseInt( currentID );
		currentValue = parseInt( currentValue );

		let currentDiff = allValues[ currentID ] - currentValue;

		const tempData = {};
		abVariations.map( ( step ) => {
			const variationId = parseInt( step.id );

			if ( currentID === variationId ) {
				tempData[ variationId ] = currentValue;
			} else {
				let newValue = allValues[ variationId ] + currentDiff;

				if ( newValue < 0 ) {
					currentDiff = newValue;
					newValue = 0;
				} else if ( newValue > 100 ) {
					currentDiff = newValue - 100;
					newValue = 100;
				} else {
					currentDiff = 0;
				}

				tempData[ variationId ] = newValue;
			}

			return '';
		} );

		setAllValues( tempData );
	};

	return (
		<>
			{ abVariations &&
				abVariations.map( ( step ) => {
					const variationId = step.id;
					const title = step.title;

					return (
						<div
							className="wcf-traffic-field border-b border-b-gray-300 last:border-b-0 px-4 py-5"
							data-id={ step.id }
							key={ step.id }
						>
							<div className="wcf-step-name" title={ title }>
								{ validateTitleField( title, 20, 15 ) }
							</div>
							<div
								className="wcf-traffic-slider-wrap"
								data-variation-id={ step.id }
							>
								<div
									className={ `wcf-traffic-range wcf-traffic-range-${ step.id }` }
								>
									<input
										type="range"
										value={ allValues[ variationId ] }
										onChange={ ( e ) => {
											updateOtherVariations(
												variationId,
												e.target.value
											);
										} }
									/>
								</div>
								<div
									className={ `wcf-traffic-value wcf-traffic-value-${ step.id }` }
								>
									<input
										type="number"
										name={ `wcf_ab_settings[traffic][${ step.id }][value]` }
										value={ allValues[ variationId ] }
										className="wcf-traffic-input-field"
										onChange={ ( e ) => {
											updateOtherVariations(
												variationId,
												e.target.value
											);
										} }
									/>
									<span className="ml-2">%</span>
								</div>
							</div>
						</div>
					);
				} ) }
		</>
	);
}

export default AbSettingSliders;
