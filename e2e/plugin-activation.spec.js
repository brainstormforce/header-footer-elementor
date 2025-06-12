// @ts-check
import { test, expect } from '@playwright/test';
import { loginToWordPress } from './utils/login.js';

test('plugin activation status', async ({ page }) => {
  // Login to WordPress admin
  await loginToWordPress(page);
  
  // Navigate to plugins page
  await page.getByRole('link', { name: 'Plugins', exact: true }).click();
  
  // Check if plugin is active
  const isActive = await page.locator('tr[data-slug="header-footer-elementor"].active').isVisible();
  
  if (isActive) {
    // If active, deactivate and then activate again
    console.log('Plugin is active. Deactivating first...');
    await page.getByRole('link', { name: 'Deactivate Ultimate Addons' }).click();
    
    // Handle deactivation dialog if it appears
    const skipButton = page.getByRole('button', { name: 'Skip & Deactivate' });
    if (await skipButton.isVisible({ timeout: 2000 }))
      await skipButton.click();
    
    // Verify plugin is deactivated
    await expect(page.locator('tr[data-slug="header-footer-elementor"]:not(.active)')).toBeVisible();
    console.log('Plugin successfully deactivated');
    
    // Activate again
    await page.getByRole('link', { name: 'Activate Ultimate Addons for' }).click();
  } else {
    // If not active, just activate it
    console.log('Plugin is not active. Activating...');
    await page.getByRole('link', { name: 'Activate Ultimate Addons for' }).click();
  }
  
  // Verify plugin is now active
  await expect(page.locator('tr[data-slug="header-footer-elementor"].active')).toBeVisible();
  console.log('Plugin is now active');
});