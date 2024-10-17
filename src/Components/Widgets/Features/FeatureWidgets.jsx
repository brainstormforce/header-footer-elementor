import React, { useState, useEffect } from 'react'; 
import { Container, Button } from "@bsf/force-ui";
import { MoreHorizontalIcon, Plus, Map, House, SearchIcon } from "lucide-react";
import FeatureWidgetItems from './FeatureWidgetItems';

// const widgetData = [
//     {
//         id: '1',
//         icon: <Plus className='h-5 w-5' />,
//         enabled: true,
//         title: 'Post Info',
//         demoLink: 'https://www.youtube.com/embed/ZeogOxqdKJI',
//         viewDemo: 'View Demo',
//         infoText: 'Display post information like author, date, and categories.',
//         isNew: true,
//         isPro: false,
//     },
//     {
//         id: '2',
//         icon: <Map className='h-5 w-5' />,
//         enabled: true,
//         title: 'Scroll To Top',
//         demoLink: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
//         viewDemo: 'View Demo',
//         infoText: 'Showcase customer reviews and star ratings.',
//         isNew: false,
//         isPro: true,
//     },
//     {
//         id: '3',
//         icon: <Plus className='h-5 w-5' />,
//         enabled: false,
//         title: 'Tooltip',
//         demoLink: 'https://www.youtube.com/embed/LXb3EKWsInQ',
//         viewDemo: 'View Demo',
//         infoText: 'Create an image gallery with lightbox functionality.',
//         isNew: true,
//         isPro: true,
//     },
//     {
//         id: '4',
//         icon: <Plus className='h-5 w-5' />,
//         enabled: true,
//         title: 'Heading',
//         demoLink: 'https://www.youtube.com/embed/JGwWNGJdvx8',
//         viewDemo: 'View Demo',
//         infoText: 'Embed and customize video players for your site.',
//         isNew: false,
//         isPro: false,
//     },
//     {
//         id: '5',
//         icon: <Plus className='h-5 w-5' />,
//         enabled: false,
//         title: 'Duplicator',
//         demoLink: 'https://www.youtube.com/embed/tVj0ZTS4WF4',
//         viewDemo: 'View Demo',
//         infoText: 'Display notifications and alerts on your website.',
//         isNew: false,
//         isPro: false,
//     },
//     {
//         id: '6',
//         icon: <Plus className='h-5 w-5' />,
//         enabled: true,
//         title: 'Reading Progress Bar',
//         demoLink: 'https://www.youtube.com/embed/6_b7RDuLwcI',
//         viewDemo: 'View Demo',
//         infoText: 'Create customizable contact forms with multiple fields.',
//         isNew: true,
//         isPro: true,
//     },
//     {
//         id: '7',
//         icon: <Plus className='h-5 w-5' />,
//         enabled: false,
//         title: 'Image Gallery',
//         demoLink: 'https://www.youtube.com/embed/mWRsgZuwf_8',
//         viewDemo: 'View Demo',
//         infoText: 'Showcase images or content in a responsive slider.',
//         isNew: true,
//         isPro: true,
//     },
//     {
//         id: '8',
//         icon: <Plus className='h-5 w-5' />,
//         enabled: true,
//         title: 'Breadcrumbs',
//         demoLink: 'https://www.youtube.com/embed/2vjPBrBU-TM',
//         viewDemo: 'View Demo',
//         infoText: 'Display product pricing with customizable tables.',
//         isNew: false,
//         isPro: false,
//     },
//     {
//         id: '9',
//         icon: <Plus className='h-5 w-5' />,
//         enabled: true,
//         title: 'Image',
//         demoLink: 'https://www.youtube.com/embed/CTFtOOh47oo',
//         viewDemo: 'View Demo',
//         infoText: 'Add countdown timers for promotions or events.',
//         isNew: false,
//         isPro: true,
//     },
//     {
//         id: '10',
//         icon: <Plus className='h-5 w-5' />,
//         enabled: false,
//         title: 'Icon',
//         demoLink: 'https://www.youtube.com/embed/SR6iYWJxHqs',
//         viewDemo: 'View Demo',
//         infoText: 'Allow users to share your content on social media platforms.',
//         isNew: false,
//         isPro: false,
//     },
//     {
//         id: '11',
//         icon: <Plus className='h-5 w-5' />,
//         enabled: true,
//         title: 'Content timeline',
//         demoLink: 'https://www.youtube.com/embed/tAGnKpE4NCI',
//         viewDemo: 'View Demo',
//         infoText: 'Display customer testimonials with customizable layouts.',
//         isNew: false,
//         isPro: true,
//     },
//     {
//         id: '12',
//         icon: <Plus className='h-5 w-5' />,
//         enabled: false,
//         title: 'Login Form',
//         demoLink: 'https://www.youtube.com/embed/7wtfhZwyrcc',
//         viewDemo: 'View Demo',
//         infoText: 'Create collapsible accordion panels for content.',
//         isNew: true,
//         isPro: false,
//     },
//     {
//         id: '13',
//         icon: <Plus className='h-5 w-5' />,
//         enabled: true,
//         title: 'Countdown',
//         demoLink: 'https://www.youtube.com/embed/IcrbM1l_BoI',
//         viewDemo: 'View Demo',
//         infoText: 'Organize content in responsive tabbed sections.',
//         isNew: false,
//         isPro: false,
//     },
//     {
//         id: '14',
//         icon: <Plus className='h-5 w-5' />,
//         enabled: true,
//         title: 'Registration Form',
//         demoLink: 'https://www.youtube.com/embed/j5-yKhDd64s',
//         viewDemo: 'View Demo',
//         infoText: 'Add customizable progress bars to your pages.',
//         isNew: false,
//         isPro: false,
//     },
//     {
//         id: '15',
//         icon: <Plus className='h-5 w-5' />,
//         enabled: false,
//         title: 'Instagram Feed',
//         demoLink: 'https://www.youtube.com/embed/OPf0YbXqDm0',
//         viewDemo: 'View Demo',
//         infoText: 'Embed Google Maps with customizable markers and styles.',
//         isNew: false,
//         isPro: true,
//     },
//     {
//         id: '16',
//         icon: <Plus className='h-5 w-5' />,
//         enabled: false,
//         title: 'Loop Builder',
//         demoLink: 'https://www.youtube.com/embed/OPf0YbXqDm0',
//         viewDemo: 'View Demo',
//         infoText: 'Embed Google Maps with customizable markers and styles.',
//         isNew: false,
//         isPro: true,
//     },
//     {
//         id: '17',
//         icon: <Plus className='h-5 w-5' />,
//         enabled: false,
//         title: 'Dynamic Content',
//         demoLink: 'https://www.youtube.com/embed/OPf0YbXqDm0',
//         viewDemo: 'View Demo',
//         infoText: 'Embed Google Maps with customizable markers and styles.',
//         isNew: false,
//         isPro: true,
//     },
//     {
//         id: '18',
//         icon: <Plus className='h-5 w-5' />,
//         enabled: false,
//         title: 'Global Block Style',
//         demoLink: 'https://www.youtube.com/embed/OPf0YbXqDm0',
//         viewDemo: 'View Demo',
//         infoText: 'Embed Google Maps with customizable markers and styles.',
//         isNew: false,
//         isPro: true,
//     },
//     {
//         id: '19',
//         icon: <Plus className='h-5 w-5' />,
//         enabled: false,
//         title: 'Popup Builder',
//         demoLink: 'https://www.youtube.com/embed/OPf0YbXqDm0',
//         viewDemo: 'View Demo',
//         infoText: 'Embed Google Maps with customizable markers and styles.',
//         isNew: false,
//         isPro: true,
//     },
//     {
//         id: '20',
//         icon: <Plus className='h-5 w-5' />,
//         enabled: false,
//         title: 'Modal Pro',
//         demoLink: 'https://www.youtube.com/embed/OPf0YbXqDm0',
//         viewDemo: 'View Demo',
//         infoText: 'Embed Google Maps with customizable markers and styles.',
//         isNew: false,
//         isPro: true,
//     },
//     {
//         id: '21',
//         icon: <Plus className='h-5 w-5' />,
//         enabled: false,
//         title: 'Countdown Pro',
//         demoLink: 'https://www.youtube.com/embed/OPf0YbXqDm0',
//         viewDemo: 'View Demo',
//         infoText: 'Embed Google Maps with customizable markers and styles.',
//         isNew: false,
//         isPro: true,
//     },
//     {
//         id: '22',
//         icon: <Plus className='h-5 w-5' />,
//         enabled: false,
//         title: 'Buttons',
//         demoLink: 'https://www.youtube.com/embed/OPf0YbXqDm0',
//         viewDemo: 'View Demo',
//         infoText: 'Embed Google Maps with customizable markers and styles.',
//         isNew: false,
//         isPro: true,
//     },
//     {
//         id: '23',
//         icon: <Plus className='h-5 w-5' />,
//         enabled: false,
//         title: 'Info Box',
//         demoLink: 'https://www.youtube.com/embed/OPf0YbXqDm0',
//         viewDemo: 'View Demo',
//         infoText: 'Embed Google Maps with customizable markers and styles.',
//         isNew: false,
//         isPro: true,
//     },
//     {
//         id: '24',
//         icon: <Plus className='h-5 w-5' />,
//         enabled: false,
//         title: 'Call to Action',
//         demoLink: 'https://www.youtube.com/embed/OPf0YbXqDm0',
//         viewDemo: 'View Demo',
//         infoText: 'Embed Google Maps with customizable markers and styles.',
//         isNew: false,
//         isPro: true,
//     },
//     {
//         id: '25',
//         icon: <Plus className='h-5 w-5' />,
//         enabled: false,
//         title: 'Counter',
//         demoLink: 'https://www.youtube.com/embed/OPf0YbXqDm0',
//         viewDemo: 'View Demo',
//         infoText: 'Embed Google Maps with customizable markers and styles.',
//         isNew: false,
//         isPro: true,
//     },
//     {
//         id: '26',
//         icon: <Plus className='h-5 w-5' />,
//         enabled: false,
//         title: 'FAQ',
//         demoLink: 'https://www.youtube.com/embed/OPf0YbXqDm0',
//         viewDemo: 'View Demo',
//         infoText: 'Embed Google Maps with customizable markers and styles.',
//         isNew: false,
//         isPro: true,
//     },
//     {
//         id: '27',
//         icon: <Plus className='h-5 w-5' />,
//         enabled: false,
//         title: 'Form',
//         demoLink: 'https://www.youtube.com/embed/OPf0YbXqDm0',
//         viewDemo: 'View Demo',
//         infoText: 'Embed Google Maps with customizable markers and styles.',
//         isNew: false,
//         isPro: true,
//     },
//     {
//         id: '28',
//         icon: <Plus className='h-5 w-5' />,
//         enabled: false,
//         title: 'Google Maps',
//         demoLink: 'https://www.youtube.com/embed/OPf0YbXqDm0',
//         viewDemo: 'View Demo',
//         infoText: 'Embed Google Maps with customizable markers and styles.',
//         isNew: false,
//         isPro: true,
//     },
//     {
//         id: '29',
//         icon: <Plus className='h-5 w-5' />,
//         enabled: false,
//         title: 'How To',
//         demoLink: 'https://www.youtube.com/embed/OPf0YbXqDm0',
//         viewDemo: 'View Demo',
//         infoText: 'Embed Google Maps with customizable markers and styles.',
//         isNew: false,
//         isPro: true,
//     },
//     {
//         id: '30',
//         icon: <Plus className='h-5 w-5' />,
//         enabled: false,
//         title: 'Icon List',
//         demoLink: 'https://www.youtube.com/embed/OPf0YbXqDm0',
//         viewDemo: 'View Demo',
//         infoText: 'Embed Google Maps with customizable markers and styles.',
//         isNew: false,
//         isPro: true,
//     },
//     {
//         id: '31',
//         icon: <Plus className='h-5 w-5' />,
//         enabled: false,
//         title: 'Image Gallery',
//         demoLink: 'https://www.youtube.com/embed/OPf0YbXqDm0',
//         viewDemo: 'View Demo',
//         infoText: 'Embed Google Maps with customizable markers and styles.',
//         isNew: false,
//         isPro: true,
//     },
//     {
//         id: '32',
//         icon: <Plus className='h-5 w-5' />,
//         enabled: false,
//         title: 'Inline Notice',
//         demoLink: 'https://www.youtube.com/embed/OPf0YbXqDm0',
//         viewDemo: 'View Demo',
//         infoText: 'Embed Google Maps with customizable markers and styles.',
//         isNew: false,
//         isPro: true,
//     },
//     {
//         id: '33',
//         icon: <Plus className='h-5 w-5' />,
//         enabled: false,
//         title: 'Lottie Animation',
//         demoLink: 'https://www.youtube.com/embed/OPf0YbXqDm0',
//         viewDemo: 'View Demo',
//         infoText: 'Embed Google Maps with customizable markers and styles.',
//         isNew: false,
//         isPro: true,
//     },
//     {
//         id: '34',
//         icon: <Plus className='h-5 w-5' />,
//         enabled: false,
//         title: 'Marketing Button',
//         demoLink: 'https://www.youtube.com/embed/OPf0YbXqDm0',
//         viewDemo: 'View Demo',
//         infoText: 'Embed Google Maps with customizable markers and styles.',
//         isNew: false,
//         isPro: true,
//     },
//     {
//         id: '35',
//         icon: <Plus className='h-5 w-5' />,
//         enabled: false,
//         title: 'Modal',
//         demoLink: 'https://www.youtube.com/embed/OPf0YbXqDm0',
//         viewDemo: 'View Demo',
//         infoText: 'Embed Google Maps with customizable markers and styles.',
//         isNew: false,
//         isPro: true,
//     },
//     {
//         id: '36',
//         icon: <Plus className='h-5 w-5' />,
//         enabled: false,
//         title: 'Modal',
//         demoLink: 'https://www.youtube.com/embed/OPf0YbXqDm0',
//         viewDemo: 'View Demo',
//         infoText: 'Embed Google Maps with customizable markers and styles.',
//         isNew: false,
//         isPro: true,
//     },
//     {
//         id: '37',
//         icon: <Plus className='h-5 w-5' />,
//         enabled: false,
//         title: 'Modal',
//         demoLink: 'https://www.youtube.com/embed/OPf0YbXqDm0',
//         viewDemo: 'View Demo',
//         infoText: 'Embed Google Maps with customizable markers and styles.',
//         isNew: false,
//         isPro: true,
//     },
//     {
//         id: '38',
//         icon: <Plus className='h-5 w-5' />,
//         enabled: false,
//         title: 'Modal',
//         demoLink: 'https://www.youtube.com/embed/OPf0YbXqDm0',
//         viewDemo: 'View Demo',
//         infoText: 'Embed Google Maps with customizable markers and styles.',
//         isNew: false,
//         isPro: true,
//     },
//     {
//         id: '39',
//         icon: <Plus className='h-5 w-5' />,
//         enabled: false,
//         title: 'Modal',
//         demoLink: 'https://www.youtube.com/embed/OPf0YbXqDm0',
//         viewDemo: 'View Demo',
//         infoText: 'Embed Google Maps with customizable markers and styles.',
//         isNew: false,
//         isPro: true,
//     },
//     {
//         id: '39',
//         icon: <Plus className='h-5 w-5' />,
//         enabled: false,
//         title: 'Modal',
//         demoLink: 'https://www.youtube.com/embed/OPf0YbXqDm0',
//         viewDemo: 'View Demo',
//         infoText: 'Embed Google Maps with customizable markers and styles.',
//         isNew: false,
//         isPro: true,
//     }, {
//         id: '40',
//         icon: <Plus className='h-5 w-5' />,
//         enabled: false,
//         title: 'Modal',
//         demoLink: 'https://www.youtube.com/embed/OPf0YbXqDm0',
//         viewDemo: 'View Demo',
//         infoText: 'Embed Google Maps with customizable markers and styles.',
//         isNew: false,
//         isPro: true,
//     },
//     {
//         id: '41',
//         icon: <Plus className='h-5 w-5' />,
//         enabled: false,
//         title: 'Modal',
//         demoLink: 'https://www.youtube.com/embed/OPf0YbXqDm0',
//         viewDemo: 'View Demo',
//         infoText: 'Embed Google Maps with customizable markers and styles.',
//         isNew: false,
//         isPro: true,
//     },
//     {
//         id: '42',
//         icon: <Plus className='h-5 w-5' />,
//         enabled: false,
//         title: 'Modal',
//         demoLink: 'https://www.youtube.com/embed/OPf0YbXqDm0',
//         viewDemo: 'View Demo',
//         infoText: 'Embed Google Maps with customizable markers and styles.',
//         isNew: false,
//         isPro: true,
//     },
//     {
//         id: '43',
//         icon: <Plus className='h-5 w-5' />,
//         enabled: false,
//         title: 'Modal',
//         demoLink: 'https://www.youtube.com/embed/OPf0YbXqDm0',
//         viewDemo: 'View Demo',
//         infoText: 'Embed Google Maps with customizable markers and styles.',
//         isNew: false,
//         isPro: true,
//     },
//     {
//         id: '44',
//         icon: <Plus className='h-5 w-5' />,
//         enabled: false,
//         title: 'Modal',
//         demoLink: 'https://www.youtube.com/embed/OPf0YbXqDm0',
//         viewDemo: 'View Demo',
//         infoText: 'Embed Google Maps with customizable markers and styles.',
//         isNew: false,
//         isPro: true,
//     }

// ];

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
