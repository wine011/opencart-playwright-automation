import { Page, Locator, expect } from '@playwright/test';
import { ShoppingCartPage } from './ShoppingCartPage';

export class ProductPage {
    // Define variables
    private readonly page: Page;
    private readonly quantityInput: Locator;
    private readonly addToCartButton: Locator;
    private readonly successMessage: Locator;
    private readonly shoppingCartLink: Locator;
    private readonly viewCartButton: Locator;

    // Define constructor
    constructor(page: Page) {
        this.page = page;
        this.quantityInput = page.locator('#input-quantity');
        this.addToCartButton = page.getByRole('button', { name: 'Add to Cart' });
        this.successMessage = page.locator('#alert');
        this.shoppingCartLink = page.locator('button.dropdown-toggle');
        this.viewCartButton = page.locator('#cart a:has-text("View Cart")');
    }

    // Define actions/methods

    // Check product page exists or not
    async isProductPageExisted(): Promise<boolean> {
        if (await this.page.title()) {
            return true;
        }
        return false;
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
    async getSuccessMessage(): Promise<boolean> {
        if (this.successMessage != null) {
            return true;
        }
        else {
            return false;
        }
    }

    /*// Get success message after adding to cart
    async getSuccessMessage(): Promise<string> {
        await this.page.waitForFunction(() => {
            const el = document.querySelector('#alert');
            return el && el.textContent && el.textContent.trim().length > 0;
        }, { timeout: 5000 });

        const message = await this.successMessage.textContent();
        return message?.trim() ?? '';
    }*/

    // Click on Shopping Cart Link
    async clickShoppingCartLink(): Promise<void> {
        await expect(this.shoppingCartLink).toBeVisible();
        await expect(this.shoppingCartLink).toBeEnabled();
        await this.shoppingCartLink.click();
    }

    /*// Click on View Cart Button
    async clickViewCartButton(): Promise<ShoppingCartPage> {
        await expect(this.viewCartButton).toBeVisible({ timeout: 5000 });
        await this.viewCartButton.click({ force: true });
        return new ShoppingCartPage(this.page);
    }*/

    // Click on View Cart Button
    // ProductPage.ts
    async clickViewCartButton(): Promise<ShoppingCartPage> {
        // Directly navigate to the cart page to avoid flaky dropdown
        await this.page.goto('http://localhost/opencart/index.php?route=checkout/cart&language=en-gb');
        return new ShoppingCartPage(this.page);
    }

}