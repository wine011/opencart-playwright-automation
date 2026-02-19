import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { RandomData } from '../utils/randomDataGenerator';
import { TestConfig } from '../test.config';

let homePage: HomePage;
let registrationPage: RegistrationPage;
let config: TestConfig;

test.beforeEach('Set up required POM', async ({ page }) => {
    homePage = new HomePage(page);
    registrationPage = new RegistrationPage(page);

    config = new TestConfig();

    // Navigate to the home page
    await page.goto(config.appUrl, { waitUntil: 'domcontentloaded' });
});

test.afterEach('Close the browser', async ({ page }) => {
    await page.waitForTimeout(3000);
    await page.close();
});

test('@sanity @regression @auth Verify the account registration functionality', async () => {

    homePage.isHomePageExisted();

    // Click on My Account Menu and Register Option
    await homePage.clickMyAccountMenu();
    await homePage.clickRegisterOption();

    // Fill in the registration form
    await registrationPage.fillFirstName(RandomData.getFirstName());
    await registrationPage.fillLastName(RandomData.getLastName());
    await registrationPage.fillEmail(RandomData.getEmail());
    await registrationPage.fillPassword(RandomData.getPassword());

    // Skip subscribing to the newsletter
    // await registrationPage.clickSubscribe();

    // Agree to the privacy policy
    await registrationPage.clickPrivacy();

    // Submit the registration form
    await registrationPage.clickContinue();

    // Assertions to verify successful registration
    const confirmationMessage = await registrationPage.getConfirmationMessage();
    expect(confirmationMessage).toContain('Your Account Has Been Created!');


});