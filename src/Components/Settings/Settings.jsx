import React, { useState, useEffect } from 'react'
import { Container } from "@bsf/force-ui";
import Sidebar from './Sidebar';
import Content from './Content';
import NavMenu from '@components/NavMenu';
import HeaderLine from '@components/HeaderLine';
import ThemeSupport from './ThemeSupport';
import VersionControl from './VersionControl';
import MyAccount from '@components/Dashboard/MyAccount';

const Settings = () => {

    const items = [
        {
            id: 1,
            icon: (
                <img
                    src={`${hfeSettingsData.user_url}`}
                    alt="Custom SVG"
                    className="object-contain"
                />
            ),
            selected: (
                <img
                    src={`${hfeSettingsData.user__selected_url}`}
                    alt="Custom SVG"
                    className="object-contain"
                />
            ),
            title: 'My Account',
            content: <MyAccount />
        },
        {
            id: 2,
            icon: (
                <img
                    src={`${hfeSettingsData.theme_url}`}
                    alt="Custom SVG"
                    className="object-contain"
                />
            ),
            selected: (
                <img
                    src={`${hfeSettingsData.theme_url_selected}`}
                    alt="Custom SVG"
                    className="object-contain"
                />
            ),
            main: 'Editor',
            title: 'Theme Support',
            content: <ThemeSupport />
        },
        {
            id: 3,
            icon: (
                <img
                    src={`${hfeSettingsData.version_url}`}
                    alt="Custom SVG"
                    className="object-contain"
                />
            ),
            selected: (
                <img
                    src={`${hfeSettingsData.version__selected_url}`}
                    alt="Custom SVG"
                    className="object-contain"
                />
            ),
            main: 'Utilities',
            title: 'Version Control',
            content: <VersionControl />
        }
    ].filter(item => {

        if ( ( "no" === hfeSettingsData.show_theme_support ) && item.id === 2 ) {
            return false;
        }

        return true;
    });

    // Default state: Set 'My Account' (first item) as the default when the settings tab is clicked
    const [selectedItem, setSelectedItem] = useState(() => {
        const savedItemId = localStorage.getItem('hfeSelectedItemId');
        const savedItem = items.find(item => item.id === Number(savedItemId));
        return savedItem || items[0]; // Default to the first item if no saved item is found
    });

    useEffect(() => {
        // Store selectedItemId in localStorage (or other persistent storage) to retain selection
        localStorage.setItem('hfeSelectedItemId', selectedItem.id.toString());
    }, [selectedItem]);

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
                <Container align="stretch" className="p-1 flex-col lg:flex-row hfe-settings-page" containerType="flex" direction="row" gap="sm" justify="start" style={{ height: "100%" }}>
                    <Container.Item className="p-2 hfe-sticky-outer-wrapper" alignSelf="auto" order="none" shrink={1} style={{ backgroundColor: "#ffffff" }}>
                        <div className='hfe-sticky-sidebar'>
                            <Sidebar items={items} onSelectItem={handleSelectItem} selectedItemId={selectedItem.id} />
                        </div>
                    </Container.Item>
                    <Container.Item className="p-2 flex w-full justify-center items-start hfe-hide-scrollbar" alignSelf="auto" order="none" shrink={1} style={{ height: "calc(100vh - 1px)", overflowY: "auto" }}>
                        <div className="hfe-78-width">
                            <Content selectedItem={selectedItem} />
                        </div>
                    </Container.Item>
                </Container>
            </div>
        </>
    )
}

export default Settings

