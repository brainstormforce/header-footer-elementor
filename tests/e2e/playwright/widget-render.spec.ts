import { test, expect } from '@playwright/test';
const { site_login } = require('../playwright/helpers/site-login');
const { create_page } = require('../playwright/helpers/create-page');
const { view_page } = require('../playwright/helpers/view-page');
import { widgetSelectors as ws }  from './selectors/editor-selctors';
import { activateWidgets } from './helpers/widget-activation';


test.describe('Rendering Widgets', () => {
    test.beforeEach(async ({ page }) => {
        await site_login(page, "admin", "password");
        await page.goto('/wp-admin/index.php');
        await activateWidgets(page);
    });

    test('Copyright', async ({ page, request }) => {
    await create_page(page, "test-page", "This is a test page");
    await page.locator(ws.hfe_copyright).click();
    await page.getByRole('textbox', { name: 'Link' }).fill('https://ultimateelementor.com/');
    await page.waitForLoadState('networkidle');
    await page.locator('label').filter({hasText: 'Left'}).first().click();
    await page.getByRole('button', { name: 'Publish' }).click();
    await view_page(page);
    console.log('Copyright widget sucessfully added!');
    });


    test('Breadcrumbs', async ({ page, request }) => {
    await create_page(page, "test-page", "This is a test page");
    await page.locator(ws.hfe_breadcrumbs).click();
    await page.locator('label').filter({ hasText:'None'}).first().click();
    await page.locator('label').filter({ hasText:'Center'}).first().click();
    await page.getByRole('button', { name:'Separator' }).click();
    await page.getByRole('textbox', { name:'Separator' }).fill('/');
    await page.waitForLoadState('networkidle');
    await page.getByRole('button', { name: 'Publish' }).click();
    await view_page(page);
    console.log('Breadcrumbs widget sucessfully added!')
    });

    test('Info Card', async ({ page, request }) => {
    //await site_login(page, "admin", "password");
    await create_page(page, "test-page", "This is a test page");
    await page.locator(ws.hfe_infoCard).click();
    await page.getByRole('textbox', { name: 'Title' }).fill("New");
    await page.getByRole('textbox', { name: 'Description' }).fill("Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation");
    await page.locator('label').filter({ hasText: 'Left' }).first().click();
    await page.getByRole('button', { name: 'Call To Action' }).click();
    await page.getByRole('textbox', { name: 'Text' }).fill('Ultimate Addons For Elementor');
    await page.getByRole('textbox', { name: 'Link' }).fill('https://ultimateelementor.com/');
    await page.getByLabel('Size', { exact: true }).selectOption('Large');
    await page.getByRole('button', { name: 'Publish' }).click();
    await view_page(page);
    console.log("Info Card widget sucessfully added!");
    });

    test('Navigation Menu', async ({ page, request }) => {
    await create_page(page, "test-page", "This is a test page");
    await page.locator(ws.hfe_navMenu).click();
    await page.getByRole('button', { name: 'Publish' }).click();
    await view_page(page);
    console.log('Navigation Menu sucessfully added!');
    });

    test('Page Title', async ({ page, request }) => {
    await create_page(page, "test-page", "This is a test page");
    await page.locator(ws.hfe_pageTitle).click();
    await page.getByRole('textbox', { name: 'Before Title Text' }).fill("Hello");
    await page.getByRole('textbox', { name: 'After Title Text' }).fill("World");
    await page.getByLabel('Size').selectOption('Small');
    await page.locator('label').filter({ hasText: 'Center' }).first().click();
    await page.getByRole('button', { name: 'Publish' }).click();
    await view_page(page);
    console.log('Page Title widget added sucessfully!');
    });

    test('Post Info', async ({ page, request }) => {
    await create_page(page, "test-page", "This is a test page");
    await page.locator(ws.hfe_postInfo).click();
    await page.locator('label').filter({ hasText: 'Default' }).click();
    await page.getByRole('button', { name: 'Date' }).click();
    await page.getByRole('textbox', { name: 'Before' }).fill("New");
    await page.getByRole('button', { name: 'Author' }).click();
    await page.getByRole('textbox', { name: 'Before' }).fill("New");
    await page.getByRole('button', { name: 'Time' }).click();
    await page.getByRole('textbox', { name: 'Before' }).fill("New");
    await page.getByRole('button', { name: 'Publish' }).click();
    await view_page(page);
    console.log('Post Info widget sucessfully added!');
    });

    test('Retina Logo', async ({ page, request }) => {
    await create_page(page, "test-page", "This is a test page");
    await page.locator(ws.hfe_retinaLogo).click();
    await page.locator('label').filter({ hasText: 'Left' }).first().click();
    await page.getByLabel('Caption', { exact: true }).selectOption('Custom Caption');
    await page.getByRole('textbox', { name: 'Custom Caption' }).fill("Test Caption!");
    await page.locator('#elementor-control-default-c1792').selectOption('Custom URL');
    await page.getByRole('textbox', { name: 'Link' }).fill('https://ultimateelementor.com/');
    await page.getByRole('button', { name: 'Publish' }).click();
    await view_page(page);
    console.log('Retina Logo widget sucessfully added!')
    });

    test('Search Widget', async ({ page, request }) => {
    await create_page(page, "test-page", "This is a test page");
    await page.locator(ws.hfe_search).click();
    await page.getByRole('button', { name: 'Publish' }).click();
    await view_page(page);
    console.log('Search widget sucessfully added!')
    });

    test('Site Logo Widget', async ({ page, request }) => {
    await create_page(page, "test-page", "This is a test page");
    await page.locator(ws.hfe_siteLogo).click();
    await page.getByRole('button', { name: 'Publish' }).click();
    await view_page(page);
    console.log("Site Logo widget sucessfully added!");
    });

    test('Site Tagline', async ({ page, request }) => {
    await create_page(page, "test-page", "This is a test page");
    await page.locator(ws.hfe_siteTagline).click();
    await page.getByRole('textbox', { name: 'Before Title Text' }).fill('This is a test site tagline');
    await page.getByRole('textbox', { name: 'After Title Text' }).fill('This is a test site tagline');
    await page.locator('label').filter({ hasText: 'Right' }).first().click();
    await page.getByRole('button', { name: 'Publish' }).click();
    await view_page(page);
    console.log('Site Tagline widget sucessfully added!');
    });

});
