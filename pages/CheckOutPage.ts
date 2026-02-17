import { Page, Locator } from '@playwright/test';

export class CheckOutPage {
    // Define variables
    private readonly page: Page;
    private readonly guestCheckoutOption: Locator;
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly emailInput: Locator;
    private readonly address1Input: Locator;
    private readonly cityInput: Locator;
    private readonly postcodeInput: Locator;
    private readonly countrySelect: Locator;
    private readonly regionSelect: Locator;
    private readonly continueButton: Locator;
    private readonly successMessage: Locator;

    // Initialize variables in the constructor
    constructor(page: Page) {
        this.page = page;
        this.guestCheckoutOption = page.getByRole('radio', { name: 'Guest Checkout' });
        this.firstNameInput = page.getByRole('textbox', { name: 'First Name' });
        this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' });
        this.emailInput = page.getByRole('textbox', { name: 'E-Mail' });
        this.address1Input = page.getByRole('textbox', { name: 'Address 1' });
        this.cityInput = page.getByRole('textbox', { name: 'City' });
        this.postcodeInput = page.getByRole('textbox', { name: 'Post Code' });
        this.countrySelect = page.getByRole('combobox', { name: 'Country' });
        this.regionSelect = page.getByLabel('Region / State');
        this.continueButton = page.getByRole('button', { name: 'Continue' });
        this.successMessage = page.locator('#alert');

    }

    // Define actions/methods

    // Select Guest Checkout option
    async selectGuestCheckout(): Promise<void> {
        try {
            await this.guestCheckoutOption.check();
        } catch (error) {
            console.error('Error selecting Guest Checkout option:', error);
            throw error;
        }
    }

    // Fill in the checkout form
    async fillFirstName(firstName: string): Promise<void> {
        await this.firstNameInput.fill(firstName);
    }

    async fillLastName(lastName: string): Promise<void> {
        await this.lastNameInput.fill(lastName);
    }

    async fillEmail(email: string): Promise<void> {
        await this.emailInput.fill(email);
    }

    async fillAddress1(address: string): Promise<void> {
        await this.address1Input.fill(address);
    }

    async fillCity(city: string): Promise<void> {
        await this.cityInput.fill(city);
    }

    async fillPostcode(postcode: string): Promise<void> {
        await this.postcodeInput.fill(postcode);
    }


    async selectCountry(country: string): Promise<void> {
        await this.countrySelect.selectOption(country);
    }

    async selectRegion(): Promise<void> {
        await this.regionSelect.selectOption({ index: 1 }); // Select the first option (you can modify this to select based on value or label if needed)
    }

    // Click the Continue button
    async clickContinue(): Promise<void> {
        await this.continueButton.click();
    }

    // Save guest account details
    async saveGuestAccountSuccessMsg(): Promise<boolean> {
        if (this.successMessage != null) {
            return true;
        }
        else {
            return false;
        }
    }
}