import React from 'react';
import { __ } from '@wordpress/i18n'; 

const UpgradeNotice = () => {
    return (
        <div className="uae-upgrade p-3 d font-medium" style={{ backgroundColor: '#E9E4FF', textAlign: 'center', fontSize: '1rem', zIndex: '99999', position: 'fixed', top: '0', width: '100%', boxSizing: 'border-box' }}>
            <strong>{__('Unlock Ultimate Addons For Elementor!  ', 'header-footer-elementor')}</strong>
            <span> {__('Get exclusive features and unbeatable performance.  ', 'header-footer-elementor')} <a href="https://ultimateelementor.com/pricing" target="_blank" style={{color: "#000000"}}>{__('Upgrade now', 'header-footer-elementor')}</a></span>
        </div>
    );
};

export default UpgradeNotice;
