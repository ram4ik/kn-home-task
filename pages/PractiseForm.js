const { test, expect } = require('@playwright/test');
 
 class PractiseForm {

    constructor(page) {

        this.firstName = page.locator('[placeholder="First Name"]');
        this.lastName = page.locator('[placeholder="Last Name"]');

        this.male = page.locator('text=Male').nth(1);

        this.mobileNumber = page.locator('[placeholder="Mobile Number"]');

        this.dateOfBirthInput = page.locator('#dateOfBirthInput');
    }

    async openPage(page) {
        await page.goto('https://demoqa.com/automation-practice-form');
    }

 }

 module.exports = { PractiseForm };