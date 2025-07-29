/**
 * E2E tests for template creation
 */
const { test, expect } = require('@playwright/test');
const { loginUser } = require('./helpers/login');

test.describe('Template Creation', () => {
	test.beforeEach(async ({ page }) => {
		await loginUser(page);
	});

	test('should create a header template', async ({ page }) => {
		// Navigate to HFE templates
		await page.goto('/wp-admin/edit.php?post_type=elementor-hf');
		
		// Click Add New
		await page.click('.page-title-action');
		
		// Fill in template title
		await page.fill('#title', 'Test Header Template');
		
		// Select template type
		await page.selectOption('#ehf_template_type', 'header');
		
		// Publish the template
		await page.click('#publish');
		
		// Wait for publish confirmation
		await page.waitForSelector('.notice-success');
		
		// Verify template was created
		const notice = await page.locator('.notice-success').textContent();
		expect(notice).toContain('Post published');
		
		// Verify template type was saved
		const selectedType = await page.inputValue('#ehf_template_type');
		expect(selectedType).toBe('header');
	});

	test('should create a footer template', async ({ page }) => {
		// Navigate to HFE templates
		await page.goto('/wp-admin/edit.php?post_type=elementor-hf');
		
		// Click Add New
		await page.click('.page-title-action');
		
		// Fill in template title
		await page.fill('#title', 'Test Footer Template');
		
		// Select template type
		await page.selectOption('#ehf_template_type', 'footer');
		
		// Publish the template
		await page.click('#publish');
		
		// Wait for publish confirmation
		await page.waitForSelector('.notice-success');
		
		// Verify template was created
		const notice = await page.locator('.notice-success').textContent();
		expect(notice).toContain('Post published');
	});

	test('should display shortcode after template creation', async ({ page }) => {
		// Create a template first
		await page.goto('/wp-admin/post-new.php?post_type=elementor-hf');
		await page.fill('#title', 'Shortcode Test Template');
		await page.selectOption('#ehf_template_type', 'header');
		await page.click('#publish');
		await page.waitForSelector('.notice-success');
		
		// Navigate back to templates list
		await page.goto('/wp-admin/edit.php?post_type=elementor-hf');
		
		// Find the shortcode column
		const shortcodeCell = await page.locator('td.elementor_hf_shortcode').first();
		const shortcode = await shortcodeCell.textContent();
		
		// Verify shortcode format
		expect(shortcode).toMatch(/\[hfe_template id='\d+'\]/);
	});
});