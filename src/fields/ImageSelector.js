import React, { useState } from 'react';
import { Tooltip } from '@Fields';
import ReactHtmlParser from 'react-html-parser';
const { __ } = wp.i18n;
import { PhotoIcon } from '@heroicons/react/24/outline';

function ImageSelector( props ) {
	const {
		name,
		tooltip,
		value,
		label,
		objName,
		objValue,
		singleButton = false,
		sectionClass = false,
		wrapperClass = false,
		labelClass,
		desc,
		descClass,
		displayAlign = 'horizontal',
	} = props;

	const style = value ? {} : { display: 'none' };
	// const [ style, setStyle ] = useState( value ? {} : { display: 'none' } );

	const [ imageVal, setImageval ] = useState( value );
	const [ imageObj, setimageObj ] = useState( objValue );
	const [ isPlaceholderImg, setIsPlaceholder ] = useState(
		'image-placeholder.png' ===
			imageVal.substring( imageVal.lastIndexOf( '/' ) + 1 )
	);

	const sectionWrapperClass = sectionClass ? sectionClass : 'text-left',
		descWrapperClass = descClass
			? descClass
			: 'text-sm font-normal text-gray-500 mt-2';

	let fieldWrapper = wrapperClass
			? wrapperClass
			: 'flex items-center gap-2.5',
		labelWrapperClass = labelClass
			? labelClass
			: 'text-sm font-medium mb-2';

	if ( 'horizontal' !== displayAlign ) {
		fieldWrapper = 'block w-full text-left';
		labelWrapperClass = labelWrapperClass + ' mb-2';
	}

	const showMedia = ( event ) => {
		let file_frame = false,
			image_url = '';
		window.inputWrapper = '';

		event.preventDefault();

		const button = event.target;

		window.inputWrapper = button.closest( '.wcf-image-selector-field' );
		if ( file_frame ) {
			file_frame.open();
			return;
		}

		// Create the media frame.
		file_frame = wp.media( {
			multiple: false,
		} );

		// When an image is selected, run a callback.
		file_frame.on( 'select', function () {
			const attachment = file_frame
				.state()
				.get( 'selection' )
				.first()
				.toJSON();

			// If medium size is available, then user it else use original image.
			if ( attachment.sizes && attachment.sizes.medium ) {
				image_url = attachment.sizes.medium.url;
			} else {
				image_url = attachment.url;
			}

			setIsPlaceholder(
				'image-placeholder.png' ===
					image_url.substring( image_url.lastIndexOf( '/' ) + 1 )
			);

			setImageval( image_url );
			setimageObj( attachment );

			const preview = document.getElementById( 'wcf-image-preview' );
			// place first attachment in field
			preview.setAttribute( 'style', 'display:block' );

			// Trigger change
			triggerChangeEvent( event, name, image_url );
			triggerChangeEvent( event, objName, imageObj );
		} );

		// Finally, open the modal
		file_frame.open();
	};

	// const removeImage = ( event ) => {
	// 	event.preventDefault();

	// 	setImageval( '' );
	// 	setIsPlaceholder( true );
	// 	setimageObj( '' );
	// 	setStyle( { display: 'none' } );

	// 	triggerChangeEvent( event, name, '' );
	// 	triggerChangeEvent( event, objName, '' );
	// };

	// should fix, need proper naming for variables
	//eslint-disable-next-line no-shadow
	const triggerChangeEvent = ( event, name, value ) => {
		event.preventDefault();

		const changeEvent = new CustomEvent( 'wcf:image-selector:change', {
			bubbles: true,
			detail: { e: event, name, value },
		} );

		document.dispatchEvent( changeEvent );
	};
	return (
		<div
			className={ `wcf-field wcf-image-selector-field ${ sectionWrapperClass }` }
		>
			<div className={ `wcf-field__data ${ fieldWrapper }` }>
				{ label && (
					<div
						className={ `wcf-field__data--label ${ labelWrapperClass }` }
					>
						<label>
							{ label }
							{ tooltip && <Tooltip text={ tooltip } /> }
						</label>
					</div>
				) }
				<div className="wcf-field__data--content">
					<div className="wcf-image-selector-field__input p-0">
						{ ! isPlaceholderImg && imageVal && (
							<div
								id="wcf-image-preview"
								className="text-center border-solid border-gray-100 mb-3 leading-4"
								style={ style }
							>
								<img
									src={ imageVal }
									className="saved-image"
									name={ name }
									width="150"
									alt={ __( 'Image Preview', 'cartflows' ) }
								/>
							</div>
						) }

						<input
							type="hidden"
							id={ name }
							className="wcf-image"
							name={ name }
							value={ imageVal }
						></input>
						<input
							type="hidden"
							className="wcf-image-obj"
							name={ objName }
							value={ JSON.stringify( imageObj ) }
						/>
						{ ! singleButton && isPlaceholderImg && (
							<div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 hover:border-primary-500 px-6 py-10">
								<div className="text-center">
									<PhotoIcon
										className="mx-auto h-12 w-12 text-gray-300"
										aria-hidden="true"
									/>
									<div className="mt-4 flex text-sm leading-6 text-gray-600">
										<a
											href="#!"
											htmlFor="file-upload"
											className="relative cursor-pointer rounded-md bg-white font-semibold text-primary-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2 hover:text-primary-500"
											onClick={ showMedia }
										>
											<span>
												{ __(
													'Upload a file',
													'cartflows'
												) }
											</span>
										</a>
										<p className="pl-1">
											{ __(
												'or drag and drop',
												'cartflows'
											) }
										</p>
									</div>
									<p className="text-xs leading-5 text-gray-600">
										{ __(
											'PNG, JPG, GIF up to 10MB',
											'cartflows'
										) }
									</p>
								</div>
							</div>
						) }

						{ /* Show this section only if wanted to show buttons instead of drag & drop. */ }
						<div className="wcf-image-selector-field-buttons flex gap-3 m-0 p-0">
							{ singleButton && (
								<div className="wcf-image-selector-field-button-select">
									<button
										type="button"
										className="wcf-select-image wcf-button wcf-secondary-button"
										onClick={ showMedia }
									>
										{ imageVal
											? __( 'Change Image', 'cartflows' )
											: __(
													'Select Image',
													'cartflows'
											  ) }
									</button>
								</div>
							) }

							{ ! isPlaceholderImg && (
								<div className="wcf-image-selector-field-button-remove">
									<button
										type="button"
										className="wcf-remove-image wcf-button wcf-secondary-button"
										onClick={ showMedia }
									>
										{ imageVal
											? __( 'Change Image', 'cartflows' )
											: __(
													'Select Image',
													'cartflows'
											  ) }
									</button>
								</div>
							) }

							{ /* { ! isPlaceholderImg && (
								<div className="wcf-image-selector-field-button-remove">
									<button
										type="button"
										className="wcf-remove-image wcf-button wcf-secondary-button"
										onClick={ removeImage }
									>
										{ __( 'Remove Image', 'cartflows' ) }
									</button>
								</div>
							) } */ }
						</div>
					</div>
				</div>
			</div>
			{ desc && (
				<div className={ `wcf-field__desc ${ descWrapperClass }` }>
					{ ReactHtmlParser( desc ) }
				</div>
			) }
		</div>
	);
}

export default ImageSelector;
