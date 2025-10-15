import { Page } from '@playwright/test';
import { AwardIcon } from 'lucide-react';

export async function view_page(page) {
 await page.getByRole('button', { name: 'Elementor Logo' }).click();
 await page.getByRole('menuitem', { name: 'Exit to WordPress' }).click();
 await page.getByRole('button', { name: 'Publish', exact: true }).click();
 await page.getByLabel('Editor publish').getByRole('button', { name: 'Publish', exact: true }).click();
 await page.getByLabel('Editor publish').getByRole('link', { name: 'View Page' }).click();
}