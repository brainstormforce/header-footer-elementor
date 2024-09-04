import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { __ } from '@wordpress/i18n';
import './WelcomePage.scss';

function WelcomePage( props ) {
	const { showModel } = props;

	const [ open, setOpen ] = useState( showModel );

	const cancelButtonRef = useRef( null );

	return (
		<Transition.Root show={ open } as={ Fragment }>
			<Dialog
				as="div"
				className="relative z-20"
				initialFocus={ cancelButtonRef }
				onClose={ setOpen }
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
					<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
				</Transition.Child>

				<div className="fixed inset-0 z-10 overflow-y-auto">
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
							<Dialog.Panel className="wcf-welcome-box--content relative transform overflow-hidden rounded-lg bg-white p-9 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-3xl sm:p-9">
								<div className="wcf-welcome-box--header absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
									<button
										type="button"
										className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none "
										onClick={ () => setOpen( false ) }
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
										className="wcf-welcome-box--title text-base font-medium text-gray-800"
									>
										{ __( 'Getting Started', 'cartflows' ) }
									</Dialog.Title>
								</div>
								<div className="wcf-welcome-box--body mt-5 text-center">
									<iframe
										width="100%"
										height="400"
										src="https://www.youtube.com/embed/SlE0moPKjMY"
										frameBorder="0"
										allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
										allowFullScreen=""
										className="rounded-md"
										title={ __(
											'Introduction to CartFlows',
											'cartflows'
										) }
									></iframe>
									<p className="text-sm font-normal mt-5">
										{ __(
											'Modernizing WordPress eCommerce!',
											'cartflows'
										) }
									</p>
								</div>
								<div className="wcf-welcome-box--footer mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
									<Link
										key={ `?page=${ cartflows_admin.home_slug }&path=flows` }
										to={ {
											pathname: 'admin.php',
											search: `?page=${ cartflows_admin.home_slug }&path=library`,
										} }
										className="wcf-button wcf-welcome--button wcf-primary-button !p-4"
										title={ __(
											'Create Your First Flow',
											'cartflows'
										) }
									>
										<span className="">
											{ __(
												'Create Your First Flow',
												'cartflows'
											) }
										</span>
									</Link>

									<a
										className="wcf-button wcf-welcome--button wcf-secondary-button !p-4"
										href={
											cartflows_admin.admin_base_url +
											'index.php?page=cartflow-setup'
										}
									>
										<span className="">
											{ __(
												'Go To Setup Wizard',
												'cartflows'
											) }
										</span>
									</a>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
}

export default WelcomePage;
