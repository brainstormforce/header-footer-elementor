import React, { useState } from 'react';
import { __ } from '@wordpress/i18n';
import { Container, Title, Button } from "@bsf/force-ui";
import { ArrowUpRight } from "lucide-react";

const MyAccount = () => {

    return (
        <>
            <Title
                description=""
                icon={null}
                iconPosition="right"
                size="sm"
                tag="h2"
                title={__('My Account', 'header-footer-elementor')}
            />
            <Container
                align="stretch"
                className="bg-background-primary p-6 rounded-lg"
                containerType="flex"
                direction="column"
                gap="sm"
                justify="start"
                style={{
                    marginTop: "24px",
                }}
            >
                <Container.Item className="flex flex-col space-y-2">
                    <p className='text-base font-semibold m-0'>{__('License Key', 'header-footer-elementor')}</p>
                    <p className='text-sm font-normal m-0'>{__('You are using the lite version of Ultimate Addons for Elementor, no license key is needed.. ')}</p>
                </Container.Item>
                <div className='flex items-center justify-between px-4 rounded-xl' style={{paddingTop: '6px' , paddingBottom: '6px', backgroundColor: "#F3F0FF"}}>
                    <span className="flex items-center gap-x-2 text-base font-semibold">
                        {__('Unlock Pro Features', 'header-footer-elementor')}
                        <p className='text-base font-normal'>{__('Get access to advanced blocks and premium features.', 'header-footer-elementor')}</p>
                    </span>
                    <Button
                            icon={<ArrowUpRight />}
                            iconPosition="right"
                            variant="link"
                            style={{
                                color: '#6005FF',
                                borderColor: '#6005FF',
                                transition: 'color 0.3s ease, border-color 0.3s ease',
                                fontSize: '16px',
                            }}
                            className="hfe-remove-ring text-[#6005FF]"
                            onClick={() => {
                                window.open("https://ultimateelementor.com/pricing/?utm_source=uae-lite-settings&utm_medium=My-accounts&utm_campaign=uae-lite-upgrade", '_blank');
                            }}
                        >
                            {__('Upgrade Now', 'header-footer-elementor')}
                        </Button>
                </div>
            </Container>
        </>
    );
};

export default MyAccount;
