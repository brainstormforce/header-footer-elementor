import React from 'react';
import { useStateValue } from '@Utils/StateProvider';
import OrderBumpTwoColumnSkeleton from './skeletons/OrderBumpTwoColumnSkeleton';
import { conditions } from './Helper';
import { RenderFields } from '@Fields';

function OrderBumpContent() {
	const [ { page_settings, current_ob } ] = useStateValue();

	if ( null === page_settings || 'undefined' === page_settings ) {
		return <OrderBumpTwoColumnSkeleton />;
	}

	const obsettings = page_settings.settings[ 'multiple-order-bump-content' ];

	return (
		<div className="wcf-order-bump-content-tab">
			<div className="wcf-order-bump-content-tab__settings">
				{ Object.keys( obsettings.fields ).map( ( field ) => {
					const data = obsettings.fields[ field ];

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
							options={ current_ob }
							displayAs="div"
							tabName="order-bump-content"
						/>
					);
				} ) }
			</div>
		</div>
	);
}

export default OrderBumpContent;
