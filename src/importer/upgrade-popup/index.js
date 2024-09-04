import React from 'react';
import { createPortal } from 'react-dom';
import { __ } from '@wordpress/i18n';
import './upgrader-popup.scss';
// import UpgradeToCartflowsPro from '@Admin/importer/common/UpgradeToCartflowsPro';
// import Button from '../step-library/creator/button';

function UpgradePopup( { visibility, setVisibility } ) {
	return createPortal(
		<div className={ `wcf-upgrade-pro wcf-name-your-flow ${ visibility }` }>
			<div
				className="wcf-upgrade-pro__overlay wcf-name-your-flow__overlay"
				onClick={ () => setVisibility( 'hide' ) }
			></div>
			<div className="wcf-upgrade-pro__inner wcf-name-your-flow__inner">
				<div className="wcf-upgrade-pro__header wcf-name-your-flow__header">
					<div className="wcf-upgrade-pro__title wcf-name-your-flow__title">
						<h2 className="wcf-upgrade-pro__popup-title wcf-name-your-flow-popup__title wcf-popup-header-title">
							<span className="cartflows-logo-icon"></span>
							{ __( 'Upgrader To CartFlows Pro', 'cartflows' ) }
						</h2>
					</div>

					<div
						className="wcf-name-your-flow__menu wcf-popup-header-action"
						title="Hide this"
						onClick={ () => setVisibility( 'hide' ) }
					>
						<span className="dashicons dashicons-no"></span>
					</div>
				</div>

				<div className="wcf-name-your-flow__body">
					<div className="wcf-name-your-flow__actions wcf-pro--required">
						<div className="wcf-flow-import__message">
							<p>
								{ __(
									"You can't create more than 3 flows in free version. Upgrade to CartFlows Pro for adding more flows and other features.",
									'cartflows'
								) }
							</p>
						</div>
						<div className="wcf-flow-import__button">
							{ /* <UpgradeToCartflowsPro /> */ }
							<a href="https://cartflows.com/">
								{ __(
									'Upgrade To CartFlows Pro',
									'cartflows'
								) }
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>,
		document.getElementById( 'wcf-json-importer' )
		// document.getElementsByTagName( 'body' )[ 0 ]
	);
}

export default UpgradePopup;
