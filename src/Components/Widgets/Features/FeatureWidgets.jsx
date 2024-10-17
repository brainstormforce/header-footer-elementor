import React, { useState, useEffect } from 'react'; 
import { Container, Button } from "@bsf/force-ui";
import { MoreHorizontalIcon, Plus, Map, House, SearchIcon } from "lucide-react";
import FeatureWidgetItems from './FeatureWidgetItems';

const FeatureWidgets = () => {

    const [allWidgetsData, setAllWidgetsData] = useState(null); // Initialize state.

    useEffect(() => {
        const widgetsData =  convertToWidgetsArray(window.hfeWidgetsList)
        console.log({widgetsData})
        setAllWidgetsData(widgetsData);
    }, []);

    console.log( window.hfeWidgetsList );
    console.log( allWidgetsData );

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
                <p className='m-0 text-sm font-semibold text-text-primary'>Widgets / Features</p>
                <div className='flex items-center gap-x-2 mr-7'>
                    <SearchIcon
                        className="absolute pl-2 left-1/2 top-1/2"
                    />
                    <input
                        type="search"
                        placeholder="Search..."
                        icon={<Plus />}
                        className="mr-2 pl-10"
                        style={{ height: '40px', backgroundColor: '#F9FAFB', }}
                    />
                    <Button
                        iconPosition="left"
                        variant="outline"
                    >
                        Activate all
                    </Button>

                    <Button
                        iconPosition="left"
                        variant="outline"
                    >
                        Deactivate all
                    </Button>

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
                    {allWidgetsData?.map((widget) => (
                        <Container.Item
                            key={widget.id}
                            alignSelf="auto"
                            className="text-wrap rounded-md shadow-container-item bg-background-primary p-4"
                        >
                            <FeatureWidgetItems widget={widget} key={widget.id} />
                        </Container.Item>
                    ))}
                </Container>
            </div>
        </div>
    )
}

export default FeatureWidgets
