import React, { useState, useEffect } from 'react';
import { Container, Button, Skeleton, Title, Label, RadioButton, Badge, Switch } from "@bsf/force-ui";
import { ChevronLeft, ChevronRight, LoaderCircle, SearchIcon } from "lucide-react";
import WidgetItem from '@components/Dashboard/WidgetItem';
import apiFetch from '@wordpress/api-fetch';
import { __ } from "@wordpress/i18n";
import WidgetItemOnboarding from '@components/Dashboard/WidgetItemOnboarding';
import WidgetsOnboarding from '@components/Dashboard/WidgetsOnboarding';

const FeatureWidgetsOnboarding = ({ setCurrentStep }) => {

    const [allWidgetsData, setAllWidgetsData] = useState(null); // Initialize state.
    const [searchTerm, setSearchTerm] = useState('');
    const [loadingActivate, setLoadingActivate] = useState(false); // Loading state for activate button
    const [loadingDeactivate, setLoadingDeactivate] = useState(false);
    const [loading, setLoading] = useState(true);
    const [updateCounter, setUpdateCounter] = useState(0);


    useEffect(() => {
        const fetchSettings = () => {
            setLoading(true);
            apiFetch({
                path: '/hfe/v1/widgets',
                headers: {
                    'Content-Type': 'application/json',
                    'X-WP-Nonce': hfeSettingsData.hfe_nonce_action, // Use the correct nonce
                },
            })
                .then((data) => {
                    const widgetsData = convertToWidgetsArray(data)
                    setAllWidgetsData(widgetsData);
                    setLoading(false); // Stop loading
                })
                .catch((err) => {
                    setLoading(false); // Stop loading
                });
        };

        fetchSettings();
    }, []);

    // New function to handle search input change
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value.toLowerCase());
    };

    // Filter widgets based on search term
    const filteredWidgets = allWidgetsData?.filter(widget =>
        widget.title.toLowerCase().includes(searchTerm) ||
        widget.keywords?.some(keyword => keyword.toLowerCase().includes(searchTerm))
    );

    const handleActivateAll = async () => {

        setLoadingActivate(true);

        const formData = new window.FormData();
        formData.append('action', 'hfe_bulk_activate_widgets');
        formData.append('nonce', hfe_admin_data.nonce);

        apiFetch({
            url: hfe_admin_data.ajax_url,
            method: 'POST',
            body: formData,
        }).then((data) => {
            setLoadingActivate(false);
            if (data.success) {
                setAllWidgetsData(prevWidgets =>
                    prevWidgets.map(widget => ({ ...widget, is_active: true }))
                );
                setUpdateCounter(prev => prev + 1);
            } else if (data.error) {
                setLoadingActivate(false);
                console.error('Error during AJAX request:', error);
            }
        }).catch((error) => {
            setLoadingActivate(false);
            console.error('Error during AJAX request:', error);
        });
    };

    const handleDeactivateAll = async () => {
        setLoadingDeactivate(true);

        const formData = new window.FormData();
        formData.append('action', 'hfe_bulk_deactivate_widgets');
        formData.append('nonce', hfe_admin_data.nonce);

        apiFetch({
            url: hfe_admin_data.ajax_url,
            method: 'POST',
            body: formData,
        }).then((data) => {
            setLoadingDeactivate(false);
            if (data.success) {
                setAllWidgetsData(prevWidgets =>
                    prevWidgets.map(widget => ({ ...widget, is_active: false }))
                );
                setUpdateCounter(prev => prev + 1);
            } else if (data.error) {
                console.error('AJAX request failed:', data.error);
            }
        }).catch((error) => {
            setLoadingDeactivate(false);
            console.error('Error during AJAX request:', error);
        });
    };

    function convertToWidgetsArray(data) {
        const widgets = [];

        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const widget = data[key];
                widgets.push({
                    id: key, // Using the key as 'widgetTitle'
                    slug: widget.slug,
                    title: widget.title,
                    keywords: widget.keywords,
                    icon: <i className={widget.icon}></i>,
                    title_url: widget.title_url,
                    default: widget.default,
                    doc_url: widget.doc_url,
                    is_pro: widget.is_pro,
                    description: widget.description,
                    is_active: widget.is_activate !== undefined ? widget.is_activate : true, // Check if is_activate is set
                    demo_url: widget.demo_url !== undefined ? widget.demo_url : widget.doc_url
                });
            }
        }

        return widgets;
    }

    return (
        <div className='rounded-lg bg-white  mb-4' style={{ width: '60%' }}>
            <div className='flex flex-col md:flex-row md:items-center md:justify-between p-4'
                style={{
                    paddingBottom: '0'
                }}>
                <p className='m-0 text-sm font-semibold text-text-primary mb-2 md:mb-0'>{__("Widgets / Features", "header-footer-elementor")}</p>
                <div className='flex flex-col md:flex-row items-center gap-y-2 md:gap-x-2 md:mr-7 relative'>
                    {/* <SearchIcon
                        className="absolute top-1/2 transform -translate-y-1/2 text-gray-400"
                        style={{
                            backgroundColor: '#F9FAFB',
                            left: '2%',
                            width: '18px',
                            height: '18px'
                        }} />
                    <input
                        type="search"
                        placeholder={__('Search...', 'header-footer-elementor')}
                        className="mr-2 pl-10 w-full md:w-auto"
                        style={{
                            height: '40px',
                            borderColor: '#e0e0e0', // Default border color
                            outline: 'none',       // Removes the default outline
                            boxShadow: 'none',
                            backgroundColor: '#F9FAFB',    // Removes the default box shadow
                        }}
                        onFocus={(e) => e.target.style.borderColor = '#6005FF'} // Apply focus color
                        onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}  // Revert to default color
                        onChange={handleSearchChange}
                    /> */}
                    <div className="flex flex-row gap-2 w-full md:w-auto">
                        <Button
                            icon={loadingActivate ? <LoaderCircle className="animate-spin" /> : null}
                            iconPosition="left"
                            variant="outline"
                            className="hfe-bulk-action-button"
                            onClick={handleActivateAll} // Attach the onClick event.
                            disabled={!!searchTerm}
                        >
                            {loadingActivate ? __('Activating...', 'header-footer-elementor') : __('Activate All', 'header-footer-elementor')}
                        </Button>

                        <Button
                            icon={loadingDeactivate ? <LoaderCircle className="animate-spin" /> : null} // Loader for deactivate button.
                            iconPosition="left"
                            variant="outline"
                            onClick={handleDeactivateAll}
                            className="hfe-bulk-action-button"
                            disabled={!!searchTerm}
                        >
                            {loadingDeactivate ? __('Deactivating...', 'header-footer-elementor') : __('Deactivate All', 'header-footer-elementor')}
                        </Button>
                    </div>
                </div>
            </div>
            <div className='flex bg-black flex-col rounded-lg p-4'>
                {loading ? (
                    <Container
                        align="stretch"
                        className="p-2 gap-1.5 grid grid-cols-2 md:grid-cols-4"
                        style={{
                            backgroundColor: "#F9FAFB"
                        }}
                        containerType="grid"
                        gap=""
                        justify="start"
                    >
                        {[...Array(30)].map((_, index) => (
                            <Container.Item
                                key={index}
                                alignSelf="auto"
                                className="text-wrap rounded-md shadow-container-item bg-background-primary p-6 space-y-2"
                            >
                                <Skeleton className='w-12 h-2 rounded-md' />
                                <Skeleton className='w-16 h-2 rounded-md' />
                                <Skeleton className='w-12 h-2 rounded-md' />
                            </Container.Item>
                        ))}
                    </Container>
                ) : (
                    <Container
                        align="stretch"
                    // className="p-1 gap-1.5 grid-cols-2 md:grid-cols-4"
                    // containerType="grid"
                    // gap=""
                    // justify="start"
                    // style={{
                    //     backgroundColor: '#F9FAFB'
                    // }}
                    >
                        <WidgetsOnboarding setCurrentStep={setCurrentStep} widgets={filteredWidgets} updateCounter={updateCounter} />
                    </Container>
                    //     <div className="bg-background-secondary min-h-screen w-full pb-10">
                    //     <form onSubmit={function Ki() { }}>
                    //         <div className="md:w-[47rem] box-border mx-auto p-8 mt-10 border border-solid border-border-subtle bg-background-primary rounded-xl shadow-sm space-y-4">
                    //             <div>
                    //                 <Title
                    //                     className="text-text-primary"
                    //                     size="md"
                    //                     tag="h4"
                    //                     title="Add More Power to Your Website"
                    //                 />
                    //                 <Label className="text-text-secondary mt-1 text-sm max-w-[41rem] font-normal">
                    //                     These tools can help you build your website faster and easier. Try them out and see how they can help your website grow.
                    //                 </Label>
                    //             </div>
                    //             <div className="bg-background-secondary p-1 rounded-lg max-h-80 overflow-auto">
                    //                 <RadioButton.Group
                    //                     columns={2}
                    //                     gapClassname="gap-1"
                    //                     multiSelection
                    //                     size="sm"
                    //                 >
                    //                     <RadioButton.Button
                    //                         badgeItem={<Badge label="Free" size="xxs" type="pill" variant="green" />}
                    //                         borderOn
                    //                         buttonWrapperClasses="bg-white border-0"
                    //                         // icon={<PrestoPlayerLogo />}
                    //                         label={{
                    //                             description: 'Fast, customizable & beautiful WordPress theme.',
                    //                             heading: 'Astra Theme'
                    //                         }}
                    //                         onChange={function Ki() { }}
                    //                         useSwitch
                    //                         value="Astra"
                    //                     />
                    //                     <RadioButton.Button
                    //                         badgeItem={<Badge label="Free" size="xxs" type="pill" variant="green" />}
                    //                         borderOn
                    //                         buttonWrapperClasses="bg-white border-0"
                    //                         // icon={<PrestoPlayerLogo />}
                    //                         label={{
                    //                             description: 'Build your dream website in minutes with AI.',
                    //                             heading: 'Starter Templates'
                    //                         }}
                    //                         onChange={function Ki() { }}
                    //                         useSwitch
                    //                         value="Starter"
                    //                     />
                    //                     <RadioButton.Button
                    //                         badgeItem={<Badge label="Free" size="xxs" type="pill" variant="green" />}
                    //                         borderOn
                    //                         buttonWrapperClasses="bg-white border-0"
                    //                         // icon={<PrestoPlayerLogo />}
                    //                         label={{
                    //                             description: 'The new way to sell on WordPress.',
                    //                             heading: 'SureCart'
                    //                         }}
                    //                         onChange={function Ki() { }}
                    //                         useSwitch
                    //                         value="SureCart"
                    //                     />
                    //                     <RadioButton.Button
                    //                         badgeItem={<Badge label="Free" size="xxs" type="pill" variant="green" />}
                    //                         borderOn
                    //                         buttonWrapperClasses="bg-white border-0"
                    //                         // icon={<PrestoPlayerLogo />}
                    //                         label={{
                    //                             description: 'Automate your WordPress setup.',
                    //                             heading: 'Presto Player'
                    //                         }}
                    //                         onChange={function Ki() { }}
                    //                         useSwitch
                    //                         value="Presto"
                    //                     />
                    //                     <RadioButton.Button
                    //                         badgeItem={<Badge label="Free" size="xxs" type="pill" variant="green" />}
                    //                         borderOn
                    //                         buttonWrapperClasses="bg-white border-0"
                    //                         // icon={<PrestoPlayerLogo />}
                    //                         label={{
                    //                             description: 'Fast, customizable & beautiful WordPress theme.',
                    //                             heading: 'Astra Theme'
                    //                         }}
                    //                         onChange={function Ki() { }}
                    //                         useSwitch
                    //                         value="Astra2"
                    //                     />
                    //                     <RadioButton.Button
                    //                         badgeItem={<Badge label="Free" size="xxs" type="pill" variant="green" />}
                    //                         borderOn
                    //                         buttonWrapperClasses="bg-white border-0"
                    //                         // icon={<PrestoPlayerLogo />}
                    //                         label={{
                    //                             description: 'Build your dream website in minutes with AI.',
                    //                             heading: 'Starter Templates'
                    //                         }}
                    //                         onChange={function Ki() { }}
                    //                         useSwitch
                    //                         value="Starter2"
                    //                     />
                    //                 </RadioButton.Group>
                    //             </div>
                    //             <div className="flex justify-between items-center pt-2 gap-4">
                    //                 <Button
                    //                     className="flex items-center gap-2"
                    //                     icon={<ChevronLeft />}
                    //                     variant="outline"
                    //                 >
                    //                     Back
                    //                 </Button>
                    //                 <div className="flex justify-end items-center gap-3">
                    //                     <Button variant="ghost">
                    //                         {' '}Skip
                    //                     </Button>
                    //                     <Button
                    //                         className="flex items-center gap-2"
                    //                         icon={<ChevronRight />}
                    //                         iconPosition="right"
                    //                     >
                    //                         Continue Setup
                    //                     </Button>
                    //                 </div>
                    //             </div>
                    //         </div>
                    //     </form>
                    // </div>
                )}
            </div>
        </div>
    )
}

export default FeatureWidgetsOnboarding
