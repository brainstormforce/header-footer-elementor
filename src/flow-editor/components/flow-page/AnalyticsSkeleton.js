import React from 'react';

import './AnalyticsSkeleton.scss';

function AnalyticsSkeleton() {
	return (
		<div className="wcf-flow-analytics--loader my-6 mx-0">
			<div className="gap-5 sm:grid-cols-3 flex w-full">
				{ Array( 4 )
					.fill()
					.map( ( i, index ) => (
						<div
							key={ index }
							className="wcf-analytics--stats-tab animate-pulse gap-3 flex justify-between items-center overflow-hidden bg-white border border-primary-100 rounded-lg px-4 py-5 shadow-none sm:p-6 w-1/4"
						>
							<div className="wcf-analytics--tabs-stats-text w-full">
								<dt className="text-sm font-normal text-gray-600">
									<span className="h-3 w-4/5 bg-gray-200 rounded-md px-10 block"></span>
									<span className="h-3 w-3/6 bg-gray-200 rounded-md px-10 block mt-2"></span>
								</dt>
								<dd className="wcf-analytics--stats-count mt-2 h-3 bg-gray-200 rounded-md px-10 block w-1/5"></dd>
							</div>
							<div className="wcf-analytics--tabs-stats-icon">
								<div className="rounded-full bg-slate-200 p-7"></div>
							</div>
						</div>
					) ) }
			</div>
		</div>
	);
}
export default AnalyticsSkeleton;
