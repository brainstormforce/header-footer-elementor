import React from 'react'
import { Container, Title, Button, Switch, Tooltip, Badge } from "@bsf/force-ui";
import { InfoIcon } from 'lucide-react';

const FeatureWidgetItems = ({
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
            containerType="flex"
            direction="column"
            justify="between"
            gap=""
        >
            <div className='flex items-center justify-between w-full'>
                <div className='h-5 w-5 mb-5'>
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
                <p className='text-sm font-medium text-text-primary m-0 mb-2'>{title}</p>
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

export default FeatureWidgetItems