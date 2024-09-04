import { __ } from '@wordpress/i18n';

const CanvasHelper = {
	nodeHtml( imageURL, view_page, edit_page, edit_settings ) {
		return (
			<div className="wcf-custom-node-wrapper">
				<span className="wcf-rect top-left"></span>
				<span className="wcf-rect top-right"></span>
				<span className="wcf-rect botton-left"></span>
				<span className="wcf-rect bottom-right"></span>
				<div
					className="wcf-custom-node-design"
					style={ {
						backgroundImage: `url(${ imageURL })`,
					} }
				>
					<div className="wcf-node-actions">
						<a
							href={ view_page }
							target="_blank"
							title={ __( 'View Page', 'cartflows' ) }
							rel="noreferrer"
						>
							<span className="dashicons dashicons-visibility"></span>
						</a>
						<a
							href={ edit_page }
							target="_blank"
							title={ __( 'Edit Page', 'cartflows' ) }
							rel="noreferrer"
						>
							<span className="dashicons dashicons-edit"></span>
						</a>
						<a
							href={ edit_settings }
							target="_blank"
							title={ __( 'Edit Settings', 'cartflows' ) }
							rel="noreferrer"
						>
							<span className="dashicons dashicons-admin-generic"></span>
						</a>
					</div>
				</div>
			</div>
		);
	},
};

export default CanvasHelper;
