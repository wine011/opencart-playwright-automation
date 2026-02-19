/* Home Page (default url) > Search product > add to cart > modify cart > check out step (will fill personal details)> Log out
1. Search for a product 
2. Add the product to the shopping cart
3. Modify the quantity of the product in the shopping cart
4. Checkout : only Fill in the required checkout information (demo: payment completed check out flow not available)
(must fill because of guest checkout)
*/

import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { MyAccountPage } from '../pages/MyAccountPage';
import { SearchPage } from '../pages/SearchPage';
import { ProductPage } from '../pages/ProductPage';
import { ShoppingCartPage } from '../pages/ShoppingCartPage';
import { CheckOutPage } from '../pages/CheckOutPage';
import { RandomData } from '../utils/randomDataGenerator';
import { TestConfig } from '../test.config';

let homePage: HomePage;
let myAccount: MyAccountPage;
let searchPage: SearchPage;
let productPage: ProductPage;
let shoppingCartPage: ShoppingCartPage;
let checkOutPage: CheckOutPage;
let config: TestConfig;

test.beforeEach('Set up required POM', async ({ page }) => {
    homePage = new HomePage(page);
    myAccount = new MyAccountPage(page);
    searchPage = new SearchPage(page);
    productPage = new ProductPage(page);
    shoppingCartPage = new ShoppingCartPage(page);
    checkOutPage = new CheckOutPage(page);

    config = new TestConfig();

    // Navigate to the home page
    await page.goto(config.appUrl, { waitUntil: 'domcontentloaded' });
});


test('@e2e @regression End to End Test for Guest user', async () => {

    await performSearch();
    console.log("User searched a product.")

    await addToCart();
    console.log("User added a product to the cart.")

    await modifyCart();
    console.log("User updated the cart!")

    await proceedToCheckout();
    console.log("User filled the personal details to check out!")

});


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

    expect(await productPage.getSuccessMessage()).toBeTruthy();
}

async function modifyCart() {
    // Click on Shopping Cart Link
    await productPage.clickShoppingCartLink();
    console.log('Clicked on Shopping Cart Link.');
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

    // Select Guest Checkout option
    await checkOutPage.selectGuestCheckout();

    // Fill the personal details
    await checkOutPage.fillFirstName(RandomData.getFirstName());
    await checkOutPage.fillLastName(RandomData.getLastName());
    await checkOutPage.fillEmail(RandomData.getEmail());
    await checkOutPage.fillAddress1(RandomData.getRandomAddress());
    await checkOutPage.fillCity(RandomData.getRandomCity());
    await checkOutPage.fillPostcode(RandomData.getRandomZipCode());
    await checkOutPage.selectCountry(RandomData.getCountry());
    await checkOutPage.selectRegion();

    // Click the Continue button
    await checkOutPage.clickContinue();

    // Verify guest account details saved successfully
    expect(await checkOutPage.saveGuestAccountSuccessMsg()).toBeTruthy();
}


