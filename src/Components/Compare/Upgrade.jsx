import { Container } from "@bsf/force-ui";
import ExtendWebsite from "@components/Dashboard/ExtendWebsite";
import QuickAccess from "@components/Dashboard/QuickAccess";
import NavMenu from "@components/NavMenu";
import UpgradeNotice from "@components/UpgradeNotice";
import React, { useEffect, useState } from 'react'
import FreevsPro from "./FreevsPro";
import UltimateCompare from "./UltimateCompare";
import UltimateFeatures from "@components/Dashboard/UltimateFeatures";


const Upgrade = () => {
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
            console.error('Upgrade - localStorage check error:', error);
            return true; // Default to showing the notice
        }
    });

    // Function to handle closing the upgrade notice
    const handleCloseUpgradeNotice = async () => {
        console.log('Upgrade - Closing upgrade notice'); // Debug log
        setShowTopBar(false);
        
        // Fallback to localStorage if WordPress AJAX is not available
        if (!window.hfe_admin_data || !window.hfe_admin_data.ajax_url) {
            console.log('Upgrade - Falling back to localStorage');
            try {
                localStorage.setItem('uae_upgrade_notice_dismissed', 'true');
            } catch (error) {
                console.error('Upgrade - localStorage fallback error:', error);
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
                console.log('Upgrade - Upgrade notice dismissed successfully');
            } else {
                console.error('Upgrade - Failed to dismiss upgrade notice:', result.data);
            }
        } catch (error) {
            console.error('Upgrade - AJAX error:', error);
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
                        <FreevsPro />
                    </Container.Item>
                    <Container.Item
                        className="p-2 w-full hfe-35-width"
                        shrink={1}
                    >
                        <UltimateFeatures />
                        {/* <div className='pt-5'>
                            <ExtendWebsite />
                        </div> */}
                        <div className='pt-4 mt-4'>
                            <QuickAccess />
                        </div>

                    </Container.Item>
                </Container>
            </div>
        </>
    )
}

export default Upgrade
