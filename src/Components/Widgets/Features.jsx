import NavMenu from '@components/NavMenu'
import { Container } from "@bsf/force-ui";
import React, { useEffect, useState } from 'react'
import TemplateSection from '@components/Dashboard/TemplateSection';
import QuickAccess from '@components/Dashboard/QuickAccess';
import UltimateWidgets from './UltimateWidgets';
import FeatureWidgets from './Features/FeatureWidgets'
import UltimateWidgetFeatures from './UltimateWidgetFeatures';
import ExtendWebsite from '@components/Dashboard/ExtendWebsite';
import UpgradeNotice from "@components/UpgradeNotice";

const Features = () => {
            const [showTopBar, setShowTopBar] = useState(true); // State to manage the visibility of the top bar

    return (
        <>
         {showTopBar && (
                <UpgradeNotice onClose={() => setShowTopBar(false)} /> // Pass a prop to handle closing
            )}
            <NavMenu />
            <div>
                <Container
                    align="stretch"
                    className="p-6 flex flex-col lg:flex-row box-border"
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
                        shrink={1}
                    >
                        <FeatureWidgets />
                    </Container.Item>
                    <Container.Item
                        className="p-2 hfe-35-width"
                        shrink={1}
                    >
                        <UltimateWidgetFeatures />
                        {/* <div className='pt-5'>
                        <ExtendWebsite/>
                        </div> */}
                        <div className='mt-4'>
                        <QuickAccess />
                        </div>
                    </Container.Item>
                </Container>
            </div>
        </>
    )
}

export default Features