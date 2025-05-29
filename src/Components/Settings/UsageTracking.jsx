import React, { useState, useEffect, useRef } from 'react';
import { Container, Title, Button, Switch, Dialog } from "@bsf/force-ui";
import { __ } from '@wordpress/i18n';
import toast, { Toaster } from 'react-hot-toast';


const UsageTracking = () => {
    const [isActive, setIsActive] = useState(true);
    useEffect(() => {
        setIsActive(hfeSettingsData.analytics_status === 'yes');
    }, []);
    const handleSwitchChange = async () => {
        const newIsActive = !isActive;
        setIsActive(newIsActive);

        try {
            const response = await fetch(hfe_admin_data.ajax_url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    action: 'save_analytics_option', // WordPress action for your AJAX handler.
                    uae_analytics_optin: newIsActive ? 'yes' : 'no',
                    nonce: hfe_admin_data.nonce // Nonce for security.
                })
            });

            const result = await response.json();

            if (result.success) {
                toast.success(__('Settings saved successfully!', 'header-footer-elementor'));
            } else {
                toast.error(__('Failed to save settings!', 'header-footer-elementor'));
            }
        } catch (error) {
            toast.error(__('Failed to save settings!', 'header-footer-elementor'));
        }

        // setIsLoading(false);
    };

    return (
        <>
            <p className='text-base font-semibold m-0'>{__('Usage Tracking', 'header-footer-elementor')}</p>
            <Container
                align="center"
                className="flex flex-col lg:flex-row"
                containerType="flex"
                direction="column"
                gap="sm"
                justify="start"
            >
                <Container.Item
                    className="p-2 flex space-y-4"
                    alignSelf="auto"
                    order="none"
                >
                    <div className='flex flex-row items-start justify-start px-1 gap-3'>
                        <Switch
                            onChange={handleSwitchChange}
                            size='sm'
                            value={isActive}
                            className="hfe-remove-ring"
                        />
                        <div className='flex flex-col justify-start px-1 gap-3'>
                            <span className="font-bold text-text-primary m-0">
                                {__("Enable Usage Tracking", "header-footer-elementor")}
                            </span>
                            <span className="font-normal text-text-primary m-0">
                                {__(
                                    "Allow Brainstorm Force products to track non-sensitive usage tracking data. ",
                                    "header-footer-elementor"
                                )}
                                <a
                                    href="https://store.brainstormforce.com/usage-tracking/?utm_source=wp_dashboard&utm_medium=general_settings&utm_campaign=usage_tracking"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-link-primary"
                                >
                                    {__("Learn More", "header-footer-elementor")}
                                </a>
                            </span>
                        </div>
                        <Toaster
                            position="top-right"
                            reverseOrder={false}
                            gutter={8}
                            containerStyle={{
                                top: 20,
                                right: 20,
                                marginTop: '40px',
                            }}
                            toastOptions={{
                                duration: 1000,
                                style: {
                                    background: 'white',
                                },
                                success: {
                                    duration: 2000,
                                    style: {
                                        color: '',
                                    },
                                    iconTheme: {
                                        primary: '#6005ff',
                                        secondary: '#fff',
                                    },
                                },
                            }}
                        />
                    </div>
                </Container.Item>
            </Container>
        </>
    );
}

export default UsageTracking;
