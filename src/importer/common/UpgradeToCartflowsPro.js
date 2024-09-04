// External.
import { __ } from '@wordpress/i18n';

const UpgradeToCartflowsPro = ( { buttonLink, title } ) => {
	const defaultTitle = title || __( 'Upgrade to Cartflows Pro', 'cartflows' );
	const ctaLink = buttonLink?.buttonLink || getUpgradeToProUrl();

	return (
		<div className="wcf-name-your-flow__actions wcf-pro--required">
			<div className="wcf-flow-import__button">
				<a
					target="blank"
					className="wcf-button wcf-primary-button focus:text-white"
					href={ ctaLink }
				>
					{ defaultTitle }
				</a>
			</div>
		</div>
	);
};

export default UpgradeToCartflowsPro;
