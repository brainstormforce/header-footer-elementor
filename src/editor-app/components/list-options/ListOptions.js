import React from 'react';
import { useStateValue } from '@Utils/StateProvider';
import { conditions } from '@Utils/Helpers';
import { RenderFields } from '@Fields';

function ListOptions( { settings }, displayAs = 'tr' ) {
	const [ { options } ] = useStateValue();

	return (
		<div className="wcf-list-options">
			{ /* <h3 className="wcf-list-options__title">{ settings.title }</h3> */ }
			<div className="wcf-list-options-wrapper">
				{ 'tr' === displayAs ? (
					<table className="w-full">
						<tbody>
							{ Object.keys( settings.fields ).map( ( field ) => {
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
				) : (
					<div className="wcf-list-options-container">
						{ Object.keys( settings.fields ).map( ( field ) => {
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
									tabName="list-options"
									displayAs={ displayAs }
								/>
							);
						} ) }
					</div>
				) }
			</div>
		</div>
	);
}

export default ListOptions;
