import React from 'react';
import { __ } from '@wordpress/i18n';
import './FlowRowSkeleton.scss';

function FlowRowSkeleton() {
	return (
		<>
			<table className="min-w-full border-b border-gray-200 animate-pulse">
				<thead className="bg-gray-50">
					<tr>
						<th
							scope="col"
							className="w-16 py-3.5 pl-4 pr-3 text-left sm:pl-6"
						>
							<input
								type="checkbox"
								className="wcf-select-all__flows !h-5 !w-5 !rounded !border-gray-300 !text-primary-600 focus:!ring-primary-600 !shadow-none before:!content-none !outline-none"
							/>
						</th>
						<th
							scope="col"
							className="px-3 py-3.5 text-left text-base font-medium text-gray-800"
						>
							{ __( 'Name', 'cartflows' ) }
						</th>
						<th
							scope="col"
							className="px-3 py-3.5 text-center text-base font-medium text-gray-800"
						>
							{ __( 'Status', 'cartflows' ) }
						</th>
						<th
							scope="col"
							className="px-3 py-3.5 text-center text-base font-medium text-gray-800"
						>
							{ __( 'Sales', 'cartflows' ) }
						</th>
						<th
							scope="col"
							className="w-36 px-3 py-3.5 pr-4 sm:pr-6 text-left text-base font-medium text-gray-800"
						>
							{ ' ' }
						</th>
					</tr>
				</thead>
				<tbody className="divide-y divide-gray-200 bg-white">
					{ Array( 9 )
						.fill()
						.map( ( i, index ) => (
							<tr key={ index }>
								<td className="whitespace-nowrap py-7 pl-4 pr-3 sm:pl-6 text-center">
									<div className="h-5 w-5 bg-gray-200 rounded-md"></div>
								</td>
								<td className="whitespace-nowrap px-3 py-7">
									<div className="h-5 w-full bg-gray-200 rounded-md"></div>
								</td>
								<td className="whitespace-nowrap px-3 py-7">
									<div className="h-5 w-4/6 bg-gray-200 rounded-md mx-auto"></div>
								</td>
								<td className="whitespace-nowrap px-3 py-7">
									<div className="h-5 w-3/6 bg-gray-200 rounded-md mx-auto"></div>
								</td>
								<td className="whitespace-nowrap px-3 py-7 pr-4 sm:pr-6">
									<div className="h-5 w-full bg-gray-200 rounded-md mx-auto"></div>
								</td>
							</tr>
						) ) }
				</tbody>
			</table>
		</>
	);
}

export default FlowRowSkeleton;
