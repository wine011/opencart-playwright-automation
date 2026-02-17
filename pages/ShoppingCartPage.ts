import { Page, Locator } from '@playwright/test';

export class ShoppingCartPage {
    // Define variables
    private readonly page: Page;
    private readonly totalAmount: Locator;
    private readonly updateQuantityInput: Locator;
    private readonly updateCartButton: Locator;
    private readonly updatedAlertMessage: Locator;
    private readonly checkOutBtn: Locator;

    // Define constructor
    constructor(page: Page) {
        this.page = page;
        this.totalAmount = page.locator('table tfoot tr td:last-child').last();
        this.updateQuantityInput = page.locator(`//tr//input[@type='text']`);
        this.updateCartButton = page.locator('tbody form button.btn-primary');
        this.updatedAlertMessage = page.locator('#alert');
        this.checkOutBtn = page.locator('a.btn.btn-primary');
    }

    // Define actions/methods

    // Check sopping cart page exists or not
    async isShoppingCartPageExisted(): Promise<boolean> {
        if (await this.page.title()) {
            return true;
        }
        return false;
    }

    // Get total amount in shopping cart
    async getTotalAmount(): Promise<string> {
        const total = await this.totalAmount.innerText();
        return total;
    }

    // Modify the shopping cart (update quantity)
    async updateProductQuantity(newQuantity: string): Promise<void> {
        await this.updateQuantityInput.clear();
        await this.updateQuantityInput.fill(newQuantity);
    }

    // Click on Update Cart Button
    async clickUpdateCartButton(): Promise<void> {
        await this.updateCartButton.click();
        await this.page.waitForTimeout(2000); // Wait for the cart to update
    }

    /*// Get updated alert message after updating shopping cart
    async getUpdatedAlertMessage(): Promise<string> {
        await this.updatedAlertMessage.waitFor({ state: 'visible' });
        const message = await this.updatedAlertMessage.textContent();
        return message?.trim() ?? '';
    }*/

    // Get updated alert message after updating shopping cart
    async getUpdatedAlertMessage(): Promise<string> {
        await this.page.waitForFunction(() => {
            const el = document.querySelector('#alert');
            return el && el.textContent && el.textContent.trim().length > 0;
        }, { timeout: 5000 });
        const message = await this.updatedAlertMessage.textContent();
        return message?.trim() ?? '';
    }

    // Click 'Checkout Button' 
    async clickCheckOutBtn(): Promise<void> {
        await this.checkOutBtn.click();
    }

}