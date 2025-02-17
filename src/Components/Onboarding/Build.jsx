import React, { useEffect, useState } from 'react';
import { Container, Button, Switch, Title, Dialog, Input } from '@bsf/force-ui';
import { X, Check, Plus, MoveRight, Package } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from "../../router/index"
import { __ } from "@wordpress/i18n";
// import { routes } from "../admin/settings/routes";
import { Navigate } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Success from './Success.jsx';
import { routes } from "../../admin/settings/routes";

const OnboardingBuild = ({ setCurrentStep }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        setEmail(hfeSettingsData.user_email);
        setIsActive(hfeSettingsData.analytics_status === 'yes');
    }, [hfeSettingsData.user_email]);

    const handleSubmit = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(email)) {
            setIsSubmitted(true);
            callValidatedEmailWebhook(email);
        } else {
            alert(__('Please enter a valid email address', 'header-footer-elementor'));
        }
    };

    const handleSwitchChange = () => {

        const newIsActive = !isActive;
        setIsActive(newIsActive);
        console.log(`Switch is now ${newIsActive ? 'active' : 'inactive'}`);

        try {
            const response = fetch( hfe_admin_data.ajax_url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams({
                    action: 'save_analytics_option', // WordPress action for your AJAX handler.
                    bsf_analytics_optin: newIsActive ? 'yes' : 'no',
                    nonce: hfe_admin_data.nonce // Nonce for security.
                })
            });
    
            const result = response.json();
    
            if (result.success) {
                toast.success(__('Settings saved successfully!', 'header-footer-elementor'));
            } else {
                toast.error(__('Failed to save settings!', 'header-footer-elementor'));
            }
        } catch (error) {
            toast.error(__('Failed to save settings!', 'header-footer-elementor'));
        }
    
        // setIsLoading(false);
    };

    const callValidatedEmailWebhook = (email) => {
        const webhookUrl = 'https://webhook.suretriggers.com/suretriggers/4cb01209-5164-4521-93c1-360df407d83b';
        const today = new Date().toISOString().split('T')[0];

        const params = new URLSearchParams({
            email: email,
            date: today,
        });

        fetch(`${webhookUrl}?${params.toString()}`, {
            method: 'POST',
        })
            .then(response => response.json())
            .then(data => {
                console.log('Webhook call successful:', data);
            })
            .catch(error => {
                console.error('Error calling webhook:', error);
            });
    }

    return (
        <div className="bg-background-primary border-[0.5px] border-subtle rounded-xl shadow-sm mb-6 p-8">
            <div className="flex items-center">
                {/* Left Content */}
                <div className="flex flex-col items-start">
                    <p className="font-bold text-text-primary m-0" style={{ fontSize: '25px' }}>
                        {__("You’re all set! 🚀", "header-footer-elementor")}
                    </p>
                    <p className="font-medium text-text-tertiary m-0" style={{ fontSize: '18px' }}>
                        {__(
                            "Start creating amazing designs with UAE and take your website to the next level",
                            "header-footer-elementor"
                        )}
                    </p>
                    <p className="font-bold text-text-primary m-0 mt-1 text-lg" style={{ paddingTop: '8px' }}>
                        {__("Here’s how to get started:", "header-footer-elementor")}
                    </p>
                    <ul className="list-none">
                        <li className="flex items-start gap-x-1 text-text-tertiary text-md font-medium">
                            <span className="text-text-tertiary">
                                1. Click on “Create New Page” button
                            </span>
                        </li>
                        <li className="flex items-start gap-x-1 text-text-tertiary text-md font-medium">
                            <span>2. Use the Elementor editor to customize your page/post according to your preferences</span>
                        </li>
                        <li className="flex items-start gap-x-1 text-text-tertiary text-md font-medium">
                            <span className="text-text-tertiary">
                                3. Use UAE widgets to design your pages.
                            </span>
                        </li>
                        <li className="flex items-start gap-x-1 text-text-tertiary text-md font-medium">
                            <span className="text-text-tertiary">
                                4. Click “Publish” to make it live
                            </span>
                        </li>
                    </ul>
                </div>

                {/* Right Content - Image */}
                <div className="w-1/2 flex justify-center">
                    <img
                        alt="Build"
                        className="w-full object-contain"
                        style={{ height: '250px' }}
                        src={`${hfeSettingsData.build_banner}`}
                    />
                </div>
            </div>
            <div className='flex flex-row gap-2' style={{ marginTop: '15px' }}>
                <Button
                    iconPosition="right"
                    variant="primary"
                    className="bg-[#6005FF] uael-remove-ring"
                    style={{
                        backgroundColor: "#6005FF",
                        transition: "background-color 0.3s ease",
                    }}
                    onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor =
                        "#4B00CC")
                    }
                    onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor =
                        "#6005FF")
                    }
                    onClick={() => {
                        window.open(
                            hfeSettingsData.uael_hfe_post_url,
                            "_blank"
                        );
                    }}
                >
                    {__("Create Header/Footer", "header-footer-elementor")}
                </Button>

                <Button
                    icon={<MoveRight />}
                    iconPosition="right"
                    variant="ghost"
                    className="uael-remove-ring"
                    onMouseEnter={(e) =>
                        (e.currentTarget.style.color =
                            "#000000") &&
                        (e.currentTarget.style.borderColor =
                            "#000000")
                    }
                    onMouseLeave={(e) =>
                        (e.currentTarget.style.color =
                            "#6005FF") &&
                        (e.currentTarget.style.borderColor =
                            "#6005FF")
                    }
                    onClick={() => {
                        window.open(
                            dashboard,
                        );
                    }}
                >
                    {__("Go to Dashboard", "header-footer-elementor")}
                </Button>
            </div>
            <div
                className="flex items-start justify-start"
                style={{
                    marginTop: '25px',
                    backgroundImage: `url(${hfeSettingsData.special_reward})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: '95%', // Adjust width as needed
                    height: '150px' // Adjust height as needed
                }}
            >
                <div className='flex flex-col'>
                    <span className='font-bold text-text-primary' style={{ fontSize: '16px', marginTop: '34px', marginLeft: '34px' }}>
                        We have a special reward just for you!
                    </span>

                    <span className='font-medium text-text-secondary' style={{ fontSize: '14px', marginTop: '8px', marginLeft: '34px' }}>
                        Unlock your surprise now
                    </span>

                    <Button
                        className="uael-remove-ring"
                        icon={<Package aria-label="icon" role="img" />}
                        iconPosition="right"
                        size="md"
                        tag="button"
                        type="button"
                        variant="link"
                        style={{ marginTop: '16px', marginRight: '100px', color: "#6005FF" }}
                        onClick={() => setIsDialogOpen(true)}
                    >
                        Unlock My Surprise
                    </Button>
                </div>
            </div>
            <hr className="w-full border-b-0 border-x-0 border-t  border-solid border-t-border-subtle" style={{ marginTop: '34px', marginBottom: '34px' }} />

            <div className="bg-badge-background-gray border-[0.5px] border-subtle rounded-xl p-2 shadow-sm flex flex-col w-full space-y-1 space-x-2" style={{ width: '820px' }}>
                <div className='flex flex-row items-center justify-start px-1 gap-3'>
                    <Switch
                        onChange={handleSwitchChange}
                        size='sm'
                        value={isActive}
                        className="hfe-remove-ring"
                    />
                    <p className="font-bold text-text-primary m-0" style={{ fontSize: '20px' }}>
                        {__("Help make UAE Better", "header-footer-elementor")}
                    </p>
                </div>
                <p className='font-medium text-[#64748B]' style={{ fontSize: '16px' }}>Help us improve by sharing anonymous data about your website setup. This includes non-sensitive info about plugins, themes, and settings, so we can create a better product for you. Your privacy is always our top priority. Learn more in our privacy policy.</p>
            </div>

            <Dialog
                design="simple"
                open={isDialogOpen}
                setOpen={setIsDialogOpen}
            >
                <Dialog.Backdrop />
                <Dialog.Panel>
                    <Dialog.Header style={{ padding: '30px' }}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <Dialog.Title style={{ fontSize: '25px', width: '80%', lineHeight: '36px' }}>
                                    {__('We have a special Reward just for you! 🎁', 'header-footer-elementor')}
                                </Dialog.Title>
                                <Button
                                    icon={<X className="size-10" />}
                                    iconPosition="right"
                                    size="md"
                                    variant="ghost"
                                    className='uael-remove-ring'
                                    onClick={() => setIsDialogOpen(false)}
                                    style={{ marginLeft: '60px', marginBottom: '20px' }}
                                />
                            </div>
                        </div>
                        <Dialog.Description style={{ fontSize: '14px', width: '90%', fontWeight: '400', color: '#64748B' }}>
                            {__('Enter your email address to get special offer that we have for you and stay updated on UAE’s latest news and updates.', 'header-footer-elementor')}
                        </Dialog.Description>

                        <p className="text-md font-bold py-2 text-field-label m-0 gap-0" style={{ fontSize: '14px' }}>
                            {__(
                                "Email Address",
                                "header-footer-elementor"
                            )}
                        </p>

                        <div className='flex flex-row gap-2'>
                            <input
                                type="email"
                                placeholder={`${hfeSettingsData.user_email}`}
                                value={email}
                                className='h-12'
                                style={{ width: '282px' }}
                                onChange={(e) => {
                                    if (e && e.target) {
                                        console.log('Input changed:', e.target.value);
                                        setEmail(e.target.value);
                                    } else {
                                        console.error('Event or event target is undefined');
                                    }
                                }}
                            />
                            <Button
                                iconPosition="right"
                                variant="primary"
                                className="bg-[#6005FF] uael-remove-ring"
                                style={{
                                    backgroundColor: "#6005FF",
                                    transition: "background-color 0.3s ease",
                                }}
                                onMouseEnter={(e) =>
                                (e.currentTarget.style.backgroundColor =
                                    "#4B00CC")
                                }
                                onMouseLeave={(e) =>
                                (e.currentTarget.style.backgroundColor =
                                    "#6005FF")
                                }
                                onClick={handleSubmit}
                            >
                                {__('Submit Email', "header-footer-elementor")}
                            </Button>
                        </div>
                    </Dialog.Header>
                </Dialog.Panel>
            </Dialog>
        </div>
    )
}

export default OnboardingBuild;