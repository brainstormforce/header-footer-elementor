import HeaderLine from '@components/HeaderLine'
import NavMenu from '@components/NavMenu'
import { Container } from "@bsf/force-ui";
import React from 'react'
import WelcomeContainer from '@components/Dashboard/WelcomeContainer';
import UltimateFeatures from '@components/Dashboard/UltimateFeatures';
import ExtendWebsite from '@components/Dashboard/ExtendWebsite';
import TemplateSection from '@components/Dashboard/TemplateSection';
import QuickAccess from '@components/Dashboard/QuickAccess';
import Widgets from '@components/Dashboard/Widgets';
import UltimateWidgets from './UltimateWidgets';

const Features = () => {
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
                <Widgets />
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
                <UltimateWidgets />
            </Container.Item>
        </Container>
    </div>
</>
  )
}

export default Features