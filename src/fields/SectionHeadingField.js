import React from 'react';
import ReactHtmlParser from 'react-html-parser';

function SectionHeadingField( props ) {
	const { label, desc, sectionClass, descClass, labelClass = '' } = props;

	const sectionWrapperClass =
			sectionClass && '' !== sectionClass ? sectionClass : 'text-left',
		labelWrapperClass =
			'' !== labelClass
				? labelClass
				: 'block text-base font-semibold text-gray-800 mb-5',
		descWrapperClass =
			'' !== descClass
				? descClass
				: 'text-sm font-normal text-gray-500 mt-2';

	return (
		<div
			className={ `wcf-field wcf-section-heading-field ${ sectionWrapperClass }` }
		>
			{ label && (
				<div className="wcf-field__data--label">
					<label className={ labelWrapperClass }>{ label }</label>
				</div>
			) }

			{ desc && (
				<div className={ `wcf-field__desc ${ descWrapperClass }` }>
					{ ReactHtmlParser( desc ) }
				</div>
			) }
		</div>
	);
}

export default SectionHeadingField;
