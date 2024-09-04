import React from 'react';

function RectSkeleton( props ) {
	const { width, height, style } = props;

	return (
		<div
			className="wcf-skeleton block leading-5 wcf-skeleton--rect bg-gray-200 rounded-md animate-pulse"
			style={ {
				width,
				height,
				...style,
			} }
		></div>
	);
}

export default RectSkeleton;
