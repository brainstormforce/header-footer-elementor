import Markup from './markup';

const Button = ( { stepName, setInputFieldVisibility, setErrorDesc } ) => {
	return (
		<div className="wcf-create-step__button-wrap">
			<Markup
				stepName={ stepName }
				setInputFieldVisibility={ setInputFieldVisibility }
				setErrorDesc={ setErrorDesc }
			/>
		</div>
	);
};

export default Button;
