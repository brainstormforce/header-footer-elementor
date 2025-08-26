import { test, expect, request } from '@playwright/test';
import { site_login } from './helpers/site-login';

test('Widget forntend actions', async ({ page, request }) => {
  await site_login(page, "admin", "password");

  // Check and activate plugin if needed
  await page.goto('/wp-admin/plugins.php');
  const pluginRow = page.locator('tr[data-slug="header-footer-elementor"]');
  if (await pluginRow.locator('.deactivate').count() === 0) {
    await pluginRow.locator('.activate a').click();
  }

  await page.goto('/wp-admin/admin.php?page=hfe#widgets');
  
  await page.waitForLoadState('networkidle');
  
  //Activating all the widgets
  const activateWidgets = page.locator('button:has-text("Activate All")');
  await activateWidgets.click();
  console.log("Widgets Activated");

  await page.waitForLoadState('networkidle');

  //Deactivating unused widgets
  const deactivateUnused = page.locator('button:has-text("Deactivate Unused")');
  await deactivateUnused.click();
  console.log("Unused Widgets Deactivated");

  await page.waitForLoadState('networkidle');

  //Deactivating all widgets
  const deactivateAll = page.locator('button:has-text("Deactivate All"), .lucide-trash2, [title*="delete"]');
  deactivateAll.click();
  console.log("All Widgets Deactivated");
});