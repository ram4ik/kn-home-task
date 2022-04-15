const { test, expect, request  } = require('@playwright/test');

const login = {userName: "kh_user_58",password: "@Qwerty123!"};

let userID = "";
let token = "";

const bookISBN = '9781449325862';
const newBookISBN = '9781593275846';

test.describe('Case 3', async() => {

    test('Create, autorize and generate token', async({request}) => {
        // Create user
        const responseCU = await request.post("https://demoqa.com/Account/v1/User", {data: login});
        expect(responseCU.ok()).toBeTruthy();
        const responseJsonCU = await responseCU.json();
        userID = responseJsonCU.userID.toString();
    
        // GenerateToken
        const responseGT = await request.post("https://demoqa.com/Account/v1/GenerateToken", {data: login});
        expect(responseGT.ok()).toBeTruthy();
        const responseJsonGT = await responseGT.json();
        token = responseJsonGT.token.toString();

        // Authorized
        const responseAut = await request.post("https://demoqa.com/Account/v1/Authorized", {data: login});
        console.log(responseAut);
        const responseJsonAut = await responseAut.json();
        console.log("Authorized: " + responseJsonAut);
        expect(responseAut.ok()).toBeTruthy();

        console.log(userID)
        console.log(token)

        //Get authorized
        const responseAutGet = await request.get("https://demoqa.com/Account/v1/User/" + userID, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(responseAutGet);
        const responseJsonAutGet = await responseAutGet.json();
        console.log("Get authorized: " + responseJsonAutGet);
        expect(responseAutGet.ok()).toBeTruthy();
    
    });

    test('Get books ', async ({ request }) => {
        const responseAB = await request.get("https://demoqa.com/BookStore/v1/Books", {
            
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        console.log(responseAB);
        expect(responseAB.ok()).toBeTruthy();
    });

    test('Book in the collection', async ({ request }) => {
        const responseAB = await request.post("https://demoqa.com/BookStore/v1/Books", {
            
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: {
                userId: userID,
                collectionOfIsbns: [
                    {
                        isbn: bookISBN
                    }
                ]
            }
            
        });
        console.log(responseAB);
        expect(responseAB.ok()).toBeTruthy();
    });

    test('Put new book to the collection', async ({ request }) => {
        const responseAB = await request.put("https://demoqa.com/BookStore/v1/Books/" + bookISBN, {
            
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: {
                userId: userID,
                isbn: newBookISBN
            }
            
        });
        console.log(responseAB);
        expect(responseAB.ok()).toBeTruthy();
    });

    test('Access your profile and check if the added book is displayed there', async ({ request }) => {
        const response = await request.get("https://demoqa.com/BookStore/v1/Book?ISBN=" + newBookISBN, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        expect(response.ok()).toBeTruthy();
    });

    test('Delete all books', async ({ request }) => {
        const response = await request.delete("https://demoqa.com/BookStore/v1/Books?UserId=" + userID, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        expect(response.ok()).toBeTruthy();
    });

    test('Delete account' ,async({request}) => {
        const response = await request.delete("https://demoqa.com/Account/v1/User/" + userID, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        expect(response.ok()).toBeTruthy();
    });

});