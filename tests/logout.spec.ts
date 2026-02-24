import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LogInPage } from '../pages/LogInPage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { TestConfig } from '../test.config';
import { LogOutPage } from '../pages/LogOutPage';

let config: TestConfig;
let homePage: HomePage;
let logInPage: LogInPage;
let myAccountPage: MyAccountPage;
let logOutPage: LogOutPage;

test.beforeEach('Set up required POM', async ({ page }) => {
    config = new TestConfig();
    homePage = new HomePage(page);
    logInPage = new LogInPage(page);
    myAccountPage = new MyAccountPage(page);
    logOutPage = new LogOutPage(page);

    // Navigate to the home page
    await page.goto(config.appUrl, { waitUntil: 'domcontentloaded' });
});

test.afterEach('Close the browser', async ({ page }) => {
    await page.close();
});

test('@sanity @regression @auth Verify logout', async () => {
    // Go to Homepage and click Login Option
    await homePage.clickMyAccountMenu();
    await homePage.clickLoginOption();

    // Fill valid email and password and click logIn
    await logInPage.userLogIn(config.email, config.password);

    // Confirm log In successful
    expect(await myAccountPage.getAccountDashboardHeading()).toContain('My Account');

    // Click Logout
    await myAccountPage.clickLogoutLink();

    // Check logout page exists or not
    expect(await logOutPage.isLogOutPageExisted()).toBeTruthy();

    // Check the heading
    expect(await logOutPage.getLogOutPageHeading()).toContain('Account Logout')

})