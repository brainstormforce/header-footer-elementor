/**
 * Login helper for E2E tests
 */

async function loginUser(page, username = 'admin', password = 'password') {
	await page.goto('/wp-login.php');
	
	// Check if already logged in
	const isLoggedIn = await page.url().includes('wp-admin');
	if (isLoggedIn) {
		return;
	}
	
	await page.fill('#user_login', username);
	await page.fill('#user_pass', password);
	await page.check('#rememberme');
	await page.click('#wp-submit');
	
	// Wait for redirect to admin
	await page.waitForURL('**/wp-admin/**');
}

module.exports = { loginUser };