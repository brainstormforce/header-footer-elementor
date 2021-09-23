/**
 * WordPress dependencies
 */
import { createNewElementorPost } from '../utils/create-new-elementor-post';

describe( 'Hello World', () => {
	it( 'Elementor Hello, World!', async () => {
		await createNewElementorPost();

		await expect( true ).toBe( true );
	} );
} );
