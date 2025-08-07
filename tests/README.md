# Header Footer Elementor - Testing Guide

This guide covers both PHPUnit and E2E testing for the Header Footer Elementor plugin.

## Table of Contents
- [PHPUnit Testing](#phpunit-testing)
- [E2E Testing with Jest/Puppeteer](#e2e-testing-with-jestpuppeteer)
- [E2E Testing with Playwright](#e2e-testing-with-playwright)

## PHPUnit Testing

### Setup

#### For Local Sites (Local by Flywheel)

If you're using Local Sites, you have two options:

**Option 1: Simple Testing (Recommended)**
This runs tests directly against your Local Sites WordPress installation:

1. Make sure your Local site is running
2. Install composer dependencies:
```bash
composer install
```
3. Run tests:
```bash
composer test:simple
```

**Option 2: WordPress Test Suite**
This requires MySQL command line tools:

1. Make sure your Local site is running
2. Install MySQL client tools (if not already installed):
```bash
brew install mysql-client
```
3. Install the WordPress test suite:
```bash
composer test:install-local
# OR manually:
bash bin/install-wp-tests-local.sh wordpress_test root root
```
4. Install composer dependencies:
```bash
composer install
```

#### For Standard Environments

1. Install the WordPress test suite:
```bash
bash bin/install-wp-tests.sh wordpress_test root '' localhost latest
```

Replace the database credentials with your own:
- `wordpress_test` - Test database name (will be created)
- `root` - Database username
- `''` - Database password
- `localhost` - Database host
- `latest` - WordPress version

2. Install composer dependencies:
```bash
composer install
```

### Running PHPUnit Tests

#### For Local Sites

**Mock Testing (Recommended - No Database Required):**
```bash
# Run all tests
composer test:mock

# Run with coverage
composer test:mock:coverage
```

**Simple Testing (Requires running Local site):**
```bash
# Run all tests
composer test:simple

# Run with coverage
composer test:simple:coverage
```

**With WordPress Test Suite:**
```bash
# Run all tests
composer test:local

# Run with coverage
composer test:local:coverage
```

#### For Standard Environments
Run all tests:
```bash
composer test
```

Run specific test suite:
```bash
composer test:unit
```

Run with code coverage:
```bash
composer test:coverage
```

Run with coverage in terminal:
```bash
composer test:coverage-text
```

### Writing PHPUnit Tests

1. Create test files in `tests/php/` directory
2. Test files should be prefixed with `test-` and end with `.php`
3. Extend the `HFE_Test_Case` base class for common functionality
4. Follow WordPress coding standards

Example test:
```php
class Test_My_Feature extends HFE_Test_Case {
    public function test_something() {
        $this->assertTrue( true );
    }
}
```

## E2E Testing with Jest/Puppeteer

### Setup

1. Install npm dependencies:
```bash
npm install
```

2. Start the WordPress environment:
```bash
npm run env:start
```

### Running Jest/Puppeteer Tests

Run all E2E tests:
```bash
npm run test:e2e
```

Run in interactive mode:
```bash
npm run test:e2e:interactive
```

Run with debugging:
```bash
npm run test:e2e:debug
```

### Writing Jest/Puppeteer Tests

1. Create test files in `tests/e2e/specs/` directory
2. Test files should end with `.test.js`
3. Use WordPress E2E test utilities

Example:
```javascript
import { loginUser, visitAdminPage } from '@wordpress/e2e-test-utils';

describe('Feature', () => {
    it('should do something', async () => {
        await loginUser();
        await visitAdminPage('edit.php', 'post_type=elementor-hf');
        // Your test assertions
    });
});
```

## E2E Testing with Playwright

### Setup

Playwright is already installed as a dev dependency.

### Running Playwright Tests

Run all Playwright tests:
```bash
npm run test:e2e:playwright
```

Run in headed mode (see browser):
```bash
npm run test:e2e:playwright:headed
```

Run in debug mode:
```bash
npm run test:e2e:playwright:debug
```

Run with UI mode:
```bash
npm run test:e2e:playwright:ui
```

View test report:
```bash
npm run test:e2e:playwright:report
```

### Writing Playwright Tests

1. Create test files in `tests/e2e/playwright/` directory
2. Test files should end with `.spec.js`
3. Use Playwright's modern testing API

Example:
```javascript
const { test, expect } = require('@playwright/test');
const { loginUser } = require('./helpers/login');

test.describe('Feature', () => {
    test('should do something', async ({ page }) => {
        await loginUser(page);
        await page.goto('/wp-admin/edit.php?post_type=elementor-hf');
        // Your test assertions
    });
});
```

## Best Practices

1. **Isolation**: Each test should be independent and not rely on other tests
2. **Cleanup**: Always clean up test data after tests run
3. **Assertions**: Use meaningful assertions with clear error messages
4. **Performance**: Keep tests fast by minimizing unnecessary waits
5. **Reliability**: Avoid flaky tests by using proper wait conditions

## Continuous Integration

For CI environments:
- PHPUnit tests can be run with: `composer test`
- Jest E2E tests can be run with: `npm run test:e2e:ci`
- Playwright tests automatically adjust for CI environment

## Troubleshooting

### PHPUnit Issues
- Ensure WordPress test suite is installed correctly
- Check database credentials are correct
- Verify PHP version compatibility

### E2E Issues
- Ensure WordPress environment is running: `npm run env:start`
- Check the correct port is being used (default: 9091)
- Clear browser cache if tests are failing unexpectedly

### Common Solutions
1. Reset the test environment: `npm run env:reset-site`
2. Rebuild the environment: `npm run env:destroy && npm run env:start`
3. Update dependencies: `composer update && npm update`