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
    // Check if upgrade notice was dismissed (this will be handled by PHP)
    const [showTopBar, setShowTopBar] = useState(() => {
        // First check server-side dismissal
        if (window.hfe_admin_data && window.hfe_admin_data.upgrade_notice_dismissed) {
            return false;
        }
        
        // Fallback to localStorage check
        try {
            const dismissed = localStorage.getItem('uae_upgrade_notice_dismissed');
            return dismissed !== 'true';
        } catch (error) {
            console.error('Features - localStorage check error:', error);
            return true; // Default to showing the notice
        }
    });

    // Function to handle closing the upgrade notice
    const handleCloseUpgradeNotice = async () => {
        console.log('Features - Closing upgrade notice'); // Debug log
        setShowTopBar(false);
        
        // Fallback to localStorage if WordPress AJAX is not available
        if (!window.hfe_admin_data || !window.hfe_admin_data.ajax_url) {
            console.log('Features - Falling back to localStorage');
            try {
                localStorage.setItem('uae_upgrade_notice_dismissed', 'true');
            } catch (error) {
                console.error('Features - localStorage fallback error:', error);
            }
            return;
        }
        
        try {
            const response = await fetch(window.hfe_admin_data.ajax_url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    action: 'hfe_dismiss_upgrade_notice',
                    nonce: window.hfe_admin_data.upgrade_notice_nonce
                })
            });

            const result = await response.json();
            if (result.success) {
                console.log('Features - Upgrade notice dismissed successfully');
            } else {
                console.error('Features - Failed to dismiss upgrade notice:', result.data);
            }
        } catch (error) {
            console.error('Features - AJAX error:', error);
        }
    };

    return (
        <>
         {showTopBar && (
                <UpgradeNotice onClose={handleCloseUpgradeNotice} />
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