import React from 'react';
import ReactHtmlParser from 'react-html-parser';

function DocField( props ) {
	const { content, custom_class = '' } = props;

	return (
		<div className={ `wcf-field wcf-doc-field ${ custom_class }` }>
			{ content && (
				<div className="wcf-field__doc-content text-sm font-normal text-gray-400 mt-5 text-left">
					{ ReactHtmlParser( content ) }
				</div>
			) }
		</div>
	);
}

export default DocField;
