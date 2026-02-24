import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SearchPage } from '../pages/SearchPage';
import { TestConfig } from '../test.config';

let homePage: HomePage;
let searchPage: SearchPage;
let config: TestConfig;

test.beforeEach('Set up required POM', async ({ page }) => {
    homePage = new HomePage(page);
    searchPage = new SearchPage(page);
    config = new TestConfig();

    // Navigate to the home page
    await page.goto(config.appUrl, { waitUntil: 'domcontentloaded' });
});

test.afterEach('Cleanup', async ({ page }) => {
    await page.close();
});

test('@sanity @regression Verify search product functionality', async () => {
    // Check homepage exists or not
    expect(await homePage.isHomePageExisted()).toBeTruthy();

    // Search for a product
    await searchPage.searchProduct(config.productName);

    // Confirm search results
    expect(await searchPage.getSearchHeading()).toContain('Search - ' + config.productName);

    // Get search results count
    const resultsCount = await searchPage.getSearchResultsCount();
    expect(resultsCount).toBeGreaterThan(0);
});