const actions = {
	updateWooCommerceStatus( woocommerce_status ) {
		return {
			type: 'UPDATE_WOOCOMMERCE_STATUS',
			woocommerce_status,
		};
	},

	updateCFProStatus( cf_pro_status ) {
		return {
			type: 'UPDATE_CF_PRO_STATUS',
			cf_pro_status,
		};
	},

	setMissingPlugins( missingPlugins ) {
		return {
			type: 'SET_MISSING_PLUGINS',
			missingPlugins,
		};
	},

	setPreview( data ) {
		return {
			type: 'SET_PREVIEW',
			preview: data,
		};
	},

	setSelectedStep( data ) {
		return {
			type: 'SET_SELECTED_STEP',
			selectedStep: data,
		};
	},

	setRequiredPlugins( page_builder, value ) {
		return {
			type: 'SET_REQUIRED_PLUGINS',
			page_builder,
			value,
		};
	},
	setAllFlows( flows, page_builder ) {
		return {
			type: 'SET_ALL_FLOWS',
			flows,
			page_builder,
		};
	},
};

export default actions;
