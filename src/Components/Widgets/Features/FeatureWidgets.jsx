import React, { useState, useEffect } from 'react'; 
import { Container, Button } from "@bsf/force-ui";
import { MoreHorizontalIcon, Plus, LoaderCircle, Map, House, SearchIcon } from "lucide-react";
import WidgetItem from '@components/Dashboard/WidgetItem';
import apiFetch from '@wordpress/api-fetch';

const FeatureWidgets = () => {

    const [allWidgetsData, setAllWidgetsData] = useState(null); // Initialize state.
    const [searchTerm, setSearchTerm] = useState('');
    const [loadingActivate, setLoadingActivate] = useState(false); // Loading state for activate button
    const [loadingDeactivate, setLoadingDeactivate] = useState(false);

    useEffect(() => {
        const widgetsData =  convertToWidgetsArray(window.hfeWidgetsList)
        // console.log({widgetsData})
        setAllWidgetsData(widgetsData);
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

    // console.log( filteredWidgets );

    const handleActivateAll = async () => {

        setLoadingActivate(true);

        const formData = new window.FormData();
		formData.append( 'action', 'hfe_bulk_activate_widgets');
		formData.append( 'nonce', hfe_admin_data.nonce );

        apiFetch({
            url: hfe_admin_data.ajax_url,
            method: 'POST',
            body: formData,
        } ).then( ( data ) => {
            setLoadingActivate(false);
            if ( data.success ) {
                console.log("Activated all widgets.");
            } else if( data.error ) {
                console.error('AJAX request failed:', data.error);
            }
        }).catch((error) => {
            setLoadingActivate(false);
            console.error('Error during AJAX request:', error);
        });
    };
    
    const handleDeactivateAll = async () => {
        setLoadingDeactivate(true);

        const formData = new window.FormData();
		formData.append( 'action', 'hfe_bulk_deactivate_widgets');
		formData.append( 'nonce', hfe_admin_data.nonce );

        apiFetch({
            url: hfe_admin_data.ajax_url,
            method: 'POST',
            body: formData,
        } ).then( ( data ) => {
            setLoadingDeactivate(false);
            if ( data.success ) {
                console.log("Deactivated all widgets.");
            } else if( data.error ) {
                console.error('AJAX request failed:', err);
            }
        }).catch((error) => {
            setLoadingActivate(false);
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
                    <input
                        type="search"
                        placeholder="Search..."
                        icon={<Plus />}
                        className="mr-2 pl-10"
                        style={{ height: '40px', backgroundColor: '#F9FAFB', }}
                        onChange={handleSearchChange}
                    />
                    <Button
                        icon={loadingActivate ? <LoaderCircle className="animate-spin" /> : null}
                        iconPosition="left"
                        variant="outline"
                        className="uae-bulk-action-button"
                        onClick={handleActivateAll} // Attach the onClick event
                    >
                        {loadingActivate ? 'Activating...' : 'Activate All'}
                    </Button>

                    <Button
                        icon={loadingDeactivate ? <LoaderCircle className="animate-spin" /> : null} // Loader for deactivate button
                        iconPosition="left"
                        variant="outline"
                        onClick={handleDeactivateAll}
                        className="uae-bulk-action-button"
                    >
                        {loadingDeactivate ? 'Deactivating...' : 'Deactivate All'}
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
                    {filteredWidgets?.map((widget) => (
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

export default FeatureWidgets