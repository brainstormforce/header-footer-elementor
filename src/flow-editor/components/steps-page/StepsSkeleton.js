import React from 'react';

function StepsSkeleton() {
	return (
		<div className="w-11/12">
			{ Array( 3 )
				.fill()
				.map( ( i, index ) => {
					return (
						<div
							key={ index }
							className="wcf-step-wrap animate-pulse bg-white border shadow-sm rounded-lg mb-4 p-4 flex items-center gap-2"
						>
							<div className="wcf-steps--sortable-toggle flex cursor-move text-gray-400">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="currentColor"
									aria-hidden="true"
									className="w-5 h-5 stroke-1"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
									></path>
								</svg>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									strokeWidth="1.5"
									stroke="currentColor"
									aria-hidden="true"
									className="w-5 h-5 stroke-1 -ml-3.5"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
									></path>
								</svg>
							</div>
							<div className="wcf-step flex justify-between items-center w-full wcf-step__no-product">
								<div className="wcf-step--content flex items-center gap-4 w-[55%]">
									<div className="image bg-gray-200 p-11 rounded-md"></div>
									<div className="wcf-steps--title-wrap flex flex-col gap-4 w-full">
										<div className="wcf-step__col-tags flex items-center gap-2">
											<span className="h-3 w-full bg-gray-200 rounded-md px-10 block mr-2"></span>
											<span className="h-3 w-full bg-gray-200 rounded-md px-10 block"></span>
										</div>
										<div className="wcf-step__title">
											<span className="h-3 w-4/5 bg-gray-200 rounded-md px-10 block mr-2"></span>
										</div>
									</div>
								</div>

								<div className="wcf-step--stats-content flex text-center justify-between items-center w-1/4 ">
									<div className="wcf-step--stats-content__stat">
										<div className="h-3 w-full bg-gray-200 rounded-md px-10 block"></div>
										<div className="h-3 w-8 bg-gray-200 rounded-md px-4 block mx-auto mt-2"></div>
									</div>
									<div className="wcf-step--stats-content__stat">
										<div className="h-3 w-full bg-gray-200 rounded-md px-10 block"></div>
										<div className="h-3 w-8 bg-gray-200 rounded-md px-4 block mx-auto mt-2"></div>
									</div>
									<div className="wcf-step--stats-content__stat">
										<div className="h-3 w-full bg-gray-200 rounded-md px-10 block"></div>
										<div className="h-3 w-8 bg-gray-200 rounded-md px-4 block mx-auto mt-2"></div>
									</div>
								</div>

								<div className="wcf-step--actions-col">
									<div className="wcf-step--actions">
										<div className="wcf-step--action-btns flex items-center">
											<div className="wcf-step--action__basic-btns flex items-center gap-3">
												<span className="wcf-step__action-btn h-3 w-full bg-gray-200 rounded-md p-3 block"></span>
												<span className="wcf-step__action-btn h-3 w-full bg-gray-200 rounded-md p-3 block"></span>
												<span className="wcf-step__action-btn h-3 w-full bg-gray-200 rounded-md p-3 block"></span>
												<span className="wcf-step__action-btn h-3 w-full bg-gray-200 rounded-md p-3 block"></span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					);
				} ) }
		</div>
	);
}

export default StepsSkeleton;
