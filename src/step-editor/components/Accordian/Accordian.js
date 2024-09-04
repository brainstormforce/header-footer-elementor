// Default React packages.
import React, { useState } from 'react';
// import { __ } from '@wordpress/i18n';

// Import components.
import ListOptions from '@Editor/components/list-options/ListOptions';

// Load CSS files.
import './Accordian.scss';

// Import required icons.
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

function Accordian( props ) {
	const [ collapse, setCollapse ] = useState(
		props.isOpen ? '' : 'collapsed'
	);

	const handleCollapse = function () {
		if ( 'collapsed' === collapse ) {
			setCollapse( '' );
		} else {
			setCollapse( 'collapsed' );
		}
	};
	const accordion_id = props.settings.title
			.replace( / /g, '_' )
			.toLowerCase(),
		accordion_class = props.settings.title
			.replace( / /g, '-' )
			.toLowerCase();

	return (
		<div
			className={ `wcf-${ accordion_class } accordion-item bg-white -mx-8 border-b border-gray-200 ${
				false === props?.isActive ? 'hidden' : ''
			}` }
		>
			<h2
				className="accordion-header mb-0"
				id={ `wcf_${ accordion_id }_toggler`.toLowerCase() }
			>
				<button
					className={ `wcf-accordion-button relative flex justify-between items-center w-full py-4 px-8 text-base font-semibold text-gray-800 text-left transition focus:outline-none ${ collapse }` }
					type="button"
					data-bs-toggle="collapse"
					data-bs-target={ `#wcf_collapse_${ accordion_id }` } //"#collapseTwo5"
					aria-expanded="false"
					aria-controls={ `wcf_collapse_${ accordion_id }` }
					onClick={ handleCollapse }
				>
					<span>{ props.settings.title }</span>
					{ '' === collapse ? (
						<ChevronUpIcon
							className="w-5 h-5 text-gray-400"
							aria-hidden="true"
						/>
					) : (
						<ChevronDownIcon
							className="w-5 h-5 text-gray-400"
							aria-hidden="true"
						/>
					) }
				</button>
			</h2>
			<div
				id={ `wcf_collapse_${ accordion_id }` }
				className={ `accordion-collapse px-8 pt-4 pb-8 ${ collapse }` }
				aria-labelledby={ `wcf_${ accordion_id }_toggler` }
			>
				<div className="accordion-body">
					<ListOptions
						settings={ props.settings }
						displayAs={ props.displayAs ? props.displayAs : 'tr' }
					/>
				</div>
			</div>
		</div>
	);
}

export default Accordian;
