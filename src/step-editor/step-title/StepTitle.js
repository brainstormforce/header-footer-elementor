import React, { useState, createRef, useEffect } from 'react';
import apiFetch from '@wordpress/api-fetch';
import { useStateValue } from '@Utils/StateProvider';
import { validateTitleField } from '@Utils/Helpers';

import { __ } from '@wordpress/i18n';

import { InputText } from '@Fields';

import { PencilSquareIcon } from '@heroicons/react/24/outline';

function StepTitle() {
	const [ { step_id, flow_id }, dispatch ] = useStateValue();
	let [ { step_title } ] = useStateValue();

	useEffect( () => {
		let isActive = true;
		if ( isActive ) {
			apiFetch( {
				path: `/cartflows/v1/admin/flow-data/${ flow_id }`,
			} ).then( ( data ) => {
				if ( isActive ) {
					// Add the data into the data layer
					dispatch( {
						type: 'SET_FLOW_DATA',
						data,
					} );
				}
			} );
		}

		return () => {
			isActive = false;
		};
	}, [ step_title ] );

	const [ editTitle, setEditTitle ] = useState( false );
	const [ savingState, setsavingState ] = useState( '' );
	const newTitleInput = createRef();

	const editTitleEvent = function ( e ) {
		e.preventDefault();

		setEditTitle( true );
	};

	const saveNewTitleEvent = function ( e ) {
		e.preventDefault();
		setsavingState( 'wcf-button-loading' );

		const new_step_title = newTitleInput.current.value,
			formData = new window.FormData();

		formData.append( 'action', 'cartflows_update_step_title' );
		formData.append( 'security', cartflows_admin.update_step_title_nonce );
		formData.append( 'step_id', step_id );
		formData.append( 'new_step_title', new_step_title );

		apiFetch( {
			url: cartflows_admin.ajax_url,
			method: 'POST',
			body: formData,
		} ).then( () => {
			dispatch( {
				type: 'SET_STEP_TITLE',
				title: new_step_title,
			} );
			setsavingState( '' );
			setEditTitle( false );
		} );
	};
	const cancelNewTitleEvent = function ( e ) {
		e.preventDefault();

		setEditTitle( false );
	};

	const getStepName = function () {
		if ( '' === step_title ) {
			step_title = __( '(no title)', 'cartflows' );
		}

		let editable_title = validateTitleField(
			step_title,
			cartflows_admin.title_length.max,
			cartflows_admin.title_length.display_length
		);

		let edit_title_btns = (
			<a
				href="#"
				className="wcf-steps-header__title--edit"
				title={ __( 'Edit Step Name', 'cartflows' ) }
				onClick={ editTitleEvent }
			>
				<PencilSquareIcon className="w-5 h-5 stroke-1 text-gray-400 hover:text-primary-500" />
			</a>
		);

		if ( editTitle ) {
			editable_title = (
				<InputText
					attr={ { ref: newTitleInput } }
					id="new-step-title"
					value={ step_title }
					autocomplete="off"
					class="new-step-title input-field !px-4 !py-2.5 !text-sm font-normal !rounded-md text-gray-400 !w-full !border-gray-200 focus:ring focus:!ring-primary-100 focus:!border-primary-500 focus:!shadow-none !outline-0 !outline-none !m-0"
				/>
			);

			edit_title_btns = (
				<>
					<button
						className={ `wcf-button wcf-primary-button ${
							savingState ? `wcf-disabled` : ``
						}` }
						type="button"
						onClick={ saveNewTitleEvent }
					>
						{ savingState && (
							<svg
								aria-hidden="true"
								className="w-18 h-18 mr-2 text-gray-400 animate-spin fill-primary-600"
								viewBox="0 0 100 101"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
									fill="currentColor"
								/>
								<path
									d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
									fill="currentFill"
								/>
							</svg>
						) }

						{ __( 'Save', 'cartflows' ) }
					</button>
					<button
						className="wcf-button wcf-secondary-button"
						href="#"
						onClick={ cancelNewTitleEvent }
					>
						{ __( 'Cancel', 'cartflows' ) }
					</button>
				</>
			);
		}

		return (
			<>
				<span
					className="wcf-steps-header__title--text"
					title={ step_title }
				>
					{ editable_title }
				</span>
				<span className="wcf-steps-header__title--buttons flex gap-2">
					{ edit_title_btns }
				</span>
			</>
		);
	};

	if ( false === step_title ) {
		return '';
	}

	return (
		<div className="wcf-edit-step__title-wrap">
			<div className="wcf-steps-header--title wcf-step__title--editable flex justify-between items-center gap-2.5">
				{ getStepName() }
			</div>
		</div>
	);
}

export default StepTitle;
