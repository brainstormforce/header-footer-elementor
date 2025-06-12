import { Page } from '@playwright/test';

/**
 * Login to WordPress admin
 */
export async function loginToWordPress(page: Page): Promise<void> {
  await page.goto('http://localhost:9092/wp-login.php');
  await page.getByRole('textbox', { name: 'Username or Email Address' }).fill('admin');
  await page.getByRole('textbox', { name: 'Password' }).fill('password');
  await page.getByRole('button', { name: 'Log In' }).click();
  
  // Wait for admin dashboard to load
  await page.waitForSelector('#wpadminbar');
}