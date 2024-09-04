import React from 'react';
import { __ } from '@wordpress/i18n';
import UpgradeToProCTA from '@CTA/UpgradeToProCTA';
import { useStateValue } from '@Utils/StateProvider';
import Accordian from '@StepEditor/components/Accordian/Accordian';
import SettingsPageSkeleton from '@StepEditor/components/steps-page/SettingsPageSkeleton';
import { useSettingsValue } from '@Utils/SettingsProvider';
import ChangeTemplate from '@StepEditor/components/steps-page/ChangeTemplate';

function SettingsPage() {
	const [
		{ step_data, settings_data, page_builder, flow_type, step_title },
	] = useStateValue();
	const [ { license_status } ] = useSettingsValue();

	let loading = true;
	if ( 'undefined' !== typeof step_data.id ) {
		loading = false;
	}
	const settings = settings_data.settings;

	const sortedSettings = Object.values( settings ).sort( function ( a, b ) {
		return a.priority - b.priority;
	} );

	if ( loading ) {
		return <SettingsPageSkeleton />;
	}

	// Show license required message if the license is not activated.
	if (
		[ 'upsell', 'downsell' ].includes( step_data.type ) &&
		wcfCartflowsPro() &&
		'Activated' !== license_status
	) {
		return (
			<>
				<div className="wcf-multiple-order-bumps wcf-multiple-order-bumps-cta">
					<UpgradeToProCTA
						heading={ __( 'License is required!', 'cartflows' ) }
						subHeading={ __(
							"Activate the license to modify this offer step's settings",
							'cartflows'
						) }
					/>
				</div>
			</>
		);
	}
	return (
		<div className="wcf-settings-page">
			{ settings &&
				Object.keys( sortedSettings ).map( ( key, index ) => {
					if (
						'other' !== page_builder &&
						'shortcode' === sortedSettings[ key ].slug
					) {
						return null;
					}

					return (
						<Accordian
							settings={ sortedSettings[ key ] }
							key={ key }
							displayAs="div"
							isOpen={ 0 === index ? true : false }
						/>
					);
				} ) }

			{ 'storeCheckout' === flow_type && step_title && (
				<ChangeTemplate />
			) }
		</div>
	);
}

export default SettingsPage;
