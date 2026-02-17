import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SearchPage } from '../pages/SearchPage';
import { ProductPage } from '../pages/ProductPage';
import { TestConfig } from '../test.config';

let homePage: HomePage;
let searchPage: SearchPage;
let config: TestConfig;
let productPage: ProductPage;

test.beforeEach('Set up required POM', async ({ page }) => {
    homePage = new HomePage(page);
    searchPage = new SearchPage(page);
    productPage = new ProductPage(page);
    config = new TestConfig();

    // Navigate to the home page
    await page.goto(config.appUrl, { waitUntil: 'domcontentloaded' });
});

test.afterEach('Close the browser', async ({ page }) => {
    await page.waitForTimeout(3000);
    await page.close();
});

test('Verify product is added to cart successfully', { tag: '@sanity @regression' }, async () => {
    // Check homepage exists or not
    expect(await homePage.isHomePageExisted()).toBeTruthy();

    // Search for a product
    await searchPage.searchProduct(config.productName);

    // Confirm search results
    expect(await searchPage.getSearchHeading()).toContain('Search - ' + config.productName);

    // Click on the first product in the search results
    await searchPage.clickFirstProductInSearchResults();

    // Check product page exists or not
    expect(await productPage.isProductPageExisted()).toBeTruthy();

    // Set product quantity
    await productPage.setProductQuantity(config.productQuantity);

    // Click on Add to Cart button
    await productPage.clickAddToCartButton();

    // Get success message after adding to cart
    //const successMessage = await productPage.getSuccessMessage();
    // Verify the success message
    expect(await productPage.getSuccessMessage()).toContain('Success');
});
