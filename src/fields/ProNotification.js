import React from 'react';
import { sprintf, __ } from '@wordpress/i18n';
import ReactHtmlParser from 'react-html-parser';
import './ProNotification.scss';

function ProNotification( props ) {
	const { notice = '', feature = 'this', plan_required = 'pro' } = props;

	const get_pro_plan_link = function () {
		return (
			<>
				<div className="wcf-pro-notice">
					<p className="wcf-pro-update-notice">
						{ ReactHtmlParser(
							sprintf(
								// translators: %1$s: anchor tag start, %2$s: anchor tag end, %3$s: feature name.
								__(
									'Please upgrade to the %1$s CartFlows Pro %2$s to use %3$s feature.',
									'cartflows'
								),
								'<a href="https://cartflows.com" target="_blank">',
								'</a>',
								feature
							)
						) }
					</p>
				</div>
			</>
		);
	};

	const get_higher_plan_link = function () {
		return (
			<>
				<div className="wcf-pro-notice">
					<p className="wcf-pro-update-notice">
						{ ReactHtmlParser(
							sprintf(
								// translators: %1$s: anchor tag start, %2$s: anchor tag end, %3$s: feature name.
								__(
									'Please upgrade to the %1$s CartFlows Higher Plan %2$s to use %3$s feature.',
									'cartflows'
								),
								'<a href="https://cartflows.com" target="_blank">',
								'</a>',
								feature
							)
						) }
					</p>
				</div>
			</>
		);
	};

	if ( '' !== notice ) {
		return (
			<>
				<div className="wcf-pro-notice">
					<p className="wcf-pro-update-notice">
						{ ReactHtmlParser( notice ) }
					</p>
				</div>
			</>
		);
	}

	if ( wcfCartflowsTypePlusPro() || 'pro' === plan_required ) {
		return <>{ get_pro_plan_link() }</>;
	}
	return <>{ get_higher_plan_link() }</>;
}

export default ProNotification;
