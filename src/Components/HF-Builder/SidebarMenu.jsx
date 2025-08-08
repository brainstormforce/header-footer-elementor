import React, { useState, useEffect } from "react";
import { CircleHelp, ArrowRight } from "lucide-react";
import { Button } from "@bsf/force-ui";

const SidebarMenu = ({ items, onSelectItem, selectedItemId }) => {
	const [internalSelectedItemId, setInternalSelectedItemId] = useState(selectedItemId); // Initialize with prop

	// Sync internal state with prop changes
	useEffect(() => {
		setInternalSelectedItemId(selectedItemId);
	}, [selectedItemId]);

	const handleSelectItem = (item) => {
		setInternalSelectedItemId(item.id); // Update internal selected item
		onSelectItem(item); // Trigger onSelectItem callback
	};

	return (
		<div style={{ 
			padding: "1rem", 
			width: "100%", 
			height: "83vh", 
			display: "flex", 
			flexDirection: "column",
			position: "relative"
		}}>
			{/* Scrollable content area */}
			<div style={{ flex: "1", overflowY: "auto" }}>
				{/* Loop through items to render main title, icon, and title */}
				{items.map((item) => (
					<div key={item.id} className="">
						{/* Main Title for each section */}
						{item.main && (
							<p className="text-sm text-text-tertiary font-normal mb-2">
								{item.main}
							</p>
						)}

						{/* Each item with icon and title */}
						<div
							className={`h-10 flex items-center justify-start gap-2 px-2 rounded-md cursor-pointer ${
								internalSelectedItemId === item.id
									? "bg-gray-100"
									: "bg-background-primary"
							}`}
							style={{
								backgroundColor:
									internalSelectedItemId === item.id ? "#F9FAFB" : "", // Apply background color when selected
							}}
							onClick={() => handleSelectItem(item)}
						>
							<span>
								{internalSelectedItemId === item.id
									? item.selected
									: item.icon}
							</span>
							<p className="m-0 text-base font-normal">
								{item.title}
							</p>
						</div>
					</div>
				))}
				<hr
					className="w-full border-b-0 border-x-0 border-t border-solid border-t-border-subtle"
					style={{
						marginTop: "20px",
						marginBottom: "15px",
						borderColor: "#E5E7EB",
					}}
				/>
				<div 
					className="flex items-center ml-1 mb-4" 
					style={{ cursor: "pointer", gap: "8px" }}
					onClick={() => window.open('https://ultimateelementor.com/docs/', '_blank')}
				>
					<CircleHelp size={22} color="#6B7280" />
					<p className="text-base text-[%6B7280] font-normal">Help</p>
				</div>
			</div>

			{/* Want More? Promotional Card - Sticky to bottom */}
			<div
				className="rounded-lg"
				style={{ 
					border: '1px solid #E5E7EB',
					padding: '10px',
					backgroundColor: '#F5F3FF',
					marginTop: 'auto', // This pushes the card to the bottom
					flexShrink: 0 // Prevents the card from shrinking
				}}
			>
				<h3 className="text-base text-text-primary font-normal" style={{ margin: '0 0 6px 0' }}>
					Want More?
				</h3>
				<p className="text-xs text-[#64748B]" style={{ margin: '0 0 6px 0' }}>
					Unlock revenue boosting features when you upgrade to Pro
				</p>
				<Button
					icon={<ArrowRight size={16} />}
					iconPosition="right"
					variant="link"
					style={{
						color: "#5C2EDE",
						marginLeft: '-4px'
					}}
				>
					Upgrade Now
				</Button>
			</div>
		</div>
	);
};

export default SidebarMenu;
