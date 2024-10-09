import React from 'react'
import ExtendWebsiteWidget from './ExtendWebsiteWidget';
import { Plus } from 'lucide-react';

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
    <div className="grid grid-cols-2 gap-1 max-w-fit mb-4">
    {ExtendWebsiteData.map((widget) => (
        <ExtendWebsiteWidget widget={widget} key={widget.id} />
    ))}
</div>
  )
}

export default ExtendWebsite
