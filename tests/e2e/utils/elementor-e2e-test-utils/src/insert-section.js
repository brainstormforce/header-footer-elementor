export async function insertSection( layout = 2 ) {
	await page.waitForSelector( '#elementor-preview-iframe' );
	const elementHandle = await page.$( '#elementor-preview-iframe' );
	const frame = await elementHandle.contentFrame();

	await frame.waitForSelector( '.elementor-add-section-button' );
	const insertSectionButton = await frame.$(
		'.elementor-add-section-button',
	);
	await insertSectionButton.evaluate( ( b ) => b.click() );

	await frame.waitForSelector( '.elementor-select-preset-list' );
	const selectSectionPreset = await frame.$(
		`.elementor-select-preset-list .elementor-preset:nth-child(${ layout })`,
	);
	await selectSectionPreset.evaluate( ( b ) => b.click() );
}
