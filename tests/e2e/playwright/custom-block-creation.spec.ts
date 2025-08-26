import { test, expect } from '@playwright/test';
import { site_login } from './helpers/site-login';
import { activateWidgets } from './helpers/widget-activation';

test('custom block creation', async ({ page, request }) => {

  await site_login(page, "admin", "password");

  // Check and activate plugin if needed
  await page.goto('/wp-admin/plugins.php');
  const pluginRow = page.locator('tr[data-slug="header-footer-elementor"]');
  if (await pluginRow.locator('.deactivate').count() === 0) {
    await pluginRow.locator('.activate a').click();
  }

  await activateWidgets;
  
  await page.goto('/wp-admin/admin.php?page=hfe#settings');
  await page.locator("a[href='edit.php?post_type=elementor-hf']").click();
  await page.locator(".page-title-action").click();
  await page.locator("#title").fill("Custom Block");

  await page.locator('#ehf_template_type').selectOption('custom');
  await page.locator('#publish').click();

});