import React, { useState } from 'react';
import { __, sprintf } from '@wordpress/i18n';
import ReactHtmlParser from 'react-html-parser';
import { ChevronUpIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import ActivateCartflowsPro from '@Admin/importer/common/ActivateCartflowsPro';
import UpgradeToCartflowsPro from '@Admin/importer/common/UpgradeToCartflowsPro';
import ActivateCartflowsProLink from '@Admin/importer/common/activate-cartflows-pro-link';
import { useSettingsValue } from '@Utils/SettingsProvider';

function ProductOptionsCTA( props ) {
	const [ collapseStates, setCollapseStates ] = useState( {} );
	const [ { license_status } ] = useSettingsValue();
	const ctaText =
		props.btnText || __( 'Upgrade to CartFlows Pro', 'cartflows' );

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

	const getCtaAccordian = function ( data ) {
		const handleCollapse = function ( accordionId ) {
			setCollapseStates( ( prevStates ) => ( {
				...prevStates,
				[ accordionId ]: ! prevStates[ accordionId ],
			} ) );
		};

		const fieldId = data.title.toLowerCase().replace( / /g, '_' );
		const accordionId = fieldId + '-field-wrapper';
		const accordionClass = 'wcf-field--' + fieldId;
		const collapse = collapseStates[ accordionId ] ? '' : 'collapsed';

		return (
			<div
				className={ `wcf-${ accordionClass } accordion-item bg-white -mx-8 border-b border-gray-200` }
			>
				<h2
					className="accordion-header mb-0"
					id={ `wcf_${ accordionId }_toggler`.toLowerCase() }
				>
					<button
						className={ `wcf-accordion-button relative flex justify-between items-center w-full py-4 px-8 text-base font-semibold text-gray-800 text-left transition focus:outline-none ${ collapse }` }
						type="button"
						data-bs-toggle="collapse"
						data-bs-target={ `#wcf_collapse_${ accordionId }` } //"#collapseTwo5"
						aria-expanded="false"
						aria-controls={ `wcf_collapse_${ accordionId }` }
						onClick={ () => handleCollapse( accordionId ) }
					>
						<div>
							<span>{ data.title }</span>
							<span className="px-2 py-0.5 text-xs text-primary-600 border border-primary-600 rounded-full ml-2">
								PRO
							</span>
						</div>
						{ collapse ? (
							<ChevronUpIcon
								className="w-5 h-5 text-gray-400"
								aria-hidden="true"
							/>
						) : (
							<ChevronDownIcon
								className="w-5 h-5 text-gray-400"
								aria-hidden="true"
							/>
						) }
					</button>
				</h2>
				<div
					id={ `wcf_collapse_${ accordionId }` }
					className={ `accordion-collapse px-8 pt-4 pb-8 ${ collapse }` }
					aria-labelledby={ `wcf_${ accordionId }_toggler` }
				>
					<div className="accordion-body">
						<div className="p-5 border border-gray-200 rounded-md">
							<div className="mx-auto lg:flex lg:items-center lg:justify-between">
								<h2 className="text-base font-normal tracking-tight text-gray-800">
									{ ReactHtmlParser(
										sprintf(
											// translators: %1$s: anchor tag start, %2$s: anchor tag end.
											__(
												'%1$sPremium Feature%2$s: Upgrading your plan will unlock it',
												'cartflows'
											),
											'<span class="font-medium">',
											'</span>'
										)
									) }
								</h2>
								{ getCtaButtonComponent() }
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	};

	return (
		<>
			<div className="wcf-checkout-products--coupon">
				<div className="wcf-product-coupon-wrapper">
					{ getCtaAccordian( {
						title: __( 'Auto Apply Coupon', 'cartflows' ),
					} ) }
				</div>
			</div>

			<div className="wcf-checkout-products--options">
				<div className="wcf-product-options-wrapper">
					{ getCtaAccordian( {
						title: __( 'Product Options', 'cartflows' ),
					} ) }
				</div>
			</div>
		</>
	);
}

export default ProductOptionsCTA;
