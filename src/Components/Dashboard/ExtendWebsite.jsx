import React from 'react'
import ExtendWebsiteWidget from './ExtendWebsiteWidget';
import { Container } from "@bsf/force-ui";
import { Plus, ArrowUpRight } from 'lucide-react';

const ExtendWebsiteData = [
    {
        id: '1',
        icon: <Plus className='h-5 w-5' />,
        activated: true,
        title: 'Astra Theme',
        demoLink: 'https://www.youtube.com/embed/JGwWNGJdvx8',
        infoText: 'Free WordPress Page Builder Plugin.',
        isInstalled: true,
        isFree: true,
    },
    {
        id: '2',
        icon: <Plus className='h-5 w-5' />,
        activated: true,
        title: 'Starter Templates',
        demoLink: 'https://www.youtube.com/embed/JGwWNGJdvx8',
        infoText: 'Build your dream website in minutes with AI.',
        isInstall: true,
        isFree: true,
    },
    {
        id: '3',
        icon: <Plus className='h-5 w-5' />,
        activated: true,
        title: 'SureCart',
        demoLink: 'https://www.youtube.com/embed/JGwWNGJdvx8',
        infoText: 'The new way to sell on WordPress.',
        isInstall: true,
        isFree: true,
    },
    {
        id: '4',
        icon: <Plus className='h-5 w-5' />,
        activated: true,
        title: 'Presto Player',
        demoLink: 'https://www.youtube.com/embed/JGwWNGJdvx8',
        infoText: 'Automate your WordPress setup.',
        isInstall: true,
        isFree: true,
    },
];

const ExtendWebsite = () => {
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
                    {ExtendWebsiteData.map((widget) => (
                        <Container.Item
                        key={widget.id}
                            alignSelf="auto"
                            className="text-wrap rounded-md shadow-container-item bg-background-primary p-4"
                        >
                            <ExtendWebsiteWidget widget={widget} key={widget.id} />
                        </Container.Item>
                    ))}
                </Container>
            </div>
        </div>
    )
}

export default ExtendWebsite
