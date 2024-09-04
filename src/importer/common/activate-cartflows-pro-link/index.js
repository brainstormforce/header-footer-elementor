import './ActivateCartflowsProLink.scss';

const ActivateCartflowsProLink = ( { title } ) => {
	const defaultTitle = title || 'Activate Cartflows Pro License';
	return (
		<a
			className="wcf-activate-link wcf-button wcf-primary-button"
			href={ `${ cartflows_admin.admin_base_url }admin.php?page=cartflows&settings=1&license=1` }
			rel="noreferrer"
		>
			{ defaultTitle }
			<i className="wcf-icon dashicons dashicons-external"></i>
		</a>
	);
};

export default ActivateCartflowsProLink;
