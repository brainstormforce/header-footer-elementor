export default function SlideOverSkeleton() {
	return (
		<div className="wcf-slide-out-panel--loader-wrapper animate-pulse">
			<div className="wcf-slide-out-panel--header flex items-center px-6 py-5">
				<div className="wcf-slide-out-panel--step-title w-full">
					<span className="h-4 w-2/4 bg-gray-200 rounded-md block"></span>
				</div>
				<div className="wcf-slide-out-panel--submit-button w-full flex justify-end">
					<span className="h-10 w-40 bg-gray-200 rounded-md block"></span>
				</div>
			</div>
			<div className="wcf-slide-out-panel--body px-6 py-5 w-full bg-white overflow-hidden">
				<div className="wcf-slide-out-panel--tabs flex gap-4 mb-4">
					<span className="w-20 h-3 bg-gray-200 rounded-md"></span>
					<span className="w-20 h-3 bg-gray-200 rounded-md"></span>
					<span className="w-20 h-3 bg-gray-200 rounded-md"></span>
					<span className="w-20 h-3 bg-gray-200 rounded-md"></span>
				</div>

				<div className="w-full border-b border-gray-200 mb-4"></div>

				<div className="wcf-accordion-loader mb-3.5">
					<span className="block h-4 w-28 bg-gray-200 rounded-md mb-4"></span>
					<span className="block h-4 bg-gray-200 rounded-md mb-4 w-10/12"></span>
					<span className="block h-4 bg-gray-200 rounded-md mb-4 w-8/12"></span>
					<span className="block h-4 bg-gray-200 rounded-md w-1/2 mb-4"></span>
				</div>

				<div className="w-full border-b border-gray-200 mb-4"></div>

				<div className="wcf-accordion-loader mb-3.5">
					<span className="block h-4 w-28 bg-gray-200 rounded-md mb-4"></span>
					<span className="block h-4 bg-gray-200 rounded-md mb-4 w-10/12"></span>
					<span className="block h-4 bg-gray-200 rounded-md mb-4 w-8/12"></span>
					<span className="block h-4 bg-gray-200 rounded-md w-1/2 mb-4"></span>
				</div>

				<div className="w-full border-b border-gray-200 mb-4"></div>

				<div className="wcf-accordion-loader mb-3.5">
					<span className="block h-4 w-28 bg-gray-200 rounded-md mb-4"></span>
					<span className="block h-4 bg-gray-200 rounded-md mb-4 w-10/12"></span>
					<span className="block h-4 bg-gray-200 rounded-md mb-4 w-8/12"></span>
					<span className="block h-4 bg-gray-200 rounded-md w-1/2 mb-4"></span>
				</div>

				<div className="w-full border-b border-gray-200 mb-4"></div>

				<div className="wcf-accordion-loader mb-3.5">
					<span className="block h-4 w-28 bg-gray-200 rounded-md mb-4"></span>
					<span className="block h-4 bg-gray-200 rounded-md mb-4 w-10/12"></span>
					<span className="block h-4 bg-gray-200 rounded-md mb-4 w-8/12"></span>
					<span className="block h-4 bg-gray-200 rounded-md w-1/2 mb-4"></span>
				</div>

				<div className="w-full border-b border-gray-200 mb-4"></div>
			</div>
		</div>
	);
}
