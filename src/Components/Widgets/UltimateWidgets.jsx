import React from "react";
import { Container, Title, Button } from "@bsf/force-ui";
import { Zap, Check } from "lucide-react";
import { Link } from "../../router/index";
import { routes } from "../../admin/settings/routes";
import { __ } from "@wordpress/i18n";

const UltimateWidgets = () => {

    const featureData = [
        {
            id: 1,
            icon: "",
            title: "Modal Popup",
        },
        {
            id: 2,
            icon: "",
            title: "Advanced Heading",
        },
        {
            id: 1,
            icon: "",
            title: "Post Layouts",
        },
        {
            id: 1,
            icon: "",
            title: "Info Box",
        },
        {
            id: 1,
            icon: "",
            title: "Pricing Cards",
        },
        {
            id: 1,
            icon: "",
            title: "Form Stylers and more...",
        },
    ];

    return (

        <div className="py-4">
            <Container
                className="bg-background-primary gap-1 p-4 border-[0.5px] border-subtle rounded-xl shadow-sm"
                containerType="flex"
                direction="column"
                justify="between"
                gap="xs"
            >

                <Container.Item className="flex flex-col justify-center items-center">
                    <img
                        src={`${hfeSettingsData.column_url}`}
                        alt="Column Showcase"
                        className="h-auto rounded w-1/2"
                    />
                </Container.Item>

                <Container.Item className="flex flex-col justify-between">
                    <div>
                        <Title
                            description=""
                            icon={<Zap />}
                            iconPosition="left"
                            size="xs"
                            tag="h6"
                            title="Unlock Ultimate Features"
                            className="text-xs font-semibold text-brand-primary-600"
                        />
                        <Title
                            description=""
                            icon={""}
                            iconPosition="left"
                            tag="h6"
                            title="Create Ultimate Designs with Addons Pro!"
                            className="py-1 text-sm"
                        />
                        <p className="text-md m-0 text-text-secondary">
                            Get access to advanced widgets and features to
                            create the website that stands out!
                        </p>
                    </div>
                    <div className="grid grid-cols-2 grid-flow-row gap-1 my-4">
                        {featureData.map((feature) => (
                            <Title
                                key={feature.id}
                                description=""
                                icon={
                                    <Check className="text-brand-primary-600 mr-1 h-3 w-3" />
                                }
                                iconPosition="left"
                                size="xxs"
                                tag="h6"
                                title={feature.title}
                                className="text-md m-0 text-text-secondary hfe-compare-section"
                            />
                        ))}
                    </div>
                    <div className="flex items-center pb-3 gap-4">
                        <Button
                            iconPosition="right"
                            variant="secondary"
                            className="hfe-remove-ring"
                            onClick={() => {
								window.open(
									"https://ultimateelementor.com/pricing/?utm_source=uae-lite-FreevsPro&utm_medium=unlock-ultimate-feature&utm_campaign=uae-lite-upgrade",
									"_blank"
								);
							}}
                        >
                            Upgrade Now
                        </Button>
                        <Link className="text-black cursor-pointer" to={routes.upgrade.path}>
                            {__(
                                "Compare Free vs Pro",
                                "header-footer-elementor"
                            )}
                        </Link>
                    </div>
                </Container.Item>
            </Container>
        </div>
    )
}

export default UltimateWidgets
