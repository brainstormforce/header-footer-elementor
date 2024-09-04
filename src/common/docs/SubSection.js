import { useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import {
	ArrowTopRightOnSquareIcon,
	ChevronUpIcon,
	BookmarkIcon,
	ChevronRightIcon,
	ChevronDownIcon,
} from '@heroicons/react/24/outline';

const SubSection = ( { item, key } ) => {
	const [ sectionData, setSectionData ] = useState( false );

	const subItems = cartflows_admin.cf_docs_data.docs.filter( ( doc ) => {
		return doc.category.includes( item[ 0 ] );
	} );

	const toggleSection = () => {
		setSectionData( ! sectionData );
	};
	return (
		<div
			key={ key }
			className={
				'wcf-docs--category border-t border-slate-200 first:border-0 py-5 pr-5'
			}
		>
			<button
				onClick={ toggleSection }
				className="w-full flex justify-between items-center"
			>
				<div className="flex items-center">
					<BookmarkIcon className="h-6 w-6 text-gray-500" />

					<h4 className="text-base font-medium leading-[1.625rem] text-slate-800 ml-2">
						{ ReactHtmlParser( item[ 1 ].name ) }
					</h4>
				</div>
				<div>
					{ sectionData ? (
						<ChevronUpIcon className="h-6 w-6 text-gray-500" />
					) : (
						<ChevronDownIcon className="h-6 w-6 text-gray-500" />
					) }
				</div>
			</button>
			{ /* Sub Section Items */ }
			{ sectionData && (
				<div className="wcf-docs-category--docs-list mt-5 ml-2">
					<div className="space-y-1 mb-5">
						{ /* Single Item */ }
						{ subItems.splice( 0, 5 ).map( ( subItem ) => (
							<a
								href={ subItem.url }
								target="_blank"
								className="flex items-center justify-between text-slate-800 rounded-md p-2 pl-0 hover:bg-gray-50 group cursor-pointer focus:outline-0"
								key={ subItem.title }
								rel="noreferrer"
							>
								<div className="flex items-center">
									<ChevronRightIcon className="h-3 w-3 text-gray-500" />

									<div className="text-base leading-[1.625rem] text-slate-800 ml-2">
										{ ReactHtmlParser( subItem.title ) }
									</div>
								</div>
								<div className="text-slate-600 invisible group-hover:visible">
									<ArrowTopRightOnSquareIcon className="h-5 w-5" />
								</div>
							</a>
						) ) }
					</div>

					<a
						href={ `https://cartflows.com/docs-category/${ item[ 0 ] }/` }
						target="_blank"
						className="wcf-docs-category--docs-list-read-more text-primary-500 hover:text-primary-600 text-sm font-medium leading-4 flex items-center"
						rel="noreferrer"
					>
						<span className="mr-2">
							{ `View all ${ ReactHtmlParser(
								item[ 1 ].name
							) } docs` }
						</span>
						<ArrowTopRightOnSquareIcon className="h-5 w-5" />
					</a>
				</div>
			) }
		</div>
	);
};

export default SubSection;
