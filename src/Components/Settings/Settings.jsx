import React, { useState, useEffect } from 'react'
import { Container, Menu } from "@bsf/force-ui";
import Sidebar from './Sidebar';
import Content from './Content';
import NavMenu from '@components/NavMenu';
import HeaderLine from '@components/HeaderLine';
import ThemeSupport from './ThemeSupport';
import VersionControl from './VersionControl';

const Settings = () => {

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
            content: <VersionControl/>
        }
    ].filter(item => {
        if ( (! hfeSettingsData.show_theme_support ) && item.id === 1 ) {
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
                <Container
                    align="stretch"
                    className="p-1"
                    containerType="flex"
                    direction="row"
                    gap="sm"
                    justify="start"
                    style={{
                        width: "100%",
                        height: "100%"
                    }}
                >
                    <Container.Item
                        className="p-2"
                        alignSelf="auto"
                        order="none"
                        shrink={1}
                        style={{
                            width: "20%",
                            height: "100vh",
                            backgroundColor: "white",
                        }}
                    >
                        <Sidebar items={items} onSelectItem={handleSelectItem} selectedItemId={selectedItem.id}/>
                    </Container.Item>
                    <Container.Item
                        className="p-2"
                    >
                        <Content selectedItem={selectedItem} />
                    </Container.Item>
                </Container>
            </div>
        </>
    )
}

export default Settings

