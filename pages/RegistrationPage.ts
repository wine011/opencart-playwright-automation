import { Page, Locator } from '@playwright/test';

export class RegistrationPage {
    // Define variables
    private readonly page: Page;
    private readonly registerAccHeading: Locator;
    private readonly firstName: Locator;
    private readonly lastName: Locator;
    private readonly email: Locator;
    private readonly telephone: Locator;
    private readonly password: Locator;
    private readonly confirmPassword: Locator;
    private readonly subscribeButton: Locator;
    private readonly privacyButton: Locator;
    private readonly continueButton: Locator;
    private readonly confirmationMessage: Locator;
    private readonly continueAccBtn: Locator;

    // Define constructor
    constructor(page: Page) {
        this.page = page;
        this.registerAccHeading = page.getByRole('heading', { name: 'Register Account' });
        this.firstName = page.getByRole('textbox', { name: 'First Name' });
        this.lastName = page.getByRole('textbox', { name: 'Last Name' });
        this.email = page.getByRole('textbox', { name: 'E-Mail' });
        this.telephone = page.getByPlaceholder('Telephone');
        this.password = page.getByPlaceholder('Password', { exact: true });
        this.confirmPassword = page.getByPlaceholder('Password Confirm', { exact: true });
        this.subscribeButton = page.locator('#input-newsletter');
        this.privacyButton = page.getByRole('checkbox');
        this.continueButton = page.locator('input.btn.btn-primary');
        this.confirmationMessage = page.getByRole('heading', { name: 'Your Account Has Been Created!' });
        this.continueAccBtn = page.getByRole('link', { name: 'Continue' });
    }
    // Define actions/methods
    async isRegisterAccountPageExisted() {
        return await this.registerAccHeading.textContent() || '';
    }

    async fillFirstName(fname: string): Promise<void> {
        await this.firstName.fill(fname);
    }

    async fillLastName(lname: string): Promise<void> {
        await this.lastName.fill(lname);
    }

    async fillEmail(email: string): Promise<void> {
        await this.email.fill(email);
    }

    async fillTelephone(telephone: string): Promise<void> {
        await this.telephone.fill(telephone);
    }

    async fillPassword(pw: string) {
        await this.password.fill(pw);
    }

    async fillConfirmPassword(pw: string) {
        await this.confirmPassword.fill(pw);
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