import React, { useEffect, useState } from 'react'
import { Container, Menu } from "@bsf/force-ui";
import Sidebar from './Sidebar';
import Content from './Content';
import NavMenu from '@components/NavMenu';
import HeaderLine from '@components/HeaderLine';
import { Plus } from 'lucide-react';
import ThemeSupport from './ThemeSupport';
import VersionControl from './VersionControl';

const Settings = () => {
    // const [selectedItem, setSelectedItem] = useState({
    //     title: 'Select an item',
    //     content: <ThemeSupport />
    // });

    const items = [
        {
            id: 1,
            icon: (
                <img
                    src={`${hfeSettingsData.theme_url}`}
                    alt="Custom SVG"
                    className="object-contain"
                />
            ),
            main: 'Editor',
            title: 'Theme Support',
            content: <ThemeSupport />
        },
        {
            id: 2,
            icon: (
                <img
                    src={`${hfeSettingsData.version_url}`}
                    alt="Custom SVG"
                    className="object-contain"
                />
            ),
            main: 'Utilities',
            title: 'Version Control',
            content: <VersionControl />
        },
        // {
        //     id: 3,
        //     icon: (
        //         <img
        //             src={`${hfeSettingsData.integrations_url}`}
        //             alt="Custom SVG"
        //             className="object-contain"
        //             style={{
        //                 width: "90%",
        //                 height: "auto",
        //             }}
        //         />
        //     ),
        //     main: 'Preferences',
        //     title: 'Integrations',
        //     content: 'This is the content for Services.'
        // },
        // {
        //     id: 4,
        //     icon: (
        //         <img
        //             src={`${hfeSettingsData.template_url}`}
        //             alt="Custom SVG"
        //             className="object-contain"
        //             style={{
        //                 width: "90%",
        //                 height: "auto",
        //             }}
        //         />
        //     ),
        //     title: 'Contact',
        //     content: 'This is the content for Contact.'
        // }
    ];

    // Default state: Set 'My Account' (first item) as the default when the settings tab is clicked
    const [selectedItem, setSelectedItem] = useState(() => {
        const savedItemId = localStorage.getItem('selectedItemId');
        const savedItem = items.find(item => item.id === Number(savedItemId));
        return savedItem || items[0]; // Default to the first item if no saved item is found
    });

    useEffect(() => {
        // Store selectedItemId in localStorage (or other persistent storage) to retain selection
        localStorage.setItem('selectedItemId', selectedItem.id.toString());
    }, [selectedItem]);

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const tab = params.get('tab');
        if (tab) {
            const itemId = Number(tab);
            const item = items.find(item => item.id === itemId);
            if (item) {
                setSelectedItem(item);
            }
        }
    }, []);

    const handleSelectItem = (item) => {
        setSelectedItem(item);
    };

    const handleSettingsTabClick = () => {
        setSelectedItem(items[0]); // Set "My Account" as the default item when settings tab is clicked
    };



    return (
        <>
            <NavMenu onSettingsTabClick={handleSettingsTabClick} />
            <div className="">
                <HeaderLine />
                <HeaderLine />
                <Container align="stretch" className="p-1 flex-col lg:flex-row uae-settings-page" containerType="flex" direction="row" gap="sm" justify="start" style={{ height: "100%" }}>
                    <Container.Item className="p-2 uae-sticky-outer-wrapper" alignSelf="auto" order="none" shrink={1} style={{ backgroundColor: "#ffffff" }}>
                        <div className='uae-sticky-sidebar'>
                            <Sidebar items={items} onSelectItem={handleSelectItem} selectedItemId={selectedItem.id} />
                        </div>
                    </Container.Item>
                    <Container.Item className="p-2 flex w-full justify-center items-start uae-hide-scrollbar" alignSelf="auto" order="none" shrink={1} style={{ height: "calc(100vh - 1px)", overflowY: "auto" }}>
                        <div className="uael-78-width">
                            <Content selectedItem={selectedItem} />
                        </div>
                    </Container.Item>
                </Container>
            </div>
        </>
    )
}

export default Settings

