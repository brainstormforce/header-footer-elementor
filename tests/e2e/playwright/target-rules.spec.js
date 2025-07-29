/**
 * E2E tests for target rules functionality
 */
const { test, expect } = require('@playwright/test');
const { loginUser } = require('./helpers/login');

test.describe('Target Rules', () => {
	test.beforeEach(async ({ page }) => {
		await loginUser(page);
	});

	test('should set entire site target rule', async ({ page }) => {
		// Create a new template
		await page.goto('/wp-admin/post-new.php?post_type=elementor-hf');
		await page.fill('#title', 'Entire Site Header');
		await page.selectOption('#ehf_template_type', 'header');
		
		// Open target rules
		await page.click('.target-rule-condition-group-add');
		
		// Select entire site rule
		await page.selectOption('.target_rule-condition select:first-child', 'basic-global');
		await page.selectOption('.target_rule-specific_page select', 'entire-site');
		
		// Publish
		await page.click('#publish');
		await page.waitForSelector('.notice-success');
		
		// Verify rule was saved
		const ruleType = await page.inputValue('.target_rule-condition select:first-child');
		expect(ruleType).toBe('basic-global');
	});

	test('should set specific page target rule', async ({ page }) => {
		// First create a test page
		await page.goto('/wp-admin/post-new.php?post_type=page');
		await page.fill('#title', 'Test Page for Target Rule');
		await page.click('#publish');
		await page.waitForSelector('.notice-success');
		
		// Get the page ID from URL
		const pageUrl = page.url();
		const pageId = pageUrl.match(/post=(\d+)/)[1];
		
		// Create a template with specific page rule
		await page.goto('/wp-admin/post-new.php?post_type=elementor-hf');
		await page.fill('#title', 'Specific Page Header');
		await page.selectOption('#ehf_template_type', 'header');
		
		// Open target rules
		await page.click('.target-rule-condition-group-add');
		
		// Select specific page rule
		await page.selectOption('.target_rule-condition select:first-child', 'specific-pages');
		
		// Wait for specific page dropdown to appear
		await page.waitForSelector('.target-rule-specific-page-selector');
		
		// Select the test page
		await page.type('.target-rule-specific-page-selector input', 'Test Page');
		await page.keyboard.press('Enter');
		
		// Publish
		await page.click('#publish');
		await page.waitForSelector('.notice-success');
	});

	test('should add exclusion rules', async ({ page }) => {
		// Create a template
		await page.goto('/wp-admin/post-new.php?post_type=elementor-hf');
		await page.fill('#title', 'Header with Exclusions');
		await page.selectOption('#ehf_template_type', 'header');
		
		// Add include rule for entire site
		await page.click('.target-rule-condition-group-add');
		await page.selectOption('.target_rule-condition select:first-child', 'basic-global');
		await page.selectOption('.target_rule-specific_page select', 'entire-site');
		
		// Add exclusion rule
		await page.click('a[href="#target_rule-exclude-on"]');
		await page.click('.exclude-target-rule-condition-group-add');
		
		// Select archive pages to exclude
		await page.selectOption('.exclude-target_rule-condition select:first-child', 'basic-archives');
		
		// Publish
		await page.click('#publish');
		await page.waitForSelector('.notice-success');
		
		// Verify exclusion tab is visible
		const excludeTab = await page.locator('a[href="#target_rule-exclude-on"]');
		expect(await excludeTab.isVisible()).toBeTruthy();
	});

	test('should set user role restrictions', async ({ page }) => {
		// Create a template
		await page.goto('/wp-admin/post-new.php?post_type=elementor-hf');
		await page.fill('#title', 'Admin Only Header');
		await page.selectOption('#ehf_template_type', 'header');
		
		// Add target rule
		await page.click('.target-rule-condition-group-add');
		await page.selectOption('.target_rule-condition select:first-child', 'basic-global');
		await page.selectOption('.target_rule-specific_page select', 'entire-site');
		
		// Set user roles
		await page.click('a[href="#target_rule-users"]');
		await page.check('input[value="administrator"]');
		await page.check('input[value="editor"]');
		
		// Publish
		await page.click('#publish');
		await page.waitForSelector('.notice-success');
		
		// Verify roles are checked
		const adminChecked = await page.isChecked('input[value="administrator"]');
		const editorChecked = await page.isChecked('input[value="editor"]');
		
		expect(adminChecked).toBeTruthy();
		expect(editorChecked).toBeTruthy();
	});
});