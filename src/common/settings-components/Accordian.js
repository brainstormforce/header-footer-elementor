import React, { useState } from 'react';
import './Accordian.scss';
import SettingTable from '@Admin/common/global-settings/SettingTable';

import facebook from '@Images/social-media/facebook.png';
import google from '@Images/social-media/google.png';

function Accordian( props ) {
	const [ collapse, setCollapse ] = useState( 'collapsed' );

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

	const get_accordian_icon = function () {
		let icon = '';

		switch ( props.meta_key ) {
			case '_cartflows_facebook':
				icon = facebook;
				break;
			case '_cartflows_google_analytics':
			case '_cartflows_google_auto_address':
				icon = google;
				break;

			default:
				icon = '';
				break;
		}

		return icon;
	};

	return (
		<div
			className={ `wcf-${ accordion_class } accordion-item bg-white border border-gray-200 rounded-md mb-5` }
		>
			<h2
				className="accordion-header mb-0"
				id={ `wcf_${ accordion_id }_toggler`.toLowerCase() }
			>
				<button
					className={ `accordion-button relative flex gap-2 items-center w-full py-3.5 px-4 !text-base !text-gray-800 text-left bg-white
					border-0
					rounded-md
					!shadow-none
					transition
					focus:outline-none
					${ collapse }` }
					type="button"
					data-bs-toggle="collapse"
					data-bs-target={ `#wcf_collapse_${ accordion_id }` }
					aria-expanded="false"
					aria-controls={ `wcf_collapse_${ accordion_id }` }
					onClick={ handleCollapse }
				>
					<span>
						<img src={ get_accordian_icon() } alt={ props.title } />
					</span>
					<span>{ props.title }</span>
				</button>
			</h2>
			<div
				id={ `wcf_collapse_${ accordion_id }` }
				className={ `accordion-collapse ${ collapse }` }
				aria-labelledby={ `wcf_${ accordion_id }_toggler` }
			>
				<div className="accordion-body py-4 px-5 bg-gray-50">
					<SettingTable
						settings={ props.settings }
						meta_key={ props.meta_key }
					/>
				</div>
			</div>
		</div>
	);
}

export default Accordian;
