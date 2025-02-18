import React, { useEffect, useState } from 'react';
import { Container, Button, Switch, Title, Dialog, Input } from '@bsf/force-ui';
import { X, Check, Plus, ArrowRight, Package } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from "../../router/index"
import { __ } from "@wordpress/i18n";
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
            window.location.href = hfeSettingsData.onboarding_success_url;
        } else {
            toast.error(__('Please enter a valid email address', 'header-footer-elementor'));
        }
    };

    const handleSwitchChange = () => {

        const newIsActive = !isActive;
        setIsActive(newIsActive);
        console.log(`Switch is now ${newIsActive ? 'active' : 'inactive'}`);

        try {
            const response = fetch(hfe_admin_data.ajax_url, {
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
        <div className="bg-background-primary border-[0.5px] border-subtle rounded-xl shadow-sm mb-6 p-8" style={{ width: '55%' }}>
            <div className="flex items-start">
                {/* Left Content */}
                <div className="flex flex-col items-start">
                    <h1 className="text-text-primary m-0 mb-2" style={{ fontSize: '1.6rem', lineHeight: '1.3em' }}>
                        {__("You're all set!🚀", "header-footer-elementor")}
                    </h1>
                    <span className="text-md font-medium text-text-tertiary m-0 mb-4 hfe-88-width" style={{ lineHeight: '1.6em' }}>
                        {__(
                            "Start creating amazing designs with UAE and take your website to the next level",
                            "header-footer-elementor"
                        )}
                    </span>
                    <span className="font-bold m-0 pt-2">
                        {__("Here's How To Get Started:", "header-footer-elementor")}
                    </span>

                    <ol className="list-decimal text-text-tertiary text-sm" style={{ marginLeft: '1.4em' }}>
                        <li>{__('Click on “Create New Page” button', 'header-footer-elementor')}</li>
                        <li>{__('Use the Elementor editor to customize your page/post according to your preferences', 'header-footer-elementor')}</li>
                        <li>{__('Use UAE widgets to design your pages.', 'header-footer-elementor')}</li>
                        <li>{__('Click “Publish” to make it live', 'header-footer-elementor')}</li>
                    </ol>
                </div>

                {/* Right Content - Image */}
                <div className="w-1/2" style={{ textAlign: 'end' }}>
                    <img
                        alt="Build"
                        className="w-full object-contain"
                        style={{ height: 'auto', width: '95%' }}
                        src={`${hfeSettingsData.build_banner}`}
                    />
                </div>
            </div>
            <div className='flex flex-row gap-1 pt-2'>
                <Button
                    icon={<ArrowRight/>}
                    iconPosition="right"
                    variant="primary"
                    className="bg-[#6005FF] hfe-remove-ring"
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

                <Link
                    to={routes.dashboard.path}

                >
                    <Button
                        icon={<ArrowRight/>}
                        iconPosition="right"
                        variant="ghost"
                        className="hfe-remove-ring"
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.color =
                                "#000000") &&
                            (e.currentTarget.style.borderColor =
                                "#000000")
                        }
                        onMouseEnter={(e) =>
                            (e.currentTarget.style.color =
                                "#6005FF") &&
                            (e.currentTarget.style.borderColor =
                                "#6005FF")
                        }
                    >
                        {__("Go To Dashboard", "header-footer-elementor")}
                    </Button>
                </Link>

            </div>
            <div
                className="flex items-start justify-start"
                style={{
                    marginTop: '25px',
                    backgroundImage: `url(${hfeSettingsData.special_reward})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    // width: '95%', // Adjust width as needed
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

            <div className="bg-badge-background-gray border-[0.5px] border-subtle rounded-xl p-2">
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
                            <div className="flex items-center justify-center">
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

                        <p className="text-md font-bold text-field-label m-0 gap-0" style={{ fontSize: '14px' }}>
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
                                className="bg-[#6005FF] hfe-remove-ring"
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
                            <Toaster />
                        </div>
                    </Dialog.Header>
                </Dialog.Panel>
            </Dialog>
        </div>
    )
}

export default OnboardingBuild;