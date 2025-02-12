import React, { useState, useEffect } from 'react';
import WidgetItem from './WidgetItem'
import { ArrowUpRight } from 'lucide-react';
import { Container, Button, Skeleton, Title, Label, RadioButton, Badge, Switch } from "@bsf/force-ui";
import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';
import { routes } from '../../admin/settings/routes';
import { Link } from "../../router/index";
import { InfoIcon, FileText } from 'lucide-react';
import { ChevronLeft, ChevronRight, LoaderCircle, SearchIcon } from "lucide-react";
import WidgetItemOnboarding from './WidgetItemOnboarding';

const WidgetsOnboarding = ({ widgets, updateCounter, setCurrentStep }) => {

    const [allWidgetsData, setAllWidgetsData] = useState(null); // Initialize state.
    const [loading, setLoading] = useState(true);

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
        // <div className='rounded-lg bg-white w-full mb-6'>
        //     <div className='flex items-center justify-between p-4' style={{
        //         paddingBottom: '0',
        //     }}>
        //         <p className='m-0 text-sm font-semibold text-text-primary'>Widgets / Features</p>
        //         <div className='flex items-center gap-x-2 mr-7'>
        //             {/* <p className='m-0 text-xs font-semibold text-text-primary'>View All</p> */}
        //             {/* <MoreHorizontalIcon /> */}
        //             <Link to={routes.widgets.path} className='text-sm text-text-primary cursor-pointer' style={{ lineHeight: '1rem' }}>
        //                 View All
        //                 <ArrowUpRight className='ml-1' size={13} />
        //             </Link>
        //         </div>
        //     </div>
        //     <div className='flex bg-black flex-col rounded-lg p-4'>
        //         {loading ? (
        //             <Container
        //                 align="stretch"
        //                 className="p-2 gap-1.5 grid grid-cols-2 md:grid-cols-4"
        //                 style={{
        //                     backgroundColor: "#F9FAFB"
        //                 }}
        //                 containerType="grid"
        //                 gap=""
        //                 justify="start"
        //             >
        //                 {[...Array(16)].map((_, index) => (
        //                     <Container.Item
        //                         key={index}
        //                         alignSelf="auto"
        //                         className="text-wrap rounded-md shadow-container-item bg-background-primary p-6 space-y-2"
        //                     >
        //                         <Skeleton className='w-12 h-2 rounded-md' />
        //                         <Skeleton className='w-16 h-2 rounded-md' />
        //                         <Skeleton className='w-12 h-2 rounded-md' />
        //                     </Container.Item>
        //                 ))}
        //             </Container>
        //         ) : (
        //             <Container
        //                 align="stretch"
        //                 className="p-2 gap-1.5 grid grid-cols-2 md:grid-cols-4"
        //                 style={{
        //                     backgroundColor: "#F9FAFB"
        //                 }}
        //                 containerType="grid"
        //                 gap=""
        //                 justify="start"
        //             >
        //                 {allWidgetsData?.slice(0, 1).map((widget) => (
        //                     <Container.Item
        //                         key={widget.id}
        //                         alignSelf="auto"
        //                         className="text-wrap rounded-md shadow-container-item bg-background-primary p-4"
        //                     >
        //                         <WidgetItemOnboarding widget={widget} key={widget.id} updateCounter={0} />
        //                     </Container.Item>
        //                 ))}
        //             </Container>
        //         )}
        //     </div>
        // </div>
        <div className="bg-background-secondary">
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
                    <div className="bg-background-secondary p-1 rounded-lg max-h-80" style={{ overflow: 'auto', maxHeight: '20rem' }}>
                        <RadioButton.Group
                            columns={2}
                            gapClassname="gap-1"
                            multiSelection
                            size="sm"
                        >
                            {widgets?.map((widget) => (
                                <RadioButton.Button
                                    key={widget.id}
                                    badgeItem={<Badge label="Free" size="xxs" type="pill" variant="green" />}
                                    borderOn
                                    buttonWrapperClasses="bg-white border-0"
                                    label={{
                                        description: widget.description,
                                        heading: widget.title
                                    }}
                                    onChange={function Ki() { }}
                                    useSwitch
                                    value={widget.slug}
                                />
                            ))}
                        </RadioButton.Group>
                    </div>
                    <div className="flex justify-between items-center pt-2 gap-4">
                        <Button
                            className="flex items-center gap-2"
                            icon={<ChevronLeft />}
                            variant="outline"
                            onClick={() => setCurrentStep(1)}
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
                                onClick={() => setCurrentStep(3)}
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

export default WidgetsOnboarding
