import React, { Fragment, useState, useRef } from 'react';
import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { Dialog, Transition } from '@headlessui/react';
import { useSettingsValue } from '@Utils/SettingsProvider';
import ImportFlow from '../flow-preview/import-flow';
import CreateButton from '../../creator/CreateButton';
import { XMarkIcon } from '@heroicons/react/24/outline';

const UpgradeProMessage = () => {
	return (
		<>
			<div className="wcf-name-your-flow__footer">
				<div className="wcf-name-your-flow__actions wcf-pro--required wcf-upgrade-pro">
					<div className="wcf-flow-import__message">
						<p>
							{ __(
								"You can't create more than 3 flows in free version. Upgrade to CartFlows Pro for adding more flows and other features.",
								'cartflows'
							) }
						</p>
					</div>
					<div className="wcf-flow-import__button">
						<div className="wcf-name-your-flow__actions wcf-pro--required">
							<div className="wcf-flow-import__button">
								<a
									href="https://cartflows.com/"
									target="_blank"
									className="wcf-button wcf-button--primary"
									rel="noreferrer"
								>
									{ __(
										'Upgrade To Cartflows Pro',
										'cartflows'
									) }
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
const PopupActions = ( {
	preview,
	type,
	flowName,
	setInputFieldVisibility,
	cancelButtonRef,
	setErrorDesc,
	setVisibility,
} ) => {
	return (
		<>
			<div className="wcf-name-your-flow--footer bg-primary-25 p-4 mt-6 flex justify-end sm:px-6 gap-4">
				{ type === 'import' && (
					<>
						<button
							type="button"
							className="wcf-button wcf-secondary-button"
							onClick={ () => setVisibility( 'hide' ) }
							ref={ cancelButtonRef }
						>
							{ __( 'Cancel', 'cartflows' ) }
						</button>
						<ImportFlow
							preview={ preview }
							flowName={ flowName }
							setInputFieldVisibility={ setInputFieldVisibility }
							setErrorDesc={ setErrorDesc }
						/>
					</>
				) }

				{ type === 'blank' && (
					<>
						<button
							type="button"
							className="wcf-button wcf-secondary-button"
							onClick={ () => setVisibility( 'hide' ) }
							ref={ cancelButtonRef }
						>
							{ __( 'Cancel', 'cartflows' ) }
						</button>

						<CreateButton
							flowName={ flowName }
							setInputFieldVisibility={ setInputFieldVisibility }
							isStoreCheckout={ true }
						/>
					</>
				) }
			</div>
		</>
	);
};

const PopupBody = ( props ) => {
	const {
		cf_pro_status,
		setVisibility,
		preview,
		type,
		flowName,
		setFlowName,
		cancelButtonRef,
	} = props;
	const [ inputFieldVisibility, setInputFieldVisibility ] = useState( '' );
	const [ { flows_limit_over } ] = useSettingsValue();
	const [ errorDesc, setErrorDesc ] = useState( '' );
	const [ characterCount, setCharacterCount ] = useState( 0 );

	const handleChange = ( event ) => {
		const { value } = event.target;
		if ( value.length <= 40 ) {
			setCharacterCount( value.length );
			setFlowName( value );
		}
	};

	return (
		<>
			<div className="wcf-name-your-flow--body fixed inset-0 z-30 overflow-y-auto">
				<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
					<Transition.Child
						as={ Fragment }
						enter="ease-out duration-300"
						enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						enterTo="opacity-100 translate-y-0 sm:scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 translate-y-0 sm:scale-100"
						leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
					>
						<Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
							<div className="wcf-name-your-flow--content bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
								<div className="wcf-name-your-flow--header absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
									<button
										type="button"
										className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none "
										onClick={ () => {
											setVisibility( 'hide' );
										} }
										title={ __(
											'Close the window',
											'cartflows'
										) }
									>
										<XMarkIcon
											className="h-18 w-18 stroke-2"
											aria-hidden="true"
										/>
									</button>
								</div>

								<div className="mt-3 text-center sm:mt-0 sm:text-left">
									<Dialog.Title
										as="h3"
										className="wcf-name-your-flow--title text-base font-medium text-gray-800"
									>
										{ flows_limit_over
											? __(
													'Upgrade To CartFlows Pro',
													'cartflows'
											  )
											: __(
													'Name Your Store Checkout',
													'cartflows'
											  ) }
									</Dialog.Title>
								</div>
								{ ! flows_limit_over ? (
									<>
										<div
											className={ `mt-5 ${ inputFieldVisibility }` }
										>
											<div className="flex justify-between py-2">
												<div className="wcf-name-your-flow--field-title">
													<label className="flex gap-1 text-base font-normal text-gray-800">
														{ __(
															'Store Checkout Name',
															'cartflows'
														) }
													</label>
												</div>
												<div className="wcf-name-your-flow--word-count">
													<span
														className={ `text-xs font-normal ${
															40 ===
															characterCount
																? `text-primary-500`
																: `text-gray-400`
														}` }
													>
														{ characterCount }/40
													</span>
												</div>
											</div>
											<input
												type="text"
												className={ `input-field w-full !px-4 !py-2 text-sm font-normal !rounded-md text-gray-400 !border-gray-200 focus:ring focus:!ring-primary-100 focus:!border-primary-500 focus:!shadow-none !outline-0 !outline-none` }
												value={ flowName }
												onChange={ handleChange }
												placeholder={ __(
													'Enter Funnel Name',
													'cartflows'
												) }
											></input>
										</div>

										{ '' !== errorDesc && (
											<div className="mt-5">
												<p className="text-sm font-regular text-gray-600">
													{ errorDesc }
												</p>
											</div>
										) }
									</>
								) : (
									UpgradeProMessage()
								) }
							</div>
							<PopupActions
								cf_pro_status={ cf_pro_status }
								setVisibility={ setVisibility }
								preview={ preview }
								type={ type }
								flowName={ flowName }
								setFlowName={ setFlowName }
								setInputFieldVisibility={
									setInputFieldVisibility
								}
								setErrorDesc={ setErrorDesc }
								cancelButtonRef={ cancelButtonRef }
							/>
						</Dialog.Panel>
					</Transition.Child>
				</div>
			</div>
		</>
	);
};

const FlowNamePopup = ( {
	visibility,
	setVisibility,
	preview,
	type,
	flowName,
	setFlowName,
	cf_pro_status,
} ) => {
	const cancelButtonRef = useRef( null );

	return (
		<Transition.Root
			show={ 'show' === visibility ? true : false }
			as={ Fragment }
		>
			<Dialog
				as="div"
				className="relative z-20"
				initialFocus={ '' }
				onClose={ setVisibility }
			>
				<Transition.Child
					as={ Fragment }
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div
						className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
						onClick={ () => {
							setVisibility( 'hide' );
						} }
					/>
				</Transition.Child>

				<div className="wcf-name-your-flow__inner">
					<PopupBody
						cf_pro_status={ cf_pro_status }
						setVisibility={ setVisibility }
						preview={ preview }
						type={ type }
						flowName={ flowName }
						setFlowName={ setFlowName }
						cancelButtonRef={ cancelButtonRef }
					/>
				</div>
			</Dialog>
		</Transition.Root>
	);
};

export default compose(
	withSelect( ( select ) => {
		const { getFlowsCount, getCFProStatus, getLicenseStatus } =
			select( 'wcf/importer' );
		return {
			flowsCount: getFlowsCount(),
			cf_pro_status: getCFProStatus(),
			license_status: getLicenseStatus(),
		};
	} )
)( FlowNamePopup );
