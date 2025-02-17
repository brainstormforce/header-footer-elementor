import React from 'react'
import { Container, Button } from '@bsf/force-ui';
import { Link } from "../../router/index"
import { __ } from "@wordpress/i18n";
import { routes } from "../../admin/settings/routes";
import { MoveRight } from 'lucide-react';

const Success = ({ setCurrentStep }) => {
    return (
        <div className="bg-background-primary border-[0.5px] border-subtle rounded-xl shadow-sm" style={{ height: '600px', width: '45%', position: 'absolute', left: '30%', top: '80%' }}>
            <div className="bg-background-primary items-start justify-center p-8 flex flex-col">
                <div style={{
                    backgroundImage: `url(${hfeSettingsData.success_banner})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    width: '100%', // Adjust width as needed
                    height: '150px' // Adjust height as needed
                }} >
                    <div className='flex justify-center items-center'>
                        <img
                            alt="Success"
                            className="flex"
                            src={`${hfeSettingsData.success_badge}`}
                        />
                    </div>

                    <div className="flex flex-col items-center justify-center gap-1">
                        <p className="text-4xl font-bold text-text-primary m-0 mt-2" style={{ fontSize: '25px' }}>
                            {__(
                                "Congratulations!",
                                "header-footer-elementor"
                            )}
                        </p>
                        <p className="text-md font-medium text-text-tertiary m-0" style={{ fontSize: '16px' }}>
                            {__(
                                "You’ve unlocked a 20% discount on UAE Pro. We’ve sent a discount",
                                "header-footer-elementor"
                            )}
                        </p>
                        <p className="text-md font-medium text-text-tertiary m-0" style={{ fontSize: '16px' }}>
                            {__(
                                "coupon just for you to your email address.",
                                "header-footer-elementor"
                            )}
                        </p>
                        <p className="text-md font-medium italic text-text-primary m-0 mt-2" style={{ fontSize: '14px' }}>
                            {__(
                                "* Use your exclusive discount code within the next 2 hours to claim your reward!”",
                                "header-footer-elementor"
                            )}
                        </p>
                    </div>

                    <hr className="w-full border-b-0 border-x-0 border-t  border-solid border-t-border-subtle" style={{ marginTop: '34px' }} />

                    <div className='flex flex-col items-center' style={{ paddingTop: '25px' }}>
                        <Button
                            icon={<MoveRight />}
                            iconPosition="right"
                            variant="primary"
                            className="bg-[#6005FF] uael-remove-ring w-full"
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
                            onClick={() => setCurrentStep(2)}
                        >
                            {__("Get Pro", "header-footer-elementor")}
                        </Button>


                        <Link
                            to={routes.dashboard.path}

                        >
                            <Button
                                iconPosition="left"
                                variant="link"
                                style={{ paddingTop: '40px' }}
                                className="uael-remove-ring text-text-primary"
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

                            >
                                {__("Go the the Dashboard", "header-footer-elementor")}
                            </Button>
                        </Link>


                    </div>

                </div>
            </div>
        </div>
    )
}

export default Success
