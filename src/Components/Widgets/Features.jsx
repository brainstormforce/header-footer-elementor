import NavMenu from '@components/NavMenu'
import { Container } from "@bsf/force-ui";
import React from 'react'
import TemplateSection from '@components/Dashboard/TemplateSection';
import QuickAccess from '@components/Dashboard/QuickAccess';
import UltimateWidgets from './UltimateWidgets';
import FeatureWidgets from './Features/FeatureWidgets'
import UltimateFeatures from '@components/Dashboard/UltimateFeatures';
import ExtendWebsite from '@components/Dashboard/ExtendWebsite';

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
                        <UltimateFeatures />
                        {/* <div className='pt-5'>
                        <ExtendWebsite/>
                        </div> */}
                        <div className='pt-4'>
                        <QuickAccess />
                        </div>
                    </Container.Item>
                </Container>
            </div>
        </>
    )
}

export default Features