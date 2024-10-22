import React, { useState, useEffect } from 'react'
import { Container, Title, Button, Switch, Tooltip, Badge } from "@bsf/force-ui";
import { InfoIcon } from 'lucide-react';
import { Link } from 'react-dom/client';
import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';
import { useWidgetContext } from './WidgetContext'; 

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

    const { updateWidgetState } = useWidgetContext(); // Use context

    // Ensure the switch reflects the current active state
    const [activeState, setActiveState] = useState(is_active);

    // Effect to update local state when widget prop changes
    useEffect(() => {
        console.log("Widget prop updated:", widget); // Debugging log
        setActiveState(is_active); // Update local state when widget prop changes
    }, [is_active, widget]);

    const apiCall = async (newActiveState) => {
        const action = newActiveState ? 'hfe_activate_widget' : 'hfe_deactivate_widget';

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
                console.log(`Widget ${newActiveState ? 'activated' : 'dectivated'}`);
                updateWidgetState(id, newActiveState);
            } else if (data.error) {
                console.error('AJAX request failed:', data.error);
            }
        } catch (err) {
            console.error('AJAX request error:', err);
        } finally {
            processQueue();
        }
    }

    const handleSwitchChange = () => {
        const newActiveState = !activeState; // Toggle the active state
        console.log(`Switch toggled: ${newActiveState}`);
        apiCall(newActiveState);
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
                        <div>
                        {is_active ? ( 
                            <Switch
                                onChange={handleSwitchChange} // Updated to use the new function
                                size='sm'
                                value={activeState}
                            />
                        ) : (
                            <p className="text-sm text-text-tertiary">inactive</p> // Message when inactive
                        )}
                        </div>
                    )}
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