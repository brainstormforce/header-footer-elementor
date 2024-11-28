import { Container } from "@bsf/force-ui";
import ExtendWebsite from "@components/Dashboard/ExtendWebsite";
import QuickAccess from "@components/Dashboard/QuickAccess";
import TemplateSection from "@components/Dashboard/TemplateSection";
import UltimateFeatures from "@components/Dashboard/UltimateFeatures";
import WelcomeContainer from "@components/Dashboard/WelcomeContainer";
import Widgets from "@components/Dashboard/Widgets";
import NavMenu from "@components/NavMenu";
import UpgradeNotice from "@components/UpgradeNotice";
import UltimateWidgets from "@components/Widgets/UltimateWidgets";

import React from 'react'
import FreevsPro from "./FreevsPro";
import UltimateCompare from "./UltimateCompare";


const Upgrade = () => {
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
                        <FreevsPro/>
                    </Container.Item>
                    <Container.Item 
                        className="p-2 w-full hfe-35-width"
                        shrink={1}
                    >
                        <UltimateCompare />
                        <ExtendWebsite />
                        <QuickAccess />
                    </Container.Item>
                </Container>
            </div>
        </>
    )
}

export default Upgrade
