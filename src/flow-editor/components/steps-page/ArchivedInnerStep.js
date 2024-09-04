import React, { useState } from 'react';
import apiFetch from '@wordpress/api-fetch';
import { sprintf, __ } from '@wordpress/i18n';
import { validateTitleField } from '@Utils/Helpers';

import landingstep from '@Icons/landingstep.svg';
import checkoutstep from '@Icons/checkoutstep.svg';
import upsellstep from '@Icons/upsellstep.svg';
import downsellstep from '@Icons/downsellstep.svg';
import optinstep from '@Icons/optinstep.svg';
import thankyoustep from '@Icons/thankyoustep.svg';

import {
	TrashIcon,
	EllipsisVerticalIcon,
	EyeSlashIcon,
	ArrowUturnRightIcon,
} from '@heroicons/react/24/outline';

// import './ArchivedInnerStep.scss';
import useConfirm from '@Alert/ConfirmDialog';

function ArchivedInnerStep( props ) {
	const {
		step_id,
		flow_id,
		control_id,
		title,
		deleted,
		hide,
		date,
		actions,
		type,
	} = props;

	const [ loader, setLoader ] = useState( false );
	const confirm = useConfirm();

	const restoreStep = async function ( e ) {
		e.preventDefault();

		const isconfirm = await confirm( {
			title: __( 'Restore Archived Variation', 'cartflows' ),
			description: __(
				'Do you want to restore this archived variation? Are you sure?',
				'cartflows'
			),
			actionBtnText: __( 'Yes', 'cartflows' ),
			cancelBtnText: __( 'No', 'cartflows' ),
		} );

		if ( isconfirm ) {
			setLoader( true );
			const formData = new window.FormData();

			formData.append(
				'action',
				'cartflows_restore_archive_ab_test_variation'
			);
			formData.append(
				'security',
				cartflows_admin.wcf_restore_archive_ab_test_variation_nonce
			);
			formData.append( 'step_id', step_id );
			formData.append( 'flow_id', flow_id );
			formData.append( 'control_id', control_id );

			apiFetch( {
				url: cartflows_admin.ajax_url,
				method: 'POST',
				body: formData,
			} ).then( () => {
				window.location.reload();
				setLoader( false );
			} );
		}
	};

	const deleteStep = async function ( e ) {
		e.preventDefault();

		const isconfirm = await confirm( {
			title: __( 'Trash Archived Variation', 'cartflows' ),
			description: sprintf(
				/* translators: %1$s is replaced with the HTML tag */
				__(
					'This action will trash this archived variation and its analytics data permanently. %1$s Do you want to delete this archived variation?',
					'cartflows'
				),
				'\n'
			),
			actionBtnText: __( 'Yes', 'cartflows' ),
			cancelBtnText: __( 'No', 'cartflows' ),
		} );

		if ( isconfirm ) {
			setLoader( true );
			const formData = new window.FormData();

			formData.append(
				'action',
				'cartflows_delete_archive_ab_test_variation'
			);
			formData.append(
				'security',
				cartflows_admin.wcf_delete_archive_ab_test_variation_nonce
			);
			formData.append( 'step_id', step_id );
			formData.append( 'flow_id', flow_id );
			formData.append( 'control_id', control_id );

			apiFetch( {
				url: cartflows_admin.ajax_url,
				method: 'POST',
				body: formData,
			} ).then( () => {
				window.location.reload();
				setLoader( false );
			} );
		}
	};

	const hideStep = async function ( e ) {
		e.preventDefault();

		const isconfirm = await confirm( {
			title: __( 'Hide Archived Variation', 'cartflows' ),
			description: sprintf(
				/* translators: %1$s is replaced with the HTML tag */
				__(
					'This action will hide this archived variation from the list of steps, but its analytics will be visible. %1$s Do you want to hide this archived variation?',
					'cartflows'
				),
				'\n'
			),
			actionBtnText: __( 'Yes', 'cartflows' ),
			cancelBtnText: __( 'No', 'cartflows' ),
		} );

		if ( isconfirm ) {
			setLoader( true );
			const formData = new window.FormData();

			formData.append(
				'action',
				'cartflows_hide_archive_ab_test_variation'
			);
			formData.append(
				'security',
				cartflows_admin.hide_archive_ab_test_variation_nonce
			);
			formData.append( 'step_id', step_id );
			apiFetch( {
				url: cartflows_admin.ajax_url,
				method: 'POST',
				body: formData,
			} ).then( () => {
				window.location.reload();
				setLoader( false );
			} );
		}
	};

	const deleteArch = async function ( e ) {
		e.preventDefault();

		const isconfirm = await confirm( {
			title: __( 'Trash Archived Variation', 'cartflows' ),
			description: sprintf(
				/* translators: %1$s is replaced with the HTML tag */
				__(
					'This action will delete this archived variation and its analytics data permanently. %1$s Do you want to delete this archived variation?',
					'cartflows'
				),
				'\n'
			),
			actionBtnText: __( 'Yes', 'cartflows' ),
			cancelBtnText: __( 'No', 'cartflows' ),
		} );

		if ( isconfirm ) {
			setLoader( true );
			const formData = new window.FormData();

			formData.append(
				'action',
				'cartflows_permanent_delete_archive_ab_test_variation'
			);
			formData.append(
				'security',
				cartflows_admin.permanent_delete_archive_ab_test_variation_nonce
			);
			formData.append( 'step_id', step_id );
			formData.append( 'flow_id', flow_id );
			formData.append( 'control_id', control_id );
			apiFetch( {
				url: cartflows_admin.ajax_url,
				method: 'POST',
				body: formData,
			} ).then( () => {
				window.location.reload();
				setLoader( false );
			} );
		}
	};

	const getBadge = function () {
		let badgeText = '',
			badgeColor = '';

		if ( ! deleted ) {
			badgeText = __( 'Archived On: ', 'cartflows' );
			badgeColor = 'bg-gray-800';
		} else {
			badgeText = __( 'Deleted On: ', 'cartflows' );
			badgeColor = 'bg-red-500';
		}

		return (
			<span
				className={ `wcf-step-badge text-white text-xs px-2.5 py-1 rounded-full ${ badgeColor }` }
			>
				{ badgeText + date }
			</span>
		);
	};

	if ( '1' === hide ) {
		return null;
	}

	const getClassName = function () {
		const overlay = loader ? 'step-overlay' : '';
		return `wcf-step flex justify-between items-center w-full ${ overlay }`;
	};

	const getSTepSVG = function () {
		let stepSVG = '';

		switch ( type ) {
			case 'landing':
				stepSVG = landingstep;
				break;
			case 'checkout':
				stepSVG = checkoutstep;
				break;
			case 'optin':
				stepSVG = optinstep;
				break;
			case 'thankyou':
				stepSVG = thankyoustep;
				break;
			case 'upsell':
				stepSVG = upsellstep;
				break;
			case 'downsell':
				stepSVG = downsellstep;
				break;
		}

		return stepSVG;
	};
	return (
		<div
			className="wcf-archived-step flex items-center gap-2 py-4"
			data-id={ step_id }
		>
			<div className="wcf-archive-step--sortable-toggle flex text-gray-300 disabled pointer-events-none">
				<EllipsisVerticalIcon
					className="w-5 h-5 stroke-1"
					aria-hidden="true"
				/>
				<EllipsisVerticalIcon
					className="w-5 h-5 stroke-1 -ml-3.5"
					aria-hidden="true"
				/>
			</div>
			<div className={ getClassName() }>
				<div className="wcf-archive-step--content flex items-center gap-4 w-[55%]">
					<img
						src={ getSTepSVG() }
						alt={ type }
						className="rounded-lg  w-[72px] h-[72px]"
					></img>
					<div className="wcf-archive-step--title-wrap flex flex-col gap-1">
						<div className="wcf-archive-step--col-tags flex items-center gap-2">
							<span className="text-base font-normal text-gray-400 capitalize mr-2">
								{ type === 'thankyou'
									? __( 'Thank You', 'cartflows' )
									: type }
							</span>
							{ getBadge() }
						</div>
						<div className="wcf-archive-step--title">
							<span className="font-semibold text-lg text-gray-800 cursor-default">
								{ validateTitleField(
									title,
									cartflows_admin.title_length.max,
									cartflows_admin.title_length.display_length
								) }
							</span>
						</div>
					</div>
				</div>

				<div className="wcf-archive-step--col">
					<div className="wcf-archive-step--actions">
						<div className="wcf-archive-step--action__btns-wrapper">
							<div className="wcf-archive-step--basic-action__btns flex items-center gap-3">
								{ actions.map( ( action ) => {
									const slug = action.slug;
									let callbackFun, action_icon;
									switch ( slug ) {
										case 'restore':
											callbackFun = restoreStep;
											action_icon = (
												<ArrowUturnRightIcon className="w-18 h-18 stroke-2" />
											);
											break;

										case 'delete':
											callbackFun = deleteStep;
											action_icon = (
												<TrashIcon className="w-18 h-18 stroke-2" />
											);
											break;

										case 'hide':
											callbackFun = hideStep;
											action_icon = (
												<EyeSlashIcon className="w-18 h-18 stroke-2" />
											);
											break;

										case 'deleteArch':
											callbackFun = deleteArch;
											action_icon = (
												<TrashIcon className="w-18 h-18 stroke-2" />
											);
											break;
										default:
											break;
									}
									return (
										<>
											{ action?.before_text && (
												<span className="wcf-step__action-before-text">
													{ action?.before_text }
												</span>
											) }
											<a
												href={ action?.link }
												className={ `wcf-step__action-btn text-gray-400 hover:text-primary-500 p-1 flex gap-2 ${ action?.class }` }
												title={ action?.text }
												onClick={ callbackFun }
											>
												{ action_icon }
												{ action?.text }
											</a>
										</>
									);
								} ) }
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ArchivedInnerStep;
