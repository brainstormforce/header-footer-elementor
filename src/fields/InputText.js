import React from 'react';
import { decode } from 'html-entities';
import classnames from 'classnames';

function InputText( props ) {
	const { attr, onChangeCB } = props;

	const [ inputvalue, setInputvalue ] = React.useState( props.value );

	function handleChange( e ) {
		setInputvalue( e.target.value );

		if ( onChangeCB ) {
			onChangeCB( e.target.value );
		}
	}

	const type = props.type ? props.type : 'text';
	return (
		<>
			<input
				{ ...attr }
				type={ type }
				className={ classnames( props.class, 'w-[300px]' ) }
				name={ props.name }
				value={ decode( inputvalue ) }
				id={ props.id }
				onChange={ handleChange }
				placeholder={ props.placeholder }
				min={ props.min }
				max={ props.max }
				readOnly={ props.readonly }
			></input>
		</>
	);
}

export default InputText;
