import React from 'react';
import {
	Title,
} from '@bsf/force-ui';
import { __ } from '@wordpress/i18n';

const HeaderLine = () => {
	return (
		<Title
			className="hfe-header-title"
			description=""
			icon={ null }
			iconPosition="right"
			size="xs"
			tag="h6"
			title={ __( 'Formerly Elementor Header & Footer Builder', 'header-footer-elementor' ) }
		/>
	);
};

export default HeaderLine;
