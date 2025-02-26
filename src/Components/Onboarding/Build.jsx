import React, { useEffect, useState } from 'react';
import { Container, Button, Switch, Title, Dialog, Input } from '@bsf/force-ui';
import { X, Check, LoaderCircle, ArrowRight, Package } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from "../../router/index"
import { __ } from "@wordpress/i18n";
import { routes } from "../../admin/settings/routes";

const OnboardingBuild = ({ setCurrentStep }) => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isActive, setIsActive] = useState(true);
    const [errors, setErrors] = useState('');
    const [loading, setLoading] = useState(false); 

    useEffect(() => {
        setEmail(hfeSettingsData.user_email);
        setIsActive(hfeSettingsData.analytics_status === 'yes');

        history.pushState(null, "", window.location.href);

        const handleBackButton = (event) => {
            event.preventDefault();
            localStorage.setItem('currentStep', '2');
            window.location.reload();
        };
    
        window.addEventListener('popstate', handleBackButton);
    
        return () => {
            window.removeEventListener('popstate', handleBackButton);
        };

    }, [hfeSettingsData.user_email]);

    const handleSubmit = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if ( ! emailRegex.test(email) ) {
            setErrors(__('Please enter a valid email address', 'header-footer-elementor'));
            return;
        }
        setLoading(true);
        callValidatedEmailWebhook(email);
        pollForValidationStatus(email);
    };

    const pollForValidationStatus = (email) => {
        let attempts = 0;
        const maxAttempts = 10; // Poll up to 10 times (~50 sec).
    
        const checkStatus = () => {
            fetch(`/wp-json/hfe/v1/email-validation/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-WP-Nonce': hfeSettingsData.hfe_nonce_action, // Use the correct nonce.
                },
                body: JSON.stringify({ email }),
            })
                .then((response) => response.json())
                .then((data) => {
                    if ( data.status === 'valid' ) {
                        setLoading(false);
                        setIsSubmitted(true);
                        window.location.href = hfeSettingsData.onboarding_success_url;
                    } else if ( data.status === 'invalid') {
                        setLoading(false);
                        setErrors(__('Entered email ID is invalid!', 'header-footer-elementor'));
                    } else if ( data.status === 'exists') {
                        setLoading(false);
                        setErrors(__('Entered email ID already exists, try a different one.', 'header-footer-elementor'));
                    } else if ( data.status === 'pending' && attempts < maxAttempts) {
                        attempts++;
                        setTimeout(checkStatus, 5000); // Try again after 5 sec.
                    } else {
                        setLoading(false);
                        setErrors(__('Something went wrong!', 'header-footer-elementor'));
                    }
                })
                .catch((error) => console.error('Error checking validation:', error));
        };

        checkStatus();
    };

    const handleSwitchChange = async () => {
        const newIsActive = !isActive;
        setIsActive(newIsActive);

        try {
            const response = await fetch(hfe_admin_data.ajax_url, {
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

            const result = await response.json();

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
        const today = new Date().toISOString().split('T')[0];

        const params = new URLSearchParams({
            email: email,
            date: today,
        });

        fetch(`/wp-json/hfe/v1/email-webhook/?${params.toString()}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-WP-Nonce': hfeSettingsData.hfe_nonce_action, // Use the correct nonce.
            },
        })
        .then((response) => response.json())
        .then(data => {
            console.log('Webhook call successful:', data);
        })
        .catch(error => {
            console.error('Error calling webhook:', error);
        });

    }

    return (
        <div className="bg-background-primary border-[0.5px] border-subtle rounded-xl shadow-sm mb-6 p-8" style={{ maxWidth: '55%' }}>
            <div className="flex items-start hfe-display-flex">
                {/* Left Content */}
                <div className="flex flex-col items-start" style={{ paddingRight: '35px' }}>
                    <h1 className="text-text-primary m-0 mb-2" style={{ fontSize: '1.6rem', lineHeight: '1.3em' }}>
                        {__("You're all set!🚀", "header-footer-elementor")}
                    </h1>
                    <span className="text-md font-medium text-text-tertiary m-0 mb-4 hfe-88-width" style={{ lineHeight: '1.6em' }}>
                        {__(
                            "Start creating headers, footers, or pages with UAE and take your website to the next level",
                            "header-footer-elementor"
                        )}
                    </span>
                    <span className="font-bold m-0 pt-2">
                        {__("Here’s how to get started:", "header-footer-elementor")}
                    </span>

                    <ol className="list-decimal text-text-tertiary text-sm" style={{ marginLeft: '1.4em', lineHeight: '1.6em', paddingBottom: '0.5rem' }}>
                        <li>{__('Click on “Create” button', 'header-footer-elementor')}</li>
                        <li>{__('Choose the type of template you want to create and customize the selected option', 'header-footer-elementor')}</li>
                        <li>{__('Use the Elementor editor to customize your template according to your preferences using UAE widgets', 'header-footer-elementor')}</li>
                        <li>{__('Click “Publish” to make it live', 'header-footer-elementor')}</li>
                    </ol>
                </div>

                {/* Right Content - Image */}
                <div className="w-1/2" style={{ textAlign: 'end' }}>
                    <img
                        alt="Build"
                        className="w-full object-contain"
                        style={{ height: '255px', width: 'auto' }}
                        src={`${hfeSettingsData.build_banner}`}
                        loading="lazy"
                    />
                </div>
            </div>
            <div className='flex flex-row gap-1 pb-4 hfe-display-flex'>
                <Button
                    icon={<ArrowRight />}
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
                            hfeSettingsData.hfe_post_url,
                            "_self"
                        );
                    }}
                >
                    {__("Create Header/Footer", "header-footer-elementor")}
                </Button>

                <Link
                    to={routes.dashboard.path}

                >
                    <Button
                        icon={<ArrowRight />}
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
                className="flex items-start justify-start mt-4"
                loading="lazy"
                style={{
                    backgroundImage: `url(${hfeSettingsData.special_reward})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    borderRadius: '5px'
                }}
            >
                <div className='flex flex-col p-6 items-start'>
                    <h3 className='font-bold text-text-primary mt-0 mb-1' style={{ lineHeight: '1.3em' }}>
                        {__("We have a special reward just for you!", "header-footer-elementor")}
                    </h3>
                    <span className='font-medium text-text-secondary mt-2 mb-6'>
                        {__("Unlock your surprise now", "header-footer-elementor")}
                    </span>

                    <Button
                        className="hfe-remove-ring hfe-span hfe-popup-button"
                        icon={<Package aria-label="icon" role="img" />}
                        iconPosition="right"
                        size="md"
                        tag="button"
                        type="button"
                        variant="link"
                        style={{ alignItems: 'center', justifyContent: 'flex-start', color: "#6005FF", }}
                        onClick={() => setIsDialogOpen(true)}
                    >
                        {__("Unlock My Surprise", "header-footer-elementor")}
                    </Button>
                </div>
            </div>
            <hr className="w-full border-b-0 border-x-0 border-t border-solid border-t-border-subtle" style={{ marginTop: '34px', marginBottom: '34px', borderColor: '#E5E7EB' }} />

            <div className="bg-badge-background-gray border-[0.5px] border-subtle p-6" style={{ borderRadius: '5px' }}>
                <div className='flex flex-row items-center justify-start px-1 gap-3'>
                    <Switch
                        onChange={handleSwitchChange}
                        size='sm'
                        value={isActive}
                        className="hfe-remove-ring"
                    />
                    <span className="font-bold text-text-primary m-0">
                        {__("Help make UAE Better", "header-footer-elementor")}
                    </span>
                </div>
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
                        duration: 1000,
                        style: {
                            background: 'white',
                        },
                        success: {
                            duration: 2000,
                            style: {
                                color: '',
                            },
                            iconTheme: {
                                primary: '#6005ff',
                                secondary: '#fff',
                            },
                        },
                    }}
                />
                <span className='flex flex-row items-center justify-start mt-4 gap-3' style={{ lineHeight: '1.5em', fontSize: '0.95em' }}>{__("Help us improve by sharing anonymous data about your website setup. This includes non-sensitive info about plugins, themes, and settings, so we can create a better product for you. Your privacy is always our top priority. Learn more in our privacy policy.", "header-footer-elementor")}</span>
            </div>


            <Dialog
                design="simple"
                open={isDialogOpen}
                setOpen={setIsDialogOpen}
            >
                <Dialog.Backdrop />
                <Dialog.Panel>
                    <Dialog.Header style={{ padding: '30px', marginBottom: '0.5rem' }}>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center justify-center">
                                <Dialog.Title style={{ fontSize: '1.6rem', width: '80%', lineHeight: '1.3em' }}>
                                    {__('We have a special Reward just for you! 🎁', 'header-footer-elementor')}
                                </Dialog.Title>
                                <Button
                                    icon={<X className="size-10" />}
                                    iconPosition="right"
                                    size="md"
                                    variant="ghost"
                                    className='hfe-remove-ring'
                                    onClick={() => setIsDialogOpen(false)}
                                    style={{ marginLeft: '60px', marginBottom: '20px', paddingTop: '0' }}
                                />
                            </div>
                        </div>
                        <Dialog.Description style={{ width: '90%', color: '#64748B' }}>
                            {__('Enter your email address to get special offer that we have for you and stay updated on UAE’s latest news and updates.', 'header-footer-elementor')}
                        </Dialog.Description>

                        <p className="text-md font-bold text-field-label m-0 gap-0" style={{ fontSize: '14px', marginTop: '1.5em' }}>
                            {__(
                                "Email Address",
                                "header-footer-elementor"
                            )}
                        </p>

                        <div className='flex flex-row'>
                            <input
                                type="email"
                                placeholder={`${hfeSettingsData.user_email}`}
                                value={email}
                                className='h-12 shrink-0 mr-2'
                                style={{ width: '265px' }}
                                onChange={(e) => {
                                    if (e && e.target) {
                                        setErrors('');
                                        setEmail(e.target.value);
                                    }
                                }}
                            />
                            <Button
                                icon={loading ? <LoaderCircle className="animate-spin" /> : null}
                                iconPosition="right"
                                variant="primary"
                                className="bg-[#6005FF] hfe-remove-ring w-full shrink-1"
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
                        {
                            errors && 
                            <p className="color-text-danger text-xs mt-4 text-sm font-normal" style={{ color: '#FF0000' }}>{errors}</p>
                        }
                    </Dialog.Header>
                </Dialog.Panel>
            </Dialog>
        </div>
    )
}

export default OnboardingBuild;