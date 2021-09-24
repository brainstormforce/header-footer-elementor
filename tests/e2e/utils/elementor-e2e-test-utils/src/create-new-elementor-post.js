import { createNewPost } from '@wordpress/e2e-test-utils';

export async function createNewElementorPost(
	postType,
	title,
	content,
	excerpt,
) {
	await createNewPost( {
		postType,
		title,
		content,
		excerpt,
	} );

	// Wait for the editor to be ready.
	await page.waitForSelector( '#elementor-switch-mode-button' );

	// Click on `Edit With Elementor` button
	const editWithElementorButton = await page.$(
		'#elementor-switch-mode-button',
	);
	await editWithElementorButton.click();

	await page.waitForSelector( '#elementor-panel-saver-button-publish' );
}
