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
    <div className="hfe-settings-content-wrapper">
        <HeaderLine />
        <div className='hfe-settings-dashboard m-4'>
            <Widgets />
            <TemplateSection />
            <QuickAccess />
            <WelcomeContainer />
            <UltimateFeatures />
            <ExtendWebsite />
        </div>
    </div>
</>
  )
}

export default Dashboard
