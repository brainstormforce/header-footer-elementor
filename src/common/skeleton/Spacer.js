import React from 'react';

function SpacerSkeleton( props ) {
	const { height, style } = props;

	return (
		<div
			className="wcf-skeleton-base wcf-skeleton--spacer h-6"
			style={ {
				height,
				...style,
			} }
		></div>
	);
}

export default SpacerSkeleton;
