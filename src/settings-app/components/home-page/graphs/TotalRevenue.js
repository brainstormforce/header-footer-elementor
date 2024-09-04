import React from 'react';
import { useSettingsStateValue } from '@SettingsApp/utils/StateProvider';
import Chart from 'react-apexcharts';
import { __ } from '@wordpress/i18n';

function TotalRevenue( props ) {
	const [ { analyticsData } ] = useSettingsStateValue();
	const totalRevenue =
		analyticsData && analyticsData.flow_stats.revenue_by_date
			? analyticsData.flow_stats.revenue_by_date
			: [];

	const revenue = [];

	props.dateRange.map( ( date ) => {
		const orderRevenue = totalRevenue.find( ( order ) => {
			return order.OrderDate === date;
		} );

		revenue.push( orderRevenue ? orderRevenue.Revenue : 0 );

		return null;
	} );

	const dates = [];
	props.dateRange.map( ( date ) => {
		const formattedDate = new Date( date );

		dates.push(
			formattedDate.toLocaleDateString( 'en-US', {
				// year: 'numeric',
				month: 'short',
				day: 'numeric',
			} )
		);
		return null;
	} );
	const options = {
		chart: {
			id: 'wcf-analytics-graphs',
			// type: 'area',
			// zoom: {
			// 	type: 'x',
			// 	enabled: true,
			// 	autoScaleYaxis: true,
			// },
			toolbar: {
				show: false,
			},
		},
		dataLabels: {
			enabled: true,
			formatter( value ) {
				// Format the number as currency
				return cartflows_admin.woo_currency + value.toLocaleString();
			},
		},
		xaxis: {
			categories: dates,
		},
		yaxis: {
			labels: {
				formatter( value ) {
					// Format the number as currency
					return (
						cartflows_admin.woo_currency + value.toLocaleString()
					);
				},
			},
		},
		stroke: {
			curve: 'smooth',
		},
		tooltip: {
			x: {
				format: 'dd MMM',
			},
		},
		colors: [ '#F06434' ],
	};
	const series = [
		{
			name: 'Total Revenue',
			data: revenue,
		},
	];

	return (
		<section className="block p-6 justify-between">
			<div className="mr-16 w-full flex items-center">
				<h3 className="flex-1 text-xl font-semibold text-gray-800">
					{ __( 'Total Revenue', 'cartflows' ) }
				</h3>
				{ /* <button
					className="bg-white px-2.5 py-1 items-center text-slate-800 text-sm font-medium border border-gray-200 rounded-md focus:outline-none mr-2.5"
					type="button"
				>
					Daily
				</button>
				<button
					className="bg-white px-2.5 py-1 items-center text-slate-600 text-sm font-medium border border-gray-200 rounded-md focus:outline-none"
					type="button"
				>
					Monthly
				</button> */ }
			</div>
			<div className="mt-4">
				<Chart
					options={ options }
					series={ series }
					type="area"
					// width={ auto }
					height={ 305 }
				/>
			</div>
		</section>
	);
}

export default TotalRevenue;
