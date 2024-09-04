// JSON data.
const default_page_builder = cartflows_admin.default_page_builder;
const page_builder_group_data = cartflows_admin.required_plugins;
const page_builder_group =
	cartflows_admin.required_plugins[ default_page_builder ];

const flows_list = {};
flows_list[ default_page_builder ] = Object.values(
	cartflows_admin.flows_and_steps
);

const store_checkout_flows_list = {};
store_checkout_flows_list[ default_page_builder ] = Object.values(
	cartflows_admin.store_checkout_flows_and_steps
);

const get_flows_count = () => {
	if ( ! Object.values( cartflows_admin.flows_count ).length ) {
		return 0;
	}

	let flowCount = 0;

	for ( status in cartflows_admin.flows_count ) {
		if ( 'publish' === status ) {
			flowCount += parseInt( cartflows_admin.flows_count[ status ] );
		}
	}

	return flowCount;
};

const getCurrentFlowSteps = () => {
	return Object.values( cartflows_admin.currentFlowSteps ).length
		? cartflows_admin.currentFlowSteps[ 'wcf-steps' ]
		: [];
};

const getStepTemplates = () => {
	const step_templates = [];
	const flows = cartflows_admin.flows_and_steps;

	if ( flows ) {
		flows.forEach( ( element ) => {
			element.steps.forEach( ( step_element ) => {
				step_element.template_ID = element.ID;
				step_element.template_type = element.type;
				step_templates.push( step_element );
			} );
		} );
	}

	return step_templates;
};

const initialState = {
	default_page_builder,
	page_builder_group_data,
	page_builder_group,
	preview: {},
	woocommerce_status: cartflows_admin.woocommerce_status,
	requiredPluginsData: cartflows_admin.required_plugins_data,
	missingPlugins: cartflows_admin.is_any_required_plugins_missing,
	flow_count: 4,
	cf_pro_status: cartflows_admin.cf_pro_status,
	all_flows: {
		...flows_list,
	},
	store_checkout_flows: {
		...store_checkout_flows_list,
	},
	all_step_templates: getStepTemplates(),
	currentFlowSteps: getCurrentFlowSteps(),
	flowsCount: get_flows_count(),
	currentFlowId: cartflows_admin.flow_id,
	selectedStep: '',
	license_status: cartflows_admin.license_status,
	stepTypes: {
		landing: 'Landing',
		checkout: 'Checkout',
		upsell: 'Upsell',
		downsell: 'Downsell',
		thankyou: 'Thank You',
		optin: 'Optin',
	},
	storeStepTypes: {
		upsell: 'Upsell',
		downsell: 'Downsell',
		thankyou: 'Thank You',
	},
};

const reducer = ( state = initialState, action ) => {
	if ( action.type === 'SET_MISSING_PLUGINS' ) {
		console.log( 'SET_MISSING_PLUGINS', action );
		return { ...state, missingPlugins: action.missingPlugins };
	}

	if ( action.type === 'UPDATE_WOOCOMMERCE_STATUS' ) {
		console.log( 'UPDATE_WOOCOMMERCE_STATUS', action );
		return { ...state, woocommerce_status: action.woocommerce_status };
	}

	if ( action.type === 'UPDATE_CF_PRO_STATUS' ) {
		console.log( 'UPDATE_CF_PRO_STATUS', action );
		return { ...state, cf_pro_status: action.cf_pro_status };
	}

	if ( action.type === 'SET_SELECTED_STEP' ) {
		console.log( 'SET_SELECTED_STEP', action );
		return { ...state, selectedStep: action.selectedStep };
	}

	if ( action.type === 'SET_PREVIEW' ) {
		console.log( 'SET_PREVIEW', action );
		return { ...state, preview: action.preview };
	}

	if ( action.type === 'SET_REQUIRED_PLUGINS' ) {
		state.requiredPluginsData[ action.page_builder ] = action.value;

		return { ...state };
	}

	if ( action.type === 'SET_ALL_FLOWS' ) {
		state.all_flows[ action.page_builder ] = action.flows;

		return { ...state };
	}

	return state;
};

export default reducer;
