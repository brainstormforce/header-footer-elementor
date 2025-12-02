import React, { useState, useEffect, useRef } from 'react';
import { Container, Title, Button, Dialog } from '@bsf/force-ui';
import { __ } from '@wordpress/i18n';

const VersionControl = () => {
	const previousLiteVersions = hfeSettingsData.uaelite_versions;

	const liteVersionRef = useRef( previousLiteVersions ? previousLiteVersions[ 0 ].value : '' );

	const [ liteVersionSelect, setLiteVersionSelect ] = useState( previousLiteVersions ? previousLiteVersions[ 0 ].value : '' );

	const [ freeproductSelect, setFreeproductSelect ] = useState( 'elementor-header-footer' );

	const [ openLitePopup, setOpenLitePopup ] = useState( false );

	useEffect( () => {
	}, [ openLitePopup ] );

	const onLiteCancelClick = () => {
		setOpenLitePopup( false );
	};

	const onLiteContinueClick = () => {
		const rollbackUrl = hfeSettingsData.uaelite_rollback_url.replace(
			'VERSION',
			liteVersionSelect,
		);
		setOpenLitePopup( false );
		window.location.href = rollbackUrl;
	};

	const handleLiteVersionChange = ( event ) => {
		setLiteVersionSelect( event.target.value );
	};

	return (
		<>
			<Title
				description=""
				icon={ null }
				iconPosition="right"
				size="sm"
				tag="h2"
				title={ __( 'Version Control', 'header-footer-elementor' ) }
			/>
			<div
				className="box-border bg-background-primary p-6 rounded-lg"
				style={ {
					marginTop: '24px',
				} }
			>
				<Container
					align="center"
					className="flex flex-col lg:flex-row"
					containerType="flex"
					direction="column"
					gap="sm"
					justify="start"
				>
					<Container.Item className="shrink flex flex-col space-y-1">
						<p className="text-base font-semibold m-0">
							{ __( `Rollback to Previous Version`, 'header-footer-elementor' ) }
						</p>
						<p className="text-sm font-normal m-0">
							{ __( 'Experiencing an issue with current version? Roll back to a previous version to help troubleshoot the issue.', 'header-footer-elementor' ) }
						</p>
					</Container.Item>
					<Container.Item
						className="p-2 flex space-y-4"
						alignSelf="auto"
						order="none"
					>
						<div className="bsf-rollback-version">
							<input type="hidden" name="product-name" id="bsf-product-name" value={ 'header-footer-elementor' } />
							<select
								id="uaeliteVersionRollback"
								ref={ liteVersionRef }
								onBlur={ () => {
									setFreeproductSelect( 'elementor-header-footer' );
								} }
								onChange={ handleLiteVersionChange }
								style={ {
									padding: '8px',
									marginRight: '10px',
									marginTop: '16px',
									cursor: 'pointer',
									borderRadius: '4px',
									height: '40px',
									width: '100px',
									outline: 'none', // Removes the default outline
									boxShadow: 'none',
									// marginTop: '16px'     // Removes the default box shadow
								} }
								onFocus={ ( e ) => e.target.style.borderColor = '#6005FF' } // Apply focus color
							>
								{ previousLiteVersions.map( ( version ) => (
									<option key={ version.value } value={ version.value }>
										{ version.label }
									</option>
								) ) }
							</select>
						</div>

						<div className="flex flex-col cursor-pointer">
							<Dialog
								design="simple"
								exitOnEsc
								scrollLock
								open={ openLitePopup } // Ensure Dialog is controlled by state
								setOpen={ setOpenLitePopup } // Synchronize state
								trigger={ <Button style={ { backgroundColor: '#6005ff' } }>{ __( 'Rollback', 'header-footer-elementor' ) }</Button> }
							>
								<Dialog.Backdrop />
								<Dialog.Panel>
									<Dialog.Header>
										<div className="flex items-center justify-between">
											<Dialog.Title>
												{ __( 'Rollback to Previous Version', 'header-footer-elementor' ) }
											</Dialog.Title>
											<Dialog.CloseButton />
										</div>
									</Dialog.Header>
									<Dialog.Body>
										{ __( `Are you sure you want to rollback to Ultimate Addons for Elementor v${ liteVersionSelect }?`, 'header-footer-elementor' ) }
									</Dialog.Body>
									<Dialog.Footer>
										<Button onClick={ onLiteContinueClick }>
											{ __( 'Rollback', 'header-footer-elementor' ) }
										</Button>
										<Button onClick={ onLiteCancelClick }>
											{ __( 'Cancel', 'header-footer-elementor' ) }
										</Button>
									</Dialog.Footer>
								</Dialog.Panel>
							</Dialog>
						</div>
					</Container.Item>
				</Container>

			</div>
		</>
	);
};

export default VersionControl;
