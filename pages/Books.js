const { test, expect } = require('@playwright/test');

class Books {

    constructor(page) {

        this.loginButton = page.locator('button:has-text("Login")');

        this.userName = page.locator('[placeholder="UserName"]');
        this.password = page.locator('[placeholder="Password"]');

        this.logout = page.locator('text=Log out');
    }

    async openPage(page) {
        await page.goto('https://demoqa.com/books');
    }
}

module.exports = { Books };