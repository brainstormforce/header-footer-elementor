import React from 'react';
import { useSettingsStateValue } from '@SettingsApp/utils/StateProvider';
import './SettingTable.scss';
import { conditions } from '@Utils/Helpers';

import { RenderFields } from '@Fields';
function SettingTable( props ) {
	const { settings } = props;

	const [ { options } ] = useSettingsStateValue();

	return (
		<table className="wcf-global-settings-content-table w-full">
			<tbody>
				{ settings?.fields &&
					Object.keys( settings.fields ).map( ( field ) => {
						const data = settings.fields[ field ];

						const value = options[ data.name ]
							? options[ data.name ]
							: '';

						const isActive = conditions.isActiveControl(
							data,
							options
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
	);
}

export default SettingTable;
