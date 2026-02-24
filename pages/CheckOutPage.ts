import { Page, Locator } from '@playwright/test';

export class CheckOutPage {
    // Define variables
    private readonly page: Page;
    private readonly checkOutHeading: Locator;
    private readonly billingDetailsPanel: Locator;
    private readonly guestCheckoutOption: Locator;
    private readonly checkoutOptionsContinueButton: Locator;
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
    private readonly paymentMsg: Locator;
    private readonly telephoneInput: Locator;
    private readonly guestContinueButton: Locator;

    // Initialize variables in the constructor
    constructor(page: Page) {
        this.page = page;
        this.checkOutHeading = page.locator('h1:has-text("Checkout")');
        this.billingDetailsPanel = page.locator('div.panel-body:visible');
        this.guestCheckoutOption = page.getByLabel('Guest Checkout');
        this.checkoutOptionsContinueButton = page.getByRole('button', { name: 'Continue' });
        this.firstNameInput = page.getByRole('textbox', { name: 'First Name' });
        this.lastNameInput = page.getByRole('textbox', { name: 'Last Name' });
        this.emailInput = page.locator('#input-payment-email');
        this.address1Input = page.getByRole('textbox', { name: 'Address 1' });
        this.cityInput = page.getByRole('textbox', { name: 'City' });
        this.postcodeInput = page.getByRole('textbox', { name: 'Post Code' });
        this.countrySelect = page.getByRole('combobox', { name: 'Country' });
        this.regionSelect = page.getByRole('combobox', { name: 'Region / State' });
        this.continueButton = page.locator('#button-payment-address');
        this.guestContinueButton = page.locator('#button-guest');
        this.successMessage = page.locator('#alert');
        this.paymentMsg = page.getByText('Warning: No Payment options are available. Please contact us for assistance!', { exact: true });
        this.telephoneInput = page.getByRole('textbox', { name: 'Telephone' });
    }

    // Define actions/methods

    // CheckOut Page exist or not
    async isCheckOutPageExisted(): Promise<boolean> {
        try {
            await this.checkOutHeading.waitFor({ state: 'visible', timeout: 5000 });
            return true;
        } catch {
            return false;
        }
    }

    // Check Billing Details panel exist or not
    async isBillingDetailsPanelVisible(): Promise<boolean> {
        try {
            await this.billingDetailsPanel.waitFor({ state: 'visible', timeout: 5000 });
            return true;
        } catch {
            return false;
        }
    }

    // Select Guest Checkout option
    async selectGuestCheckout(): Promise<void> {
        try {
            await this.guestCheckoutOption.check();
            await this.checkoutOptionsContinueButton.waitFor({ state: 'visible', timeout: 5000 });
        } catch (error) {
            console.error('Error selecting Guest Checkout option:', error);
            throw error;
        }
    }

    // Click continue after selecting guest checkout
    async clickContinueAfterSelectingGuestCheckout(): Promise<void> {
        try {
            await this.checkoutOptionsContinueButton.click();
        } catch (error) {
            console.error('Error clicking continue after selecting Guest Checkout:', error);
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

    async fillTelephone(telephone: string): Promise<void> {
        await this.telephoneInput.fill(telephone);
    }


    // Select Country and Region 
    async selectCountryAndRegion(country: string): Promise<void> {
        await this.countrySelect.selectOption({ label: country });
        await this.regionSelect.waitFor();
        await this.page.waitForFunction(() => {
            const select = document.querySelector('#input-payment-zone') as HTMLSelectElement;
            return select && select.options.length > 1;
        });

        await this.regionSelect.selectOption({ index: 1 });

        const selectedCountry = await this.countrySelect.locator('option:checked').textContent();
        const selectedRegion = await this.regionSelect.locator('option:checked').textContent();
        console.log(`Selected Country: ${selectedCountry?.trim()}`);
        console.log(`Selected Region/State: ${selectedRegion?.trim()}`);
    }

    // Click the Continue button

    async clickContinue(): Promise<void> {
        await this.continueButton.click();
    }

    // Click the guest continue button
    async clickGuestContinue(): Promise<void> {
        await this.guestContinueButton.click();
    }

    /*// Save guest account details
    async saveGuestAccountSuccessMsg(): Promise<boolean> {
        if (this.successMessage != null) {
            return true;
        }
        else {
            return false;
        }
    }*/

    // Get the warning message when no payment options are available
    async getPaymentWarningMessage(): Promise<boolean> {
        try {
            await this.paymentMsg.waitFor({ state: 'visible', timeout: 5000 });
            return true;
        } catch {
            return false;
        }
    }

}