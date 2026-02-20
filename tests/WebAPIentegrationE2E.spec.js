import { test, expect, request } from "@playwright/test";
import { APIUtils } from "./utils/APIUtils";
/**
 * UIE2E.spec.js scenario with Login API Injection
 */
const loginPayload = {
    userEmail: "academy123+@gmail.com",
    userPassword: "Academy123+"
};

const orderPayload = {
    orders: [
        {
            country: "Turkey",
            productOrderedId: "6960eae1c941646b7a8b3ed3"
        }
    ]
}; // take this from Network > Payload section or postman body

let orderIdAndToken;

test.beforeAll(async () => {
    // Login with API and generated token from response
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    orderIdAndToken = apiUtils.createOrder(orderPayload);

});

test.beforeEach(async () => {

});

test.only("E2E scenario", async ({ page }) => {


    // token from login API and be set on localStorage
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, orderIdAndToken.token);

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