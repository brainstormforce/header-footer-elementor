import React, { useState, useEffect } from 'react'
import ExtendWebsiteWidget from './ExtendWebsiteWidget';
import { Container } from "@bsf/force-ui";
import { Plus, ArrowUpRight } from 'lucide-react';
import apiFetch from '@wordpress/api-fetch'; // Import apiFetch for AJAX calls

const ExtendWebsite = () => {

    const [plugins, setPlugins] = useState(null); // State to manage plugin data

    useEffect(() => {
        const pluginsData =  convertToPluginsArray( window.hfePluginsData );
        setPlugins(pluginsData);
    }, []);

    console.log(window.hfePluginsData);
    console.log( "===========================================================" );
    console.log( plugins );

    function convertToPluginsArray(data) {
        const plugins = [];
    
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const plugin = data[key];
                plugins.push({
                    path: key,
                    slug: plugin.slug,
                    siteUrl: plugin.siteurl,
                    icon: plugin.icon,
                    type: plugin.type,
                    name: plugin.name,
                    zipUrl: plugin.url,
                    desc: plugin.desc,
                    wporg: plugin.wporg, 
                    isFree: plugin.isFree,
                    status: plugin.status
                });
            }
        }
    
        return plugins;
    }

    const handlePluginAction = (id, action) => {
        const formData = new window.FormData();
        formData.append('action', `hfe_recommended_plugin_${action}`);
        formData.append('plugin_id', id); // Pass the plugin ID

        apiFetch({
            url: hfe_admin_data.ajax_url, // Use the appropriate AJAX URL
            method: 'POST',
            body: formData,
        }).then((response) => {
            if (response.success) {
                // Update the plugin state based on the action
                setPlugins((prevPlugins) =>
                    prevPlugins.map((plugin) =>
                        plugin.id === id ? { ...plugin, activated: !plugin.activated } : plugin
                    )
                );
            } else {
                alert('Plugin action failed, please try again later.');
            }
        }).catch((error) => {
            console.error('Error during plugin action:', error);
        });
    };

    return (
        <div className='rounded-lg bg-white w-full mb-4'>
            <div className='flex items-center justify-between' style={{
                paddingTop: '12px',
                paddingInline: '16px'
            }}>
                <p className='m-0 text-sm font-semibold text-text-primary'>Extend Your Website</p>
                <div className='flex items-center gap-x-2 mr-7'>

                    <ArrowUpRight />
                </div>
            </div>
            <div className='flex bg-black flex-col rounded-lg p-4'>

                <Container
                    align="stretch"
                    className="bg-background-gray gap-1 p-1"
                    cols={2}
                    containerType="grid"
                    gap=""
                    justify="start"
                >
                    {plugins?.map((plugin) => (
                        <Container.Item
                            key={plugin.slug}
                            statusText={
                                'Installed' === plugin.status
                                    ? 'Activate'
                                    : plugin.status
                            }
                            alignSelf="auto"
                            className="text-wrap rounded-md shadow-container-item bg-background-primary p-4"
                        >
                            <ExtendWebsiteWidget plugin={plugin} onPluginAction={handlePluginAction} />
                        </Container.Item>
                    ))}
                </Container>
            </div>
        </div>
    )
}

export default ExtendWebsite
