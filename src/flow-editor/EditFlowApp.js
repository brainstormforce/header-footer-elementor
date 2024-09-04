import React from 'react';
import { useLocation } from 'react-router-dom';

/* State Provider */
import reducer, { initialState } from '@Editor/data/reducer';
import { StateProvider } from '@Utils/StateProvider';

/* Css */
import '@FlowEditor/EditFlowApp.scss';

import EditFlowWrapper from '@Editor/EditFlowWrapper';

function EditFlow( props ) {
	const query = new URLSearchParams( useLocation()?.search );
	const flow_id = query.get( 'flow_id' );

	/* Update flow_id and step_id in initialState */
	if ( 'flows' === props.flowType ) {
		initialState.flow_id = flow_id;
		initialState.flow_type = 'flows';
	} else {
		initialState.flow_id = cartflows_admin.global_checkout_id;
		initialState.flow_type = 'storeCheckout';
	}

	return (
		<>
			<StateProvider reducer={ reducer } initialState={ initialState }>
				<EditFlowWrapper type={ props.flowType } />
			</StateProvider>
		</>
	);
}

export default EditFlow;
