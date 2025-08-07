# Header Footer Elementor - Testing Quick Start Guide

## Prerequisites

- **PHP**: 7.4 or higher
- **Node.js**: 18.x or higher
- **Composer**: Installed globally
- **Local Sites**: Running (for integration tests)

## Initial Setup

```bash
# Install PHP dependencies
composer install

# Install Node dependencies
npm install
```

## Running Tests

### 1. PHPUnit Tests (Mock - Recommended)

**No database required, works offline**

```bash
# Run all mock tests
composer test:mock

# Run with code coverage
composer test:mock:coverage
```

### 2. E2E Tests - Playwright (Modern)

```bash
# Start WordPress environment
npm run env:start

# Run all Playwright tests
npm run test:e2e:playwright

# Run in headed mode (see browser)
npm run test:e2e:playwright:headed

# Run in UI mode (interactive)
npm run test:e2e:playwright:ui

# View test report
npm run test:e2e:playwright:report
```

### 3. E2E Tests - Jest/Puppeteer (Legacy)

```bash
# Start WordPress environment
npm run env:start

# Run all Jest E2E tests
npm run test:e2e

# Run in interactive mode
npm run test:e2e:interactive

# Debug mode
npm run test:e2e:debug
```

## Quick Commands Reference

| Command | Description |
|---------|-------------|
| `composer test:mock` | Run PHPUnit tests without database |
| `npm run test:e2e:playwright` | Run Playwright E2E tests |
| `npm run test:e2e` | Run Jest/Puppeteer E2E tests |
| `npm run env:start` | Start WordPress test environment |
| `npm run env:stop` | Stop WordPress test environment |
| `composer lint` | Run PHP code standards check |
| `npm run lint:js` | Run JavaScript linting |

## Writing New Tests

### PHPUnit Tests
Create files in `tests/php/mock/` prefixed with `test-`:
```php
class Test_My_Feature extends HFE_Mock_Test_Case {
    public function test_something() {
        $this->assertTrue( true );
    }
}
```

### Playwright E2E Tests
Create files in `tests/e2e/playwright/` ending with `.spec.js`:
```javascript
const { test, expect } = require('@playwright/test');

test('my test', async ({ page }) => {
    await page.goto('/wp-admin/');
    // Your test code
});
```

## Troubleshooting

### PHPUnit Issues
- If database errors occur, use `composer test:mock` instead
- For coverage reports, ensure Xdebug is installed

### E2E Test Issues
- Ensure WordPress environment is running: `npm run env:start`
- Default test URL: http://localhost:9091
- Clear environment: `npm run env:reset-site`

### Local Sites Specific
- Mock tests (`composer test:mock`) work best with Local Sites
- No database connection required for mock tests
- E2E tests require the WordPress environment to be running

## CI/CD

Tests automatically run on GitHub Actions for:
- Pull requests
- Pushes to main/develop branches
- Multiple PHP versions (7.4, 8.0, 8.1, 8.2)
- Both PHPUnit and E2E tests

## Need Help?

- Detailed documentation: `tests/README.md`
- PHPUnit config: `phpunit-mock.xml`
- Playwright config: `playwright.config.js`
- Jest config: `tests/e2e/jest.config.js`