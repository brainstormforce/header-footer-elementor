import React from 'react';
import './AnalyticsCTA.scss';
import { __ } from '@wordpress/i18n';
import { DateField, DocField, Tooltip } from '@Fields';
import { validateTitleField } from '@Utils/Helpers';
import UpgradeToProCTA from '@CTA/UpgradeToProCTA';

function AnalyticsCTA() {
	const date_to = new Date();
	const date_from = new Date();
	const headers = [
		__( 'Total Visits', 'cartflows' ),
		__( 'Unique Visits', 'cartflows' ),
		__( 'Conversions', 'cartflows' ),
		__( 'Conversion Rate', 'cartflows' ),
		__( 'Revenue', 'cartflows' ),
	];

	const all_steps = [
		{
			id: 1,
			title: 'Sales Landing Page',
			type: 'landing',
			visits: {
				conversion_rate: 63,
				conversions: 12,
				note: '',
				revenue: '0.00',
				step_id: 1,
				title: 'Sales Landing Page',
				total_visits: 203,
				unique_visits: 172,
			},
		},
		{
			id: 2,
			title: 'Checkout Page',
			type: 'checkout',
			visits: {
				conversion_rate: 71,
				conversions: 21,
				note: '',
				revenue: '1998',
				step_id: 2,
				title: 'Checkout Page',
				total_visits: 228,
				unique_visits: 182,
			},
		},
		{
			id: 3,
			title: 'ThankYou Page',
			type: 'thankyou',
			visits: {
				conversion_rate: 68,
				conversions: 12,
				note: '',
				revenue: '0.00',
				step_id: 3,
				title: 'Thank You Page',
				total_visits: 225,
				unique_visits: 180,
			},
		},
	];
	return (
		<div className="wcf-flow-analytics__pro-options-cta-wrapper relative">
			<div className="wcf-flow-analytics wcf-flow-analytics__pro-options-cta">
				<div className="wcf-flow-analytics__revenue">
					<div className="wcf-flow-analytics__revenue--block">
						<div className="title">
							{ __( 'Gross Sales', 'cartflows' ) }
							<Tooltip
								text={ __(
									'Grand total of all orders.',
									'cartflows'
								) }
							/>
						</div>
						<div className="value">
							<span className="wcf-woo-currency">
								{ cartflows_admin.woo_currency }
							</span>
							{ '1998' }
						</div>
					</div>

					<div className="wcf-flow-analytics__revenue--block">
						<div className="title">
							{ __( 'Average Order Value', 'cartflows' ) }
							<Tooltip
								text={ __(
									'Average total of every order.',
									'cartflows'
								) }
							/>
						</div>
						<div className="value">
							<span className="wcf-woo-currency">
								{ cartflows_admin.woo_currency }
							</span>
							{ '214' }
						</div>
					</div>

					<div className="wcf-flow-analytics__revenue--block">
						<div className="title">
							{ __( 'Bump Offer Revenue', 'cartflows' ) }
							<Tooltip
								text={ __(
									'Grand total of all order bumps.',
									'cartflows'
								) }
							/>
						</div>
						<div className="value">
							<span className="wcf-woo-currency">
								{ cartflows_admin.woo_currency }
							</span>
							{ '80' }
						</div>
					</div>

					<div className="wcf-flow-analytics__revenue--block">
						<div className="title">
							{ __( 'Total Orders', 'cartflows' ) }
							<Tooltip
								text={ __(
									'Total number of orders.',
									'cartflows'
								) }
							/>
						</div>
						<div className="value">{ '24' }</div>
					</div>
				</div>
				<div className="wcf-flow-analytics__filters">
					<div className="wcf-flow-analytics__filters-buttons">
						<button
							className={ `wcf-filters__buttons--last-today wcf-button wcf-button--secondary` }
							value="1"
						>
							{ __( 'Today', 'cartflows' ) }
						</button>

						<button
							className={ `wcf-filters__buttons--last-week wcf-button wcf-button--secondary` }
							value="7"
						>
							{ __( 'Last Week', 'cartflows' ) }
						</button>

						<button
							className={ `wcf-filters__buttons--last-month wcf-button wcf-button--secondary` }
							value="30"
						>
							{ __( 'Last Month', 'cartflows' ) }
						</button>
					</div>

					<div className="wcf-flow-analytics__filters-right">
						<DateField
							name="wcf_custom_filter_from"
							className="wcf-custom-filter-input"
							placeholder="YYYY-MM-DD"
							value={ date_from }
						/>
						<DateField
							name="wcf_custom_filter_to"
							className="wcf-custom-filter-input"
							placeholder="YYYY-MM-DD"
							value={ date_to }
						/>
						<button
							value="-1"
							id="wcf_custom_filter"
							className="wcf-filters__buttons--custom-search wcf-button wcf-button--primary"
						>
							{ __( 'Custom Filter', 'cartflows' ) }
						</button>
					</div>
				</div>
				<div className="wcf-flow-analytics__report">
					<div className="wcf-flow-analytics__report-table">
						<div className="table-header">
							<div className="header__title">
								{ __( 'Step', 'cartflows' ) }
							</div>
							{ headers.map( ( header ) => {
								return (
									<div
										className="header__item"
										key={ header }
									>
										{ header }
									</div>
								);
							} ) }
						</div>
						{ all_steps.map( ( data ) => {
							const visits = data.visits;
							const datarow = [
								visits.total_visits,
								visits.unique_visits,
								visits.conversions,
								visits.conversion_rate + ' %',
								visits.revenue,
							];

							return (
								<div key={ data.id }>
									<div className="table-row">
										<div
											className="step-name"
											title={ data.visits.title }
										>
											{ ! data[ 'visits-ab' ] && (
												<span id={ data.id }>
													{ validateTitleField(
														data.visits.title,
														30,
														20
													) }
												</span>
											) }
											{ '' !== visits?.note &&
												! data[ 'ab-test' ] && (
													<span
														className="dashicons dashicons-editor-help"
														title={ visits.note }
													></span>
												) }
										</div>

										{ datarow.map( ( dataitem ) => {
											return (
												<div
													className="table-data"
													key={ data.id }
												>
													{ dataitem }
												</div>
											);
										} ) }
									</div>
								</div>
							);
						} ) }
					</div>
				</div>
				<div className="wcf-flow-analytics__reset-button">
					<DocField
						content={ __(
							'Note: The orders which are placed by the admins are not considered while calculating the analytics.',
							'cartflows'
						) }
					/>
					<button className="wcf-analytics-reset wcf-button wcf-button--secondary">
						{ __( 'Reset Analytics', 'cartflows' ) }
					</button>
				</div>
			</div>
			<UpgradeToProCTA
				buttonLink={ getUpgradeToProUrl(
					'utm_source=dashboard&utm_medium=free-cartflows&utm_campaign=analytics-cta'
				) }
				heading={ __( 'Funnel Analytics', 'cartflows' ) }
				description={ __(
					'See how your flows are performing with real-time analytics. Adjust your offers to continuously improve conversions and revenue.',
					'cartflows'
				) }
				btnText={ __( 'Upgrade to CartFlows Pro', 'cartflows' ) }
				usps={ [
					__( 'Quickly identify your winning offers', 'cartflows' ),
					__( 'Traffic and conversion rate data', 'cartflows' ),
					__( 'Track the revenue generated', 'cartflows' ),
					__( 'Weekly email performance reports', 'cartflows' ),
				] }
			/>
		</div>
	);
}
export default AnalyticsCTA;
