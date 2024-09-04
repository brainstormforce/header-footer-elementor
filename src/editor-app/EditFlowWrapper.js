import React, { useEffect } from 'react';
import { useStateValue } from '@Utils/StateProvider';
import apiFetch from '@wordpress/api-fetch';
import InputEvents from '@Admin/editor-app/utils/InputEvents';
/* Component */
import PagesRoute from '@FlowEditor/PagesRoute';

function EditFlowWrapper() {
	const [ { flow_id }, dispatch ] = useStateValue();

	// Add input event listeners
	InputEvents( dispatch );

	useEffect( () => {
		let isActive = true;

		const getFlowData = async () => {
			apiFetch( {
				path: `/cartflows/v1/admin/flow-data/${ flow_id }`,
			} ).then( ( data ) => {
				if ( isActive ) {
					// Add the data into the data layer
					dispatch( {
						type: 'SET_FLOW_DATA',
						data,
					} );
				}
			} );
		};

		getFlowData();

		return () => {
			isActive = false;
		};
	}, [] );

	return (
		<>
			{ /* <div className="editor-wrap__content"> */ }
			<PagesRoute />
			{ /* </div> */ }
		</>
	);
}

export default EditFlowWrapper;
