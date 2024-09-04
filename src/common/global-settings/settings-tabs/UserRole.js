import React from 'react';
import { __, sprintf } from '@wordpress/i18n';
import SettingTable from '../SettingTable';
import { DocField } from '@Fields';

function UserRole( props ) {
	const { roles } = props;

	return (
		<div className="wcf-user-role--container mx-auto max-w-7xl">
			<div className="wcf-user-role-wrapper flow-root">
				<div className="inline-block min-w-full align-middle">
					<div className="shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
						<table className="wcf-user-role-table min-w-full divide-y divide-gray-300">
							<thead className="bg-gray-50">
								<tr>
									<th
										scope="col"
										className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
									>
										{ __( 'Role', 'cartflows' ) }
									</th>
									<th
										scope="col"
										className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
									>
										{ __( 'Access', 'cartflows' ) }
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-200 bg-white">
								{ Object.keys( roles ).map( ( user, index ) => {
									return (
										<tr key={ index }>
											<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
												{ roles[ user ].role_name }
											</td>
											<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
												<SettingTable
													settings={ roles[ user ] }
													key={ index }
												/>
											</td>
										</tr>
									);
								} ) }
							</tbody>
						</table>
					</div>
				</div>
			</div>
			<DocField
				content={ sprintf(
					// translators: %1$s: link html start, %2$s: link html end
					__(
						'For more information about the user role management please %1$sClick here.%2$s',
						'cartflows'
					),
					'<a href="https://cartflows.com/docs/user-role-manager/" class="text-gray-600 hover:text-[#F06434]" target="_blank">',
					'</a>'
				) }
			/>
		</div>
	);
}

export default UserRole;
