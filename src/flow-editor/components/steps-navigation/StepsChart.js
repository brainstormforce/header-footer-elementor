import React, { useState, useEffect, useCallback } from 'react';
import { useStateValue } from '@Utils/StateProvider';
import { sprintf, __ } from '@wordpress/i18n';
import './StepsChart.scss';
import './NodeStyles.scss';
import ReactFlow, {
	ReactFlowProvider,
	Background,
	isNode,
	Controls,
	ControlButton,
} from 'react-flow-renderer';
import CustomEdge from './ChartCustomEdge';
import Conditional from './ConditionalNode';
import LandingNode from './LandingNode';
import CheckoutNode from './CheckoutNode';
import OfferNode from './OfferNode';
import ThankyouNode from './ThankyouNode';
import OptinNode from './OptinNode';
import dagre from 'dagre';

const nodeWidth = 250;
const nodeHeight = 350;

const edgeTypes = {
	custom: CustomEdge,
};

const nodeTypes = {
	conditional: Conditional,
	landing: LandingNode,
	checkout: CheckoutNode,
	offer: OfferNode,
	thankyou: ThankyouNode,
	optin: OptinNode,
};

function StepsChart() {
	const [ { steps } ] = useStateValue();

	const [ newChartSteps, setnewChartSteps ] = useState( [] );
	const [ screenMode, setscreenMode ] = useState( '' );
	const [ showMsg, setshowMsg ] = useState( false );

	const dagreGraph = new dagre.graphlib.Graph();
	dagreGraph.setDefaultEdgeLabel( () => ( {} ) );

	const mode_class = '' !== screenMode ? 'wcf-fullscreen' : '';

	let chartSteps = [];
	const offer_steps = [ 'upsell', 'downsell' ];
	const edgeType = 'custom';
	const direction = cartflows_admin.is_rtl ? 'RL' : 'LR';

	const escFunction = useCallback( ( event ) => {
		if ( event.keyCode === 27 ) {
			document.body.classList.remove( 'wcf-flow-overview-screen' );
			setscreenMode( '' );
			fittoScreen();
		}
	}, [] );

	useEffect( () => {
		document.addEventListener( 'keydown', escFunction, false );

		return () => {
			document.removeEventListener( 'keydown', escFunction, false );
		};
	}, [] );

	const fittoScreen = () => {
		setTimeout( () => {
			const fitViewButton = document.getElementsByClassName(
				'react-flow__controls-fitview'
			)[ 0 ];
			fitViewButton.click();
		}, 50 );
	};

	const showFullScreen = () => {
		document.body.classList.add( 'wcf-flow-overview-screen' );
		setscreenMode( 'fullscreen' );
		setshowMsg( true );
		setTimeout( () => {
			setshowMsg( false );
		}, 3000 );
		fittoScreen();
	};

	const exitFullScreen = () => {
		document.body.classList.remove( 'wcf-flow-overview-screen' );
		setscreenMode( '' );
		fittoScreen();
	};

	const onLoad = () => {
		const fitViewButton = document.getElementsByClassName(
			'react-flow__controls-fitview'
		)[ 0 ];
		fitViewButton.click();

		//Add tooltip for buttons.
		fitViewButton.setAttribute( 'title', __( 'Fit View', 'cartflows' ) );

		const zoomInButton = document.getElementsByClassName(
			'react-flow__controls-zoomin'
		)[ 0 ];
		const zoomOutButton = document.getElementsByClassName(
			'react-flow__controls-zoomout'
		)[ 0 ];
		const lockButton = document.getElementsByClassName(
			'react-flow__controls-interactive'
		)[ 0 ];

		zoomInButton.setAttribute( 'title', __( 'Zoom In', 'cartflows' ) );
		zoomOutButton.setAttribute( 'title', __( 'Zoom Out', 'cartflows' ) );
		lockButton.setAttribute(
			'title',
			__( 'Lock Interaction', 'cartflows' )
		);
	};

	const screenModeButton = () => {
		if ( 'fullscreen' === screenMode ) {
			return (
				<ControlButton onClick={ exitFullScreen }>
					<span
						className="dashicons dashicons-fullscreen-exit-alt wcf-exit-full-screen"
						title={ __( 'Exit Full Screen', 'cartflows' ) }
					></span>
				</ControlButton>
			);
		}
		return (
			<ControlButton onClick={ showFullScreen }>
				<span
					className="dashicons dashicons-fullscreen-alt wcf-full-screen"
					title={ __( 'Full Screen', 'cartflows' ) }
				></span>
			</ControlButton>
		);
	};

	const getLayoutedElements = ( elements, dir = 'LR' ) => {
		const isHorizontal = false;
		dagreGraph.setGraph( { rankdir: dir } );

		elements.forEach( ( el ) => {
			if ( isNode( el ) ) {
				dagreGraph.setNode( el.id, {
					width: nodeWidth,
					height: nodeHeight,
				} );
			} else {
				dagreGraph.setEdge( el.source, el.target );
			}
		} );

		dagre.layout( dagreGraph );

		return elements.map( ( el ) => {
			if ( isNode( el ) ) {
				const nodeWithPosition = dagreGraph.node( el.id );
				el.targetPosition = isHorizontal ? 'left' : 'top';
				el.sourcePosition = isHorizontal ? 'right' : 'bottom';
				el.position = {
					x:
						nodeWithPosition.x -
						nodeWidth / 2 +
						Math.random() / 1000,
					y: nodeWithPosition.y - nodeHeight / 2,
				};
			}

			return el;
		} );
	};

	const prepareChart = function () {
		chartSteps = [];

		createNodes();
		createEdges();

		if ( chartSteps.length > 0 ) {
			const newChart = getLayoutedElements( chartSteps, direction );

			if ( newChartSteps.length === 0 ) {
				setnewChartSteps( newChart );
			}
		}
	};

	const createNodes = function () {
		const position = { x: 0, y: 0 };
		steps.map( ( step, index ) => {
			if (
				! wcfCartflowsTypePlusPro() &&
				offer_steps.includes( step.type )
			) {
				return false;
			}

			let nodeType = step.type;
			const viewPageLink = step.actions.view.link;
			const editPageLink = step.page_builder_edit.replace(
				/&amp;/g,
				'&'
			);
			const editSettingsLink = step.actions.edit.link;

			if ( offer_steps.includes( step.type ) ) {
				nodeType = 'offer';
			}

			const conditions = step.conditions;
			if (
				'checkout' === step.type &&
				'undefined' !== typeof conditions
			) {
				conditions.map( ( group, c_index ) => {
					const c_data = {
						id: group.group_id,
						type: 'conditional', // input node
						data: {
							label: sprintf(
								/* translators: %d is replaced with the condition number */
								__( 'Condition %d', 'cartflows' ),
								c_index + 1
							),
							group_id: group.group_id,
							// ruleFun: ruleSettings,
							step_id: step.id,
							editSettings: editSettingsLink,
							viewPageLink,
							direction,
						},
						position,
					};

					chartSteps.push( c_data );
					return '';
				} );

				const Checkoutdata = {
					id: step.id,
					type: nodeType, // input node
					data: {
						label: step.title,
						step_id: step.id,
						index,
						editPage: editPageLink,
						editSettings: editSettingsLink,
						viewPageLink,
						direction,
					},
					position,
				};

				chartSteps.push( Checkoutdata );
			} else {
				const data = {
					id: step.id,
					type: nodeType, // input node
					data: {
						label: step.title,
						step_type: step.type,
						editPage: editPageLink,
						editSettings: editSettingsLink,
						viewPageLink,
						index,
						direction,
					},
					position,
				};

				chartSteps.push( data );
			}
			return '';
		} );
	};

	const createEdges = function () {
		let previousStep = false;
		let previousStepData = false;
		steps.map( ( step ) => {
			if (
				offer_steps.includes( previousStepData.type ) &&
				! wcfCartflowsTypePlusPro()
			) {
				return false;
			}

			if ( previousStep ) {
				if (
					offer_steps.includes( previousStepData.type ) &&
					'undefined' !== typeof previousStepData.offer_yes_step_id
				) {
					createOfferEdges( previousStep, previousStepData, step );
				} else if (
					'checkout' === previousStepData.type &&
					'undefined' !== typeof previousStepData.conditions
				) {
					createRulesEdges( previousStep, previousStepData );
				} else {
					const edgeData = {
						id: `${ previousStep }-${ step.id }-edge`,
						type: edgeType,
						source: previousStep,
						target: step.id,
					};

					chartSteps.push( edgeData );
				}
			}
			//Update previous step
			previousStep = step.id;
			previousStepData = step;

			return '';
		} );
	};

	const createOfferEdges = function ( previousStep, previousStepData, step ) {
		const edgeDataA = {
			id: `${ previousStep }-${ step.id }-edge-a`,
			type: edgeType,
			source: previousStep,
			sourceHandle: 'a',
			target: previousStepData.offer_yes_step_id,
			label: __( 'Accepted', 'cartflows' ),
			labelBgStyle: {
				fill: '#dff0d8',
			},
			labelStyle: { fill: '#000', fontWeight: 600 },
			labelBgPadding: [ 8, 4 ],
		};

		const edgeDataB = {
			id: `${ previousStep }-${ step.id }-edge-b`,
			type: edgeType,
			source: previousStep,
			sourceHandle: 'b',
			target: previousStepData.offer_no_step_id,
			label: __( 'Rejected', 'cartflows' ),
			labelBgStyle: {
				fill: '#f2dede',
			},
			labelStyle: { fill: '#000', fontWeight: 600 },
			labelBgPadding: [ 8, 4 ],
		};

		chartSteps.push( edgeDataA, edgeDataB );
		return '';
	};

	const createRulesEdges = function ( previousStep, previousStepData ) {
		previousStepData.conditions.map( ( group, index ) => {
			//Output edge 1
			const c_edgeDataA = {
				id: `${ group.group_id }-${ group.step_id }-edge-a`,
				type: edgeType,
				source: group.group_id,
				sourceHandle: 'a',
				target: group.step_id,
				label: __( 'True', 'cartflows' ),
				labelBgStyle: {
					fill: '#dff0d8',
				},
				labelStyle: { fill: '#000', fontWeight: 600 },
				labelBgPadding: [ 8, 4 ],
			};

			let nodeTarget = '';

			const nextGroup = previousStepData.conditions[ index + 1 ];
			if ( 'undefined' === typeof nextGroup ) {
				nodeTarget = previousStepData.default_step;
			} else {
				nodeTarget = nextGroup.group_id;
			}

			//Output edge 2.
			const c_edgeDataB = {
				id: `${ group.group_id }-${ nodeTarget }-edge-b`,
				type: edgeType,
				source: group.group_id,
				sourceHandle: 'b',
				target: nodeTarget,
				label: __( 'False', 'cartflows' ),
				labelBgStyle: {
					fill: '#f2dede',
				},
				labelStyle: { fill: '#000', fontWeight: 600 },
				labelBgPadding: [ 8, 4 ],
			};

			//Input edge from checkout step
			if ( 0 === index ) {
				const edgeData = {
					id: `${ previousStep }-${ group.group_id }-edge`,
					type: edgeType,
					source: previousStep,
					target: group.group_id,
				};

				chartSteps.push( edgeData );
			}

			chartSteps.push( c_edgeDataA, c_edgeDataB );
			return '';
		} );
	};

	prepareChart();

	if ( newChartSteps.length === 0 ) {
		return (
			<div className="wcf-steps-chart loading">
				<div className="wcf-step-chart-loader">
					<div className="dot-loader"></div>
					<div className="dot-loader dot-loader--2"></div>
					<div className="dot-loader dot-loader--3"></div>
				</div>
			</div>
		);
	}

	const direction_css = { direction: 'initial' };

	return (
		<div
			className={ `wcf-steps-chart ${ mode_class }` }
			style={ direction_css }
		>
			{ newChartSteps && (
				<ReactFlowProvider>
					<ReactFlow
						elements={ newChartSteps }
						maxZoom={ 1 }
						edgeTypes={ edgeTypes }
						nodeTypes={ nodeTypes }
						arrowHeadColor={ '#2271B1' }
						onLoad={ onLoad }
						defaultPosition={ [ 0, 0 ] }
						zoomOnScroll={ false }
						panOnScroll={ false }
						panOnScrollMode="vertical"
						elementsSelectable={ true }
						preventScrolling={ false }
					>
						<Background
							style={ { backgroundColor: '#F5F5F5' } }
							variant="lines"
							size="1"
							gap="60"
							color="#E8E8E8"
						/>
						<Controls style={ { right: '10px', left: 'unset' } }>
							{ screenModeButton() }
						</Controls>
						{ showMsg && (
							<div className="wcf-steps-chart__exit-screen-msg">
								{ __(
									'Press ESC to exit full screen.',
									'cartflows'
								) }
							</div>
						) }
					</ReactFlow>
				</ReactFlowProvider>
			) }
		</div>
	);
}

export default StepsChart;
