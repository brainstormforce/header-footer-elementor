import React from 'react';
import { useStateValue } from '@Utils/StateProvider';
import InnerStep from './InnerStep';
import StepAbTestHead from './StepAbTestHead';
import ArchivedSteps from './ArchivedSteps';

function StepRow( props ) {
	const [ { is_cf_pro, global_checkout, flow_id, flow_type } ] =
		useStateValue();

	const {
		id,
		title,
		type,
		actions,
		menu_actions,
		ajaxcall,
		offer_yes_next_step,
		offer_no_next_step,
		invalid = false,
	} = props;

	const invalidStep = invalid ? true : false;
	const control_id = id;

	if ( 'storeCheckout' === flow_type ) {
		if ( [ 'checkout' ].includes( type ) ) {
			delete menu_actions.clone;
			if ( ! invalidStep ) {
				delete menu_actions.delete;
			}
		}
		if ( invalidStep ) {
			delete menu_actions.clone;
			delete menu_actions.abtest;
		}
	}
	let ab_test_ui = false,
		ab_test_start = false,
		ab_test_variations = [],
		ab_test_archived_variations = [],
		ab_test_variations_count = 0;

	if ( wcfCartflowsTypePro() ) {
		ab_test_ui = props[ 'ab-test-ui' ] ? props[ 'ab-test-ui' ] : false;
		ab_test_start = props[ 'ab-test-start' ]
			? props[ 'ab-test-start' ]
			: false;
		ab_test_variations = props[ 'ab-test-variations' ]
			? props[ 'ab-test-variations' ]
			: [];
		ab_test_archived_variations = props[ 'ab-test-archived-variations' ]
			? props[ 'ab-test-archived-variations' ]
			: [];

		ab_test_variations_count = ab_test_variations.length;

		if ( ab_test_variations_count < 2 ) {
			ab_test_ui = false;
		}
	}

	let step_wrap_class = '';

	if ( 'storeCheckout' === flow_type && invalidStep ) {
		step_wrap_class +=
			' invalid-step wcf-store-checkout pointer-events-none touch-none';
	}

	if ( ab_test_ui ) {
		step_wrap_class += ' wcf-ab-test flex flex-col items-center';
	}

	if (
		! wcfCartflowsTypePlusPro() &&
		( 'upsell' === type || 'downsell' === type )
	) {
		step_wrap_class +=
			' invalid-step pointer-events-none touch-none !bg-gray-50 !text-gray-300';
	}

	const innerStepProps = {
		is_cf_pro,
		global_checkout,
		flow_id,
		ab_test_ui,
		control_id,
		step_id: id,
		type,
		title,
		actions: Object.values( actions ),
		menu_actions: Object.values( menu_actions ),
		has_product_assigned: props.is_product_assigned,
		offer_yes_next_step,
		offer_no_next_step,
		ab_test_archived_variations,
		invalidStep,
	};

	const innerStepCb = function () {
		let output = '';

		innerStepProps.step_id = id;
		if ( ab_test_ui && ab_test_variations_count > 1 ) {
			let var_badge_count = 0;
			output = ab_test_variations.map( ( variation ) => {
				if ( control_id !== variation.id ) {
					++var_badge_count;
				}
				innerStepProps.is_variation = true;
				innerStepProps.control_id = control_id;
				innerStepProps.step_id = variation.id;
				innerStepProps.title = variation.title;
				innerStepProps.actions = Object.values( variation.actions );
				innerStepProps.menu_actions = Object.values(
					variation.menu_actions
				);
				innerStepProps.has_product_assigned =
					variation.is_product_assigned;
				innerStepProps.var_badge_count = var_badge_count;

				return <InnerStep { ...innerStepProps } key={ variation.id } />;
			} );
		} else {
			output = <InnerStep { ...innerStepProps } />;
		}

		return output;
	};

	const getAbTestArchivedSteps = function () {
		if ( ab_test_ui && ab_test_archived_variations.length > 0 ) {
			const archivedProps = {
				flow_id,
				control_id,
				type,
				archived_variations: ab_test_archived_variations,
			};
			return <ArchivedSteps { ...archivedProps } />;
		}
	};

	return (
		<div
			className={
				'wcf-step-wrap bg-white border shadow-sm rounded-lg mb-4' +
				step_wrap_class
			}
			id={ id }
			onDragEnd={ ajaxcall }
		>
			{ ab_test_ui && (
				<StepAbTestHead
					flow_id={ flow_id }
					control_id={ control_id }
					step_id={ id }
					abvariations={ ab_test_variations }
					ab_test_start={ ab_test_start }
				/>
			) }
			{ innerStepCb() }
			{ getAbTestArchivedSteps() }
		</div>
	);
}

export default StepRow;
