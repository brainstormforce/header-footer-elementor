import React, { useEffect, useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import './OrderBumpPreview.scss';
import { useStateValue } from '@Utils/StateProvider';
import { __ } from '@wordpress/i18n';

function OrderBumpPreview() {
	const [ { current_ob } ] = useStateValue();

	const [ isHovering, setIsHovering ] = useState( false );

	const handleMouseEnter = () => {
		setIsHovering( true );
	};

	const handleMouseLeave = () => {
		setIsHovering( false );
	};

	const order_bump = current_ob;

	const replace_shortcodes = ( content ) => {
		let product_data = order_bump.product;

		if ( content && product_data ) {
			if ( Array.isArray( product_data ) ) {
				product_data = order_bump.product[ 0 ];
			}
			content = content.replace(
				'{{product_name}}',
				product_data.product_name
			);
			content = content.replace(
				'{{product_price}}',
				product_data.display_price
					? product_data.display_price
					: product_data.original_price
			);
			content = content.replace(
				'{{product_desc}}',
				product_data.product_desc
			);
			content = content.replace( '{{quantity}}', order_bump.quantity );
		}

		return content;
	};

	const position = order_bump.position,
		checkbox_label = ReactHtmlParser(
			replace_shortcodes( order_bump.checkbox_label )
		),
		highlight_text = ReactHtmlParser(
			replace_shortcodes( order_bump.hl_text )
		),
		product_desc = ReactHtmlParser(
			replace_shortcodes( order_bump.desc_text )
		),
		show_arrow = order_bump.show_arrow,
		style = order_bump.style,
		title = ReactHtmlParser( replace_shortcodes( order_bump.title_text ) ),
		action_element = order_bump.action_element,
		show_animation = order_bump.show_animation,
		enable_show_image = order_bump.enable_show_image,
		display_quantity_field = order_bump.display_quantity_field;

	const animate = 'yes' === show_animation ? 'wcf-blink' : '';
	const bump_order_blinking_arrow = (
		<svg
			version="1.1"
			className={ `wcf-pointing-arrow ${ animate }` }
			id="Capa_1"
			xmlns="http://www.w3.org/2000/svg"
			//xmlns:xlink="http://www.w3.org/1999/xlink"
			x="0px"
			y="0px"
			width="20px"
			height="15px"
			fill="red"
			viewBox="310 253 90 70"
			enableBackground="new 310 253 90 70"
			//xml:space="preserve"
		>
			<g>
				<g>
					<path d="M364.348,253.174c-0.623,0.26-1.029,0.867-1.029,1.54v18.257h-51.653c-0.919,0-1.666,0.747-1.666,1.666v26.658c0,0.92,0.747,1.666,1.666,1.666h51.653v18.327c0,0.673,0.406,1.28,1.026,1.54c0.623,0.257,1.34,0.116,1.816-0.36l33.349-33.238 c0.313-0.313,0.49-0.737,0.49-1.18c0-0.443-0.177-0.866-0.487-1.179l-33.349-33.335 C365.688,253.058,364.971,252.915,364.348,253.174z" />
				</g>
			</g>
		</svg>
	);
	const bump_bg_color = order_bump.bg_color,
		bump_border_style = order_bump.border_style,
		bump_border_color = order_bump.border_color,
		bump_box_border_width = order_bump.box_border_width,
		bump_box_border_radius = order_bump.box_border_radius,
		bump_box_shadow_color = order_bump.box_shadow_color,
		bump_box_shadow_horizontal =
			'' !== order_bump.box_shadow_horizontal
				? order_bump.box_shadow_horizontal
				: 0,
		bump_box_shadow_vertical =
			'' !== order_bump.box_shadow_vertical
				? order_bump.box_shadow_vertical
				: 0,
		bump_box_shadow_blur =
			'' !== order_bump.box_shadow_blur ? order_bump.box_shadow_blur : 0,
		bump_box_shadow_spread =
			'' !== order_bump.box_shadow_spread
				? order_bump.box_shadow_spread
				: 0,
		label_color = order_bump.label_color
			? order_bump.label_color
			: '#7a7a7a',
		label_bg_color = order_bump.label_bg_color,
		desc_text_color = order_bump.desc_text_color,
		hl_text_color = order_bump.hl_text_color,
		button_text_color = order_bump.button_text_color,
		button_text_hover_color = order_bump.button_text_hover_color,
		button_color = order_bump.button_color,
		button_border_width = order_bump.button_border_width,
		button_border_style = order_bump.button_border_style,
		button_border_color = order_bump.button_border_color,
		button_border_radius = order_bump.button_border_radius,
		button_bg_hover_color = order_bump.button_hover_color,
		title_color = order_bump.title_text_color,
		label_border_style = order_bump.label_border_style,
		label_border_width = order_bump.label_border_width,
		label_border_radius = order_bump.label_border_radius,
		//label_bg_color = order_bump['label_bg_color'],
		label_border_color = order_bump.label_border_color;

	const wrap_style = {
		background: bump_bg_color,
		borderStyle: bump_border_style,
		borderColor: bump_border_color,
		borderRadius:
			'' !== bump_box_border_radius
				? bump_box_border_radius + 'px'
				: '4px',
		borderWidth:
			'' !== bump_box_border_width ? bump_box_border_width + 'px' : '1px',
		boxShadow:
			bump_box_shadow_horizontal +
			'px ' +
			bump_box_shadow_vertical +
			'px ' +
			bump_box_shadow_blur +
			'px ' +
			bump_box_shadow_spread +
			'px ' +
			bump_box_shadow_color,
	};

	let field_wrap_style = {},
		label_styles = {},
		button_styles = {};

	if ( 'style-1' === style ) {
		field_wrap_style = {
			borderColor: bump_border_color,
			borderBottomStyle:
				'inherit' !== bump_border_style ? bump_border_style : 'solid',
			background: label_bg_color,
			borderWidth: bump_box_border_width + 'px',
		};
		wrap_style.borderStyle =
			'inherit' !== bump_border_style ? bump_border_style : 'solid';
	} else if ( 'style-2' === style ) {
		field_wrap_style = {
			borderColor: bump_border_color,
			borderTopStyle:
				'inherit' !== bump_border_style ? bump_border_style : 'solid',
			background: label_bg_color,
			borderWidth: bump_box_border_width + 'px',
		};
		wrap_style.borderStyle =
			'inherit' !== bump_border_style ? bump_border_style : 'solid';
	} else if ( 'style-3' === style ) {
		wrap_style.borderStyle =
			'inherit' !== bump_border_style ? bump_border_style : 'solid';
	} else if ( 'style-4' === style ) {
		wrap_style.borderStyle =
			'inherit' !== bump_border_style ? bump_border_style : 'solid';
		button_styles = {
			color: isHovering ? button_text_hover_color : button_text_color,
			background: isHovering ? button_bg_hover_color : button_color,
			borderWidth:
				'' !== button_border_width ? button_border_width + 'px' : '1px',
			borderStyle:
				'inherit' !== button_border_style
					? button_border_style
					: 'none',
			borderColor: button_border_color,
			borderRadius:
				'' !== button_border_radius
					? button_border_radius + 'px'
					: '3px',
		};
	} else if ( 'style-5' === style ) {
		wrap_style.borderStyle =
			'inherit' !== bump_border_style ? bump_border_style : '';

		label_styles = {
			borderStyle:
				'inherit' !== label_border_style ? label_border_style : '',
			borderWidth: label_border_width + 'px',
			borderRadius: label_border_radius + 'px',
			borderColor: label_border_color,
			background: label_bg_color,
			padding: label_bg_color ? '5px 10px' : '5px 0',
		};

		button_styles = {
			color: isHovering ? button_text_hover_color : button_text_color,
			background: isHovering ? button_bg_hover_color : button_color,
			borderWidth:
				'' !== button_border_width ? button_border_width + 'px' : '1px',
			borderStyle:
				'inherit' !== button_border_style
					? button_border_style
					: 'solid',
			borderColor: button_border_color,
			borderRadius:
				'' !== button_border_radius
					? button_border_radius + 'px'
					: '3px',
		};
	}

	let product_image = '',
		ob_image_position = 'left',
		ob_image_width = 'auto';

	if ( 'yes' === enable_show_image ) {
		product_image = order_bump.product_image;
		ob_image_position = order_bump.ob_image_position;
		ob_image_width =
			'' !== order_bump.ob_image_width
				? order_bump.ob_image_width + 'px'
				: 'auto';
	}

	// Scroll to top fix the preview section
	useEffect( () => {
		const OB_wrapper = document.getElementById(
			'wcf-order-bump-preview-wrapper'
		);

		const sticky_offset = OB_wrapper.offsetTop - 25;
		const scrollCallBack = window.addEventListener( 'scroll', () => {
			if ( window.pageYOffset > sticky_offset ) {
				OB_wrapper.classList.add( 'sticky' );
			} else {
				OB_wrapper.classList.remove( 'sticky' );
			}
		} );

		return () => {
			window.removeEventListener( 'scroll', scrollCallBack );
		};
	}, [] );
	// Scroll to top fix the preview section

	const get_quantity_field = function () {
		let qty_field_html = '';

		if ( 'yes' === display_quantity_field ) {
			qty_field_html = (
				<div className="wcf-ob-qty-selection-wrap">
					<span className="wcf-ob-qty-selection-btn wcf-ob-qty-decrement wcf-ob-qty-change-icon">
						-
					</span>
					<input
						type="number"
						className="wcf-order-bump-quantity-updater"
						name="wcf_order_bump_quantity"
						placeholder="1"
						defaultValue={ order_bump.quantity }
						min="1"
					/>
					<span className="wcf-ob-qty-selection-btn wcf-ob-qty-increment wcf-ob-qty-change-icon">
						+
					</span>
				</div>
			);
		}

		return qty_field_html;
	};

	const ob_html = function () {
		let ob_style_html = '';
		if ( 'style-1' === style ) {
			ob_style_html = (
				<div
					className={ `wcf-bump-order-content wcf-bump-order-image-${ ob_image_position } ` }
				>
					<div
						className="wcf-bump-order-field-wrap"
						style={ field_wrap_style }
					>
						{ 'right' !== ob_image_position && (
							<label style={ { color: label_color } }>
								{ 'yes' === show_arrow &&
									bump_order_blinking_arrow }
								<input
									type="checkbox"
									id="wcf-bump-order-cb"
									className="wcf-bump-order-cb"
									name="wcf-bump-order-cb"
									value=""
								/>
								<span className="wcf-bump-order-label">
									{ checkbox_label }
								</span>
							</label>
						) }

						{ 'right' === ob_image_position && (
							<label style={ { color: label_color } }>
								<span className="wcf-bump-order-label">
									{ checkbox_label }
								</span>
								<input
									type="checkbox"
									id="wcf-bump-order-cb"
									className="wcf-bump-order-cb"
									name="wcf-bump-order-cb"
									value=""
								/>
								{ 'yes' === show_arrow &&
									bump_order_blinking_arrow }
							</label>
						) }
					</div>
					<div className="wcf-content-container">
						{ '' !== product_image &&
							'right' !== ob_image_position && (
								<div
									className="wcf-bump-order-offer-content-left"
									style={ {
										width:
											'auto' !== ob_image_width
												? ob_image_width
												: '',
									} }
								>
									<img
										src={ product_image }
										className="wcf-image"
										alt={ __(
											'Order Bump Product Image',
											'cartflows'
										) }
									/>
								</div>
							) }
						<div className="wcf-bump-order-offer-content-right">
							<div className="wcf-bump-order-offer">
								<span
									className="wcf-bump-order-bump-highlight"
									style={ { color: hl_text_color } }
								>
									{ highlight_text }
								</span>
							</div>
							<div
								className="wcf-bump-order-desc"
								style={ { color: desc_text_color } }
							>
								{ product_desc }
							</div>
							{ get_quantity_field() }
						</div>

						{ '' !== product_image &&
							'right' === ob_image_position && (
								<div
									className="wcf-bump-order-offer-content-left"
									style={ {
										width:
											'auto' !== ob_image_width
												? ob_image_width
												: '',
									} }
								>
									<img
										src={ product_image }
										className="wcf-image"
										alt={ __(
											'Order Bump Product Image',
											'cartflows'
										) }
									/>
								</div>
							) }
					</div>
				</div>
			);
		} else if ( 'style-2' === style ) {
			ob_style_html = (
				<div
					className={ `wcf-bump-order-content wcf-bump-order-image-${ ob_image_position } ` }
				>
					<div className="wcf-bump-order-offer">
						<span
							className="wcf-bump-order-bump-highlight"
							style={ { color: hl_text_color } }
						>
							{ highlight_text }
						</span>
					</div>

					<div className="wcf-content-container">
						{ '' !== product_image &&
							'right' !== ob_image_position && (
								<div
									className="wcf-bump-order-offer-content-left"
									style={ {
										width:
											ob_image_width === 'auto'
												? ''
												: ob_image_width,
									} }
								>
									<img
										src={ product_image }
										className="wcf-image"
										alt={ __(
											'Order Bump Product Image',
											'cartflows'
										) }
									/>
								</div>
							) }

						<div className="wcf-bump-order-offer-content-right">
							<div
								className="wcf-bump-order-desc"
								style={ { color: desc_text_color } }
							>
								{ product_desc }
							</div>
							{ get_quantity_field() }
						</div>

						{ '' !== product_image &&
							'right' === ob_image_position && (
								<div
									className="wcf-bump-order-offer-content-left"
									style={ {
										width:
											ob_image_width === 'auto'
												? ''
												: ob_image_width,
									} }
								>
									<img
										src={ product_image }
										className="wcf-image"
										alt={ __(
											'Order Bump Product Image',
											'cartflows'
										) }
									/>
								</div>
							) }
					</div>

					<div
						className="wcf-bump-order-field-wrap"
						style={ field_wrap_style }
					>
						{ 'right' !== ob_image_position && (
							<label style={ { color: label_color } }>
								{ 'yes' === show_arrow &&
									bump_order_blinking_arrow }
								<input
									type="checkbox"
									id="wcf-bump-order-cb"
									className="wcf-bump-order-cb"
									name="wcf-bump-order-cb"
									value=""
								/>
								<span className="wcf-bump-order-label">
									{ checkbox_label }
								</span>
							</label>
						) }

						{ 'right' === ob_image_position && (
							<label style={ { color: label_color } }>
								<span className="wcf-bump-order-label">
									{ checkbox_label }
								</span>
								<input
									type="checkbox"
									id="wcf-bump-order-cb"
									className="wcf-bump-order-cb"
									name="wcf-bump-order-cb"
									value=""
								/>
								{ 'yes' === show_arrow &&
									bump_order_blinking_arrow }
							</label>
						) }
					</div>
				</div>
			);
		} else if ( 'style-3' === style ) {
			ob_style_html = (
				<div
					className={ `wcf-bump-order-content wcf-bump-order-image-${ ob_image_position } ` }
				>
					{ 'right' !== ob_image_position && (
						<div className="wcf-bump-order-field-wrap">
							{ '' !== product_image &&
								'top' !== ob_image_position && (
									<div className="wcf-bump-order-action">
										{ 'yes' === show_arrow &&
											bump_order_blinking_arrow }
										<input
											type="checkbox"
											id="wcf-bump-order-cb"
											className="wcf-bump-order-cb"
											name="wcf-bump-order-cb"
											value=""
										/>
									</div>
								) }

							{ '' !== product_image && (
								<div
									className="wcf-bump-order-image"
									style={ {
										maxWidth:
											'auto' !== ob_image_width
												? ob_image_width
												: '',
									} }
								>
									<img
										src={ product_image }
										className="wcf-image"
										alt={ __(
											'Order Bump Product Image',
											'cartflows'
										) }
									/>
								</div>
							) }

							<div className="wcf-bump-order-text">
								<div className="wcf-bump-order-label">
									{ '' === product_image && (
										<>
											{ 'yes' === show_arrow &&
												bump_order_blinking_arrow }
											<input
												type="checkbox"
												id="wcf-bump-order-cb"
												className="wcf-bump-order-cb"
												name="wcf-bump-order-cb"
												value=""
											/>
										</>
									) }

									{ '' !== product_image &&
										'top' === ob_image_position && (
											<>
												{ 'yes' === show_arrow &&
													bump_order_blinking_arrow }
												<input
													type="checkbox"
													id="wcf-bump-order-cb"
													className="wcf-bump-order-cb"
													name="wcf-bump-order-cb"
													value=""
												/>
											</>
										) }

									<label style={ { color: title_color } }>
										{ title }
									</label>
								</div>
								<div
									className="wcf-bump-order-desc"
									style={ { color: desc_text_color } }
								>
									{ product_desc }
								</div>
								{ get_quantity_field() }
							</div>
						</div>
					) }

					{ 'right' === ob_image_position && (
						<div className="wcf-bump-order-field-wrap">
							<div className="wcf-bump-order-text">
								<div className="wcf-bump-order-label">
									<label style={ { color: title_color } }>
										{ title }
									</label>
									{ '' === product_image && (
										<>
											{ 'yes' === show_arrow &&
												bump_order_blinking_arrow }
											<input
												type="checkbox"
												id="wcf-bump-order-cb"
												className="wcf-bump-order-cb"
												name="wcf-bump-order-cb"
												value=""
											/>
										</>
									) }
								</div>
								<div
									className="wcf-bump-order-desc"
									style={ { color: desc_text_color } }
								>
									{ product_desc }
								</div>
								{ get_quantity_field() }
							</div>

							{ '' !== product_image && (
								<div
									className="wcf-bump-order-image"
									style={ {
										maxWidth:
											'auto' !== ob_image_width
												? ob_image_width
												: '',
									} }
								>
									<img
										src={ product_image }
										className="wcf-image"
										alt={ __(
											'Order Bump Product Image',
											'cartflows'
										) }
									/>
								</div>
							) }

							{ '' !== product_image && (
								<div className="wcf-bump-order-action">
									<input
										type="checkbox"
										id="wcf-bump-order-cb"
										className="wcf-bump-order-cb"
										name="wcf-bump-order-cb"
										value=""
									/>
									{ 'yes' === show_arrow &&
										bump_order_blinking_arrow }
								</div>
							) }
						</div>
					) }
				</div>
			);
		} else if ( 'style-4' === style ) {
			ob_style_html = (
				<div
					className={ `wcf-bump-order-content wcf-bump-order-image-${ ob_image_position } ` }
				>
					<div className="wcf-bump-order-field-wrap">
						{ '' !== product_image &&
							'right' !== ob_image_position && (
								<div className="wcf-bump-order-image">
									<img
										src={ product_image }
										className="wcf-image"
										style={ {
											width:
												ob_image_width === 'auto'
													? '100px'
													: ob_image_width,
										} }
										alt={ __(
											'Order Bump Product Image',
											'cartflows'
										) }
									/>
								</div>
							) }

						{ 'right' !== ob_image_position && (
							<>
								<div className="wcf-bump-order-text">
									<div className="wcf-bump-order-info">
										<div className="wcf-bump-order-label">
											<label
												style={ { color: title_color } }
											>
												{ title }
											</label>
										</div>
										<div
											className="wcf-bump-order-desc"
											style={ { color: desc_text_color } }
										>
											{ product_desc }
										</div>
										{ get_quantity_field() }
									</div>
								</div>

								<div className="wcf-bump-order-action">
									<input
										type="checkbox"
										id="wcf-bump-order-cb"
										className="wcf-bump-order-cb"
										name="wcf-bump-order-cb"
										value=""
									/>
									<a
										className="wcf-bump-order-cb-button wcf-bump-add-to-cart"
										style={ button_styles }
										onMouseEnter={ handleMouseEnter }
										onMouseLeave={ handleMouseLeave }
									>
										{ __( 'Add', 'cartflows' ) }
									</a>
								</div>
							</>
						) }

						{ 'right' === ob_image_position && (
							<>
								<div className="wcf-bump-order-action">
									<input
										type="checkbox"
										id="wcf-bump-order-cb"
										className="wcf-bump-order-cb"
										name="wcf-bump-order-cb"
										value=""
									/>
									<a
										className="wcf-bump-order-cb-button wcf-bump-add-to-cart"
										style={ button_styles }
										onMouseEnter={ handleMouseEnter }
										onMouseLeave={ handleMouseLeave }
									>
										{ __( 'Add', 'cartflows' ) }
									</a>
								</div>

								<div className="wcf-bump-order-text">
									<div className="wcf-bump-order-info">
										<div className="wcf-bump-order-label">
											<label
												style={ { color: title_color } }
											>
												{ title }
											</label>
										</div>
										<div
											className="wcf-bump-order-desc"
											style={ { color: desc_text_color } }
										>
											{ product_desc }
										</div>
										{ get_quantity_field() }
									</div>
								</div>
							</>
						) }

						{ '' !== product_image &&
							'right' === ob_image_position && (
								<div className="wcf-bump-order-image">
									<img
										src={ product_image }
										className="wcf-image"
										style={ {
											width:
												ob_image_width === 'auto'
													? '100px'
													: ob_image_width,
										} }
										alt={ __(
											'Order Bump Product Image',
											'cartflows'
										) }
									/>
								</div>
							) }
					</div>
				</div>
			);
		} else if ( 'style-5' === style ) {
			ob_style_html = (
				<div className="wcf-bump-order-content">
					<div className="wcf-bump-order-field-wrap">
						<div
							className={ `wcf-bump-order-info wcf-bump-order-image-${ ob_image_position } ` }
						>
							{ '' !== product_image &&
								'right' !== ob_image_position && (
									<div className="wcf-bump-order-image">
										<img
											src={ product_image }
											className="wcf-image"
											style={ { width: ob_image_width } }
											alt={ __(
												'Order Bump Product Image',
												'cartflows'
											) }
										/>
									</div>
								) }

							<div className="wcf-bump-order-text">
								{ '' !== title && (
									<div
										className="wcf-bump-order-label"
										style={ { color: title_color } }
									>
										<span>{ title }</span>
									</div>
								) }

								{ '' !== product_desc && (
									<div
										className="wcf-bump-order-desc"
										style={ { color: desc_text_color } }
									>
										{ product_desc }
									</div>
								) }
								{ get_quantity_field() }

								{ 'checkbox' === action_element && (
									<div
										className="wcf-bump-order-action"
										style={ label_styles }
									>
										{ 'yes' === show_arrow &&
											bump_order_blinking_arrow }
										<input
											type="checkbox"
											id="wcf-bump-order-cb"
											className="wcf-bump-order-cb"
											name="wcf-bump-order-cb"
											value=""
										/>
										<label style={ { color: label_color } }>
											{ checkbox_label }
										</label>
									</div>
								) }

								{ 'button' === action_element && (
									<div className="wcf-bump-order-action wcf-ob-action-button">
										<a
											className="wcf-bump-order-cb-button wcf-bump-add-to-cart"
											style={ button_styles }
											onMouseEnter={ handleMouseEnter }
											onMouseLeave={ handleMouseLeave }
										>
											{ __( 'Add', 'cartflows' ) }
										</a>
									</div>
								) }
							</div>

							{ '' !== product_image &&
								'right' === ob_image_position && (
									<div className="wcf-bump-order-image">
										<img
											src={ product_image }
											className="wcf-image"
											style={ {
												width: ob_image_width,
											} }
											alt={ __(
												'Order Bump Product Image',
												'cartflows'
											) }
										/>
									</div>
								) }
						</div>
					</div>
				</div>
			);
		}

		return ob_style_html;
	};

	return (
		<div
			id="wcf-order-bump-preview-wrapper"
			className="wcf-order-bump-preview-wrapper"
		>
			{ /* <div className="wcf-order-bump-design-tab__preview--title">
				<label>{ __( 'Order Bump Preview', 'cartflows' ) }</label>
			</div> */ }
			<div
				className={ `wcf-bump-order-wrap wcf-bump-order-${ style } wcf-${ position }` }
				style={ wrap_style }
			>
				{ ob_html() }
			</div>
		</div>
	);
}

export default OrderBumpPreview;
