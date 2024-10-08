import React from 'react'
import { Container, Title, Button } from "@bsf/force-ui";
import { Zap, Plus } from "lucide-react";
const UltimateFeatures = () => {
  return (
    <div>
                <Container
                align="center"
                className="bg-background-primary p-4 m-2 border-[0.5px] border-subtle rounded-xl shadow-sm w-fit"
                containerType="flex"
                direction="row"
                gap="lg"
                style={{
                    height: "300px",
                }}
            >
                <Container.Item className="w-[500px]">
                    <Title
                        description=""
                        icon={<Zap/>}
                        iconPosition="left"
                        size="lg"
                        tag="h6"
                        title="Unlock Ultimate Features"
                    />
                    <Title
                        description="Get access to advanced widgets and features to create the website that stands out!"
                        icon={''}
                        iconPosition="left"
                        size="sm"
                        tag="h6"
                        title="Create Ultimate Designs with Addons Pro!"
                    />
                    <div className="flex items-center gap-4">
                        <Button
                            icon={<Plus />}
                            iconPosition="right"
                            variant="secondary"
                            className=""
                        >
                            Upgrade Now
                        </Button>
                        <Button
                            icon={""}
                            iconPosition="right"
                            variant="ghost"
                        >
                            Compare Free vs Pro
                        </Button>
                    </div>
                </Container.Item>
            </Container>
    </div>
  )
}
export default UltimateFeatures
