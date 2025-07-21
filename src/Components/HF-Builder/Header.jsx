import React from "react";
import { __ } from "@wordpress/i18n";

const Header = () => {
	return (
		<div className="rounded-xl w-40 border border-gray-200 shadow-sm p-6 bg-white">
			{/* Header preview area */}
			<div className="rounded-lg overflow-hidden border border-gray-200 bg-gray-50">
				{/* Top navigation bar */}
				<div className="bg-gray-100 h-14 flex items-center justify-between px-6">
					{/* Logo area */}
					<div className="flex items-center space-x-4">
						<div className="w-20 h-8 bg-gray-300 rounded" />
					</div>

					{/* Navigation menu */}
					<div className="flex items-center space-x-6">
						<div className="w-12 h-4 bg-gray-300 rounded" />
						<div className="w-12 h-4 bg-gray-300 rounded" />
						<div className="w-12 h-4 bg-gray-300 rounded" />
						<div className="w-12 h-4 bg-gray-300 rounded" />
					</div>

					{/* Right side elements */}
					<div className="flex items-center space-x-3">
						<div className="w-16 h-4 bg-gray-300 rounded" />
					</div>
				</div>

				{/* Main content area */}
				<div className="bg-gray-50 h-80 w-40 relative">
					{/* Optional: Add some subtle content indicators */}
					<div className="absolute inset-0 flex items-center justify-center">
						<img
							src={`${hfeSettingsData.header_card}`}
							alt={__("Custom SVG", "header-footer-elementor")}
							className="object-contain"
						/>
					</div>
				</div>
			</div>

			{/* Label below */}
			<div className="pt-4">
				<p className="text-base font-semibold text-gray-900">Header</p>
			</div>
		</div>
	);
};

export default Header;
