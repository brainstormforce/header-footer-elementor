// External Dependences.
import { __ } from '@wordpress/i18n';
import { useState } from 'react';
import apiFetch from '@wordpress/api-fetch';
import { compose } from '@wordpress/compose';
import { withSelect, withDispatch } from '@wordpress/data';
import { useSettingsValue } from '@Utils/SettingsProvider';
import { Link, useLocation } from 'react-router-dom';
import { PlusIcon } from '@heroicons/react/24/outline';

// import '../../creator/creator.scss';

// Internal Components.
import Spinner from '../../../Spinner';

// SCSS.
import './InstallPlugins.scss';
import FlowNamePopup from '@Admin/importer/flow-library/library/flow-name-popup';

const InstallPlugins = ( {
	setRequiredPlugins,
	setAllFlows,
	default_page_builder,
	page_builder_group,
} ) => {
	const [ { page_builder } ] = useSettingsValue();
	const [ processing, setProcessing ] = useState( false );

	const query = new URLSearchParams( useLocation()?.search );
	let activePath = query.get( 'path' ) ? query.get( 'path' ) : '';

	if ( 'store-checkout-library' === activePath ) {
		activePath = 'store-checkout';
	}

	const title = page_builder_group.title;
	let plugin_string = `Please click here and activate ${ title }`;

	let theme_status = '';
	if ( 'divi' === default_page_builder ) {
		theme_status = page_builder_group[ 'theme-status' ];
		const plugin_status = page_builder_group[ 'plugin-status' ];

		if ( 'deactivate' === theme_status || 'install' === plugin_status ) {
			plugin_string = `Please activate ${ title }`;
		} else if (
			( 'deactivate' === theme_status ||
				'not-installed' === theme_status ) &&
			'install' === plugin_status
		) {
			plugin_string = `Please install and activate ${ title }`;
		}
	}

	function install_all_plugins( page_builder_plugins ) {
		console.log( 'Installing all plugins', page_builder_plugins );

		for ( const plugin of page_builder_plugins ) {
			if ( 'install' === plugin.status ) {
				console.log( 'plugin.slug', plugin.slug );
				// Add each plugin activate request in Ajax queue.
				// @see wp-admin/js/updates.js
				wp.updates.queue.push( {
					action: 'install-plugin', // Required action.
					data: {
						slug: plugin.slug,
						init: plugin.init,
						name: plugin.name,
						success() {
							console.log(
								'Installed Successfully! Activating plugin ',
								plugin.slug
							);
							activate_plugin( plugin );
						},
						error() {
							// $( document ).trigger( 'wp-plugin-install-error', [plugin] );
						},
					},
				} );
			}
		}

		// Required to set queue.
		wp.updates.queueChecker();
	}

	function activate_plugin( plugin ) {
		const formData = new window.FormData();
		formData.append( 'action', 'cartflows_activate_plugin' );
		formData.append( 'init', plugin.init );
		formData.append( 'security', cartflows_admin.activate_plugin_nonce );

		apiFetch( {
			url: cartflows_admin.ajax_url,
			method: 'POST',
			body: formData,
		} ).then( () => {
			setProcessing( false );
			setRequiredPlugins( page_builder, 'no' );
			setAllFlows( [] );
			window.location.reload();
		} );
	}

	function activate_all_plugins( page_builder_plugins ) {
		for ( const plugin of page_builder_plugins ) {
			if ( 'activate' === plugin.status ) {
				activate_plugin( plugin );
			}
		}
	}

	function installAndActivatePlugins( event ) {
		event.preventDefault();
		console.log( 'clicked' );

		setProcessing( true );

		const page_builder_plugins =
			cartflows_admin.required_plugins[ default_page_builder ].plugins;

		let remaining_install_plugins = 0;
		let remaining_active_plugins = 0;

		for ( const plugin of page_builder_plugins ) {
			if ( 'install' === plugin.status ) {
				remaining_install_plugins++;
			}
			if ( 'activate' === plugin.status ) {
				remaining_active_plugins++;
			}
		}

		// Have any plugin for install?
		if ( remaining_install_plugins ) {
			install_all_plugins( page_builder_plugins );
		} else if ( remaining_active_plugins ) {
			console.log( 'remaining_active_plugins', remaining_active_plugins );
			activate_all_plugins( page_builder_plugins );
		}
	}

	const [ visibility, setVisibility ] = useState( 'hide' );
	const [ flowName, setFlowName ] = useState( '' );

	const openSettingsPopup = function ( event ) {
		event.preventDefault();
		window.location = event.target.href;
	};

	return (
		<div className="wcf-flow-importer wcf-flow-library--other">
			<div className="wcf-flow-library-importer__header bg-white px-8 py-6 flex justify-between items-center border-b border-gray-200">
				<h3 className="wcf-flow-importer__header-title text-2xl font-semibold text-gray-800">
					{ __( 'Funnel Templates', 'cartflows' ) }
				</h3>
			</div>

			<div className="wcf-flow-library-importer__list bg-white px-10 py-14">
				<FlowNamePopup
					visibility={ visibility }
					setVisibility={ setVisibility }
					type={ 'blank' }
					flowName={ flowName }
					setFlowName={ setFlowName }
				/>
				<div className="wcf-item wcf-item--start-from-blank flex gap-6 mx-auto max-w-4xl">
					<div
						className="wcf-item__inner relative cursor-pointer group bg-gray-25 p-5 text-center flex flex-col border border-gray-200 hover:border-primary-300 rounded-md items-center justify-center h-72 w-2/3"
						onClick={ () => {
							setVisibility(
								'hide' === visibility ? 'show' : 'hide'
							);
						} }
					>
						<div className="wcf-item__thumbnail-wrap">
							<div className="wcf-item__thumbnail">
								<div className="wcf-flow-importer__start-from-blank-icon bg-white p-6 rounded-full">
									<PlusIcon className="wcf-icon-start-from-blank w-7 h-7 stroke-1 text-gray-400 group-hover:text-primary-300" />
								</div>
							</div>
						</div>

						<div className="wcf-item__heading-wrap border-t border-gray-200 absolute bottom-0 w-full">
							<div className="wcf-item__heading text-base text-gray-800 font-medium p-4 text-center">
								{ __( 'Start from scratch', 'cartflows' ) }
							</div>
						</div>
					</div>
					<div className="wcf_item__info flex flex-col gap-6 justify-center w-3/4">
						<h3 className="wcf_item__info--title text-2xl text-gray-800 font-semibold">
							{ __(
								'It seems that the page builder you selected is inactive.',
								'cartflows'
							) }
						</h3>

						<p className="wcf_item__info--notice text-base text-gray-600 font-normal">
							{ processing ? <Spinner /> : '' }
							<a
								href="#"
								onClick={ installAndActivatePlugins }
								className="text-primary-500 hover:text-primary-600"
							>
								{ plugin_string }
							</a>
							{ __(
								' to see CartFlows templates. If you prefer another page builder tool, you can ',
								'cartflows'
							) }
							<Link
								key={ `?page=${ cartflows_admin.home_slug }&path=${ activePath }&settings=1&license=1` }
								to={ {
									pathname: 'admin.php',
									search: `?page=${ cartflows_admin.home_slug }&path=${ activePath }&settings=1&license=1`,
								} }
								onClick={ openSettingsPopup }
								className="text-primary-500 hover:text-primary-600"
							>
								{ __( 'select it here', 'cartflows' ) }
							</Link>
							.
						</p>
						<span className="wcf_item__info--desc text-base text-gray-600 font-normal">
							{ __(
								'Are you using any other page builder? No worries. CartFlows works well with every other page builder. Right now we do not have ready templates for every page builder but we are planning to add it very soon.',
								'cartflows'
							) }
						</span>
						<a
							className="wcf_item__info--doc text-gray-600 hover:text-primary-500 flex items-center gap-2 text-sm"
							href="https://cartflows.com/docs/how-to-use-cartflows-with-your-own-template/?utm_source=dashboard&utm_medium=free-cartflows&utm_campaign=docs"
							target="_blank"
							rel="noreferrer"
						>
							{ __( 'Learn How ', 'cartflows' ) }
							<i className="dashicons dashicons-external"></i>
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default compose(
	withSelect( () => {
		const page_builder_group =
			cartflows_admin.required_plugins[ cartflows_admin?.page_builder ];
		return {
			page_builder_group,
			default_page_builder: cartflows_admin?.page_builder,
		};
	} ),
	withDispatch( ( dispatch ) => {
		const { setRequiredPlugins, setAllFlows } = dispatch( 'wcf/importer' );
		return {
			setRequiredPlugins,
			setAllFlows,
		};
	} )
)( InstallPlugins );
