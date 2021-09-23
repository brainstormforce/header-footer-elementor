export async function dragAndDrop( origin, destination ) {
	const ob = await origin.boundingBox();
	const db = await destination.boundingBox();

	console.log(ob);
	console.log(db);

	await page.mouse.move( ob.x, ob.y );
	await page.mouse.down();

	await page.mouse.move( 240, 700 );
	await page.mouse.up();
}
