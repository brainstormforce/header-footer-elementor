import React from 'react';
import { __ } from '@wordpress/i18n';
import { useSettingsValue } from '@Utils/SettingsProvider';
import { Spinner } from '@Fields';
import {
	PlusIcon,
	ArrowPathIcon,
	XMarkIcon,
	CheckIcon,
} from '@heroicons/react/24/outline';

function SubmitButton( props ) {
	const [ { settingsProcess }, setSettingsStatus ] = useSettingsValue();

	if ( 'saved' === settingsProcess ) {
		setTimeout( () => {
			const buttonElement = document.getElementsByClassName(
				'wcf-button--save-global-settings'
			)[ 0 ];
			buttonElement.blur();
			setSettingsStatus( { status: 'RESET' } );
		}, 2000 );
	}

	const showMessage = function () {
		setSettingsStatus( { status: 'PROCESSING' } );
	};

	const classes = props.class ? props.class : 'wcf-primary-button';
	const buttonIcon = props.icon ? props.icon : '';
	const buttonIconClasses = props.iconClass ? props.iconClass : '';

	const savingState = 'processing' === settingsProcess ? 'wcf-disabled' : '';

	const getSuccessNotice = function () {
		return (
			<span className="wcf-success-notice">
				<CheckIcon class="w-4 h-4 stroke-2 inline-block mr-1" />
				<span className="wcf-success-message">
					{ __( 'Settings Saved', 'cartflows' ) }
				</span>
			</span>
		);
	};

	const get_button_icon = function () {
		let icon = '';

		if ( 'processing' === settingsProcess ) {
			return <Spinner className={ buttonIconClasses } />;
		}

		switch ( buttonIcon ) {
			case 'plus':
				icon = (
					<PlusIcon
						className={ `w-4 h-4 stroke-2 ${ buttonIconClasses }` }
					/>
				);
				break;
			case 'loader':
				icon = (
					<ArrowPathIcon
						className={ `w-4 h-4 stroke-2 ${ buttonIconClasses }` }
					/>
				);
				break;
			case 'close':
				icon = (
					<XMarkIcon
						className={ `w-4 h-4 stroke-2 ${ buttonIconClasses }` }
					/>
				);
				break;
			case 'check':
				icon = (
					<CheckIcon
						className={ `w-4 h-4 stroke-2 ${ buttonIconClasses }` }
					/>
				);
				break;

			default:
				break;
		}

		return icon;
	};

	return (
		<div className="wcf-field wcf-submit wcf-submit-field">
			<button
				type="submit"
				className={ `wcf-button wcf-button--save-global-settings gap-1.5 ${ classes } ${ savingState }` }
				onClick={ showMessage }
			>
				{ get_button_icon() }
				{ 'saved' === settingsProcess && getSuccessNotice() }
				{ 'processing' === settingsProcess &&
					__( 'Saving…', 'cartflows' ) }
				{ ! settingsProcess && __( 'Save Settings', 'cartflows' ) }
			</button>
		</div>
	);
}

export default SubmitButton;
