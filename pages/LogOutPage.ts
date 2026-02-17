import { Page, Locator } from '@playwright/test';
import { HomePage } from './HomePage';

export class LogOutPage {
    // Define variables
    private readonly page: Page;
    private readonly logOutHeader: Locator;
    private readonly continueBtn: Locator;

    // Define constructor
    constructor(page: Page) {
        this.page = page;
        this.logOutHeader = page.getByRole('heading', { name: 'Account Logout' });
        this.continueBtn = page.getByRole('link', { name: 'Continue' });
    }

    // Define actions/methods
    async isLogOutPageExisted(): Promise<boolean> {
        if (await this.page.title()) {
            return true;
        }
        return false;
    }

    // Check the header
    async getLogOutPageHeading(): Promise<string> {
        return await this.logOutHeader.textContent() || '';
    }

    // Click continue button and redirected to Home Page
    async clickContinueBtn(): Promise<HomePage> {
        await this.continueBtn.click();
        return new HomePage(this.page);
    }


}