/**
 * WordPress dependencies
 */
import { createNewElementorPost } from '../utils/create-new-elementor-post';
import { insertSection } from '../utils/insert-section';
import { insertWidget } from '../utils/insert-widget';

describe( 'Hello World', () => {
	it( 'elementor Hello, World!', async () => {
		await createNewElementorPost();
		await insertSection();
		await insertWidget( {
			widgetName: 'Heading',
			section: 1,
			column: 1,
		} );

		await expect( true ).toBe( true );
	} );
} );
