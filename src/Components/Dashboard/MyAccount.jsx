import React, { useState } from 'react';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { Container, Title, Button } from "@bsf/force-ui";
import { ArrowUpRight, LoaderCircle, Plus } from "lucide-react";
import { Toaster, toast } from 'react-hot-toast';

const MyAccount = () => {

    return (
        <>
            <Toaster
                position="top-right"
                reverseOrder={false}
                gutter={8}
                containerStyle={{
                    top: 20,
                    right: 20,
                    marginTop: '40px',
                }}
                toastOptions={{
                    duration: 5000,
                    style: {
                        background: 'white',
                    },
                    success: {
                        duration: 3000,
                        iconTheme: {
                            primary: '#6005ff',
                            secondary: '#fff',
                        },
                    },
                }}
            />
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
                <div className='flex items-center px-4 rounded-md' style={{paddingTop: '12px' , paddingBottom: '12px', backgroundColor: "#D6CDFF"}}>
                    <span className="flex items-center gap-x-2">
                        Unlock Pro Features
                        <p>Get access to advanced blocks and premium features.</p>
                    </span>
                    <Button
                            icon={<ArrowUpRight />}
                            iconPosition="right"
                            variant="ghost"
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
