/**
 * HFE Template Creation E2E Tests
 */
import {
	loginUser,
	visitAdminPage,
	createNewPost,
	publishPost,
} from '@wordpress/e2e-test-utils';

describe('HFE Template Creation', () => {
	beforeAll(async () => {
		await loginUser();
	});

	it('should create a header template', async () => {
		// Navigate to HFE templates
		await visitAdminPage('edit.php', 'post_type=elementor-hf');
		
		// Click Add New
		await page.click('.page-title-action');
		await page.waitForNavigation();
		
		// Fill in template details
		await page.type('#title', 'Test Header Template');
		await page.select('#ehf_template_type', 'header');
		
		// Set target rules
		await page.click('.target-rule-condition-group-add');
		await page.waitForSelector('.target_rule-condition select');
		await page.select('.target_rule-condition select:first-child', 'basic-global');
		await page.select('.target_rule-specific_page select', 'entire-site');
		
		// Publish
		await publishPost();
		
		// Verify success
		const successNotice = await page.$('.notice-success');
		expect(successNotice).toBeTruthy();
	});

	it('should create a footer template', async () => {
		await visitAdminPage('post-new.php', 'post_type=elementor-hf');
		
		// Fill in template details
		await page.type('#title', 'Test Footer Template');
		await page.select('#ehf_template_type', 'footer');
		
		// Publish
		await publishPost();
		
		// Verify template type
		const selectedValue = await page.$eval('#ehf_template_type', el => el.value);
		expect(selectedValue).toBe('footer');
	});

	it('should display templates in list view', async () => {
		await visitAdminPage('edit.php', 'post_type=elementor-hf');
		
		// Check for custom columns
		const displayRulesHeader = await page.$('th#elementor_hf_display_rules');
		const shortcodeHeader = await page.$('th#elementor_hf_shortcode');
		
		expect(displayRulesHeader).toBeTruthy();
		expect(shortcodeHeader).toBeTruthy();
		
		// Check for at least one template
		const templateRows = await page.$$('tbody#the-list tr');
		expect(templateRows.length).toBeGreaterThan(0);
	});

	it('should show shortcode for template', async () => {
		await visitAdminPage('edit.php', 'post_type=elementor-hf');
		
		// Get first shortcode cell
		const shortcodeCell = await page.$('td.elementor_hf_shortcode');
		if (shortcodeCell) {
			const shortcodeText = await page.evaluate(el => el.textContent, shortcodeCell);
			expect(shortcodeText).toMatch(/\[hfe_template id='\d+'\]/);
		}
	});
});