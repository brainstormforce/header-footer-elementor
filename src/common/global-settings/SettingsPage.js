import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import apiFetch from '@wordpress/api-fetch';
import { useSettingsStateValue } from '@SettingsApp/utils/StateProvider';
import { __ } from '@wordpress/i18n';
import './SettingsPage.scss';
import cf_icon from '@Images/cartflows-icon.svg';
import InputEvents from '@SettingsApp/utils/InputEvents';
import SettingsContent from './SettingsContent';
import { useSettingsValue } from '@Utils/SettingsProvider';
import { SubmitButton } from '@Fields';
import SettingPageSkeleton from '@Admin/common/global-settings/SettingsPageSkeleton';
import {
	Cog6ToothIcon,
	// ShoppingCartIcon,
	LinkIcon,
	ArrowPathIcon,
	UserIcon,
	Squares2X2Icon,
	// MagnifyingGlassIcon,
	XMarkIcon,
	CreditCardIcon,
	KeyIcon,
} from '@heroicons/react/24/outline';

function SettingsPage( props ) {
	const [ { globaldata }, dispatch ] = useSettingsStateValue();
	const [ currentTab, setCurrentTab ] = useState( props.current_tab );
	const [ {}, setSettingsStatus ] = useSettingsValue();
	let loading = true;

	if ( 'undefined' === typeof globaldata.length ) {
		loading = false;
	}
	InputEvents();

	useEffect( () => {
		let isActive = true;
		if ( globaldata.length < 1 ) {
			const getsettings = async () => {
				apiFetch( {
					path: '/cartflows/v1/admin/commonsettings/',
				} ).then( ( data ) => {
					if ( isActive ) {
						dispatch( {
							type: 'SET_SETTINGS',
							commondata: data,
						} );
					}
				} );
			};

			getsettings();
		}
		return () => {
			isActive = false;
		};
	}, [] );

	const tabs = [
		{
			name: __( 'General', 'cartflows' ),
			slug: 'general',
			icon: <Cog6ToothIcon className="mr-3 h-6 w-6 flex-shrink-0 " />,
		},

		{
			name: __( 'Integrations', 'cartflows' ),
			slug: 'integrations',
			icon: <ArrowPathIcon className="mr-3 h-6 w-6 flex-shrink-0 " />,
		},
		{
			name: __( 'User Role Manager', 'cartflows' ),
			slug: 'user_role_manager',
			icon: <UserIcon className="mr-3 h-6 w-6 flex-shrink-0 " />,
		},
		{
			name: __( 'Permalink', 'cartflows' ),
			slug: 'permalink',
			icon: <LinkIcon className="mr-3 h-6 w-6 flex-shrink-0 " />,
		},
		{
			name: __( 'Advanced', 'cartflows' ),
			slug: 'other',
			icon: <Squares2X2Icon className="mr-3 h-6 w-6 flex-shrink-0 " />,
		},
	];

	if ( wcfCartflowsTypePlusPro() ) {
		tabs.splice( 1, 0, {
			name: __( 'Order', 'cartflows' ),
			slug: 'offer',
			icon: <CreditCardIcon className="mr-3 h-6 w-6 flex-shrink-0 " />,
		} );
	}

	if ( wcfCartflowsPro() ) {
		tabs.push( {
			name: __( 'License', 'cartflows' ),
			slug: 'license',
			icon: <KeyIcon className="mr-3 h-6 w-6 flex-shrink-0 " />,
		} );
	}

	// Return error message if no access to the page.
	if ( ! cartflows_admin.current_user_can_manage_cartflows ) {
		return (
			<div className="wcf-no-access-error-wrapper">
				<div className="wcf-no-access--icon">
					<img
						src={ cf_icon }
						alt={ __( 'CartFlows Icon', 'cartflows' ) }
					/>
				</div>
				<h2 className="wcf-no-access--title">
					{ __( 'No Access', 'cartflows' ) }
				</h2>
				<div className="wcf-no-access--message">
					{ __(
						"You don't have permission to access this page.",
						'cartflows'
					) }
				</div>
				<div className="wcf-no-access--action-link">
					<Link
						key="wcf-back-to-home"
						to={ {
							pathname: 'admin.php',
							search: `?page=cartflows`,
						} }
						className="wcf-no-access-link"
					>
						{ __( 'Go back home', 'cartflows' ) }
						<span className="dashicons dashicons-arrow-right-alt"></span>
					</Link>
				</div>
			</div>
		);
	}

	if ( loading ) {
		return <SettingPageSkeleton />;
	}

	const handleFormSubmit = function ( event ) {
		event.preventDefault();

		const formData = new window.FormData( event.target );

		formData.append( 'action', 'cartflows_save_global_settings' );
		formData.append(
			'security',
			cartflows_admin.save_global_settings_nonce
		);

		apiFetch( {
			url: cartflows_admin.ajax_url,
			method: 'POST',
			body: formData,
		} ).then( ( data ) => {
			/* Update settings state */
			setSettingsStatus( { status: 'SAVED' } );

			if ( data.success ) {
				apiFetch( {
					path: '/cartflows/v1/admin/commonsettings/',
				} ).then( ( resp ) => {
					dispatch( {
						type: 'SET_SETTINGS',
						commondata: resp,
					} );
					dispatch( {
						type: 'SET_PAGE_BUILDER',
						pagebuilder:
							resp.options[
								'_cartflows_common[default_page_builder]'
							],
					} );
				} );
			} else {
				console.log( 'Error' );
			}
		} );
	};

	return (
		<form
			className="wcf-global-settings-form"
			onSubmit={ handleFormSubmit }
		>
			{ ' ' }
			<div className="wcf-global-setting-header py-3.5 px-6 flex justify-between items-center border-b border-gray-200">
				<div className="wcf-global-setting--left-panel flex justify-between gap-3.5">
					<div className="wcf-global-setting--heading-title">
						<h2 className="text-2xl font-semibold">
							{ __( 'Settings', 'cartflows' ) }
						</h2>
					</div>
					{ /* <div className="wcf-global-setting--search-field relative">
						<MagnifyingGlassIcon className="w-5 h-9 absolute left-0 top-0 text-gray-400 ml-2.5" />
						<TextField
							type="text"
							className={
								'wcf-search-settings text-sm font-normal text-gray-200 !py-2.5 !pr-2.5 !pl-8 border border-gray-200 !rounded-md'
							}
							name={ 'wcf_search_settings' }
							id={ 'wcf-search-settings' }
							placeholder={ __( 'Search Settings', 'cartflows' ) }
						/>
					</div> */ }
				</div>
				<div className="wcf-global-setting--right-panel flex justify-between gap-5">
					<SubmitButton className="wcf-button wcf-button--primary inline-flex items-center rounded-md border border-transparent bg-orange-600 px-3 py-2 text-sm font-medium leading-4 text-white shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2" />
					<button
						type="button"
						className="bg-white text-gray-400 hover:text-gray-500 focus:outline-none pl-4 pt-1 pb-1 border-l border-gray-200"
						onClick={ props.closeCallback }
					>
						<span className="sr-only">Close</span>
						<XMarkIcon className="h-6 w-6" aria-hidden="true" />
					</button>
				</div>
			</div>
			<div className="wcf-global-settings-metabox">
				<div className="wcf-global-settings-metabox__tabs flex">
					<div className="wcf-global-settings-metabox__tabs-menu flex w-64 flex-col border-r border-gray-200">
						<div className="flex flex-grow flex-col overflow-y-auto bg-white">
							<div className="flex flex-1 flex-col">
								<nav className="flex-1 space-y-1 p-4">
									{ tabs.map( ( tab ) => {
										const navClass =
											tab.slug === currentTab
												? 'wcf-settings-nav__active bg-primary-25 text-primary-600'
												: 'wcf-settings-nav text-gray-600';
										return (
											<a
												className={ `wcf-button-animate cursor-pointer group flex items-center px-3.5 py-4 text-sm hover:text-primary-600 hover:bg-primary-25 font-medium rounded-md ${ navClass }` }
												onClick={ () =>
													setCurrentTab( tab.slug )
												}
												key={ tab.slug }
												id={ tab.slug }
											>
												{ tab.icon }
												{ tab.name }
											</a>
										);
									} ) }
								</nav>
							</div>
						</div>
					</div>
					<div className="wcf-global-settings-metabox__current-tab flex flex-1 flex-col overflow-y-scroll">
						<main>
							<div className="px-6 py-6">
								<SettingsContent tab={ currentTab } />
								<input
									type="hidden"
									name={ 'setting_tab' }
									defaultValue={ currentTab }
								/>
							</div>
						</main>
					</div>
				</div>
			</div>
		</form>
	);
}

export default SettingsPage;
