import React, { memo } from 'react';
import { Handle } from 'react-flow-renderer';
import { __ } from '@wordpress/i18n';
import { validateTitleField } from '@Utils/Helpers';
import conditional from '@Images/conditional.svg';

export default memo( ( { data, isConnectable } ) => {
	const editRuleURL = data.editSettings + '&tab=dynamic-offers';

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
					isConnectable={ isConnectable }
					className="react-flow__handle wcf-handle-left"
				/>
			) }
			{ 'RL' === data.direction && (
				<>
					<Handle
						type={ left_handle_type }
						position="left"
						className="react-flow__handle-right-a"
						id="a"
						style={ { top: 50 } }
						isConnectable={ isConnectable }
					/>
					<Handle
						type={ left_handle_type }
						position="left"
						className="react-flow__handle-right-b"
						id="b"
						style={ { bottom: 83, top: 'auto' } }
						isConnectable={ isConnectable }
					/>
				</>
			) }
			<div className="wcf-custom-node-wrapper">
				<span className="wcf-rect top-left"></span>
				<span className="wcf-rect top-right"></span>
				<span className="wcf-rect botton-left"></span>
				<span className="wcf-rect bottom-right"></span>
				<div
					className="wcf-custom-node-design"
					style={ {
						backgroundImage: `url(${ conditional })`,
					} }
				>
					<div
						className="wcf-node-actions hidden"
						data-group_id={ data.group_id }
						data-step_id={ data.step_id }
					>
						<a
							href={ editRuleURL }
							target="_blank"
							title={ __( 'Edit Condition', 'cartflows' ) }
							rel="noreferrer"
						>
							<span
								className="dashicons dashicons-admin-settings"
								data-group_id={ data.group_id }
								data-step_id={ data.step_id }
							></span>
						</a>
					</div>
				</div>
			</div>
			<div className="wcf-custom-node-label">
				{ validateTitleField(
					data.label,
					cartflows_admin.title_length.max,
					cartflows_admin.title_length.display_length
				) }
			</div>
			{ 'LR' === data.direction && (
				<>
					<Handle
						type={ right_handle_type }
						position="right"
						className="react-flow__handle-right-a"
						id="a"
						style={ { top: 50 } }
						isConnectable={ isConnectable }
					/>
					<Handle
						type={ right_handle_type }
						position="right"
						className="react-flow__handle-right-b"
						id="b"
						style={ { bottom: 83, top: 'auto' } }
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
					isConnectable={ isConnectable }
					className="react-flow__handle wcf-handle-left"
				/>
			) }
		</>
	);
} );
