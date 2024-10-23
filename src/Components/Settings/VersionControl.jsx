import React, { useState } from 'react'
import { Container, Title, Button, Select, SelectButton, SelectOptions, SelectItem, Label } from "@bsf/force-ui";
import { Plus } from 'lucide-react';

const VersionControl = () => {
    const [selectedOption, setSelectedOption] = useState('');

    const handleSelectChange = (event) => {
      setSelectedOption(event.target.value);
    };
  
    const handleButtonClick = () => {
      alert(`You selected: ${selectedOption}`);
    };
  
    return (
        <>
            <Title
                description=""
                icon={null}
                iconPosition="right"
                size="sm"
                tag="h2"
                title="Version Control"
            />
            <Container
                align="stretch"
                className="bg-background-primary p-6 flex flex-row rounded-lg"
                containerType="flex"
                direction="column"
                gap="sm"
                justify="start"
                style={{
                    marginTop: "24px",
                    // maxWidth: "696px",
                }}
            >
                <Container.Item className="flex flex-col space-y-1">
                    <p className='text-base font-semibold m-0'>Rollback to Previous Version</p>
                    <p className='text-sm font-normal m-0'>Experiencing an issue with Spectra version 2.15.2? Roll back to a previous version to help troubleshoot the issue.</p>
                </Container.Item>
                <Container.Item
                    className="p-2 flex space-y-4"
                    alignSelf="auto"
                    order="none"
                >
                    {/* Dropdown */}
                    <select
                        value={selectedOption}
                        onChange={handleSelectChange}
                        style={{ padding: '8px', marginRight: '10px', marginTop: '16px', cursor: 'pointer', borderRadius: '4px', height: '44px', width: '100px' }}
                    >
                        <option value="" disabled>2.15.1</option>
                        <option value="Option 1">Option 1</option>
                        <option value="Option 2">Option 2</option>
                        <option value="Option 3">Option 3</option>
                    </select>
                    <div className='flex flex-col cursor-pointer'>
                        <Button
                            // icon={<Plus />}
                            iconPosition="left"
                            variant="primary"
                        >
                            Rollback
                        </Button>
                    </div>
                </Container.Item>
            </Container>
        </>
    )
}

export default VersionControl
