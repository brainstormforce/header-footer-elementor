const ProcessingSpinner = ( props ) => {
	return (
		<span
			className={ `inline-block h-18 w-18 animate-spin rounded-full border-2 border-solid border-primary-500 border-r-transparent align-[-0.125em] mr-1 ${
				props.className ? props.className : ''
			}` }
		></span>
	);
};

export default ProcessingSpinner;
