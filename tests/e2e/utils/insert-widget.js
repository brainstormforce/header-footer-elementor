import { dragAndDrop } from './drag-and-drop';

const SEARCHBOX_SELECTOR = '#elementor-panel-elements-search-input';

export async function insertWidget( { widgetName, section, column } ) {
	await page.waitForSelector( '#elementor-preview-iframe' );
	const elementHandle = await page.$( '#elementor-preview-iframe' );
	const frame = await elementHandle.contentFrame();

	// Click add-widget button.
	const sectionSelector = `.elementor-section-wrap .elementor-section:nth-child(${ section }) > .elementor-container > .elementor-element:nth-child(${ column }) .elementor-first-add`;
	await frame.waitForSelector( sectionSelector );
	const columnToInsertWidget = await frame.$( sectionSelector );
	await columnToInsertWidget.evaluate( ( b ) => b.click() );

	await page.focus( SEARCHBOX_SELECTOR );
	await page.keyboard.type( widgetName );

	const widgetDraggable = await page.$(
		`.elementor-element-wrapper:nth-child(1) .elementor-element`,
	);

	// Drag widgetDraggable and drop into columnToInsertWidget.
	await dragAndDrop( widgetDraggable, columnToInsertWidget );
}
