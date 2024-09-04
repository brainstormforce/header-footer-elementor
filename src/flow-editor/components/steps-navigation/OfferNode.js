import React, { memo } from 'react';
import { Handle } from 'react-flow-renderer';
import { validateTitleField } from '@Utils/Helpers';
import upsell_page from '@Images/upsell_step.svg';
import downsell_page from '@Images/downsell_step.svg';
import CanvasHelper from './CanvasHelper';

export default memo( ( { data, isConnectable } ) => {
	const offerImgage =
		'upsell' === data.step_type ? upsell_page : downsell_page;

	const left_handle_type = 'LR' === data.direction ? 'target' : 'source';
	const right_handle_type = 'LR' === data.direction ? 'source' : 'target';
	return (
		<>
			{ 'LR' === data.direction && (
				<Handle
					type={ left_handle_type }
					position="left"
					style={ { background: '#555' } }
					onConnect={ ( params ) =>
						console.log( 'handle onConnect', params )
					}
					className="react-flow__handle wcf-handle-left"
					isConnectable={ isConnectable }
				/>
			) }
			{ 'RL' === data.direction && (
				<>
					<Handle
						type={ left_handle_type }
						position="left"
						className="react-flow__handle-right-a"
						id="a"
						style={ { top: 80 } }
						isConnectable={ isConnectable }
					/>
					<Handle
						type={ left_handle_type }
						position="left"
						className="react-flow__handle-right-b"
						id="b"
						style={ { bottom: 110, top: 'auto' } }
						isConnectable={ isConnectable }
					/>
				</>
			) }
			{ CanvasHelper.nodeHtml(
				offerImgage,
				data.viewPageLink,
				data.editPage,
				data.editSettings
			) }
			<div className="wcf-custom-node-label">
				{ validateTitleField( data.label, 20, 15 ) }
			</div>

			{ 'LR' === data.direction && (
				<>
					<Handle
						type={ right_handle_type }
						position="right"
						className="react-flow__handle-right-a"
						id="a"
						style={ { top: 80 } }
						isConnectable={ isConnectable }
					/>
					<Handle
						type={ right_handle_type }
						position="right"
						className="react-flow__handle-right-b"
						id="b"
						style={ { bottom: 110, top: 'auto' } }
						isConnectable={ isConnectable }
					/>
				</>
			) }
			{ 'RL' === data.direction && (
				<Handle
					type={ right_handle_type }
					position="right"
					style={ { background: '#555' } }
					onConnect={ ( params ) =>
						console.log( 'handle onConnect', params )
					}
					className="react-flow__handle wcf-handle-left"
					isConnectable={ isConnectable }
				/>
			) }
		</>
	);
} );
