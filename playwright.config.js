/**
 * Playwright configuration for E2E tests
 *
 * @see https://playwright.dev/docs/test-configuration
 */
const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
	testDir: './tests/e2e/playwright',
	/* Run tests in files in parallel */
	fullyParallel: true,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process.env.CI,
	/* Retry on CI only */
	retries: process.env.CI ? 2 : 0,
	/* Opt out of parallel tests on CI. */
	workers: process.env.CI ? 1 : undefined,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: 'html',
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		/* Base URL to use in actions like `await page.goto('/')`. */
		baseURL: process.env.WP_BASE_URL || 'http://localhost:8888',

		/* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
		trace: 'on-first-retry',
		
		/* Screenshot on failure */
		screenshot: 'only-on-failure',
		
		/* Video on failure */
		video: 'retain-on-failure',
	},

	/* Configure projects for major browsers */
	projects: [
		{
			name: 'chromium',
			use: { ...devices['Desktop Chrome'] },
		},

		{
			name: 'firefox',
			use: { ...devices['Desktop Firefox'] },
		},

		{
			name: 'webkit',
			use: { ...devices['Desktop Safari'] },
		},

		/* Test against mobile viewports. */
		{
			name: 'Mobile Chrome',
			use: { ...devices['Pixel 5'] },
		},
		{
			name: 'Mobile Safari',
			use: { ...devices['iPhone 12'] },
		},
	],

	/* Run your local dev server before starting the tests */
	webServer: process.env.CI ? undefined : {
		command: 'npm run env:start',
		url: 'http://localhost:8888',
		reuseExistingServer: !process.env.CI,
		timeout: 120 * 1000,
	},
});