import { Page, Locator } from '@playwright/test';
import { ShoppingCartPage } from './ShoppingCartPage';

export class ProductPage {
    // Define variables
    private readonly page: Page;
    private readonly quantityInput: Locator;
    private readonly addToCartButton: Locator;
    private readonly successMessage: Locator;
    private readonly shoppingCartLink: Locator;
    private readonly viewCartButton: Locator;
    private readonly descrptionTab: Locator;

    // Define constructor
    constructor(page: Page) {
        this.page = page;
        this.quantityInput = page.getByRole('textbox', { name: 'Qty' });
        this.addToCartButton = page.getByRole('button', { name: 'Add to Cart' });
        this.successMessage = page.locator('div.alert.alert-success.alert-dismissible');
        this.shoppingCartLink = page.locator('button:has-text("item")');
        this.viewCartButton = page.locator('#cart a:has-text("View Cart")');
        this.descrptionTab = page.getByRole('link', { name: 'Description' });
    }

    // Define actions/methods

    // Check product page exists or not
    async isProductPageExisted(): Promise<boolean> {
        try {
            await this.descrptionTab.waitFor({state: 'visible', timeout: 5000});
            return true;
        } catch {
            return false;
        }
    }

    // Set product quantity
    async setProductQuantity(quantity: string): Promise<void> {
        // Clear the existing quantity and fill in the new quantity
        await this.quantityInput.clear();
        await this.quantityInput.fill(quantity);
    }

    // Click on Add to Cart button
    async clickAddToCartButton(): Promise<void> {
        await this.addToCartButton.click();
    }

    // Get success message after adding to cart
    async getSuccessMessage(): Promise<string> {
        await this.successMessage.waitFor({ state: 'visible', timeout: 5000 });
        const message = await this.successMessage.textContent();
        return message?.trim() ?? '';
    }

    // Click on Shopping Cart Link
    async clickShoppingCartLink(): Promise<void> {
        await this.shoppingCartLink.waitFor({ state: 'visible', timeout: 5000 });
        await this.shoppingCartLink.click();
    }

    // Click on View Cart Button
    async clickViewCartButton(): Promise<ShoppingCartPage> {
        await this.viewCartButton.waitFor({ state: 'visible', timeout: 5000 });
        await this.viewCartButton.click();
        return new ShoppingCartPage(this.page);
    }

    /*// Click on View Cart Button
    async clickViewCartButton(): Promise<ShoppingCartPage> {
        // Directly navigate to the cart page to avoid flaky dropdown
        const baseUrl = new TestConfig().appUrl.replace(/\/$/, '');
        await this.page.goto(`${baseUrl}/index.php?route=checkout/cart&language=en-gb`);
        return new ShoppingCartPage(this.page);
    }*/

}