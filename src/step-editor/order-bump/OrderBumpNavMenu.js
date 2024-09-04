import React from 'react';
import { __ } from '@wordpress/i18n';
import { Link, useLocation } from 'react-router-dom';
import { useStateValue } from '@Utils/StateProvider';

function OrderBumpNavMenu() {
	const [ { page_slug, flow_id, step_id } ] = useStateValue();
	const loading = false;
	let menus = [];

	menus = [
		{
			name: __( 'Product', 'cartflows' ),
			id: 'product',
		},
		{
			name: __( 'Design', 'cartflows' ),
			id: 'design',
		},
		{
			name: __( 'Content', 'cartflows' ),
			id: 'content',
		},
		{
			name: __( 'Conditions', 'cartflows' ),
			id: 'conditions',
		},
		{
			name: __( 'Settings', 'cartflows' ),
			id: 'settings',
		},
	];

	const query = new URLSearchParams( useLocation()?.search );
	const activePage = query.get( 'page' ) ? query.get( 'page' ) : page_slug;
	const activeTab = query.get( 'obtab' ) ? query.get( 'obtab' ) : 'product';
	const ob_id = query.get( 'ob_id' ) ? query.get( 'ob_id' ) : '';

	return (
		<div className="wcf-edit-step--nav">
			<Link
				to={ {
					pathname: 'admin.php',
					search: `?page=${ page_slug }&action=${ cartflows_admin.step_action }&flow_id=${ flow_id }&step_id=${ step_id }&tab=order_bumps`,
				} }
				className="wcf-edit-step--nav__back-to-flow"
			>
				<button className="wcf-edit-step--nav__back-to-flow--button">
					<span className="dashicons dashicons-arrow-left-alt2"></span>
					<span className="wcf-back-button">
						{ __( 'Back', 'cartflows' ) }
					</span>
				</button>
			</Link>
			{ ! loading &&
				menus.map( ( menu ) => (
					<Link
						key={ menu.id }
						to={ {
							pathname: 'admin.php',
							search: `?page=${ page_slug }&action=${
								cartflows_admin.step_action
							}&flow_id=${ flow_id }&step_id=${ step_id }&tab=order_bumps&ob_id=${ ob_id }${
								'' !== menu.id && '&obtab=' + menu.id
							}`,
						} }
						className={ `wcf-edit-step--nav__tab ${
							activePage === page_slug && activeTab === menu.id
								? ' wcf-edit-step--nav__tab--active'
								: ''
						}` }
					>
						{ menu.name }
					</Link>
				) ) }
		</div>
	);
}

export default OrderBumpNavMenu;
