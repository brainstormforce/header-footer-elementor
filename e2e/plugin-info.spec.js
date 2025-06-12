// @ts-check
import { test, expect } from '@playwright/test';
import { loginToWordPress } from './utils/login.js';

test('get plugin name and version', async ({ page }) => {
  // Login to WordPress admin
  await loginToWordPress(page);
  
  // Navigate to plugins page
  await page.goto('http://localhost:9092/wp-admin/plugins.php');
  
  // Find the plugin row
  const pluginRow = page.locator('tr[data-slug="header-footer-elementor"]');
  
  // Extract plugin name and version
  const pluginName = await pluginRow.locator('.plugin-title strong').textContent();
  const versionText = await pluginRow.locator('.plugin-version-author-uri').textContent();
  
  // Extract version number using regex
  const versionMatch = versionText.match(/Version\s+(\d+\.\d+\.\d+)/);
  const version = versionMatch ? versionMatch[1] : 'Version not found';
  
  // Log and assert the values
  console.log(`Plugin Name: ${pluginName}`);
  console.log(`Plugin Version: ${version}`);
  
  // Store values for potential use in test reports
  await page.evaluate(({ name, ver }) => {
    window._pluginInfo = { name, version: ver };
  }, { name: pluginName, ver: version });
  
  // Basic assertions to ensure we found the information
  expect(pluginName).toBeTruthy();
  expect(version).not.toBe('Version not found');
  
  return { name: pluginName, version };
});