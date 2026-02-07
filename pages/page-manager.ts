import { Page } from '@playwright/test';
import { LoginPage } from './login.page';

export class PageManager {
    private readonly page: Page;
    private readonly _loginPage: LoginPage;

    constructor(page: Page) {
        this.page = page;
        this._loginPage = new LoginPage(this.page);
    }

    get loginPage() {
        return this._loginPage;
    }
}