import { test, expect } from '@playwright/test';
const { site_login } = require('../playwright/helpers/site-login');

test.describe('Create HFE templates', () => {
    test.beforeEach(async ({ page }) => {
        await site_login(page, "admin", "password");
        await page.goto('/wp-admin/index.php');

         // Check and activate plugin if needed
       await page.goto('/wp-admin/plugins.php');
       const pluginRow = page.locator('tr[data-slug="header-footer-elementor"]');
       if (await pluginRow.locator('.deactivate').count() === 0) {
         await pluginRow.locator('.activate a').click();
       }
    });

    
    test('before footer creation', async ({ page, request }) => {
         
      await page.goto('/wp-admin/admin.php?page=hfe#settings');
      await page.locator("a[href='edit.php?post_type=elementor-hf']").click();
      await page.locator(".page-title-action").click();
      await page.locator("#title").fill("Test Before Footer");
    
      await page.locator('#ehf_template_type').selectOption('type_before_footer');
      await page.locator('#publish').click();
    
    });


    test('custom block creation', async ({ page, request }) => {
          
      await page.goto('/wp-admin/admin.php?page=hfe#settings');
      await page.locator("a[href='edit.php?post_type=elementor-hf']").click();
      await page.locator(".page-title-action").click();
      await page.locator("#title").fill("Custom Block");
    
      await page.locator('#ehf_template_type').selectOption('custom');
      await page.locator('#publish').click();
    
    });

    test('footer creation', async ({ page, request }) => {
    
      await page.goto('/wp-admin/admin.php?page=hfe#settings');
      await page.locator("a[href='edit.php?post_type=elementor-hf']").click();
      await page.locator(".page-title-action").click();
      await page.locator("#title").fill("Test Footer");
    
      await page.locator('#ehf_template_type').selectOption('type_footer');
      await page.locator('#publish').click();
      console.log("footer created!");
    
    });

    test('header creation', async ({ page }) => {
      
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
    
    
});