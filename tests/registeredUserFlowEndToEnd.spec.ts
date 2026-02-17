/* Register > Search product > add to cart > modify cart > check out step (but will do nothing)> Log out
1. Register a new user account
2. Search for a product 
3. Add the product to the shopping cart
4. Modify the quantity of the product in the shopping cart
5. Checkout : only Fill in the required checkout information (demo: payment completed check out flow not available)
(skip if the user is already logged in)
6. Log out
*/

import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { RegistrationPage } from '../pages/RegistrationPage';
import { LogInPage } from '../pages/LogInPage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { SearchPage } from '../pages/SearchPage';
import { ProductPage } from '../pages/ProductPage';
import { ShoppingCartPage } from '../pages/ShoppingCartPage';
import { CheckOutPage } from '../pages/CheckOutPage';
import { LogOutPage } from '../pages/LogOutPage';
import { RandomData } from '../utils/randomDataGenerator';
import { TestConfig } from '../test.config';

let homePage: HomePage;
let registrationPage: RegistrationPage;
let logInPage: LogInPage;
let myAccount: MyAccountPage;
let searchPage: SearchPage;
let productPage: ProductPage;
let shoppingCartPage: ShoppingCartPage;
let checkOutPage: CheckOutPage;
let logOutPage: LogOutPage;
let config: TestConfig;

test.beforeEach('Set up required POM', async ({ page }) => {
    homePage = new HomePage(page);
    registrationPage = new RegistrationPage(page);
    logInPage = new LogInPage(page);
    myAccount = new MyAccountPage(page);
    searchPage = new SearchPage(page);
    productPage = new ProductPage(page);
    shoppingCartPage = new ShoppingCartPage(page);
    checkOutPage = new CheckOutPage(page);
    logOutPage = new LogOutPage(page);

    config = new TestConfig();

    // Navigate to the home page
    await page.goto(config.appUrl, { waitUntil: 'domcontentloaded' });
});


test('End to End Test for Registered User', { tag: ['@e2e', '@regression'] }, async () => {

    await performRegistration();
    console.log("User is registered!")

    await performSearch();
    console.log("User searched a product.")

    await addToCart();
    console.log("User added a product to the cart.")

    await modifyCart();
    console.log("User updated the cart!")

    await proceedToCheckout();

    await performLogOut();
    console.log("User is logged Out.")
});

async function performRegistration() {
    expect(homePage.isHomePageExisted()).toBeTruthy();

    // Click on My Account Menu and Register Option
    await homePage.clickMyAccountMenu();
    await homePage.clickRegisterOption();

    // Fill in the registration form
    await registrationPage.fillFirstName(RandomData.getFirstName());
    await registrationPage.fillLastName(RandomData.getLastName());

    const email = RandomData.getEmail();
    const password = RandomData.getPassword();
    await registrationPage.fillEmail(email);
    await registrationPage.fillPassword(password);

    // Skip subscribing to the newsletter
    // await registrationPage.clickSubscribe();

    // Agree to the privacy policy
    await registrationPage.clickPrivacy();

    // Submit the registration form
    await registrationPage.clickContinue();

    // Assertions to verify successful registration
    const confirmationMessage = await registrationPage.getConfirmationMessage();
    expect(confirmationMessage).toContain('Your Account Has Been Created!');

    // Click continue button after successful registration
    await registrationPage.clickContinueAfterSuccessRegistration();

    // Assert that the user is redirected to the account page after registration
    expect(await myAccount.isMyAccountPageExisted()).toBe(true);
    expect(await myAccount.getAccountDashboardHeading()).toContain('My Account');
    console.log("User is Logged In after registration.");
}

async function performLogIn(userEmail: string, userPassword: string) {
    // Click on My Account Menu and Login Option
    await homePage.clickMyAccountMenu();
    await homePage.clickLoginOption();

    expect(await logInPage.isLogInPageExisted()).toBe(true);

    // Fill in the login form
    await logInPage.fillEmail(userEmail);
    await logInPage.fillPassword(userPassword);

    // Submit the login form
    await logInPage.clickLogin();

    // Assertions to verify successful login
    expect(await myAccount.isMyAccountPageExisted()).toBe(true);
    expect(await myAccount.getAccountDashboardHeading()).toContain('My Account');
}

async function performSearch() {
    // Search for a product
    await searchPage.searchProduct(config.productName);

    // Confirm search results
    expect(await searchPage.getSearchHeading()).toContain('Search - ' + config.productName);

    // Get search results count
    const resultsCount = await searchPage.getSearchResultsCount();
    expect(resultsCount).toBeGreaterThan(0);
}

async function addToCart() {
    // Click on the first product in the search results
    await searchPage.clickFirstProductInSearchResults();

    // Check product page exists or not
    expect(await productPage.isProductPageExisted()).toBeTruthy();

    // Set product quantity
    await productPage.setProductQuantity(config.productQuantity);

    // Click on Add to Cart button
    await productPage.clickAddToCartButton();

    // Verify the success message after adding to cart
    expect(await productPage.getSuccessMessage()).toBeTruthy();
}

async function modifyCart() {
    // Click on Shopping Cart Link
    await productPage.clickShoppingCartLink();

    // Click on View Cart Button
    await productPage.clickViewCartButton();

    // Check shopping cart page exists or not
    expect(await shoppingCartPage.isShoppingCartPageExisted()).toBeTruthy();


    // Get total amount before updating shopping cart
    const totalAmountBeforeUpdate = await shoppingCartPage.getTotalAmount();
    expect(totalAmountBeforeUpdate).toBe(config.totalPrice);

    // Modify the shopping cart (update quantity)
    await shoppingCartPage.updateProductQuantity(config.updateQty);

    // Click on Update Cart Button
    await shoppingCartPage.clickUpdateCartButton();


    // Get updated alert message after updating shopping cart   
    const updatedAlertMessage = await shoppingCartPage.getUpdatedAlertMessage();
    expect(updatedAlertMessage).toContain('Success');

    // Get total amount after updating shopping cart
    const totalAmountAfterUpdate = await shoppingCartPage.getTotalAmount();
    expect(totalAmountAfterUpdate).toBe(config.updatedTotalPrice);
}

async function proceedToCheckout() {
    // Click 'Checkout Button' 
    await shoppingCartPage.clickCheckOutBtn();
}

async function performLogOut() {
    // Click My Account Menu Dropdown
    await homePage.clickMyAccountMenu();

    // Click My Account > Log Out
    await myAccount.clickLogoutLink();

    // Check logout page exists or not
    expect(await logOutPage.isLogOutPageExisted()).toBeTruthy();

    // Check the heading
    expect(await logOutPage.getLogOutPageHeading()).toContain('Account Logout')

}
