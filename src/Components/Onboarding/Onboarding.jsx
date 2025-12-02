import React, { useEffect } from 'react';
import OB from './index';

const Onboarding = () => {
	useEffect( () => {
		const body = document.body;
		body.classList.add( 'hfe-onboarding-fullscreen' );

		return () => {
			body.classList.remove( 'hfe-onboarding-fullscreen' );
		};
	}, [] );

	return (
		<>
			<OB />
		</>
	);
};

export default Onboarding;
