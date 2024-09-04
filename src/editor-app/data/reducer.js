/**
 * Separate reducer only for Editor App.
 */
export const initialState = {
	flow_id: cartflows_admin?.flow_id ? cartflows_admin?.flow_id : 0,
	is_cf_pro: cartflows_admin?.is_pro ? cartflows_admin.is_pro : false,
	page_slug: cartflows_admin?.home_slug
		? cartflows_admin.home_slug
		: 'cartflows',
	page_builder: cartflows_admin?.page_builder
		? cartflows_admin.page_builder
		: 'other',

	global_checkout: parseInt( cartflows_admin.global_checkout ),
	flows: [],
	flow_analytics: {},
	flow_settings: {},
	title: false,
	flow_title: '',
	flow_slug: '',
	flow_link: '#',
	emptySteps: false,
	steps: [],
	options: null,
	current_step: null,
	flow_type: 'flows',
	status: null,

	//Step
	step_id: 0,
	admin_url: 'test_url',
	page_builder_name: cartflows_admin?.page_builder_name
		? cartflows_admin.page_builder_name
		: '',
	step_data: {},
	view_url: '#',
	edit_url: '#',
	edit_builder_url: '#',
	settings_data: {},
	step_title: false,
	step_slug: '',
	design_settings: null,
	// options: null,
	page_settings: null,
	billing_fields: null,
	shipping_fields: null,
	ob_id: null,
	current_ob: null,
};

const reducer = ( state, action ) => {
	switch ( action.type ) {
		case 'SET_FLOW_DATA':
			action.data.options.post_title = action.data.title;
			action.data.options.post_name = action.data.slug;

			return {
				...state,
				title: action.data.title,
				flow_title: action.data.title,
				flow_slug: action.data.slug,
				flow_link: action.data.link,
				status: action.data.status,
				steps: action.data.steps,
				flow_settings: action.data.settings_data,
				emptySteps: action.data.steps.length < 1,
				options: { ...state.options, ...action.data.options },
				flow_analytics: action.data.flow_analytics,
			};

		case 'SET_FLOW_ANALYTICS':
			return {
				...state,
				flow_analytics: action.flow_analytics.data,
			};
		case 'SET_OPTION':
			const newOptions = state.options;
			newOptions[ action.name ] = action.value;

			return {
				...state,
				options: newOptions,
			};
		case 'SET_FLOW_TITLE':
			state.options.post_title = action.title;
			return {
				...state,
				title: action.title,
			};
		case 'SET_STEPS':
			return {
				...state,
				steps: action.steps,
			};
		case 'SET_GLOBAL_CHECKOUT':
			return {
				...state,
				global_checkout: action.global_checkout,
			};
		case 'SET_STORE_STEPS':
			const checkoutStep = [];
			const landingStep = [];
			state.steps.map( function ( step ) {
				if ( step.type === 'checkout' ) {
					checkoutStep.push( step );
				}
				if ( step.type === 'landing' ) {
					landingStep.push( step );
				}
				return '';
			} );
			let updatedSteps = [];
			updatedSteps = updatedSteps.concat( checkoutStep, landingStep );
			action.steps.map( function ( step ) {
				if ( 'undefined' !== typeof step.type ) {
					updatedSteps.push( step );
				}
				return '';
			} );
			updatedSteps = [
				...new Map(
					updatedSteps.map( ( step ) => [ step.id, step ] )
				).values(),
			];
			return {
				...state,
				steps: updatedSteps,
			};

		case 'SET_STEP_DATA':
			action.data.options.post_title = action.data.title;
			action.data.options.post_name = action.data.step_post_name;

			return {
				...state,
				// title: action.data.title,
				flow_title: action.data.flow_title,
				view_url: action.data.view,
				edit_url: action.data.edit
					? action.data.edit.replace( /&amp;/g, '&' )
					: '',
				edit_builder_url: action.data.page_builder_edit
					? action.data.page_builder_edit.replace( /&amp;/g, '&' )
					: '',
				step_data: action.data,
				settings_data: action.data.settings_data,
				design_settings: action.data.design_settings,
				page_settings: action.data.page_settings,
				custom_fields: action.data.custom_fields,

				billing_fields: action.data.billing_fields,
				shipping_fields: action.data.shipping_fields,

				options: { ...state.options, ...action.data.options },
				step_title: action.data.title,
				step_slug: action.data.step_post_name,
				step_id: action.data.id,
			};

		case 'SET_STEP_TITLE':
			state.options.post_title = action.title;
			return {
				...state,
				step_title: action.title,
			};
		case 'SET_OB_TITLE':
			const ob_index = state.options[ action.name ].findIndex(
				( ob ) => ob.id === action.ob_id
			);
			state.options[ action.name ][ ob_index ].title = action.title;
			// state.current_ob.title = action.title;
			return {
				...state,
			};
		case 'SET_OB_STATUS':
			const index = state.options[ action.name ].findIndex(
				( ob ) => ob.id === action.ob_id
			);
			state.options[ action.name ][ index ].status = action.newStatus;
			return {
				...state,
			};
		case 'SET_STEP_VIEW_URL':
			return {
				...state,
				view_url: action.step_view_url,
			};

		case 'SET_FIELDS':
			if ( 'billing' === action.field_type ) {
				return {
					...state,
					billing_fields: action.fields,
				};
			}
			return {
				...state,
				shipping_fields: action.fields,
			};

		case 'SET_OB_OPTION':
			const newOBOptions = state.current_ob;
			newOBOptions[ action.name ] = action.value;
			return {
				...state,
				current_ob: newOBOptions,
			};
		case 'UPDATE_OPTIONS':
			return {
				...state,
				options: action.options,
			};

		case 'ADD_CHECKOUT_PRODUCT':
			const products = state.options[ action.field_name ];

			if ( products ) {
				products.push( action.product_data );

				state.options[ action.field_name ] = products;
			}

			return {
				...state,
			};
		case 'ADD_OB_PRODUCT':
			const currentBbData = state.current_ob;

			if ( currentBbData ) {
				currentBbData.product = action.product.product;
				currentBbData.product_image = action.product.product_image;
				currentBbData.desc_text = action.product.desc_text;
				state.current_ob = currentBbData;
			}
			return {
				...state,
			};
		case 'REMOVE_OB_PRODUCT':
			const currenOBBData = state.current_ob;

			currenOBBData.product = '';
			currenOBBData.product_image = cartflows_admin.image_placeholder;
			currenOBBData.desc_text =
				'Lorem Ipsum has been the industry standard dummy text ever since the 1500s when an unknown printer took a galley of type and scrambled it to make a type specimen book.';
			state.current_ob = currenOBBData;

			return {
				...state,
			};

		case 'ADD_OFFER_PRODUCT':
			// Replace the existing and update the newly selected product in the state.
			state.options[ action.field_name ] = action.product_data;

			return {
				...state,
			};

		case 'REMOVE_OFFER_PRODUCT':
			if ( state.options[ action.field_name ] ) {
				state.options[ action.field_name ] = '';
			}

			return {
				...state,
			};

		case 'REMOVE_CHECKOUT_PRODUCT':
			const unique_id = action.unique_id;
			const all_products = state.options[ action.field_name ];

			if ( unique_id && all_products ) {
				state.options[ action.field_name ] = all_products.filter(
					function ( product_data ) {
						return product_data.unique_id !== unique_id;
					}
				);
			}

			return {
				...state,
			};

		case 'UPDATE_CHECKOUT_PRODUCTS':
			state.options[ action.field_name ] = action.products;

			return {
				...state,
			};

		case 'UPDATE_ORDER_BUMP':
			state.options[ action.name ] = action.order_bumps;

			return {
				...state,
			};
		case 'REMOVE_ORDER_BUMP':
			const ob_id = action.ob_id;
			const all_order_bumps = state.options[ action.name ];

			state.options[ action.name ] = all_order_bumps.filter( function (
				obs
			) {
				return obs.id !== ob_id;
			} );

			return {
				...state,
			};
		case 'SET_CURRENT_OB':
			const obIndex = state.options[ 'wcf-order-bumps' ].findIndex(
				( ob ) => ob.id === action.ob_id
			);
			state.options[ 'wcf-order-bumps' ][ obIndex ] = action.current_ob;
			return {
				...state,
				ob_id: action.ob_id,
				current_ob: action.current_ob,
			};

		case 'ADD_NEW_OB_GROUP':
			const OBGroup = state.current_ob[ action.name ];

			if ( OBGroup ) {
				OBGroup.push( action.newGroup );

				state.current_ob[ action.name ] = OBGroup;
			}
			return {
				...state,
			};
		case 'ADD_NEW_GROUP':
			const DOgroup = state.options[ action.name ];

			if ( DOgroup ) {
				DOgroup.push( action.newGroup );

				state.options[ action.name ] = DOgroup;
			}

			return {
				...state,
			};

		case 'ADD_NEW_OB_RULE':
			const OBconditions = state.current_ob[ action.name ];
			const OBgroup_id = action.group_id;

			if ( OBconditions && OBgroup_id ) {
				for ( const group of OBconditions ) {
					if ( OBgroup_id === group.group_id ) {
						group.rules.push( action.newRule );
						break;
					}
				}

				state.current_ob[ action.name ] = OBconditions;
			}

			return {
				...state,
			};
		case 'ADD_NEW_RULE':
			const conditions = state.options[ action.name ];
			const group_id = action.group_id;

			if ( conditions && group_id ) {
				for ( const group of conditions ) {
					if ( group_id === group.group_id ) {
						group.rules.push( action.newRule );
						break;
					}
				}
				state.options[ action.name ] = conditions;
			}

			return {
				...state,
			};

		case 'REMOVE_OB_RULE':
			const all_ob_conditions = state.current_ob[ action.name ];
			for ( let i = 0; i < all_ob_conditions.length; i++ ) {
				if ( action.group_id === all_ob_conditions[ i ].group_id ) {
					const OBrules = all_ob_conditions[ i ].rules;

					for ( let j = 0; j < OBrules.length; j++ ) {
						if ( OBrules[ j ].rule_id === action.rule_id ) {
							all_ob_conditions[ i ].rules.splice( j, 1 );
							break;
						}
					}

					if ( all_ob_conditions[ i ].rules.length === 0 ) {
						all_ob_conditions.splice( i, 1 );
					}
				}
			}

			state.current_ob[ action.name ] = all_ob_conditions;
			return {
				...state,
			};
		case 'REMOVE_RULE':
			const all_conditions = state.options[ action.name ];

			for ( let i = 0; i < all_conditions.length; i++ ) {
				if ( action.group_id === all_conditions[ i ].group_id ) {
					const rules = all_conditions[ i ].rules;

					for ( let j = 0; j < rules.length; j++ ) {
						if ( rules[ j ].rule_id === action.rule_id ) {
							all_conditions[ i ].rules.splice( j, 1 );
							break;
						}
					}

					if ( all_conditions[ i ].rules.length === 0 ) {
						all_conditions.splice( i, 1 );
					}
				}
			}
			state.options[ action.name ] = all_conditions;
			return {
				...state,
			};

		case 'RESET_OB_RULE_VALUE':
			const all_ob_rules = state.current_ob[ action.name ];

			for ( const group of all_ob_rules ) {
				if ( action.group_id === group.group_id ) {
					const ob_group_rules = group.rules;
					for ( const rule of ob_group_rules ) {
						if ( action.rule_id === rule.rule_id ) {
							rule.value = '';
							break;
						}
					}
					break;
				}
			}
			state.current_ob[ action.name ] = all_ob_rules;
			return {
				...state,
			};
		case 'RESET_RULE_VALUE':
			const all_rules = state.options[ action.name ];

			for ( const group of all_rules ) {
				if ( action.group_id === group.group_id ) {
					const do_group_rules = group.rules;
					for ( const rule of do_group_rules ) {
						if ( action.rule_id === rule.rule_id ) {
							rule.value = '';
							break;
						}
					}
					break;
				}
			}
			state.options[ action.name ] = all_rules;

			return {
				...state,
			};
		case 'SET_RULES_GROUPS':
			state.options[ action.fieldName ] = action.groups;
			return {
				...state,
			};

		case 'SET_OB_RULES_GROUPS':
			state.current_ob[ action.fieldName ] = action.groups;
			return {
				...state,
			};

		case 'SET_OB':
			state.options[ action.fieldName ] = action.obs;
			return {
				...state,
			};

		default:
			return state;
	}
};

export default reducer;
