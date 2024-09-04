import React, { useState } from 'react';
import { __ } from '@wordpress/i18n';
import ArchivedInnerStep from './ArchivedInnerStep';
import { ChevronRightIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

function ArchivedSteps( props ) {
	const { flow_id, control_id, archived_variations, type } = props;

	const [ showArchived, setshowArchived ] = useState( false );

	const toggleArchived = function () {
		setshowArchived( ! showArchived );
	};

	const getAbTestArchivedSteps = function () {
		const output = archived_variations.map( ( variation ) => {
			const innerStepProps = {
				step_id: variation.id,
				flow_id,
				control_id,
				title: variation.title,
				note: variation.note,
				deleted: variation.deleted,
				hide: variation.hide,
				date: variation.date,
				type,
				actions: Object.values( variation.actions ),
			};

			return (
				<ArchivedInnerStep { ...innerStepProps } key={ variation.id } />
			);
		} );

		return output;
	};

	return (
		<div className="wcf-archived-wrapper p-4 bg-white w-full rounded-b-lg">
			<span
				id="wcf-archived-button"
				onClick={ toggleArchived }
				className={ `text-gray-800 text-sm flex items-center gap-1 cursor-pointer p-1 ${
					showArchived ? 'is-active' : ''
				} ` }
			>
				{ __( 'Archived Steps', 'cartflows' ) }
				{ showArchived ? (
					<ChevronDownIcon
						className="w-4 h-4 stroke-1 mt-0.5"
						aria-hidden="true"
					/>
				) : (
					<ChevronRightIcon
						className="w-4 h-4 stroke-1 mt-0.5"
						aria-hidden="true"
					/>
				) }
			</span>
			{ showArchived && (
				<div
					className="wcf-archived-steps divide-y divide-gray-200" /*style={ { display: 'none' } }*/
				>
					{ getAbTestArchivedSteps() }
				</div>
			) }
		</div>
	);
}

export default ArchivedSteps;
