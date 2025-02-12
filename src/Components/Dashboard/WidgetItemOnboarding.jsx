import React, { useEffect, useState } from 'react'
import { Container, Button, Skeleton, Title, Label, RadioButton, Badge, Switch } from "@bsf/force-ui";
import { InfoIcon, FileText } from 'lucide-react';
import { ChevronLeft, ChevronRight, LoaderCircle, SearchIcon } from "lucide-react";
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

const WidgetItemOnboarding = ({
    widget,
    updateCounter
}) => {
    const {
        id,
        icon,
        title,
        infoText,
        is_pro,
        is_active,
        slug,
        demo_url,
        doc_url,
        description,
        is_new
    } = widget

    // Track the active state of the widget using React state
    const [isActive, setIsActive] = useState(widget.is_active);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Update local state when the widget prop changes
        setIsActive(widget.is_active);
    }, [widget.is_active, updateCounter]);

    const apiCall = (activateWidget) => {
        const action = activateWidget ? 'hfe_deactivate_widget' : 'hfe_activate_widget';

        const formData = new window.FormData();
        formData.append('action', action);
        formData.append('nonce', hfe_admin_data.nonce);
        formData.append('module_id', id);
        formData.append('is_pro', is_pro);

        try {
            const data = apiFetch({
                url: hfe_admin_data.ajax_url,
                method: 'POST',
                body: formData,
            });

            if (data.success) {
                setIsActive(isActive);  // Update the active state after the request
            } else if (data.error) {
            }
        } catch (err) {
            
        } finally {
            setIsLoading(false);  // Always stop the loading spinner
            processQueue();
        }
    }

    const handleSwitchChange = () => {
        if (isLoading) return;

        setIsLoading(true);

        if (isActive) {
            // Add the request to the queue
            setIsActive(false);
            requestQueue.push(() => apiCall(isActive));
        } else {
            // Add the request to the queue
            setIsActive(true);
            requestQueue.push(() => apiCall(isActive));
        }
        if (requestQueue.length === 1) {
            // Start processing the queue if no other request is being processed
            processQueue();
        }
    };

    return (
        // <Container align="center"
        //     containerType="flex"
        //     direction="column"
        //     justify="between"
        //     gap=""
        // >
        //     <div className='flex items-center justify-between w-full'>
        //         <div className={`h-10 w-10 mb-5 ${icon?.props}`} style={{ fontSize: '22px' }}>
        //             {icon}
        //         </div>

        //         <div className='flex items-center gap-x-2' style={{ marginBottom: '15px' }}>

        //             {is_pro && (
        //                 <Badge
        //                     label="PRO"
        //                     size="xs"
        //                     type="pill"
        //                     variant="inverse"

        //                 />)}
        //             {!is_pro && (
        //                 <Switch
        //                     onChange={handleSwitchChange} // Updated to use the new function
        //                     size='sm'
        //                     value={isActive}
        //                     className="hfe-remove-ring"
        //                 />)}
        //         </div>


        //     </div>

        //     <div className='flex flex-col w-full'>
        //         <p className='text-sm font-medium text-text-primary pt-3 m-0 pb-1'>{title}</p>
        //         <div className='flex items-center justify-between w-full'>
        //             {demo_url && (
        //                 <a href={demo_url} target="_blank" rel="noopener noreferrer" className='text-sm text-text-tertiary m-0 mb-1 hfe-remove-ring' style={{ textDecoration: 'none', lineHeight: '1.5rem' }}>
        //                     {__('View Demo', 'header-footer-elementor')}
        //                 </a>
        //             )}
        //             <div className={`${!demo_url ? 'hfe-tooltip-wrap' : ''}`}>
        //                 <Tooltip
        //                     arrow
        //                     content={
        //                         <div>
        //                             <span className='font-semibold block mb-2'>{title}</span>
        //                             <span className='block mb-2'>{description}</span>
        //                             {doc_url && (
        //                                 <a href={doc_url} target="_blank" rel="noopener noreferrer" className='cursor-pointer' style={{ color: '#B498E5', textDecoration: 'none' }}>
        //                                     <FileText style={{ color: '#B498E5', width: '11px', height: '11px', marginRight: '3px' }} />
        //                                     {__('Read Documentation', 'header-footer-elementor')}
        //                                 </a>
        //                             )}
        //                         </div>
        //                     }
        //                     placement="bottom"
        //                     title=""
        //                     triggers={[
        //                         'click'
        //                     ]}
        //                     variant="dark"
        //                     size="xs"
        //                 >
        //                     <InfoIcon className='h-5 w-5' size={18} color="#A0A5B2" />
        //                 </Tooltip>
        //             </div>
        //         </div>
        //     </div>
        // </Container>
        <div className="bg-background-secondary min-h-screen w-full pb-10">
        <form onSubmit={function Ki() { }}>
            <div className="md:w-[47rem] box-border mx-auto p-8 mt-10 border border-solid border-border-subtle bg-background-primary rounded-xl shadow-sm space-y-4">
                <div>
                    <Title
                        className="text-text-primary"
                        size="md"
                        tag="h4"
                        title="Add More Power to Your Website"
                    />
                    <Label className="text-text-secondary mt-1 text-sm max-w-[41rem] font-normal">
                        These tools can help you build your website faster and easier. Try them out and see how they can help your website grow.
                    </Label>
                </div>
                <div className="bg-background-secondary p-1 rounded-lg max-h-80 overflow-auto">
                    <RadioButton.Group
                        columns={2}
                        gapClassname="gap-1"
                        multiSelection
                        size="sm"
                    >
                        <RadioButton.Button
                            badgeItem={<Badge label="Free" size="xxs" type="pill" variant="green" />}
                            borderOn
                            buttonWrapperClasses="bg-white border-0"
                            // icon={<PrestoPlayerLogo />}
                            label={{
                                description: 'Fast, customizable & beautiful WordPress theme.',
                                heading: 'Astra Theme'
                            }}
                            onChange={function Ki() { }}
                            useSwitch
                            value="Astra"
                        />
                        <RadioButton.Button
                            badgeItem={<Badge label="Free" size="xxs" type="pill" variant="green" />}
                            borderOn
                            buttonWrapperClasses="bg-white border-0"
                            // icon={<PrestoPlayerLogo />}
                            label={{
                                description: 'Build your dream website in minutes with AI.',
                                heading: 'Starter Templates'
                            }}
                            onChange={function Ki() { }}
                            useSwitch
                            value="Starter"
                        />
                        <RadioButton.Button
                            badgeItem={<Badge label="Free" size="xxs" type="pill" variant="green" />}
                            borderOn
                            buttonWrapperClasses="bg-white border-0"
                            // icon={<PrestoPlayerLogo />}
                            label={{
                                description: 'The new way to sell on WordPress.',
                                heading: 'SureCart'
                            }}
                            onChange={function Ki() { }}
                            useSwitch
                            value="SureCart"
                        />
                        <RadioButton.Button
                            badgeItem={<Badge label="Free" size="xxs" type="pill" variant="green" />}
                            borderOn
                            buttonWrapperClasses="bg-white border-0"
                            // icon={<PrestoPlayerLogo />}
                            label={{
                                description: 'Automate your WordPress setup.',
                                heading: 'Presto Player'
                            }}
                            onChange={function Ki() { }}
                            useSwitch
                            value="Presto"
                        />
                        <RadioButton.Button
                            badgeItem={<Badge label="Free" size="xxs" type="pill" variant="green" />}
                            borderOn
                            buttonWrapperClasses="bg-white border-0"
                            // icon={<PrestoPlayerLogo />}
                            label={{
                                description: 'Fast, customizable & beautiful WordPress theme.',
                                heading: 'Astra Theme'
                            }}
                            onChange={function Ki() { }}
                            useSwitch
                            value="Astra2"
                        />
                        <RadioButton.Button
                            badgeItem={<Badge label="Free" size="xxs" type="pill" variant="green" />}
                            borderOn
                            buttonWrapperClasses="bg-white border-0"
                            // icon={<PrestoPlayerLogo />}
                            label={{
                                description: 'Build your dream website in minutes with AI.',
                                heading: 'Starter Templates'
                            }}
                            onChange={function Ki() { }}
                            useSwitch
                            value="Starter2"
                        />
                    </RadioButton.Group>
                </div>
                <div className="flex justify-between items-center pt-2 gap-4">
                    <Button
                        className="flex items-center gap-2"
                        icon={<ChevronLeft />}
                        variant="outline"
                    >
                        Back
                    </Button>
                    <div className="flex justify-end items-center gap-3">
                        <Button variant="ghost">
                            {' '}Skip
                        </Button>
                        <Button
                            className="flex items-center gap-2"
                            icon={<ChevronRight />}
                            iconPosition="right"
                        >
                            Continue Setup
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    </div>
    )
}

export default WidgetItemOnboarding
