
import { test, expect } from '@playwright/test';

test.describe('Authentication Page', () => {
  test('should display the login and register forms', async ({ page }) => {
    await page.goto('/auth');

    // Initially, the login form should be visible
    await expect(page.locator('h2:has-text("Sign in to our platform")')).toBeVisible();

    // Click the "Create an account" button to switch to the register form
    await page.click('button:has-text("Create an account")');

    // The register form should now be visible
    await expect(page.locator('h2:has-text("Create a Free Account")')).toBeVisible();

    // Add a pause to visually inspect the animation
    await page.waitForTimeout(2000);

    // Click the "Login here" button to switch back to the login form
    await page.click('button:has-text("Login here")');

    // The login form should be visible again
    await expect(page.locator('h2:has-text("Sign in to our platform")')).toBeVisible();
  });
});
