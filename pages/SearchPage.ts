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
        this.searchButton = page.locator('button.btn.btn-default.btn-lg')
        this.searchHeading = page.getByRole('heading').first();
        this.searchResults = page.locator('h4:visible');
        this.firstProductInSearchResults = page.locator('div.product-thumb').first();
    }

    // Define actions/methods

    // Type search keyword + click search button
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
        // Click the product link (not the container div) - more reliable for navigation
        const productLink = this.firstProductInSearchResults.locator('a[href*="product"]').first();
        await productLink.waitFor({ state: 'visible' });
        await Promise.all([
            this.page.waitForURL(/route=product\/product|product_id=/, { waitUntil: 'domcontentloaded', timeout: 10000 }),
            productLink.click(),
        ]);
    }
}