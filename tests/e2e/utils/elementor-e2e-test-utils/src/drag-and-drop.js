/**
 * Drag and drop an element.
 *
 * @see https://github.com/puppeteer/puppeteer/issues/1366#issuecomment-615887204
 * @see https://github.com/microsoft/playwright/issues/1094#issuecomment-812271473
 * @param {*}      page                page object for puppeteer
 * @param {*}      originSelector      Selector of the element which needs to be dragged
 * @param {string} destinationSelector CSS selector where the element is to be dropped
 */
export async function dragAndDrop( page, originSelector, destinationSelector ) {
	await page.waitForSelector( '#elementor-preview-iframe' );
	const elementHandle = await page.$( '#elementor-preview-iframe' );
	const frame = await elementHandle.contentFrame();

	const origin = await page.waitForSelector( originSelector );
	const destination = await frame.waitForSelector( destinationSelector );
	const originBox = await origin.boundingBox();
	const destinationBox = await destination.boundingBox();
	const lastPositionCoordenate = ( box ) => ( {
		// eslint-disable-next-line no-mixed-operators
		x: box.x + box.width / 2,
		y: box.y + box.height,
	} );
	const getPayload = ( box ) => ( {
		bubbles: true,
		cancelable: true,
		screenX: lastPositionCoordenate( box ).x,
		screenY: lastPositionCoordenate( box ).y,
		clientX: lastPositionCoordenate( box ).x,
		clientY: lastPositionCoordenate( box ).y,
	} );

	// Function in browser.
	const pageFunction = async (
		_originSelector,
		_destinationSelector,
		originPayload,
		destinationPayload,
	) => {
		const _origin = document.querySelector( _originSelector );
		let _destination = document
			.querySelector( '#elementor-preview-iframe' )
			.contentWindow.document.querySelector( _destinationSelector );
		// If has child, put at the end.
		_destination = _destination.lastElementChild || _destination;

		// Init Events
		_origin.dispatchEvent( new MouseEvent( 'pointerdown', originPayload ) );
		_origin.dispatchEvent( new DragEvent( 'dragstart', originPayload ) );

		await new Promise( ( resolve ) => setTimeout( resolve, 1000 ) );
		_destination.dispatchEvent(
			new MouseEvent( 'dragenter', destinationPayload ),
		);
		_origin.dispatchEvent( new DragEvent( 'dragend', destinationPayload ) );
		_origin.dispatchEvent(
			new DragEvent( 'pointerup', destinationPayload ),
		);

		_destination.dispatchEvent(
			new MouseEvent( 'dragenter', destinationPayload ),
		);
		_origin.dispatchEvent( new DragEvent( 'dragend', destinationPayload ) );
		_destination.dispatchEvent(
			new DragEvent( 'drop', destinationPayload ),
		);
	};

	// Init drag and drop.
	await page.evaluate(
		pageFunction,
		originSelector,
		destinationSelector,
		getPayload( originBox ),
		getPayload( destinationBox ),
	);
}
