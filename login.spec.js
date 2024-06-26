const { test, expect } = require('@playwright/test');

test('Login to Asana', async ({ page }) => {
    await page.goto('https://app.asana.com/-/login');
    await page.fill('input[type="email"]', 'ben+pose@workwithloop.com');
    await page.fill('input[type="password"]', 'Password123');
    await page.click('button[type="submit"]');
    await page.waitForURL('**/home');
    expect(page.url()).toContain('/home');
});
