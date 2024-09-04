import React, { useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import { useStateValue } from '@Utils/StateProvider';
import DesignPageSkeleton from '@StepEditor/components/steps-page/DesignPageSkeleton';
import { useHistory } from 'react-router-dom';
import useConfirm from '@Alert/ConfirmDialog';
import { ToggleField } from '@Fields';
import Accordian from '@StepEditor/components/Accordian/Accordian';
import { conditions } from '@Utils/Helpers';

function DesignPage() {
	const [ { step_id, design_settings, options, flow_type, flow_id } ] =
		useStateValue();

	const [ { step_title } ] = useStateValue();

	const history = useHistory();
	const confirm = useConfirm();

	useEffect( () => {
		let isActive = true;

		if ( isActive ) {
		}

		return () => {
			isActive = false;
		};
	}, [] );

	if ( '' === step_id ) {
		return <DesignPageSkeleton />;
	}

	const changeTemplate = async function () {
		const isconfirm = await confirm( {
			title: __( 'Update Template', 'cartflows' ),
			description: __(
				'Changing the template will permanently delete the current design in this step. Would you still like to proceed?',
				'cartflows'
			),
			actionBtnText: __( 'Yes', 'cartflows' ),
			cancelBtnText: __( 'No', 'cartflows' ),
		} );
		if ( isconfirm ) {
			history.push(
				`admin.php?page=cartflows&path=store-checkout&action=wcf-edit-flow&step_id=${ step_id }&flow_id=${ flow_id }&tab=update-template`
			);
		}
	};

	return (
		<div className="wcf-design-page">
			{ 'storeCheckout' === flow_type && step_title && (
				<div className="mb-3">
					<div
						className="wcf-change-step wcf-button wcf-secondary-button"
						onClick={ changeTemplate }
					>
						<span className="">
							{ __( 'Change Template', 'cartflows' ) }
						</span>
					</div>
				</div>
			) }
			<div className="rounded-md bg-yellow-50 p-4 mb-3">
				<div className="flex">
					<div className="text-sm text-yellow-700">
						{ __(
							'If you are using shortcodes, enable this design settings to apply styles.',
							'cartflows'
						) }
					</div>
				</div>
			</div>

			{ design_settings && (
				<div className="wcf-design-page__settings">
					<div className="mb-4">
						<ToggleField
							id="wcf-enable-design-settings"
							name="wcf-enable-design-settings"
							value={ options[ 'wcf-enable-design-settings' ] }
							label={ __(
								'Enable Design Settings',
								'cartflows'
							) }
							fullWidth={ true }
						/>
					</div>

					{ 'yes' === options[ 'wcf-enable-design-settings' ] &&
						Object.keys( design_settings.settings ).map(
							( key, index ) => {
								return (
									<Accordian
										settings={
											design_settings.settings[ key ]
										}
										key={ key }
										isOpen={ 0 === index ? true : false }
										isActive={ conditions.isActiveControl(
											design_settings.settings[ key ],
											options
										) }
									/>
								);
							}
						) }
				</div>
			) }
		</div>
	);
}

export default DesignPage;
