import React from 'react';
import { useSettingsStateValue } from '@SettingsApp/utils/StateProvider';
import './UserInfoBox.scss';
import { __ } from '@wordpress/i18n';
import ReactHtmlParser from 'react-html-parser';
import { Link } from 'react-router-dom';
import {
	ShoppingBagIcon,
	ArrowTopRightOnSquareIcon,
	ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

function RecentOrders() {
	const [ { analyticsData } ] = useSettingsStateValue();
	const recentOrders =
			analyticsData && analyticsData.recent_orders
				? analyticsData.recent_orders
				: [],
		wooStatus =
			'active' === cartflows_admin.woocommerce_status ? true : false;

	const getWooNotice = function () {
		return (
			<div className="text-center px-8 py-12">
				<div className="flex justify-center mb-3">
					<ExclamationTriangleIcon className="h-10 w-10 text-primary-500" />
				</div>
				<h3 className="mt-2 text-base font-medium text-gray-900">
					{ __( 'WooCommerce plugin is required.', 'cartflows' ) }
				</h3>
				<p className="mt-1 text-sm text-gray-500">
					{ __(
						'You need WooCommerce plugin installed and activated to view the recent orders',
						'cartflows'
					) }
				</p>
			</div>
		);
	};
	return (
		<div className="wcf-recent-orders bg-white overflow-hidden border border-solid border-gray-200 md:rounded-lg wcf-metabox">
			<div className="wcf-metabox--heading sm:flex sm:items-center flex justify-between">
				<div className="wcf-metabox--heading-wrapper p-6 sm:flex-auto border-b border-solid border-gray-200 flex justify-between">
					<h1 className="wcf-metabox--heading-text text-xl font-semibold text-gray-900">
						{ __( 'Recent Orders', 'cartflows' ) }
					</h1>
					{ recentOrders.length > 0 && (
						<a
							className="wcf-button wcf-secondary-button hover:text-primary-500 focus:text-primary-500"
							href={ cartflows_admin.woo_order_url }
							target="_blank"
							rel="noreferrer"
						>
							{ /* <EyeIcon className="h-18 w-18 text-primary-500" /> */ }
							{ __( 'View All', 'cartflows' ) }
						</a>
					) }
				</div>
			</div>
			{ ! wooStatus ? (
				getWooNotice()
			) : (
				<>
					{ recentOrders.length > 0 && (
						<div className="flex flex-col">
							<div className="overflow-x-auto">
								<div className="inline-block min-w-full align-middle">
									<div className="overflow-hidden">
										<table className="min-w-full divide-y divide-gray-300">
											<thead className="bg-gray-50">
												<tr>
													<th
														scope="col"
														className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
													>
														{ __(
															'Customer',
															'cartflows'
														) }
													</th>
													<th
														scope="col"
														className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
													>
														{ __(
															'Date',
															'cartflows'
														) }
													</th>
													<th
														scope="col"
														className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
													>
														{ __(
															'Status',
															'cartflows'
														) }
													</th>
													<th
														scope="col"
														className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
													>
														{ __(
															'Payment Method',
															'cartflows'
														) }
													</th>
													<th
														scope="col"
														className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
													>
														{ __(
															'Value',
															'cartflows'
														) }
													</th>
												</tr>
											</thead>
											<tbody className="divide-y divide-gray-200 bg-white">
												{ recentOrders.map(
													( order ) => {
														const order_key =
															order.order_id;
														let statusColor =
																'text-yellow-800',
															statusBgColor =
																'bg-yellow-100';

														switch (
															order.order_status
														) {
															case 'Processing':
															case 'Completed':
																statusColor =
																	'text-green-800';
																statusBgColor =
																	'bg-green-100';
																break;
															case 'Failed':
																statusColor =
																	'text-red-800';
																statusBgColor =
																	'bg-red-100';
																break;
															case 'Refunded':
																statusColor =
																	'text-gray-800';
																statusBgColor =
																	'bg-gray-100';
																break;
														}

														return (
															<tr
																key={
																	order_key
																}
																data-order_id={
																	'wcf_order_' +
																	order_key
																}
																className="group"
															>
																<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
																	<div className="">
																		<div className="font-medium text-gray-900 flex">
																			{
																				order.customer_name
																			}
																			<Link
																				key="wcf-quick-action-create-funnel"
																				to={ {
																					pathname:
																						'post.php',
																					search: `?post=${ order_key }&action=edit`,
																				} }
																				target={
																					'_blank'
																				}
																				className="recent_order_view_link ml-3"
																			>
																				<ArrowTopRightOnSquareIcon className="invisible group-hover:visible h-18 w-18 text-primary-500" />
																			</Link>
																		</div>
																		<div className="text-gray-500">
																			{
																				order.customer_email
																			}
																		</div>
																	</div>
																</td>
																<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
																	<div className="text-gray-500">
																		<div className="wcf-recent-orders--order-date">
																			{
																				order.order_date
																			}
																		</div>
																		<div className="wcf-recent-orders--order-time">
																			{ __(
																				'at',
																				'cartflows'
																			) }{ ' ' }
																			{
																				order.order_time
																			}
																		</div>
																	</div>
																</td>
																<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
																	<span
																		className={ `inline-flex rounded-full ${ statusBgColor } px-2 text-xs font-semibold leading-5 ${ statusColor }` }
																	>
																		{
																			order.order_status
																		}
																	</span>
																</td>
																<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
																	{
																		order.payment_method
																	}
																</td>
																<td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-left text-sm font-medium sm:pr-6">
																	{ ReactHtmlParser(
																		order.order_total
																	) }
																</td>
															</tr>
														);
													}
												) }
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					) }
					{ recentOrders.length === 0 && (
						<div className="text-center px-8 py-12">
							<div className="flex justify-center mb-3">
								<ShoppingBagIcon className="h-6 w-6 text-primary-500" />
							</div>
							<h3 className="mt-2 text-base font-medium text-gray-900">
								{ __( 'Find recent order here', 'cartflows' ) }
							</h3>
							<p className="mt-1 text-sm text-gray-500">
								{ __(
									'Once you have received orders, come back here to find it again easily',
									'cartflows'
								) }
							</p>
						</div>
					) }
				</>
			) }
		</div>
	);
}

export default RecentOrders;
