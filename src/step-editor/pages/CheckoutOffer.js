import React, { useState } from 'react';
import { useStateValue } from '@Utils/StateProvider';

import { ProNotification, ToggleField } from '@Fields';
import { __ } from '@wordpress/i18n';
import {
	SquaresPlusIcon,
	PaintBrushIcon,
	Bars3BottomLeftIcon,
} from '@heroicons/react/24/outline';
import CheckoutOfferSkeleton from '@StepEditor/components/steps-page/CheckoutOfferSkeleton';
import COListOptions from '@StepEditor/components/page-settings/COListOptions';
import CheckoutOfferPreview from '@StepEditor/components/page-settings/CheckoutOfferPreview';
import './CheckoutOffer.scss';
import classnames from 'classnames';
import useConfirm from '@Alert/ConfirmDialog';

function CheckoutOffer() {
	const [ { settings_data, options } ] = useStateValue();
	const [ currentTab, setCurrentTab ] = useState( 'product' );
	const confirm = useConfirm();
	if ( ! wcfCartflowsPro() ) {
		return (
			<ProNotification feature="Checkout Offer" plan_required="starter" />
		);
	}

	const tabs = [
		{
			name: __( 'Product', 'cartflows' ),
			slug: 'product',
			icon: <SquaresPlusIcon className={ `w-18 h-18 stroke-2` } />,
		},
		{
			name: __( 'Content', 'cartflows' ),
			slug: 'content',
			icon: <Bars3BottomLeftIcon className={ `w-18 h-18 stroke-2` } />,
		},
		{
			name: __( 'Styles', 'cartflows' ),
			slug: 'styles',
			icon: <PaintBrushIcon className={ `w-18 h-18 stroke-2` } />,
		},
	];

	if ( 'undefined' === typeof settings_data.settings ) {
		return <CheckoutOfferSkeleton />;
	}

	const confirmUnsavedChanges = async function () {
		if ( window.wcfUnsavedChanges ) {
			const isconfirm = await confirm( {
				title: __( 'Save Changes', 'cartflows' ),
				description: __(
					'You have made changes. Do you want to save the changes?',
					'cartflows'
				),
				actionBtnText: __( 'Yes', 'cartflows' ),
				cancelBtnText: __( 'No', 'cartflows' ),
			} );

			return isconfirm;
		}

		return false; // No changes found.So don't save anything.
	};
	const changeTab = async function ( tabSlug ) {
		if ( tabSlug === currentTab ) {
			setCurrentTab( tabSlug );
			return;
		}
		const isSave = await confirmUnsavedChanges();
		if ( ! isSave ) {
			setCurrentTab( tabSlug );
		}
		window.wcfUnsavedChanges = false;
	};

	return (
		<>
			<ToggleField
				name={ 'wcf-pre-checkout-offer' }
				value={ options[ 'wcf-pre-checkout-offer' ] }
				label={ __( 'Enable Checkout Offer', 'cartflows' ) }
				fullWidth={ true }
			/>
			{ 'yes' === options[ 'wcf-pre-checkout-offer' ] && (
				<>
					<div className="wcf-co-preview">
						<CheckoutOfferPreview />
					</div>

					<span className="border border-gray-200 isolate inline-flex rounded-md shadow-sm w-full mt-8 mb-8">
						{ tabs.map( ( tab ) => {
							const focusClass =
								tab.slug === currentTab
									? 'z-10 text-primary-600 bg-primary-25 outline-none ring-1 ring-primary-300 rounded-lg shadow shadow-primary-lg'
									: '';
							return (
								<button
									type="button"
									className={ classnames(
										'flex justify-center gap-2 relative text-center w-1/3 items-center px-4 py-2 text-sm font-medium text-gray-400 hover:bg-primary-25 hover:ring-1 hover:ring-primary-300 hover:rounded-lg hover:text-primary-600',
										focusClass
									) }
									onClick={ () => {
										changeTab( tab.slug );
									} }
									key={ tab.slug }
								>
									{ tab.icon ? tab.icon : '' }
									<span className="text-center">
										{ tab.name }
									</span>
								</button>
							);
						} ) }
					</span>
					<div className="wcf-checkout-offer-settings wcf-checkout__section">
						<COListOptions tab={ currentTab } displayAs="div" />
					</div>
				</>
			) }
		</>
	);
}

export default CheckoutOffer;
