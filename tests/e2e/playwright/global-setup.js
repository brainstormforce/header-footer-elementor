/**
 * Global setup for Playwright tests
 */
const { chromium } = require('@playwright/test');

module.exports = async config => {
	const { baseURL } = config.projects[0].use;
	const browser = await chromium.launch();
	const page = await browser.newPage();
	
	// Activate the plugin if needed
	await page.goto(`${baseURL}/wp-admin/plugins.php`);
	
	// Login if required
	const needsLogin = await page.locator('#user_login').isVisible().catch(() => false);
	if (needsLogin) {
		await page.fill('#user_login', 'admin');
		await page.fill('#user_pass', 'password');
		await page.click('#wp-submit');
		await page.waitForURL('**/wp-admin/**');
	}
	
	// Check if plugin is active
	const pluginRow = page.locator('tr[data-slug="header-footer-elementor"]');
	const isActive = await pluginRow.locator('.deactivate').isVisible().catch(() => false);
	
	if (!isActive) {
		await pluginRow.locator('.activate a').click();
		await page.waitForURL('**/wp-admin/plugins.php**');
	}
	
	await browser.close();
};