// External Dependences.
import { __ } from '@wordpress/i18n';
import React, { useState, createRef, useEffect } from 'react';
import { compose } from '@wordpress/compose';
import { withDispatch, useSelect } from '@wordpress/data';
import { TextField } from '@Fields';
import { useSettingsValue } from '@Utils/SettingsProvider';
import apiFetch from '@wordpress/api-fetch';

// Internal Components.
import FlowItem from './flow-item';
import FlowPreview from './flow-preview';
import InstallPlugins from './install-plugins';
import Sync from '../../sync';
import FlowNamePopup from './flow-name-popup';
import Search404 from './search-404';
import FlowLibrarySkeleton from '../components/FlowLibrarySkeleton';
import {
	MagnifyingGlassIcon,
	XMarkIcon,
	PlusIcon,
} from '@heroicons/react/24/outline';

function Library( { setAllFlows } ) {
	let any_inactive = 'no';

	const [ { page_builder } ] = useSettingsValue();
	const [ searchValue, setSearchValue ] = useState( '' );

	const {
		currentPageBuilderData,
		requiredPluginsData,
		preview,
		all_flows,
		flows_list,
	} = useSelect( ( select ) => {
		return {
			currentPageBuilderData:
				select( 'wcf/importer' ).getCurrentPageBuilderData(
					page_builder
				),
			requiredPluginsData:
				select( 'wcf/importer' ).getRequiredPluginsData(),
			preview: select( 'wcf/importer' ).getPreview(),
			all_flows: select( 'wcf/importer' ).getAllFlows(),
			flows_list: select( 'wcf/importer' ).getFlowsList( page_builder ),
		};
	} );

	if (
		'yes' === requiredPluginsData[ page_builder ] &&
		currentPageBuilderData
	) {
		if ( currentPageBuilderData?.plugins ) {
			currentPageBuilderData?.plugins.map( function ( plugin ) {
				if (
					'install' === plugin.status ||
					'activate' === plugin.status
				) {
					any_inactive = 'yes';
				}
				return '';
			} );
		}
	}

	// Have any missing plugin?
	// Then, show plugin installation screen.
	if ( 'yes' === any_inactive ) {
		return <InstallPlugins />;
	}

	//Need to check above conditions before useEffect.
	// eslint-disable-next-line react-hooks/rules-of-hooks
	useEffect( () => {
		let isActive = true;
		if ( ! all_flows[ page_builder ] ) {
			const formData = new window.FormData();
			formData.append( 'action', 'cartflows_get_flows_list' );
			formData.append( 'security', cartflows_admin.get_flows_list_nonce );

			const getFlows = async () => {
				apiFetch( {
					url: cartflows_admin.ajax_url,
					method: 'POST',
					body: formData,
				} ).then( ( response ) => {
					console.log( response );
					if ( isActive && response?.data?.flows ) {
						const newFlows = Object.values( response.data.flows );
						setFilteredFlows( newFlows );
						setAllFlows( newFlows, page_builder );
					}
				} );
			};

			getFlows();
		}

		return () => {
			isActive = false;
		};
	}, [ all_flows ] );

	const handleSearchFormSubmit = function ( event ) {
		event.preventDefault();

		if ( 'cancel' === searchBoxIcon ) {
			searchInputRef.current.value = '';
			searchOnChange( '' );
			setSearchValue( '' );
		}
	};

	const searchInputRef = createRef();
	//Need to check above conditions before useEffect.
	const [ filteredFlows, setFilteredFlows ] = useState( flows_list ); // eslint-disable-line
	const [ searchBoxIcon, setSearchBoxIcon ] = useState( 'search' ); // eslint-disable-line

	const searchOnChange = function ( term ) {
		if ( term && term.length >= 3 ) {
			setSearchBoxIcon( 'cancel' );
			const search_term = term.toLowerCase();

			const searchedFlows = flows_list.filter( function ( item ) {
				const flow_title =
					( item.title && item.title.toLowerCase() ) || '';

				return flow_title.includes( search_term );
			} );

			setSearchValue( term );
			setFilteredFlows( searchedFlows );
		} else {
			setSearchBoxIcon( 'search' );
			setFilteredFlows( flows_list );
		}
	};

	const [ visibility, setVisibility ] = useState( 'hide' ); // eslint-disable-line
	const [ flowName, setFlowName ] = useState( '' ); // eslint-disable-line

	return (
		<>
			<div className="wcf-flow-importer">
				{ Object.keys( preview ).length ? (
					<FlowPreview />
				) : (
					<>
						<div className="wcf-flow-importer__header bg-white px-8 py-6 flex justify-between items-center mb-9 -m-8">
							<h3 className="wcf-flow-importer__header-title text-2xl font-semibold text-gray-800">
								{ __(
									'Choose a Funnel Templates',
									'cartflows'
								) }
							</h3>

							<div className="wcf-flow-importer__actions gap-4 flex justify-between items-center">
								<div className="wcf-flow-importer__actions-content-left">
									<div className="wcf-flow-importer__actions-search">
										<form
											className="wcf-search-flows--form relative"
											onSubmit={ handleSearchFormSubmit }
										>
											<TextField
												attr={ { ref: searchInputRef } }
												label=""
												placeholder={ __(
													'Search Templates',
													'cartflows'
												) }
												class="input-field !pl-8 !px-4 !py-3 text-sm font-normal !rounded-md text-gray-400 !border-gray-200 focus:ring focus:!ring-primary-100 focus:!border-primary-500 focus:!shadow-none !outline-0 !outline-none"
												id="s"
												value={ searchValue }
												onChangeCB={ searchOnChange }
											/>
											<button
												className={ `wcf-search__button absolute inset-y-0 left-0 flex items-center pl-3 bg-transparent cursor-pointer m-0 ${
													'cancel' === searchBoxIcon
														? `top-1`
														: `top-px`
												}` }
											>
												{ 'search' ===
													searchBoxIcon && (
													<MagnifyingGlassIcon className="w-18 h-18 stroke-2 text-gray-400" />
												) }
												{ 'cancel' ===
													searchBoxIcon && (
													<XMarkIcon className="w-18 h-18 stroke-2 text-gray-400" />
												) }
											</button>
										</form>
									</div>
								</div>
								<div className="divider w-px bg-gray-200 h-7"></div>
								<div className="wcf-flow-importer__actions-content-right">
									<div className="wcf-flow-importer__actions-buttons">
										<Sync />
									</div>
								</div>
							</div>
						</div>
						{ flows_list.length < 1 && filteredFlows.length < 1 && (
							<FlowLibrarySkeleton />
						) }
						{ flows_list.length > 0 &&
							0 === filteredFlows.length && <Search404 /> }
						{ flows_list.length > 0 && 0 < filteredFlows.length && (
							<div className="wcf-flow-importer__list wcf-items-list grid grid-cols-4 gap-6">
								<FlowNamePopup
									visibility={ visibility }
									setVisibility={ setVisibility }
									type={ 'blank' }
									flowName={ flowName }
									setFlowName={ setFlowName }
								/>
								<div className="wcf-item wcf-item__start-from-blank h-full bg-white rounded-lg relative">
									<div
										className="wcf-item__inner relative cursor-pointer bg-gray-50 text-center h-full flex flex-col gap-4 items-center justify-center"
										onClick={ () => {
											setVisibility(
												'hide' === visibility
													? 'show'
													: 'hide'
											);
										} }
									>
										<div className="wcf-item__thumbnail-wrap">
											<div className="wcf-item__thumbnail">
												<div className="wcf-flow-importer__start-from-blank-icon bg-white p-6 rounded-full">
													<PlusIcon className="w-7 h-7 stroke-2 text-gray-400" />
												</div>
											</div>
										</div>

										<div className="wcf-item__heading-wrap border-t border-gray-200 absolute bottom-0 w-full">
											<div className="wcf-item__heading text-base text-gray-800 font-medium p-4 text-center">
												{ __(
													'Start from scratch',
													'cartflows'
												) }
											</div>
										</div>
									</div>
								</div>

								{ filteredFlows.map( ( item ) => (
									<FlowItem key={ item.ID } item={ item } />
								) ) }
							</div>
						) }
					</>
				) }
			</div>
		</>
	);
}

export default compose(
	withDispatch( ( dispatch ) => {
		const { setAllFlows } = dispatch( 'wcf/importer' );
		return {
			setAllFlows,
		};
	} )
)( Library );
