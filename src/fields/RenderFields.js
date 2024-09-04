import React from 'react';
import { sprintf, __ } from '@wordpress/i18n';
import {
	CheckboxField,
	RadioField,
	SelectField,
	TextField,
	TextareaField,
	Select2Field,
	ProductRepeater,
	ColorPickerField,
	FontFamily,
	ImageSelector,
	NumberField,
	DocField,
	SectionHeadingField,
	ProductField,
	CouponField,
	SubHeadingField,
	PasswordField,
	SeparatorField,
	WpEditorField,
	ToggleField,
	SelectionCard,
} from '@Fields';

function RenderFields( props ) {
	const data = props.data;
	let value = props.value;
	const renderHtmlElement = props.displayAs ? props.displayAs : 'tr';
	let component = '';

	// Set the value provided with the settings array if not send in the options array
	if ( '' === value ) {
		value = data.value;
	}

	switch ( data.type ) {
		case 'text':
			component = (
				<TextField
					id={ data.name }
					sectionClass={ data?.sectionClass }
					wrapperClass={ data?.wrapperClass }
					labelClass={ data?.labelClass }
					descClass={ data?.descClass }
					class={ data?.class }
					name={ data.name }
					value={ data.value ? data.value : value }
					label={ data.label }
					placeholder={ data.placeholder }
					readonly={ data.readonly }
					desc={ data.desc }
					tooltip={ data.tooltip }
					displayAlign={ data.display_align }
				/>
			);

			break;

		case 'number':
			component = (
				<NumberField
					type={ data.type }
					id={ data.name }
					class={ data?.class }
					name={ data.name }
					value={ value }
					label={ data.label }
					placeholder={ data.placeholder }
					readonly={ data.readonly }
					min={ data.min }
					max={ data.max }
					desc={ data.desc }
					tooltip={ data.tooltip }
					afterfield={ data.afterfield }
					width={ data.width }
					sectionClass={ data?.sectionClass }
					wrapperClass={ data?.wrapperClass }
					labelClass={ data?.labelClass }
					descClass={ data?.descClass }
					displayAlign={ data?.display_align }
				/>
			);

			break;
		case 'checkbox':
			component = (
				<CheckboxField
					id={ data.name }
					name={ data.name }
					className={ data?.class }
					value={ value }
					label={ data.label }
					desc={ data.desc }
					notice={ data.notice }
					backComp={ data.backComp }
					tooltip={ data.tooltip }
					child_className={ data.child_class }
					isDisabled={ data.isDisabled }
					displayAlign={ data.display_align }
				/>
			);
			break;
		case 'toggle':
			component = (
				<ToggleField
					id={ data.name }
					name={ data.name }
					className={ data.class }
					value={ value }
					label={ data.label }
					desc={ data.desc }
					notice={ data.notice }
					backComp={ data.backComp }
					tooltip={ data.tooltip }
					child_className={ data.child_class }
					displayAlign={ data.display_align }
					fullWidth={ data.is_fullwidth }
				/>
			);
			break;

		case 'radio':
			component = (
				<RadioField
					id={ data.name }
					name={ data.name }
					value={ 'undefined' === typeof value ? '' : value }
					label={ data.label }
					options={ data.options }
					desc={ data.desc }
					tooltip={ data.tooltip }
					child_className={ data.child_class }
				/>
			);
			break;

		case 'textarea':
			component = (
				<TextareaField
					id={ data.name }
					name={ data.name }
					className={ data?.class }
					value={ value }
					label={ data.label }
					desc={ data.desc }
					tooltip={ data.tooltip }
					rows={ data.rows }
					cols={ data.cols }
					displayAlign={ data.display_align }
				/>
			);
			break;
		case 'select':
			component = (
				<SelectField
					id={ data.name }
					name={ data.name }
					class={ data.class }
					value={ value }
					label={ data.label }
					options={ data.options }
					desc={ data.desc }
					tooltip={ data.tooltip }
					prodata={ data?.pro_options }
					sectionClass={ data?.sectionClass }
					wrapperClass={ data?.wrapperClass }
					labelClass={ data?.labelClass }
					descClass={ data?.descClass }
					displayAlign={ data?.display_align }
				/>
			);
			break;
		case 'select_card':
			component = (
				<SelectionCard
					id={ data.name }
					name={ data.name }
					value={ value }
					label={ data.label }
					options={ data.options }
					desc={ data.desc }
					tooltip={ data.tooltip }
					prodata={ data?.pro_options }
					layout={ data?.layout }
					showRadio={ data?.display_radio }
				/>
			);
			break;
		case 'select2':
			component = (
				<Select2Field
					id={ data.name }
					name={ data.name }
					value={ value }
					label={ data.label }
					placeholder={ data.placeholder }
					desc={ data.desc }
					tooltip={ data.tooltip }
					options={ data.options }
					isMulti={ data.isMulti }
					displayAlign={ data.display_align }
				/>
			);

			break;
		case 'product':
			component = (
				<div>
					<ProductField
						name={ data.name }
						label={ data.label }
						desc={ data.desc }
						field={ data.fieldtype }
						allowed_products={
							data.allowed_product_types
								? data.allowed_product_types
								: ''
						}
						include_products={
							data.include_product_types
								? data.include_product_types
								: ''
						}
						excluded_products={
							data.excluded_product_types
								? data.excluded_product_types
								: ''
						}
						placeholder={ data.placeholder }
						tooltip={ data.tooltip }
						value={ value }
						nameComp={ data.nameComp }
						sectionClass={ data?.sectionClass }
						wrapperClass={ data?.wrapperClass }
						labelClass={ data?.labelClass }
						descClass={ data?.descClass }
					/>
				</div>
			);
			break;
		case 'coupon':
			component = (
				<div>
					<CouponField
						name={ data.name }
						label={ data.label }
						desc={ data.desc }
						field={ data.fieldtype }
						placeholder={ data.placeholder }
						tooltip={ data.tooltip }
						value={ value }
						nameComp={ data.nameComp }
					/>
				</div>
			);
			break;
		case 'product-repeater':
			component = (
				<ProductRepeater
					id={ data.name }
					name={ data.name }
					value={ value }
					label={ data.label }
					products={ data.products }
				/>
			);
			break;

		case 'font-family':
			component = (
				<FontFamily
					id={ data.name }
					name={ data.name }
					value={ value }
					label={ data.label }
					desc={ data.desc }
					tooltip={ data.tooltip }
					font_weight_name={ data.font_weight_name }
					font_weight_value={ data.font_weight_value }
					displayAlign={ data.display_align }
				/>
			);
			break;
		case 'separator':
			component = <SeparatorField />;
			break;

		case 'sub-heading':
			component = (
				<SubHeadingField
					subclassName={ data.subClass }
					label={ data.label }
					desc={ data.desc }
				/>
			);
			break;

		case 'color-picker':
			component = (
				<ColorPickerField
					id={ data.name }
					name={ data.name }
					label={ data.label }
					value={ value }
					desc={ data.desc }
					tooltip={ data.tooltip }
					displayAlign={ data.display_align }
					withBg={ data.withBg }
				/>
			);
			break;
		case 'password':
			component = (
				<PasswordField
					type={ data.type }
					id={ data.name }
					name={ data.name }
					value={ data.value ? data.value : value }
					label={ data.label }
					placeholder={ data.placeholder }
					readonly={ data.readonly }
					desc={ data.desc }
					tooltip={ data.tooltip }
					class={ data.class }
					icon={ data.icon }
					iconOnClick={ data.iconclick }
					afterClickIcon={ data.afterIcon }
				/>
			);

			break;

		case 'image-selector':
			const img_obj_name = 'product_img_obj';
			const img_obj_value = props.options[ img_obj_name ];
			component = (
				<ImageSelector
					id={ data.name }
					name={ data.name }
					label={ data.label }
					value={ value }
					desc={ data.desc }
					tooltip={ data.tooltip }
					isNameArray={ data.isNameArray }
					objName={ img_obj_name }
					objValue={ img_obj_value }
					singleButton={ data?.singleButton }
					sectionClass={ data?.sectionClass }
					wrapperClass={ data?.wrapperClass }
					labelClass={ data?.labelClass }
					descClass={ data?.descClass }
					displayAlign={ data?.display_align }
				/>
			);
			break;

		case 'doc':
			component = <DocField content={ data.content } />;
			break;
		case 'pro-notice':
			component = (
				<p className="wcf-pro-update-notice">
					{ sprintf(
						/* translators: %s is replaced with feature name */
						__(
							'Please upgrade to the CartFlows Higher Plan to use the %s feature.',
							'cartflows'
						),
						data.feature
					) }
				</p>
			);
			break;
		case 'heading':
			component = (
				<SectionHeadingField
					label={ data.label }
					desc={ data.desc }
					sectionClass={ data?.sectionClass }
					labelClass={ data?.labelClass }
					descClass={ data?.descClass }
				/>
			);
			break;
		case 'wp-editor':
			component = (
				<WpEditorField
					name={ data.name }
					value={ value }
					label={ data.label }
					desc={ data.desc }
					tooltip={ data.tooltip }
					rows={ data.rows }
					cols={ data.cols }
					id={ data.id }
					sectionClass={ data?.sectionClass }
					wrapperClass={ data?.wrapperClass }
					labelClass={ data?.labelClass }
					descClass={ data?.descClass }
					displayAlign={ data?.display_align }
				/>
			);
			break;

		default:
			break;
	}

	if ( 'tr' === renderHtmlElement ) {
		return (
			<tr
				className={ `wcf-field-row-${ props.field } ${
					props.class ? props.class : ''
				} ${ ! props.isActive ? 'wcf-hide' : '' }` }
				key={ data.name }
			>
				<th scope="row" className="py-2">
					<>{ component }</>
				</th>
			</tr>
		);
	}
	return (
		<div
			key={ data.name }
			className={ `wcf-${ props.tabName }-tab--row mb-5 ${
				props.class ? props.class : ''
			} ${ ! props.isActive ? 'hidden' : '' }` }
		>
			{ component }
		</div>
	);
}
export default RenderFields;
