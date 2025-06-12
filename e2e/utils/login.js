// @ts-check
import { expect } from '@playwright/test';

/**
 * Login to WordPress admin
 * @param {import('@playwright/test').Page} page
 */
export async function loginToWordPress(page) {
  // Navigate to the WordPress login page
  await page.goto('http://localhost:9092/wp-admin');
  
  // Fill in the login form
  await page.fill('#user_login', 'admin');
  await page.fill('#user_pass', 'password');
  
  // Click the login button
  await page.click('#wp-submit');
  
  // Verify successful login by checking for WordPress dashboard
  await expect(page.locator('#wpadminbar')).toBeVisible();
}