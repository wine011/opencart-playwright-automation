import { Page, Locator } from '@playwright/test';

export class ShoppingCartPage {
    // Define variables
    private readonly page: Page;
    private readonly shoppingCartHeading: Locator;
    private readonly totalAmount: Locator;
    private readonly updateQuantityInput: Locator;
    private readonly updateCartButton: Locator;
    private readonly updatedAlertMessage: Locator;
    private readonly checkOutBtn: Locator;

    // Define constructor
    constructor(page: Page) {
        this.page = page;
        this.shoppingCartHeading = page.getByRole('heading', { name: /Shopping Cart/});
        this.totalAmount = page.locator('td').filter({ hasText: '$' }).last();
        this.updateQuantityInput = page.locator(`//tr//input[@type='text']`);
        this.updateCartButton = page.locator('button.btn.btn-primary');
        this.updatedAlertMessage = page.locator('div.alert.alert-success.alert-dismissible');
        this.checkOutBtn = page.locator('a.btn.btn-primary');
    }

    // Define actions/methods

    // Check sopping cart page exists or not
    async isShoppingCartPageExisted(): Promise<boolean> {
        try {
            await this.shoppingCartHeading.waitFor({ state: 'visible', timeout: 5000 });
            return true;
        } catch {
            return false;
        }
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
        // Wait for page refresh/update to complete (demo site can be slow)
        await this.updatedAlertMessage.waitFor({ state: 'visible', timeout: 15000 });
    }

    // Get updated alert message after updating shopping cart
    async getUpdatedAlertMessage(): Promise<string> {
        await this.updatedAlertMessage.waitFor({ state: 'visible', timeout: 5000 });
        const message = await this.updatedAlertMessage.textContent();
        return message?.trim() ?? '';
    }

    /*// Get updated alert message after updating shopping cart
    async getUpdatedAlertMessage(): Promise<string> {
        await this.page.waitForFunction(() => {
            const el = document.querySelector('#alert');
            return el && el.textContent && el.textContent.trim().length > 0;
        }, { timeout: 5000 });
        const message = await this.updatedAlertMessage.textContent();
        return message?.trim() ?? '';
    }*/

    // Click 'Checkout Button' 
    async clickCheckOutBtn(): Promise<void> {
        await this.checkOutBtn.click();
    }

}