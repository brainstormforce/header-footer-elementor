export async function viewPage() {
	const elementorMenu = await page.$( '#elementor-panel-header-menu-button' );
	elementorMenu.evaluate( ( b ) => b.click() );

	const viewPageButton = await page.$(
		'.elementor-panel-menu-item-view-page a',
	);
	viewPageButton.evaluate( ( b ) => b.click() );
}
