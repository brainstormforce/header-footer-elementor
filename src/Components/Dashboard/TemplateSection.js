import React from 'react';
import {
    Title,
    Button
} from '@bsf/force-ui';
import { __ } from '@wordpress/i18n'; 

const TemplateSection = () => {
	return (
        <div
            className="hfe-dashboard-templates p-6 bg-white rounded-lg shadow-md"
        >
            <div className="mb-4">
                <img
                    src={`${hfeSettingsData.templates_url}`}
                    alt="Template Showcase"
                    className="w-full h-auto rounded"
                />
            </div>
            <Title
                className="mt-2"
                icon={null}
                iconPosition="right"
                size="xs"
                tag="h2"
                title={__('Build Websites 10x Faster with Templates', 'header-footer-elementor')}
                description={__( 'Choose from our professionally designed websites to build your site faster, with easy customization options.', 'header-footer-elementor')}
            />
            <Button
                className="w-full mt-4"
                icon={null}
                iconPosition="left"
                size="md"
                variant="secondary"
            >
                {__('View Templates', 'header-footer-elementor')}
            </Button>
        </div>
	);
};

export default TemplateSection;