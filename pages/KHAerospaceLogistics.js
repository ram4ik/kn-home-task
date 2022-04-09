const { test, expect } = require('@playwright/test');

class KHAeurospaceLogistics {

    constructor(page) {

        this.acceptTerms = page.locator('text=Accept All');
    }

    async openPage(page) {
        await page.goto('https://home.kuehne-nagel.com/-/services/aerospace-logistics');
    }
}

module.exports = { KHAeurospaceLogistics };