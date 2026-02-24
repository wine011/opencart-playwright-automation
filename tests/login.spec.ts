import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LogInPage } from '../pages/LogInPage';
import { TestConfig } from '../test.config';
import { MyAccountPage } from '../pages/MyAccountPage';

let homePage: HomePage;
let logInPage: LogInPage;
let config: TestConfig;
let myAccount: MyAccountPage;

test.beforeEach('Set up required POM', async ({ page }) => {
    homePage = new HomePage(page);
    logInPage = new LogInPage(page);
    myAccount = new MyAccountPage(page);

    config = new TestConfig();

    // Navigate to the home page
    await page.goto(config.appUrl, { waitUntil: 'domcontentloaded' });
});

test.afterEach('Cleanup', async ({ page }) => {
    await page.close();
});

test('@sanity @regression @auth Verify the login functionality with valid credentials', async () => {
    expect(await homePage.isHomePageExisted()).toBe(true);

    // Click on My Account Menu and Login Option
    await homePage.clickMyAccountMenu();
    await homePage.clickLoginOption();

    expect(await logInPage.isLogInPageExisted()).toBe(true);

    // Fill in the login form
    await logInPage.fillEmail(config.email);
    await logInPage.fillPassword(config.password);

    // Submit the login form
    await logInPage.clickLogin();

    // Assertions to verify successful login
    expect(await myAccount.isMyAccountPageExisted()).toBe(true);
    expect(await myAccount.getAccountDashboardHeading()).toContain('My Account');

});