import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import './SubHeadingField.scss';

function SubHeadingField( props ) {
	const { subClass = '', label, desc } = props;

	return (
		<div className="wcf-field wcf-sub-heading-field">
			{ label && (
				<div className={ `wcf-field__data--label ${ subClass }` }>
					<label>{ label }</label>
				</div>
			) }

			{ desc && (
				<div className="wcf-field__desc text-sm font-regular">
					{ ReactHtmlParser( desc ) }
				</div>
			) }
		</div>
	);
}

export default SubHeadingField;
