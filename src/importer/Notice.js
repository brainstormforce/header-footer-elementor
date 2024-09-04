const Notice = ( { data } ) => {
	const { type, message } = data;

	if ( ! message ) {
		return '';
	}

	return (
		<div className={ `wcf-notice notice notice-${ type }` }>
			<p
				className="wcf-notice__message"
				dangerouslySetInnerHTML={ { __html: message } }
			/>
		</div>
	);
};

export default Notice;
