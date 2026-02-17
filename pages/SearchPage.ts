import { Page, Locator } from '@playwright/test';

export class SearchPage {
    // Define variables
    private readonly page: Page;
    private readonly searchBox: Locator;
    private readonly searchButton: Locator;
    private readonly searchHeading: Locator;
    private readonly searchResults: Locator;
    private readonly firstProductInSearchResults: Locator;

    // Define constructor
    constructor(page: Page) {
        this.page = page;
        this.searchBox = page.getByPlaceholder('Search');
        this.searchButton = page.locator('button.btn.btn-light.btn-lg');
        this.searchHeading = page.getByRole('heading').first();
        this.searchResults = page.locator('h4:visible');
        this.firstProductInSearchResults = page.locator('div.product-thumb').first(); this.firstProductInSearchResults = page.locator('div.product-thumb').locator('div').nth(0);
    }

    // Define actions/methods

    // Type search keyword
    async searchProduct(keyword: string): Promise<void> {
        await this.searchBox.fill(keyword);
        await this.searchButton.click();
    }

    // Confirm search results
    async getSearchHeading(): Promise<string> {
        return await this.searchHeading.textContent() || '';
    }

    // Get search results count
    async getSearchResultsCount(): Promise<number> {
        return await this.searchResults.count();
    }

    // Click on the first product in the search results
    async clickFirstProductInSearchResults(): Promise<void> {
        await this.firstProductInSearchResults.click();
    }
}