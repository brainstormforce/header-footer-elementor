import React, { useState } from 'react'
import { Container, Title, Button, Select, SelectButton, SelectOptions, SelectItem, Label, Dialog } from "@bsf/force-ui";
import { Plus } from 'lucide-react';
import { __ } from '@wordpress/i18n';

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
            <div
                className="box-border bg-background-primary p-6 rounded-lg"
                style={{
                    marginTop: "24px",
                }}
            >
                <Container
                    align="stretch"
                    className="flex flex-col lg:flex-row"
                    containerType="flex"
                    direction="column"
                    gap="sm"
                    justify="start"
                >
                    <Container.Item className="shrink flex flex-col space-y-1">
                        <p className='text-base font-semibold m-0'>Rollback to Previous Version</p>
                        <p className='text-sm font-normal m-0'>Experiencing an issue with Spectra version 2.15.2? Roll back to a previous version to help troubleshoot the issue.</p>
                    </Container.Item>
                    <Container.Item
                        className="p-2 flex space-y-4"
                        alignSelf="auto"
                        order="none"
                    >
                        <div className="bsf-rollback-version">
                            <input type="hidden" name="product-name" id="bsf-product-name" value='' />
                            <select
                                id=""
                                onBlur={() => {
                                    setFreeproductSelect('elementor-header-footer');
                                }}
                                // onChange={handleLiteVersionChange}
                                style={{
                                    padding: '8px',
                                    marginRight: '10px',
                                    marginTop: '16px',
                                    cursor: 'pointer',
                                    borderRadius: '4px',
                                    height: '44px',
                                    width: '100px',
                                }}
                            >

                                <option>
                                    xyz
                                </option>
                            </select>
                        </div>

                        <div className="flex flex-col cursor-pointer">
                                    <Dialog
                                        design="simple"
                                        exitOnEsc
                                        scrollLock
                                        trigger={<Button>{__('Rollback', 'uael')}</Button>}
                                    >
                                        <Dialog.Backdrop />
                                        <Dialog.Panel>
                                            <Dialog.Header>
                                                <div className="flex items-center justify-between">
                                                    <Dialog.Title>
                                                        {__('Rollback to Previous Version', 'uael')}
                                                    </Dialog.Title>
                                                    <Dialog.CloseButton />
                                                </div>
                                            </Dialog.Header>
                                            <Dialog.Body>
                                                {__(`Are you sure you want to rollback ?`)}
                                            </Dialog.Body>
                                            <Dialog.Footer>
                                                <Button>
                                                    {__('Rollback', 'uael')}
                                                </Button>
                                                <Button>
                                                    {__('Cancel', 'uael')}
                                                </Button>
                                            </Dialog.Footer>
                                        </Dialog.Panel>
                                    </Dialog>
                                </div>
                        {/* Dropdown */}
                    </Container.Item>
                </Container>
            </div>

        </>
    )
}

export default VersionControl
