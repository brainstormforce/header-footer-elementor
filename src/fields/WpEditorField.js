import React, { useState, useEffect } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { Tooltip } from '@Fields';
import './WpEditorField.scss';

function WpEditorField( props ) {
	const {
		name,
		value,
		label,
		desc,
		id,
		tooltip,
		rows,
		cols,
		sectionClass = false,
		wrapperClass = false,
		labelClass,
		descClass,
		displayAlign = 'horizontal',
	} = props;

	const [ inputvalue, setInputvalue ] = useState( value );

	const sectionWrapperClass = sectionClass ? sectionClass : 'text-left',
		descWrapperClass = descClass
			? descClass
			: 'text-sm font-medium text-gray-500 mt-2';
	let fieldWrapper = wrapperClass
			? wrapperClass
			: 'flex items-center gap-2.5',
		labelWrapperClass = labelClass
			? labelClass
			: 'text-sm font-medium text-left mb-2';

	if ( 'horizontal' !== displayAlign ) {
		fieldWrapper = 'block w-full text-left';
		labelWrapperClass = labelWrapperClass + ' mb-2';
	}

	useEffect( () => {
		let isActive = true;
		if ( isActive ) {
			wp.editor.initialize( id, {
				tinymce: true,
				quicktags: true,
				mediaButtons: false,
			} );

			jQuery( document ).on(
				'tinymce-editor-setup',

				function ( event, editor ) {
					editor.settings.toolbar1 =
						'bold,italic,underline,blockquote,strikethrough,bullist,numlist,alignleft,aligncenter,alignright,undo,redo,cartflows_ob'; //Teeny -fullscreen
					editor.on( 'change', function () {
						handleChange( event, editor.getContent() );
					} );
					editor.on( 'keyup', function () {
						handleChange( event, editor.getContent() );
					} );
					// May be for apps like Grammerly.
					// editor.on( 'click', function ( e ) {
					// 	handleChange( event, editor.getContent() );
					// } );
					editor.settings.forced_root_block = false;

					if ( 'desc_text' === name ) {
						editor.addButton( 'cartflows_ob', {
							type: 'menubutton',
							text: '',
							icon: 'cartflows-logo cartflows-logo-icon',
							menu: [
								{
									text: 'Product Name',
									value: '{{product_name}}',
									onclick() {
										editor.insertContent( this.value() );
									},
								},
								{
									text: 'Product Desc',
									value: '{{product_desc}}',
									onclick() {
										editor.insertContent( this.value() );
									},
								},
								{
									text: 'Product Price',
									value: '{{product_price}}',
									onclick() {
										editor.insertContent( this.value() );
									},
								},
								{
									text: 'Product Quantity',
									value: '{{quantity}}',
									onclick() {
										editor.insertContent( this.value() );
									},
								},
							].sort( function ( a, b ) {
								return a.text.localeCompare( b.text );
							} ),
						} );
					}
				}
			);
		}

		return () => {
			isActive = false;
			tinymce.activeEditor.destroy();
		};
	}, [] );

	function handleChange( e, content ) {
		setInputvalue( content );

		// Trigger change
		const changeEvent = new CustomEvent( 'wcf:wpeditor:change', {
			bubbles: true,
			detail: { e, name: props.name, value: content },
		} );

		document.dispatchEvent( changeEvent );
	}

	function updateValue( e ) {
		setInputvalue( e.target.value );

		// Trigger change
		const changeEvent = new CustomEvent( 'wcf:wpeditor:change', {
			bubbles: true,
			detail: { e, name: props.name, value: e.target.value },
		} );

		document.dispatchEvent( changeEvent );
	}

	return (
		<div
			className={ `wcf-field wcf-wp-editor-field ${ sectionWrapperClass }` }
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
					<textarea
						className={ props.class }
						name={ name }
						value={ inputvalue }
						id={ id }
						rows={ rows ? rows : '10' }
						cols={ cols ? cols : '60' }
						onChange={ updateValue }
					></textarea>
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

export default WpEditorField;
