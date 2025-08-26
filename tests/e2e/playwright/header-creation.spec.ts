import { test, expect } from '@playwright/test';
import { site_login } from './helpers/site-login';

test('header creation', async ({ page }) => {
  await site_login(page, "admin", "password");
  
  // Check and activate plugin if needed
  await page.goto('/wp-admin/plugins.php');
  const pluginRow = page.locator('tr[data-slug="header-footer-elementor"]');
  if (await pluginRow.locator('.deactivate').count() === 0) {
    await pluginRow.locator('.activate a').click();
  }
  
  // Navigate to HFE templates
  await page.goto('/wp-admin/admin.php?page=hfe#settings');
  await page.locator("a[href='edit.php?post_type=elementor-hf']").click();
  
  // Create new template
  await page.locator(".page-title-action").click();
  await page.locator("#title").fill("Test Header");
  await page.locator('#ehf_template_type').selectOption('type_header');
  
  // Publish and verify
  await page.locator('#publish').click();
  await expect(page.locator('.notice-success')).toBeVisible();
  await expect(page.locator('#title')).toHaveValue('Test Header');
});