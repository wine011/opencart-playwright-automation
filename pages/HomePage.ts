import { Page, Locator } from '@playwright/test';

export class HomePage {
    // Define variables
    private readonly page: Page;
    private readonly myAccountMenu: Locator;
    private readonly registerOption: Locator;
    private readonly loginOption: Locator;
    private readonly searchBox: Locator;
    private readonly searchButton: Locator;
    /*private readonly shoppingCartLink: Locator;
    private readonly viewCartButton: Locator;
*/
    // Define constructor (locators can be added here))
    constructor(page: Page) {
        this.page = page;
        this.myAccountMenu = page.locator('a.dropdown-toggle').locator('i').nth(1)
        this.registerOption = page.getByRole('link', { name: 'Register' });
        this.loginOption = page.getByRole('link', { name: 'Login' });
        this.searchBox = page.getByRole('textbox', { name: 'Search' });
        this.searchButton = page.locator('button.btn.btn-light.btn-lg');
        /*this.shoppingCartLink = page.getByRole('button').nth(1);
        this.viewCartButton = page.getByText('View Cart', { exact: true });
    */
    }

    // Define actions/methods

    // Check homepage exists or not
    async isHomePageExisted(): Promise<boolean> {
        if (await this.page.title()) {
            return true;
        }
        return false;
    }

    // Click on My Account Menu
    async clickMyAccountMenu(): Promise<void> {
        try {
            await this.myAccountMenu.click();
        } catch (error) {
            console.error('Error clicking My Account Menu:', error);
            throw error;
        }
    }

    // Click on Register Option
    async clickRegisterOption(): Promise<void> {
        try {
            await this.registerOption.click();
        } catch (error) {
            console.error('Error clicking Register Option:', error);
            throw error;
        }
    }

    // Click on Login Option
    async clickLoginOption(): Promise<void> {
        try {
            await this.loginOption.click();
        } catch (error) {
            console.error('Error clicking Login Option:', error);
            throw error;
        }
    }

    // Fill Search Box
    async fillSearchBox(productName: string): Promise<void> {
        try {
            await this.searchBox.fill(productName);
        } catch (error) {
            console.error('Error typing in Search Box:', error);
            throw error;
        }
    }

    // Click on Search Button
    async clickSearchButton(): Promise<void> {
        try {
            await this.searchButton.click();
        } catch (error) {
            console.error('Error clicking Search Button:', error);
            throw error;
        }
    }

    /*// Click on Shopping Cart Link
    async clickShoppingCartLink(): Promise<void> {
        await this.shoppingCartLink.click();
    }

    // Click on View Cart Button
    async clickViewCartButton(): Promise<void> {
        await this.viewCartButton.click();
    }*/
}