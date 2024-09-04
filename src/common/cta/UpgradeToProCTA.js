import React from 'react';
import { __ } from '@wordpress/i18n';
import { useLocation } from 'react-router-dom';
import ActivateCartflowsPro from '@Admin/importer/common/ActivateCartflowsPro';
import UpgradeToCartflowsPro from '@Admin/importer/common/UpgradeToCartflowsPro';
import ActivateCartflowsProLink from '@Admin/importer/common/activate-cartflows-pro-link';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { useSettingsValue } from '@Utils/SettingsProvider';

function UpgradeToProCTA( props ) {
	const [ { license_status } ] = useSettingsValue();
	const headingText = props.heading ? props.heading : '',
		subHeadingText = props.subHeading ? props.subHeading : '',
		descriptionText = props.description ? props.description : '',
		ctaText =
			props.btnText || __( 'Upgrade to CartFlows Pro', 'cartflows' ),
		wrapper_class = props.class ? props.class : '',
		usp_list = props.usps ? props.usps : '';

	const query = new URLSearchParams( useLocation().search );
	const tab = query.get( 'tab' );

	const getCtaButtonComponent = function () {
		const cf_pro_status = cartflows_admin.cf_pro_status;

		if ( ! wcfCartflowsTypePro() ) {
			// If plugin is deactive.
			if (
				'inactive' === cf_pro_status &&
				'pro' === wcfInactivepluginType()
			) {
				return <ActivateCartflowsPro />;
			}
		}

		if ( ! wcfCartflowsTypePlusPro() ) {
			if ( wcfInactiveProPlus() ) {
				return <ActivateCartflowsPro />;
			}
			// "Cartflows Pro" is installed BUT not active?

			return (
				<UpgradeToCartflowsPro
					buttonLink={ props.buttonLink }
					title={ ctaText }
				/>
			);

			// "Cartflows Pro" Not installed then navigate upgrade to pro.
		} else if ( 'Activated' !== license_status ) {
			if ( 'analytics' === tab ) {
				return (
					<UpgradeToCartflowsPro
						buttonLink={ props.buttonLink }
						title={ ctaText }
					/>
				);
			}
			/**
			 * "Cartflows Pro" installed but license is inactive.
			 */
			return (
				<div className="wcf-name-your-flow__actions wcf-pro--required">
					<div className="wcf-flow-import__button">
						<ActivateCartflowsProLink
							title={ __( 'Activate the License', 'cartflows' ) }
						/>
					</div>
				</div>
			);
		}
	};

	return (
		<div className={ `wcf-upgrade-to-pro-cta ${ wrapper_class }` }>
			<div className="bg-white border border-gray-200 rounded-lg px-5 py-5 lg:px-8 sm:py-5">
				<div className="max-w-full lg:flex lg:items-center lg:justify-between">
					<div>
						<h2 className="text-base font-medium tracking-tight text-gray-800 sm:text-base">
							{ headingText }
						</h2>
						<span className="text-sm font-normal text-gray-600">
							{ ' ' }
							{ subHeadingText }{ ' ' }
						</span>
					</div>
					<div className="mt-10 flex items-center gap-x-6 lg:mt-0 lg:flex-shrink-0">
						{ getCtaButtonComponent() }
					</div>
				</div>

				{ descriptionText && (
					<p className="wcf-upgrade-to-pro-cta--text text-sm font-normal text-gray-600 mt-3">
						{ descriptionText }
					</p>
				) }

				{ usp_list && (
					<ul className="wcf-upgrade-to-pro-cta-list text-sm font-normal text-gray-600 mt-3">
						{ usp_list.map( ( list_item, index ) => {
							return (
								<li
									className="wcf-upgrade-to-pro-cta-list-item flex gap-2 items-center mb-2"
									key={ index }
								>
									<CheckCircleIcon
										className={ `w-18 h-18 stroke-2 text-primary-500` }
									/>
									<span> { list_item } </span>
								</li>
							);
						} ) }
					</ul>
				) }
			</div>
		</div>
	);
}

export default UpgradeToProCTA;
