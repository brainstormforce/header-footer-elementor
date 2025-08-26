import { Page } from '@playwright/test';

export async function activateWidgets(page: Page) {   
    await page.goto("/wp-admin/admin.php?page=hfe#widgets");
    const turnOnWidgtes = page.locator('button:has-text("Activate All")');
    await turnOnWidgtes.click();
    console.log("Widgets Activated");
}