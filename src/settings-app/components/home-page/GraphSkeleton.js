import React from 'react';

function GraphSkeleton() {
	return (
		<div className="wcf-analytics--tabs-wrapper border border-gray-200 rounded-lg min-h-fit h-full">
			<div className="animate-pulse">
				<div className="flex justify-center items-baseline p-6 gap-5">
					<div className="p-5 h-24 bg-gray-200 rounded"></div>
					<div className="p-5 h-36 bg-gray-200 rounded"></div>
					<div className="p-5 h-48 bg-gray-200 rounded"></div>
					<div className="p-5 h-64 bg-gray-300 rounded"></div>
					<div className="p-5 h-72 bg-gray-200 rounded"></div>
					<div className="p-5 h-64 bg-gray-300 rounded"></div>
					<div className="p-5 h-48 bg-gray-200 rounded"></div>
					<div className="p-5 h-36 bg-gray-200 rounded"></div>
					<div className="p-5 h-72 bg-gray-300 rounded"></div>
					<div className="p-5 h-36 bg-gray-200 rounded"></div>
					<div className="p-5 h-48 bg-gray-200 rounded"></div>
					<div className="p-5 h-64 bg-gray-300 rounded"></div>
					<div className="p-5 h-72 bg-gray-200 rounded"></div>
					<div className="p-5 h-64 bg-gray-300 rounded"></div>
					<div className="p-5 h-48 bg-gray-200 rounded"></div>
					<div className="p-5 h-36 bg-gray-200 rounded"></div>
					<div className="p-5 h-24 bg-gray-200 rounded"></div>
				</div>
			</div>
		</div>
	);
}

export default GraphSkeleton;
