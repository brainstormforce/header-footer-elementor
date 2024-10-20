import React from 'react'
import { Container, Menu } from "@bsf/force-ui";
import NavMenu from '@components/NavMenu';
import HeaderLine from '@components/HeaderLine';
import { Bell, ChartNoAxesColumnIncreasing, CloudUpload, CreditCard, Layers, MousePointer, PenTool, ShoppingBag, Store } from 'lucide-react';

const Settings = () => {
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
                    justify="center"
                    style={{
                        width: "100%",
                    }}
                >
                    <Container.Item
                        className="p-2"
                        alignSelf="auto"
                        order="none"
                        shrink={1}
                        style={{
                            width: "100%",
                        }}
                    >
                        <Menu size="md">
                            <Menu.List
                                arrow
                                heading="Editor"
                                open
                            >
                                <Menu.Item
                                >
                                    <Store />
                                    <div>
                                        Theme Support
                                    </div>
                                </Menu.Item>
                            </Menu.List>
                            <Menu.List
                                arrow
                                heading="Utilities"
                                open
                            >
                                <Menu.Item>
                                    <ShoppingBag />
                                    <div>
                                       Version Control 
                                    </div>
                                </Menu.Item>
                            </Menu.List>
                            {/* <No Display Name /> */}
                            <Menu.List
                                arrow
                                heading="Preferences"
                                open
                            >
                                <Menu.Item>
                                    <MousePointer />
                                    <div>
                                    Integrations
                                    </div>
                                </Menu.Item>
                            </Menu.List>
                        </Menu>
                    </Container.Item>
                    <Container.Item
                        className="p-2"
                        alignSelf="auto"
                        order="none"
                        shrink={1}
                        style={{
                            width: "90%",
                        }}
                    >
                        <h1>Settings</h1>
                    </Container.Item>
                </Container>
            </div>
        </>
    )
}

export default Settings
