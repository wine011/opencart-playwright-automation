import { Page, Locator } from '@playwright/test';

export class LogInPage {
    // Define variables
    private readonly page: Page;
    private readonly emailField: Locator;
    private readonly passwordField: Locator;
    private readonly loginButton: Locator;
    private readonly forgotPasswordLink: Locator;
    private readonly loginErrorMessage: Locator;

    // Define constructor
    constructor(page: Page) {
        this.page = page;
        this.emailField = page.getByRole('textbox', { name: 'E-Mail Address' });
        this.passwordField = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.forgotPasswordLink = page.locator('a').filter({ hasText: 'Forgotten Password' }).first();
        this.loginErrorMessage = page.getByText('Warning: No match for E-Mail Address and/or Password.', { exact: true });
    }

    // Define actions/methods

    // Check login page exists or not
    async isLogInPageExisted(): Promise<boolean> {
        try {
            await this.emailField.waitFor({ timeout: 5000 });
            return true;
        } catch {
            return false;
        }
    }

    // Fill in email
    async fillEmail(email: string): Promise<void> {
        try {
            await this.emailField.fill(email);
        } catch (error) {
            console.error('Error filling email field:', error);
            throw error;
        }
    }

    // Fill in password
    async fillPassword(password: string): Promise<void> {
        try {
            await this.passwordField.fill(password);
        } catch (error) {
            console.error('Error filling password field:', error);
            throw error;
        }
    }

    // Click on Login button
    async clickLogin(): Promise<void> {
        try {
            await this.loginButton.click();
        } catch (error) {
            console.error('Error clicking Login button:', error);
            throw error;
        }
    }

    // Click on Forgotten Password link
    async clickForgotPassword(): Promise<void> {
        try {
            await this.forgotPasswordLink.click();
        } catch (error) {
            console.error('Error clicking Forgotten Password link:', error);
            throw error;
        }
    }

    // Get login error message
    async getLoginErrorMessage(): Promise<string> {
        return await this.loginErrorMessage.textContent() || '';
    }

    // Combine filling email+password and click login button
    async userLogIn(email: string, password: string): Promise<void> {
        await this.fillEmail(email);
        await this.fillPassword(password);
        await this.clickLogin();
    }

}