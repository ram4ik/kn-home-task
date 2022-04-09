const { test, expect } = require('@playwright/test');

const { Books } = require('../pages/Books');

test.describe('Case 2', () => {


    test('User has a book added to the collection', async ({ page }) => {

        const books = new Books(page);

        books.openPage(page);

        await books.loginButton.click();
        await expect(page).toHaveURL('https://demoqa.com/login');

        await books.userName.click();
        await books.userName.fill('kh_user_38');
        
        await books.password.click();
        await books.password.fill('@Qwerty123!');

        await Promise.all([
          page.waitForNavigation(/*{ url: 'https://demoqa.com/books' }*/),
          page.locator('button:has-text("Login")').click()
        ]);

        await expect(page.locator('text=kh_user_38').first()).toBeVisible();

        await books.logout.click();
        await expect(page).toHaveURL('https://demoqa.com/login');
      });

});