import React from 'react'
import { Container, Title, Button, Switch, Tooltip, Badge, Label } from "@bsf/force-ui";
import { InfoIcon } from 'lucide-react';

const ExtendWebsiteWidget = ({
    widget
}) => {
    const { id,
        icon,
        activated,
        title,
        demoLink,
        infoText,
        isInstalled,
        isFree } = widget

    return (
        <Container align="center"
            className="bg-background-primary p-4 rounded-md shadow-sm"
            containerType="flex"
            direction="column"
            justify="between"
            gap="lg"
        // style={{
        //     height: '118px',
        //     width: '190px'
        // }}
        >
            <div className='flex items-center justify-between w-full'>
                <div className='h-5 w-5'>
                    {icon}
                </div>

                <div className='flex items-center gap-x-2'>
                    {isFree && (
                        <Badge
                            label="Free"
                            size="xs"
                            type="pill"
                            variant="green"
                        />
                    )}

                    {isInstalled ? (
                        <Label
                            size="xs"
                            tag="label"
                            variant="neutral"
                            className="cursor-pointer"
                            style={{color: '#6005FF'}}
                        >
                            Activate
                        </Label>
                    ) : (
                        <Label
                            size="xs"
                            tag="label"
                            variant="neutral"
                            className="cursor-pointer"
                            style={{color: '#6005FF'}}
                        >
                            Install
                        </Label>
                    )}
                </div>


            </div>

            <div className='flex flex-col w-full'>
                <p className='text-sm font-medium text-text-primary pb-1 m-0'>{title}</p>
                <p className='text-sm font-medium text-text-tertiary text-wrap m-0'>{infoText}</p>
                <div className='flex items-center justify-between w-full'>
                    <p className='text-sm text-text-tertiary m-0'>{activated}</p>
                    {/* <Tooltip
                arrow
                content={infoText}
                placement="top"
                title=""
                triggers={[
                    'hover',
                    'focus'
                ]}
                variant="light"
                width="100px"
            >
                <InfoIcon className='h-5 w-5' />
            </Tooltip> */}

                </div>
            </div>
        </Container>
    )
}

export default ExtendWebsiteWidget
