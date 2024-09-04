import React, { useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import Select from 'react-select';
import { Tooltip } from '@Fields';
import { NoSymbolIcon } from '@heroicons/react/24/outline';

function SelectFieldWithIcon( props ) {
	const {
		name,
		id,
		label,
		desc,
		tooltip,
		options,
		onSelect,
		after,
		isSearchable = false,
	} = props;

	const [ value, setValue ] = useState(
		options.find( ( item ) => item.value === props.value )
	);

	function handleChange( e ) {
		setValue( { label: props.name, value: e.value, icon: e.icon } );

		// Trigger change
		const changeEvent = new CustomEvent( 'wcf:select:change', {
			bubbles: true,
			detail: { e, name: props.name, value: e.value, icon: e.icon },
		} );

		document.dispatchEvent( changeEvent );

		if ( props?.callback ) {
			props.callback( e, props.name, e.value );
		}

		if ( onSelect ) {
			onSelect();
		}
	}

	const customStyles = {
		option: ( styles, state ) => ( {
			...styles,
			display: 'flex',
			justifyContent: 'center',
			backgroundColor: state.isSelected ? '#F06434' : styles.color,
			color: state.isSelected ? '#ffffff' : styles.color,
			borderBottom: state.isSelected
				? '1px solid #F06434'
				: '1px solid rgba(0, 0, 0, 0.125)',
			cursor: 'pointer',
			'&:active': {
				color: '#FFF',
				backgroundColor: '#F06434',
				borderBottom: '1px solid #F06434',
			},
			'&:hover': {
				color: '#FFF',
				backgroundColor: '#F06434',
				borderBottom: '1px solid #F06434',
			},
			'&:last-child': {
				borderBottom: '0px',
			},
		} ),
		control: ( styles, state ) => ( {
			...styles,
			borderTopRightRadius: '0px',
			borderBottomRightRadius: '0px',
			borderRight: 'none',
			borderColor: state.isFocused ? '#e5e7eb' : '',
			boxShadow: state.isFocused ? 'none' : '',
			borderRadius: '6px',
			'&:hover': {
				borderColor: 'none',
			},
		} ),
		indicatorSeparator: ( base ) => ( {
			...base,
			display: 'none',
		} ),
		dropdownIndicator: ( provided ) => ( {
			...provided,
			padding: '4px 6px 4px 4px',
		} ),
		valueContainer: ( base ) => ( {
			...base,
			padding: '11px',
			justifyContent: 'center',
		} ),
		menu: ( base ) => ( {
			...base,
			width: 'fit-content',
			backgroundColor: '#F3F4F6',
			color: '#4B5563',
		} ),
		menuList: ( base ) => ( {
			...base,
			paddingTop: '0px',
			paddingBottom: '0px',
			overflow: 'initial',
		} ),
	};

	return (
		<div className="wcf-field wcf-select-with-icons-option">
			<div className="wcf-field__data">
				{ label && (
					<div className="wcf-field__data--label text-sm font-normal text-left">
						<label>
							{ label }
							{ tooltip && <Tooltip text={ tooltip } /> }
						</label>
					</div>
				) }

				<div className="wcf-field__data--content">
					<Select
						classNames={ {
							control: ( state ) =>
								state.isFocused
									? 'border-red-600'
									: 'border-grey-300',
						} }
						classNamePrefix={ 'wcf' }
						className={ props.class }
						name={ name }
						placeholder={ <NoSymbolIcon className="w-5 h-5" /> }
						value={ value }
						id={ id }
						options={ options }
						onChange={ handleChange }
						isSearchable={ isSearchable }
						onFocus={ () => 'ring ring-1 ring-primary-300' }
						getOptionLabel={ ( e ) => (
							<Tooltip
								text={ e.label }
								icon={ e.icon }
								classes={ `group-hover:text-white !ml-0` }
							/>
						) }
						getOptionValue={ ( e ) => e.value }
						styles={ customStyles }
						// menuIsOpen={ true } // Use this property only for debugging purpose.
					/>
				</div>
				{ after && (
					<div className="wcf-field__data--content__after">
						{ after }
					</div>
				) }
			</div>
			{ desc && (
				<div className="wcf-field__desc text-sm font-regular">
					{ ReactHtmlParser( desc ) }
				</div>
			) }
		</div>
	);
}

export default SelectFieldWithIcon;
