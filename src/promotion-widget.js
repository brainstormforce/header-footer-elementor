import domReady from '@wordpress/dom-ready';
import { render } from '@wordpress/element';
import PromotionWidget from './Components/PromotionWidget';

domReady( () => {
	const container = document.createElement( 'div' );
	document.body.appendChild( container );
	render( <PromotionWidget />, container );
} );
