import React from 'react';
import './CommonMetaBox.scss';

function CommonMetaBox( props ) {
	return (
		<div className="wcf-metabox {props.wrap-class}">
			<div className="wcf-metabox__header">
				<h2>{ props.heading }</h2>
			</div>
			<div className="wcf-metabox__body">
				<p>{ props.desc }</p>
			</div>
			<div className="wcf-metabox__footer">
				<p>
					<a
						href={ props.footerLink }
						target="_blank"
						rel="noopener noreferrer"
					>
						{ props.footerText }
					</a>
				</p>
			</div>
		</div>
	);
}

export default CommonMetaBox;
