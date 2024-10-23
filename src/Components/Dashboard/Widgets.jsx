import React, { useState, useEffect } from 'react'; 
import WidgetItem from './WidgetItem'
import { Container } from "@bsf/force-ui";
import { MoreHorizontalIcon, Plus } from "lucide-react";
import { useWidgetContext } from './WidgetContext';

const Widgets = () => {

    const [allWidgetsData, setAllWidgetsData] = useWidgetContext(); // Initialize state.
    useEffect(() => {
        const widgetsData = convertToWidgetsArray(window.hfeWidgetsList)
        setAllWidgetsData(widgetsData);
    }, [setAllWidgetsData]);

    console.log( "This is the list of normal widgets on dashboard......................." );;
    console.log( allWidgetsData );

    function convertToWidgetsArray(data) {

        if (!data || typeof data !== 'object') {
            return [];  // Ensure it returns an empty array if the data is not valid
        }
        
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
                    is_active: widget.is_activate !== undefined ? widget.is_activate : true, // Check if is_activate is set
                });
            }
        }
    
        return widgets;
    }

    return (
        <div className='rounded-lg bg-white w-full mb-4'>
            <div className='flex items-center justify-between' style={{
                paddingTop: '12px',
                paddingInline: '16px'
            }}>
                    <p className='m-0 text-sm pt-5 font-semibold text-text-primary'>Widgets / Features</p>
                    <div className='flex items-center gap-x-2 mr-7'>
                        <p className='m-0 text-xs font-semibold text-text-primary'>View All</p>
                        {/* <MoreHorizontalIcon /> */}
                    </div>
                </div>
            <div className='flex bg-black flex-col rounded-lg p-4'>
                
                <Container
                    align="stretch"
                    className="bg-background-gray p-2 gap-1.5"
                    cols={4}
                    containerType="grid"
                    gap=""
                    justify="start"
                    >
                        {allWidgetsData?.slice(0, 12).map((widget) => (
                            <Container.Item
                             key={widget.id}
                             alignSelf="auto"
                             className="text-wrap rounded-md shadow-container-item bg-background-primary p-4"
                           >
                                <WidgetItem widget={widget} key={widget.id} />
                            </Container.Item>
                        ))}
                    </Container>
            </div>
        </div>
    )
}

export default Widgets
