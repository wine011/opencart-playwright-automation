import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { SearchPage } from '../pages/SearchPage';
import { ShoppingCartPage } from '../pages/ShoppingCartPage';
import { TestConfig } from '../test.config';

let homePage: HomePage;
let productPage: ProductPage;
let searchPage: SearchPage;
let shoppingCartPage: ShoppingCartPage;
let config: TestConfig;

test.beforeEach('Set up required configuration', async ({ page }) => {
    homePage = new HomePage(page);
    productPage = new ProductPage(page);
    searchPage = new SearchPage(page);
    shoppingCartPage = new ShoppingCartPage(page);
    config = new TestConfig();
    // Navigate to the home page
    await page.goto(config.appUrl, { waitUntil: 'domcontentloaded' });
});

test.afterEach('Cleanup', async ({ page }) => {
    await page.close();
});

test('@sanity @regression Verify shopping cart is updated successfully', async () => {
    // Check homepage exists or not
    expect(await homePage.isHomePageExisted()).toBeTruthy();

    // Search for a product
    await searchPage.searchProduct(config.productName);

    // Confirm search results
    expect(await searchPage.getSearchHeading()).toContain('Search - ' + config.productName);

    // Click first product in search results
    await searchPage.clickFirstProductInSearchResults();

    // Check product page exists or not
    expect(await productPage.isProductPageExisted()).toBeTruthy();

    // Click on Add to Cart button
    await productPage.clickAddToCartButton();

    // Get success message after adding to cart
    expect(await productPage.getSuccessMessage()).toBeTruthy();

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

});