/**
 * Separate reducer only for Settings App.
 */

const default_page_builder = cartflows_admin?.page_builder
	? cartflows_admin.page_builder
	: 'other';

export const settingsinitialState = {
	is_cf_pro: cartflows_admin?.is_pro ? true : false,
	admin_url: 'test_url',
	flows_data: null,
	flows_pagination: {},
	flows_limit_over: false, // Removed the flow count condition.
	globaldata: [],
	page_builder: default_page_builder,
	active_flows_count: '',
	trash_flows_count: '',
	draft_flows_count: '',
	found_posts: '',
	flows_count: '',
	analyticsData: null,

	page_builder_group_data: cartflows_admin.required_plugins,
	page_builder_group:
		cartflows_admin.required_plugins[ default_page_builder ],
	options: [],
};

const settingsReducer = ( state, data ) => {
	switch ( data.type ) {
		case 'SET_FLOWS':
			if ( data.flows ) {
				return {
					...state,
					flows_data: [ ...data.flows ],
				};
			}
			return {
				...state,
				flows_data: data.flows,
			};

		case 'SET_FLOWS_DATA':
			return {
				...state,
				flows_data: [ ...data.flows ],
				flows_pagination: data.pagination,
				found_posts: data.found_posts,
				active_flows_count: data.active_flows_count,
				trash_flows_count: data.trash_flows_count,
				draft_flows_count: data.draft_flows_count,
				flows_count: data.found_posts,
				flows_limit_over: false, // Removed the flow count condition
			};

		case 'SET_SETTINGS':
			return {
				...state,
				globaldata: data.commondata,
				options: data.commondata.options,
			};
		case 'SET_PAGE_BUILDER':
			return {
				...state,
				page_builder: data.pagebuilder,
			};
		case 'SET_ANALYTICS_DATA':
			return {
				...state,
				analyticsData: data.analyticsData,
			};

		case 'SET_OPTION':
			const newOptions = state.options;
			newOptions[ data.name ] = data.value;
			return {
				...state,
				options: newOptions,
			};
		default:
			return state;
	}
};

export default settingsReducer;
