import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSettingsStateValue } from '@SettingsApp/utils/StateProvider';
import { __ } from '@wordpress/i18n';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

function FlowPagination( { currentPage, maxPages } ) {
	const [ {}, dispatch ] = useSettingsStateValue();
	const query = new URLSearchParams( useLocation().search );
	const current_post_status = query.get( 'post_status' );
	let post_status = '';

	if ( current_post_status ) {
		post_status = '&post_status=' + current_post_status;
	}
	const getPagination = function () {
		const current = currentPage;
		const total = maxPages;

		const center = [
				current - 2,
				current - 1,
				current,
				current + 1,
				current + 2,
			],
			filteredCenter = center.filter( ( p ) => p > 1 && p < total ),
			includeLeftDots = current > 4,
			includeRightDots = current < total - 3;

		if ( includeLeftDots ) {
			filteredCenter.unshift( '...' );
		}
		if ( includeRightDots ) {
			filteredCenter.push( '...' );
		}

		return [ 1, ...filteredCenter, total ];
	};

	const pagination_data = getPagination();

	const doPagination = function () {
		const pagination_markup = [];

		if ( pagination_data ) {
			pagination_data.map( ( page, i ) => {
				pagination_markup.push(
					<Link
						key={ i }
						to={ {
							pathname: 'admin.php',
							search: `?page=cartflows&path=flows${ post_status }&paged=${ page }`,
						} }
						className={ `wcf-flows-pagination__num relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-600 hover:text-primary-500 focus:text-primary-500 focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 ${
							currentPage === page &&
							'bg-primary-25 border border-primary-300 rounded text-primary-600'
						}` }
						onClick={ handleClickEvent }
					>
						{ page }
					</Link>
				);
				return '';
			} );
		}

		return pagination_markup;
	};

	const handleClickEvent = function () {
		dispatch( {
			type: 'SET_FLOWS',
			flows: null,
		} );
	};

	if ( 1 === maxPages ) {
		return '';
	}

	return (
		<div className="wcf-flows--pagination-actions bg-white p-5 rounded-b-xl">
			<div className="wcf-flows-pagination flex items-center justify-between">
				<div className="wcf-next-previous-buttons-mobile flex flex-1 justify-between sm:hidden">
					<a
						href="#"
						className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
					>
						{ __( 'Previous', 'cartflows' ) }
					</a>
					<a
						href="#"
						className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
					>
						{ __( 'Next', 'cartflows' ) }
					</a>
				</div>

				<div className="wcf-pagination-pages-button hidden sm:flex sm:flex-1 sm:items-center sm:justify-end">
					{ /* <div>
						<p className="text-sm text-gray-700">
							Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
							<span className="font-medium">97</span> results
						</p>
					</div> */ }
					<div>
						<nav
							className="isolate inline-flex -space-x-px rounded-md shadow-sm gap-3"
							aria-label="Pagination"
						>
							<div className="wcf-pagination-page-buttons border border-gray-200 rounded">
								{ doPagination() }
							</div>
							<div className="wcf-pagination-action-buttons flex border border-gray-200 rounded">
								<Link
									key="first"
									to={ {
										pathname: 'admin.php',
										search: `?page=cartflows&path=flows${ post_status }`,
									} }
									className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 hover:bg-primary-50 hover:text-primary-500 focus:z-20 focus:outline-offset-0"
									onClick={ handleClickEvent }
								>
									<span className="sr-only">
										{ __( 'Previous', 'cartflows' ) }
									</span>
									<ChevronLeftIcon
										className="h-18 w-18"
										aria-hidden="true"
									/>
								</Link>
								<Link
									key="last"
									to={ {
										pathname: 'admin.php',
										search: `?page=cartflows&path=flows${ post_status }&paged=${ maxPages }`,
									} }
									className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 hover:bg-primary-50 hover:text-primary-500 focus:z-20 focus:outline-offset-0"
									onClick={ handleClickEvent }
								>
									<span className="sr-only">
										{ __( 'Next', 'cartflows' ) }
									</span>
									<ChevronRightIcon
										className="h-18 w-18"
										aria-hidden="true"
									/>
								</Link>
							</div>
						</nav>
					</div>
				</div>
			</div>
		</div>
	);
}

export default FlowPagination;
