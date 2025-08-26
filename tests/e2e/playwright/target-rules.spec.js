const { test, expect } = require('@playwright/test');
const { site_login } = require('../playwright/helpers/site-login');
const { activateWidgets } = require('../playwright/helpers/widget-activation');

test.describe('Target Rules', () => {
	test.beforeEach(async ({ page }) => {
		await site_login(page, "admin", "password");

		// Check and activate plugin if needed
  		await page.goto('/wp-admin/plugins.php');
  		const pluginRow = page.locator('tr[data-slug="header-footer-elementor"]');
  		if (await pluginRow.locator('.deactivate').count() === 0) {
    		await pluginRow.locator('.activate a').click();
  		}
		await activateWidgets;
	});

	test('should set entire site target rule', async ({ page }) => {
		// Create a new template
		await page.goto('wp-admin/edit.php?post_type=elementor-hf');
		await page.click('.page-title-action');
		await page.fill('#title', 'Entire Site Header');
		await page.waitForLoadState('networkidle');

		//Setting rules for entire site
		await page.selectOption('#ehf_template_type', 'type_header');
		await page.selectOption("select[name='bsf-target-rules-location[rule][0]']", 'basic-global');
		await page.locator('#publish').click();
		await page.waitForSelector('.notice-success');
		console.log("Rule set for entire website!!")
	});

	test('Add a new rule for exlusion for specific a page', async ({ page }) => {
		// Create a template
		await page.goto('/wp-admin/post-new.php?post_type=elementor-hf');
		await page.fill('#title', 'Header with Exclusions');
		await page.selectOption('#ehf_template_type', 'type_header');
		await page.selectOption("select[name='bsf-target-rules-location[rule][0]']", 'basic-global');
		
		// Add exclusion rule (Here it is for archive page)
		await page.locator("div[class='target_rule-add-exclusion-rule'] a[class='button']").click();
		await page.selectOption("select[name='bsf-target-rules-exclusion[rule][0]']", 'basic-archives');
		
		// Publish
		await page.click('#publish');
		await page.waitForSelector('.notice-success');
	});

	test('Setting user role restrictions', async ({ page }) => {
		// Create a template
		await page.goto('/wp-admin/post-new.php?post_type=elementor-hf');
		await page.fill('#title', 'Header with Exclusions');
		await page.selectOption('#ehf_template_type', 'type_header');
		await page.selectOption("select[name='bsf-target-rules-location[rule][0]']", 'basic-global');
		
		// Set user roles
		await page.selectOption("select[name='bsf-target-rules-users[0]']", 'editor');
		
		// Publish
		await page.click('#publish');
		await page.waitForSelector('.notice-success');
		
	});
});