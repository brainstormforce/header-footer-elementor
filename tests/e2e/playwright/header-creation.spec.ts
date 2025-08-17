import { test, expect } from '@playwright/test';
import { site_login } from './helpers/site-login';

test('header creation', async ({ page, request }) => {

  await site_login(page, "admin", "password");
  await page.goto('http://localhost:9092/wp-admin/admin.php?page=hfe#settings');
  await page.locator("a[href='edit.php?post_type=elementor-hf']").click();
  await page.locator(".page-title-action").click();
  await page.locator("#title").fill("Test Header");

  await page.locator('#ehf_template_type').selectOption('type_header');
  await page.locator('#publish').click();

});