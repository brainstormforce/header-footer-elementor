import React, { useState } from 'react';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import AbSettingPopup from './AbSettingPopup';
import {
	EllipsisVerticalIcon,
	Cog6ToothIcon,
} from '@heroicons/react/24/outline';

function StepAbTestHead( props ) {
	const { flow_id, control_id, step_id, abvariations, ab_test_start } = props;

	const [ popup, showPopup ] = useState( false );

	const [ split_text, setSplitText ] = useState(
		ab_test_start
			? __( 'Stop Split Test', 'cartflows' )
			: __( 'Start Split Test', 'cartflows' )
	);

	const [ splitClass, setsplitClass ] = useState(
		ab_test_start
			? 'wcf-stop-split-test text-primary-500 hover:text-primary-700 cursor-pointer'
			: 'wcf-start-split-test text-green-600 hover:text-green-700'
	);

	const [ enableSplitTest, SetEnableSplitTest ] = useState( false );

	const abTest = function ( event ) {
		event.preventDefault();

		// If enableSplitTest is true that means one ajax call is in progress, so stop another from happening.
		if ( enableSplitTest ) {
			console.log( 'One process of A/B split test is ongoing.' );
			return;
		}

		if ( ab_test_start ) {
			setsplitClass( 'wcf-start-split-test' );
			setSplitText( __( 'Stopping…', 'cartflows' ) );
		} else {
			setsplitClass( 'wcf-stop-split-test' );
			setSplitText( __( 'Starting…', 'cartflows' ) );
		}

		// Set processing flag to true to indicate the process has started.
		SetEnableSplitTest( true );

		const formData = new window.FormData();

		formData.append( 'action', 'cartflows_start_ab_test' );
		formData.append( 'security', cartflows_admin.wcf_start_ab_test_nonce );
		formData.append( 'step_id', step_id );
		formData.append( 'flow_id', flow_id );

		apiFetch( {
			url: cartflows_admin.ajax_url,
			method: 'POST',
			body: formData,
		} ).then( () => {
			// Set processing flag to false to indicate the process has ended.
			SetEnableSplitTest( false );

			// Indicate to the user to that the page is reloading.
			setSplitText( __( 'Reloading…', 'cartflows' ) );

			// Reload to populate the A/B test variations.
			window.location.reload();
		} );
	};

	const abtestSettings = function ( e ) {
		e.preventDefault();
		showPopup( ! popup );
	};

	const closePopup = function () {
		showPopup( false );
	};

	return (
		<div className="wcf-ab-test-head w-full p-4 bg-white flex justify-between items-center border-b border-gray-200 rounded-t-lg">
			<div className="wcf-step-left-content flex items-center gap-3">
				<div className="wcf-steps--sortable-toggle flex cursor-move text-gray-400">
					<EllipsisVerticalIcon
						className="w-5 h-5 stroke-1"
						aria-hidden="true"
					/>
					<EllipsisVerticalIcon
						className="w-5 h-5 stroke-1 -ml-3.5"
						aria-hidden="true"
					/>
				</div>
				<span className="wcf-ab-test-title font-bold text-base">
					{ __( 'Split Test', 'cartflows' ) }
				</span>
			</div>
			<div className="wcf-steps-action-buttons flex gap-3 items-center">
				<a
					href="#"
					className={ `wcf-action-button font-normal ${ splitClass }` }
					title={ split_text }
					data-id={ control_id }
					onClick={ abTest }
				>
					<span>{ split_text }</span>
				</a>
				<a
					href="#"
					className="wcf-settings-split-test wcf-action-button text-gray-400 hover:text-primary-500"
					title={ `${ __( 'Split Test Settings', 'cartflows' ) }` }
					onClick={ abtestSettings }
				>
					<Cog6ToothIcon
						className={ `w-5 h-5 stroke-1 ${
							enableSplitTest
								? 'animate-spin text-primary-500'
								: ''
						}` }
						aria-hidden="true"
					/>
				</a>
			</div>

			{ popup && (
				<AbSettingPopup
					abvariations={ abvariations }
					flow_id={ flow_id }
					step_id={ step_id }
					control_id={ control_id }
					closeCallback={ closePopup }
				/>
			) }
		</div>
	);
}

export default StepAbTestHead;
