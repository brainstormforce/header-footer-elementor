import React, { useState } from 'react';
import { __ } from '@wordpress/i18n'; 

const UpgradeNotice = () => {
    // State to control visibility of the top bar
    const [isVisible, setIsVisible] = useState(true);

    // Handler to hide the top bar
    const handleClose = () => setIsVisible(false);

    if (!isVisible) return null; // If not visible, return null (hide the component)

    return (
        <div 
            className="uae-upgrade p-3 d font-medium" 
            style={{ 
                backgroundColor: '#E9E4FF', 
                textAlign: 'center', 
                fontSize: '0.82rem', 
                zIndex: '9', 
                position: 'relative' 
            }}
        >
            <button 
                onClick={handleClose} 
                style={{ 
                    position: 'absolute', 
                    top: '10px', 
                    right: '10px', 
                    background: 'none', 
                    border: 'none', 
                    fontSize: '16px', 
                    cursor: 'pointer', 
                    color: '#000' 
                }}
                aria-label={__('Close Upgrade Notice', 'header-footer-elementor')}
            >
                &times; {/* This is the "X" icon */}
            </button>
            <strong>{__('Unlock Ultimate Addons For Elementor!  ', 'header-footer-elementor')}</strong>
            <span> 
                {__('Get exclusive features and unbeatable performance.  ', 'header-footer-elementor')} 
                <a 
                    href="https://ultimateelementor.com/pricing/?utm_source=uae-lite-settings&utm_medium=My-accounts&utm_campaign=uae-lite-upgrade" 
                    target="_blank" 
                    style={{ color: "#000000" }}
                >
                    {__('Upgrade now', 'header-footer-elementor')}
                </a>
            </span>
        </div>
    );
};

export default UpgradeNotice;
