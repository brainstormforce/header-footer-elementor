import React, { useState, useEffect } from 'react'
import ExtendWebsiteWidget from './ExtendWebsiteWidget';
import { Container, Skeleton } from "@bsf/force-ui";
import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';
import { ArrowUpRight } from 'lucide-react';

const ExtendWebsite = () => {

    const [plugins, setPlugins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updateCounter, setUpdateCounter] = useState(0);
    const [allInstalled, setAllInstalled] = useState(false);

    useEffect(() => {
        const pluginsData = convertToPluginsArray(window.hfePluginsData);
        setPlugins(pluginsData);
    }, []);

    // console.log(window.hfePluginsData);
    // console.log("===========================================================");
    // console.log(plugins);

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

    return (
        <div className='rounded-lg bg-white w-full mb-4'>
            <div className='flex items-center justify-between' style={{
                paddingTop: '12px',
                paddingInline: '16px'
            }}>
                <p className='m-0 text-sm font-semibold text-text-primary'>Extend Your Website</p>
                <div className='flex items-center gap-x-2 mr-7'>

                    <a href="https://ultimateelementor.com/" target="_blank" rel="noopener noreferrer">
                        <ArrowUpRight style={{ color: '#6B7280' }} />
                    </a>
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
                            <ExtendWebsiteWidget plugin={plugin} />
                        </Container.Item>
                    ))}
                </Container>
            </div>
        </div>
    )
}

export default ExtendWebsite
