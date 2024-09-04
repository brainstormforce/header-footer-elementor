import React from 'react';
import { useStateValue } from '@Utils/StateProvider';
import OrderBumpTwoColumnSkeleton from './skeletons/OrderBumpTwoColumnSkeleton';
import { conditions } from './Helper';
import { SectionHeadingField, RenderFields } from '@Fields';

function OrderBumpDesign() {
	const [ { page_settings, current_ob } ] = useStateValue();

	if ( null === page_settings || 'undefined' === page_settings ) {
		return <OrderBumpTwoColumnSkeleton />;
	}

	const obDesign = page_settings.settings[ 'multiple-order-bump-design' ];

	return (
		<div className="wcf-order-bump-design-tab">
			<div className="wcf-order-bump-design-tab__settings">
				{ obDesign &&
					Object.keys( obDesign.fields ).map( ( field ) => {
						const sectionData = obDesign.fields[ field ];
						let dynamicRowClass = '';

						if ( 'borders' === sectionData.id ) {
							dynamicRowClass = 'grid grid-cols-4 gap-x-4';
						}
						if ( 'shadow' === sectionData.id ) {
							dynamicRowClass = 'grid grid-cols-5 gap-x-2';
						}

						return sectionData.section_fields ? (
							<div
								key={ field }
								className={ `wcf-order-bump-design-tab--${ sectionData.id }-section ${ dynamicRowClass } p-5 border border-gray-200 rounded-md mb-5` }
							>
								<div className="wcf-order-bump-deign-tab--heading-section col-span-full">
									<SectionHeadingField
										label={ sectionData.title }
										labelClass="block text-base font-semibold text-gray-800 mb-5"
									/>
								</div>

								{ Object.keys( sectionData.section_fields ).map(
									( sectionField ) => {
										const data =
											sectionData.section_fields[
												sectionField
											];
										const value = current_ob[ data.name ];
										const isActive =
											conditions.isActiveControl(
												data,
												current_ob
											);

										return (
											<RenderFields
												key={ sectionField }
												data={ data }
												value={ value }
												isActive={ isActive }
												field={ sectionField }
												displayAs="div"
												tabName="ob-design"
											/>
										);
									}
								) }
							</div>
						) : (
							<div
								key={ field }
								className={ `wcf-order-bump-design-tab--section mb-5` }
							>
								{
									<RenderFields
										key={ sectionData.name }
										data={ sectionData }
										value={ current_ob[ sectionData.name ] }
										isActive={ conditions.isActiveControl(
											sectionData,
											current_ob
										) }
										field={ sectionData.name }
										displayAs="div"
										tabName="ob-design"
									/>
								}
							</div>
						);
					} ) }
			</div>
		</div>
	);
}

export default OrderBumpDesign;
