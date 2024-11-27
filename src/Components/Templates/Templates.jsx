import React from 'react'
import { Container } from "@bsf/force-ui";
import UpgradeNotice from '@components/UpgradeNotice'
import NavMenu from '@components/NavMenu';
import HeaderLine from '@components/HeaderLine';
import ExploreTemplates from './ExploreTemplates';

const Templates = () => {
    return (
        <>
            <UpgradeNotice />
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
                            width: "90%",
                        }}
                    >
                        {/* <WelcomeContainer />
                        <Widgets /> */}
                        <ExploreTemplates />
                    </Container.Item>
                </Container>
            </div>
        </>
    )
}

export default Templates
