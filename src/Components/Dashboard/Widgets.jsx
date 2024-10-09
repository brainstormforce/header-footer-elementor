import React from 'react'
import WidgetItem from './WidgetItem'
import { MoreHorizontalIcon, Plus } from "lucide-react";

const widgetData = [
    {
        id: '1',
        icon: <Plus className='h-5 w-5' />,
        enabled: true,
        title: 'Post Info',
        demoLink: 'https://www.youtube.com/embed/ZeogOxqdKJI',
        viewDemo: 'View Demo',
        infoText: 'Display post information like author, date, and categories.',
        isNew: true,
        isPro: false,
    },
    {
        id: '2',
        icon: <Plus className='h-5 w-5' />,
        enabled: true,
        title: 'Reviews',
        demoLink: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        viewDemo: 'View Demo',
        infoText: 'Showcase customer reviews and star ratings.',
        isNew: false,
        isPro: true,
    },
    {
        id: '3',
        icon: <Plus className='h-5 w-5' />,
        enabled: false,
        title: 'Image Gallery',
        demoLink: 'https://www.youtube.com/embed/LXb3EKWsInQ',
        viewDemo: 'View Demo',
        infoText: 'Create an image gallery with lightbox functionality.',
        isNew: true,
        isPro: true,
    },
    {
        id: '4',
        icon: <Plus className='h-5 w-5' />,
        enabled: true,
        title: 'Video Player',
        demoLink: 'https://www.youtube.com/embed/JGwWNGJdvx8',
        viewDemo: 'View Demo',
        infoText: 'Embed and customize video players for your site.',
        isNew: false,
        isPro: false,
    },
    {
        id: '5',
        icon: <Plus className='h-5 w-5' />,
        enabled: false,
        title: 'Notifications',
        demoLink: 'https://www.youtube.com/embed/tVj0ZTS4WF4',
        viewDemo: 'View Demo',
        infoText: 'Display notifications and alerts on your website.',
        isNew: false,
        isPro: false,
    },
    {
        id: '6',
        icon: <Plus className='h-5 w-5' />,
        enabled: true,
        title: 'Contact Form',
        demoLink: 'https://www.youtube.com/embed/6_b7RDuLwcI',
        viewDemo: 'View Demo',
        infoText: 'Create customizable contact forms with multiple fields.',
        isNew: true,
        isPro: true,
    },
    {
        id: '7',
        icon: <Plus className='h-5 w-5' />,
        enabled: false,
        title: 'Slider',
        demoLink: 'https://www.youtube.com/embed/mWRsgZuwf_8',
        viewDemo: 'View Demo',
        infoText: 'Showcase images or content in a responsive slider.',
        isNew: true,
        isPro: true,
    },
    {
        id: '8',
        icon: <Plus className='h-5 w-5' />,
        enabled: true,
        title: 'Pricing Table',
        demoLink: 'https://www.youtube.com/embed/2vjPBrBU-TM',
        viewDemo: 'View Demo',
        infoText: 'Display product pricing with customizable tables.',
        isNew: false,
        isPro: false,
    },
    {
        id: '9',
        icon: <Plus className='h-5 w-5' />,
        enabled: true,
        title: 'Countdown Timer',
        demoLink: 'https://www.youtube.com/embed/CTFtOOh47oo',
        viewDemo: 'View Demo',
        infoText: 'Add countdown timers for promotions or events.',
        isNew: false,
        isPro: true,
    },
    {
        id: '10',
        icon: <Plus className='h-5 w-5' />,
        enabled: false,
        title: 'Social Share',
        demoLink: 'https://www.youtube.com/embed/SR6iYWJxHqs',
        viewDemo: 'View Demo',
        infoText: 'Allow users to share your content on social media platforms.',
        isNew: false,
        isPro: false,
    },
    {
        id: '11',
        icon: <Plus className='h-5 w-5' />,
        enabled: true,
        title: 'Testimonials',
        demoLink: 'https://www.youtube.com/embed/tAGnKpE4NCI',
        viewDemo: 'View Demo',
        infoText: 'Display customer testimonials with customizable layouts.',
        isNew: false,
        isPro: true,
    },
    {
        id: '12',
        icon: <Plus className='h-5 w-5' />,
        enabled: false,
        title: 'Accordion',
        demoLink: 'https://www.youtube.com/embed/7wtfhZwyrcc',
        viewDemo: 'View Demo',
        infoText: 'Create collapsible accordion panels for content.',
        isNew: true,
        isPro: false,
    },
    // {
    //     id: '13',
    //     icon: <Plus className='h-5 w-5' />,
    //     enabled: true,
    //     title: 'Tabs',
    //     demoLink: 'https://www.youtube.com/embed/IcrbM1l_BoI',
    //     viewDemo: 'View Demo',
    //     infoText: 'Organize content in responsive tabbed sections.',
    //     isNew: false,
    //     isPro: false,
    // },
    // {
    //     id: '14',
    //     icon: <Plus className='h-5 w-5' />,
    //     enabled: true,
    //     title: 'Progress Bar',
    //     demoLink: 'https://www.youtube.com/embed/j5-yKhDd64s',
    //     viewDemo: 'View Demo',
    //     infoText: 'Add customizable progress bars to your pages.',
    //     isNew: false,
    //     isPro: false,
    // },
    // {
    //     id: '15',
    //     icon: <Plus className='h-5 w-5' />,
    //     enabled: false,
    //     title: 'Google Maps',
    //     demoLink: 'https://www.youtube.com/embed/OPf0YbXqDm0',
    //     viewDemo: 'View Demo',
    //     infoText: 'Embed Google Maps with customizable markers and styles.',
    //     isNew: false,
    //     isPro: true,
    // }
];


const Widgets = () => {
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
            <div className='w-fit flex bg-black flex-col rounded-lg p-4'>
                <div className='flex items-start gap-1 flex-wrap m-3 bg-gray-600 rounded-md' style={
                    { backgroundColor: 'lightgray', padding: '4px', width: "838px" }
                }>
                    {widgetData.map((widget) => (
                        <WidgetItem widget={widget} key={widget.id} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Widgets
