import React from 'react'
import { Container, Title, Button, Switch, Tooltip, Badge } from "@bsf/force-ui";
import { InfoIcon } from 'lucide-react';
import { Link } from 'react-dom/client';

const WidgetItem = ({
    widget
}) => {
    const { id,
        icon,
        enabled,
        title,
        demoLink,
        viewDemo,
        infoText,
        isNew,
        isPro, } = widget

    return (
        <Container align="center"
            className="bg-background-primary p-2 rounded-md shadow-sm"
            containerType="flex"
            direction="column"
            justify="between"
            gap="lg"
            style={{
                height: '98px',
                width: '190px'
            }}
        >
            <div className='flex items-center justify-between w-full'>
                <div className='h-5 w-5'>
                    {icon}
                </div>

                <div className='flex items-center gap-x-2'>
                    {isNew && (
                        <Badge
                            label="New"
                            size="xs"
                            type="pill"
                            variant="blue"
                        />
                    )}

                    {isPro ? (
                        <Badge
                            label="PRO"
                            size="xs"
                            type="pill"
                            variant="inverse"
                        />
                    ) : (
                        <Switch size='sm' />
                    )}
                </div>


            </div>

            <div className='flex flex-col w-full'>
                <p className='text-sm font-medium text-text-primary m-0'>{title}</p>
                <div className='flex items-center justify-between w-full'>
                    <p className='text-sm text-text-tertiary m-0'>{viewDemo}</p>
                    <Tooltip
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
                    </Tooltip>

                </div>
            </div>
        </Container>
    )
}

export default WidgetItem
