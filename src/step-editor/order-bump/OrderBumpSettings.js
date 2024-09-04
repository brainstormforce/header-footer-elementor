import React from 'react';
import { useStateValue } from '@Utils/StateProvider';
import OrderBumpSettingSkeleton from './skeletons/OrderBumpSettingSkeleton';
import { conditions } from './Helper';
import './OrderBumpSettings.scss';
import { RenderFields } from '@Fields';

function OrderBumpSettings() {
	const [ { page_settings, current_ob } ] = useStateValue();

	if ( null === page_settings || 'undefined' === page_settings ) {
		return <OrderBumpSettingSkeleton />;
	}

	const productSettings =
		page_settings.settings[ 'multiple-order-bump-settings' ];

	return (
		<div className="wcf-order-bump-setting-tab">
			<table>
				<tbody>
					{ Object.keys( productSettings.fields ).map( ( field ) => {
						const data = productSettings.fields[ field ];
						const value = current_ob[ data.name ];
						const isActive = conditions.isActiveControl(
							data,
							current_ob
						);

						return (
							<RenderFields
								key={ field }
								data={ data }
								value={ value }
								isActive={ isActive }
								field={ field }
							/>
						);
					} ) }
				</tbody>
			</table>
		</div>
	);
}

export default OrderBumpSettings;
