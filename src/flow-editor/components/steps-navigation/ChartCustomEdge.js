import React from 'react';
import {
	getBezierPath,
	getMarkerEnd,
	getEdgeCenter,
	Position,
	EdgeText,
} from 'react-flow-renderer';

import './ChartCustomEdge.scss';

export default function CustomEdge( props ) {
	const {
		id,
		sourceX,
		sourceY,
		targetX,
		targetY,
		sourcePosition,
		targetPosition,
		style = {},
		arrowHeadType = 'arrowclosed',
		markerEndId,
		label,
		labelStyle,
		labelShowBg,
		labelBgStyle,
		labelBgPadding,
		labelBgBorderRadius,
	} = props;

	const markerEnd = getMarkerEnd( arrowHeadType, markerEndId );

	const [ _centerX, _centerY ] = getEdgeCenter( {
		sourceX,
		sourceY,
		targetX,
		targetY,
	} );
	const leftAndRight = [ Position.Left, Position.Right ];

	const cX = _centerX;
	const cY = _centerY;

	let path = `M${ sourceX },${ sourceY } C${ sourceX },${ cY } ${ targetX },${ cY } ${ targetX },${ targetY }`;
	const curvature = 0.5;

	const is_rtl = cartflows_admin.is_rtl;
	if (
		leftAndRight.includes( sourcePosition ) &&
		leftAndRight.includes( targetPosition ) &&
		! is_rtl
	) {
		// Curvature.
		const hx1 = sourceX + Math.abs( targetX - sourceX ) * curvature;
		const hx2 = targetX - Math.abs( targetX - sourceX ) * curvature;

		path = `M${ sourceX },${ sourceY } C${ hx1 },${ sourceY } ${ hx2 },${ targetY } ${ targetX },${ targetY }`;
	} else if ( leftAndRight.includes( targetPosition ) && ! is_rtl ) {
		path = `M${ sourceX },${ sourceY } C${ sourceX },${ targetY } ${ sourceX },${ targetY } ${ targetX },${ targetY }`;
	} else if ( leftAndRight.includes( sourcePosition && ! is_rtl ) ) {
		path = `M${ sourceX },${ sourceY } C${ targetX },${ sourceY } ${ targetX },${ sourceY } ${ targetX },${ targetY }`;
	} else {
		path = getBezierPath( {
			sourceX,
			sourceY,
			sourcePosition,
			targetX,
			targetY,
			targetPosition,
		} );
	}

	const edgePath = path;

	const text = label ? (
		<EdgeText
			x={ cX }
			y={ cY }
			label={ label }
			labelStyle={ labelStyle }
			labelShowBg={ labelShowBg }
			labelBgStyle={ labelBgStyle }
			labelBgPadding={ labelBgPadding }
			labelBgBorderRadius={ labelBgBorderRadius }
		/>
	) : null;

	return (
		<>
			<path
				id={ id }
				style={ style }
				className="react-flow__edge-path"
				d={ edgePath }
				markerEnd={ markerEnd }
			/>
			{ text }
		</>
	);
}
