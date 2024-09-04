import React from 'react';
import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';
import classNames from 'classnames';

import {
	BuildingStorefrontIcon,
	ShoppingCartIcon,
	EnvelopeIcon,
	CreditCardIcon,
	ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/20/solid';

function CompleteSetupBlock() {
	const dismissPage = ( e ) => {
		e.preventDefault();

		const formData = new window.FormData();

		formData.append( 'action', 'cartflows_dismiss_setup_page' );
		formData.append( 'security', cartflows_admin.dismiss_setup_page_nonce );

		apiFetch( {
			url: cartflows_admin.ajax_url,
			method: 'POST',
			body: formData,
		} ).then( () => {
			window.location.replace(
				cartflows_admin.admin_base_url + `admin.php?page=cartflows`
			);
		} );
	};

	const redirectToStore = ( e ) => {
		e.preventDefault();

		window.location.replace(
			cartflows_admin.admin_base_url +
				`admin.php?page=cartflows&path=store-checkout`
		);
	};
	const connectStripe = ( e ) => {
		e.preventDefault();

		e.target.innerText = __( 'Setting up…', 'cartflows' );

		if ( 'not-installed' === cartflows_admin.cpsw_status ) {
			wp.updates.queue.push( {
				action: 'install-plugin', // Required action.
				data: {
					slug: 'checkout-plugins-stripe-woo',
				},
			} );
			// Required to set queue.
			wp.updates.queueChecker();
		} else {
			const formData = new window.FormData();

			formData.append( 'action', 'cartflows_activate_plugin' );
			formData.append(
				'init',
				'checkout-plugins-stripe-woo/checkout-plugins-stripe-woo.php'
			);
			formData.append(
				'security',
				cartflows_admin.activate_plugin_nonce
			);
			apiFetch( {
				url: cartflows_admin.ajax_url,
				method: 'POST',
				body: formData,
			} ).then( ( response ) => {
				if ( response.data && response.data.success ) {
					window.location.replace(
						cartflows_admin.admin_base_url +
							`index.php?page=cpsw-onboarding`
					);
				}
			} );
		}
	};

	const installWCAR = ( e ) => {
		e.preventDefault();
		e.target.innerText = __( 'Setting up…', 'cartflows' );

		if ( 'not-installed' === cartflows_admin.ca_status ) {
			wp.updates.queue.push( {
				action: 'install-plugin', // Required action.
				data: {
					slug: 'woo-cart-abandonment-recovery', // Required.
				},
			} );
			// Required to set queue.
			wp.updates.queueChecker();
		} else {
			const formData = new window.FormData();

			formData.append( 'action', 'cartflows_activate_plugin' );
			formData.append(
				'init',
				'woo-cart-abandonment-recovery/woo-cart-abandonment-recovery.php'
			);
			formData.append(
				'security',
				cartflows_admin.activate_plugin_nonce
			);
			apiFetch( {
				url: cartflows_admin.ajax_url,
				method: 'POST',
				body: formData,
			} ).then( ( response ) => {
				if ( response.data && response.data.success ) {
					e.target.innerText = __( 'Finishing…', 'cartflows' );
				}
				window.location.reload();
			} );
		}
	};

	const openSettings = () => {
		window.location.replace(
			cartflows_admin.admin_base_url +
				`admin.php?page=cartflows&settings=1`
		);
	};

	const featureList = {
		storeCheckout: {
			name: __( 'Store Checkout', 'cartflows' ),
			desc: __(
				'By setting up the store checkout, your default checkout page will be replaced by the CartFlows modern checkout which will lead to more conversion and leads.',
				'cartflows'
			),
			icon: (
				<BuildingStorefrontIcon className="h-6 w-6 stroke-1 text-primary-500 hover:text-primary-600" />
			),
			btnText: __( 'Get Started', 'cartflows' ),
			redirectURL:
				cartflows_admin.admin_base_url +
				'admin.php?page=cartflows&path=store-checkout',
			isComplete: '' !== cartflows_admin.global_checkout_id,
			onClickCall: redirectToStore,
		},
		connectStripe: {
			name: __( 'Connect a Payment Gateway', 'cartflows' ),
			desc: __(
				'Stripe for WooCommerce delivers a simple, secure way to accept credit card payments in your WooCommerce store.',
				'cartflows'
			),
			icon: (
				<CreditCardIcon className="h-6 w-6 stroke-1 text-primary-500 hover:text-primary-600" />
			),
			btnText: __( 'Connect with Stripe', 'cartflows' ),
			redirectURL:
				cartflows_admin.admin_base_url +
				'admin.php?page=cartflows&path=store-checkout',
			isComplete: 'active' === cartflows_admin.cpsw_status,
			onClickCall: connectStripe,
		},
		cartAbandonment: {
			name: __( 'Recover Abandoned Carts', 'cartflows' ),
			desc: __(
				'Use our cart abandonment plugin and automatically recover your lost revenue absolutely free.',
				'cartflows'
			),
			icon: (
				<ShoppingCartIcon className="h-6 w-6 stroke-1 text-primary-500 hover:text-primary-600" />
			),
			btnText: __( 'Get Started', 'cartflows' ),
			redirectURL:
				cartflows_admin.admin_base_url +
				'admin.php?page=cartflows&path=store-checkout',
			isComplete: 'active' === cartflows_admin.ca_status,
			onClickCall: installWCAR,
		},
		storeEmails: {
			name: __( 'Setup Email Reports', 'cartflows' ),
			desc: __(
				'Let CartFlows take the guesswork out of your checkout results. Each week your store will send you an email report with key metrics and insights.',
				'cartflows'
			),
			icon: (
				<EnvelopeIcon className="h-6 w-6 stroke-1 text-primary-500 hover:text-primary-600" />
			),
			btnText: __( 'Add Email Address', 'cartflows' ),
			redirectURL:
				cartflows_admin.admin_base_url +
				'admin.php?page=cartflows&path=store-checkout',
			isComplete: '' !== cartflows_admin.is_set_report_email_ids,
			onClickCall: openSettings,
		},
	};

	const renderFeatureCards = Object.keys( featureList ).map(
		( feature, index ) => {
			const currentFeature = featureList[ feature ];
			return (
				<div
					key={ index }
					className="bg-white box-border relative border rounded-md p-5 flex justify-between gap-8"
				>
					<div className="flex gap-6">
						<div className="flex">
							<div className="p-4 bg-white rounded-full shadow-custom h-fit">
								{ currentFeature.icon }
							</div>
						</div>

						<div className="mt-2">
							<div className="text-base leading-[1.625rem] font-medium text-slate-800">
								{ currentFeature.name }
							</div>
							<p className="text-sm text-slate-400 mt-2">
								{ currentFeature.desc }
							</p>
							<button
								data-redirection={ currentFeature.redirection }
								onClick={ ( e ) => {
									currentFeature.onClickCall( e );
								} }
								className={ classNames(
									'wcf-button wcf-secondary-button mt-3',
									currentFeature.isComplete
										? 'bg-gray-200 text-gray-400 pointer-events-none border-gray-200'
										: ''
								) }
							>
								{ currentFeature.isComplete ? (
									<ArrowTopRightOnSquareIcon className="h-18 w-18 text-gray-400" />
								) : (
									<ArrowTopRightOnSquareIcon className="h-18 w-18 text-primary-500 hover:text-primary-600" />
								) }
								{ currentFeature.btnText }
							</button>
						</div>
					</div>
					<div>
						{ ! currentFeature.isComplete ? (
							<CheckCircleIcon className="h-7 w-7 text-gray-200" />
						) : (
							<CheckCircleIcon className="h-7 w-7 text-primary-500" />
						) }
					</div>
				</div>
			);
		}
	);

	return (
		<section aria-labelledby="section-1-title h-full">
			<div className="p-8 rounded-md bg-white overflow-hidden shadow-sm flex flex-col justify-center h-full">
				<div className="relative flex w-full lg:flex lg:items-center justify-between">
					<span className="font-semibold text-xl leading-6 text-slate-800">
						{ __( 'Complete Setup', 'cartflows' ) }
					</span>
					<span
						className="text-gray-400 text-sm font-medium cursor-pointer"
						onClick={ dismissPage }
					>
						{ __( 'Dismiss Setup', 'cartflows' ) }
					</span>
				</div>

				<div className="grid grid-flow-row auto-rows-min grid-cols-1 gap-8 sm:grid-cols-2 pt-6">
					{ renderFeatureCards }
				</div>
			</div>
		</section>
	);
}

export default CompleteSetupBlock;
