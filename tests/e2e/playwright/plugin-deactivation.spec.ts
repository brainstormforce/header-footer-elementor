import { test, expect } from '@playwright/test';
import { site_login } from '../playwright/helpers/site-login';

test('plugin deactivation', async ({ page, request }) => {

  await site_login(page, "admin", "password");
  
  await page.goto('/wp-admin/plugins.php');

  //Check if plugin is already deactivated
  const activeLink = page.locator('#activate-header-footer-elementor');
  if (await activeLink.isVisible()){
    await activeLink.click();
    await page.locator('#deactivate-header-footer-elementor').click();
    const SkipDeactivateButton = page.locator('.uds-feedback-skip');
    await SkipDeactivateButton.click();
    await expect(page.getByText('Plugin deactivated.')).toBeVisible();
    console.log('Plugin deactivated successfully');
  } else {
    await page.locator('#deactivate-header-footer-elementor').click();
    const SkipDeactivateButton = page.locator('.uds-feedback-skip');
    await SkipDeactivateButton.click();
    await expect(page.getByText('Plugin deactivated.')).toBeVisible();
    console.log('Plugin deactivated successfully');
}
});