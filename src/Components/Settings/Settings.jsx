import React, { useState } from 'react'
import { Container, Menu } from "@bsf/force-ui";
import Sidebar from './Sidebar';
import Content from './Content';
import NavMenu from '@components/NavMenu';
import HeaderLine from '@components/HeaderLine';
import { Plus } from 'lucide-react';
import ThemeSupport from './ThemeSupport';
import VersionControl from './VersionControl';

const Settings = () => {
    const [selectedItem, setSelectedItem] = useState({
        title: 'Select an item',
        content: <ThemeSupport />
    });

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

    return (
        <>
            <NavMenu />
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
                        <Sidebar items={items} onSelectItem={setSelectedItem} />
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

