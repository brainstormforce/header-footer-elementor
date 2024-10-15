import React from 'react'
import { Container, Title, Button, Switch, Tooltip, Badge } from "@bsf/force-ui";
import { InfoIcon } from 'lucide-react';
import { Link } from 'react-dom/client';

const WidgetItem = ({
    widget
}) => {
    const { 
        icon,
        title,
        viewDemo,
        infoText,
        is_pro,
        is_active
    } = widget

    console.log({widget})

    return (
        <Container align="center"
            containerType="flex"
            direction="column"
            justify="between"
            gap=""
        >
            <div className='flex items-center justify-between w-full'>
                <div  className={`h-5 w-5 mb-5 ${icon?.props}`}>
                    {icon}
                </div>

                <div className='flex items-center gap-x-2'>
                    {/* {isNew && (
                        <Badge
                            label="New"
                            size="xs"
                            type="pill"
                            variant="blue"
                        />
                    )} */}

                    {is_pro ? (
                        <Badge
                            label="PRO"
                            size="xs"
                            type="pill"
                            variant="inverse"
                        />
                    ) : is_active ? ( // Corrected this line
                        <Switch 
                            onChange={() => {}} // Add your onChange logic here
                            size='sm' 
                            value={is_active} // Pass is_active as value to the Switch
                        />
                    ) : (
                        <Switch 
                            onChange={() => {}} // Add your onChange logic here
                            size='sm' // Pass is_active as value to the Switch
                        />
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

export default WidgetItem
