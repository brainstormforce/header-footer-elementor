import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import './Tooltip.scss';
import { QuestionMarkCircleIcon } from '@heroicons/react/24/outline';
import classnames from 'classnames';

function Tooltip( props ) {
	const {
		text,
		position = 'default',
		classes = 'text-gray-400',
		descClass = '',
		icon = '',
	} = props;
	return (
		<div
			className={ classnames(
				classes,
				'wcf-tooltip-icon !cursor-pointer ml-1',
				'default' !== position
					? 'wcf-tooltip-position--' + position
					: ''
			) }
		>
			{ '' === icon ? (
				<QuestionMarkCircleIcon className={ `w-4 h-4 stroke-2` } />
			) : (
				icon
			) }

			{ '' !== text && (
				<span className={ `wcf-tooltip-text ${ descClass }` }>
					{ ReactHtmlParser( text ) }
				</span>
			) }
		</div>
	);
}

export default Tooltip;
