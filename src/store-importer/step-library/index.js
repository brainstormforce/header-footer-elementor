// External.
import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
import { Link, useLocation } from 'react-router-dom';

// Store.
import '@Admin/importer/store/index';

// Internal.
import { useStateValue } from '@Utils/StateProvider';
import Library from './library';
import Creator from './creator';

const StepLibrary = ( { default_page_builder } ) => {
	const [ { flow_id } ] = useStateValue();

	const query = new URLSearchParams( useLocation().search );
	const tab = query.get( 'tab' );

	if ( 'library' === tab ) {
		return <Library />;
	}

	return (
		<div className="wcf-flow-library wcf-flex">
			{ 'other' !== default_page_builder ? (
				<Link
					key="importer"
					to={ {
						pathname: 'admin.php',
						search: `?page=cartflows&action=wcf-edit-flow&flow_id=${ flow_id }&tab=library&sub=library`,
					} }
					className="wcf-flow-library__item wcf-flow-library__item--readymade"
				>
					Import from Library
				</Link>
			) : (
				''
			) }

			<Creator />
		</div>
	);
};

export default compose(
	withSelect( ( select ) => {
		const { getDefaultPageBuilder } = select( 'wcf/importer' );
		return {
			default_page_builder: getDefaultPageBuilder(),
		};
	} )
)( StepLibrary );
