import { useState, useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import SubSection from './SubSection';
import SearchResults from './SearchResults';
import { InputText } from '@Fields';
import apiFetch from '@wordpress/api-fetch';
import {
	LifebuoyIcon,
	ArrowSmallRightIcon,
	BookOpenIcon,
	ArrowTopRightOnSquareIcon,
	PlayCircleIcon,
	MagnifyingGlassIcon,
	XMarkIcon,
	ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

const Docs = ( { setOpen } ) => {
	const [ searchKeyword, setSearchKeyword ] = useState( '' );
	const [ searchResults, setSearchResults ] = useState( null );
	const [ syncBtnText, setSyncBtnText ] = useState(
		__( 'Sync Knowledge Base', 'cartflows' )
	);

	useEffect( () => {
		filterDocs();
	}, [ searchKeyword ] );

	function filterDocs() {
		if ( searchKeyword === '' ) {
			setSearchResults( null );
		} else {
			const data = cartflows_admin.cf_docs_data.docs.filter( ( item ) =>
				item.title.toLowerCase().includes( searchKeyword )
			);
			setSearchResults( data );
		}
	}

	function syncDocs( e ) {
		e.preventDefault();

		setSyncBtnText( __( 'Syncing…', 'cartflows' ) );
		const formData = new window.FormData();

		formData.append( 'action', 'cartflows_sync_kb_docs' );
		formData.append( 'security', cartflows_admin.sync_kb_docs_nonce );
		apiFetch( {
			url: cartflows_admin.ajax_url,
			method: 'POST',
			body: formData,
		} ).then( () => {
			setSyncBtnText( __( 'Synced. Reloading..', 'cartflows' ) );
			window.location.reload();
		} );
	}

	return (
		<main className="bg-white">
			<div className="wcf-docs--header w-full flex justify-between items-center bg-white px-8 py-6 border-b border-gray-200">
				<div className="wcf-docs-header--title flex items-center gap-10">
					<h1 className="wcf-docs--heading text-2xl font-semibold text-gray-800">
						{ __( 'Knowledge Base', 'cartflows' ) }
					</h1>
					{ cartflows_admin.cf_docs_data.length !== 0 && (
						<div className="wcf-docs--search relative">
							<InputText
								type="search"
								placeholder={ __(
									'Search knowledge base',
									'cartflows'
								) }
								class="cf-docs-search--field !leading-none !pl-10 !px-4 !py-3 text-sm font-normal !rounded-md text-gray-400 !border-gray-200 focus:ring focus:!ring-primary-100 focus:!border-primary-500 focus:!shadow-none !outline-0 !outline-none !placeholder-gray-400"
								onChangeCB={ setSearchKeyword }
							/>
							<div className="wcf-docs--search-close absolute top-1/2 -translate-y-1/2 left-3 text-gray-400 cursor-pointer hover:text-primary-500 ">
								<MagnifyingGlassIcon className="h-5 w-5" />
							</div>
						</div>
					) }
				</div>
				<div className="wcf-docs--close-button flex items-center">
					<button onClick={ () => setOpen( false ) }>
						<XMarkIcon className="h-7 w-7 text-gray-500" />
					</button>
				</div>
			</div>
			<div className="wcf-docs--content mx-auto w-full flex flex-col">
				<div className="flex flex-col lg:flex-row gap-5">
					<div className="wcf-docs--docs-list flex-1 pl-8 py-6 pr-1.5 border-r border-gray-200">
						<div className="overflow-y-auto max-h-[610px] pr-2.5">
							{ searchResults && searchResults.length > 0 && (
								<div className="mb-8">
									<SearchResults data={ searchResults } />
								</div>
							) }

							{ /* Docs subsections */ }
							{ cartflows_admin.cf_docs_data &&
								cartflows_admin.cf_docs_data.categories &&
								Object.entries(
									cartflows_admin.cf_docs_data.categories
								).map( ( item, index ) => (
									<SubSection key={ index } item={ item } />
								) ) }

							{ /* Display the template if no docs are not found. */ }
							{ cartflows_admin.cf_docs_data.length === 0 && (
								<div className="wcf-docs--no-flows-box h-full flex items-center justify-center">
									<div className="text-center">
										<ExclamationTriangleIcon
											className="mx-auto h-12 w-12 text-gray-400 stroke-1"
											aria-hidden="true"
										/>
										<h3 className="text-base font-semibold text-gray-800">
											{ __(
												'No Docs Founds',
												'cartflows'
											) }
										</h3>
										<p className="mt-1 text-sm text-gray-500">
											{ __(
												'Please try syncing the docs library',
												'cartflows'
											) }
										</p>
										<div className="mt-6">
											<button
												type="button"
												className="wcf-button wcf-primary-button"
												onClick={ syncDocs }
											>
												{ syncBtnText }
											</button>
										</div>
									</div>
								</div>
							) }
						</div>
					</div>

					<div className="wcf-docs--help-section py-6 pr-6 w-1/3">
						<div className="wcf-docs--help-box p-6 border border-gray-200 rounded-lg">
							<div className="flex gap-4">
								<div className="">
									<LifebuoyIcon className="h-6 w-6 text-gray-400" />
								</div>
								<div>
									<span className="flex align-center">
										<h3 className="text-base font-medium text-gray-800 flex">
											{ __( 'Need Help?', 'cartflows' ) }
										</h3>
									</span>
									<div className="mt-2 text-sm text-gray-400 font-normal">
										{ __(
											'We aim to answer all priority support requests within 2-3 hours.',
											'cartflows'
										) }
										<div>
											<a
												href="https://cartflows.com/support"
												className="mt-2 inline-flex gap-1.5 items-center text-primary-500 hover:text-primary-600 text-sm font-medium"
												target={ '_blank' }
												rel="noreferrer"
											>
												{ __(
													'Get Support',
													'cartflows'
												) }
												<ArrowSmallRightIcon className="h-4 w-4" />
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="wcf-docs--help-box--all-docs p-6 border border-gray-200 rounded-lg mt-4">
							<div className="flex gap-4">
								<div className="">
									<BookOpenIcon className="h-6 w-6 text-gray-400" />
								</div>
								<div>
									<span className="flex align-center">
										<h3 className="text-base font-medium text-gray-800 flex">
											{ __(
												'All Documentation',
												'cartflows'
											) }
										</h3>
									</span>
									<div className="mt-2 text-sm text-gray-400 font-normal">
										{ __(
											'Browse documentation, reference material, and tutorials for CartFlows.',
											'cartflows'
										) }
										<div>
											<a
												href="https://cartflows.com/docs"
												className="mt-2 inline-flex gap-1.5 items-center text-primary-500 hover:text-primary-600 text-sm font-medium"
												target={ '_blank' }
												rel="noreferrer"
											>
												{ __(
													'View documentation',
													'cartflows'
												) }
												<ArrowTopRightOnSquareIcon className="h-4 w-4" />
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="wcf-docs--help-box--all-videos p-6 border border-gray-200 rounded-lg mt-4">
							<div className="flex gap-4">
								<div className="">
									<PlayCircleIcon className="h-6 w-6 text-gray-400" />
								</div>
								<div>
									<span className="flex align-center">
										<h3 className="text-base font-medium text-gray-800 flex">
											{ __( 'Videos', 'cartflows' ) }
										</h3>
									</span>
									<div className="mt-2 text-sm text-gray-400 font-normal">
										{ __(
											'Browse tutorial videos on our YouTube channel.',
											'cartflows'
										) }
										<div>
											<a
												href="https://www.youtube.com/c/CartFlows"
												className="mt-2 inline-flex gap-1.5 items-center text-primary-500 hover:text-primary-600 text-sm font-medium"
												target={ '_blank' }
												rel="noreferrer"
											>
												{ __(
													'Youtube Channel',
													'cartflows'
												) }
												<ArrowTopRightOnSquareIcon className="h-4 w-4" />
											</a>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
};

export default Docs;
