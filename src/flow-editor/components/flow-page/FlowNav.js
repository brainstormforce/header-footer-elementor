import React from 'react';
import { useLocation } from 'react-router-dom';

function FlowNav( prop ) {
	const location = useLocation();
	const tab = '' !== location.hash ? location.hash : '#general_settings';
	const navClass =
		prop.slug === tab ? 'wcf-settings-nav__active' : 'wcf-settings-nav';

	return (
		<a href={ prop.slug } className={ navClass }>
			{ prop.title }
		</a>
	);
}

export default FlowNav;
