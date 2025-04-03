import React, { useEffect, useState } from 'react';
import { Container, Button, Switch, Title, Dialog, Input } from '@bsf/force-ui';
import { X, Check, Plus, ArrowRight, Package } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from "../../router/index"
import { __ } from "@wordpress/i18n";
import { routes } from "../../admin/settings/routes";

const OnboardingBuild = ({ setCurrentStep }) => {
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
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
                    hfe_analytics_optin: newIsActive ? 'yes' : 'no',
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
        </div>
    )
}

export default OnboardingBuild;