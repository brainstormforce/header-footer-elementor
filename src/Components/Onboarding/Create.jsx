import React, { useEffect, useState } from 'react';
import { Container, Button, Switch, Title, Dialog, Input } from '@bsf/force-ui';
import { X, Check, Plus, ArrowRight, Package, CheckIcon } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from '../../router/index';
import { __ } from '@wordpress/i18n';
import { routes } from '../../admin/settings/routes';

const OnboardingBuild = ( { setCurrentStep } ) => {
	const [ isDialogOpen, setIsDialogOpen ] = useState( false );
	const [ email, setEmail ] = useState( '' );
	const [ fname, setFname ] = useState( '' );
	const [ lname, setLname ] = useState( '' );
	const [ isActive, setIsActive ] = useState( true );
	const [ errors, setErrors ] = useState( '' );
	const [ fnameerrors, setFnameErrors ] = useState( '' );
	const [ loading, setLoading ] = useState( false );

	useEffect( () => {
		setEmail( hfeSettingsData.user_email );
		setIsActive( hfeSettingsData.analytics_status === 'yes' );

		history.pushState( null, '', window.location.href );

		const handleBackButton = ( event ) => {
			event.preventDefault();
			localStorage.setItem( 'currentStep', '2' );
			window.location.reload();
		};

		window.addEventListener( 'popstate', handleBackButton );

		return () => {
			window.removeEventListener( 'popstate', handleBackButton );
		};
	}, [ hfeSettingsData.user_email ] );

	const handleSubmit = () => {
		let hasError = false;
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if ( ! fname.trim() ) {
			setFnameErrors(
				__( 'This field is required', 'header-footer-elementor' ),
			);
			hasError = true;
		} else {
			setFnameErrors( '' );
		}

		if ( ! emailRegex.test( email ) ) {
			setErrors(
				__(
					'Entered email address is invalid!',
					'header-footer-elementor',
				),
			);
			hasError = true;
		} else {
			setErrors( '' );
		}

		if ( hasError ) {
			return;
		}

		setErrors( '' );
		setFnameErrors( '' );
		setLoading( true );
		callValidatedEmailWebhook( email, fname, lname );
	};

	const handleSwitchChange = async () => {
		const newIsActive = ! isActive;
		setIsActive( newIsActive );

		try {
			const response = await fetch( hfe_admin_data.ajax_url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: new URLSearchParams( {
					action: 'save_analytics_option', // WordPress action for your AJAX handler.
					uae_analytics_optin: newIsActive ? 'yes' : 'no',
					nonce: hfe_admin_data.nonce, // Nonce for security.
				} ),
			} );

			const result = await response.json();

			if ( result.success ) {
				toast.success(
					__(
						'Settings saved successfully!',
						'header-footer-elementor',
					),
				);
			} else {
				toast.error(
					__( 'Failed to save settings!', 'header-footer-elementor' ),
				);
			}
		} catch ( error ) {
			toast.error(
				__( 'Failed to save settings!', 'header-footer-elementor' ),
			);
		}

		// setIsLoading(false);
	};

	const callValidatedEmailWebhook = ( email, fname, lname ) => {
		const today = new Date().toISOString().split( 'T' )[ 0 ];

		const params = new URLSearchParams( {
			email,
			date: today,
			fname,
			lname,
		} );

		fetch( `/wp-json/hfe/v1/email-webhook/?${ params.toString() }`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-WP-Nonce': hfeSettingsData.hfe_nonce_action, // Use the correct nonce.
			},
		} )
			.then( ( response ) => {
				if ( ! response.ok ) {
					throw new Error( `HTTP error! Status: ${ response.status }` );
				}
				return response.json();
			} )
			.then( ( data ) => {
				if ( 'success' === data.message ) {
					setLoading( false );
					window.location.href =
						hfeSettingsData.onboarding_success_url;
				} else {
					setLoading( false );
					console.warn( 'Unexpected webhook response:', data );
				}
			} )
			.catch( ( error ) => {
				console.error( 'Error calling webhook:', error );
			} );
	};

	return (
		<div
			className="bg-background-primary border-[0.5px] border-subtle rounded-xl shadow-sm mb-6 p-8"
			style={ { width: '672px' } }
		>
			<div className="flex items-start hfe-display-flex">
				{ /* Left Content */ }
				<div
					className="flex flex-col items-start"
					style={ { paddingRight: '35px' } }
				>
					<h1
						className="text-text-primary m-0 mb-2"
						style={ { fontSize: '1.4rem', lineHeight: '1.3em' } }
					>
						{ __(
							'You’re All Set to Start Creating! 🚀',
							'header-footer-elementor',
						) }
					</h1>
					<span
						className="text-sm font-normal text-text-tertiary m-0 mb-4 "
						style={ { lineHeight: '1.6em' } }
					>
						{ __(
							'Ultimate Addons is ready to supercharge your Elementor workflow! Build faster, cleaner, and more creatively — with complete control over your site.',
							'header-footer-elementor',
						) }
					</span>
					<span className="font-semibold m-0 pt-2">
						{ __( 'What You Can Do Next:', 'header-footer-elementor' ) }
					</span>

					<ul
						className="font-normal"
						style={ {
							fontSize: '0.9rem',
							lineHeight: '1.6em',
							color: '#111827',
						} }
					>
						<li
							className="font-normal"
							style={ {
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'flex-start',
								gap: '0.5rem',
								color: '#111827',
							} }
						>
							<CheckIcon color="#111827" size={ 18 } />
							{ __(
								'Build a custom header',
								'header-footer-elementor',
							) }
						</li>
						<li
							className="font-normal "
							style={ {
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'flex-start',
								gap: '0.5rem',
								color: '#111827',
							} }
						>
							<CheckIcon color="#111827" size={ 18 } />
							{ __(
								'Design your site footer',
								'header-footer-elementor',
							) }
						</li>
						<li
							className="font-normal"
							style={ {
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'flex-start',
								gap: '0.5rem',
								color: '#111827',
							} }
						>
							<CheckIcon color="#111827" size={ 18 } />
							{ __(
								'Create a new page',
								'header-footer-elementor',
							) }
						</li>
					</ul>
					<hr
						className="w-full border-b-0 border-x-0 border-t border-solid border-t-border-subtle"
						style={ { marginBottom: '20px', borderColor: '#E5E7EB' } }
					/>
				</div>

				{ /* Right Content - Image */ }
				<div className="" style={ { textAlign: 'end' } }>
					<img
						alt="Build"
						className="w-full object-contain"
						style={ { height: '130px', width: '160px' } }
						src={ `${ hfeSettingsData.create_new }` }
						loading="lazy"
					/>
				</div>
			</div>
			<div className="flex flex-row pt-2 items-center justify-between gap-1 pb-4 hfe-display-flex">
				<div className="flex items-center justify-start gap-3">
					<Button
						iconPosition="right"
						variant="outline"
						className="hfe-remove-ring text-sm font-semibold"
						style={ {
						// backgroundColor: "#fff",
							transition: 'background-color 0.3s ease',
						} }
						onMouseEnter={ ( e ) =>
							( e.currentTarget.style.backgroundColor = '' )
						}
						onMouseLeave={ ( e ) =>
							( e.currentTarget.style.backgroundColor = '' )
						}
						onClick={ () => {
							window.open( hfeSettingsData.hfe_post_url, '_self' );
						} }
					>
						{ __( 'Create New Header', 'header-footer-elementor' ) }
					</Button>

					<Button
						iconPosition="right"
						variant="outline"
						className="hfe-remove-ring text-sm font-semibold"
						style={ {
						// backgroundColor: "#fff",
							transition: 'background-color 0.3s ease',
						} }
						onMouseEnter={ ( e ) =>
							( e.currentTarget.style.backgroundColor = '' )
						}
						onMouseLeave={ ( e ) =>
							( e.currentTarget.style.backgroundColor = '' )
						}
						onClick={ () => {
							window.open( hfeSettingsData.hfe_post_url, '_self' );
						} }
					>
						{ __( 'Create New Footer', 'header-footer-elementor' ) }
					</Button>
				</div>
				<Button
					iconPosition="right"
					variant="outline"
					className="hfe-remove-ring text-sm font-semibold"
					style={ {
						color: '',
						borderColor: '',
					} }
					onMouseEnter={ ( e ) =>
						( e.currentTarget.style.color = '#000000' )
					}
					onMouseLeave={ ( e ) =>
						( e.currentTarget.style.color = '' ) &&
						( e.currentTarget.style.borderColor = '' )
					}
					onClick={ () => {
						window.open(
							hfeSettingsData.elementor_page_url,
							'_blank',
						);
					} }
				>
					{ __( 'Create New Page', 'header-footer-elementor' ) }
				</Button>
			</div>
			<Dialog
				design="simple"
				open={ isDialogOpen }
				setOpen={ setIsDialogOpen }
			>
				<Dialog.Backdrop />
				<Dialog.Panel>
					<Dialog.Header
						style={ { padding: '30px', marginBottom: '0.5rem' } }
					>
						<div className="flex items-center justify-between">
							<div className="flex items-center justify-center">
								<Dialog.Title
									style={ {
										fontSize: '1.6rem',
										width: '80%',
										lineHeight: '1.3em',
									} }
								>
									{ __(
										'We have a special Reward just for you! 🎁',
										'header-footer-elementor',
									) }
								</Dialog.Title>
								<Button
									icon={ <X className="size-10" /> }
									iconPosition="right"
									size="md"
									variant="ghost"
									className="hfe-remove-ring self-start"
									onClick={ () => setIsDialogOpen( false ) }
									style={ {
										marginLeft: '60px',
										marginBottom: '20px',
									} }
								/>
							</div>
						</div>
						<Dialog.Description
							style={ {
								width: '90%',
								color: '#64748B',
								marginTop: '10px',
							} }
						>
							{ __(
								'Enter your details to get special offer that we have for you and stay updated on UAE’s latest news and updates.',
								'header-footer-elementor',
							) }
						</Dialog.Description>

						<div
							className="flex w-full"
							style={ { marginTop: '15px' } }
						>
							<div
								className="block"
								style={ { width: '50%', paddingRight: '13px' } }
							>
								<input
									type="text"
									placeholder={ __(
										'First Name',
										'header-footer-elementor',
									) }
									value={ fname }
									className="h-12 border border-subtle px-2 w-full"
									style={ {
										borderColor: '#e0e0e0', // Default border color.
										outline: 'none', // Removes the default outline.
										boxShadow: 'none', // Removes the default box shadow.
										marginTop: '5px',
									} }
									onFocus={ ( e ) =>
										( e.target.style.borderColor = '#6005FF' )
									} // Apply focus color.
									onBlur={ ( e ) =>
										( e.target.style.borderColor = '#e0e0e0' )
									} // Revert to default color.
									onChange={ ( e ) => {
										if ( e && e.target ) {
											setFnameErrors( '' );
											setFname( e.target.value );
										}
									} }
								/>
								{ fnameerrors && (
									<span
										className="absolute color-text-danger text-xs text-sm font-normal"
										style={ {
											color: '#FF0000',
											marginTop: '0px',
										} }
									>
										{ fnameerrors }
									</span>
								) }
							</div>
							<div className="block" style={ { width: '50%' } }>
								<input
									type="text"
									placeholder={ __(
										'Last Name',
										'header-footer-elementor',
									) }
									value={ lname }
									className="h-12 border border-subtle px-2 w-full"
									style={ {
										borderColor: '#e0e0e0', // Default border color.
										outline: 'none', // Removes the default outline.
										boxShadow: 'none', // Removes the default box shadow.
										marginTop: '5px',
									} }
									onFocus={ ( e ) =>
										( e.target.style.borderColor = '#6005FF' )
									} // Apply focus color.
									onBlur={ ( e ) =>
										( e.target.style.borderColor = '#e0e0e0' )
									} // Revert to default color.
									onChange={ ( e ) => {
										if ( e && e.target ) {
											setLname( e.target.value );
										}
									} }
								/>
							</div>
						</div>

						<input
							type="email"
							placeholder={ __(
								'Your Email Address',
								'header-footer-elementor',
							) }
							value={ email }
							className="h-12 border border-subtle px-2 w-full"
							style={ {
								borderColor: '#e0e0e0', // Default border color
								outline: 'none', // Removes the default outline
								boxShadow: 'none', // Removes the default box shadow
								marginTop: '20px',
							} }
							onFocus={ ( e ) =>
								( e.target.style.borderColor = '#6005FF' )
							} // Apply focus color.
							onBlur={ ( e ) =>
								( e.target.style.borderColor = '#e0e0e0' )
							} // Revert to default color.
							onChange={ ( e ) => {
								if ( e && e.target ) {
									setErrors( '' );
									setEmail( e.target.value );
								}
							} }
						/>
						{ errors && (
							<span
								className="absolute color-text-danger text-xs text-sm font-normal"
								style={ { color: '#FF0000', marginTop: '0px' } }
							>
								{ errors }
							</span>
						) }

						<Button
							icon={
								loading ? (
									<LoaderCircle className="animate-spin" />
								) : null
							}
							iconPosition="right"
							variant="primary"
							className="bg-[#6005FF] hfe-remove-ring w-full mt-2"
							disabled={ loading }
							style={ {
								backgroundColor: '#6005FF',
								transition: 'background-color 0.3s ease',
								marginTop: '20px',
							} }
							onMouseEnter={ ( e ) =>
								( e.currentTarget.style.backgroundColor =
									'#4B00CC' )
							}
							onMouseLeave={ ( e ) =>
								( e.currentTarget.style.backgroundColor =
									'#6005FF' )
							}
							onClick={ handleSubmit }
						>
							{ __( 'Submit', 'header-footer-elementor' ) }
						</Button>
					</Dialog.Header>
				</Dialog.Panel>
			</Dialog>
		</div>
	);
};

export default OnboardingBuild;
