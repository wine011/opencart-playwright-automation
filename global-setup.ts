import { chromium } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import { HomePage } from './pages/HomePage';
import { RegistrationPage } from './pages/RegistrationPage';
import { RandomData } from './utils/randomDataGenerator';

const AUTH_FILE = path.join(__dirname, 'playwright-auth.json');

async function globalSetup() {
  const isCI = process.env.CI === 'true' || process.env.JENKINS_HOME != null;
  if (!isCI) {
    return;
  }

  const appUrl = process.env.APP_URL || 'http://localhost/opencart/';
  const email = process.env.TEST_USER_EMAIL || RandomData.getEmail();
  const password = process.env.TEST_USER_PASSWORD || RandomData.getPassword(8);

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto(appUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
    const homePage = new HomePage(page);
    const registrationPage = new RegistrationPage(page);

    await homePage.clickMyAccountMenu();
    await homePage.clickRegisterOption();

    await registrationPage.fillFirstName(RandomData.getFirstName());
    await registrationPage.fillLastName(RandomData.getLastName());
    await registrationPage.fillEmail(email);
    await registrationPage.fillPassword(password);
    await registrationPage.clickPrivacy();
    await registrationPage.clickContinue();

    const message = await registrationPage.getConfirmationMessage();
    if (!message.includes('Your Account Has Been Created!')) {
      throw new Error(`Registration failed: ${message}`);
    }

    const auth = { email, password };
    fs.writeFileSync(AUTH_FILE, JSON.stringify(auth, null, 2), 'utf-8');
    console.log('Global setup: test user registered and credentials saved.');
  } finally {
    await browser.close();
  }
}

export default globalSetup;
