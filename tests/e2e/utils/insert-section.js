export async function insertSection( layout = 2 ) {
	const frame = page.frames().find( ( singleFrame ) => singleFrame.url().includes( 'elementor-preview' ) );

	const insertSectionButton = await frame.$(
		'.elementor-add-section-button',
	);
	await insertSectionButton.click();
	await frame.waitForSelector( '.elementor-select-preset-list' );

	const selectSectionPreset = await frame.$(
		`.elementor-select-preset-list .elementor-preset:nth-child(${ layout })`,
	);
	await selectSectionPreset.click();
}
