import React from 'react';
import { TextField } from '@Fields';
import { decode } from 'html-entities';

function MultiText( props ) {
	const { name, value, fields } = props;

	const [ inputValue, setInputValue ] = React.useState( value );

	function handleChange( e ) {
		setInputValue( e.target.value );
	}

	return (
		<>
			{ fields.map( ( field, index ) => (
				<TextField
					key={ index }
					name={ name + `[${ field.name }]` }
					label={ field.label }
					placeholder={ field.placeholder }
					value={ decode( inputValue[ field.name ] ) }
					onChange={ handleChange }
					tooltip={ field.tooltip }
				/>
			) ) }
		</>
	);
}

export default MultiText;
