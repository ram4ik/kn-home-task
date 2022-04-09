
const { test, expect } = require('@playwright/test');

const { KHAeurospaceLogistics } = require('../pages/KHAerospaceLogistics');

test.describe('Case 4', () => {

    test('Access KN website page', async ({ page }) => {

        const aerospaceLogistics = new KHAeurospaceLogistics(page);

        aerospaceLogistics.openPage(page);
 
        await aerospaceLogistics.acceptTerms.click();

        const [page1] = await Promise.all([
          page.waitForEvent('popup'),
          page.locator('text=Download white paper').click()
        ]);
      });

});