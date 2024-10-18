import React from "react";
import { Container, Title, Button } from "@bsf/force-ui";
import { Zap, Plus, Check } from "lucide-react";

const ExploreTemplates = () => {

    const templateData = [
		{
			id: 1,
			icon: "",
			title: "250+ templates for evrry niche",
		},
		{
			id: 2,
			icon: "",
			title: "Modern, timeless designs",
		},
		{
			id: 3,
			icon: "",
			title: "Full design flexibility for easy customization",
		},
		{
			id: 4,
			icon: "",
			title: "100% responsive across all devices",
		}
	];

  return (
    <div>
			<Container
				className="bg-background-primary p-4 border-[0.5px] border-subtle rounded-xl shadow-sm"
				containerType="flex"
				direction="row"
				gap="xs"
			>
				<Container.Item className="flex flex-col justify-between" style={{width:"40%"}}>
					<div>
						<Title
							description=""
							icon={<Zap />}
							iconPosition="left"
							size="xs"
							tag="h6"
							title="Design Your Website in Minutes"
							className="text-xs font-semibold text-brand-primary-600"
						/>
						<Title
							description=""
							icon={""}
							iconPosition="left"
							tag="h6"
							title="Build your website faster using our prebuilt templates"
							className="py-1 text-sm"
						/>
						<p className="text-md m-0 text-text-secondary">
                        Stop building your site from scratch. Use our professional templates for your stunning website.
                        It’s easy to customize and completely responsive. Explore hundreds of designs and bring your vision to life in no time.
						</p>
					</div>
					<div className="grid grid-cols-1 grid-flow-row gap-1 my-4">
						{templateData.map((template) => (
							<Title
							key={template.id}
								description=""
								icon={
									<Check className="text-brand-primary-600 mr-1 h-3 w-3" />
								}
								iconPosition="left"
								size="xs"
								tag="h6"
								title={template.title}
								className=""
							/>
						))}
					</div>
					<div className="flex items-center pb-3 gap-4">
						<Button
							icon={<Plus />}
							iconPosition="right"
							variant="secondary"
                            style={{backgroundColor:"#6005FF"}}
							className=""
						>
							Explore Templates
						</Button>
						<Button icon={""} iconPosition="right" variant="ghost">
							Learn More
						</Button>
					</div>
				</Container.Item>
				<Container.Item className="">
					<img
						src={`${hfeSettingsData.template_url}`}
						alt="Column Showcase"
						className="object-contain"
						style={{
							width: "90%",
							height: "auto",
						}}
					/>
				</Container.Item>
			</Container>
		</div>
  )
}

export default ExploreTemplates
