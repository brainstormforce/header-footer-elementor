/**
 * E2E tests for Elementor integration
 */
const { test, expect } = require('@playwright/test');
const { loginUser } = require('./helpers/login');

test.describe('Elementor Integration', () => {
	test.beforeEach(async ({ page }) => {
		await loginUser(page);
	});

	test('should edit template with Elementor', async ({ page }) => {
		// Create a new template
		await page.goto('/wp-admin/post-new.php?post_type=elementor-hf');
		await page.fill('#title', 'Elementor Edit Test');
		await page.selectOption('#ehf_template_type', 'header');
		await page.click('#publish');
		await page.waitForSelector('.notice-success');
		
		// Click Edit with Elementor button
		await page.click('.elementor-switch-mode-button');
		
		// Wait for Elementor to load
		await page.waitForSelector('#elementor-editor-wrapper', { timeout: 30000 });
		
		// Verify Elementor editor loaded
		const editorLoaded = await page.locator('#elementor-editor-wrapper').isVisible();
		expect(editorLoaded).toBeTruthy();
		
		// Check for HFE widgets in the panel
		await page.click('#elementor-panel-footer-tools .elementor-panel-footer-tool[data-tooltip="Widgets"]');
		
		// Search for HFE widgets
		await page.fill('#elementor-panel-elements-search-input', 'site logo');
		
		// Verify HFE widget exists
		const siteLogo = await page.locator('.elementor-element-wrapper:has-text("Site Logo")').first();
		expect(await siteLogo.isVisible()).toBeTruthy();
	});

	test('should display HFE widgets in Elementor', async ({ page }) => {
		// Navigate to an existing template or create one
		await page.goto('/wp-admin/post-new.php?post_type=elementor-hf');
		await page.fill('#title', 'Widget Test Template');
		await page.selectOption('#ehf_template_type', 'header');
		await page.click('#publish');
		await page.waitForSelector('.notice-success');
		
		// Edit with Elementor
		await page.click('.elementor-switch-mode-button');
		await page.waitForSelector('#elementor-editor-wrapper', { timeout: 30000 });
		
		// Open widgets panel
		await page.click('#elementor-panel-footer-tools .elementor-panel-footer-tool[data-tooltip="Widgets"]');
		
		// Test various HFE widgets
		const hfeWidgets = [
			'Site Logo',
			'Site Title',
			'Site Tagline',
			'Navigation Menu',
			'Page Title',
			'Post Info',
			'Breadcrumbs',
			'Search Button'
		];
		
		for (const widget of hfeWidgets) {
			await page.fill('#elementor-panel-elements-search-input', widget);
			const widgetElement = await page.locator(`.elementor-element-wrapper:has-text("${widget}")`).first();
			expect(await widgetElement.isVisible()).toBeTruthy();
		}
	});

	test('should save and preview template', async ({ page }) => {
		// Create and open template in Elementor
		await page.goto('/wp-admin/post-new.php?post_type=elementor-hf');
		await page.fill('#title', 'Preview Test Template');
		await page.selectOption('#ehf_template_type', 'header');
		await page.click('#publish');
		await page.waitForSelector('.notice-success');
		
		// Edit with Elementor
		await page.click('.elementor-switch-mode-button');
		await page.waitForSelector('#elementor-editor-wrapper', { timeout: 30000 });
		
		// Add a simple heading widget
		await page.click('#elementor-panel-footer-tools .elementor-panel-footer-tool[data-tooltip="Widgets"]');
		await page.fill('#elementor-panel-elements-search-input', 'heading');
		
		// Drag and drop heading widget (simplified - in real test would use proper drag)
		const heading = await page.locator('.elementor-element-wrapper:has-text("Heading")').first();
		await heading.click();
		
		// Save the template
		await page.click('#elementor-panel-footer-saver-publish');
		await page.waitForTimeout(2000); // Wait for save
		
		// Preview
		await page.click('#elementor-panel-footer-tools .elementor-panel-footer-tool[data-tooltip="Preview Changes"]');
		
		// Switch to preview tab
		const [previewPage] = await Promise.all([
			page.context().waitForEvent('page'),
			page.click('#elementor-panel-footer-sub-menu-item-preview')
		]);
		
		// Verify preview opened
		await previewPage.waitForLoadState();
		expect(previewPage.url()).toContain('elementor-preview');
	});
});