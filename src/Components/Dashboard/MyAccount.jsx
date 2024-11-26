import React, { useState } from 'react';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { Container, Title, Button } from "@bsf/force-ui";
import { ArrowUpRight, LoaderCircle, Plus } from "lucide-react";
import { Toaster, toast } from 'react-hot-toast';

const MyAccount = () => {

    return (
        <>
            <Title
                description=""
                icon={null}
                iconPosition="right"
                size="sm"
                tag="h2"
                title={__('My Account', 'uael')}
            />
            <Container
                align="stretch"
                className="bg-background-primary p-6 rounded-lg uael-78-width"
                containerType="flex"
                direction="column"
                gap="sm"
                justify="start"
                style={{
                    marginTop: "24px",
                }}
            >
                <Container.Item className="flex flex-col space-y-2">
                    <p className='text-base font-semibold m-0'>{__('License Key', 'uael')}</p>
                    <p className='text-sm font-normal m-0'>{__('You are using UAE Free version, no license key needed. ')}</p>
                </Container.Item>
                <div className='flex items-center gap-x-4 px-4 rounded-xl' style={{paddingTop: '6px' , paddingBottom: '6px', backgroundColor: "#F3F0FF"}}>
                    <span className="flex items-center gap-x-2 text-sm font-semibold">
                        Unlock Pro Features
                        <p className='text-sm font-normal'>Get access to advanced blocks and premium features.</p>
                    </span>
                    <Button
                            icon={<ArrowUpRight />}
                            iconPosition="right"
                            variant="link"
                            style={{
                                color: '#6005FF',
                                borderColor: '#6005FF',
                                transition: 'color 0.3s ease, border-color 0.3s ease',
                            }}
                            className="uael-remove-ring text-[#6005FF]"
                            onClick={() => {
                                window.open("https://wordpress.org/plugins/header-footer-elementor/", '_blank');
                            }}
                        >
                            Upgrade now
                        </Button>
                </div>
            </Container>
        </>
    );
};

export default MyAccount;
