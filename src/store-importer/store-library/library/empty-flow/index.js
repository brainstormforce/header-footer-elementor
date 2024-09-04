import React, { useState } from 'react';
import { __ } from '@wordpress/i18n';

import './EmptyFlow.scss';
import FlowNamePopup from '@Admin/store-importer/store-library/library/store-checkout-name-popup';

const EmptyFlow = () => {
	const [ visibility, setVisibility ] = useState( 'hide' );
	const [ flowName, setFlowName ] = useState( '' );

	return (
		<div className="wcf-flow-importer wcf-search-404">
			<div className="wcf-flow-importer__list wcf-items-list wcf-row wcf-flow-row">
				<FlowNamePopup
					visibility={ visibility }
					setVisibility={ setVisibility }
					type={ 'blank' }
					flowName={ flowName }
					setFlowName={ setFlowName }
				/>
				<div className="wcf-item wcf-item__start-from-blank">
					<div
						className="wcf-item__inner"
						onClick={ () => {
							setVisibility(
								'hide' === visibility ? 'show' : 'hide'
							);
						} }
					>
						<div className="wcf-item__thumbnail-wrap">
							<div className="wcf-item__thumbnail">
								<div className="wcf-flow-importer__start-from-blank-icon">
									<span className="wcf-icon dashicons dashicons-plus wcf-icon-start-from-blank"></span>
								</div>
							</div>
						</div>

						<div className="wcf-item__heading-wrap">
							<div className="wcf-item__heading">
								{ __( 'Start from scratch', 'cartflows' ) }
							</div>
						</div>
					</div>
					<div className="wcf_item__info">
						<h3 className="wcf_item__info--title">
							{ __( 'Oops!!! No template Found.', 'cartflows' ) }
						</h3>
						<span className="wcf_item__info--desc">
							{ __(
								'Seems like no template is available for chosen editor.',
								'cartflows'
							) }
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EmptyFlow;
