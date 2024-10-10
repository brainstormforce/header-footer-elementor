import { Container } from "@bsf/force-ui";
import HeaderLine from '@components/HeaderLine'
import NavMenu from '@components/NavMenu'
import React from 'react'
import Widgets from './Widgets'
import TemplateSection from './TemplateSection'
import QuickAccess from './QuickAccess'
import WelcomeContainer from './WelcomeContainer'
import UltimateFeatures from './UltimateFeatures'
import ExtendWebsite from './ExtendWebsite'

const Dashboard = () => {
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
                    }}
                >
                    <Container.Item
                        className="p-2"
                        alignSelf="auto"
                        order="none"
                        shrink={1}
                        style={{
                            width: "65%",
                        }}
                    >
                        <WelcomeContainer />
                        <Widgets />
                        <UltimateFeatures />
                    </Container.Item>
                    <Container.Item 
                        className="p-2"
                        style={{
                            width: "34%",
                        }}
                    >
                        <ExtendWebsite />
                        <TemplateSection />
                        <QuickAccess />
                    </Container.Item>
                </Container>
            </div>
        </>
    )
}

export default Dashboard
