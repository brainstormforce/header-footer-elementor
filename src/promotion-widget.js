import domReady from '@wordpress/dom-ready';
import { createRoot } from '@wordpress/element';
import PromotionWidget from './Components/PromotionWidget';

domReady(() => {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const root = createRoot(container);
    root.render(<PromotionWidget />);
});
