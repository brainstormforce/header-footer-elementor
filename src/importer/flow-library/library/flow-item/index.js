// External.
import { __ } from '@wordpress/i18n';
import { compose } from '@wordpress/compose';
import { withDispatch } from '@wordpress/data';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';

function FlowItem( { item, setPreview } ) {
	const { thumbnail_image_url, title, type } = item;

	return (
		<div
			className="wcf-flow-template--item group relative cursor-pointer transition ease-in-out delay-150"
			onClick={ () => setPreview( item ) }
		>
			{ 'pro' === type ? (
				<div
					className={ `z-10 wcf-badge wcf-badge--info absolute top-5 right-5 text-xs uppercase font-medium py-px px-2 shadow-custom-2 wcf-item__type--${ type }` }
				>
					<span>{ type } </span>
				</div>
			) : (
				''
			) }

			<div className="wcf-item__inner bg-white border border-gray-200 rounded-lg">
				<div className="wcf-item__thumbnail-wrap max-h-96 overflow-hidden relative">
					<div className="wcf-item__thumbnail overflow-hidden">
						<img
							className="wcf-flow-template--thumbnail-image"
							src={ thumbnail_image_url }
							title={ title }
							alt={ title }
						/>
					</div>
					<div className="wcf-item__view invisible group-hover:visible absolute backdrop-brightness-50 top-0 w-full h-full transition ease-in-out delay-150">
						<div className="mx-auto my-0 text-center flex flex-col gap-4 relative top-1/2">
							<div className="wcf-item__btn">
								<span className="wcf-button wcf-primary-button">
									<ArrowTopRightOnSquareIcon className="h-18 w-18 stroke-2" />
									{ __( 'View All Steps', 'cartflows' ) }
								</span>
							</div>
						</div>
					</div>
				</div>

				<div className="wcf-item__heading-wrap border-t border-gray-200">
					<div className="wcf-item__heading text-base text-gray-800 font-medium p-4 text-center">
						{ title }
					</div>
				</div>
			</div>
		</div>
	);
}

export default compose(
	withDispatch( ( dispatch ) => {
		const { setPreview } = dispatch( 'wcf/importer' );
		return {
			setPreview( data ) {
				setPreview( data );
			},
		};
	} )
)( FlowItem );
