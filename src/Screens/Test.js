import React, { useState } from 'react';
// import { useState } from '@wordpress/element';
import {
	Alert,
} from '@bsf/force-ui';

const Test = () => {

	return (
		<div className="pb-4">
			<Alert
				title={'Info alert'}
				content={'This is a description'}
				variant="error"
			/>
		</div>
	);
};

export default Test;
