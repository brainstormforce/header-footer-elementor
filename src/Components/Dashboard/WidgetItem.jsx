import React, { useState } from 'react'
import { Container, Title, Button, Switch, Tooltip, Badge } from "@bsf/force-ui";
import { InfoIcon } from 'lucide-react';
import { Link } from 'react-dom/client';
import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';

// Create a queue to manage AJAX requests
const requestQueue = [];

const processQueue = () => {
    if (requestQueue.length === 0) return;

    // Take the first item from the queue and run it
    const currentRequest = requestQueue.shift();
    currentRequest();
};

const WidgetItem = ({
    widget
}) => {
    const {
        id,
        icon,
        title,
        viewDemo,
        infoText,
        is_pro,
        is_active
    } = widget

    // Track the active state of the widget using React state
    const [isActive, setIsActive] = useState(widget.is_active);
    const [isLoading, setIsLoading] = useState(false);

    const apiCall = async () => {
        const action = isActive ? 'hfe_deactivate_widget' : 'hfe_activate_widget';

        const formData = new window.FormData();
        formData.append('action', action);
        formData.append('nonce', hfe_admin_data.nonce);
        formData.append('module_id', id);

        try {
            const data = await apiFetch({
                url: hfe_admin_data.ajax_url,
                method: 'POST',
                body: formData,
            });

            if (data.success) {
                console.log(`Widget ${isActive ? 'activated' : 'deactivated'}`);
                setIsActive(isActive);  // Update the active state after the request
            } else if (data.error) {
                console.error('AJAX request failed:', data.error);
            }
        } catch (err) {
            console.error('AJAX request error:', err);
        } finally {
            setIsLoading(false);  // Always stop the loading spinner
            processQueue();
        }
    }

    const handleSwitchChange = () => {
        if (isLoading) return;

        setIsLoading(true);

        setIsActive(!isActive);  // Update the active state immediately

        // Add the request to the queue
        requestQueue.push(apiCall);

        if (requestQueue.length === 1) {
            // Start processing the queue if no other request is being processed
            processQueue();
        }
    };

    return (
        <Container align="center"
            containerType="flex"
            direction="column"
            justify="between"
            gap=""
        >
            <div className='flex items-center justify-between w-full'>
                <div className={`h-5 w-5 mb-5 ${icon?.props}`}>
                    {icon}
                </div>

                <div className='flex items-center gap-x-2'>
                    {/* {isNew && (
                        <Badge
                            label="New"
                            size="xs"
                            type="pill"
                            variant="blue"
                        />
                    )} */}


                    {is_pro && (
                        <Badge
                            label="PRO"
                            size="xs"
                            type="pill"
                            variant="inverse"

                        />)}
                    { !is_pro && (
                        <Switch
                            onChange={handleSwitchChange} // Updated to use the new function
                            size='sm'
                            value={isActive}
                        />)}
                </div>


            </div>

            <div className='flex flex-col w-full'>
                <p className='text-sm font-medium text-text-primary pt-3 m-0 pb-1'>{title}</p>
                <div className='flex items-center justify-between w-full'>
                    <p className='text-sm text-text-tertiary m-0 mb-1'>View Demo</p>
                    {/* <p className='text-sm text-text-tertiary m-0'>{viewDemo}</p> */}
                    <Tooltip
                        arrow
                        // content={title}
                        placement="bottom"
                        title=""
                        // triggers={[
                        //     'hover',
                        //     'focus'
                        // ]}
                        variant="dark"
                        width="100px"
                    >
                        <InfoIcon className='h-5 w-5' />
                    </Tooltip>

                </div>
            </div>
        </Container>
    )
}

export default WidgetItem
