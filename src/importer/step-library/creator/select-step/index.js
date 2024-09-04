// External.
import { compose } from '@wordpress/compose';
import { withSelect, withDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

import './SelectStep.scss';

const SelectStep = ( { stepTypes, setSelectedStep } ) => {
	return (
		<div className="wcf-create-step__dropdown-list wcf-select-option w-72">
			<select
				onChange={ ( event ) => {
					console.log( event.target.value );
					setSelectedStep( event.target.value );
				} }
				className="!w-full !max-w-full !h-auto input-field !px-3 !py-2.5 !text-sm font-normal !rounded-md text-gray-400 !border-gray-200 focus:ring focus:!ring-primary-100 focus:!border-primary-500 focus:!shadow-none !outline-0 !outline-none !m-0 !placeholder-gray-400"
			>
				<option value="" className="" key="all">
					{ __( 'Select Step Type', 'cartflows' ) }
				</option>
				{ Object.keys( stepTypes ).map( ( stepTypeSlug ) => {
					return (
						<option
							className={ stepTypeSlug }
							value={ stepTypeSlug }
							key={ stepTypeSlug }
						>
							{ stepTypes[ stepTypeSlug ] }
						</option>
					);
				} ) }
			</select>
		</div>
	);
};

export default compose(
	withSelect( ( select ) => {
		const { getstepTypes } = select( 'wcf/importer' );
		return {
			stepTypes: getstepTypes(),
		};
	} ),
	withDispatch( ( dispatch ) => {
		const { setSelectedStep } = dispatch( 'wcf/importer' );
		return {
			setSelectedStep( selectedStep ) {
				setSelectedStep( selectedStep );
			},
		};
	} )
)( SelectStep );
