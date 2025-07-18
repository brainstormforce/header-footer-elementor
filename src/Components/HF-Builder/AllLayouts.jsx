import React from "react";
import { Plus } from "lucide-react";
import { Button } from "@bsf/force-ui"; 
import { __ } from "@wordpress/i18n";

const layoutItems = [
  { name: "Header" },
  { name: "Footer" },
  { name: "Before Footer" },
  { name: "Custom Block" },
];

const AllLayouts = () => {
  return (
    <div className=" bg-muted min-h-screen">
      <div className="flex items-start gap-10 justify-between mb-6">
        <h2 className="text-base font-normal text-foreground">
          Start customising Your Header & Footer
        </h2>
        	<Button
							iconPosition="left"
              icon={<Plus/>}
							variant="primary"
							className="bg-[#6005FF] font-light flex items-center justify-center hfe-remove-ring"
							style={{
								backgroundColor: "#6005FF",
								transition: "background-color 0.3s ease",
								outline: 'none'
							}}
							onMouseEnter={(e) =>
								(e.currentTarget.style.backgroundColor = "#4B00CC")
							}
							onMouseLeave={(e) =>
								(e.currentTarget.style.backgroundColor = "#6005FF")
							}
							onClick={() => {
								window.open(
									"",
									"_blank"
								);
							}}
						>
							{__("Create Layout", "header-footer-elementor")}
						</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {layoutItems.map((item) => (
          <div
            key={item.name}
            className="bg-white rounded-lg shadow-sm border p-4 flex flex-col"
          >
            <div className="bg-muted h-48 rounded-md mb-4 flex items-center justify-center">
              <div className="w-full h-full bg-gray-200 rounded"></div>
            </div>
            <p className="text-sm text-foreground font-medium px-1">{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllLayouts;
