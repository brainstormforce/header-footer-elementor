export async function publishPage() {
	const publishButton = await page.$(
		'#elementor-panel-saver-button-publish',
	);
	publishButton.evaluate( ( b ) => b.click() );

	await page.waitForSelector( '#elementor-toast' );
}
