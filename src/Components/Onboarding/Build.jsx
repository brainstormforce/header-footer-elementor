import React from 'react';
import { Container, Button, Switch, Title } from '@bsf/force-ui';
import { X, Check, Plus, MoveRight } from 'lucide-react';
import { __ } from "@wordpress/i18n";

const OnboardingBuild = ({ setCurrentStep }) => {
    return (
        <div className="bg-background-primary border-[0.5px] border-subtle ml-10 rounded-xl shadow-sm mb-6 p-8" style={{ width: '900px' }}>
            <div className="flex items-center justify-between w-full">
                {/* Left Content */}
                <div className="flex flex-col items-start w-1/2">
                    <p className="font-bold text-text-primary m-0 mt-2" style={{ fontSize: '30px'}}>
                        {__("You’re all set! 🚀", "uael")}
                    </p>
                    <p className="font-medium text-text-tertiary m-0 mt-2 text-base w-[350px]">
                        {__(
                            "Start creating headers, footers, or pages with UAE and take your website to the next level",
                            "uael"
                        )}
                    </p>
                    <p className="font-bold text-text-primary m-0 mt-2 text-base">
                        {__("Here’s What UAE Will Do for You Now:", "uael")}
                    </p>
                    <ul className="list-none pl-0 space-y-2">
                        <li className="flex items-start gap-x-2 text-field-label text-sm font-medium">
                            <Check className="size-4 text-[#6005ff]" />
                            <span className="text-text-primary w-[340px]">
                                Design the headers and footers, UAE will automatically place it in your desired location.
                            </span>
                        </li>
                        <li className="flex items-start gap-x-2 text-field-label text-sm font-medium">
                            <Check className="size-4 text-icon-primary" />
                            <span>Create before footer, custom blocks etc</span>
                        </li>
                        <li className="flex items-start gap-x-2 text-field-label text-sm font-medium">
                            <Check className="size-4 text-icon-primary" />
                            <span className="text-text-primary w-[330px]">
                                Work with any theme in your website, UAE can handle everything with ease.
                            </span>
                        </li>
                    </ul>
                </div>

                {/* Right Content - Image */}
                <div className="w-1/2 flex justify-center">
                    <img
                        alt="Build"
                        className="w-full max-w-[400px] object-contain"
                        src={`${hfeSettingsData.build_banner}`}
                    />
                </div>
            </div>

            <hr className="mt-6 w-full border-b-0 border-x-0 border-t border-solid border-t-border-subtle" />
            <div className='flex flex-row gap-2' style={{ marginTop: '40px' }}>
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
                    {__("Create Header/Footer", "uael")}
                </Button>

                <Button
                    icon={<MoveRight />}
                    iconPosition="right"
                    variant="ghost"
                    className="uael-remove-ring"
                    style={{
                        color: "#6005FF",
                        borderColor: "#6005FF",
                    }}
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
                    {__("Go to Dashboard", "uael")}
                </Button>
            </div>
            <div className="flex items-start justify-start" style={{ marginTop: '40px' }}>
                <img
                    alt="Build"
                    className=""
                    src={`${hfeSettingsData.special_reward}`}
                />
            </div>
            <hr className="w-full border-b-0 border-x-0 border-t  border-solid border-t-border-subtle" style={{ marginTop: '44px', marginBottom: '44px' }} />

            <div className="bg-background-secondary border-[0.5px] border-subtle rounded-xl p-5 shadow-sm flex flex-col w-full space-y-1 space-x-2" style={{ width: '820px' }}>
                <div className='flex flex-row items-center justify-start px-1 gap-3'>
                    <Switch
                        onChange=""
                        size='md'
                        value=""
                        className=""
                    />
                    <Title size="xs" tag="h3" title={__('Help make UAE Better', 'uael')} />
                </div>
                <p className='text-base font-medium text-[#64748B]'>Help us improve by sharing anonymous data about your website setup. This includes non-sensitive info about plugins, themes, and settings, so we can create a better product for you. Your privacy is always our top priority. Learn more in our privacy policy.</p>
            </div>
        </div>
    )
}

export default OnboardingBuild;