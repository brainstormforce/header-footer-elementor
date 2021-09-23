/**
 * WordPress dependencies
 */
import { createNewElementorPost } from '../utils/create-new-elementor-post';
import { insertSection } from '../utils/insert-section';
import { insertWidget } from '../utils/insert-widget';
import { publishPage } from '../utils/publish-page';
import { viewPage } from '../utils/view-page';

describe( 'Hello World', () => {
	it( 'elementor Hello, World!', async () => {
		await createNewElementorPost();
		await insertSection();
		await insertWidget( {
			widgetName: 'Retina Image',
			section: 1,
			column: 1,
		} );

		await publishPage();
		await viewPage();

		await expect( true ).toBe( true );
	} );
} );
