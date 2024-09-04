const selectors = {
	getCount( { age } ) {
		return age;
	},

	getAllFlows( { all_flows } ) {
		return all_flows;
	},

	getStoreCheckoutFlows( { store_checkout_flows } ) {
		return store_checkout_flows;
	},

	getFlowsList( { all_flows }, page_builder ) {
		if ( all_flows[ page_builder ] ) {
			return all_flows[ page_builder ];
		}
		return [];
	},

	getStoreCheckoutFlowsList( { store_checkout_flows }, page_builder ) {
		if ( store_checkout_flows[ page_builder ] ) {
			return store_checkout_flows[ page_builder ];
		}
		return [];
	},

	getAllStepTemplates( { all_step_templates } ) {
		return all_step_templates;
	},

	isLimitReached( { cf_pro_status, flow_count } ) {
		return (
			( 'not-installed' === cf_pro_status ||
				'inactive' === cf_pro_status ) &&
			flow_count >= 3
		);
	},

	getFlowsCount( {} ) {
		return 0;
	},
	getcurrentFlowId( { currentFlowId } ) {
		return currentFlowId;
	},
	getLicenseStatus( { license_status } ) {
		return license_status;
	},
	getselectedStepTitle( { stepTypes, selectedStep } ) {
		return stepTypes[ selectedStep ] || '';
	},
	getselectedStep( { selectedStep } ) {
		return selectedStep;
	},
	getstepTypes( { stepTypes } ) {
		return stepTypes;
	},
	getStoreStepTypes( { storeStepTypes } ) {
		return storeStepTypes;
	},
	getcurrentFlowSteps( { currentFlowSteps } ) {
		return currentFlowSteps;
	},

	getMissingPlugins( { missingPlugins } ) {
		return missingPlugins;
	},

	getPreview( { preview } ) {
		return preview;
	},

	getWooCommerceStatus( { woocommerce_status } ) {
		return woocommerce_status;
	},

	getDefaultPageBuilder( { default_page_builder } ) {
		return default_page_builder;
	},

	getPageBuilderGroup( { page_builder_group } ) {
		return page_builder_group;
	},

	getFlowCount( { flow_count } ) {
		return flow_count;
	},

	getCFProStatus( { cf_pro_status } ) {
		return cf_pro_status;
	},
	getCurrentPageBuilderData( { page_builder_group_data }, page_builder ) {
		return page_builder_group_data[ page_builder ];
	},
	getRequiredPluginsData( { requiredPluginsData } ) {
		return requiredPluginsData;
	},
};

export default selectors;
