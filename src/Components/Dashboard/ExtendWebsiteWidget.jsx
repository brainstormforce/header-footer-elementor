import React from 'react'
import { Container, Title, Button, Switch, Tooltip, Badge, Label } from "@bsf/force-ui";
import { InfoIcon } from 'lucide-react';
import apiFetch from '@wordpress/api-fetch';

const ExtendWebsiteWidget = ({
    plugin,
    onPluginAction
}) => {
    const {  
        path,
        slug,
        siteUrl,
        icon,
        type,
        name,
        zipUrl,
        desc,
        wporg,
        isFree,
        action,
        status
    } = plugin

    const handlePluginAction = () => {
        const action = getAction( status );// Determine action based on current state
        onPluginAction( slug, action ); // Call the passed function with the plugin ID and action
    };

    const getAction = ( status ) => {
		if ( status === 'Activated' ) {
			return '';
		} else if ( status === 'Installed' ) {
			return 'hfe_recommended_plugin_activate';
		}
		return 'hfe_recommended_plugin_install';
	};

    return (
        <Container align="center"
            className="bg-background-primary p-4 rounded-md shadow-sm"
            containerType="flex"
            direction="column"
            justify="between"
            gap="lg"
        >
            <div className='flex items-center justify-between w-full'>
                <div className='h-5 w-5'>
                    <img
                        src={icon}
                        alt="Recommended Plugins/Themes"
                        className="w-full h-auto rounded"
                    />
                </div>

                <div className='flex items-center gap-x-2'>
                    {isFree && (
                        <Badge
                            label="Free"
                            size="xs"
                            type="pill"
                            variant="green"
                        />
                    )}

                    <Button
                        size="xs"
                        variant="link"
                        className="cursor-pointer text-link-primary"
                        onClick={handlePluginAction} // Trigger action on click
                        data-plugin={zipUrl}
                        data-type={type}
                        data-slug={slug} 
                        data-site={siteUrl}
                        data-action={ action }
                    >
                        { 'Installed' === status ? 'Activate' : status }
                    </Button>
                </div>
            </div>

            <div className='flex flex-col w-full'>
                <p className='text-sm font-medium text-text-primary pb-1 m-0'>{name}</p>
                <p className='text-sm font-medium text-text-tertiary text-wrap m-0'>{desc}</p>
                <div className='flex items-center justify-between w-full'>
                <p className='text-sm text-text-tertiary m-0'>{status}</p>
                    {/* <Tooltip
                arrow
                content={infoText}
                placement="top"
                title=""
                triggers={[
                    'hover',
                    'focus'
                ]}
                variant="light"
                width="100px"
            >
                <InfoIcon className='h-5 w-5' />
            </Tooltip> */}

                </div>
            </div>
        </Container>
    )
}

export default ExtendWebsiteWidget
