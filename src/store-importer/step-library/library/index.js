// External Dependences.
import React, { useState, createRef, useEffect } from 'react';
import { useStateValue } from '@Utils/StateProvider';
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
// Internal Components.
import { TextField } from '@Fields';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Sync from '@Admin/importer/sync';
import Creator from '../creator';
import Template from './template';

function Library() {
	const [ { page_builder } ] = useStateValue();
	const [ searchBoxIcon, setSearchBoxIcon ] = useState( 'search' ); // eslint-disable-line
	const [ currentStep, setcurrentStep ] = useState( 'upsell' ); // eslint-disable-line
	const [ searchValue, setSearchValue ] = useState( '' );
	const searchInputRef = createRef();

	//Need to check above conditions before useEffect.
	const { all_step_templates } = useSelect( ( select ) => {
		return {
			all_step_templates: select( 'wcf/importer' ).getAllStepTemplates(),
		};
	} );

	const stepTemplates = [];
	all_step_templates.forEach( ( element ) => {
		if ( currentStep === element.type ) {
			stepTemplates.push( element );
		}
	} );

	const [ filteredSteps, setFilteredSteps ] = useState( stepTemplates ); // eslint-disable-line

	useEffect( () => {
		setFilteredSteps( stepTemplates );
	}, [ currentStep ] );

	const searchOnChange = function ( term ) {
		if ( term && term.length >= 3 ) {
			setSearchBoxIcon( 'cancel' );
			const search_term = term.toLowerCase();

			const searchedSteps = filteredSteps.filter( function ( item ) {
				const step_title =
					( item.title && item.title.toLowerCase() ) || '';

				return step_title.includes( search_term );
			} );
			setSearchValue( term );
			setFilteredSteps( searchedSteps );
		} else {
			setSearchBoxIcon( 'search' );
			setFilteredSteps( stepTemplates );
		}
	};

	const handleSearchStepsFormSubmit = function ( event ) {
		event.preventDefault();

		if ( 'cancel' === searchBoxIcon ) {
			searchInputRef.current.value = '';
			searchOnChange( '' );
			setSearchValue( '' );
		}
	};

	return (
		<div
			className={ `wcf-step-library wcf-step-library-${ page_builder }` }
		>
			<div className="wcf-step-library__header bg-white px-8 py-6 flex justify-between items-center mb-9 -m-8">
				<h3 className="text-2xl font-semibold text-gray-800">
					{ __( 'Steps Library', 'cartflows' ) }
				</h3>
				{ 'other' !== page_builder && (
					<>
						<div className="gap-4 flex justify-between">
							<form
								className="wcf-search-steps--form relative"
								onSubmit={ handleSearchStepsFormSubmit }
							>
								<TextField
									attr={ { ref: searchInputRef } }
									label=""
									placeholder={ __(
										'Search Steps',
										'cartflows'
									) }
									id="s"
									value={ searchValue }
									class="input-field !pl-8 !px-4 !py-3 text-sm font-normal !rounded-md text-gray-400 !border-gray-200 focus:ring focus:!ring-primary-100 focus:!border-primary-500 focus:!shadow-none !outline-0 !outline-none"
									onChangeCB={ searchOnChange }
								/>

								<button
									className={ `wcf-search__button absolute inset-y-0 left-0 flex items-center pl-3 bg-transparent cursor-pointer m-0` }
								>
									{ 'search' === searchBoxIcon && (
										<MagnifyingGlassIcon className="w-18 h-18 stroke-2 text-gray-400" />
									) }
									{ 'cancel' === searchBoxIcon && (
										<XMarkIcon className="w-18 h-18 stroke-2 text-gray-400" />
									) }
								</button>
							</form>
							<span className="divider w-px bg-gray-200"></span>
							<Sync template={ 'store-checkout' } />
						</div>
					</>
				) }
			</div>

			<div className="wcf-step-library__body">
				<div className="wcf-remote-content">
					{ 'other' !== page_builder && (
						<>
							<div className={ 'wcf-ready-templates' }>
								<Template
									templates={ filteredSteps }
									currentStep={ currentStep }
									setcurrentStepCB={ setcurrentStep }
								/>
							</div>
						</>
					) }
					{ 'other' === page_builder && (
						<>
							<div className="wcf-start-from-scratch current h-96 mx-auto w-3/6">
								<Creator />
							</div>
						</>
					) }
				</div>
			</div>
		</div>
	);
}

export default Library;
