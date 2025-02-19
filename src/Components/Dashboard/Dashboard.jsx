import { Container } from "@bsf/force-ui";
import NavMenu from '@components/NavMenu'
import React, { useEffect } from 'react'
import Widgets from './Widgets'
import TemplateSection from './TemplateSection'
import QuickAccess from './QuickAccess'
import WelcomeContainer from './WelcomeContainer'
import UltimateFeatures from './UltimateFeatures'
import ExtendWebsite from './ExtendWebsite'

const Dashboard = () => {
    useEffect(() => {
        const dashboardURL = "admin.php?page=hfe#dashboard";

        // Push the dashboard URL to history and prevent going back
        window.history.pushState(null, "", dashboardURL);
        window.history.replaceState(null, "", dashboardURL);

        const forceStayOnDashboard = () => {
            setTimeout(() => {
                window.history.pushState(null, "", dashboardURL);
                window.location.href = dashboardURL; // Force redirect to dashboard
            }, 0);
        };

        // Call function immediately and on every back attempt
        forceStayOnDashboard();
        window.addEventListener("popstate", forceStayOnDashboard);

        return () => {
            window.removeEventListener("popstate", forceStayOnDashboard);
        };
    }, []);

    return (
        <>
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
                        <TemplateSection />
                        <ExtendWebsite />
                        <QuickAccess />
                    </Container.Item>
                </Container>
            </div>
        </>
    );
}

export default Dashboard;
