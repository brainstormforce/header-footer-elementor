// External Dependences.
import { Fragment } from 'react';
import { useSelect } from '@wordpress/data';
import { Link } from 'react-router-dom';
import { __ } from '@wordpress/i18n';
// Internal Dependences.
import Creator from '../../creator';
import { useStateValue } from '@Utils/StateProvider';
import StepTemplate from './step-template';
import { ArrowSmallLeftIcon } from '@heroicons/react/24/outline';

function Template( props ) {
	const {
		templates,
		currentStep,
		required_step_type,
		currentStepId,
		setcurrentStepCB,
	} = props;
	const step_templates = templates;
	const [ { page_slug, flow_id } ] = useStateValue();

	const { step_types } = useSelect( ( select ) => {
		return {
			step_types: select( 'wcf/importer' ).getStoreStepTypes(),
		};
	} );

	const mode =
			typeof required_step_type === 'undefined' ? 'default' : 'dynamic',
		reqStepTypes =
			typeof required_step_type === 'undefined'
				? step_types
				: required_step_type;

	let step_id = 0;
	if ( typeof currentStepId !== 'undefined' ) {
		step_id = currentStepId;
	}

	const steps = Object.entries( reqStepTypes );

	return (
		<Fragment>
			{ mode === 'default' && (
				<div className="wcf-remote-steps-filters flex gap-4 items-center mb-8">
					<div className="wcf-back-button">
						<Link
							to={ {
								pathname: 'admin.php',
								search: `?page=${ page_slug }&path=store-checkout&action=wcf-edit-flow&flow_id=${ flow_id }'&tab=steps`,
							} }
							className="block mb-1.5"
						>
							<ArrowSmallLeftIcon className="w-6 h-6 stroke-2 text-gray-400 hover:text-primary-500" />
							<span className="wcf-flows-header__text sr-only">
								{ __( 'Back', 'cartflows' ) }
							</span>
						</Link>
					</div>
					<div className="wcf-categories">
						<ul className="wcf-step-type-filter--links flex items-center gap-4">
							{ steps.map( ( item ) => (
								<li key={ item[ 0 ] }>
									<a
										href="#"
										className={ `step-type-filter-item text-sm font-medium text-slate-800 bg-transparent py-1 px-3 rounded-md hover:bg-white hover:text-slate-800 focus:text-slate-800 ${
											item[ 0 ] === currentStep
												? 'bg-white'
												: ''
										}` }
										onClick={ () => {
											setcurrentStepCB( item[ 0 ] );
										} }
									>
										{ item[ 1 ] }
									</a>
								</li>
							) ) }
						</ul>
					</div>
				</div>
			) }

			<div className="wcf-step-importer__list wcf-items-list wcf-row wcf-step-row grid grid-cols-4 gap-6">
				{ /* Create from scratch */ }
				<div className="wcf-start-from-scratch">
					<Creator />
				</div>

				{ step_templates.map( ( item ) => (
					<StepTemplate
						item={ item }
						key={ item.id }
						mode={ mode }
						step_id={ step_id }
					/>
				) ) }
			</div>
		</Fragment>
	);
}

export default Template;
