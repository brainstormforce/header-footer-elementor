import { Page } from '@playwright/test';

export async function site_login(page: Page, username: string, password: string) {   
    await page.goto("http://localhost:9092/wp-admin");
    await page.fill('#user_login', username);
    await page.fill('#user_pass', password);
    await page.locator('#wp-submit').click();
    await page.waitForLoadState('networkidle');
}