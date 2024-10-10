import React, { useState, useEffect } from 'react'; 
import WidgetItem from './WidgetItem'
import { Container } from "@bsf/force-ui";
import { MoreHorizontalIcon, Plus } from "lucide-react";

const Widgets = () => {

    const [allWidgetsData, setAllWidgetsData] = useState(null); // Initialize state.

    useEffect(() => {
        const widgetsData =  convertToWidgetsArray(window.hfeWidgetsList)
        console.log({widgetsData})
        setAllWidgetsData(widgetsData);
    }, []);

    console.log( window.hfeWidgetsList );

    function convertToWidgetsArray(data) {
        const widgets = [];
    
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const widget = data[key];
                widgets.push({
                    widgetTitle: key, // Using the key as 'widgetTitle'
                    slug: widget.slug,
                    title: widget.title,
                    keywords: widget.keywords,
                    icon: <i className={widget.icon}></i>,
                    title_url: widget.title_url,
                    default: widget.default,
                    doc_url: widget.doc_url,
                    is_pro: widget.is_pro
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
                    <p className='m-0 text-sm font-semibold text-text-primary'>Widgets / Features</p>
                    <div className='flex items-center gap-x-2 mr-7'>
                        <p className='m-0 text-xs font-semibold text-text-primary'>View all</p>
                        <MoreHorizontalIcon />
                    </div>
                </div>
            <div className='flex bg-black flex-col rounded-lg p-4'>
                
                <Container
                    align="stretch"
                    className="bg-background-gray p-1 gap-1.5"
                    cols={4}
                    containerType="grid"
                    gap=""
                    justify="start"
                    >
                        {allWidgetsData?.slice(0,12).map((widget) => (
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
