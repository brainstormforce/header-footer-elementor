import { Page } from '@playwright/test';

export async function create_page(page) {   
    await page.locator("a[class='wp-has-submenu wp-not-current-submenu menu-top menu-icon-page'] div[class='wp-menu-name']").click();
    await page.locator(".page-title-action").click();
    await page.locator(".elementor-switch-mode-off").click();
}