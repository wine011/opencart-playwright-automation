import { Page, Locator } from '@playwright/test';
import { LogOutPage } from './LogOutPage';

export class MyAccountPage {
    // Define variables
    private readonly page: Page;
    private readonly accountDashboardHeading: Locator;
    private readonly logoutlink: Locator;

    // Define constructor
    constructor(page: Page) {
        this.page = page;
        this.accountDashboardHeading = page.locator('h1:has-text("My Account")');
        this.logoutlink = page.locator('a').filter({ hasText: 'Logout' }).last();
    }

    // Define actions/methods
    // check My Account page exists or not
    async isMyAccountPageExisted(): Promise<boolean> {
        if (await this.page.title()) {
            return true;
        }
        return false;
    }

    // Confirm account dashboard page
    async getAccountDashboardHeading(): Promise<string> {
        return await this.accountDashboardHeading.textContent() || '';
    }

    // Click on Logout link
    async clickLogoutLink(): Promise<LogOutPage> {
        await this.logoutlink.click();
        return new LogOutPage(this.page);
    }
}