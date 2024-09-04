import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { __ } from '@wordpress/i18n';
import cflogo from '@Images/cartflows-symbol.png';
import SettingsPopup from '@Admin/common/global-settings/SettingsPopup';
import DocsPopup from '@Admin/common/docs/DocsPopup';

import { useSettingsValue } from '@Utils/SettingsProvider';

import { Cog6ToothIcon, PlayCircleIcon } from '@heroicons/react/24/outline';

function NavMenu() {
	const [ { license_status } ] = useSettingsValue();

	const menus = [
		{
			name: __( 'Dashboard', 'cartflows' ),
			slug: cartflows_admin.home_slug,
			path: '',
			url: '',
		},
		{
			name: __( 'Funnels', 'cartflows' ),
			slug: cartflows_admin.home_slug,
			path: 'flows',
			url: '',
		},
		{
			name: __( 'Store Checkout', 'cartflows' ),
			slug: cartflows_admin.home_slug,
			path: 'store-checkout',
			url:
				'' !== cartflows_admin.global_checkout_id
					? '&action=wcf-edit-flow&flow_id=' +
					  cartflows_admin.global_checkout_id
					: '',
		},
		{
			name: __( 'Add-ons', 'cartflows' ),
			slug: cartflows_admin.home_slug,
			path: 'addons',
			url: '',
		},
	];

	const query = new URLSearchParams( useLocation()?.search ),
		activePage = query.get( 'page' )
			? query.get( 'page' )
			: cartflows_admin.home_slug,
		settings = query.get( 'settings' ),
		license = query.get( 'license' );
	let activePath = query.get( 'path' ) ? query.get( 'path' ) : '';
	if ( 'store-checkout-library' === activePath ) {
		activePath = 'store-checkout';
	}
	const [ isSettings, setIsSettings ] = useState( settings ? true : false );

	const [ settingsCurrentTab, setCurrentTab ] = useState(
		license ? 'license' : 'general'
	);

	const isEditorApp = [ 'wcf-edit-flow', 'wcf-edit-step' ].includes(
		query.get( 'action' )
	);

	const settingsPopup = function () {
		setIsSettings( ! isSettings );
	};

	const conditionalSettingIcon = function () {
		if ( cartflows_admin.current_user_can_manage_cartflows ) {
			return (
				<a
					className="bg-white p-4 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-offset-2 cursor-pointer relative wcf-inline-tooltip"
					id="wcf-global-settings-popup"
					onClick={ settingsPopup }
					data-tooltip={ __( 'Open Global Settings', 'cartflows' ) }
				>
					<Cog6ToothIcon
						className="w-6 h-6 stroke-1"
						aria-hidden="true"
					/>
				</a>
			);
		}
	};

	let show_license_msg = '',
		license_msg_link = '',
		license_msg_class = '',
		pro_plugin_plan = '';

	if ( ! wcfCartflowsPro() ) {
		show_license_msg = __( 'Upgrade to Premium', 'cartflows' );
		license_msg_class =
			'wcf-badge--warning hover:text-amber-600 focus:text-amber-600';
		license_msg_link = getUpgradeToProUrl(
			'utm_source=carflows-dashboard&utm_medium=free-cartflows&utm_campaign=go-pro'
		);
	} else if ( wcfCartflowsPro() && 'Activated' !== license_status ) {
		show_license_msg = __( 'Activate License', 'cartflows' );
		license_msg_class =
			'wcf-badge--error hover:text-red-600 focus:text-red-600';
		pro_plugin_plan = cartflows_admin.cf_pro_type;
	} else {
		show_license_msg = __( 'Valid License', 'cartflows' );
		license_msg_class =
			'wcf-badge--success hover:text-green-600 focus:text-green-600 pointer-events-none disabled';
		pro_plugin_plan = cartflows_admin.cf_pro_type;
	}

	/**
	 * Open the license popup and set the license tab as a current tab.
	 *
	 * @param {event} e The click event of the button.
	 */
	const openLicenseSetting = function ( e ) {
		e.preventDefault();

		if ( ! license_msg_link ) {
			settingsPopup();
			setCurrentTab( 'license' );
		}
	};

	return (
		<>
			<nav className="wcf-main--nav-menu sticky top-8 z-20">
				<div className="wcf-main--nav-menu-navbar flex">
					<div className="wcf-main--nav-menu__logo flex items-center">
						<img
							className="block h-8 w-auto"
							src={ cflogo }
							alt="CartFlows"
						/>
					</div>
					<div className="wcf-main--nav-menu__items sm:-my-px sm:ml-6 sm:flex sm:space-x-8">
						{ menus.map( ( menu ) => {
							if ( isEditorApp ) {
								return (
									<a
										href={ `admin.php?page=${ menu.slug }${
											'' !== menu.path
												? '&path=' + menu.path
												: ''
										}${ menu.url }` }
										className={
											activePath === menu.path
												? 'border-b-2 border-orange-500 text-gray-900 hover:text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium'
												: 'border-b border-gray-200 hover:border-b-2 hover:border-orange-500 text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium'
										}
										key={ menu.name }
									>
										{ menu.name }
									</a>
								);
							}

							return (
								<Link
									id={ menu.slug }
									key={ `?page=${ menu.slug }&path=${ menu.path }` }
									to={ {
										pathname: 'admin.php',
										search: `?page=${ menu.slug }${
											'' !== menu.path
												? '&path=' + menu.path
												: ''
										}${ menu.url }`,
									} }
									className={ `${
										activePage === menu.slug &&
										activePath === menu.path
											? 'border-b-2 border-orange-500 text-gray-900 hover:text-gray-900 inline-flex items-center px-1 pt-1 text-sm font-medium'
											: 'border-b border-gray-200 hover:border-b-2 hover:border-orange-500 text-gray-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 text-sm font-medium'
									}` }
								>
									{ menu.name }
								</Link>
							);
						} ) }
					</div>
				</div>
				<div className="wcf-main--nav-menu__action-bar sm:ml-6 sm:flex sm:items-center">
					{ show_license_msg && (
						<>
							<a
								href={
									license_msg_link ? license_msg_link : '#'
								}
								target={ license_msg_link ? '_blank' : '#' }
								className={ `wcf-badge ${ license_msg_class } rounded text-xs cursor-pointer font-normal mr-4` }
								onClick={ openLicenseSetting }
								rel="noreferrer"
							>
								{ show_license_msg }
							</a>
							<div className="border-r border-gray-200 py-2.5"></div>
						</>
					) }
					{ '' !== pro_plugin_plan && (
						<>
							<span className="wcf-badge bg-primary-25 border border-primary-300 text-primary-600 rounded text-[11px] leading-4 cursor-default font-normal mx-4 uppercase">
								{ pro_plugin_plan }
							</span>
							<div className="border-r border-gray-200 py-2.5"></div>
						</>
					) }

					{ conditionalSettingIcon() }
					<Link
						to="//youtube.com/c/CartFlows/"
						target="_blank"
						className="bg-white p-4 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-offset-2 cursor-pointer relative wcf-inline-tooltip"
						data-tooltip={ __( 'Tutorial Videos', 'cartflows' ) }
					>
						<PlayCircleIcon
							className="w-6 h-6 stroke-1"
							aria-hidden="true"
						/>
					</Link>
					<DocsPopup />
				</div>
			</nav>
			<SettingsPopup
				isOpen={ isSettings }
				closeCallback={ settingsPopup }
				current_tab={ settingsCurrentTab }
			/>
		</>
	);
}

export default NavMenu;
