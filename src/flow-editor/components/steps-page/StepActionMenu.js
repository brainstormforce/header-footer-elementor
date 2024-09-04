import React, { Fragment } from 'react';
import { __ } from '@wordpress/i18n';
import { Menu, Transition } from '@headlessui/react';
import { Tooltip } from '@Fields';
import { useSettingsValue } from '@Utils/SettingsProvider';

import {
	EllipsisVerticalIcon,
	DocumentDuplicateIcon,
	TrashIcon,
	ChartPieIcon,
	ArrowUpCircleIcon,
	ArchiveBoxIcon,
	TrophyIcon,
} from '@heroicons/react/24/outline';

import './StepActionMenu.scss';

function StepActionMenu( props ) {
	const { id, control_id, onClickEvents, actions } = props;
	const [ { license_status } ] = useSettingsValue();

	const get_menu_icon = function ( menu_id ) {
		let menu_icon = '';

		switch ( menu_id ) {
			case 'clone':
				menu_icon = <DocumentDuplicateIcon className="h-5 w-5" />;
				break;
			case 'delete':
				menu_icon = <TrashIcon className="h-5 w-5" />;
				break;
			case 'abtest':
				menu_icon = <ChartPieIcon className="h-5 w-5" />;
				break;
			case 'archived':
				menu_icon = <ArchiveBoxIcon className="h-5 w-5" />;
				break;
			case 'winner':
				menu_icon = <TrophyIcon className="h-5 w-5" />;
				break;

			default:
				menu_icon = <ArrowUpCircleIcon className="h-5 w-5" />;
				break;
		}

		return menu_icon;
	};

	return (
		<>
			<Menu
				as="div"
				id={ `step_more_options_${ id }` }
				className="wcf-step-row__actions-menu relative inline-block text-left"
			>
				<div>
					<Menu.Button className="inline-flex w-full p-1 text-sm font-semibold text-gray-900 hover:text-primary-500">
						<Tooltip
							text={ __( 'More Options', 'cartflows' ) }
							classes={ '!ml-0' }
							descClass={ '!z-20' }
							icon={
								<EllipsisVerticalIcon
									className="-mr-1 h-5 w-5"
									aria-hidden="true"
								/>
							}
						/>
					</Menu.Button>
				</div>

				<Transition
					as={ Fragment }
					enter="transition ease-out duration-100"
					enterFrom="transform opacity-0 scale-95"
					enterTo="transform opacity-100 scale-100"
					leave="transition ease-in duration-75"
					leaveFrom="transform opacity-100 scale-100"
					leaveTo="transform opacity-0 scale-95"
				>
					<Menu.Items className="wcf-step-actions-menu__dropdown_menu absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
						<div className="py-1">
							{ actions.map( ( action ) => {
								const action_class = action.class,
									action_text = action.text;
								let is_pro_required = false,
									is_license_required = false;

								if (
									( ! wcfCartflowsPro() && action?.pro ) ||
									( 'abtest' === action.slug &&
										! wcfCartflowsTypePro() )
								) {
									is_pro_required = true;
								}

								if (
									wcfCartflowsPro() &&
									action?.pro &&
									'Activated' !== license_status
								) {
									is_license_required = true;
								}

								return (
									<Menu.Item key={ action?.text }>
										<a
											href={ action?.link }
											// style=""
											className={ `wcf-step__action-btn ${ action_class } ${
												is_pro_required ||
												is_license_required
													? 'wcf-pro pointer-events-none text-gray-400'
													: 'text-gray-700'
											} px-4 py-2 text-sm flex gap-1.5 hover:bg-primary-25 hover:text-primary-500` }
											title={ action?.text }
											data-id={ id }
											data-control-id={ control_id }
											onClick={
												onClickEvents[ action.slug ] &&
												onClickEvents[ action.slug ]
											}
											data-action={ action.ajaxcall }
											key={ action.slug }
										>
											{ get_menu_icon( action.slug ) }
											<span
												className="wcf-step-row__btn-text"
												data-action={ action.ajaxcall }
											>
												{ action_text }{ ' ' }
												{ is_pro_required ||
												is_license_required
													? __(
															' (Pro)',
															'cartflows'
													  )
													: '' }
											</span>
										</a>
									</Menu.Item>
								);
							} ) }
						</div>
					</Menu.Items>
				</Transition>
			</Menu>
		</>
	);
}

export default StepActionMenu;
