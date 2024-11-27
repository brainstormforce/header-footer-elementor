import { Container } from "@bsf/force-ui";
import UpgradeNotice from '@components/UpgradeNotice'
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
            <UpgradeNotice />
            <NavMenu />
            <div>
                <Container
                    align="stretch"
                    className="p-6 flex-col lg:flex-row box-border"
                    containerType="flex"
                    direction="row"
                    gap="sm"
                    justify="start"
                    style={{
                        width: "100%",
                    }}
                >
                    <Container.Item
                        className="p-2 hfe-65-width"
                        alignSelf="auto"
                        order="none"
                        shrink={0}
                    >
                        <WelcomeContainer />
                        <Widgets />
                        <UltimateFeatures />
                    </Container.Item>
                    <Container.Item 
                        className="p-2 w-full hfe-35-width"
                        shrink={1}
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
