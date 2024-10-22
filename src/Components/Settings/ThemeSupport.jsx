import React, { useState } from 'react';
import { Container, Title, Label } from "@bsf/force-ui";

const radioData = [
    {
        id: "1",
        title: 'Option 1 (Recommended)',
        description: "This option will automatically replace your theme’s header and footer files with custom templates from the plugin. It works with most themes and is selected by default.",
        value: "option1"
    },
    {
        id: "2",
        title: 'Option 2',
        description: "This option will automatically replace your theme’s header and footer files with custom templates from the plugin. It works with most themes and is selected by default.",
        value: "option2"
    }
];

const ThemeSupport = () => {
    // State to store the selected radio option
    const [selectedOption, setSelectedOption] = useState(radioData[0].value);

    // Handle the radio button change
    const handleRadioChange = (event) => {
        setSelectedOption(event.target.value); // Update the selected option in state
        console.log("Selected Option:", event.target.value); // You can log it for debugging
    };

    return (
        <>
            <Title
                description=""
                icon={null}
                iconPosition="right"
                size="sm"
                tag="h2"
                title="Theme Support"
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
                <Container.Item className="flex flex-col space-y-1">
                    <p className='text-base font-semibold m-0'>Select Option to Add Theme Support</p>
                    <p className='text-sm font-normal m-0'>To ensure compatibility between the Elementor Header & Footer Builder plugin and your theme, please choose one of the following options to enable theme support:</p>
                </Container.Item>
                <Container.Item
                    className="p-2 space-y-4"
                    alignSelf="auto"
                    order="none"
                >
                    {radioData.map((item) => (
                        <div key={item.id} className='flex items-start justify-center cursor-pointer'>
                            <input
                                id={item.id}
                                value={item.value}
                                type='radio'
                                className='mt-1 cursor-pointer'
                                name="theme-support-option" // Group radio buttons
                                onChange={handleRadioChange} // Track the change
                                checked={selectedOption === item.value} // Controlled input
                            />
                            <div className='flex flex-col cursor-pointer'>
                                <Label
                                    size="sm"
                                    variant="neutral"
                                    className='text-sm font-semibold text-text-secondary cursor-pointer flex flex-col items-start justify-start'
                                    htmlFor={item.id}
                                >
                                    {item.title}:
                                    <p className='m-0 text-sm font-normal text-text-secondary cursor-pointer'>{item.description}</p>
                                </Label>
                            </div>
                        </div>
                    ))}
                </Container.Item>

                <div className='flex items-center px-4 border border-brand-200 rounded-md text-start' style={{
                    height: "44px",
                    backgroundColor: "#FEE2E2",
                }}>
                    <p className='m-0'><strong>Note:</strong> If neither option works, please contact your theme author to add support for this plugin.</p>
                </div>
            </Container>
        </>
    );
};

export default ThemeSupport;
