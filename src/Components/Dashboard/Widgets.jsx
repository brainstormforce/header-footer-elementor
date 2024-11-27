import React, { useState, useEffect } from 'react';
import WidgetItem from './WidgetItem'
import { ArrowUpRight } from 'lucide-react';
import { Container, Skeleton } from "@bsf/force-ui";
import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';
import { routes } from '../../admin/settings/routes';
import { Link } from "../../router/index";

const Widgets = () => {

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
        <div className='rounded-lg bg-white w-full mb-6'>
            <div className='flex items-center justify-between p-4' style={{
                paddingBottom: '0',
            }}>
                <p className='m-0 text-sm font-semibold text-text-primary'>Widgets / Features</p>
                <div className='flex items-center gap-x-2 mr-7'>
                    {/* <p className='m-0 text-xs font-semibold text-text-primary'>View All</p> */}
                    {/* <MoreHorizontalIcon /> */}
                    <Link to={routes.widgets.path} className='text-sm text-text-primary cursor-pointer' style={{ lineHeight: '1rem' }}>
                        View All
                        <ArrowUpRight className='ml-1' size={13} />
                    </Link>
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
                        {[...Array(16)].map((_, index) => (
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
                        className="p-2 gap-1.5 grid grid-cols-2 md:grid-cols-4"
                        style={{
                            backgroundColor: "#F9FAFB"
                        }}
                        containerType="grid"
                        gap=""
                        justify="start"
                    >
                        {allWidgetsData?.slice(0, 16).map((widget) => (
                            <Container.Item
                                key={widget.id}
                                alignSelf="auto"
                                className="text-wrap rounded-md shadow-container-item bg-background-primary p-4"
                            >
                                <WidgetItem widget={widget} key={widget.id} updateCounter={0} />
                            </Container.Item>
                        ))}
                    </Container>
                )}
            </div>
        </div>
    )
}

export default Widgets
