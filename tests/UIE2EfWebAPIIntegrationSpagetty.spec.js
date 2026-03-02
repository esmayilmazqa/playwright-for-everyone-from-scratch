import { test, expect, request } from "@playwright/test";
/**
 * UIE2E.spec.js scenario with Login API Injection
 */
const loginPayload = { userEmail: "academy123+@gmail.com", userPassword: "Academy123+" };
const orderPayload = {
    orders: [
        {
            country: "Turkey",
            productOrderedId: "6960eae1c941646b7a8b3ed3"
        }
    ]
}; // take this from Network > Payload section or postman body

let token;
let orderId;

test.beforeAll(async () => {
    // Login with API and generated token from response
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data: loginPayload
        }
    );
    expect(loginResponse.ok()).toBeTruthy();
    const responseJson = await loginResponse.json();
    token = responseJson.token;
    console.log("Token : ", token);

    // create an order by API
    const orderResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
        {
            data: orderPayload,
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        }
    );

    const orderResponseJson = await orderResponse.json();    
    console.log("Response : ", orderResponseJson);
    orderId = orderResponseJson.orders[0]; // orders is an array

});

test.beforeEach(async () => {

});

test("Login screen is by passed, set token on localStorage", async ({ page }) => {
    // token from login API and be set on localStorage
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);

    await page.goto("https://rahulshettyacademy.com/client/");
});


test("Send a request and parse the response", async (page) => {
    // look beforeAll() method. login and createOrder API
});

test.only("E2E scenario", async ({ page }) => {

    // token from login API and be set on localStorage
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, token);

    await page.goto("https://rahulshettyacademy.com/client/");
    // all steps are gone

    await page.locator("button[routerLink*='orders']").click();

    const rows = page.locator("tbody tr");
    await rows.nth(0).waitFor();
    const count = await rows.count();

    for (let i = 0; i < count; i++) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }

    }

    const lblOrder = page.locator("div.col-text.-main");
    console.log("orderId ", orderId); //  | 695963e0c941646b7a7b4fca |
    // await lblOrder.waitFor(); 
    console.log("lblOrderText : ", await lblOrder.textContent());     
    expect(lblOrder).toHaveText(orderId?.replaceAll("|", "").replaceAll(" ", ""));   
    // await page.pause();
});