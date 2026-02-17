import { Page, Locator } from '@playwright/test';

export class RegistrationPage {
    // Define variables
    private readonly page: Page;
    private readonly firstName: Locator;
    private readonly lastName: Locator;
    private readonly email: Locator;
    private readonly password: Locator;
    private readonly subscribeButton: Locator;
    private readonly privacyButton: Locator;
    private readonly continueButton: Locator;
    private readonly confirmationMessage: Locator;
    private readonly continueAccBtn: Locator;

    // Define constructor
    constructor(page: Page) {
        this.page = page;
        this.firstName = page.getByRole('textbox', { name: 'First Name' });
        this.lastName = page.getByRole('textbox', { name: 'Last Name' });
        this.email = page.getByRole('textbox', { name: 'E-Mail' });
        this.password = page.getByRole('textbox', { name: 'Password' });
        this.subscribeButton = page.locator('#input-newsletter');
        this.privacyButton = page.locator('[name="agree"]')
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.confirmationMessage = page.getByRole('heading', { name: 'Your Account Has Been Created!' })
        this.continueAccBtn = page.getByRole('link', { name: 'Continue' });
    }
    // Define actions/methods
    async fillFirstName(fname: string): Promise<void> {
        await this.firstName.fill(fname);
    }

    async fillLastName(lname: string): Promise<void> {
        await this.lastName.fill(lname);
    }

    async fillEmail(email: string): Promise<void> {
        await this.email.fill(email);
    }

    async fillPassword(pw: string) {
        await this.password.fill(pw);
    }

    async clickSubscribe() {
        await this.subscribeButton.click();
    }

    async clickPrivacy() {
        await this.privacyButton.click();
    }

    async clickContinue() {
        await this.continueButton.click();
    }

    async getConfirmationMessage(): Promise<string> {
        return await this.confirmationMessage.textContent() || '';
    }

    async clickContinueAfterSuccessRegistration() {
        await this.continueAccBtn.click();
    };
}