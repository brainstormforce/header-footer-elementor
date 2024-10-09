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
                <div className='grid grid-cols-7 gap-x-4'>
                    <div className='col-span-5 flex flex-col items-start gap-y-4'>
                        <WelcomeContainer />
                        <Widgets />
                        <UltimateFeatures />
                    </div>
                    <div className='col-span-2 flex flex-col items-start gap-y-4'>
                        <ExtendWebsite />
                        <TemplateSection />
                        <QuickAccess />
                    </div>

                </div>
            </div>
        </>
    )
}

export default Dashboard
