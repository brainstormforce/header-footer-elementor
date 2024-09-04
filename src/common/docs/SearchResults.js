import ReactHtmlParser from 'react-html-parser';
import {
	ArrowTopRightOnSquareIcon,
	ChevronRightIcon,
} from '@heroicons/react/24/outline';

const SearchResults = ( { data } ) => {
	return (
		<div>
			{ data &&
				data.map( ( item ) => (
					<a
						href={ item.url }
						target="blank"
						className="flex items-center justify-between text-slate-800 rounded-md p-2 pl-0 hover:bg-gray-50 group cursor-pointer"
						key={ item.title }
					>
						<div className="flex items-center">
							<ChevronRightIcon className="h-3 w-3 text-gray-500" />
							<div className="text-base leading-[1.625rem] text-slate-800 ml-2">
								{ ReactHtmlParser( item.title ) }
							</div>
						</div>

						<div className="text-slate-600 invisible group-hover:visible">
							<ArrowTopRightOnSquareIcon className="h-5 w-5" />
						</div>
					</a>
				) ) }
		</div>
	);
};

export default SearchResults;
