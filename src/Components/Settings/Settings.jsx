import React, { useState } from 'react'
import { Container, Menu } from "@bsf/force-ui";
import Sidebar from './Sidebar';
import Content from './Content';
import NavMenu from '@components/NavMenu';
import HeaderLine from '@components/HeaderLine';
import { Plus } from 'lucide-react';

const Settings = () => {
    const [selectedItem, setSelectedItem] = useState({
        title: 'Select an item',
        content: 'Content will appear here when you select an item.'
    });

    const items = [
        { id: 1, icon: <Plus/> , main: 'Editor', title: 'Theme Support', content: 'This is the content for Home.' },
        { id: 2, icon: <Plus/>, main: 'Utilities', title: 'Version Control', content: 'This is the content for About.' },
        { id: 3, icon: <Plus/>, main: 'Preferences', title: 'Integrations', content: 'This is the content for Services.' },
        // { id: 4, icon: <Plus/> ,title: 'Contact', content: 'This is the content for Contact.' }
    ];

    return (
        <>
            <NavMenu />
            <div className="">
                <HeaderLine />
                <Container
                    align="stretch"
                    className="p-2"
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
                            backgroundColor: "red",
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

