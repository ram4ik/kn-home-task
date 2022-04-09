
const { test, expect } = require('@playwright/test');

const { PractiseForm } = require('../pages/PractiseForm');

test.describe('Case 1', () => {

    test('Expected validations', async ({ page }) => {

    const practiceFrom = new PractiseForm(page);

    practiceFrom.openPage(page);

    await practiceFrom.firstName.click();
    await practiceFrom.firstName.fill('Ramill');
    
    await practiceFrom.lastName.click();
    await practiceFrom.lastName.fill('Ibragimov');

    await practiceFrom.male.click();

    await practiceFrom.mobileNumber.click();
    await practiceFrom.mobileNumber.fill('0055666888');

    await practiceFrom.dateOfBirthInput.click();

    await page.locator('text=Submit').press('Enter');



    await expect(page.locator('text=Thanks for submitting the form').first()).toBeVisible();
    await expect(page.locator('text=Ramill Ibragimov').first()).toBeVisible();
    await expect(page.locator('td:has-text("Male")').first()).toBeVisible();
    await expect(page.locator('text=0055666888').first()).toBeVisible();

    await page.locator('text=Close').click();

    });

});