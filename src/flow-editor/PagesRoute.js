import React from 'react';
import { useLocation } from 'react-router-dom';
import { __ } from '@wordpress/i18n';
import StepsPage from '@FlowEditor/pages/StepsPage';
import StepLibrary from '../importer/step-library';
import { useStateValue } from '@Utils/StateProvider';
import StoreStepLibrary from '@Admin/store-importer/step-library';
import SingleStepLibrary from '@FlowEditor/SingleStepLibrary';
import { ExclamationTriangleIcon } from '@heroicons/react/20/solid';

function SettingsRoute() {
	const query = new URLSearchParams( useLocation().search );
	const [ { flow_type, steps } ] = useStateValue();
	const tab = query.get( 'tab' );

	const is_woo_installed = cartflows_admin.woocommerce_status;

	const payment_gateway_notices = function () {
		const steps_list = steps;

		if (
			is_woo_installed === 'active' &&
			wcfCartflowsTypePlusPro() &&
			steps_list.length > 0
		) {
			let show_notice = false;

			steps_list.map( ( step ) => {
				if ( step.type === 'upsell' || step.type === 'downsell' ) {
					show_notice = true;
				}
				return '';
			} );

			const supported_gateways =
					cartflows_admin?.supported_payment_gateways,
				available_gateways =
					cartflows_admin?.available_payment_gateways;
			let not_supported_gateways = [];

			if ( show_notice && supported_gateways && available_gateways ) {
				Object.keys( available_gateways ).map( ( gateway ) => {
					if ( ! supported_gateways.hasOwnProperty( gateway ) ) {
						const gateway_details = available_gateways[ gateway ];
						not_supported_gateways.push(
							gateway_details.method_title
						);
					}
					return '';
				} );

				if ( not_supported_gateways.length > 0 ) {
					not_supported_gateways =
						not_supported_gateways.join( ', ' );
					return (
						<div className="flex items-center gap-2 border-l-4 border border-yellow-400 rounded-md bg-yellow-50 p-4">
							<div className="wcf-payment-gateway-notice--icon">
								<ExclamationTriangleIcon
									className="h-5 w-5 text-yellow-400"
									aria-hidden="true"
								/>
							</div>
							<div className="wcf-payment-gateway-notice--text">
								<p className="text-sm text-yellow-700">
									{ __(
										'CartFlows Upsell/Downsell offer does not support the ',
										'cartflows'
									) }
									{ not_supported_gateways }
									{ __(
										' payment gateway. Please find the supported payment gateways ',
										'cartflows'
									) }
									<a
										href="https://cartflows.com/docs/supported-payment-gateways-by-cartflows/"
										className="font-medium text-yellow-700 underline hover:text-yellow-600"
										target="_blank"
										rel="noreferrer"
									>
										{ __( 'here.', 'cartflows' ) }
									</a>
								</p>
							</div>
						</div>
					);
				}
			}
		}
	};

	const get_route_page = function () {
		let component = '';

		switch ( tab ) {
			case 'library':
				component =
					'flows' === flow_type ? (
						<StepLibrary />
					) : (
						<StoreStepLibrary />
					);
				break;
			case 'update-template':
				component = <SingleStepLibrary />;
				break;
			default:
				component = <StepsPage />;
				break;
		}
		return component;
	};

	return (
		<>
			{ 'undefined' !== typeof payment_gateway_notices() && (
				<div className="wcf-payment-gateway-notices bg-white p-6 -mt-8 -mx-8 mb-3">
					{ payment_gateway_notices() }
				</div>
			) }

			{ get_route_page() }
		</>
	);
}

export default SettingsRoute;
