import React from 'react';

import './Text.scss';

function TextSkeleton( props ) {
	const { fontSize, width, style } = props;

	return (
		<div
			className="wcf-skeleton bg-gray-200 block leading-5 wcf-skeleton--text wcf-skeleton--wave"
			style={ {
				fontSize,
				width,
				...style,
			} }
		></div>
	);
}

export default TextSkeleton;
