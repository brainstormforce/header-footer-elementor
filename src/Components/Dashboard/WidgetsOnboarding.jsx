import React, { useState, useEffect } from 'react';
import WidgetItemOnboarding from './WidgetItemOnboarding';
import { Container, Button, Title, Label, RadioButton, Badge } from "@bsf/force-ui";
import apiFetch from '@wordpress/api-fetch';
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { Link } from "../../router/index";
import { routes } from "../../admin/settings/routes";
import Widgets from './Widgets';
import OnboardingWidgets from './OnboardingWidgets';

const WidgetsOnboarding = ({ widgets, updateCounter, setCurrentStep }) => {
    const [allWidgetsData, setAllWidgetsData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Queue for managing requests
    const requestQueue = [];

    const processQueue = async () => {
        while (requestQueue.length > 0) {
            const currentRequest = requestQueue.shift();
            await currentRequest();
        }
        setIsLoading(false);
    };

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                setIsLoading(true);
                const data = await apiFetch({
                    path: '/hfe/v1/widgets',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-WP-Nonce': hfeSettingsData.hfe_nonce_action,
                    },
                });
                setAllWidgetsData(convertToWidgetsArray(data));
            } catch (error) {
                console.error('Failed to fetch widgets:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchSettings();
    }, [updateCounter]);

    const apiCall = async (widget, activateWidget) => {
        try {
            const formData = new window.FormData();
            formData.append('action', activateWidget ? 'hfe_activate_widget' : 'hfe_deactivate_widget');
            formData.append('nonce', hfe_admin_data.nonce);
            formData.append('module_id', widget.id);
            formData.append('is_pro', widget.is_pro);

            const response = await apiFetch({
                url: hfe_admin_data.ajax_url,
                method: 'POST',
                body: formData,
            });

            console.log({ response })

            if (response.success) {
                widget.is_active = activateWidget;
                setAllWidgetsData([...allWidgetsData]);
            }
        } catch (error) {
            console.error('API request failed:', error);
        }
    };

    const handleSwitchChange = (widget) => {
        if (isLoading) return;

        // Optimistically update the state
        const updatedWidgets = allWidgetsData.map(w =>
            w.id === widget.id ? { ...w, is_active: !w.is_active } : w
        );
        setAllWidgetsData(updatedWidgets);

        // Add the API call to the request queue
        requestQueue.push(() => apiCall(widget, !widget.is_active));
        if (requestQueue.length === 1) {
            processQueue();
        }
    };

    const convertToWidgetsArray = (data) => {
        return Object.entries(data).map(([key, widget]) => ({
            id: key,
            ...widget,
            is_active: widget.is_activate !== undefined ? widget.is_activate : true,
        }));
    };
    return (
        <div className="bg-background-secondary">
            <form>
                <div className="md:w-[47rem] box-border mx-auto mt-10 border border-solid border-border-subtle bg-background-primary rounded-xl shadow-sm space-y-4" style={{ height: '400px' }}>
                    <div className="bg-background-secondary p-1 rounded-lg max-h-80" style={{ overflow: 'auto', maxHeight: '20rem' }}>
                        {/* <RadioButton.Group
                            columns={3}
                            gapClassname="gap-1"
                            multiSelection
                            size="sm"
                        >
                            {allWidgetsData?.map((widget) => (
                                <RadioButton.Button
                                    key={widget.id}
                                    icon={widget.icon}
                                    badgeItem={
                                        widget.is_pro ? (
                                            <Badge
                                                label="PRO"
                                                size="xs"
                                                type="pill"
                                                variant="inverse"
                                            />
                                        ) : (
                                            <Badge
                                                label="Free"
                                                size="xxs"
                                                type="pill"
                                                variant="green"
                                            />
                                        )
                                    }
                                    borderOn
                                    useSwitch={!widget.is_pro} // Conditionally render the switch
                                    buttonWrapperClasses="bg-white border-0"
                                    label={{
                                        // description: widget.description,
                                        heading: widget.title
                                    }}
                                    onChange={() => handleSwitchChange(widget)}
                                    checked={widget.is_active}
                                />
                            ))}
                        </RadioButton.Group> */}
                            <OnboardingWidgets/>
                    </div>
                    <div className="flex justify-between items-center pt-1 px-4 gap-4">
                        <Button
                            className="flex items-center gap-1"
                            icon={<ChevronLeft />}
                            variant="outline"
                            onClick={() => setCurrentStep(1)}
                        >
                            Back
                        </Button>
                        <div className="flex justify-end items-center gap-3">
                            <Link
                                to={routes.dashboard.path}

                            >
                                <Button
                                    className="hfe-remove-ring"
                                    variant="ghost">
                                    {' '}Skip
                                </Button>
                            </Link>
                            <Button
                                className="flex items-center gap-1"
                                icon={<ArrowRight />}
                                iconPosition="right"
                                style={{
                                    backgroundColor: "#6005FF",
                                    transition: "background-color 0.3s ease",
                                    padding: "12px"
                                }}
                                onClick={() => setCurrentStep(3)}
                            >
                                Continue Setup
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default WidgetsOnboarding;