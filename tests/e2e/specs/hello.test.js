/**
 * WordPress dependencies
 */
import {
	createNewElementorPost,
	insertSection,
	insertWidget,
	publishPage,
	viewPage,
} from '../utils/elementor-e2e-test-utils/src';

describe( 'hello World', () => {
	it( 'elementor Hello, World!', async () => {
		await createNewElementorPost( 'page' );
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
