// @ts-check
import { test } from '@playwright/test';
import { loginToWordPress } from './utils/login.js';

test('WordPress admin login', async ({ page }) => {
  await loginToWordPress(page);
});