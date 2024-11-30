import NavMenu from '@components/NavMenu'
import { Container } from "@bsf/force-ui";
import React from 'react'
import ExtendWebsite from '@components/Dashboard/ExtendWebsite';
import TemplateSection from '@components/Dashboard/TemplateSection';
import QuickAccess from '@components/Dashboard/QuickAccess';
import UltimateWidgets from './UltimateWidgets';
import FeatureWidgets from './Features/FeatureWidgets'

const Features = () => {
    return (
        <>
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
                        <ExtendWebsite />
                        <TemplateSection />
                        <QuickAccess />
                        <UltimateWidgets />
                    </Container.Item>
                </Container>
            </div>
        </>
    )
}

export default Features