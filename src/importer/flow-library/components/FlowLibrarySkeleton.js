import React from 'react';

function FlowLibrarySkeleton() {
	const createBlocks = () => {
		const block = [];

		for ( let i = 0; i < 12; i++ ) {
			block.push(
				<div className="wcf-item">
					<div className="relative p-4 w-full bg-white overflow-hidden shadow hover:shadow-md rounded-lg">
						<div className="animate-pulse flex flex-col">
							<div className="rounded w-full h-52 bg-gray-200"></div>

							<div className="flex flex-col mt-5">
								<div className="w-full h-5 bg-gray-200 rounded"></div>
								<div className="mt-2 w-10/12 h-3 bg-gray-200 rounded"></div>
								<div className="mt-2 w-8/12 h-3 bg-gray-200 rounded"></div>
							</div>

							<div className="grid grid-cols-2 mt-5 gap-x-2 gap-y-1">
								<div className="mt-2 w-full h-3 bg-gray-200 rounded"></div>
								<div className="mt-2 w-full h-3 bg-gray-200 rounded"></div>
								<div className="mt-2 w-full h-3 bg-gray-200 rounded"></div>
								<div className="mt-2 w-full h-3 bg-gray-200 rounded"></div>
							</div>

							<div className="flex items-center mt-5">
								<div>
									<div className="rounded-full bg-gray-200 w-10 h-10"></div>
								</div>
								<div className="flex justify-between w-full ml-3">
									<div className="w-5/12 h-3 bg-gray-200 rounded"></div>
									<div className="w-2/12 h-3 bg-gray-200 rounded"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			);
		}
		return block;
	};

	return (
		<div className="wcf-flow-importer__list wcf-items-list grid grid-cols-4 gap-6 is-placeholder">
			{ createBlocks() }
		</div>
	);
}

export default FlowLibrarySkeleton;
