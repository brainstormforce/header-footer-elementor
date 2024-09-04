import React, { useState } from 'react';
import apiFetch from '@wordpress/api-fetch';
import { RectSkeleton } from '@Skeleton';
import { useSettingsStateValue } from '@SettingsApp/utils/StateProvider';
import './StatsMetaBox.scss';
import { __ } from '@wordpress/i18n';

function StatsMetaBox() {
	const [ { analyticsData }, dispatch ] = useSettingsStateValue();

	const [ activeTab, setActiveTab ] = useState( 'today' );

	const [ process, setProcess ] = useState( false );

	const woo_currency = cartflows_admin.woo_currency;

	const statsmenus = [
		{
			name: __( 'Today', 'cartflows' ),
			value: 1,
			type: 'button',
			tab_slug: 'today',
		},
		{
			name: __( 'Yesterday', 'cartflows' ),
			value: -1,
			type: 'button',
			tab_slug: 'yesterday',
		},
		{
			name: __( 'Last Week', 'cartflows' ),
			value: 7,
			type: 'button',
			tab_slug: 'last_week',
		},
		{
			name: __( 'Last Month', 'cartflows' ),
			value: 30,
			type: 'button',
			tab_slug: 'last_month',
		},
	];

	const filterStatsOnClick = ( event ) => {
		setProcess( true );
		const diff = event.target.value,
			clicked_tab = event.target.id;

		const formData = new window.FormData();

		let date_to = new Date();
		let date_from = new Date();
		let report_date = diff;

		report_date = typeof report_date === 'undefined' ? 7 : report_date;

		switch ( report_date ) {
			case '7':
				date_from.setDate( date_from.getDate() - 7 );
				setActiveTab( clicked_tab );
				break;
			case '30':
				date_from.setDate( date_from.getDate() - 30 );
				setActiveTab( clicked_tab );
				break;
			case '1':
				date_from.setDate( date_from.getDate() );
				setActiveTab( clicked_tab );
				break;
			case '-1':
				date_to.setDate( date_from.getDate() - 1 );
				date_from.setDate( date_from.getDate() - 1 );
				setActiveTab( clicked_tab );
				break;
		}

		date_from = date_from.toISOString().slice( 0, 10 );
		date_to = date_to.toISOString().slice( 0, 10 );

		formData.append( 'date_to', date_to );
		formData.append( 'date_from', date_from );
		formData.append( 'action', 'cartflows_get_all_flows_stats' );
		formData.append(
			'security',
			cartflows_admin.get_all_flows_stats_nonce
		);

		const getallflowanalytics = async () => {
			apiFetch( {
				url: cartflows_admin.ajax_url,
				method: 'POST',
				body: formData,
			} ).then( ( response ) => {
				dispatch( {
					type: 'SET_ANALYTICS_DATA',
					analyticsData: response.data,
				} );
				setProcess( false );
			} );
		};
		getallflowanalytics();
	};

	return (
		<div className="wcf-metabox wcf-stats">
			<div className="wcf-metabox__header">
				<h2> { __( 'Stats Overview', 'cartflows' ) }</h2>
				<div className="wcf-stats--action-buttons">
					{ statsmenus.map( ( statsmenu ) => (
						<button
							type={ statsmenu.type }
							value={ statsmenu.value }
							onClick={ filterStatsOnClick }
							title={ statsmenu.name }
							id={ statsmenu.tab_slug }
							className={ `button wcf-button--action-button wcf-stats--action-buttons ${
								activeTab === statsmenu.tab_slug
									? ' is_active'
									: ''
							}` }
							key={ statsmenu.tab_slug }
						>
							{ statsmenu.name }
						</button>
					) ) }
				</div>
			</div>
			<div className="wcf-metabox__body">
				<form className="wcf-stats__form">
					<div className="wcf-stats--row wcf-col--flex wcf-col--row">
						<div className="wcf-stats-box wcf-col--20">
							<div className="wcf-sb-title">
								<h3>{ __( 'Total Revenue', 'cartflows' ) }</h3>
							</div>
							<div className="wcf-sb-content">
								<span className="wcf-stats-number">
									{ ! process ? (
										`${ woo_currency } ${ analyticsData.flow_stats.total_revenue }`
									) : (
										<RectSkeleton height="35px" />
									) }
								</span>
							</div>
						</div>

						<div className="wcf-stats-box wcf-col--20">
							<div className="wcf-sb-title">
								<h3>
									{ __( 'Order Bump Revenue', 'cartflows' ) }
								</h3>
							</div>

							<div className="wcf-sb-content">
								<span className="wcf-stats-number">
									{ ! process ? (
										`${ woo_currency } ${ analyticsData.flow_stats.total_bump_revenue }`
									) : (
										<RectSkeleton height="35px" />
									) }
								</span>
							</div>
						</div>

						<div className="wcf-stats-box wcf-col--20">
							<div className="wcf-sb-title">
								<h3>{ __( 'Offers Revenue', 'cartflows' ) }</h3>
							</div>
							<div className="wcf-sb-content">
								<span className="wcf-stats-number">
									{ ! process ? (
										`${ woo_currency } ${ analyticsData.flow_stats.total_offers_revenue }`
									) : (
										<RectSkeleton height="35px" />
									) }
								</span>
							</div>
						</div>

						<div className="wcf-stats-box wcf-col--20">
							<div className="wcf-sb-title">
								<h3> { __( 'Total Orders', 'cartflows' ) } </h3>
							</div>
							<div className="wcf-sb-content">
								<span className="wcf-stats-number">
									{ ! process ? (
										`${ analyticsData.flow_stats.total_orders }`
									) : (
										<RectSkeleton height="35px" />
									) }
								</span>
							</div>
						</div>
						<div className="wcf-stats-box wcf-col--20">
							<div className="wcf-sb-title">
								<h3> { __( 'Total Visits', 'cartflows' ) } </h3>
							</div>
							<div className="wcf-sb-content">
								<span className="wcf-stats-number">
									{ ! process ? (
										`${ analyticsData.flow_stats.total_visits }`
									) : (
										<RectSkeleton height="35px" />
									) }
								</span>
							</div>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}

export default StatsMetaBox;
