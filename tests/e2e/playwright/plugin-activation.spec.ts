import { test, expect } from '@playwright/test';
import { site_login } from '../playwright/helpers/site-login';


test('plugin activation', async ({ page, request }) => {

  await site_login(page, "admin", "password");
  
  await page.goto('http://localhost:9092/wp-admin/plugins.php');
  // Check if deactivate link is visible and proceed with deactivation
  const deactivateLink = page.locator('#deactivate-header-footer-elementor');
  if (await deactivateLink.isVisible()) {
    await deactivateLink.click();
    const SkipDeactivateButton = page.locator('.uds-feedback-skip');
    await SkipDeactivateButton.click();
    await expect(page.getByText('Plugin deactivated.')).toBeVisible();
    console.log('Plugin deactivated successfully');
    await page.locator('#activate-header-footer-elementor').click();
    await expect(page.getByText('Plugin activated.')).toBeVisible();
    console.log('Plugin activated successfully');
  }
  // Activate the plugin if it is already deactivated
  else {
    await page.locator('#activate-header-footer-elementor').click();
    await expect(page.getByText('Plugin activated.')).toBeVisible();
    console.log('Plugin activated successfully');
}
});