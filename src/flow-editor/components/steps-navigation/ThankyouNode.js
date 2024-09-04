import React, { memo } from 'react';
import { Handle } from 'react-flow-renderer';
import { validateTitleField } from '@Utils/Helpers';
import Thankyou_page from '@Images/thankyou_step.svg';
import CanvasHelper from './CanvasHelper';

export default memo( ( { data, isConnectable } ) => {
	const left_handle_type = 'LR' === data.direction ? 'target' : 'source';
	const right_handle_type = 'LR' === data.direction ? 'source' : 'target';
	return (
		<>
			<Handle
				type={ left_handle_type }
				position="left"
				className="react-flow__handle wcf-handle-left"
				isConnectable={ isConnectable }
			/>
			{ CanvasHelper.nodeHtml(
				Thankyou_page,
				data.viewPageLink,
				data.editPage,
				data.editSettings
			) }
			<Handle
				type={ right_handle_type }
				position="right"
				className="react-flow__handle wcf-handle-right"
				isConnectable={ isConnectable }
			/>
			<div className="wcf-custom-node-label">
				{ validateTitleField( data.label, 20, 15 ) }
			</div>
		</>
	);
} );
